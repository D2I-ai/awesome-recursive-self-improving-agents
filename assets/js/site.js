let paperRows = Array.from(document.querySelectorAll("[data-paper-row]"));
const paperTableBody = document.querySelector("#paper-table-body");
const searchInput = document.querySelector("#paper-search");
const componentFilter = document.querySelector("#component-filter");
const levelFilter = document.querySelector("#level-filter");
const emptyState = document.querySelector("#paper-empty");
const copyButton = document.querySelector("#copy-bibtex");
const bibtex = document.querySelector("#bibtex-block");

const componentSlugs = {
  "Agent Harness": "harness",
  "Agent Data System": "data",
  "Agent Trainer": "trainer",
  "Co-Improvement": "co",
};

function normalize(value) {
  return value.toLowerCase().trim();
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function splitInlineMap(value) {
  const parts = [];
  let current = "";
  let inQuotes = false;
  let escaped = false;

  for (const char of value) {
    if (escaped) {
      current += char;
      escaped = false;
      continue;
    }

    if (char === "\\") {
      current += char;
      escaped = true;
      continue;
    }

    if (char === '"') inQuotes = !inQuotes;

    if (char === "," && !inQuotes) {
      parts.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }

  if (current.trim()) parts.push(current.trim());
  return parts;
}

function parseInlineValue(value) {
  const trimmed = value.trim();
  if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
    return trimmed.slice(1, -1).replaceAll('\\"', '"').replaceAll('\\\\', '\\');
  }
  return trimmed;
}

function parsePapersYaml(text) {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("- {") && line.endsWith("}"))
    .map((line) => {
      const content = line.slice(3, -1);
      return splitInlineMap(content).reduce((paper, part) => {
        const separator = part.indexOf(":");
        if (separator === -1) return paper;
        const key = part.slice(0, separator).trim();
        const value = part.slice(separator + 1);
        paper[key] = parseInlineValue(value);
        return paper;
      }, {});
    });
}

function paperLabels() {
  return {
    paper: paperTableBody?.dataset.labelPaper || "Paper",
    component: paperTableBody?.dataset.labelComponent || "Component",
    year: paperTableBody?.dataset.labelYear || "Year",
    level: paperTableBody?.dataset.labelLevel || "Level",
    focus: paperTableBody?.dataset.labelFocus || "Focus",
  };
}

function renderPaperRow(paper, labels) {
  const row = document.createElement("tr");
  const title = escapeHtml(paper.title || "");
  const paperCell = paper.url
    ? `<a href="${escapeHtml(paper.url)}">${title}</a>`
    : `<span>${title}</span>`;

  row.dataset.paperRow = "";
  row.dataset.component = componentSlugs[paper.component] || "";
  row.dataset.level = paper.level || "";
  row.dataset.search = Object.values(paper).join(" ");
  row.innerHTML = `<td data-label="${escapeHtml(labels.paper)}">${paperCell}</td><td data-label="${escapeHtml(labels.component)}">${escapeHtml(paper.component || "")}</td><td data-label="${escapeHtml(labels.year)}">${escapeHtml(paper.year || "")}</td><td data-label="${escapeHtml(labels.level)}"><span class="level-pill">${escapeHtml(paper.level || "")}</span></td><td data-label="${escapeHtml(labels.focus)}">${escapeHtml(paper.modified_object || "")}</td>`;
  return row;
}

async function loadPapers() {
  if (!paperTableBody) return;

  try {
    const response = await fetch("papers.yaml", { cache: "no-cache" });
    if (!response.ok) throw new Error(`Unable to load papers.yaml: ${response.status}`);

    const papers = parsePapersYaml(await response.text());
    const labels = paperLabels();
    paperTableBody.replaceChildren(...papers.map((paper) => renderPaperRow(paper, labels)));
    paperRows = Array.from(document.querySelectorAll("[data-paper-row]"));
    filterPapers();
  } catch (error) {
    console.error(error);
    paperRows = [];
    paperTableBody.innerHTML = `<tr><td colspan="5">Unable to load papers.yaml.</td></tr>`;
    filterPapers();
  }
}

function filterPapers() {
  const query = normalize(searchInput?.value || "");
  const component = componentFilter?.value || "all";
  const level = levelFilter?.value || "all";
  let visibleCount = 0;

  paperRows.forEach((row) => {
    const rowText = normalize(`${row.textContent || ""} ${row.dataset.search || ""}`);
    const rowComponent = row.dataset.component;
    const rowLevel = row.dataset.level;
    const matchesQuery = !query || rowText.includes(query);
    const matchesComponent = component === "all" || rowComponent === component;
    const matchesLevel = level === "all" || rowLevel === level;
    const visible = matchesQuery && matchesComponent && matchesLevel;

    row.style.display = visible ? "" : "none";
    if (visible) visibleCount += 1;
  });

  if (emptyState) {
    emptyState.style.display = visibleCount === 0 && paperRows.length > 0 ? "block" : "none";
  }
}

[searchInput, componentFilter, levelFilter].forEach((control) => {
  control?.addEventListener("input", filterPapers);
  control?.addEventListener("change", filterPapers);
});

copyButton?.addEventListener("click", async () => {
  if (!bibtex) return;
  const text = bibtex.textContent.trim();
  try {
    await navigator.clipboard.writeText(text);
    copyButton.textContent = "Copied BibTeX";
  } catch {
    copyButton.textContent = "Copy failed";
  }
  window.setTimeout(() => {
    copyButton.textContent = "Copy BibTeX";
  }, 1800);
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.01 }
);

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

const sections = Array.from(document.querySelectorAll("main section[id]"));
const navLinks = Array.from(document.querySelectorAll(".nav-links a[href^='#']"));

const navObserver = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;

    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${visible.target.id}`);
    });
  },
  { rootMargin: "-25% 0px -60% 0px", threshold: [0.15, 0.35, 0.6] }
);

sections.forEach((section) => navObserver.observe(section));

loadPapers();

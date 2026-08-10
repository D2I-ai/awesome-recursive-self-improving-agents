<div align="center">

# 递归自改进智能体之路

**基础、框架与未来方向**

Shuaiqi Liu\*, Zhengkai Lin\*, Yuxiang Zhang\*, Yuanyi Ren\*, Yue Wu, Yongbin Li, Zheng Wang, Zhihang Fu\*, Jieping Ye<br>
**Alibaba Group**

[![Paper](https://img.shields.io/badge/Paper-Preprint-blue)](https://www.preprints.org/frontend/manuscript/3c41418aa2e782b90ee5da995565ecac/download_pub)
[![Project Page](https://img.shields.io/badge/Project%20Page-GitHub.io-purple)](https://d2i-ai.github.io/awesome-recursive-self-improving-agents/index.zh-CN.html)
[![Awesome](https://awesome.re/badge.svg)](#持续维护的文献索引)
[![Contributions Welcome](https://img.shields.io/badge/Contributions-Welcome-brightgreen)](#贡献方式)

[English](./README.md) | **中文版**

[论文](https://www.preprints.org/manuscript/202608.0051)

本仓库是 **自改进的Agent系统** 的持续维护型文献地图：关注智能体如何把经验与评估反馈转化为对自身组件的持久更新，并进一步走向 **递归自改进的Agent系统**。

</div>

---

## 概览

本仓库配套综述论文 **“The Path to Recursive Self-Improving Agents: Foundation, Framework, and Future Directions.”**

论文研究能够把执行轨迹、训练信号、验证结果和其他反馈自主转化为自身持久状态更新的智能体系统。论文将智能体系统形式化为：

$$
x_t = (\mathcal{M}_t, \mathcal{H}_t, \mathcal{D}_t, \mathcal{T}_t, \mathit{Imp}_t)
$$

其中 \(\mathcal{M}\) 表示 基座模型，\(\mathcal{H}\) 表示 agent harness，\(\mathcal{D}\) 表示 agent数据系统，\(\mathcal{T}\) 表示 agent trainer，\(\mathit{Imp}\) 表示 改进机制。自改进过程可表示为：

$$
x_{t+1} = \mathit{Imp}_t(x_t)
$$

当 \(\mathit{Imp}_t\) 本身也属于可修改的系统状态，并能被更新为 \(\mathit{Imp}_{t+1}\) 时，系统便进入递归自改进：它不仅提升当前能力，也提升未来自改进的机制。

## 为什么这篇综述重要

论文的核心贡献包括四点：

- **形式化基础**：定义 agent-system self-improvement 与 recursive self-improvement，并提出从 人工改进 到 通用递归自改进 的五级能力分级。
- **统一框架**：把 基座模型、agent harness、agent数据系统、agent trainer 与 改进机制 建模为一个相互耦合、共同演化的系统。
- **现有工作分类体系**：系统梳理 harness自改进、数据系统自改进、trainer 自改进以及跨组件协同改进。
- **未来研究路线图**：提出长周期评测、可修改基础设施、受限域递归自改进 到 通用递归自改进、安全可控、人类专家与智能体协同改进等开放问题。

## 核心框架

![核心框架](assets/images/research_framework.png)

该统一框架回答两个关键问题：

- **什么可以被改进？** 自主改进的范围可以覆盖**模型**、**harness**、**数据系统**、**trainer**，最终也可能覆盖**改进机制**本身。
- **改进如何发生？** **改进机制**的流程包括：先诊断瓶颈，再提出候选修改，随后评估并选择候选，最后把被接受的修改整合为持久系统状态。

## L1–L5 能力分级

论文从改进闭环的自主性、改进机制是否可变、以及改进能力是否具备跨域泛化三个角度区分不同系统。

| 等级 | 类别名称 | 自主提出改进 | 自主实施改进 | 自主验证改进 | 改进改进的机制 | 领域泛化性 |
|---|---|---|---|---|---|---|
| **L1** | 人工改进 |  |  |  |  |  |
| **L2** | 辅助改进 | ✓ |  |  |  |  |
| **L3** | 固定机制的自改进 | ✓ | ✓ | ✓ |  |  |
| **L4** | 受限域递归自改进 | ✓ | ✓ | ✓ | ✓ |  |
| **L5** | 通用递归自改进 | ✓ | ✓ | ✓ | ✓ | ✓ |

- **L1 — 人工改进：** 这类智能体系统没有自主改进能力。系统以固定形式部署和运行，每次修改都需要由人开发与部署流程。
- **L2 — 辅助改进：** 这类系统可以提出候选修改或提供诊断证据，但人类仍负责验证并应用实质性修改。改进机制本身由人类维护，因此 L2 更接近自改进的前置阶段，而不是完整的自改进实例。
- **L3 — 固定机制的自改进：** 这类系统可以自主提出、应用并验证对运行组件的修改，例如 基座模型、agent harness、数据系统 或 trainer。然而，改进机制本身仍然固定或由外部维护。
- **L4 — 受限域递归自改进：** 这类系统不仅可以提出、验证并应用候选修改，还可以重写自身的改进机制，使改进过程具备自指性。该过程支持在限定的领域内持续长期进步。
- **L5 — 通用递归自改进：** L5 保留了 L4 的自主性、自指性和长期进步能力，同时能够把改进能力迁移到广泛且不断变化的任务领域，而不是局限于固定 benchmark 或受限的运行场景。


## 持续维护的文献索引

以下索引按本论文提出的分类体系组织相关工作，并将持续补充新的自改进与递归自改进智能体研究。

## 相关工作分类体系

![相关工作分类体系](assets/images/taxonomy.png)

### Agent Harness的自改进

Harness是智能体的执行层，决定模型能观察什么、能调用哪些动作，以及如何把观察和动作组织成任务工作流。Harness自改进就是把执行轨迹、评估反馈和失败信息转化为对 memory、skills、prompts、workflows、tools 或 executable scaffolds 的持久修改。

#### Memory模块的自改进

该类别的工作主要修改 experience memory、检索规则或 memory architecture，把执行轨迹转化为可复用、持久化的状态，并影响后续行为。

| 论文 | 链接 | 年份 | 级别 |
|---|---|---|---|
| Reflexion | [link](http://papers.nips.cc/paper_files/paper/2023/hash/1b44b878bb782e6954cd888628510e90-Abstract-Conference.html) | 2023 | L3 |
| SWE-Exp | [link](https://doi.org/10.48550/arXiv.2507.23361) | 2025 | L3 |
| ReasoningBank | [link](https://doi.org/10.48550/arXiv.2509.25140) | 2025 | L3 |
| FLEX | [link](https://doi.org/10.48550/arXiv.2511.06449) | 2025 | L3 |
| Decocted Experience | [link](https://doi.org/10.48550/arXiv.2604.04373) | 2026 | L3 |
| Live-Evo | [link](https://doi.org/10.48550/arXiv.2602.02369) | 2026 | L3 |
| Memory Transfer Learning | [link](https://doi.org/10.48550/arXiv.2604.14004) | 2026 | L3 |

#### Skill & Tool 模块的自改进

该类别的工作主要修改 skill library、tool library 或共享的 skill-tool ecosystem，供智能体检索、组合与复用。

| 论文 | 链接 | 年份 | 级别 |
|---|---|---|---|
| Tool Makers | [link](https://doi.org/10.48550/arXiv.2305.17126) | 2023 | L3 |
| ToolCoder | [link](https://doi.org/10.48550/arXiv.2502.11404) | 2025 | L3 |
| SkillWeaver | [link](https://doi.org/10.48550/arXiv.2504.07079) | 2025 | L3 |
| SkillX | [link](https://doi.org/10.48550/arXiv.2604.04804) | 2026 | L3 |
| Workflow-to-Skill | [link](https://api.semanticscholar.org/CorpusID:288984666) | 2026 | L3 |
| SkillFoundry | [link](https://doi.org/10.48550/arXiv.2604.03964) | 2026 | L3 |
| OpenSkill | [link](https://api.semanticscholar.org/CorpusID:288985167) | 2026 | L3 |
| SkillOS | [link](https://doi.org/10.48550/arXiv.2605.06614) | 2026 | L3 |
| SkillComposer | [link](https://api.semanticscholar.org/CorpusID:288976819) | 2026 | L3 |
| Programmatic Skill Networks | [link](https://doi.org/10.48550/arXiv.2601.03509) | 2026 | L3 |
| SkillAxe | [link](https://api.semanticscholar.org/CorpusID:289132024) | 2026 | L3 |
| SkillAudit | [link](https://api.semanticscholar.org/CorpusID:289209628) | 2026 | L3 |
| SkillGen | [link](https://doi.org/10.48550/arXiv.2605.10999) | 2026 | L3 |
| CoEvoSkills | [link](https://doi.org/10.48550/arXiv.2604.01687) | 2026 | L3 |
| SkillSmith | [link](https://api.semanticscholar.org/CorpusID:288861429) | 2026 | L3 |
| Confucius Code Agent | [link](https://doi.org/10.48550/arXiv.2512.10398) | 2025 | L3 |

#### Prompt & Context的自改进

该类别的工作主要修改 prompt programs、context playbooks、guideline 文档或 decision-rule library；其中少数工作还使 prompt optimizer 本身可变。

| 论文 | 链接 | 年份 | 级别 |
|---|---|---|---|
| Dynamic Cheatsheet | [link](https://doi.org/10.48550/arXiv.2504.07952) | 2025 | L3 |
| ACE (Context Engineering) | [link](https://doi.org/10.48550/arXiv.2510.04618) | 2025 | L3 |
| SCOPE | [link](https://doi.org/10.48550/arXiv.2512.15374) | 2025 | L3 |
| Reflective Context Learning | [link](https://doi.org/10.48550/arXiv.2604.03189) | 2026 | L3 |
| Unified Context Evolution | [link](https://api.semanticscholar.org/CorpusID:288861191) | 2026 | L3 |
| KACE | [link](https://api.semanticscholar.org/CorpusID:288855241) | 2026 | L3 |
| MEMO | [link](https://doi.org/10.48550/arXiv.2603.09022) | 2026 | L3 |
| SEEK-SQL | [link](https://openreview.net/forum?id=tgnbgt3Ctr) | 2026 | L3 |
| GEPA | [link](https://api.semanticscholar.org/CorpusID:280046245) | 2025 | L3 |
| Trace2Policy | [link](https://api.semanticscholar.org/CorpusID:289131919) | 2026 | L3 |
| Learning to Self-Evolve | [link](https://doi.org/10.48550/arXiv.2603.18620) | 2026 | L3 |
| SePO | [link](https://api.semanticscholar.org/CorpusID:288939508) | 2026 | L4 |

#### Harness编排层和多Agent拓扑结构的自改进

该类别的工作主要修改 trajectory orchestration、agent composition 或 workflow/communication topology，使harness能把算力用在不确定性更高的地方，并复用有用的中间结果。

| 论文 | 链接 | 年份 | 级别 |
|---|---|---|---|
| AgentGA | [link](https://doi.org/10.48550/arXiv.2604.14655) | 2026 | L3 |
| SWE-Replay | [link](https://doi.org/10.48550/arXiv.2601.22129) | 2026 | L3 |
| Log-Augmented Generation | [link](https://doi.org/10.48550/arXiv.2505.14398) | 2025 | L3 |
| FailureMem | [link](https://doi.org/10.48550/arXiv.2603.17826) | 2026 | L3 |
| EvoRepair | [link](https://doi.org/10.48550/arXiv.2605.30105) | 2026 | L3 |
| EvoAgent | [link](https://doi.org/10.48550/arXiv.2406.14228) | 2024 | L3 |
| ADAS | [link](https://doi.org/10.48550/arXiv.2408.08435) | 2024 | L3 |
| EvoMAS | [link](https://api.semanticscholar.org/CorpusID:285401259) | 2026 | L3 |
| EVOCHAMBER | [link](https://doi.org/10.48550/arXiv.2605.11136) | 2026 | L3 |
| MermaidFlow | [link](https://doi.org/10.48550/arXiv.2505.22967) | 2025 | L3 |
| EvoAgentX | [link](https://doi.org/10.48550/arXiv.2507.03616) | 2025 | L3 |
| EvoFlow | [link](https://doi.org/10.48550/arXiv.2502.07373) | 2025 | L3 |
| SEW | [link](https://doi.org/10.48550/arXiv.2505.18646) | 2025 | L3 |
| HyEvo | [link](https://doi.org/10.48550/arXiv.2603.19639) | 2026 | L3 |
| AdaptFlow | [link](https://doi.org/10.48550/arXiv.2508.08053) | 2025 | L3 |
| JudgeFlow | [link](https://doi.org/10.48550/arXiv.2601.07477) | 2026 | L3 |
| Lean4Agent / LeanEvolve | [link](https://api.semanticscholar.org/CorpusID:288985140) | 2026 | L3 |
| EvoFSM | [link](https://doi.org/10.48550/arXiv.2601.09465) | 2026 | L3 |
| ScoreFlow | [link](https://doi.org/10.48550/arXiv.2502.04306) | 2025 | L3 |
| Learning to Compose | [link](https://doi.org/10.48550/arXiv.2602.11114) | 2026 | L3 |
| Workflow-R1 | [link](https://doi.org/10.48550/arXiv.2602.01202) | 2026 | L3 |
| Learning to Hand Off | [link](https://doi.org/10.48550/arXiv.2605.19140) | 2026 | L3 |

#### 对Agent自身代码的自改进

该类别的工作主要修改 harness policy、runtime scaffold、agent的源代码 或 改进机制 本身，使被修改的智能体也成为产生后续改动的机制的一部分。

| 论文 | 链接 | 年份 | 级别 |
|---|---|---|---|
| Life-Harness | [link](https://doi.org/10.48550/arXiv.2605.22166) | 2026 | L3 |
| HarnessFix | [link](https://api.semanticscholar.org/CorpusID:288976639) | 2026 | L3 |
| Milkyway | [link](https://doi.org/10.48550/arXiv.2604.15719) | 2026 | L3 |
| Self-Harness | [link](https://api.semanticscholar.org/CorpusID:289097755) | 2026 | L3 |
| POLARIS | [link](https://doi.org/10.48550/arXiv.2603.23129) | 2026 | L3 |
| DemoEvolve | [link](https://doi.org/10.48550/arXiv.2605.24539) | 2026 | L3 |
| SIGA | [link](https://api.semanticscholar.org/CorpusID:289097462) | 2026 | L3 |
| HarnessForge | [link](https://api.semanticscholar.org/CorpusID:288861123) | 2026 | L3 |
| Agentic Harness Engineering | [link](https://doi.org/10.48550/arXiv.2604.25850) | 2026 | L3 |
| Meta-Harness | [link](https://doi.org/10.48550/arXiv.2603.28052) | 2026 | L3 |
| AgentFlow | [link](https://doi.org/10.48550/arXiv.2604.20801) | 2026 | L3 |
| Adaptive Auto-Harness | [link](https://api.semanticscholar.org/CorpusID:288862343) | 2026 | L3 |
| Group-Evolving Agents | [link](https://doi.org/10.48550/arXiv.2602.04837) | 2026 | L3 |
| Gödel Agent | [link](https://aclanthology.org/2025.acl-long.1354/) | 2025 | L4 |
| SICA | [link](https://doi.org/10.48550/arXiv.2504.15228) | 2025 | L4 |
| Darwin Gödel Machine | [link](https://openreview.net/forum?id=pUpzQZTvGY) | 2026 | L4 |
| Huxley-Gödel Machine | [link](https://doi.org/10.48550/arXiv.2510.21614) | 2025 | L4 |
| Red Queen Gödel Machine | [link](https://arxiv.org/abs/2606.26294) | 2026 | L4 |
| HyperAgents | [link](https://doi.org/10.48550/arXiv.2603.19461) | 2026 | L4 |
| Harnessing Agentic Evolution | [link](https://doi.org/10.48550/arXiv.2605.13821) | 2026 | L4 |
| EvoX | [link](https://doi.org/10.48550/arXiv.2602.23413) | 2026 | L4 |
| ANCHOR | [link](https://api.semanticscholar.org/CorpusID:288977221) | 2026 | L3 |
| Statistical Gödel Machine | [link](https://doi.org/10.48550/arXiv.2510.10232) | 2025 | L3 |
| ANNEAL | [link](https://doi.org/10.48550/arXiv.2605.16309) | 2026 | L3 |

### Agent数据系统的自改进

Agent数据系统管理训练与评测数据的生命周期，包括**数据生产**与**数据利用**，并将推理时的交互记录与trainer中的持久学习联系起来。

#### 环境合成与模拟

该类别的工作主要修改环境配置、模拟器，或用于构建环境的 tool/skill library，使训练环境与智能体不断演化的能力边界保持一致。

| 论文 | 链接 | 年份 | 级别 |
|---|---|---|---|
| EnvGen | [link](https://arxiv.org/abs/2403.12014) | 2024 | L3 |
| Adaptive Environment Generation | [link](https://arxiv.org/abs/2602.06366) | 2026 | L3 |
| ACCEL | [link](https://arxiv.org/abs/2203.01302) | 2022 | L3 |
| DRED | [link](https://arxiv.org/abs/2402.03479) | 2024 | L3 |
| SimWorld Studio | [link](https://arxiv.org/abs/2605.09423) | 2026 | L3 |
| DreamGym | [link](https://arxiv.org/abs/2511.03773) | 2025 | L3 |

#### 任务合成

该类别的工作主要修改任务指令、约束或评测标准，通过诊断反馈、固定质量控制信号或竞争性反馈保持任务的相关性与合适的难度。

| 论文 | 链接 | 年份 | 级别 |
|---|---|---|---|
| WebRL | [link](https://arxiv.org/abs/2411.02337) | 2024 | L3 |
| CoEvolve | [link](https://aclanthology.org/2026.acl-long.1055/) | 2026 | L3 |
| SeRL | [link](https://arxiv.org/abs/2505.20347) | 2026 | L3 |
| Self-CriTeach | [link](https://arxiv.org/abs/2509.21543) | 2026 | L3 |
| SAGE | [link](https://openreview.net/forum?id=b3dPMokQki) | 2026 | L3 |

#### 轨迹合成

该类别的工作主要修改解题轨迹、自博弈数据或偏好数据，用以记录智能体在给定任务上的经验。

| 论文 | 链接 | 年份 | 级别 |
|---|---|---|---|
| SPIN | [link](https://arxiv.org/abs/2401.01335) | 2024 | L3 |
| Arena Learning | [link](https://arxiv.org/abs/2407.10627) | 2024 | L3 |
| EVOLVE | [link](https://arxiv.org/abs/2502.05605) | 2025 | L3 |
| DNPO | [link](https://arxiv.org/abs/2502.05400) | 2026 | L3 |
| PLD | [link](https://arxiv.org/abs/2511.00091) | 2025 | L3 |

#### 验证与质量控制

该类别的工作主要修改决定哪些合成数据被保留的 judge model、validator 或质量过滤器。

| 论文 | 链接 | 年份 | 级别 |
|---|---|---|---|
| Self-Improving VLM Judges | [link](https://arxiv.org/abs/2512.05145) | 2025 | L3 |

#### 课程设计和自适应调整

该类别的工作主要修改决定生成数据如何被筛选与排序用于训练的 课程设计、任务分配或难度适配机制。

| 论文 | 链接 | 年份 | 级别 |
|---|---|---|---|
| AMC-TSI | [link](https://openreview.net/forum?id=GjoUJTfXiW) | 2026 | L3 |
| EvoCurr | [link](https://arxiv.org/abs/2508.09586) | 2025 | L3 |
| TRUSTEE | [link](https://arxiv.org/abs/2604.17739) | 2026 | L3 |
| Actor-Curator | [link](https://arxiv.org/abs/2602.20532) | 2026 | L3 |

#### 数据系统内部多模块协同改进

该类别的工作主要通过反馈循环耦合两个或更多 数据生产 / 数据利用 模块，使多个模块协同改进，而不是各自独立改进。

| 论文 | 链接 | 年份 | 级别 |
|---|---|---|---|
| Agent0-VL | [link](https://arxiv.org/abs/2511.19900) | 2025 | L3 |
| ACE (Adversarial Code Evolution) | [link](https://arxiv.org/abs/2605.16299) | 2026 | L3 |
| Agent-World | [link](https://arxiv.org/abs/2604.18292) | 2026 | L3 |
| Agent0 | [link](https://arxiv.org/abs/2511.16043) | 2025 | L3 |
| R-Zero | [link](https://arxiv.org/abs/2508.05004) | 2025 | L3 |

### Agent Trainer 自改进

Trainer 把智能体经验转化为持久模型更新。Trainer 自改进修改决定 supervision、optimization、infrastructure 或 trainer 改进机制本身的持久状态。

#### Inner-Loop Trainer Adaptation

该 loop 在同一训练 lineage 内修改持久 trainer 状态，例如 reward model、verifier、rubric memory、process reward model、batch-size controller 或 infrastructure configuration，而 改进机制 保持固定。

| 论文 | 链接 | 年份 | 级别 |
|---|---|---|---|
| ACE (Adversarial Code Evolution) | [link](https://arxiv.org/abs/2605.16299) | 2026 | L3 |
| AdaLRS | [link](https://openreview.net/forum?id=Rc489jcc30) | 2025 | L3 |
| ADMIRE | [link](https://arxiv.org/abs/2602.11524) | 2026 | L3 |
| ASL | [link](https://arxiv.org/abs/2510.14253) | 2025 | L3 |
| AI Training Manager | [link](https://arxiv.org/abs/2606.29871) | 2026 | L3 |
| ARBOR | [link](https://arxiv.org/abs/2606.03239) | 2026 | L3 |
| ARCO | [link](https://arxiv.org/abs/2606.21262) | 2026 | L3 |
| ATLAS | [link](https://arxiv.org/abs/2602.02709) | 2026 | L3 |
| CoNL | [link](https://arxiv.org/abs/2601.21464) | 2026 | L3 |
| COPUS | [link](https://arxiv.org/abs/2604.26687) | 2026 | L3 |
| CoVerRL | [link](https://arxiv.org/abs/2603.17775) | 2026 | L3 |
| DR Tulu | [link](https://arxiv.org/abs/2511.19399) | 2025 | L3 |
| DYNAMIX | [link](https://arxiv.org/abs/2510.08522) | 2025 | L3 |
| EARL | [link](https://arxiv.org/abs/2510.05943) | 2025 | L3 |
| ECHO | [link](https://arxiv.org/abs/2601.06794) | 2026 | L3 |
| EvoLM | [link](https://arxiv.org/abs/2605.03871) | 2026 | L3 |
| EPI | [link](https://arxiv.org/abs/2604.14010) | 2026 | L3 |
| EvoRubric | [link](https://arxiv.org/abs/2605.29847) | 2026 | L3 |
| EvoRubrics | [link](https://arxiv.org/abs/2606.23038) | 2026 | L3 |
| ICRL | [link](https://arxiv.org/abs/2605.15224) | 2026 | L3 |
| JarvisEvo | [link](https://arxiv.org/abs/2511.23002) | 2025 | L3 |
| KungFu | [link](https://www.usenix.org/conference/osdi20/presentation/mai) | 2020 | L3 |
| MagicGUI-RMS | [link](https://arxiv.org/abs/2601.13060) | 2026 | L3 |
| Mutual-Taught | [link](https://arxiv.org/abs/2506.06292) | 2025 | L3 |
| ONES | [link](https://arxiv.org/abs/2108.03645) | 2021 | L3 |
| Optimus | [link](https://doi.org/10.1145/3190508.3190517) | 2018 | L3 |
| Pollux | [link](https://www.usenix.org/conference/osdi21/presentation/qiao) | 2021 | L3 |
| Q-Evolve | [link](https://arxiv.org/abs/2606.07367) | 2026 | L3 |
| RFT-FM | [link](https://arxiv.org/abs/2605.04431) | 2026 | L3 |
| RLAC | [link](https://arxiv.org/abs/2511.01758) | 2025 | L3 |
| RLAnything | [link](https://arxiv.org/abs/2602.02488) | 2026 | L3 |
| RLAR | [link](https://arxiv.org/abs/2603.00724) | 2026 | L3 |
| RLCER | [link](https://arxiv.org/abs/2602.10885) | 2026 | L3 |
| RL Tango | [link](https://arxiv.org/abs/2505.15034) | 2025 | L3 |
| rStar-Math | [link](https://arxiv.org/abs/2501.04519) | 2025 | L3 |
| Rubick | [link](https://arxiv.org/abs/2408.08586) | 2024 | L3 |
| RubricEM | [link](https://arxiv.org/abs/2605.10899) | 2026 | L3 |
| SAVE | [link](https://arxiv.org/abs/2605.30888) | 2026 | L3 |
| SCORE | [link](https://arxiv.org/abs/2606.04507) | 2026 | L3 |
| Sia | [link](https://doi.org/10.1145/3600006.3613175) | 2023 | L3 |
| Skill-SD | [link](https://arxiv.org/abs/2604.10674) | 2026 | L3 |
| SPARD | [link](https://arxiv.org/abs/2604.07837) | 2026 | L3 |
| StepORLM | [link](https://arxiv.org/abs/2509.22558) | 2025 | L3 |
| STRIDE | [link](https://arxiv.org/abs/2605.18851) | 2026 | L3 |
| Evaluative Thinking | [link](https://arxiv.org/abs/2504.20157) | 2025 | L3 |
| UCOB | [link](https://arxiv.org/abs/2606.29502) | 2026 | L3 |
| UI-Genie | [link](https://arxiv.org/abs/2505.21496) | 2025 | L3 |
| URPO | [link](https://arxiv.org/abs/2507.17515) | 2025 | L3 |
| ZeroCoder | [link](https://arxiv.org/abs/2604.07864) | 2026 | L3 |

#### Outer-Loop Trainer Search through Experiments

该 loop 在有界实验之间修改 training script、reward code、fine-tuning recipe、optimizer code 或 training pipeline，由固定的 改进机制 提出并评估 trainer 候选。

| 论文 | 链接 | 年份 | 级别 |
|---|---|---|---|
| AIDE | [link](https://arxiv.org/abs/2502.13138) | 2025 | L3 |
| AIRA-Design | [link](https://arxiv.org/abs/2605.15871) | 2026 | L3 |
| Auto Research | [link](https://arxiv.org/abs/2605.05724) | 2026 | L3 |
| AutoTrainess | [link](https://arxiv.org/abs/2606.31551) | 2026 | L3 |
| CARD | [link](https://arxiv.org/abs/2410.14660) | 2024 | L3 |
| CliffSearch | [link](https://arxiv.org/abs/2604.01210) | 2026 | L3 |
| DiscoPOP | [link](https://arxiv.org/abs/2406.08414) | 2024 | L3 |
| LLM-RL HPO | [link](https://arxiv.org/abs/2606.03073) | 2026 | L3 |
| Eureka | [link](https://arxiv.org/abs/2310.12931) | 2023 | L3 |
| FT-Dojo | [link](https://arxiv.org/abs/2603.01712) | 2026 | L3 |
| Highway Reward Evolution | [link](https://arxiv.org/abs/2406.10540) | 2024 | L3 |
| LaRes | [link](https://proceedings.neurips.cc/paper_files/paper/2025/hash/21b5d3a17aa5525f30bfd2bc59ac3a48-Abstract-Conference.html) | 2025 | L3 |
| LERO | [link](https://arxiv.org/abs/2503.21807) | 2025 | L3 |
| LLM-ALSO | [link](https://arxiv.org/abs/2605.29293) | 2026 | L3 |
| LLMZero | [link](https://arxiv.org/abs/2606.18388) | 2026 | L3 |
| MLEvolve | [link](https://arxiv.org/abs/2606.06473) | 2026 | L3 |
| OptiCo | [link](https://aclanthology.org/2026.acl-long.1283/) | 2026 | L3 |
| POISE | [link](https://arxiv.org/abs/2603.23951) | 2026 | L3 |
| R\* | [link](https://proceedings.mlr.press/v267/li25v.html) | 2025 | L3 |
| REvolve | [link](https://arxiv.org/abs/2406.01309) | 2024 | L3 |
| RF-Agent | [link](https://arxiv.org/abs/2602.23876) | 2026 | L3 |
| RHyVE | [link](https://arxiv.org/abs/2604.28056) | 2026 | L3 |
| ROSKA | [link](https://arxiv.org/abs/2412.13492) | 2024 | L3 |
| Reward Synthesis | [link](https://arxiv.org/abs/2605.02073) | 2026 | L3 |
| Self-Evolving Recommender | [link](https://arxiv.org/abs/2602.10226) | 2026 | L3 |
| SMCEvolve | [link](https://arxiv.org/abs/2605.15308) | 2026 | L3 |
| TREX | [link](https://arxiv.org/abs/2604.14116) | 2026 | L3 |

#### Meta-Loop Improvement-Mechanism Evolution

该 loop 在连续多轮 trainer-improvement cycle 中修改持久的 改进机制 本身，例如 search runner、diagnostic harness、improvement model 或 improvement harness。

| 论文 | 链接 | 年份 | 级别 |
|---|---|---|---|
| AutoScientists | [link](https://arxiv.org/abs/2605.28655) | 2026 | L4 |
| Bilevel Autoresearch | [link](https://doi.org/10.48550/arXiv.2603.23420) | 2026 | L4 |
| DERL | [link](https://arxiv.org/abs/2512.13399) | 2026 | L4 |
| EvoTrainer | [link](https://arxiv.org/abs/2606.03108) | 2026 | L4 |
| GEAR | [link](https://arxiv.org/abs/2605.13874) | 2026 | L4 |
| Execution-Grounded AI Research | [link](https://arxiv.org/abs/2601.14525) | 2026 | L4 |

### 跨组件协同改进

单组件自改进往往不足以支持持续进步，因为系统瓶颈会随着组件能力变化而转移。**协同改进**关注多组件之间的反馈闭环。

#### Harness–Trainer 协同改进

改进后的 skills、tools、workflows 或 scaffolds 让训练信号更有效；训练反馈揭示下一步应修改哪些harness的组成模块。

| 论文 | 链接 | 年份 | 级别 |
|---|---|---|---|
| SkillRL | [link](https://doi.org/10.48550/arXiv.2602.08234) | 2026 | L3 |
| ARISE | [link](https://doi.org/10.48550/arXiv.2603.16060) | 2026 | L3 |
| SIA | [link](https://doi.org/10.48550/arXiv.2605.27276) | 2026 | L3 |
| HarnessForge | [link](https://api.semanticscholar.org/CorpusID:288861123) | 2026 | L3 |

#### Harness–Data 协同改进

Harness模块改变系统能生产或访问的数据；数据侧信号推动新的 skills、tools 或 harness code 的创建与改进。

| 论文 | 链接 | 年份 | 级别 |
|---|---|---|---|
| CODESKILL | [link](https://doi.org/10.48550/arXiv.2605.25430) | 2026 | L3 |
| VOYAGER | [link](https://doi.org/10.48550/arXiv.2305.16291) | 2023 | L3 |
| Live-SWE-agent | [link](https://doi.org/10.48550/arXiv.2511.13646) | 2025 | L3 |
| AutoHarness | [link](https://doi.org/10.48550/arXiv.2603.03329) | 2026 | L3 |

#### Data–Trainer 协同改进

更好的训练产生更好的数据，更好的数据进一步提升训练，在 environment/world model 与 policy 之间形成反馈闭环。

| 论文 | 链接 | 年份 | 级别 |
|---|---|---|---|
| WebEvolver | [link](https://arxiv.org/abs/2504.21024) | 2025 | L3 |
| VLAW | [link](https://arxiv.org/abs/2602.12063) | 2026 | L3 |

## 开放问题

论文提出了从当前自改进Agent系统走向可靠、通用递归自改进Agent系统（RSI Agent）的五个开放问题：

- **长周期真实生产环境评测**：评测集应检验反复自我修改是否在不断变化的工作负载、目标、预算、工具和环境中提升可靠性、鲁棒性、实用性、能力保持以及改进过程本身。
- **可观测、可扩展、可修改的训练和推理基础设施**：RSI 需要统一且智能体友好的表示来描述执行轨迹、训练记录、验证结果、版本历史和资源使用，使智能体能够观察、复现、比较并安全修改整个改进过程。
- **从受限递归自改进到通用递归自改进**：关键挑战是让改进机制能够跨领域迁移，同时避免把只适用于特定任务的策略错误迁移到新场景。
- **递归自我修改下的安全与可控**：系统需要能力组件可修改，同时通过更严格验证、持续监控、回滚版本、安全警报、事故日志和人类审查来保护合规组件。
- **人类专家与智能体协同改进**：危险场景需要智能体知道何时请求专家参与、选择合适交互方式、提供可解释证据，并把专家反馈转化为可复用改进资源。


## 贡献方式

本仓库希望成为社区持续维护的文献索引。

新增或修改论文条目时，请提供以下信息：

- **Title and link**
- **Venue and year**
- **Component**：Harness自改进、数据系统自改进、Trainer自改进 或 多个组成部分的协同改进
- **Subcategory**：例如 Memory、Task Synthesis、Inner-Loop Trainer Adaptation
- **L-level**：L1–L5
- **Domain**
- **Rationale**：给出 component 与 L-level 判定依据，最好引用论文原文证据

如果对已有论文的分级结果有争议，请发起commit，并给出以上信息、建议级别以及相关依据。

## 引用

如果本综述或仓库对你有帮助，请引用论文。

```bibtex
@article{202608.0051,
  doi = {10.20944/preprints202608.0051.v1},
  url = {https://www.preprints.org/manuscript/202608.0051},
  year = 2026,
  month = {August},
  publisher = {Preprints},
  author = {Shuaiqi Liu and Zhengkai Lin and Yuxiang Zhang and Yuanyi Ren and Yue Wu and Yongbin Li and Zheng Wang and Zhihang Fu and Jieping Ye},
  title = {The Path to Recursive Self-Improving Agents: Foundation, Framework, and Future Directions},
  journal = {Preprints}
}
```

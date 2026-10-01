# 青舟开发文档导航

英文技术名：`Qingzhou Development Guide Index`

文件性质：**Navigation / Reading Router（导航 / 阅读路由）**  
中文解释：**按当前任务类型，告诉执行者应该读哪些中央文件**

> 本文件**不是** Contract，**不是** Policy，**不是** Frozen 文件，**不是**新的规则正文。
>
> 本文件只回答一个问题：**当前任务应该读取哪些中央文件？**
>
> 本文件不复制其他文件正文，不产生新的 MUST / MUST NOT，也不改变任何既有文件的权威层级。若本文件与任何 Contract / Policy 表述不一致，以对应 Contract / Policy 为准。

## 0. 使用方式

1. 先看第 2 节的状态图例，确认你要读的文件是 `FROZEN`、`DRAFT`、`CANDIDATE` 还是 `HISTORICAL`；
2. 再看第 3 节的路由表，找到与当前任务最接近的任务类型；
3. 只读该任务类型列出的文件，不要为了“保险”而通读整个中央仓库；
4. 如果任务涉及公共语义，读取前必须先确认业务仓 `platform-lock.json` 锁定的 SHA（见第 3.4 节和第 4 节）。

**默认原则：普通业务任务不要求通读中央 Contract。**

## 1. 立即可用的中央入口

| 文件 | 作用 | 什么时候读 |
|---|---|---|
| `AGENTS.md` | 本仓最高层 Agent 行为规则 | 在本仓执行任何任务前 |
| `README.md` | 仓库定位、结构、三仓使用方式 | 第一次接触本仓时 |
| `PLATFORM_STATE.md` | 中央当前真实状态、已冻结项、OPEN 项 | 需要确认“现在到底冻了什么”时 |
| `DECISIONS_NEEDED.md` | 仍未冻结 / 部分解决的公共决策 | 任务可能触及未决公共语义时 |
| `CHANGELOG.md` | 中央变更记录 | 需要核对中央变更历史时 |
| `docs/GUIDE_INDEX.md` | 本文件：按任务读取导航 | 每次开始中央相关任务前 |

## 2. 状态图例（先确认权威层级，再决定是否可依赖）

| 状态 | 含义 | 能否作为强制依据 |
|---|---|---|
| `FROZEN` | 已冻结的权威内容 | 可以，且必须遵守 |
| `ACCEPTED` | 已批准的 ADR 等决策记录 | 可以，作为决策依据 |
| `ACTIVE` / `ACTIVE / EVOLVING` | 当前有效的治理或设计指南，可持续演进 | 可以，但**不是** Frozen Contract |
| `DRAFT` | 草稿，尚未冻结 | 不可以当作已发布 Contract |
| `CANDIDATE` | 候选稿，用于对比与设计输入 | 不可以，只能作为设计输入 |
| `HISTORICAL` / `PILOT` / 历史报告 | 历史证据、试点记录 | 只作证据，不代表当前权威 |

**重要区分（当前最容易误读的地方）：**

- Architecture V2.1：`FROZEN`；
- Numeric Contract v1 / Numeric Profiles v1 / Numeric Conformance Vector v1：`FROZEN`；
- Unit Contract v1 / Module-Capability Contract v1 / Workspace-Attempt-Record-Result Contract v1 / qzpack Contract v1：**`DRAFT`，尚未冻结**；
- Numeric Contract v1 的 `DRAFT` / `CANDIDATE` 历史文件：**保留为历史设计证据，不是当前权威**；
- `docs/governance/PRODUCT_DELIVERY_POLICY_V1.md`、`docs/governance/STANDARD_DEVELOPMENT_GUIDE_V0.1.md`、`docs/ui/UI_DESIGN_GUIDELINES_V0.1.md`：`ACTIVE` / `ACTIVE / EVOLVING` 治理与设计指南，**均不是 Frozen Contract**。

确认当前状态时，以 `PLATFORM_STATE.md` 的 “Current Contract release state” 为准，不要根据文件名猜测。

## 3. 按任务类型路由

### 3.1 普通业务 Bug / 页面调整 / 单标准专有业务问题

**主要读取：**

- 当前业务仓自己的 `AGENTS.md`；
- 当前业务仓自己的治理文件、`TASK_STATE` / `HANDOFF` 等状态文件；
- 涉及该标准的业务实现文件与测试。

**通常不需要：**

- 通读本仓全部中央 Contract；
- 修改任何中央文件。

> 判断法（见 `docs/governance/CHANGE_PROCESS.md` 第 3 节）：如果另外两套软件不存在、这个问题仍然需要解决，通常留在业务仓库。
>
> **只有**在确认该问题涉及公共语义（Numeric / Unit / Module-Capability / Record-Workspace-Result / qzpack / Conformance）时，才转到第 3.6 或第 3.7 节。

### 3.2 新增标准 / 修改标准（标准接入）

**读取：**

1. `docs/governance/STANDARD_DEVELOPMENT_GUIDE_V0.1.md` — 四阶段流程与标准支持状态；
2. 当前业务仓 `STANDARD_ISSUES_REGISTER.md`（标准问题与解释台账）；
3. 当前业务仓现行 Standard Mapping / Canonical 相关文件；
4. `docs/governance/PRODUCT_DELIVERY_POLICY_V1.md` — 产品交付级原则与 AI Contract Preflight；
5. **必要时**才读取相关 Frozen Contract。

**不要：**

- 另外发明第二套标准开发流程；
- 在 Mapping 中静默“修正标准”；
- 仅因标准进入标准库或 Calculator 可运行就宣布“正式支持”。

### 3.3 Numeric / Decimal / rounding / tolerance

**必须按锁定版本读取，不得直接使用中央 `main` 最新版：**

```text
读取业务仓 platform-lock.json
→ 取得 locked Qingzhou-contracts commit SHA
→ 读取该 locked SHA 下的 Frozen Numeric Contract
→ 提取适用的 MUST / MUST NOT
→ 再设计或编码
```

**需要读取（在 locked SHA 下）：**

- `contracts/numeric/NUMERIC_CONTRACT_V1_FROZEN.md`；
- `contracts/numeric/NUMERIC_PROFILES_V1_FROZEN.md`（涉及 Profile / 精度 / rounding 时）；
- `conformance/common/numeric/CONFORMANCE_VECTOR_V1_FROZEN.md`（涉及 Conformance 时）；
- `decisions/ADR-NUMERIC-V1.md`（需要决策背景时）。

**明确禁止：**

- 自动读取中央 `main` 的最新 Frozen Contract 并直接套用到业务仓；
- 把 `NUMERIC_CONTRACT_V1_DRAFT.md` / `NUMERIC_CONTRACT_V1_CANDIDATE.md` 当作当前权威；
- 在业务仓自行发明新的 Numeric 默认规则（例如 platform-wide 默认 p40 / p50 / HALF_UP）。

依据：`docs/governance/PRODUCT_DELIVERY_POLICY_V1.md` 第 12 节 AI Contract Preflight、`docs/governance/VERSIONING.md`。

### 3.4 桌面 UI / UI 评审

**读取：**

- `docs/ui/UI_DESIGN_GUIDELINES_V0.1.md`。

**必须明确：**

- 该文件状态为 **`ACTIVE / EVOLVING`**；
- 它**不是 Frozen Contract**，不冻结具体页面、导航结构或组件；
- 它不授权 UI 重构，也不允许 Presentation 层自行改变 Calculator / Domain Rule / Canonical 语义。

需要业务交付层上下文时，配合读取 `docs/governance/PRODUCT_DELIVERY_POLICY_V1.md`。

### 3.5 Excel / Windows 交付 / 产品交付闭环

**读取：**

- `docs/governance/PRODUCT_DELIVERY_POLICY_V1.md`（Windows-first、Excel 适配器定位、核心纵向闭环、Roadmap 状态）；
- 与任务相关的 Frozen Contract（例如 Excel 数值入口涉及 Numeric 时，按第 3.3 节走 locked SHA）。

**必须明确：**

- Excel 是 Import / Export Adapter，不得形成第二套业务算法；
- GUI / Excel / 未来平台必须进入同一 Canonical Input → 同一 Application → 同一 Domain / Calculator → 同一 Result；
- 结合业务仓 `REFERENCE_STANDARD_ROADMAP.md` 确认真实状态，不得假装已完全解决。

### 3.6 修改中央 Contract / 公共 Schema / Conformance

**读取：**

- `docs/governance/CHANGE_PROCESS.md` — 什么属于公共变化、RFC / ADR 分工、Breaking Change；
- `docs/governance/VERSIONING.md` — 版本、tag、业务仓锁定与升级流程。

**并按需读取：**

- `PLATFORM_STATE.md`（当前冻结状态）；
- `DECISIONS_NEEDED.md`（是否属于未决项）；
- `proposals/RFC/RFC_TEMPLATE.md`、`docs/adr/ADR_TEMPLATE.md`；
- 目标 Contract / Schema / Conformance 文件本身。

**不要：**

- 绕过 RFC / ADR 直接改变公共语义；
- 由单个业务项目的需要直接改写公共 Contract 含义。

### 3.7 标准专业知识 / Knowledge 沉淀

**读取：**

- `docs/governance/STANDARD_DEVELOPMENT_GUIDE_V0.1.md`（第 11～18 节：Opportunistic Capture、事实层级、知识状态与字段、知识位置）。

**不要：**

- 另外创建第二套 Knowledge Policy；
- 在本中央仓集中复制具体专业知识内容；
- 让知识文章成为 Calculator 的规则源或真值源。

具体知识内容属于业务仓（例如各业务仓 `knowledge/` 目录）。

### 3.8 只想知道“现在冻结了什么”

**读取：**

- `PLATFORM_STATE.md`（尤其 “Current Contract release state” 与 “已冻结” 部分）；
- `DECISIONS_NEEDED.md`（仍未冻结 / 部分解决项）；
- `docs/architecture/ARCHITECTURE_V2.1_FROZEN.md`（需要架构层权威表述时）。

### 3.9 想知道三个业务仓当前实现状态

**不要在本仓找。**

中央仓只保存**带日期的兼容性快照**，不是实时状态源。当前实现状态的权威来源是业务仓自己：

```text
业务仓 TASK_STATE / HANDOFF
+ 业务仓 platform-lock.json
+ 业务仓实际代码与测试
```

本仓 `compatibility/` 只提供公共架构兼容性摘要与历史接入证据，详见 `compatibility/README.md`。

## 4. 跨仓任务的固定读取顺序

任何可能涉及公共语义的任务，读取顺序固定为：

```text
1. 业务仓 AGENTS.md
2. 业务仓 platform-lock.json          ← 确定 locked SHA
3. 本仓 docs/GUIDE_INDEX.md            ← 确定本任务需要哪些中央文件
4. 本文件路由到的中央文件（在 locked SHA 下读取）
5. 业务仓 STANDARD_ISSUES_REGISTER.md  ← 标准问题
6. 业务仓现行 Mapping / Canonical / Rule / Calculator
```

**不得**跳过第 2 步直接读取中央 `main`。

## 5. 本文件不做的事

- 不复制其他文件正文；
- 不新增或修改任何 MUST / MUST NOT；
- 不改变任何文件的状态或权威层级；
- 不替代 `AGENTS.md`；
- 不替代 `docs/governance/CHANGE_PROCESS.md`；
- 不替代任何 Frozen Contract。

## 6. 维护规则

- 新增、移动或改变状态中央文件时，同步更新本导航；
- 若本导航与 `PLATFORM_STATE.md` 的状态描述冲突，以 `PLATFORM_STATE.md` 为准，并修正本文件；
- 本文件为 `ACTIVE / EVOLVING` 导航文件，可按需演进，不冻结。

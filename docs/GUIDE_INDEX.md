# 青舟中央开发文档导航

状态：**ACTIVE / EVOLVING**。本文件只回答“本任务读什么”，不另立 Contract 或决定正文。

## 1. 立即可用入口

先读本仓 [AGENTS](../AGENTS.md)，按需确认 [PLATFORM_STATE](../PLATFORM_STATE.md) 与 [DECISIONS_NEEDED](../DECISIONS_NEEDED.md)。中央架构、Contract、Schema 与 Conformance 的当前发布状态以 PLATFORM_STATE 为准；UI 指南和历史证据的适用身份按本导航、对应文件及历史索引确定；变更历史见 [CHANGELOG](../CHANGELOG.md)。

## 2. 状态与版本

### 2.1 读取方式

| 类型 | 从哪里读 | 用途与边界 |
|---|---|---|
| A：FROZEN / 已发布 Contract、Schema、Conformance | 业务仓 platform-lock.json 所锁 release/tag + 完整 commit SHA | 权威公共语义，不自动跟随中央 main |
| ACCEPTED ADR | 对应适用决定及其版本 | 决策依据，不由低层级指南覆盖 |
| B：ACTIVE / ACTIVE-EVOLVING 指南 | 中央当前已合并适用版本 | 公共方法与 UI 原则；不按 Contract lock 锁定，不构成 adoption，不修改 lock |
| DRAFT / CANDIDATE | 按任务明确选取 | 设计输入，不当作已发布 Contract；未被替代的草案仍保留原位 |
| HISTORICAL / PILOT / 历史报告 | [历史索引](history/README.md)及固定版本证据 | 追溯、冻结与采用依据；退出普通任务书路由不等于证据失效 |

指南不得覆盖业务仓 locked Frozen Contract，不得改变 Calculator、Rule、标准原文或业务真值。普通业务任务无需通读中央仓。

## 3. 按任务读取

### 3.1 普通业务 Bug / 页面调整 / 单标准专有业务问题

业务仓 AGENTS、当前 TASK_STATE / HANDOFF、相关源码与测试；确认公共语义问题才转中央

### 3.2 新增标准 / 修改标准（标准接入）

[标准开发指南](governance/STANDARD_DEVELOPMENT_GUIDE_V0.1.md)、业务仓 STANDARD_ISSUES_REGISTER、批准 Mapping / Canonical、[产品交付规则](governance/PRODUCT_DELIVERY_POLICY_V1.md)；相关 Frozen 按 lock 读取

### 3.3 Numeric / Decimal / rounding / tolerance

locked SHA 下 [Numeric Contract](../contracts/numeric/NUMERIC_CONTRACT_V1_FROZEN.md)、[Profiles](../contracts/numeric/NUMERIC_PROFILES_V1_FROZEN.md)、[Conformance](../conformance/common/numeric/CONFORMANCE_VECTOR_V1_FROZEN.md)，需要背景时读 [ACCEPTED ADR](../decisions/ADR-NUMERIC-V1.md)

### 3.4 桌面 UI / UI 评审

当前 [产品家族规格](ui/UI_PRODUCT_FAMILY_SPEC_V0.1.md)（A 决定唯一正文、待迁移约束与 OPEN）、[指南 v0.2](ui/UI_DESIGN_GUIDELINES_V0.2.md)（家族数值与实现方法）、[验收清单](ui/UI_ACCEPTANCE_CHECKLIST_V0.1.md)（按任务选动作），以及业务仓批准能力范围

### 3.5 Excel / Windows 交付 / 产品交付闭环

[产品交付规则](governance/PRODUCT_DELIVERY_POLICY_V1.md)、业务仓 Reference Standard Roadmap；Excel 是 Adapter，GUI / Excel 进入同一 Application / Domain，不建立第二套算法

### 3.6 修改中央 Contract / 公共 Schema / Conformance

[变更流程](governance/CHANGE_PROCESS.md)、[版本治理](governance/VERSIONING.md)、目标规范、PLATFORM_STATE、DECISIONS_NEEDED，必要时 [RFC 模板](../proposals/RFC/RFC_TEMPLATE.md) / [ADR 模板](adr/ADR_TEMPLATE.md)

### 3.7 标准专业知识 / Knowledge 沉淀

[标准开发指南](governance/STANDARD_DEVELOPMENT_GUIDE_V0.1.md)的知识沉淀部分；具体内容在业务仓，不让知识文章成为 Calculator 规则源

### 3.8 只想知道“现在冻结了什么”

PLATFORM_STATE 与 DECISIONS_NEEDED；需要架构约束时读 [Architecture V2.1](architecture/ARCHITECTURE_V2.1_FROZEN.md)

### 3.9 想知道三个业务仓当前实现状态

业务仓 TASK_STATE / HANDOFF、platform-lock、实际代码与测试；[compatibility](../compatibility/README.md)只是带日期快照

### 3.10 历史设计与证据

[历史索引](history/README.md)；[Phase 2](ui/phase2/README.md)仅为固定历史原型，不作当前实施或生产验收依据

UI 规格 A 类为 Owner 当前决定，B 类推荐，C 类未确认；不冻结像素或组件，不授权重构。业务能力的既有 Owner 批准继续有效，由业务仓按既有批准流程维护和变更，职责调整不授权 Agent 开放功能。历史 UI v0.1 与 Phase 2 旧断言不得覆盖当前规格。标准开发指南 v0.1 仍是 ACTIVE 指南，与历史 UI v0.1 是不同文件。

## 4. 跨仓顺序

1. 读业务仓 AGENTS 与 platform-lock，取得完整 locked SHA。
2. 用本导航选任务文件；Frozen 按 locked SHA，ACTIVE 按当前已合并适用版本。
3. 读业务仓问题台账、批准 Mapping、Canonical / Rule / Calculator 与任务相关证据。
4. 涉及公共语义不足时按变更流程提出 RFC / ADR，业务实现限于明确可逆范围。

不因读取 ACTIVE 指南修改 lock 或声称 Frozen adoption；也不因 lock 固定而拒读当前 ACTIVE 方法。未合并分支只供评审，不提前作为已发布依据；本次 UI 任务的具体授权记录见[规格 §1](ui/UI_PRODUCT_FAMILY_SPEC_V0.1.md#1-适用与分类)，通用变更流程见[CHANGE_PROCESS](governance/CHANGE_PROCESS.md)。

## 5. 维护

新增、移动或改变文件状态时同步导航，明确读取方式；允许纯历史证据，不机械归入 Frozen / ACTIVE。历史证据可用完整 commit + 路径定位。中央架构与 Contract、Schema、Conformance 的发布状态以 PLATFORM_STATE 为准；其他文件的适用状态以本导航及相应正文为准，规则以对应权威正文为准。本导航不复制禁止条款、产品完成度或长期任务清单。

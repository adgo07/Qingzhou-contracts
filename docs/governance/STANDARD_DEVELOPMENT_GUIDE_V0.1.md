# 青舟标准开发与知识沉淀指南 v0.1

英文技术名：`Qingzhou Standard Development & Knowledge Capture Guide v0.1`

状态：**ACTIVE / EVOLVING**  
中文解释：**当前有效、持续演进**  
文件性质：**Development Guide / Governance Guide（开发指南 / 治理指南）**

> **本文件不是 Frozen Contract。**
>
> 本文件不修改 Architecture V2.1 FROZEN、Numeric Contract v1 FROZEN、Numeric Profiles v1 FROZEN、Frozen Conformance Vector、任何 Calculator、业务 Rule、Schema、`platform-lock.json` 或标准算法。
>
> 本文件建立在 `docs/governance/PRODUCT_DELIVERY_POLICY_V1.md` 之下，用于回答两个统一问题：新标准如何进入软件，以及开发过程中的专业知识如何低成本顺手沉淀。二者由同一份指南统一处理，不拆成两套治理体系。

## 1. 定位与上位关系

| 文件 | 层级 | 状态 |
|---|---|---|
| `docs/architecture/ARCHITECTURE_V2.1_FROZEN.md` | 架构权威 | `FROZEN` |
| Frozen Contracts / Schema / Conformance Vector | 公共契约权威 | `FROZEN` |
| `docs/governance/PRODUCT_DELIVERY_POLICY_V1.md` | 产品交付治理 | `ACTIVE` |
| **本文件** | **标准开发流程 + 知识沉淀方法** | **`ACTIVE / EVOLVING`** |
| `docs/ui/UI_DESIGN_GUIDELINES_V0.1.md` | 桌面 UI 设计治理 | `ACTIVE / EVOLVING` |

本文件回答：

1. 一个新的国家标准 / 行业标准，**如何进入软件**（第 3～10 节）；
2. 开发过程中产生的专业知识，**如何低成本顺手沉淀**（第 11～18 节）。

本文件**不**回答：

- 公共 Contract 语义应该是什么（属于 RFC / ADR / Frozen Contract）；
- 具体标准的技术内容（属于业务仓 Mapping 与 Standard Issues Register）；
- 具体页面应该长什么样（属于 `UI_DESIGN_GUIDELINES_V0.1.md`）。

**本文件不复制** `PRODUCT_DELIVERY_POLICY_V1.md` 的全文；产品交付级原则以该 Policy 为准，本文件只细化“新标准开发流程”与“知识沉淀方法”。公共 Contract 变更流程以 `docs/governance/CHANGE_PROCESS.md` 与 `docs/governance/VERSIONING.md` 为准。

## 2. 适用范围

适用于 `qz.energy_quota`、`qz.equipment_efficiency`、`qz.carbon_accounting` 三个业务软件接入任何新标准或修改既有标准的软件支持范围。

本文件**不适用于**：

- 普通业务 Bug 修复；
- 纯 UI 调整；
- 不改变标准支持范围的内部重构。

上述任务留在业务仓库，不必进入本流程。

## 3. 新标准统一四阶段流程

任何新标准的软件接入统一采用四阶段：

```text
Stage A — 标准整理          （标准到底要求什么？）
   ↓
Stage B — 软件接入设计       （软件具体需要什么？）
   ↓
Stage C — 实现              （按依赖顺序落地）
   ↓
Stage D — 正式验收           （是否真的正式支持？）
```

阶段顺序不得颠倒。特别是：

- 不得在 Stage A 未完成前直接开发 Calculator；
- 不得在 Stage B 未完成前由 UI 发明业务规则；
- 不得在 Stage D 未通过前宣布“软件正式支持该标准”。

---

# Stage A — 标准整理

## 4. 目标

回答：

> **标准到底要求什么？**

Stage A 是事实整理阶段，**原则上不得直接开发 Calculator**。

## 5. 标准元数据

必须先建立或核对标准元数据，至少包括：

- 标准号（`standard_id`）；
- 标准名称（`standard_name`）；
- 年份 / 版本；
- 发布日期；
- 实施日期；
- 当前状态（现行 / 即将实施 / 已废止 / 被替代）；
- 替代关系（替代了谁 / 被谁替代）；
- 官方来源；
- 原始文件来源（文件存放位置与取得方式）；
- 适用范围；
- 关键术语。

对应 `PRODUCT_DELIVERY_POLICY_V1.md` 第 20.7 节的标准来源与版本元数据要求。若当前 Catalog / 数据库 / Canonical Schema 尚无全部字段，本条先作为治理要求，**不得**为了满足本条而在治理任务中修改数据库或 Schema。

## 6. Standard Mapping

必须先建立或核对 Standard Mapping。Mapping 至少覆盖：

| 类别 | 内容 |
|---|---|
| 适用范围 | 标准管什么、不管什么 |
| 分类条件 | 分类 / 分级的判据 |
| 用户输入 | 需要用户提供什么 |
| 必填字段 | 无条件必填 |
| 条件字段 | 满足条件时必填 |
| 自动推导字段 | 由其他数据推导得到 |
| 单位 | 每个量的单位与换算 |
| 参数 | 系数、限值、表格参数 |
| 表格 | 查表 / 插值依据 |
| 公式 | 计算式与其编号 |
| 修正规则 | 修正 / 折算 / 校正 |
| 判定规则 | 等级 / 结论判据 |
| 边界 | 阈值与边界行为 |
| 不适用 | 何时不适用该标准 |
| 无法判定 | 何时无法得出结论 |
| 最终输出 | 最终应产出什么 |
| 来源定位 | 条款号 / 表号 / 公式号 / 来源 |

**Mapping 必须可追溯**：每一项都应能指回标准的条款 / 表 / 公式。

## 7. Standard Issues Register

在 Mapping 过程中发现疑似以下问题时：

`TYPO`（疑似笔误）、`AMBIGUITY`（歧义）、`CONFLICT`（条款 / 公式 / 表格冲突）、`MISSING`（标准未规定）、`TERM`（术语或现实对象对应不清）、`REFERENCE`（引用标准 / 版本 / 外部依据问题）、`IMPLEMENTATION`（软件实现解释问题）

**必须**进入当前业务仓的 `STANDARD_ISSUES_REGISTER.md`（中文标题：标准问题与解释台账）。

**不得**在 Mapping 中静默“修正标准”。

台账字段、状态（`OPEN` / `PROVISIONAL` / `RESOLVED`）、稳定编号规则（`ECQ-STD-*` / `EQP-STD-*` / `GHG-STD-*`）与联动链路，以 `PRODUCT_DELIVERY_POLICY_V1.md` 第 20 节为准，本文件不重复定义。

必须保持三个层次分开：

1. 标准原文事实；
2. 技术判断；
3. 软件实现决定。

**Stage A 出口条件：** 标准元数据齐备，Mapping 可追溯，发现的疑似问题已全部登记，Stage A 未擅自开发 Calculator。

---

# Stage B — 软件接入设计

## 8. 目标

回答：

> **软件为了实现这个标准具体需要什么？**

Stage B 基于**已审核的 Mapping**（不是基于对标准的记忆或猜测）确定软件侧设计。

## 9. 软件侧设计要素

至少确定：

- Canonical Input；
- 用户输入；
- 自动推导数据；
- 类型；
- 单位；
- 参数；
- 校验；
- 分类；
- Rule；
- Calculator 输入输出；
- 不适用（NOT_APPLICABLE）语义；
- 无法判定（UNDETERMINED）语义；
- 最终结论；
- Record；
- UI；
- Excel；
- 标准库展示（标准元数据如何在标准库中呈现）；
- 结果解释；
- 来源追踪（Traceability）。

### 9.1 最小必要性检查

Stage B 拟新增任何用户字段、选择项、页面、阻断规则或公共抽象前，先检查：

1. 标准是否明确要求？
2. 正式计算或判定是否必须？
3. 软件是否无法从已有数据可靠自动获得或推导？
4. 如果不增加它，当前真实任务是否无法正确完成？

如果以上均为 `NO`，默认不增加。

如果理由只是“更完整”“更方便追溯”“数据可能更准确”或“以后可能有用”，优先考虑后台记录、`Warning`、`Info`、Knowledge 或技术详情，而不是新增普通用户必填项或阻断流程。

> 标准接入目标是实现完成评价、分析或核算所需要的业务规则，不要求把标准全文或所有辅助内容全部数字化为软件字段和功能。

## 10. 必须检查的公共约束

Stage B 必须检查：

- 相关 **Frozen Contract**（按业务仓 `platform-lock.json` 锁定的 SHA 读取，见 `docs/GUIDE_INDEX.md` 第 3.3 节）；
- **Numeric Profile**（representation / precision / rounding / comparison / tolerance）；
- **Unit / Quantity 状态**（注意 Unit Contract v1 目前仍为 `DRAFT`，Quantity Schema 未冻结，见 `PLATFORM_STATE.md`）；
- **Standard Issues**（是否存在与本次设计相关的已登记问题）。

若发现公共 Contract 无法表达真实业务需求，按 `PRODUCT_DELIVERY_POLICY_V1.md` 第 13 节分类处理；属于 **CENTRAL CONTRACT GAP** 时，必须形成业务证据并返回 `Qingzhou-contracts` 进入中央治理，**不得**在业务仓自行创造另一套“中央规则”。

## 11. Stage B 同时必须设计测试

Stage B 同时设计测试，至少覆盖：

- 典型测试；
- 每个等级 / 分类各至少一个；
- 边界案例；
- `T−δ` / `T` / `T+δ`（适用时）；
- 错误输入；
- 缺失输入；
- 不适用；
- 无法判定；
- 多条件组合；
- Standard Issue 相关案例。

并确定少量 **Golden Case Candidate**。

Golden Case 必须来源于标准事实与业务证据，**不得**由实现代码反向自动生成后直接当作权威预期（见 `CHANGE_PROCESS.md` 第 6 节）。

**Stage B 出口条件：** Canonical Input / Rule / Calculator 输入输出 / 不适用 / 无法判定 / 最终结论均已明确，测试设计与 Golden Case Candidate 已确定，公共约束已核对，不存在未处理的 CENTRAL CONTRACT GAP。

---

# Stage C — 实现

## 12. 推荐依赖顺序

```text
标准事实 / Canonical
   ↓
Rule
   ↓
Calculator
   ↓
Application
   ↓
Windows UI
   ↓
Record
   ↓
Excel Adapter
```

**不得：**

- UI 先发明业务规则；
- Excel 再实现第二套算法。

## 13. 单一业务内核原则

GUI / Excel / 未来平台必须尽量进入：

```text
同一 Canonical Input
   → 同一 Application
   → 同一 Domain / Calculator
   → 同一 Result
```

对于同一组业务输入，GUI 与 Excel 的 Calculator 输入语义、等级、结论、状态和核心业务结果必须一致；展示格式可以不同。

## 14. UI 约束

UI 继续遵守 `docs/ui/UI_DESIGN_GUIDELINES_V0.1.md`（`ACTIVE / EVOLVING`，不是 Frozen Contract）。

当前 Windows Desktop：

**Windows-first**。

UI 可以重组展示层信息，但**不得**自行改变 Calculator、Domain Rule、Canonical Input / Result 语义、Numeric Contract、标准解释、Golden Case 或 Conformance 业务结果。

## 15. 实现期间的 Standard Issue 联动

实现过程中若发现新的标准问题：

> **必须先登记 Standard Issue，再完成正式实现说明。**

不得先静默修改 Mapping、Calculator 或测试，事后再补理由。

影响正式业务结果的问题必须可追踪：

```text
Standard Issue
→ Software Decision
→ Rule / Calculator
→ Test / Golden Case
```

---

# Stage D — 正式验收

## 16. 目标

回答：

> **软件是否真的正式支持这个标准？**

## 17. 验收检查清单

正式支持一个标准前，至少检查：

- 标准来源；
- Mapping；
- Standard Issues；
- Rule；
- Calculator；
- Golden；
- 边界测试；
- Conformance；
- 回归；
- Windows UI；
- Record；
- 历史查看；
- Excel（按当前 Product Delivery Policy 阶段要求）；
- 标准依据；
- 结果解释；
- Traceability。

## 18. 不得自动宣布支持

**不得**因为以下任一情况就自动宣布软件正式支持该标准：

- 标准出现在标准库；
- Calculator 可以运行；
- 某个单元测试通过。

正式验收必须区分并分别通过（对应 `PRODUCT_DELIVERY_POLICY_V1.md` 第 4 节）：

- **业务层**：用户能完成真实业务任务；
- **计算层**：输入、规则、计算、边界、结果正确；
- **产品层**：页面、导航、记录、历史查看和错误提示可用；
- **Windows 交付层**：Windows 环境可实际运行。

**Stage D 出口条件：** 上述检查项均有可核验证据，且状态已如实推进到 `SUPPORTED`。

---

# 标准支持状态

## 19. 五种统一状态

| 状态 | 中文解释 | 含义 |
|---|---|---|
| `CATALOG_ONLY` | 仅目录 | 仅完成标准目录、基本来源和元数据 |
| `MAPPING` | 映射整理中 | 正在完成 Mapping / Issues / 业务整理 |
| `READY_FOR_IMPLEMENTATION` | 可实现 | Mapping、主要输入输出和业务规则已明确，可以进入实现 |
| `IMPLEMENTED` | 已实现 | 核心业务实现存在，但完整产品闭环尚未正式通过验收 |
| `SUPPORTED` | 正式支持 | 完整要求通过独立验收，软件正式支持 |

## 20. 推进规则

正常推进：

```text
CATALOG_ONLY
→ MAPPING
→ READY_FOR_IMPLEMENTATION
→ IMPLEMENTED
→ SUPPORTED
```

- **不得无证据跳级。**
- **允许因发现重大问题回退状态**（例如 `IMPLEMENTED → MAPPING`）。

每个状态必须能指向真实证据（Mapping 文件、Issue 编号、测试、Golden Case、验收报告）。状态与 `PRODUCT_DELIVERY_POLICY_V1.md` 第 15 节 `REFERENCE_STANDARD_ROADMAP.md` 的 `DONE` / `PARTIAL` / `NOT STARTED` / `BLOCKED` 是不同维度，两者不得互相冒充。

## 21. 状态记录位置

标准支持状态的具体记录位置由业务仓根据自身现状决定（例如业务仓 Roadmap 或标准目录文件）。中央仓**不要求**三个业务仓使用完全相同的物理目录结构或完全相同的文件位置。

---

# 扩标准与架构验证

## 22. 第二个及后续标准承担架构验证任务

保留并继承 `PRODUCT_DELIVERY_POLICY_V1.md` 第 11 节的现有原则：新增第二、第三个标准时，理想情况主要新增：

- 标准事实；
- Mapping；
- Rule；
- Calculator；
- 配置；
- 必要 UI metadata；
- 测试。

## 23. 架构验证暂停判断

如果每增加一个标准都必须重新开发：

- AppShell；
- 标准库；
- Record 系统；
- Excel 框架；
- Calculator framework；
- 数据库基本结构；

**必须暂停判断：**

> 是这个标准真实特殊，还是现有软件抽象设计错误？

**不得**为了“扩标准”持续复制整个软件。

判断结论应记录为设计说明或 RFC 输入；若结论指向公共抽象问题，返回 `Qingzhou-contracts` 进入中央治理，不在业务仓私自发明长期公共规则。

---

# 知识沉淀

## 24. Opportunistic Capture（顺手沉淀）

知识沉淀属于：**随开发顺手沉淀**。

它：

- **不是**独立项目；
- **不是**每个任务必须交付固定数量文章；
- **不得**为了数量制造知识条目；
- **不得**因此阻塞主任务或明显扩大任务范围。

## 25. 任务结束前的唯一检查

每个正式标准开发任务结束前，只需要检查一个问题：

> **本任务是否产生了有长期价值、且已有证据支持的专业知识？**

- 如果**没有**：允许记录 `Knowledge capture：无。`
- 如果**有**：通常只顺手形成 **1～3 条 `DRAFT` Knowledge**。

## 26. 什么知识值得沉淀

包括但不限于：

- 专业概念解释；
- 参数和数据如何取得；
- 计算和判定解释；
- 标准理解和争议；
- 工程实际操作建议；
- 常见问题；
- 典型错误；
- 软件字段如何理解；
- 现场资料通常在哪里取得。

## 27. 知识必须区分事实层级

任何知识内容必须清楚区分：

1. **标准原文事实**；
2. **官方资料**；
3. **专业技术解释**；
4. **工程实践建议**。

**禁止：**

- 将**技术判断**写成**标准明文**；
- 将**工程经验**写成**强制标准要求**。

只要没有发布机构正式解释，不得因为软件已经采用某种处理方式就写成“官方确认”。

## 28. 知识最小状态

只定义四种状态：

| 状态 | 含义 |
|---|---|
| `DRAFT` | 开发过程中产生，未经正式发布审核 |
| `REVIEWED` | 已经完成专业审核 |
| `PUBLISHED` | 允许随正式软件知识库提供给用户 |
| `RETIRED` | 知识已失效或被新版本替代，仅保留历史 |

- 新知识默认：**`DRAFT`**。
- **不得**让 AI 新生成的知识自动成为 `PUBLISHED`。

## 29. 知识最小字段

当前只要求：

- 标题；
- 状态；
- 类型；
- 适用标准；
- 来源；
- 正文；
- 关联 Standard Issue（如有）。

**当前明确不做：**

- 不建立复杂 Schema；
- 不建立知识数据库；
- 不建立向量数据库；
- 不建立 AI Chat / RAG 系统。

## 30. 知识资产的位置

**中央仓只定义公共方法。**

具体专业知识**不得**集中复制到 `Qingzhou-contracts`。具体内容应位于对应业务仓：

| 业务仓 | 知识范围 |
|---|---|
| ECQuota-Insight | 能耗限额专业知识 |
| EquipEffi | 设备能效专业知识 |
| GHGTOOL | 碳核算专业知识 |

允许业务仓建立 `knowledge/` 目录；**具体目录结构由业务仓根据现状决定**。中央仓**不得**要求三个业务仓使用完全相同的物理目录结构。

## 31. 知识库不是业务真值源

必须明确，以下**是两条不同链路**：

```text
链路一（业务真值）：
Standard / Canonical Rule → Calculator → Result

链路二（知识解释）：
Standard / Issue / Rule → Knowledge explanation → User
```

因此：

- 知识文章**可以解释** Calculator；
- 知识文章**不得**作为 Calculator 的权威数据源或规则源；
- **不得**运行时解析 Markdown 知识文章来决定业务结果。

## 32. 未来软件知识中心（长期方向，不是当前任务）

本指南可以记录长期方向。未来可支持：

- 知识搜索；
- 分类；
- 标准关联；
- 字段帮助；
- “为什么是这个结果”；
- FAQ；
- 本地全文搜索；
- 后续 AI 助手。

但：

> **本任务不实现任何上述软件功能。**

本节只是长期方向记录，不构成开发授权，也不产生新的 Contract 义务。

---

# 边界与结论

## 33. 本指南不做的事

本指南**不**：

- 修改任何 Frozen Contract 的业务语义；
- 修改 Architecture V2.1 FROZEN、Numeric Contract v1、Numeric Profiles v1、Frozen Conformance Vector；
- 修改 Calculator、业务 Rule、Schema、标准算法或 `platform-lock.json`；
- 修改三个业务仓代码；
- 把 `DRAFT` / `CANDIDATE` / `HISTORICAL` / `PILOT` 标记为 `FROZEN`；
- 建立知识数据库、向量数据库或 AI / RAG 系统；
- 授权 UI 重构、数据库迁移或第二标准开发。

本指南**不替代**：

- `docs/governance/CHANGE_PROCESS.md`（公共 Contract 变更流程）；
- `docs/governance/VERSIONING.md`（版本与锁定）；
- `docs/governance/PRODUCT_DELIVERY_POLICY_V1.md`（产品交付治理）；
- `docs/ui/UI_DESIGN_GUIDELINES_V0.1.md`（桌面 UI 设计）；
- 任何 Frozen Contract。

## 34. v0.1 结论

```text
Standard Development Guide 状态：
ACTIVE / EVOLVING

是否 Frozen Contract：
NO

新标准统一阶段数：
4（Stage A/B/C/D）

标准支持状态数：
5（CATALOG_ONLY / MAPPING / READY_FOR_IMPLEMENTATION / IMPLEMENTED / SUPPORTED）

是否允许无证据跳级：
NO

是否允许因重大问题回退状态：
YES

Standard Issue 是否必须先登记再实现：
YES

是否允许在 Mapping 中静默修正标准：
NO

UI 是否可以先发明业务规则：
NO

Excel 是否可以实现第二套算法：
NO

Stage A 是否可以直接开发 Calculator：
NO

知识沉淀是否为独立项目：
NO

知识沉淀是否要求固定交付数量：
NO

新知识默认状态：
DRAFT

AI 生成知识是否可自动成为 PUBLISHED：
NO

当前是否建立知识数据库 / 向量库 / RAG：
NO

专业知识是否集中复制到中央仓：
NO

知识文章是否可作为 Calculator 规则源：
NO

是否允许运行时解析 Markdown 决定业务结果：
NO

本指南后续是否允许演进：
YES
```

## 35. 维护规则

- 本文件为 `ACTIVE / EVOLVING`，可按需演进为 `v0.2`、`v0.3`；
- 演进时不得借机修改任何 Frozen Contract 语义；
- 若本文件与 Frozen Contract 冲突，以 Frozen Contract 为准，并修正本文件；
- 若本文件与 `PRODUCT_DELIVERY_POLICY_V1.md` 的产品级原则冲突，以该 Policy 为准；
- 新增中央文件时，同步更新 `docs/GUIDE_INDEX.md`。
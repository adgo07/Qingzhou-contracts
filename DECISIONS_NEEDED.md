# DECISIONS_NEEDED

本文件只记录**目前没有足够依据替用户冻结**的公共决策。

原则：

- 未决事项不应被单个业务项目私自永久定型；
- 可以做可逆试验；
- 需要冻结时通过 RFC/ADR；
- 已决定事项应从本文件移除并进入正式 Contract/ADR。

---

## D-001 Transcendental Numeric reference procedure

**优先级：高**

涉及：`sqrt`、`ln`、fractional `pow`、未来可能的 `exp`。

尚未冻结：

- reference algorithm / library；
- 内部工作精度；
- 函数输出精度；
- tolerance 的业务含义；
- 边界判定前是否允许 normalization；
- Python Decimal50 与未来 Kotlin/Swift/ArkTS 实现如何做最终一致性验收。

建议下一步：以 EquipEffi 离心泵真实公式建立 numerical conformance vectors，再决定 reference procedure。

---

## D-002 qzpack signing and trust model

**优先级：高，但当前不阻塞业务开发**

尚未冻结：

- 签名算法；
- signing key 保存位置；
- 公钥轮换；
- key id 格式；
- 离线撤销列表格式与刷新策略；
- 开发包与正式发布包是否使用不同 trust root。

建议先冻结 Manifest/Hash Contract，签名实现后置到 qzpack prototype。

---

## D-003 First public Contract release naming

**优先级：中**

候选：

- `contracts-v0.1.0`：表示 Contract 仍在试点；
- `contracts-v1.0.0`：表示四组 Contract 已正式稳定。

当前建议：初始化与 DRAFT 阶段不要伪称 v1.0 stable；三个业务仓完成 QZC-A01 后，可考虑把共同锁定的 `0cd74d783fa23add6dc881b408a8c8ba8503f8e8` 标记为首个 pre-1.0 release；待四组 Contract 通过三个代表标准试点后再发布 `contracts-v1.0.0`。

需用户最终确认 tag/release 命名习惯。

---

## D-004 Conformance Vector v1 exact schema

**优先级：高**

已经冻结的是“必须有跨平台 Conformance”；尚未冻结最终 JSON Schema。

待代表标准共同验证字段：

- intermediate results 是否全部 required；
- tolerance 是否案例级、字段级或 Numeric Contract 级；
- expected warnings/problems 的标准结构；
- source/provenance 的最小必需字段；
- Level 3 专用 Calculator 的 trace 粒度；
- platform-specific expected 是否允许存在（原则上应尽量避免）。

建议三个试点先形成 candidate vectors，再冻结 Schema。

---

## D-005 Recordable business outcomes by module

**优先级：中**

公共 Contract 已区分 Workspace / Attempt / Record / EXECUTION_ERROR，但以下规则必须由各业务规范分别确认：

- `qz.energy_quota` 哪些“无法判定/不适用/输入不足”状态可以正式保存；
- `qz.equipment_efficiency` 的 OUT_OF_STANDARD_SCOPE / INSUFFICIENT_DATA / INVALID_INPUT 哪些属于可保存业务结果；
- `qz.carbon_accounting` 当前致命校验失败不生成正式 Record 的边界。

不要在公共仓库替三个业务模块统一成同一个状态表。

---

## D-006 qzpack granularity

**优先级：中低**

允许：

- 单标准一个包；
- 强关联标准组一个包；
- 基础公共 reference-data 独立包。

尚未冻结如何划分。

建议通过 GB 29446、离心泵、GB/T 32151.34 三个 prototype 后再决定推荐粒度，不强制所有标准一标准一包。

ECQuota 现有 `.uebench` manifest/hash/signature/增量包能力应作为 prototype 输入，但不得直接视为公共 qzpack Contract 已实现。

---

## D-007 `.qzproj` physical format

**优先级：低（当前）**

已冻结：平台无关、不可依赖 Python pickle/UI state/Windows path，定位为交换与归档。

尚未冻结：

- ZIP 容器最终目录；
- attachment manifest；
- 加密；
- 签名；
- compression；
- schema migration。

当前不要提前实现。

---

## D-008 Monorepo final decision

**优先级：低（当前）**

Monorepo 是长期优先候选，但不是 V2.1 的强制目标。

重新评估触发条件：

- 公共 implementation 已稳定；
- Suite 开始正式开发；
- 多仓协作成本明显增大；
- 三个模块已经满足统一 Contract 基线。

---

## D-009 Shared native core

**优先级：低（当前）**

Rust/C++/其他 Native Core 暂不实施。

只有多语言 Rule Executor 维护成本、Numeric 一致性成本或性能出现真实瓶颈时重新评估。

---

## D-010 Common implementation extraction timing

**优先级：中低**

当前先统一 Contract，不立刻把 ECQuota/GHGTOOL/EquipEffi 中看起来相似的 Decimal/Unit 代码强行抽成一个包。

原则：

> 先统一语义，再观察至少两个项目稳定实现，最后抽公共代码。

何时发布第一个 `qingzhou-platform` 公共 Python package 尚未冻结。

---

## D-011 Carbon quantity / unit / stoichiometric coefficient boundary

**优先级：高，来源：GHGTOOL QZC-A01**

需要明确：

- `tC` 与 `tCO₂` 是单位、quantity type，还是二者共同定义业务量；
- 44/12、44/16 等应如何表达为标准公式/化学计量系数；
- 这些系数不得被误归类为普通 unit conversion；
- Canonical、Unit Contract、Result/Trace 应如何记录 quantity type 与 coefficient provenance。

建议在 GB/T 32151.34 Numeric/Unit 试点中形成候选结构，不先修改公共 Unit Contract 正文。

---

## D-012 Numeric tolerance / `is_close` vs exact comparison

**优先级：高，来源：GHGTOOL QZC-A01**

Architecture V2.1 与 Numeric DRAFT 默认强调 exact/full-value comparison，但现有业务实现可能存在 `is_close` / tolerance 用于工程比较、查表、测试或数值稳定性。

需要区分：

- 正式等级/限值边界是否允许 tolerance；
- 算法内部数值稳定性 tolerance；
- 测试断言 tolerance；
- 查表/插值定位 tolerance；
- 标准明文规定的容差。

不得把一个全局 epsilon 同时用于这些不同语义。

建议 ECQuota 精确边界、EquipEffi 非线性函数、GHGTOOL 现有 `is_close` 三个试点共同验证后再冻结。

---

## D-013 Runtime Presentation State vs cross-platform Business Workspace

**优先级：中，来源：GHGTOOL QZC-A01**

已冻结原则：Qt/Tk 控件状态、objectName、currentIndex、Windows path 等不得成为跨平台 Workspace Contract 的业务真值。

仍需明确：

- 现有 runtime `form_state` 与未来 Business Workspace 如何共存；
- 是否需要 migration/adapter；
- presentation_state 是否可以作为平台私有附属字段；
- `.qzproj` 导出时如何只保留平台无关业务状态。

当前不要求 GHGTOOL 返工已有 projects.sqlite；先在 Workspace Contract 试点中定义边界。

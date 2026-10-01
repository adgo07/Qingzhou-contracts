# DECISIONS_NEEDED

本文件只记录**目前仍没有足够依据冻结的公共决策或已部分解决但仍有 OPEN 残项的决策**。

原则：

- 未决事项不应被单个业务项目私自永久定型；
- 可以做可逆试验；
- 需要冻结时通过 RFC/ADR；
- 已完全解决事项进入正式 Contract/ADR，不再作为 OPEN 决策维护；
- PARTIALLY RESOLVED 必须明确区分“已冻结部分”与“仍 OPEN 部分”。

## QZC-N01 Gate 5 已解决事项

以下 Numeric 决策已经在 `decisions/ADR-NUMERIC-V1.md` 和 Numeric Contract v1 中正式冻结，不再作为 OPEN 项：

- **D-004 Conformance Vector v1 Numeric schema model**：`RESOLVED / FROZEN` — Common Core + category-specific fields；expected outcome 按类别条件要求；
- **D-012 Numeric tolerance / exact comparison**：`RESOLVED / FROZEN IN NUMERIC CONTRACT v1` — full-value exact default、purpose-specific tolerance、禁止 global epsilon、numerical/business conformance 分离。

---

## D-001 Transcendental Numeric reference procedure

**优先级：高**  
**Gate-5 状态：PARTIALLY RESOLVED**

涉及：`sqrt`、`ln`、fractional `pow`、未来可能的 `exp`。

### 已冻结于 Numeric Contract v1

- 每个正式 transcendental/reference capability 必须有 reference procedure；
- 必须声明 input/domain semantics；
- 必须声明 Numeric Profile；
- operation order 必须成为 reference procedure / Rule semantics 的一部分（当有限精度重排会影响输出时）；
- 必须声明 normalization、reference output、conformance tolerance；
- numerical result conformance 与 business result conformance 分开验收；
- numerical tolerance 内的差异不能掩盖 business mismatch。

证据来源：N01-B `PUMP-RP-0.1`、p28/p34/p40/p50/p60 sensitivity、operation-order sensitivity、Approved Golden；以及 N01-A/N01-C 对 business exactness/profile authority 的补充证据。

### 继续 OPEN

- Kotlin / Swift / ArkTS 实际 transcendental implementation/conformance；
- 是否存在一个统一 math library/reference implementation；
- 全平台 minimum working precision；
- universal transcendental tolerance；
- 各未来语言/library 对 frozen reference procedure 的实际兼容性测量。

这些 OPEN 项**不阻塞 Numeric Contract v1**，但会阻塞对应平台在未执行 Conformance 前声明该 Capability 已正式支持。

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

已确定首个 pre-1.0 Foundation baseline tag：

`contracts-v0.1.0` → `0cd74d783fa23add6dc881b408a8c8ba8503f8e8`

该 tag 的命名/目标已是事实性决定。

仍未冻结：

- 完整公共 Contract 集合何时达到 `contracts-v1.0.0` 发布条件；
- Numeric Contract v1 freeze 是否单独产生 release/tag，或等其他 Contract 共同发布。

Numeric Contract v1 的文档冻结本身不等于四组公共 Contract 已整体达到 `contracts-v1.0.0`。

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

ECQuota 现有 `.uebench` manifest/hash/signature/增量包能力只能作为 prototype 输入，不得直接视为公共 qzpack Contract 已实现。

---

## D-007 `.qzproj` physical format

**优先级：低（当前）**

已冻结原则：平台无关、不可依赖 Python pickle/UI state/Windows path，定位为交换与归档。

尚未冻结：

- ZIP 容器最终目录；
- attachment manifest；
- 加密；
- 签名；
- compression；
- schema migration。

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

Numeric Contract v1 已冻结语义，但不等于立即抽取公共 implementation。

原则仍为：

> 先统一语义，再观察稳定实现，最后按真实收益抽公共代码。

何时发布第一个 `qingzhou-platform` 公共 Numeric/Python package 尚未冻结。

---

## D-011 Carbon quantity / unit / stoichiometric coefficient boundary

**优先级：高，来源：GHGTOOL QZC-A01**  
**Gate-5 状态：PARTIALLY RESOLVED**

### 已冻结的概念原则

Numeric Contract v1 已冻结以下四类为不同语义类别：

```text
ordinary unit conversion
quantity transformation
stoichiometric / standard-formula coefficient
characterization / equivalence factor
```

因此：

- `44/12` 不是公共 ordinary unit conversion multiplier；
- `44/16` 不是公共 ordinary unit conversion multiplier；
- GWP 属 characterization/equivalence factor，不是 SI/unit scaling；
- legacy `tC ↔ tCO₂` UnitService bridge 不能因 API 形式而自动升级为公共 Unit Contract 语义。

### 继续 OPEN

- Quantity public schema；
- `quantity_type` 公共 enum 与层级；
- `substance_id` 最终 enum / requiredness；
- `equivalence_basis` 最终 requiredness / schema；
- coefficient public schema/enum；
- CO₂e 最终公共模型；
- Canonical / Unit / Result Trace 中 Quantity/Factor provenance 的最终字段位置。

Candidate B（`value + quantity_type + substance_id? + unit_id + equivalence_basis?`）仍可作为后续设计输入，但**不是 frozen public Quantity Schema**。

---

## D-013 Runtime Presentation State vs cross-platform Business Workspace

**优先级：中，来源：GHGTOOL QZC-A01**

已冻结原则：Qt/Tk 控件状态、objectName、currentIndex、Windows path 等不得成为跨平台 Workspace Contract 的业务真值。

仍需明确：

- 现有 runtime `form_state` 与未来 Business Workspace 如何共存；
- 是否需要 migration/adapter；
- presentation_state 是否可以作为平台私有附属字段；
- `.qzproj` 导出时如何只保留平台无关业务状态。

当前不要求 GHGTOOL 返工已有 projects.sqlite；留待 Workspace Contract 阶段处理。

---

## Numeric v1 freeze 后仍需跟踪但不新增 D 编号的 OPEN implementation/schema items

这些事项已经在 `NUMERIC_CONTRACT_V1_FROZEN.md` 和 `QZC_N01_GATE5_FREEZE_REPORT.md` 明确记录，不需要为了关闭 QZC-N01 再启动新 Pilot：

1. ECQuota Excel/openpyxl numeric-cell binary-float ingress / lossless workbook ingress；
2. Decimal lexical interchange / Excel ingress 公共方案；
3. Result/Record 中 `numeric_behavior_version` 最终字段位置；
4. standalone helper 成为 authoritative public entry point 时的具体 API/conformance 落地方式。

# DECISIONS_NEEDED

本文件只记录**目前没有足够依据替用户冻结**的公共决策。

原则：

- 未决事项不应被单个业务项目私自永久定型；
- 可以做可逆试验；
- 需要冻结时通过 RFC/ADR；
- 已决定事项应从本文件移除并进入正式 Contract/ADR；
- `GATE-4 CANDIDATE RESOLVED` / `READY FOR FREEZE REVIEW` 不等于 `FROZEN`，仍需 Gate 5 明确决策。

---

## D-001 Transcendental Numeric reference procedure

**优先级：高**  
**Gate-4 状态：PARTIALLY RESOLVED / GATE-5 PARTIAL**

涉及：`sqrt`、`ln`、fractional `pow`、未来可能的 `exp`。

### Previous status

尚未冻结：reference algorithm/library、内部工作精度、函数输出精度、tolerance 语义、normalization、以及 Python Decimal50 与未来 Kotlin/Swift/ArkTS 的最终一致性方式。

### New evidence from QZC-N01

N01-B 已基于真实离心泵公式建立并执行 `PUMP-RP-0.1`，覆盖：

- strict decimal ingress；
- declared working profile；
- `sqrt / ln / fractional pow`；
- p28/p34/p40/p50/p60 precision sensitivity；
- exact 与 nonlinear numerical domain；
- operation-order sensitivity；
- reference outputs；
- numerical tolerance 与 business result 分离；
- Approved Golden replay。

数学等价 operation tree 在 p50 下可产生约 `1E-47–1E-48` 的非零末位差异，证明 operation order 必须进入 reference semantics。

### Gate-4 conclusion

可以形成并进入 Gate 5 审查的**reference procedure structure**：

```text
function_id
input semantics/domain
working profile
operation order
reference procedure/version
normalization
reference output
conformance tolerance
```

但不能把 Pump Decimal50、ROUND_HALF_EVEN、Python Decimal API、某一 tolerance 数值直接冻结为全平台规则。

### Remaining uncertainty

- Kotlin / Swift / ArkTS 尚未实际执行 N01-B transcendental vectors；
- 尚无证据定义全平台单一最低 precision；
- 尚无证据定义跨语言统一 tolerance 数值或单一 library/algorithm。

**Ready for Gate-5 freeze? `PARTIAL`** — 结构/义务可审查；具体跨语言实现/数值值域继续 OPEN。

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

**QZC-N01-0 状态补充（2026-09-28）：** 用户已选择 `contracts-v0.1.0` 作为首个 pre-1.0 Foundation baseline tag，并已实际创建 annotated tag。经复核，tag object 为 `407e91b2161e6743645dfbac4c0addd9865506c7`，最终精确指向 `0cd74d783fa23add6dc881b408a8c8ba8503f8e8`。因此“首个 pre-1.0 baseline tag 采用何命名”这一部分已获得事实性决策证据；不借此冻结 `contracts-v1.0.0` 的正式发布条件。后续治理清理时应将已决定部分迁入正式发布/ADR 记录。

---

## D-004 Conformance Vector v1 exact schema

**优先级：高**  
**Gate-4 状态：GATE-4 CANDIDATE RESOLVED / READY FOR FREEZE REVIEW**

### Previous status

已冻结“必须有跨平台 Conformance”原则，但最终 Vector JSON Schema 未冻结；required fields、tolerance 粒度、trace/intermediate、provenance 等待代表 Pilot 验证。

### New evidence from QZC-N01

三个已独立验收 Pilot 都产生了 executable vectors：

- N01-A：exact T−δ/T/T+δ、legacy-vs-corrected、display separation、numeric behavior trace；
- N01-B：sqrt/ln/fractional pow、precision sensitivity、operation order、numerical tolerance、Golden replay；
- N01-C：unit/quantity/coefficient、display separation、profile propagation、ambient independence、profile mismatch rejection。

### Gate-4 conclusion

统一 schema 应采用：

> **Common Core + Category-specific fields**

Common Core 至少覆盖：

```text
case_id
category
numeric_contract_version
numeric_profile_id
authority_scope
inputs
source/provenance
```

并按类别要求 expected business/reference/error output。comparison、rounding、transcendental/reference、tolerance、quantity/coefficient、effective profile、legacy migration 等字段按类别 conditional required，不应全部 mandatory。

Gate-4 Candidate：

- `conformance/common/numeric/CONFORMANCE_VECTOR_V1_CANDIDATE.md`
- `conformance/common/numeric/conformance_vector_v1_candidate.schema.json`

### Remaining uncertainty

最终枚举、exact requiredness、warnings/problems 最小结构仍需 Gate 5 审查。

**Ready for Gate-5 freeze? `YES`** — schema model 已具备完整 Candidate；当前仍不是 FROZEN。

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
**Gate-4 状态：PARTIALLY RESOLVED / CLASSIFICATION READY FOR FREEZE REVIEW / SCHEMA OPEN**

### Previous status

需要明确 `tC/tCO₂` 的 unit/quantity semantics，44/12、44/16 的公式/化学计量边界，以及 Canonical/Unit/Result trace 如何记录 quantity/coefficient provenance。

### New evidence from QZC-N01-C

真实执行区分了：

- ordinary unit conversion：kg↔t、MWh↔GJ、10⁴Nm³↔Nm³、percent↔ratio；
- C→CO₂ via 44/12；
- CH₄→CO₂ via 44/16；
- greenhouse-gas mass→CO₂e via GWP；
- candidate quantity fixture for C / CO₂ / CH₄ and CO₂e equivalence basis；
- structured coefficient trace with coefficient ID/type/rational expression/source mapping。

### Gate-4 conclusion

分类原则具备 Gate-5 Candidate：

```text
ordinary unit conversion
quantity transformation
stoichiometric / standard-formula coefficient
characterization / equivalence factor
```

因此：

- `44/12` 不是公共 ordinary unit conversion multiplier；
- `44/16` 不是公共 ordinary unit conversion multiplier；
- GWP 是 characterization/equivalence factor，不是 SI/unit scaling。

Quantity representation 比较结果：Candidate B 方向优于 A：

```text
value
quantity_type
substance_id?
unit_id
equivalence_basis?
```

### Remaining uncertainty

- public quantity type/substance enum；
- CO₂e 最终 quantity model；
- field requiredness；
- coefficient public enum/schema；
- equivalence basis 最小 provenance fields。

**Ready for Gate-5 freeze? `PARTIAL`** — 分类原则 YES；Quantity/Factor public schema NO。Unit Contract v1 未被冻结。

---

## D-012 Numeric tolerance / `is_close` vs exact comparison

**优先级：高，来源：GHGTOOL QZC-A01**  
**Gate-4 状态：GATE-4 CANDIDATE RESOLVED / READY FOR FREEZE REVIEW**

### Previous status

需要区分正式业务 tolerance、标准显式 tolerance、算法/数值 tolerance、test assertion tolerance、lookup/interpolation tolerance，且不得用一个全局 epsilon 同时承担不同职责。

### New evidence from all three Pilots

- N01-A：正式等级边界使用 exact/full-value；无 decision epsilon；隐式 ROUND6 会真实改变等级。
- N01-B：nonlinear/reference numerical difference 可以由明确 conformance tolerance 评价，但 `rule_id/bucket/grade/status/conclusion` 只要不同必须 FAIL。
- N01-C：formal business comparison 与 test/numerical tolerance 分离；candidate vector 显式 `purpose=test_assertion` 且 `business_effect=false`。

### Gate-4 conclusion

候选 taxonomy：

```text
business-boundary
standard-explicit
algorithmic/numerical
lookup/interpolation
test/conformance
```

Display formatting 不属于 tolerance。

默认正式业务比较：`full-value exact comparison`。不得默认加 epsilon。标准/Rule 明确允许 tolerance 或显式修约时，必须声明 purpose、mode/value、stage/source 等语义。

一个平台级 global epsilon 被明确禁止。

### Remaining uncertainty

具体 tolerance 数值/模式仍由标准、Rule、Profile 或 reference procedure 的真实证据决定，不形成公共统一数值。

**Ready for Gate-5 freeze? `YES`**。

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

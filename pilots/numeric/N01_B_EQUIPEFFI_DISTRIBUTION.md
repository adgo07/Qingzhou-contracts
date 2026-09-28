# N01-B — EquipEffi Numeric Pilot Distribution

状态：**DISTRIBUTION FROZEN / READY FOR BUSINESS PILOT**  
Pilot ID：`N01-B`  
Repository：`adgo07/EquipEffi`  
分发冻结日期：2026-09-28

## 1. Distribution baseline

- 默认分支：`master`
- 分发时 head SHA：`b336fd313ea8e3ee1c688786c05d126d76dc2699`
- Contract baseline tag：`contracts-v0.1.0`
- Contract baseline tag object：`407e91b2161e6743645dfbac4c0addd9865506c7`
- Contract baseline SHA：`0cd74d783fa23add6dc881b408a8c8ba8503f8e8`
- Gate 0：**PASS** — annotated tag 已实际存在并精确指向上述 SHA
- 当前业务仓 `platform-lock.json`：锁定上述 SHA；Contract release/tag 当前为 `null`；本 Pilot 分发阶段不修改该 lock
- 代表 Profile：**GB 19762—2025 离心泵**
- Module ID：`qz.equipment_efficiency`

本任务书现已正式具备分发基线。它授权后续在 EquipEffi 中单独开展 N01-B 的 Design / Execution / Independent Acceptance，但**不授权**修改 `platform-lock.json` 或自动升级到中央仓最新 `main`。

## 2. Pilot purpose

EquipEffi 已存在泵专用 Numeric Contract / Decimal50 相关实现。N01-B 的目的不是由中央平台重新设计泵算法，而是把它作为 candidate/reference evidence，审计其真实 Numeric 行为并形成可跨语言验证的 numerical conformance 证据。

核心问题：

> Decimal50、ROUND_HALF_EVEN、binary float 拒绝链、非线性函数和边界判定目前到底怎样工作；哪些应保留为 Pump Numeric Profile，哪些有资格成为平台公共候选？

## 3. Design questions that must be answered

业务项目后续 Design 阶段至少回答：

1. 当前 Decimal50 的真实实现位置、context/precision 生命周期和权威计算入口；
2. `ROUND_HALF_EVEN` 的真实使用范围：全链、特定操作、显式修约、显示还是测试；
3. binary float 如何被拒绝、隔离或转换，是否仍有 float 可进入正式权威链；
4. `ns_raw` 是否保持 full value、未经显示修约直接参与正式判断；
5. `sqrt / ln / fractional pow` 的实际调用方式、输入域、工作精度和输出处理；
6. 非线性公式的 operation order 是否稳定且可追溯；
7. 哪些计算可以 exact decimal match；
8. 哪些非线性结果需要 tolerance，tolerance 的语义是什么；
9. tolerance 是否用于业务边界、算法收敛、测试断言或跨实现数值一致性，必须分类；
10. 跨 Python / Kotlin / Swift / ArkTS 时，为保持业务判定一致需要多少有效精度和怎样的 reference procedure；
11. Decimal50 是否应明确视为 Pump Numeric Profile，而不是平台全局默认；
12. 需要哪些真实泵案例作为 Conformance Vectors。

## 4. Required numerical evidence

必须基于真实泵公式和真实调用链提供证据，不允许只做抽象数学示例。

至少覆盖：

- 输入为有限十进制文本并进入 Decimal 权威链；
- binary float rejection / guard；
- `sqrt`；
- `ln`；
- fractional `pow`；
- 一条包含多步运算的完整 operation-order trace；
- `ns_raw` 与 display value 分离；
- 接近等级/限值边界的 exact comparison；
- 非线性末位差异的 tolerance comparison；
- 不同工作精度下的稳定性检查；
- 至少一组会暴露过低 precision 或错误 rounding 的压力案例。

## 5. Exact-match vs tolerance classification

业务项目必须把结果分为至少三类：

### A. Exact decimal domain

如有限十进制输入、加减乘、满足条件的精确比较等，可要求 exact match。

### B. Deterministic derived decimal domain

若通过明确 reference procedure 可以稳定得到规范化十进制输出，应说明 exact match 到什么规范化层级。

### C. Transcendental / nonlinear numerical domain

若不同语言实现末位不可天然一致，必须明确：

- reference value / procedure；
- comparison target；
- allowed error/tolerance；
- tolerance 的单位和量纲；
- tolerance 是否绝对/相对/ULP-like；
- 它是否影响正式业务边界。

不得用一个模糊 `epsilon` 同时覆盖 A/B/C。

## 6. Actual evidence required from business project

最终回报必须提供：

- Design baseline SHA；
- Execution head SHA；
- Acceptance head SHA；
- 独立验收结果；
- Decimal50 实现位置与实际 context 设置；
- `ROUND_HALF_EVEN` 使用清单及用途分类；
- binary float rejection 证据；
- `ns_raw` 到 comparison/display 的 trace；
- `sqrt / ln / fractional pow` 真实代码路径；
- operation order 证据；
- exact-match 与 tolerance 分类表；
- 真实测试命令与输出；
- precision sensitivity 结果；
- Pump Conformance Vectors；
- candidate platform rules；
- Pump-specific rules；
- 对 D-001 / D-004 / D-012 的证据和建议。

## 7. Conformance vectors expected

至少应建立：

1. decimal parse / normalization；
2. binary float rejection；
3. exact add/multiply/divide chain；
4. `sqrt` reference case；
5. `ln` reference case；
6. fractional `pow` reference case；
7. near-boundary pump case；
8. `ns_raw` vs display rounding separation；
9. precision sensitivity case；
10. operation-order-sensitive case；
11. nonlinear tolerance case；
12. invalid-domain case（例如函数定义域非法时，如实际公式路径存在）。

优先使用真实泵参数/边界，而不是只用 `sqrt(2)` 之类教学案例。

## 8. Candidate rules the business project may propose

允许提出：

- Pump Numeric Profile；
- Decimal50 作为 Pump profile 的工作精度候选；
- `ROUND_HALF_EVEN` 的 profile-specific 适用范围；
- transcendental reference procedure candidate；
- precision / normalization / tolerance schema；
- numerical conformance vector 字段；
- 对中央 Numeric Contract DRAFT 的修订建议。

## 9. Rules the business project may NOT freeze for the platform

不得自行宣布：

- 所有青舟 Calculator 必须 `precision=50`；
- 所有项目必须 `ROUND_HALF_EVEN`；
- 所有非线性函数必须使用 EquipEffi 当前库/算法；
- 所有跨语言结果必须 exact match；
- 所有 tolerance 都采用泵项目当前值；
- Decimal50 已经是全平台 Numeric Contract；
- D-001 / D-012 已冻结。

## 10. Explicit prohibitions

本 Pilot 不得：

- 为 N01 重写离心泵业务算法；
- 为了公共化而降低当前泵计算精度；
- 把 Pump Decimal50 直接升级为所有青舟软件全局规则；
- 修改 `platform-lock.json`；
- 自动升级到中央仓最新 `main`；
- 顺便重构 UI、标准数据或非 Numeric 业务流程；
- 创建公共 Numeric package；
- 开始 Kotlin / Swift / ArkTS 正式产品实现。

## 11. Independent acceptance rule

Gate 2 的 PASS / FAIL / BLOCKED 必须由 EquipEffi 自己的独立验收任务给出。中央平台不得把“现有 Pump Numeric Contract 看起来成熟”当作 PASS。

验收必须明确区分：

- 静态代码审计；
- Python 真实数值执行；
- 非线性 reference/tolerance 验证；
- 边界案例验证；
- 是否真的执行过跨语言实现（如果没有，必须明确写没有）。

## 12. Return to central platform

最终使用：

`pilots/numeric/N01_PILOT_RETURN_TEMPLATE.md`

回报必须明确指出：哪些证据足以支持平台 candidate，哪些只能支持 Pump Numeric Profile，哪些跨语言问题仍然 OPEN。

当前中央状态：**Gate 0 PASS；N01-B 已具备正式分发基线；Gate 2 尚未开始，且只能由 EquipEffi 的独立验收决定。**
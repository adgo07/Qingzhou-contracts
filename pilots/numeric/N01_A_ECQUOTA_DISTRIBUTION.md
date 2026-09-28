# N01-A — ECQuota Numeric Pilot Distribution

状态：**READY AFTER GATE 0 / NOT YET DISPATCHED**  
Pilot ID：`N01-A`  
Repository：`adgo07/ECQuota-Insight`  
分发准备日期：2026-09-28

## 1. Distribution baseline

- 默认分支：`main`
- 分发准备时 head SHA：`74b3deccfe74559cd08cc16a0705f1589ea6ecdc`
- Contract baseline tag：`contracts-v0.1.0`（当前尚未创建，Gate 0 未通过）
- Contract baseline SHA：`0cd74d783fa23add6dc881b408a8c8ba8503f8e8`
- 当前业务仓 `platform-lock.json`：锁定上述 SHA；release/tag 字段为 `null`；不得在本 Pilot 分发阶段修改
- 代表标准：**GB 29446—2019 选煤电力消耗限额**
- Module ID：`qz.energy_quota`

正式开始业务仓 Pilot 前，必须再次核实 `contracts-v0.1.0` 已存在且精确指向 `0cd74d...`。本任务书本身不授权修改业务仓 lock。

## 2. Pilot purpose

本 Pilot 不预设“ROUND6 一定错误”或“必须全部删除”。它要基于真实实现与标准原文回答：

> 当前项目中的 ROUND6、ROUND_HALF_UP、比较、显示和等级判定之间到底是什么关系？哪些属于标准明确要求，哪些只是历史实现习惯？

最终目标是形成可审计的 Numeric evidence 与 Conformance Vectors，供中央平台判断 full-value comparison、explicit rounding 和项目特有规则的边界。

## 3. Design questions that must be answered

业务项目后续 Design 阶段至少回答：

1. 当前实际 Numeric 实现在哪里，权威计算链从输入到等级判定如何流转；
2. `ROUND6` 出现在哪些文件、函数、计算阶段和测试中；
3. `ROUND_HALF_UP` 的真实使用范围是什么；
4. 哪些 ROUND 后的结果继续进入正式业务比较或等级判断；
5. 哪些 ROUND 只用于显示、日志、导出或测试；
6. 是否存在“显示值 == 阈值，但 full value 已越界”的等号边界变化；
7. GB 29446—2019 是否明确要求某一步修约、保留位数或指定 rounding mode；
8. 如果移除无标准依据的 implicit ROUND6，哪些真实结果、边界或历史测试可能改变；
9. 现有代码中是否存在 binary float 进入正式权威链；
10. 哪些计算可以 exact decimal comparison，哪些确实需要显式 tolerance；
11. 需要哪些 Conformance Vectors 才能覆盖真实风险；
12. 哪些行为应作为 ECQuota 专属规则，哪些可上报为平台 candidate。

## 4. Required boundary evidence

必须至少构造并真实验证：

- `T - δ`
- `T`
- `T + δ`

其中 `T` 是正式限值或等级阈值，`δ` 必须足够小以暴露 ROUND6/显示位数/比较顺序可能造成的差异，并以十进制文本记录，不得依赖 binary float 误差制造案例。

应至少覆盖：

- 等于阈值；
- 仅第 6 位以后不同；
- 舍入后相等但 full value 不等；
- 多步运算中间值接近边界；
- 不同显示位数但正式判定应相同；
- 标准如果明确要求修约，则覆盖修约前/修约后两套可追溯值。

## 5. Actual evidence required from business project

最终回报必须提供可复核证据，而不是只写结论：

- Design baseline SHA；
- Execution head SHA；
- Acceptance head SHA；
- 独立验收结果；
- 实际检查过的代码路径、函数和配置；
- `ROUND6` / `ROUND_HALF_UP` 使用清单及用途分类；
- 从 raw/calculation value 到 comparison/display/grade 的至少一条完整 trace；
- 标准原文中关于修约/比较的证据或“未发现明确修约要求”的检索说明；
- 真实执行的测试命令与结果；
- `T-δ/T/T+δ` 真实输出；
- 移除 implicit ROUND6 的影响分析；
- Conformance Vectors；
- candidate platform rules；
- 必须保留为 ECQuota-specific 的规则；
- 新发现冲突与未决问题。

## 6. Conformance vectors expected

至少应有以下类别：

1. exact threshold equality；
2. just-below threshold；
3. just-above threshold；
4. value differing only beyond 6 decimal places；
5. display rounding does not alter decision；
6. explicit standard-mandated rounding（仅当标准确有要求）；
7. multi-step calculation near boundary；
8. decimal serialization / parse round-trip；
9. invalid/non-finite numeric input rejection（若该输入路径适用）。

每个 vector 至少应记录 input、normalized/calculation value、comparison value、display value（如适用）、threshold、comparison operator、expected grade/status、numeric policy、source/provenance。

## 7. What the business project may propose as candidate

允许提出 candidate：

- ECQuota 的 comparison pipeline；
- explicit rounding 描述字段；
- rounding purpose/stage 分类；
- 对 display/comparison 分离的公共字段建议；
- exact comparison vector schema；
- 项目特有 Numeric Profile；
- 对中央 Numeric Contract DRAFT 的修订建议。

## 8. What the business project may NOT freeze for the platform

不得自行宣布：

- 所有青舟项目都必须使用 `ROUND_HALF_UP`；
- 所有项目都必须使用同一 precision；
- 所有项目都必须删除所有 rounding；
- 所有 tolerance 都禁止或都允许；
- Numeric Contract v1 已冻结；
- D-001 / D-012 已解决；
- 单个 GB 29446 结果足以定义全部项目的 Numeric 规则。

## 9. Explicit prohibitions

本 Pilot 不得：

- 现在直接删除全部 ROUND6；
- 以“中央平台要求”为由重写整个 ECQuota 计算器；
- 修改与 Numeric Pilot 无关的 UI/标准库/导出逻辑；
- 修改 `platform-lock.json`；
- 自动升级到中央仓最新 `main`；
- 把 DRAFT Contract 当作 FROZEN；
- 为了让测试通过而扩大 hidden tolerance；
- 用显示值反向参与正式判定。

## 10. Independent acceptance rule

Gate 1 的 PASS / FAIL / BLOCKED 必须由 ECQuota-Insight 自己的独立验收任务给出。中央平台不得根据设计文档、提交者自述或静态审计自行宣布 Gate 1 PASS。

验收必须明确区分：

- 静态代码审计完成；
- 测试真实运行；
- 数值结果真实重算；
- 边界向量真实验证。

## 11. Return to central platform

最终使用：

`pilots/numeric/N01_PILOT_RETURN_TEMPLATE.md`

回报至少附带：独立验收结论、关键 diff/commit、测试证据、边界向量、candidate rules、project-specific rules、对 Numeric Contract / Conformance Schema / DECISIONS_NEEDED 的建议。

在 Gate 0 未通过前，本任务书保持 **READY AFTER GATE 0**，不得写成已正式分发或已开始执行。
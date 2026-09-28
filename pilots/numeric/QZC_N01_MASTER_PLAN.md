# QZC-N01 — Numeric Pilot Master Plan

状态：**DISTRIBUTION PREPARED / GATE 0 BLOCKED**  
阶段：`QZC-N01-0 — Numeric Pilot Baseline & Distribution Freeze`  
分发准备日期：2026-09-28

## 0. Baseline verification

中央仓执行前 `main`：

`befd08e69f365d4e4e82281d65024117f325a484`

Foundation baseline commit 已核实存在：

`0cd74d783fa23add6dc881b408a8c8ba8503f8e8`

计划使用的 Contract baseline tag：

`contracts-v0.1.0`

截至本文件生成时，该 tag **尚不存在**。本阶段执行连接器不具备创建 Git tag / tag ref 的写接口，因此不得把同名 branch 或文字声明冒充正式 tag。Gate 0 保持 BLOCKED，直至该 tag 被实际创建并再次核实精确指向 `0cd74d783fa23add6dc881b408a8c8ba8503f8e8`。

在 Gate 0 PASS 前：

- 三个分发任务书可以作为已冻结的执行说明草案；
- 不得声称 Numeric Pilot 已正式分发；
- 不得修改三个业务仓 `platform-lock.json`；
- 不得把任何 Contract DRAFT 提升为 FROZEN；
- 不得开始中央跨项目 PASS 汇总。

## 1. 阶段目标

QZC-N01 用三个真实项目分别验证 Numeric Contract 的边界与可执行性：

- **N01-A — ECQuota / GB 29446—2019 选煤电力消耗限额**；
- **N01-B — EquipEffi / GB 19762—2025 离心泵 Profile**；
- **N01-C — GHGTOOL / GB/T 32151.34—2024**。

本阶段不是实现 Numeric Contract v1，不修改业务算法，也不要求三个项目同步开发。三个业务仓后续应当分别设计、分别执行、分别独立验收；中央仓只负责固定公共基线、收集证据、做跨试点冲突审查，并在证据充分后决定是否进入 Numeric Contract v1 freeze decision。

## 2. 公共原则

三个 Pilot 共同遵守以下原则，但不得把项目特有实现直接升级为公共规则：

1. Canonical 数字优先使用十进制文本表示；
2. 正式权威计算链禁止 IEEE-754 binary float 作为业务真值；
3. 默认采用 full-value comparison；
4. 禁止 implicit rounding；
5. display value 不得反向参与正式计算或等级判定；
6. 只有标准或正式业务规则明确要求修约时才允许 `explicit_round`；
7. precision 必须显式声明到足以审计其用途和范围；
8. rounding mode 必须显式声明；
9. 不假定所有 Calculator 必须统一 `precision=50`；
10. 不假定所有项目必须统一一个 rounding mode；
11. tolerance 必须有明确业务/算法/测试语义，不得用一个全局 epsilon 同时承担不同职责；
12. `sqrt / ln / fractional pow / exp` 等非线性函数必须通过 numerical conformance 验证；
13. Unit Conversion 与业务公式系数、化学计量系数必须区分；
14. 运算顺序如果会影响边界，必须作为可验证语义记录；
15. 业务项目可以提出 candidate rule，但不能单方面冻结为全平台规则。

## 3. 分发时业务仓基线

| Pilot | Repository | 默认分支 | 分发时 head SHA | 当前 Contract lock |
|---|---|---|---|---|
| N01-A | `adgo07/ECQuota-Insight` | `main` | `74b3deccfe74559cd08cc16a0705f1589ea6ecdc` | `0cd74d783fa23add6dc881b408a8c8ba8503f8e8`；release/tag 当前为 `null` |
| N01-B | `adgo07/EquipEffi` | `master` | `b336fd313ea8e3ee1c688786c05d126d76dc2699` | `0cd74d783fa23add6dc881b408a8c8ba8503f8e8`；release/tag 当前为 `null` |
| N01-C | `adgo07/GHGTOOL` | `main` | `84e07bb74dbee8db0fd716e3ed8261cfaf9e3415` | `0cd74d783fa23add6dc881b408a8c8ba8503f8e8`；release/tag 当前为 `null` |

这些 SHA 是 N01-0 分发准备时实际默认分支 head，不得用历史交接 SHA 替代。后续业务仓可以继续正常开发；各 Pilot 在自己的设计、执行、验收报告中必须分别记录真实 Design baseline SHA、Execution head SHA、Acceptance head SHA。

## 4. N01 Gates

### Gate 0 — Foundation baseline/tag verified

PASS 条件：

- `0cd74d783fa23add6dc881b408a8c8ba8503f8e8` 可解析且内容仍为 Foundation baseline；
- `contracts-v0.1.0` 实际存在；
- tag 精确指向 `0cd74d783fa23add6dc881b408a8c8ba8503f8e8`；
- 若 tag 已存在但指向其他 commit：立即 BLOCKED，禁止移动、覆盖或重建来掩盖问题。

当前状态：**BLOCKED — tag 尚不存在**。

### Gate 1 — N01-A evidence complete

由 ECQuota-Insight 自己的独立验收决定 PASS / FAIL / BLOCKED。中央仓不得代替业务项目宣布 PASS。

### Gate 2 — N01-B evidence complete

由 EquipEffi 自己的独立验收决定 PASS / FAIL / BLOCKED。中央仓不得代替业务项目宣布 PASS。

### Gate 3 — N01-C evidence complete

由 GHGTOOL 自己的独立验收决定 PASS / FAIL / BLOCKED。中央仓不得代替业务项目宣布 PASS。

### Gate 4 — Cross-pilot review complete

中央仓汇总三个已独立验收的回报，检查：

- 哪些语义三项目一致；
- 哪些属于项目/Profile 特有；
- D-001 / D-004 / D-011 / D-012 是否获得足够证据；
- Conformance Vector Schema 是否需要新增字段；
- Numeric 与 Unit 的边界是否出现冲突；
- 是否存在需要 RFC/ADR 的公共语义变化。

Gate 4 不重新执行或替代业务仓验收。

### Gate 5 — Numeric Contract v1 freeze decision

只有 Gate 1～4 的证据足够时，才允许进入 freeze decision。进入 Gate 5 不等于自动冻结；DRAFT → FROZEN 仍需要单独审查、明确 diff、必要的 RFC/ADR 和正式发布动作。

## 5. Pilot independence model

每个业务项目后续至少分为三个可区分阶段：

1. **Design**：静态审计现有实现、标准要求和边界，提出 Pilot 方案；
2. **Execution**：在业务仓内实现最小必要测试/向量/证据，不扩大为无关重构；
3. **Independent Acceptance**：由独立验收任务基于真实 head、diff、代码、测试和输出给出 PASS / FAIL / BLOCKED。

中央仓只接收已完成的业务项目回报，不把“设计合理”“静态代码审计完成”写成“数值已真实执行验证”。

## 6. Candidate 与平台冻结边界

业务项目允许提出 candidate：

- precision policy；
- rounding mode 与适用范围；
- tolerance 分类；
- numerical reference procedure；
- quantity/unit/coefficient 表达；
- conformance vector 字段；
- 项目特有 Numeric Profile。

业务项目不得自行冻结：

- 所有项目统一 precision；
- 所有项目统一 rounding mode；
- 全平台统一 tolerance epsilon；
- D-001、D-011、D-012 的最终结论；
- Numeric Contract v1；
- Unit Contract v1；
- 公共 Conformance Schema v1。

## 7. 回报中央平台

三个 Pilot 均使用：

`pilots/numeric/N01_PILOT_RETURN_TEMPLATE.md`

中央平台只接受能够区分以下证据层级的回报：

- 静态实现审计；
- 真实测试运行；
- 真实数值重算；
- 边界向量验证；
- 独立验收结论。

## 8. 明确禁止

QZC-N01-0 不得：

- 修改 ECQuota-Insight；
- 修改 EquipEffi；
- 修改 GHGTOOL；
- 修改三个业务仓 `platform-lock.json`；
- 把业务项目自动升级到中央最新 `main`；
- 把 `NUMERIC_CONTRACT_V1_DRAFT.md` 改成 FROZEN；
- 冻结 D-001、D-011、D-012；
- 创建公共 Numeric Python package；
- 实现 Kotlin / Swift / ArkTS 正式算法；
- 重写 Unit Contract；
- 重写业务计算器；
- 开始 qzpack；
- 开始 Workspace / Result Record 新阶段。

## 9. 本阶段完成定义

N01-0 的中央文档工作完成条件：

- Master Plan 已建立；
- 三份 Distribution 已建立；
- Return Template 已建立；
- 业务仓默认分支、真实 head 和 lock 已重新核实；
- 中央状态文件准确记录 Gate 0；
- 独立 PR 已创建且未合并。

由于当前缺少真实 `contracts-v0.1.0` tag，**N01-0 文档可完成，但正式 Distribution Freeze / Gate 0 不能宣告 PASS**。
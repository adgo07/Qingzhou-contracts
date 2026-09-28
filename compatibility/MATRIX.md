# 三项目公共架构兼容矩阵

状态说明：

- ✅ 已基本满足，可直接沿用；
- 🟡 部分满足 / 正在迁移 / 已有基础但 Contract 尚未冻结；
- 🔴 尚未实施；
- ⛔ 与冻结规范存在已确认冲突。

> 本矩阵是治理摘要，不替代各业务仓库的 HANDOFF/TASK_STATE/测试报告。

| 项目 | Domain/UI 分离 | Numeric | Unit | Canonical | Conformance | Record/Workspace | Capability | qzpack | 总体 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| ECQuota-Insight | ✅ | 🟡 | 🟡 | ✅ | 🟡 | 🟡 | 🔴 | 🔴 | 🟡 |
| EquipEffi | ✅ | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | 🔴 | 🟡 |
| GHGTOOL | ✅ | 🟡 | ✅ | ✅ | 🟡 | 🟡 | 🔴 | 🔴 | 🟡 |

## ECQuota-Insight

当前重点：

- 修正历史 ROUND6 数值语义；
- 默认 full-value comparison；
- GB 29446 作为简单 Canonical/Conformance/qzpack prototype 候选；
- 已有 Application Ports，有利于未来多端 adapter。

当前公共风险：

- Numeric Contract 尚未正式锁定；
- Capability/Record 公共外围尚未接入。

## EquipEffi

当前重点：

- 已有 Domain/Application/Infrastructure/Presentation 分层；
- Canonical-first、Golden/Conformance、版本模型正在推进；
- 离心泵涉及 Decimal50、sqrt/ln/pow，是 Transcendental Numeric 的关键试点；
- Capability 需要细到 Module + Profile + Standard + Feature。

当前公共风险：

- 跨语言非线性数学函数确定性尚未冻结；
- qzpack 生命周期尚未实现。

## GHGTOOL

当前重点：

- 已有独立 DecimalPolicy 与 UnitService；
- Canonical JSON → SQLite 构建基础成熟；
- 复杂行业 Domain Calculator 应保留；
- Workspace/Record 已有实际实现基础，但 runtime UI form_state 不等于跨平台 Workspace Contract；
- GB/T 32151.34 应建立第一套平台无关 Conformance Vectors。

当前公共风险：

- 权威计算中仍需进一步统一 Numeric/Unit 语义；
- Result/Record 公共版本字段尚未冻结。

## 更新规则

只有在查阅业务仓库最新实际代码/治理文件/测试后才更新状态。

不得根据计划、口头描述或“准备实现”将状态提前标记为 ✅。

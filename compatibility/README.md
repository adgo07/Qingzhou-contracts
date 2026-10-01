# compatibility/ — 兼容性摘要与历史快照（非权威实时状态源）

更新时间：2026-10-01

本目录保存**公共架构兼容性摘要**与**带日期的接入历史证据**。

## 本目录是什么

| 文件 | 内容 |
|---|---|
| `MATRIX.md` | 三项目公共架构兼容矩阵汇总 |
| `ECQuota.md` | ECQuota-Insight 兼容性摘要 |
| `EquipEffi.md` | EquipEffi 兼容性摘要 |
| `GHGTOOL.md` | GHGTOOL 兼容性摘要 |

## 本目录不是什么

> **本目录不是三个业务仓的实时状态源。**

本目录中的业务仓默认分支 SHA、接入状态、测试通过情况、实现完成度等，均为**记录当时**的快照，用于保留公共架构兼容性判断和历史接入证据。它们**不随业务仓变化自动更新**。

**业务仓当前实现状态的权威来源是业务仓自己：**

```text
业务仓 TASK_STATE / HANDOFF
+ 业务仓 platform-lock.json
+ 业务仓实际代码与测试
```

若本目录某条状态与业务仓实际状态不一致，**以业务仓为准**，本目录记录仅作历史证据，不得据以阻塞或加速业务仓工作。

中央仓**不**按固定周期重新采集三个业务仓的实时 head SHA；若需要更新，必须是独立任务，并实际查阅业务仓最新代码、治理文件和测试后按各文件末尾的“状态更新规则”更新。

## 相关中央文件

- 中央当前真实冻结状态：`PLATFORM_STATE.md`；
- 仍未冻结的公共决策：`DECISIONS_NEEDED.md`；
- 业务仓如何锁定中央版本：`docs/governance/VERSIONING.md`；
- 按任务读取哪些中央文件：`docs/GUIDE_INDEX.md`；
- 业务仓接入模板：`templates/PLATFORM_BASELINE_TEMPLATE.md`、`templates/platform-lock.example.json`。

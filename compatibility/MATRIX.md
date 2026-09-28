# 三项目公共架构兼容矩阵

更新时间：2026-09-28  
依据：三个业务仓 QZC-A01 已合并后的默认分支与 Adoption Report。

状态说明：

- ✅ 已基本满足，可直接沿用；
- 🟡 部分满足 / 已有基础但公共 Contract 尚未完整落地；
- 🔴 尚未实施；
- ⛔ 与 Architecture V2.1 FROZEN 已确认存在冲突。

> 本矩阵是治理摘要，不替代各业务仓库的 HANDOFF / TASK_STATE / 实际代码 / 测试报告。

## QZC-A01 接入状态

| 项目 | 默认分支 | QZC-A01 后默认分支 SHA | 上位治理接入 | 锁定 Qingzhou-contracts |
|---|---|---|---:|---|
| ECQuota-Insight | `main` | `74b3deccfe74559cd08cc16a0705f1589ea6ecdc` | ✅ | `0cd74d783fa23add6dc881b408a8c8ba8503f8e8` |
| EquipEffi | `master` | `b336fd313ea8e3ee1c688786c05d126d76dc2699` | ✅ | `0cd74d783fa23add6dc881b408a8c8ba8503f8e8` |
| GHGTOOL | `main` | `84e07bb74dbee8db0fd716e3ed8261cfaf9e3415` | ✅ | `0cd74d783fa23add6dc881b408a8c8ba8503f8e8` |

三个项目均已建立 `PLATFORM_BASELINE.md` / `platform-lock.json` 及 AGENTS 上位治理关系，并明确 `auto_follow_main = false` 或等价规则。

## 公共能力兼容状态

| 项目 | Domain/UI 分离 | Numeric | Unit | Canonical | Conformance | Record/Workspace | Capability | qzpack | 总体 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| ECQuota-Insight | ✅ | ⛔ | 🟡 | 🟡 | 🔴 | 🟡 | 🔴 | 🟡 | 🟡 / Numeric BLOCKED |
| EquipEffi | ✅ | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | 🔴 | 🟡 |
| GHGTOOL | ✅ | 🟡 | 🟡 | ✅ | 🔴 | 🟡 | 🔴 | 🔴 | 🟡 |

## ECQuota-Insight

QZC-A01：**Governance Adoption PASS / Numeric Conformance BLOCKED**。

已确认冲突：现有全局 `ROUND(..., 6)` + `ROUND_HALF_UP` 后比较，与 V2.1 默认 `full-value comparison`、禁止无依据 implicit rounding 冲突。QZC-A01 未修改 ROUND6，正确保留到独立 Numeric 试点处理。

首批公共试点：`GB 29446`，用于验证简单四则运算、精确边界比较、显示/判定分离与 Conformance。

现有 `.uebench` 的 manifest / hash / signature 等能力可作为未来 qzpack prototype 输入，但当前不得宣称已经实现公共 qzpack Contract。

## EquipEffi

QZC-A01：**PASS**。Phase 1 已先合并，治理接入随后在最新 `master` 重新落地；Phase 1 仍为 `PHASE_1_PASS`，未授权 Phase 2。

当前关键公共问题不是架构冲突，而是离心泵 `sqrt / ln / fractional pow` 的跨语言数值确定性。现有 Decimal50、Golden、Profile/Result 结构为 Numeric/Capability/Conformance 提供了良好试点基础，但尚不能等同于公共 Contract 已实现。

首批公共试点：代表性离心泵标准。

## GHGTOOL

QZC-A01：**PASS**。治理接入与随后 PR #13 的 UI 修复均已进入 `main`；PR #13 不改变 Domain、Canonical、数据库或上位治理。

Canonical-first、Domain 分层和不可变正式 Record 基础较成熟；Numeric / Unit、公共 Capability、平台无关 Conformance、跨平台 Workspace、统一 Result Envelope 仍需逐步收口。

首批公共试点：`GB/T 32151.34`。

新出现的公共候选包括：

- `tC / tCO₂`、44/12、44/16 的 quantity / unit / formula coefficient 边界；
- `is_close / tolerance` 与 exact comparison 的公共边界；
- Runtime Presentation State 与跨平台 Business Workspace 的迁移/共存关系。

## 更新规则

只有在查阅业务仓库最新实际代码、治理文件和测试后才更新状态。

不得根据计划、口头描述或“准备实现”将状态提前标记为 ✅。

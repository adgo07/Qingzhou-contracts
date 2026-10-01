# GHGTOOL — Platform Compatibility Summary

更新时间：2026-09-28

> 本文件只记录公共架构兼容摘要，是**带日期的历史快照**，不是 GHGTOOL 的实时状态源。
>
> 本文件中的默认分支 SHA、接入状态、实现完成度等**不随业务仓变化自动更新**。业务仓当前实现状态以该业务仓自己的 **TASK_STATE / HANDOFF / platform-lock.json / 实际代码和测试**为准。详见 `compatibility/README.md`。

## 当前判断

QZC-A01：**PASS**。

当前默认分支：`main@84e07bb74dbee8db0fd716e3ed8261cfaf9e3415`。  
锁定中央基线：`Qingzhou-contracts@0cd74d783fa23add6dc881b408a8c8ba8503f8e8`。

QZC-A01 治理接入已合并；随后 PR #13 的 SourceCard UI 展开修复也已合并，且不改变 Domain、Canonical、数据库 schema 或公共治理关系。

## 已有良好基础

- Presentation / Application / Domain / Infrastructure 分层已经比较清楚；
- 复杂炭素行业计算器独立于 Qt / SQLite；
- 已有 DecimalPolicy，明确拒绝 binary float；
- 已有 UnitService；
- Canonical JSON → catalog.sqlite 确定性构建基础成熟；
- Workspace / 正式 Record 已有实际分离基础；
- 不可变正式记录、参数快照和来源追溯基础较强；
- FieldSpec 已形成 Presentation Schema 雏形。

## 当前公共重点

1. 不把 Canonical-first 误解成“所有碳核算算法都 JSON DSL 化”；
2. 保留 Versioned Domain Calculator，并通过 Rule Specification + Conformance 约束；
3. Numeric Contract 要逐步收口权威计算链，而不只停留在 DecimalPolicy；
4. 明确 quantity / unit / formula coefficient 的分层；
5. 明确 `is_close / tolerance` 与 exact comparison 的公共边界；
6. 蒸汽表、标准查表、标准系数等优先迁入 Canonical/reference data；
7. 建立 GB/T 32151.34 平台无关 Conformance Vectors；
8. runtime `form_state` 只作为 Presentation State，不作为未来跨平台 Workspace Contract。

## 当前不要做

- 不把 CarbonMaterialCalculator 全部改成通用 DSL；
- 不立即把所有数据拆成大量 qzpack；
- 不为了 Result Contract 给 records.sqlite 堆大量无实际用途字段；
- 不提前开发 Suite / Mobile / Native Core；
- 不把现有 tolerance 行为直接宣布为公共 Numeric Contract。

## 首批试点

`GB/T 32151.34`：

```text
Canonical Evidence/Data
+ Versioned Domain Calculator
→ Decimal / Unit / Quantity semantics
→ tolerance / comparison candidate
→ Conformance vectors
→ Result/Record candidate
```

## RFC / Decision 关联

QZC-A01 新暴露的公共候选：

- `D-011`：Carbon quantity / unit / stoichiometric coefficient boundary；
- `D-012`：Numeric tolerance / `is_close` vs exact comparison；
- `D-013`：Runtime Presentation State vs cross-platform Business Workspace。

另外继续受 `D-005`、`D-006` 约束。

## 治理注意

如业务仓库旧 AGENTS/README 与最新已批准项目保存/Workspace 治理存在历史冲突，应以业务仓库最新批准治理文件为准并逐步清理陈旧禁令，避免执行 Agent 被旧规则误阻塞。

## 状态更新规则

只有实际分支/PR 合并并通过对应测试后，才将兼容矩阵条目标记为 ✅。

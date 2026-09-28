# GHGTOOL — Platform Compatibility Summary

更新时间：2026-09-28

> 本文件只记录公共架构兼容摘要。详细状态以 GHGTOOL 自己的 HANDOFF/TASK_STATE/实际代码/测试为准。

## 当前判断

总体：**🟡 部分符合，公共架构基础较成熟。**

## 已有良好基础

- Presentation / Application / Domain / Infrastructure 分层已经比较清楚；
- 复杂炭素行业计算器已经独立于 Qt/SQLite；
- 已有 DecimalPolicy，明确拒绝 binary float；
- 已有 UnitService；
- Canonical JSON → catalog.sqlite 确定性构建基础成熟；
- Workspace/正式 Record 已有实际分离基础；
- 不可变正式记录、参数快照和来源追溯已有较强基础；
- FieldSpec 已形成 Presentation Schema 雏形。

## 当前公共重点

1. 不把 Canonical-first 误解成“所有碳核算算法都 JSON DSL 化”；
2. 保留 Versioned Domain Calculator，并通过 Rule Specification + Conformance 约束；
3. Numeric Contract 不只停留在 DecimalPolicy 文档层，要逐步收口权威计算链；
4. 区分单位换算与公式固有系数；
5. 蒸汽表、标准查表、标准系数等优先迁入 Canonical/reference data；
6. 建立 GB/T 32151.34 平台无关 Conformance Vectors；
7. runtime `form_state` 只视为 Presentation State，不作为未来跨平台 Workspace Contract。

## 当前不要做

- 不把 CarbonMaterialCalculator 全部改成通用 DSL；
- 不立即把所有数据拆成大量 qzpack；
- 不为 Result Contract 现在给 records.sqlite 堆大量无实际用途字段；
- 不提前开发 Suite/Mobile/Native Core。

## 首批试点

`GB/T 32151.34`：

```text
Canonical Evidence/Data
+ Rule Specification
+ Versioned Domain Calculator
→ Numeric / Unit Contract
→ Conformance
→ Result/Record Envelope
→ qzpack prototype
```

## 治理注意

如业务仓库旧 AGENTS/README 与最新已批准项目保存/Workspace 治理存在历史冲突，应以业务仓库最新批准治理文件为准并尽快清理陈旧禁令，避免执行 Agent 被旧规则误阻塞。

## 状态更新规则

只有实际分支/PR 合并并通过对应测试后，才将兼容矩阵条目标记为 ✅。

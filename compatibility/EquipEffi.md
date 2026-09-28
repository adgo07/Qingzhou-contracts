# EquipEffi — Platform Compatibility Summary

更新时间：2026-09-28

> 本文件只记录公共架构兼容摘要。详细状态以 EquipEffi 自己的 HANDOFF/TASK_STATE/实际代码/测试为准。

## 当前判断

总体：**🟡 部分符合，跨平台基础较强。**

## 已有良好基础

- `application / domain / infrastructure / presentation` 分层清楚；
- 核心包与 Desktop 依赖已有较好隔离；
- 已存在 Application API / JSONL / Web 等多入口；
- Canonical-first、Golden、版本模型等方向已经进入实际 Phase；
- EvaluationResult/trace 等结构已有跨端 Contract 雏形；
- Decimal/查表/插值等已经集中到 Domain 侧。

## 当前公共重点

1. 离心泵使用 `sqrt / ln / fractional pow`，应作为 Transcendental Numeric Contract 的首批真实试点；
2. Capability 必须细化到 Module + Profile + Standard + Feature；
3. Canonical-first 应继续成为新增标准的硬门槛；
4. Record 正式语义要区分 Business Outcome 与 EXECUTION_ERROR；
5. qzpack 后续必须补安装、验证、原子激活、回滚和旧版本保留。

## 当前不要做

- 不因统一架构把现有 Tk Desktop 全面迁移到 PySide6；
- 不提前开发完整 Android/Harmony/iOS；
- 不把所有设备复杂公式强制塞进通用 DSL；
- 不将 Python Decimal50 的具体实现细节直接宣布为跨平台 Contract。

## 首批试点

代表性离心泵标准：

```text
Canonical/Profile
→ Decimal50 / Nonlinear Numeric
→ Numerical Conformance
→ Capability Manifest
→ Result Envelope
→ qzpack prototype
```

## 状态更新规则

只有实际分支/PR 合并并通过对应测试后，才将兼容矩阵条目标记为 ✅。

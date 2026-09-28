# EquipEffi — Platform Compatibility Summary

更新时间：2026-09-28

> 本文件只记录公共架构兼容摘要。详细状态以 EquipEffi 自己的 HANDOFF / TASK_STATE / 实际代码 / 测试为准。

## 当前判断

QZC-A01：**PASS**。  
Phase 1：**PHASE_1_PASS**。  
Phase 2：**尚未开始，仍需用户明确授权**。

当前默认分支：`master@b336fd313ea8e3ee1c688786c05d126d76dc2699`。  
锁定中央基线：`Qingzhou-contracts@0cd74d783fa23add6dc881b408a8c8ba8503f8e8`。

## 已有良好基础

- `application / domain / infrastructure / presentation` 分层清楚；
- 核心包与 Desktop 依赖已有较好隔离；
- Canonical-first、Golden、版本模型已经进入实际 Phase；
- EvaluationResult / trace 等结构已有公共 Contract 雏形；
- Decimal、查表、插值和复杂泵公式集中在 Domain 侧；
- Phase 1 的业务契约、P1-G01～G06、Canonical/Golden/QA 与评审门禁已保留。

## 当前公共重点

1. 离心泵使用 `sqrt / ln / fractional pow`，应作为 Transcendental Numeric Contract 的首批真实试点；
2. 现有 Decimal50 不能直接等同为跨平台 Numeric Contract；
3. Capability 应细到 Module + Profile + Standard + Feature；
4. Business Outcome 与 `EXECUTION_ERROR` 应保持语义分离；
5. qzpack 后续必须补安装、验证、原子激活、回滚和旧版本保留。

## 当前不要做

- 不因统一架构把现有 Tk Desktop 全面迁移到 PySide6；
- 不提前开发完整 Android/Harmony/iOS；
- 不把所有设备复杂公式强制塞进通用 DSL；
- 不在 Numeric Contract 未冻结前把 Python Decimal50 的具体行为宣布为跨平台真理；
- 不因 QZC-A01 已完成而自动授权 Phase 2。

## 首批试点

代表性离心泵标准：

```text
现有 Phase 1 冻结业务契约
→ Decimal50 / sqrt / ln / fractional pow
→ Numeric reference candidate
→ Numerical Conformance vectors
→ Capability / Result candidate
```

## RFC / Decision 关联

当前没有新的中央缺口；继续引用：

- `D-001`：Transcendental Numeric reference procedure；
- `D-005`：Recordable business outcomes by module；
- `D-006`：qzpack granularity。

## 状态更新规则

只有实际分支/PR 合并并通过对应测试后，才将兼容矩阵条目标记为 ✅。

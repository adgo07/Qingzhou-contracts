# QZC-A02 — 三业务仓 Adoption 汇总

日期：2026-09-28  
状态：**READY_FOR_REVIEW**

## 1. 目标

在不修改任何公共 Contract 正文的前提下，把三个业务仓 QZC-A01 的真实接入结果汇总回 `Qingzhou-contracts`，形成下一阶段公共试点的可信基线。

## 2. 三仓接入结果

| 项目 | 默认分支 | QZC-A01 后 SHA | 结论 |
|---|---|---|---|
| ECQuota-Insight | `main` | `74b3deccfe74559cd08cc16a0705f1589ea6ecdc` | Governance PASS / Numeric BLOCKED |
| EquipEffi | `master` | `b336fd313ea8e3ee1c688786c05d126d76dc2699` | PASS；Phase 1 PASS；Phase 2 未授权 |
| GHGTOOL | `main` | `84e07bb74dbee8db0fd716e3ed8261cfaf9e3415` | PASS；无 Architecture 硬冲突 |

三者均锁定：

`Qingzhou-contracts@0cd74d783fa23add6dc881b408a8c8ba8503f8e8`

且均不自动跟随中央 `main`。

## 3. 关键发现

### ECQuota

- 唯一已确认的冻结架构硬冲突：global ROUND6 vs full-value comparison；
- QZC-A01 未越权修改算法，处理正确；
- GB 29446 应作为 Numeric Contract 简单边界试点；
- `.uebench` 可为未来 qzpack prototype 提供实现经验。

### EquipEffi

- 未发现新的 Architecture 硬冲突；
- Phase 1 已先完成并合并，再重新落地中央治理，避免旧治理覆盖新基线；
- 离心泵 `sqrt / ln / fractional pow` 是 D-001 的真实验证场景；
- 当前没有新增 RFC Candidate。

### GHGTOOL

- 未发现 Architecture 硬冲突；
- 暴露三个值得中央处理的新问题：
  1. carbon quantity / unit / stoichiometric coefficient；
  2. `is_close / tolerance` vs exact comparison；
  3. Presentation State vs cross-platform Business Workspace；
- 已登记为 D-011～D-013。

## 4. A02 对中央仓的修改范围

只允许更新：

- `PLATFORM_STATE.md`；
- `compatibility/MATRIX.md`；
- `compatibility/ECQuota.md`；
- `compatibility/EquipEffi.md`；
- `compatibility/GHGTOOL.md`；
- `DECISIONS_NEEDED.md`；
- `CHANGELOG.md`；
- 本汇总文件。

明确禁止修改：

- `contracts/*_DRAFT.md` 的正式语义；
- Architecture V2.1 FROZEN；
- 三个业务仓代码；
- Conformance 最终 Schema；
- Release/tag 状态。

## 5. A02 结论

QZC-A01 的治理设计验证成功：

- 中央 Contract 能约束三个项目，但没有迫使其立即重构；
- 业务仓能够锁定固定中央 SHA，不受未来 `main` 漂移影响；
- 不同项目的真实差异被暴露并集中登记；
- 公共问题开始从产品私有实现中被提炼出来。

因此建议 A02 合并后启动：

> **QZC-N01 — Qingzhou Numeric Contract v1 Pilot**

## 6. QZC-N01 推荐范围

### N01-A — ECQuota / GB 29446

验证：

- full-value comparison；
- ROUND6 correction；
- display vs comparison；
- 简单十进制边界 Conformance。

### N01-B — EquipEffi / 离心泵

验证：

- Decimal working precision；
- `sqrt / ln / fractional pow`；
- operation order；
- numerical conformance vectors；
- D-001 reference procedure。

### N01-C — GHGTOOL / GB/T 32151.34

验证：

- Decimal；
- Unit / Quantity；
- 44/12、44/16 等公式/化学计量系数；
- `is_close / tolerance` 分类；
- D-011 / D-012。

## 7. 进入 N01 前仍需用户决定

A02 本身不需要新增架构决策。

但 release 方面仍有 D-003：

> 是否将三个业务仓共同锁定的 `0cd74d783fa23add6dc881b408a8c8ba8503f8e8` 标记为首个 `contracts-v0.1.0`。

该决定不阻塞 N01 技术试点，但建议在 N01 开始前确定，以便后续三个仓使用统一 release 名称描述已锁定的同一 SHA。

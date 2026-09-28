# Changelog

本文件记录公共架构、Contract、Schema 与 Conformance 的发布级变化。

## Unreleased — QZC-A02 Adoption Summary

### Added / Updated

- Architecture V2.1 FROZEN 已作为三个业务仓共同上位架构；
- ECQuota-Insight、EquipEffi、GHGTOOL 均已完成 QZC-A01 治理接入；
- 三个业务仓共同锁定 `Qingzhou-contracts@0cd74d783fa23add6dc881b408a8c8ba8503f8e8`；
- 兼容矩阵已由初始化估计状态更新为业务仓实际 Adoption 审计状态；
- ECQuota 已登记 `Governance PASS / Numeric BLOCKED`，global ROUND6 留待 Numeric Pilot；
- EquipEffi 已登记 Phase 1 PASS 后的治理接入状态；
- GHGTOOL 已登记 Numeric/Unit/Workspace 三类新增公共候选；
- `DECISIONS_NEEDED.md` 新增 D-011～D-013；
- 下一公共技术阶段建议为 `QZC-N01 — Numeric Contract v1 Pilot`。

### Not yet released

- Numeric / Unit / Module-Capability / Workspace-Record-Result / qzpack v1 仍全部是 DRAFT；
- 当前尚未发布 Contract release/tag；
- 是否把共同基础 SHA `0cd74d...` 标记为 `contracts-v0.1.0` 仍属于 D-003，待用户确认；
- 不得把 QZC-A01/A02 完成解释为三个业务仓已经完整符合所有 DRAFT Contract。

## Bootstrap V2.1

### Added

- Architecture V2.1 FROZEN；
- 仓库治理 `AGENTS.md`；
- Platform 状态与三项目兼容矩阵；
- Numeric Contract v1 DRAFT；
- Unit Contract v1 DRAFT；
- Module / Capability Contract v1 DRAFT；
- Workspace / Attempt / Record / Result Contract v1 DRAFT；
- qzpack / Canonical Package Contract v1 DRAFT；
- RFC / ADR 模板；
- Contract 版本锁定规范与业务仓接入模板；
- Conformance 目录规范；
- 最小 CI / JSON 校验；
- `DECISIONS_NEEDED.md` 开放决策登记。

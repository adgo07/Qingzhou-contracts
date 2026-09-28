# Changelog

本文件记录公共架构、Contract、Schema 与 Conformance 的发布级变化。

## Unreleased — QZC-N01-0 Numeric Pilot Baseline & Distribution Freeze

### Added / Updated

- 建立 `pilots/numeric/QZC_N01_MASTER_PLAN.md`；
- 建立 N01-A / N01-B / N01-C 三份独立业务仓 Numeric Pilot 分发任务书；
- 建立统一 `N01_PILOT_RETURN_TEMPLATE.md`；
- 重新核实三个业务仓默认分支、分发时真实 head 与 `platform-lock.json`；
- 固定 Pilot 共同 Foundation baseline SHA 为 `0cd74d783fa23add6dc881b408a8c8ba8503f8e8`；
- 明确 Gate 1～3 的 PASS 必须分别由业务项目独立验收产生，中央平台不得代替宣布；
- 明确 Decimal50、ROUND6、tolerance、quantity/unit/coefficient 等均先作为真实试点证据或 candidate，不直接升级为公共冻结规则。

### Baseline / tag verification

- 执行前中央 `main`：`befd08e69f365d4e4e82281d65024117f325a484`；
- Foundation baseline commit `0cd74d...` 已核实存在；
- 计划首个 pre-1.0 baseline tag 为 `contracts-v0.1.0`；
- 截至 2026-09-28 N01-0 执行时，该 tag 尚不存在；
- 当前执行连接器不具备创建 Git tag / tag ref 的写接口，因此 Gate 0 保持 **BLOCKED**，不得以同名 branch 或文档声明冒充 tag。

### Not changed

- 未修改 ECQuota-Insight、EquipEffi、GHGTOOL；
- 未修改三个业务仓 `platform-lock.json`；
- 未修改 Numeric / Unit / Record Contract DRAFT 正文；
- 未冻结 D-001、D-011、D-012；
- 未创建公共 Numeric implementation；
- 未开始 qzpack、Workspace / Result Record 新阶段。

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
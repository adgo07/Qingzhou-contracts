# Changelog

本文件记录公共架构、Contract、Schema 与 Conformance 的发布级变化。

## Unreleased — QZC-N01-0 Numeric Pilot Baseline & Distribution Freeze

### Added / Updated

- 建立 `pilots/numeric/QZC_N01_MASTER_PLAN.md`；
- 建立 N01-A / N01-B / N01-C 三份独立业务仓 Numeric Pilot 分发任务书；
- 建立统一 `N01_PILOT_RETURN_TEMPLATE.md`；
- 重新核实三个业务仓默认分支、分发时真实 head 与 `platform-lock.json`；
- 固定 Pilot 共同 Foundation baseline SHA 为 `0cd74d783fa23add6dc881b408a8c8ba8503f8e8`；
- 创建并核实首个 pre-1.0 baseline tag `contracts-v0.1.0`；
- `contracts-v0.1.0` 为 annotated tag，tag object `407e91b2161e6743645dfbac4c0addd9865506c7`，最终精确指向 `0cd74d783fa23add6dc881b408a8c8ba8503f8e8`；
- Gate 0 已从 BLOCKED 更新为 **PASS**；
- N01-A / N01-B / N01-C 的中央分发基线已冻结，可分别进入各业务项目自己的 Design / Execution / Independent Acceptance；
- 明确 Gate 1～3 的 PASS 必须分别由业务项目独立验收产生，中央平台不得代替宣布；
- 明确 Decimal50、ROUND6、tolerance、quantity/unit/coefficient 等均先作为真实试点证据或 candidate，不直接升级为公共冻结规则。

### Baseline / tag verification

- 执行前中央 `main`：`befd08e69f365d4e4e82281d65024117f325a484`；
- Foundation baseline commit `0cd74d...` 已核实存在；
- `contracts-v0.1.0` 已实际存在并精确指向该 Foundation baseline；
- tag message 为 `Qingzhou Contracts Foundation baseline v0.1.0`；
- tag 为 unsigned annotated tag；本阶段未要求签名，因此不阻塞 Gate 0；
- GitHub Release 页面仍不是本阶段强制项。

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

### Historical state at A02 completion

- Numeric / Unit / Module-Capability / Workspace-Record-Result / qzpack v1 当时及目前仍全部是 DRAFT；
- A02 完成时尚未发布 Contract baseline tag；该事项随后在 QZC-N01-0 中以 `contracts-v0.1.0` 完成；
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
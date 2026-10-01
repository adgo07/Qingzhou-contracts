# Changelog

本文件记录公共架构、Contract、Schema 与 Conformance 的发布级变化。

## Unreleased — QZC-N01-D Cross-Pilot Review & Numeric Contract v1 Candidate Synthesis

### Added

- `pilots/numeric/QZC_N01_CROSS_PILOT_REVIEW.md`；
- `contracts/numeric/NUMERIC_CONTRACT_V1_CANDIDATE.md`；
- `contracts/numeric/NUMERIC_PROFILES_V1_CANDIDATE.md`；
- `conformance/common/numeric/CONFORMANCE_VECTOR_V1_CANDIDATE.md`；
- `conformance/common/numeric/conformance_vector_v1_candidate.schema.json`；
- `decisions/ADR-NUMERIC-V1-CANDIDATE.md`；
- `pilots/numeric/QZC_N01_GATE4_EXECUTION_REPORT.md`。

### Accepted Pilot evidence

- N01-A / ECQuota Independent Acceptance：**PASS**；acceptance head `368f0cfd4cfc0931174583f8cfdf2a9abbbfbc19`；merge `031d0bb3406918d841984b3a535e172a8190b876`；
- N01-B / EquipEffi Independent Acceptance：**PASS**；acceptance head `020710b43f9e6b5509741d5fb2ba77f777728177`；merge `9efc6260b03d9e0a895abdb294a70cda39aa7598`；
- N01-C / GHGTOOL final Independent Re-Acceptance：**PASS**；acceptance head `385c4b6a65d64867ec14f3b8cf8b9cb149b18a7a`；merge `7b560299311b56f5e82b865ab8db7f7f879697ba`；
- N01-C 第一次 Independent Acceptance **FAIL** 被保留为正式 negative evidence：outer declared Profile 下 `_mul()` silent p40/HALF_UP fallback 证明“声明 Profile”不等于“权威链真实消费 Profile”。

### Gate-4 Candidate conclusions

- 公共 Contract 统一的是 numeric semantics / obligations，不是统一 precision/rounding 配置值；
- 建立 Numeric Profile Contract candidate；不固定一个全平台 precision 或 rounding mode；
- 每个 authoritative calculation scope 必须声明并实际传播 effective Numeric Profile；silent fallback 禁止；
- declared-profile propagation 与 ambient-context independence 为两个独立 Conformance requirement；
- 默认正式业务比较为 full-value exact comparison；implicit rounding 禁止；display rounding 只影响 presentation；
- tolerance 必须 purpose-specific；禁止一个 global epsilon 承担不同职责；
- numerical conformance 与 business conformance 分离；business outcome 不一致即 FAIL；
- nonlinear/finite-precision authoritative formula 的 operation order/reference procedure 进入 Conformance semantics；
- 44/12、44/16 归类为 stoichiometric/standard-formula coefficient，不作为 public ordinary unit conversion；
- GWP 归类为 characterization/equivalence factor；
- Quantity Candidate B 方向（`value + quantity_type + substance_id? + unit_id + equivalence_basis?`）优于最小 Candidate A，但 public Quantity Schema 未冻结。

### Decision status

- D-001：**PARTIALLY RESOLVED / GATE-5 PARTIAL**；reference procedure structure 可进入 Freeze Review，真实跨语言 implementation/tolerance 仍 OPEN；
- D-004：**GATE-4 CANDIDATE RESOLVED / READY FOR FREEZE REVIEW**；
- D-011：**PARTIALLY RESOLVED**；分类原则可审查，Quantity/coefficient public schema 仍 OPEN；
- D-012：**GATE-4 CANDIDATE RESOLVED / READY FOR FREEZE REVIEW**。

### Explicit non-freeze

- Numeric Contract v1 **未冻结**；
- Unit Contract v1 **未冻结**；
- 未创建 `NUMERIC_CONTRACT_V1_FROZEN.md`；
- 未冻结一个全平台 precision、rounding mode 或 epsilon；
- 未把 Decimal50 / Carbon p40 设为全平台默认；
- 未修改 ECQuota-Insight、EquipEffi、GHGTOOL 或三个 `platform-lock.json`；
- 未实现公共 Numeric Python package 或 Kotlin/Swift/ArkTS 正式实现；
- 未启动 qzpack、Workspace / Result Record 新阶段。

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

# Changelog

本文件记录公共架构、Contract、Schema 与 Conformance 的发布级变化。

## Unreleased — QZ-UI-02 Phase 0～1 统一 UI 基线

### Added

- `docs/ui/UI_DESIGN_GUIDELINES_V0.2.md`：当前适用指南提案，状态 **ACTIVE / EVOLVING**，合并后替代 v0.1 的当前设计指导作用；明确 A（Owner 当前决定）/ B（推荐）/ C（待开放与探索），允许持续演进。
- `docs/ui/UI_PRODUCT_FAMILY_SPEC_V0.1.md`：16 项 Owner 决定、三产品入口名称、真实能力边界、推荐模式和 OPEN 设计项。
- `docs/ui/UI_ACCEPTANCE_CHECKLIST_V0.1.md`：轻量文档及后续相关页面验收清单；本轮不执行正式 UI 验收。

### Changed

- `docs/GUIDE_INDEX.md`：更新当前 UI 阅读路由，三份文件归入 ACTIVE 指南；明确 v0.1 历史保留、v0.2 经本轮 PR 合并后适用，不修改历史 v0.1 原文或业务仓 lock。
- 协调旧指南通用侧栏、仅开放功能进入导航、标准来源/关系、基于记录重新开始和审计详情推荐；以新 Owner 决定为当前 UI 依据，底层追溯及数据兼容保留。

### Scope

- Phase 0 仅核对四仓默认分支 / HEAD、指定页面源码及必要治理文件；检查 SHA、差异与证据留在中央 PR，不额外创建大型审计文档。
- ECQuota Excel导入与折标系数库未开放；EquipEffi 不增草稿或额外保存；GHGTOOL Excel 只读预览且工作区与正式记录分开。
- 未修改三个业务仓、公共 Contract、Frozen 文件、标准解释、Calculator、Canonical、数据库 Schema 或 `platform-lock.json`；未进入 Phase 2，不制作正式 UI，不创建公共 UI package 或跨仓运行时依赖。
- 具体列名、状态筛选词汇、四区域标题、SVG/LOGO 资产与部分承载方式保持推荐或 OPEN，不替 Owner 发明决定。

## Unreleased — QZ-GOV-S01 中央治理收敛 + 标准开发与知识沉淀指南 v0.1

### Added

- `docs/GUIDE_INDEX.md` — 青舟开发文档导航（Navigation / Reading Router）：按任务类型路由应读取的中央文件，并标明各文件权威状态；
- `docs/governance/STANDARD_DEVELOPMENT_GUIDE_V0.1.md` — 青舟标准开发与知识沉淀指南 v0.1，状态 **ACTIVE / EVOLVING**；
- `compatibility/README.md` — 说明 `compatibility/` 为带日期的兼容性快照，不是业务仓实时状态源。

### Changed

- `docs/governance/PRODUCT_DELIVERY_POLICY_V1.md` 第 10 节：移除与标准开发指南重复的新标准检查清单枚举，改为指向 `STANDARD_DEVELOPMENT_GUIDE_V0.1.md` 的短引用；保留产品交付级“新标准逐个增加”原则；
- `compatibility/MATRIX.md` 与 `compatibility/ECQuota.md` / `EquipEffi.md` / `GHGTOOL.md`：明确为带日期的历史快照，业务仓当前实现状态以业务仓自身 `TASK_STATE` / `HANDOFF` / `platform-lock.json` / 实际代码和测试为准；未改动任何历史 SHA 与历史结论。

### Guide v0.1 content

- 新标准统一四阶段流程：Stage A 标准整理 → Stage B 软件接入设计 → Stage C 实现 → Stage D 正式验收；
- 统一标准支持状态：`CATALOG_ONLY` → `MAPPING` → `READY_FOR_IMPLEMENTATION` → `IMPLEMENTED` → `SUPPORTED`；不得无证据跳级，允许因重大问题回退；
- 第二个及后续标准承担架构验证任务；若每个标准都要重写 AppShell / 标准库 / Record / Excel / Calculator framework / 数据库基本结构，必须暂停判断是标准特殊还是抽象设计错误；
- 知识沉淀采用 Opportunistic Capture：不设固定交付数量，允许记录「Knowledge capture：无」；通常只形成 1～3 条 `DRAFT`；状态只使用 `DRAFT` / `REVIEWED` / `PUBLISHED` / `RETIRED`；知识最小字段为标题 / 状态 / 类型 / 适用标准 / 来源 / 正文 / 关联 Standard Issue；
- 知识必须区分标准原文事实 / 官方资料 / 专业技术解释 / 工程实践建议四个事实层级；不得把技术判断写成标准明文；
- 中央仓只定义公共知识方法，具体专业知识位于业务仓（ECQuota 能耗限额 / EquipEffi 设备能效 / GHGTOOL 碳核算），允许业务仓建立 `knowledge/`，中央不要求三仓相同目录结构；
- 明确两条链路分离：`Standard / Canonical Rule → Calculator` 与 `Standard / Issue / Rule → Knowledge explanation → User`；知识文章不得作为 Calculator 权威数据源或规则源，禁止运行时解析 Markdown 决定业务结果；
- 未来软件知识中心（搜索 / 分类 / 标准关联 / 字段帮助 / FAQ / 本地全文搜索 / 后续 AI 助手）仅作为长期方向记录，本次不实现。

### Explicitly not changed

- 未修改 Architecture V2.1 FROZEN、Numeric Contract v1、Numeric Profiles v1、Frozen Conformance Vector；
- 未修改任何 Calculator、业务 Rule、Schema、标准算法或 `platform-lock.json`；
- 未修改 ECQuota-Insight、EquipEffi、GHGTOOL 三个业务仓；
- 未删除 Numeric DRAFT / CANDIDATE、Pilot 历史文件、历史 ADR、历史 Gate 报告；
- 未做大目录移动、archive 重排、`PLATFORM_STATE` 与 `DECISIONS_NEEDED` 合并或 contracts 目录重构；
- 未把任何 `DRAFT` / `CANDIDATE` / `HISTORICAL` / `PILOT` 标记为 `FROZEN`；
- 未实现知识数据库、向量数据库或 AI Chat / RAG 系统。

## Unreleased — QZC-N01-E Numeric Contract v1 Freeze Decision

### Frozen / Accepted

- 创建 `contracts/numeric/NUMERIC_CONTRACT_V1_FROZEN.md`，状态：**FROZEN — Numeric Contract v1**；
- 创建 `contracts/numeric/NUMERIC_PROFILES_V1_FROZEN.md`，冻结 Profile 机制但不把三个 Pilot Profile 设为平台模板；
- 创建 `conformance/common/numeric/CONFORMANCE_VECTOR_V1_FROZEN.md`；
- 创建 `conformance/common/numeric/conformance_vector_v1.schema.json`；
- 创建 `decisions/ADR-NUMERIC-V1.md`，状态：**ACCEPTED**；
- 创建 `pilots/numeric/QZC_N01_GATE5_FREEZE_REPORT.md`；
- QZC-N01 Gate 5 完成，Numeric Contract v1 正式冻结。

### Frozen Numeric rules

- 每个 authoritative calculation scope 必须声明 Numeric Profile；
- authoritative operation/helper/service 必须消费 declared Profile，或显式声明并 trace sub-profile；禁止 silent fallback；
- declared-profile consistency 与 ambient independence 是两个独立 Conformance requirement；
- 默认正式业务比较为 `full-value exact comparison`；
- implicit rounding 默认禁止；explicit business rounding 必须有 stage / precision-or-places / mode / purpose / source；display rounding 不得反馈正式 comparison；
- tolerance 正式分为 business-boundary / standard-explicit / algorithmic-numerical / lookup-interpolation / test-conformance；禁止 platform global epsilon；
- numerical tolerance 不能掩盖 rule/bucket/grade/status/conclusion 等 business mismatch；
- transcendental/reference procedure 必须声明 function/domain/Profile/operation order/procedure version/normalization/reference output/conformance tolerance；
- input / normalized / calculation / comparison / display 在 Contract 语义上必须区分；
- 正式结果至少可追踪 Numeric Contract version、Numeric Profile ID、calculator/rule version；
- Unit/Quantity/coefficient 只冻结概念分类边界，不冻结完整 Unit/Quantity schema。

### Gate 4 Minor resolved

- Gate 4 Independent Acceptance 指出的 non-blocking Minor 已修复：`expected_business_result` 不再被描述为所有 Conformance vector 无条件必填；
- frozen model 要求 Common Core + 至少一个 category-appropriate expected outcome：`expected_business_result` / `expected_reference_value` / `expected_error`；
- 扩展字段按 category conditional required。

### Decision status

- D-001：**PARTIALLY RESOLVED** — reference procedure / operation order / Profile / tolerance obligation 已冻结；Kotlin/Swift/ArkTS 实测、统一 library、minimum precision、universal tolerance 继续 OPEN；
- D-004：**RESOLVED / FROZEN**；
- D-011：**PARTIALLY RESOLVED** — 四类概念边界已冻结，Quantity/coefficient public schema 继续 OPEN；
- D-012：**RESOLVED / FROZEN IN NUMERIC CONTRACT v1**。

### Explicitly not frozen / not implemented

- Unit Contract v1：**NOT FROZEN**；
- Quantity Schema：**NOT FROZEN**；
- coefficient public schema：**OPEN**；
- `numeric_behavior_version` 最终 Result/Record 字段位置：**OPEN**；
- ECQuota Excel/openpyxl lossless ingress：**OPEN**；
- Kotlin/Swift/ArkTS actual transcendental conformance：**OPEN**；
- 未修改 ECQuota-Insight、EquipEffi、GHGTOOL 或三个业务 `platform-lock.json`；
- 未实现公共 Numeric Python package；
- 未启动 qzpack、Workspace/Result Record 新阶段；
- 未新增 N01 Pilot。

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

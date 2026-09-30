# PLATFORM_STATE

更新日期：2026-09-30  
状态：**QZC-N01 GATE 4 COMPLETE / NUMERIC V1 CANDIDATE READY FOR GATE 5 / NOT FROZEN**

## 已冻结

- Architecture: `V2.1 FROZEN`
- Module IDs:
  - `qz.energy_quota`
  - `qz.equipment_efficiency`
  - `qz.carbon_accounting`
- 总体原则：独立版 + Suite；offline-first；公共外围 Contract + 自治 Domain；Conformance 作为跨平台裁判。

## Foundation baseline

首个 pre-1.0 Contract baseline tag 仍为：

`contracts-v0.1.0` → `0cd74d783fa23add6dc881b408a8c8ba8503f8e8`

Gate 4 已重新核实：

- tag 类型：annotated tag；
- tag object：`407e91b2161e6743645dfbac4c0addd9865506c7`；
- target commit：`0cd74d783fa23add6dc881b408a8c8ba8503f8e8`；
- Foundation baseline 未漂移。

该 tag 只固定 N01 共同基线，不代表 Numeric/Unit Contract v1 已冻结。

## 三业务 Pilot 最终状态

| Gate | Pilot | Representative evidence | Acceptance head | Merge SHA | Result |
|---|---|---|---|---|---|
| Gate 1 | N01-A / ECQuota / GB 29446—2019 | exact full-value boundaries、ROUND6 breaking migration、display separation、ingress evidence | `368f0cfd4cfc0931174583f8cfdf2a9abbbfbc19` | `031d0bb3406918d841984b3a535e172a8190b876` | **PASS** |
| Gate 2 | N01-B / EquipEffi / GB 19762—2025 Pump | Decimal50 profile、sqrt/ln/fractional pow、precision & operation-order sensitivity、Golden | `020710b43f9e6b5509741d5fb2ba77f777728177` | `9efc6260b03d9e0a895abdb294a70cda39aa7598` | **PASS** |
| Gate 3 | N01-C / GHGTOOL / GB/T 32151.34—2024 | p40 Carbon profile、profile propagation、ambient independence、Unit/Quantity/coefficient | `385c4b6a65d64867ec14f3b8cf8b9cb149b18a7a` | `7b560299311b56f5e82b865ab8db7f7f879697ba` | **PASS after formal first FAIL + R1** |

### N01-C first FAIL is retained

N01-C first Independent Acceptance at the pre-R1 state is formal evidence, not discarded history. It found a mixed-profile authoritative chain: an outer requested Profile could be p50 while `_mul()` silently created the historical default p40/HALF_UP policy.

R1 subsequently fixed and independently re-validated declared-profile propagation, while also proving ambient-context independence separately.

Central consequence:

> authoritative Profile declaration without verified propagation is insufficient; silent fallback is prohibited.

## Gate 4 — Cross-Pilot Review

Gate 4 is **COMPLETE**.

Central artifacts:

- `pilots/numeric/QZC_N01_CROSS_PILOT_REVIEW.md`
- `contracts/numeric/NUMERIC_CONTRACT_V1_CANDIDATE.md`
- `contracts/numeric/NUMERIC_PROFILES_V1_CANDIDATE.md`
- `conformance/common/numeric/CONFORMANCE_VECTOR_V1_CANDIDATE.md`
- `conformance/common/numeric/conformance_vector_v1_candidate.schema.json`
- `decisions/ADR-NUMERIC-V1-CANDIDATE.md`
- `pilots/numeric/QZC_N01_GATE4_EXECUTION_REPORT.md`

## Common Numeric Contract Candidate

Gate 4 has enough evidence to forward the following semantics to Gate 5:

1. deterministic decimal authority semantics；
2. explicit Numeric Profile contract；
3. authoritative scope must consume the declared effective Profile；
4. silent default Profile fallback prohibited；
5. declared-profile consistency and ambient-context independence are separate Conformance requirements；
6. default formal business comparison = full-value exact comparison；
7. implicit rounding prohibited；
8. explicit business rounding requires stage/mode/precision/purpose/source；
9. display rounding is presentation-only；
10. tolerance must be purpose-specific；no global epsilon；
11. numerical conformance and business conformance are separate；
12. nonlinear/finite-precision operation order/reference procedure is versioned semantics；
13. formal result must trace Numeric Contract/Profile and rule/calculator behavior version；
14. Conformance Vector uses Common Core + category-specific fields。

## Numeric Profiles — evidence, not public defaults

- ECQuota GB29446：full-value Decimal semantics；no implicit business rounding；no new global fixed precision introduced；
- EquipEffi Pump：p50 / ROUND_HALF_EVEN working context / PUMP-RP-0.1；
- GHGTOOL Carbon：p40 / ROUND_HALF_UP / declared-profile propagation / ambient independence。

These differences are evidence for a Profile Contract. They are not a reason to choose one common precision, maximum precision or one common rounding mode.

## Quantity / Unit / coefficient Gate-4 synthesis

Central candidate classification:

```text
ordinary unit conversion
quantity transformation
stoichiometric / standard-formula coefficient
characterization / equivalence factor
```

Therefore:

- `44/12`：stoichiometric/standard-formula coefficient, not public ordinary unit conversion；
- `44/16`：stoichiometric/standard-formula coefficient, not public ordinary unit conversion；
- GWP：characterization/equivalence factor with basis/version/provenance。

Quantity Candidate B direction is preferred for review:

```text
value
quantity_type
substance_id?
unit_id
equivalence_basis?
```

But Quantity public schema remains **NOT FROZEN** and D-011 remains partially open.

## Decision status after Gate 4

| Decision | Gate-4 status | Gate-5 readiness |
|---|---|---|
| D-001 Transcendental reference procedure | **PARTIALLY RESOLVED** | **PARTIAL** — structure/obligation ready; real cross-language implementation/tolerance remains OPEN |
| D-004 Conformance Vector v1 schema | **GATE-4 CANDIDATE RESOLVED / READY FOR FREEZE REVIEW** | **YES** |
| D-011 Quantity / Unit / coefficient boundary | **PARTIALLY RESOLVED** | **PARTIAL** — classification ready; public schema OPEN |
| D-012 tolerance / exact comparison | **GATE-4 CANDIDATE RESOLVED / READY FOR FREEZE REVIEW** | **YES** |

## Explicit OPEN items

Still open and visible:

1. ECQuota Excel/openpyxl numeric-cell binary-float ingress；
2. actual Kotlin/Swift/ArkTS transcendental conformance；
3. Quantity public schema；
4. coefficient public enum/schema；
5. final Result/Record field placement of `numeric_behavior_version`；
6. authoritative standalone helper Profile obligation when such helper becomes a public formal entry point；
7. unified Decimal lexical interchange schema。

The Candidate already states that a standalone helper promoted to an authoritative entry point must declare a Profile. The remaining implementation/schema details are not hidden by Gate 4.

## N01 Gates

- **Gate 0 — Foundation baseline/tag verified:** **PASS**；
- **Gate 1 — N01-A evidence complete:** **PASS** by ECQuota Independent Acceptance；
- **Gate 2 — N01-B evidence complete:** **PASS** by EquipEffi Independent Acceptance；
- **Gate 3 — N01-C evidence complete:** **PASS** by GHGTOOL R1 Independent Re-Acceptance; first FAIL retained as evidence；
- **Gate 4 — Cross-pilot review complete:** **PASS / COMPLETE**；
- **Gate 5 — Numeric Contract v1 freeze decision:** **READY TO ENTER / NOT STARTED / NOT FROZEN**。

## Gate 5 proposed review scope

Gate 5 should review whether to freeze the common Numeric semantics and Profile/Conformance obligations. It must not mechanically freeze project configuration values.

Gate 5 must explicitly decide D-001 structure vs implementation detail and the Result/Record trace field implications before final release wording.

## Current Contract release state

- Architecture V2.1: **FROZEN**
- Numeric Contract v1 Draft: **DRAFT**
- Numeric Contract v1 Gate-4 Candidate: **CANDIDATE / NOT FROZEN**
- Unit Contract v1: **DRAFT / NOT FROZEN**
- Module/Capability Contract v1: **DRAFT**
- Workspace/Attempt/Record/Result Contract v1: **DRAFT**
- qzpack Contract v1: **DRAFT**

No `NUMERIC_CONTRACT_V1_FROZEN.md` exists or is authorized by Gate 4.

## Current explicit non-implementation

- no changes to ECQuota-Insight / EquipEffi / GHGTOOL in Gate 4；
- no changes to business `platform-lock.json`；
- no common Numeric Python package；
- no Kotlin/Swift/ArkTS production implementation；
- no qzpack implementation phase；
- no Workspace/Result Record new phase；
- no automatic historical Record recalculation。

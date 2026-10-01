# QZC-N01-D — Gate 4 Cross-Pilot Execution Report

Status: **GATE 4 COMPLETE / READY FOR GATE 5 REVIEW / NOT FROZEN**  
Date: 2026-09-30  
Central repository: `adgo07/Qingzhou-contracts`  
Central execution baseline: `main@47a268dcebdc43c582f451b2004c9e63b46502a3`

## 1. Scope

This task performs only central Cross-Pilot Review and Candidate synthesis. It does not modify ECQuota-Insight, EquipEffi or GHGTOOL; does not modify their `platform-lock.json`; and does not freeze Numeric Contract v1, Unit Contract v1, Quantity Schema or a common implementation package.

Gate 4 accepts the three business projects' independent acceptance results as evidence inputs. It does not re-issue or replace those business acceptance decisions.

## 2. Foundation baseline verification

Re-verified during Gate 4:

```text
contracts-v0.1.0
  annotated tag object = 407e91b2161e6743645dfbac4c0addd9865506c7
  target commit        = 0cd74d783fa23add6dc881b408a8c8ba8503f8e8
```

The Foundation baseline did not drift.

## 3. Accepted Pilot baselines

### N01-A — ECQuota / GB 29446—2019

- Distribution/design base: `74b3deccfe74559cd08cc16a0705f1589ea6ecdc`
- Design commit: `738d5a9f5a432b10a05b87ae9b9f70ac612360d1`
- Tested execution SHA: `332a208cc76e7d0bc9f41a18398ae18919ed63ca`
- Acceptance/final evidence SHA: `368f0cfd4cfc0931174583f8cfdf2a9abbbfbc19`
- Merge SHA: `031d0bb3406918d841984b3a535e172a8190b876`
- Independent acceptance: **PASS**
- Execution report: `QZC_N01_A_EXECUTION_REPORT.md`
- Vectors: `tests/pilots/numeric/qzc_n01_a_vectors.json`
- Actual CI execution report evidence: run `36686368149` on tested execution head; pilot/regression gates passed, while two repository-wide asset failures were independently reproduced on untouched base and not hidden.

Accepted numerical evidence includes:

- 18 exact T−δ/T/T+δ boundary vectors;
- intentional correction of legacy ROUND6 boundary behavior;
- display `5.00` separated from formal calculation `5.0000004`;
- float rejection on authoritative domain/JSON paths;
- explicit open issue for openpyxl numeric-cell `float -> str -> Decimal` ingress;
- persisted project numeric-behavior marker `ecquota-gb29446-full-value-v2`.

### N01-B — EquipEffi / GB 19762—2025 Pump

- Distribution/design base: `b336fd313ea8e3ee1c688786c05d126d76dc2699`
- Design commit: `a344c9d7919872c72891965c6509c3bba7affac8`
- Execution start master: `77acc7d31a687dbe43c878b809109afe2bd13ae0`
- Tested execution SHA: `96db30a4c63730c8693f0fc1fbebb5301e1809b7`
- Acceptance/final evidence SHA: `020710b43f9e6b5509741d5fb2ba77f777728177`
- Merge SHA: `9efc6260b03d9e0a895abdb294a70cda39aa7598`
- Independent acceptance: **PASS**
- Execution report: `QZC_N01_B_EXECUTION_REPORT.md`
- Candidate vectors: `specs/equipment_efficiency/numeric/qzc_n01_b_vectors_candidate_0_1.json`
- Reference procedure: `PUMP-RP-0.1`
- CI execution evidence: run `36680958245` on tested head; targeted Pump/Numeric/Golden gates passed. The literal unrelated full suite had pre-existing non-N01-B failures/errors which were recorded rather than misreported as green.

Accepted numerical evidence includes:

- p28/p34/p40/p50/p60 precision sensitivity;
- sqrt / ln / fractional pow actual execution;
- exact boundary T−δ/T/T+δ;
- operation-order sensitivity with non-zero p50 differences around `1E-47–1E-48`;
- numerical tolerance separated from exact business `rule/bucket/grade/status/conclusion`;
- Approved Golden replay and unchanged business oracle;
- no actual Kotlin/Swift/ArkTS execution.

### N01-C — GHGTOOL / GB/T 32151.34—2024

- Design baseline: `84e07bb74dbee8db0fd716e3ed8261cfaf9e3415`
- Separate Design commit/PR: **none**; original Design was design-only against the frozen Distribution/base.
- Initial numeric execution tested SHA: `b92f5088f12c6d3da5a50e8b04305d10282be42b`
- Original execution/report head and first acceptance state: `b4b577522b6b7218e3c14fa9ebb2608ce0efdf4c`
- First Independent Acceptance: **FAIL** — formal Pilot evidence retained
- R1 implementation/test SHA: `f337e9b0002020198ad9b63bc99179f1297b49a4`
- Final R1 acceptance/evidence SHA: `385c4b6a65d64867ec14f3b8cf8b9cb149b18a7a`
- Merge SHA: `7b560299311b56f5e82b865ab8db7f7f879697ba`
- Final independent re-acceptance: **PASS**
- Original report: `docs/governance/QZC_N01_C_EXECUTION_REPORT.md`
- R1 report: `docs/governance/QZC_N01_C_R1_EXECUTION_REPORT.md`
- Vectors: `conformance/numeric/qz.carbon_accounting/gbt32151_34_n01c.json`
- R1 CI: run `36691022248` on implementation head; 206 full-suite tests plus profile-propagation/conformance and standalone checks PASS.
- Final PR-head CI: run `36691628395` completed success.

#### Formal first FAIL retained

The first acceptance found a central-quality defect pattern:

```text
outer Calculator declares/request p50
  -> authoritative helper _mul()
       -> silently constructs historical default p40/HALF_UP
```

The resulting formal scope was mixed-profile. R1 fixed and tested propagation separately from ambient independence. Gate 4 treats this FAIL as essential negative evidence, not as history to erase after the final PASS.

Accepted R1 evidence includes:

- profile propagation p28/p34/p40/p50/p60;
- caller ambient-context independence tested separately;
- UnitService profile mismatch rejection;
- true full-Calculator precision sensitivity;
- p40 current production evidence without platform-wide promotion;
- ordinary unit conversion separated from quantity transformation;
- 44/12 and 44/16 structured stoichiometric coefficient evidence;
- GWP/CO₂e characterization/equivalence candidate evidence.

## 4. Cross-pilot findings

The detailed matrix is in:

`pilots/numeric/QZC_N01_CROSS_PILOT_REVIEW.md`

The central synthesis is:

1. Three projects do **not** support one global precision.
2. Three projects do **not** support one global rounding mode.
3. They do support deterministic decimal authority semantics.
4. They support full-value exact business comparison as the default.
5. They support prohibition of implicit business rounding.
6. They support strict separation of calculation/comparison/display semantics.
7. They support purpose-specific tolerance and prohibition of a global epsilon.
8. They support an explicit Numeric Profile and authority-scope contract.
9. They support silent-fallback prohibition.
10. They support ambient independence as a separate requirement from profile propagation.
11. They support operation-order/reference-procedure semantics for finite-precision/nonlinear calculations.
12. They support numerical conformance tolerance while requiring exact business-output agreement.
13. They support numeric behavior/version traceability.
14. They support a common Conformance Vector core with category-specific fields.

## 5. Common Contract candidates

Produced:

- `contracts/numeric/NUMERIC_CONTRACT_V1_CANDIDATE.md`
- `contracts/numeric/NUMERIC_PROFILES_V1_CANDIDATE.md`
- `conformance/common/numeric/CONFORMANCE_VECTOR_V1_CANDIDATE.md`
- `conformance/common/numeric/conformance_vector_v1_candidate.schema.json`
- `decisions/ADR-NUMERIC-V1-CANDIDATE.md`

The central Candidate requires:

- deterministic decimal authority semantics;
- explicit Numeric Profiles;
- authority scopes that actually consume the declared Profile;
- explicit traced subprofiles when needed;
- no silent fallback;
- ambient independence;
- full-value exact default business comparison;
- explicit/source-backed business rounding only;
- display-only rounding isolation;
- tolerance taxonomy;
- numerical vs business conformance separation;
- versioned nonlinear/reference procedure structure and operation order;
- traceability to Numeric Contract/Profile/rule/calculator behavior.

## 6. Profile-specific findings

### ECQuota

- GB 29446 full-value behavior is accepted.
- Project behavior marker `ecquota-gb29446-full-value-v2` is not a platform profile registry entry.
- Other ECQuota standards must be source-reviewed separately.

### EquipEffi Pump

- Decimal50 / HALF_EVEN remains a Pump-specific conservative reference profile.
- It is not proven to be the minimum precision and is not a platform default.
- PUMP-RP-0.1 is an executable reference candidate, not a universal Python implementation mandate.

### GHGTOOL Carbon

- p40 / HALF_UP is supported for the current representative Carbon profile.
- Declared-profile propagation + ambient independence are central obligations, but the p40/HALF_UP values remain project-specific.
- Standalone legacy helpers outside an authoritative scope do not become formal entry points by accident; if promoted, they must declare a Profile.

## 7. Quantity / Unit / coefficient findings

Central Gate-4 classification candidate:

```text
ordinary unit conversion
quantity transformation
stoichiometric / standard-formula coefficient
characterization / equivalence factor
```

Classifications:

- `44/12`: stoichiometric / standard-formula coefficient for a C→CO₂ quantity transformation, not public ordinary `unit_convert()`.
- `44/16`: stoichiometric / standard-formula coefficient for the relevant CH₄→CO₂ transformation, not public ordinary `unit_convert()`.
- GWP: characterization/equivalence factor with time horizon, assessment/version and source/provenance.

Quantity Candidate A (`value + quantity_type + unit_id`) is too weak for the demonstrated carbon cases. Gate 4 recommends the direction of Candidate B:

```text
value
quantity_type
substance_id?
unit_id
equivalence_basis?
```

This is **not frozen**. D-011 remains partial because public enum names, requiredness and complete coefficient/CO₂e schema still need review.

## 8. Decision status

| Decision | Gate-4 status | Ready for Gate-5? | Notes |
|---|---|---|---|
| D-001 | **PARTIALLY RESOLVED** | **PARTIAL** | reference-procedure structure is strong; real Kotlin/Swift/ArkTS conformance and universal tolerance/precision remain OPEN |
| D-004 | **GATE-4 CANDIDATE RESOLVED / READY FOR FREEZE REVIEW** | **YES** | Common Core + category-specific schema candidate produced; not frozen |
| D-011 | **PARTIALLY RESOLVED** | **PARTIAL** | classification principle ready; Quantity/coefficient public schema still OPEN |
| D-012 | **GATE-4 CANDIDATE RESOLVED / READY FOR FREEZE REVIEW** | **YES** | exact default business comparison + purpose-specific tolerance supported by all three Pilots |

## 9. Unresolved findings

### 9.1 Does not block entering Numeric Gate 5

- ECQuota XLSX/openpyxl float ingress: prevents a claim of universally lossless lexical workbook ingress; requires explicit ingress policy.
- actual Kotlin/Swift/ArkTS transcendental execution: prevents claiming those clients conform; does not prevent freezing the obligation/reference structure.
- standalone helper authoritative-entry semantics: Candidate already states that promotion to authoritative entry point requires an explicit Profile.
- unified Decimal lexical interchange schema: transport/Canonical detail can follow the core semantic rule.

### 9.2 Belongs primarily to later/adjacent Contract work

- final Quantity public schema;
- coefficient public enum/schema;
- final placement/requiredness of `numeric_behavior_version` in Result/Record.

### 9.3 Gate-5 decision point

D-001 must be deliberately split between:

- what can be frozen now: reference-procedure/profile/operation-order/conformance obligations;
- what remains Profile/platform evidence: concrete implementation library, minimal precision and cross-language tolerance values.

Gate 4 recommends **not** waiting for every future client language before freezing the semantic obligation framework. A client still must execute Conformance before claiming a Capability.

## 10. Proposed Gate-5 scope

Gate 5 should review whether to freeze:

1. authoritative deterministic decimal semantics;
2. Numeric Profile shape and authority-scope requirement;
3. declared-profile propagation + ambient independence;
4. full-value exact business-comparison default;
5. rounding taxonomy;
6. tolerance taxonomy;
7. numerical vs business conformance separation;
8. operation-order/reference-procedure structure;
9. numeric behavior trace/version semantics;
10. Common Core + category-specific Conformance Vector model.

Gate 5 should **not** automatically freeze:

- p50 or p40 globally;
- HALF_EVEN or HALF_UP globally;
- a global epsilon;
- Python Decimal as a universal implementation;
- Unit Contract v1;
- Quantity Schema v1;
- qzpack / Workspace / Result Record new phases.

## 11. Explicit final statement

```text
N01-A evidence accepted: YES
N01-B evidence accepted: YES
N01-C evidence accepted: YES

Cross-pilot review completed: YES

Numeric Contract v1 frozen: NO
Unit Contract v1 frozen: NO

Ready to enter Gate 5: YES
```

`Ready to enter Gate 5: YES` means there is now a reviewable Candidate and a precise list of remaining decisions. It does **not** mean Gate 5 must freeze every Candidate clause unchanged.

## 12. Scope integrity

During QZC-N01-D:

- no ECQuota-Insight file was modified;
- no EquipEffi file was modified;
- no GHGTOOL file was modified;
- no business `platform-lock.json` was modified;
- no `NUMERIC_CONTRACT_V1_FROZEN.md` was created;
- no Unit Contract was frozen;
- no common Python Numeric package was implemented;
- no Kotlin/Swift/ArkTS implementation was started;
- qzpack and Workspace phases were not started.

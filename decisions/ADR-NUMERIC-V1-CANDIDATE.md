# ADR-NUMERIC-V1-CANDIDATE — Numeric Contract v1 Gate-4 Synthesis

Status: **PROPOSED / GATE-4 CANDIDATE**  
Date: 2026-09-30  
Decision authority: Gate 5 review required  
Supersedes: nothing  
Accepted/Frozen: **NO**

## 1. Context

QZC-N01 used three independently accepted business Pilots to test the Numeric Contract draft against real production semantics:

- N01-A — ECQuota / GB 29446—2019;
- N01-B — EquipEffi / GB 19762—2025 Pump;
- N01-C — GHGTOOL / GB/T 32151.34—2024.

The evidence is deliberately heterogeneous. ECQuota exposed a breaking implicit-rounding defect, EquipEffi provided a mature nonlinear Decimal50 reference profile, and GHGTOOL exposed both ambient-context dependence and then a more subtle declared-profile propagation defect.

The central design problem is therefore not “which project setting wins?”. It is which **semantic obligations** must apply regardless of the project-specific precision, rounding mode or algorithm.

## 2. Evidence that configuration values must not be globally unified

### ECQuota

GB 29446 required correction from legacy ROUND6/HALF_UP pre-comparison behavior to full-value exact comparison. N01-A did not establish a new universal working precision or rounding mode.

### EquipEffi

The Pump profile uses precision 50 and ROUND_HALF_EVEN. Precision sensitivity at p28/p34/p40/p50/p60 did not change representative business outcomes, so p50 is not proven to be a universal minimum. Its role is a Pump-specific conservative reference profile.

### GHGTOOL

The Carbon profile uses precision 40 and ROUND_HALF_UP. R1 sensitivity supports that profile for the representative Calculator, but does not establish p40/HALF_UP as a platform default.

### Proposed decision

Do not derive platform configuration by majority vote, averaging, maximum precision or copying the most complex Pilot. The public Contract defines a Numeric Profile declaration model and conformance obligations; each authoritative Profile declares its own justified configuration.

## 3. Breaking evidence for default full-value comparison

N01-A demonstrated that a hidden six-decimal HALF_UP round could turn values just above formal GB 29446 thresholds into equality, materially changing grades.

Examples include:

```text
5.0000004  legacy -> 1级; corrected -> 2级
7.0000004  legacy -> 2级; corrected -> 3级
8.5000004  legacy -> 3级; corrected -> 未达标
```

The governing standard evidence did not require that pre-comparison ROUND6.

### Proposed decision

Default formal comparison is full-value exact comparison. Any business tolerance or pre-comparison rounding must be explicit and source-backed.

## 4. Why implicit rounding is prohibited

Implicit rounding merges calculation semantics, comparison semantics and display semantics into one hidden behavior. It can silently alter boundary outcomes and creates no durable provenance for why a value was rounded.

### Proposed decision

- implicit rounding: prohibited;
- explicit business rounding: allowed only with stage, precision/places/significant digits, mode, purpose and source/provenance;
- display rounding: presentation only and never a formal comparison input unless a Rule explicitly says otherwise.

## 5. Why precision is Profile-specific

N01-B and N01-C used different working precision successfully because their formulas, nonlinear behavior and existing approved evidence differ. N01-A did not justify inventing a fixed precision solely for consistency.

### Proposed decision

`working_precision` is a required capability of a Numeric Profile where relevant, not a platform constant. Gate 5 must not freeze `precision=50`, `precision=40`, or any other number as a universal default without independent evidence.

## 6. Why rounding mode is Profile/purpose-specific

Pump working arithmetic uses HALF_EVEN while its display helper uses HALF_UP. Carbon working arithmetic uses HALF_UP. N01-C executed an exact halfway case proving that mode can be semantically active even when representative production cases do not hit a tie.

### Proposed decision

Rounding mode must be declared with its scope and purpose. A working-context mode does not automatically define display rounding or explicit business rounding.

## 7. Why tolerance must be purpose-specific

The Pilots support different legitimate uses of tolerance:

- formal business boundary — generally none unless standard/Rule says otherwise;
- standard-explicit tolerance;
- numerical/reference acceptance;
- lookup/interpolation matching;
- test/conformance assertion.

N01-B found non-zero nonlinear/operation-order deltas but retained exact business rule/grade outcomes. N01-A required exact threshold semantics. N01-C separates test/numerical tolerance from business comparison.

### Proposed decision

No platform-global epsilon. Every tolerance must identify purpose, mode/value and source where applicable.

## 8. Why Numeric Profile declaration is mandatory

A precision/rounding configuration is auditable only if the calculation can identify which Profile was intended.

### Proposed decision

Every authoritative calculation scope declares an effective Numeric Profile containing at least:

```text
numeric_profile_id
numeric_contract_version
representation
working_precision
rounding_mode
comparison_policy
explicit_rounding_policy
transcendental_policy
tolerance_policy
```

## 9. Why silent fallback is prohibited

The first N01-C acceptance failed because the Calculator could declare one Profile while `_mul()` silently created a default p40/HALF_UP policy. The outer context alone did not prove the helper used the requested Profile.

### Proposed decision

All authoritative operations/helpers/services within an authority scope consume the declared Profile or explicitly declare a traced subprofile. Silent fallback to ambient/default/historical policy is nonconformant.

This first FAIL remains normative negative evidence even though R1 later passed.

## 10. Why ambient independence is a separate requirement

A declared Profile may be propagated correctly but still be overridden by caller/global context; conversely a calculation may be ambient-independent while a helper silently uses the wrong internal Profile.

### Proposed decision

Conformance must test separately:

1. declared-profile propagation/effective profile;
2. caller ambient-context independence.

## 11. Why numerical and business conformance are separate

A nonlinear calculation can differ by tiny finite-precision amounts across a reference and another valid implementation. That does not justify allowing the business decision itself to drift.

### Proposed decision

Numerical output may pass a declared numerical tolerance. Any required difference in `rule_id`, `bucket`, `grade`, `status`, `conclusion` or other business outcome causes Conformance FAIL regardless of numerical tolerance.

## 12. Why operation order becomes reference semantics

N01-B measured non-zero differences between mathematically equivalent expression trees, including p50 differences around `1E-47–1E-48`.

### Proposed decision

For nonlinear/finite-precision authoritative formulas where reordering can affect reference outputs, operation order/tree is part of the versioned reference procedure or Rule semantics. Equivalent alternate procedures require explicit conformance evidence.

## 13. Transcendental reference procedure

PUMP-RP-0.1 provides strong executable structure for sqrt, ln and fractional pow. It does not prove that Python Decimal or p50/HALF_EVEN must be universal.

### Proposed decision

Freeze, at Gate 5 if accepted, the required **reference-procedure structure**:

```text
function_id
input semantics/domain
working profile
operation order
reference procedure/version
normalization
reference output
conformance tolerance
```

Keep concrete cross-language library/algorithm/tolerance values Profile-specific/open until real implementations execute the applicable vectors.

## 14. Unit / Quantity / coefficient boundary

N01-C supports a classification distinction that is already consistent with the Unit Contract draft:

- ordinary unit conversion;
- quantity transformation;
- stoichiometric/standard-formula coefficient;
- characterization/equivalence factor.

### Proposed decision

`44/12` and `44/16` are not public ordinary unit-conversion multipliers. GWP is not an SI/unit multiplier. Final Quantity and coefficient schemas remain separate Gate-5/later Contract work.

## 15. Version traceability

N01-A and N01-C both demonstrate that numeric behavior can change without rewriting the governing business formula/table.

### Proposed decision

Formal result/trace semantics must identify at least:

```text
numeric_contract_version
numeric_profile_id
rule_version and/or calculator_version
```

A first-class `numeric_behavior_version` is proposed for Gate-5/Result-Record review where numeric semantics can version independently from rule/calculator version.

## 16. Conformance model

D-004 evidence supports Common Core + category-specific vector fields rather than one giant mandatory record.

### Proposed decision

Gate 5 should review the candidate defined in:

`conformance/common/numeric/CONFORMANCE_VECTOR_V1_CANDIDATE.md`

and its machine-readable schema candidate.

## 17. Consequences if accepted at Gate 5

Positive:

- projects keep domain autonomy and justified precision/modes;
- numeric behavior becomes explicit, traceable and testable;
- display behavior cannot silently change formal decisions;
- future platform implementations have a concrete conformance target;
- negative evidence such as silent profile fallback becomes preventable by Contract.

Costs:

- authoritative scopes must declare and propagate Profile identity;
- conformance assets become a release obligation;
- projects with historical hidden rounding/default contexts may require breaking numeric migrations after source review;
- cross-language clients must implement decimal/reference behavior deliberately rather than rely on language defaults.

## 18. Open questions retained

This ADR Candidate does not decide:

- one global precision/rounding mode;
- a global epsilon;
- a universal transcendental library;
- final Kotlin/Swift/ArkTS tolerance values;
- lossless XLSX lexical-decimal ingress mechanics;
- final Quantity public schema;
- coefficient public enum/schema;
- final Result/Record placement of `numeric_behavior_version`;
- final Decimal lexical interchange schema.

## 19. Gate-4 status

**PROPOSED / GATE-4 CANDIDATE** only.

No Contract is FROZEN by this ADR. Gate 5 must explicitly accept/reject/edit the candidate and define the release/freeze action.

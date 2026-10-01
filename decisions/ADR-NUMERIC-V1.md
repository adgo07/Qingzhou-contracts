# ADR-NUMERIC-V1 — Numeric Contract v1 Freeze Decision

Status: **ACCEPTED**  
Decision date: 2026-10-01  
Effective repository baseline for this decision: `main@119faba77b4b70fe5681010893dc00cae6dda5af`  
Implementation status: **Contract freeze only; no shared runtime implementation**

> This ADR records the QZC-N01 Gate 5 decision. The frozen Contract/Schema files become the authoritative repository artifacts when the Gate 5 PR is merged. This ADR does not freeze Unit Contract v1, Quantity Schema, qzpack or Workspace/Record contracts.

## 1. Evidence basis

The decision is based on the completed QZC-N01 evidence chain:

- N01-A — ECQuota / GB 29446—2019: independently accepted PASS;
- N01-B — EquipEffi / GB 19762—2025 Pump: independently accepted PASS;
- N01-C — GHGTOOL / GB/T 32151.34—2024: first Independent Acceptance FAIL retained as negative evidence; R1 Independent Re-Acceptance PASS;
- QZC-N01-D Gate 4 Cross-Pilot Candidate: merged as PR #4 at `119faba77b4b70fe5681010893dc00cae6dda5af`;
- QZC-N01-D Independent Acceptance: PASS at Gate-4 head `82c6dda9130f783eca2f1605f0dc7b92e5e87126`, with one non-blocking wording Minor in the Conformance Candidate: `expected_business_result` must be category-conditional rather than universally mandatory.

The three Pilots intentionally differ in concrete working configuration. That difference is evidence for a Profile mechanism, not evidence for one platform-wide precision or rounding mode.

## 2. Accepted decision — Numeric Profile mechanism

Every authoritative calculation scope MUST declare a Numeric Profile able to express at least:

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

Concrete precision and rounding mode are Profile-specific. Numeric Contract v1 does **not** establish p40, p50, ROUND_HALF_UP or ROUND_HALF_EVEN as a platform default.

## 3. Accepted decision — authoritative Profile consistency

Within one authoritative scope, every authoritative operation/helper/service MUST either:

1. consume the declared effective Numeric Profile; or
2. explicitly declare and trace a sub-profile.

Silent fallback to an ambient/default/historical Numeric Profile is prohibited.

The first N01-C acceptance FAIL is retained as the key negative example: an outer requested Profile did not guarantee that `_mul()` consumed that Profile.

## 4. Accepted decision — ambient independence

Caller/runtime ambient numeric context MUST NOT silently change the formal result of a scope that already declares a Numeric Profile.

The following are independent conformance obligations:

- declared-profile consistency;
- ambient independence.

Passing one does not prove the other.

## 5. Accepted decision — comparison and rounding

Default formal business comparison is:

```text
full-value exact comparison
```

No epsilon and no pre-comparison rounding is implied.

Numeric Contract v1 distinguishes:

- working rounding;
- explicit business rounding;
- display rounding;
- implicit rounding.

Implicit rounding is prohibited by default.

Explicit business rounding is allowed only when a standard/Rule/domain specification explicitly authorizes it and records stage, precision/places/significant digits as applicable, mode, purpose and source/provenance.

Display rounding is presentation-only and cannot feed formal calculation/comparison unless an explicit Rule says otherwise.

## 6. Accepted decision — tolerance taxonomy

Numeric Contract v1 freezes these tolerance purposes:

```text
business-boundary
standard-explicit
algorithmic/numerical
lookup/interpolation
test/conformance
```

A platform-global epsilon is prohibited.

Numerical acceptance and business acceptance are separate: even when a numerical delta is within an allowed numerical tolerance, a difference in required business output such as `rule`, `bucket`, `grade`, `status` or `conclusion` is Conformance FAIL.

A standard-defined tolerance must retain source/provenance and its application semantics.

## 7. Accepted decision — transcendental structure, not universal implementation

For supported nonlinear/transcendental behavior, the Contract freezes the obligation to define:

```text
function_id
input/domain semantics
declared Numeric Profile
operation order
reference procedure/version
normalization
reference output
conformance tolerance
```

Business-result conformance remains distinct from numerical-result conformance.

This ADR does **not** freeze:

- one universal math library;
- one platform-wide minimum precision;
- one universal transcendental tolerance;
- a claim that Kotlin/Swift/ArkTS implementations have already passed conformance.

Those remain OPEN under D-001.

## 8. Accepted decision — value-stage semantics

The Contract distinguishes:

```text
input
normalized
calculation
comparison
display
```

An implementation does not have to persist five separate fields when the stages are identical or not audit-relevant, but it must not conflate their semantics where they differ.

## 9. Accepted decision — traceability

A formal result must be able to identify at least:

```text
numeric_contract_version
numeric_profile_id
calculator_version and/or rule_version
```

A separate first-class `numeric_behavior_version` remains a Result/Record Contract decision. Its unresolved field placement does not block Numeric Contract v1.

## 10. Accepted decision — Conformance Vector v1 Numeric model

D-004 is resolved for the Numeric portion using:

> **Common Core + category-specific fields**

The Gate 4 wording Minor is corrected in the frozen specification: `expected_business_result` is **not** universally required. Every vector must provide at least one category-appropriate expected outcome, such as:

- expected business result;
- expected reference value;
- expected error.

Comparison, rounding, transcendental/reference, tolerance, quantity/coefficient, effective-profile and legacy fields are conditional by category.

## 11. Accepted decision — D-011 conceptual boundary only

The following are accepted as distinct semantic categories:

```text
ordinary unit conversion
quantity transformation
stoichiometric / standard-formula coefficient
characterization / equivalence factor
```

Accordingly, `44/12` and `44/16` are not public ordinary-unit conversion multipliers merely because a legacy API can express them that way, and GWP is a characterization/equivalence factor rather than ordinary unit scaling.

D-011 remains **PARTIALLY RESOLVED**. This ADR does not freeze:

- Quantity public schema;
- `substance_id` requiredness or enum;
- `equivalence_basis` requiredness or final shape;
- coefficient public schema/enum;
- final public CO₂e model.

## 12. Decision status

- D-001: **PARTIALLY RESOLVED** — structure/obligations frozen; implementation/library/minimum precision/universal tolerance remain OPEN.
- D-004: **RESOLVED / FROZEN IN NUMERIC CONFORMANCE VECTOR v1**.
- D-011: **PARTIALLY RESOLVED** — conceptual classification frozen; public schema remains OPEN.
- D-012: **RESOLVED / FROZEN IN NUMERIC CONTRACT v1**.

## 13. Explicit OPEN items after QZC-N01

The following remain OPEN and do not block Numeric Contract v1:

1. ECQuota Excel/openpyxl numeric-cell binary-float ingress and a common lossless workbook-ingress policy;
2. actual Kotlin/Swift/ArkTS transcendental conformance execution;
3. Quantity public schema;
4. coefficient public schema/enum;
5. final Result/Record placement/requiredness of `numeric_behavior_version`;
6. concrete conformance and API treatment when a standalone helper becomes an authoritative public entry point;
7. unified Decimal lexical interchange / Excel ingress public scheme.

## 14. Scope exclusions

This decision does not authorize:

- modification of ECQuota-Insight, EquipEffi or GHGTOOL;
- modification of any business `platform-lock.json`;
- a common Numeric Python package;
- Kotlin/Swift/ArkTS implementation work;
- Unit Contract v1 freeze;
- complete Quantity Schema freeze;
- qzpack work;
- Workspace/Record phase work;
- additional N01 Pilot work.

## 15. Consequence

QZC-N01 may close after this Gate 5 freeze is merged. Future implementations or migrations must adopt Numeric Contract v1 through their own controlled compatibility/adoption work and applicable Conformance Vectors; this ADR does not silently upgrade the three business repositories.

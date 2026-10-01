# QZC-N01-E — Numeric Contract v1 Gate 5 Freeze Report

Status: **GATE 5 FREEZE DECISION COMPLETE / NUMERIC CONTRACT v1 FROZEN**  
Date: 2026-10-01  
Central repository: `adgo07/Qingzhou-contracts`  
Gate-5 base: `main@119faba77b4b70fe5681010893dc00cae6dda5af`

## 1. Entry verification

Gate 5 started only after Gate 4 was merged.

Verified:

- PR #4 `QZC-N01-D: Cross-pilot review and Numeric v1 candidate synthesis` is merged;
- Gate 4 merge commit / current Gate-5 base: `119faba77b4b70fe5681010893dc00cae6dda5af`;
- Gate-4 Candidate head: `82c6dda9130f783eca2f1605f0dc7b92e5e87126`;
- Gate 4 Independent Acceptance: **PASS**;
- Gate 4 Minor: `expected_business_result` wording in the Candidate conflicted with the category-conditional requiredness model in §12/machine schema; Gate 5 corrected this in the frozen Conformance v1 specification.

Gate 5 did not start a new Pilot and did not re-open the three business projects' accepted evidence.

## 2. Evidence basis

Numeric Contract v1 is frozen from the evidence already accepted through QZC-N01:

### N01-A — ECQuota / GB 29446—2019

Accepted evidence:

- full-value exact threshold behavior;
- T−δ/T/T+δ execution;
- breaking evidence that implicit ROUND6 could change formal grade;
- display rounding separated from business comparison;
- numeric behavior traceability;
- unresolved Excel/openpyxl numeric-cell float ingress retained as OPEN.

### N01-B — EquipEffi / GB 19762—2025 Pump

Accepted evidence:

- Pump-specific Decimal50 / ROUND_HALF_EVEN working Profile;
- sqrt / ln / fractional pow execution;
- p28/p34/p40/p50/p60 sensitivity;
- operation-order sensitivity;
- numerical tolerance separated from exact business outcome;
- Approved Golden replay;
- no actual Kotlin/Swift/ArkTS execution.

### N01-C — GHGTOOL / GB/T 32151.34—2024

Accepted evidence:

- p40 / ROUND_HALF_UP Carbon project Profile;
- first formal Independent Acceptance FAIL retained as negative evidence for silent helper fallback;
- R1 declared-profile propagation PASS;
- ambient-context independence separately proven;
- profile mismatch rejection;
- ordinary unit conversion separated from quantity transformation/coefficient/characterization semantics.

## 3. Frozen artifacts created

Gate 5 creates:

- `contracts/numeric/NUMERIC_CONTRACT_V1_FROZEN.md`;
- `contracts/numeric/NUMERIC_PROFILES_V1_FROZEN.md`;
- `conformance/common/numeric/CONFORMANCE_VECTOR_V1_FROZEN.md`;
- `conformance/common/numeric/conformance_vector_v1.schema.json`;
- `decisions/ADR-NUMERIC-V1.md` with status `ACCEPTED`;
- this report.

Gate 4 Candidate/Draft artifacts are retained as historical design/evidence records; they are not rewritten to pretend they were always frozen.

## 4. Numeric Contract v1 frozen rules

### 4.1 Numeric Profile

Every authoritative calculation scope must declare an effective Numeric Profile capable of expressing:

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

No platform-wide p40, p50, HALF_UP or HALF_EVEN default is frozen.

### 4.2 Authoritative Profile consistency

Every authoritative operation/helper/service must consume the declared Profile or explicitly declare/trace a sub-profile.

Silent fallback to another/default/historical Profile is prohibited.

### 4.3 Ambient independence

Caller/runtime ambient numeric context may not silently change a result governed by a declared Profile.

Ambient independence and declared-profile consistency are separate conformance obligations.

### 4.4 Formal comparison

Default formal business comparison is:

`full-value exact comparison`

No default epsilon and no hidden pre-comparison rounding.

### 4.5 Rounding

Frozen distinction:

- working rounding;
- explicit business rounding;
- display rounding;
- implicit rounding.

Implicit rounding is prohibited by default.

Explicit business rounding requires declared stage, precision/places/significant digits as applicable, mode, purpose and source/provenance.

Display rounding cannot feed authoritative calculation/comparison by itself.

### 4.6 Tolerance

Frozen purposes:

```text
business-boundary
standard-explicit
algorithmic/numerical
lookup/interpolation
test/conformance
```

Platform-global epsilon is prohibited.

Even when a numerical difference is within a valid tolerance, a differing governed business result such as rule/bucket/grade/status/conclusion remains Conformance FAIL.

### 4.7 Transcendental Contract

Frozen structure/obligations:

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

Not frozen:

- universal math library;
- platform minimum precision;
- universal transcendental tolerance;
- unexecuted Kotlin/Swift/ArkTS implementations.

### 4.8 Calculation / comparison / display stages

Contract semantics distinguish:

```text
input
normalized
calculation
comparison
display
```

They need not always be persisted as five physical fields, but may not be semantically conflated where they differ.

### 4.9 Numeric traceability

Formal results must be able to trace:

```text
numeric_contract_version
numeric_profile_id
calculator_version and/or rule_version
```

`numeric_behavior_version` remains a later Result/Record field decision and does not block Numeric v1.

## 5. Numeric Profiles v1 decision

The Profile mechanism is frozen, while the three Pilot profiles remain business/evidence Profiles:

- ECQuota / GB29446 full-value Profile evidence;
- EquipEffi Pump Decimal50/HALF_EVEN Profile evidence;
- GHGTOOL Carbon p40/HALF_UP Profile evidence.

They are not platform configuration templates and do not form a closed registry.

## 6. Conformance Vector v1 decision

D-004 Numeric portion is frozen as:

> **Common Core + category-specific fields**

Frozen Common Core:

```text
case_id
category
numeric_contract_version
numeric_profile_id
authority_scope
inputs
source/provenance
```

Every vector must additionally carry at least one category-appropriate expected outcome:

```text
expected_business_result
expected_reference_value
expected_error
```

This directly resolves the Gate 4 Minor: `expected_business_result` is not universally mandatory.

Comparison, rounding, transcendental/reference, tolerance, profile propagation, migration and Unit/Quantity/coefficient fields remain conditional by category.

## 7. Decision review

### D-001 — Transcendental Numeric reference procedure

**Gate-5 status: PARTIALLY RESOLVED**

Frozen:

- reference procedure requirement;
- operation order requirement;
- declared Numeric Profile requirement;
- explicit reference/conformance tolerance requirement;
- numerical result vs business result separate acceptance.

OPEN:

- actual Kotlin/Swift/ArkTS implementation/conformance;
- one unified math library;
- platform-wide minimum precision;
- universal transcendental tolerance.

The OPEN implementation details do not block Numeric Contract v1.

### D-004 — Conformance Vector v1 exact schema

**Gate-5 status: RESOLVED / FROZEN**

Numeric Conformance Vector v1 is frozen using the Common Core + category-specific model and the corrected conditional expected-outcome wording.

Quantity-bound fields remain optional/category-specific and do not freeze Quantity Schema.

### D-011 — Carbon quantity / unit / coefficient boundary

**Gate-5 status: PARTIALLY RESOLVED**

Frozen conceptual distinction:

```text
ordinary unit conversion
quantity transformation
stoichiometric / standard-formula coefficient
characterization / equivalence factor
```

Still OPEN:

- Quantity public schema;
- `substance_id` final schema/requiredness;
- `equivalence_basis` final schema/requiredness;
- coefficient public schema/enum;
- CO₂e final public model.

Unit Contract v1 remains unfrozen.

### D-012 — Numeric tolerance / exact comparison

**Gate-5 status: RESOLVED / FROZEN IN NUMERIC CONTRACT v1**

Frozen:

- default business comparison is exact/full-value;
- tolerance must be purpose-specific;
- no platform-global epsilon;
- test/numerical tolerance is separate from business tolerance;
- numerical tolerance cannot hide a business mismatch;
- standard-defined tolerance requires source/provenance and application semantics.

## 8. Explicit OPEN items retained

The following remain OPEN after QZC-N01 and do not block Numeric Contract v1:

1. ECQuota Excel/openpyxl binary-float ingress and common lossless workbook-ingress handling;
2. Kotlin/Swift/ArkTS actual transcendental conformance;
3. Quantity public schema;
4. coefficient public schema/enum;
5. final Result/Record field location/requiredness for `numeric_behavior_version`;
6. concrete API/conformance treatment when a standalone helper becomes an authoritative public entry point;
7. Decimal lexical interchange / Excel ingress common public scheme.

## 9. Scope integrity

Gate 5 does not:

- modify ECQuota-Insight;
- modify EquipEffi;
- modify GHGTOOL;
- modify any business `platform-lock.json`;
- implement a common Numeric Python package;
- implement Kotlin/Swift/ArkTS;
- freeze Unit Contract v1 as a whole;
- freeze Quantity Schema;
- start qzpack;
- start Workspace/Record work;
- create another N01 Pilot.

## 10. QZC-N01 closure

This Gate 5 decision completes the QZC-N01 Numeric Pilot program at the central Contract level.

Future work is adoption, implementation or adjacent-Contract work; it is not an extension of N01 Pilot evidence gathering unless a later explicit governance decision creates a new program.

## 11. Final statement

```text
Numeric Contract v1 frozen:
YES

D-001:
PARTIALLY RESOLVED

D-004:
RESOLVED / FROZEN

D-011:
PARTIALLY RESOLVED

D-012:
RESOLVED / FROZEN

Unit Contract v1 frozen:
NO

Quantity Schema frozen:
NO

Three business projects modified:
NO
```

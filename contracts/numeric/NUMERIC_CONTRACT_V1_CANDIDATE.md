# Qingzhou Numeric Contract v1 — Gate-4 Candidate

Status: **GATE-4 CANDIDATE / NOT FROZEN**  
Evidence basis: QZC-N01-A / N01-B / N01-C independently accepted Pilot evidence  
Foundation baseline: `contracts-v0.1.0` → `0cd74d783fa23add6dc881b408a8c8ba8503f8e8`

> This document is the Gate-4 synthesis for Gate-5 review. It does not replace `NUMERIC_CONTRACT_V1_DRAFT.md`, does not create a FROZEN Contract and does not require the three projects to share implementation code.

## 1. Scope and objective

The common Contract standardizes **numeric semantics and obligations**, not one concrete numeric configuration.

A compliant business implementation may use a project/Profile-specific working precision, rounding mode and reference procedure, provided the effective Numeric Profile is explicit, traceable and passes the applicable Conformance Vectors.

The following are expressly **not** implied by this Candidate:

- all calculators use precision 50;
- all calculators use precision 40;
- all calculators use ROUND_HALF_EVEN;
- all calculators use ROUND_HALF_UP;
- all languages must use the same numeric library;
- all numerical comparisons use one global epsilon.

## 2. Authoritative numeric representation

### 2.1 Contract semantic

A formal authoritative numeric chain MUST use deterministic, reproducible decimal semantics for business values whose source/rule is decimal.

Canonical thresholds, factors, parameters and other exact decimal literals SHOULD cross authoritative serialized boundaries as decimal lexical text unless the transport schema provides an equivalently lossless decimal representation.

IEEE-754 binary float MUST NOT become the authoritative business value through an undeclared conversion path.

### 2.2 Numeric ingress is a declared boundary

Each authoritative ingress MUST declare how external representations become the normalized decimal value.

A compliant ingress may reject binary float, or may define an explicit, tested conversion policy where an upstream technology has already materialized a float. It MUST NOT pretend that such a route preserves the original lexical decimal when it does not.

N01-A demonstrated a real open boundary: openpyxl can read a numeric XLSX cell as Python `float` before the adapter performs `str(value) -> Decimal`. Therefore Gate 4 does **not** claim that all current applications already provide lossless lexical-decimal ingress.

This remains an OPEN ingress/interchange item.

## 3. Numeric Profile Contract

Every authoritative calculation scope MUST declare an effective Numeric Profile.

A Profile MUST be able to declare at least:

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

A Profile MAY additionally declare:

```text
display_policy
normalization_policy
ingress_policy
operation_order_policy
profile_version
source/provenance
```

The concrete values are Profile-specific. The public Contract does not define one platform-wide precision or rounding mode.

## 4. Authority Scope and profile propagation

### 4.1 Scope declaration

An **authority scope** is the bounded execution in which a declared Profile controls a formal business calculation, rule evaluation or transformation.

Examples include a Calculator invocation, a versioned rule evaluation, or another explicitly declared formal calculation entry point.

### 4.2 Authoritative operation obligation

Within an authority scope, every authoritative operation — including:

- arithmetic;
- helper functions;
- formula coefficients;
- lookup/interpolation arithmetic;
- nonlinear/transcendental functions;
- totals/aggregation;
- authoritative unit conversion;

MUST either:

1. consume the scope's declared Numeric Profile; or
2. explicitly declare an independent sub-Profile and record that sub-Profile in trace.

A silent fallback to an ambient/default/historical Profile is prohibited.

### 4.3 Normative rationale from N01-C first FAIL

The first N01-C Independent Acceptance is retained as negative evidence. A `CarbonMaterialCalculator` could request p50 while `_mul()` silently constructed a default p40/HALF_UP policy. The outer context therefore looked correct while the formal execution was internally mixed-profile.

R1 proved that fixing ambient context alone is insufficient: **declared-profile propagation** must be tested through authoritative helpers and services.

## 5. Ambient independence

Caller/runtime ambient numeric context MUST NOT silently alter a result whose authority scope has already declared a Numeric Profile.

Two independent Conformance requirements exist:

1. **declared-profile consistency** — every authoritative operation consumes the intended effective Profile;
2. **ambient independence** — changing an unrelated caller/global context does not change the result for the same declared Profile.

Passing one requirement does not prove the other.

## 6. Value-stage semantics

The Contract distinguishes the following concepts:

```text
input_value
normalized_value
calculation_value
comparison_value
display_value
```

They MAY have identical values in a simple case, but their semantics MUST NOT be conflated.

- `input_value`: received business/input representation.
- `normalized_value`: value after declared ingress/unit/normalization policy.
- `calculation_value`: authoritative value produced/consumed by the calculation chain.
- `comparison_value`: value used in the formal comparison after any **explicitly authorized** business rounding/transformation.
- `display_value`: presentation/report representation.

Not every implementation or Record is required to persist five separate fields. The semantic distinction is mandatory where stages differ or are needed for audit/conformance.

## 7. Rounding taxonomy

### 7.1 Implicit rounding

Implicit rounding is prohibited by default.

Examples of prohibited hidden behavior include:

```text
ROUND(actual, 6) before a threshold comparison without Rule/source authority
round(value, display_places) and reuse it as comparison input
format to a string and parse it back for business comparison
use an epsilon merely to hide a precision/rounding defect
```

N01-A demonstrated that legacy ROUND6/HALF_UP could materially change GB 29446 grades around exact boundaries.

### 7.2 Explicit business rounding

Explicit business rounding is permitted only when the governing standard, Rule or approved domain specification requires it.

The rule MUST declare at least:

```text
stage
precision / places / significant_digits
mode
purpose
source / provenance
```

It MUST be clear whether the rounded result becomes `comparison_value` or is only an intermediate output.

### 7.3 Display rounding

Display rounding affects presentation only and MUST NOT feed back into formal calculation or comparison.

A displayed value may equal a threshold while the full calculation/comparison value lies above or below that threshold; the formal result follows the declared comparison semantics, not the display string.

## 8. Formal business comparison

Unless the standard/Rule explicitly declares a different policy, formal business comparison uses:

```text
full-value exact comparison
```

with ordinary ordered operators such as:

```text
<
<=
==
>=
>
```

No epsilon is added by default.

If a standard/Rule requires explicit tolerance or explicit pre-comparison rounding, it MUST be represented as an explicit policy with source/provenance.

## 9. Tolerance taxonomy

A tolerance MUST have a declared purpose. At minimum the Contract recognizes:

```text
business-boundary
standard-explicit
algorithmic/numerical
lookup/interpolation
test/conformance
```

Display formatting is **not** a numeric tolerance category.

A platform-wide global epsilon MUST NOT simultaneously serve multiple purposes.

### 9.1 business-boundary tolerance

A tolerance that changes formal pass/fail/grade/range/status semantics. It is prohibited unless a standard/Rule explicitly authorizes it.

### 9.2 standard-explicit tolerance

A tolerance explicitly defined by a governing source. The source, units, direction/range and application stage must be traceable.

### 9.3 algorithmic/numerical tolerance

A tolerance used for convergence, numerical stability or acceptance of an approximation/reference implementation. It MUST NOT silently become a business boundary tolerance.

### 9.4 lookup/interpolation tolerance

A tolerance used to select/match an index, table or interpolation boundary. Its semantics are independent from formal business-grade tolerance.

### 9.5 test/conformance tolerance

A tolerance used to compare numerical implementations or outputs during testing/conformance. It does not alter business logic.

## 10. Numerical conformance vs business conformance

Numerical conformance and business conformance are separate.

A numerical output MAY pass a declared numerical tolerance when compared with a reference output.

However, if any required business output differs — including but not limited to:

```text
rule_id
bucket
grade
status
conclusion
```

then Conformance MUST fail, even if the raw numerical delta is within the permitted numerical tolerance.

N01-B provides the primary evidence: operation-order alternatives can produce non-zero final-digit differences while business results remain stable. The tolerance is therefore a numerical acceptance device, not permission to change business semantics.

## 11. Transcendental and nonlinear operations

The Contract applies to at least:

```text
sqrt
ln
fractional pow
exp  # when a supported Profile/Rule uses it
```

A transcendental/reference procedure MUST be able to declare:

```text
function_id
input semantics / domain
working_profile
operation_order
reference_procedure
normalization
reference_output
conformance_tolerance
```

Additional function-specific metadata MAY be required.

### 11.1 No global Pump precision mandate

N01-B's Decimal50 / ROUND_HALF_EVEN / PUMP-RP-0.1 is strong reference evidence but remains a Pump Profile. It does not establish p50 or HALF_EVEN as a platform default.

### 11.2 Cross-language status

Python evidence is executable and mature enough to define the **reference-procedure structure**. Kotlin/Swift/ArkTS implementations were not actually executed in N01. Therefore a universal cross-language error bound, one mandated transcendental library, and a globally minimal precision remain OPEN.

A future client cannot claim the corresponding Capability merely because this Contract exists; it must execute and pass the applicable Conformance Vectors.

## 12. Operation order

Mathematically equivalent formulas are not guaranteed to produce identical finite-precision results.

For an authoritative formula using nonlinear functions or finite-precision arithmetic where reordering can affect the reference result, the operation tree/order MUST be part of the reference procedure or Rule semantics.

An algebraic transformation MAY be used only when its preconditions and equivalence semantics are explicit and Conformance proves that required business behavior is preserved.

N01-B observed non-zero p50 differences around `1E-47–1E-48` between mathematically equivalent expression trees. This is sufficient to require explicit operation-order semantics without declaring the current Pump tree globally superior.

## 13. Numeric behavior and version traceability

A formal result MUST be able to identify the numeric semantics that produced it.

At minimum the trace/result context MUST support:

```text
numeric_contract_version
numeric_profile_id
rule_version and/or calculator_version
```

Where numeric behavior can change independently from the business formula/rule version, a first-class concept such as:

```text
numeric_behavior_version
```

is a Gate-5 candidate.

N01-A demonstrates why: the formula and threshold table remained the same while the formal grade semantics changed from legacy ROUND6 to full-value comparison. N01-C similarly changed numeric authority behavior without changing the GB/T formula mapping.

The current Result/Record Draft already carries `numeric_contract_version`, `profile_id?`, `rule_version` and `calculator_version?`, but it does not yet freeze the final location/name/requiredness of `numeric_behavior_version`.

Gate 4 therefore freezes **no Result/Record field**. It establishes the semantic requirement and forwards final field placement to Gate 5 / Result-Record review.

## 14. Unit, quantity and coefficient boundary

Numeric semantics apply to values used in Unit/Quantity calculations, but Numeric Contract does not collapse these concepts.

The central classification candidate is:

```text
ordinary unit conversion
quantity transformation
stoichiometric / standard-formula coefficient
characterization / equivalence factor
```

Examples:

- kg↔t: ordinary unit conversion.
- kWh/MWh↔GJ: ordinary unit conversion.
- C mass → CO₂ mass using 44/12: quantity transformation using a stoichiometric/standard-formula coefficient.
- CH₄ mass → CO₂ mass using 44/16 in the relevant formula: quantity transformation using a stoichiometric/standard-formula coefficient.
- greenhouse-gas mass → CO₂e using GWP: equivalence/characterization transformation using a versioned factor.

`44/12` and `44/16` MUST NOT be normalized into a public ordinary-unit conversion multiplier merely because a legacy service exposes such an API.

The final Quantity Schema remains outside this Numeric Candidate and is partially OPEN under D-011.

## 15. Conformance obligations

A Numeric Profile/Capability MUST be backed by executable Conformance Vectors appropriate to the claimed categories.

The Candidate schema model is defined by:

`conformance/common/numeric/CONFORMANCE_VECTOR_V1_CANDIDATE.md`

Conformance SHOULD cover, where applicable:

- deterministic ingress/normalization;
- exact threshold T−δ/T/T+δ;
- explicit rounding;
- display separation;
- precision sensitivity;
- nonlinear reference outputs;
- operation-order sensitivity;
- numerical tolerance purpose;
- business-output exactness;
- profile propagation;
- ambient independence;
- profile mismatch rejection;
- legacy-vs-current behavior when a breaking migration exists.

## 16. Evidence Profiles

The three N01 project profiles are recorded in:

`contracts/numeric/NUMERIC_PROFILES_V1_CANDIDATE.md`

They are evidence/project profiles, not a complete or frozen public Profile registry.

## 17. Gate-4 OPEN items

The following remain explicitly OPEN:

1. lossless workbook/XLSX decimal ingress policy;
2. actual Kotlin/Swift/ArkTS transcendental conformance;
3. final cross-language tolerance values and any function-specific minimum precision;
4. unified decimal lexical interchange schema;
5. final `numeric_behavior_version` placement/requiredness in Result/Record;
6. public Quantity Schema and coefficient enums (other Contracts);
7. exact public identifiers/enums for tolerance/reference procedure metadata.

These OPEN items do not authorize silent defaults.

## 18. Gate-5 review boundary

Gate 5 may review freezing the common semantics in this Candidate. It MUST separately decide which open details are normative in Numeric Contract v1 versus delegated to Profile, Conformance, Unit/Quantity or Result/Record Contracts.

Gate 4 makes no FROZEN declaration.

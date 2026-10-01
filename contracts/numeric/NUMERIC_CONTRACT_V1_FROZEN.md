# Qingzhou Numeric Contract v1

Status: **FROZEN — Numeric Contract v1**  
Freeze decision: `decisions/ADR-NUMERIC-V1.md`  
Evidence program: QZC-N01 Gates 1–5  
Gate-5 base: `main@119faba77b4b70fe5681010893dc00cae6dda5af`

> This Contract freezes public Numeric semantics and obligations. It does not mandate one implementation library, one platform-wide precision, one platform-wide rounding mode, one global epsilon, a complete Unit Contract, or a complete Quantity Schema.

## 1. Scope and normative language

This Contract applies to `qz.energy_quota`, `qz.equipment_efficiency`, `qz.carbon_accounting`, and any future implementation claiming the same governed Numeric Capability.

`MUST`, `MUST NOT`, `SHOULD`, `MAY` are normative terms.

The public Contract standardizes **numeric semantics and conformance obligations**, not one shared source-code implementation or one shared project configuration.

## 2. Authoritative numeric semantics

A formal authoritative numeric chain MUST use deterministic, reproducible decimal semantics for business values whose governing source/rule is decimal.

IEEE-754 binary float MUST NOT become an authoritative business value through an undeclared conversion path.

Exact decimal thresholds, factors, parameters and similar authoritative literals SHOULD cross serialized authoritative boundaries as decimal lexical text, or through an equivalently lossless decimal representation defined by the applicable transport schema.

### 2.1 Ingress boundary

An authoritative ingress MUST declare how external representation becomes the normalized authoritative value.

If an upstream technology has already materialized a binary float, an implementation MUST NOT claim that the original lexical decimal has been preserved unless it can prove that preservation.

A common lossless Excel/openpyxl/lexical interchange scheme remains OPEN. This does not weaken the frozen rule that an undeclared binary-float conversion path cannot silently become business authority.

## 3. Numeric Profile

Every authoritative calculation scope MUST declare an effective Numeric Profile.

A Numeric Profile MUST be able to express at least:

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

A Profile MAY additionally express:

```text
profile_version
ingress_policy
display_policy
normalization_policy
operation_order_policy
source/provenance
```

### 3.1 No platform-wide concrete default

Concrete values are Profile-specific.

Numeric Contract v1 MUST NOT be interpreted as establishing any of the following as a platform-wide default:

```text
precision = 40
precision = 50
ROUND_HALF_UP
ROUND_HALF_EVEN
```

or any other single precision/rounding configuration without an explicit Profile/Rule decision.

## 4. Authoritative Profile consistency

An **authoritative calculation scope** is the bounded execution in which a declared Numeric Profile governs a formal business calculation, rule evaluation, transformation or other formal numeric decision.

Within that scope, every authoritative operation/helper/service — including arithmetic, formula coefficients, lookup/interpolation arithmetic, nonlinear/transcendental operations, authoritative unit conversion and totals/aggregation — MUST either:

1. consume the declared effective Numeric Profile; or
2. explicitly declare an independent sub-profile and record that sub-profile in trace.

Silent fallback to an ambient/default/historical Numeric Profile is prohibited.

A caller-visible Profile declaration alone does not prove conformance. Conformance MUST be able to verify the effective Profile actually consumed by authoritative operations where propagation is material.

## 5. Ambient independence

Caller/runtime ambient numeric context MUST NOT silently change the formal result of an authoritative scope that already declares a Numeric Profile.

The following are separate requirements:

1. **declared-profile consistency** — authoritative operations consume the intended Profile/sub-profile;
2. **ambient independence** — unrelated caller/global numeric context does not alter the result for the same declared Profile.

Passing one requirement does not prove the other.

## 6. Value-stage semantics

The Contract distinguishes:

```text
input_value
normalized_value
calculation_value
comparison_value
display_value
```

Their meanings are:

- `input_value` — received business/input representation;
- `normalized_value` — value after declared parsing, ingress, unit or normalization policy;
- `calculation_value` — authoritative value produced or consumed by the calculation chain;
- `comparison_value` — value used in formal comparison after any explicitly authorized business transformation/rounding;
- `display_value` — presentation/report representation.

The stages MAY be numerically identical in a simple case.

An implementation is not required to persist five separate fields when no audit/conformance distinction is needed, but it MUST NOT conflate their semantics when they differ.

## 7. Formal comparison

Unless a governing standard/Rule explicitly declares another policy, formal business comparison MUST use:

```text
full-value exact comparison
```

Common ordered operators include:

```text
<
<=
==
>=
>
```

No epsilon is added by default.

No pre-comparison rounding is implied by display precision, historical implementation habit or numerical convenience.

A standard/Rule may explicitly define a tolerance or explicit pre-comparison rounding. Such behavior is an explicit exception and MUST retain its source/provenance and application semantics.

## 8. Rounding taxonomy

Numeric Contract v1 distinguishes four concepts:

```text
working rounding
explicit business rounding
display rounding
implicit rounding
```

### 8.1 Working rounding

Working rounding is the rounding behavior of finite-precision arithmetic under the declared Numeric Profile.

It MUST be declared by the Profile where relevant. It does not automatically define display rounding or explicit business rounding.

### 8.2 Explicit business rounding

Explicit business rounding is allowed only when a governing standard, Rule or approved domain specification explicitly requires it.

It MUST declare at least:

```text
stage
precision / places / significant_digits  # as applicable
mode
purpose
source / provenance
```

The specification MUST state whether the rounded result becomes the formal `comparison_value` or only an intermediate result.

### 8.3 Display rounding

Display rounding affects presentation only.

A display-rounded value MUST NOT feed back into authoritative calculation or comparison unless the governing Rule explicitly defines that transformation as formal business logic.

### 8.4 Implicit rounding

Implicit rounding is prohibited by default.

Examples of prohibited hidden behavior include:

```text
round/quantize before a threshold comparison without Rule/source authority
round to display places and reuse as comparison input
format to text and parse back to manufacture a business comparison value
introduce hidden rounding solely to hide a precision defect
```

## 9. Tolerance taxonomy

Every tolerance MUST have an explicit purpose.

Numeric Contract v1 freezes these purposes:

```text
business-boundary
standard-explicit
algorithmic/numerical
lookup/interpolation
test/conformance
```

Display formatting is not a tolerance category.

A platform-global epsilon is prohibited.

### 9.1 business-boundary

A tolerance that changes formal pass/fail/range/grade/status semantics.

It MUST NOT exist by default. It requires explicit governing Rule/standard authority.

### 9.2 standard-explicit

A tolerance explicitly stated by a governing source.

Its source, units/dimension, application stage and direction/range semantics MUST be traceable.

### 9.3 algorithmic/numerical

A tolerance used for numerical approximation, convergence, numerical stability or reference-output acceptance.

It MUST NOT silently become a business-boundary tolerance.

### 9.4 lookup/interpolation

A tolerance used for table/index matching, interpolation selection or similar numerical lookup behavior.

Its semantics are separate from formal business-boundary tolerance.

### 9.5 test/conformance

A tolerance used by tests or cross-implementation numerical conformance.

It does not alter the governed business Rule.

## 10. Numerical conformance vs business conformance

Numerical conformance and business conformance are separate.

A numerical result MAY be accepted when its difference from a reference value falls within an explicitly declared numerical tolerance.

However, if any required formal business result differs, Conformance MUST fail even when the numerical delta is within tolerance.

This includes, where applicable:

```text
rule
rule_id
bucket
grade
status
conclusion
```

or any equivalent governed business outcome.

Numerical tolerance is therefore not permission for business behavior to drift.

## 11. Transcendental / nonlinear Contract

This section applies to supported functions such as:

```text
sqrt
ln
fractional pow
exp
```

and to composite authoritative formulas whose finite-precision/nonlinear execution requires a reference procedure.

For each supported transcendental/reference capability, the governed specification MUST define:

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

The applicable Conformance MUST separately validate numerical acceptance and formal business outcome acceptance.

### 11.1 Operation order

Mathematically equivalent formulas are not assumed to produce identical finite-precision outputs.

Where operation order can affect the reference result, the operation tree/order MUST be part of the Rule or reference procedure semantics.

An alternate algebraic form MAY be used only when its preconditions/equivalence are explicit and Conformance proves the required business behavior.

### 11.2 Items intentionally not frozen

Numeric Contract v1 does **not** freeze:

- one required math library for all languages;
- one platform-wide minimum working precision;
- one universal transcendental tolerance;
- a claim that Kotlin/Swift/ArkTS implementations have already passed the relevant Conformance.

Those remain OPEN under D-001.

## 12. Numeric traceability

A formal result MUST be able to identify at least:

```text
numeric_contract_version
numeric_profile_id
calculator_version and/or rule_version
```

These identifiers MAY be stored directly in a Result/Record envelope or through an equivalent immutable trace/reference structure, provided the result remains auditable.

Where numeric behavior can change independently from the formula/rule version, a separate `numeric_behavior_version` is permitted and may be required by a future Result/Record Contract.

The final public field location/name/requiredness of `numeric_behavior_version` remains OPEN and does not block Numeric Contract v1.

## 13. Numeric Profiles mechanism

The frozen Profile mechanism is documented in:

`contracts/numeric/NUMERIC_PROFILES_V1_FROZEN.md`

The three QZC-N01 Pilot profiles are retained there as evidence/project Profile examples.

They are not platform-mandated configuration templates and do not form an exhaustive registry.

## 14. Numeric Conformance Vector v1

A claimed governed Numeric Capability MUST be backed by executable Conformance Vectors appropriate to its categories.

The frozen Numeric vector model is:

> **Common Core + category-specific fields**

and is defined in:

- `conformance/common/numeric/CONFORMANCE_VECTOR_V1_FROZEN.md`
- `conformance/common/numeric/conformance_vector_v1.schema.json`

A vector is not required to contain every possible extended field.

Every vector MUST contain the frozen Common Core and at least one category-appropriate expected outcome, such as:

```text
expected_business_result
expected_reference_value
expected_error
```

Fields for comparison, rounding, tolerance, transcendental/reference behavior, Profile propagation, migration evidence and Quantity/Unit/coefficient evidence are conditional by category.

## 15. Unit / Quantity / coefficient semantic boundary

Numeric Contract v1 freezes only the conceptual distinction among:

```text
ordinary unit conversion
quantity transformation
stoichiometric / standard-formula coefficient
characterization / equivalence factor
```

Examples:

- kg↔t: ordinary unit conversion;
- kWh/MWh↔GJ: ordinary unit conversion;
- C mass → CO₂ mass using `44/12`: quantity transformation using a stoichiometric/standard-formula coefficient;
- CH₄-related quantity → CO₂ using `44/16` in the relevant governed formula: quantity transformation using a stoichiometric/standard-formula coefficient;
- greenhouse-gas mass → CO₂e using GWP: characterization/equivalence transformation using a versioned factor/basis.

`44/12` and `44/16` MUST NOT be promoted to public ordinary-unit conversion multipliers solely because a legacy API can expose them that way.

This section does **not** freeze Unit Contract v1 or the public Quantity/Factor schema.

## 16. Explicit OPEN items

The following remain OPEN after Numeric Contract v1 freeze and do not invalidate the frozen rules above:

1. ECQuota Excel/openpyxl binary-float ingress and a common lossless workbook-ingress policy;
2. actual Kotlin/Swift/ArkTS transcendental conformance execution;
3. public Quantity schema;
4. public coefficient schema/enum;
5. final Result/Record field placement/requiredness of `numeric_behavior_version`;
6. concrete API/conformance treatment when a standalone helper becomes an authoritative public entry point;
7. unified Decimal lexical interchange / Excel ingress public scheme;
8. universal transcendental library, platform minimum precision and universal transcendental tolerance.

No OPEN item authorizes a silent default that contradicts this Contract.

## 17. Project adoption and historical behavior

Freezing Numeric Contract v1 does not automatically modify or upgrade the three business repositories.

A business project adopts this Contract through an explicit compatibility/adoption task, locked Contract version/SHA and applicable Conformance evidence.

Historical formal Records MUST NOT be automatically recalculated merely because Numeric Contract v1 is frozen or adopted later.

## 18. Evidence profiles and provenance

The primary QZC-N01 evidence sources were:

- ECQuota / GB 29446—2019 exact-boundary and legacy ROUND6 migration evidence;
- EquipEffi / GB 19762—2025 Pump Decimal50/nonlinear/operation-order/Golden evidence;
- GHGTOOL / GB/T 32151.34—2024 declared-profile propagation, ambient independence and Unit/Quantity/coefficient evidence, including the first formal FAIL and R1 PASS.

The freeze decision and rationale are recorded in `decisions/ADR-NUMERIC-V1.md`.

## 19. Release boundary

Frozen by this file:

- Numeric Profile declaration mechanism;
- authoritative Profile consistency;
- ambient independence;
- exact/full-value comparison default;
- rounding taxonomy and implicit-rounding prohibition;
- tolerance taxonomy and no-global-epsilon rule;
- numerical vs business conformance separation;
- transcendental/reference-procedure structure and operation-order obligation;
- value-stage semantic separation;
- minimum Numeric traceability semantics;
- Numeric Conformance Vector v1 model;
- Unit/Quantity/coefficient conceptual classification boundary.

Not frozen by this file:

- Unit Contract v1 as a whole;
- Quantity Schema;
- coefficient schema/enum;
- a shared Numeric implementation package;
- any Kotlin/Swift/ArkTS implementation;
- qzpack;
- Workspace/Result/Record Contract revisions beyond the traceability requirement stated above.

# Numeric Conformance Vector v1

Status: **FROZEN — Numeric Conformance Vector v1**  
Parent Contract: `contracts/numeric/NUMERIC_CONTRACT_V1_FROZEN.md`  
Decision: `decisions/ADR-NUMERIC-V1.md`

## 1. Frozen model

Numeric Conformance Vector v1 uses:

> **Common Core + category-specific fields**

The schema is intentionally not a giant mandatory record. A vector carries the common identity/scope/provenance fields, plus only the fields required by its category.

This frozen wording resolves the Gate 4 Independent Acceptance Minor: `expected_business_result` is **not** an unconditional Common Core field.

## 2. Common Core — always required

Every vector MUST carry:

```text
case_id
category
numeric_contract_version
numeric_profile_id
authority_scope
inputs
source/provenance
```

The executor MUST NOT infer a default Profile, precision, rounding mode, epsilon, authority scope or business-rounding stage from an omitted field.

## 3. Expected outcome — category-conditional

Every vector MUST provide at least one expected outcome appropriate to its category.

The common expected-outcome forms are:

```text
expected_business_result
expected_reference_value
expected_error
```

These are **not** all universally required.

Examples:

- a business-boundary vector normally uses `expected_business_result`;
- a strictly numerical/transcendental reference vector may use `expected_reference_value` without a business result;
- an invalid-input/profile-mismatch vector may use `expected_error`;
- a composite vector may legitimately carry more than one expected-outcome form.

When a business result exists and is part of the governed capability, it remains authoritative even if numerical tolerance is also used.

## 4. Value-stage fields

These fields are conditional:

```text
normalized_value
calculation_value
comparison_value
display_value
```

They SHOULD be present when the vector is intended to prove a distinction among those stages.

Examples:

- display-separation case: calculation/comparison/display values;
- parse rejection case: no calculation value may exist;
- nonlinear reference case: reference/intermediate outputs may matter more than display.

## 5. Comparison fields

Comparison/boundary categories SHOULD include:

```text
operator
threshold
comparison_value
```

Common operators:

```text
lt
lte
eq
gte
gt
```

Tolerance-based numerical acceptance MUST NOT masquerade as exact `eq` business semantics.

## 6. Rounding block

When rounding is under test, the vector MUST provide the applicable rounding semantics, for example:

```yaml
rounding:
  stage: <input|intermediate|comparison|display|other>
  mode: <declared mode>
  places: <optional integer>
  precision: <optional integer>
  significant_digits: <optional integer>
  purpose: <working|business-explicit|display|normalization|other>
  source: <source/provenance when applicable>
```

At least one numeric rounding target such as places, precision or significant digits is supplied when the tested rule requires one.

Display rounding never authorizes modification of `comparison_value` by itself.

## 7. Transcendental / reference block

Nonlinear/reference categories MUST be able to express:

```yaml
transcendental_reference:
  function: <sqrt|ln|fractional_pow|exp|composite|other>
  operation_order: <stable identifier or structured expression>
  reference_procedure: <id/version>
  normalization: <optional policy>
```

The expected reference output is carried through `expected_reference_value` or an equivalent structured reference-output object allowed by the schema.

A composite Calculator may use `function=composite` while its versioned procedure defines the actual operation tree.

## 8. Tolerance block

When tolerance is used, the vector MUST declare its purpose:

```yaml
tolerance:
  purpose: <business-boundary|standard-explicit|algorithmic-numerical|lookup-interpolation|test-conformance>
  mode: <absolute|relative|combined|other>
  value: <decimal text>
  unit: <optional>
  source: <required when standard-explicit; optional otherwise if already covered by provenance>
```

There is no implicit platform-global epsilon.

If tolerance purpose is `algorithmic-numerical` or `test-conformance`, a differing governed business result still causes Conformance FAIL.

## 9. Profile propagation / ambient fields

Profile-focused categories SHOULD support:

```text
requested_profile
effective_profile
ambient_profile?
conflicting_profile?
```

These fields support distinct cases for:

- declared Profile == effective Profile;
- ambient-context independence;
- explicit mismatch rejection;
- characterization of prohibited silent fallback.

## 10. Legacy / migration fields

When preserving evidence for a deliberate behavior migration, a vector MAY include:

```text
legacy_expected_result
legacy_numeric_behavior_version
current_numeric_behavior_version
```

Legacy evidence does not authorize an incorrect historical result to remain authoritative.

## 11. Unit / Quantity / coefficient category fields

Numeric Conformance v1 MAY carry category-specific evidence such as:

```text
unit_conversion
input_quantity
output_quantity
coefficient
characterization_factor
```

These fields remain optional/category-specific and do not freeze a complete Quantity Schema.

Where used, the vector semantics MUST preserve the distinction among:

```text
ordinary unit conversion
quantity transformation
stoichiometric / standard-formula coefficient
characterization / equivalence factor
```

## 12. Frozen category identifiers

Numeric Conformance Vector v1 freezes the following initial category identifiers:

```text
parse_normalization
input_rejection
exact_comparison
business_boundary
display_separation
explicit_rounding
unit_conversion
quantity_transformation
coefficient_trace
characterization_factor
transcendental_reference
precision_sensitivity
operation_order_sensitivity
numerical_tolerance
profile_propagation
ambient_independence
profile_mismatch_rejection
legacy_migration
golden_replay
```

Future schema versions may add categories without changing the meaning of these v1 identifiers.

## 13. Category requiredness rules

### 13.1 Always required

```text
case_id
category
numeric_contract_version
numeric_profile_id
authority_scope
inputs
source/provenance
```

plus at least one category-appropriate expected outcome:

```text
expected_business_result
expected_reference_value
expected_error
```

### 13.2 Conditionally required

- comparison fields for exact/boundary comparisons;
- rounding block when rounding semantics are under test;
- transcendental/reference block when nonlinear/reference semantics are under test;
- tolerance block only when a tolerance is actually used;
- requested/effective/ambient/conflicting Profile fields when Profile behavior is under test;
- Unit/Quantity/coefficient fields only for their categories;
- legacy fields only for migration/characterization categories.

## 14. Business mismatch rule

If a vector includes a governed business result, Conformance MUST fail when the actual business result differs from the expected business result, even when all numerical differences are within an allowed numerical tolerance.

This rule applies to business outcomes including, where relevant:

```text
rule
rule_id
bucket
grade
status
conclusion
```

## 15. Machine-readable schema

The frozen machine-readable schema is:

`conformance/common/numeric/conformance_vector_v1.schema.json`

The schema encodes the Common Core and category-conditional expected-outcome model. Category-specific semantic requirements in this document remain normative where JSON Schema alone would be unnecessarily rigid or would prematurely freeze adjacent Quantity/Result structures.

## 16. Versioning

A vector claiming Numeric Conformance v1 MUST identify the frozen Numeric Contract version and the applicable Numeric Profile ID.

Future incompatible schema changes require a new Conformance Vector schema version. Existing v1 vectors remain interpretable under this document.

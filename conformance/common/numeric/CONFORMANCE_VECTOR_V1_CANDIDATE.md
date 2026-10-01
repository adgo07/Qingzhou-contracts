# Numeric Conformance Vector v1 — Gate-4 Candidate

Status: **GATE-4 CANDIDATE / NOT FROZEN**

Purpose: define a common vector envelope that can express N01-A exact-boundary evidence, N01-B nonlinear/reference evidence, and N01-C unit/quantity/profile-propagation evidence without forcing every category to carry every possible field.

## 1. Design principle

The schema is divided into:

1. **Common Core** — identity, profile/scope, inputs, expected business behavior and provenance.
2. **Category-specific fields** — comparison, rounding, transcendental/reference, tolerance, quantity/unit/coefficient, profile propagation, migration/legacy evidence.

A field is required only when its category/semantics requires it. For example, an exact unit conversion case does not need a transcendental reference block, and a sqrt reference case does not need a business threshold.

## 2. Common Core

Every vector candidate MUST carry:

```text
case_id
category
numeric_contract_version
numeric_profile_id
authority_scope
inputs
expected_business_result
source/provenance
```

`expected_business_result` MAY be `null` only for a strictly numerical/reference-only category that has no business output; in that case the category must provide an explicit numerical/reference expectation.

The vector SHOULD carry an `effective_profile` snapshot when profile propagation itself matters or when the executor can observe the actual effective profile.

## 3. Value-stage fields

The following are category-specific/conditional:

```text
normalized_value
calculation_value
comparison_value
display_value
```

They are required when the vector is intended to prove a distinction among those stages. They are not universally mandatory.

Examples:

- display-separation vector: calculation/comparison/display values should be present;
- pure parser rejection vector: there may be no calculation value;
- nonlinear reference vector: reference/intermediate fields may be more appropriate.

## 4. Formal comparison block

Comparison categories SHOULD use:

```text
operator
threshold
comparison_value
```

Supported common operators include:

```text
lt
lte
eq
gte
gt
```

A tolerance-based comparison must not masquerade as `eq`. It must declare its tolerance purpose/mode separately.

## 5. Rounding block

When a vector includes rounding, use a block capable of expressing:

```yaml
rounding:
  stage: <input|intermediate|comparison|display|other>
  mode: <declared mode>
  places: <optional integer>
  precision: <optional integer>
  significant_digits: <optional integer>
  purpose: <business-explicit|display|normalization|other>
  source: <provenance/source reference>
```

At least one of `places`, `precision`, or `significant_digits` must be supplied when the category needs a numeric rounding target.

A display-only round must never be interpreted as authorization to alter `comparison_value`.

## 6. Transcendental / reference block

Nonlinear/reference vectors SHOULD support:

```yaml
transcendental_reference:
  function: <sqrt|ln|fractional_pow|exp|composite|other>
  operation_order: <stable identifier or structured expression description>
  reference_procedure: <id/version>
  reference_value: <decimal text or structured expected intermediates>
  normalization: <optional policy>
```

For a composite Calculator, `function` may be `composite` while `operation_order`/`reference_procedure` identifies the versioned tree.

## 7. Tolerance block

When numerical tolerance is used, the vector MUST state its purpose:

```yaml
tolerance:
  purpose: <business-boundary|standard-explicit|algorithmic-numerical|lookup-interpolation|test-conformance>
  mode: <absolute|relative|combined|other>
  value: <decimal text>
  unit: <optional>
  source: <optional/required when standard-explicit>
```

A single vector may include at most the tolerance(s) it actually uses. There is no implicit platform-global epsilon.

If a tolerance is `test-conformance` or `algorithmic-numerical`, `expected_business_result` still has exact business authority: a differing rule/bucket/grade/status/conclusion fails even when a numeric delta passes tolerance.

## 8. Effective Profile / propagation fields

Profile-propagation categories SHOULD support:

```text
requested_profile
effective_profile
ambient_profile?
conflicting_profile?
expected_error?
```

This allows separate vectors for:

- requested profile == effective profile;
- ambient context independence;
- explicit mismatch rejection;
- prohibited silent fallback characterization.

N01-C first FAIL shows why `numeric_profile_id` alone is insufficient: the vector must be able to verify the **effective** profile consumed by authoritative helpers.

## 9. Legacy / migration evidence

When a numeric behavior change is intentional and breaking, a vector MAY include:

```text
legacy_expected_result
legacy_numeric_behavior_version
current_numeric_behavior_version
```

This is evidence, not permission to preserve an incorrect legacy result.

N01-A uses this pattern to preserve ROUND6 history while asserting corrected full-value results.

## 10. Unit / Quantity / Coefficient category fields

For applicable categories the vector MAY use:

```text
unit_conversion
input_quantity
output_quantity
coefficient
characterization_factor
```

The schema must distinguish:

- ordinary unit conversion;
- quantity transformation;
- stoichiometric/standard-formula coefficient;
- characterization/equivalence factor.

A `44/12` or `44/16` coefficient must not be encoded as an ordinary unit multiplier solely for API convenience.

## 11. Category candidates

Initial Gate-4 categories include, without freezing the final enum:

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

Future domains may add categories through versioned schema evolution.

## 12. Requiredness model

### 12.1 Always required

```text
case_id
category
numeric_contract_version
numeric_profile_id
authority_scope
inputs
source/provenance
```

And at least one expected outcome appropriate to the category:

```text
expected_business_result
reference_value
expected_error
```

### 12.2 Conditionally required

- comparison fields when `category` is comparison/boundary;
- rounding block when explicit/display rounding is under test;
- transcendental/reference block when nonlinear/reference semantics are under test;
- tolerance block only when tolerance is actually used;
- requested/effective profile when profile propagation is under test;
- unit/quantity/coefficient fields only for those categories;
- legacy fields only for migration characterization.

### 12.3 Never inferred silently

The executor must not infer from missing fields:

- a default epsilon;
- a default rounding mode;
- a default working precision;
- a default authority scope;
- a default business rounding stage.

Those semantics come from the declared Numeric Profile/Rule or the vector itself.

## 13. Machine-readable candidate

A non-frozen JSON Schema candidate is provided alongside this document:

`conformance_vector_v1_candidate.schema.json`

It intentionally leaves category-specific blocks optional and uses conditional semantic rules documented here rather than pretending every Pilot has the same shape.

## 14. Gate-4 conclusion

D-004 has enough evidence to enter Gate-5 freeze review with the **Common Core + category-specific** model.

This document and its machine schema remain CANDIDATE until Gate 5 explicitly freezes a version.

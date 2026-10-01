# Qingzhou Numeric Profiles v1

Status: **FROZEN — Numeric Profile Mechanism v1**  
Parent Contract: `contracts/numeric/NUMERIC_CONTRACT_V1_FROZEN.md`  
Decision: `decisions/ADR-NUMERIC-V1.md`

> This file freezes the **Profile mechanism and declaration obligations**. The example profiles below are business/evidence profiles, not platform-mandated templates and not an exhaustive public registry.

## 1. Numeric Profile purpose

A Numeric Profile defines the concrete numeric configuration used by one authoritative calculation scope or governed family of scopes.

The public platform Contract standardizes how a Profile is declared, propagated, traced and conformance-tested. It does not require every project to use the same precision, rounding mode or nonlinear procedure.

## 2. Required Profile capabilities

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

If one of the required capabilities is not applicable to a simple Profile, it must still be represented with an explicit value such as `not_applicable`, `none`, or an equivalent schema-defined state rather than silently omitted where omission would create ambiguity.

## 3. Scope and propagation

Every authoritative calculation scope MUST identify its effective `numeric_profile_id`.

Within that scope, authoritative operations/helpers/services MUST consume that Profile unless an explicit sub-profile is declared and traced.

A Profile implementation MUST NOT silently fall back to:

- process-global numeric context;
- language/runtime default context;
- historical project default policy;
- a helper-local default Numeric Profile.

Ambient-context independence and declared-profile consistency are separately testable requirements.

## 4. No platform default precision or rounding mode

The platform does not define one mandatory concrete value for:

```text
working_precision
rounding_mode
```

In particular, the following Pilot values remain project/Profile-specific evidence rather than platform defaults:

```text
precision=50
precision=40
ROUND_HALF_EVEN
ROUND_HALF_UP
```

A future Profile may use other justified values if it conforms to Numeric Contract v1 and its applicable Conformance Vectors.

## 5. Comparison, rounding and tolerance policies

A Profile MUST explicitly identify its comparison policy.

Unless an explicit governing Rule overrides it, Numeric Contract v1's default is `full-value exact comparison`.

The Profile's working rounding mode does not automatically define:

- explicit business rounding;
- display rounding;
- tolerance equality.

Tolerance policy MUST identify allowed purposes/categories and MUST NOT define one hidden global epsilon.

## 6. Transcendental policy

If a Profile supports transcendental/nonlinear functions, `transcendental_policy` MUST identify or reference the applicable versioned reference procedure and the required conformance behavior.

The concrete math library, minimum precision and numerical tolerance may remain Profile/platform-specific where Numeric Contract v1 does not freeze them.

## 7. Evidence / business Profile A — ECQuota / GB 29446—2019

Evidence identifier:

`ECQUOTA_GB29446_FULL_VALUE_V2`

Project behavior marker:

`ecquota-gb29446-full-value-v2`

Evidence semantics:

```text
representation           = Decimal authoritative calculation
working_precision        = project implementation context; no N01-A platform-wide fixed precision introduced
rounding_mode             = no implicit business pre-comparison ROUND6 for GB 29446
comparison_policy         = full-value exact Decimal comparison
explicit_rounding_policy  = source/Rule only; none identified for GB 29446 formal grade comparison
transcendental_policy     = not applicable to representative Pilot
business tolerance        = none / no hidden epsilon
display_policy            = presentation only
ingress note              = lexical decimal preferred; numeric XLSX/openpyxl ingress remains an OPEN common issue
```

This is an ECQuota/GB29446 business/evidence Profile. It does not declare that every ECQuota standard has already been migrated from historical ROUND6 behavior.

## 8. Evidence / business Profile B — EquipEffi Pump / GB 19762—2025

Evidence identifier:

`EQUIPEFFI_PUMP_DECIMAL50_V2`

Reference procedure:

`PUMP-RP-0.1`

Evidence semantics:

```text
representation           = strict Decimal text / Decimal / exact integer
working_precision        = 50
rounding_mode             = ROUND_HALF_EVEN working context
comparison_policy         = full-value exact rule/bucket/grade comparison
explicit_rounding_policy  = no hidden pre-grade rounding
transcendental_policy     = PUMP-RP-0.1: sqrt / ln / fractional pow + explicit operation order
tolerance_policy          = declared numerical conformance only; not a business epsilon
display_policy            = existing display/limit HALF_UP behavior remains presentation-only
binary_float_policy       = reject raw Python float/non-finite on authoritative Pump path
```

This Profile is valid evidence and a project business Profile. Decimal50 and HALF_EVEN are **not** platform defaults, and p50 was not proven by QZC-N01 to be the universal minimum precision.

## 9. Evidence / business Profile C — GHGTOOL Carbon / GB/T 32151.34—2024

Evidence identifier:

`GHGTOOL_CARBON_DECIMAL40_CURRENT`

Evidence semantics after N01-C R1:

```text
representation           = Decimal / DecimalPolicy finite decimal semantics
working_precision        = 40
rounding_mode             = ROUND_HALF_UP working context
comparison_policy         = exact/full-value where formal comparison is performed
explicit_rounding_policy  = never inferred from display; governing source/Rule required
transcendental_policy     = not a Pump-style nonlinear profile; representative evidence centers on arithmetic/interpolation
business tolerance        = no global business epsilon
test/numerical tolerance  = purpose-specific and isolated from business result
display_policy            = 2-place presentation isolated from authoritative value
profile propagation       = authoritative Calculator scope consumes the declared Profile through helpers/services/aggregation
ambient independence      = separately conformance-tested
```

The first N01-C acceptance FAIL remains important negative evidence: an outer requested Profile did not guarantee helper consistency because `_mul()` could instantiate the historical p40/HALF_UP default. R1 corrected this authoritative path.

This p40/HALF_UP configuration is **not** a platform default.

## 10. Standalone helper boundary

A low-level helper that exists only as an internal/compatibility utility is not automatically an authoritative public entry point.

If a helper is promoted to an authoritative public entry point, it MUST:

- declare or accept an effective Numeric Profile;
- satisfy authoritative Profile consistency;
- satisfy ambient independence;
- expose/retain the required Numeric traceability;
- pass applicable Conformance Vectors.

The exact public API pattern and migration treatment remain implementation/adoption work and are not fixed by this Profile mechanism file.

## 11. Profile conformance

A Profile may be claimed as formally supported only when the implementation passes the applicable Numeric Conformance Vector v1 cases.

Where relevant, conformance should cover:

- parse/normalization and float rejection policy;
- profile propagation/effective profile;
- ambient independence;
- exact business boundaries;
- explicit rounding behavior;
- display separation;
- transcendental/reference behavior;
- precision/operation-order sensitivity;
- numerical tolerance plus exact business outcome consistency;
- Profile mismatch rejection.

## 12. Registry status

This file does **not** establish a closed registry of Profile IDs.

The three evidence profiles document the QZC-N01 evidence base and may continue as business profiles in their projects. New Profiles may be defined later under the frozen mechanism without changing the platform-wide rules, provided they use unique stable IDs, explicit versioning/provenance and pass applicable Conformance.

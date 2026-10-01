# Qingzhou Numeric Profiles v1 — Gate-4 Evidence Candidate

Status: **GATE-4 CANDIDATE / EVIDENCE PROFILES / NOT FROZEN**

This document records three N01 evidence/project profiles. It is **not** a final registry of all public Numeric Profiles and does not imply that every future standard must select one of these three profiles.

## 1. Public Profile shape candidate

A public Numeric Profile must be able to express at least:

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

Optional/project-specific fields may include:

```text
ingress_policy
display_policy
normalization_policy
operation_order_policy
profile_version
source/provenance
```

The central Contract standardizes the declaration and conformance obligations, not one shared set of configuration values.

---

## 2. Evidence Profile A — ECQuota / GB 29446—2019

Candidate evidence name:

`ECQUOTA_GB29446_FULL_VALUE_V2`

Project evidence marker:

`ecquota-gb29446-full-value-v2`

### Evidence behavior

```text
representation            = Decimal authoritative calculation
working_precision         = implementation Decimal context; no N01-A global fixed precision introduced
rounding_mode              = no business pre-comparison rounding mode for GB 29446
comparison_policy          = full-value exact Decimal threshold comparison
explicit_rounding_policy   = only if a Rule/standard explicitly declares it; none identified for GB 29446 grade comparison
transcendental_policy      = not material to representative GB 29446 Pilot
business_tolerance         = none / no hidden epsilon
display_policy             = presentation only
ingress_policy             = lexical decimal preferred; float rejected in authoritative domain/JSON path; numeric XLSX/openpyxl ingress remains OPEN
```

### Evidence basis

- former `Decimal.quantize(0.000001, ROUND_HALF_UP)` on actual + threshold changed formal outcomes;
- standard review found no source basis for universal ROUND6 before grading;
- all 18 T−δ/T/T+δ cases (`δ=0.0000004`) pass with full-value semantics;
- representative `5.0000004` grades as 2级 even when displayed as `5.00`;
- historical behavior is preserved as explicit legacy evidence, not as the new authority.

### Scope

This profile is evidence for GB 29446 and ECQuota Numeric migration semantics. It does not prove that all other ECQuota standards have the same source requirements. N01-A deliberately left other legacy ROUND6 standards unchanged pending source-specific review.

---

## 3. Evidence Profile B — EquipEffi Pump / GB 19762—2025

Existing project candidate ID:

`EQUIPEFFI_PUMP_DECIMAL50_V2`

Reference procedure candidate:

`PUMP-RP-0.1`

### Evidence behavior

```text
representation            = strict Decimal text / Decimal / exact integer
working_precision         = 50 significant digits
rounding_mode              = ROUND_HALF_EVEN working context
comparison_policy          = full-value exact rule/bucket/grade comparison
explicit_rounding_policy   = no hidden pre-grade round
transcendental_policy      = PUMP-RP-0.1: sqrt / ln / fractional pow with explicit current operation tree
tolerance_policy           = numerical conformance only when declared; never a business epsilon
display_policy             = existing rounded(..., 6) / ROUND_HALF_UP, presentation/limits only
binary_float_policy        = reject raw Python float/non-finite on authoritative Pump path
```

### Evidence basis

- p28/p34/p40/p50/p60 representative calculations retain the same tested rule/grade outcomes;
- p50 vs p60 reference values are highly converged, but p50 was **not** proven to be the mathematical minimum precision;
- mathematically equivalent operation trees produce non-zero finite-precision differences around p50 `1E-47–1E-48`;
- exact T−δ/T/T+δ business boundary remains exact, no epsilon;
- numerical tolerance experiments are not promoted to business decision tolerances;
- Approved `pump_water` Golden evidence remains unchanged and separately validates business outcomes.

### Central interpretation

Decimal50 and ROUND_HALF_EVEN remain **Pump Profile-specific**. They are conservative, already-approved project semantics and strong reference evidence, but they do not become global platform defaults.

Kotlin/Swift/ArkTS were not actually executed in N01-B. Cross-language implementation/tolerance validation remains OPEN.

---

## 4. Evidence Profile C — GHGTOOL Carbon / GB/T 32151.34—2024

Candidate evidence name:

`GHGTOOL_CARBON_DECIMAL40_CURRENT`

Project production evidence:

```text
working_precision = 40
rounding_mode      = ROUND_HALF_UP
```

### Evidence behavior after R1

```text
representation            = Decimal / DecimalPolicy finite decimal semantics
working_precision         = 40 for current production profile
rounding_mode              = ROUND_HALF_UP working profile
comparison_policy          = exact/full-value where a business comparison is made
explicit_rounding_policy   = not inferred from display; source/Rule required
transcendental_policy      = not a Pump-style nonlinear profile; representative evidence focuses arithmetic/interpolation
business_tolerance         = no inferred global epsilon
test/numerical_tolerance   = explicitly classified and does not alter business result
display_policy             = 2 places, separated from authoritative value
profile_propagation        = Calculator authority scope consumes declared profile through direct Decimal, _d, _mul, UnitService and aggregation
ambient_independence       = separately tested across caller contexts
```

### Formal negative evidence — first acceptance FAIL

Before R1, a requested Calculator profile could be mixed with an internal helper default:

```text
Calculator requested p50
  -> outer local context p50
  -> _mul()
       -> DecimalPolicy() historical default p40/HALF_UP
```

This is not merely a project bug; it proves a public Contract obligation:

> declaring a profile at an outer entry point does not establish conformance unless authoritative helpers actually consume that profile.

R1 replaced the silent fallback in authoritative scope and added executable profile-propagation/mismatch vectors.

### R1 evidence

- requested/effective p28, p34, p40, p50 and p60 profile propagation;
- caller ambient contexts varied independently without changing a result for the same declared profile;
- p40 vs true p50 representative differences <= `1E-38` and p50 vs p60 <= `1E-48`;
- an injected UnitService with a conflicting numeric profile is rejected;
- a real HALF_UP vs HALF_EVEN tie case demonstrates that rounding mode is semantically active.

### Central interpretation

p40/HALF_UP is the current GHGTOOL Carbon project profile supported by this Pilot. It is **not** a platform default.

A module-level helper kept only for compatibility outside an authoritative Calculator scope is not automatically a formal public entry point. If such a helper is promoted to an authoritative entry point, it must declare its own Numeric Profile and pass conformance.

---

## 5. Comparison

| Profile evidence | Precision | Working rounding | Business comparison | Nonlinear/reference | Central status |
|---|---:|---|---|---|---|
| ECQuota GB29446 | no new global fixed value introduced | no implicit business pre-round | full-value exact | not material to Pilot | **EVIDENCE PROFILE / PROFILE-SPECIFIC** |
| EquipEffi Pump | 50 | HALF_EVEN | full-value exact | PUMP-RP-0.1 / sqrt/ln/fractional pow | **EVIDENCE PROFILE / PROFILE-SPECIFIC** |
| GHGTOOL Carbon | 40 | HALF_UP | exact/full-value where compared | arithmetic/interpolation; declared-profile authority | **EVIDENCE PROFILE / PROFILE-SPECIFIC** |

The different settings are evidence **for** a Profile Contract, not evidence for choosing an average, maximum or common configuration.

## 6. Public obligations derived from the profiles

The shared obligations are:

1. Profile identity/version is explicit.
2. Working precision is explicit where precision-bearing arithmetic exists.
3. Rounding mode is explicit by working/business/display purpose.
4. Comparison policy is explicit.
5. Explicit business rounding is source-driven.
6. Transcendental policy is explicit when used.
7. Tolerance policy is purpose-specific.
8. Authority scope consumes the declared effective Profile.
9. Ambient context cannot silently override the Profile.
10. Conformance must prove both numerical and business behavior.

## 7. Status

These profiles remain **evidence/project profiles**. Gate 5 may freeze the Profile Contract shape and obligations without freezing these three IDs as the final public registry.

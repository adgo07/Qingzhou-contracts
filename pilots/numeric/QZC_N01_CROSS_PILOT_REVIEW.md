# QZC-N01-D — Cross-Pilot Review

Status: **GATE 4 REVIEW COMPLETE / CANDIDATE SYNTHESIS / NOT FROZEN**  
Review date: 2026-09-30  
Central baseline: `Qingzhou-contracts@47a268dcebdc43c582f451b2004c9e63b46502a3`  
Foundation tag: `contracts-v0.1.0` → `0cd74d783fa23add6dc881b408a8c8ba8503f8e8`

> Gate 4 consolidates evidence. It does not replace N01-A/B/C Independent Acceptance and does not freeze Numeric Contract v1, Unit Contract v1, Quantity Schema or a public implementation.

## 1. Accepted Pilot evidence

| Pilot | Design evidence | Execution evidence | Acceptance head | Merge commit | Business acceptance |
|---|---|---|---|---|---|
| N01-A / ECQuota | local design commit `738d5a9f5a432b10a05b87ae9b9f70ac612360d1`; distribution/base `74b3deccfe74559cd08cc16a0705f1589ea6ecdc` | tested head `332a208cc76e7d0bc9f41a18398ae18919ed63ca`; final evidence head `368f0cfd4cfc0931174583f8cfdf2a9abbbfbc19` | `368f0cfd4cfc0931174583f8cfdf2a9abbbfbc19` | `031d0bb3406918d841984b3a535e172a8190b876` | PASS |
| N01-B / EquipEffi | design commit `a344c9d7919872c72891965c6509c3bba7affac8`; design baseline `b336fd313ea8e3ee1c688786c05d126d76dc2699` | tested head `96db30a4c63730c8693f0fc1fbebb5301e1809b7`; final evidence head `020710b43f9e6b5509741d5fb2ba77f777728177` | `020710b43f9e6b5509741d5fb2ba77f777728177` | `9efc6260b03d9e0a895abdb294a70cda39aa7598` | PASS |
| N01-C / GHGTOOL | no separate Design PR/commit; Design baseline is frozen distribution `84e07bb74dbee8db0fd716e3ed8261cfaf9e3415`; original Design artifact was design-only | original execution/report head `b4b577522b6b7218e3c14fa9ebb2608ce0efdf4c`; R1 implementation head `f337e9b0002020198ad9b63bc99179f1297b49a4`; final R1 evidence head `385c4b6a65d64867ec14f3b8cf8b9cb149b18a7a` | `385c4b6a65d64867ec14f3b8cf8b9cb149b18a7a` | `7b560299311b56f5e82b865ab8db7f7f879697ba` | PASS after formal first FAIL and R1 re-acceptance |

### N01-C first FAIL remains evidence

The first N01-C Independent Acceptance at the pre-R1 execution state is retained as a formal Pilot finding. The blocking defect was not “ambient Decimal context” alone. `CarbonMaterialCalculator(policy=...)` could declare p28/p34/p50 while authoritative `_mul()` silently instantiated the historical default `DecimalPolicy()` p40/HALF_UP, producing a mixed-profile calculation chain.

R1 fixed this by making the Calculator authority scope carry one active declared profile through direct Decimal arithmetic, `_d`, `_mul`, UnitService and aggregation, while separately proving caller ambient-context independence. The negative evidence is normative rationale for the central prohibition on silent profile fallback.

## 2. Cross-Pilot Matrix

Central conclusion labels:

- **COMMON CANDIDATE** — supported as a public Contract obligation.
- **PROFILE-SPECIFIC** — valid evidence, but the concrete value/algorithm belongs to a project/Profile.
- **OPEN** — evidence is not sufficient to freeze the public detail.

| Concern | ECQuota / N01-A | EquipEffi / N01-B | GHGTOOL / N01-C | Central conclusion |
|---|---|---|---|---|
| representation | Decimal authoritative calculation; lexical text for GUI/domain; XLSX numeric ingress can arrive as float | strict Pump Decimal text/Decimal/exact integer | DecimalPolicy, exact finite Decimal parse | **COMMON CANDIDATE:** deterministic decimal semantics. Exact ingress mechanics remain partly OPEN. |
| binary float | domain/JSON authoritative input rejects float; openpyxl numeric cell can first become float | Pump authoritative entry rejects Python float and non-finite values | DecimalPolicy rejects float/non-finite | **COMMON CANDIDATE:** binary float cannot be an undeclared authoritative source. **OPEN:** workbook ingress policy. |
| working precision | no new N01-A global precision invented | p50 conservative Pump profile; p28/34/40/50/60 all tested | production p40; p28/34/40/50/60 sensitivity tested after R1 | **PROFILE-SPECIFIC:** precision must be declared; no platform-wide number. |
| rounding | old hidden ROUND6/HALF_UP changed grade; removed for GB 29446 | working context HALF_EVEN; display helper HALF_UP | working context HALF_UP; real tie case proves mode can matter | **PROFILE-SPECIFIC values + COMMON CANDIDATE obligation:** mode must be explicit by purpose/scope. |
| full-value comparison | exact T−δ/T/T+δ changed legacy outcomes correctly | exact thresholds/buckets/grade | exact business comparison; display/tolerance separated | **COMMON CANDIDATE:** default formal business comparison is full-value exact. |
| display rounding | display `5.00` did not change grade for calculation `5.0000004` | display/limits HALF_UP isolated from grade | 2-place display isolated from authoritative result | **COMMON CANDIDATE:** presentation cannot feed calculation/comparison. |
| explicit business rounding | GB 29446 has no identified pre-grade rounding requirement | no hidden pre-grade round in Pump profile | no general business round inferred from display | **COMMON CANDIDATE:** only explicit Rule/standard evidence may authorize business rounding. |
| tolerance | no epsilon needed for GB 29446 boundaries | tolerance only for numerical conformance; business outcome must still match exactly | test/numerical tolerance distinguished from formal business comparison | **COMMON CANDIDATE:** purpose-specific taxonomy; no global epsilon. |
| nonlinear math | not material to representative rule | sqrt/ln/fractional pow executed; PUMP-RP-0.1 candidate; p28–p60 sensitivity | representative Carbon calculator mostly arithmetic/interpolation, not Pump transcendental profile | **PROFILE-SPECIFIC procedure + COMMON CANDIDATE structure. OPEN:** real Kotlin/Swift/ArkTS validation. |
| operation order | ordinary formula trace remains explicit | mathematically equivalent trees produce ~1E-47–1E-48 p50 differences | direct arithmetic/interpolation executes under declared profile | **COMMON CANDIDATE:** operation tree/order is part of a finite-precision/nonlinear reference procedure when material. |
| ambient context | no evidence supporting ambient context as authority | local Pump context scopes calculation | pre-fix result depended on ambient context; fixed and independently tested | **COMMON CANDIDATE:** declared authoritative result must be ambient-context independent. |
| declared profile propagation | GB 29446 behavior explicitly identified in trace | Pump evaluator/helper path executes in Pump local context | first FAIL exposed `_mul()` p40 fallback; R1 proves p28/34/40/50 propagation | **COMMON CANDIDATE:** every authoritative operation consumes declared profile or explicit traced subprofile; silent fallback prohibited. |
| business boundary | six threshold triplets + breaking legacy evidence | T−δ/T/T+δ and rule/bucket/grade checks | exact comparison vector and profile mismatch rejection | **COMMON CANDIDATE:** business output mismatch is conformance failure even when numeric delta is small. |
| unit conversion | not central to Pilot A | equipment quantities use profile-specific units; no evidence for carbon semantics | kg↔t, MWh↔GJ, 10⁴Nm³↔Nm³, percent↔ratio executed | **COMMON CANDIDATE:** ordinary unit conversion preserves quantity identity. |
| quantity transformation | not central | not central | C→CO₂, CH₄→CO₂, gas→CO₂e separated from ordinary conversion | **COMMON CANDIDATE classification; OPEN public schema.** |
| coefficient | standard thresholds/formula factors traced, but not carbon chemistry | Pump constants remain formula/profile evidence | 44/12 and 44/16 traced as stoichiometric coefficients; GWP as characterization factor | **COMMON CANDIDATE classification; OPEN public coefficient enum/schema.** |
| numeric trace/version | `ecquota-gb29446-full-value-v2` persists in trace | profile/reference procedure + business output captured by vectors | algorithm version changed for numeric authority behavior; effective profile vectors | **COMMON CANDIDATE:** trace contract/profile/rule/calculator behavior version. **OPEN:** final `numeric_behavior_version` Result field location. |
| conformance vectors | executable exact boundaries, display separation, legacy-vs-corrected | executable nonlinear, precision, operation-order, Golden replay | executable unit/quantity/coefficient/profile propagation/mismatch vectors | **COMMON CANDIDATE:** common core + category-specific fields; not every field mandatory. |

## 3. Common Contract candidates

The three Pilots support the following public obligations without requiring a shared implementation or shared numeric configuration:

1. Authoritative numeric semantics are deterministic decimal semantics.
2. IEEE-754 binary float must not become an authoritative business value through an undeclared conversion path.
3. Every authoritative calculation scope declares its effective Numeric Profile.
4. All authoritative arithmetic/helpers/formula coefficients/interpolation/transcendentals must consume that profile, or an explicit subprofile recorded in trace.
5. Silent fallback to a default profile is prohibited.
6. Declared-profile propagation and caller ambient-context independence are independent conformance requirements.
7. Default business comparison is full-value exact comparison with no implicit epsilon.
8. Implicit rounding is prohibited; explicit business rounding requires source/provenance and declared stage/mode/precision/purpose.
9. Display rounding is presentation-only.
10. Tolerance is purpose-specific and cannot be represented by one platform-global epsilon.
11. Numerical conformance and business conformance are distinct: a small numeric difference may pass a declared numerical tolerance, but a differing rule/bucket/grade/status/conclusion always fails conformance.
12. Finite-precision/nonlinear reference procedures must include operation order where reordering can change numerical output.
13. Formal results must be traceable to Numeric Contract version, Numeric Profile and rule/calculator behavior version.

## 4. Profile-specific findings

### ECQuota / GB 29446

- Full-value Decimal comparison is the accepted behavior for this standard.
- No source basis was found for the former universal ROUND6/HALF_UP pre-comparison behavior.
- `ecquota-gb29446-full-value-v2` is project behavior/version evidence, not a platform profile ID.
- Other ECQuota standards were intentionally not migrated by N01-A.

### EquipEffi Pump

- `EQUIPEFFI_PUMP_DECIMAL50_V2` / p50 / ROUND_HALF_EVEN is a Pump-specific conservative reference profile.
- p50 was not proven to be the mathematical minimum precision; p28/34/40/50/60 retained tested business outputs in representative vectors.
- PUMP-RP-0.1 is strong executable transcendental evidence, not a mandate that all projects use Python Decimal, p50 or HALF_EVEN.
- Existing Approved Golden evidence remains an independent business oracle layer.

### GHGTOOL Carbon

- Current production evidence supports p40 / ROUND_HALF_UP for the representative Carbon calculator.
- R1 proves declared profile propagation and ambient independence separately.
- The production profile is project-specific and must not become a platform default.
- A naked module helper that is not an authoritative public entry point may retain compatibility behavior; if promoted to an authoritative entry point it must declare its own profile.

## 5. Quantity / Unit / Coefficient synthesis

Gate 4 distinguishes four concepts:

1. **ordinary unit conversion** — preserves the same physical/business quantity and changes representation/scale, e.g. kg↔t, kWh/MWh↔GJ, Nm³↔10⁴Nm³.
2. **quantity transformation** — changes the represented quantity/substance identity, e.g. C mass → CO₂ mass.
3. **stoichiometric / standard-formula coefficient** — a formula relationship with provenance, e.g. `44/12` for C→CO₂ and `44/16` for CH₄→CO₂ in the relevant formula context.
4. **characterization / equivalence factor** — maps a quantity to an equivalence basis, e.g. GWP maps greenhouse-gas mass to CO₂e and requires horizon/assessment/source/version.

Therefore:

- `44/12` = stoichiometric / standard-formula coefficient, **not** an ordinary unit conversion multiplier.
- `44/16` = stoichiometric / standard-formula coefficient, **not** an ordinary unit conversion multiplier.
- GWP = characterization/equivalence factor, **not** an SI/ordinary unit conversion.

The existing GHGTOOL `tC ↔ tCO₂` UnitService bridge is migration evidence, not the public target model.

## 6. Quantity Schema candidates

### Candidate A

```text
value
quantity_type
unit_id
```

Strength: small and generic.  
Weakness: cannot cleanly distinguish C vs CO₂ vs CH₄ substance mass, and cannot carry the basis that makes CO₂e meaningful.

### Candidate B

```text
value
quantity_type
substance_id?
unit_id
equivalence_basis?
```

Evidence supports Candidate B as the stronger **Gate-4 direction**:

- C / CO₂ / CH₄ can share `quantity_type=substance_mass` while differing by `substance_id`.
- CO₂e can carry an `equivalence_basis` such as GWP method, time horizon and assessment/version.

Gate 4 does **not** freeze field requiredness, public enum names, whether CO₂e uses a dedicated quantity type, or the complete coefficient schema. D-011 remains partially open.

## 7. Decision Review

### D-001 — Transcendental Numeric reference procedure

- **Previous status:** OPEN.
- **New evidence:** Pump PUMP-RP-0.1 executes strict Decimal ingress, p50/HALF_EVEN scope, sqrt/ln/fractional pow, explicit operation tree, p28/34/40/50/60 sensitivity, operation-order alternatives and business-output checks.
- **Gate-4 conclusion:** **PARTIALLY RESOLVED.** The public *structure/obligations* of a transcendental reference procedure are well supported.
- **Candidate resolution:** require function ID, input semantics/domain, declared working profile, operation order, reference procedure, normalization, reference output and purpose-specific conformance tolerance.
- **Remaining uncertainty:** Kotlin/Swift/ArkTS implementations were not actually executed; no single cross-language tolerance or global working precision is justified.
- **Ready for Gate-5 freeze?** **PARTIAL.** Freeze the structure/obligation, not a universal algorithm/precision/tolerance value.

### D-004 — Conformance Vector v1 exact schema

- **Previous status:** OPEN.
- **New evidence:** all three Pilots produced executable vectors covering exact boundaries, nonlinear numerical reference, operation order, legacy-vs-current behavior, unit/quantity/coefficient and profile propagation/mismatch.
- **Gate-4 conclusion:** **GATE-4 CANDIDATE RESOLVED / READY FOR FREEZE REVIEW.**
- **Candidate resolution:** Common Core plus category-specific fields; intermediate/reference/tolerance/rounding/quantity fields are conditional rather than universally required.
- **Remaining uncertainty:** final JSON Schema requiredness and enum vocabulary are still Gate-5 review material.
- **Ready for Gate-5 freeze?** **YES**, for the core/category model; exact machine schema remains candidate until Gate 5.

### D-011 — Carbon quantity / unit / coefficient boundary

- **Previous status:** OPEN.
- **New evidence:** N01-C executed ordinary unit conversion separately from C→CO₂ / CH₄→CO₂ transformations, structured 44/12 and 44/16 coefficient trace, and a GWP/CO₂e candidate with basis/provenance.
- **Gate-4 conclusion:** **PARTIALLY RESOLVED.** The conceptual classification is ready for freeze review; public Quantity/Factor schema is not.
- **Candidate resolution:** ordinary conversion ≠ quantity transformation ≠ stoichiometric coefficient ≠ characterization/equivalence factor. Prefer Candidate B direction for quantity representation.
- **Remaining uncertainty:** public quantity types, substance IDs, CO₂e representation, coefficient enums/required provenance fields.
- **Ready for Gate-5 freeze?** **PARTIAL.** Classification principle YES; public schema NO.

### D-012 — Numeric tolerance / `is_close` vs exact comparison

- **Previous status:** OPEN.
- **New evidence:** ECQuota exact grade boundaries; EquipEffi numerical tolerance with exact rule/bucket/grade obligations; GHGTOOL exact business comparison and test/numerical tolerance separation.
- **Gate-4 conclusion:** **GATE-4 CANDIDATE RESOLVED / READY FOR FREEZE REVIEW.**
- **Candidate resolution:** default business comparison exact/full-value; tolerance must declare purpose and cannot silently alter business boundaries; one global epsilon is prohibited.
- **Remaining uncertainty:** concrete tolerance magnitudes are Profile/category-specific and must come from Rule/standard/reference evidence.
- **Ready for Gate-5 freeze?** **YES.**

## 8. Open items after Gate 4

| Open item | Classification | Gate-4 handling |
|---|---|---|
| ECQuota Excel/openpyxl binary-float ingress | does **not** block core Numeric v1 freeze; blocks a claim of lossless XLSX lexical ingress | require explicit ingress policy; keep OPEN |
| actual Kotlin/Swift/ArkTS transcendental conformance | does not block freezing the obligation framework; blocks claiming those platform implementations conform | OPEN under D-001 follow-up |
| Quantity public schema | belongs primarily to Unit/Quantity Contract; does not block core Numeric v1 | D-011 PARTIAL |
| coefficient public enum/schema | belongs to Unit/Rule/Provenance Contract; does not block core Numeric v1 | OPEN |
| `numeric_behavior_version` final Result/Record field location | later Result/Record decision; semantic traceability is required now | Gate-5 field decision / later Record Contract |
| standalone helper promoted to authoritative entry point | core obligation can be stated now: it must declare a profile | no blocker once obligation is accepted |
| unified Decimal lexical interchange schema | later Canonical/transport schema detail; deterministic decimal textual semantics can be frozen first | OPEN |

No listed item justifies pretending the public detail is already frozen. Conversely, none requires Gate 4 to invent one global precision, one rounding mode, one epsilon or one implementation library.

## 9. Gate-5 candidate scope

Gate 4 recommends entering Gate 5 to review and potentially freeze the **common Numeric semantics**, specifically:

- deterministic decimal authority semantics;
- Numeric Profile contract and authority scope;
- profile propagation + ambient independence;
- full-value exact business comparison default;
- implicit/explicit/display rounding separation;
- tolerance taxonomy and numerical-vs-business conformance;
- reference-procedure structure and operation-order obligation;
- numeric trace/version semantics;
- Conformance Vector common core/category model.

Gate 5 must not automatically freeze:

- a platform-wide precision;
- a platform-wide rounding mode;
- a platform-wide numerical epsilon;
- Pump Decimal50 as a global profile;
- Carbon p40/HALF_UP as a global profile;
- one global transcendental implementation;
- Unit Contract v1;
- the Quantity public schema.

## 10. Gate 4 conclusion

**Cross-pilot review: COMPLETE.**  
**Common Numeric Contract Candidate: produced.**  
**Numeric Contract v1: NOT FROZEN.**  
**Unit Contract v1: NOT FROZEN.**  
**Recommended next gate: Gate 5 Freeze Decision review.**

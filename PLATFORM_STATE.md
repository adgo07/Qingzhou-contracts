# PLATFORM_STATE

更新日期：2026-10-01  
状态：**QZC-N01 COMPLETE / NUMERIC CONTRACT v1 FROZEN / UNIT & QUANTITY STILL OPEN**

## 已冻结

- Architecture: `V2.1 FROZEN`
- Numeric Contract: **v1 FROZEN**
- Numeric Profile mechanism: **v1 FROZEN**
- Numeric Conformance Vector: **v1 FROZEN**
- Module IDs:
  - `qz.energy_quota`
  - `qz.equipment_efficiency`
  - `qz.carbon_accounting`
- 总体原则：独立版 + Suite；offline-first；公共外围 Contract + 自治 Domain；Conformance 作为跨平台裁判。

## Foundation baseline

首个 pre-1.0 Foundation baseline tag 仍为：

`contracts-v0.1.0` → `0cd74d783fa23add6dc881b408a8c8ba8503f8e8`

该 Foundation tag 没有因 Numeric Contract v1 文档冻结而移动或改写。

Gate 5 的执行起点：

`main@119faba77b4b70fe5681010893dc00cae6dda5af`

该 SHA 是 QZC-N01-D / PR #4 的 merge commit，确认 Gate 4 已合并后才进入 Gate 5。

## QZC-N01 evidence chain

| Gate | Scope | Result |
|---|---|---|
| Gate 0 | Foundation baseline/tag verification | **PASS** |
| Gate 1 | N01-A / ECQuota / GB 29446—2019 | **PASS** by business Independent Acceptance |
| Gate 2 | N01-B / EquipEffi / GB 19762—2025 Pump | **PASS** by business Independent Acceptance |
| Gate 3 | N01-C / GHGTOOL / GB/T 32151.34—2024 | **PASS after formal first FAIL + R1 Re-Acceptance** |
| Gate 4 | Cross-Pilot Review / Candidate synthesis | **PASS / merged** |
| Gate 5 | Numeric Contract v1 Freeze Decision | **COMPLETE / FROZEN** |

Gate 4 Candidate head：

`82c6dda9130f783eca2f1605f0dc7b92e5e87126`

Gate 4 merge / Gate-5 base：

`119faba77b4b70fe5681010893dc00cae6dda5af`

Gate 4 Independent Acceptance：**PASS**。其 non-blocking Minor（`expected_business_result` wording 与 category-conditional schema 不一致）已在 frozen Conformance v1 中修复。

## 三业务 Pilot evidence 状态

| Pilot | Acceptance head | Merge SHA | Evidence status |
|---|---|---|---|
| N01-A / ECQuota | `368f0cfd4cfc0931174583f8cfdf2a9abbbfbc19` | `031d0bb3406918d841984b3a535e172a8190b876` | accepted |
| N01-B / EquipEffi | `020710b43f9e6b5509741d5fb2ba77f777728177` | `9efc6260b03d9e0a895abdb294a70cda39aa7598` | accepted |
| N01-C / GHGTOOL | `385c4b6a65d64867ec14f3b8cf8b9cb149b18a7a` | `7b560299311b56f5e82b865ab8db7f7f879697ba` | accepted after first FAIL + R1 |

N01-C 第一次 FAIL 继续保留为正式 negative evidence：outer declared Profile 下 authoritative helper 曾 silent fallback 到历史默认 p40/HALF_UP。该反例是 frozen “authoritative Profile consistency / no silent fallback” 规则的重要依据。

## Numeric Contract v1 authoritative artifacts

正式 frozen artifacts：

- `contracts/numeric/NUMERIC_CONTRACT_V1_FROZEN.md`
- `contracts/numeric/NUMERIC_PROFILES_V1_FROZEN.md`
- `conformance/common/numeric/CONFORMANCE_VECTOR_V1_FROZEN.md`
- `conformance/common/numeric/conformance_vector_v1.schema.json`
- `decisions/ADR-NUMERIC-V1.md` — `ACCEPTED`
- `pilots/numeric/QZC_N01_GATE5_FREEZE_REPORT.md`

Gate 4 Candidate 与早期 Draft 继续保留作为历史设计/证据，不再高于 frozen v1 的权威层级。

## Frozen Numeric v1 semantics

Numeric Contract v1 已正式冻结：

1. authoritative scope 必须声明 Numeric Profile；
2. Profile 至少表达 representation、working precision、rounding、comparison、explicit-rounding、transcendental、tolerance policies；
3. 不存在 platform-wide p40/p50/HALF_UP/HALF_EVEN 默认；
4. authoritative operation/helper/service 必须消费 declared Profile 或显式 trace sub-profile；silent fallback 禁止；
5. declared-profile consistency 与 ambient independence 独立验收；
6. formal business comparison 默认 `full-value exact comparison`；
7. implicit rounding 默认禁止；explicit business rounding source-driven；display rounding presentation-only；
8. tolerance taxonomy = business-boundary / standard-explicit / algorithmic-numerical / lookup-interpolation / test-conformance；禁止 global epsilon；
9. numerical tolerance 不能掩盖 business mismatch；
10. transcendental/reference procedure 必须定义 function/domain/Profile/operation order/procedure version/normalization/reference output/conformance tolerance；
11. input / normalized / calculation / comparison / display 语义分离；
12. formal result 至少追踪 Numeric Contract version、Numeric Profile ID、calculator/rule version；
13. Numeric Conformance Vector v1 = Common Core + category-specific fields。

## Numeric Profiles

三个 Pilot Profile 作为业务/evidence Profile 保留：

- ECQuota / GB29446 full-value Profile evidence；
- EquipEffi Pump p50 / ROUND_HALF_EVEN / PUMP-RP-0.1；
- GHGTOOL Carbon p40 / ROUND_HALF_UP / declared-profile propagation / ambient independence。

它们不是平台强制配置模板，也不是封闭 Profile registry。

## Decision status after Gate 5

| Decision | Status |
|---|---|
| D-001 Transcendental reference procedure | **PARTIALLY RESOLVED** — structure/obligations frozen; cross-language implementation/library/minimum precision/universal tolerance OPEN |
| D-004 Numeric Conformance Vector v1 | **RESOLVED / FROZEN** |
| D-011 Quantity / Unit / coefficient boundary | **PARTIALLY RESOLVED** — conceptual categories frozen; public schema OPEN |
| D-012 tolerance / exact comparison | **RESOLVED / FROZEN IN NUMERIC CONTRACT v1** |

## D-011 frozen conceptual boundary

Numeric v1 only freezes the distinction among：

```text
ordinary unit conversion
quantity transformation
stoichiometric / standard-formula coefficient
characterization / equivalence factor
```

因此：

- `44/12`、`44/16` 不作为 public ordinary unit conversion multiplier；
- GWP 为 characterization/equivalence factor；
- legacy API 形式不决定未来公共 Quantity/Unit 语义。

Quantity Schema 本身仍未冻结。

## Explicit OPEN items after QZC-N01

以下事项不阻塞 Numeric Contract v1，但仍必须保持可见：

1. ECQuota Excel/openpyxl numeric-cell binary-float ingress / common lossless workbook ingress；
2. Kotlin/Swift/ArkTS actual transcendental conformance；
3. Quantity public schema；
4. coefficient public schema/enum；
5. Result/Record 中 `numeric_behavior_version` 最终字段位置/requiredness；
6. standalone helper 成为 authoritative public entry point 时的具体 API/conformance 落地；
7. Decimal lexical interchange / Excel ingress 公共方案；
8. universal transcendental library / minimum platform precision / universal tolerance。

## Current Contract release state

- Architecture V2.1: **FROZEN**
- Numeric Contract v1: **FROZEN**
- Numeric Profile mechanism v1: **FROZEN**
- Numeric Conformance Vector v1: **FROZEN**
- Unit Contract v1: **DRAFT / NOT FROZEN**
- Quantity Schema: **NOT FROZEN**
- Module/Capability Contract v1: **DRAFT**
- Workspace/Attempt/Record/Result Contract v1: **DRAFT**
- qzpack Contract v1: **DRAFT**

## Business repositories

QZC-N01 Gate 5 没有修改：

- ECQuota-Insight；
- EquipEffi；
- GHGTOOL；
- 三个业务仓 `platform-lock.json`。

冻结中央 Numeric Contract 不等于三个业务仓自动升级。后续 adoption 必须是独立治理任务，明确锁定 Contract version/SHA 并执行对应 Conformance。

## QZC-N01 closure

QZC-N01 在中央 Gate 5 完成后关闭。

本阶段不再：

- 追加新的 N01 Pilot；
- 实现公共 Numeric Python package；
- 实现 Kotlin/Swift/ArkTS；
- 启动 qzpack；
- 启动 Workspace/Record 新阶段；
- 自动重算历史正式 Record。

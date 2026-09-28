# PLATFORM_STATE

更新日期：2026-09-28  
状态：**QZC-N01-0 COMPLETE / DISTRIBUTION FROZEN / GATE 0 PASS**

## 已冻结

- Architecture: `V2.1 FROZEN`
- Module IDs:
  - `qz.energy_quota`
  - `qz.equipment_efficiency`
  - `qz.carbon_accounting`
- 总体原则：独立版 + Suite；offline-first；公共外围 Contract + 自治 Domain；Conformance 作为跨平台裁判。

## Foundation baseline

三个业务仓当前仍共同锁定中央 Foundation baseline：

`Qingzhou-contracts@0cd74d783fa23add6dc881b408a8c8ba8503f8e8`

该 commit 已在 N01-0 执行时重新核实存在。

首个 pre-1.0 Contract baseline tag：

`contracts-v0.1.0`

Gate 0 复核：

- tag 已实际存在；
- 类型：annotated tag；
- tag object：`407e91b2161e6743645dfbac4c0addd9865506c7`；
- tag message：`Qingzhou Contracts Foundation baseline v0.1.0`；
- 最终目标 commit：`0cd74d783fa23add6dc881b408a8c8ba8503f8e8`；
- GitHub verification：`unsigned`；本阶段未要求签名，因此不阻塞；
- GitHub Release 页面不是本阶段强制项。

因此 **Gate 0 = PASS**。

## 三业务仓分发冻结状态

N01-0 已重新读取三个业务仓的默认分支、真实 head 与 `platform-lock.json`：

| Pilot / 模块 | Repository | 默认分支 | 分发冻结时真实 SHA | 当前 Contract lock | 中央分发状态 |
|---|---|---|---|---|---|
| N01-A / `qz.energy_quota` | `adgo07/ECQuota-Insight` | `main` | `74b3deccfe74559cd08cc16a0705f1589ea6ecdc` | `0cd74d783fa23add6dc881b408a8c8ba8503f8e8`; release/tag=`null` | FROZEN / READY |
| N01-B / `qz.equipment_efficiency` | `adgo07/EquipEffi` | `master` | `b336fd313ea8e3ee1c688786c05d126d76dc2699` | `0cd74d783fa23add6dc881b408a8c8ba8503f8e8`; release/tag=`null` | FROZEN / READY |
| N01-C / `qz.carbon_accounting` | `adgo07/GHGTOOL` | `main` | `84e07bb74dbee8db0fd716e3ed8261cfaf9e3415` | `0cd74d783fa23add6dc881b408a8c8ba8503f8e8`; release/tag=`null` | FROZEN / READY |

三个业务仓当前 lock 的 release/tag 字段仍为 `null`。这是分发冻结时的真实状态；QZC-N01-0 没有修改任何业务仓，也没有授权自动升级业务仓 lock。

## 正在制定（DRAFT）

- Numeric Contract v1
- Unit Contract v1
- Module / Capability Contract v1
- Workspace / Attempt / Record / Result Contract v1
- Canonical / qzpack Contract v1

这些 DRAFT 没有因为 baseline tag 创建或 Gate 0 PASS 被提升为 FROZEN。`contracts-v0.1.0` 是 Foundation/pre-1.0 baseline tag，不等于 Numeric Contract v1 已冻结。

## QZC-N01 Numeric Pilot

N01-0 已建立并冻结中央分发资料：

- `pilots/numeric/QZC_N01_MASTER_PLAN.md`
- `pilots/numeric/N01_A_ECQUOTA_DISTRIBUTION.md`
- `pilots/numeric/N01_B_EQUIPEFFI_DISTRIBUTION.md`
- `pilots/numeric/N01_C_GHGTOOL_DISTRIBUTION.md`
- `pilots/numeric/N01_PILOT_RETURN_TEMPLATE.md`

三个代表试点：

| Pilot | 模块 | 代表标准/Profile | 主要验证 |
|---|---|---|---|
| N01-A | `qz.energy_quota` | GB 29446—2019 | ROUND6、ROUND_HALF_UP、full-value comparison、显示/判定分离、阈值边界 |
| N01-B | `qz.equipment_efficiency` | GB 19762—2025 离心泵 | Decimal50、ROUND_HALF_EVEN、binary float rejection、sqrt/ln/fractional pow、Transcendental Numeric |
| N01-C | `qz.carbon_accounting` | GB/T 32151.34—2024 | DecimalPolicy、Unit/Quantity、44/12/44/16/GWP、tolerance/is_close |

## N01 Gates

- **Gate 0 — Foundation baseline/tag verified**：**PASS**；
- **Gate 1 — N01-A evidence complete**：尚未开始；必须由 ECQuota-Insight 独立验收决定；
- **Gate 2 — N01-B evidence complete**：尚未开始；必须由 EquipEffi 独立验收决定；
- **Gate 3 — N01-C evidence complete**：尚未开始；必须由 GHGTOOL 独立验收决定；
- **Gate 4 — Cross-pilot review complete**：等待 Gate 1～3 的已独立验收证据；
- **Gate 5 — Numeric Contract v1 freeze decision**：仅在跨 Pilot 证据充分后进入，不等于自动冻结。

中央平台不得自行宣布 Gate 1～3 PASS。

## 当前开放问题

详见 `DECISIONS_NEEDED.md`。

当前 N01 直接相关高优先级：

1. D-001 Transcendental Numeric reference procedure；
2. D-004 Conformance Vector v1 exact schema；
3. D-011 Carbon quantity / unit / stoichiometric coefficient boundary；
4. D-012 Numeric tolerance / `is_close` vs exact comparison。

N01-0 未冻结上述任何事项，也未将其移出 OPEN。

## 当前明确不实施

- 三仓立即合并
- Suite 正式开发
- 全量移动端开发
- 公共 Numeric Python package
- Kotlin / Swift / ArkTS 正式 Numeric 实现
- 所有现有标准立即 qzpack 化
- 复杂标准全部 DSL 化
- Rust/C++ Native Core 重写
- 为统一架构而重写成熟 UI
- 重写 GHGTOOL UnitService
- 重写 EquipEffi 离心泵算法
- 直接删除 ECQuota 全部 ROUND6
- Workspace / Result Record 新阶段

## Release 状态

Architecture V2.1 仍为 FROZEN；Numeric / Unit / Module-Capability / Workspace-Record-Result / qzpack v1 仍全部是 DRAFT。

已建立首个 Foundation/pre-1.0 baseline tag：

`contracts-v0.1.0` → `0cd74d783fa23add6dc881b408a8c8ba8503f8e8`

这只固定了 QZC-N01 的共同基线，不代表三个业务仓已修改 lock，也不代表任何 DRAFT Contract 已成为正式 v1 release。
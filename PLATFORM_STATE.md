# PLATFORM_STATE

更新日期：2026-09-28  
状态：**QZC-A01 COMPLETE / QZC-A02 ADOPTION SUMMARY**

## 已冻结

- Architecture: `V2.1 FROZEN`
- Module IDs:
  - `qz.energy_quota`
  - `qz.equipment_efficiency`
  - `qz.carbon_accounting`
- 总体原则：独立版 + Suite；offline-first；公共外围 Contract + 自治 Domain；Conformance 作为跨平台裁判。

## 三业务仓接入状态

三个业务仓已完成 QZC-A01，并锁定同一中央基线：

`Qingzhou-contracts@0cd74d783fa23add6dc881b408a8c8ba8503f8e8`

| 模块 | 业务仓默认分支当前 SHA | QZC-A01 | 关键状态 |
|---|---|---|---|
| `qz.energy_quota` | `74b3deccfe74559cd08cc16a0705f1589ea6ecdc` | PASS | Numeric Conformance BLOCKED：global ROUND6 |
| `qz.equipment_efficiency` | `b336fd313ea8e3ee1c688786c05d126d76dc2699` | PASS | Phase 1 PASS；Phase 2 尚未授权 |
| `qz.carbon_accounting` | `84e07bb74dbee8db0fd716e3ed8261cfaf9e3415` | PASS | 无 Architecture 硬冲突；存在 Numeric/Unit/Workspace 公共候选 |

接入完成只表示治理关系建立，不表示 DRAFT Contract 已全部实现。

## 正在制定（DRAFT）

- Numeric Contract v1
- Unit Contract v1
- Module / Capability Contract v1
- Workspace / Attempt / Record / Result Contract v1
- Canonical / qzpack Contract v1

DRAFT 不得被业务仓库当作已冻结长期语义；业务项目只遵循自己显式锁定的中央 SHA/tag，不实时跟随本仓库 `main`。

## 下一公共技术阶段

建议启动：

> **QZC-N01 — Qingzhou Numeric Contract v1 Pilot**

三个代表性试点：

| 模块 | 代表标准/场景 | 主要验证 |
|---|---|---|
| `qz.energy_quota` | GB 29446 | full-value comparison、ROUND6 correction、显示/判定分离 |
| `qz.equipment_efficiency` | 代表性离心泵标准 | Decimal50、sqrt/ln/fractional pow、Transcendental Numeric |
| `qz.carbon_accounting` | GB/T 32151.34 | Decimal、Unit/Quantity、公式系数、tolerance/is_close |

QZC-N01 应先形成 candidate rules + Conformance vectors，再考虑冻结 Numeric Contract v1。

## 当前明确不实施

- 三仓立即合并
- Suite 正式开发
- 全量移动端开发
- 所有现有标准立即 qzpack 化
- 复杂标准全部 DSL 化
- Rust/C++ Native Core 重写
- 为统一架构而重写成熟 UI
- 因 QZC-A01 完成而自动授权 EquipEffi Phase 2

## 当前开放问题

详见 `DECISIONS_NEEDED.md`。

当前最高优先级：

1. D-001 Transcendental Numeric reference procedure；
2. D-004 Conformance Vector v1 exact schema；
3. D-011 Carbon quantity / unit / stoichiometric coefficient boundary；
4. D-012 Numeric tolerance / `is_close` vs exact comparison；
5. D-005 Recordable business outcomes by module。

## Release 状态

当前尚未发布正式 Contract release/tag。

三个业务仓共同锁定的基础 SHA 为：

`0cd74d783fa23add6dc881b408a8c8ba8503f8e8`

是否将该 SHA 标记为首个 `contracts-v0.1.0`，仍按 `D-003` 由用户最终确认。

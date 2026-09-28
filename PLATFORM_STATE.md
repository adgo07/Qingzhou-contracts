# PLATFORM_STATE

更新日期：2026-09-28  
状态：**Contract Foundation / Bootstrap**

## 已冻结

- Architecture: `V2.1 FROZEN`
- Module IDs:
  - `qz.energy_quota`
  - `qz.equipment_efficiency`
  - `qz.carbon_accounting`
- 总体原则：独立版 + Suite；offline-first；公共外围 Contract + 自治 Domain；Conformance 作为跨平台裁判。

## 正在制定（DRAFT）

- Numeric Contract v1
- Unit Contract v1
- Module / Capability Contract v1
- Workspace / Attempt / Record / Result Contract v1
- Canonical / qzpack Contract v1

DRAFT 不得被业务仓库当作已冻结长期语义；业务项目升级公共 Contract 时应锁定正式 release/tag。

## 代表性试点

| 模块 | 代表标准/场景 | 当前目的 |
|---|---|---|
| `qz.energy_quota` | GB 29446 | 简单规则、Numeric、Canonical、Conformance、qzpack prototype |
| `qz.equipment_efficiency` | 代表性离心泵标准 | Decimal50、sqrt/ln/pow、复杂 Numeric Conformance、Profile Capability |
| `qz.carbon_accounting` | GB/T 32151.34 | 复杂 Domain Calculator、Canonical reference data、Workspace/Record、Conformance |

## 当前明确不实施

- 三仓立即合并
- Suite 正式开发
- 全量移动端开发
- 所有现有标准立即 qzpack 化
- 复杂标准全部 DSL 化
- Rust/C++ Native Core 重写
- 为统一架构而重写成熟 UI

## 当前开放问题

详见 `DECISIONS_NEEDED.md`。

高优先级：

1. Transcendental Numeric Contract 的 reference procedure / tolerance；
2. qzpack 签名算法、密钥轮换与离线撤销；
3. 第一个正式 Contract release 的版本号与 tag 命名；
4. Conformance Vector v1 Schema 最终字段；
5. 各模块哪些 Attempt Outcome 可以成为正式 Record。

## 业务仓库接入原则

每个业务仓库后续应增加：

- `PLATFORM_BASELINE.md`
- `platform-lock.json`

锁定：

- contracts release/tag；
- commit SHA；
- Architecture version；
- Numeric / Unit / Module / Package / Workspace / Result Contract version。

禁止业务仓库无版本地读取本仓库最新 `main` 作为实时规则。

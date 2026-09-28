# Qingzhou qzpack / Canonical Package Contract v1 — DRAFT

状态：**DRAFT / NOT YET RELEASED**

## 1. 目标

定义跨平台标准包的公共语义，使标准、参数、规则、来源与 Conformance 可以独立于具体数据库和客户端发布、升级、校验、回滚和追溯。

## 2. 核心原则

- Canonical-first；
- SQLite/Room/其他本地库只是平台部署格式；
- 标准可以独立版本化和升级；
- 包必须可验证、可追溯、可回滚；
- 历史 Record 必须能够定位当时使用的 package/version/hash；
- 完整标准 PDF 不作为核心包默认必需内容。

## 3. 建议逻辑结构

```text
<package>.qzpack
├─ manifest.json
├─ canonical/
├─ schemas/
├─ provenance/
├─ conformance/
├─ hashes.json
├─ release_notes.json
└─ signature
```

物理容器是否 ZIP、压缩算法等当前未冻结。

## 4. Manifest 最小候选字段

```text
pack_id
module_id
standard_ids[]
package_version
schema_version
rule_version
published_at
min_app_version
max_app_version
dependencies[]
conflicts[]
supersedes[]
content_hashes
signature
signing_key_id
```

可选字段后续根据试点增加：

```text
profile_ids[]
calculator_requirements[]
numeric_contract_version
unit_contract_version
capability_requirements[]
license_metadata?
```

License 业务权限原则上不与标准包内容生命周期绑定。

## 5. Lifecycle

长期正式流程：

```text
Download / Import
→ Verify Manifest
→ Verify Hashes
→ Verify Signature
→ Check Contract / Schema
→ Check App Compatibility
→ Check Dependencies / Conflicts
→ Stage
→ Validate
→ Atomic Activate
→ Keep Previous Version
```

任何关键步骤失败：

> 不得破坏当前已激活可用版本，应 Rollback 或保持原版本。

## 6. Immutable package identity

一个已经发布并被正式 Record 引用的 package/version 内容不得静默替换。

如内容发生变化：

- 发布新 package_version；或
- 发布新 pack_id（如语义要求）。

同一 `package_version` 不应指向不同 hash。

## 7. 历史版本

客户端应保留足够的旧版本资产以支持审计/复算语义。

可采用：

```text
immutable package cache
content-addressed storage
archive store
```

不要求所有旧包永远常驻热存储，但不得让历史 Record 失去唯一可验证的规则身份。

## 8. Dependencies / Conflicts / Supersedes

### dependencies

表示本包正式运行所需的其他包/Contract 条件。

### conflicts

表示不允许同时激活的已知包/版本组合。

### supersedes

表示新包在业务上替代哪个旧包/版本，但**不等于删除历史记录引用的旧包**。

最终版本范围表达语法待 Schema 试点确认。

## 9. 标准包粒度

允许：

- 单标准包；
- 强关联标准组；
- reference-data 公共包。

不在 v1 架构层强制“一标准一包”。最终推荐粒度通过三个代表标准 prototype 决定，见 D-006。

## 10. Signature / Trust

必须预留：

- signature；
- signing_key_id；
- trust root；
- key rotation；
- revocation information。

具体算法与密钥治理未冻结，见 D-002。

完全离线客户端只能识别它最后一次获得的撤销/信任信息，不能承诺实时知道服务器最新吊销。

## 11. Hashes

`hashes.json` 应覆盖 package 中需要被完整性保护的文件。

hash 算法当前建议使用 SHA-256 作为 prototype 默认，但正式 v1 仍应在 Schema/ADR 中冻结算法标识和 canonical path 规则。

## 12. Canonical

Canonical payload 可以因业务模块不同拥有不同 Schema。

公共层统一的是 envelope 和 package lifecycle，不强制：

```text
energy_quota payload
=
equipment payload
=
carbon payload
```

三个领域内部 Schema 可以自治。

## 13. Conformance in package

包可以携带与其业务规则匹配的 Conformance Vectors 或其 manifest/hash 引用。

客户端在安装/开发 CI 中如何运行全部 Conformance 由 implementation 决定，但 `SUPPORTED` Capability 必须有可验证的权威案例集。

## 14. Platform deployment

安装后允许生成：

```text
Windows/Linux/macOS → SQLite/index/cache
Android → SQLite/Room/other local DB
HarmonyOS → local store
Apple → local store
Mini → platform local indexed data/cache
```

这些是派生数据，可由 Canonical 重建，不反向成为事实源。

## 15. 单标准独立升级

必须支持：

```text
app version unchanged
+
one standard/package upgraded
```

升级不得自动重算历史 Record。

## 16. Prototype 顺序

优先候选：

- ECQuota / GB 29446；
- EquipEffi / 代表性离心泵；
- GHGTOOL / GB/T 32151.34。

先冻结“包里是什么、怎么验证、怎么追溯”，再决定大量现有标准如何拆包。

## 17. v1 冻结前待验证

- package physical container；
- manifest JSON Schema；
- version-range 语法；
- hash algorithm/paths；
- signature/trust model；
- dependency resolution；
- archive/old package retention；
- standard-vs-reference-data package granularity；
- package 与 Capability Manifest 的引用方式。

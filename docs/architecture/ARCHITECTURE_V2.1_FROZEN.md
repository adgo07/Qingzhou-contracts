# 三类专业软件统一工程架构与跨平台开发规范 V2.1 FROZEN

状态：**FROZEN**  
适用：`qz.energy_quota` / `qz.equipment_efficiency` / `qz.carbon_accounting`

## 1. 文档定位

V2.1 是三个专业软件的长期统一架构宪法、公共 Contract 基线和跨平台约束，不是要求当前三个仓库立即进行大重构的施工计划。

当前业务开发继续进行；新增设计不得制造明显违反本规范的新技术债。

## 2. 最终产品形态

最终同时支持：

- 能耗限额评价软件：独立安装、独立升级、独立授权、独立离线运行；
- 设备能效分析软件：独立安装、独立升级、独立授权、独立离线运行；
- 温室气体排放核算软件：独立安装、独立升级、独立授权、独立离线运行；
- 青舟工业能源工作台 Suite：公共 AppShell + 任意已安装业务模块。

Suite 不拥有第二套业务算法。独立版与 Suite 中相同模块必须使用相同业务真相、相同公共 Contract 和相同 Conformance Vectors。

## 3. 永久 Module ID

```text
qz.energy_quota
qz.equipment_efficiency
qz.carbon_accounting
```

Module ID 不随产品名、UI、操作系统、Suite/独立版、安装目录变化。

## 4. 总体架构

采用：

> 公共外围 Contract + 三个自治业务 Domain。

公共层可以统一：

- Numeric Contract；
- Unit Contract；
- Canonical Envelope；
- Package Contract；
- Module / Capability Contract；
- Workspace / Attempt / Record / Result Contract；
- Audit / Provenance；
- Version Contract。

不得强行统一：

- 三个业务计算引擎；
- 标准适用逻辑；
- 行业输入模型；
- 复杂专业页面；
- 业务结果内部结构。

禁止 UniversalEngine 通过大量 `if carbon / equipment / energy_quota` 混合三个领域。

## 5. 统一分层

所有业务模块长期保持：

```text
Presentation
    ↓
Application
    ↓
Domain
    ↓
Port / Repository
    ↓
Infrastructure
```

Domain/Application 不应直接依赖 PySide6、Tkinter、Windows API、Android API、ArkUI、SwiftUI、SQLite SQL、Excel/Word 对象、具体页面控件、桌面弹窗或绝对平台路径。

## 6. Desktop UI 技术栈

现阶段不要求三个项目立即统一 Desktop UI 技术栈。

- 已使用 PySide6 的项目可以继续；
- EquipEffi 等已有成熟 Tk/Web 入口的项目不因本规范被迫迁移；
- 未来新的 Suite AppShell 优先评估 Qt/PySide6。

统一目标是 Domain/Application 与 UI 解耦，而不是现在统一控件框架。

## 7. 多平台目标

### Desktop Full

- Windows
- Linux
- macOS

定位：专业完整版。

### Mobile Lite

- Android
- HarmonyOS
- iOS / iPadOS

定位：现场工作版 + 离线核心计算。

### Mini Lite

- 微信小程序

定位：高频业务、现场填报、查询、轻量离线计算。

### Optional

- Web

Web/API/Server 属于增强能力，不得成为核心计算必须在线的前提。

## 8. Offline-first

正式原则：

> Offline-first, cloud-optional。

已经声明支持的本地业务能力必须能够在本地完成正式计算。云服务未来主要承担同步、协作、备份、账号、授权、企业共享、标准包分发等能力。

## 9. Qingzhou Business Truth Model

“业务真相”由四部分共同构成，而不是单靠一份 JSON 或一套 Python 代码。

### A. Canonical Evidence / Data

保存标准元数据、标准表、参数、因子、适用范围、有效期、来源、条款位置、公式原文信息、标准系数和查表数据。

### B. Canonical Rule Specification

表达适合机器声明的比较、范围、查表、插值、分段、布尔条件、参数选择、单位转换、显式修约、等级逻辑及简单/中等公式。

### C. Versioned Domain Calculator

复杂算法允许使用专用 Calculator，例如 CarbonMaterialCalculator、Pump Calculator 或其他设备 Evaluator。

要求：平台无关 Domain、明确版本、明确输入/输出 Contract、关键中间结果可追溯、不依赖 UI/SQLite、通过同一 Conformance Vectors。

### D. Platform-independent Conformance Vectors

作为不同语言、不同平台实现是否具有相同业务行为的最终验证资产。

## 10. 规则能力分级

### Level 1 — Declarative Rule

简单公式、比较、等级、简单条件。优先完整机器表达。

### Level 2 — Structured Calculation

查表、插值、分段、多条件、数学函数、多指标比较。尽量结构化机器表达。

### Level 3 — Specialized Domain Calculator

复杂物料/碳平衡、复杂工况、多排放源关联、复杂证据组合、复杂设备专业计算等。

不强制塞入通用 DSL，但必须具有 `calculator_id`、`calculator_version`、输入/输出/trace Contract、来源与 Conformance。

## 11. Numeric Contract 原则

公共 Numeric Contract 至少应约束：

1. Canonical 数字优先使用十进制字符串；
2. 正式权威计算链禁止 binary float；
3. 默认 full-value comparison；
4. 禁止 implicit rounding；
5. 标准显式要求修约时才允许显式修约；
6. 显示位数不得改变正式判定；
7. `< <= > >= ==` 语义明确；
8. 中间量修约必须有业务依据；
9. 页面代码不得自行 round 后参与正式计算；
10. 操作顺序不得依赖平台优化器自行改变。

## 12. Transcendental Numeric Contract

对 `sqrt`、`ln`、`pow`、fractional power、`exp` 等非线性数学函数，不得假设 Python Decimal、Kotlin BigDecimal、Swift Decimal、ArkTS/JS 十进制库天然给出可互换的末位结果。

正式 Numeric Contract 必须进一步冻结：

- function_id；
- precision policy；
- rounding policy；
- operation order；
- output normalization；
- allowed error/tolerance；
- reference implementation 或 reference procedure；
- numerical conformance vectors。

具体参考算法当前保持 OPEN，见 `DECISIONS_NEEDED.md`。

## 13. Calculation Rule Primitives

公共规则能力初始至少考虑：

```text
add subtract multiply divide
pow sqrt ln
min max abs
lookup range piecewise interpolate
lt lte gt gte eq
and or not
grade
explicit_round
unit_convert
```

不要求当前一次实现全部能力，也不得为了 DSL 完整度延迟业务标准建设。

## 14. Unit Contract

真正的单位换算应集中为统一单位语义，例如 kg↔t、kJ↔GJ、kWh↔MWh、Nm³↔10⁴Nm³。

必须区分：

- 单位转换系数；
- 标准公式固有系数（例如 44/12、44/16）。

两者不得都作为无来源“魔法常数”处理。

## 15. Conformance Vectors

每个正式支持标准应逐步建立平台无关案例，至少可表达：

- case_id；
- module_id；
- profile_id（如适用）；
- standard_id / standard_version；
- rule_version / calculator_version；
- numeric_contract_version；
- input / normalized_input；
- lookups / intermediate_results / comparison；
- expected_business_status / expected_result；
- warnings / errors；
- source / provenance。

某客户端只有通过对应标准/Profile 的 Conformance，才允许在 Capability Manifest 中声明正式支持。

## 16. Capability 粒度

Capability 至少允许细化到：

```text
module
profile
standard
feature
platform
```

因此 Desktop、Mobile、Mini 可以支持不同业务子集，但已实现的同一标准不得降低算法要求。

## 17. qzpack 原则

长期采用 Canonical-first 标准包。

逻辑内容包括：

```text
manifest
canonical
schemas
provenance
conformance
hashes
signature
release notes
```

SQLite/Room/其他本地库只是平台部署与查询形式，不是 qzpack 的事实源。

## 18. qzpack 生命周期

长期生命周期：

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

失败必须能够 Rollback。

Package Manifest 至少预留：

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

签名算法、信任链和离线撤销具体方案当前保持 OPEN。

## 19. 标准独立升级

允许软件版本不变，只升级单个标准或标准组。

历史 Record 必须记录 package/version/hash、rule/calculator version 等足够信息，不得因为新标准包安装自动改变历史结果。

当前不要求立即把全部现有标准拆成 qzpack。先做代表性试点。

## 20. Workspace / Attempt / Record

### Workspace

可编辑、可继续填写、可恢复。

### Attempt

一次实际执行计算或评价动作，可产生 SUCCESS、OUT_OF_STANDARD_SCOPE、INSUFFICIENT_DATA、INVALID_INPUT 等业务状态。

### Record

用户或业务流程正式保存的不可变业务结果。Record 不等于“一定计算成功”，也不要求所有 Attempt 自动形成 Record。每个模块业务规范必须明确哪些 Business Outcome 可以被正式保存。

程序异常、数据库损坏、calculator crash 等属于 EXECUTION_ERROR，不得与业务“无法判定”混淆。

## 21. Result / Record Envelope

公共外围逐步统一：

```text
contract_version
module_id
standard_id
standard_version
rule_version
calculator_version
numeric_contract_version
result_contract_version
package_id
package_version
package_hash
input_snapshot
parameter_snapshot
result
trace
warnings
problems
provenance
calculated_at
```

`result` 内部由各模块自己定义。

现有数据库不要求立即大迁移：先冻结 Contract，再增量兼容。

## 22. Workspace Contract 与 UI State 分离

Qt objectName、ComboBox index、Tk 控件状态等可以作为 runtime presentation_state，但不得作为未来 `.qzproj`、Suite、Mobile 的业务 Workspace Contract。

跨平台 Workspace 保存业务字段 ID、业务值、单位、标准/Profile、业务状态与模块语义。

## 23. `.qzproj`

定位为平台无关项目交换/归档格式，而不是所有平台唯一实时数据库。

具体容器格式尚未冻结；长期应允许 Suite 与独立版交换相同模块项目。

## 24. Record 体积与归档

正式 Record 保存足够信息确保审计、追溯、历史不漂移，同时允许 content-addressed snapshot、deduplication、compression、archive、cold storage 等实现。

不得通过清理删除形成正式结果所必需的唯一证据。

## 25. Presentation Schema

Presentation Schema 用于加速普通字段/表单开发，不是复杂 UI 的唯一实现方式。

复杂多明细、碳核算边界、设备复杂工况、高级交互允许平台专用 Presentation 代码。

## 26. 标准数量与体积

数十至数百项标准不是架构障碍。标准规则应主要以结构化数据、参数、规则和 Conformance 存在。

完整标准 PDF、大量高清图片和无关附件不应成为核心运行包的默认必需内容。

Desktop 可默认安装全量标准；Mobile 可采用核心标准 + 按需下载离线标准包。

## 27. Desktop Self-contained

三个独立 Desktop 产品默认自包含运行时。允许各自携带重复的 Python/Qt/必要依赖，不为了节约少量磁盘空间建立复杂系统级共享 Runtime。

Suite 自己维护其 Runtime。

## 28. 公共 Contract 权威源

在三个业务仓库仍独立期间，本仓库 `Qingzhou-contracts` 是公共 Contract 唯一事实源，不是第四个用户产品，也不是运行时依赖。

三个业务仓库必须锁定已发布 tag + commit SHA，禁止实时追随本仓库 `main`。

## 29. Contract 版本

至少独立管理：

```text
architecture_version
numeric_contract_version
unit_contract_version
module_contract_version
package_contract_version
workspace_contract_version
result_contract_version
```

同名 Contract 不允许在三个产品中出现语义不同的私有版本。

## 30. 当前三个项目特别要求

### GHGTOOL

保留复杂行业 Domain Calculator；优先收口 Numeric/Unit、标准查表/reference data、Conformance、Result/Record Contract 和跨平台 Workspace 边界。

### EquipEffi

继续现有业务开发；重点关注 Numeric、Transcendental Numeric、Canonical-first、Conformance、module_id、Capability Manifest 和版本追溯；不要求当前迁移 Tk UI。

### ECQuota

继续 Numeric Semantics 修正，废止无标准依据的隐式 ROUND6；GB 29446 作为简单规则/Canonical/qzpack/Conformance 的优先试点候选。

## 31. 当前实施路线

### Stage 0 — Contract Foundation

冻结/完成公共 Contract v1 草案与试点 Schema。

### Stage 1 — 三个代表标准试点

- ECQuota：GB 29446；
- EquipEffi：代表性离心泵标准；
- GHGTOOL：GB/T 32151.34。

验证 Business Truth、Canonical、Calculator、Numeric、Conformance、Result、Version 闭环。

### Stage 2 — Conformance CI

Desktop 先完成，未来其他平台复用。

### Stage 3 — qzpack Prototype

先验证安装、验证、签名、依赖、激活、回滚、历史版本，不全量拆包。

### Stage 4 — Platform Extraction

公共 Contract 稳定后再抽公共 implementation。

### Stage 5 — Suite AppShell

模块发现、导航、授权、设置、关于；不得复制业务算法。

### Stage 6 — Mobile Pilot

仅选高频业务，要求 Offline + Local Standard Pack + Conformance PASS。

### Stage 7 — Monorepo / Native Core Decision

只有多语言实现维护成本、性能、Suite 协作成本出现真实问题时再评估 Monorepo、Rust/C++ 或共享 Native Core。

## 32. 当前明确不做

- 三仓立即合并；
- Suite 正式开发；
- Android/HarmonyOS/iOS/小程序全量开发；
- 所有标准立即 qzpack 化；
- 所有复杂算法 DSL 化；
- Rust/C++ 核心重写；
- 为统一视觉重写成熟 UI。

## 33. 最终冻结原则

> 独立版和 Suite 共用业务模块，不复制算法。

> 独立产品必须自包含并能够离线运行。

> 复杂标准允许专用 Domain Calculator。

> 业务真相由 Canonical 数据/规则、Versioned Calculator Contract 与 Conformance Vectors 共同约束。

> Python 不是跨平台唯一事实源；Canonical JSON 也不是单独全部业务真相。

> 默认禁止隐式修约；显示精度不得改变正式判定。

> 非线性数学函数不得依赖平台默认结果。

> 同一 Capability 在不同平台必须通过同一 Conformance Vectors。

> 移动端减少功能，不降低已实现标准的算法要求。

> 标准可以独立安装、版本化、升级和回滚。

> 历史正式 Record 不随规则升级自动漂移。

> UI State 不得成为跨平台业务 Workspace。

> Suite、Monorepo、Native Core 是后续工程选择，不是当前业务开发前提。

> 先冻结 Contract，再试点，再抽公共平台，最后开发 Suite 和多端。

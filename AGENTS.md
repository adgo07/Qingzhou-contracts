# AGENTS.md — Qingzhou Contracts

本仓库是三类专业软件公共架构规范、Contract、Schema 与跨平台 Conformance 的唯一权威源。

## 1. 仓库定位

本仓库不是第四个业务产品，也不是用户运行软件时必须安装的依赖。

受其约束的业务模块：

- `qz.energy_quota` — 能耗限额评价
- `qz.equipment_efficiency` — 设备能效分析
- `qz.carbon_accounting` — 温室气体排放核算

业务仓库当前继续独立开发、独立发布、独立离线运行。

## 2. 权威层级

1. 已标记 `FROZEN` 的架构规范；
2. 已发布的 Contract/Schema tag；
3. 已批准 ADR；
4. 已合并 RFC；
5. DRAFT 文档；
6. 各业务仓库本地实现说明。

低层级内容不得覆盖高层级内容。

## 3. 变更规则

- `main` 只接受已审查内容。
- 公共 Contract 的语义变化必须先有 RFC 或 ADR 记录。
- 单个业务项目不得为解决本地问题自行改变公共 Contract 含义。
- 三个业务仓库不得实时跟随本仓库 `main`；必须锁定 release/tag + commit SHA。
- 普通产品 Bug、UI 调整、标准专属业务问题留在对应业务仓库，不必提交本仓库。

## 4. 公共 Contract 变更门槛

以下变化属于本仓库治理范围：

- Numeric / Transcendental Numeric 语义；
- Unit 语义；
- Module / Capability 标识；
- Workspace / Attempt / Record / Result 公共外围；
- qzpack / Canonical Envelope；
- 跨平台 Conformance Schema；
- 版本兼容和迁移原则。

## 5. 禁止事项

- 禁止创建 UniversalEngine 把三个业务 Domain 混为一体。
- 禁止要求所有复杂标准 100% DSL 化。
- 禁止把 Python 代码或单份 JSON 视为全部业务真相。
- 禁止让显示修约影响正式判定，除非标准显式要求。
- 禁止未通过对应 Conformance 就声明 Capability 为正式支持。
- 禁止历史正式 Record 因标准包或算法升级自动漂移。
- 禁止把 Qt/Tk 等 Presentation State 当跨平台 Workspace Contract。
- 禁止为了未来统一而提前大规模迁移成熟 UI、Rust/C++ 重写或三仓合并。

## 6. 职责与读取路由

中央维护公共规则与方法；具体产品能力、专业实现及功能开放范围由业务仓按既有批准流程维护。既有 Owner 批准决定继续有效，职责调整不授权 Agent 自行开放功能。缺少业务承接依据时保留中央决定，待明确迁移后再移除。

中央架构、Contract、Schema 与 Conformance 的当前发布状态以 [PLATFORM_STATE](PLATFORM_STATE.md) 为准；UI 指南与历史资料的适用状态和读取入口由 [GUIDE_INDEX](docs/GUIDE_INDEX.md)、各文件状态说明及 [历史索引](docs/history/README.md) 明确。历史证据身份不等于规范失效。

中央不默认新增产品型可执行原型或截图矩阵；必要公共规范示意图、Schema fixture 与校验脚本按用途判断。迁出历史资产前须有已认可的持久归档位置并完成下载恢复验证，不以临时 ZIP 或会过期的 CI artifact 代替。

## 7. 对执行 Agent 的要求

开始任务前读取：

- `docs/architecture/ARCHITECTURE_V2.1_FROZEN.md`
- `PLATFORM_STATE.md`
- 与任务有关的 `contracts/`
- `DECISIONS_NEEDED.md`

如发现公共规范不足：

> 不要在业务实现中私自发明长期公共规则；创建或草拟 RFC，并将实现限制在明确可逆的范围内。

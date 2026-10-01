# 青舟工业能源软件统一产品交付治理规则 v1

英文任务代号：`Qingzhou Product Delivery Policy v1`

状态：**ACTIVE GOVERNANCE POLICY**  
中文解释：**当前有效的产品交付治理规则**  
适用仓库：`Qingzhou-contracts`、`ECQuota-Insight`、`EquipEffi`、`GHGTOOL`

> 本文件是 Architecture V2.1 下的产品开发优先级和交付治理规则，不是新的业务 Contract，不是 Frozen Contract，不替代 `ARCHITECTURE_V2.1_FROZEN.md`，也不修改已经冻结的 Numeric Contract v1。

## 1. 总体目标

三个业务软件统一采用以下交付原则：

1. **参考标准优先（Reference Standard First）**：一个代表标准先跑通完整产品流程；
2. **Windows 优先（Windows First）**：Windows 桌面版是当前第一优先正式交付平台；
3. **软件核心优先（Product-core-first）**：软件自身核心业务功能优先于 Excel；
4. 核心业务闭环完成后，必须补齐参考标准的 Excel 导入、处理和必要导出能力；
5. Android、iOS、HarmonyOS 等暂不作为当前正式开发目标，但必须保留未来跨平台条件；
6. 新标准原则上逐个增加，不采用大量标准同时铺开的方式；
7. AI Agent 开始设计、开发、修复或重构前，必须按业务仓锁定版本检查中央 Contract；
8. 用户可见内容、治理文档和执行/验收报告在不破坏机器接口的前提下优先使用中文。

最终目标：

> 先把三个软件真正做成稳定、可使用的 Windows 工业能源专业软件，再逐步增加标准和其他平台。

## 2. 中文优先，但不破坏机器接口

在不影响程序性能、机器识别、接口稳定、数据兼容、跨平台兼容和自动化测试的前提下，用户界面、错误提示、结果解释、标准依据、README、路线、治理、执行/验收报告、代码注释、测试案例说明、PR/Issue 描述和业务展示名称应尽量使用中文。

已经作为机器字段或稳定标识符使用的内容保持稳定英文，例如：

- Python 类名、函数名、模块名、package；
- JSON/YAML key；
- database column；
- enum value；
- API/protocol/schema field；
- Contract ID、Module ID、stable identifier；
- command、既有 branch 命名规则、文件扩展名；
- 外部工具规定的固定名称。

人阅读的文档应尽量采用“中文解释（英文技术标识）”，例如：

- 数值配置（`numeric_profile_id`）；
- 规则版本（`rule_version`）；
- 标准编号（`standard_id`）；
- 应用层（Application）；
- 领域层（Domain）；
- 权威计算（Authoritative Calculation）；
- 一致性测试（Conformance）；
- 参考标准（Reference Standard）；
- 核心纵向闭环（Core Vertical Slice）。

原则：

> **机器字段保持稳定，人看的解释尽量中文。**

新增纯治理、说明、路线、报告文件时，如不存在 CI、脚本、Schema、Contract 或外部工具依赖，允许优先中文文件名；已有自动化引用的稳定英文文件名继续保持。

## 3. 三个参考标准

当前三个软件分别指定一个参考标准：

| 软件 | Module ID | 参考标准 |
|---|---|---|
| ECQuota | `qz.energy_quota` | `GB 29446—2019 选煤电力消耗限额` |
| EquipEffi | `qz.equipment_efficiency` | `GB 19762—2025 离心泵能效限定值及能效等级` |
| GHGTOOL | `qz.carbon_accounting` | `GB/T 32151.34—2024`，准确名称以业务仓现行标准目录为准 |

在参考标准完整流程通过正式验收之前，不以“大量新增标准”为主要开发目标。

允许修复已有其他标准的严重错误、维护现有功能和修复回归问题，但主要开发资源应集中在参考标准。

## 4. 核心纵向闭环

每个 Reference Standard 至少完成以下语义完整流程：

```text
标准库发现标准
→ 查看标准基本信息
→ 选择标准
→ 新建评价 / 分析 / 核算
→ 填写基础信息
→ 填写业务数据
→ 输入检查
→ 业务校验
→ 单位及数据规范化
→ 正式计算
→ 等级 / 结果 / 结论
→ 显示计算依据
→ 显示标准依据和来源
→ 保存正式记录
→ 关闭或重新进入软件
→ 查看历史记录
→ 正确恢复并展示结果
```

不同软件可以使用不同业务名称，但上述流程语义必须完整。

不得仅因为 Calculator 可运行、单元测试通过、公式算对或页面能打开，就认定参考标准已经“跑通”。

正式跑通至少同时验证：

- **业务层**：用户能完成真实业务任务；
- **计算层**：输入、规则、计算、边界、结果正确；
- **产品层**：页面、导航、记录、历史查看和错误提示可用；
- **Windows 交付层**：Windows 环境可实际运行。

## 5. Windows First

当前正式主交付平台：`Windows Desktop`（Windows 桌面版）。

Windows 是当前：

- 第一功能实现平台；
- 第一 GUI 平台；
- 第一正式测试平台；
- 第一打包平台；
- 第一文件处理平台；
- 第一 Excel 工作平台；
- 第一用户验收平台。

参考标准完整流程的 Windows 正式验收至少应覆盖：

- Windows 10/11 基本兼容性；
- 正常启动与关闭；
- 中文正常显示；
- 高 DPI 主要页面可使用；
- 文件选择、中文路径、中文企业名正常；
- Excel 中文文件名正常；
- 用户数据路径与 SQLite 等本地数据库正常；
- 异常输入不导致程序崩溃；
- Windows CI 通过；
- 正式打包方式明确。

若尚未达到安装程序级别，可以暂时使用开发运行包，但必须在 Reference Standard Roadmap 中标记真实状态。

## 6. Cross-platform Ready

Windows-first 不等于 Windows-only architecture。

继续遵守 Architecture V2.1：

```text
Windows UI
    ↓
应用层（Application）
    ↓
领域层（Domain）
    ↓
端口（Port）
    ↓
基础设施适配器（Adapter / Infrastructure）
```

Domain/Application 不得直接依赖 Win32、Windows Registry、Windows 专属路径规则、PySide6 Widget、QFileDialog、Android Activity、Kotlin UI、SwiftUI、iOS API 或 HarmonyOS UI API。

已有 Android skeleton、bridge、API、JSONL 等实验资产可以保留，但不得因为维护实验平台拖慢 Windows 主产品闭环。

当前不要求正式开发 Android、iOS、HarmonyOS、macOS 或 Web。

## 7. 软件核心优先于 Excel

统一开发顺序：

```text
第一阶段：软件自身核心业务闭环
→ 第二阶段：参考标准 Excel 闭环
→ 第三阶段：第二个标准
→ 第四阶段：第三个标准
→ ……
```

Excel 很重要，但不能反过来决定业务内核。

Excel 的正式定位是：

> **Excel 导入/导出适配器（Import / Export Adapter）**。

## 8. Excel 不得形成第二套业务算法

统一架构原则：

```text
GUI 手工填写 ─┐
Excel 导入 ────┼→ 统一规范输入（Canonical Input）
未来移动端 ────┘        ↓
                    应用层服务
                         ↓
                    同一个业务内核
                         ↓
                    同一个 Calculator
                         ↓
                    同一个结果模型
```

禁止 GUI、Excel、Android、iOS 分别维护不同业务算法。

对于同一组业务输入，GUI 与 Excel 的 Calculator 输入语义、等级、结论、状态和核心业务结果必须一致；展示格式可以不同。

## 9. Excel 完整闭环

参考标准核心业务闭环完成后，继续完成：

```text
生成或取得 Excel 模板
→ 用户填写
→ 软件读取 Excel
→ 识别工作表和字段
→ 字段映射
→ 类型检查
→ 业务校验
→ 转换成统一输入
→ 调用与 GUI 相同的业务计算内核
→ 产生相同业务结果
→ 保存正式记录
→ 必要时导出 Excel
```

Excel 数值进入正式业务链前必须明确处理：

- 单元格原始类型；
- 数值字符串化策略；
- Decimal 转换策略；
- 空值、日期、百分比、公式单元格、科学计数法、中文文本数字、单位和异常值。

不得因为 Excel 库返回 Python `float` 就默认认为满足精确十进制要求。

如果锁定的 Numeric Contract 对 Excel 数值入口仍有 OPEN 项，Reference Standard Roadmap 必须标成真实的 `PARTIAL` 或 `BLOCKED`，不得假装完全解决。

## 10. 新标准逐个增加

参考标准 + Excel 闭环完成以后，新标准原则上逐个增加。

每增加一个新标准，至少确认：

- 标准来源、状态、适用范围和元数据；
- 输入字段、强制字段、条件字段、校验规则；
- 单位、参数、公式和判定规则；
- Numeric Contract；
- 边界案例；
- Golden Case；
- Conformance；
- Windows UI；
- Excel 映射；
- 回归测试。

## 11. 第二个标准承担架构验证任务

每个软件完成 Reference Standard 后，第二个标准不仅用于增加业务，还必须验证当前架构是否真正能够扩标准。

理想情况：

```text
新增标准数据
+ 新增标准规则
+ 新增必要配置
+ 少量 UI 元数据
```

如果第二个标准要求重新开发整个页面、Calculator 框架、数据库、记录系统或 Excel 框架，应先判断是标准真实特殊性还是当前抽象设计不正确。

## 12. AI Contract Preflight

任何 AI Agent 执行设计、开发、重构、修复、标准接入、Calculator、Numeric、Excel、Record、数据库、Schema、Module、Package、跨平台、导入导出任务前，如可能涉及平台公共语义，必须按以下顺序执行：

```text
读取业务仓 platform-lock.json
→ 确认锁定的 Qingzhou-contracts 版本 / SHA
→ 读取该 locked SHA 下相关 Frozen Contract
→ 提取适用于任务的 MUST / MUST NOT
→ 检查任务是否冲突
→ 确认后再设计或编码
```

AI Agent **不得**直接读取 Qingzhou-contracts 最新 `main` 并认为业务仓必须自动跟随。

除非任务明确要求升级中央 Contract 版本，否则不得擅自升级业务仓锁定基线。

## 13. Contract 冲突分类

发现业务仓与中央规则不一致时，必须分类：

### A. 本地缺陷（LOCAL DEFECT）

本地实现违反当前已经采用的 Frozen Contract。

处理：修业务仓。

### B. 允许的项目差异（ALLOWED PROJECT DIFFERENCE）

中央 Contract 明确允许项目自行配置，例如 Numeric Profile precision。

处理：不要为了表面一致强行统一。

### C. 已登记偏差（REGISTERED DEVIATION）

差异已正式登记但尚未关闭。

处理：按当前治理状态执行，不得假装已解决。

### D. 中央 Contract 缺口（CENTRAL CONTRACT GAP）

真实业务需求无法被当前中央 Contract 正确表达。

处理：业务仓不得自行创造另一套“中央规则”，应形成：

```text
业务证据
+ 实际案例
+ 当前 Contract 不足
+ Candidate 建议
```

返回 `Qingzhou-contracts` 进入中央治理。

## 14. 正式报告必须包含“平台 / Contract 预检查”

以后正式 Design、Execution Report、Acceptance Report 至少包含：

| 项目 | 结果 |
|---|---|
| 当前业务仓 SHA |  |
| `platform-lock.json` SHA |  |
| 中央 Contract 版本 / SHA |  |
| 本任务相关 Contract |  |
| 适用的 MUST |  |
| 适用的 MUST NOT |  |
| 是否发现冲突 | 是 / 否 |
| 冲突类型 | LOCAL DEFECT / ALLOWED PROJECT DIFFERENCE / REGISTERED DEVIATION / CENTRAL CONTRACT GAP / N/A |
| 是否需要修改中央 Contract | 是 / 否 |

如果任务完全与中央公共语义无关，可以写：

`本任务不涉及中央公共 Contract。`

但不得直接省略预检查。

## 15. Reference Standard Roadmap

三个业务仓根目录维护：

`REFERENCE_STANDARD_ROADMAP.md`

正文以中文为主。

状态只允许：

| 状态 | 中文解释 |
|---|---|
| `DONE` | 已完成 |
| `PARTIAL` | 部分完成 |
| `NOT STARTED` | 尚未开始 |
| `BLOCKED` | 被阻塞 |

每个状态必须有证据。

`PARTIAL` 必须说明已完成什么、缺什么、是否影响参考标准正式使用。

`BLOCKED` 必须说明阻塞原因，以及是否需要中央 Contract 决策。

## 16. 三仓 Reference Standard Roadmap 最小盘点范围

### ECQuota / GB 29446—2019

至少盘点：标准库、新建评价、输入、校验、Calculator、等级、结果解释、正式记录、历史记录、Windows、Excel、Conformance、Golden Case、打包、下一标准准备状态。

### EquipEffi / GB 19762—2025

至少盘点：标准库、新建设备分析、分类、输入、校验、Calculator、能效等级、不适用、无法判定、结果解释、正式记录、Windows、Excel、Conformance、Golden Case、下一标准准备状态。

### GHGTOOL / GB/T 32151.34—2024

至少盘点：标准库、企业信息、核算周期、核算边界、排放源、活动数据、参数和因子、校验、Calculator、分项排放、总排放、结果解释、正式记录、历史记录、Windows、Excel、Conformance、下一标准准备状态。

## 17. 业务仓 AGENTS 规则

每个业务仓 `AGENTS.md` 必须包含“青舟平台开发前置检查（Qingzhou Platform Contract Preflight）”章节，并至少明确：

- 先读 `platform-lock.json`；
- 按 locked SHA 读取中央仓；
- 执行 Frozen Contract preflight；
- 不自动跟随 central `main`；
- Windows-first；
- Reference Standard first；
- Product-core-first；
- Excel-as-adapter；
- Cross-platform-ready；
- Contract conflict classification；
- 用户可见内容中文优先。

业务仓只引用本中央 Policy 和本仓锁定版本，不复制全文。

## 18. Scope integrity

本 Policy 任务只允许：

```text
治理规则
+ 当前真实状态盘点
+ 业务仓 Agent 规则同步
```

不得借机：

- 修改 Calculator、公式、Numeric Profile、标准判定；
- 新增大量标准；
- 实现新的 Excel 功能；
- 开发 Android/iOS/HarmonyOS；
- 重构 GUI；
- 修改数据库；
- 修改 Architecture V2.1；
- 修改 Frozen Numeric Contract v1。

发现 Excel、Windows、Record、UI、第二标准或实验移动端问题时，本任务只记录，不“顺手重构”。

## 19. 统一产品交付结论

```text
Windows 当前第一交付平台：是
未来跨平台架构条件保留：是
当前立即全面开发 Android/iOS：否
参考标准优先：是
先跑通一个标准再逐个扩展：是
软件核心功能优先于 Excel：是
Excel 后续属于必备能力：是
Excel 使用独立业务算法：否
GUI 与 Excel 共用业务内核：是
AI 执行前检查 platform-lock：是
AI 自动跟随中央 main：否
用户可见内容中文优先：是
不影响机器识别时文档中文优先：是
Reference Standard 完成前大量扩标准：否
```

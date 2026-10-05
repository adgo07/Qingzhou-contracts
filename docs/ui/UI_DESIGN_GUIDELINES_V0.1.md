# 青舟桌面 UI 设计指南 v0.1

英文技术名：`Qingzhou Desktop UI Guidelines v0.1`

状态：**ACTIVE / EVOLVING**  
中文解释：**当前有效、持续演进**  
文件性质：**Product Design Guideline（产品设计指南）**  
适用范围：当前三个青舟工业能源 Windows Desktop 产品的 UI/UX 设计与评审。

> 本指南不是 `Frozen Contract`，不冻结具体页面，不修改 Architecture V2.1、Numeric Contract v1 或 `PRODUCT_DELIVERY_POLICY_V1.md` 的既有核心原则。

## 1. 定位与上位关系

本指南建立在 `docs/governance/PRODUCT_DELIVERY_POLICY_V1.md` 之下，用于把 Windows-first、Reference Standard first、中文优先、产品核心优先等治理原则落实到桌面 UI 设计层。

本阶段仍处于三个软件的早期产品开发期。本指南只提供可持续演进的共同设计方向，不代表 UI v1.0，也不授权页面重构、公共 PySide6 组件抽取或三个软件像素级统一。

当前优先级：真实用户任务 → 清晰业务信息 → 可读结果与依据 → 必要的专业详情 → 技术审计与诊断信息。

不得反过来按数据库表、JSON、Python 类、模块、内部 Rule 或调试结构组织普通用户界面。

## 2. 三层规则模型

本指南使用三层规则：

1. **当前必须遵守的产品原则**：三个软件当前设计与后续 UI 工作均应遵守；
2. **RECOMMENDED / 推荐模式**：优先考虑，但不是固定页面结构；
3. **EXPERIMENTAL / 实验性模式**：允许单仓验证，不要求其他软件同步。

其中“必须遵守”约束的是产品语义和用户体验原则，不等于冻结具体 Widget、页面数量或布局。

# 第一层：当前必须遵守的产品原则

## 3. Windows-first

当前第一交付和第一 UI 平台为 `Windows Desktop`。当前正式桌面 UI 首先服务 Windows 用户，并优先验证 Windows 10/11、高 DPI、中文显示、键盘鼠标操作、文件选择和主要业务流程。

Windows-first 不等于 Windows-only architecture。

## 4. PySide6 是当前桌面默认 UI 技术栈

三个业务软件当前正式 Windows Desktop UI 原则上统一采用 PySide6 / Qt Widgets。

若某仓当前仍存在 Tkinter、Web UI 或其他遗留/实验 UI 技术，应先如实记录实际状态，不得仅为符合本指南而在治理或盘点任务中重构。未来确有采用其他桌面技术的理由时，应在设计说明中显式记录原因、影响和迁移边界。

## 5. PySide6 不是跨平台业务 Contract

PySide6 只属于当前 Windows Desktop Presentation 层的技术选择。Domain / Application 不得因此依赖 PySide6 Widget、Qt 对话框或其他 Presentation 实现。

未来 Android、iOS、HarmonyOS、Web、macOS 可以采用不同 UI 技术。跨平台需要复用的是业务语义、信息架构、交互原则、Application API、Domain Rule、Canonical Input / Result，不要求复用 PySide6 Widget。

## 6. 用户任务优先

普通页面首先回答：“用户现在要完成什么工作？”页面分组、导航、按钮和提示应围绕用户任务，不围绕数据库、JSON、Python 类/模块、内部 Rule、内部流水线或调试结构。

## 7. 中文优先

在不影响机器识别、数据兼容、API、Schema、性能和自动化的前提下，用户可见内容优先使用中文。稳定机器标识可以继续使用英文，但普通用户不应被迫理解机器标识。

## 8. 普通 UI 禁止泄露内部技术标识

普通用户界面原则上不得直接展示 `key`、`field_id`、`rule_id`、`internal_id`、JSON key、数据库字段名、Python 变量名、枚举内部值、内部 Calculator 名或调试标记。

例如内部可以保留 `washing_process`、`enterprise_status`、`raw_coal_input`，普通 UI 应显示“洗煤工艺”“企业状态”“原煤入选量”。

若技术人员确实需要查看内部标识，应进入高级信息、技术详情或诊断信息层，不得默认占据主要业务页面。

## 9. 普通用户层与技术审计层分开

统一采用渐进展示（Progressive Disclosure）。普通用户默认看到“输入什么 → 结果是什么 → 为什么是这个结果”。

技术人员按需进一步查看计算明细、规则版本、内部 trace、Numeric Profile、Calculator version、原始 Decimal、内部 Rule ID、诊断信息。技术能力必须保留，但不得默认挤占普通用户的主要操作区域。

## 10. “运算轨迹”不是普通用户主要内容

“运算轨迹”“trace”等开发/审计术语不应作为普通业务页面的主要区块。普通用户优先看到“计算说明”，例如：

```text
综合电耗
= 总用电量 ÷ 原煤入选量
= 75000 ÷ 10000
= 7.50 kWh/t
```

真正技术 trace 放入“高级信息 / 技术详情 / 诊断信息”。

## 11. 单页优先，但不强制单页

对于输入字段少、业务逻辑简单的标准，优先一页完成主要任务。简单能耗限额评价可优先组织为“基本信息 + 评价输入 + 结果 + 判定依据”。

不要为了形式统一而拆成大量页面、Tab、Wizard Step 或弹窗。但 `One-page first` 不等于 `One-page mandatory`。复杂核算允许使用分组卡片、折叠区、纵向滚动和必要步骤流程。只有业务复杂度真实需要时才增加页面或步骤。

## 12. 渐进展示

默认只展示完成当前业务任务所需的信息。次要信息通过“展开 / 详情 / 高级选项 / 专业信息 / 技术信息”按需显示。高级入口必须可发现，但不应让技术内容抢占主视觉层级。

### 12.1 最小交互与少阻断

本节只落实 `PRODUCT_DELIVERY_POLICY_V1.md` 的产品简化原则，不重复定义产品级规则。

- 少填、少选、少确认、少阻断；能可靠自动确定、推导、继承或复用的数据，不提供重复输入；
- 有可靠默认口径时优先直接采用默认，少数特殊情况再通过渐进展示提供高级选项；
- `Warning` 默认只提示，不弹阻塞确认框，也不要求用户反复确认“已知悉”；
- 内部 ID、Rule、Profile、technical trace 等继续留在高级信息 / 技术详情层，不进入普通任务主路径；
- 简单任务优先保持“必要输入 → 执行 → 结果”的短路径。

## 13. 结果优先

完成有效输入后，用户应能够快速看到核心指标、最终等级、最终状态、结论、适用限值和关键依据。不得让正式结果淹没在长表格、原始 JSON、内部 trace 或大量参数元数据中。

## 14. 解释必须可读

业务解释应优先采用普通工程人员能够理解的语言。不得只有 `input.actual.coking-coal`、`lookup(...)`、`rule_id=xxx` 等机器内容而缺少业务说明。必要技术标识可在高级信息中同时保留。

## 15. 技术追踪信息不得删除

隐藏普通用户不需要的技术内容，不等于删除审计能力。必须保留必要的 traceability、provenance、rule version、calculator version 和 internal diagnostic information。调整的是信息层级，而不是审计能力本身。

## 16. 软件家族一致性优先

三个软件应让用户明显感到属于同一产品家族。优先形成一致习惯的内容包括导航逻辑、字体层级、间距习惯、按钮语义、表单行为、状态展示、错误提示、表格交互、标准详情、记录列表、结果展示和高级信息入口。

一致性不要求页面完全相同，更不要求像素级一致。

# 第二层：RECOMMENDED / 推荐模式

以下模式是推荐起点，不是强制结构。

## 17. 推荐 AppShell

```text
┌────────────────────────────────────┐
│ 软件名称 / 页面标题      帮助 / 关于 │
├──────────┬─────────────────────────┤
│ 首页      │                         │
│ 标准库    │                         │
│ 新建××    │       当前页面          │
│ Excel导入 │                         │
│ 记录      │                         │
│ 参数库    │                         │
│ 设置      │                         │
└──────────┴─────────────────────────┘
```

导航项目可以根据真实业务调整，不冻结数量、顺序或名称。

## 18. 推荐首页能力

首页优先支持开始主要任务、查看最近工作、进入标准库，以及必要的最近标准或业务对象。卡片数量和排列方式不固定，避免为了“Dashboard 感”堆积低价值指标。

## 19. 推荐标准库能力

优先包括搜索、标准状态、标准名称、标准号、适用范围、替代关系、官方来源，以及基于该标准开始业务。具体布局不固定。

## 20. 推荐新建页面模式

- 简单标准：单页优先；
- 中等标准：单页面 + 分组卡片 / 折叠区；
- 复杂标准：确有必要时采用步骤式工作流。

不得仅为了三个软件形式相同而把业务复杂度不同的标准做成相同页数。

## 21. 推荐结果信息层级

第一层最终结论；第二层关键数值；第三层判定依据；第四层详细计算说明；第五层技术审计信息。正式结果应优先于原始输入快照和机器 trace。

## 22. 推荐记录页

优先提供搜索、筛选、查看、基于历史记录重新开始。是否允许直接编辑历史正式结果，由各业务产品和未来 Record Contract 决定，本指南不冻结。

# 第三层：EXPERIMENTAL / 实验性模式

## 23. 允许实验的设计

可以在单个业务仓试验全局搜索、右侧详情抽屉、多标签工作区、Dashboard、首页图表、自定义工作台、浮动结果面板、双栏新建页。

某仓试用不代表另外两个软件必须同步。经过真实业务使用验证后，才考虑提升为推荐模式。

## 24. 不冻结具体页面

`UI_DESIGN_GUIDELINES_V0.1` **不冻结**首页、标准库、新建页面、结果页面、记录页面、导航数量、导航顺序、卡片数量、页面数量、Tab 数量、具体布局、颜色、像素尺寸或按钮位置。

三个业务软件可以根据 Reference Standard、用户反馈、产品成熟度和业务复杂度持续调整。AI Agent 不得因为本指南 v0.1 的示意结构而拒绝合理的页面改进，也不得把推荐模式误写成 Frozen Contract。

## 25. 当前不抽公共 PySide6 package

当前禁止仅凭设计指南建立 `qingzhou-ui`、`qingzhou-common-ui`、`shared-pyside-components` 等公共 UI 包。

先让三个软件分别按照指南完成真实 Reference Standard UI 优化，再根据稳定重复模式判断是否值得抽取公共组件。

## 26. 与业务层的边界

UI 可以重组展示层信息，但不得自行改变 Calculator、Domain Rule、Canonical Input / Result 语义、Numeric Contract、标准解释、Golden Case 或 Conformance 业务结果。

如果 UI 设计发现需要改变上述内容，应回到相应业务/Contract 治理流程，不得在 Presentation 层静默改写。

## 27. UI Audit 问题分类

统一使用 `USER_NOISE`（用户无价值信息）、`INTERNAL_LEAK`（内部技术信息泄露）、`OVER_SPLIT`（页面或步骤过度拆分）、`OVER_DENSE`（页面信息密度过高）、`UNDER_EXPLAINED`（业务解释不足）、`INCONSISTENT`（三软件交互不一致）、`LANGUAGE`（英文/技术术语对普通用户不友好）、`LAYOUT`（布局问题）、`WORKFLOW`（用户流程问题）、`ACCESSIBILITY`（字体、缩放、高 DPI、可操作性问题）。

优先级只使用：`P0` 严重阻碍用户完成业务；`P1` 明显影响主要业务使用；`P2` 体验问题；`P3` 美观或低优先级改进。

## 28. 版本演进

`v0.1 → v0.2 → v0.3 → ...`

在三个 Reference Standard 的 Windows 核心 UI 均稳定并经过真实使用验证之前，不升级为 Frozen UI v1。后续是否建立 `UI Baseline v1.0`，另行治理决定。

## 29. v0.1 明确结论

```text
UI Guidelines 状态：
ACTIVE / EVOLVING

当前 Windows Desktop 默认技术栈：
PySide6

PySide6 是否属于跨平台 Domain Contract：
NO

Windows 当前第一 UI 平台：
YES

未来 Android/iOS 是否允许不同 UI 技术：
YES

用户可见内容中文优先：
YES

内部 key/field/rule 普通界面默认可见：
NO

技术 trace 是否删除：
NO

技术 trace 是否默认占据主业务页面：
NO

简单标准是否单页优先：
YES

所有标准是否强制单页：
NO

三个软件页面是否像素级强制一致：
NO

是否现在冻结首页结构：
NO

是否现在冻结导航结构：
NO

是否现在抽公共 PySide6 package：
NO

UI Guidelines 后续是否允许演进：
YES
```

本文件到 v0.1 为止只提供设计治理和审查依据，不授权直接进入 UI 重构阶段。
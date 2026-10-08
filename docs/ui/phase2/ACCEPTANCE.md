# Phase 2 简短验收说明

状态：**ACTIVE / EVOLVING**。日期：2026-10-09。性质：提交者的原型验证记录，等待 Owner 独立验收；不是生产软件验收或标准判定认证。

## 基线与范围

四仓默认分支与检查 SHA、相关实现差异见 [目录说明](README.md)。中央基于已合并 main 的 `aace2e2aac7336fbf655329486d903c8a4514868`。只读核对三个业务仓相关页面，未修改其文件，未运行全量业务测试。

GHGTOOL 最新实现中 Excel 预览本身只读，另有显式保存项目后用户主动发起正式核算的路径。本原型展示预览和分离的工作区/记录，不模拟该新增正式核算路径；后续交互映射列为 OPEN。

## 实测结果

[可复现浏览器检查](verify-prototype.cjs) 在 Windows Edge Chromium 中以 **file:// + 离线网络模式**运行：**61 项断言通过**，JavaScript 错误 0、HTTP(S) 请求 0。结果保存在 [browser-checks.json](evidence/browser-checks.json)。实际视口为 1440×900、1024×768、768×1024、390×844。

| 检查项 | 验证内容与结果 |
|---|---|
| 首页 / 导航 | 三产品切换，无侧栏首页、标准先于新建、独立设置；业务导航和返回首页通过 |
| 资源 / 视觉 | 真实 LOGO 与源文件哈希一致，统一 SVG；桌面首页与表格、窄屏表格截图已人工查看 |
| 标准库 | 关键词、状态、无匹配；五列、独立详情、三个指定页签及键盘切换通过；原文按钮诚实提示未附文件 |
| 记录 | 126 条演示记录全部可达，末条可搜索；420 条长列表可翻页；独立详情严格两个页签，禁用动作边界通过 |
| Excel | 四区域；ECQuota 控件禁用；EquipEffi 错误阻止模拟批处理、CSV 演示下载；GHGTOOL 预览不增加记录 |
| 参数库 | EquipEffi 无独立入口，ECQuota 禁用，GHGTOOL 搜索、空态、只读详情与免责声明通过 |
| 新建 | 五类分区；错误提示、固定演示结果、输入更改后旧反馈失效；EquipEffi 无额外保存通过 |
| GHGTOOL | 排放源增删、类型切换保留演示值、独立内存工作区；18 个源的长表单通过 |
| 窗口 / 状态 | 四尺寸页面无整体横向溢出；窄屏表格在本地容器滚动；空状态、错误、禁用入口可验证 |

截图入口：[桌面首页](evidence/home-desktop.png)、[桌面标准库](evidence/standards-1440.png)、[窄屏标准库](evidence/standards-390.png)、[GHGTOOL 长表单](evidence/ghg-long-form.png)。其余窗口截图保存在 evidence/。截图用于评审布局，业务信息均为演示。

## 复现与限制

直接打开 `prototype/index.html` 即可体验，无需安装依赖。自动检查仅在维护者已安装 Node.js、Playwright 和 Edge 的环境中执行：设置 `PLAYWRIGHT_MODULE` 为已有 Playwright 模块路径，然后运行 `node docs/ui/phase2/verify-prototype.cjs`；可通过 `QZ_BROWSER_CHANNEL` 选择已安装的 Chromium 通道。测试依赖不参与离线原型运行，也不加入三个业务仓。

未验证真实 Excel 解析、正式计算、标准正确性、数据库、生产 PySide6、高 DPI 原生控件或所有浏览器。数值是固定示意值，输入检查仅验证演示完整性/格式。刷新清除所有原型状态。当前测试通过不代表 OPEN 设计已批准。

## 分类与待确认

- **A 当前 Owner 决定**：遵循 UI 指南 A-01～A-16，包括页面/导航关系、命名、标准五列与三个页签、记录两个页签、产品能力边界及专业简洁淡蓝导航。
- **B 推荐设计**：当前颜色/字体/尺寸、分区式表单、分页、独立详情页、统一线性图标、设置承载与响应方案；可演进。
- **C / OPEN**：首页设置弹窗、窄屏顶部水平导航、Excel 四区标题、筛选词汇、源类型切换数据保留策略、GHGTOOL 新项目核算路径映射，以及尚未开放能力。详见 [交互说明](INTERACTION_SPEC.md)。ECQuota 禁用入口不禁止未来独立开放。

不涉及公共 Contract 或业务真值，不变更 Frozen Architecture、Numeric、Calculator、标准映射、Canonical、Schema、platform-lock。不新增跨仓运行时依赖或公共 PySide6 package。三个业务仓继续独立开发；本轮不实施 Phase 3。

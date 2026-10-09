# Phase 2 简短验收说明

状态：**ACTIVE / EVOLVING**。日期：2026-10-09。性质：Phase 2 离线原型验证记录（含 R1 Windows Edge 自动复验和人工截图核查）；不是生产软件验收或标准判定认证。

## 基线与范围

四仓默认分支与检查 SHA、相关实现差异见 [目录说明](README.md)。中央基于已合并 main 的 `aace2e2aac7336fbf655329486d903c8a4514868`。只读核对三个业务仓相关页面，未修改其文件，未运行全量业务测试。

GHGTOOL 最新实现中 Excel 预览本身只读，另有显式保存项目后用户主动发起正式核算的路径。本原型展示预览和分离的工作区/记录，不模拟该新增正式核算路径；后续交互映射列为 OPEN。

## 实测结果

[可复现浏览器检查](verify-prototype.cjs) 在 GitHub-hosted **Windows Edge Chromium** 中针对 R1 当前原型，采用 **file:// + 离线模式**重跑：**69 项断言通过 / 0 项失败，JavaScript 错误 0、HTTP(S) 请求 0**。结果为 [browser-checks.json](evidence/browser-checks.json)，覆盖 1440×900、1024×768、768×1024、390×844 四种视口。此前 61 项断言为旧版历史证据，现已被本轮结果取代。执行记录：[R1 Edge 工作流运行](https://github.com/adgo07/Qingzhou-contracts/actions/runs/37890500067)。

| 检查项 | 验证内容与结果 |
|---|---|
| 首页 / 导航 | 三产品切换，无侧栏首页、标准先于新建、独立设置；业务导航和返回首页通过 |
| 资源 / 视觉 | 真实 LOGO 与源文件哈希一致，统一 SVG；桌面首页与表格、窄屏表格截图已人工查看 |
| 标准库 | R1 新脚本已验证五列、适用对象搜索、仅标准状态筛选、编号与名称双入口、单页连续三个分区且无页签 |
| 记录 | 126 条演示记录全部可达，末条可搜索；420 条长列表可翻页；独立详情严格两个页签，禁用动作边界通过 |
| 表格导入 | 四区域；ECQuota 控件禁用；EquipEffi 错误阻止模拟批处理、CSV 演示下载；GHGTOOL 预览不增加记录 |
| 参数库 | EquipEffi 无独立入口，ECQuota 禁用，GHGTOOL 搜索、空态、只读详情与免责声明通过 |
| 新建 | 五类分区；错误提示、固定演示结果、输入更改后旧反馈失效；EquipEffi 无额外保存通过 |
| GHGTOOL | 排放源增删、类型切换保留演示值、独立内存工作区；18 个源的长表单通过 |
| 窗口 / 状态 | 四尺寸页面无整体横向溢出；窄屏表格在本地容器滚动；空状态、错误、禁用入口可验证 |

本轮更新截图：[桌面首页](evidence/home-desktop.png)、[桌面标准库](evidence/standards-1440.png)、[标准详情桌面](evidence/standard-detail-1440.png)、[标准详情窄屏](evidence/standard-detail-390.png)、[窄屏标准列表](evidence/standards-390.png)、[1024 宽表单](evidence/form-1024.png)、[390 宽长表单](evidence/form-390.png)、[GHGTOOL 18 排放源长表单](evidence/ghg-long-form.png)。其他截图在 evidence/。截图仅用于设计评审，全部内容是演示数据。

## R1 修正与验证状态

R1 已修改标准编号及名称双入口、标准详情单页三分区、适用对象搜索、删除额外软件支持筛选；原“Excel导入”普通功能名改为“表格导入”；首页排序修正；检查、计算、结果精炼，普通按钮及提示中文优先。**R1 自动复验已完成：69/69 PASS。** 新版截图与 `browser-checks.json` 已由 Windows Edge 工作流重生成。

## R1 Windows Edge 浏览器与视觉复验操作

**状态：PASS（本轮已在 GitHub-hosted Windows Edge 完成自动复验，以下为手动复现方法）。** 若在本地 Windows 10/11（已安装 Edge、Node.js、Git）重复执行，先核对分支与 `git status`，避免覆盖已有未提交工作。

```powershell
git fetch origin
git switch codex/qz-ui-03-phase2
git pull --ff-only origin codex/qz-ui-03-phase2
node --version
# 如已有 Playwright，可跳过下面的临时安装。
$testDir = Join-Path $env:TEMP "qz-ui-playwright"
npm install --prefix $testDir --no-save --no-package-lock playwright
$env:PLAYWRIGHT_MODULE = Join-Path $testDir "node_modules\playwright"
node .\docs\ui\phase2\verify-prototype.cjs
```

Playwright 仅为测试依赖，放在系统临时目录，不得提交 `node_modules`、`package-lock.json` 或修改业务软件。脚本将以 Edge Chromium 的 `file://` 离线场景覆盖首页、标准库单页详情、双入口、记录两个页签、表格导入、参数库、长表单、动态排放源和多视口。

运行完成后查看 `docs/ui/phase2/evidence/browser-checks.json`：
- `status=PASS`、`failed=0`、`interrupted` 不为真，且 JavaScript 错误与网络请求均为空，才可将自动化复验记为通过；
- `status=FAIL` 时，`failures` 列出同次运行中累计的断言失败；修复后重新运行；
- `status=ERROR` 表示浏览器操作、运行环境或依赖异常中断，不能算作通过；修复后重新运行。

**人工视觉复验不可省略。** 在 Windows Edge 中打开 `docs/ui/phase2/prototype/index.html`，对照同次生成的 `evidence/home-desktop.png`、`standards-1440.png`、`standards-390.png`、`standard-detail-1440.png`、`standard-detail-390.png`、`form-1024.png`、`form-390.png`、`ghg-long-form.png` 检查：中文按钮及提示、淡蓝导航、标准详情单页三分区、表格导入、表格溢出及横向滚动、长表单、窄屏遮挡及卡片冗余。对于桌面软件，移动端窄屏仅用于压力测试，不要求产品具备手机端功能。

本轮已将新版 JSON 与截图提交到原 PR #12 分支。独立人工核对了首页、标准列表、标准详情两种宽度、1024 宽表单、390 宽长表单及 18 排放源页面：导航与 Logo 清晰，中文入口、单页三分区、禁用状态正确；未看到整体横向溢出、控件重叠或操作按钮遮挡。390 宽标准表格需在内部横向滚动，为设计压力测试可接受。**人工视觉复验：PASS（Phase 2 原型范围）。** 颜色、具体像素和 B 类交互仍可随业务仓实施优化，不表示正式生产 UI 或 Owner 永久定版。

新版检查器已将面向维护者的断言描述改为中文，并累计普通断言的失败项目；遇到 Playwright 操作异常时仍会中断并写出 `ERROR` 报告，需修复后重跑全套测试。

## 复现与限制

直接打开 `prototype/index.html` 即可体验，无需安装依赖。自动检查仅在维护者已安装 Node.js、Playwright 和 Edge 的环境中执行：设置 `PLAYWRIGHT_MODULE` 为已有 Playwright 模块路径，然后运行 `node docs/ui/phase2/verify-prototype.cjs`；可通过 `QZ_BROWSER_CHANNEL` 选择已安装的 Chromium 通道。测试依赖不参与离线原型运行，也不加入三个业务仓。

未验证真实 Excel 解析、正式计算、标准正确性、数据库、生产 PySide6、高 DPI 原生控件或所有浏览器。数值是固定示意值，输入检查仅验证演示完整性/格式。刷新清除所有原型状态。当前测试通过不代表 OPEN 设计已批准。

## 分类与待确认

- **A 当前 Owner 决定**：遵循 UI 指南 A-01～A-18，包括页面/导航关系、命名、标准五列与三个连续分区、记录两个页签、产品能力边界及专业简洁淡蓝导航。
- **B 推荐设计**：当前颜色/字体/尺寸、分区式表单、分页、独立详情页、统一线性图标、设置承载与响应方案；可演进。
- **C / OPEN**：首页设置弹窗、窄屏顶部水平导航、Excel 四区标题、筛选词汇、源类型切换数据保留策略、GHGTOOL 新项目核算路径映射，以及尚未开放能力。详见 [交互说明](INTERACTION_SPEC.md)。ECQuota 禁用入口不禁止未来独立开放。

不涉及公共 Contract 或业务真值，不变更 Frozen Architecture、Numeric、Calculator、标准映射、Canonical、Schema、platform-lock。不新增跨仓运行时依赖或公共 PySide6 package。三个业务仓继续独立开发；本轮不实施 Phase 3。

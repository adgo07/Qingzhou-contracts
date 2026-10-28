# 正式品牌 PNG

`qingzhou-logo.png` 是 Owner 指定原图的逐字节副本，用于首页与侧栏，并可原样进入各产品资源及离线安装包。

- 来源：`G:/青舟公司资料/logo/青舟节能  --转曲.png`
- 图像：3060 × 759，RGBA，PNG，保留透明。
- SHA256：`db557a6374a928b46bd3ab499c0a295ef147e87d79a273d1fde1f2d61f8bc24d`
- 授权依据：2026-10-28 本轮 Owner 家族实施任务；未重绘、改色、拉伸或 AI 超分。

等比目标宽度、容器与 DPR 方法见[指南 §4](../UI_DESIGN_GUIDELINES_V0.2.md#4-家族实施数值与方法)。从本原图重采样，不反复放大缩略图；无需 CDR 转 SVG。品牌授权不扩展为第三方商标授权。历史 `phase2/prototype/assets` 保留不变，不作为当前资源维护位置。

## 线性图标基准

`icons.svg` 原样复制自中央 `origin/main@a389ac1de63c4f331f3b04e5e7b7a17ef02ed111:docs/ui/phase2/prototype/assets/icons.svg`，该文件最后变更提交为 `854b544563260f9e79c73e714c85f6589e0f19b3`。

仓库发布字节 SHA256：`f78b7a6249ffe88eedcdf52c71c24299e306e73b067c191b5fb02ea901764712`。15 个 symbol 均为 24×24 viewBox、1.7 stroke 的线性图形。本轮使用正式副本，不依赖历史原型运行，历史文件不变。

校验以 `git show <commit>:docs/ui/assets/icons.svg` 的原始 bytes 为准（例如 Python `subprocess.check_output`，不经过文本解码或 PowerShell 文本管道）。Git blob 与上述历史源 blob 逐字节一致，使用 LF 换行；本目录 `.gitattributes` 仅对正式 `icons.svg` 设置 `text eol=lf`，保证后续检出字节一致。旧 Windows 工作区的 CRLF 副本会得到不同 hash，不作为发布字节校验依据。PNG 同样按 Git blob 原始 bytes 校验，未做文本换行归一。历史资产及其属性不变。

| 语义 | symbol |
|---|---|
| home / 首页 | `qz-icon-home` |
| standards / 标准库 | `qz-icon-book` |
| new / 新建业务 | `qz-icon-plus` |
| records / 业务记录 | `qz-icon-records` |
| import / 表格导入 | `qz-icon-excel` |
| library / 专属库 | `qz-icon-library` |
| settings / 设置 | `qz-icon-settings` |
| forward / 前往 | `qz-icon-arrow` |
| back / 返回 | `qz-icon-back` |
| check / 检查通过 | `qz-icon-check` |
| close / 关闭 | `qz-icon-close` |
| search / 搜索 | `qz-icon-search` |
| info / 信息 | `qz-icon-info` |
| download / 下载 | `qz-icon-download` |
| source / 来源 | `qz-icon-source` |

仅在已批准动作存在时使用对应图标，不因有 source 图标新增审计或来源区域。Qt 可提取 symbol 为独立 SVG，换色并按 DPR 绘制，保留 path 几何及线宽比例，不重设计。中文可访问名称与状态说明按动作提供。未覆盖语义仍属 OPEN-04，不拿含义无关图标凑齐。

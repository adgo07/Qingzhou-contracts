# Qingzhou Module / Capability Contract v1 — DRAFT

状态：**DRAFT / NOT YET RELEASED**

## 1. 目标

统一三个业务模块的稳定身份、功能声明和跨平台支持范围，使独立版、Suite、Desktop、Mobile、Mini 都能准确说明“支持什么”，避免把整个模块粗略标记为支持后掩盖 Profile/标准级差异。

## 2. 永久 Module ID

正式冻结：

```text
qz.energy_quota
qz.equipment_efficiency
qz.carbon_accounting
```

Module ID 不随产品名称、UI、平台、Suite/独立版或安装路径变化。

## 3. Capability 最小粒度

Capability 至少允许表达：

```text
module_id
profile_id        # optional
standard_id       # optional
feature_id
platform
status
```

对于没有 profile 概念的模块可省略 `profile_id`。

## 4. Capability Status 候选

DRAFT 建议：

```text
SUPPORTED
EXPERIMENTAL
NOT_IN_RELEASE_SCOPE
UNSUPPORTED
BLOCKED
```

含义：

- `SUPPORTED`：对应平台已通过要求的 Conformance/验收，可正式声明支持；
- `EXPERIMENTAL`：存在试验实现，不得作为正式发布能力承诺；
- `NOT_IN_RELEASE_SCOPE`：代码/规则可能存在，但当前发布范围明确不包含；
- `UNSUPPORTED`：当前无实现；
- `BLOCKED`：计划支持但被已记录问题阻塞。

最终枚举在 v1 Schema 前确认。

## 5. Feature ID

公共 feature 候选：

```text
standard_catalog
single_evaluation
batch_evaluation
single_calculation
project_workspace
records
excel_import
excel_export
report_view
report_generate
attachment_capture
standard_package_update
```

模块可定义自己的 feature namespace，例如：

```text
qz.equipment_efficiency.pump_water
qz.carbon_accounting.multi_unit_workspace
```

避免创建一个巨大且含义模糊的全局功能列表。

## 6. 示例

```json
{
  "module_id": "qz.equipment_efficiency",
  "module_version": "0.3.0",
  "platform": "windows",
  "capabilities": [
    {
      "profile_id": "pump_water",
      "standard_id": "GB19762-2025",
      "feature_id": "single_evaluation",
      "status": "SUPPORTED"
    },
    {
      "profile_id": "pump_chemical",
      "standard_id": "GB19762-2025",
      "feature_id": "single_evaluation",
      "status": "NOT_IN_RELEASE_SCOPE"
    }
  ]
}
```

## 7. Conformance Gate

对具有正式计算/判定含义的 Capability：

> 未通过该标准/Profile 对应的权威 Conformance Vectors，不得标记为 `SUPPORTED`。

UI 能打开、代码能运行、某几个 unit tests 通过，都不能替代 Conformance Gate。

## 8. Suite

Suite 读取 Module/Capability Manifest 来决定：

- 有哪些模块；
- 当前版本；
- 可展示哪些入口；
- 哪些标准/Profile 可使用；
- 哪些功能需要授权。

Suite 不在自身维护另一份业务能力表。

## 9. 独立版

独立产品也可以携带同样的 Module/Capability Manifest。

独立运行不依赖 Suite 或其他模块已安装。

## 10. Mobile / Mini

移动端减少的是 Capability 范围，不是已经实现标准的算法精度。

例如允许：

```text
Desktop: 150 standards SUPPORTED
Mobile: 20 high-frequency standards SUPPORTED
Mini: 5 standards SUPPORTED
```

同一标准/Profile 如果都标记 `SUPPORTED`，必须满足相同公共 Business Truth 和 Conformance。

## 11. Versioning

建议区分：

```text
module_version
capability_manifest_schema_version
standard_package_version
app_version
```

不得将这些版本合成一个含义不清的“软件版本”。

## 12. v1 冻结前待验证

- Capability Status 最终枚举；
- feature_id 命名空间规范；
- `platform` 枚举：windows/linux/macos/android/harmonyos/ios/mini/web；
- `SUPPORTED` 是否必须包含 conformance_suite_id/hash；
- 授权状态是否属于 Capability Manifest（当前建议：不属于，Capability 表达技术/发布能力，License 表达用户权限）。

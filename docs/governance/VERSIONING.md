# Contract 版本与业务仓库锁定规范

## 1. 原则

三个业务仓库不得无版本地读取本仓库 `main` 作为实时规则。

必须锁定：

- contracts release/tag；
- 对应 commit SHA；
- 各公共 Contract version。

## 2. 业务仓库建议文件

`PLATFORM_BASELINE.md`：给人阅读。  
`platform-lock.json`：给 Agent/CI/工具读取。

示例：

```json
{
  "contracts_release": "contracts-v0.1.0",
  "commit": "<full-sha>",
  "architecture_version": "2.1",
  "numeric_contract_version": "draft-v1",
  "unit_contract_version": "draft-v1",
  "module_contract_version": "draft-v1",
  "package_contract_version": "draft-v1",
  "workspace_contract_version": "draft-v1",
  "result_contract_version": "draft-v1"
}
```

正式 v1 release 后不得继续使用 `draft-v1`。

## 3. 版本建议

采用语义化版本：

```text
MAJOR.MINOR.PATCH
```

- MAJOR：公共语义不兼容改变；
- MINOR：向后兼容新增能力；
- PATCH：不改变语义的修正、说明、Schema bugfix。

## 4. Release tag

候选格式：

```text
contracts-v0.1.0
contracts-v1.0.0
contracts-v1.1.0
```

正式 tag 命名由 `DECISIONS_NEEDED.md` D-003 最终确认。

## 5. 升级流程

业务仓库升级 Contract：

```text
读取新 release notes
→ 检查 breaking changes
→ 修改 platform-lock
→ 运行公共 Conformance
→ 运行本产品回归
→ 更新 PLATFORM_BASELINE
→ 提交 PR
```

不要求三个项目同一天升级。

例如允许：

```text
ECQuota   contracts-v1.1.0
EquipEffi contracts-v1.0.0
GHGTOOL   contracts-v1.0.0
```

兼容矩阵应记录这种状态。

# PLATFORM_BASELINE

本项目当前锁定的 Qingzhou Contracts 基线。

## Contract Release

```text
contracts_release: <tag>
commit: <full commit sha>
```

## Versions

```text
architecture_version: 2.1
numeric_contract_version: <version>
unit_contract_version: <version>
module_contract_version: <version>
package_contract_version: <version>
workspace_contract_version: <version>
result_contract_version: <version>
```

## Upgrade Rule

- 本项目不得自动跟随 `Qingzhou-contracts/main`；
- 升级 Contract 必须显式修改本文件和 `platform-lock.json`；
- 升级后运行公共 Conformance + 本项目完整回归；
- 如发现公共 Contract 不足，提交 RFC，而不是在本项目永久发明不同语义。

## Local Notes

记录本产品对该 Contract release 的兼容说明和已批准例外。

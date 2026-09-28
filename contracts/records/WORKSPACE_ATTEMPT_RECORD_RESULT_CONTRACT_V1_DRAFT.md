# Qingzhou Workspace / Attempt / Record / Result Contract v1 — DRAFT

状态：**DRAFT / NOT YET RELEASED**

## 1. 目标

统一三个模块对“可编辑工作状态、一次执行、正式保存结果、系统异常、跨平台结果外围”的基本概念，同时保留各业务模块对具体状态和结果结构的自治。

## 2. Workspace

Workspace 表示可编辑、可恢复、尚未被视为不可变正式结果的业务工作状态。

应包含业务语义字段，不应依赖具体 UI 控件状态。

建议公共外围：

```text
workspace_id
module_id
workspace_schema_version
created_at
updated_at
business_payload
presentation_state?   # optional, platform-local only
```

### 2.1 Business Workspace

平台无关部分应保存：

- 稳定业务字段 ID；
- 业务值；
- 单位；
- standard/profile；
- 业务状态；
- 模块语义。

### 2.2 Presentation State

允许本地 Runtime 另外保存：

- Qt 展开/折叠；
- 当前 tab；
- Tk 控件 UI 状态；
- 窗口尺寸等。

这些字段不得成为跨平台业务 Contract，也不得要求移动端识别 Qt `objectName`/`currentIndex`。

## 3. Attempt

Attempt 表示一次实际执行计算/评价动作。

建议公共外围：

```text
attempt_id
workspace_id?
module_id
started_at
completed_at?
business_status?
execution_status
problems[]
result_candidate?
```

Attempt 可以没有正式 Record。

## 4. Business Outcome 与 Execution Error 分离

合法业务状态可能包括：

```text
SUCCESS
OUT_OF_STANDARD_SCOPE
INSUFFICIENT_DATA
INVALID_INPUT
NOT_APPLICABLE
UNABLE_TO_DETERMINE
```

以上只是跨模块候选概念，不要求三个模块使用同一枚举。

系统异常单独表达，例如：

```text
EXECUTION_ERROR
STORAGE_ERROR
UNEXPECTED_EXCEPTION
```

不得把“标准范围外/输入不足”与“程序崩溃”混为一个失败状态。

## 5. Record

Record 是由用户或业务流程正式保存的不可变业务结果。

公共原则：

- Record 不等于“一定 SUCCESS”；
- Record 也不等于“所有 Attempt”；
- 每个模块必须在自己的业务规范中定义哪些 Business Outcome 可以形成 Record；
- Record 一旦正式形成，不应被原地修改为另一结果；
- 重新计算形成新的 Attempt/Record，并保留 lineage。

### 5.1 GHGTOOL 兼容

碳核算当前可以继续规定：致命校验失败不形成正式核算 Record。

### 5.2 EquipEffi 兼容

设备能效可以按业务规范允许某些 `OUT_OF_STANDARD_SCOPE` / `INSUFFICIENT_DATA` 等正式评价状态形成可保存 Record。

### 5.3 ECQuota 兼容

能耗限额模块自行定义“无法判定/不适用/未达标”等 Record 语义。

具体映射保持 OPEN，见 `DECISIONS_NEEDED.md` D-005。

## 6. Result Envelope

建议公共外围：

```text
contract_version
module_id
standard_id
standard_version
profile_id?
rule_version
calculator_id?
calculator_version?
numeric_contract_version
unit_contract_version?
result_contract_version
package_id?
package_version?
package_hash?
input_snapshot
parameter_snapshot?
result
trace[]
warnings[]
problems[]
provenance
calculated_at
```

`result` 内部由业务模块自定义。

## 7. Snapshot

正式 Record 必须保存足够快照保证历史结果不随外部数据升级漂移。

最小目标：能够回答：

- 当时输入是什么；
- 使用哪个标准/版本；
- 使用哪个规则/Calculator；
- 使用哪些参数/因子；
- 参数来源是什么；
- 使用哪个标准包/hash；
- 得到了什么结果；
- 关键判断路径是什么。

不要求把整个当前 catalog 数据库复制进每个 Record。

## 8. Lineage

建议支持：

```text
record_id
parent_record_id?
source_workspace_id?
source_record_id?
recalculation_reason?
```

用于表达“基于历史记录重新评价/核算”，而不是修改原 Record。

## 9. Trace

公共层只规定 Trace 必须可结构化版本化，不规定三个业务模块拥有相同 trace 内容。

可能包含：

- normalized input；
- lookup；
- interpolation；
- selected factor；
- formula step；
- comparison；
- grade selection；
- evidence decision。

复杂 Calculator 可以定义专用 trace schema。

## 10. Storage Independence

本 Contract 不规定 Runtime 必须使用哪种数据库。

允许：

- Desktop SQLite；
- Mobile local database；
- 文件交换；
- 未来 Server storage。

数据库表结构不等于公共 Contract。

## 11. `.qzproj`

`.qzproj` 将来用于平台无关交换/归档。

不得直接序列化 Python 对象、Qt/Tk 控件对象或绝对 Windows 路径。

具体物理格式未冻结，见 D-007。

## 12. 旧数据迁移

原则：

- 先冻结新 Contract；
- 新代码能够生成新 Envelope；
- 保持旧 Record 可读；
- 之后按实际需要 additive migration；
- 禁止为了新规范自动重算历史 Record。

## 13. 体积治理

允许：

```text
content-addressed snapshot
deduplication
compression
archive
cold storage
```

但不得删除形成正式结果所需的唯一证据。

## 14. v1 冻结前待验证

- 各模块 recordable outcome；
- problems/warnings 公共最小结构；
- trace versioning；
- package hash 是否 Record 必填；
- input_snapshot 与 normalized_input 的边界；
- Lineage 最小字段；
- `.qzproj` 是否独立 Contract 还是 Workspace Contract 的 transport profile。

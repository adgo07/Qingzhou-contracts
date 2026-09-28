# Platform-independent Conformance

本目录保存跨实现、跨平台的权威一致性案例。

它不替代各业务仓库自己的 unit/UI/database/regression tests。

## 目录

```text
conformance/
├─ common/
│  └─ numeric/
├─ energy_quota/
├─ equipment_efficiency/
└─ carbon_accounting/
```

## 目的

回答：

> 同一正式 Capability 在 Python/Kotlin/Swift/ArkTS/TypeScript 或未来 Native Core 中，是否得到相同业务结果？

## 基本原则

1. expected 不能由被测实现运行后自动抄回成为权威值；
2. 案例必须有来源/业务依据或明确的人工构造目的；
3. 边界案例至少覆盖等于、刚低于、刚高于；
4. 复杂算法应包含足够的 intermediate/trace 预期帮助定位差异；
5. 若标准显式要求 rounding，应在 expected 中体现，并记录来源；
6. 仅显示差异不得误判为正式业务差异；
7. 未通过 Conformance 不得把对应正式 Capability 标记为 `SUPPORTED`。

## Candidate Vector

v1 Schema 尚未冻结。候选结构：

```json
{
  "case_id": "...",
  "module_id": "qz.energy_quota",
  "profile_id": null,
  "standard_id": "...",
  "standard_version": "...",
  "rule_version": "...",
  "calculator_version": null,
  "numeric_contract_version": "draft-v1",
  "input": {},
  "normalized_input": {},
  "expected": {
    "business_status": "...",
    "result": {},
    "intermediate_results": {},
    "comparisons": []
  },
  "warnings": [],
  "errors": [],
  "provenance": {}
}
```

最终字段见 `DECISIONS_NEEDED.md` D-004。

## 三个首批试点

- `energy_quota/`：GB 29446；
- `equipment_efficiency/`：代表性离心泵；
- `carbon_accounting/`：GB/T 32151.34。

当前不要为了填目录而复制业务仓库全部测试；只迁入真正跨实现的权威案例。

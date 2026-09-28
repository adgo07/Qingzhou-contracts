# ECQuota-Insight — Platform Compatibility Summary

更新时间：2026-09-28

> 本文件只记录公共架构兼容摘要。详细状态以 ECQuota-Insight 自己的 HANDOFF / TASK_STATE / 实际代码 / 测试为准。

## 当前判断

QZC-A01：**Governance Adoption PASS**。  
Numeric Conformance：**⛔ BLOCKED**。

当前默认分支：`main@74b3deccfe74559cd08cc16a0705f1589ea6ecdc`。  
锁定中央基线：`Qingzhou-contracts@0cd74d783fa23add6dc881b408a8c8ba8503f8e8`。

## 已有良好基础

- Domain / Application / Infrastructure / UI 已有明确分层；
- Application 已有 ports/facade，便于未来替换 Desktop adapter；
- 标准/规则数据已有结构化事实源基础；
- Decimal 模型已避免 binary float 直接成为规则真值；
- 现有 `.uebench` 已具备 manifest、SHA-256、Ed25519 等包治理能力，可作为未来 qzpack prototype 输入。

## 已确认公共冲突

现有统一判定规范要求所有边界先执行 `ROUND(..., 6)`、`ROUND_HALF_UP` 再比较；这与 Architecture V2.1 FROZEN 的默认 full-value comparison、禁止无标准依据 implicit rounding 冲突。

QZC-A01 正确地没有修改 Engine。ROUND6 必须在独立 Numeric Contract 试点中处理。

## 当前公共重点

1. 以 GB 29446 处理 ROUND6 → full-value comparison 的正式迁移；
2. 建立显示值、计算值、比较值的明确分离；
3. 建立第一套平台无关 Conformance candidate；
4. 明确各类 Business Outcome 哪些允许形成正式 Record；
5. 评估 `.uebench` 与未来 qzpack Contract 的映射，不直接等同二者。

## 当前不要做

- 不单独在产品仓私自发明新的 Numeric 默认规则；
- 不因公共架构立即大改全部已发布标准；
- 不为未来移动端重写 Python Domain；
- 不把 GB 29446 特例硬编码成公共 Engine 行为；
- 不把中央 DRAFT 当作已发布 Contract。

## 首批试点

`GB 29446`：

```text
现有真实公式/标准依据
→ Numeric Contract candidate
→ ROUND6 correction
→ Conformance vectors
→ Result/Record candidate
```

## RFC / Decision 关联

- `D-005`：Recordable business outcomes by module；
- `D-006`：qzpack granularity；
- `.uebench` → qzpack 映射作为 package prototype 输入，暂不另行冻结公共结论。

## 状态更新规则

只有实际分支/PR 合并并通过对应测试后，才将兼容矩阵条目标记为 ✅。

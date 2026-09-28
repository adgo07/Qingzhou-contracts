# ECQuota-Insight — Platform Compatibility Summary

更新时间：2026-09-28

> 本文件只记录公共架构兼容摘要。详细状态以 ECQuota-Insight 自己的 HANDOFF/TASK_STATE/实际代码/测试为准。

## 当前判断

总体：**🟡 部分符合，方向正确。**

## 已有良好基础

- Domain / Application / Infrastructure / UI 已有明确分层；
- Application 已有 ports/facade，便于未来替换 Desktop adapter；
- 标准/规则数据已有结构化事实源基础；
- Decimal 模型已禁止 binary float 进入正式规则模型；
- 适合作为简单 Declarative Rule / qzpack / Conformance 的首批试点。

## 当前公共重点

1. 完成 Numeric Semantics 修正：默认 full-value comparison，废止无标准依据的全局 ROUND6；
2. 将 Numeric Contract 与显示精度彻底分离；
3. 用 GB 29446 建立第一套跨平台 Conformance candidate；
4. 后续增加 module/capability/result contract 外围；
5. UI 仍需逐步从大型单文件向可复用 presentation structure 收敛，但不是当前 Contract blocker。

## 当前不要做

- 不因公共架构立即大改全部已发布标准；
- 不为未来移动端重写 Python Domain；
- 不把 GB 29446 特例硬编码成公共 Engine 行为；
- 不在 Numeric Contract 未冻结前发布“跨平台一致”承诺。

## 首批试点

`GB 29446`：

```text
Canonical Rule
→ Numeric Contract
→ Conformance
→ Result Envelope
→ qzpack prototype
```

## 状态更新规则

只有实际分支/PR 合并并通过对应测试后，才将兼容矩阵条目标记为 ✅。

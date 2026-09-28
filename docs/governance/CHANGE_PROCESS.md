# 公共规范与 Contract 变更流程

## 1. 目的

避免三个业务项目分别发明同名但不同义的公共规则，同时避免把普通产品开发变成过度官僚流程。

## 2. 什么变化必须进入本仓库

以下属于公共变化：

- Numeric / Unit 语义；
- Module / Capability 标识；
- Canonical/qzpack 公共格式；
- Workspace / Attempt / Record / Result 公共外围；
- Conformance Schema；
- 公共版本兼容和迁移原则；
- 三个产品都可能依赖的长期公共行为。

以下通常不属于公共变化：

- 单个标准公式修正；
- 某业务页面 UI Bug；
- 某个产品特有数据库字段；
- 单个标准专有输入；
- 产品内部重构且不改变公共 Contract。

## 3. 简单判断法

问：

> 如果另外两套软件不存在，这个问题仍然需要解决吗？

- 是：通常留在业务仓库；
- 否，问题主要来自三产品/多平台需要一致：通常进入本仓库。

## 4. 正式流程

```text
发现公共问题
→ 创建 Issue / RFC
→ 写明背景、受影响模块、兼容性、候选方案
→ 形成修改稿
→ 评审
→ 合并 Contract/Schema/Conformance
→ 更新 CHANGELOG
→ 发布 tag/release
→ 各业务仓库按需显式升级 platform-lock
→ 运行 Conformance/回归
```

## 5. RFC 与 ADR

RFC 回答：

> 我们准备改变什么？为什么？有哪些方案？

ADR 回答：

> 最后决定了什么？为什么选择它？有哪些后果？

小型无争议修正文档错字不要求 RFC。

改变公共语义、兼容性或版本行为时，应有 RFC/ADR。

## 6. 业务实现中发现 Contract 不足

允许业务项目先做可逆试验，但正式发布前：

- 不得把临时行为宣传成公共规范；
- 应提出 RFC；
- Conformance expected 不应由实现代码反向自动生成并直接成为权威预期；
- 公共语义冻结后再完成正式兼容。

## 7. main 与版本

- `main`：已审查、可供后续 release 的权威内容；
- RFC/DRAFT 可以在分支中工作；
- 业务仓库依赖正式 tag + commit SHA，不依赖实时 `main`。

## 8. Breaking Change

出现以下情况默认视为潜在 breaking change：

- 数值比较语义改变；
- rounding 语义改变；
- Result/Record 字段含义改变；
- Canonical 字段原义改变；
- Capability 状态语义改变；
- 删除旧 schema 字段；
- qzpack 验证/兼容规则改变。

Breaking change 必须说明迁移/兼容策略，不能仅更新文档。

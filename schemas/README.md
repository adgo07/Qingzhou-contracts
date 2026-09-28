# Schemas

本目录只保存**跨仓库、跨平台正式数据契约**的机器可读 Schema。

当前 Contract 仍处于 DRAFT，因此暂不伪造“v1 final” JSON Schema。

计划优先形成：

```text
module-capability.schema.json
conformance-vector.schema.json
qzpack-manifest.schema.json
result-envelope.schema.json
workspace-envelope.schema.json
platform-lock.schema.json
```

## 原则

- Schema 必须对应已明确的 Contract 语义；
- 不允许为了“有 Schema”而先写字段、再倒逼业务接受；
- breaking schema change 必须版本化；
- 业务模块内部 payload 可拥有自己的 Schema，不要求三个领域结构相同；
- Schema validation 通过不等于业务 Conformance 通过。

第一个正式 Schema 建议从三项目试点共同需要的 `platform-lock` 与 Conformance candidate 开始。

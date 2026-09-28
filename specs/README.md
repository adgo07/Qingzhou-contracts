# Platform-independent Business Specs

本目录用于保存**稳定、跨平台、跨实现的业务规范**。

建议结构：

```text
specs/
├─ energy_quota/
├─ equipment_efficiency/
└─ carbon_accounting/
```

## 应放入

- 稳定业务字段含义；
- 标准映射原则；
- 机器规则说明；
- Calculator 输入/输出语义；
- 平台无关业务状态；
- 已冻结、需要多个实现共同遵守的专业规则。

## 不应放入

- 某个页面布局草稿；
- 临时 UI 修改任务；
- 某业务仓库 Phase 的详细执行日志；
- Excel 临时改单；
- 未经审核的标准解释；
- 为了集中而复制全部业务仓库文档。

业务项目仍维护自己的 HANDOFF、TASK_STATE、IMPLEMENTATION_REPORT 和具体实现文档。

本目录只保存真正需要被其他平台/实现读取的上位业务规范。

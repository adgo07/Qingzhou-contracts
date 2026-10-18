# 历史设计与公共证据索引

本索引区分历史过程、被替代规范和持续有效的证据。HISTORICAL 表示读取用途，不撤销批准决定、不使冻结 / 采用证据失效。当前入口见[阅读导航](../GUIDE_INDEX.md)与[公共资产状态](../../PLATFORM_STATE.md)。

## 持续有效的冻结与采用证据（原址保留）

- [Numeric Gate 5 freeze report](../../pilots/numeric/QZC_N01_GATE5_FREEZE_REPORT.md)：当前 Numeric v1 冻结决定的有效证据。
- [跨试点复核](../../pilots/numeric/QZC_N01_CROSS_PILOT_REVIEW.md)与[Gate 4 执行记录](../../pilots/numeric/QZC_N01_GATE4_EXECUTION_REPORT.md)：冻结证据链，含 first FAIL / R1 的反例和复验，不是新一轮试点指令。
- [N01 总计划](../../pilots/numeric/QZC_N01_MASTER_PLAN.md)、[ECQuota 分发](../../pilots/numeric/N01_A_ECQUOTA_DISTRIBUTION.md)、[EquipEffi 分发](../../pilots/numeric/N01_B_EQUIPEFFI_DISTRIBUTION.md)、[GHGTOOL 分发](../../pilots/numeric/N01_C_GHGTOOL_DISTRIBUTION.md)、[回传模板](../../pilots/numeric/N01_PILOT_RETURN_TEMPLATE.md)：已结束过程的追溯材料，不自动启动后续任务。
- [QZC-A02 adoption summary](../governance/QZC_A02_ADOPTION_SUMMARY.md)：历史采用总结，其日期 / SHA 结论保留；不表示业务仓自动升级。
- [兼容性目录](../../compatibility/README.md)：带日期的矩阵与三产品摘要，保留当时兼容判断，不是实时产品状态。

权威文件到这些证据的原链接保留；不为整理修改 Frozen、ACCEPTED ADR 或已发布 Schema。

## 已被替代的规范输入（原址原文保留）

- [Numeric DRAFT](../../contracts/numeric/NUMERIC_CONTRACT_V1_DRAFT.md)与[Numeric CANDIDATE](../../contracts/numeric/NUMERIC_CONTRACT_V1_CANDIDATE.md)
- [Profiles CANDIDATE](../../contracts/numeric/NUMERIC_PROFILES_V1_CANDIDATE.md)
- [Conformance CANDIDATE](../../conformance/common/numeric/CONFORMANCE_VECTOR_V1_CANDIDATE.md)及[候选 Schema](../../conformance/common/numeric/conformance_vector_v1_candidate.schema.json)
- [候选 ADR](../../decisions/ADR-NUMERIC-V1-CANDIDATE.md)
- [历史 UI 指南 v0.1](../ui/UI_DESIGN_GUIDELINES_V0.1.md)，当前 UI 读[规格](../ui/UI_PRODUCT_FAMILY_SPEC_V0.1.md)和[指南 v0.2](../ui/UI_DESIGN_GUIDELINES_V0.2.md)

这些历史输入不覆盖对应 Frozen / 当前适用指南。Unit、Module、Workspace、qzpack 等未冻结草案并未因此归为失效历史，仍由 PLATFORM_STATE 标注当前状态。

## Phase 2 固定历史快照与待归档

[Phase 2 入口](../ui/phase2/README.md)所收录原型、说明、脚本、JSON 与截图为历史设计，退出当前实施 / 生产验收路由。其旧“不提供报告导出”等断言不能否定后来批准的 A-12，也不能验收当前业务产品。

完整原始快照：[Qingzhou-contracts@c5fc6d438c9200060649e47c016b9b48218de72c / docs/ui/phase2](https://github.com/adgo07/Qingzhou-contracts/tree/c5fc6d438c9200060649e47c016b9b48218de72c/docs/ui/phase2)，27 文件、2,248,946 字节，保留原路径与字节。当前树整包保留；README 仅添加历史说明，原文在下方保留。

**持久归档 / 迁出尚未执行：** 未发现已认可持久位置；核查时中央 GitHub Release 列表为空。不创建新发布流程，不以本地临时 ZIP 或 CI artifact 冒充归档完成。后续须确认 Owner 认可位置、整包原相对路径 / 原始字节、源 commit 与逐文件 SHA256，并从目标重新下载、核对完整集合、哈希及解压恢复，成功后才迁出。原始 README 也须进归档，届时本地入口可改为短导航。没有持久归档不影响当前规则去重，但本轮不声称已迁出或达到体积目标。

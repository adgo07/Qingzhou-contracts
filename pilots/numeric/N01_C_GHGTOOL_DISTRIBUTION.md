# N01-C — GHGTOOL Numeric Pilot Distribution

状态：**READY AFTER GATE 0 / NOT YET DISPATCHED**  
Pilot ID：`N01-C`  
Repository：`adgo07/GHGTOOL`  
分发准备日期：2026-09-28

## 1. Distribution baseline

- 默认分支：`main`
- 分发准备时 head SHA：`84e07bb74dbee8db0fd716e3ed8261cfaf9e3415`
- Contract baseline tag：`contracts-v0.1.0`（当前尚未创建，Gate 0 未通过）
- Contract baseline SHA：`0cd74d783fa23add6dc881b408a8c8ba8503f8e8`
- 当前业务仓 `platform-lock.json`：锁定上述 SHA；Contract release/tag 当前为 `null`；不得在本 Pilot 分发阶段修改
- 代表标准：**GB/T 32151.34—2024**
- Module ID：`qz.carbon_accounting`

正式开始业务仓 Pilot 前，必须再次核实 `contracts-v0.1.0` 已存在且精确指向 `0cd74d...`。

## 2. Pilot purpose

N01-C 用真实碳核算实现验证 Numeric、Unit、Quantity Type 与 Stoichiometric Coefficient 的边界。

核心问题：

> `tC`、`tCO₂`、`tCO₂e`、`44/12`、`44/16`、GWP、DecimalPolicy、UnitService 与 `is_close()` 目前分别承担什么职责？哪些是单位换算，哪些是业务量语义，哪些是标准公式/化学计量系数，哪些 tolerance 只属于测试或算法稳定性？

本 Pilot 允许 GHGTOOL 提出结构 candidate，但不得由业务仓自行冻结公共 Unit Contract。

## 3. Design questions that must be answered

业务项目后续 Design 阶段至少回答：

1. 当前 `DecimalPolicy` 的真实实现位置、precision、rounding 和使用范围；
2. 是否存在不同 Calculator 使用不同 Decimal context/policy；
3. 当前 `UnitService` 的真实职责与调用边界；
4. `tC ↔ tCO₂` 当前真实实现在哪里；
5. `44/12` 是否由 `unit_convert()` 或 UnitService 执行；如果是，当前语义是否把化学计量系数误当单位倍率；
6. `44/16`、GWP 等系数当前如何表达、来源如何追溯；
7. `is_close()` 出现在哪些文件、函数和测试；
8. 每个 `is_close()` 的真实业务语义是什么；
9. 正式业务等级/边界/适用性比较是否使用 tolerance；
10. test tolerance 与 business tolerance 是否混用；
11. 查表/插值/数值稳定性 tolerance 是否与正式比较 tolerance 混用；
12. `tC` / `tCO₂` / `tCO₂e` 应如何表达 quantity semantics；
13. `value + quantity_type + unit_id` 是否能作为 candidate 解决当前歧义；
14. 需要哪些 Carbon Conformance Vectors 才能验证 Numeric + Unit + coefficient boundary。

## 4. Quantity / unit / coefficient classification

业务项目必须基于真实代码和标准公式对至少以下对象分类：

| 对象 | 必须判断 |
|---|---|
| `t` / `kg` 等质量单位 | 是否为纯 Unit Conversion |
| `tC` | unit、quantity type，或二者组合 |
| `tCO₂` | unit、quantity type，或二者组合 |
| `tCO₂e` | unit、quantity type，或二者组合 |
| `44/12` | 化学计量/标准公式系数，不得无证据当普通 unit conversion |
| `44/16` | 化学计量/标准公式系数，不得无证据当普通 unit conversion |
| GWP | 业务/科学换算系数及其版本来源，不得与 SI 单位倍率混同 |

本 Pilot 不要求立刻改实现；先准确描述现状、风险和 candidate structure。

## 5. Tolerance taxonomy required

所有 tolerance / `is_close()` 至少按以下类别审计：

1. **business-boundary tolerance**：会改变正式业务判定；
2. **standard-explicit tolerance**：标准明文规定；
3. **lookup/interpolation tolerance**：定位表格/区间；
4. **algorithmic/numerical tolerance**：数值稳定、迭代或非精确算法；
5. **test assertion tolerance**：测试框架比较；
6. **display tolerance/formatting**：若存在，应明确它不得改变正式结果。

不得把同一个全局 epsilon 未经说明地横跨多个类别。

## 6. Actual evidence required from business project

最终回报必须提供：

- Design baseline SHA；
- Execution head SHA；
- Acceptance head SHA；
- 独立验收结果；
- `DecimalPolicy` 真实代码路径与 precision/rounding；
- `UnitService` 真实职责与调用清单；
- `tC ↔ tCO₂` 的真实执行链；
- `44/12`、`44/16`、GWP 的代码位置与 provenance；
- `is_close()` 全部业务相关调用位置及语义分类；
- 正式业务比较是否使用 tolerance 的明确证据；
- test tolerance 与 business tolerance 是否隔离；
- 一条从活动数据到排放结果的完整 numeric/unit/coefficient trace；
- 真实测试命令与输出；
- Carbon Conformance Vectors；
- `value + quantity_type + unit_id` candidate（如项目认为可行）；
- 必须保留为 GHGTOOL-specific 的规则；
- 对 Numeric Contract、Unit Contract、Conformance Schema、D-011、D-012 的建议。

## 7. Conformance vectors expected

至少应覆盖：

1. exact decimal mass/energy unit conversion；
2. `tC` 输入及语义记录；
3. `tCO₂` 输入及语义记录；
4. `tCO₂e` 输入及语义记录；
5. `44/12` coefficient trace；
6. `44/16` coefficient trace（如代表标准实际使用或相关实现存在）；
7. GWP coefficient/version provenance；
8. standard formula using exact decimal arithmetic；
9. business-boundary exact comparison；
10. each allowed tolerance category actually used；
11. test-only tolerance that must not affect business result；
12. invalid quantity/unit combination rejection；
13. display conversion not changing calculation value；
14. round-trip serialization of value + semantics。

## 8. Candidate rules the business project may propose

允许提出 candidate：

- `value + quantity_type + unit_id`；
- coefficient metadata，例如 `coefficient_id / coefficient_type / value / source / version`；
- tolerance purpose/category 字段；
- DecimalPolicy profile；
- Unit/Quantity trace 字段；
- Carbon Conformance Vector schema；
- 对中央 Numeric/Unit Contract DRAFT 的修订建议。

## 9. Rules the business project may NOT freeze for the platform

不得自行宣布：

- `value + quantity_type + unit_id` 已成为最终公共 Unit Contract；
- `tC/tCO₂/tCO₂e` 已在全平台被最终定义为某一种单位模型；
- `44/12` 或 `44/16` 是普通 `unit_convert()`；
- GWP 与 SI 单位倍率共享同一 conversion 语义；
- 所有项目都采用 GHGTOOL 当前 Decimal precision/rounding；
- 所有 tolerance 都采用 GHGTOOL 当前 `is_close()`；
- D-011 / D-012 已冻结。

## 10. Explicit prohibitions

本 Pilot 不得：

- 顺便重写整个 GHGTOOL `UnitService`；
- 顺便重写全部碳核算 Calculator；
- 修改 `platform-lock.json`；
- 自动升级到中央仓最新 `main`；
- 为了“语义统一”修改大量 UI；
- 将化学计量系数机械迁入 UnitService；
- 把测试 tolerance 当业务 tolerance；
- 冻结公共 Unit Contract。

## 11. Independent acceptance rule

Gate 3 的 PASS / FAIL / BLOCKED 必须由 GHGTOOL 自己的独立验收任务给出。中央平台不得因为 candidate 结构合理或静态代码审计完整就宣布 PASS。

验收必须明确区分：

- 静态代码审计；
- Unit/Quantity 路径真实执行；
- 数值结果真实重算；
- tolerance 边界真实验证；
- Conformance Vector 实际执行。

## 12. Return to central platform

最终使用：

`pilots/numeric/N01_PILOT_RETURN_TEMPLATE.md`

回报中必须单独列出：

- Numeric candidate；
- Unit/Quantity candidate；
- coefficient boundary candidate；
- tolerance taxonomy；
- project-specific rules；
- 仍然 OPEN 的 D-011 / D-012 问题。

在 Gate 0 未通过前，本任务书保持 **READY AFTER GATE 0**。
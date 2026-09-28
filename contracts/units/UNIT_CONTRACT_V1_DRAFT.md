# Qingzhou Unit Contract v1 — DRAFT

状态：**DRAFT / NOT YET RELEASED**

## 1. 目标

统一三个业务模块对单位、量纲、换算和标准公式系数的表达，避免各标准/页面重复硬编码 `/1000`、`*10000` 等无法追溯的变换。

## 2. 核心原则

- 单位语义属于公共 Contract；
- 业务模型本身不因此统一；
- 标准公式固有系数不得伪装成单位换算；
- 单位换算必须可追溯、可测试、跨平台一致；
- 原始输入单位、Canonical 单位、显示单位应可区分。

## 3. 建议公共字段

```text
value
unit
canonical_value
canonical_unit
conversion_id
conversion_version
source_unit
```

具体 Schema 在试点后冻结。

## 4. 公共单位类别候选

至少覆盖当前三个项目已高频使用的：

- mass：kg、t；
- energy：kJ、MJ、GJ、kWh、MWh；
- volume：m³、Nm³、10⁴Nm³；
- power：W、kW、MW；
- pressure：Pa、kPa、MPa；
- temperature：℃、K（需要时）；
- ratio / percent；
- time / production period；
- product-specific unit（由模块扩展）。

## 5. 单位换算与公式系数分离

### 单位换算

例如：

```text
kg → t
kJ → GJ
kWh → MWh
Nm³ → 10⁴Nm³
```

应由 Unit Contract / UnitService 表达。

### 标准公式系数

例如：

```text
44/12
44/16
```

属于公式/化学计量关系或标准明确系数，应进入 Rule/Calculator Specification 并带来源，不应隐藏在 UnitService 中。

## 6. 不允许的实现

以下如果承担的是单位转换，不应散落在业务计算器中：

```text
* 1e-6
* 1e-9
/ 1000
* 10000
```

如果这些数字本身是标准公式的一部分，则必须明确标注 coefficient_id / source，而不是机械迁移。

## 7. Precision

单位转换必须遵循 Numeric Contract。

不得因为显示单位转换而提前 round 正式计算值。

## 8. 模块自治

Unit Contract 不要求三个模块共享同一输入字段或同一业务模型。

例如：

- 能耗限额可使用 `kgce/t` 等产品指标；
- 设备能效可使用流量、扬程、功率、效率；
- 碳核算可使用 `tCO2`、`tC`、`tCO2e`、热值等。

公共层只统一单位含义和可验证换算。

## 9. 版本与追溯

如果换算规则可能变化或存在标准专用口径，应记录：

```text
conversion_id
conversion_version
rule/source
```

纯 SI 十进制倍率可以由稳定公共规则表达。

## 10. Conformance

Unit Contract v1 应有公共向量覆盖：

- 正向/反向转换；
- 0；
- 大小量级；
- 非整数十进制；
- 禁止的量纲转换；
- display conversion 与 calculation conversion 分离。

## 11. v1 冻结前待验证

- 最小单位枚举是否使用 UCUM 风格或自定义稳定 ID；
- `Nm3`、`10^4Nm3` 等工业常用表示的 canonical ID；
- 比例/百分数内部 Canonical 采用 `0..1` 还是保留 `%` 语义；
- 温度偏移单位的统一方式；
- 碳核算中 C/CO2/CO2e 是否作为单位、物质量语义还是业务 quantity type 分层表达。

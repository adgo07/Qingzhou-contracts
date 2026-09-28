# Qingzhou Numeric Contract v1 — DRAFT

状态：**DRAFT / NOT YET RELEASED**

适用：三个业务模块及未来所有实现同一 Capability 的平台。

## 1. 目标

保证 Windows/Linux/macOS/Android/HarmonyOS/iOS/小程序等不同实现对同一业务输入得到同一业务结果，尤其避免边界等级因语言默认浮点、默认修约或数学函数实现差异而漂移。

## 2. 权威数值表示

### 2.1 Canonical

标准、参数、因子、阈值等权威数字优先以十进制字符串序列化，例如：

```json
{
  "threshold": "5.0",
  "factor": "1.12"
}
```

不得依赖 JSON number 被各语言自动解析为 binary float 后再恢复十进制含义。

### 2.2 Runtime

正式权威计算链不得以 IEEE-754 binary float 作为业务真值。

允许平台使用：

- Python `Decimal`；
- JVM `BigDecimal`；
- Swift/Native 中满足本 Contract 的十进制实现；
- TypeScript/ArkTS 中满足本 Contract 的确定性十进制库；
- 未来共享 Native Core。

实现技术可以不同，业务语义必须一致。

## 3. 默认比较语义

默认：

> full-value comparison。

即在标准未明确要求修约后判定时，不得先将实际值或阈值隐藏修约到固定小数位再比较。

示例：

```text
actual = 5.0000004
limit  = 5.0

actual <= limit  => false
```

不得因为显示为 `5.00` 或某个旧 ROUND6 规则而改变正式结果。

## 4. 隐式修约

禁止 implicit rounding。

以下行为不得作为公共默认：

```text
ROUND(value, 6)
round(value, display_places)
先格式化字符串再比较
为了避免边界误差人为增加隐藏 tolerance
```

标准或正式业务规则显式要求修约时，必须在 Canonical Rule / Calculator Contract 中声明：

- 输入对象；
- 修约阶段；
- places/significant digits；
- rounding mode；
- 来源；
- 修约后值是否参与正式判定。

## 5. 显示与判定分离

至少区分：

```text
calculation_value
comparison_value
display_value
```

三者可以相同，但不得默认混为一个概念。

`display_places` 只控制用户界面/报告展示，不改变 comparison value。

## 6. 运算顺序

对于可能影响边界的正式公式，应冻结运算树/表达式语义，不允许平台编译器自行使用代数重排改变业务语义。

数学上严格等价、且在 Contract 中明确采用的比较表达式可以不同于展示公式，例如在分母已验证为正时使用交叉相乘避免不必要的除法。

这种等价变换必须：

- 有明确前置条件；
- 在 Rule Specification 中声明；
- 有 Conformance Case；
- 不得改变标准要求的显式修约顺序。

## 7. 基础运算

`add/subtract/multiply/divide` 的实现必须：

- 接受有限十进制；
- 拒绝 NaN/Infinity 作为正式业务输入；
- 除数为 0 时产生结构化业务/执行错误，不得返回平台默认 Infinity；
- 结果精度策略由实现满足本 Contract，不得低于具体 Rule/Calculator 所声明的要求。

全局精度位数当前不在公共层强制固定为 40/50；不同复杂度算法可以声明更高工作精度。

## 8. 比较操作

至少统一：

```text
lt   <
lte  <=
gt   >
gte  >=
eq   exact decimal equality
```

若某业务需要 tolerance equality，不得复用 `eq` 偷换语义，应定义显式规则。

## 9. 显式 rounding

公共 Contract 必须至少能够描述：

```text
places
significant_digits
rounding_mode
stage
purpose
source
```

具体 rounding mode 枚举在 v1 Schema 冻结前保持 DRAFT。

## 10. Transcendental Numeric

以下函数必须进入单独的确定性规范：

```text
sqrt
ln
pow / fractional power
exp（如未来需要）
```

不能假定各语言默认实现末位一致。

最终规范至少冻结：

- 输入域；
- 工作精度；
- 算法/reference procedure；
- output normalization；
- rounding；
- allowed error/tolerance；
- 边界判定处理；
- numerical conformance vectors。

当前具体 reference procedure **OPEN**，见 `DECISIONS_NEEDED.md` D-001。

## 11. Conformance

Numeric Contract 自身必须有 `conformance/common/numeric/` 测试向量。

业务标准如果使用某种 Numeric 能力，也必须在业务 Conformance 中覆盖：

- 等于边界；
- 刚低于边界；
- 刚高于边界；
- 大量级/小量级；
- 除法；
- 显式修约；
- 非线性函数（如使用）。

## 12. 当前三个项目迁移原则

- ECQuota：废止无标准依据的全局 ROUND6，逐步对齐 full-value comparison；
- EquipEffi：现有 Decimal50/非线性泵公式作为 Transcendental Contract 试点，不要求当前降低精度；
- GHGTOOL：保留 DecimalPolicy，逐步清理权威链中的散落裸运算/隐式单位换算；
- 不要求三个仓库立即共享同一 Numeric 源代码。

## 13. v1 冻结前必须解决

- D-001：非线性函数 reference procedure；
- rounding mode 枚举；
- common numeric vector schema；
- precision 声明最小字段；
- tolerance 是否只允许出现在非判定型数值验证中，或允许标准显式声明。

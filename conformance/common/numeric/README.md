# Common Numeric Conformance

用于验证 Qingzhou Numeric Contract 本身，而不是某个具体标准。

未来至少覆盖：

- exact decimal parse/serialize；
- add/subtract/multiply/divide；
- `lt/lte/gt/gte/eq`；
- full-value boundary comparison；
- explicit rounding；
- display rounding isolation；
- division-by-zero error semantics；
- sqrt/ln/pow numerical vectors（待 D-001 冻结）。

权威 expected 必须人工/独立推导并留有依据，不能由某一个被测实现自动生成后直接当裁判。

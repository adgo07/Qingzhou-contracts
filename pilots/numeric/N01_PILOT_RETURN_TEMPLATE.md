# QZC-N01 Pilot Return Template

本模板用于 N01-A / N01-B / N01-C 完成业务仓独立设计、执行和验收后回报中央平台。

> 必须区分“静态审计”“测试真实运行”“数值真实重算”“边界/Conformance 真实验证”。不得把前者写成后者。

---

## 1. Repository

- Repository：
- Default branch：
- Module ID：

## 2. Pilot ID

- Pilot ID：`N01-A / N01-B / N01-C`
- Representative standard/profile：

## 3. Contract baseline

- Contract baseline tag：`contracts-v0.1.0`
- Contract baseline SHA：`0cd74d783fa23add6dc881b408a8c8ba8503f8e8`
- Was tag independently verified to point exactly to baseline SHA? `YES / NO`
- Was `platform-lock.json` changed for this Pilot? `YES / NO`

## 4. Design baseline SHA

- Design baseline SHA：
- Date：
- Design PR / document：

## 5. Execution head SHA

- Execution head SHA：
- Execution PR / branch：
- Date：

## 6. Acceptance head SHA

- Acceptance head SHA：
- Independent acceptance PR/report：
- Date：

## 7. Independent acceptance result

Choose exactly one:

- `PASS`
- `FAIL`
- `BLOCKED`

Acceptance authority / reviewer：

Acceptance scope：

## 8. Actual implementation inspected

列出实际检查过的权威实现，不写“应当”或“推测”：

| Path / component | Function / rule | Why inspected | Finding |
|---|---|---|---|
| | | | |

## 9. Actual tests run

| Command / test | Environment | Result | Evidence |
|---|---|---|---|
| | | | |

如果任何应运行测试无法执行，写明原因，不得用静态审计替代。

## 10. Numerical execution status

明确勾选/填写：

- Static code audit completed: `YES / NO`
- Tests actually executed: `YES / NO`
- Numerical results actually recomputed: `YES / NO`
- Boundary cases actually executed: `YES / NO`
- Conformance vectors actually executed: `YES / NO`
- Cross-language implementation actually executed: `YES / NO / NOT IN SCOPE`

补充说明：

## 11. Numeric behavior confirmed

至少说明：

- authoritative numeric representation；
- precision policy；
- rounding mode 及范围；
- comparison semantics；
- display vs calculation/comparison separation；
- operation order；
- binary float policy；
- tolerance policy / taxonomy；
- nonlinear/transcendental behavior（如适用）。

## 12. Boundary cases

| Case | Exact input | Threshold/reference | Expected | Actual | PASS/FAIL |
|---|---|---|---|---|---|
| | | | | | |

至少包含本 Pilot Distribution 要求的边界类型。

## 13. Conformance vectors produced

- Vector location：
- Schema/version：
- Count：
- Were vectors executed? `YES / NO`
- Execution result：

关键类别：

- 
- 
- 

## 14. Candidate platform rules

只列“建议进入中央跨 Pilot 审查”的 candidate，不写成已冻结规则。

| Candidate | Evidence | Scope | Risks / open questions |
|---|---|---|---|
| | | | |

## 15. Rules that must remain project-specific

| Rule/profile | Why project-specific | Evidence |
|---|---|---|
| | | |

## 16. Newly discovered conflicts

包括但不限于：

- Contract DRAFT 与真实业务实现冲突；
- Numeric 与 Unit 边界冲突；
- precision / rounding / tolerance 冲突；
- cross-language reproducibility 冲突；
- old tests vs intended semantics；
- historical record compatibility risk。

## 17. Suggested changes to Numeric Contract

- Proposed change：
- Evidence：
- Breaking?：
- Needs RFC/ADR?：

## 18. Suggested changes to Unit Contract

- Proposed change：
- Evidence：
- Breaking?：
- Needs RFC/ADR?：

如不适用，明确写 `No change proposed`。

## 19. Suggested changes to Conformance Schema

- Proposed field/change：
- Why current schema is insufficient：
- Example：

## 20. Suggested changes to DECISIONS_NEEDED

对每个相关 D-item 分别填写：

| Decision ID | New evidence | Suggested status | May it be frozen now? Why/why not? |
|---|---|---|---|
| D-001 | | | |
| D-004 | | | |
| D-011 | | | |
| D-012 | | | |

不得因为单一 Pilot PASS 就自动关闭跨平台决策。

## 21. Unresolved questions

1. 
2. 
3. 

## 22. Explicit final statement

必须逐字给出清晰结论：

- **Business project acceptance:** `PASS / FAIL / BLOCKED`
- **Static audit completed:** `YES / NO`
- **Numerical results actually executed:** `YES / NO`
- **Conformance vectors actually executed:** `YES / NO`
- **This report freezes a platform-wide Numeric/Unit rule:** `NO`

## 23. Evidence links

- Design PR：
- Execution PR：
- Acceptance report / PR：
- Commit(s)：
- Test artifact(s)：
- Conformance vectors：
- Relevant standard evidence：

---

中央平台收到回报后，只能把它作为 Gate 4 cross-pilot review 的输入。业务项目的 PASS 由业务项目独立验收产生，中央平台不得追认或替代。
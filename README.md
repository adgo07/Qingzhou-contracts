# Qingzhou Contracts

青舟工业能源软件体系的**公共架构规范、Contract、Schema 与跨平台 Conformance 唯一事实源**。

本仓库服务于：

- `qz.energy_quota` — 能耗限额评价软件；
- `qz.equipment_efficiency` — 设备能效分析软件；
- `qz.carbon_accounting` — 温室气体排放核算软件。

> 本仓库不是第四个业务软件，也不是用户运行软件时必须安装的公共程序。

三个业务产品继续独立开发、独立安装、独立升级、独立离线运行；未来 Suite 只负责组装公共 AppShell 与业务模块，不复制第二套算法。

## 当前基线

- Architecture: **V2.1 FROZEN**
- Phase: **Contract Foundation**
- Contracts: v1 drafts，尚未发布正式 `contracts-v1.0.0`
- Monorepo / Suite / Mobile / Native Core: 暂不实施

详见：

- `docs/architecture/ARCHITECTURE_V2.1_FROZEN.md`
- `PLATFORM_STATE.md`
- `DECISIONS_NEEDED.md`
- `compatibility/MATRIX.md`

## 仓库结构

```text
Qingzhou-contracts/
├─ docs/
│  ├─ architecture/      # 冻结架构
│  ├─ governance/        # 变更、版本治理
│  └─ adr/               # 已批准架构决策
├─ contracts/
│  ├─ numeric/
│  ├─ units/
│  ├─ module/
│  ├─ records/
│  └─ package/
├─ schemas/              # 机器可读公共 Schema
├─ specs/                # 稳定、平台无关业务规范
├─ conformance/          # 跨实现权威测试向量
├─ proposals/RFC/        # 公共规则变更提案
├─ compatibility/        # 三项目兼容矩阵
├─ templates/            # 业务仓接入模板
├─ tools/                # 校验工具
├─ AGENTS.md
├─ PLATFORM_STATE.md
└─ DECISIONS_NEEDED.md
```

## 三个业务仓库如何使用

业务仓库不得实时读取本仓库最新 `main` 作为运行规则。

应锁定某个 release/tag + commit SHA，并在业务仓库保存：

```text
PLATFORM_BASELINE.md
platform-lock.json
```

模板见 `templates/`。

升级 Contract 时必须显式修改锁定版本并运行：

1. 公共 Conformance；
2. 本项目完整回归测试。

## 变更公共规范

涉及 Numeric、Unit、Module/Capability、Record/Workspace/Result、qzpack、Conformance 等公共语义时：

```text
发现公共问题
→ RFC
→ 评审/试点
→ ADR（需要时）
→ 修改 Contract/Schema/Conformance
→ Release/Tag
→ 业务仓按需升级
```

普通产品 Bug、页面调整、单标准专有业务问题仍留在对应业务仓库。

详见 `docs/governance/CHANGE_PROCESS.md`。

## 当前代表性试点

- ECQuota：GB 29446；
- EquipEffi：代表性离心泵；
- GHGTOOL：GB/T 32151.34。

这些试点用于验证 Contract，而不是要求现在重构三个产品。

## 重要原则

> 先统一“业务含义和契约”，再统一“代码实现”。

> 同一 Capability 在不同平台必须通过同一 Conformance Vectors。

> 复杂标准允许专用 Domain Calculator，不追求所有算法 100% DSL 化。

> Offline-first, cloud-optional。

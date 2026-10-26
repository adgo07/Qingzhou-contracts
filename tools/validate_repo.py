from __future__ import annotations

import json
import re
import sys
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]

REQUIRED = [
    "AGENTS.md",
    "PLATFORM_STATE.md",
    "DECISIONS_NEEDED.md",
    "docs/architecture/ARCHITECTURE_V2.1_FROZEN.md",
    "docs/governance/CHANGE_PROCESS.md",
    "docs/governance/VERSIONING.md",
    "contracts/numeric/NUMERIC_CONTRACT_V1_DRAFT.md",
    "contracts/units/UNIT_CONTRACT_V1_DRAFT.md",
    "contracts/module/MODULE_CAPABILITY_CONTRACT_V1_DRAFT.md",
    "contracts/records/WORKSPACE_ATTEMPT_RECORD_RESULT_CONTRACT_V1_DRAFT.md",
    "contracts/package/QZPACK_CONTRACT_V1_DRAFT.md",
    "conformance/README.md",
    "schemas/README.md",
]


# Deliberately scoped to current navigation and editable governance/UI prose.
# Frozen/accepted sources and historical snapshots are not rewritten or treated
# as current instructions. Remote commit links are provenance, not local paths;
# this offline validator does not assert network availability.
CURRENT_MARKDOWN = [
    "README.md", "AGENTS.md", "PLATFORM_STATE.md", "DECISIONS_NEEDED.md",
    "docs/GUIDE_INDEX.md", "docs/history/README.md", "docs/ui/phase2/README.md",
    "docs/governance/CHANGE_PROCESS.md", "docs/governance/VERSIONING.md",
    "docs/governance/PRODUCT_DELIVERY_POLICY_V1.md",
    "docs/governance/STANDARD_DEVELOPMENT_GUIDE_V0.1.md",
    "docs/ui/UI_PRODUCT_FAMILY_SPEC_V0.1.md",
    "docs/ui/UI_DESIGN_GUIDELINES_V0.2.md",
    "docs/ui/UI_ACCEPTANCE_CHECKLIST_V0.1.md",
]
SPEC = "docs/ui/UI_PRODUCT_FAMILY_SPEC_V0.1.md"
REQUIRED += CURRENT_MARKDOWN + [
    "contracts/numeric/NUMERIC_CONTRACT_V1_FROZEN.md",
    "contracts/numeric/NUMERIC_PROFILES_V1_FROZEN.md",
    "conformance/common/numeric/CONFORMANCE_VECTOR_V1_FROZEN.md",
    "conformance/common/numeric/conformance_vector_v1.schema.json",
    "decisions/ADR-NUMERIC-V1.md",
]


def prose(path: Path) -> str:
    # Ignore fenced examples so illustrative Markdown cannot create false links.
    text = path.read_text(encoding="utf-8")
    if path == ROOT / "docs/ui/phase2/README.md":
        text = text.split("## 历史原文（以下内容完整保留，仅供追溯）", 1)[0]
    return re.sub(r"(?ms)^(```|~~~).*?^\1[^\n]*$", "", text)


def heading_ids(path: Path) -> set[str]:
    ids: set[str] = set()
    counts: dict[str, int] = {}
    for heading in re.findall(r"(?m)^#{1,6}\s+(.+?)\s*#*\s*$", prose(path)):
        slug = re.sub(r"[^\w\- ]", "", heading.lower()).replace(" ", "-")
        count = counts.get(slug, 0)
        counts[slug] = count + 1
        ids.add(f"{slug}-{count}" if count else slug)
    return ids


def check_links() -> list[str]:
    errors: list[str] = []
    for name in CURRENT_MARKDOWN:
        source = ROOT / name
        if not source.is_file():
            continue  # check_required reports this
        # Also accept optional quoted/parenthesized Markdown link titles.
        # Keep parsing deliberately scoped; no external Markdown dependency.
        links = re.finditer(
            r"""!?\[[^\]\n]*\]\(\s*(<[^>\n]+>|[^\s)]+)(?:\s+(?:"[^"\n]*"|'[^'\n]*'|\([^()\n]*\)))?\s*\)""",
            prose(source),
        )
        for match in links:
            href = match.group(1)
            ref = urlsplit(href.strip("<>"))
            if ref.scheme or ref.netloc:
                continue
            target = (source.parent / unquote(ref.path)).resolve() if ref.path else source
            if not target.is_relative_to(ROOT.resolve()) or not target.exists():
                errors.append(f"{name}: missing/outside local target {href}")
            elif ref.fragment and target.is_file() and target.suffix == ".md":
                if unquote(ref.fragment) not in heading_ids(target):
                    errors.append(f"{name}: missing heading {href}")
    return errors


def check_decisions() -> list[str]:
    path = ROOT / SPEC
    if not path.is_file():
        return []
    expected = {f"A-{n:02d}" for n in range(1, 19)}
    definitions = re.findall(r"(?m)^\| (A-\d+) \|", prose(path))
    errors: list[str] = []
    if set(definitions) != expected or len(definitions) != len(expected):
        errors.append(f"{SPEC}: expected unique stable definitions A-01 through A-18")
    for name in CURRENT_MARKDOWN:
        source = ROOT / name
        if source.is_file():
            for ref in sorted(set(re.findall(r"\bA-\d+\b", prose(source))) - expected):
                errors.append(f"{name}: unknown decision {ref}")
    return errors


def check_required() -> list[str]:
    return [path for path in REQUIRED if not (ROOT / path).is_file()]


def check_json() -> list[str]:
    errors: list[str] = []
    for path in ROOT.rglob("*.json"):
        if ".git" in path.parts:
            continue
        try:
            with path.open("r", encoding="utf-8") as handle:
                json.load(handle)
        except Exception as exc:  # validation script should report all invalid files
            errors.append(f"{path.relative_to(ROOT)}: {exc}")
    return errors


def main() -> int:
    missing = check_required()
    json_errors = check_json()
    reference_errors = check_links() + check_decisions()

    if missing:
        print("Missing required governance files:")
        for item in missing:
            print(f"  - {item}")

    if json_errors:
        print("Invalid JSON files:")
        for item in json_errors:
            print(f"  - {item}")

    if reference_errors:
        print("Invalid current Markdown links or decision references:")
        for item in reference_errors:
            print(f"  - {item}")

    if missing or json_errors or reference_errors:
        return 1

    print("Repository governance validation passed.")
    return 0


if __name__ == "__main__":
    sys.exit(main())

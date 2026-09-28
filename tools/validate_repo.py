from __future__ import annotations

import json
import sys
from pathlib import Path

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

    if missing:
        print("Missing required governance files:")
        for item in missing:
            print(f"  - {item}")

    if json_errors:
        print("Invalid JSON files:")
        for item in json_errors:
            print(f"  - {item}")

    if missing or json_errors:
        return 1

    print("Repository governance validation passed.")
    return 0


if __name__ == "__main__":
    sys.exit(main())

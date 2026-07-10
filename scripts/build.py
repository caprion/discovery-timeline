"""Build site/data.json from data/eras/, data/entries/, and data/stories/.

Era YAMLs define named buckets. Entry YAMLs reference one era by id. Story
markdowns live next to entries and are joined on the `id` field. The script
validates everything and emits a single JSON the static site loads.

Usage:
    python scripts/build.py
"""

from __future__ import annotations

import json
import sys
from pathlib import Path
from urllib.parse import urlparse

import yaml

ROOT = Path(__file__).resolve().parent.parent
ERAS_DIR = ROOT / "data" / "eras"
ENTRIES_DIR = ROOT / "data" / "entries"
STORIES_DIR = ROOT / "data" / "stories"
OUT = ROOT / "site" / "data.json"

REQUIRED_TOP_LEVEL = {
    "id",
    "title",
    "date",
    "date_label",
    "era",
    "place",
    "people",
    "field",
    "idea",
    "unlocked",
    "sources",
}
REQUIRED_PLACE = {"name", "lat", "lng", "reason"}
REQUIRED_ERA = {"id", "name", "date_start", "date_end", "order", "description"}
VALID_LINK_TYPES = {"primary_source", "biography", "encyclopedia", "modern_analysis", "try_it", "other"}


def validate_entry(entry: dict, story_path: Path, era_ids: set[str]) -> list[str]:
    errors: list[str] = []
    missing = REQUIRED_TOP_LEVEL - entry.keys()
    if missing:
        errors.append(f"missing top-level fields: {sorted(missing)}")

    place = entry.get("place", {})
    place_missing = REQUIRED_PLACE - place.keys()
    if place_missing:
        errors.append(f"missing place fields: {sorted(place_missing)}")

    lat = place.get("lat")
    lng = place.get("lng")
    if lat is not None and not (-90 <= lat <= 90):
        errors.append(f"lat out of range: {lat}")
    if lng is not None and not (-180 <= lng <= 180):
        errors.append(f"lng out of range: {lng}")

    if not story_path.exists():
        errors.append(f"story file not found: {story_path}")

    if not entry.get("sources"):
        errors.append("sources list is empty")

    era_id = entry.get("era")
    if era_id and era_id not in era_ids:
        errors.append(f"era '{era_id}' does not exist in data/eras/")

    for i, link in enumerate(entry.get("links", []) or []):
        if not isinstance(link, dict):
            errors.append(f"links[{i}]: not a mapping")
            continue
        if not link.get("label"):
            errors.append(f"links[{i}]: missing label")
        url = link.get("url", "")
        if not url:
            errors.append(f"links[{i}]: missing url")
        else:
            parsed = urlparse(url)
            if not (parsed.scheme and parsed.netloc):
                errors.append(f"links[{i}]: invalid url '{url}'")
        lt = link.get("type")
        if lt and lt not in VALID_LINK_TYPES:
            errors.append(f"links[{i}]: invalid type '{lt}', must be one of {sorted(VALID_LINK_TYPES)}")

    return errors


def validate_era(era: dict) -> list[str]:
    errors: list[str] = []
    missing = REQUIRED_ERA - era.keys()
    if missing:
        errors.append(f"missing era fields: {sorted(missing)}")
    if "order" in era and not isinstance(era["order"], int):
        errors.append("era.order must be an integer")
    return errors


def coerce_date(d) -> str:
    if hasattr(d, "isoformat"):
        return d.isoformat()
    return str(d)


def load_eras() -> tuple[list[dict], set[str], list[str]]:
    era_files = sorted(ERAS_DIR.glob("*.yaml"))
    if not era_files:
        return [], set(), [f"no eras found in {ERAS_DIR}"]

    eras: list[dict] = []
    era_ids: set[str] = set()
    errors: list[str] = []

    for path in era_files:
        with path.open(encoding="utf-8") as f:
            raw = yaml.safe_load(f)
        if not isinstance(raw, dict):
            errors.append(f"{path.name}: not a YAML mapping")
            continue
        errs = validate_era(raw)
        for e in errs:
            errors.append(f"{path.name}: {e}")
        if not errs:
            eras.append(
                {
                    "id": raw["id"],
                    "name": raw["name"],
                    "date_start": coerce_date(raw["date_start"]),
                    "date_end": coerce_date(raw["date_end"]),
                    "order": raw["order"],
                    "color": raw.get("color", "#c2452d"),
                    "description": raw.get("description", "").strip(),
                    "region": raw.get("region", ""),
                    "contributors": raw.get("contributors", []),
                }
            )
            era_ids.add(raw["id"])

    return eras, era_ids, errors


def build() -> int:
    eras, era_ids, era_errors = load_eras()
    if era_errors:
        print("era validation failed:", file=sys.stderr)
        for e in era_errors:
            print(f"  - {e}", file=sys.stderr)
        return 1

    entry_files = sorted(ENTRIES_DIR.glob("*.yaml"))
    if not entry_files:
        print(f"no entries found in {ENTRIES_DIR}", file=sys.stderr)
        return 1

    entries: list[dict] = []
    all_errors: list[str] = []

    for path in entry_files:
        with path.open(encoding="utf-8") as f:
            raw = yaml.safe_load(f)
        if not isinstance(raw, dict):
            all_errors.append(f"{path.name}: not a YAML mapping")
            continue

        story_rel = raw.get("story_file") or f"stories/{raw['id']}.md"
        story_path = (ENTRIES_DIR.parent / story_rel).resolve()

        errors = validate_entry(raw, story_path, era_ids)
        if errors:
            for e in errors:
                all_errors.append(f"{path.name}: {e}")
            continue

        story_text = story_path.read_text(encoding="utf-8").strip()

        record = {
            "id": raw["id"],
            "title": raw["title"],
            "date": coerce_date(raw["date"]),
            "date_label": raw["date_label"],
            "era": raw["era"],
            "place": raw["place"],
            "people": raw["people"],
            "field": raw["field"],
            "idea": raw["idea"],
            "unlocked": raw["unlocked"],
            "hook": raw.get("hook", ""),
            "sources": raw["sources"],
            "links": raw.get("links", []),
            "story": story_text,
            "reading_age": raw.get("reading_age", 7),
            "confidence": raw.get("confidence", "medium"),
            "tags": raw.get("tags", []),
            "related": raw.get("related", []),
            "spread_to": raw.get("spread_to", []),
        }
        entries.append(record)

    if all_errors:
        print("entry validation failed:", file=sys.stderr)
        for e in all_errors:
            print(f"  - {e}", file=sys.stderr)
        return 1

    entry_ids = {e["id"] for e in entries}
    relation_errors: list[str] = []
    for e in entries:
        for rel_id in e.get("related", []) or []:
            if rel_id not in entry_ids:
                relation_errors.append(f"{e['id']}: related id '{rel_id}' does not exist")
    if relation_errors:
        print("related-reference validation failed:", file=sys.stderr)
        for e in relation_errors:
            print(f"  - {e}", file=sys.stderr)
        return 1

    entries.sort(key=lambda e: e["date"])
    eras.sort(key=lambda e: e["order"])

    OUT.parent.mkdir(parents=True, exist_ok=True)
    with OUT.open("w", encoding="utf-8") as f:
        json.dump(
            {
                "eras": eras,
                "entries": entries,
                "count": len(entries),
                "era_count": len(eras),
            },
            f,
            indent=2,
            ensure_ascii=False,
        )

    print(f"wrote {OUT}: {len(eras)} eras, {len(entries)} entries")
    return 0


if __name__ == "__main__":
    sys.exit(build())
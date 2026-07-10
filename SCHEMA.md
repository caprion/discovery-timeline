# Schema

The data layer. Three things live here: entries, stories, eras. Each entry references one era. Each entry has curated links. The build script joins everything and emits a single JSON the site loads.

## File layout

```
data/
  eras/           YAML, one file per era
    greek-foundations.yaml
    house-of-wisdom.yaml
    ...
  entries/        YAML, one file per discovery
    pythagoras.yaml
    hypatia.yaml
    ...
  stories/        Markdown, one file per discovery
    pythagoras.md
    hypatia.md
    ...
```

Build script joins entries with their stories on the `id` field, validates references to eras, validates link URLs, and emits `site/data.json`. Mismatch between entry id and story filename is a build error.

## Eras

Eras are named buckets that replace a continuous timeline scrubber. Six eras cover the math wedge:

1. **Greek Foundations** (~600 BCE to 500 CE)
2. **House of Wisdom** (~700 to 1100)
3. **Indian Mathematics** (~500 to 1600)
4. **Latin Recovery** (~1100 to 1500)
5. **Revolution in Europe** (~1500 to 1900)
6. **Modern Mathematics** (~1850 to present)

Eras overlap by design. Indian mathematics overlapped with House of Wisdom; the Revolution in Europe ran alongside the late Indian mathematics tradition. Eras are buckets, not partitions.

### Era YAML schema

```yaml
id: greek-foundations           # kebab-case slug, referenced by entries
name: Greek Foundations          # display name, 2 to 4 words
date_start: "-0600"              # YYYY, negative for BCE, quoted
date_end: "0500"                 # YYYY, quoted
order: 1                          # display order in navigation, lowest first
color: "#c2452d"                 # hex color for map dots in this era
description: |                    # 2 to 4 sentences for the era intro panel
  Greek thinkers turned math from a list of tricks into a system of proof.
  Pythagoras, Euclid, Archimedes, and Hypatia built the first schools where
  you had to show your work.
```

Era color is from the Indian Earth palette in `C:\Learn\CLAUDE.md`. Pick distinct hues from accent, action, tertiary. Default if not set is `--accent` (#c2452d).

Era date ranges are approximate. They cover the era's productive peak, not the absolute first and last entry. The era shows up in the navigation even if some entries fall slightly outside.

## Entries

Each entry is one human discovery. YAML is structured metadata. Markdown is prose. YAML stays in `data/entries/`. Markdown stays in `data/stories/`. The two are joined on the `id` field.

### Required YAML fields

| Field | Type | Notes |
|---|---|---|
| `id` | string | kebab-case slug. `hypatia-400`, `ramanujan-1911`. Year suffix avoids slug collisions. |
| `title` | string | Human-readable. `Hypatia of Alexandria`. |
| `date` | string | `YYYY` or `YYYY-MM-DD`. Negative for BCE: `-0500`. **Quote the value** (`"-0530"`) so PyYAML does not auto-parse it as a date and mangle BCE values. |
| `date_label` | string | What the UI shows. `c. 400 CE`, `1911`, `31 May 1832`. |
| `era` | string | Era id. Must exist in `data/eras/`. |
| `place.name` | string | City, region. `Alexandria, Egypt`. |
| `place.lat` | float | Decimal latitude. WGS84. |
| `place.lng` | float | Decimal longitude. WGS84. |
| `place.reason` | string | Why this point on the map. The editorial rule is **first public**. |
| `people` | list | One or more `{name, role}` objects. Role is short: `mathematician`, `astronomer`. |
| `field` | string | `mathematics`, `geometry`, `number-theory`. Free text. |
| `idea` | string | One sentence. What the discovery actually was. Plain language. |
| `unlocked` | string | One sentence. What it made possible after. |
| `sources` | list | Strings. Books, papers, encyclopedias. Cited in story. |
| `story_file` | string | Relative to data/. Default `stories/<id>.md`. |
| `reading_age` | int | Grade level. Default 7. Range 4 to 12. |

### Optional YAML fields

| Field | Type | Notes |
|---|---|---|
| `hook` | string | One-line hook for map tooltip and story header. Default derived from story first line. |
| `links` | list | Curated external URLs. See Links section. |
| `spread_to` | list | Cities the idea reached within ~50 years. `{city, years}`. UI does not render yet. |
| `related` | list | Other entry ids. UI does not render yet. |
| `tags` | list | Free-form. For filtering later. |
| `image` | string | Public-domain image URL or local path. Optional for MVP. |
| `confidence` | string | `high`, `medium`, `low`. How solid the historical record is. |

## Links

Curated external URLs. Every entry should have at least three: one to a primary source (the actual book or paper), one to a strong biography, one to a reliable encyclopedia article.

### Link schema

```yaml
links:
  - label: Galois's letter (Internet Archive scan of the manuscript)
    url: https://archive.org/details/...
    type: primary_source
  - label: MacTutor biography of Évariste Galois
    url: https://mathshistory.stsydney.edu.au/Biographies/Galois
    type: biography
  - label: Britannica entry on Évariste Galois
    url: https://www.britannica.com/biography/Evariste-Galois
    type: encyclopedia
```

| Field | Type | Notes |
|---|---|---|
| `label` | string | Human-readable. Says what the link is, not just "click here." |
| `url` | string | Full URL. Must parse. Build script validates. |
| `type` | string | `primary_source`, `biography`, `encyclopedia`, `modern_analysis`, `try_it`, `other`. |

### Link type priority

`primary_source` first. The actual book, the actual letter, the actual paper. Internet Archive is the best source for old primary works. arXiv for modern. Journal archives for older modern papers.

`biography` second. MacTutor is the gold standard for mathematicians. Britannica is acceptable.

`encyclopedia` third. Wikipedia is acceptable as a tertiary source. Never the only source.

`modern_analysis` fourth. Modern academic papers that explain the historical work in current terms. Useful for older entries where the original work is hard to read.

`try_it` optional, where a hands-on version of the method genuinely exists: a GeoGebra applet, a manipulable diagram, an interactive demo built by someone else. Never build one in-house — this is an outbound link, not a feature. Do not add a `try_it` link just to have one; only where it's a real, well-made thing a kid can play with.

`other` for anything that does not fit.

### Link curation rules

- No dead links. Verify each URL returns 200 at curation time.
- Prefer stable hosts. Internet Archive, MacTutor, Britannica, arXiv, university pages. Avoid personal blogs unless the author is authoritative.
- One link per source. Don't link three biographies of the same person.
- Label says what the link is, not the destination domain. `Galois's letter (Internet Archive scan)` not `archive.org/details/...`.

## Map rule

The lat/lng is where the discovery was **first made public**, not where the person was born and not where the idea was eventually used.

Examples:
- Pythagoras: school founded at Croton. Pin at Crotone, Italy.
- al-Khwarizmi: worked at House of Wisdom in Baghdad. Pin at Baghdad.
- Galois: died in Paris; mathematical papers left behind there. Pin at Paris.
- Ramanujan: mailed his first results from Kumbakonam, India. Pin there. Cambridge came later.

When two people discover independently (calculus, infinity), pick one entry, document the dispute in the story, and pin at the place of first publication.

## Story format

~150 words is a starting guideline, not a gate. The real test is whether the narrative lands and gives the kid something to click next (a link, a related entry). Stretch past 200 if the story earns it; don't pad a thin story to hit a number. Depth belongs in links and `related`/`spread_to` connections first — only lengthen the prose itself if the human moment genuinely needs more room to land.

1. **Hook** (1 to 2 sentences). The human moment. Specific, not abstract. Galois died at 20 the night before his duel. Ramanujan had no formal math training. Hypatia was killed by a mob.
2. **The problem** (1 to 3 sentences, where one exists). The concrete, real thing someone was stuck on before the discovery. "How do you mark a perfect right angle in a field with nothing but a rope." Not every entry has this — skip it for preservation/tragedy-shaped stories like Hypatia where there's no problem being solved.
3. **The idea** (3 to 5 sentences). Plain language. Define any technical term inline. Show the method: how they actually got from problem to answer, not just the result.
4. **What it unlocked** (1 to 2 sentences). Brief consequence, and where the idea got used first if that's known.

End with a blank line, then `## Sources` heading with the sources from YAML rendered as a bulleted list.

## Build

```bash
python scripts/build.py          # produces site/data.json
```

Build script validates:
- All required YAML fields present.
- `date` field is quoted (string).
- Story file exists at `story_file` path.
- `era` reference resolves to a file in `data/eras/`.
- `links` URLs are well-formed.
- `place.lat` and `place.lng` in valid ranges.

Any validation failure exits non-zero with the list of errors.

## Versioning

When schema fields change:

1. Update SCHEMA.md.
2. Update `scripts/build.py` to validate the new field.
3. Migrate existing entries.
4. Note the change in CHANGELOG.md (start one if it does not exist yet).
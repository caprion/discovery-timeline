# discovery-timeline - Project Context

Project-specific memory. Update this as the project evolves.

## Goal

Map + timeline of human discoveries in mathematics. Kids audience, lifetime project, AI-drafted + human edited stories.

## Workflow metadata

- **Current type:** Experiment
- **Linear home:** Use the nearest existing project first; create a dedicated Linear project only if this survives across sessions or needs multiple active issues
- **Primary issue:** TBD
- **Decision checkpoint:** Decide whether to promote, pause, or archive this after the first meaningful work session

## Stack and tooling

<!-- Languages, frameworks, runtimes, and important dependencies -->

## Entry points and commands

<!-- Main scripts, dev commands, test commands, and how to run the project -->

## Architecture decisions

<!-- Record key technical decisions here -->

- **North star signal (2026-07-10):** unaided map exploration — kid clicks around for 10 minutes unprompted. Chosen over recall ("who is Ramanujan?") and social retelling (tells a friend). Runs after 20 entries ship (Phase 3, ROADMAP.md).
- **Reading age (2026-07-10):** grade 7 default confirmed. Kid is in grade 5, reading ability at grade 6-7. Grade 7 is an intentional stretch, calibrated to pull the kid up, not to match current level exactly. Long-term intent: start with math, eventually widen to all subjects — reinforces the Phase 4 gate already in ROADMAP.md rather than changing it.
- **Word count (2026-07-10):** ~150 words is a guideline, not a hard gate (SCHEMA.md updated). Priority is landing the narrative and surfacing a next click, not hitting a number. Depth should go into links/`related`/`spread_to` before it goes into longer prose.
- **Problem-first narrative (2026-07-10):** editorial line updated (PHILOSOPHY.md, SCHEMA.md, `scripts/build.py`). Stories should name the concrete practical problem that led to the discovery where one exists (not every entry has one — skip for preservation/tragedy-shaped stories like Hypatia), and show the method, not just the result. Added optional `try_it` link type for hands-on external demos (GeoGebra applets, manipulable diagrams) — outbound link only, never built in-house, keeps the "no exercises/problem sets" anti-goal intact. Example gap identified: Pythagoras entry currently leads with cult trivia instead of the rope-stretcher origin problem (marking a right angle in a field with a 12-knot rope) — flagged for rewrite.
- **Build vs. reuse (2026-07-10):** checked for existing tools. MacTutor has a birthplace map (mathshistory.st-andrews.ac.uk/Map/) and Wikidata has a queryable mathematician dataset (SPARQL) — both are birthplace-indexed reference tools for adults, not narrative/kid-first, and don't use the first-publication map rule. No existing project does the narrative + curated-links + kid-reading-level job. Decision: keep building, but use MacTutor/Wikidata as fact-checking and long-listing sources to cut research time. Sequencing: front-load data (entries/stories/links/related-graph) before investing further in visualization polish.

## Current Status

- **Phase:** Initial setup
- **Next steps:** TBD

## Key Learnings

<!-- Learnings specific to this project. Promote to global lessons.md if broadly applicable -->

- **Map/date disputes resolved (2026-07-10), per research report:**
  - **Newton vs. Leibniz (calculus):** feature Newton (roadmap's original choice), pin **London, 1687** (Principia — first genuinely public appearance of his methods), not Cambridge/Woolsthorpe (private) or Leipzig (Leibniz's 1684 publication, which is a true "first" but a different person). Make the priority dispute itself central to the story: he invented it first and lost the publishing race to Leibniz. Flag a possible future Leibniz companion entry (Leipzig, 1684) rather than erasing his side of it.
  - **Gauss:** pin **Göttingen, 1796** (17-gon construction, first announced) over Leipzig/1801 (Disquisitiones). Better hook (18-year-old, one diary entry, decides to become a mathematician that morning) and still a genuine first-public moment.
  - **Turing:** pin **Cambridge**, not London — same rule that put Ramanujan in Kumbakonam, not Cambridge. Paper written and submitted from King's College; London is just where the journal published it.
  - **Kovalevskaya:** pin **Stockholm** (where she worked and where Acta Mathematica published), not Paris (where the Bordin Prize was announced). Flag Chebyshev or Lobachevsky as alternates if a Russia-pinned (not Sweden-pinned) entry is wanted later.
  - **Göttingen pin collision (Gauss 1796 + Noether 1918):** kept as-is, not a bug. Göttingen was the world's leading math center for over a century — a kid clicking the same dot twice across two eras is a feature, not a UI problem.
- **Personal/fun-fact color (2026-07-10):** confirmed direction — every entry should carry at least one small, true, personal/human-interest fact beyond the core discovery (e.g. Khayyam was also a famous poet; Boole was a self-taught shoemaker's son; Bhaskara II named his book after his daughter). Reinforces PHILOSOPHY.md's "surprised these were just people." Not a new schema field — fold into the hook or story prose, human-editor's judgment on where it lands best.
- **Bugs found and fixed during manual scan (2026-07-10):**
  - Dead MacTutor domain: 4 of 5 shipped entries (Pythagoras, al-Khwarizmi, Galois, Ramanujan) linked `mathshistory.stsydney.edu.au` — that domain does not resolve (DNS failure). Correct domain is `mathshistory.st-andrews.ac.uk`. Fixed all 4.
  - Stray bare URLs mixed into the `sources` list (should be citation strings only, not URLs — those belong in `links`) — found in Pythagoras, al-Khwarizmi, Hypatia. Removed; the same URLs were already present in `links` as proper entries.
  - **Ramanujan entry had the wrong year and place.** It was `ramanujan-1911` / Kumbakonam, framed as "mailed his first letter to Hardy from Kumbakonam." Verified: the famous Hardy letter was sent **16 January 1913 from Madras** (Ramanujan had moved there by 1912, working as a clerk at the Madras Port Trust). The 1911/Kumbakonam date was his *first published paper* (Journal of the Indian Mathematical Society), a different event. Renamed to `ramanujan-1913`, corrected date/place/pin to Madras (13.0827, 80.2707), fixed files and MacTutor link.

<!-- Unknowns, risks, or decisions that still need to be made -->

---
Created: 2026-07-10
Last updated: 2026-07-10


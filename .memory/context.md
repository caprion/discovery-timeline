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
- **Overnight brief (2026-07-10, explicit user constraint):** Sumit is running a "forget the current schema, go tangential" data-model brainstorm overnight — full autonomy granted ("everything is allowed right now here"). Explicit standing instruction while doing this: never lose sight of the actual customer segment while exploring tangential ideas — kids ages 10-14, grade 7 reading level, calibrated to Sumit's own kid (grade 5, reading grade 6-7). Any new data model or prototype must still serve that audience; "tangential" applies to data shape/structure, not to who it's for.
- **Problem-first narrative (2026-07-10):** editorial line updated (PHILOSOPHY.md, SCHEMA.md, `scripts/build.py`). Stories should name the concrete practical problem that led to the discovery where one exists (not every entry has one — skip for preservation/tragedy-shaped stories like Hypatia), and show the method, not just the result. Added optional `try_it` link type for hands-on external demos (GeoGebra applets, manipulable diagrams) — outbound link only, never built in-house, keeps the "no exercises/problem sets" anti-goal intact. Example gap identified: Pythagoras entry currently leads with cult trivia instead of the rope-stretcher origin problem (marking a right angle in a field with a 12-knot rope) — flagged for rewrite.
- **Build vs. reuse (2026-07-10):** checked for existing tools. MacTutor has a birthplace map (mathshistory.st-andrews.ac.uk/Map/) and Wikidata has a queryable mathematician dataset (SPARQL) — both are birthplace-indexed reference tools for adults, not narrative/kid-first, and don't use the first-publication map rule. No existing project does the narrative + curated-links + kid-reading-level job. Decision: keep building, but use MacTutor/Wikidata as fact-checking and long-listing sources to cut research time. Sequencing: front-load data (entries/stories/links/related-graph) before investing further in visualization polish.
- **Deep-engagement review pass (2026-07-10):** Sumit flagged the live site (discovery-timeline.pages.dev) as "not interactive enough for kids." Ran: (1) a research agent on curiosity-gap theory (Loewenstein), Zeigarnik effect, goal-gradient effect, Wikipedia rabbit-hole mechanics, children's-lit hook techniques (Horrible Histories, Who Was, DK Eyewitness, Ripley's), and prior-art teardowns (Histography, Chronas, ArcGIS StoryMaps, Khan Academy, Nicky Case) — produced 11 feasibility-rated static-site patterns; (2) independent critique passes from Opus and GPT-5.5, both reading the live site + docs + research report directly. **Both reviewers independently converged on the same verdict: the unit of content is wrong, not the writing.** "One discovery = one closed essay" resolves its own curiosity gap and asks the reader to do nothing, capping engagement at ~90 seconds regardless of prose quality (Zeigarnik/Loewenstein: closed loops don't pull attention forward). Both proposed reframing the atomic unit from "story you read" to "case/problem you help attack" — existing prose demoted from "the whole thing" to "the payoff," not discarded. Opus additionally flagged a real contradiction in our own docs: PHILOSOPHY.md's success metric ("kid clicks a link and leaves to a primary source" — a doorway metric) conflicts with the north star ("kid stays and explores for 10 minutes" — a destination metric); these pull in opposite directions and need explicit reconciliation, not both held at once. Opus also flagged: touch/mobile was entirely unaddressed by the research agent's hover-based patterns (5, 9) — this audience is very likely on tablets, hover does not exist there; localStorage completion counters (patterns 3, 4) risk backfiring via the overjustification effect (Deci/Koestner/Ryan) — turning reading into "7/19 visited" reframes curiosity-driven exploration as homework, especially with a parent watching. GPT-5.5 additionally flagged: too many hooks currently lean on tragedy/death (Galois, Hypatia, Turing, Archimedes, Ramanujan, Noether all involve exclusion/death/hardship) — recommend deliberately mixing in weirdness/rivalry/surprise hooks (Pythagoras's beans ban is the good counter-example) to avoid "math tragedy museum" pattern fatigue.
- **Three tangential data-model prototypes commissioned (2026-07-10 overnight):** per Sumit's explicit request to "forget current details" and propose fresh data shapes, built as working static HTML/CSS/JS demos under `prototypes/` (separate from the live `site/`), each reusing real content from the 19 shipped entries: (1) **Case File** — mystery question + progressive one-at-a-time clue reveal + one small guess/interaction + existing story as payoff + typed connections (Pythagoras/Galois/Turing). (2) **Problem Threads** — recurring-problem spine replacing era-as-navigation, e.g. "Measuring the Impossible" (Archimedes/Zu Chongzhi/Aryabhata/Newton independently attacking the same pi/motion problem across centuries/continents). (3) **Relationship Graph** — people-and-their-drama as the primary explorable object (typed edges: rivalry, built-on, same-place, collaboration), e.g. Newton-Leibniz priority dispute, Gauss-Noether same-city-different-era, Ramanujan-Hardy collaboration, Boole-Turing built-on chain. All three preserve the existing voice-disciplined prose as an asset, not a replacement target — the rethink is about the surrounding data shape/interaction, not the writing quality (both reviewers explicitly praised the writing and said not to touch it).

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


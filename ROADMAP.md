# Roadmap

The line of attack. Sequence, dependencies, milestones. Self-contained so other models and humans can review.

## North star

A kid reads one story, clicks a link, and ends up in a real book or a real archive, surprised that the people who figured this out were just people.

Signal (decided 2026-07-10): kid clicks around the map for 10 minutes unprompted. Unaided exploration, not recall or retelling.

## Design constraints (locked)

- Math first. Not "everything humans have done." Math is the wedge.
- 20 entries is the MVP. Hit the number, then evaluate.
- Eras, not a slider. Named eras with descriptions are the navigation.
- AI drafts, you edit. AI never publishes alone.
- Voice rules in VOICE.md are enforced on every entry.
- Every entry has curated links.
- Map rule: plot where the discovery was first made public. Documented in SCHEMA.md.
- Reading age target: grade 7. Voice calibrated for this.

## Milestone sequence

### Phase 0 — Foundations (DONE, 2026-07-10)

- Project scaffolded via `new-project.ps1`. Location `C:\Learn\discovery-timeline`.
- PHILOSOPHY, ROADMAP, HOSTING, SCHEMA, VOICE written.
- Decision captured in brain: `decisions/discovery-timeline-mvp-shape`.
- Project anchor captured in brain: `projects/discovery-timeline`.

### Phase 1 — First 5 entries (DONE, 2026-07-10)

Pythagoras, Hypatia, al-Khwarizmi, Galois, Ramanujan. Five entries spanning 530 BCE to 1911, four continents, five eras of math. Each has a YAML, a story, and a curated set of links.

UI: era-tab navigation at the top, dots colored by era, story panel on the right, links section in each story.

### Phase 2 — Hit 20 entries

Goal: 20 entries end-to-end. Each goes through the editorial workflow in PHILOSOPHY.md.

Selection criteria for the next 15:

- Span history. We have 530 BCE to 1911. Add nothing in that range; fill in gaps. Confirmed candidate list (research completed 2026-07-10, see `.memory/context.md`): Archimedes (c. 250 BCE, Syracuse), Aryabhata (499 CE, Kusumapura/Patna), Bhaskara II (1150, Ujjain), Fibonacci (1202, Pisa), Newton (1687, London), Euler (1736, St Petersburg), Gauss (1796, Göttingen), Noether (1918, Göttingen), Turing (1936, Cambridge), Zu Chongzhi (c. 480 CE, Nanjing), Omar Khayyam (1070, Samarkand), George Boole (1854, London), Henri Poincaré (1895, Paris), Sofia Kovalevskaya (1888, Stockholm). That's 14 — close to the "next 15" target.
- Span geography. We have Italy, Egypt, Iraq, France, India. The candidate list above adds China, England, Germany, Russia/Sweden, Uzbekistan (Persianate world). **Correction: drop "Greece" as a literal gap** — no major ancient Greek mathematician's primary work happened in modern-day Greece. Euclid worked in Alexandria, Archimedes in Syracuse (Sicily), Pythagoras in Croton (Italy). Magna Graecia and Alexandria *were* the centers of Greek mathematics. Archimedes (Sicily) is the best available "Greek tradition" representative.
- Span field. We have geometry, algebra, group theory, number theory. The candidate list adds calculus (Newton), graph theory/topology precursor (Euler), topology (Poincaré), logic (Boole), and touches computation prehistory via Boole → Turing (not yet in the 14, but a natural future add).

Target cadence: 3 to 5 entries per working session. Editorial cadence is the bottleneck, not data entry.

### Phase 3 — North star test

After 20 entries ship, Sumit picks the north star signal and runs the test with the kid. Decide based on signal:

- Strong positive: scale to 50 entries, add second domain (physics, then biology).
- Weak positive: rework voice and pacing based on what the kid actually engaged with.
- Negative: pause and figure out what went wrong before adding more.

The MVP is not "we shipped 20 entries." The MVP is "we have signal on whether the format works for kids."

### Phase 4 — Second domain (gated on Phase 3)

If math wedge works, add physics. Same structure: 20 entries, same voice, same editorial workflow. Physics has its own cast (Galileo, Newton, Faraday, Maxwell, Curie, Einstein, Bohr, Feynman) and its own dramatic moments (Curie's notebooks still radioactive, Boltzmann's suicide, Einstein as a patent clerk).

Skip if Phase 3 is weak.

### Phase 5 — Public deploy

Deploy to Cloudflare Pages under a sumit-controlled domain. See HOSTING.md.

Triggers: 20 entries shipped, north star signal picked, kid has engaged.

### Phase 6 — Lifetime maintenance

Add 2 to 3 entries per month. Quarterly voice audit. Annual schema review. Re-check primary sources for link rot every 6 months.

The data layer is the asset. The website is one consumer. A printed book, YouTube series, school curriculum are downstream consumers.

## File-by-file guide for new contributors (human or model)

To add an entry:

1. Read PHILOSOPHY.md and VOICE.md.
2. Pick the discovery and person. Confirm first-public-location and date.
3. Find at least one strong source (book, paper, archive). Wikipedia is acceptable as a tertiary source, never the only source.
4. Find at least one linkable artifact: Internet Archive scan of the original work, MacTutor biography, arXiv preprint, journal archive.
5. AI drafts the story using the three-block format. Word count 100 to 200.
6. Voice pass against VOICE.md. Every entry.
7. Save YAML to `data/entries/<id>.yaml` and story to `data/stories/<id>.md`.
8. `python scripts/build.py` regenerates `site/data.json`.
9. Refresh the site.

To add an era:

1. Define it in `data/eras/<id>.yaml` with id, name, date range, order, color, description.
2. Add era reference to each entry that belongs to it.
3. `python scripts/build.py`.
4. Era appears in the navigation.

To change schema:

1. Update `SCHEMA.md` first.
2. Update `scripts/build.py` to validate the new field.
3. Migrate existing entries.
4. Bump a version note in `CHANGELOG.md` (start one if it does not exist).

## Open questions

These block progress and need answers before the relevant phase:

- **Reading age calibration.** Decided 2026-07-10: keep grade 7 default. Kid is in grade 5, reading ability tests at grade 6-7. Grade 7 is a deliberate stretch, not a mismatch to fix.
- **Era list finalization.** Currently 6 eras drafted. When entry #21 ships, do we add era #7 or stretch existing eras?
- **Link curation cadence.** Who updates links when sources move? Quarterly review is the proposed cadence. Decide before Phase 5.
- **Domain name.** Sumit's personal domain? A dedicated discovery-timeline subdomain? Pick before deploy.
- **Print edition.** Strong signal would justify a printed book from the same data. Trigger: 50 entries with stable voice. Decision deferred.

## Anti-goals

Things this project explicitly does not do:

- Cover every discipline. Math first, then physics if the wedge works.
- Be exhaustive. 20 entries is enough to test the format.
- Optimize for SEO or traffic. The audience is kids, not search engines.
- Use a CMS. The data lives in version-controlled YAML and markdown.
- Run a server. Static site only. Cloudflare Pages, GitHub Pages, or a folder on disk.
- Track users. No analytics. No cookies. No logins.
- Translate automatically. Stories are written in English with voice calibration for grade 7. If Hindi translation comes later, it's hand-done.

## Reviewing this doc

If you are a model or human reviewing this project:

- Read PHILOSOPHY.md for the why.
- Read SCHEMA.md for the data layer.
- Read VOICE.md for the editorial rules.
- Read HOSTING.md for the deployment plan.
- Read `brain/pages/projects/discovery-timeline.md` for current status.
- Read `brain/pages/decisions/discovery-timeline-mvp-shape.md` for the captured decisions and their reasoning.
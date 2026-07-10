# Philosophy

The thesis, the audience, the boundaries. Read this before reading anything else.

## The thesis

A timeline of human discovery where the human is the protagonist, not the idea. Most timelines start with "X happened in year Y." This one starts with "A person did something specific, and the idea followed from that."

The hook is always a human moment. Galois died at 20 the night before his duel. Hypatia was killed by a mob. Ramanujan had no formal training and mailed his theorems to England from a clerk's desk in India. The math comes second. The math is downstream of a life.

## The audience

Primary: kids ages 10 to 14 curious about how humans figured things out. The reading age target is grade 7 (ages 12 to 13). Stories are calibrated for that.

Secondary: parents and teachers who want to show kids that discovery is human work, not magic.

Tertiary: adults who want a quick, story-shaped way back into math history without reading a textbook.

## What this is not

**Not Wikipedia.** Wikipedia is encyclopedic, neutral, and exhaustive. It tells you what happened, when, and where. We tell you what it felt like to be the person who did it.

**Not Britannica.** Britannica lists achievements. We tell the moment.

**Not Britannica Kids.** Britannica Kids simplifies the achievement. We keep the human drama.

**Not a textbook.** No exercises. No proofs. No problem sets. The math is a character in the story, not the subject of the lesson.

**Not a "great men of math" tribute.** Intentionally global and intentionally diverse. Pythagoras, Hypatia, al-Khwarizmi, Galois, Ramanujan. The list will keep widening by century and continent.

**Not the shreehistory.com IHA site.** IHA is an interactive map dashboard for adults reading about Indian empires, with scholarly findings tabs and battle filters. We are not that. We are simpler. Map, eras, stories. Click a dot, read a story, follow a link.

## Why this shape

**Map + timeline + story** is the only format that shows all three of: where, when, who. Map alone loses chronology. Timeline alone loses geography. Encyclopedia entries lose both. Stories without coordinates float.

**Eras replace the slider.** A slider that scrubs through 2500 years is fun for 30 seconds and useless after that. Eras are how kids actually chunk history: "the Greeks did this, the Arabs did that, then it came to Europe." Named eras are the navigation.

**External links are first-class.** Every entry links to the original work, a strong biography, and a reliable encyclopedia article. We are a doorway, not a destination. The links let a curious kid leave the site and find the real artifacts: actual books, actual papers, actual letters.

## The editorial line

1. The hook is a specific human moment. Not "mathematics has long fascinated thinkers." Specific. Named. Located in time and place.
2. Name the real problem, where one exists. Not "he studied triangles" but "how do you mark a perfect right angle in a field with nothing but a rope." A kid should be able to picture the actual problem someone was stuck on, before the solution shows up. Not every entry has a clean practical problem (Hypatia's story is preservation under political collapse, not a solved problem) — don't force it where it doesn't fit.
3. The idea is plain language. No jargon left undefined. Show the method, not just the result: how did they actually solve it.
4. The unlocked is what came next, and where the idea got used first. Brief. Concrete.
5. Every entry has curated links. Primary sources preferred: original books via Internet Archive, biographical entries from MacTutor or Britannica, original papers via arXiv or journal archives. Where a hands-on version of the method exists (an applet, a manipulable diagram), link it as `try_it` — optional, never built in-house. This is not an exercise or problem set (see anti-goals); it's an outbound door, same as any other link.
6. Every entry is voice-checked against VOICE.md before publish.
7. Sumit edits every entry before it ships. AI drafts, you publish.

## What success looks like

Not traffic. Not a launch date. Success is a kid reading one story, clicking a link, and ending up in a real book or a real archive, surprised that the people who figured this out were just people.

## North star signal (decided 2026-07-10)

Kid clicks around the map for 10 minutes unprompted. Unaided exploration, not recall or retelling.

This is the signal Sumit will watch for after Phase 3 (20 entries shipped). If the kid opens the site and explores the map on her own for 10 minutes without Sumit directing, the format works.

## Reading age calibration (decided 2026-07-10)

Keep the grade 7 voice calibration. Kid is in grade 5, reading ability tests at grade 6-7. Grade 7 is a deliberate stretch, not a mismatch to fix.

This means voice has to stay disciplined. Short sentences. Define technical terms inline. No jargon padding. The grade 7 calibration is the upper bound of what works. Drift up from there will lose her.

## What failure looks like

AI slop. Stories that read like every other AI history site. Lists of three. "However." Em dashes. The whole point of this is voice. The moment the prose loses its voice, the project is dead.

## What to defend

**The map rule.** Plot where the discovery was first made public. Not where the person was born, not where the idea was eventually used. First publication. Single point. Document the rule's edge cases in SCHEMA.md.

**The hook first.** Story openings are the test. If the first sentence is a thesis, rewrite it. If it's "in the rich tapestry of," delete the whole entry.

**The links.** Every entry. Every time. No entries without links. The links are what make this trustworthy.

## What to change without asking

- Voice edits that tighten prose without losing accuracy.
- Link updates when sources move or go dead.
- Schema field additions that capture facts we already know.

## What to ask before doing

- Adding a new era (changes the navigation).
- Removing an era (might orphan entries).
- Changing the map rule (changes what the map means).
- Changing the reading age target (changes voice calibration).
- Any deployment that exposes user data. The MVP collects none.

## Related docs

- `ROADMAP.md` — line of attack, sequence of work, milestones.
- `HOSTING.md` — Cloudflare Pages deployment plan.
- `SCHEMA.md` — data layer specification.
- `VOICE.md` — voice rules for AI drafts and human edits.
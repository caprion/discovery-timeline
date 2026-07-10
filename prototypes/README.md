# Prototypes

Three tangential data-model explorations, built overnight 2026-07-10 in response
to the "I don't think the current site is interactive enough for kids" review.
Each is a standalone static demo (HTML/CSS/JS, no build step, no framework, no
backend) reusing real content from the 19 shipped entries in `data/`. None of
these touch or replace the live site in `site/` — they are throwaway spikes to
test a data shape, not production code.

Full context, the research report, and both model reviews (Opus + GPT-5.5) that
led to these three ideas are logged in `.memory/context.md` under "Deep-engagement
review pass (2026-07-10)".

## The three ideas

### 1. `case-file/` — the unit becomes a mystery, not an essay
Mystery question → clues revealed one tap at a time → one small guess with
instant feedback → the existing story as the "payoff" → typed links to other
cases. Built with Pythagoras, Galois, Turing. Run:
`python -m http.server 8930 --directory prototypes/case-file`

### 2. `problem-threads/` — the spine becomes a recurring question, not a century
Follows one live question ("How do you measure something that never ends?")
across Archimedes, Zu Chongzhi, Aryabhata, and Newton — includes a real,
working interactive recreation of Archimedes' polygon method (drag a slider,
watch the bounds squeeze toward pi). Run:
`python -m http.server 8931 --directory prototypes/problem-threads`

### 3. `relationship-graph/` — the object becomes people and their drama, not geography
Nine mathematicians as nodes, five typed edges (rivalry, built-on, same-place,
teamwork) — Newton/Leibniz, Gauss/Noether, Galois/Noether, Ramanujan/Hardy,
Boole/Turing. Tap a person or a connection to read the story. Run:
`python -m http.server 8932 --directory prototypes/relationship-graph`
(Note: relationship-graph's own server verification during build used port 8933.)

## How to read these

Each folder has a `NOTES.md` with an honest, unvarnished builder's critique —
not just what was built, but where it's weak, what's hardcoded, and whether the
underlying idea actually holds up at 19+ entries. Read those before deciding
which (if any) direction to invest in further. All three explicitly preserve the
existing story prose as an asset — none of them ask you to rewrite the writing,
only to change what surrounds it.

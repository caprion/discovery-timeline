# Case File prototype — build notes

## What this demonstrates

The "one discovery = one essay" unit is replaced with a five-beat flow:
a mystery question, clues revealed one tap at a time, one low-stakes
guess with instant feedback, then the original story as the payoff, then
typed links into the other two cases. Three real entries are wired up:
Pythagoras, Galois, Turing. Pure static HTML/CSS/JS, no build step, no
framework, no libraries. Open `index.html` directly or run
`python -m http.server`.

It uses the Indian Earth palette and Georgia/system-ui fonts, and is
tap-first: 44px targets, no hover-only interactions, single column that
reflows on a phone. Progress is kept per case, so following a connection
and coming back keeps your place.

## Placeholder vs. real content work

- Cases live in `data.js` as plain objects. Scaling to 19+ entries means
  authoring a mystery, 3-5 clues, one guess, and connections for each.
  That is writing, not a data migration.
- Artifacts are described placeholder boxes. No fake URLs. Real images
  need sourcing and rights.
- `payoff` prose is lifted almost verbatim from the story files, so the
  existing writing is reused, not thrown away.
- No map, era tabs, or YAML loading. This is a content-model spike.

## Honest critique

The clue reveal does add pull, and gating the story behind a guess makes
the payoff feel earned. But I am not fully sold. The guess is the weakest
beat: with three options and an obvious correct framing, a kid can skim
and pattern-match the button instead of thinking. And clues can feel like
a chopped-up essay unless each one ends on a hook.

Verdict: more engaging than the static panel, but the engagement comes
from the per-case authoring, not the mechanism. The template is cheap.
The content is not.

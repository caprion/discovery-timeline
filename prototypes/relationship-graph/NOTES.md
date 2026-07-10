# Relationship Graph: builder notes

## What this demonstrates

Nine mathematicians as circles, joined by typed, tappable links: rivalry,
built-on, same-place, and teamwork. Tap a person to highlight their links and
open a card with their date, one-line idea, and connections. Tap a line to read
the story of that link. Tap-only, no hover. One static HTML file plus CSS, a
plain data file, and hand-rolled SVG. No libraries, no build step, no physics
engine. Nodes are hand-placed on a 1000x700 canvas.

## Hardcoded / simplified

- Fixed node positions, not a force layout.
- Leibniz and Hardy are nodes but not full entries yet. Their bios come from
  general knowledge and are labeled "not a full story yet" in the card.
- Only five links, all real and documented.
- Edge-pill width is estimated from label length, not measured.

## Honest scaling problem

The graph looks connected because these eight people were chosen for their
links. Across the full 19+ entries this breaks. Most stories are single-person,
single-moment. Real, documented, kid-legible relationships exist for maybe a
third (the calculus feud, the Gottingen thread, Boole to Turing, Ramanujan and
Hardy). Many entries (Hypatia, al-Khwarizmi, Pythagoras) would sit as isolated
dots or link only through weak "same field" ties that are not dramatic. Full
scale needs a real `relationships` schema field and a research pass per pair.

## Is a graph right for ages 10-14?

Partly. The payoff, rivalries and mentors and "same room 100 years apart," is
our best material, and tapping a line for a story is a strong hook. But a
floating node graph is an adult data-viz habit, and a sparse one looks broken. I
would keep the relationships as content but rethink the container: show each
link as a captioned story pair reachable from both people, not as the front door.

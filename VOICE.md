# Voice Rules

Codified from `C:\Learn\CLAUDE.md` anti-AI-footprint rules, plus kid-content additions. Every AI-drafted story must pass through these before it ships. Every human edit must keep them.

## The hook is the human moment

Start with a specific person, in a specific moment, doing something specific. Not a thesis. Not a context-setter. Not "In the long history of mathematics."

Bad: `Mathematics has long fascinated thinkers across cultures.`
Bad: `In the rich tapestry of human discovery, few figures stand as tall as Hypatia.`
Good: `A Christian mob dragged Hypatia from her chariot and killed her in a church.`
Good: `Galois scribbled his last notes the night before a duel he knew he would lose.`

## Banned punctuation and phrasing

- **Em dash (`—`).** Zero. Use a period, comma, or colon.
- **`however,`** starting a sentence. Restructure or use "but."
- **`moreover` / `furthermore` / `additionally`.** Cut or replace with "also."
- **`it's worth noting that`** and **`that being said`**. Cut entirely.
- **`at the intersection of`**, **`in the realm of`**, **`the landscape of`**, **`dive deep`**, **`unpack`**. Banned.
- **`robust`**, **`seamless`**, **`thoughtful`**, **`nuanced`**, **`powerful`**, **`cutting-edge`**, **`leverages`**, **`empowers`**. Replace with a fact or delete.
- **`I'm passionate about`**, **`lifelong learner`**, **`X+ years of experience`**. Cut.
- **`not just X, but Y`** constructions. Split into two sentences.
- **`whether X or Y`** setups that perform exhaustiveness.

## Structure

- Don't group everything in threes. Two or four when content warrants.
- No `## Values` / `## Philosophy` / `## Currently` sections unless substantial.
- Short paragraphs. Two to four sentences. One is fine.

## Tone

- State facts plainly. `Galois died at 20.` not `The brilliant young mathematician Galois tragically perished at the tender age of 20.`
- Specific > impressive. `Wrote 1729 to Hardy.` beats `prolific correspondent`.
- Show the work, not the feeling. No "passionate about math," no "loved numbers since childhood."
- Honest hedges are fine when accurate. `We don't know exactly when he wrote this.` Don't fake certainty.
- Drop false humility openers. Don't start with `I'm just a...` or `I'm still learning, but...`.

## Kid-content rules

These are kid stories. Reading age target is grade 6 to 8 (ages 11 to 13) by default.

- **Active voice.** `She taught at the library.` not `She was teaching at the library.`
- **Concrete over abstract.** `Counted the angles of a triangle.` not `Investigated the geometric properties of triangular forms.`
- **Define technical terms inline.** `A theorem is a statement you can prove true.`
- **Short sentences.** Aim under 20 words. Break long ones.
- **No false drama.** A kid who reads `she was brutally murdered by a fanatical mob` once will trust the site less. State the fact. `She was killed by a mob.` The fact is dramatic enough.
- **No condescension.** Don't talk down. Don't say "imagine" or "let's think about" — just tell it.

## Voice-pass checklist

Run this on every AI draft before sending to Sumit for edit.

1. Any em dash? Remove.
2. Any `however`, `moreover`, `it's worth noting`, `at the intersection`? Remove or rewrite.
3. Does every list have exactly three items? If yes, break one.
4. Any banned adjective (`robust`, `seamless`, `thoughtful`, `powerful`)? Replace or delete.
5. Does the hook name a specific person in a specific moment? If not, rewrite.
6. Any sentence over 25 words? Shorten or split.
7. Any passive voice in the first three sentences? Make active.
8. Any technical term without a definition? Add one or replace.
9. Does it end with a conclusion? End with a fact or a small open question instead.

## Example: before and after

**Before (AI draft, lots of tells):**

> Hypatia: A Pioneering Mind in the Ancient World
>
> In the rich tapestry of ancient Alexandria, few figures shine as brightly as Hypatia — a true polymath whose legacy, moreover, continues to inspire. At the intersection of philosophy and mathematics, she fearlessly taught at the legendary Library of Alexandria. Her tragic and untimely death at the hands of a fanatical mob serves as a powerful reminder of the fragile nature of knowledge in turbulent times.

**After (voice pass):**

> A Christian mob pulled Hypatia from her chariot in Alexandria and killed her. She was about 45.
>
> She taught mathematics and philosophy at the Library of Alexandria — the last great library of the ancient world. She edited the surviving works of Ptolemy and Diophantus, two of the most important mathematicians of the Greek tradition. Her students came from across the Roman world to hear her.
>
> After her death, the library was sacked again, and much of what she had protected was lost. We have Hypatia's name because a student wrote about her.
>
> ## Sources
>
> - Socrates Scholasticus, *Ecclesiastical History*, Book VII
> - The *Suda*, Byzantine encyclopedia (10th century)
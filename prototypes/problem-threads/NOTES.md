# Problem Threads: builder's notes

## What this demonstrates

One thread, "How do you measure something that never ends?", followed across four people and 1900 years: Archimedes, Zu Chongzhi, Aryabhata, Newton. A kid taps a stop, reads what that person tried, how far they got, and a line pulling to the next stop. The last stop breaks the pattern on purpose: Newton stops chasing the number and invents calculus, showing a thread can jump into a different problem.

The interactive piece is honest, not decorative. The slider runs Archimedes' real method: inside and outside polygons drawn on a canvas, with the two bounds `n*sin(pi/n)` and `n*tan(pi/n)` squeezing toward pi. At 96 sides it lands on 3.1410 to 3.1427, his actual result. The digit strips make the progression concrete: 2 correct decimals, then 6, then 4. Accuracy did not march straight forward.

## Hardcoded vs. what scaling needs

Everything lives in `data.js` as one `THREAD` object. Text was hand-rewritten from the real story files, not pasted. To scale, generate one such object per thread from the YAML/markdown entries, plus a thread-membership field on each entry (one entry can sit on several threads). The polygon demo is bespoke to Archimedes. Other episodes would need their own optional widget or none. The rail and detail rendering already generalize to any episode count.

For the live site, threads and the era map should coexist as two lenses on the same entries, not a replacement. Map answers "where," threads answer "what question."

## Honest assessment

Threads beat eras because the spine is a live question a kid can hold, not a century label. But thread titles are still adult curation. Pick the wrong threads and you have rebuilt eras with better copy. The fix: keep threads few, phrased as kid questions, and always tied to a concrete "you try it" moment like this one.

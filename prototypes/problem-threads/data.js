/* Problem Threads prototype data.
 * One thread: the chase to pin down pi, a number that never ends.
 * Prose is rewritten for ages 10 to 14, following VOICE.md.
 * No build step. This file defines a single global: THREAD.
 */

const THREAD = {
  id: "measuring-the-impossible",
  question: "How do you measure something that never ends?",
  intro:
    "A circle has a curved edge. A ruler is straight. So how do you measure around a circle exactly? The answer is a number called pi. Pi is what you get when you divide the distance around a circle by the distance across it. Its digits go on forever with no pattern. For more than 1800 years, people on different continents chased it. None of them talked to each other. They were all hunting the same runaway number.",

  // pi to enough places to show who got how far
  piDecimals: "1415926535",

  episodes: [
    {
      id: "archimedes",
      name: "Archimedes",
      place: "Syracuse, Sicily",
      dateLabel: "c. 250 BCE",
      order: "First",
      lead: "Archimedes squeezed the circle between straight lines.",
      body: [
        "Archimedes could not measure a curve. So he drew shapes made of straight sides instead. He drew one shape inside the circle and one shape outside it. Now the circle was trapped between them.",
        "Then he kept adding sides. First a few, then more, then 96. With more sides, the two shapes hugged the circle tighter. Pi had to sit somewhere in the gap between them. He never got one exact number. He got a range, and he proved pi could not escape it."
      ],
      result: {
        headline: "He trapped it. He did not nail it.",
        detail: "He proved pi was more than 3.1408 and less than 3.1429.",
        correctDecimals: 2
      },
      // this episode carries the interactive polygon demo
      interactive: true,
      transition: "About 700 years later, on the other side of the world, someone got much closer."
    },
    {
      id: "zu-chongzhi",
      name: "Zu Chongzhi",
      place: "Jiankang, China (now Nanjing)",
      dateLabel: "c. 480 CE",
      order: "Next",
      lead: "Zu Chongzhi found a fraction so good Europe took 1000 years to catch up.",
      body: [
        "In China, Zu Chongzhi was a careful calculator. Better values of pi make better calendars and better maps of the sky. A tiny error in pi grows huge when you use it again and again. So he pushed for more accuracy than anyone before him.",
        "He found a fraction that was easy to remember and shockingly good: 355 divided by 113. Written out, that is 3.1415929. It is correct to six decimal places. His book was later lost, so we know the fraction from Chinese writers who copied it down."
      ],
      result: {
        headline: "3.1415929",
        detail: "Correct to six decimal places, from the fraction 355 / 113.",
        correctDecimals: 6
      },
      transition: "Nineteen years later, a 23-year-old in India wrote his answer as a poem."
    },
    {
      id: "aryabhata",
      name: "Aryabhata",
      place: "Kusumapura, India (now Patna)",
      dateLabel: "499 CE",
      order: "Then",
      lead: "Aryabhata wrote pi into a poem so kids could memorize it.",
      body: [
        "Aryabhata was 23. He wrote a whole book of math and astronomy in verse, as poetry, so students could learn it by heart. In one line he gave pi as 62832 divided by 20000. That is 3.1416, correct to four decimal places.",
        "He was solving real problems. Astronomers needed good numbers to track the sky. He packed his rules into short verses so they were easy to copy and teach. People still study his book 1500 years later."
      ],
      result: {
        headline: "3.1416",
        detail: "Correct to four decimal places, written in verse.",
        correctDecimals: 4
      },
      transition: "For centuries the chase stayed the same: grab more digits. Then someone changed the question completely."
    },
    {
      id: "newton",
      name: "Isaac Newton",
      place: "London, England",
      dateLabel: "1687",
      order: "The thread jumps",
      isTwist: true,
      lead: "Newton stopped chasing the number and chased the change instead.",
      body: [
        "Isaac Newton was not hunting pi. He was stuck on a different impossible thing: motion. How do you describe a planet that speeds up every single instant? A cannonball that curves the whole way down? Old geometry could not do it.",
        "So Newton built a new kind of math called calculus, the math of things that change smoothly. Instead of trapping a number between two shapes, calculus describes the change itself, directly. The circle chase and the motion chase were cousins. Both asked how to handle something that never sits still long enough to measure. Later, calculus even gave people brand new ways to compute pi, faster than any polygon."
      ],
      result: {
        headline: "A different kind of answer.",
        detail: "Do not approximate the number. Describe the change itself.",
        correctDecimals: 0
      },
      closing:
        "That is how a thread works. You follow one question across the world and across centuries. Sometimes it leaps into a completely different question and keeps right on going."
    }
  ]
};

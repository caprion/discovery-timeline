/*
 * Case File prototype data.
 * Each case reuses real content from the Discovery Timeline entries and stories.
 * Prose in `payoff` is lightly adapted from data/stories/*.md.
 * All clue text, mystery questions, and prompts are new, written to VOICE.md.
 */
const CASES = [
  {
    id: "pythagoras-530bce",
    name: "Pythagoras",
    dateLabel: "c. 530 BCE",
    place: "Croton, southern Italy",
    field: "Geometry",
    mystery:
      "A knotted rope could make a perfect square corner a thousand years before Pythagoras was born. So why does his name get all the credit?",
    clues: [
      {
        text:
          "Egyptian surveyors carried a loop of rope with 12 evenly spaced knots. Pulled into a triangle with sides of 3, 4, and 5 knots, one corner comes out perfectly square. They used it to rebuild field walls after the Nile flooded."
      },
      {
        text:
          "Builders in Egypt and Babylon used this trick for hundreds of years. It worked every time they tried it. But nobody had shown why it worked, or whether it worked for every right triangle."
      },
      {
        text:
          "Around 530 BCE, Pythagoras ran a strange school at Croton in southern Italy. His followers treated numbers almost like a religion. Some old stories even say they refused to eat beans.",
        artifact:
          "[A surveyor's knotted rope, looped into a 3-4-5 triangle. This is the oldest known way to make a right angle on demand.]"
      },
      {
        text:
          "Greek tradition credits Pythagoras or his school with a new kind of answer: a proof. A proof is an argument that shows something must be true every single time, not just in the cases you happened to test."
      }
    ],
    yourTurn: {
      prompt: "So what was Pythagoras's real breakthrough?",
      options: [
        {
          text: "He invented the rope trick.",
          correct: false,
          feedback:
            "Not quite. Surveyors were using the rope trick for centuries before Pythagoras was born."
        },
        {
          text: "He proved it works for every right triangle, not just handy examples.",
          correct: true,
          feedback:
            "Yes. Going from \"it works when we try it\" to \"it must always work\" is the whole idea of a proof. That leap changed math."
        },
        {
          text: "He measured a really big triangle.",
          correct: false,
          feedback:
            "One more measurement does not prove anything about every triangle. The trick was to argue, not to measure."
        }
      ]
    },
    payoff: [
      "An Egyptian surveyor pulls a rope tight after the Nile flood. With 12 knots spaced evenly, he can make a 3-4-5 triangle and lay out a clean right angle for a field wall.",
      "Builders and land measurers in Egypt and Babylon used that trick centuries before Pythagoras. The hard question was why it always worked, and whether every right triangle followed the same rule.",
      "Around 530 BCE, Pythagoras ran a strange school at Croton in southern Italy. His followers treated numbers almost like a religion, and later writers say they even banned beans. Greek tradition credits Pythagoras or his school with the big step: a proof. A proof is an argument that shows something must be true every time, not just in one useful case. For a right triangle, it says the square on the long side always equals the two smaller squares added together.",
      "That shift from handy rule to trusted proof helped turn geometry into a system. Surveying, building, astronomy, navigation, and later physics could use the idea with confidence."
    ],
    sources: [
      "Aristotle, Metaphysics (4th c. BCE), discusses Pythagoreans",
      "Iamblichus, On the Pythagorean Way of Life (3rd c. CE)",
      "MacTutor biography of Pythagoras"
    ],
    connections: [
      {
        toId: "turing-1936",
        text:
          "Pythagoras showed some things can be proved true forever. Turing later showed some things can never be settled at all. A strange twist on the same idea."
      },
      {
        toId: "galois-1832",
        text:
          "The Pythagoreans hunted for hidden patterns in numbers. Galois found hidden patterns too, buried inside equations."
      }
    ]
  },

  {
    id: "galois-1832",
    name: "Galois",
    dateLabel: "31 May 1832",
    place: "Paris, France",
    field: "Group theory",
    mystery: "How did a 20-year-old change math forever the night before he died?",
    clues: [
      {
        text:
          "On the night of 30 May 1832, Évariste Galois got ready for a duel with pistols. He was sure he would lose. So instead of sleeping, he stayed up writing."
      },
      {
        text:
          "He was not writing goodbyes. He was writing math, page after page, for a friend to pass on. In the margins he scribbled that he had no time left.",
        artifact:
          "[Galois's actual last letter, written the night before his duel. It is still kept in Paris today.]"
      },
      {
        text:
          "He was 20 years old. He had already failed the entrance exam to France's top school twice. Almost no one took his ideas seriously yet."
      },
      {
        text:
          "Mathematicians had recipes to solve equations up to degree four. For degree five, the quintic, they knew no such recipe existed. But they could not clearly explain which equations were solvable and which were hopeless."
      },
      {
        text:
          "Galois changed the question. Instead of hunting for one more recipe, he looked at the symmetries of an equation's answers: the ways the answers can swap places without breaking a hidden pattern."
      }
    ],
    yourTurn: {
      prompt:
        "Galois stopped asking \"what is the formula?\" and started asking something else. What did he study instead?",
      options: [
        {
          text: "Bigger and bigger numbers.",
          correct: false,
          feedback:
            "No. The size of the numbers was never the point. Galois was after the shape of the answers."
        },
        {
          text: "The symmetries: how the answers can swap places.",
          correct: true,
          feedback:
            "Right. He bundled those symmetries into what we now call a group. The shape of the group tells you whether the equation can be solved."
        },
        {
          text: "Faster ways to guess the answer.",
          correct: false,
          feedback:
            "Not this. Galois was not guessing. He found a way to know for certain which equations can be solved."
        }
      ]
    },
    payoff: [
      "The night before his duel, Évariste Galois filled page after page with math for a friend. He was 20, and he had already failed the entrance exam to France's top school twice.",
      "Mathematicians had formulas for quadratic, cubic, and quartic equations. By Galois's time, they knew the general quintic, a degree-five equation, had no such formula, but they still lacked a clear way to sort the solvable cases from the impossible ones.",
      "Galois changed the question. Instead of hunting for one more recipe, he studied the symmetries of an equation's roots, the ways its answers can swap places without breaking the hidden pattern. He bundled those symmetries into what we now call a group. Then he showed how the group tells you whether an equation can be solved by radicals, meaning by repeated roots like square roots and cube roots. Some equations can be unlocked that way. Some never can.",
      "That method became Galois theory, one of the foundations of modern algebra. It later shaped physics, chemistry, and cryptography, all from work most people only understood after his death."
    ],
    sources: [
      "Évariste Galois, \"Lettre testament\" (29 May 1832)",
      "Harold M. Edwards, Galois Theory (Springer, 1984)",
      "Tony Rothman, \"Genius and Biographers,\" American Mathematical Monthly (1982)"
    ],
    connections: [
      {
        toId: "turing-1936",
        text:
          "Galois showed some equations can never be solved with a neat formula. Turing later showed some questions can never be answered by any machine. Different problems, same shock: some limits cannot be crossed."
      },
      {
        toId: "pythagoras-530bce",
        text:
          "Galois trusted proof, the tool the Greeks helped build. See where that idea started with Pythagoras."
      }
    ]
  },

  {
    id: "turing-1936",
    name: "Turing",
    dateLabel: "1936",
    place: "Cambridge, England",
    field: "Logic and computation",
    mystery:
      "How do you prove what no machine could ever do, using a machine that was never built?",
    clues: [
      {
        text:
          "In 1936, Alan Turing was 24 and sitting in Cambridge. He imagined a machine that did not exist: just a long paper tape, a head that reads and writes symbols, and a short list of rules."
      },
      {
        text:
          "People had a big hope. Maybe there was one fixed method, like a perfect recipe, that could decide the answer to every math question. Yes or no, every time."
      },
      {
        text:
          "To test that hope, Turing first had to pin down what a method even is. His tape machine did the job. Anything a step-by-step method can do, his machine can do too.",
        artifact:
          "[A page from Turing's 1936 paper \"On Computable Numbers.\" Some people call it the birth certificate of the computer.]"
      },
      {
        text:
          "Then he proved the bad news for the dreamers. Some questions can never be settled by any such machine. They are undecidable. No recipe will ever crack them all."
      }
    ],
    yourTurn: {
      prompt:
        "Turing's imaginary machine turned out to describe something you probably used today. What was it?",
      options: [
        {
          text: "The telephone.",
          correct: false,
          feedback:
            "Not this one. A phone call carries your voice, but it does not follow Turing's rules for computing."
        },
        {
          text: "The computer.",
          correct: true,
          feedback:
            "Yes. Every phone, laptop, and game console is a richer version of the paper machine Turing dreamed up."
        },
        {
          text: "The calculator watch.",
          correct: false,
          feedback:
            "Close, but too small. Turing described the idea behind every computer, not just one gadget."
        }
      ]
    },
    payoff: [
      "At 24, Alan Turing sat in Cambridge and imagined a machine that did not exist. It was simple: a tape, a reading head, and a list of rules. From that imaginary machine, he built one of the most important ideas of the modern world.",
      "The problem came from logic. Could there be a fixed method that decides every mathematical question, like a perfect recipe that always tells you yes or no? Many people hoped so.",
      "Turing answered by defining what a mechanical method really is. His machine reads one symbol, changes it, moves left or right, and repeats. Because the rules are exact, the machine captures the idea of computation itself. Then Turing showed that some questions can never be settled by any such machine. They are undecidable, which means no algorithm can solve them all.",
      "Every real computer is richer than Turing's paper machine. But the basic idea still sits underneath them. Computer science begins with a machine first built in thought.",
      "Turing's own story did not end well. In 1952, British police charged him under a law that made homosexuality a crime, and the court forced a medical treatment on him instead of prison. Two years later he died from cyanide poisoning, ruled a suicide. Britain did not apologize until decades afterward. The mind that had just invented the idea of a computer was treated as a criminal by the country he lived in."
    ],
    sources: [
      "Alan M. Turing, \"On Computable Numbers,\" Proceedings of the London Mathematical Society (1936)",
      "Andrew Hodges, Alan Turing: The Enigma (Simon and Schuster, 1983)",
      "B. Jack Copeland, ed., The Essential Turing (Oxford University Press, 2004)"
    ],
    connections: [
      {
        toId: "galois-1832",
        text:
          "Turing found a hard limit: some questions no machine can answer. Galois found a limit too: some equations no formula can solve."
      },
      {
        toId: "pythagoras-530bce",
        text:
          "Turing's whole argument rests on proof. The Greeks helped invent that tool. Meet Pythagoras."
      }
    ]
  }
];

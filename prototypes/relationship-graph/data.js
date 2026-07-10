// Relationship Graph data. Plain JS, no build step.
// Positions (x, y) are hand-placed on a 1000 x 700 SVG canvas.

const EDGE_TYPES = {
  "rivalry": {
    label: "Rivalry",
    color: "#c2452d",
    dash: "9 7",
    arrow: false,
    blurb: "Argued over who was first"
  },
  "built-on": {
    label: "Built on",
    color: "#1a5c4c",
    dash: null,
    arrow: true,
    blurb: "One idea grew out of another"
  },
  "same-place": {
    label: "Same place",
    color: "#c4a67d",
    dash: "2 9",
    arrow: false,
    blurb: "Same city, different time"
  },
  "collaboration": {
    label: "Teamwork",
    color: "#8b7560",
    dash: null,
    arrow: false,
    blurb: "Solved things together"
  }
};

const PEOPLE = [
  {
    id: "newton",
    name: "Isaac Newton",
    short: "Newton",
    monogram: "IN",
    x: 175, y: 140,
    dateLabel: "1687",
    idea: "Used calculus, the math of change, to explain motion and gravity in his book the Principia.",
    bio: "Isaac Newton built calculus while hiding from the plague at his family farm, then kept it private for about twenty years.",
    entry: "newton-1687"
  },
  {
    id: "leibniz",
    name: "Gottfried Leibniz",
    short: "Leibniz",
    monogram: "GL",
    x: 400, y: 115,
    dateLabel: "1684",
    idea: "Invented calculus on his own and published first, in Leipzig in 1684.",
    bio: "Gottfried Leibniz was a German thinker who worked out calculus by himself. The notation you use in class, like dy/dx, is his.",
    stub: true
  },
  {
    id: "gauss",
    name: "Carl Friedrich Gauss",
    short: "Gauss",
    monogram: "CG",
    x: 650, y: 150,
    dateLabel: "1796",
    idea: "At 18, found how to build a perfect 17-sided shape with only a compass and straightedge.",
    bio: "Carl Friedrich Gauss solved a 2000-year-old geometry puzzle at 18 and decided that morning to become a mathematician.",
    entry: "gauss-1796"
  },
  {
    id: "noether",
    name: "Emmy Noether",
    short: "Noether",
    monogram: "EN",
    x: 835, y: 305,
    dateLabel: "1918",
    idea: "Proved that every symmetry in nature matches a conservation law, like energy that never just disappears.",
    bio: "Emmy Noether taught under a man's name because Germany would not hire her, and still proved one of the deepest ideas in physics.",
    entry: "noether-1918"
  },
  {
    id: "galois",
    name: "Evariste Galois",
    short: "Galois",
    monogram: "EG",
    x: 600, y: 400,
    dateLabel: "1832",
    idea: "Invented group theory, the math of symmetry, in a letter written the night before a duel.",
    bio: "Evariste Galois wrote pages of new math the night before a duel. He died the next morning at 20.",
    entry: "galois-1832"
  },
  {
    id: "ramanujan",
    name: "Srinivasa Ramanujan",
    short: "Ramanujan",
    monogram: "SR",
    x: 150, y: 385,
    dateLabel: "1913",
    idea: "Taught himself from one book and found thousands of new formulas in number theory.",
    bio: "Srinivasa Ramanujan worked as a clerk in India and mailed pages of strange new formulas to England.",
    entry: "ramanujan-1913"
  },
  {
    id: "hardy",
    name: "G. H. Hardy",
    short: "Hardy",
    monogram: "GH",
    x: 340, y: 480,
    dateLabel: "1913",
    idea: "A leading English mathematician who saw the genius in Ramanujan's letter.",
    bio: "G. H. Hardy taught at Cambridge. He read Ramanujan's letter, believed it, and brought him to England.",
    stub: true
  },
  {
    id: "boole",
    name: "George Boole",
    short: "Boole",
    monogram: "GB",
    x: 520, y: 565,
    dateLabel: "1854",
    idea: "Turned true and false into algebra, with values like 0 and 1 and operations like AND, OR, and NOT.",
    bio: "George Boole, a self-taught shoemaker's son, wrote a book arguing that thinking itself could be written as arithmetic.",
    entry: "boole-1854"
  },
  {
    id: "turing",
    name: "Alan Turing",
    short: "Turing",
    monogram: "AT",
    x: 765, y: 540,
    dateLabel: "1936",
    idea: "Imagined a simple machine and used it to prove what no computer can ever solve.",
    bio: "At 24, Alan Turing pictured a machine that did not exist and gave computer science its starting model.",
    entry: "turing-1936"
  }
];

const EDGES = [
  {
    id: "newton-leibniz",
    source: "newton",
    target: "leibniz",
    type: "rivalry",
    label: "Both invented calculus around the same time. They spent years arguing about who was first. Newton finished first but Leibniz published first."
  },
  {
    id: "galois-noether",
    source: "galois",
    target: "noether",
    type: "built-on",
    label: "Noether took Galois's idea of symmetry and used it to explain why energy and momentum never just disappear."
  },
  {
    id: "gauss-noether",
    source: "gauss",
    target: "noether",
    type: "same-place",
    label: "Both worked in Gottingen, Germany, 122 years apart. Same city, two different revolutions in math."
  },
  {
    id: "ramanujan-hardy",
    source: "ramanujan",
    target: "hardy",
    type: "collaboration",
    label: "Hardy read Ramanujan's letter from India and brought him to Cambridge. Together they proved things neither could alone."
  },
  {
    id: "boole-turing",
    source: "boole",
    target: "turing",
    type: "built-on",
    label: "Boole turned true and false into algebra. Eighty years later, Turing used that same logic to describe what a machine could compute."
  }
];

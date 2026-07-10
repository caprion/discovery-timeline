/*
 * Case File prototype logic. Vanilla JS, no dependencies.
 * Flow per case: mystery -> reveal clues one at a time -> your turn (guess) ->
 * payoff (the real story) -> connections to other cases.
 * Progress is kept per case in memory, so jumping between cases does not reset it.
 */
(function () {
  "use strict";

  var navEl = document.getElementById("case-nav");
  var viewEl = document.getElementById("case-view");

  // Per-case progress: how many clues shown, and which option was chosen.
  var progress = {};
  CASES.forEach(function (c) {
    progress[c.id] = { cluesShown: 0, chosenIndex: null };
  });

  function findCase(id) {
    for (var i = 0; i < CASES.length; i++) {
      if (CASES[i].id === id) return CASES[i];
    }
    return null;
  }

  function currentId() {
    var id = (location.hash || "").replace(/^#/, "");
    return findCase(id) ? id : CASES[0].id;
  }

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function isSolved(id) {
    return progress[id].chosenIndex !== null;
  }

  function renderNav(activeId) {
    navEl.innerHTML = "";
    CASES.forEach(function (c) {
      var chip = el("button", "case-chip");
      chip.type = "button";
      if (c.id === activeId) chip.classList.add("active");
      if (isSolved(c.id)) chip.classList.add("solved");
      chip.appendChild(el("span", null, c.name));
      chip.appendChild(el("span", "chip-date", c.dateLabel));
      chip.addEventListener("click", function () {
        location.hash = c.id;
      });
      navEl.appendChild(chip);
    });
  }

  function renderClues(c, parent) {
    var state = progress[c.id];
    parent.appendChild(el("p", "section-label", "The clues"));

    var list = el("div", "clue-list");
    parent.appendChild(list);

    for (var i = 0; i < state.cluesShown; i++) {
      list.appendChild(buildClue(c.clues[i], i));
    }

    if (state.cluesShown < c.clues.length) {
      var row = el("div", "btn-row");
      var label =
        state.cluesShown === 0
          ? "Reveal the first clue"
          : "Next clue (" + (state.cluesShown + 1) + " of " + c.clues.length + ")";
      var btn = el("button", "btn", label);
      btn.type = "button";
      btn.addEventListener("click", function () {
        state.cluesShown += 1;
        render();
        var clues = document.querySelectorAll(".clue");
        if (clues.length) clues[clues.length - 1].scrollIntoView({ behavior: "smooth", block: "center" });
      });
      row.appendChild(btn);
      parent.appendChild(row);
    }
  }

  function buildClue(clue, index) {
    var box = el("div", "clue");
    box.appendChild(el("span", "clue-num", "Clue " + (index + 1)));
    box.appendChild(el("p", null, clue.text));
    if (clue.artifact) {
      box.appendChild(el("div", "artifact", clue.artifact));
    }
    return box;
  }

  function renderYourTurn(c, parent) {
    var state = progress[c.id];
    parent.appendChild(el("p", "section-label", "Your turn"));

    var card = el("div", "your-turn");
    card.appendChild(el("p", "prompt", c.yourTurn.prompt));

    var opts = el("div", "options");
    c.yourTurn.options.forEach(function (opt, idx) {
      var btn = el("button", "option", opt.text);
      btn.type = "button";

      if (state.chosenIndex !== null) {
        btn.disabled = true;
        if (idx === state.chosenIndex) {
          btn.classList.add(opt.correct ? "chosen-correct" : "chosen-wrong");
        } else if (opt.correct) {
          btn.classList.add("reveal-correct");
        }
      } else {
        btn.addEventListener("click", function () {
          state.chosenIndex = idx;
          render();
        });
      }
      opts.appendChild(btn);
    });
    card.appendChild(opts);

    if (state.chosenIndex !== null) {
      var chosen = c.yourTurn.options[state.chosenIndex];
      var fb = el("div", "feedback " + (chosen.correct ? "good" : "try"), chosen.feedback);
      card.appendChild(fb);

      var row = el("div", "btn-row");
      var read = el("button", "btn", "Read what really happened");
      read.type = "button";
      read.addEventListener("click", function () {
        state.showPayoff = true;
        render();
        var p = document.querySelector(".payoff");
        if (p) p.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      // Only offer the payoff button until the payoff is open.
      if (!state.showPayoff) {
        row.appendChild(read);
        card.appendChild(row);
      }
    }

    parent.appendChild(card);
  }

  function renderPayoff(c, parent) {
    var payoff = el("div", "payoff");
    payoff.appendChild(el("h2", null, "What really happened"));
    c.payoff.forEach(function (para) {
      payoff.appendChild(el("p", null, para));
    });

    if (c.sources && c.sources.length) {
      var src = el("div", "sources");
      src.appendChild(el("p", "section-label", "Sources"));
      var ul = el("ul");
      c.sources.forEach(function (s) {
        ul.appendChild(el("li", null, s));
      });
      src.appendChild(ul);
      payoff.appendChild(src);
    }
    parent.appendChild(payoff);
  }

  function renderConnections(c, parent) {
    if (!c.connections || !c.connections.length) return;
    var wrap = el("div", "connections");
    wrap.appendChild(el("p", "section-label", "Follow the thread"));
    c.connections.forEach(function (conn) {
      var target = findCase(conn.toId);
      if (!target) return;
      var card = el("button", "connection-card");
      card.type = "button";
      card.appendChild(el("span", null, conn.text));
      card.appendChild(el("span", "to", "Open the " + target.name + " case"));
      card.addEventListener("click", function () {
        location.hash = target.id;
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
      wrap.appendChild(card);
    });
    parent.appendChild(wrap);
  }

  function render() {
    var id = currentId();
    var c = findCase(id);
    var state = progress[id];

    renderNav(id);

    viewEl.innerHTML = "";

    viewEl.appendChild(el("p", "case-tag", "Case " + (CASES.indexOf(c) + 1) + " of " + CASES.length));
    viewEl.appendChild(el("h2", "mystery", c.mystery));

    var meta = el("p", "case-meta", c.place + " \u00b7 " + c.dateLabel);
    var pill = el("span", "field-pill", c.field);
    meta.appendChild(pill);
    viewEl.appendChild(meta);

    renderClues(c, viewEl);

    // Your turn appears once every clue has been read.
    if (state.cluesShown >= c.clues.length) {
      renderYourTurn(c, viewEl);
    }

    // Payoff and connections appear once the reader opens the payoff.
    if (state.showPayoff) {
      renderPayoff(c, viewEl);
      renderConnections(c, viewEl);
    }
  }

  window.addEventListener("hashchange", function () {
    render();
    window.scrollTo({ top: 0 });
  });

  render();
})();

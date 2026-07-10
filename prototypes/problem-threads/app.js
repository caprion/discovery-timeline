/* Problem Threads prototype logic. Vanilla JS, no libraries.
 * Renders the thread rail, the detail panel, the digit-accuracy strip,
 * and the interactive polygon demo (Archimedes' actual method).
 */
(function () {
  "use strict";

  var railEl = document.getElementById("rail");
  var detailEl = document.getElementById("detail");
  var introEl = document.getElementById("thread-intro");
  var questionEl = document.getElementById("thread-question");

  var selected = 0;

  // ---- header ----
  questionEl.textContent = THREAD.question;
  // wrap the word "pi" in the intro so we can flag it as a defined term
  introEl.innerHTML = THREAD.intro.replace(
    "called pi",
    'called <span class="term">pi</span>'
  );

  // ---- rail nodes ----
  function buildRail() {
    THREAD.episodes.forEach(function (ep, i) {
      var node = document.createElement("button");
      node.className = "node" + (ep.isTwist ? " twist" : "");
      node.setAttribute("role", "tab");
      node.setAttribute("aria-selected", i === selected ? "true" : "false");
      node.setAttribute("aria-controls", "episode-panel");
      node.dataset.index = String(i);
      node.innerHTML =
        '<span class="dot" aria-hidden="true"></span>' +
        '<span class="card">' +
        '<span class="n-date">' + escapeHtml(ep.dateLabel) + "</span>" +
        '<span class="n-name">' + escapeHtml(ep.name) + "</span>" +
        '<span class="n-place">' + escapeHtml(shortPlace(ep.place)) + "</span>" +
        "</span>";
      node.addEventListener("click", function () {
        select(i);
      });
      railEl.appendChild(node);
    });
  }

  function shortPlace(place) {
    // keep the city, drop the parenthetical for the small rail card
    return place.split(" (")[0];
  }

  function updateRailSelection() {
    var nodes = railEl.querySelectorAll(".node");
    nodes.forEach(function (n) {
      var isSel = Number(n.dataset.index) === selected;
      n.setAttribute("aria-selected", isSel ? "true" : "false");
    });
  }

  // ---- detail panel ----
  function renderDetail() {
    var ep = THREAD.episodes[selected];
    var html = "";

    html += '<article class="episode' + (ep.isTwist ? " twist" : "") + '" id="episode-panel">';
    html += '<span class="order-tag">' + escapeHtml(ep.order) + "</span>";
    html += "<h2>" + escapeHtml(ep.name) + "</h2>";
    html += '<p class="where-when">' + escapeHtml(ep.place) + " &middot; " + escapeHtml(ep.dateLabel) + "</p>";
    html += '<p class="lead">' + escapeHtml(ep.lead) + "</p>";

    html += '<div class="body">';
    ep.body.forEach(function (p) {
      html += "<p>" + escapeHtml(p) + "</p>";
    });
    html += "</div>";

    // interactive demo slot (filled after insertion so canvas exists)
    if (ep.interactive) {
      html += demoMarkup();
    }

    // result block
    html += '<div class="result">';
    html += '<p class="r-headline">' + escapeHtml(ep.result.headline) + "</p>";
    html += '<p class="r-detail">' + escapeHtml(ep.result.detail) + "</p>";
    html += digitStrip(ep.result.correctDecimals, ep.isTwist);
    html += "</div>";

    // transition or closing
    if (ep.closing) {
      html += '<div class="closing">' + escapeHtml(ep.closing) + "</div>";
    } else if (ep.transition) {
      html += '<div class="transition">' + escapeHtml(ep.transition);
      html += '<span class="next-cue"></span>';
      html += '<button class="next-btn" type="button" data-next="1">See what happened next</button>';
      html += "</div>";
    }

    html += "</article>";
    detailEl.innerHTML = html;

    // wire the "next" button
    var nextBtn = detailEl.querySelector("[data-next]");
    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        if (selected < THREAD.episodes.length - 1) {
          select(selected + 1);
        }
      });
    }

    // start the polygon demo if present
    if (ep.interactive) {
      initPolyDemo();
    }

    // bring the panel into view on small screens after a rail tap
    if (window.innerWidth < 700) {
      detailEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  // digit strip: shows pi's digits, highlighting how many decimals were correct
  function digitStrip(correct, isTwist) {
    var decs = THREAD.piDecimals;
    if (!correct || correct <= 0) {
      return (
        '<p class="digit-caption">Not a number this time. This answer was a new tool, calculus.</p>'
      );
    }
    var out = '<div class="digits" aria-label="Digits of pi this person got right">';
    out += '<span class="d-lead">3.</span>';
    for (var i = 0; i < decs.length; i++) {
      var cls = i < correct ? "d-known" : "d-unknown";
      out += '<span class="' + cls + '">' + decs.charAt(i) + "</span>";
    }
    out += "&hellip;</div>";
    var word = correct === 1 ? "place" : "places";
    out +=
      '<p class="digit-caption">Green shows the ' +
      correct +
      " decimal " +
      word +
      " they got right. Pi keeps going forever after that.</p>";
    return out;
  }

  // ---- interactive polygon demo (Archimedes) ----
  function demoMarkup() {
    return (
      '<div class="demo">' +
      "<h3>You try it: squeeze the circle</h3>" +
      '<p class="demo-hint">Drag the slider to add sides. Watch the inside shape and the outside shape close in on pi.</p>' +
      '<div class="demo-canvas-wrap"><canvas id="poly-canvas" width="520" height="520"></canvas></div>' +
      '<div class="legend">' +
      '<span><i class="swatch inside"></i>inside shape (too small)</span>' +
      '<span><i class="swatch outside"></i>outside shape (too big)</span>' +
      "</div>" +
      '<div class="demo-controls">' +
      '<label for="sides-slider">Sides: <span class="sides-count" id="sides-count">6</span></label>' +
      '<input type="range" id="sides-slider" min="3" max="96" step="1" value="6" ' +
      'aria-describedby="demo-note" />' +
      '<div class="demo-readout">' +
      '<div class="readout-box low"><span class="rb-label">Pi is more than</span>' +
      '<span class="rb-value" id="low-val">3.000</span></div>' +
      '<div class="readout-box high"><span class="rb-label">Pi is less than</span>' +
      '<span class="rb-value" id="high-val">3.464</span></div>' +
      "</div>" +
      '<p class="demo-note" id="demo-note"></p>' +
      "</div>" +
      "</div>"
    );
  }

  function initPolyDemo() {
    var canvas = document.getElementById("poly-canvas");
    var slider = document.getElementById("sides-slider");
    var sidesCount = document.getElementById("sides-count");
    var lowVal = document.getElementById("low-val");
    var highVal = document.getElementById("high-val");
    var note = document.getElementById("demo-note");
    if (!canvas || !slider) return;

    var ctx = canvas.getContext("2d");
    // crisp on high-density screens
    var dpr = window.devicePixelRatio || 1;
    var cssSize = 520;
    canvas.width = cssSize * dpr;
    canvas.height = cssSize * dpr;
    ctx.scale(dpr, dpr);

    var styles = getComputedStyle(document.documentElement);
    var colInside = styles.getPropertyValue("--action").trim() || "#1a5c4c";
    var colOutside = styles.getPropertyValue("--accent").trim() || "#c2452d";
    var colCircle = styles.getPropertyValue("--tertiary").trim() || "#c4a67d";

    function draw(n) {
      var cx = cssSize / 2;
      var cy = cssSize / 2;
      var R = 150; // circle radius in css px

      ctx.clearRect(0, 0, cssSize, cssSize);

      // the circle
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.lineWidth = 6;
      ctx.strokeStyle = colCircle;
      ctx.stroke();

      // circumscribed (outside) polygon: vertices at R / cos(pi/n)
      drawPolygon(n, R / Math.cos(Math.PI / n), Math.PI / n, colOutside, 3, cx, cy);
      // inscribed (inside) polygon: vertices on the circle
      drawPolygon(n, R, -Math.PI / 2, colInside, 3, cx, cy);
    }

    function drawPolygon(n, radius, rot, color, width, cx, cy) {
      ctx.beginPath();
      for (var k = 0; k < n; k++) {
        var a = rot + (k * 2 * Math.PI) / n;
        var x = cx + radius * Math.cos(a);
        var y = cy + radius * Math.sin(a);
        if (k === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.lineWidth = width;
      ctx.strokeStyle = color;
      ctx.stroke();
    }

    function update() {
      var n = parseInt(slider.value, 10);
      sidesCount.textContent = String(n);
      // Archimedes' bounds for a unit circle:
      // inside perimeter / diameter = n * sin(pi/n)
      // outside perimeter / diameter = n * tan(pi/n)
      var low = n * Math.sin(Math.PI / n);
      var high = n * Math.tan(Math.PI / n);
      lowVal.textContent = low.toFixed(4);
      highVal.textContent = high.toFixed(4);

      var gap = high - low;
      if (n >= 96) {
        note.textContent =
          "96 sides. This is where Archimedes stopped. The gap is tiny now, and pi is trapped inside it near 3.1416.";
      } else if (gap < 0.01) {
        note.textContent = "The gap is closing. Pi is squeezed between these two numbers.";
      } else {
        note.textContent = "The gap between the two numbers is " + gap.toFixed(3) + ". Add more sides to shrink it.";
      }
      draw(n);
    }

    slider.addEventListener("input", update);
    update();
  }

  // ---- selection ----
  function select(i) {
    selected = i;
    updateRailSelection();
    renderDetail();
  }

  // ---- utils ----
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  // ---- boot ----
  buildRail();
  renderDetail();
})();

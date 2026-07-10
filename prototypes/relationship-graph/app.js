(function () {
  "use strict";

  var SVG_NS = "http://www.w3.org/2000/svg";
  var NODE_R = 40;

  var svg = document.getElementById("graph");
  var edgesLayer = document.getElementById("edges-layer");
  var nodesLayer = document.getElementById("nodes-layer");
  var backdrop = document.getElementById("backdrop");
  var legendEl = document.getElementById("legend");
  var detailEl = document.getElementById("detail");

  var peopleById = {};
  PEOPLE.forEach(function (p) { peopleById[p.id] = p; });

  // Precompute, for each person, the edges that touch them.
  var edgesByPerson = {};
  PEOPLE.forEach(function (p) { edgesByPerson[p.id] = []; });
  EDGES.forEach(function (e) {
    edgesByPerson[e.source].push(e);
    edgesByPerson[e.target].push(e);
  });

  var edgeEls = {}; // edge id -> { group, line, hit, pillBox, pillText }
  var nodeEls = {}; // person id -> group

  // { kind: "none" | "node" | "edge", id: string }
  var state = { kind: "none", id: null };

  function el(name, attrs) {
    var node = document.createElementNS(SVG_NS, name);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        node.setAttribute(k, attrs[k]);
      });
    }
    return node;
  }

  function otherEnd(edge, personId) {
    return edge.source === personId ? edge.target : edge.source;
  }

  // ---- Legend ----
  function buildLegend() {
    Object.keys(EDGE_TYPES).forEach(function (key) {
      var t = EDGE_TYPES[key];
      var item = document.createElement("div");
      item.className = "legend-item";

      var swatch = document.createElement("span");
      swatch.className = "legend-swatch";
      swatch.style.borderTopColor = t.color;
      swatch.style.borderTopStyle = t.dash ? "dotted" : "solid";
      item.appendChild(swatch);

      var name = document.createElement("span");
      name.className = "legend-name";
      name.textContent = t.label;
      item.appendChild(name);

      var blurb = document.createElement("span");
      blurb.className = "legend-blurb";
      blurb.textContent = t.blurb;
      item.appendChild(blurb);

      legendEl.appendChild(item);
    });
  }

  // ---- Edge geometry ----
  // Returns endpoints trimmed to the edge of each circle so lines and
  // arrowheads meet the circle boundary, not the center.
  function endpoints(edge) {
    var s = peopleById[edge.source];
    var t = peopleById[edge.target];
    var dx = t.x - s.x;
    var dy = t.y - s.y;
    var len = Math.sqrt(dx * dx + dy * dy) || 1;
    var ux = dx / len;
    var uy = dy / len;
    var type = EDGE_TYPES[edge.type];
    var targetPad = type.arrow ? NODE_R + 9 : NODE_R + 2;
    return {
      x1: s.x + ux * (NODE_R + 2),
      y1: s.y + uy * (NODE_R + 2),
      x2: t.x - ux * targetPad,
      y2: t.y - uy * targetPad,
      mx: (s.x + t.x) / 2,
      my: (s.y + t.y) / 2
    };
  }

  function buildEdges() {
    EDGES.forEach(function (edge) {
      var type = EDGE_TYPES[edge.type];
      var geo = endpoints(edge);

      var group = el("g", { "class": "edge-group" });
      group.setAttribute("data-edge", edge.id);

      var line = el("line", {
        "class": "edge-line",
        x1: geo.x1, y1: geo.y1, x2: geo.x2, y2: geo.y2,
        stroke: type.color
      });
      if (type.dash) line.setAttribute("stroke-dasharray", type.dash);
      if (type.arrow) line.setAttribute("marker-end", "url(#arrow)");
      group.appendChild(line);

      var hit = el("line", {
        "class": "edge-hit",
        x1: geo.x1, y1: geo.y1, x2: geo.x2, y2: geo.y2,
        tabindex: "0", role: "button"
      });
      hit.setAttribute("aria-label",
        "Connection between " + peopleById[edge.source].short +
        " and " + peopleById[edge.target].short);
      group.appendChild(hit);

      // Tappable label pill at the midpoint.
      var text = el("text", {
        "class": "edge-pill-text",
        x: geo.mx, y: geo.my, fill: type.color
      });
      text.textContent = type.label;
      // Estimate pill width from label length.
      var w = type.label.length * 9 + 22;
      var h = 26;
      var box = el("rect", {
        "class": "edge-pill-box",
        x: geo.mx - w / 2, y: geo.my - h / 2,
        width: w, height: h
      });
      group.appendChild(box);
      group.appendChild(text);

      function open(ev) {
        ev.stopPropagation();
        selectEdge(edge.id);
      }
      hit.addEventListener("click", open);
      box.addEventListener("click", open);
      text.addEventListener("click", open);
      hit.addEventListener("keydown", function (ev) {
        if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); open(ev); }
      });

      edgesLayer.appendChild(group);
      edgeEls[edge.id] = { group: group, line: line, box: box, text: text };
    });
  }

  function buildNodes() {
    PEOPLE.forEach(function (p) {
      var group = el("g", {
        "class": "node", tabindex: "0", role: "button",
        "aria-label": p.name + ", " + p.dateLabel
      });
      group.setAttribute("data-person", p.id);

      group.appendChild(el("circle", {
        "class": "node-circle", cx: p.x, cy: p.y, r: NODE_R
      }));

      var mono = el("text", { "class": "node-mono", x: p.x, y: p.y });
      mono.textContent = p.monogram;
      group.appendChild(mono);

      var label = el("text", {
        "class": "node-label", x: p.x, y: p.y + NODE_R + 22
      });
      label.textContent = p.short;
      group.appendChild(label);

      function open(ev) {
        ev.stopPropagation();
        selectNode(p.id);
      }
      group.addEventListener("click", open);
      group.addEventListener("keydown", function (ev) {
        if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); open(ev); }
      });

      nodesLayer.appendChild(group);
      nodeEls[p.id] = group;
    });
  }

  // ---- Highlighting ----
  function computeActive() {
    var nodes = {};
    var edges = {};
    if (state.kind === "node") {
      nodes[state.id] = true;
      edgesByPerson[state.id].forEach(function (e) {
        edges[e.id] = true;
        nodes[otherEnd(e, state.id)] = true;
      });
    } else if (state.kind === "edge") {
      var e = EDGES.filter(function (x) { return x.id === state.id; })[0];
      edges[e.id] = true;
      nodes[e.source] = true;
      nodes[e.target] = true;
    }
    return { nodes: nodes, edges: edges };
  }

  function refreshHighlight() {
    var active = computeActive();
    var isNone = state.kind === "none";

    PEOPLE.forEach(function (p) {
      var g = nodeEls[p.id];
      g.classList.remove("dim", "is-selected", "is-neighbor");
      if (isNone) return;
      if (active.nodes[p.id]) {
        if (state.kind === "node" && p.id === state.id) {
          g.classList.add("is-selected");
        } else {
          g.classList.add("is-neighbor");
        }
      } else {
        g.classList.add("dim");
      }
    });

    EDGES.forEach(function (edge) {
      var g = edgeEls[edge.id].group;
      g.classList.remove("dim", "is-active");
      if (isNone) return;
      if (active.edges[edge.id]) {
        g.classList.add("is-active");
      } else {
        g.classList.add("dim");
      }
    });
  }

  // ---- Selection ----
  function selectNode(id) {
    state = { kind: "node", id: id };
    refreshHighlight();
    renderPerson(id);
  }

  function selectEdge(id) {
    state = { kind: "edge", id: id };
    refreshHighlight();
    renderEdge(id);
  }

  function reset() {
    state = { kind: "none", id: null };
    refreshHighlight();
    renderIntro();
  }

  // ---- Detail panel rendering ----
  function clear(node) { while (node.firstChild) node.removeChild(node.firstChild); }

  function makeResetButton() {
    var btn = document.createElement("button");
    btn.className = "reset-btn";
    btn.textContent = "Show everyone";
    btn.addEventListener("click", reset);
    return btn;
  }

  function fieldLabel(txt) {
    var d = document.createElement("div");
    d.className = "field-label";
    d.textContent = txt;
    return d;
  }

  function para(txt) {
    var p = document.createElement("p");
    p.textContent = txt;
    return p;
  }

  function renderIntro() {
    clear(detailEl);
    var h = document.createElement("h2");
    h.textContent = "Start with a person";
    detailEl.appendChild(h);
    detailEl.appendChild(para(
      "Tap any circle to meet that mathematician and see who they are joined to."
    ));
    var hint = para(
      "Tap a line between two people to read the story of how they are connected."
    );
    hint.className = "detail-hint";
    detailEl.appendChild(hint);
  }

  function renderPerson(id) {
    var p = peopleById[id];
    clear(detailEl);
    detailEl.appendChild(makeResetButton());

    var h = document.createElement("h2");
    h.textContent = p.name;
    detailEl.appendChild(h);

    var tag = document.createElement("span");
    tag.className = "date-tag";
    tag.textContent = p.dateLabel;
    detailEl.appendChild(tag);

    detailEl.appendChild(para(p.bio));

    detailEl.appendChild(fieldLabel("The idea"));
    detailEl.appendChild(para(p.idea));

    if (p.stub) {
      var note = document.createElement("p");
      note.className = "stub-note";
      note.textContent = "Not a full story on the site yet. This short bio is background so the connection makes sense.";
      detailEl.appendChild(note);
    }

    var conns = edgesByPerson[id];
    detailEl.appendChild(fieldLabel(
      conns.length === 1 ? "1 connection" : conns.length + " connections"
    ));

    var ul = document.createElement("ul");
    ul.className = "conn-list";
    conns.forEach(function (edge) {
      var other = peopleById[otherEnd(edge, id)];
      var type = EDGE_TYPES[edge.type];
      var li = document.createElement("li");
      var btn = document.createElement("button");
      btn.className = "conn-btn";

      var swatch = document.createElement("span");
      swatch.className = "conn-swatch";
      swatch.style.borderTopColor = type.color;
      swatch.style.borderTopStyle = type.dash ? "dotted" : "solid";

      var nameLine = document.createElement("span");
      nameLine.className = "conn-name";
      nameLine.appendChild(swatch);
      nameLine.appendChild(document.createTextNode(other.name));

      var typeLine = document.createElement("span");
      typeLine.className = "conn-type";
      typeLine.textContent = type.label + ": " + type.blurb;

      btn.appendChild(nameLine);
      btn.appendChild(typeLine);
      btn.addEventListener("click", function () { selectEdge(edge.id); });
      li.appendChild(btn);
      ul.appendChild(li);
    });
    detailEl.appendChild(ul);

    if (p.entry) {
      var link = document.createElement("span");
      link.className = "source-link";
      link.textContent = "Full story: data/entries/" + p.entry + ".yaml";
      detailEl.appendChild(link);
    }
  }

  function renderEdge(id) {
    var edge = EDGES.filter(function (x) { return x.id === id; })[0];
    var type = EDGE_TYPES[edge.type];
    var a = peopleById[edge.source];
    var b = peopleById[edge.target];
    clear(detailEl);
    detailEl.appendChild(makeResetButton());

    var h = document.createElement("h2");
    h.textContent = a.short + " and " + b.short;
    detailEl.appendChild(h);

    var pill = document.createElement("span");
    pill.className = "type-pill";
    pill.style.background = type.color;
    pill.textContent = type.label;
    detailEl.appendChild(pill);

    detailEl.appendChild(para(edge.label));

    var row = document.createElement("div");
    row.className = "jump-row";
    [a, b].forEach(function (person) {
      var btn = document.createElement("button");
      btn.className = "person-jump";
      btn.textContent = person.short;
      btn.addEventListener("click", function () { selectNode(person.id); });
      row.appendChild(btn);
    });
    detailEl.appendChild(row);
  }

  // ---- Init ----
  backdrop.addEventListener("click", reset);
  buildLegend();
  buildEdges();
  buildNodes();
  renderIntro();
})();

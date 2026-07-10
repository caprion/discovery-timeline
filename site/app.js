// Discovery Timeline — client app
// Loads site/data.json (eras + entries), renders dots on a Leaflet map,
// drives era-tab navigation that highlights dots in the active era, and
// opens a story panel with curated links when a dot is clicked.

const MAP = L.map("map", {
  worldCopyJump: true,
  zoomControl: true,
  minZoom: 2,
  maxZoom: 8,
}).setView([28, 18], 2);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
  maxZoom: 18,
}).addTo(MAP);

const PANEL = document.getElementById("story-panel");
const PANEL_CONTENT = document.getElementById("story-content");
const PANEL_CLOSE = document.getElementById("story-close");
const ERA_NAV = document.getElementById("era-nav");
const ERA_DESC = document.getElementById("era-description");
const ERA_DESC_NAME = document.getElementById("era-description-name");
const ERA_DESC_TEXT = document.getElementById("era-description-text");
const ERA_DESC_META = document.getElementById("era-description-meta");

let ERAS = [];
let ENTRIES = [];
let ACTIVE_ERA = "all";
const MARKERS = new Map(); // id -> L.marker
const ERA_COLORS = new Map(); // era_id -> color

function makeIcon(color, active) {
  const bg = active ? color : color;
  return L.divIcon({
    className: "",
    html: `<div class="dot-marker ${active ? "active" : ""}" style="background:${bg}"></div>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  });
}

function renderStory(entry) {
  const eraName = ERA_COLORS.get(entry.era)
    ? ERAS.find((e) => e.id === entry.era)?.name || entry.era
    : entry.era;

  const linksHtml = (entry.links || [])
    .map(
      (l) =>
        `<li><a href="${escapeAttr(l.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(l.label)}</a></li>`
    )
    .join("");

  const sourcesHtml = (entry.sources || [])
    .map((s) => `<li>${escapeHtml(s)}</li>`)
    .join("");

  const hook = entry.hook
    ? `<p class="story-hook">${escapeHtml(entry.hook)}</p>`
    : "";

  PANEL_CONTENT.innerHTML = `
    <h2>${escapeHtml(entry.title)}</h2>
    <div class="story-meta">
      ${escapeHtml(entry.date_label)} &middot; ${escapeHtml(entry.place.name)} &middot; ${escapeHtml(eraName)}
      <span class="field-pill">${escapeHtml(entry.field)}</span>
    </div>
    ${hook}
    <div class="story-body">
      ${renderMarkdown(entry.story)}
      ${linksHtml ? `<h2>Read more</h2><ul>${linksHtml}</ul>` : ""}
      ${sourcesHtml ? `<h2>Sources</h2><ul>${sourcesHtml}</ul>` : ""}
    </div>
  `;
  PANEL.hidden = false;
  PANEL.scrollTop = 0;
}

function renderMarkdown(md) {
  // Strip the trailing `## Sources` section. YAML is the canonical source
  // for citations; the story panel renders them separately to avoid
  // duplicate headings.
  const sourcesIdx = md.search(/^## Sources\s*$/m);
  if (sourcesIdx !== -1) {
    md = md.slice(0, sourcesIdx);
  }
  const lines = md.split(/\r?\n/);
  let html = "";
  let inList = false;
  let para = [];

  const flushPara = () => {
    if (para.length) {
      html += `<p>${inlineFormat(para.join(" "))}</p>`;
      para = [];
    }
  };
  const flushList = () => {
    if (inList) {
      html += "</ul>";
      inList = false;
    }
  };

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) {
      flushPara();
      flushList();
      continue;
    }
    if (line.startsWith("## ")) {
      flushPara();
      flushList();
      html += `<h2>${inlineFormat(line.slice(3))}</h2>`;
      continue;
    }
    if (line.startsWith("- ")) {
      flushPara();
      if (!inList) {
        html += "<ul>";
        inList = true;
      }
      html += `<li>${inlineFormat(line.slice(2))}</li>`;
      continue;
    }
    para.push(line);
  }
  flushPara();
  flushList();
  return html;
}

function inlineFormat(s) {
  let out = escapeHtml(s);
  out = out.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  out = out.replace(/\*(.+?)\*/g, "<em>$1</em>");
  return out;
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeAttr(s) {
  return escapeHtml(s).replace(/"/g, "&quot;");
}

function applyActiveEra() {
  for (const [id, marker] of MARKERS) {
    const entry = ENTRIES.find((e) => e.id === id);
    if (!entry) continue;
    const visible = ACTIVE_ERA === "all" || entry.era === ACTIVE_ERA;
    const el = marker.getElement();
    if (el) {
      const dot = el.querySelector(".dot-marker");
      if (dot) dot.classList.toggle("dim", !visible);
    }
  }

  // Era description panel
  if (ACTIVE_ERA === "all") {
    ERA_DESC.hidden = true;
  } else {
    const era = ERAS.find((e) => e.id === ACTIVE_ERA);
    if (era) {
      ERA_DESC_NAME.textContent = era.name;
      ERA_DESC_NAME.style.borderLeft = `4px solid ${era.color}`;
      ERA_DESC_NAME.style.paddingLeft = "0.5rem";
      ERA_DESC_TEXT.textContent = era.description;
      const meta = [];
      if (era.date_start || era.date_end) {
        meta.push(`${era.date_start} to ${era.date_end}`);
      }
      if (era.region) meta.push(era.region);
      if (era.contributors?.length) meta.push(`Figures: ${era.contributors.join(", ")}`);
      ERA_DESC_META.textContent = meta.join(" · ");
      ERA_DESC.hidden = false;
    }
  }

  // Tab active state
  for (const btn of ERA_NAV.querySelectorAll(".era-tab")) {
    btn.classList.toggle("active", btn.dataset.era === ACTIVE_ERA);
  }
}

function selectEntry(id) {
  const entry = ENTRIES.find((e) => e.id === id);
  if (!entry) return;
  for (const [mid, marker] of MARKERS) {
    const el = marker.getElement();
    if (el) {
      const dot = el.querySelector(".dot-marker");
      if (dot) dot.classList.toggle("active", mid === id);
    }
  }
  renderStory(entry);
}

PANEL_CLOSE.addEventListener("click", () => {
  PANEL.hidden = true;
  for (const marker of MARKERS.values()) {
    const el = marker.getElement();
    if (el) {
      const dot = el.querySelector(".dot-marker");
      if (dot) dot.classList.remove("active");
    }
  }
});

async function init() {
  try {
    const res = await fetch("data.json");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    ERAS = data.eras || [];
    ENTRIES = data.entries || [];
  } catch (err) {
    document.getElementById("map").innerHTML =
      `<p style="padding:1rem">Failed to load data.json. Run <code>python scripts/build.py</code> first.</p>`;
    console.error(err);
    return;
  }

  for (const era of ERAS) ERA_COLORS.set(era.id, era.color);

  // Build era tabs (after the "All eras" button which is already in the HTML)
  for (const era of ERAS) {
    const btn = document.createElement("button");
    btn.className = "era-tab";
    btn.dataset.era = era.id;
    btn.textContent = era.name;
    btn.style.borderLeftColor = era.color;
    btn.style.borderLeftWidth = "4px";
    btn.addEventListener("click", () => {
      ACTIVE_ERA = era.id;
      applyActiveEra();
    });
    ERA_NAV.appendChild(btn);
  }

  // Wire the "All eras" button
  const allBtn = ERA_NAV.querySelector('[data-era="all"]');
  allBtn.addEventListener("click", () => {
    ACTIVE_ERA = "all";
    applyActiveEra();
  });

  for (const entry of ENTRIES) {
    const color = ERA_COLORS.get(entry.era) || "#c2452d";
    const marker = L.marker([entry.place.lat, entry.place.lng], {
      icon: makeIcon(color, false),
      title: `${entry.title} (${entry.date_label})`,
    }).addTo(MAP);
    marker.bindPopup(
      `<strong>${escapeHtml(entry.title)}</strong>` +
        `<em>${escapeHtml(entry.date_label)} &middot; ${escapeHtml(entry.place.name)}</em>`
    );
    marker.on("click", () => selectEntry(entry.id));
    MARKERS.set(entry.id, marker);
  }

  applyActiveEra();
}

init();
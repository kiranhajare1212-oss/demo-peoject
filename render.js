// render.js — DOM rendering helpers

function confClass(label) {
  return label === "high" ? "conf-high" : label === "medium" ? "conf-med" : "conf-low";
}

function sevClass(s) {
  return s === "high" ? "conf-high" : s === "medium" ? "conf-med" : "conf-low";
}

function initials(name) {
  return name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
}

// ── Single transcript ──────────────────────────────────────────────────────
function renderSingleResults(data) {
  const el = document.getElementById("singleResults");
  el.innerHTML = `
    <div class="section-label" style="margin-top:1.5rem">Summary</div>
    <div class="summary-block">
      <p class="summary-text">${data.summary}</p>
    </div>

    <hr class="div">
    <div class="section-label">Themes</div>
    <div class="themes-grid">
      ${(data.themes || []).map(t => `
        <div class="theme-card">
          <span class="theme-tag ${t.color || "teal"}">
            <i class="ti ti-tag" style="font-size:10px"></i>${t.label}
          </span>
          <div class="theme-title">${t.title}</div>
          <div class="theme-desc">${t.description}</div>
          <div class="theme-freq">${t.frequency}</div>
        </div>`).join("")}
    </div>

    <hr class="div">
    <div class="section-label">Key verbatims</div>
    ${(data.quotes || []).map(q => `
      <div class="quote-block">
        <div class="quote-text">"${q.text}"</div>
        <div class="quote-meta">${q.speaker} · ${q.context}</div>
      </div>`).join("")}

    <hr class="div">
    <div class="section-label">Product opportunities</div>
    ${(data.opportunities || []).map((o, i) => `
      <div class="opp-item">
        <div class="opp-n">0${i + 1}</div>
        <div class="opp-body">
          <div class="opp-title">${o.title}</div>
          <div class="opp-desc">${o.description}</div>
        </div>
        <span class="opp-sev ${sevClass(o.severity)}">${o.severity}</span>
      </div>`).join("")}

    <div class="action-bar">
      <button class="action-btn" onclick="document.getElementById('goMultiBtn').click()">
        <i class="ti ti-layers-subtract"></i> Try multi-transcript mode
      </button>
    </div>`;
}

// ── Multi — researcher pane ────────────────────────────────────────────────
function renderResearcherResults(data, allNames) {
  const el = document.getElementById("researcherResults");
  el.innerHTML = `
    <div style="margin-top:1.5rem">
      <div class="stat-row">
        <div class="stat"><div class="stat-label">Participants</div><div class="stat-val">${allNames.length}</div></div>
        <div class="stat"><div class="stat-label">Themes found</div><div class="stat-val">${data.themes.length}</div></div>
        <div class="stat"><div class="stat-label">Top confidence</div><div class="stat-val">${Math.max(...data.themes.map(t => t.confidence))}%</div></div>
      </div>

      <div class="section-label">Cross-participant themes</div>

      ${data.themes.map(t => `
        <div class="theme-row">
          <div class="theme-header">
            <span class="theme-name">${t.name}</span>
            <span class="conf-pill ${confClass(t.confidence_label)}">${t.confidence}% confidence</span>
          </div>
          <div class="conf-bar-track">
            <div class="conf-bar-fill" style="width:${t.confidence}%"></div>
          </div>
          <div style="font-size:12px;color:var(--muted);margin-bottom:8px">${t.description}</div>
          <div class="participants-row">
            ${allNames.map(n => `
              <span class="p-badge ${t.participants_mentioned.includes(n) ? "mentioned" : ""}">${n}</span>
            `).join("")}
          </div>
          <div class="verbatim">
            "${t.representative_quote}"
            <div class="verbatim-src">— ${t.quote_participant}</div>
          </div>
        </div>`).join("")}

      <div class="section-label" style="margin-top:1.5rem">Product opportunities</div>
      ${data.opportunities.map((o, i) => `
        <div class="opp-item">
          <div class="opp-n">0${i + 1}</div>
          <div class="opp-body">
            <div class="opp-title">${o.title}</div>
            <div class="opp-desc">${o.description}</div>
          </div>
          <span class="opp-sev ${sevClass(o.severity)}">${o.severity} · ${o.evidence_count} participants</span>
        </div>`).join("")}

      <div class="action-bar">
        <button class="action-btn" onclick="switchToTab('stakeholder')">
          <i class="ti ti-presentation"></i> View stakeholder deck
        </button>
      </div>
    </div>`;
}

// ── Multi — stakeholder pane ───────────────────────────────────────────────
const IC_ICONS = ["ti-users", "ti-route", "ti-chart-bar", "ti-bulb"];
const IC_BGTX  = [
  ["#EEEDFE", "#3C3489"],
  ["#E1F5EE", "#085041"],
  ["#FAEEDA", "#633806"],
  ["#FAECE7", "#712B13"],
];

function renderStakeholderView(data, allNames) {
  const date = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  const el   = document.getElementById("stakeholderContent");

  el.innerHTML = `
    <div class="share-header">
      <div class="sh-eyebrow">Research synthesis · ${allNames.length} participants · ${date}</div>
      <div class="sh-title">${data.headline}</div>
      <div class="sh-meta">${allNames.join(" · ")}</div>
    </div>

    <p class="sh-summary">${data.summary}</p>

    <div class="section-label">Key insights</div>

    ${data.themes.map((t, i) => {
      const [bg, tx] = IC_BGTX[i % 4];
      const icon     = IC_ICONS[i % 4];
      const sigLabel = t.confidence_label === "high"   ? "Strong signal"
                     : t.confidence_label === "medium" ? "Moderate signal"
                     :                                   "Emerging signal";
      return `
        <div class="insight-card">
          <div class="ic-top">
            <div class="ic-icon" style="background:${bg}">
              <i class="ti ${icon}" style="font-size:16px;color:${tx}"></i>
            </div>
            <div>
              <div class="ic-theme">${t.name}</div>
              <div class="ic-conf">${sigLabel} · ${t.participants_mentioned.length} of ${allNames.length} participants</div>
            </div>
          </div>
          <div class="ic-quote">"${t.representative_quote}"</div>
          <div class="ic-so-label">So what</div>
          <div class="ic-so-what">${t.so_what}</div>
        </div>`;
    }).join("")}

    <div class="next-steps">
      <div class="ns-title">Recommended next steps</div>
      ${data.next_steps.map(s => `
        <div class="ns-item">
          <span class="ns-check"><i class="ti ti-square" style="font-size:14px"></i></span>
          <span>${s}</span>
        </div>`).join("")}
    </div>

    <div class="action-bar">
      <button class="action-btn" onclick="switchToTab('researcher')">
        <i class="ti ti-microscope"></i> Back to researcher view
      </button>
    </div>`;
}

// ── Transcript list ────────────────────────────────────────────────────────
function renderTranscriptList(transcripts) {
  const el = document.getElementById("transcriptsList");
  if (!transcripts.length) { el.innerHTML = ""; return; }
  el.innerHTML = transcripts.map((t, i) => `
    <div class="t-chip">
      <div class="t-avatar">${initials(t.name)}</div>
      <div>
        <div class="t-name">${t.name}</div>
      </div>
      <div class="t-preview">${t.text.slice(0, 90)}…</div>
      <button class="t-remove" data-idx="${i}" aria-label="Remove ${t.name}">
        <i class="ti ti-x" style="font-size:14px"></i>
      </button>
    </div>`).join("");

  el.querySelectorAll(".t-remove").forEach(btn => {
    btn.addEventListener("click", () => {
      window._removeTranscript(parseInt(btn.dataset.idx));
    });
  });
}

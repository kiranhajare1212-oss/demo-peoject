// app.js — event wiring and state

// ── State ──────────────────────────────────────────────────────────────────
let transcripts = [];
let currentPage = "single"; // "single" | "multi"
let currentTab  = "researcher";

// ── Page switching ─────────────────────────────────────────────────────────
function showPage(page) {
  currentPage = page;
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(`page-${page}`).classList.add("active");
}

function switchToTab(tab) {
  currentTab = tab;
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  document.querySelectorAll(".tab-pane").forEach(p => p.classList.remove("active"));
  document.querySelector(`.tab[data-tab="${tab}"]`).classList.add("active");
  document.getElementById(`pane-${tab}`).classList.add("active");
}

// ── Error helper ───────────────────────────────────────────────────────────
function showErr(id, msg) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = msg;
  el.style.display = "block";
  setTimeout(() => (el.style.display = "none"), 5000);
}

// ── Spinner helper ─────────────────────────────────────────────────────────
function setLoading(btn, loading, defaultHTML) {
  btn.disabled = loading;
  btn.innerHTML = loading ? '<div class="spinner"></div> Working…' : defaultHTML;
}

// ── Single transcript ──────────────────────────────────────────────────────
document.querySelectorAll(".scenario-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".scenario-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const key = btn.dataset.scenario;
    const ta  = document.getElementById("singleTranscript");
    ta.value = key === "blank" ? "" : (SCENARIOS[key] ?? "");
    document.getElementById("singleResults").innerHTML = "";
    if (key === "blank") ta.focus();
  });
});

// Load first scenario on boot
document.getElementById("singleTranscript").value = SCENARIOS.onboarding;

const singleAnalyzeBtn = document.getElementById("singleAnalyzeBtn");
const singleDefaultHTML = singleAnalyzeBtn.innerHTML;

singleAnalyzeBtn.addEventListener("click", async () => {
  const transcript = document.getElementById("singleTranscript").value.trim();
  if (transcript.length < 80) { showErr("singleErr", "Transcript looks too short — try a sample scenario."); return; }

  setLoading(singleAnalyzeBtn, true, singleDefaultHTML);
  try {
    const data = await synthesizeSingle(transcript);
    renderSingleResults(data);
  } catch (e) {
    showErr("singleErr", "Something went wrong: " + e.message);
  } finally {
    setLoading(singleAnalyzeBtn, false, singleDefaultHTML);
  }
});

// ── Page nav ───────────────────────────────────────────────────────────────
document.getElementById("goMultiBtn").addEventListener("click", () => showPage("multi"));
document.getElementById("goSingleBtn").addEventListener("click", () => showPage("single"));

// ── Tab nav ────────────────────────────────────────────────────────────────
document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => switchToTab(tab.dataset.tab));
});

// ── Multi-transcript: add / remove / samples ───────────────────────────────
window._removeTranscript = function(idx) {
  transcripts.splice(idx, 1);
  renderTranscriptList(transcripts);
};

document.getElementById("addBtn").addEventListener("click", () => {
  const text = document.getElementById("newTranscript").value.trim();
  const name = document.getElementById("newName").value.trim() || `Participant ${transcripts.length + 1}`;
  if (text.length < 50) { showErr("multiErr", "Transcript too short."); return; }
  transcripts.push({ name, text });
  document.getElementById("newTranscript").value = "";
  document.getElementById("newName").value = "";
  renderTranscriptList(transcripts);
});

document.getElementById("loadSamplesBtn").addEventListener("click", () => {
  transcripts = [...SAMPLE_TRANSCRIPTS];
  renderTranscriptList(transcripts);
});

// ── Multi-transcript: synthesize ───────────────────────────────────────────
const synthBtn     = document.getElementById("synthBtn");
const synthDefault = synthBtn.innerHTML;

synthBtn.addEventListener("click", async () => {
  if (transcripts.length < 2) { showErr("multiErr", "Add at least 2 transcripts."); return; }

  setLoading(synthBtn, true, synthDefault);
  synthBtn.innerHTML = `<div class="spinner"></div> Synthesizing across ${transcripts.length} transcripts…`;

  try {
    const data     = await synthesizeMulti(transcripts);
    const allNames = transcripts.map(t => t.name);
    renderResearcherResults(data, allNames);
    renderStakeholderView(data, allNames);
  } catch (e) {
    showErr("multiErr", "Synthesis failed: " + e.message);
  } finally {
    setLoading(synthBtn, false, synthDefault);
  }
});

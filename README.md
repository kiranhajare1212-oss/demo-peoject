# Research Synthesis Demo
### Built for Great Question — by Kiran Hajare

A lightweight AI-powered tool that synthesizes user interview transcripts into themes, verbatims, confidence scores, and a stakeholder-ready view.

---

## What it does

**Single-transcript mode**
- Paste one interview → AI extracts 4 themes, 3 key verbatims, 3 product opportunities with severity scores

**Multi-transcript mode**
- Add 2+ interviews → AI clusters themes *across* participants, scores each theme by frequency (confidence %), shows which participants mentioned each theme, and generates a separate stakeholder view that hides raw transcripts and surfaces only signal + next steps

---

## Why these features

The biggest gap in research tooling isn't transcription or tagging — it's the **last mile**: getting findings from the researcher's brain into a format PMs and VPs actually consume. This demo targets that gap with:

- **Confidence scoring** — "3/3 participants mentioned this" is harder to dismiss than "users find onboarding confusing"
- **Two-tab split** — researcher view shows full methodology; stakeholder view hides the machinery and shows only insight + so-what + next steps
- **Participant attribution** — colored badges show exactly who mentioned each theme, making cross-session patterns visible at a glance

---

## Setup

### 1. Clone / download
```bash
git clone <repo-url>
cd great-question-demo
```

### 2. Configure your API key

This demo calls the Anthropic API directly from the browser for simplicity.  
**In production, never expose API keys client-side** — proxy through your own backend.

Open `api.js` and replace the fetch headers section:
```js
headers: {
  "Content-Type": "application/json",
  "x-api-key": "YOUR_KEY_HERE",          // add this line
  "anthropic-version": "2023-06-01",     // add this line
  "anthropic-dangerous-direct-browser-access": "true", // required for direct browser calls
},
```

Get a key at: https://console.anthropic.com

### 3. Run locally

Any static file server works:
```bash
# Python
python3 -m http.server 8080

# Node
npx serve .

# VS Code
# Use the "Live Server" extension
```

Open `http://localhost:8080` in your browser.

---

## Project structure

```
great-question-demo/
├── index.html   # Shell, layout, markup
├── style.css    # All styles (dark mode included)
├── data.js      # Sample transcripts
├── api.js       # Anthropic API calls (synthesizeSingle, synthesizeMulti)
├── render.js    # DOM rendering functions
├── app.js       # State, event wiring, page/tab logic
└── README.md
```

---

## What I'd build next

1. **Persistent studies** — save transcripts + synthesis to localStorage or a backend so you're not re-pasting every session
2. **Co-tagging workflow** — let two researchers tag independently, then show divergence and merge; inter-rater reliability as a feature, not a spreadsheet hack
3. **Shareable link** — generate a read-only stakeholder URL with a stripped-down view (no raw transcript, no tagging UI)
4. **Longitudinal tracking** — run the same study every quarter, surface whether themes are growing or shrinking in frequency

---

## Stack

- Vanilla HTML / CSS / JS — no build step, no framework, no bundler
- Anthropic Claude API (`claude-sonnet-4-20250514`)
- Google Fonts (Playfair Display, DM Mono, Instrument Sans)
- Tabler Icons (webfont)

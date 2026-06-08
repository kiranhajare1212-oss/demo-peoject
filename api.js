// api.js — Anthropic API calls
// NOTE: In production, API calls must be proxied through your own backend.
// Never expose an API key in client-side code.
// For this demo, the key is injected via a <meta> tag or env config.

const API_URL = "https://api.anthropic.com/v1/messages";
const MODEL   = "claude-sonnet-4-20250514";

async function callClaude(prompt, maxTokens = 1200) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: maxTokens,
      messages: [{ role: "user", content: prompt }],
    }),
  });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  const data = await res.json();
  const raw  = data.content?.find(c => c.type === "text")?.text ?? "";
  return JSON.parse(raw.replace(/```json|```/g, "").trim());
}

// Single-transcript synthesis
async function synthesizeSingle(transcript) {
  const prompt = `You are an expert UX researcher. Analyze this user interview transcript and return a JSON object with exactly this structure:
{
  "summary": "2-3 sentence synthesis of what this participant experienced and what it signals",
  "themes": [
    {"label": "short tag", "color": "teal|purple|amber|coral", "title": "theme name", "description": "1-2 sentences", "frequency": "mentioned N times"}
  ],
  "quotes": [
    {"text": "exact quote from transcript", "speaker": "Participant", "context": "brief label"}
  ],
  "opportunities": [
    {"title": "opportunity title", "description": "1-2 sentences on the opportunity", "severity": "high|medium|low"}
  ]
}
Rules:
- themes: exactly 4 distinct topics
- quotes: exactly 3 most memorable verbatims
- opportunities: exactly 3, ranked high to low
- severity: high = churn risk / significant friction, medium = notable but workaround exists, low = nice-to-have
- Return ONLY valid JSON, no markdown fences, no explanation

Transcript:
${transcript}`;
  return callClaude(prompt, 1000);
}

// Multi-transcript synthesis
async function synthesizeMulti(transcripts) {
  const names = transcripts.map(t => t.name);
  const block = transcripts
    .map((t, i) => `--- Transcript ${i + 1}: ${t.name} ---\n${t.text}`)
    .join("\n\n");

  const prompt = `You are a senior UX researcher. Analyze these ${transcripts.length} user interview transcripts and synthesize findings across all of them.

Return ONLY valid JSON with this exact structure:
{
  "headline": "one sharp sentence summarizing the overarching finding",
  "summary": "2-3 sentence executive summary of cross-cutting insights",
  "themes": [
    {
      "name": "theme name",
      "confidence": <0-100 integer>,
      "confidence_label": "high|medium|low",
      "participants_mentioned": ["name1","name2"],
      "description": "1-2 sentences",
      "representative_quote": "exact quote from transcript",
      "quote_participant": "participant name",
      "so_what": "1 sentence on what this means for the product team"
    }
  ],
  "opportunities": [
    {"title": "opportunity", "description": "1-2 sentences", "severity": "high|medium|low", "evidence_count": <integer>}
  ],
  "next_steps": ["action item 1", "action item 2", "action item 3"]
}

Rules:
- themes: 3-4 themes
- confidence: % of participants who mentioned it (e.g. 3/3 = 100, 2/3 = 67, 1/3 = 33)
- confidence_label: high ≥70, medium 40-69, low <40
- participants_mentioned: only names from this list: ${JSON.stringify(names)}
- opportunities: exactly 3
- next_steps: exactly 3 concrete product team action items
- Return ONLY JSON, no markdown, no explanation

Transcripts:
${block}`;

  return callClaude(prompt, 1400);
}

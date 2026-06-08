// Sample transcripts for demo scenarios
const SCENARIOS = {
  onboarding: `Interviewer: Can you walk me through what happened the first time you logged into the platform?

Participant: Yeah, so I signed up and then... it just kind of dumped me into this empty dashboard. There was like a "get started" button but clicking it opened a video and I really just wanted to, like, do something. I'm not a video person.

Interviewer: What did you do next?

Participant: I clicked around for maybe 20 minutes trying to figure out where to create my first study. There's this sidebar but it's got like 12 items and none of them are labeled obviously. Eventually I found it under "Projects" but I expected it to be called "Studies" because that's what you call them on your marketing page.

Interviewer: What would have made that easier?

Participant: Honestly? Just a checklist. Like "step one, create a study. step two, invite a participant." Even Notion does this. I don't need hand-holding forever but that first session I was genuinely lost. My colleague had the same experience, she almost churned in the first week.

Interviewer: How do you feel about the platform now that you've been using it for a month?

Participant: Oh it's great now. I love the tagging system for highlights. But getting there was painful and I'm not sure everyone pushes through like I did. There's probably a lot of drop-off in that first session.`,

  pricing: `Interviewer: When you were evaluating research tools, how did the pricing factor in?

Participant: It was really confusing honestly. I went to the pricing page and there's like three tiers but I couldn't tell which one I needed. The middle one said "up to 5 seats" and I thought that meant the people being interviewed, not my team members. I had to email support to figure it out.

Interviewer: Did support help?

Participant: Eventually, yeah. But it took two days and by then I'd already convinced myself to look at competitors. I came back because a friend recommended you strongly but I almost didn't.

Interviewer: What was confusing about the seat definition?

Participant: Researchers have this whole vocabulary — participants, respondents, seats — and they don't all mean the same thing. Your pricing page uses "seats" but never defines it next to the word. I assumed it was interview slots, like minutes of recording or something.

Interviewer: What would have helped?

Participant: A little tooltip or an example. Like "5 seats = 5 team members who can log in." Takes five words. Also the annual vs monthly toggle is really hidden — I almost paid monthly for three months before I noticed there's a 20% annual discount. That felt almost sneaky even though I'm sure it wasn't intentional.`,

  collab: `Interviewer: How do you share research findings with your stakeholders today?

Participant: It's a whole thing. I do the interviews in the platform, I tag the highlights, I build the themes — but then to actually share it I export to a Google Doc and manually copy-paste the quotes in. The export is just a raw transcript, it doesn't include my tags or themes.

Interviewer: How long does that take?

Participant: For a five-interview study? Probably four hours of synthesis and then another two hours of deck-making. My PM wants something visual, not a wall of text.

Interviewer: Have you tried sharing directly from the platform?

Participant: There's a share link but it shows them the full transcript interface and they find it overwhelming. They're not researchers. They just want the highlights. I want something like a one-pager or a mini-report view that's designed for non-researchers.

Interviewer: Does your team collaborate inside the platform at all?

Participant: My colleague and I will sometimes both tag the same session independently for inter-rater reliability, which is great. But there's no way to merge our tags or see where we disagreed. We end up exporting both and comparing in a spreadsheet. That feels like a gap — I'd pay extra for a proper co-tagging workflow.`,
};

// Pre-written sample transcripts for multi mode
const SAMPLE_TRANSCRIPTS = [
  {
    name: "Priya M.",
    text: `Interviewer: How do you currently share research with your team?
Participant: I export everything manually and paste into Google Docs. The export just gives raw transcript, no themes, no highlights. It takes forever.
Interviewer: How long roughly?
Participant: For a five-interview study, maybe six hours just on the writeup. My PM wants a one-pager, not a wall of text. I wish there was a view I could just share directly — something that hides the raw transcript and shows only the findings.
Interviewer: Do stakeholders look at the platform themselves?
Participant: I tried sharing the link once. They found it overwhelming. They're not researchers. They need a summary, not a tool.`,
  },
  {
    name: "James T.",
    text: `Interviewer: Tell me about your synthesis workflow.
Participant: After interviews I tag highlights manually, then try to cluster them into themes. It's subjective and slow. I worry I'm biasing toward things I already believe.
Interviewer: Do you share findings with product teams?
Participant: Yes but it's painful. I make a Notion doc and copy-paste quotes. Sometimes my PM doesn't read it at all. I've started doing a five-minute verbal summary instead, but then there's no record.
Interviewer: What would help?
Participant: Something that shows me themes across all my interviews at once, not one at a time. And tell me how confident to be — like, is this theme from two people or eight people?`,
  },
  {
    name: "Camille D.",
    text: `Interviewer: Walk me through your last research project.
Participant: We did twelve interviews for a pricing revamp. I used the platform for transcripts which was great. But synthesis was all me, manually, in a spreadsheet. Took two days.
Interviewer: How did you present to stakeholders?
Participant: Slide deck, obviously. I pulled quotes manually. My VP always asks "how many people said this" and I never have a clean answer because I don't track frequency formally. It's embarrassing.
Interviewer: What's the biggest gap?
Participant: The handoff. Getting research from my brain into a format my PM and VP actually consume. Everything before that step the tool handles well. That last mile is where it breaks down.`,
  },
];

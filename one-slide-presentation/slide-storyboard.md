# Shock Lens — Slide Storyboard (3-min deck → 1-min single slide)

Source: `3-minscript.md` (9 slide cues) + `IIMT1611-Individual-Pitch-Session.md`
(rubric, one-slide rule, 60-second limit).

There is no original slide artwork in this folder — the deck exists only as
the nine cues in the 3-minute script. This file reconstructs every cue in
Markdown, then maps what survives into Jonathan's one-page IIMT slide.

---

## Part 1 — The 9 slides, reconstructed

### Slide 1 — Title
- **On screen:** Shock Lens wordmark + refracted-lens mark; tagline "See the
  risk before the market does."
- **Narration:** "Quick show of hands: who here has money invested… keep your
  hand up if you could tell me, in dollars, how much you'd lose if the AI
  bubble burst tomorrow." → "That's the problem."
- **Pixel-art (reconstruction):** `SHOCK LENS` / lens logo / audience hook.

### Slide 2 — Team
- **On screen:** Alessandro, Jonathan, Artem.
- **Narration:** "I'm Alessandro. With me are Jonathan, and Artem."
- **1-min fate:** CUT — individual pitch; Jonathan introduces only himself.

### Slide 3 — Problem
- **On screen:** "Anna. $100,000. 15 holdings. She reads the headline. She
  guesses."
- **Narration:** "Anna has a hundred thousand dollars across fifteen
  holdings. She reads the headline. She knows it matters. And then she
  guesses."
- **1-min fate:** KEEP — the persona was restored on the approved final
  slide: "Anna holds $100,000 across 15 investments. When the AI bubble
  makes headlines, she can read the news — but not what it would cost her.
  So she guesses."

### Slide 4 — Where we play
- **On screen:** "Most Hong Kong adults invest. Almost none can answer the
  question."
- **Narration:** "She's not the exception…"
- **1-min fate:** CUT — the stat is not sourced in the repo; the rubric asks
  for evidence, and an unsourced market-size claim loses marks.

### Slide 5 — Risk Has a Price
- **On screen:** Polymarket AI-bubble probability (November → today).
- **Narration:** "The world already puts a price on that risk… Last November:
  forty-five percent. Today: eight."
- **1-min fate:** COMPRESS into one Evidence line. Use the verifiable,
  dated value from our own capture: **7% for the Dec 31, 2026 market
  (Polymarket, retrieved 4 Oct 2026, ~$3.2M volume)**. The "45% last
  November" figure has no source in the repo — do not use it unless a
  screenshot/trade history is attached.

### Slide 6 — Live Demo
- **On screen:** the app, Stress Test tab, AI Bubble Bursts run:
  **−$9,690 / −9.7%**, contribution bars, NVDA −$3,150 (33%), "NVDA + QQQ ≈
  51% of the estimated impact", tickers → 23% of the portfolio drives
  ~two-thirds of the loss, "Why this matters" text.
- **Narration:** "Minus nine point seven percent. Almost ten thousand
  dollars. In one click… Fifteen tickers. One risk… No black box."
- **1-min fate:** REPLACE live demo with the still frame
  (`screenshots/b-ai-bubble-bars.png`, cropped in the slide) — no live
  switching inside 60 seconds.

### Slide 7 — AI Interprets. Math Measures.
- **On screen:** the rule, as a divider slide.
- **Narration:** "AI interprets the world. Math measures the risk. The AI
  never makes up a number."
- **1-min fate:** COMPRESS into the Solution block (differentiation).

### Slide 8 — Free for investors. Paid by platforms.
- **On screen:** Anna free; broker pays; then broker-wide view; later,
  aggregate risk sentiment (with consent).
- **Narration:** "So who pays? Not Anna. Her broker… because clients who
  understand their risk don't panic and leave."
- **1-min fate:** KEEP the payer + reason; CUT the "today/tomorrow/later"
  expansion.

### Slide 9 — Thank You + ask
- **On screen:** "One broker or wealth platform ready to pilot."
- **Narration:** "Different tickers. Same risk. Shock Lens shows you before
  the market does."
- **1-min fate:** KEEP as the closing line (ask survives as a slide-footer
  line).

---

## Part 2 — Keep / cut map for the 1-minute version

| 3-min slide | Content | 1-min fate |
| --- | --- | --- |
| 1 Title | Brand + hook | Merged into slide header |
| 2 Team | 3 names | Cut |
| 3 Problem | Anna persona | Keep — restored on the final slide |
| 4 Where we play | HK market claim | Cut (unsourced) |
| 5 Risk has a price | Polymarket odds | Compressed → Evidence (7%, dated) |
| 6 Live demo | −9.7% run | Replaced by screenshot on the slide |
| 7 AI/Math rule | AI never invents numbers | Compressed → Solution |
| 8 Business model | Broker pays | Keep (payer + reason) |
| 9 Thank you + ask | Pilot ask | Keep as closing line |

**Word budget:** 3-min script ≈ 400 words → 1 min = **129 words** (reference
"Outstanding" examples are 120–130 words).

---

## Part 3 — The one slide

**Final PDF:** `DEVANO_Jonathan_ShockLens.pdf` is generated from the approved
slide artwork (`Shock Lens_ AI Portfolio Stress Test.png`, kept in this
folder) — exactly one 16:9 page. `slide.html` is the editable equivalent
(same copy, same design tokens, app screenshot cropped to
`assets/final-product.png`) and re-renders to a near-identical PDF if the
artwork ever needs changes.

16:9, light theme, product design tokens from `apps/web/tailwind.config.js`: 

| Token | Value | Use on slide |
| --- | --- | --- |
| Canvas | `#F5F6F8` | Slide background |
| Card | `#FFFFFF`, border `#E3E6EB`, radius 16px, shadow `0 8px 30px rgba(17,24,39,.06)` | Panels, screenshot frame |
| Ink | `#121318` / muted `#555C68` / tertiary `#7B828E` | Headline / body / sources |
| Accent | `#635BFF` / `#4A43DE` | Logo line, section eyebrows, evidence rail |
| Loss red | `#E5485D` | −$9,690, −9.7%, bars |
| Positive | `#168A62` | Green bars in screenshot |
| Font | **Inter** (`"Inter", "SF Pro Display", system-ui`) | All text |

### Layout grid

```
┌────────────────────────────────────────────────────────────────────────┐
│ [lens mark] Shock Lens        See the risk before the market does     │
│                                              Jonathan Devano · IIMT1611│
├──────────────────────────────────────┬─────────────────────────────────┤
│ HERO  −$9,690 from one question      │  ┌───────────────────────────┐  │
│       AI Bubble Bursts · −9.7% · 1s  │  │  [result screenshot]      │  │
│                                      │  │  stats + bars + why       │  │
│ PROBLEM   Anna holds $100,000 across │  │                           │  │
│           15 investments. Headlines, │  └───────────────────────────┘  │
│           but not what they cost her.│  Demo portfolio · Polymarket    │
│           So she guesses.            │  AI-bubble market: 7% by        │
│                                      │  Dec 2026 · shocks illustrative │
│ EVIDENCE  ▍ Polymarket, 4 Oct 2026:  │  impact engine-computed         │
│           AI bubble by Dec 2026 = 7% │                                 │
│           ($3.2M traded)             │                                 │
│                                      │                                 │
│ SOLUTION  Any "what if" → dollar     │                                 │
│           impact + which holdings    │                                 │
│           drive it. AI interprets;   │                                 │
│           math measures; every       │                                 │
│           number auditable.          │                                 │
│                                      │                                 │
│ BUSINESS  Free for investors.        │                                 │
│           Brokers pay a per-client   │                                 │
│           fee — informed clients     │                                 │
│           panic less and leave less. │                                 │
│                                      │                                 │
│ SCALE     One broker integration →   │                                 │
│           all its clients. Scenarios │                                 │
│           are data files. Marginal   │                                 │
│           cost = AI compute.         │                                 │
│                                      │                                 │
│ CLOSE     Today, Anna guesses. With  │                                 │
│           Shock Lens, she sees it    │                                 │
│           first.                     │                                 │
├──────────────────────────────────────┴─────────────────────────────────┤
│ Sources: Polymarket "AI bubble burst by Dec 31, 2026?" (7%, ~$3.2M     │
│ volume, retrieved 4 Oct 2026); app output on the demo portfolio;       │
│ scenario shocks illustrative. Not investment advice.                   │
└────────────────────────────────────────────────────────────────────────┘
```

### Moodle upload

- One page only; filename `DEVANO_Jonathan_ShockLens.pdf` (rendered from the
  approved slide artwork). `slide.html` + `assets/final-product.png` are the
  editable equivalent.
- Deadline: **11:00 AM HKT, Thu 8 Oct 2026**.

# Slide Generation Prompt — Shock Lens One-Pager

Paste everything below the line into a design tool or an AI slide generator
(Gamma, Canva Magic Design, Figma AI, or a coding agent) to reproduce
`slide.html` / `DEVANO_Jonathan_ShockLens.pdf` from scratch. It encodes the
product's real design tokens, the exact copy, and the honesty constraints
(no invented numbers, sources on the slide).

---

## PROMPT

Design a **single 16:9 presentation slide (1920×1080 px)** — a one-minute
student pitch for "Shock Lens", an AI portfolio risk copilot. Export as a
one-page PDF with no margins. Light, calm fintech aesthetic (Revolut-style
clarity), not a dark terminal.

**Design tokens (use exactly):**
- Background: `#F5F6F8`; cards/panels: `#FFFFFF`; borders: `#E3E6EB`
- Ink: `#121318` (primary), `#555C68` (secondary), `#7B828E` (muted)
- Accent (violet): `#635BFF`, strong `#4A43DE`; loss red: `#E5485D`; gain green: `#168A62`
- Font: **Inter** (400/600/700/800), tabular numerals for figures
- Card radius 16px, border 1px, shadow `0 8px 30px rgba(17,24,39,0.06)`

**Header:** left — a small circular lens logo (charcoal top half `#09090B`,
coral bottom half `#E53935`) + wordmark "Shock **Lens**" (gray `#71717A` for
"Lens"), then a thin vertical divider, then the two-line tagline "See the
risk / before the market does". Right — "Jonathan Devano" and
"IIMT1611 · INDIVIDUAL PITCH" in small caps. Thin divider below.

**Two columns (left ≈ 60%, right ≈ 40%):**

Left column, top to bottom:
1. Eyebrow in violet caps: "AI PORTFOLIO RISK COPILOT"
2. Hero stat: "−$9,690" at ~96px extra-bold in loss red `#E5485D`, followed
   by smaller gray text: "from one question — “What if the AI bubble bursts?”"
3. One paragraph: "**Anna holds $100,000 across 15 investments.** When the
   AI bubble makes headlines, she can read the news — but not what it would
   cost her. So she guesses."
4. Highlighted "EVIDENCE" card (white, violet 4px left rail):
   "Prediction markets price it: AI-bubble burst by Dec 2026 → **7%**
   (Polymarket, ~$3.2M traded, retrieved 4 Oct 2026). One click later:
   **−9.7%**."
5. Label/body rows, uppercase muted labels, ~20px body:
   - SOLUTION — "Any “what if” → dollar impact + which holdings drive it.
     **AI interprets; math measures; every number auditable.**"
   - BUSINESS — "**Free for investors.** Brokers pay a per-client fee —
     informed clients panic less and leave less."
   - SCALE — "One broker integration reaches all its clients; new scenarios
     are data files, not builds; marginal cost is AI compute. **Pilot ask:
     one platform.**"
6. Closing line with a thin top divider: "Today, Anna guesses.
   **With Shock Lens, she sees it first.**" (second sentence in violet)

Right column: a white card containing the **final product screenshot**
(use `one-slide-presentation/assets/final-product.png`): the app's top nav
(Portfolio / **Stress Test** / Scenarios / Settings), a red banner
"−$9,690", the stat row "INITIAL VALUE $100,000 · STRESSED PORTFOLIO VALUE
$90,310 · LARGEST DOWNSIDE CONTRIBUTOR NVDA −$3,150", a "HOLDING
CONTRIBUTION TO DOWNSIDE" table (NVDA −$3,150 32%; QQQ −$2,340 24%; TSM
−$1,210 12%; AAPL −$780 8%; MSFT −$640 7%; Other (10) −$1,570 17%) with
red/green bars, and a "WHY THIS MATTERS" box: "Most of the estimated
downside comes from your concentration in NVDA and QQQ, which together
account for roughly 51% of the total estimated impact." Below the card,
small caption: "AI Bubble Bursts · demo portfolio: 15 tickers, one risk —
NVDA, QQQ and TSM are 23% of the money and nearly two-thirds of the loss."
plus a pill "ENGINE-COMPUTED".

**Footer, small muted text:** "Sources: Polymarket “AI bubble burst by
December 31, 2026?” (7% Yes, ~$3.2M volume, retrieved 4 Oct 2026); Shock
Lens app run on the bundled demo portfolio (Global Multi-Asset, $100k) —
scenario shocks are illustrative assumptions, all portfolio impact computed
by the deterministic engine, not the AI." Right side: "Not investment
advice."

**Hard rules:** One page only. Every number must match the screenshot and
the source line — invent nothing. AI-generated estimates must stay labelled
"illustrative". Do not add buy/sell/hold language anywhere.

---

## Reference files in this repo

| Purpose | File |
| --- | --- |
| Final one-page PDF | `DEVANO_Jonathan_ShockLens.pdf` |
| Approved slide artwork (PDF source) | `Shock Lens_ AI Portfolio Stress Test.png` |
| Editable source HTML (same copy) | `slide.html` |
| Cropped product screenshot | `assets/final-product.png` |
| Brief + rubric | `IIMT1611-Individual-Pitch-Session.md` |
| Script + timing | `one-minute-script.md` |
| 3-min → 1-min mapping | `slide-storyboard.md` |

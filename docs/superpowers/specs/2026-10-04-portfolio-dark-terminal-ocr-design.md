# Dark terminal overhaul: portfolio, alerts and stress views with OCR importer

Branch: `feature/dark-risk-terminal`. Status: design approved with the user on 2026-10-04; the alerts and stress sections were added after the first review.

## Context

The Your portfolio view is light, scrolls as a column of cards, and imports
holdings only from CSV. The Alerts & signals view renders the live feed as a
flat bordered list. The Stress analytics view wastes half the viewport on an
empty placeholder. Every view styles itself through the same semantic
Tailwind tokens (`surface`, `ink`, `line`, `accent`, `risk`), so one palette
change reskins the whole app.

This change:

1. Flips the palette to a dark, high-contrast interface.
2. Locks the portfolio, alerts and stress views to one viewport with no page
   scroll.
3. Adds a vision OCR importer for broker screenshots with a verification step.
4. Rebuilds the alerts feed as dense signal cards.
5. Rebuilds the stress view as a 50/25/25 bento with live telemetry.

Constraints from `AGENTS.md` shape the design: `make dev` must stay fully
offline with `AI_PROVIDER=mock`; LLMs produce assumptions, never portfolio
numbers; every LLM call goes through `complete_json()`; model output is
untrusted; no fabricated data; frontend renders, backend computes.

## Decisions settled with the user

1. App-wide token flip. Other views inherit dark; only hardcoded colors in
   charts and the logo get targeted fixes.
2. OCR runs through a new backend vision endpoint with a mock provider so the
   offline demo works end to end.
3. The bottom panel gets Holdings, Performance and Analytics tabs. No existing
   feature is deleted.
4. Unslop rules win over the literal prompts: accent stays `#635BFF`, no glow
   shadows, text-only button labels, no dead bell icon.
5. The alerts view folds into this spec and plan rather than shipping as a
   follow-up.
6. The stress view folds in the same way. Committee model names come from the
   live roster endpoint, not the stale names in the prompt.

## 1. Dark palette

Redefine the tokens in `apps/web/tailwind.config.js`:

| Token | Value | Job |
| --- | --- | --- |
| `surface` | `#000000` | page background |
| `surface.sunken` (new) | `#0B0E14` | sidebar, header |
| `surface.raised` | `#12161F` | cards |
| `surface.higher` | `#1B202B` | inputs, hover, wells |
| `ink` | `#FFFFFF` | primary text |
| `ink.secondary` | `#CBD5E1` | detail text |
| `ink.tertiary` | `#94A3B8` | labels, still readable on cards |
| `line` | `#1F2633` | hairline borders |
| `line.strong` | `#2E3646` | control borders |
| `accent` | `#635BFF` | unchanged, the single accent |
| `accent.strong` | `#8F8AFF` | accent text on dark |
| `risk.negative` | `#EF4444` | loss fills |
| `risk.negative-strong` | `#F87171` | loss text |
| `risk.warning` | `#F59E0B` | warning |
| `risk.positive` | `#10B981` | gain |
| `risk.neutral` | `#94A3B8` | neutral series |

`bg-ink text-white` currently styles inverted controls (active nav, primary
buttons). On dark that becomes white on white, so those 14 uses move to a new
pair `control` (`#FFFFFF`) and `control-content` (`#0B0E14`), giving the white
pill button common in dark fintech UIs. Hover states use `bg-control/90`.

Hardcoded chart colors are replaced with the tokens:

- tooltip background `#FFFFFF` becomes `#1B202B`, border `#E3E6EB` becomes
  `#2E3646`, label `#121318` becomes `#FFFFFF`
- grid `#E8EAF0` becomes `#232936`, axes and ticks `#7B828E` become `#94A3B8`
- the white allocation donut ring stays white inside the card, the empty ring
  fallback `#ECEEF2` becomes `#1B202B`

`Logo.tsx` inverts: mark fill `#09090B` becomes white, wordmark uses
`text-ink`, "Lens" uses `text-ink-tertiary`. The coral shock line stays.

`index.css` sets `color-scheme: dark` and thin dark scrollbars. The print
block already forces white and is unchanged.

## 2. Shell and 100vh lock

`AppShell` takes a `locked?: boolean` prop, passed from `App.tsx` for the
`portfolio` and `risks` views.

Locked mode:

- root `h-screen overflow-hidden`
- sidebar `h-full` with its own internal scroll
- content column `h-screen flex flex-col`, header `shrink-0`
- main `flex-1 min-h-0 overflow-hidden`
- footer becomes a single-line slim bar (`text-[11px] py-2 shrink-0`) so the
  disclaimer stays visible without consuming the viewport

All other views keep the current scrolling behavior. The existing AppShell
header already carries the title, the eyebrow, the portfolio switcher, the
report button and the avatar, so neither locked view adds a duplicate header.

## 3. Portfolio view

`PortfolioOverview` in locked mode renders `flex h-full flex-col gap-4 min-h-0`:

### Hero banner (shrink-0, 3 columns)

1. Total value in mono plus an overall return pill. The return is the
   weight-sum of `prices.history.series[].change_pct` over the loaded range,
   labeled "since <first date>". If prices fail, the pill is hidden, never
   faked.
2. Positions count plus an allocation ribbon: one horizontal segmented bar of
   asset-class weights from the current positions.
3. Largest position (symbol and weight) plus a deterministic concentration
   band: below 20 percent "Moderate", 20 to 35 "Elevated", above 35 "High".

### Bottom panel (flex-1 min-h-0)

Tab bar: Holdings, Performance, Analytics.

- Holdings: search filter on symbol, name and class; `Total: 100.0%` weight
  indicator using the existing tolerance (`WEIGHTS_TOLERANCE = 0.01`); action
  bar with Scan Broker Screenshot (primary), Import CSV (existing
  `PortfolioImporter`), Auto-Normalize, Reset demo portfolio.
- Performance: existing `PerformanceChart`, `PerformanceAttribution` and
  `RiskSummaryPanel`.
- Analytics: existing `AllocationDonut`, `AssetClassBreakdown`,
  `ScenarioExposureChart` and `ModeledRiskExposure`.

Panels inside a tab scroll internally when needed. The page itself never
scrolls. The footer move keeps the compliance line on screen.

### Holdings table

Columns: HOLDING, ASSET CLASS, WEIGHT, MARKET VALUE, RETURN.

- Holding cell: avatar tile colored from the existing `HOLDING_COLORS` by
  index, ticker in white, full name in slate.
- Weight: existing range input paired with the existing numeric input.
- Market value: monospace.
- Return: existing badge, emerald or crimson.
- Row height target 40 to 48 px with a sticky header; the rows container is
  the only scrollable region.
- Auto-Normalize divides every weight by the current sum (pure helper,
  disabled when the sum is already within tolerance). It changes only
  client-side state through the existing `onWeightChange` path.

## 4. Alerts & signals view

The view also runs in locked mode. The feed data already carries everything
the card design needs, so no backend change is required.

Layout inside main, top to bottom:

- view header: the existing three-tab control (Live signals, Scenario library,
  Risk radar) moves out of `App.tsx` into the view and renders as a pill
  control. The shell header keeps the title, portfolio switcher, report and
  avatar.
- filter ribbon (`shrink-0`): All, Official, Newswire, Aggregator, Market
  signal, plus the Portfolio only toggle (the existing `onlyRelevant` state,
  restyled). Tier 2 joins the current All/1/3/4 options. Filtering stays
  client-side.
- source ribbon (`shrink-0`): `RiskFeedResponse.sources` renders as micro-pills
  with an ok/down dot and a count badge, horizontally scrollable when narrow.
- feed container (`flex-1 min-h-0 overflow-y-auto`): the only scroll region.
- signal cards: left block holds the tier tag, kind, source, relative time,
  the headline link, ticker chips from `held_exposure` (click opens the asset
  drawer, arrows colored by `direction`), and the footnote with tier, exposure
  percent and factor labels. Right block holds the mono impact score from
  `relevance * 100` with deterministic thresholds (70 or more crimson, 40 to
  69 amber, below 40 slate), the stress projection pill from
  `suggested_scenario`, the historical analogues from `history`, and the
  Draft AI Scenario button only when `onDraft` is provided.

The empty state keeps the existing "No items match right now." text.

## 5. Stress analytics view

The view also runs in locked mode, as a 12-column grid with rows sized
2fr / 1fr / 1fr and `min-h-0` on every cell. Each cell scrolls internally.

Top left, scenario builder (5 columns): one text input that filters library
scenarios as a dropdown and accepts free text, the existing picker and custom
input unified into a single bordered block. Preset pills run immediately and
map to existing deterministic inputs:

- Oil +40% / Nasdaq -15%: `factor_shocks` `{oil: 40, nasdaq: -15}`
- Fed rate cut 50bps: `factor_shocks` `{rates: -0.5}`
- Crypto flash crash: custom shocks `{BTC: -30}` (illustrative assumption)
- Taiwan Strait escalation: library scenario `taiwan-strait-blockade`

The existing `ScenarioEditor` renders below with internal scroll, and the Run
button stays.

Top right, telemetry (7 columns): before any run it shows the baseline from
`compareScenarios`: worst modeled scenario, its impact percent and value, a
radial arc in the existing gauge style, factor sensitivity bars from
`RiskDriversResponse` levels, and vulnerable asset class pills aggregated from
`asset_contributions`. After a run it switches to the result with Baseline,
Result and Brief tabs, hosting compact forms of `StressTestResult` and
`RiskBriefPanel`. Arc color follows deterministic bands: below -15 percent
crimson, -5 to -15 amber, above -5 mint. Typed text previews after a 600 ms
pause when the parser recognizes it, labeled as a preview; presets and Run are
immediate. No fabricated streaming.

Middle (12 columns): the committee panel with the live roster, model ids in
mono pills, focus lines from the roster, a status label driven by
`useAiStatus` (offline shows a demo label, never a fake "agents ready"), the
full-width convene button, and verdict output with internal scroll.

Bottom (12 columns): the mitigation dock. KPI strip from
`MitigationCompareResponse` (`worst_before`, `worst_after`,
`biggest_downside_reduction`), compact holding sliders with the existing
normalize function, and the per-scenario comparison table with internal
scroll.

The full-page result remains available on the printable report; nothing is
deleted.

## 6. Backend OCR

### Schemas (`app/schemas/ai.py`)

```python
class HoldingsScanRequest(BaseModel):
    image_base64: str
    mime_type: Literal["image/png", "image/jpeg", "image/webp"]

class ExtractedPosition(BaseModel):
    symbol: str
    name: str
    value: float
    weight: float | None = None
    matched: bool = False

class HoldingsScanResponse(BaseModel):
    positions: list[ExtractedPosition]
    broker: str | None = None
    source_name: str
    source_status: Literal["illustrative"] = "illustrative"
    is_live: bool = False
    warnings: list[str] = []
    message: str | None = None
```

### Provider

`ScenarioAIProvider.parse_holdings(image_base64, mime_type)` joins `base.py`.
The mock provider returns a fixed three-position demo extraction with
`is_live=False` and `source_name="Mock vision"`. The OpenRouter provider calls
`complete_json()` with a new optional `images` argument that appends a
`{"type": "image_url"}` content part (data URL). The prompt requests strict
JSON and asks only for ticker, company name, current value and optional
percentage. It never asks for opinions or advice.

Cleaning is deterministic Python in `openrouter.py`:

- uppercase and trim symbols and names, cap name at 80 chars
- drop rows with a non-finite or non-positive value
- clamp optional weight into 0..1
- dedupe by symbol, keeping the row with the largest value
- cap at 50 positions
- set `matched` by membership in `data/assets/supported_assets.json` using the
  existing loader

All rows are `source_status="illustrative"` regardless of provider, matching
the AI policy. Images are never written to disk or logged.

### Route

`POST /api/ai/parse-holdings` in `api/routes/ai.py`:

- pydantic rejects a bad mime type with 422
- the decoded image must be at most 6 MB, otherwise 422 with a clear message
- provider unavailability returns HTTP 200 with `positions: []` and a readable
  `message`, mirroring the committee degrade pattern
- unknown-ticker rows stay in the response with `matched=False` and a warning
  so the user can see what was skipped

No new environment variable. The endpoint reuses `OPENROUTER_MODEL`, which
must be vision capable; an unsupported model surfaces as the friendly
provider-unavailable message.

## 7. Frontend OCR flow

`BrokerScanModal`:

- drag-and-drop zone plus file picker, accepts png, jpeg, webp
- client-side size check with a readable error
- image preview, upload progress state and a close button
- "Demo extraction" badge when `is_live` is false
- on success hands the response to the verification drawer

`ImportReviewDrawer`:

- one row per extracted position: symbol, name, value, computed weight
- unmatched symbols flagged and excluded from Apply, counted in a warning
- Auto-Normalize toggle, default on
- Apply builds a `Portfolio` (`id: "ocr-import"`, name from the broker or
  "Imported portfolio", `total_value` the sum of values, weights from value
  share when normalization is on, otherwise the extracted percentages if they
  sum to 100 percent) and calls the existing `onImportPortfolio`
- values are treated as being in the active portfolio currency, and the drawer
  says so

## 8. Types and docs

- Mirror the schemas in `apps/web/src/types/ai.ts` with snake_case fields.
- Update `docs/API_CONTRACT.md`, `docs/CURRENT_STATE.md` and
  `docs/MULTI_AGENT_ORCHESTRATION.md` (new endpoint and provider method).
- `.env.example` unchanged: no new settings.

## 9. Testing

Backend pytest:

- mock `parse_holdings` returns the demo list with `is_live=False`
- `clean` drops invalid values, dedupes, caps rows and flags unknown symbols
- route with a patched provider returns positions; oversize payload 422; bad
  mime 422; provider unavailable 200 with `message`
- the existing 181 tests keep passing

Frontend: `make check` plus rendered checks at 1280, 1440 and 1920 confirming
`document.scrollHeight === document.clientHeight` on the portfolio, alerts and
stress views, no dead space, tier 2 filter and source ribbon rendering, the
stress bento filling its rows, and the scan flow working against
`AI_PROVIDER=mock`.

## 10. Implementation order

1. Tokens, shell lock plumbing, logo, chart color fixes. Dark lands app-wide
   with tests green.
2. Portfolio locked layout, hero, tabs, holdings restyle, action bar without
   Scan.
3. Search, Auto-Normalize, CSV and reset wiring.
4. Alerts view locked layout, tab control, filter and source ribbons, signal
   cards.
5. Stress view bento, builder presets, telemetry, committee, mitigation dock.
6. Backend schemas, provider, route, tests.
7. Frontend modal, drawer, types, wire Scan.
8. Docs, `make check`, rendered verification.


## Risks

- Short viewports around 900 px leave roughly 500 px for the portfolio table
  rows and the alerts feed; both containers scroll internally. Accepted, the
  page never scrolls.
- Vision output varies; cleaning marks anything unknown instead of applying it
  silently.
- The token flip touches every view. Hardcoded light colors were audited and
  only the chart and logo cases above need patches.

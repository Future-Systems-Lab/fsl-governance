# Frontend/Design Agent — Figure Review

**Perspective:** Visual design quality — composition, balance, color, typography, hierarchy, alignment
**Benchmark:** Welzel et al. (npj Digital Medicine, 2025); Nature Methods figure guidelines; IEEE VIS best practices

---

## FIGURE 1 — System Architecture

**VERDICT: REJECT (needs rebuild)**

ISSUES:
- Visual: Matplotlib default styling with `opacity: 0.3` fills on boxes. Colors are washed-out pastels (light blue, light green, light purple) that lack contrast. Black 0.8pt stroke on all elements creates a "wireframe" feel, not publication quality.
- Composition: Five platform boxes crammed into the top third of a 405×458px canvas. The on-chain/off-chain separation dashed line is visually subordinate to the boxes above it. No visual weight hierarchy — everything is the same size and opacity.
- Typography: Matplotlib's default font (DejaVu Sans) at tiny sizes. Labels are truncated or overlap at this resolution. No font hierarchy between titles, labels, and descriptions.
- Color: No intentional palette. The semi-transparent fills create muddy visual weight. No accent color draws the eye to the most important element (EIP-191 auth).
- Alignment: Matplotlib auto-layout produces acceptable grid alignment but the vertical spacing is uneven.

SUGGESTED IMPROVEMENT: Vector diagram with a defined palette (2-3 colors + neutrals). Minimum 1200px wide. Clear visual hierarchy: platform layer (bold), contract layer (medium), data flow arrows (light). Typography in a professional sans-serif (Inter, Source Sans, or Helvetica) at 9pt+ for all labels.

---

## FIGURE 2 — EIP-191 Consent Flow

**VERDICT: REJECT (needs rebuild)**

ISSUES:
- Visual: Swimlane diagram rendered as a Matplotlib plot with thin dashed vertical lines at `opacity: 0.3`. The "lanes" are barely visible. Numbered steps use tiny text that is unreadable at journal print size.
- Composition: The entire sequence is vertically compressed into a narrow column. Horizontal arrows between lanes collide with step numbers. No breathing room between steps.
- Typography: Step descriptions are microscopic. A print journal would render them at approximately 4-5pt — illegible.
- Color: Black text on white with faint gray lines. No color coding for different types of interactions (client-side vs server-side vs blockchain).

SUGGESTED IMPROVEMENT: Standard UML sequence diagram style with properly spaced swimlanes, activation bars, labeled arrows at readable size, and color-coded interaction types. Mermaid.js or diagrams.net would produce superior output in minutes.

---

## FIGURE 3 — Zero-PHI Data Classification

**VERDICT: REJECT (needs rebuild)**

ISSUES:
- Visual: Three stacked rectangles with barely distinguishable pastel fills (blue, orange, green — all at 12% opacity). The visual hierarchy is inverted — Tier 1 (on-chain, most important for the paper's argument) has the same visual weight as Tier 3.
- Composition: The three tiers fill the vertical space evenly, but the labels and descriptions within each tier are cramped with poor line spacing. The dashed separator between "what's stored" and "what's NOT stored" is the key visual and it's nearly invisible.
- Typography: Tier labels are too small. Content descriptions within tiers are smaller still. No bold/regular weight distinction between tier names and their contents.
- Balance: The entire figure leans left with text cramped against the left edge.

SUGGESTED IMPROVEMENT: Horizontal table layout or nested box diagram with strong tier labels, explicit content lists, and a visually prominent "Zero PHI" banner spanning all tiers. Use opacity/saturation to create visual depth (Tier 1 = most saturated as it's on-chain).

---

## FIGURE 4 — Attestation Lifecycle

**VERDICT: REJECT (needs rebuild)**

ISSUES:
- Visual: Mixed visual language — gray boxes on the left with a red/coral block on the upper right. The red element dominates visually but doesn't represent the most important information (it appears to be a "Phase" indicator, not the attestation flow).
- Composition: Severely unbalanced. Three left-column boxes of equal size compete for attention with a large colored block on the right. The connecting lines between them are thin and lost against the larger elements.
- Typography: Box labels appear to be single letters (N, A, S) with parenthetical descriptions — cryptic without the caption.
- Color: Red/coral accent has no semantic meaning established in other figures. The gray → red → blue progression doesn't map to any logical sequence.

SUGGESTED IMPROVEMENT: Horizontal state machine diagram: [No Session] → startSession() → [Active] → endSession() → [Completed], with Guide and Participant swimlanes showing who can call what. Use a single accent color for state transitions.

---

## COMPARATIVE BENCHMARK

**Welzel et al. (npj Digital Medicine, 2025):**
- Consistent teal/gray/white palette across all figures
- Clean vector rendering at high resolution
- Labeled arrows with verb-noun descriptions
- Clear visual hierarchy (headers > component labels > descriptions)
- Generous white space and balanced composition

**What FSL figures lack:**
1. Resolution (405px is ~50% of minimum for single-column journal print)
2. Intentional color palette (Matplotlib defaults ≠ design)
3. Typography hierarchy (everything is the same size)
4. Visual narrative (figures don't tell a story without the caption)
5. Professional tooling (Matplotlib is for data plots, not architecture diagrams)

**Overall assessment:** These figures read as auto-generated placeholders. They would immediately signal "work in progress" to a journal reviewer. Complete rebuild required with professional vector tooling.

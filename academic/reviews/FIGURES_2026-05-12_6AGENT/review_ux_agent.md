# UX Agent — Figure Review

**Perspective:** Readability — can a reader understand each figure without reading the caption?
**Benchmark:** "5-second test" — does the reader grasp the figure's main point within 5 seconds of looking at it?

---

## FIGURE 1 — System Architecture

**VERDICT: REJECT (needs rebuild)**

ISSUES:
- Readability: Fails the 5-second test. A reader sees colored rectangles with tiny text and connecting lines. The main point ("five platforms share a unified EIP-191 auth layer connecting to on-chain contracts") is not visually communicated.
- Visual narrative: No entry point for the eye. All boxes are the same size and opacity. The reader doesn't know where to start looking.
- Self-explanatory: Without the caption, this could be any microservice architecture diagram. The unique FSL contribution (on-chain/off-chain separation with zero PHI) is invisible.
- Accessibility: Low contrast fills at 30% opacity on white background would be challenging for colorblind or low-vision readers.

SUGGESTED IMPROVEMENT: Add a clear visual entry point (title or hero element), directional flow (top-to-bottom or left-to-right), and semantic grouping that communicates the architecture without any text.

---

## FIGURE 2 — EIP-191 Consent Flow

**VERDICT: REJECT (needs rebuild)**

ISSUES:
- Readability: Fails the 5-second test. A reader sees vertical lines with small numbered labels and horizontal arrows. The sequence is technically correct but visually incomprehensible at the rendered size.
- Visual narrative: The "aha moment" (step 5 where consent = authentication via personal_sign) has no visual emphasis. It's just another arrow.
- Self-explanatory: Without extensive caption reading, a reader cannot determine what the numbered steps represent or why this sequence matters.
- Flow direction: The top-to-bottom flow is correct for sequence diagrams but the horizontal arrows between lanes are so thin they disappear.

SUGGESTED IMPROVEMENT: Emphasize step 5 with a visual highlight (border, color change, callout box). Add descriptive labels on each arrow (not just numbers). Make the swimlane headers bold and readable.

---

## FIGURE 3 — Zero-PHI Data Classification

**VERDICT: NEEDS REVISION**

ISSUES:
- Readability: Partially passes the 5-second test — a reader can see three tiers. But the critical insight ("none of these tiers contain PHI") requires reading the tiny text within each tier.
- Visual narrative: The tiered structure communicates "classification" but doesn't communicate "exclusion." The figure should scream "no PHI anywhere" but instead it whispers it.
- Self-explanatory: A reader might understand there are three data tiers but won't grasp why that matters without the caption.
- Labeling: Tier names and contents need more visual separation. Currently they blend into continuous text blocks.

SUGGESTED IMPROVEMENT: Add a prominent cross-cutting element (red banner, strike-through overlay, or sidebar) showing "Zero PHI — no Safe Harbor identifiers in any tier." Make the absence of PHI the dominant visual element.

---

## FIGURE 4 — Attestation Lifecycle

**VERDICT: REJECT (needs rebuild)**

ISSUES:
- Readability: Fails the 5-second test. Three gray boxes with single-letter labels (N, A, S?) and a red block. A reader cannot determine this represents a session lifecycle without extensive study.
- Visual narrative: The lifecycle narrative (before session → during → after) is not visually communicated. The boxes don't suggest temporal progression.
- Self-explanatory: The single-letter labels are cryptic. "N" could mean "Network," "Node," "Nonce," or "Not started" — the reader has no way to know without the caption.
- Spatial logic: The left-to-right or top-to-bottom temporal flow that a lifecycle diagram should have is absent. The three boxes appear to be alternatives, not a sequence.

SUGGESTED IMPROVEMENT: Horizontal timeline or state machine with full-word labels and clear temporal progression. Use arrows between states to show the "flow" of a session lifecycle.

---

## COMPARATIVE BENCHMARK

**Nature Methods figure guidelines** recommend:
- Figures should be self-explanatory (reviewers often scan figures before reading text)
- Labels should be readable at 80% print size
- Color should encode information, not decorate
- White space should guide the eye through the narrative

**FSL figures fail all four criteria.** No figure passes the self-explanatory test. Labels are unreadable at print size. Color is decorative (Matplotlib defaults). White space is poorly distributed.

**Overall assessment:** A reviewer scanning these figures before reading the paper would form a negative first impression. Rebuild all 4 with readability as the primary design goal.

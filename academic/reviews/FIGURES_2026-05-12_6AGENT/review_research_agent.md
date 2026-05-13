# Research Agent — Figure Review

**Perspective:** Publication readiness for peer-reviewed journal (BHTY / npj Digital Medicine tier)
**Benchmark:** Welzel et al. (npj Digital Medicine, 2025) — clean vector figures with clear data flow, labeled components, professional color palette, no Matplotlib defaults.

---

## FIGURE 1 — System Architecture

**VERDICT: REJECT (needs rebuild)**

ISSUES:
- Visual: Matplotlib-generated box diagram at 405×458px — far below the 300 DPI minimum for print journals. Boxes are small, labels truncated. Default Matplotlib styling with semi-transparent fills reads as "student homework."
- Technical: Five platform boxes connected by arrows — the architecture is correct conceptually but the diagram doesn't communicate the on-chain/off-chain separation that is the paper's central contribution.
- Communication: A reviewer would spend more time parsing the tiny text than understanding the architecture. The dashed line separating on-chain from off-chain is the most important visual element and it's nearly invisible.

SUGGESTED IMPROVEMENT: Rebuild as a layered architecture diagram (on-chain layer clearly above/below off-chain layer) with platform icons, labeled data flows, and the EIP-191 consent primitive as the central unifying element. Minimum 1200×800px at 300 DPI.

---

## FIGURE 2 — EIP-191 Consent Flow

**VERDICT: REJECT (needs rebuild)**

ISSUES:
- Visual: Sequence diagram rendered as Matplotlib plot with numbered vertical swimlanes. Text is microscopic. The numbered steps (1-6) collide with arrow labels.
- Technical: The 6-step flow is correct per the paper, but the swimlane labels (Participant, Browser, Vercel, Blockchain) are barely readable.
- Communication: This is the paper's most important figure — it illustrates the core invention. A reviewer should immediately grasp the unified consent+auth pattern. Instead, they'll squint at 8pt text in a 405px-wide image.

SUGGESTED IMPROVEMENT: Proper UML sequence diagram with clear swimlanes, numbered steps with descriptive labels alongside, and a visual callout highlighting where consent and authentication unify into a single cryptographic act.

---

## FIGURE 3 — Zero-PHI Data Classification

**VERDICT: REJECT (needs rebuild)**

ISSUES:
- Visual: Three stacked rectangles with light fills. The tier labels (Tier 1/2/3) and their descriptions are cramped. The color differentiation between tiers is too subtle (all light pastels).
- Technical: The three-tier model is correctly represented but the figure doesn't convey the critical point — that NO tier contains any of the 18 HIPAA Safe Harbor identifiers.
- Communication: This should be the "aha" figure for reviewers skeptical of the zero-PHI claim. Instead it looks like a generic database schema diagram.

SUGGESTED IMPROVEMENT: Table-based figure or layered diagram with explicit "Contains" and "Excludes" columns per tier. Visually emphasize the absence of PHI with red X marks or a highlighted "Zero PHI" callout bar.

---

## FIGURE 4 — Attestation Lifecycle

**VERDICT: REJECT (needs rebuild)**

ISSUES:
- Visual: Three boxes on the left (labeled N, A, S?) connected to a red/coral timeline element on the right. The color scheme (gray boxes + red block) is visually unbalanced and doesn't follow any publication convention.
- Technical: The lifecycle states (Not Started → Active → Settled) are correct but the event names (SessionStarted, SessionCompleted) are not prominently labeled.
- Communication: The guide-initiates → session-occurs → either-party-ends narrative is lost in the abstract box layout.

SUGGESTED IMPROVEMENT: Horizontal state machine or swimlane timeline showing Guide and Participant actions explicitly, with Solidity event emissions as labeled arrows to the blockchain. Show the on-chain record as a distinct visual element.

---

## COMPARATIVE BENCHMARK

Welzel et al. (npj Digital Medicine, 2025, Fig 1): Clean vector architecture diagram with distinct layers (user, application, blockchain), labeled arrows for every data flow, consistent teal/gray palette, and a legend. Resolution appropriate for journal print.

FSL figures lack: resolution, visual hierarchy, intentional color palette, readable typography, and the narrative clarity that makes a figure self-explanatory without its caption.

**Overall assessment:** All 4 figures would harm submission credibility. A BHTY reviewer would interpret these as "not yet ready for peer review." Rebuild all 4.

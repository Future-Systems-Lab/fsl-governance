# META REVIEW — BHTY Paper Figures

**Date:** 2026-05-12
**Reviewed by:** 6 agents (Research, Smart Contract, Frontend/Design, UX, Compliance, Audit)
**Source files:** Matplotlib-generated SVG/PNG, 405×458px, auto-styled

---

## 1. Verdict Per Figure

| Figure | Research | Contract | Design | UX | Compliance | Audit | Consensus |
|--------|----------|----------|--------|----|------------|-------|-----------|
| Fig 1 — System Architecture | REJECT | REVISION | REJECT | REJECT | REVISION | REVISION | **REBUILD** (4 reject, 2 revision) |
| Fig 2 — EIP-191 Consent Flow | REJECT | REVISION | REJECT | REJECT | REVISION | REVISION | **REBUILD** (3 reject, 3 revision) |
| Fig 3 — Zero-PHI Classification | REJECT | REVISION | REJECT | REVISION | REVISION | REVISION | **REBUILD** (2 reject, 4 revision) |
| Fig 4 — Attestation Lifecycle | REJECT | REVISION | REJECT | REJECT | REVISION | REVISION | **REBUILD** (3 reject, 3 revision) |

**Unanimous across all 6 agents: no figure is publication-ready.**

---

## 2. Common Critique Themes (3+ agents per figure)

### All 4 figures:
- **Resolution too low** (6/6) — 405×458px is ~50% of minimum for single-column journal print at 300 DPI
- **Matplotlib default styling** (6/6) — semi-transparent fills, default fonts, auto-layout reads as "auto-generated placeholder"
- **Typography illegible** (5/6) — labels unreadable at journal print size
- **No visual hierarchy** (5/6) — all elements have equal visual weight
- **Fails 5-second test** (4/6) — figure's main point not immediately apparent

### Figure-specific:
- **Fig 1:** 9 contracts not individually shown (4/6), EIP-191 auth not visually distinguished (3/6)
- **Fig 2:** Consent+auth unification point (step 5) not visually emphasized (5/6)
- **Fig 3:** Zero-PHI claim needs visual reinforcement — absence of data not shown (5/6)
- **Fig 4:** Single-party vs two-party auth boundary (deployed vs Phase 5) must be explicit (3/6)

---

## 3. Per-Figure Rebuild Recommendations

| Figure | Recommendation | Rationale |
|--------|---------------|-----------|
| Fig 1 | **Rebuild from scratch** | Needs layered architecture with 9 named contracts, on-chain/off-chain boundary, and EIP-191 as central auth bus |
| Fig 2 | **Rebuild from scratch** | Needs proper UML sequence diagram with readable swimlanes, color-coded interaction types, and visual emphasis on the consent=auth unification |
| Fig 3 | **Redesign with same content** | Three-tier model is correct; needs better visual treatment with "what IS stored" vs "what is NOT stored" dual-column layout |
| Fig 4 | **Rebuild from scratch** | Needs horizontal state machine showing Guide vs Participant actions, with explicit single-party limitation and Phase 5 annotation |

---

## 4. Estimated Rebuild Effort

| Figure | Effort | Notes |
|--------|--------|-------|
| Fig 1 — System Architecture | 3-4 hours | Most complex — 9 contracts, 5 platforms, on/off-chain layers |
| Fig 2 — EIP-191 Consent Flow | 2-3 hours | Standard UML sequence diagram with customization |
| Fig 3 — Zero-PHI Classification | 1-2 hours | Redesign existing correct content |
| Fig 4 — Attestation Lifecycle | 2-3 hours | State machine + swimlane hybrid |
| Style guide + consistency pass | 1 hour | Ensure all 4 figures share palette, typography, and resolution |
| **Total** | **9-13 hours** | |

---

## 5. Tooling Recommendation

| Tool | Pros | Cons | Recommendation |
|------|------|------|---------------|
| **diagrams.net (draw.io)** | Free, SVG export, good for architecture diagrams, fine-grained control | Manual styling, no programmatic generation | **Recommended for Figs 1, 3, 4** |
| **Mermaid.js** | Sequence diagrams natively, Markdown integration | Limited styling control, harder to achieve publication quality | **Recommended for Fig 2 base**, export and polish in vector editor |
| **Figma** | Professional design tool, pixel-perfect | Learning curve, overkill for technical diagrams | Optional for final polish |
| **Excalidraw** | Quick sketching | Too informal for publication | Not recommended |
| **Custom SVG** | Full control, scalable | Time-intensive | For fine-tuning after diagrams.net |
| **Matplotlib** | Currently used | Produces the exact quality we need to escape | **Do not use for figures** |

---

## 6. Would Current Figures Harm BHTY Submission Credibility?

**Yes, materially.**

A BHTY or npj Digital Medicine reviewer encountering these figures would:

1. **Question rigor** — Matplotlib auto-generated figures signal "early draft" or "code output, not publication artifact." Peer reviewers expect intentional figure design.
2. **Miss the contribution** — The paper's central innovation (consent=authentication unification in a zero-PHI architecture) is invisible in the current figures. Reviewers often scan figures before reading text.
3. **Compare unfavorably** — Welzel et al. (npj Digital Medicine, 2025), the paper's primary comparison target, has clean professional figures. FSL's figures would look unprofessional beside them.
4. **Trigger desk rejection** — Some journals desk-reject submissions where figures don't meet minimum quality standards. While BHTY is likely more lenient than Nature Medicine, the figures should not be the reason for rejection.

**Recommendation: Do not submit with current figures. Rebuild all 4 before BHTY submission.**

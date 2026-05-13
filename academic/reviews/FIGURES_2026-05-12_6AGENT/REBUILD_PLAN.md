# FIGURE REBUILD PLAN

**Based on:** META_REVIEW.md (6-Agent Figure Review, 2026-05-12)
**Status:** Plan only — awaiting Dr. Meg approval before build

---

## Style Guide (All 4 Figures)

### Color Palette
| Role | Color | Hex | Usage |
|------|-------|-----|-------|
| Primary (on-chain) | Teal | #00B4D8 | On-chain elements, contract boxes, blockchain layer |
| Secondary (off-chain) | Slate | #475569 | Off-chain elements, server components, PostgreSQL |
| Accent (consent/auth) | Gold | #F59E0B | EIP-191 consent events, authentication flows |
| Alert (absence/exclusion) | Coral | #EF4444 | "Not stored" markers, PHI exclusion indicators |
| Neutral (background) | Light gray | #F8FAFC | Backgrounds, zones, layer separators |
| Text | Dark slate | #1E293B | All labels and descriptions |

### Typography
- **Headers:** Inter Bold, 11pt
- **Component labels:** Inter SemiBold, 9pt
- **Descriptions:** Inter Regular, 8pt
- **Code/addresses:** JetBrains Mono, 7pt
- **Minimum readable size:** 7pt (no text smaller)

### Resolution
- Canvas: 1600×1000px minimum (landscape) or 1000×1400px (portrait)
- Export: SVG primary, PNG at 300 DPI secondary, PDF for paper embed
- Single-column journal width: ~3.5 inches (252pt). Figures must be readable at this width.

### Consistency Rules
- All figures use the same palette, font family, and line weights
- On-chain elements always teal; off-chain always slate; consent events always gold
- Rounded corners: 4px on all boxes
- Arrow style: solid for data flow, dashed for reference/lookup
- Border: 1px #CBD5E1 on all component boxes

---

## Figure 1 — System Architecture (Rebuild from Scratch)

### Layout
Horizontal three-layer diagram:

```
┌─────────────────────────────────────────────────────────┐
│  PLATFORM LAYER (top)                                    │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐         │
│  │Encrypt│ │Hypno │ │Sov.  │ │Alchem│ │Neuro │         │
│  │Health │ │Neuro │ │Ledger│ │Forge │ │Balance│         │
│  └──┬───┘ └──┬───┘ └──┬───┘ └──┬───┘ └──┬───┘         │
│     └────────┴────────┴────────┴────────┘               │
│              ▼ EIP-191 AUTH BUS (gold bar) ▼             │
├─────────────────────────────────────────────────────────┤
│  ON-CHAIN LAYER (teal background)                        │
│  9 contract boxes with abbreviated addresses             │
│  Grouped: Owner-controlled | Permissionless | Scaffolded│
├ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┤
│  OFF-CHAIN LAYER (slate background)                      │
│  PostgreSQL (engagement metadata) │ IPFS (encrypted docs)│
│  "Zero PHI — no Safe Harbor identifiers"                 │
└─────────────────────────────────────────────────────────┘
```

### Key Elements
- EIP-191 auth bus as a prominent gold horizontal bar connecting all platforms
- 9 contracts shown individually with abbreviated addresses (0x1ae1...84e2)
- Access control model badges: "Permissionless" (AlchemistForge), "Owner" (HNT, EHT), "Guide-initiated" (SovereignSession)
- Clear dashed boundary between on-chain and off-chain
- "Zero PHI" annotation on the off-chain layer
- SovereignSession marked with "Phase 5: bilateral consent (planned)" annotation

### Tool: diagrams.net
### Estimated time: 3-4 hours

---

## Figure 2 — EIP-191 Consent Flow (Rebuild from Scratch)

### Layout
UML sequence diagram, 5 swimlanes:

```
Participant    Browser/Wallet    Vercel API    Blockchain    JWT Store
    │               │               │              │            │
    │──── 1. Click Connect ────►│               │              │
    │               │── 2. EIP-6963 discover ──►│              │
    │               │◄── wallet provider ───────│              │
    │               │── 3. eth_requestAccounts ─►│             │
    │               │◄── [address] ─────────────│              │
    │               │               │── 4. Build consent msg ──│
    │               │               │  (wallet addr + timestamp │
    │               │               │   + educational disclaimer)│
    │               │               │              │            │
    │  ╔═══════════════════════════════════════╗   │            │
    │  ║ 5. personal_sign (EIP-191)           ║   │            │
    │  ║ CONSENT = AUTHENTICATION             ║   │            │
    │  ║ Single signature serves as:          ║   │            │
    │  ║  • Identity verification             ║   │            │
    │  ║  • Informed consent                  ║   │            │
    │  ║  • Session authorization             ║   │            │
    │  ╚═══════════════════════════════════════╝   │            │
    │               │── 6. POST /api/auth/verify ──►│           │
    │               │               │── ECDSA recover ──►│     │
    │               │               │◄── signer addr ───│      │
    │               │               │── issue JWT ──────────►│  │
    │               │◄── set cookie (httpOnly, 15min) ──────│  │
    │               │               │              │            │
    │  ◄─── WALLET-GATED SESSION ACTIVE ──────────────────────►│
```

### Key Elements
- Step 5 (personal_sign) in a bold gold-bordered highlight box — this is THE figure's central point
- Callout showing the three-in-one nature: identity + consent + authorization
- Color coding: browser actions (light), server actions (slate), blockchain interactions (teal)
- Consent message contents shown explicitly (wallet address, timestamp, disclaimer text — NO name, email, PHI)
- "Zero PII transmitted" annotation

### Tool: Mermaid.js for base structure, diagrams.net for polish
### Estimated time: 2-3 hours

---

## Figure 3 — Zero-PHI Data Classification (Redesign)

### Layout
Dual-panel table/diagram:

```
┌──────────────────────────┬──────────────────────────────┐
│  WHAT FSL STORES         │  WHAT FSL DOES NOT STORE     │
│  (engagement data only)  │  (18 HIPAA Safe Harbor IDs)  │
├──────────────────────────┼──────────────────────────────┤
│                          │  ✗ Names                     │
│  TIER 1: On-Chain        │  ✗ Dates (birth, admission)  │
│  ┌────────────────────┐  │  ✗ Telephone numbers         │
│  │ Wallet addresses    │  │  ✗ Email addresses           │
│  │ Consent attestations│  │  ✗ SSN                       │
│  │ Achievement tokens  │  │  ✗ Medical record numbers    │
│  │ Session events      │  │  ✗ Health plan numbers       │
│  └────────────────────┘  │  ✗ Account numbers           │
│                          │  ✗ Certificate/license #s     │
│  TIER 2: Off-Chain       │  ✗ Vehicle/device IDs         │
│  ┌────────────────────┐  │  ✗ URLs                       │
│  │ Session metadata    │  │  ✗ IP addresses              │
│  │ Completion rates    │  │  ✗ Biometric identifiers     │
│  │ Engagement scores   │  │  ✗ Photographs               │
│  └────────────────────┘  │  ✗ Any unique identifying #   │
│                          │                               │
│  TIER 3: IPFS (gated)   │  ═══════════════════════════  │
│  ┌────────────────────┐  │  RESULT: FSL is not a        │
│  │ Encrypted documents │  │  covered entity. HIPAA       │
│  │ Wallet-authenticated│  │  does not apply when the     │
│  │ access only        │  │  system never holds the      │
│  └────────────────────┘  │  protected data.             │
└──────────────────────────┴──────────────────────────────┘
  Note: Wallet addresses are pseudonymous — not linked to
  real-world identity by FSL infrastructure.
```

### Key Elements
- LEFT panel (teal-tinted): what IS stored, organized by tier
- RIGHT panel (coral-tinted): explicit enumeration of Safe Harbor identifiers NOT stored
- Visual dominance should be on the RIGHT (the exclusion is the novel claim)
- Wallet address pseudonymity annotation (addresses Audit Agent concern)
- "HIPAA does not apply" conclusion visually prominent at bottom-right

### Tool: diagrams.net
### Estimated time: 1-2 hours

---

## Figure 4 — Attestation Lifecycle (Rebuild from Scratch)

### Layout
Horizontal state machine with two swimlanes:

```
SOVEREIGN GUIDE                    ON-CHAIN                     PARTICIPANT
      │                               │                              │
      │    startSession()             │                              │
      │──── (guide tx only) ─────────►│                              │
      │    params: participant addr,   │                              │
      │            sessionId           │                              │
      │                               │──── SessionStarted event ───►│
      │                               │     (sessionId, guide,       │
      │                               │      participant, timestamp) │
      │                               │                              │
      │         ╔═══ ACTIVE SESSION ═══╗                             │
      │         ║  Off-chain: video    ║                             │
      │         ║  via Daily.co WebRTC ║                             │
      │         ║  No content on-chain ║                             │
      │         ╚══════════════════════╝                             │
      │                               │                              │
      │    endSession()               │    endSession()              │
      │──── (either party) ──────────►│◄──── (either party) ────────│
      │                               │                              │
      │                               │──── SessionEnded event ─────►│
      │                               │     (sessionId, guide,       │
      │                               │      participant, startTime, │
      │                               │      endTime, duration)      │
      │                               │                              │
  ┌─────────────────────────────────────────────────────────────────────┐
  │ PHASE 5 (doctoral research): Both Guide AND Participant submit     │
  │ EIP-191 signatures before session start. Contract verifies both    │
  │ on-chain → immutable bilateral consent proof.                      │
  └─────────────────────────────────────────────────────────────────────┘
```

### Key Elements
- Three-column swimlane: Guide | Blockchain | Participant
- startSession() clearly labeled as "guide tx only" (Audit Agent requirement)
- endSession() shown as callable by either party
- Event parameters displayed in monospace (exact Solidity event fields)
- "Active Session" box showing off-chain engagement (no content on-chain)
- Phase 5 annotation in a distinct gold-bordered box at bottom — clearly separated from deployed functionality
- Deployed contract address: 0xbeb13A...65A1

### Tool: diagrams.net
### Estimated time: 2-3 hours

---

## Build Sequence

1. **Style guide finalization** (30 min) — lock palette, fonts, dimensions
2. **Figure 3** (easiest, 1-2h) — redesign existing correct content, validate zero-PHI argument
3. **Figure 4** (2-3h) — state machine with Phase 5 boundary
4. **Figure 1** (3-4h) — full architecture with all 9 contracts
5. **Figure 2** (2-3h) — sequence diagram with consent=auth highlight
6. **Consistency pass** (30 min) — ensure all 4 share palette, fonts, weights
7. **Export** — SVG, PNG (300 DPI), PDF embed
8. **Paper integration** — replace Matplotlib figures in BHTY_PAPER_v2.html

**Total estimated effort: 10-13 hours**

---

## Approval Gate

Dr. Meg reviews this plan before any build work begins. Key decisions:
- [ ] Approve color palette
- [ ] Approve tool choice (diagrams.net recommended)
- [ ] Approve Figure 2 emphasis (step 5 gold highlight)
- [ ] Approve Figure 3 dual-panel layout (stored vs not-stored)
- [ ] Approve Figure 4 Phase 5 annotation placement
- [ ] Confirm build priority order

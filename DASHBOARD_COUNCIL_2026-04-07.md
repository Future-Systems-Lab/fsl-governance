# FSL Agent Council — EncryptHealth Dashboard Design
## April 7, 2026

### Agents Consulted
hypnoneuro_agent, system_architect_agent, naturopathic_psychology_agent, frontend_agent, compliance_agent

---

## HYPNONEURO_AGENT

**Layout Recommendation:** Floating action button (FAB) in bottom-right corner for game launch, with a dedicated "Neuro Sessions" widget in main dashboard grid.

**Required Components:**
- FAB: "Start Session" with pulse animation when new games available
- Neuro Sessions Widget:
  - Session calendar heatmap (shows frequency/streaks)
  - HNT balance display with 24hr change
  - NFT showcase carousel (3 most recent)
  - "Last Session" timestamp with completion %
- Session detail modal:
  - Game thumbnails grid
  - Session metrics (duration, HNT earned, achievements)
  - Export session data button

## SYSTEM_ARCHITECT_AGENT

**Layout Recommendation:** Three-panel responsive layout — collapsible left nav (200px), main content grid (flex), right activity feed (300px).

**Required Components:**
- Left Nav: Wallet address display, section anchors (Overview, Sessions, Records, Billing)
- Main Grid: 12-column CSS grid with draggable widgets
- Data sync indicators:
  - WebSocket status light (HypnoNeuro live sync)
  - IPFS pin status for record storage
  - SovereignLedger sync timestamp
- API Gateway component for cross-service data flow
- Local IndexedDB for offline-first architecture

## NATUROPATHIC_PSYCHOLOGY_AGENT

**Layout Recommendation:** Vitality-focused dashboard with circular progress indicators replacing traditional clinical metrics.

**Required Components:**
- Vitality Score Widget (0-100 scale based on session engagement)
- Wellness Timeline (non-pathologizing progress tracker)
- Mind-Body Balance Radar Chart:
  - Sleep quality
  - Energy levels
  - Stress resilience
  - Focus clarity
  - Emotional balance
- Session Insights Panel (patterns, not diagnoses)
- Practitioner Notes with FSL-compliant language templates

## FRONTEND_AGENT

**Layout Recommendation:** Mobile-first card-based system with bottom tab navigation on mobile, transitioning to sidebar on desktop (768px breakpoint).

**Required Components:**
- Dashboard Cards (all with skeleton loaders):
  - Quick Stats Card (HNT, NFTs, streak)
  - Session History Card (line chart)
  - Billing Summary Card (claims status)
  - Upcoming Sessions Card
- Token Display Component (animated counter)
- Provider Directory Modal
- Dark theme toggle (persisted)
- Responsive data tables with horizontal scroll
- Toast notifications system

## COMPLIANCE_AGENT

**Layout Recommendation:** Persistent sovereignty banner at top with expandable privacy controls, data management in account settings.

**Required Components:**
- Sovereignty Banner:
  - "You own this data" message
  - Quick revoke access button
  - Active consent count
- Privacy Control Panel:
  - Granular data sharing toggles
  - Export all data button
  - Delete account (with 2FA)
- Disclaimer footer: "Educational wellness tools only"
- Session data encryption indicator
- Zero-knowledge proof badges for sensitive data
- HIPAA-alternative compliance seal

---

## Council Synthesis

**Agreed Layout:** Mobile-first card grid with collapsible left nav on desktop. Sovereignty banner persistent at top. HypnoNeuro FAB for quick game launch. Vitality-focused metrics (not clinical). All data owned by participant wallet.

**Priority Widgets:**
1. Quick Stats (HNT, NFTs, streak, vitality score)
2. Session History (heatmap + line chart)
3. Sovereignty Banner (consent count, revoke button)
4. Upcoming Sessions
5. Billing Summary (SovereignLedger claims)
6. HypnoNeuro FAB (Start Session)

**Design Rules Confirmed:**
- Dark #030B0F, aqua #00D9FF, Chakra Petch
- Zero diagnostic language
- All metrics framed as vitality/engagement, not clinical
- Mobile-first, 768px breakpoint for sidebar
- Skeleton loaders on all data cards

*Decision adopted. Ready for dashboard build sprint.*

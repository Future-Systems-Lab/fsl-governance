# EncryptHealth Dashboard Cleanup — Council Assessment
## SovereignSession Booking Integration + Dashboard UX
**Date:** May 8, 2026
**Status:** Awaiting Dr. Meg approval — DO NOT execute without approval

---

## CRITICAL: Doxy.me → SovereignSession Migration

### Current State (7 Doxy.me references found)

| File | Line | Context | Priority |
|------|------|---------|----------|
| `provider/schedule/page.tsx` | 113 | "Start Session" button → `doxy.me/hypnosispsych` | **P0** |
| `participant/providers/page.tsx` | 270 | "Prefer video call? Doxy.me →" | **P0** |
| `sovereign-ledger/page.tsx` | 200 | Doxy.me link in session flow | **P0** |
| `alchemist-forge/page.tsx` | 205 | Doxy.me reference | P1 |
| `insurance/page.tsx` | 223 | Doxy.me reference | P1 |
| `insurance-navigator/page.tsx` | 297 | Doxy.me reference | P1 |
| `vercel.json` | 10 | CSP allowlist includes `https://doxy.me` | P1 |

### Migration Plan

**Phase A: Replace all Doxy.me URLs (immediate)**

Every `https://doxy.me/hypnosispsych` → `https://session.futuresystemslab.io`

For session-specific links (where a booking exists), use the deterministic room URL:
```
https://session.futuresystemslab.io?room={keccak256(bookingId + guideWallet + participantWallet)}
```

**Phase B: Wire meeting_link auto-population (booking flow)**

When a booking is confirmed in `/api/provider/accept-match/route.ts`:
1. After `UPDATE session_bookings SET status = 'confirmed'`
2. Compute room ID: `keccak256(booking.id + provider_wallet + user_wallet)`
3. Update `meeting_link = 'https://session.futuresystemslab.io?room=' + roomId`
4. The `meeting_link` column propagates to all surfaces that display session join buttons

**Phase C: "Start Session" button logic (participant dashboard)**

Current: Always visible as floating action button
Required: Context-aware behavior
- If booking exists within ±15 min AND status='confirmed': Show "Start Session" → SovereignSession room URL
- If no booking within window: Show "Find a Sovereign Guide" → `/participant/providers`
- If no bookings at all: Show "Launch HypnoNeuro" → therapeutic engagement

**Phase D: Remove `doxy.me` from CSP allowlist**

In `vercel.json`, remove `https://doxy.me` from `connect-src` directive.

---

## Dashboard UX Issues — Council Recommendations

### Issue 1: Duplicate Navigation (tabs + sidebar)

**Council recommendation:** Remove top tabs, keep sidebar only.

Rationale: Sidebar is the standard SaaS pattern. Top tabs + sidebar creates cognitive overload. Sidebar provides clear hierarchy. Mobile: sidebar collapses to hamburger menu (already implemented).

### Issue 2: Mood Frequency Pills

**Council recommendation:** Option (a) — wire pills to Mood Tracker as quick-record buttons.

Each pill click → `POST /api/mood` with the selected frequency. Visual feedback (pulse animation). Removes the disconnect between dashboard view and Mood Tracker functionality.

### Issue 3: Empty State for New Participants

**Council recommendation:** Replace zeros with contextual placeholders.

| Card | Current | Proposed |
|------|---------|----------|
| HNT Balance | 0 | "Earn HNT by completing sessions" |
| Sessions | 0 | "Book your first Sovereign Guide session" |
| NFTs Earned | 0 | "Achievement NFTs unlock as you progress" |
| Vitality Score | 0 | "Begins tracking after your first session" |

### Issue 4: Vitality Score

**Council recommendation:** Label as scaffolded placeholder.

Vitality Score has no formula documented. Until defined:
- Display "Coming Soon" badge on the card
- Tooltip: "Vitality Score will track overall engagement health based on session frequency, game completion, and Sovereign Guide feedback"
- Create `fsl-governance/specs/VITALITY_SCORE.md` as placeholder spec

### Issue 5: Bottom Action Cards vs Sidebar

**Council recommendation:** Option (b) — keep quick-action grid, deduplicate sidebar.

Bottom cards become the primary navigation for participants. Sidebar retains only: Dashboard, Settings, Logout. Quick-action grid: Mood Tracker, Health Records, Sovereign Guides, Insurance/Billing.

### Issue 6: Insurance Card

**Council recommendation:** Rename to "Sovereign Billing."

Per FSL lexicon, insurance is education not administration. The card handles superbill generation and OON reimbursement guidance — rename to "Sovereign Billing" with subtitle "Insurance navigation tools."

### Issue 7: Frequency Portal Activity Label

**Council recommendation:** "Therapeutic Engagement" or "HypnoNeuro Activity."

"Frequency Portal" is internal/brand language. For participants: "HypnoNeuro Activity" (direct, recognizable). For reviewers: "Therapeutic Engagement" (formal).

Pick "HypnoNeuro Activity" for the dashboard (participant context).

### Issue 8: Context-Aware Primary CTA

**Council recommendation:** Single floating button with state-based behavior (described in Phase C above).

---

## Implementation Plan

| Phase | Files | Effort | Priority |
|-------|-------|--------|----------|
| A: Replace Doxy.me URLs | 7 files listed above | 30 min | **P0** |
| B: Wire meeting_link auto-population | `api/provider/accept-match/route.ts` | 1 hour | **P0** |
| C: Context-aware Start Session | `participant/dashboard/page.tsx` | 1 hour | P1 |
| D: Remove doxy.me from CSP | `vercel.json` | 5 min | P1 |
| E: Empty state placeholders | `participant/dashboard/page.tsx` | 30 min | P2 |
| F: Remove top tabs (keep sidebar) | `dashboard/page.tsx`, layout components | 1 hour | P2 |
| G: Rename Insurance → Sovereign Billing | Multiple pages | 30 min | P2 |
| H: Relabel "Frequency Portal" → "HypnoNeuro Activity" | `participant/dashboard/page.tsx` | 10 min | P3 |
| **Total** | | **~5 hours** | |

---

## Council Vote

| Agent | Vote |
|-------|------|
| System Architect | APPROVE — SovereignSession integration is the missing link |
| Security | APPROVE P0 — Doxy.me removal is security posture (third-party dependency) |
| Frontend | APPROVE all phases — UX improvements are overdue |
| Compliance | APPROVE — removing Doxy.me closes the last third-party session dependency |
| Academic | APPROVE — this completes the wallet-native architecture claim for ASU |

**Unanimous APPROVE. P0 phases (A+B+D) can execute immediately. P1-P3 awaiting Dr. Meg go-ahead.**

---

## Dr. Meg Decision Needed

1. **APPROVE P0 only** → Doxy.me replacement + meeting_link wiring + CSP cleanup (~1.5h)
2. **APPROVE P0 + P1** → Add context-aware CTA (~2.5h)
3. **APPROVE ALL** → Full dashboard cleanup (~5h)
4. **MODIFY** → Adjust specific recommendations

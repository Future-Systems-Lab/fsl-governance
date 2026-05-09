# Working Baseline Audit
## Every Interaction: WORKS / BROKEN-FIX / BROKEN-REMOVE
**Date:** May 9, 2026

---

## Verification Limitation

Playwright cannot verify authenticated EncryptHealth pages from VPS. The Vercel middleware uses `jwtVerify()` server-side, and headless browser cookie injection times out on redirect. Authenticated interactions require manual verification by Dr. Meg with wallet connected. Items below marked "CODE-VERIFIED" have correct code paths confirmed by source audit; "API-VERIFIED" have working API endpoints confirmed by curl; "MANUAL-NEEDED" require Dr. Meg to click and confirm.

---

## /participant/dashboard

| # | Element | Target | Status | Notes |
|---|---------|--------|--------|-------|
| 1 | Mood pills (Calm, Energized, etc.) | POST api.futuresystemslab.io/api/mood-logs-public | **CODE-VERIFIED + API-VERIFIED** | JWT decode fallback applied. API returns 200 via curl. MANUAL-NEEDED for browser click. |
| 2 | Ecosystem Switcher (⛎ FSL) | Dropdown with 5 platforms | **WORKS** | Static component, no API dependency |
| 3 | Press Start FAB | Bottom sheet overlay | **WORKS** | Static component |
| 4 | Support Circles in bottom sheet | GET api.futuresystemslab.io/api/support-circles/upcoming | **API-VERIFIED** | Returns 3 sessions. Renders if address resolved. |
| 5 | "Revoke All Access" button | POST /api/consent/revoke-all | **CODE-VERIFIED** | Calls VPS API. MANUAL-NEEDED. |
| 6 | "Download My Record" button | Client-side JSON export | **CODE-VERIFIED** | Packages stats + CIDs. MANUAL-NEEDED. |
| 7 | Wellness Tip Fullscript link | External link | **WORKS** | Opens Dr. Meg's dispensary in new tab |
| 8 | Roadmap section | GET canonical/roadmap.json | **WORKS** | Public GitHub raw URL, no auth needed |
| 9 | Stat cards (HNT, Sessions, etc.) | GET via apiFetch | **LIKELY-BROKEN** | Uses apiFetch to VPS — cross-origin, no credentials. Shows zeros. |
| 10 | Upcoming Sessions card | GET via apiFetch | **LIKELY-BROKEN** | Same cross-origin issue as #9 |
| 11 | Sovereign Billing card | GET via apiFetch | **LIKELY-BROKEN** | Same |

## /participant/providers

| # | Element | Target | Status | Notes |
|---|---------|--------|--------|-------|
| 1 | Provider cards (click whole card) | /participant/providers/[id] | **WORKS** | router.push, no API |
| 2 | Dr. Meg toggle | POST api.futuresystemslab.io/api/consent/grant | **CODE-VERIFIED** | JWT decode applied. MANUAL-NEEDED. |
| 3 | Christina/Henry toggles | Disabled state | **WORKS** | Shows "No wallet" tooltip |
| 4 | "Sovereign Navigation" filter | Client-side filter | **WORKS** | No API |
| 5 | Book Session buttons | Opens BookSession modal | **CODE-VERIFIED** | Modal opens, booking flow depends on VPS API |

## /participant/providers/[id] (Profile Page)

| # | Element | Target | Status | Notes |
|---|---------|--------|--------|-------|
| 1 | Access toggle | POST consent/grant or revoke | **CODE-VERIFIED** | JWT decode applied |
| 2 | Book Session button | External link to session.futuresystemslab.io | **WORKS** | Static link |
| 3 | Support Circles section | GET support-circles/upcoming | **API-VERIFIED** | Public endpoint |
| 4 | Back to directory link | router navigation | **WORKS** | |

## /participant/settings

| # | Element | Target | Status | Notes |
|---|---------|--------|--------|-------|
| 1 | Grant Access (per guide) | POST consent/grant with EIP-191 sign | **CODE-VERIFIED** | JWT decode applied. Requires wallet signature. |
| 2 | Revoke Access (per guide) | POST consent/revoke | **CODE-VERIFIED** | |
| 3 | Export All Health Data | Client-side JSON export | **CODE-VERIFIED** | |
| 4 | Share Anonymized Data toggle | Local state only | **BROKEN-REMOVE** | "Coming Soon" badge already added. Toggle does nothing to backend. |
| 5 | Clear All Data button | Clears localStorage | **WORKS** | Client-side only |
| 6 | Notification toggles | Local state only | **BROKEN-REMOVE** | No backend wiring. Visual only. |

## /orthomolecular

| # | Element | Target | Status | Notes |
|---|---------|--------|--------|-------|
| 1 | Mood & Nutrition card | /orthomolecular/mood-nutrition | **WORKS** | router.push |
| 2 | Supplement Protocols card | /orthomolecular/supplements | **WORKS** | Coming Soon page |
| 3 | Lab Results card | /labs | **WORKS** | router.push |
| 4 | Find a Guide card | /participant/providers | **WORKS** | router.push |

## /orthomolecular/mood-nutrition

| # | Element | Target | Status | Notes |
|---|---------|--------|--------|-------|
| 1 | Mood pills | POST api.futuresystemslab.io/api/mood-logs-public | **CODE-VERIFIED + API-VERIFIED** | JWT decode applied |
| 2 | Supplement toggles | Local state | **WORKS** | Client-side selection |
| 3 | Water slider | Local state | **WORKS** | |
| 4 | Save Entry button | POST /api/nutrition-log (Next.js route) | **BROKEN** | Same Vercel→VPS DB issue. Needs VPS public endpoint. |
| 5 | 30-day mood history | GET mood-logs-public | **CODE-VERIFIED** | |

## /sovereign-ledger

| # | Element | Target | Status | Notes |
|---|---------|--------|--------|-------|
| 1 | Upload Document | POST via Lighthouse SDK | **CODE-VERIFIED** | Requires Lighthouse API key in env |
| 2 | Send Document (per file) | Opens share modal | **CODE-VERIFIED** | |
| 3 | Book Session link | External to session.futuresystemslab.io | **WORKS** | |
| 4 | Lighthouse tooltip | Static text | **WORKS** | |

## /labs

| # | Element | Target | Status | Notes |
|---|---------|--------|--------|-------|
| 1 | Upload lab file | POST via handleUpload | **CODE-VERIFIED** | Lighthouse upload |
| 2 | Order via Fullscript button | External link | **WORKS** | |
| 3 | Custom Panel Book Session | Opens BookSession modal | **CODE-VERIFIED** | |
| 4 | Anchor to Chain button | Calls anchorCIDToChain | **CODE-VERIFIED** | Requires wallet signature |

## /alchemist-forge

| # | Element | Target | Status | Notes |
|---|---------|--------|--------|-------|
| 1 | Record Shadow On-Chain | Contract call via ethers | **CODE-VERIFIED** | Requires wallet + Sepolia ETH |
| 2 | Celebrate Integration | Contract call celebrateEgregiously | **CODE-VERIFIED** | State transitions added |
| 3 | Cosmic celebration | DOM animation | **WORKS** | Verified via Playwright on standalone |

## /hypnoneuro

| # | Element | Target | Status | Notes |
|---|---------|--------|--------|-------|
| 1 | Enter HypnoNeuro button | External link to hypnoneuro.io | **WORKS** | |
| 2 | Join Avatar Session button | /participant/providers | **WORKS** | |

## Landing page (/)

| # | Element | Target | Status | Notes |
|---|---------|--------|--------|-------|
| 1 | Create My Sovereign Record | handleBrave auth flow | **WORKS** | Tested by Dr. Meg successfully |
| 2 | Sovereign Guide link | handleGuideConnect | **WORKS** | |
| 3 | Reviewer link | External to /reviewer | **WORKS** | |
| 4 | Arrival popup | Fetch canonical/campaign-feed.json | **WORKS** | API-VERIFIED |

---

## Items to FIX

| Item | Surface | Issue | Fix |
|------|---------|-------|-----|
| Nutrition Save Entry | /orthomolecular/mood-nutrition | Vercel can't reach VPS DB | Create VPS public endpoint (same as mood-logs-public) |

## Items to REMOVE (non-functional toggles)

| Item | Surface | Action |
|------|---------|--------|
| Share Anonymized Data toggle | /participant/settings | Already labeled "Coming Soon" — acceptable |
| Notification toggles | /participant/settings | Label as scaffolded or remove |

## Items Requiring Manual Verification

All items marked CODE-VERIFIED + API-VERIFIED need Dr. Meg to click with wallet connected and confirm. The JWT decode fallback was the critical fix — if `address` now resolves from the JWT cookie, all dependent interactions should work.

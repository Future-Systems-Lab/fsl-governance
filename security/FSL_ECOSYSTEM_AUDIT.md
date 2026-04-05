# FSL Ecosystem Audit — Round 2 Deep Analysis
**Date:** April 3, 2026  
**Auditor:** FSL Build Agent  
**Scope:** End-to-end user journeys, smart contracts, database, APIs, content, performance

---

## Executive Summary

The FSL ecosystem has **strong infrastructure** (on-chain HNT minting via Sepolia, 168 API routes, 61 database tables, 109 indexes) but **critical frontend-backend integration gaps** that break core user journeys. The biggest issues: onboarding doesn't create user records, session data doesn't display in EncryptHealth, provider access is localStorage-only, and subscription tiers aren't enforced in the UI.

**Verdict:** Backend is substantially built. Frontend is polished UI. The bridge between them is the gap.

---

## AUDIT 1: Live User Journey Testing

### Journey A: New Participant

| Step | Action | Status | Breakage |
|------|--------|--------|----------|
| 1 | Land on fsl-web.vercel.app | ✅ Works | — |
| 2 | Click "Begin Free Trial" | ✅ Works | Links to hypnoneuro-frontend.vercel.app/onboarding/participant |
| 3 | Connect MetaMask | ✅ Works | Wallet connects, persists to localStorage |
| 4 | Complete onboarding | ⚠️ BROKEN | **No backend call** — user record not created, trial not started. Only saves to localStorage |
| 5 | Invite practitioner | ⚠️ BROKEN | **localStorage only** — no backend sync, no on-chain grant, no Telegram notification |
| 6 | Play L1 game | ✅ Works | L1 is open by default (no NFT required) |
| 7 | Earn HNT | ✅ Works | Backend calls `token-engine.js` which mints on Sepolia via viem. **HNT IS real on-chain ERC-20** |
| 8 | Coin burst animation | ✅ Works | HNTCoinBurst.jsx fires in PostSessionModal |
| 9 | EncryptHealth dashboard | ⚠️ BROKEN | **Session history hardcoded to 0** — no API fetches session data from backend |
| 10 | Data Sovereignty page | ⚠️ BROKEN | Provider access section exists but localStorage-only |
| 11 | Revoke access | ⚠️ BROKEN | Removes from localStorage only — no backend/on-chain revocation |

### Journey B: Returning Participant

| Step | Action | Status | Breakage |
|------|--------|--------|----------|
| 1-2 | Wallet auto-reconnect | ✅ Works | checkConnection() reads localStorage, restores state |
| 3 | HNT balance shows | ✅ Works | GET /api/tokens/{address} returns real on-chain balance (100000015 for Dr. Meg) |
| 4 | Previous session data | ⚠️ BROKEN | EncryptHealth dashboard doesn't fetch session history |
| 5 | Subscription enforced | ⚠️ BROKEN | **No frontend tier checking anywhere** — subscription endpoint exists but UI never calls it |

### Journey C: Practitioner

| Step | Action | Status | Breakage |
|------|--------|--------|----------|
| 1 | Telegram invite notification | ⚠️ BROKEN | No code sends invite notification to practitioner |
| 2 | Provider dashboard | ✅ Works | Demo dashboards functional at /provider/dashboard/:slug |
| 3 | View participant records | ⚠️ PARTIAL | Dashboard shows mock data, not real participant data |
| 4 | Session attestation | ✅ Works | SovereignLedger registerClaim functional on Sepolia |
| 5 | Revenue tab | ✅ Works | Mock data displayed, real data from /api/revenue/earnings |

### Journey D: Mobile User (375px)

| Check | Status | Issue |
|-------|--------|-------|
| FSL Web responsive | ✅ Good | Tailwind responsive classes throughout |
| EncryptHealth responsive | ✅ Good | Fixed in Sprint 002 with @media 640px |
| HypnoNeuro responsive | ⚠️ Fair | Feature cards flex-wrap works, but some game UIs may clip |
| Command Center responsive | ✅ Good | Fixed in Sprint 002 with fsl-grid classes |
| Touch targets 44px | ⚠️ Some buttons below 44px | Small text links and footnotes below minimum |

---

## AUDIT 2: Smart Contract Verification

| Contract | Address | Status | Evidence |
|----------|---------|--------|----------|
| **HNT v2 (ERC-20)** | 0x1ae1e10...84e2 | ✅ FUNCTIONAL | token-engine.js calls mint() via viem, balance returns 100000015 for Dr. Meg |
| **MindMasteryNFT** | 0xCb9EcB...7771 | ✅ FUNCTIONAL | token-engine.js has mintNFT(), NeuralBloom calls /api/nft/mint-sovereign |
| **SovereignLedger** | 0xf32979...4A94e | ✅ FUNCTIONAL | blockchain.js has anchorRecord() via viem, registerClaim operational |
| **EHT Token** | 0xbDaeb1...CdC | ❓ NOT REFERENCED | Not found in any backend code — may be dormant |
| **AlchemistForge** | 0xE09233...A324 | ❓ NOT REFERENCED | Not found in any backend code — may be dormant |

**Key Finding:** HNT minting IS real on-chain — `token-engine.js` uses viem to call `mint(address, uint256)` on Sepolia. Previous audit incorrectly flagged this as database-only.

---

## AUDIT 3: Database Integrity

| Metric | Count | Status |
|--------|-------|--------|
| Total users | 4 | Expected (dev stage) |
| Total sessions | 6 | Expected |
| Subscriptions | 3 | Includes audit test entry |
| Superbills | 5 | Functional |
| Revenue splits | 0 | No live splits yet |
| Mood logs | 0 | Feature built but unused |
| Nutrition logs | 0 | Feature built but unused |
| CTA analytics clicks | 1 | Tracking working |
| **Orphaned sessions** | **5 of 6** | ⚠️ HIGH — 83% of sessions have no matching user record |
| Total tables | 61 | Comprehensive schema |
| Total indexes | 109 | Well-indexed |

**Critical Finding:** 5 of 6 sessions are orphaned — wallet addresses in fsl_sessions don't match any user in the users table. This confirms that **onboarding doesn't create user records**.

---

## AUDIT 4: API Endpoint Audit

| Endpoint | Method | Response | Status |
|----------|--------|----------|--------|
| /api/status | GET | `{"status":"live"}` | ✅ 200 |
| /api/tokens/{wallet} | GET | `{"hnt_balance":"100000015"}` | ✅ 200 |
| /api/subscription/tier | GET | Returns tier data | ✅ 200 |
| /api/subscription/start-trial | POST | `{"success":true}` | ✅ 200 |
| /api/analytics/cta/summary | GET | Returns analytics | ✅ 200 |
| /api/revenue/earnings | GET | Returns earnings | ✅ 200 |
| /api/revenue/splits | GET | Returns splits | ✅ 200 |
| /api/tokens/mint | POST | Mints HNT on Sepolia | ✅ 200 |
| Port 4002 root | GET | Cannot GET / | ⚠️ 404 (expected — needs specific routes) |
| **Total routes** | — | **168 defined** | Comprehensive |

**Auth middleware status:** Permissive mode — POST requests warn but don't block unauthenticated calls. Migration flag still active.

---

## AUDIT 5: Content + Lexicon

| Check | Count | Severity | Details |
|-------|-------|----------|---------|
| Placeholder text | 1 | LOW | "SovereignLedger integration coming soon" on provider dashboard |
| FSL lexicon violations | 0 | OK | Medical language only in required legal disclaimers |
| console.log in production | 10 | LOW | All in error handlers (appropriate), should use Sentry |
| Hardcoded test data | 0 | OK | Clean |
| Commented-out code | Minimal | OK | Section dividers only |

---

## AUDIT 6: Performance

| Platform | Bundle Size | Status | Issue |
|----------|------------|--------|-------|
| HypnoNeuro | 643 KB JS | ⚠️ MEDIUM | Should code-split — single chunk |
| FSL Web | 114 KB JS | ✅ Good | Next.js auto-chunked |
| EncryptHealth | ~87 KB JS | ✅ Good | Next.js auto-chunked |

| Asset | Size | Issue |
|-------|------|-------|
| NFT images (5 PNGs) | 11.4 MB total | ⚠️ HIGH — Convert to WebP, save 60-70% |
| Mind_Mastery.jpeg | 1.6 MB | Should optimize to <200KB |
| HypnoNeuro_banner.jpeg | 363 KB | Acceptable |

---

## COMPLETE FINDINGS TABLE

| # | Platform | Category | Severity | Description |
|---|----------|----------|----------|-------------|
| 1 | HypnoNeuro | Journey | **CRITICAL** | Onboarding doesn't create user record or start trial subscription |
| 2 | EncryptHealth | Journey | **CRITICAL** | Session history hardcoded to 0 — no API fetch for session data |
| 3 | All | Journey | **CRITICAL** | Subscription tiers not enforced in any frontend — backend exists but UI never checks |
| 4 | EncryptHealth | Journey | **CRITICAL** | Provider access grant/revoke is localStorage-only, no backend sync |
| 5 | Database | Integrity | **HIGH** | 83% of sessions orphaned — no matching user records |
| 6 | EncryptHealth | Journey | **HIGH** | Mood logs and nutrition logs tables exist but are empty — features unused |
| 7 | HypnoNeuro | Journey | **HIGH** | sessionSync.js still uses silent .catch(() => {}) — no retry queue |
| 8 | All | Mobile | **MEDIUM** | Some touch targets below 44px minimum |
| 9 | HypnoNeuro | Performance | **MEDIUM** | 643 KB single JS bundle needs code splitting |
| 10 | HypnoNeuro | Performance | **HIGH** | 11.4 MB unoptimized NFT images |
| 11 | Backend | Security | **MEDIUM** | Auth middleware in permissive mode — needs migration completion |
| 12 | Backend | Integration | **MEDIUM** | EHT and AlchemistForge contracts not referenced in code |
| 13 | SovereignLedger | Journey | **MEDIUM** | Port 4002 returns 404 on root (needs health check route) |
| 14 | All | Content | **LOW** | 10 console.error statements should migrate to Sentry |
| 15 | Provider | Journey | **LOW** | "SovereignLedger integration coming soon" contradicts other messaging |

---

## What Actually Works End-to-End

| Feature | Status | Evidence |
|---------|--------|----------|
| HNT on-chain minting | ✅ REAL | token-engine.js → viem → Sepolia ERC-20 mint |
| MindMastery NFT minting | ✅ REAL | NeuralBloom → /api/nft/mint-sovereign → Sepolia |
| SovereignLedger attestation | ✅ REAL | blockchain.js → anchorRecord → Sepolia tx |
| Wallet persistence | ✅ WORKS | localStorage fsl_wallet + checkConnection |
| HNT balance display | ✅ WORKS | On-chain balanceOf via backend |
| 27 wellness games | ✅ WORKS | All playable, all mint HNT on complete |
| CTA analytics | ✅ WORKS | Tracking clicks to database |
| Subscription endpoints | ✅ WORKS | Backend tier/trial/upgrade routes functional |
| Provider demo dashboards | ✅ WORKS | 4 providers with 7-tab dashboards |
| Post-session modal | ✅ WORKS | Labs + Fullscript + Insurance CTAs |
| Coin burst animation | ✅ WORKS | HNTCoinBurst.jsx fires on session complete |
| NFT reveal animation | ✅ WORKS | NFTReveal.jsx fires on MindMastery mint |

---

*Round 2 audit complete. The system has strong bones — the critical path is wiring frontend to existing backend.*

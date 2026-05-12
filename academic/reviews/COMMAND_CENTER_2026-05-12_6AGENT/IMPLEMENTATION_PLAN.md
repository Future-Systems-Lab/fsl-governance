# IMPLEMENTATION PLAN -- FSL Command Center Rebuild
**Based on:** META_REVIEW.md (6-Agent Consolidated Review, 2026-05-12)
**Date:** 2026-05-10

---

## Architecture: Two-Tier Split

The Command Center must be split into two tiers to resolve the fundamental conflict identified by the review panel: public credibility surface vs. operational dashboard.

- **Tier 1 -- Public Overview** (unauthenticated, static deploy on Vercel)
- **Tier 2 -- Wallet-Gated Dashboard** (EIP-191 + JWT, same Vercel project with protected routes)

---

## TIER 1 -- PUBLIC OVERVIEW BUILD LIST

**Audience:** ASU admissions, BHTY reviewers, attorneys, collaborators, general public.

### P0 -- CRITICAL (consensus failures, 3+ agents flagged)

| # | Item | Description | Agents | Est. |
|---|---|---|---|---|
| 1.1 | Fix all contract addresses to v2 canonical | Update HNT to `0x1ae1...84e2`, EHT to `0x9358...0d88`, SovereignLedger to `0x4afA...aCc4`. Replace all occurrences (cards, registry, timeline). | 5/6 | 1h |
| 1.2 | Add 4 missing contracts to registry | BenevolenceFund v2, SovereignAchievement, NeuroBalanceConsent, SovereignSession with correct addresses and Blockscout links. Update stat from "5 Contracts Live" to "9 Contracts Live". | 5/6 | 1h |
| 1.3 | Rename "ClaimChain" to "SovereignLedger" | Sweep all 11+ occurrences in card titles, subtitles, registry, timeline steps, agent responsibilities. | 4/6 | 30m |
| 1.4 | Add Trademark 99533250 | Add `Trademark -- U.S. Serial No. 99,533,250` to footer alongside patent. Increase visibility of both IP notices. | 6/6 | 15m |
| 1.5 | Add regulatory disclaimer block | Visible block: "This platform is an educational technology demonstration. It does not provide medical advice, diagnosis, or treatment. Content is for informational and research purposes only." | 3/6 | 15m |
| 1.6 | Add HIPAA "outside scope" framing | Statement: "HIPAA compliance is outside the scope of this Phase 1 demonstration. FSL operates as a sovereign health governance platform, not a covered entity." | 3/6 | 15m |
| 1.7 | Add Phase 1 demonstration banner | Visible banner or card-level notice: "Current Status: Phase 1 Demonstration -- Sepolia Testnet Only -- Not Production." | 3/6 | 15m |
| 1.8 | Remove VPS IP from public view | Replace `74.208.202.239` with a health-check status indicator (green/red dot) or move entirely to Tier 2. | 3/6 | 15m |
| 1.9 | Remove operational details from public view | Remove or redact: deployer wallet full address, agent tier designations, Telegram bot name, service names, cron schedules. These move to Tier 2. | 3/6 | 30m |

### P1 -- HIGH

| # | Item | Description | Agents | Est. |
|---|---|---|---|---|
| 1.10 | Fix patent notice visibility | Change footer patent/trademark from `#ffffff22` (13% opacity) to `#ffffffcc` (80% opacity) and increase font size to at least 12px. | 2/6 | 10m |
| 1.11 | Fix FSL lexicon violations | Replace "patient" with "participant" (2 occurrences), "provider" with "Sovereign Guide" (1 occurrence) in agent descriptions. | 2/6 | 10m |
| 1.12 | Add BHTY paper IPFS link | Add card or section linking to the BHTY paper: `https://ipfs.io/ipfs/QmNUhpwRPrZd5Vk6wLy4pAhFBz3fWYWntKkHC5LXMyCmXu` | -- | 15m |
| 1.13 | Fix status.json deployment | Ensure `status.json` is deployed alongside HTML. Add fallback rendering when fetch fails (show static card data instead of alert). | 2/6 | 30m |
| 1.14 | Fix ticker.js deployment | Ensure `ticker.js` is deployed. Add fallback content in the ticker bar HTML for when script is absent. | 1/6 | 15m |
| 1.15 | Fix Vercel preview URL | Replace ephemeral EncryptHealth preview URL with production alias `secure-health-login.vercel.app`. | 1/6 | 5m |
| 1.16 | Add security headers via vercel.json | CSP meta tag, HSTS, X-Frame-Options DENY, X-Content-Type-Options nosniff, Referrer-Policy. | 1/6 | 30m |

### P2 -- MEDIUM

| # | Item | Description | Agents | Est. |
|---|---|---|---|---|
| 1.17 | Add responsive breakpoints | Add `@media` queries for mobile (< 768px) and tablet (< 1024px). Fix agent grid from 4-col to 2-col on mobile. Fix modal overflow. | 1/6 | 2h |
| 1.18 | Add basic WCAG accessibility | Add `aria-label` to interactive elements, `tabindex` and `role="button"` to clickable divs, focus trap on modals, improve color contrast to 4.5:1 minimum. | 1/6 | 2h |
| 1.19 | Add non-provisional patent deadline | Add milestone: "Non-Provisional Filing Deadline: May 2027" in Progress Tracker or dedicated IP card. | 1/6 | 10m |
| 1.20 | Fix XSS vector in openProj() | Replace `innerHTML` injection from status.json with `textContent`. Validate link URLs against domain allowlist. | 1/6 | 30m |
| 1.21 | Fix scanline animation performance | Replace `top: 0 -> 100vh` with `transform: translateY()` for GPU compositing. | 1/6 | 10m |
| 1.22 | Clean up CSS/JS duplicates | Remove duplicate `.full-width` rule. Consolidate Escape key handlers. Remove dead Rajdhani body font rule. | 1/6 | 15m |

**Tier 1 Total Estimate: ~10 hours**

---

## TIER 2 -- WALLET-GATED DASHBOARD BUILD LIST

**Audience:** FSL operator (deployer wallet holder), authorized collaborators.
**Access:** EIP-191 signature verification + JWT session token.

### P0 -- CRITICAL (operational visibility gaps)

| # | Item | Description | Agents | Est. |
|---|---|---|---|---|
| 2.1 | Implement wallet gate | EIP-191 message signing + JWT middleware. Restrict Tier 2 routes to deployer wallet `0xf22c...F248` and any additional authorized wallets. Reuse EncryptHealth pattern. | 3/6 | 4h |
| 2.2 | VPS health panel | Display uptime, ping status, SSH connectivity for `74.208.202.239`. Poll via lightweight API endpoint on VPS (e.g., `/health` returning JSON). | 4/6 | 3h |
| 2.3 | PM2 / process manager panel | Show process list, uptime, restart counts, memory usage for campaign service, nginx, cron jobs. Requires VPS-side API or PM2 web endpoint. | 4/6 | 3h |
| 2.4 | SSL certificate tracking panel | Display cert expiry dates for hypnoneuro.io, secure-health-login.vercel.app, neurobalance-deploy.vercel.app, and VPS domains. Poll via cert-check API or cron job. | 4/6 | 2h |
| 2.5 | Backup status panel | Show last backup timestamp, success/failure, BackupArchiveContract last anchor tx hash, cron health. Link to Restore Runbook. | 3/6 | 2h |
| 2.6 | Emergency procedures section | Link to or inline the Restore Runbook. Cover: VPS SSH recovery, wallet compromise response (pause contracts / transfer ownership), Telegram bot failover, DNS failover. | 1/6 | 1h |

### P1 -- HIGH

| # | Item | Description | Agents | Est. |
|---|---|---|---|---|
| 2.7 | Real-time contract status | Poll Sepolia RPC (via Infura) for each of 9 contracts -- check bytecode exists, last interaction block. Replace hardcoded "LIVE" badges with real data. Add "last checked" timestamp. | 2/6 | 3h |
| 2.8 | PostgreSQL connection health | Health-check endpoint on VPS that verifies DB connectivity. Display connection status, row counts for key tables. | 1/6 | 1h |
| 2.9 | Full deployer wallet display | Show full address, ETH balance (Sepolia), recent transactions. Acceptable in gated context. | 1/6 | 1h |
| 2.10 | XRPL mainnet status | Display XRPL address `rwR3etLJVxtQXYs2d9jgBQxzHBivtCMdPd`, balance, last transaction. | 2/6 | 1h |
| 2.11 | Agent council full details | Show agent tiers (auto-approve vs human-in-loop), Telegram bot integration, approval history. Safe behind wallet gate. | 1/6 | 1h |
| 2.12 | Per-contract verification badges | Query Blockscout API for verification status of each contract. Display verified/unverified badge on each registry chip. | 1/6 | 1h |

### P2 -- MEDIUM

| # | Item | Description | Agents | Est. |
|---|---|---|---|---|
| 2.13 | Infura RPC endpoint status | Health check against Infura Sepolia endpoint. Display latency, block number, connection status. | 1/6 | 30m |
| 2.14 | Vercel deployment status | Query Vercel API for deployment status of each frontend project. Display last deploy time, status. | 1/6 | 1h |
| 2.15 | Data freshness indicators | Add "last updated" timestamps to every panel. Show staleness warnings when data is older than threshold. | 2/6 | 1h |
| 2.16 | Rate limiting on API endpoints | Add rate limiting middleware to any Tier 2 API routes. | 1/6 | 30m |
| 2.17 | Practitioner acknowledgment link | Add section linking to practitioner acknowledgment flow/document. | 2/6 | 15m |

**Tier 2 Total Estimate: ~26 hours**

---

## WALLET GATING STRATEGY

### Reuse EncryptHealth EIP-191 + JWT Pattern

The EncryptHealth project already implements MetaMask wallet gating. The Command Center Tier 2 should reuse this exact pattern:

1. **Frontend:** User clicks "Unlock Dashboard" button. Page calls `window.ethereum.request({ method: 'personal_sign' })` with a nonce message (EIP-191).
2. **Verification:** Backend (or serverless function) recovers the signer address from the signature using `ethers.utils.verifyMessage()`. Checks against an allowlist (deployer wallet + authorized addresses).
3. **JWT issuance:** On successful verification, issue a JWT with the wallet address as subject. Set `httpOnly` cookie with short expiry (e.g., 4 hours).
4. **Middleware:** All Tier 2 API routes and page renders check for valid JWT. Redirect to Tier 1 if absent or expired.
5. **Allowlist management:** Store authorized wallets in environment variable or Vercel KV. Initially just `0xf22cbF25deEeA36FFF828BAf73CCb049345eF248`.

### Implementation Notes
- No smart contract interaction required for auth -- pure signature verification.
- Works on both Sepolia and mainnet wallets (signature verification is chain-agnostic).
- Vercel serverless functions handle JWT issuance (`/api/auth/verify`).
- Frontend can be a single Next.js app with conditional rendering, or two separate page bundles.
- Fallback: If MetaMask is not installed, show Tier 1 only with a note about wallet requirement for operational dashboard.

---

## PRIORITY RANKING SUMMARY

### Tier 1 -- Do First (public-facing credibility)

| Priority | Items | Combined Est. |
|---|---|---|
| P0 | 1.1 - 1.9 (address fixes, IP notices, disclaimers, redactions) | ~3.5h |
| P1 | 1.10 - 1.16 (visibility fixes, deployments, security headers) | ~2h |
| P2 | 1.17 - 1.22 (responsive, a11y, perf, cleanup) | ~5h |

### Tier 2 -- Do Second (operational depth)

| Priority | Items | Combined Est. |
|---|---|---|
| P0 | 2.1 - 2.6 (wallet gate, health panels, emergency docs) | ~15h |
| P1 | 2.7 - 2.12 (real-time data, full details, verification) | ~8h |
| P2 | 2.13 - 2.17 (monitoring polish, rate limiting) | ~3h |

### Recommended Build Order

1. **Sprint 1 (Day 1-2):** Tier 1 P0 -- fix all addresses, add IP notices, add disclaimers, redact operational data. Deploy immediately. This is the minimum viable public surface.
2. **Sprint 2 (Day 2-3):** Tier 1 P1+P2 -- fix visibility, deploy status.json/ticker.js, add security headers, responsive layout, accessibility pass.
3. **Sprint 3 (Day 4-6):** Tier 2 P0 -- implement wallet gate, build VPS health API, PM2 panel, SSL tracking, backup panel, emergency docs.
4. **Sprint 4 (Day 7-8):** Tier 2 P1+P2 -- real-time contract polling, full operational panels, data freshness indicators.

**Total estimated effort: ~36 hours across both tiers.**

---

## REFERENCE LINKS

- **BHTY Paper (IPFS):** `https://ipfs.io/ipfs/QmNUhpwRPrZd5Vk6wLy4pAhFBz3fWYWntKkHC5LXMyCmXu`
- **BHTY Paper (CID):** `QmNUhpwRPrZd5Vk6wLy4pAhFBz3fWYWntKkHC5LXMyCmXu`
- **Canonical Contracts:** `canonical/contracts.json` (updated 2026-05-09)
- **Restore Runbook:** `operations/RESTORE_RUNBOOK_2026-05-10.md`
- **EncryptHealth Wallet Gate (reference impl):** secure-health-login project
- **Deployer Wallet:** `0xf22cbF25deEeA36FFF828BAf73CCb049345eF248`
- **VPS:** `74.208.202.239` (OpenClaw)
- **Patent:** U.S. Provisional Application No. 64/063,037
- **Trademark:** U.S. Serial No. 99,533,250

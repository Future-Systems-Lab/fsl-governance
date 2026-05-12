# Testing / QA Agent Review -- FSL Command Center
**Source:** `fsl-command-center.vercel.app` (captured 2026-05-12)
**Reviewer:** Testing / QA Agent
**Date:** 2026-05-10

---

## VERDICT: FUNCTIONAL WITH SIGNIFICANT GAPS

The Command Center renders as a single-page static dashboard with a polished dark/cyberpunk aesthetic. Core navigation, card layout, agent modals, and blockchain explorer links are structurally present. However, the page has no responsive breakpoints, no accessibility layer, missing external data files, missing operational panels (backup, health, certs), and stale contract addresses that diverge from the canonical registry. It is a presentational surface, not an operational dashboard.

---

## 1. MISSING ELEMENTS (not present at all)

### 1.1 No status.json File
The HTML fetches `status.json` via a relative path (line 1371). If this file does not exist or fails to load, every project card click triggers `alert('Status loading, try again.')` and the project detail modals are completely non-functional. There is no evidence that `status.json` is deployed alongside the HTML. This is a **critical** gap -- the entire project modal system is dead without it.

### 1.2 No ticker.js File
The HTML loads `<script src="ticker.js"></script>` (line 1388). The ticker bar at the top of the page (`fsl-ticker-inner`) has no content populated by the HTML itself -- it relies entirely on this external script. If `ticker.js` is absent, the ticker bar renders as an empty 36px strip. No fallback content.

### 1.3 No Responsive / Mobile Layout
- Zero `@media` queries in the entire stylesheet.
- The grid uses `grid-template-columns: repeat(auto-fill, minmax(340px, 1fr))` which provides some reflow, but header padding (`2.5rem`), font sizes, the 4-column agent grid, and stat rows have no mobile adaptations.
- The agent grid (`grid-template-columns: repeat(4, 1fr)`) will compress to unreadable chip sizes below approximately 600px viewport width.
- The ticker bar uses `white-space: nowrap` and `overflow: hidden` which is acceptable, but the header flex layout will stack poorly on narrow screens.
- **No viewport-safe handling for modals.** The project modal uses `overflow-y: auto` on its overlay (good), but the agent modal does not, so long agent detail content could overflow on short screens.

### 1.4 No Accessibility (WCAG)
- Zero `aria-*` attributes anywhere in the document.
- Zero `role` attributes.
- No `alt` text on the SVG hex icon (the `<svg>` has no `aria-label` or `<title>` element).
- Interactive elements (agent chips, project cards) use `onclick` on `<div>` elements with no `tabindex`, `role="button"`, or keyboard event handlers. They are unreachable via keyboard navigation.
- The modal close button is a `<button>` (good), but the modal itself has no focus trap -- Tab will escape behind the overlay.
- Color contrast: body text `#ffffff44` (item-label class) against `#060810` background is approximately 1.7:1 ratio. WCAG AA requires 4.5:1 for normal text. Multiple text elements use alpha-blended colors well below contrast thresholds.
- The `<html lang="en">` attribute is present (good).

### 1.5 No Backup Status Panel
The Backup / Sync agent is listed in the Agent Council section and its modal describes responsibilities (git push, BackupArchiveContract anchoring, daily cron at 3:33 AM UTC). However, there is no visible panel showing:
- Last backup timestamp
- Backup success/failure status
- BackupArchiveContract last anchor transaction hash
- Cron job health

### 1.6 No Health Monitoring Panel
No system health dashboard showing:
- VPS (74.208.202.239) uptime or ping status
- PostgreSQL connection health
- Infura RPC endpoint status
- Vercel deployment status for each frontend
- Campaign service status (only a static green dot, not a real check)

### 1.7 No Certificate / SSL Tracking
The QUICK CHECKS section at the bottom of the capture confirms `SSL/cert: 0 matches`. There is no panel tracking:
- SSL certificate expiry dates for hypnoneuro.io, secure-health-login.vercel.app, neurobalance-deploy.vercel.app
- Domain registration expiry
- DNS health

### 1.8 No PM2 / Process Manager Visibility
`PM2: 0 matches` in the quick checks. The VPS runs services (campaign service, nginx) but there is no process health panel.

### 1.9 Missing Contracts from Registry
The Contract Registry card lists 5 contracts + 1 deployer wallet = 6 entries. Per the prior COMMAND_CENTER_AUDIT.md, the canonical set includes 8 contracts. Missing from the current CC:
- **BenevolenceFund** (confirmed 0 matches in quick checks)
- **SovereignAchievement** (0xC3F11d2F...9B8D)
- **NeuroBalanceConsent** (0x21571805...96b8)

### 1.10 No Real-Time Data Freshness Indicators
All status dots (green, yellow) are hardcoded in HTML. None are driven by API calls or health checks. The "LIVE" badges are static strings. There is no "last updated" timestamp visible on the page (the clock shows current UTC time but not data freshness).

---

## 2. PRESENT BUT BROKEN OR PROBLEMATIC

### 2.1 Project Modals Depend on Missing status.json
All six project cards (`hypnoneuro`, `encrypthealth`, `claimchain`, `neurobalance`, `alchemistforge`, `infrastructure`) have `onclick="openProj('...')"` handlers. The `openProj` function checks `FSL_STATUS` which is populated from `status.json`. If the fetch fails (404, network error), `FSL_STATUS` remains `null` and every click shows an alert. The `fetch().catch(() => {})` silently swallows the error with no user-visible degradation message.

### 2.2 Stale Contract Addresses
The CC shows the following addresses that may be outdated per the prior audit:
- **EHT Token**: CC shows `0xbDaeb1d0...2CdC` -- this is identified in COMMAND_CENTER_AUDIT.md as a **v1 address**. The canonical v2 is `0x93583a7A...d88`.
- **ClaimChain**: CC shows `0xf3297920...4A94e` -- the audit identifies the canonical v2 as `0x4afA577f...aCc4` (SovereignLedger v2).
- **HNT Token**: CC shows `0x411426f8...b198` -- the audit identifies the canonical as `0x1ae1e109...84e2`.
- **MindMasteryNFT**: CC shows `0xCb9EcB00...7771` -- the audit notes the canonical may be `0xCb9EcB07...4b0D`.

These are Sepolia testnet addresses so they will resolve on Blockscout, but they may point to deprecated contract versions.

### 2.3 Vercel Preview URL Exposed
The EncryptHealth MetaMask Login link points to a Vercel preview deployment URL:
`https://secure-health-login-dfk6unk2d-megs-projects-95a11e5b.vercel.app/`

This is a deployment-specific hash URL, not a production alias. It will break when the deployment is removed or garbage-collected by Vercel. The display text says `secure-health-login.vercel.app` but the actual href is the preview URL -- this is a mismatch.

### 2.4 Font Loading Conflict
Two Google Fonts stylesheet loads exist:
- Line 12: Orbitron + Rajdhani
- Line 710: Chakra Petch, with an inline `<style>body{font-family:'Chakra Petch',sans-serif}</style>`

The Chakra Petch load overrides the body font to Chakra Petch, but the original CSS sets `body { font-family: 'Rajdhani', sans-serif; }`. The inline style on line 710 wins due to specificity/order, making Rajdhani on body dead code. Meanwhile, many elements explicitly use Orbitron or Rajdhani via class rules. This creates a fragmented font stack where the base body font and the explicitly-assigned fonts are different families. Not broken, but inconsistent.

### 2.5 Duplicate CSS Rule
`.full-width { grid-column: 1 / -1; }` is declared twice (lines 275 and 363). No functional impact but indicates copy-paste artifact.

### 2.6 Escape Key Handler Duplication
Two separate `keydown` listeners for Escape are registered:
- Line 1367: closes agent modal
- Line 1386: closes project modal

Both fire on every Escape press regardless of which modal is open. If both modals were somehow open, both would close. Minor, but the handlers should check which modal is currently visible.

### 2.7 Progress Bar Width Hardcoded
The overall progress bar fill is `width: 18%` (line 541), representing 2/19 steps. This is hardcoded CSS, not dynamically calculated. Any progress update requires an HTML edit and redeploy.

### 2.8 Stat Numbers Hardcoded
The stat row shows: 3 Games Built, 5 Contracts Live, 8 Open Source PRs, 4 Ecosystems. Per the prior audit:
- Games count is disputed (28-29 files exist, CC previously said 31, API said 46, now CC says 3)
- Contracts: 5 are shown but 8 are canonical
- These numbers are static HTML, not API-driven

### 2.9 Scanline Animation Performance
The scanline `<div>` is `position: fixed` with a CSS animation running continuously. On low-power mobile devices this creates an unnecessary paint layer. The animation runs `top: 0` to `top: 100vh` which triggers layout reflow on each frame. Should use `transform: translateY()` instead for GPU-composited animation.

---

## 3. DOMAIN-SPECIFIC FINDINGS

### 3.1 Trademark Reference
Patent `64/063,037` appears once in the footer. Trademark serial `99533250` has 0 matches -- if this is an active trademark it should be referenced.

### 3.2 "Sovereign Guides" Terminology
Per project memory, all user-facing "Providers" copy should read "Sovereign Guides" (routes/vars/DB unchanged). The current CC HTML contains zero instances of "Provider" or "Sovereign Guide" in visible text. The prior version (per COMMAND_CENTER_AUDIT.md) had "Provider Tiers" headings. These appear to have been removed in this rebuild rather than renamed. If Sovereign Guide tiers are part of the ecosystem, they should be represented.

### 3.3 VPS IP Address Exposed
The Infrastructure card displays the VPS IP `74.208.202.239` in plain text. This is a public-facing dashboard. Exposing the server IP invites targeted scanning. Consider showing a hostname or masking the address.

### 3.4 Footer Tagline
Footer reads: "Where Mental Wellness Meets Metaverse" -- this matches the trademark filing tagline. The footer also includes patent notice. No "Rights Reserved, Unlicensed" notice appears in the HTML itself (the Security agent's policy requires this on all code files).

### 3.5 Build Progress Accuracy
The tracker shows 2/19 steps complete (Steps 1-2 done, Step 3 active). This appears consistent with the card-level data (EncryptHealth at "Step 2 of 19", backend "BUILDING"). No contradictions detected within the CC itself on build progress.

---

## 4. LINK INVENTORY

| Link Target | Type | Risk |
|---|---|---|
| `https://hypnoneuro.io` | Frontend | Needs live verification |
| `https://secure-health-login-dfk6unk2d-megs-projects-95a11e5b.vercel.app/` | Vercel preview | HIGH -- preview URLs are ephemeral |
| `https://neurobalance-deploy.vercel.app` | Vercel deploy | Needs live verification |
| `https://eth-sepolia.blockscout.com/address/0x411426f8...` (HNT) | Blockscout | Potentially stale v1 address |
| `https://eth-sepolia.blockscout.com/address/0xbDaeb1d0...` (EHT) | Blockscout | Potentially stale v1 address |
| `https://eth-sepolia.blockscout.com/address/0xCb9EcB00...` (NFT) | Blockscout | Potentially stale address |
| `https://eth-sepolia.blockscout.com/address/0xf3297920...` (ClaimChain) | Blockscout | Potentially stale v1 address |
| `https://eth-sepolia.blockscout.com/address/0xE092336F...` (AlchemistForge) | Blockscout | Appears current |
| `https://eth-sepolia.blockscout.com/address/0xf22cbF25...` (Deployer) | Blockscout | Appears current |
| `https://fonts.googleapis.com/css2?...Orbitron...Rajdhani` | Google Fonts | Stable CDN |
| `https://fonts.googleapis.com/css2?...Chakra+Petch` | Google Fonts | Stable CDN |
| `status.json` (relative) | Local data file | MISSING -- breaks project modals |
| `ticker.js` (relative) | Local script | MISSING -- breaks ticker |

---

## 5. SUMMARY SCORECARD

| Category | Score | Notes |
|---|---|---|
| HTML Validity | 7/10 | Valid structure, minor duplicates, no console-breaking errors in markup |
| CSS Quality | 6/10 | Polished visuals, zero responsive breakpoints, duplicate rules, perf issue on scanline |
| JavaScript | 4/10 | Clock works, agent modals work, but project modals broken without status.json, silent fetch failure |
| Accessibility | 1/10 | No ARIA, no keyboard nav on interactive elements, poor color contrast |
| Mobile / Responsive | 2/10 | Only auto-fill grid provides any adaptation; no media queries |
| Data Freshness | 2/10 | All data hardcoded in HTML; no API-driven updates; no "last updated" stamp |
| Operational Panels | 1/10 | No backup status, no health monitoring, no cert tracking, no process visibility |
| Link Integrity | 5/10 | Blockscout links structurally valid but addresses may be stale; one Vercel preview URL at risk |
| Contract Registry | 4/10 | 5 of 8 canonical contracts shown; addresses may be outdated versions |
| Security | 5/10 | VPS IP exposed; no "Rights Reserved" in HTML; otherwise no credential leaks detected |

**Overall: 3.7 / 10** -- The Command Center is a visually impressive static page that functions as a project catalog, but it lacks the operational dashboard capabilities its name implies. The missing `status.json` breaks a core interactive feature, there are no real-time health checks, and the absence of responsive design and accessibility makes it unsuitable as a production-grade command center.

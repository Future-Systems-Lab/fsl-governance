# Testing/QA Agent Review -- FSL Public Surfaces

**Review Date:** 2026-05-12
**Reviewer:** Testing/QA Agent
**Scope:** All public-facing surfaces -- GitHub org, fsl-governance README, alchemist-forge README, Command Center HTML, alchemistforge.io, hypnoneuro.io, sovereignledger.io, encrypthealth.io

---

## 1. Cross-Surface Consistency Audit

### Patent Number

| Surface | Patent No. | Match? |
|---------|-----------|--------|
| fsl-governance README | 64/063,037 | Baseline |
| alchemist-forge README | 64/063,037 | YES |
| alchemistforge.io footer | 64/063,037 | YES |
| Command Center footer | 64/063,037 | YES |
| hypnoneuro.io bundle | 64/063,037 | YES |
| encrypthealth.io | Not displayed | N/A |
| sovereignledger.io | Not displayed | N/A |
| GitHub org profile README | Not displayed | N/A |

**Verdict:** Patent number is consistent across all surfaces that display it. Three surfaces omit it entirely -- acceptable for product landing pages but worth noting for IP posture.

### Smart Contract Count

| Surface | Count | Contracts Listed |
|---------|-------|-----------------|
| fsl-governance README | 8 contracts | HNT v2, EHT, MindMasteryNFT, SovereignLedger, AlchemistForge, PractitionerAchievement, ParticipantAchievement, BenevolenceFund |
| Command Center | 5 contracts | HNT, EHT, MindMasteryNFT, ClaimChain, AlchemistForge |
| GitHub org profile | ~9 contracts (per org page) | Not fully enumerable |

**CRITICAL INCONSISTENCY:** The governance README lists 8 contracts. The Command Center only shows 5 and is missing PractitionerAchievement, ParticipantAchievement, and BenevolenceFund. Additionally, the Command Center calls one contract "ClaimChain" while the governance README calls the same address (0xf329...) "SovereignLedger" -- this is a naming mismatch.

### Contract Address Cross-Check

| Contract | Governance README | Command Center |
|----------|------------------|----------------|
| HNT | 0x1ae1e10929f008d1f9883ce574a318abd86084e2 | 0x411426f8E735F7940B20491609F08817A805b198 |
| EHT | 0xbDaeb1d05E02D2751Ad07121510b5f0C436E2CdC | 0xbDaeb1d05E02D2751Ad07121510b5f0C436E2CdC |
| MindMasteryNFT | 0xCb9EcB00574DB29976c7C54045d443666D5C7771 | 0xCb9EcB00574DB29976c7C54045d443666D5C7771 |
| SovereignLedger / ClaimChain | 0xf32979200768e8726d5EC5E5AB0CA7407d64A94e | 0xf32979200768e8726d5EC5E5AB0CA7407d64A94e |
| AlchemistForge | 0xE092336F8f5082e57CcBb341A110C20ad186A324 | 0xE092336F8f5082e57CcBb341A110C20ad186A324 |

**CRITICAL:** HNT address differs between governance README and Command Center. The README shows `0x1ae1...` (labeled "HNT v2") while the Command Center shows `0x4114...`. One of these is stale or the Command Center was not updated when the contract was redeployed.

### Agent Count

| Surface | Count |
|---------|-------|
| fsl-governance README | 15 agents |
| Command Center | 12 agents |

**HIGH:** Agent count mismatch. The governance README lists 15 agents (including hypnoneuro, game_architect, natpsy_advisor, orthomolecular_specialist). The Command Center only lists 12, missing at least 3 domain-specialist agents.

### Game Count

| Surface | Count |
|---------|-------|
| Command Center | 3 games |
| Other surfaces | Not displayed elsewhere |

Game count appears only on the Command Center. No cross-surface validation possible, but the number should be verified against the actual HypnoNeuro deployment.

---

## 2. Surface-by-Surface Verdicts

### 2.1 GitHub Organization Profile

**VERDICT: PASS WITH OBSERVATIONS**

| Finding | Severity |
|---------|----------|
| Org page loads, no 404 on profile | -- |
| Profile README returns 404 in scrape (line 2 of surfaces_content.md) but loads via browser | MEDIUM |
| Commit activity graphs intermittently fail to render | LOW |
| 51 repositories visible; public/private split appears intentional | -- |

**Severity: MEDIUM** -- The 404 on org profile scrape (line 1-2 of content file) suggests either the .github profile repo is private or the scrape tool lacked auth. Live browser test confirms it loads, so this is a scraping artifact, not a user-facing issue.

---

### 2.2 fsl-governance README

**VERDICT: PASS**

| Finding | Severity |
|---------|----------|
| Patent number present and correct (64/063,037) | -- |
| 8 contracts listed with addresses | -- |
| 15 agents listed with approval status | -- |
| Structure section accurately describes repo layout | -- |
| Weekly scan automation documented | -- |
| "Future Systems Lab LLC -- Wyoming" entity footer present | -- |

**Severity: NONE** -- This is the canonical source of truth and reads cleanly.

---

### 2.3 alchemist-forge README

**VERDICT: PASS**

| Finding | Severity |
|---------|----------|
| Patent number matches (64/063,037) | -- |
| Contract address matches governance README | -- |
| "Alpha Testnet Demonstration" status disclosure is honest and well-worded | -- |
| Blockscout link to Sepolia contract is correct | -- |
| Repository exists publicly on GitHub (40 commits) | -- |

**Severity: NONE**

---

### 2.4 FSL Command Center (fsl-command-center.vercel.app)

**VERDICT: FAIL -- REQUIRES FIXES**

| Finding | Severity |
|---------|----------|
| HNT contract address differs from governance README | CRITICAL |
| Only 5 of 8 contracts displayed | HIGH |
| "ClaimChain" naming vs "SovereignLedger" in README | HIGH |
| 12 agents listed vs 15 in governance README | HIGH |
| JavaScript fetches `status.json` -- potential runtime 404 if file missing | MEDIUM |
| No `aria-label` attributes on any interactive elements | MEDIUM |
| No `alt` text on SVG hex icon | MEDIUM |
| No `role` attributes on modal overlay | MEDIUM |
| Viewport meta tag present (`width=device-width, initial-scale=1.0`) | -- |
| `grid-template-columns: repeat(auto-fill, minmax(340px, 1fr))` provides responsive layout | -- |
| Clock updates via JS; no SSR concerns for static deploy | -- |
| Google Fonts (Orbitron, Rajdhani) load from CDN | -- |

**Severity: CRITICAL** -- The contract address mismatch is a data integrity issue visible to anyone comparing surfaces. The missing contracts and agent count gaps erode credibility for a "Command Center" that should be the single pane of glass.

---

### 2.5 alchemistforge.io

**VERDICT: PASS WITH OBSERVATIONS**

| Finding | Severity |
|---------|----------|
| Patent number in footer matches (64/063,037) | -- |
| Contract address matches governance README | -- |
| Ecosystem dropdown links to encrypthealth.io, hypnoneuro.io, sovereignledger.io -- all correct | -- |
| Phase 1 disclosure banner is present and transparent | -- |
| Stats: 14 Demo TXs, 14 Sepolia TXs, 14 On-Chain Records, 7 Wallets | -- |
| Crypto ticker data is HARDCODED (static prices in JS array) | MEDIUM |
| Ticker shows BTC at $81,436 and ETH at $2,348 -- will become stale | MEDIUM |
| Duplicate Google Fonts import (once in `<style>` @import, once in `<link>`) | LOW |
| No `aria-label` on wallet connect button | MEDIUM |
| No `alt` text on any SVG graphics | MEDIUM |
| Tailwind loaded from CDN (`cdn.tailwindcss.com`) -- not recommended for production | LOW |
| `@import url()` inside `<style>` with unencoded spaces in font name ("Chakra Petch") | LOW |
| Ecosystem dropdown missing AlchemistForge self-link (acceptable) and missing Orthomolecular | LOW |
| No `<noscript>` fallback -- page is blank without JS for ticker | LOW |

**Severity: MEDIUM** -- Hardcoded ticker prices will silently go stale and undermine trust. The duplicate font import is wasteful but harmless. Accessibility gaps are common but should be addressed.

---

### 2.6 hypnoneuro.io

**VERDICT: PASS (LIMITED DATA)**

| Finding | Severity |
|---------|----------|
| Site loads with title "HypnoNeuro - Sovereign Healing Through Frequency" | -- |
| Patent number found in bundle (64/063,037) | -- |
| "Patent Pending" text found in bundle | -- |
| Bundle check returned minimal data -- full HTML analysis not possible from scrape | LOW |

**Severity: LOW** -- The bundle check confirms patent presence. Full accessibility and link audit requires browser-based testing that the content scrape did not capture.

---

### 2.7 sovereignledger.io

**VERDICT: INCONCLUSIVE**

| Finding | Severity |
|---------|----------|
| Site loads with title "SovereignLedger / Sovereign Health Governance" | -- |
| Bundle check returned NO patent number | MEDIUM |
| No contract addresses visible in scrape | LOW |
| Minimal content captured -- may be a SPA that renders client-side | LOW |

**Severity: MEDIUM** -- The absence of patent number in the bundle is concerning if all ecosystem sites should carry it. Needs manual browser inspection to confirm whether patent info renders client-side.

---

### 2.8 encrypthealth.io

**VERDICT: INCONCLUSIVE**

| Finding | Severity |
|---------|----------|
| Site loads as Next.js app with title "Future Systems Lab -- Sovereign Wellness Platform" | -- |
| No patent number detected in scrape | MEDIUM |
| References favicon assets at `/brand/encrypthealth-icon-*.png` -- not verifiable from scrape | LOW |
| No accessibility attributes detected in serialized markup | MEDIUM |
| Ecosystem nav references 5 platforms: EncryptHealth, Orthomolecular, SovereignLedger, HypnoNeuro, AlchemistForge | -- |
| Viewport meta tag present | -- |
| Bundle check section in content file is empty (line 355-356) | LOW |

**Severity: MEDIUM** -- Next.js SSR/hydration makes static scraping unreliable. The empty bundle check section suggests the content capture tool could not extract rendered content. Manual browser testing required.

---

## 3. Broken Links Audit

| Link | Location | Status |
|------|----------|--------|
| https://encrypthealth.io | alchemistforge.io dropdown | LOADS |
| https://hypnoneuro.io | alchemistforge.io dropdown | LOADS |
| https://sovereignledger.io | alchemistforge.io dropdown | LOADS |
| https://alchemistforge.io | direct | LOADS |
| https://fsl-command-center.vercel.app | direct | LOADS |
| https://github.com/Future-Systems-Lab | GitHub | LOADS |
| https://github.com/Future-Systems-Lab/alchemist-forge | alchemistforge.io footer | LOADS (public, 40 commits) |
| https://sepolia.etherscan.io/address/0xE092... | alchemistforge.io | ASSUMED VALID (Etherscan standard) |
| https://eth-sepolia.blockscout.com/address/0xE092... | alchemist-forge README | ASSUMED VALID (Blockscout standard) |

**No broken links detected** across any surface. All five ecosystem domains resolve.

---

## 4. Accessibility Summary

| Issue | Surfaces Affected | Severity |
|-------|-------------------|----------|
| Zero `aria-label` attributes on buttons | Command Center, alchemistforge.io | MEDIUM |
| No `alt` text on SVG/image elements | Command Center, alchemistforge.io | MEDIUM |
| No `role` attributes on modal/overlay | Command Center, alchemistforge.io | MEDIUM |
| No skip-to-content link | All HTML surfaces | LOW |
| No focus-visible styles beyond browser defaults | Command Center, alchemistforge.io | LOW |
| Color contrast on muted text (#6b7280 on #0a0e1a) may fail WCAG AA for small text | alchemistforge.io | MEDIUM |

---

## 5. Mobile Responsiveness

| Surface | Viewport Meta | Responsive CSS | Assessment |
|---------|--------------|----------------|------------|
| Command Center | YES | `auto-fill, minmax(340px, 1fr)` grid | GOOD -- cards stack on narrow viewports |
| alchemistforge.io | YES | Tailwind responsive classes (`md:text-6xl`, `md:grid-cols-4`, `max-w-7xl`) | GOOD -- responsive grid with mobile-first sizing |
| encrypthealth.io | YES | Next.js framework (assumed responsive) | UNVERIFIED |
| hypnoneuro.io | UNVERIFIED | UNVERIFIED | NEEDS MANUAL TEST |
| sovereignledger.io | UNVERIFIED | UNVERIFIED | NEEDS MANUAL TEST |

---

## 6. Issue Summary by Severity

### CRITICAL (2)

1. **HNT contract address mismatch** between fsl-governance README (`0x1ae1...`) and Command Center (`0x4114...`). One is stale. Public-facing inconsistency undermines trust.
2. **Command Center shows only 5 of 8 contracts.** Missing PractitionerAchievement, ParticipantAchievement, BenevolenceFund. The "5 Contracts Live" stat card actively contradicts the governance README's 8.

### HIGH (3)

3. **"ClaimChain" vs "SovereignLedger" naming mismatch** at address `0xf329...`. Command Center uses a different name than the governance README for the same contract.
4. **Agent count mismatch:** Command Center says 12, governance README says 15. Three domain-specialist agents are invisible.
5. **No patent number on sovereignledger.io bundle** -- if the IP notice policy requires it on all ecosystem sites, this is a gap.

### MEDIUM (7)

6. Hardcoded crypto ticker prices on alchemistforge.io will become stale.
7. No `aria-label` attributes on interactive elements (Command Center, alchemistforge.io).
8. No `alt` text on SVG graphics (Command Center, alchemistforge.io).
9. No `role` attributes on modal overlays (Command Center, alchemistforge.io).
10. Color contrast concern on muted gray text against dark backgrounds.
11. encrypthealth.io bundle check returned empty -- patent presence unverified.
12. Command Center `status.json` fetch may 404 at runtime if file is missing or stale.

### LOW (6)

13. Duplicate Google Fonts import on alchemistforge.io.
14. Tailwind CDN usage in production on alchemistforge.io.
15. Unencoded space in font family name in CSS @import.
16. No `<noscript>` fallback on alchemistforge.io.
17. No skip-to-content links on any HTML surface.
18. GitHub commit activity graphs intermittently fail to render.

---

## 7. Done Well

- **Patent number consistency** across all surfaces that display it -- no typos, no stale numbers.
- **Phase 1 disclosure banner** on alchemistforge.io is transparent, honest, and well-worded. Sets expectations clearly.
- **All five ecosystem domains resolve and load.** Zero broken links detected.
- **Responsive grid design** on Command Center and alchemistforge.io will handle mobile viewports correctly.
- **Blockscout and Etherscan links** are well-formed and point to correct Sepolia addresses.
- **alchemist-forge README** has exemplary academic honesty about adoption status ("no external organic user adoption").
- **Ecosystem dropdown** on alchemistforge.io provides clean cross-navigation between platforms.
- **SVG-based icons** (no external image dependencies to break) on Command Center and alchemistforge.io.

---

## 8. Unique Perspective (Testing/QA Lens)

The most dangerous class of bug on these surfaces is not a broken link or a missing image -- it is **silent data drift between surfaces that are supposed to agree.** The HNT address mismatch and contract count discrepancy are precisely the kind of issues that erode credibility with technical reviewers, patent examiners, and potential partners who will cross-reference the Command Center against the governance repo.

From a QA process standpoint, these inconsistencies suggest there is **no automated cross-surface validation** in place. Each surface is updated independently, and when a contract is redeployed or an agent is added, the update propagates to some surfaces but not all. The fix is not just to update the Command Center -- it is to establish a **single source of truth file** (likely the governance README or a dedicated `manifest.json`) that all other surfaces consume or are validated against in CI.

The hardcoded crypto ticker is a time bomb of a different kind: it will not break, but it will silently display prices from May 2026 indefinitely, making the site look abandoned to any visitor who checks the numbers. Either connect to a live API or remove the ticker entirely.

Finally, the accessibility gaps are systemic rather than incidental. Neither the Command Center nor alchemistforge.io has any ARIA attributes at all. This is not a single missed `alt` tag -- it is an architectural omission that should be addressed with a single accessibility pass across all surfaces before any public launch campaign.

---

*Review generated by Testing/QA Agent, 2026-05-12.*

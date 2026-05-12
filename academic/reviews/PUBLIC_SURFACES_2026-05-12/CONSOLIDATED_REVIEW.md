# Public Surfaces -- Consolidated 6-Agent Review
**Date:** 2026-05-12

---

## A. CRITICAL BLOCKERS (flagged by 2+ agents)

### A1. fsl-governance README contract table contains deprecated v1 addresses
- **Flagged by:** Smart Contract (CRITICAL), Audit (CRITICAL), Research (MEDIUM), Testing/QA (implicit)
- **Details:** SovereignLedger lists `0xf329...` (v1) instead of canonical v2 `0x4afA...aCc4`. BenevolenceFund lists `0xbe71...` (v1) instead of v2 `0x96E8...251B`. EHT lists `0xbDaeb1...CdC` (v1) instead of EHTv2 `0x9358...bd88`. SovereignAchievement listed under banned name "PractitionerAchievement" with wrong address `0xe23e...` instead of `0xC3F1...`.
- **Impact:** Any developer, auditor, or reviewer referencing the governance README will integrate against stale/deprecated contracts. This is the most dangerous class of public surface error.
- **Fix:** Replace the entire README contract table with the canonical v2 table from `contracts/DEPLOYED_CONTRACTS.md`. Estimated time: 10 minutes.

### A2. Contract count inconsistency across surfaces (8 vs. 9 vs. 5)
- **Flagged by:** Smart Contract (HIGH), Audit (MEDIUM), Research (MEDIUM), Testing/QA (CRITICAL)
- **Details:** The governance README lists 8 contracts. The BHTY paper claims 9 (including SovereignSession). The Command Center shows only 5. Canonical registry has 9 active contracts.
- **Impact:** Cross-referencing any two surfaces produces a contradiction. Reviewers, auditors, and grant evaluators will notice immediately.
- **Fix:** Update all surfaces to reflect the canonical count of 9 contracts. Add SovereignSession and NeuroBalanceConsent where missing. Estimated time: 15 minutes.

### A3. Command Center contract data out of sync with governance README
- **Flagged by:** Testing/QA (CRITICAL x2), Audit (implicit via truncated capture)
- **Details:** HNT address differs between README (`0x1ae1...`) and Command Center (`0x4114...`). Command Center uses deprecated name "ClaimChain" instead of "SovereignLedger." Agent count is 12 vs. 15 in README.
- **Impact:** The Command Center is the live dashboard; any visitor comparing it against GitHub will find contradictions.
- **Fix:** Update Command Center data source (`status.json` or equivalent) to match canonical registry. Estimated time: 30 minutes.

### A4. encrypthealth.io and sovereignledger.io not auditable (empty/no content captured)
- **Flagged by:** Compliance (CRITICAL for encrypthealth.io, HIGH for sovereignledger.io), Research (LOW), Testing/QA (MEDIUM), Audit (MEDIUM)
- **Details:** Both sites returned no compliance-relevant content in scrape. Patent notice 64/063,037 is absent or unverifiable on both. encrypthealth.io is the highest-risk surface for HIPAA/lexicon violations.
- **Impact:** The two surfaces most likely to contain prohibited language ("HIPAA compliant," "patient," "provider," "insurance") cannot be verified.
- **Fix:** Priority re-scrape with full DOM capture. Verify patent notice, lexicon compliance, and HIPAA framing on both sites. Estimated time: 1 hour.

### A5. Banned term "PractitionerAchievement" present in governance README
- **Flagged by:** Smart Contract (HIGH), Audit (HIGH), Compliance (implicit -- lexicon check)
- **Details:** The banned deprecated contract name "PractitionerAchievement" appears in the README contract table. Additionally, "ParticipantAchievement" is listed as a separate active contract when both are deprecated 214-byte stubs replaced by SovereignAchievement.
- **Fix:** Remove both deprecated names and replace with SovereignAchievement at canonical address `0xC3F11d2F1F12bB96b9DCF7e8f85e9704D2869B8D`. Estimated time: 5 minutes.

---

## B. HIGH PRIORITY

### B1. Trademark 99533250 absent from every surface
- **Flagged by:** Compliance (systemic across all 8 surfaces)
- **Details:** No surface displays the trademark notice. A trademark that is not publicly displayed risks weakening enforceability.
- **Fix:** Add a standardized footer snippet to all live surfaces and READMEs: "AlchemistForge, EncryptHealth, HypnoNeuro, and SovereignLedger are trademarks of Future Systems Lab LLC (Serial No. 99533250)."

### B2. Patent notice missing from Command Center HTML
- **Flagged by:** Compliance (MEDIUM), Testing/QA (implicit)
- **Details:** The Command Center is a live, publicly accessible product surface with no patent notice.
- **Fix:** Add patent pending footer line.

### B3. Accessibility gaps are systemic (zero ARIA attributes)
- **Flagged by:** Testing/QA (MEDIUM x4)
- **Details:** Neither Command Center nor alchemistforge.io has any `aria-label`, `alt` text on SVG elements, or `role` attributes on modals. Color contrast on muted gray text may fail WCAG AA.
- **Fix:** Single accessibility pass across all HTML surfaces.

### B4. sovereignledger.io missing patent notice in bundle
- **Flagged by:** Compliance (HIGH), Testing/QA (MEDIUM), Research (LOW)
- **Details:** Bundle check returned no patent strings. If the IP notice policy requires patent notice on all ecosystem sites, this is a gap.

### B5. GitHub org profile returns 404
- **Flagged by:** Smart Contract (MEDIUM), Research (MEDIUM), Compliance (MEDIUM), Testing/QA (MEDIUM)
- **Details:** First impression for any GitHub visitor is blank. Missing patent, trademark, and scope disclosures at org level.
- **Fix:** Create `.github/profile/README.md` with IP notices and FSL mission language.

---

## C. MEDIUM/LOW

### Medium

| # | Issue | Surface | Source Agent(s) |
|---|-------|---------|-----------------|
| C1 | Hardcoded crypto ticker prices (BTC $81,436, ETH $2,348) will become stale | alchemistforge.io | Audit, Testing/QA |
| C2 | HNT ticker labeled "SOVEREIGN WELLNESS TOKEN" vs. canonical "HypnoNeuro Token" | alchemistforge.io | Audit, Compliance |
| C3 | Command Center HTML capture truncated -- full content not auditable | Command Center | Smart Contract, Audit, Research |
| C4 | No Content Security Policy headers verifiable; inline `onmouseover`/`onmouseout` handlers suggest CSP not enforced | alchemistforge.io | Security |
| C5 | HNT placement in crypto price ticker could imply HNT is a traded asset | alchemistforge.io | Compliance |
| C6 | Command Center `status.json` fetch may 404 at runtime | Command Center | Testing/QA |

### Low

| # | Issue | Surface | Source Agent(s) |
|---|-------|---------|-----------------|
| L1 | Tailwind loaded from CDN -- supply-chain risk; self-host for production | alchemistforge.io | Security, Testing/QA |
| L2 | Duplicate Google Fonts import (once @import, once `<link>`) | alchemistforge.io | Testing/QA |
| L3 | No `<noscript>` fallback | alchemistforge.io | Testing/QA |
| L4 | No skip-to-content links on any HTML surface | All HTML surfaces | Testing/QA |
| L5 | GitHub commit activity graphs intermittently fail to render | GitHub org | Testing/QA |

---

## D. SURFACE-BY-SURFACE VERDICT

| Surface | Security | Smart Contract | Research | Audit | Compliance | Testing/QA | Overall |
|---------|----------|---------------|----------|-------|------------|------------|---------|
| GitHub Org Profile | PASS (N/A) | N/A (404) | NOT AVAILABLE | N/A | NOT ASSESSABLE | PASS w/ obs | **MEDIUM -- Create profile** |
| fsl-governance README | PASS | **FAIL (4 CRITICAL)** | PASS w/ finding | **FAIL (3 CRITICAL)** | PASS w/ obs | PASS | **FAIL -- Urgent fix needed** |
| alchemist-forge README | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| Command Center HTML | PASS | PASS (partial) | PASS (partial) | INCOMPLETE | PASS w/ obs | **FAIL** | **FAIL -- Data sync needed** |
| alchemistforge.io | PASS w/ advisory | PASS | PASS | PASS (1 LOW) | PASS | PASS w/ obs | **PASS** |
| hypnoneuro.io | PASS | PASS | PASS | PASS | PASS | PASS (limited) | **PASS** |
| sovereignledger.io | PASS | PASS | INCONCLUSIVE | EMPTY | **FAIL** | INCONCLUSIVE | **INCONCLUSIVE -- Re-scrape** |
| encrypthealth.io | PASS | PASS | INCONCLUSIVE | EMPTY | **FAIL** | INCONCLUSIVE | **INCONCLUSIVE -- Re-scrape** |

---

## E. QUICK-FIX LIST (ordered by priority)

| # | Fix | Surface(s) | Est. Time | Priority |
|---|-----|-----------|-----------|----------|
| 1 | Replace README contract table with canonical v2 addresses from DEPLOYED_CONTRACTS.md (fixes A1, A2, A5) | fsl-governance README | 10 min | CRITICAL |
| 2 | Update Command Center to use canonical addresses, rename "ClaimChain" to "SovereignLedger," add missing contracts and agents (fixes A3) | Command Center | 30 min | CRITICAL |
| 3 | Re-scrape encrypthealth.io and sovereignledger.io with full DOM capture; verify patent + lexicon compliance (fixes A4) | Live sites | 1 hr | CRITICAL |
| 4 | Add trademark 99533250 footer to all live surfaces and READMEs (fixes B1) | ALL | 30 min | HIGH |
| 5 | Add patent notice to Command Center footer (fixes B2) | Command Center | 5 min | HIGH |
| 6 | Create GitHub org profile README with patent + trademark + mission (fixes B5) | GitHub org | 15 min | HIGH |
| 7 | Add patent notice to sovereignledger.io (fixes B4) | sovereignledger.io | 10 min | HIGH |
| 8 | Accessibility pass: add aria-labels, alt text, role attributes (fixes B3) | Command Center, alchemistforge.io | 1 hr | HIGH |
| 9 | Remove or connect hardcoded crypto ticker to live API (fixes C1) | alchemistforge.io | 30 min | MEDIUM |
| 10 | Add HNT token disclaimer to ticker (fixes C5) | alchemistforge.io | 5 min | MEDIUM |
| 11 | Self-host Tailwind CSS with SRI hashes (fixes L1) | alchemistforge.io | 30 min | LOW |
| 12 | Remove duplicate Google Fonts import (fixes L2) | alchemistforge.io | 5 min | LOW |

**Total estimated time for Critical fixes: ~1.5 hours**
**Total estimated time for all fixes: ~5 hours**

---

## F. OVERALL VERDICT

### MIXED -- Two surfaces need urgent fixes; live product sites are strong

**What is working well (unanimously praised across all 6 agents):**
1. Zero credential leakage across all surfaces -- no API keys, private keys, JWTs, or deployment secrets exposed.
2. Consistent HTTPS enforcement -- every external link and resource load uses HTTPS; no mixed content.
3. Patent 64/063,037 disclosure is consistent and exemplary wherever it appears.
4. AlchemistForge address is correct and identical across all four surfaces that reference it.
5. Phase 1 disclosure banner on alchemistforge.io is transparent, honest, and well-crafted.
6. Zero prohibited terminology ("ClaimChain," "patient," "HIPAA compliant") on any auditable live product site.
7. No backend infrastructure leakage -- no API endpoints, VPS IPs, or RPC URLs in client code.
8. Deployer wallet is correctly absent from all public surfaces.

**What needs immediate attention:**
1. The fsl-governance README is the single most consequential failing surface. Its contract table is severely stale (5 of 8 entries point to deprecated v1 addresses or retired stubs). The fix is mechanical: copy the canonical v2 table from `DEPLOYED_CONTRACTS.md`. This is a 10-minute task with outsized reputational impact.
2. The Command Center has data integrity issues (wrong HNT address, deprecated "ClaimChain" name, missing contracts and agents) that contradict the governance README and create cross-surface inconsistency.
3. encrypthealth.io and sovereignledger.io must be re-scraped and audited -- the two highest-risk surfaces are currently unverifiable.

**Bottom line:** The live product sites (alchemistforge.io, hypnoneuro.io) are clean and well-presented. The governance infrastructure (README, Command Center) has drifted behind the canonical contract registry. Fixing the README and Command Center is a sub-2-hour task that eliminates all critical findings.

---

*Consolidated review generated from 6 agent reviews: Security, Smart Contract, Research, Audit, Compliance, and Testing/QA. All agents reviewed surfaces captured in `surfaces_content.md` on 2026-05-10/12.*

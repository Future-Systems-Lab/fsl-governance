# FSL Command Center Full Audit
**Date:** 2026-05-07
**Auditor:** Automated governance audit (Claude Code)
**Scope:** index.html (public landing), dashboard.html (gated shell), api/dashboard-content.js (gated content)
**Repository:** fsl-command-center (latest main)

---

**Summary:** 14 issues found | HIGH: 3 | MEDIUM: 7 | LOW: 4

---

## Issue 1
- **Location:** api/dashboard-content.js:285
- **Current text:** `provider_patient_links` (in the 42-table schema-ready listing)
- **Problem:** The DB table name `provider_patient_links` contains the banned lexicon word "patient". While this is a database column name (not display copy), it is rendered verbatim to the admin dashboard and contradicts the Lexicon Rules table at line 480 which bans "patient" in favor of "participant".
- **Proposed fix:** Flag for DB schema migration: rename table to `guide_participant_links` or similar. In the interim, add an inline note marking it as a legacy DB name pending migration.
- **Severity:** LOW

## Issue 2
- **Location:** api/dashboard-content.js:466
- **Current text:** `Transak API key activation`
- **Problem:** Transak was replaced by Onramper. The locked-items list still references "Transak API key activation" as requiring Dr. Meg approval. The lexicon table (line 488) confirms Stripe was replaced by Onramper, and Transak is no longer the payment integration.
- **Proposed fix:** Change to `Onramper API key activation`
- **Severity:** HIGH

## Issue 3
- **Location:** dashboard.html:80 (Backend Build agent definition)
- **Current text:** `Wire Transak and crypto payment integrations`
- **Problem:** Same stale Transak reference in the Backend Build agent's duties array. Transak has been replaced by Onramper.
- **Proposed fix:** Change to `Wire Onramper and crypto payment integrations`
- **Severity:** HIGH

## Issue 4
- **Location:** dashboard.html:84 (Compliance agent definition)
- **Current text:** `Enforce sovereign wellness lexicon across all platforms` and `Scan for prohibited clinical language (diagnosis, treatment, patient)`
- **Problem:** The duty descriptions use the words "treatment" and "patient" in a meta/instructional context (describing what to scan for). This is acceptable as meta-reference to banned terms, but the phrase "sovereign wellness lexicon" uses the deprecated compound "sovereign wellness." The canonical lexicon is simply "FSL lexicon" or "sovereign lexicon."
- **Proposed fix:** Change `sovereign wellness lexicon` to `FSL sovereign lexicon`. The parenthetical references to banned terms (diagnosis, treatment, patient) are acceptable as they describe what to prohibit.
- **Severity:** LOW

## Issue 5
- **Location:** index.html:114
- **Current text:** `designed by a credentialed provider who lived both sides of the system failure`
- **Problem:** Uses "provider" as display copy to describe Dr. Meg. Per the Lexicon Rules (dashboard-content.js:483), "Provider (display copy)" must be replaced with "Sovereign Guide."
- **Proposed fix:** Change to `designed by a credentialed practitioner who lived both sides of the system failure` or `designed by a credentialed Sovereign Guide who lived both sides of the system failure`
- **Severity:** MEDIUM

## Issue 6
- **Location:** index.html:312
- **Current text:** `5 live platforms`
- **Problem:** Contradicts index.html:120 which correctly states "4 platforms operational + 1 scaffolded backend" and index.html:303 which shows "4+1 / 4 deployed + 1 scaffolded." NeuroBalance is scaffolded, not live. Claiming 5 live platforms is inaccurate.
- **Proposed fix:** Change to `4 live platforms + 1 scaffolded` or `5 platforms (4 live + 1 scaffolded)`
- **Severity:** MEDIUM

## Issue 7
- **Location:** index.html:316
- **Current text:** `Crypto-only payments (Stripe removed)`
- **Problem:** While factually correct as a historical note, displaying "Stripe" in the Phase 1 checklist reinforces a banned term. The Lexicon Rules (line 488) state Stripe should be replaced with "(removed -- Onramper for fiat onramp)."
- **Proposed fix:** Change to `Crypto-only payments (legacy fiat gateway removed)` or `Crypto-only payments (Onramper for fiat onramp)`
- **Severity:** LOW

## Issue 8
- **Location:** api/dashboard-content.js:369
- **Current text:** `Where Mental Wellness Meets Metaverse (Classes 41,42,44)`
- **Problem:** This is a trademark filing recommendation referencing the actual mark name. As a proper noun / trademark name, this may be intentional. However, it could be mistaken for active tagline use. Confirm whether "Where Mental Wellness Meets Metaverse" is still the intended trademark filing name or if it has been superseded.
- **Proposed fix:** If the mark name is still accurate, add context: `"Where Mental Wellness Meets Metaverse" mark (Classes 41,42,44)`. If the mark name has changed, update accordingly.
- **Severity:** LOW

## Issue 9
- **Location:** api/dashboard-content.js:467
- **Current text:** `Provider credential verification`
- **Problem:** Uses "Provider" as display copy in the locked-items list. Per lexicon rules, display copy should use "Sovereign Guide."
- **Proposed fix:** Change to `Sovereign Guide credential verification`
- **Severity:** MEDIUM

## Issue 10
- **Location:** api/dashboard-content.js:306
- **Current text:** `encrypthealth-provider-portal`
- **Problem:** This is a GitHub repository name containing "provider." Repo names are internal identifiers, not display copy. However, it is rendered on the dashboard. The repo itself may need renaming for lexicon consistency.
- **Proposed fix:** Flag for future repo rename to `encrypthealth-sovereign-guide-portal` or similar. No immediate dashboard text change needed since this reflects the actual repo name.
- **Severity:** MEDIUM

## Issue 11
- **Location:** api/dashboard-content.js:579
- **Current text:** `USPTO trademark Future Systems Lab (Serial 99533250) -- Office Action response filed 2026-04-20, SYSTEMS LAB disclaimer submitted, awaiting examiner review (1-2 months)`
- **Problem:** The "1-2 months" ETA was written around April 20, 2026. By May 7, 2026, this is still within window but should be updated to reflect elapsed time: approximately 2-3 weeks have passed. Monitor for staleness.
- **Proposed fix:** Update ETA to reflect current timeline or add the filing date explicitly: `awaiting examiner review (filed 2026-04-20, expect response by June-July 2026)`
- **Severity:** MEDIUM

## Issue 12
- **Location:** api/dashboard-content.js:531 (Completed items footnote)
- **Current text:** `Privy removed, pure EIP-1193 wallet auth (Apr 10-11)`
- **Problem:** References "Privy" in a historical completion note. While this is a factual provenance record (what was removed), the Lexicon Rules (line 489) say Privy should be replaced with "(removed -- pure window.ethereum + EIP-191)." Historical records may warrant an exception, but the current phrasing could be tightened.
- **Proposed fix:** Acceptable as provenance record. No change required unless strict lexicon enforcement is desired, in which case change to `Legacy custodial SDK removed, pure EIP-1193 wallet auth (Apr 10-11)`.
- **Severity:** MEDIUM

## Issue 13
- **Location:** api/dashboard-content.js:64 (Critical Systems Bar)
- **Current text:** `EncryptHealth` with link to `https://encrypthealth.io` and `api ok` label
- **Problem:** The critical systems bar hardcodes "api ok" as static text. This is not a live check -- it is a static green dot that will show "api ok" regardless of actual API status. If the API goes down, the critical bar will still show green.
- **Proposed fix:** Either wire this to a live health check endpoint (e.g., fetch `https://api.futuresystemslab.io/api/fsl-status`) or change the label to remove the false "api ok" claim and just show "EncryptHealth" with a link.
- **Severity:** MEDIUM

## Issue 14
- **Location:** index.html:377
- **Current text:** `Inventory snapshot: April 29, 2026`
- **Problem:** The snapshot date is hardcoded. If the command center is updated without changing this date, it becomes stale. As of this audit (May 7, 2026), the date is already 8 days old.
- **Proposed fix:** Update to current date on each deployment, or replace with a dynamic date using JavaScript: `new Date().toLocaleDateString()`
- **Severity:** HIGH

---

## Contract Address Verification

All 8 contract addresses match the canonical set:

| Contract | Canonical Address | index.html | Match |
|----------|-------------------|------------|-------|
| AlchemistForge | 0xE092336F8f5082e57CcBb341A110C20ad186A324 | Line 199 | PASS |
| HNT v2 | 0x1ae1e10929f008d1f9883ce574a318abd86084e2 | Line 195 | PASS |
| EHTv2 | 0x93583a7A24e50075c79b06db0be8Cf4D45B0bd88 | Line 196 | PASS |
| SovereignLedger v2 | 0x4afA577fA914068451e0Aa97b61F23960f02aCc4 | Line 198 | PASS |
| BenevolenceFund v2 | 0x96E8006a1fBB693B55fFf6254B8BF19EC605251B | Line 200 | PASS |
| SovereignAchievement | 0xC3F11d2F1F12bB96b9DCF7e8f85e9704D2869B8D | Line 201 | PASS |
| MindMasteryNFT | 0xCb9EcB00574DB29976c7C54045d443666D5C7771 | Line 197 | PASS |
| NeuroBalanceConsent | 0x21571805e57f792b66604b140a45D8C1b2E196b8 | Line 202 | PASS |

## Stale Wallet Check
- No instances of `0xf22cbF25` found anywhere. PASS.
- Admin wallet correctly referenced as `0x7394...BCC3` at dashboard-content.js:460. PASS.

## Ticker Verification
- Ticker code present in index.html (lines 14-18, 67-68, 382-399). PASS.
- Ticker code present in dashboard.html (lines 53-57, 62-63, 274-295). PASS.

## VPS Infrastructure URL
- dashboard.html uses `https://api.futuresystemslab.io` (lines 126, 183). PASS.
- No references to `api.encrypthealth.io`. PASS.

## Lexicon Rules Table Verification
All 12 rows in the Lexicon Rules table (dashboard-content.js:479-491) are correct per FSL canonical lexicon:
- patient -> participant: CORRECT
- treatment -> session / protocol: CORRECT
- diagnosis / diagnose -> (remove entirely): CORRECT
- Provider (display copy) -> Sovereign Guide: CORRECT
- ClaimChain -> SovereignLedger: CORRECT
- MetaMask (as primary) -> Brave Wallet: CORRECT
- Insurance (as payment label) -> Sovereign Navigation: CORRECT
- Fiat / Card -> (removed): CORRECT
- Stripe -> (removed -- Onramper): CORRECT
- Privy -> (removed -- pure window.ethereum + EIP-191): CORRECT
- Calendly -> (removed -- FSL native booking): CORRECT
- free (on paid services) -> (remove -- specify price): CORRECT

---

## Summary by Severity

| Severity | Count |
|----------|-------|
| HIGH | 3 |
| MEDIUM | 7 |
| LOW | 4 |
| **Total** | **14** |

## Top 5 Most Critical

1. **Issue 2** (HIGH) -- Transak reference in locked-items list (api/dashboard-content.js:466). Transak was replaced by Onramper.
2. **Issue 3** (HIGH) -- Transak reference in Backend Build agent duties (dashboard.html:80). Same stale integration name.
3. **Issue 14** (HIGH) -- Hardcoded snapshot date "April 29, 2026" in footer (index.html:377). Already stale by 8 days.
4. **Issue 6** (MEDIUM) -- "5 live platforms" contradicts the correct "4 live + 1 scaffolded" count elsewhere (index.html:312).
5. **Issue 5** (MEDIUM) -- "provider" used as display copy describing Dr. Meg (index.html:114). Should be "practitioner" or "Sovereign Guide."

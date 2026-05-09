# Cross-Platform Audit: 11 Issues from Dr. Meg Review

**Date:** 2026-05-07
**Auditor:** Claude Opus 4.6 (1M context)
**Scope:** EncryptHealth frontend, fsl-governance, AlchemistForge, SovereignLedger, fsl-web, CV/LOI

---

## Issue 1: CV/LOI Boscovic alignment line missing Vishnoi reference

**Priority:** P1
**File(s):**
- `/Users/futuresystemslab/fsl-governance/dashboard-data/reviewer-data.json` line 32
**Current:**
```json
"alignment": "Independent build, deeper sovereignty model, completion of the academic lifecycle his lab started"
```
**Proposed fix:**
```json
"alignment": "Independent build, deeper sovereignty model, completion of the academic lifecycle his lab started (Vishnoi MedFabric4Me thesis -- convergent independent arrival)"
```
**Notes:** The LOI (`academic/LOI_ASU_DEng.docx`, paragraph 79) fully names Vishnoi and explains the intellectual lineage. The CV HTML (`Future-Systems-Lab-profile/CV_MegMontanezDavenport.html`) does NOT contain this phrase at all -- only the reviewer-data.json in the Command Center uses the truncated version. The prior audit (`REVIEWER_COMMAND_CENTER_COUNCIL_2026-05-07.md`) flagged this as "INSUFFICIENT on reviewer page."
**Complexity:** LOW
**Needs Dr. Meg judgment:** Yes -- confirm exact wording for the condensed alignment blurb.

---

## Issue 2: CBHP definition incorrect in reviewer-data.json

**Priority:** P1
**File(s):**
- `/Users/futuresystemslab/fsl-governance/dashboard-data/reviewer-data.json` line 25
**Current:**
```json
"certifications": ["BCHN (Board Certified in Holistic Nutrition)", "CBHP (Certified Behavioral Health Practitioner)"]
```
**Proposed fix:**
```json
"certifications": ["BCHN (Board Certified in Holistic Nutrition)", "CBHP (Certified Blockchain Healthcare Professional) -- Blockchain Council"]
```
**Notes:** The CV HTML (`Future-Systems-Lab-profile/CV_MegMontanezDavenport.html` line 186) correctly says "Certified Blockchain Healthcare Professional (CBHP) -- Blockchain Council". The EncryptHealth frontend uses "CBHP" as an abbreviation only (no expansion) across ~10 files, which is fine. The only surface with the WRONG expansion is reviewer-data.json.
**Complexity:** LOW
**Needs Dr. Meg judgment:** No -- the CV is the authoritative source and already has the correct text.

---

## Issue 3: EncryptHealth payment dropdown -- no traditional payment options

**Priority:** P2
**File(s):**
- `/Users/futuresystemslab/HypnoNeuro/encrypthealth/frontend/components/PaymentModal.tsx` lines 22-28, 100-104
- `/Users/futuresystemslab/HypnoNeuro/encrypthealth/frontend/components/BookSession.tsx` line 166
**Current:** PaymentModal only has a single "Sovereign Crypto" tab (ISO 20022 coins: XRP, XLM, HBAR, ALGO, ADA). BookSession.tsx line 166 comments: "Fiat/card payment removed -- FSL is sovereign crypto only". There are no Insurance, Credit Card, or other traditional payment options.
**Proposed fix:** This appears to be an intentional design decision ("FSL is sovereign crypto only"). If Dr. Meg wants traditional payment options restored, a new tab for fiat/card would need to be added to PaymentModal.tsx. However, the landing page (`page.tsx` line 430) still says "No Credit Card" as a selling point, which is consistent with crypto-only.
**Complexity:** MEDIUM (if change is desired)
**Needs Dr. Meg judgment:** Yes -- confirm whether this is working as intended or if a fiat fallback is needed for accessibility.

---

## Issue 4: XRPL "Coming Soon" on EncryptHealth sovereignty page

**Priority:** P2
**File(s):**
- `/Users/futuresystemslab/HypnoNeuro/encrypthealth/frontend/app/sovereignty/page.tsx` lines 18-29 (CARDS array), line 116 (renders "Coming Soon" badge)
**Current:** Two of the four sovereignty cards are marked `status: "coming_soon"`:
- "Find Direct-Pay Sovereign Guide" (line 18-23)
- "Wellness Sovereignty Guide" (line 24-29)

These render as grayed-out cards with "Coming Soon" badges.
**Proposed fix:** Neither card mentions XRPL specifically. If this issue refers to XRPL payment support being "coming soon" elsewhere, no such text was found in the codebase. If the "Find Direct-Pay Sovereign Guide" card should be activated now that the Sovereign Guides directory exists at `/participant/providers`, change its status to `"active"` and add `href: "/participant/providers"`.
**Complexity:** LOW (to activate existing card)
**Needs Dr. Meg judgment:** Yes -- clarify which "coming soon" item relates to XRPL and whether the Direct-Pay Sovereign Guide card should now link to the existing directory.

---

## Issue 5: Dr. Gabriel Duncan not in Sovereign Guides directory

**Priority:** P1
**File(s):**
- `/Users/futuresystemslab/HypnoNeuro/encrypthealth/frontend/app/participant/providers/page.tsx` lines 36-86 (PROVIDERS array)
**Current:** The PROVIDERS array contains only 3 entries:
1. Dr. Meg Montanez-Davenport (D.N.Psy., CBHP, BCHN, ISOM)
2. Christina Veselak (MS, LMFT, CN)
3. Dr. Henry Ealy (NMD, BCHN)

There is no entry for Dr. Gabriel Duncan, DDS (biological dentist) or any dental provider.
**Proposed fix:** Add a new Provider entry for Dr. Gabriel Duncan with appropriate credentials (DDS), specialty (biological/holistic dentistry), modalities, location, and verification status. Also needs a corresponding profile page at `/providers/[id]`. The dynamic guides API (`/api/providers/directory`) may also need his record if he onboarded through the provider flow.
**Complexity:** MEDIUM
**Needs Dr. Meg judgment:** Yes -- provide Dr. Duncan's full credentials, specialty description, modalities, wallet address, location, and whether he has completed provider onboarding.

---

## Issue 6: SovereignLedger "How It Works" -- superbill language

**Priority:** P1
**File(s):**
- `/Users/futuresystemslab/HypnoNeuro/encrypthealth/frontend/app/sovereign-ledger/page.tsx` line 167
**Current:**
```
Step 1: "Your Sovereign Guide provides a superbill after your session."
```
**Proposed fix:** "Superbill" is insurance-specific jargon. Since FSL positions itself as sovereign/crypto-first infrastructure (not insurance billing), consider:
```
Step 1: "Your Sovereign Guide provides a session receipt with CPT codes after your session."
```
Or if the superbill language is intentional for OON reimbursement purposes, add context:
```
Step 1: "Your Sovereign Guide provides a superbill (session receipt with CPT/ICD codes for reimbursement) after your session."
```
**Notes:** The SovereignLedger standalone repo at `/tmp/sl-audit/` contains only backend/database/docker code -- no frontend HTML. All user-facing SovereignLedger UI lives in the EncryptHealth frontend.
**Complexity:** LOW
**Needs Dr. Meg judgment:** Yes -- decide whether "superbill" is the right term or should be softened for a sovereign-first audience.

---

## Issue 7: SovereignLedger Step 3 insurance language

**Priority:** P1
**File(s):**
- `/Users/futuresystemslab/HypnoNeuro/encrypthealth/frontend/app/sovereign-ledger/page.tsx` lines 69, 143, 177
**Current:**
- Line 69: `"Your sovereign document vault. Upload, encrypt, send directly to your insurer."`
- Line 143: `{/* AREA 2 -- Send to Insurer / HSA / FSA */}`
- Line 177 (Step 3): `"Send directly to your insurer, HSA, or FSA administrator."`
- Line 208: Disclaimer says "We are not an insurance company, billing service, or claims processor."
**Proposed fix:** The language "send directly to your insurer" may imply FSL facilitates insurance claims, which contradicts the disclaimer. Consider:
- Line 69: `"Your sovereign document vault. Upload, encrypt, and share on your terms."`
- Line 177: `"Share with your insurer, HSA, FSA, or keep for your own records -- you control access."`
This preserves the use case while reinforcing sovereignty.
**Complexity:** LOW
**Needs Dr. Meg judgment:** Yes -- the insurance navigation is a real service FSL offers, so the language needs to be accurate without implying FSL acts as a billing intermediary.

---

## Issue 8: Doxy.me check-in -- no wallet-linked identification

**Priority:** P2
**File(s):**
- `/Users/futuresystemslab/HypnoNeuro/encrypthealth/frontend/app/participant/providers/page.tsx` line 270
- `/Users/futuresystemslab/HypnoNeuro/encrypthealth/frontend/app/sovereign-ledger/page.tsx` line 200
- `/Users/futuresystemslab/HypnoNeuro/encrypthealth/frontend/app/insurance-navigator/page.tsx` line 297
- `/Users/futuresystemslab/HypnoNeuro/encrypthealth/frontend/app/insurance/page.tsx` line 223
- `/Users/futuresystemslab/HypnoNeuro/encrypthealth/frontend/app/page.tsx` line 478
- `/Users/futuresystemslab/HypnoNeuro/encrypthealth/frontend/app/alchemist-forge/page.tsx` line 205
- `/Users/futuresystemslab/HypnoNeuro/encrypthealth/frontend/app/provider/schedule/page.tsx` line 113
**Current:** All Doxy.me links point to `https://doxy.me/hypnosispsych` and open in a new tab. Doxy.me uses its own waiting room with a "Full Name" field for check-in, which is disconnected from the FSL wallet-based identity system.
**Proposed fix:** Add instructional text near each Doxy.me link telling the participant what name/identifier to use at check-in so the provider can match them to their wallet session. Example:
```
<p className="text-[0.55rem] text-gray-400 mt-1">At check-in, use the name on your FSL account so Dr. Meg can match your session.</p>
```
Alternatively, if a wallet-linked video solution replaces Doxy.me in the future, this becomes moot.
**Complexity:** LOW
**Needs Dr. Meg judgment:** Yes -- decide the check-in instruction and whether to move away from Doxy.me entirely.

---

## Issue 9: sovereignledger.io MetaMask language

**Priority:** P0
**File(s):** NOT FOUND in codebase
**Current:** The SovereignLedger standalone repo (`/tmp/sl-audit/`) contains only backend code (Python/FastAPI), database schemas, and Docker configs -- no frontend HTML, no MetaMask references. The EncryptHealth frontend's sovereign-ledger page (`/app/sovereign-ledger/page.tsx`) has zero MetaMask references. The fsl-web repo also has no MetaMask references.
**Proposed fix:** If sovereignledger.io has MetaMask-specific language, it may be:
1. Hosted separately (e.g., a static site or different deployment) not in these repos
2. In a production build artifact not captured in source control
3. On a third-party landing page

Need to verify by visiting https://sovereignledger.io directly. If MetaMask language exists, it should be replaced with wallet-agnostic language ("Connect your Web3 wallet") or Brave Wallet preference, consistent with AlchemistForge.
**Complexity:** UNKNOWN -- depends on where the site is hosted
**Needs Dr. Meg judgment:** Yes -- confirm where sovereignledger.io is deployed from and whether it has a separate codebase.

---

## Issue 10: AlchemistForge wallet connect mismatch

**Priority:** P1
**File(s):**
- `/Users/futuresystemslab/alchemist-forge/index.html` lines 281, 288, 292, 296, 349-352
**Current:**
- Line 281: `"Connect your Brave Wallet to begin."`
- Line 288: Button says `"Connect Wallet"` (generic)
- Line 292: Tooltip says `"Recommended: Brave Wallet"`
- Line 296: Tooltip notes `"Other wallets: Any EIP-1193 wallet (MetaMask, Rabby, Coinbase Wallet) works."`
- Line 344-345: Error message says `"No wallet detected. Open this page in Brave Browser."` (excludes other wallets)
- Lines 349-352: Code prefers Brave Wallet but falls back to any injected provider

**Proposed fix:** The code correctly handles multiple wallets, but the UX messaging is inconsistent:
1. Line 281: Change to `"Connect your Web3 wallet to begin."` (don't assume Brave)
2. Line 345: Change error to `"No wallet detected. Use Brave Browser (recommended) or install a Web3 wallet extension."` (don't exclude non-Brave users)
The tooltip (line 292-296) is actually well-written and can stay as-is since it recommends Brave while acknowledging alternatives.
**Complexity:** LOW
**Needs Dr. Meg judgment:** No -- the code already supports multiple wallets; the messaging just needs to match.

---

## Issue 11: Ticker theme inconsistency across platforms

**Priority:** P2
**File(s):**
- `/Users/futuresystemslab/HypnoNeuro/encrypthealth/frontend/components/FSLTicker.tsx` (EncryptHealth ticker)
- `/tmp/fsl-web-audit/components/FSLLandingPage.jsx` lines 122-139 (fsl-web ticker)
- `/Users/futuresystemslab/alchemist-forge/index.html` -- NO TICKER present
**Current:**
| Property | EncryptHealth (FSLTicker.tsx) | fsl-web (FSLLandingPage.jsx) |
|---|---|---|
| Background | `#0A0A0A` | `#060F14` |
| Border | `border-[#00D9FF]/10` | `rgba(0,217,255,0.15)` |
| Font size | `0.7rem` | `0.72rem` |
| Letter spacing | `0.06em` | `0.06em` |
| Animation duration | `50s` | `28s` |
| Positive color | `#00FF88` | `#00E676` |
| Negative color | `#FF4444` | `#FF5252` |
| Symbol color | `#00D9FF` | `cyan` (resolves to `#00FFFF`) |
| Font family | `'Chakra Petch', monospace` | Inherits `Georgia, 'Times New Roman', serif` |

AlchemistForge has no ticker at all.

**Proposed fix:** Unify the ticker into a shared component or at minimum align:
1. Background: pick one (`#0A0A0A` or `#060F14`)
2. Positive/negative colors: standardize (`#00FF88`/`#FF4444` or `#00E676`/`#FF5252`)
3. Symbol color: standardize to `#00D9FF`
4. Font: Chakra Petch is the FSL brand font; fsl-web should use it too
5. Animation speed: `28s` vs `50s` is a content-length issue, not strictly a bug
6. AlchemistForge: decide whether it should also have a ticker for brand cohesion
**Complexity:** MEDIUM (cross-repo coordination)
**Needs Dr. Meg judgment:** Yes -- decide canonical color values and whether AlchemistForge gets a ticker.

---

## Summary

| Issue | Priority | Complexity | Needs Judgment |
|-------|----------|------------|----------------|
| 1. Boscovic alignment missing Vishnoi | P1 | LOW | Yes |
| 2. CBHP wrong expansion | P1 | LOW | No |
| 3. Payment dropdown crypto-only | P2 | MEDIUM | Yes |
| 4. Sovereignty "Coming Soon" cards | P2 | LOW | Yes |
| 5. Dr. Gabriel Duncan missing | P1 | MEDIUM | Yes |
| 6. Superbill language | P1 | LOW | Yes |
| 7. Step 3 insurer language | P1 | LOW | Yes |
| 8. Doxy.me check-in gap | P2 | LOW | Yes |
| 9. sovereignledger.io MetaMask | P0 | UNKNOWN | Yes |
| 10. AlchemistForge wallet messaging | P1 | LOW | No |
| 11. Ticker theme inconsistency | P2 | MEDIUM | Yes |

**Immediate fixes (no judgment needed):** Issues 2 and 10 can be fixed right now.
**Needs Dr. Meg decision before fix:** Issues 1, 3, 4, 5, 6, 7, 8, 9, 11.

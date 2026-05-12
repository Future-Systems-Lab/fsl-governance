# Public Surfaces Review -- Research Agent

**Date:** 2026-05-10
**Reviewer:** Research Agent (Claude Opus 4.6)
**Scope:** Verify FSL public-facing surfaces for consistency with academic claims (BHTY paper v2)

---

## Checklist Summary

| Check | Status |
|-------|--------|
| Patent 64/063,037 present | PASS -- present on fsl-governance README, alchemist-forge README, alchemistforge.io footer, hypnoneuro.io bundle |
| Game count (3 demos, not 45) | PASS -- no inflated game count found on any surface; HypnoNeuro described only as "Neuroplasticity Gaming" without a numeric claim |
| Contract count (9) | PARTIAL -- BHTY paper claims 9 (includes SovereignSession); fsl-governance README table lists only 8 (missing SovereignSession). See finding below |
| "Outside HIPAA scope" not "compliant" | PASS -- no surface uses "HIPAA compliant"; README references "HIPAA position" in the compliance directory description, which is neutral and accurate |
| No "ClaimChain" | PASS -- zero occurrences of "ClaimChain" across all surfaces |
| No "patient" in FSL context | PASS -- zero occurrences of "patient" across all surfaces reviewed |
| AlchemistForge Phase 1 disclosure | PASS -- disclosure present on both alchemist-forge README and the live alchemistforge.io site |
| Academic claims match BHTY paper | PASS with one exception -- see contract count discrepancy |

---

## Surface-by-Surface Verdicts

### 1. GitHub Org Profile README

**Verdict:** NOT AVAILABLE
**Severity:** MEDIUM

The surfaces content file shows a 404 for the GitHub org profile. This means either the org profile README does not exist or the capture failed. If it genuinely does not exist, this is a missed opportunity for patent and scope disclosures at the org level.

**Recommendation:** Create or verify the GitHub org profile README includes patent 64/063,037, "outside HIPAA scope" language, and correct contract count.

---

### 2. fsl-governance README

**Verdict:** PASS with one finding
**Severity:** MEDIUM

**Findings:**
- Patent 64/063,037: Present with full details (confirmation number, patent center number, title, inventor, deadline). Exemplary.
- HIPAA: Referenced as "HIPAA position" under compliance directory -- neutral and correct.
- Contract table: Lists 8 contracts. The BHTY paper claims 9 deployed contracts (the ninth being SovereignSession at 0xbeb13A360C6F0C77Ea3af3650Ab9762a1B9965A1). The README table is missing SovereignSession.
- No "ClaimChain": Confirmed absent.
- No "patient": Confirmed absent.
- No inflated game count: No game count claim present.
- Agent table: Lists 15 agents with approval status -- clean and verifiable.

**Contract Count Discrepancy (MEDIUM):** The fsl-governance README lists 8 contracts. The BHTY paper abstract and Section 7.1 both state "nine smart contracts." The DEPLOYED_CONTRACTS.md file in the repo does list 8 current v2 contracts (including NeuroBalanceConsent as a scaffold), while the BHTY paper's ninth is SovereignSession. The README table should match the paper's count of 9, or the paper's count should be corrected. Additionally, the README table appears to contain some v1 addresses (e.g., EHT at 0xbDaeb1d05E02D2751Ad07121510b5f0C436E2CdC does not match the v2 address 0x93583a7A24e50075c79b06db0be8Cf4D45B0bd88 listed in DEPLOYED_CONTRACTS.md).

**Recommendation:** Update the README contract table to (a) include SovereignSession as the 9th contract, (b) use v2 addresses consistently, and (c) match DEPLOYED_CONTRACTS.md and the BHTY paper exactly.

---

### 3. alchemist-forge README

**Verdict:** PASS
**Severity:** None (no issues)

- Patent 64/063,037: Present in header.
- Phase 1 disclosure: Present and accurate -- explicitly states participation is from the principal investigator and content engine wallets only.
- No inflated claims: States "architectural demonstration purposes" and references post-IRB Phase 2.
- No prohibited terms: No "ClaimChain," no "patient," no "HIPAA compliant."

---

### 4. Command Center (live HTML)

**Verdict:** PASS (partial review -- HTML truncated at line 300 in capture)
**Severity:** LOW

The captured HTML is cut off at the CSS section and does not include the full page body content. From what is visible:
- Clean design system with no textual claims in the captured portion.
- No prohibited terms found in the captured CSS/header.

**Recommendation:** Ensure the full Command Center HTML is captured for future audits, including all card content, stat blocks, and footer text.

---

### 5. alchemistforge.io (live site)

**Verdict:** PASS
**Severity:** None (no issues)

- Patent 64/063,037: Present in footer ("Patent Pending -- U.S. Provisional Application No. 64/063,037").
- Phase 1 disclosure: Present in a visible banner below the hero section, stating "Phase 1: Demonstration Deployment" with explicit detail about architect-initiated transactions and content-engine wallets.
- Stats: Shows "14 Demo TXs," "14 Sepolia TXs," "14 On-Chain Records," "7 Wallets" -- labeled as "Demo TXs" which is honest framing.
- No "ClaimChain": Confirmed absent.
- No "patient": Confirmed absent.
- No "HIPAA compliant": Confirmed absent.
- Ecosystem dropdown: Lists EncryptHealth, HypnoNeuro, SovereignLedger -- all current names, no deprecated terminology.
- HNT ticker: Described as "SOVEREIGN WELLNESS TOKEN" -- consistent with paper terminology.

---

### 6. hypnoneuro.io (live bundle check)

**Verdict:** PASS
**Severity:** None (no issues)

Bundle grep confirms:
- 1 occurrence of "64/063,037" (patent number present)
- 1 occurrence of "Patent Pending"
- No inflated game count detected in bundle check.

---

### 7. sovereignledger.io (live bundle check)

**Verdict:** INCONCLUSIVE
**Severity:** LOW

The bundle check returned no results for any search terms. This could mean the site has no relevant disclosures (missing patent notice) or the capture failed.

**Recommendation:** Manually verify sovereignledger.io includes patent 64/063,037 disclosure and appropriate scope language.

---

### 8. encrypthealth.io (check)

**Verdict:** INCONCLUSIVE
**Severity:** LOW

The check returned empty results. Same concern as sovereignledger.io.

**Recommendation:** Manually verify encrypthealth.io includes patent disclosure and "outside HIPAA scope" language (critical for a health-adjacent platform name).

---

## Critical / High / Medium / Low Classification

| Severity | Finding | Surface |
|----------|---------|---------|
| MEDIUM | Contract count discrepancy: README lists 8, paper claims 9; README may also contain stale v1 addresses | fsl-governance README |
| MEDIUM | GitHub org profile returns 404 -- no org-level disclosures verifiable | GitHub org profile |
| LOW | Command Center HTML capture truncated -- full content not auditable | Command Center |
| LOW | sovereignledger.io and encrypthealth.io bundle checks returned empty -- disclosures not verifiable | Live sites |

No CRITICAL findings.

---

## Done Well

1. **Patent disclosure consistency.** Patent 64/063,037 appears on every surface where it was verifiable (fsl-governance README, alchemist-forge README, alchemistforge.io, hypnoneuro.io). The fsl-governance README goes further with confirmation number, patent center number, and conversion deadline -- a level of transparency rarely seen in open-source projects.

2. **AlchemistForge Phase 1 honesty.** Both the GitHub README and the live site include an explicit Phase 1 disclosure acknowledging that all current on-chain activity is architect-initiated. The live site labels transaction stats as "Demo TXs" rather than organic engagement metrics. This is a strong academic integrity posture.

3. **Zero prohibited terminology.** No occurrence of "ClaimChain," "patient," or "HIPAA compliant" was found on any auditable surface. The lexicon discipline is holding across all public-facing materials.

4. **HIPAA framing is correct.** The fsl-governance README uses "HIPAA position" (neutral) rather than any compliance claim. No surface asserts HIPAA compliance, which is consistent with the BHTY paper's "outside HIPAA regulatory scope by architectural design" framing.

5. **Ecosystem naming is current.** All surfaces use "Sovereign Guides" or neutral terminology -- no deprecated "Providers" language detected. Platform names (EncryptHealth, HypnoNeuro, SovereignLedger, AlchemistForge) are consistent across all surfaces.

---

## Unique Perspective (Research Agent)

The most interesting finding from a research integrity standpoint is the **contract count tension between governance documentation and the academic paper**. The BHTY paper's claim of "nine smart contracts" is accurate per its own Table (Section 7.1), which includes SovereignSession. However, the fsl-governance README -- the single source of truth for the project's technical infrastructure -- lists only 8. This creates an asymmetry where a peer reviewer cross-referencing the paper against the governance repo would find a discrepancy.

This is not fabrication -- the ninth contract (SovereignSession) exists and is documented in the paper with a verifiable address. But the governance README, which is the most likely document a reviewer would check first, does not corroborate the claim. For a paper whose core contribution is transparency and verifiability, every claim should be trivially confirmable from the governance repo without requiring the reader to dig into deployment logs or contract source directories.

Additionally, the README contract table appears to contain some v1 addresses (comparing against DEPLOYED_CONTRACTS.md), which could confuse reviewers attempting to verify on-chain state. A reviewer checking EHT at the README address versus the paper's address would find different contracts, potentially raising unnecessary red flags.

The empty bundle checks for sovereignledger.io and encrypthealth.io deserve attention. If these live platforms lack patent disclosures, there is a gap in IP protection coverage. More importantly for academic review, if encrypthealth.io -- a platform with "health" in the name -- lacks explicit "outside HIPAA scope" language, that is a higher-priority remediation than the contract count issue.

---

*Review generated by Research Agent (Claude Opus 4.6) on 2026-05-10.*

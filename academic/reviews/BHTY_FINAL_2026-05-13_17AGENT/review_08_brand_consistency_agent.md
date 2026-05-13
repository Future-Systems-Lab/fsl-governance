# Review: Brand Consistency Agent (Agent 8 of 17)

**Reviewer:** brand_consistency_agent
**Date:** 2026-05-13
**Document:** `academic/BHTY_PAPER_v2.md` (v2, 594 lines)
**Scope:** Cross-document consistency (paper vs CV, LOI, Command Center), credential verification, six-layer thesis alignment, "Montanez" with tilde throughout, FSL lexicon compliance, game count verification

---

## VERDICT: CONDITIONAL ACCEPT

**OVERALL:** The paper is largely consistent with the FSL brand canon established in the CV, LOI, and governance documents. Credential postnominals are present and accurate but ordered differently from the LOI. The six-layer thesis is intentionally absent from the paper, which is defensible but creates a cross-document gap. The "Montanez" tilde is correctly rendered. Smart contract count has diverged between the LOI (eight) and the paper (nine), requiring LOI update. Game/demo count claims are absent from the paper, which is correct. FSL lexicon is clean.

---

## CRITICAL

### C1. Credential Order Inconsistency: Paper vs LOI

**Location:** Paper line 3, LOI lines 3 and 56
**Evidence:**
- **Paper:** "Meg Montanez-Davenport, D.N.Psy., CBHP, BCHN"
- **LOI:** "Meg Montanez-Davenport, D.N.Psy., BCHN, CBHP" (both header and signature)
The BCHN and CBHP credentials are swapped between the two documents.
**Impact:** If the ASU admissions committee reviews the BHTY paper alongside the LOI (likely, since the LOI references FSL extensively), the inconsistency in credential ordering may raise questions about attention to detail.
**Fix:** Standardize credential order across all documents. Recommend chronological order by date earned or alphabetical order. The LOI uses BCHN before CBHP; the paper reverses this. Pick one and apply everywhere.

### C2. Smart Contract Count Divergence: LOI Says Eight, Paper Says Nine

**Location:** Paper lines 19, 348, 389; LOI line 41
**Evidence:**
- **Paper (v2):** Consistently says "nine smart contracts" (Abstract, Section 7.1, Section 8).
- **LOI:** "Eight smart contracts are live on Ethereum Sepolia testnet."
The ninth contract (SovereignSession) was deployed after the LOI was written. The LOI is now stale.
**Impact:** If both documents are reviewed together, the discrepancy is noticeable. The LOI references FSL as "live" and "deployed" -- an outdated contract count undermines that claim.
**Fix:** Update the LOI to say "Nine smart contracts" or, if the LOI is already submitted, note the discrepancy for future document versions.

---

## HIGH

### H1. Six-Layer Thesis Absent from Paper

**Location:** Absent from paper; present in DECENTRALIZATION_ROADMAP.md, LOI, ASU_QUESTIONS.md, and prior paper draft (BHTY_PAPER_DRAFT.md line 86)
**Evidence:** The six-layer thesis (Financial, Identity, Governance, Compliance, Therapeutic, Research) is the canonical architectural framing in FSL governance documents. The prior draft (v1) included it in Section 3.1. It was removed in v2, likely in response to reviewer feedback from the May 10 review cycle (review_research_agent.md: "The six-layer thesis is mentioned but never elaborated. Either explain it or remove the reference.").
**Assessment:** Removing the six-layer thesis was the correct editorial decision for this paper. The paper's scope is the EIP-191 consent architecture, not the full FSL organizational model. However, the LOI prominently describes FSL as organized by this thesis, and the BHTY paper will likely be cited by the ASU application. The absence creates a gap if a reader moves from LOI to paper expecting to find the six-layer model.
**Recommendation:** No change to the paper. If the LOI is updated, consider adding a note that the six-layer thesis is the organizational model while the BHTY paper focuses specifically on the consent/authentication layer (which maps to the Identity and Governance layers of the thesis).

### H2. HypnoNeuro Description: Paper vs LOI

**Location:** Paper line 102; LOI line 41
**Evidence:**
- **Paper:** "HypnoNeuro -- A suite of browser-based wellness engagement activities with wallet-gated access and token-based engagement incentives."
- **LOI:** "HypnoNeuro (hypnotherapy and neurotransmitter-based wellness sessions with three flagship demos across L1 Hypnosis, L2 Orthomolecular, and L3 Inner Child, with the L1/L2/L3 framework architecturally wired for full build by specialist 3D game designers)"
The paper correctly omits the game/demo specifics (the L1/L2/L3 framework, "three flagship demos," and the "specialist 3D game designers" reference are implementation details not relevant to the consent architecture paper). However, the LOI calls these "three flagship demos" while the paper calls them "wellness engagement activities."
**Assessment:** The paper's description is appropriately abstract for an academic publication. The LOI's description is appropriately detailed for an application letter. No inconsistency -- different levels of detail for different audiences.
**Status:** No change needed.

### H3. Game Count Verification

**Location:** Not present in paper; LOI line 41
**Evidence:** The LOI mentions "three flagship demos across L1 Hypnosis, L2 Orthomolecular, and L3 Inner Child." The paper does not mention game count, demo count, or specific HypnoNeuro activities. This is correct -- the paper is about consent architecture, not game design.
**Cross-reference concern:** Earlier governance documents referenced "45 games." The LOI correctly says "three flagship demos" with the L1/L2/L3 framework "architecturally wired for full build." The paper avoids this entirely.
**Status:** PASS. The paper does not overclaim game/demo count.

---

## MEDIUM

### M1. "Montanez" Tilde Verification -- PASS

**Location:** Line 3
**Evidence:** The author line reads "Meg Montanez-Davenport" with the tilde (n with tilde) correctly rendered. The HTML CV also uses the tilde in the page title ("Meg Montanez Davenport"). Note: the CV HTML title uses "Montanez Davenport" (no hyphen) while the paper uses "Montanez-Davenport" (hyphenated). The LOI uses "Montanez-Davenport" (hyphenated).
**Minor concern:** CV title lacks hyphen; paper and LOI include hyphen. The CV should be updated to match.
**Status:** Tilde present and correct in the paper. Hyphenation is consistent between paper and LOI.

### M2. FSL Lexicon Compliance -- PASS

**Location:** Full document
**Evidence:** Verified against canonical FSL lexicon:
- "EncryptHealth" (not "Encrypt Health" or "EncryptedHealth") -- CORRECT
- "HypnoNeuro" (not "Hypno Neuro") -- CORRECT
- "SovereignLedger" (not "Sovereign Ledger" or "ClaimChain") -- CORRECT
- "AlchemistForge" (not "Alchemist Forge") -- CORRECT
- "NeuroBalance" (not "Neuro Balance") -- CORRECT
- "Sovereign Guide" (two words, capitalized) -- CORRECT
- "BenevolenceFund" (one word, CamelCase) -- CORRECT
- "SovereignSession" (one word, CamelCase) -- CORRECT
- "SovereignAchievement" (one word, CamelCase) -- CORRECT
- "HypnoNeuroToken (HNT)" -- CORRECT
- "EncryptHealthToken (EHT)" -- CORRECT
No instances of deprecated names (e.g., "ClaimChain") found.
**Status:** PASS. Full lexicon compliance.

### M3. Credential Verification

**Location:** Line 3
**Evidence:**
- **D.N.Psy.** (Doctor of Naturopathic Psychology) -- Verified in LOI line 15 (Kingdom College of Natural Health). Present in CV.
- **CBHP** (Certified Blockchain and Healthcare Professional) -- Verified in CV HTML line 186 (Blockchain Council, Apr 2025). Present in LOI line 23.
- **BCHN** (Board Certified in Holistic Nutrition) -- Referenced in LOI line 15. Not explicitly labeled in the CV HTML excerpt reviewed, but referenced in LOI credential narrative.
**Status:** All three credentials are cross-referenced and verified across documents.

### M4. Trademark and Patent Cross-Reference

**Location:** Paper lines 10-11
**Evidence:**
- **Trademark:** "USPTO Serial No. 99533250 (Class 42, Live/Under Examination)" -- matches LOI line 41.
- **Patent:** "U.S. Provisional No. 64/063,037 (filed 11 May 2026)" -- matches LOI line 41.
**Status:** PASS. IP references are consistent across documents.

### M5. NeuroBalance Description Consistency

**Location:** Paper line 108; LOI line 41
**Evidence:**
- **Paper:** "A general wellness dashboard integrating biometric data with on-chain consent management. NeuroBalance is currently in pre-implementation phase..."
- **LOI:** "NeuroBalance (backend wellness intelligence layer)"
The paper says "general wellness dashboard" while the LOI says "backend wellness intelligence layer." These are different characterizations -- dashboard (frontend) vs backend layer.
**Impact:** Minor framing difference. The paper's description is more specific about what NeuroBalance does (biometric data + consent management); the LOI's is more abstract.
**Recommendation:** Align descriptions in future document updates. "Wellness intelligence layer" is more accurate if NeuroBalance serves as backend infrastructure.

---

## LOW

### L1. Email Consistency

**Location:** Paper line 7; LOI line 4
**Evidence:** Both use `future.systems.lab@proton.me`. CONSISTENT.

### L2. Affiliation Consistency

**Location:** Paper line 5; LOI line 4
**Evidence:**
- **Paper:** "Future Systems Lab, NC, USA"
- **LOI:** "Founder & CEO, Future Systems Lab"
The paper uses location-based affiliation; the LOI uses role-based. Both are appropriate for their contexts.

### L3. NPI Number

**Location:** Absent from paper; LOI line 26
**Evidence:** The LOI includes NPI 1497696264. The paper does not mention the NPI, which is correct -- NPI is a clinical credentialing detail not relevant to a consent architecture paper.

---

## DONE WELL

1. **Brand name rendering is flawless.** All five platform names, all nine contract names, and all role titles are rendered in canonical FSL style with correct capitalization and spacing throughout the entire 594-line document.

2. **Appropriate scope boundaries.** The paper does not overreach into FSL marketing claims. It does not mention the 17-agent council, the game count, the L1/L2/L3 framework, or the six-layer thesis -- all of which would be out of scope for an academic consent architecture paper.

3. **IP disclosure is complete.** Both the trademark serial number and patent provisional number are included in the header, matching the LOI and governance records.

4. **Conflict of interest disclosure is honest.** Line 592: "The author is the founder, sole architect, and lead engineer of Future Systems Lab." This matches the LOI framing and does not omit any relevant conflicts.

5. **The paper strengthens the FSL brand.** By publishing a rigorous technical paper in a peer-reviewed journal, the BHTY submission positions FSL as a serious research infrastructure rather than a startup pitch. This is aligned with the ASU DEng application strategy.

---

## UNIQUE PERSPECTIVE (Brand Consistency)

The most significant brand consistency issue is the credential ordering (CBHP, BCHN in paper vs BCHN, CBHP in LOI). This is a small detail but it is the kind of thing that admissions committees and peer reviewers notice. Academic credential ordering conventions typically follow: (1) highest degree first, then (2) certifications in order earned or alphabetically. Since D.N.Psy. is the doctoral credential and comes first in both documents, the remaining question is BCHN vs CBHP ordering. The LOI places BCHN first (earned earlier, per the LOI narrative); the paper places CBHP first. Recommend standardizing to the LOI order (D.N.Psy., BCHN, CBHP) since it follows chronological order of credential attainment.

The contract count divergence (LOI: 8, paper: 9) is a time-based drift issue -- the LOI was written before SovereignSession was deployed. This is natural in an active development project but should be reconciled before the ASU application package is finalized.

The six-layer thesis removal was the right editorial call. The BHTY paper is stronger without it because the paper's contribution is the consent architecture, not the organizational framework. The six-layer thesis belongs in the DEng applied project documentation, not in a focused technical paper. Future cross-referencing between the BHTY paper and the DEng proposal should acknowledge this scope difference explicitly.

Overall, the paper is well-aligned with the FSL brand canon and does not introduce any new claims, names, or framings that contradict existing governance documents.

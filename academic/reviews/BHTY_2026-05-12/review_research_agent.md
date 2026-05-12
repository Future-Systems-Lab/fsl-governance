# Research Agent Review: BHTY Manuscript v2
## "EIP-191 Consent Architecture for Sovereign Behavioral Health Data Governance: A Decentralized Implementation"

**Review date:** 2026-05-12
**Target journal:** Blockchain in Healthcare Today (BHTY)
**Word count (v2):** ~7,275 (target 5,000-7,000; cap 10,000)
**Prior review:** v1 review dated 2026-05-10 identified 7 critical/important gaps (B1-B7)

---

## 1. SUMMARY

The v2 manuscript is a substantial and successful revision. The paper has nearly doubled in length (from ~3,700 to ~7,275 words), added a comparative evaluation section (Section 9) with a five-system properties table, expanded the literature review from 12 to 35 references, added detailed regulatory positioning (HIPAA, 42 CFR Part 2, FTC), corrected the SovereignSession co-signing claim, added the EIP-191 vs. EIP-712 design rationale, and included figure captions for four figures. The paper now reads as a systems research contribution rather than a product whitepaper. Several important issues remain, but none are likely to trigger desk rejection.

---

## 2. STRENGTHS

1. **Evaluation section with comparative table (v1 gap B1 -- RESOLVED).** Section 9 provides a structured comparative analysis against MedRec, ADvoCATE, Welzel et al. (2025), and US Patent 12,235,984. The properties table (Table 2) is well-chosen and clearly differentiates FSL on auth-consent unification and zero-PHI architecture. The honest "Limitations of the Comparison" subsection (9.3) pre-empts reviewer objections about comparing systems at different maturity levels.

2. **Thorough regulatory positioning (v1 gap B4 -- RESOLVED).** Section 5.2 now provides an explicit, well-reasoned HIPAA analysis citing 45 CFR 160.103 and 164.514, addresses 42 CFR Part 2, and acknowledges the FTC Health Breach Notification Rule. The framing -- "architecturally positioned outside the scope of HIPAA regulation" rather than "HIPAA compliant" -- is exactly correct and will withstand reviewer scrutiny.

3. **EIP-191 vs. EIP-712 rationale (v1 gap B3 -- RESOLVED).** Section 2.4 provides three concrete reasons for the EIP-191 choice (human readability, broader wallet support, server-side verification by design) and honestly acknowledges EIP-712's advantages for on-chain verification. The mention of EIP-1271 for future multi-sig governance is a good addition.

---

## 3. GAPS

### CRITICAL

None. All seven critical/important gaps from the v1 review have been addressed to a degree sufficient to survive peer review.

### IMPORTANT

- **I1: Deployment metrics remain vague.** Section 8 says AlchemistForge "has recorded transmutation events from unique wallet addresses" but still reports no concrete numbers. The v1 review (I5) flagged this exact issue. Even testnet numbers (e.g., "47 transmutation events from 12 unique addresses over a 6-month period") add credibility. The absence of any quantitative deployment data is the single most likely reviewer complaint in v2.

- **I2: No gas cost or latency data.** The evaluation section (Section 9) compares architectural properties but provides no performance measurements. Gas costs per transaction type (session attestation, achievement mint, AlchemistForge engagement), authentication latency (nonce request through JWT issuance), and consent verification time are all measurable on Sepolia and would strengthen the evaluation considerably. A Table 3 with representative gas costs for each contract function would take minimal effort and add significant substance.

- **I3: Smart contract count inconsistency.** Section 7.1 Table 1 lists nine contracts, but Section 8 says "Eight verified contracts on Sepolia." This discrepancy (nine vs. eight) will be caught by attentive reviewers and raises a credibility concern. Reconcile the count -- if NeuroBalanceConsent is a scaffold not yet fully deployed, state that explicitly.

- **I4: Figures referenced but not present in manuscript body.** The paper references Figures 1-4 throughout and provides figure captions in a dedicated section at the end. This is acceptable for submission if the actual figure files are submitted alongside the manuscript, but the current markdown document contains no embedded figures. If figures are not yet created, this is a blocking issue for submission. Confirm that the four figures exist as separate files ready for submission.

- **I5: Threat model still absent.** The v1 consolidated review (Section C) called for a formal threat model with adversary classes, trust assumptions, and attack surfaces. v2 discusses architectural tradeoffs (Section 10.1) and revocability semantics (Section 10.2) but does not present a systematic threat model. While the Discussion section partially addresses this through tradeoff analysis, a dedicated subsection (e.g., "10.1.5 Trust Assumptions and Adversary Model") listing the trust boundary, what is trusted (the server, the wallet provider), and what attacks the architecture does/does not defend against would pre-empt a common reviewer objection for security-adjacent systems papers.

### NICE-TO-HAVE

- **N1: Single-author framing.** The COI statement is honest ("The author is the founder, sole architect, and lead engineer"), but the paper would benefit from any form of external validation -- an acknowledgment of independent code review, a security audit firm, or an advisory board review. This is not required but mitigates the "product marketing" perception.

- **N2: Abstract length.** The abstract is ~250 words, which is appropriate for BHTY, but it packs in many details (EIP-712 comparison, AlchemistForge, nine contracts). Consider tightening to ~200 words by removing the EIP-712 mention from the abstract (it is well-covered in Section 2.4) and replacing it with a single concrete deployment metric.

- **N3: Reference [32] is ERC-721 but cited for MindMasteryNFT which is described as ERC-1155.** Table 1 says MindMasteryNFT is "ERC-1155 [32] achievement credentials" but reference [32] points to the ERC-721 standard (Entriken et al., 2018). Reference [33] is the ERC-1155 standard. The citation should be [33] for MindMasteryNFT, or the description should clarify if MindMasteryNFT is actually ERC-721.

---

## 4. SPECIFIC EDITS

### Section 8 (Deployment Results)
Replace the vague "has recorded transmutation events from unique wallet addresses" with concrete numbers:
> AlchemistForge has been deployed at address `0xE09...` and has recorded **[N] transmutation events from [M] unique wallet addresses** over the period [date range]. A public analytics dashboard reads directly from the blockchain to display participation metrics without any centralized data store.

### Section 8 (Deployment Results)
Reconcile contract count: change "Eight verified contracts on Sepolia" to "Nine smart contracts deployed on Sepolia" to match Table 1, or explain which contract is unverified/partially deployed.

### Table 1 (Section 7.1)
MindMasteryNFT citation: change `[32]` to `[33]` if MindMasteryNFT is ERC-1155, or change the description to ERC-721 if it is actually ERC-721.

### Section 9.1 (Comparative Properties Table)
Add a row for "Performance Data Available" (Yes/No) to make explicit that none of the compared systems provide benchmarks, which contextualizes FSL's own lack of performance data.

### Section 10.1 (Architectural Tradeoffs)
Add a paragraph on trust assumptions:
> The FSL architecture trusts three components: (1) the Ethereum network for immutable event recording, (2) the server for honest JWT issuance and consent validation, and (3) the wallet provider for faithful message display and signature generation. Compromise of the server signing key would allow forged JWTs; compromise of the wallet provider could allow signature over modified consent text. These trust boundaries are consistent with standard Web3 application security models but should be understood as limitations of the current architecture.

---

## 5. REFERENCES NEEDED

The reference list has expanded from 12 to 35, which is adequate for BHTY. The following additions would further strengthen the paper but are not blocking:

1. **Benchoufi, M. & Ravaud, P. (2017).** Blockchain technology for improving clinical research quality. *Trials*, 18(1), 340. DOI: 10.1186/s13063-017-2035-z -- Relevant to consent in clinical/research contexts; useful for Section 2.2 to show how FSL's consent model differs from clinical trial consent.

2. **Roehrs, A., da Costa, C.A., & da Rosa Righi, R. (2017).** OmniPHR: A distributed architecture model to integrate personal health records. *JBHI*, 21(6), 1561-1567. DOI: 10.1109/JBHI.2017.2666080 -- Patient-centric health record architecture for comparison in Section 9.

3. **Politou, E., Alepis, E., Patsakis, C., et al. (2021).** Blockchain mutability: Challenges and proposed solutions. *IEEE TECS*, 21(6), 5765-5782. DOI: 10.1109/TETC.2019.2949510 -- GDPR right-to-erasure vs. blockchain immutability tension. Relevant to Section 10.2 discussion of data lifecycle and the fact that on-chain attestations cannot be deleted.

---

## 6. PEER-REVIEW RISK

### Risks that have been MITIGATED since v1:

1. **"Where are the results?"** -- MITIGATED. Section 9 provides a structured comparative evaluation. Not eliminated entirely (no quantitative data), but the paper now has an evaluation section that a reviewer can engage with rather than reject outright.

2. **"This is a product description."** -- MITIGATED. The paper foregrounds the generalizable architectural pattern. The Discussion (Section 10) and Limitations (Section 10.3) are thorough and self-critical. The COI statement and AI disclosure are transparent.

3. **"The revocability claim is false."** -- RESOLVED. Section 3.5 and Section 10.2 now provide a precise three-layer revocation model and explicitly acknowledge that JWT statelessness limits instant revocation. The corrected framing ("revocable within defined bounds") is honest and defensible.

4. **"No regulatory awareness."** -- RESOLVED. Section 5.2 is strong.

5. **"EIP-191 vs EIP-712 not addressed."** -- RESOLVED. Section 2.4 is thorough.

### Remaining risks:

1. **"No quantitative evaluation data."** (MEDIUM risk) The comparative table is qualitative only. A reviewer may still ask: "You deployed nine contracts -- what are the gas costs? How long does authentication take? How many users have tested this?" Adding even basic Sepolia metrics (gas per function call, authentication round-trip time, number of test sessions) would close this gap. This is the most likely basis for a "revise and resubmit" rather than "accept."

2. **"Figures not included."** (MEDIUM risk) Four figures are captioned but not embedded. If the submission package does not include the actual diagram files, reviewers will flag this as incomplete. Ensure figures exist as separate files (PDF/PNG) at submission time.

3. **"Single-guide, single-author, testnet-only."** (LOW-MEDIUM risk) The paper acknowledges all three limitations, which reduces risk. However, a skeptical reviewer may argue that a single-user testnet deployment does not constitute sufficient evidence for the architectural claims. The planned IRB user study (Section 10.3, item 9) is the right answer but does not help this submission.

4. **"No formal threat model."** (LOW risk) The tradeoff discussion in Section 10.1 partially addresses this, and the paper is positioned as an architecture/systems contribution rather than a security paper. However, adding a brief trust assumptions paragraph would close this gap cheaply.

---

## OVERALL ASSESSMENT

**v1 verdict:** Not ready for submission. Seven critical gaps.
**v2 verdict:** Approaching submission-ready. Zero critical gaps remain. The paper addresses all seven v1 issues substantively. The remaining gaps (quantitative metrics, figure files, minor reference errors, threat model paragraph) are addressable in a focused revision session of 2-4 hours.

**Recommendation:** Address I1 (deployment numbers), I2 (gas/latency table), I3 (contract count), and N3 (ERC citation) before submission. These are small fixes with high reviewer-impact. The paper is otherwise ready for BHTY submission.

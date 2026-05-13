# META REVIEW — BHTY_PAPER_v2 Final Pre-Submission Review

**Date:** 2026-05-13
**Paper:** EIP-191 Consent Architecture for Sovereign Behavioral Health Data Governance
**Reviewed by:** 17 independent FSL agents
**Paper stats:** 594 lines, 7717 words, 36 references, 4 figures, 2 code listings

---

## 1. Vote Tally (17 Agents)

| Verdict | Count | Agents |
|---------|-------|--------|
| **APPROVE / ACCEPT WITH MINOR REVISIONS** | 14 | Peer Reviewer, Legal Compliance, Cryptography, Smart Contract, Clinical Ethics, DevOps, Database, Documentation, NatPsy, Legal/IP, Marketing, UX, Governance |
| **CONDITIONAL ACCEPT** | 2 | System Architect, Academic Writing, Brand Consistency |
| **MAJOR REVISIONS** | 1 | Data Science |
| **BLOCK** | 0 | — |

**Consensus: SUBMISSION-READY after addressing critical fixes below.**

---

## 2. Critical Blockers (Flagged by 3+ Agents — MUST Fix Before Submission)

### BLOCKER 1: Listing 2 "SessionCompleted" vs Deployed "SessionEnded"
**Flagged by:** 13/17 agents (near-unanimous)

Listing 2 (line 314) uses `SessionCompleted` but the deployed SovereignSession contract (0xbeb13A...65A1) emits `SessionEnded`. Figure 4 caption (line 504) repeats the same mismatch. Event parameter signatures also differ.

**Fix:** Change `SessionCompleted` to `SessionEnded` in Listing 2 AND Figure 4 caption. Verify parameter order matches deployed ABI.

### BLOCKER 2: Section 10.3 Duplicate Numbering
**Flagged by:** 12/17 agents

Two items numbered "10" at lines 478 and 480 (Phase 5 and Mainnet deployment). 

**Fix:** Renumber as items 10 and 11.

### BLOCKER 3: Reference [7] "Brber" — Author Name OCR Error
**Flagged by:** 8/17 agents

Reference [7]: "Maslove, D.M., Klein, J., **Brber, K.**, & Allan, A." — should be "Barber, K." (verified from JMIR Medical Informatics 2018 publication).

**Fix:** Correct to "Barber, K."

### BLOCKER 4: Reference [11] "Milber" — Author Name OCR Error
**Flagged by:** 8/17 agents

Reference [11]: "Dagher, G.G., Mohler, J., **Milber, M.**, Marella, A., & **Muraleedaharan**, N." — should be "Milner, M." and "Muraleedharan, N."

**Fix:** Correct both names.

### BLOCKER 5: Reference [32] ERC-721 Orphaned
**Flagged by:** 8/17 agents

Reference [32] (ERC-721) is never cited in the body text. Table 1 row for MindMasteryNFT says "ERC-1155 [33]" which is correct; no ERC-721 contracts exist in FSL.

**Fix:** Remove reference [32] and renumber [33]→[32], [34]→[33], [35]→[34], [36]→[35]. OR add a citation in the ERC-1155 vs ERC-721 discussion if contextually appropriate.

---

## 3. High Priority (Flagged by 2+ Agents)

### HIGH 1: Section 3.1 "pre-implementation phase" vs "scaffolded"
**Flagged by:** 5 agents (Peer Reviewer, System Architect, DevOps, Smart Contract, Brand)

NeuroBalance is described as "pre-implementation phase" (line 108) but has a deployed contract (NeuroBalanceConsent at 0x2157...96b8) listed in Table 1. Figure 1 labels it "Scaffolded."

**Fix:** Change "pre-implementation phase" to "scaffolded" for consistency with Table 1 and Figure 1.

### HIGH 2: Revenue Split Tense — "is enforced" vs "is designed to be enforced"
**Flagged by:** 3 agents (Data Science, Governance, DevOps)

Section 5.3 (line 285): "The 70/27/3 revenue split is enforced by smart contract logic" — but no live transaction has ever executed the split. Present tense implies operational enforcement.

**Fix:** Change to "The 70/27/3 revenue split is designed to be enforced by smart contract logic at transaction time."

### HIGH 3: Table Labels Missing
**Flagged by:** 3 agents (Academic Writing, Documentation, UX)

Section 7.1 contract table has no "Table 1" header. Section 9.1 comparison table has no "Table 2" header. Tables are referenced in text but not formally labeled.

**Fix:** Add "Table 1. Deployed Smart Contracts" and "Table 2. Comparative Properties" headers.

### HIGH 4: Credential Order Inconsistency
**Flagged by:** 2 agents (Brand, Academic Writing)

Paper: "D.N.Psy., CBHP, BCHN" — LOI: "D.N.Psy., BCHN, CBHP" — CV: "D.N.Psy., BCHN, CBHP"

**Fix:** Align to CV canonical order: "D.N.Psy., BCHN, CBHP"

### HIGH 5: Figure 4 Caption Mismatch
**Flagged by:** 4 agents (System Architect, Smart Contract, Academic Writing, Peer Reviewer)

Caption says "SessionCompleted" — same as Listing 2 mismatch above. Also says "dashed lines indicate on-chain anchoring" but the actual v2/v3 figures use dashed lines for scaffolded/planned components.

**Fix:** Change "SessionCompleted" to "SessionEnded." Remove or correct the dashed-lines description.

### HIGH 6: Contract Deployment Date Vague
**Flagged by:** 2 agents (Peer Reviewer, DevOps)

Section 8: "Contract deployment date range: 2025-2026" — imprecise.

**Fix:** Verify actual deployment range from Blockscout and specify (e.g., "March 2026 – May 2026").

---

## 4. Single-Agent Observations Worth Considering

| Agent | Observation |
|-------|-------------|
| **Data Science (16)** | Zero quantitative metrics in the paper. "First to unify" claim is asserted, not demonstrated through systematic review. Basic deployment metrics (tx count, unique wallets, gas costs) are obtainable from Blockscout and would strengthen Section 8. |
| **Governance (17)** | 7 of 9 contracts (78%) are under single-wallet control. "Decentralized" in the title may invite criticism. Consider qualifying: "decentralized authentication architecture with centralized governance components." |
| **Database (10)** | Section 10.2 references data deletion but doesn't specify the mechanism. Section 4.1 points to 10.2 for lifecycle details, creating a circular reference. |
| **NatPsy (12)** | No trauma-informed design discussion for AlchemistForge permissionless shadow work. A participant could record harmful content without any safety guardrails. |
| **Legal/IP (13)** | IPFS pin timestamp of BHTY paper must postdate provisional filing (May 11, 2026) to avoid prior-art concerns. Verify chronological sequence. |
| **Marketing (14)** | Abstract overloaded with 9 competing claims. Lead with the single strongest: consent-as-authentication unification. |

---

## 5. Final Aggregate Verdict

### SUBMISSION-READY after 5 critical fixes + 6 high-priority fixes

**Estimated time to address:**
- 5 Critical blockers: ~1 hour (mechanical text corrections)
- 6 High-priority fixes: ~1-2 hours (minor rewording + table labels + date verification)
- **Total: 2-3 hours of editing, no structural rewrite needed**

### Would this pass peer review at BHTY today?

**Yes, with high probability of "revise and resubmit."**

The paper's core contribution (consent-as-authentication unification via EIP-191) is novel and well-articulated. The comparative analysis against Welzel et al., MedRec, ADvoCATE, and US Patent 12,235,984 is thorough. The honest limitations section (10.3) proactively addresses most reviewer concerns. The zero-PHI architecture argument is legally precise and well-supported.

A BHTY reviewer would likely request:
1. Basic deployment metrics (tx counts, gas costs — easily obtainable)
2. Clarification of the single-deployer-wallet centralization
3. A plan or timeline for the formal user study

These are standard "revise and resubmit" items, not rejection-level concerns. The critical fixes above (event name, reference errors, numbering) are formatting issues that would be embarrassing if submitted unfixed but are trivial to correct.

**Recommendation: Fix the 5 blockers + 6 high-priority items, regenerate PDF, and proceed to submission in the June 22-30 window.**

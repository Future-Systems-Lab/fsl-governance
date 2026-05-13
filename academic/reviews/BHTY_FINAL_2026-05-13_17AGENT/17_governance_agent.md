# Review 17: Governance Agent

**Reviewer:** governance_agent (decentralization claims, multisig disclosure, revenue accuracy, governance honesty)
**Date:** 2026-05-13
**Document:** `academic/BHTY_PAPER_v2.md`
**Review Type:** 17-agent independent review

---

## VERDICT: ACCEPT WITH MINOR REVISIONS

## OVERALL: 7/10

The paper is notably honest about its centralization limitations, which is the most important governance property of an academic disclosure. The single-deployer wallet is acknowledged. The testnet-only status is acknowledged. The N=1 guide deployment is acknowledged. However, several governance-relevant claims require tightening: the revenue split is described in present tense despite never being executed on-chain, the BenevolenceFund governance model is insufficiently disclosed, and the paper's framing of "decentralized" requires careful scrutiny against the actual centralized components.

---

## CRITICAL ISSUES

### C1. Revenue Split "70/27/3" -- Present-Tense Claim for Untested Mechanism
- Section 5.3 states: "The 70/27/3 revenue split is enforced by smart contract logic, not by FSL discretion."
- **Verification against governance documents:** The 70/27/3 split (70% Sovereign Guide, 27% FSL operations, 3% BenevolenceFund) is the canonical split across all governance documents: `specs/HNT_TOKEN_ECONOMICS.md`, `contracts/DEPLOYED_CONTRACTS.md`, `operations/PRACTITIONER_ACKNOWLEDGMENTS.md`, and the paper itself. The numbers are consistent and correct.
- **However:** Per `security/FSL_ECOSYSTEM_AUDIT.md` line 87, "Revenue splits | 0 | No live splits yet." The mechanism has never processed a single transaction. The claim "is enforced" is factually inaccurate for the present state.
- **Governance concern:** Describing an untested economic mechanism as "enforced" in an academic paper constitutes a forward-looking statement presented as current fact. This is a governance disclosure failure.
- **Fix:** Change "is enforced" to "is designed to be enforced" or "will be enforced upon deployment of the settlement function."

### C2. BenevolenceFund Governance Model Insufficiently Disclosed
- The paper mentions BenevolenceFund in Section 5.3 (revenue split) and Table 1 (contract listing, marked "Owner-distributed").
- Missing disclosures:
  - **Who controls distribution?** The contract is "Owner-distributed" -- meaning a single wallet controls when and how the fund is distributed. This is not disclosed in the paper text.
  - **Distribution criteria.** Per `academic/study_materials/BENEVOLENCEFUND_MECHANICS.md`, the fund distributes annually (April 1) with a 44/33/22/1 split to top 3 guides + top participant. None of this governance structure is disclosed in the paper.
  - **No DAO or multisig governance.** The fund is controlled by the same single deployer wallet that controls all other owner-controlled contracts. A reader might assume "BenevolenceFund" implies community governance, but it is entirely owner-controlled.
- **Governance concern:** A "BenevolenceFund" controlled by a single wallet with opaque distribution criteria is a governance risk that should be disclosed in an academic paper claiming decentralized architecture.
- **Fix:** Add a sentence: "BenevolenceFund distributions are currently controlled by the single deployer wallet; migration to multisig or DAO-based distribution governance is planned."

---

## HIGH ISSUES

### H1. Single Deployer Wallet -- Disclosed but Underemphasized
- Section 7.1 states: "All owner-controlled contracts are currently deployed from a single deployer wallet. This centralization is acknowledged as a limitation."
- Section 10.3 item 6 repeats: "All owner-controlled contracts are deployed from a single wallet address, creating a centralization risk."
- **Assessment:** The disclosure exists and is honest. However, the implications are underexplored:
  - The deployer wallet can unilaterally: mint tokens (HNT, EHT), issue credentials (MindMasteryNFT, SovereignAchievement), control the NeuroBalanceConsent contract, and distribute BenevolenceFund.
  - The only contracts outside deployer control are AlchemistForge (fully permissionless) and SovereignLedger v2 (open registration).
  - This means 7 of 9 contracts (78%) are under single-wallet control.
- **Recommendation:** Quantify the centralization: "Seven of nine deployed contracts are owner-controlled by a single wallet address" rather than the vague "All owner-controlled contracts."

### H2. "Decentralized" Framing vs. Centralized Reality
- The paper title includes "Decentralized Implementation." The abstract calls FSL "a decentralized health data infrastructure." Section 1 describes "an alternative architecture" to centralized systems.
- **Actual centralized components** (acknowledged in Section 10.1):
  - PostgreSQL database (single point of failure)
  - Frontend hosting (centralized)
  - API server (centralized)
  - Single deployer wallet for 7/9 contracts
  - JWT issuance server (centralized)
  - Nonce generation server (centralized)
- The paper does acknowledge these in Section 10.1: "the blockchain provides auditability and tamper-evidence for consent events, not full decentralization of the system." This is an honest caveat.
- **Governance concern:** The tension between the title/abstract framing ("decentralized") and the actual architecture (primarily centralized with blockchain-anchored audit trail) should be addressed more directly. The paper is honest in Section 10.1 but the title and abstract set a different expectation.
- **Recommendation:** Consider whether "blockchain-anchored" or "hybrid decentralized" more accurately describes the architecture than "decentralized."

### H3. Multisig Migration -- Claimed as Planned but No Timeline or Specification
- The paper references multisig migration twice: Section 7.1 ("migration to multisig governance is planned for mainnet deployment") and Section 10.3 item 6 ("Migration to multisig or DAO-based governance is planned").
- No details are provided: What multisig scheme? How many signers? What threshold? What timeline?
- **Governance concern:** "Planned" without specification is an indefinite commitment. For a paper claiming to address data sovereignty, the governance of the system's own smart contracts deserves more than a promissory note.

---

## MEDIUM ISSUES

### M1. Section 10.3 Numbering Error -- Two Items Numbered "10"
- Items 10 (Phase 5 doctoral research) and 10 (Mainnet deployment) share the same number.
- In a governance context, a limitations section with numbering errors undermines the precision expected of a disclosure document.

### M2. Phase 5 = Two-Party Mutual Authentication + Encrypted Recording -- Confirmed
- Section 10.3 item 10 (first occurrence) describes Phase 5 as: "Two-Party Wallet-Signed Mutual Authentication with Client-Side Encrypted Session Recording."
- This is correctly characterized as future doctoral research and explicitly stated as "not claimed as implemented in the current system."
- **Governance assessment:** The disclosure is appropriate. The claim boundary is clearly drawn.

### M3. Nine Contracts Confirmed
- Table 1 (Section 7.1) lists exactly nine contracts. The abstract states "nine smart contracts." These are consistent.
- Cross-reference with `contracts/DEPLOYED_CONTRACTS.md` confirms the same nine contracts.
- **Assessment:** No discrepancy. The count is accurate.

### M4. References [7] "Brber" and [11] "Milber" -- OCR Errors
- [7] "Brber, K." and [11] "Milber, M." are corrupted author names.
- From a governance perspective, inaccurate attribution of prior work is an integrity issue, even if caused by OCR rather than intent.

### M5. Reference [32] ERC-721 Orphaned
- ERC-721 is referenced in the bibliography but never cited in the text.
- The system uses ERC-1155, not ERC-721. Including an uncited reference to a standard the system does not use is misleading.

### M6. Listing 2 "SessionCompleted" vs Deployed "SessionEnded"
- The paper's Listing 2 uses `SessionCompleted` but the deployed contract uses `SessionEnded`.
- **Governance concern:** An academic paper should accurately represent deployed code. The event name discrepancy, while minor technically, means the paper does not match the on-chain record. For a system claiming immutable auditability, this inconsistency matters.

---

## LOW ISSUES

### L1. Conflict of Interest Disclosure Is Adequate but Minimal
- The COI statement reads: "The author is the founder, sole architect, and lead engineer of Future Systems Lab."
- This is honest but could be more specific: the author is also the sole deployer, the only tested Sovereign Guide, and the PI for the planned IRB study. The degree of single-person dependency is unusual for a systems paper.

### L2. Practitioner Independence Claim (Section 5.3) Lacks External Validation
- The paper states Sovereign Guides "are independent practitioners, not employees, contractors, or agents of FSL."
- This classification has not been tested by IRS, DOL, or any regulatory body. The paper states it as fact rather than as the intended legal positioning.

### L3. No Agent Council or 17-Agent Reference in Paper
- The paper does not reference a 17-agent review process or agent council. No issues here -- the paper should not make claims about its own review process that are not part of the academic contribution.

---

## DONE WELL

1. **Single-deployer wallet acknowledgment is present and honest.** Many blockchain projects obscure centralization. This paper names it directly in both the implementation section and the limitations section.

2. **"Outside HIPAA scope" vs "HIPAA compliant" distinction is precise.** The paper never claims HIPAA compliance. It carefully explains why the system falls outside HIPAA scope and acknowledges FTC Health Breach Notification Rule applicability. This is governance-aware regulatory positioning.

3. **Testnet-only status is clearly stated.** The paper does not conflate testnet deployment with production readiness. Section 10.1 explicitly notes the lack of "economic security guarantees."

4. **N=1 user base is disclosed.** "All participation activity is architect-initiated or campaign-generated; no external organic adoption has been measured" is an unusually honest deployment characterization.

5. **Phase 5 boundary is clearly drawn.** The paper explicitly states that two-party mutual authentication "is not claimed as implemented in the current system." This prevents scope confusion between current and future work.

6. **Revocation semantics are honestly caveated.** The acknowledgment that wallet disconnection does not invalidate JWTs, and the explanation of why this matters, demonstrates integrity in governance disclosure.

---

## UNIQUE PERSPECTIVE: GOVERNANCE

The fundamental governance question for this paper is: **Does the system deliver on its sovereignty promise?**

The paper claims participant data sovereignty through cryptographic consent. Let us evaluate each sovereignty property:

| Sovereignty Property | Claimed | Actual Status |
|---------------------|---------|---------------|
| Identity is wallet-controlled | Yes | Yes -- no username/password |
| Consent is cryptographic | Yes | Yes -- EIP-191 signature |
| Access is token-gated | Yes | Yes -- JWT from wallet signature |
| Revocation is participant-controlled | Yes | Partial -- JWT expiration + grant deletion, but no real-time token invalidation |
| Data is participant-owned | Yes | Partial -- on-chain data is immutable/public, off-chain data is in centralized PostgreSQL |
| Infrastructure is decentralized | Implied by title | No -- centralized server, database, hosting |
| Contract governance is decentralized | No (honestly) | No -- single deployer wallet |
| Revenue distribution is transparent | Yes | Designed but untested |

The paper scores well on honesty (6 of 8 properties are accurately characterized) but the remaining two -- infrastructure decentralization and revenue enforcement -- involve present-tense claims that exceed the current state.

The most important governance recommendation: **Change "is enforced" to "is designed to be enforced" for the revenue split, and add a single sentence disclosing BenevolenceFund's owner-controlled distribution model.** These are small textual changes that bring the paper's claims into precise alignment with its governance reality.

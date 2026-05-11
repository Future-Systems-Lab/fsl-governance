# BHTY Paper --- Consolidated Multi-Agent Review
**Date:** 2026-05-11
**Paper:** "EIP-191 Consent Architecture for Sovereign Behavioral Health Data Governance"
**Target:** Blockchain in Healthcare Today (BHTY), 10,000 word cap

---

## A. EXECUTIVE SUMMARY

- **The paper has a genuine architectural contribution** -- unifying authentication, consent, authorization, and attribution into a single EIP-191 signature event is novel for behavioral health and well-articulated -- but it is not yet a research paper. It reads as a systems whitepaper without evaluation, comparative analysis, or threat model.
- **The manuscript is at ~3,700 of 10,000 words**, leaving ample room (~6,300 words) to add the evaluation section, expanded literature review, regulatory positioning, figures, and threat model that all six agents identified as missing.
- **Multiple factual errors must be corrected before submission.** The SovereignSession "co-signed" claim is verifiably false from contract source code (flagged by Smart Contract, Security, and Testing/QA agents). The PractitionerAchievement/ParticipantAchievement split does not match the canonical single SovereignAchievement contract (flagged by Smart Contract and Audit agents). The "ConsentChain" citation actually points to the ADvoCATE paper.
- **The absence of any HIPAA, 42 CFR Part 2, or regulatory positioning statement is the single largest compliance gap.** The paper operates in "behavioral health" but never states whether it is inside or outside HIPAA scope -- a conspicuous omission that health informatics reviewers will treat as either ignorance or evasion.
- **The EIP-191 vs. EIP-712 design choice is unaddressed**, and this will be the first technical question any blockchain-literate reviewer asks. The paper must either justify EIP-191 or acknowledge EIP-712 as the stronger alternative.

---

## B. CRITICAL GAPS

### B1. No Evaluation / Results Section
**Flagged by:** Research Agent (C1), Testing/QA Agent (C5/I1), Smart Contract Agent (3.6), Audit Agent (moderate risk)
**Why it matters:** The paper describes a system but measures nothing. No comparative table against MedRec/ConsentChain/Ancile, no gas costs, no latency benchmarks, no transaction counts, no user study. BHTY reviewers expect at minimum a comparative properties table, deployment metrics, and performance measurements. Without these, the paper is vulnerable to immediate desk rejection as "not a research paper."

### B2. SovereignSession "Co-Signed" Claim is Factually Incorrect
**Flagged by:** Smart Contract Agent (3.3, CRITICAL), Security Agent (G9), Testing/QA Agent (I5)
**Why it matters:** The paper states "both the participant and Sovereign Guide co-sign a session attestation on-chain." The actual contract shows only the guide calls `startSession()`, passing the participant address as a parameter. There is no co-signature mechanism. Any reviewer who reads the contract source will catch this, and it will severely damage credibility.

### B3. EIP-191 vs. EIP-712 Tradeoff Entirely Unaddressed
**Flagged by:** Security Agent (G1, CRITICAL), Smart Contract Agent (risk #2)
**Why it matters:** EIP-712 provides domain separation, structured typed data, and on-chain verifiability -- it was designed specifically for application-layer consent signing. Using EIP-191 `personal_sign` without discussing EIP-712 is a glaring omission for a paper whose core thesis is cryptographic consent. A reviewer will ask why the weaker standard was chosen.

### B4. No HIPAA / Regulatory Positioning Statement
**Flagged by:** Compliance Agent (GAP-C1, CRITICAL), Research Agent (I3)
**Why it matters:** The paper uses "behavioral health" in the title and throughout but never mentions HIPAA, 42 CFR Part 2, or any regulatory framework. The paper must NOT claim HIPAA compliance (which would imply covered-entity status) but MUST affirmatively state the system operates outside HIPAA scope by architectural design (no PHI, not a covered entity, no BA relationships).

### B5. No Code Listings, Missing Figure 1, Consent Message Withheld
**Flagged by:** Testing/QA Agent (C1, C2, C3, CRITICAL), Research Agent (I2)
**Why it matters:** The paper describes nine smart contracts but contains zero lines of Solidity. "Figure 1" is referenced but does not exist. The consent message -- the artifact that makes the signature "informed" -- is withheld as proprietary, creating a logical contradiction with the paper's central thesis. These collectively make the paper unreproducible.

### B6. Literature Review is Thin (12 References)
**Flagged by:** Research Agent (C3), Audit Agent (moderate risk)
**Why it matters:** Only 12 references, many of which are technical standards rather than peer-reviewed research. The related work section does not engage with the substantial blockchain-in-healthcare literature from 2020-2025. The reference list needs to approximately double.

### B7. Contract Name/Count Discrepancy (SovereignAchievement)
**Flagged by:** Smart Contract Agent (3.1, CRITICAL), Audit Agent (3.1, CRITICAL)
**Why it matters:** The paper lists "PractitionerAchievement" and "ParticipantAchievement" as two separate contracts. The canonical record shows a single contract called SovereignAchievement. This factual mismatch will be caught by any reviewer who checks on-chain records.

---

## C. CONSOLIDATED IMPORTANT GAPS

### Abstract
- Too verbose: "five-platform decentralized infrastructure ecosystem with behavioral health as the applied domain" should be simplified to "a decentralized health data infrastructure" (Research Agent).
- Needs one sentence quantifying deployment metrics (Research Agent).
- Should include regulatory positioning clause: system is outside HIPAA scope by design (Compliance Agent).

### Introduction
- Consider adding: "Regulatory posture is architectural, not administrative -- the system is designed to hold no PHI, rather than designed to protect PHI" (Compliance Agent).

### Background / Related Work
- Section 2.3: Expand substantially with blockchain-in-healthcare literature from 2020-2025 (Research Agent).
- Section 2.3: "ConsentChain [9]" is actually the ADvoCATE platform -- reference mislabel (Audit Agent).
- Section 2.4: "No existing system, to our knowledge" is too strong -- qualify with "Few existing systems unify all four functions..." (Research Agent).
- Add EIP-712 discussion subsection explaining why EIP-191 was chosen (Security Agent, Smart Contract Agent).

### Architecture (Section 3)
- Section 3.1: Define "Sovereign Guide" on first use with parenthetical explanation (Research Agent).
- Section 3.1: HypnoNeuro description is grammatically broken -- "A collection of a suite of..." (Research Agent).
- Section 3.1: NeuroBalance needs "general wellness" qualifier, not medical device (Compliance Agent).
- Section 3.1: Six-layer thesis is introduced but never elaborated -- either map it or remove it (Testing/QA Agent, Research Agent).
- Section 3.2: Missing Figure 1 -- must add authentication flow diagram (Testing/QA Agent, Research Agent).
- Section 3.2: Nonce lifecycle underspecified -- need TTL, single-use enforcement, address binding, storage mechanism (Security Agent).
- Section 3.3: HS256 vs. RS256 tradeoff should be discussed -- symmetric key means any compromised middleware can forge tokens (Security Agent, Smart Contract Agent).
- Section 3.3: JWT cookie flags must be specified: HttpOnly, Secure, SameSite (Security Agent).
- Section 3.3 vs. 4.4: Header naming inconsistency between generic and specific references (Testing/QA Agent).
- Section 3.4: "Level 2 -- Provider Access" should be "Sovereign Guide Access" (Audit Agent).
- Section 3.5: Silent refresh endpoint abuse not addressed -- stolen JWT could refresh indefinitely (Security Agent).
- Need new Section 3.6: Formal threat model with adversary classes, trust assumptions, attack surfaces (Security Agent).

### Implementation (Section 4)
- Section 4.1: Contract table must be reconciled -- SovereignAchievement is one contract, not two (Smart Contract Agent, Audit Agent).
- Section 4.1: All nine contract addresses should be listed for verifiability (Audit Agent, Testing/QA Agent).
- Section 4.1: Add gas cost estimates per transaction type (Research Agent, Smart Contract Agent).
- Section 4.1: SovereignSession address (0xbeb13A360C6F0C77Ea3af3650Ab9762a1B9965A1) not in canonical list -- verify (Audit Agent).
- Section 4.1: Add abbreviated Solidity source for at least AlchemistForge (Testing/QA Agent).
- Section 4.3: IPFS encryption and wallet-gated decryption scheme unspecified (Testing/QA Agent, Security Agent).
- Section 4.4: 1000 req/min/IP rate limit is too permissive, especially for nonce endpoint (Security Agent).

### Consent Design (Section 5)
- Section 5.1: "Revocable" claim overclaims -- wallet disconnection is client-side only and does not invalidate a JWT or delete PostgreSQL data. Must reframe as "revocation of future access authorization" (Research Agent, Smart Contract Agent, Security Agent).
- Section 5.2: Consent message withheld as proprietary undermines reproducibility. Provide redacted template with structure preserved, or remove claim that readers can evaluate informed-consent properties (Testing/QA Agent).
- Section 5.2: Strengthen disclaimer language to include "not a covered entity under HIPAA" (Compliance Agent).

### Case Study (Section 6)
- Section 6.3: Rewrite SovereignSession description -- remove false "co-signed" claim, replace with "Guide-initiated, either party can end" (Smart Contract Agent, Security Agent, Testing/QA Agent).
- Section 6.3: "eliminates the need for centralized scheduling systems" should be softened -- the contract replaces attestation authority, not scheduling (Smart Contract Agent).
- Section 6.4: Deployment results are vague -- add concrete numbers: transaction count, unique addresses, gas consumed, date range (Research Agent, Testing/QA Agent).

### Discussion (Section 7)
- Add new subsection: Regulatory Positioning (HIPAA scope, 42 CFR Part 2 exclusion, FDA general wellness for NeuroBalance, state-level acknowledgment) (Compliance Agent).
- Add key management discussion: key loss, recovery, hardware vs. software wallets (Research Agent, Security Agent).
- Section 7.1: Sepolia is PoA/PoS, not PoW -- reorganization is unlikely but full reset possible (Smart Contract Agent).
- Section 7.1: "3-5 seconds" latency claim needs measurement methodology (Testing/QA Agent).
- Section 7.2: Replace "practitioner" with "Sovereign Guide" throughout (Audit Agent).
- Section 7.3.3: XRPL future work item may confuse reviewers about paper's focus (Research Agent).
- Address "zero PII" / pseudonymous distinction -- Ethereum addresses can be deanonymized (Research Agent, Smart Contract Agent).
- Acknowledge deployer wallet as single owner of all owner-controlled contracts -- centralization risk (Smart Contract Agent).

### References
- Current reference list (12 items) needs to approximately double (see Section D below).

---

## D. REFERENCE-PULL LIST

Deduplicated across all agents. Organized by category.

### Blockchain in Healthcare (Core Literature)

| # | Citation | DOI / Link | Flagged By |
|---|----------|------------|------------|
| 1 | Linn, L.A. & Koo, M.B. (2016). Blockchain for health data and its potential use in health IT and healthcare related research. ONC/NIST Workshop. | -- | Research |
| 2 | Dagher, G.G. et al. (2018). Ancile: Privacy-preserving framework for access control and interoperability of EHR using blockchain. *Sustainable Cities and Society*, 39, 283-297. | 10.1016/j.scs.2018.02.014 | Research |
| 3 | Esposito, C. et al. (2018). Blockchain: A panacea for healthcare cloud-based data security and privacy? *IEEE Cloud Computing*, 5(1), 31-37. | 10.1109/MCC.2018.011791712 | Research |
| 4 | Kuo, T.-T., Kim, H.-E., & Ohno-Machado, L. (2017). Blockchain distributed ledger technologies for biomedical and health care applications. *JAMIA*, 24(6), 1211-1220. | 10.1093/jamia/ocx068 | Research |
| 5 | Mayer, A.H., da Costa, C.A., & Righi, R.R. (2020). Electronic health records in a blockchain: A systematic review. *Health Informatics Journal*, 26(2), 1273-1288. | 10.1177/1460458219866350 | Research |

### Consent, Identity, and Privacy

| # | Citation | DOI / Link | Flagged By |
|---|----------|------------|------------|
| 6 | Benchoufi, M. & Ravaud, P. (2017). Blockchain technology for improving clinical research quality. *Trials*, 18(1), 340. | 10.1186/s13063-017-2035-z | Research |
| 7 | Zyskind, G., Nathan, O., & Pentland, A. (2015). Decentralizing privacy: Using blockchain to protect personal data. *IEEE S&P Workshops*, 180-184. | 10.1109/SPW.2015.27 | Research |
| 8 | Roehrs, A. et al. (2017). OmniPHR: A distributed architecture model to integrate personal health records. *JBHI*, 21(6), 1561-1567. | 10.1109/JBHI.2017.2666080 | Research |
| 9 | Weyl, E.G., Ohlhaver, P., & Buterin, V. (2022). Decentralized Society: Finding Web3's Soul. | -- | Audit, Testing/QA |

### Ethereum Standards (EIPs/ERCs)

| # | Citation | DOI / Link | Flagged By |
|---|----------|------------|------------|
| 10 | EIP-712: Typed structured data hashing and signing. | https://eips.ethereum.org/EIPS/eip-712 | Security, Smart Contract |
| 11 | EIP-1271: Smart contract signature verification. | https://eips.ethereum.org/EIPS/eip-1271 | Smart Contract |
| 12 | ERC-5192: Minimal soulbound interface. | https://eips.ethereum.org/EIPS/eip-5192 | Smart Contract |
| 13 | ERC-4337: Account abstraction. | https://eips.ethereum.org/EIPS/eip-4337 | Smart Contract |
| 14 | ERC-20, ERC-721, ERC-1155 formal EIP references (currently uncited). | -- | Testing/QA |

### Security and Cryptographic Standards

| # | Citation | DOI / Link | Flagged By |
|---|----------|------------|------------|
| 15 | IETF RFC 7519: JSON Web Token (JWT). | -- | Testing/QA |
| 16 | IETF RFC 8725: JWT Best Current Practices (Sheffer, Hardt, Jones, 2020). | -- | Security |
| 17 | NIST SP 800-63B: Digital Identity Guidelines, Authentication and Lifecycle Management. | -- | Security, Testing/QA |
| 18 | SEC 1 (Certicom, 2009): Elliptic Curve Cryptography, Section 4.1.6 (public key recovery). | -- | Testing/QA, Audit |
| 19 | Decker, C. & Wattenhofer, R. (2014). Bitcoin transaction malleability and MtGox. *ESORICS*. | -- | Security |
| 20 | Microsoft Security Blog (2022). Web3 ice phishing. | -- | Security |
| 21 | Trail of Bits (2023). Building Secure Smart Contracts. | -- | Security |

### Regulatory and Compliance

| # | Citation | DOI / Link | Flagged By |
|---|----------|------------|------------|
| 22 | 45 CFR 160.103: Definition of PHI, Covered Entity, Business Associate. | -- | Compliance |
| 23 | 45 CFR 164.514: De-identification standard (Safe Harbor, Expert Determination). | -- | Compliance |
| 24 | 42 CFR Part 2: Confidentiality of Substance Use Disorder Patient Records. | -- | Compliance, Research |
| 25 | FDA General Wellness Policy (2016, updated 2019), FDA-2014-N-1039. | -- | Compliance |
| 26 | HHS OCR Guidance on De-identification of PHI (2012, updated 2022). | -- | Compliance |
| 27 | FTC Health Breach Notification Rule, 16 CFR Part 318. | -- | Compliance |
| 28 | HITECH Act, Pub. L. 111-5, Title XIII. | -- | Compliance |
| 29 | Politou, E. et al. (2021). Blockchain mutability: Challenges and proposed solutions. *IEEE TECS*, 21(6), 5765-5782. | 10.1109/TETC.2019.2949510 | Research |
| 30 | SAMHSA National Guidelines for Behavioral Health Crisis Care (2020). | -- | Compliance |

### IPFS and Decentralized Storage

| # | Citation | DOI / Link | Flagged By |
|---|----------|------------|------------|
| 31 | Benet, J. (2014). IPFS - Content Addressed, Versioned, P2P File System. arXiv:1407.3561. | -- | Security, Testing/QA |
| 32 | Steichen, M. et al. (2018). Blockchain-based, decentralized access control for IPFS. *IEEE Blockchain*. | -- | Security |

### Healthcare Data Breach / Threat Landscape

| # | Citation | DOI / Link | Flagged By |
|---|----------|------------|------------|
| 33 | Verizon DBIR Healthcare supplement (annual). | -- | Security |

### Jungian / Behavioral Health Context

| # | Citation | DOI / Link | Flagged By |
|---|----------|------------|------------|
| 34 | Jung, C.G. (or modern secondary source) on shadow integration. | -- | Audit |

### OpenZeppelin

| # | Citation | DOI / Link | Flagged By |
|---|----------|------------|------------|
| 35 | OpenZeppelin Contracts (specific version, likely 4.x). | -- | Smart Contract |

---

## E. PEER-REVIEW DEFENSE STRATEGY

### Attack 1: "Where are the results? This is a product description, not a research paper."
**Sources:** Research Agent (#1, #2), Testing/QA Agent (#1, #4), Smart Contract Agent (#3.6), Audit Agent (moderate risk)
**Anticipated framing:** Reviewer argues the paper has no evaluation section, no metrics, no comparative analysis, and reads as marketing material for FSL rather than a scientific contribution. Brand names (EncryptHealth, HypnoNeuro, AlchemistForge) and the USPTO filing mention reinforce this perception.
**Planned response:**
- Add a full Evaluation section (~1,500-2,000 words) containing: (a) comparative properties table (FSL vs. MedRec vs. ADvoCATE/ConsentChain vs. Ancile vs. at least one other system) across authentication, consent, revocation, and portability dimensions; (b) deployment metrics from Sepolia (transaction counts, unique addresses, gas costs per operation, latency measurements); (c) a semi-formal threat model.
- Foreground the generalizable architectural pattern ("wallet-based consent reference architecture") over the specific product. Reduce brand mentions. Frame platforms as instantiations of the pattern, not the contribution itself.

### Attack 2: "EIP-191 is the wrong standard -- why not EIP-712?"
**Sources:** Security Agent (#Attack 2), Smart Contract Agent (#risk 2)
**Anticipated framing:** Reviewer argues EIP-712 provides domain separation, structured typing, and on-chain verifiability, making it the correct standard for application-layer consent. EIP-191 `personal_sign` is the weaker pattern -- its lack of domain binding creates cross-application replay risk, and the server-side string matching verification is brittle.
**Planned response:**
- Add a dedicated subsection "EIP-191 vs. EIP-712: Design Rationale" (Section 2 or 5).
- Justify EIP-191 on three grounds: (1) broader wallet support for `personal_sign` at time of development; (2) human readability of the full consent text as a legal/ethical requirement (EIP-712 structured data is less readable to non-technical participants); (3) server-side verification is intentional because FSL's consent model does not require on-chain signature verification -- the blockchain records attestations, not proofs.
- Acknowledge EIP-712 as the stronger cryptographic pattern and discuss migration path as future work.

### Attack 3: "The revocability and decentralization claims are overstated."
**Sources:** Research Agent (#3, #6), Smart Contract Agent (#risk 4, #risk 5), Security Agent (#Attack 1, #Attack 3), Compliance Agent (medium risk)
**Anticipated framing:** Reviewer notes that (a) "revocable" is claimed but wallet disconnection is client-side only, JWT remains valid for 15 minutes, and PostgreSQL data persists; (b) the server generates nonces, verifies signatures, issues JWTs, and hosts the database -- if the server is compromised, the attacker controls everything; (c) a single deployer wallet owns all owner-controlled contracts.
**Planned response:**
- Reframe revocability as "revocation of future access authorization" and explicitly acknowledge that past data in PostgreSQL is not deleted by wallet disconnection. Discuss the data lifecycle honestly.
- Reframe decentralization claims: the blockchain provides auditability and tamper-evidence for consent events, not decentralization of the entire system. The server is trusted; the contribution is that the consent record is independently verifiable on-chain.
- Discuss the deployer-wallet centralization explicitly and present the planned migration to multisig/DAO governance.

### Attack 4: "Behavioral health paper with no regulatory analysis."
**Sources:** Compliance Agent (GAP-C1, C2, C3, all CRITICAL), Research Agent (I3), Security Agent (#Attack 5)
**Anticipated framing:** Reviewer asks: Where is the HIPAA analysis? What about 42 CFR Part 2? Is this clinical or not? If the Sovereign Guide is a licensed practitioner, state telehealth laws apply. If NeuroBalance processes biometric data, FDA SaMD regulations may apply.
**Planned response:**
- Add a new "Regulatory Positioning" subsection in Discussion.
- Explicitly state: FSL operates outside HIPAA regulatory scope by architectural design (no PHI per 45 CFR 160.103, not a covered entity, no BA relationships).
- Address 42 CFR Part 2 exclusion (no SUD patient records, no federally assisted program).
- Position NeuroBalance as general wellness under FDA-2014-N-1039.
- Define "behavioral health" in FSL's context as wellness/educational engagement, not clinical treatment.
- Acknowledge state-level and GDPR analysis as out of scope.

### Attack 5: "The paper is unreproducible -- no code, no figures, proprietary consent message."
**Sources:** Testing/QA Agent (#1, #2, #5), Research Agent (I2, I5)
**Anticipated framing:** Reviewer notes zero lines of Solidity in a paper about smart contracts, a referenced Figure 1 that does not exist, and a consent message described as "proprietary" -- meaning the central artifact of the paper's thesis cannot be inspected.
**Planned response:**
- Add Figure 1 (authentication/consent flow sequence diagram) and Figure 2 (architecture topology diagram).
- Add abbreviated Solidity listings for AlchemistForge (`alchemize()` function signature, event definitions) and SovereignSession.
- Provide a redacted but structurally complete consent message template -- preserve the structure (greeting, platform identification, disclaimers, consent scope, nonce, timestamp) while redacting any truly proprietary phrasing. This resolves the reproducibility concern without full IP disclosure, but this is a decision for Dr. Meg (see Section G).

---

## F. REVISION PRIORITY ORDER

### Week 1: May 11-17 -- Factual Corrections and Structural Setup
- Fix SovereignSession "co-signed" claim throughout (B2)
- Fix SovereignAchievement contract table -- merge into single contract, reconcile count (B7)
- Fix "ConsentChain" / ADvoCATE reference mislabel
- Fix all lexicon violations: "provider" -> "Sovereign Guide", "practitioner" -> "Sovereign Guide" (Audit Edit 3, 4, 5)
- Add Figure 1 placeholder and draft authentication flow sequence diagram (B5)
- Verify SovereignSession address on Sepolia Etherscan and update canonical records

### Week 2: May 18-24 -- Evaluation Section (Part 1)
- Build comparative properties table: FSL vs. MedRec vs. ADvoCATE vs. Ancile vs. 1-2 others (B1)
- Collect and tabulate Sepolia deployment metrics: transaction counts, unique addresses, gas per operation, date range (B1)
- Draft the evaluation section framework (~1,500 words target)

### Week 3: May 25-31 -- Literature Review Expansion
- Add 8-12 references from the pull list in Section D (B6)
- Expand Section 2.3 with blockchain-in-healthcare literature (Dagher, Esposito, Kuo, Mayer, Benchoufi, Zyskind)
- Add soulbound token citation (Weyl/Ohlhaver/Buterin 2022)
- Add regulatory references (45 CFR 160.103, 42 CFR Part 2, FDA wellness guidance)
- Add EIP-712 citation and JWT RFC references

### Week 4: June 1-7 -- Security and Technical Depth
- Write EIP-191 vs. EIP-712 design rationale subsection (B3)
- Specify nonce lifecycle: TTL, single-use, address binding, storage (Security G2)
- Specify JWT cookie flags (HttpOnly, Secure, SameSite) and discuss HS256 vs. RS256 tradeoff (Security G3)
- Add key management discussion (key loss, recovery, hardware vs. software wallets)
- Add abbreviated Solidity listings for AlchemistForge and SovereignSession (B5)
- Revise "revocable" claim in Section 5.1 -- reframe as future access revocation (B3 defense)

### Week 5: June 8-14 -- Regulatory Positioning
- Write new "Regulatory Positioning" subsection in Discussion (B4)
- HIPAA scope exclusion statement
- 42 CFR Part 2 exclusion rationale
- FDA general wellness positioning for NeuroBalance
- State-level and GDPR acknowledgment
- Define "behavioral health" boundary (wellness/educational vs. clinical)
- Clarify Sovereign Guide licensure status

### Week 6: June 15-21 -- Consent Design and Reproducibility
- Resolve consent message disclosure level (requires Dr. Meg decision -- see Section G)
- Add redacted consent message template or structural description
- Reconcile header naming between Section 3.3 and 4.4
- Elaborate or remove six-layer thesis reference
- Add all nine contract addresses to Table 1
- Specify IPFS encryption and wallet-gated decryption scheme

### Week 7: June 22-28 -- Figures, Diagrams, and Polish
- Finalize Figure 1: authentication/consent flow sequence diagram
- Add Figure 2: system architecture topology diagram
- Add Figure 3 (optional): comparative properties table as a figure
- Add threat model diagram showing trust boundaries
- Review and tighten abstract (add metric, add regulatory clause, shorten verbose phrases)
- Strengthen conclusion with generalizable contribution statement

### Week 8: June 29 - July 5 -- Full-Paper Review Pass
- Word count check against 10,000-word cap
- Internal consistency audit (all cross-references, all figure references, all address references)
- IP-exposure review: remove specific vendor names (Cloudflare, Vercel) per Audit Agent recommendation, or decide to keep (Dr. Meg decision)
- Verify all DOIs and reference formatting for BHTY style
- Read aloud for flow and readability

### Week 9: July 6-12 -- Final Polish and Submission Prep
- Address any remaining items from Dr. Meg's decision list (Section G)
- Final proofread
- Format for BHTY submission requirements
- Prepare cover letter
- Target submission: July 15 or earlier

---

## G. REMAINING DECISIONS FOR DR. MEG

The following items require Dr. Meg's input before revisions can proceed. Each involves a tradeoff that cannot be resolved by the agents alone.

### G1. Consent Message Disclosure Level
The Testing/QA Agent flagged that withholding the consent message as proprietary undermines the paper's central thesis (the reader cannot evaluate whether the consent is truly "informed"). Options:
- **(a)** Publish the full consent message template in the paper (maximum reproducibility, maximum IP exposure).
- **(b)** Publish a redacted/structural version preserving the format but genericizing proprietary phrasing (compromise).
- **(c)** Keep it proprietary and acknowledge this as a limitation (minimum IP exposure, maximum reviewer objection risk).
**Recommendation from agents:** Option (b).

### G2. Code Listings: Include or Omit?
The Testing/QA Agent argues that zero lines of Solidity in a smart-contract paper is a hard gap. The Audit Agent notes that abstracted function names are good IP protection. Options:
- **(a)** Include full AlchemistForge and SovereignSession source in the paper.
- **(b)** Include abbreviated listings (function signatures, event definitions, key modifiers only).
- **(c)** Omit code and cite the public GitHub repository.
**Recommendation from agents:** Option (b), with full source available in the cited repository.

### G3. NeuroBalance: Include or Remove?
NeuroBalance is described as a "scaffolded shell" (Smart Contract Agent) with minimal implementation. The Compliance Agent flags FDA SaMD risk if biometric claims are made. Including it adds complexity and regulatory surface area without adding substance. Options:
- **(a)** Keep NeuroBalance in the five-platform description with "general wellness" qualifier and FDA exclusion language.
- **(b)** Remove NeuroBalance, reduce to four-platform ecosystem, simplify regulatory exposure.
- **(c)** Keep mention but add explicit caveat that it is pre-implementation / scaffolded.
**Recommendation from agents:** Option (c) if the five-platform framing is important; option (b) if simplicity is preferred.

### G4. IP-Exposure Tradeoffs: Vendor Names and Infrastructure Details
The Audit Agent recommends removing specific vendor names (Cloudflare tunnel, Vercel, VPS), header names (`x-wallet-address`, `x-signature`, `x-message`), and the rate-limiting threshold (1000 req/min). These details could assist targeted attacks but also add credibility and reproducibility. Options:
- **(a)** Keep all infrastructure details for transparency and reproducibility.
- **(b)** Genericize: "TLS-terminating reverse proxy," "static hosting platform," "custom authentication headers."
- **(c)** Hybrid: keep patterns, remove specific thresholds and vendor names.
**Recommendation from agents:** Option (c).

### G5. XRPL Future Work: Keep or Remove?
The Research Agent flagged that the XRPL cross-chain future work item (Section 7.3.3) may confuse reviewers about the paper's Ethereum focus. Options:
- **(a)** Keep -- it demonstrates cross-chain vision.
- **(b)** Remove -- it dilutes focus and invites questions the paper cannot answer.
- **(c)** Reduce to a single sentence within a broader "future work" list.
**Recommendation from agents:** Option (c).

### G6. Deployer Wallet Disclosure
The deployer wallet (`0xf22cbF25deEeA36FFF828BAf73CCb049345eF248`) owns all owner-controlled contracts. The Smart Contract Agent flags this as centralization risk. The Audit Agent notes it is not currently disclosed in the paper. Options:
- **(a)** Disclose deployer address for full transparency and verifiability.
- **(b)** Omit for security but acknowledge single-deployer centralization as a limitation.
**Recommendation from agents:** Option (a), as the address is already publicly discoverable on-chain.

### G7. "Behavioral Health" Terminology Scope
The Compliance Agent flags that "behavioral health" is a regulated clinical domain, but FSL operates as wellness/educational. Using clinical terminology in the title invites clinical scrutiny. Options:
- **(a)** Keep "Behavioral Health" in title -- it accurately describes the domain and is the BHTY audience.
- **(b)** Qualify throughout: "behavioral health wellness" or "behavioral wellness."
- **(c)** Keep in title but add early definition distinguishing FSL's wellness scope from clinical behavioral health.
**Recommendation from agents:** Option (c) -- keep for BHTY audience alignment but define the boundary clearly in the introduction.

### G8. Co-Author or External Reviewer
The Research Agent and Testing/QA Agent both flag single-author conflict of interest as a peer-review risk. Options:
- **(a)** Add a co-author (e.g., an independent technical reviewer or academic collaborator).
- **(b)** Add an acknowledgment section crediting external reviewers who validated the architecture.
- **(c)** Proceed single-author with strong COI disclosure.
**Decision needed:** Whether to pursue a co-author or external validation before submission.

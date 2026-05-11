# Audit Review: BHTY Paper Draft

**Reviewer:** Audit Agent (automated factual-accuracy review)
**Date:** 2026-05-10
**Paper:** "EIP-191 Consent Architecture for Sovereign Behavioral Health Data Governance"
**Scope:** Factual accuracy, lexicon compliance, IP-exposure risk, peer-review readiness

---

## 1. SUMMARY

The paper presents FSL's wallet-based consent architecture for behavioral health, claiming five platforms, nine smart contracts, and a unified EIP-191 authentication flow. The writing is technically competent and the architecture is well-described. However, the audit found: one confirmed contract-name discrepancy against canonical records, one unverified contract address (SovereignSession), multiple FSL lexicon violations ("practitioner", "provider"), a reference mislabel, and moderate IP-exposure concerns around middleware and API implementation details.

---

## 2. STRENGTHS

- **AlchemistForge address is correct.** The paper lists `0xE092336F8f5082e57CcBb341A110C20ad186A324`, which matches the canonical record exactly.
- **Platform count is accurate.** Five platforms are claimed and five are described (EncryptHealth, HypnoNeuro, SovereignLedger, AlchemistForge, NeuroBalance).
- **Contract count is internally consistent.** Nine contracts are claimed and nine are listed in Table 1.
- **Lexicon is mostly compliant.** The paper uses "Participant" (not "patient"), "session" (not "treatment"), and "Sovereign Guide" in most places.
- **IP protection is generally good.** Section 5.2 explicitly states "The exact message structure is proprietary to the FSL implementation" and Section 6.1 abstracts function names rather than reproducing full Solidity source.

---

## 3. GAPS

### 3.1 Contract Name Discrepancy: PractitionerAchievement vs. SovereignAchievement

The canonical record lists a single contract called **SovereignAchievement** at `0xC3F11d2F1F12bB96b9DCF7e8f85e9704D2869B8D`. The paper instead lists two separate contracts: "PractitionerAchievement" and "ParticipantAchievement" (Table 1, lines 156-157). This raises two problems:

1. **Factual mismatch.** Neither "PractitionerAchievement" nor "ParticipantAchievement" appears in the canonical contract list. The canonical name is "SovereignAchievement."
2. **Count impact.** If the canonical record shows one contract (SovereignAchievement) rather than two (PractitionerAchievement + ParticipantAchievement), the total contract count may be 8, not 9. Alternatively, the paper may be describing a newer deployment that split the contract, but the canonical list has not been updated. This must be reconciled.

### 3.2 Unverified Contract Address: SovereignSession

The paper lists SovereignSession at `0xbeb13A360C6F0C77Ea3af3650Ab9762a1B9965A1` (lines 158, 252). This address does not appear in the canonical contract list provided for this audit. The address must be verified on Sepolia Etherscan and added to the canonical record, or the paper must be corrected.

### 3.3 Missing Contract Addresses

The paper only provides explicit addresses for AlchemistForge and SovereignSession. The remaining seven contracts (HNT, EHT, MindMasteryNFT, SovereignLedger, BenevolenceFund, PractitionerAchievement, ParticipantAchievement) have no addresses listed. For reproducibility and verifiability, all addresses should be included or a canonical reference should be cited.

### 3.4 Deployer Wallet and XRPL Address Not Referenced

The canonical deployer wallet (`0xf22cbF25deEeA36FFF828BAf73CCb049345eF248`) and XRPL mainnet address (`rwR3etLJVxtQXYs2d9jgBQxzHBivtCMdPd`) are not mentioned in the paper. The XRPL address appears only in future-work context (Section 7.3). Consider whether the deployer wallet should be cited for reproducibility, or whether omission is intentional for security.

### 3.5 Reference Mislabel: "ConsentChain" vs. ADvoCATE

Section 2.3 (line 52) refers to "ConsentChain [9]" as a blockchain consent management platform. However, reference [9] is:

> Rantos, K., et al. (2019). ADvoCATE: A consent management platform for personal data processing in the IoT using blockchain technology.

This is the ADvoCATE platform, not "ConsentChain." Either the citation is wrong (a different paper was intended) or the in-text name is wrong.

---

## 4. SPECIFIC EDITS

### Edit 1 -- CRITICAL: Rename PractitionerAchievement (Lexicon + Factual)

**Location:** Table 1 (line 156)
**Current:** `PractitionerAchievement | ERC-1155 soulbound guide credentials | Owner-minted`
**Issue:** "Practitioner" violates FSL lexicon. Canonical name is SovereignAchievement.
**Proposed:** Reconcile with canonical record. If the contract is truly a single SovereignAchievement contract with both guide and participant credential capabilities, update the table accordingly and adjust the contract count. If the split into two contracts is accurate, update the canonical record and use names that comply with the lexicon (e.g., "SovereignGuideAchievement" and "SovereignParticipantAchievement" or simply "SovereignAchievement" with dual roles).

### Edit 2 -- CRITICAL: Fix "ConsentChain" reference

**Location:** Section 2.3 (line 52)
**Current:** "ConsentChain [9], which provides granular consent management through blockchain transactions"
**Proposed:** Either change the in-text name to "ADvoCATE" to match reference [9], or replace reference [9] with the actual ConsentChain paper if one exists.

### Edit 3 -- MODERATE: Fix "Provider Access" heading

**Location:** Section 3.4 (line 132)
**Current:** "Level 2 -- Provider Access."
**Proposed:** "Level 2 -- Sovereign Guide Access."

### Edit 4 -- MODERATE: Fix "provider routes" in middleware section

**Location:** Section 3.3 (line 126)
**Current:** "Enforces role-based access (guide role required for provider routes)"
**Proposed:** "Enforces role-based access (guide role required for Sovereign Guide routes)"

### Edit 5 -- MODERATE: Fix "practitioner" in limitations

**Location:** Section 7.2.1 (line 276)
**Current:** "Single practitioner deployment." and "Multi-practitioner consent dynamics"
**Proposed:** "Single Sovereign Guide deployment." and "Multi-guide consent dynamics"

### Edit 6 -- MINOR: Verify SovereignSession address

**Location:** Lines 158 and 252
**Action:** Verify `0xbeb13A360C6F0C77Ea3af3650Ab9762a1B9965A1` on Sepolia Etherscan. If valid, add to canonical contract list. If not, remove or correct.

### Edit 7 -- MINOR: Add all contract addresses or cite canonical reference

**Location:** Table 1 (Section 4.1)
**Action:** Either add addresses for all nine contracts in the table (recommended for an academic paper making verifiability claims), or add a footnote citing a canonical deployment manifest.

---

## 5. REFERENCES NEEDED

1. **EIP-191 formal specification.** Reference [7] is correct but should include the specific version/commit hash for reproducibility.
2. **EIP-6963.** Referenced in Section 3.2 (line 90) and cited as [10]. Verify the publication year -- EIP-6963 was proposed in 2023, which matches.
3. **ConsentChain / ADvoCATE.** As noted in Edit 2, the reference and in-text name are misaligned. If "ConsentChain" is a real system the authors intended to cite, that reference is missing.
4. **Jungian shadow integration.** Section 6.1 references "Jungian shadow integration" as a behavioral health modality. A citation to the psychological literature supporting this approach would strengthen the clinical framing (e.g., Jung, C.G., Aion, or a modern secondary source).
5. **ECDSA signature recovery.** The paper references ECDSA recovery (Section 3.2, Step 6) without citing the underlying cryptographic standard. Consider citing SEC 1 (Certicom, 2009) or the relevant Ethereum Yellow Paper section.
6. **Soulbound tokens.** The paper uses the term "soulbound" (Table 1, lines 156-157) without citing Weyl, Ohlhaver, and Buterin (2022), "Decentralized Society: Finding Web3's Soul," which introduced the concept.

---

## 6. PEER-REVIEW RISK

### HIGH RISK

- **Contract name/count discrepancy.** A reviewer cross-referencing on-chain records will find no contract named "PractitionerAchievement" or "ParticipantAchievement" in the canonical FSL deployment. This undermines the paper's verifiability claims. Must be resolved before submission.
- **Reference mislabel.** Citing "ConsentChain" but linking to the ADvoCATE paper will be caught by any reviewer familiar with either system. This is a credibility issue.

### MODERATE RISK

- **Lexicon inconsistency.** The paper uses "Sovereign Guide" throughout most of the text but slips into "provider" and "practitioner" in several places. A reviewer may question whether the terminology is well-defined or ad hoc.
- **No quantitative results.** The paper describes architecture but presents no performance benchmarks, gas cost analysis, user study data, or comparative evaluation. BHTY reviewers may expect at least gas cost tables for the smart contract operations.

### LOW RISK

- **Testnet-only deployment.** The paper is transparent about this limitation (Section 7.1), but reviewers may question the practical significance of a system with no mainnet deployment and no real users.
- **Single-author, conflict of interest.** The paper discloses that the author is the founder, sole architect, and lead engineer. While disclosed, this may invite scrutiny about evaluation objectivity.

### IP-EXPOSURE ASSESSMENT

The paper is generally well-guarded on proprietary details:

- **SAFE:** Consent message structure is described as proprietary without revealing exact text. AlchemistForge function names are abstracted. Database schema is not disclosed. API endpoint paths are not revealed.
- **BORDERLINE:** Section 3.3 describes the middleware verification flow in six specific steps including header names (`x-wallet-address`, `x-signature`, `x-message`) and the JWT algorithm (HS256). Section 4.4 reveals the use of Cloudflare tunnels, rate limiting thresholds (1000 req/min), and hosting providers (Vercel, VPS). These details could assist targeted attacks.
- **RECOMMENDATION:** Replace specific header names with generic descriptions (e.g., "custom headers containing the wallet address, signature, and message"). Remove the specific rate limit number. Remove "Cloudflare tunnel" and "Vercel" references -- describe the pattern ("TLS-terminating reverse proxy", "static hosting platform") not the vendor.

---

*Review generated by Audit Agent on 2026-05-10. All findings should be verified against on-chain records before acting on recommendations.*

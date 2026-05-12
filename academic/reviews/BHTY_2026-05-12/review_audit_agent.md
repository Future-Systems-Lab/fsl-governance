# Audit Review: BHTY_PAPER_v2.md

**Reviewer:** Audit Agent (automated factual-accuracy review)
**Date:** 2026-05-12
**Document:** `/Users/futuresystemslab/fsl-governance/academic/BHTY_PAPER_v2.md`

---

## 1. SUMMARY

The paper presents FSL's EIP-191 consent-as-authentication architecture for behavioral health data governance across five interconnected platforms. It describes a zero-PHI data model, nine Sepolia-deployed smart contracts, a three-layer revocation model, and a comparative evaluation against four existing systems. The v2 manuscript correctly fixes the co-signing claim from v1 and uses FSL lexicon consistently for FSL-specific roles. Two internal numerical inconsistencies and one reference mismatch require correction before submission.

---

## 2. STRENGTHS

- **Contract addresses verified.** All five canonical contract addresses match exactly:
  - HNT: `0x1ae1e10929f008d1f9883ce574a318abd86084e2` -- MATCH
  - SovereignLedger v2: `0x4afA577fA914068451e0Aa97b61F23960f02aCc4` -- MATCH
  - BenevolenceFund v2: `0x96E8006a1fBB693B55fFf6254B8BF19EC605251B` -- MATCH
  - AlchemistForge: `0xE092336F8f5082e57CcBb341A110C20ad186A324` -- MATCH
  - SovereignAchievement: `0xC3F11d2F1F12bB96b9DCF7e8f85e9704D2869B8D` -- MATCH

- **Co-signing claim FIXED (confirmed).** Section 6.1 now reads: "The participant does not co-sign on-chain; their consent is established through the platform-level EIP-191 authentication and the explicit session booking consent recorded in the off-chain database." This corrects the false co-signing claim from v1. No residual instances of the old claim found.

- **FSL lexicon compliance.** The paper uses "Participant" and "Sovereign Guide" consistently for FSL actors. Occurrences of "patient," "provider," and "practitioner" appear only in: (a) descriptions of external systems in the literature review and comparison table, (b) statutory language citations (42 CFR Part 2, HIPAA definitions), and (c) reference titles. No FSL-internal lexicon violations detected. No instances of "ClaimChain" found; "SovereignLedger" used throughout.

- **IP exposure -- CLEAR.** Code listings show generalized patterns only. Listing 1 is a standard EIP-191 verification pattern using ethers.js. Listing 2 shows Solidity event signatures (public on-chain by nature). No proprietary implementation details, internal API routes, database schemas, or trade secrets are exposed.

- **Revocation semantics.** The three-layer revocation model (JWT expiration, server-side grant deletion, re-authentication enforcement) is clearly described and properly caveated. The paper honestly acknowledges that wallet disconnection does not invalidate JWTs.

- **Regulatory positioning.** The paper carefully distinguishes "outside HIPAA scope" from "HIPAA compliant" and explicitly acknowledges FTC Health Breach Notification Rule applicability.

---

## 3. GAPS

### 3.1 Contract Count Inconsistency (CRITICAL)

Table 1 (Section 7.1) correctly lists **nine** contracts. However:
- **Section 8 (line 374):** States "Eight verified contracts on Sepolia" -- should be NINE.
- **Comparison Table (Section 9.1, line 398):** States "Testnet deployment, 8 contracts, single-guide" -- should be NINE.

The Abstract (line 19) correctly states "nine smart contracts." The body contradicts itself.

### 3.2 Reference Number Mismatch for MindMasteryNFT (ERROR)

In Table 1, MindMasteryNFT is described as "ERC-1155 [32] achievement credentials." However, reference [32] is **ERC-721** (the NFT standard by Entriken et al., 2018). Reference [33] is **ERC-1155** (the Multi Token Standard by Radomski et al., 2018). If MindMasteryNFT is an ERC-1155 contract, the citation should be [33], not [32]. If it is actually ERC-721, the description should say "ERC-721."

### 3.3 Deployer Wallet Not Disclosed

The paper notes "All owner-controlled contracts are currently deployed from a single deployer wallet" (Section 7.1) but does not disclose the deployer address. For full reproducibility and verifiability on a public testnet, consider disclosing the deployer address: `0xf22cbF25deEeA36FFF828BAf73CCb049345eF248`.

### 3.4 Patent Filing Date

The header states "Patent: U.S. Provisional No. 64/063,037 (filed 11 May 2026)." Today's date is 2026-05-10. If the patent has not yet been filed, the manuscript should not state it as filed. Verify the filing date is accurate before submission.

### 3.5 No Formal Performance Metrics

Section 8 (Deployment Results) provides no quantitative data: no transaction counts, no latency measurements, no gas costs. While acknowledged as a limitation, reviewers will likely request at least basic deployment metrics.

---

## 4. SPECIFIC EDITS

### Edit 1 -- Fix contract count in Section 8 (REQUIRED)

**Location:** Section 8, line 374
**Current:** `Smart contracts deployed: Eight verified contracts on Sepolia`
**Change to:** `Smart contracts deployed: Nine verified contracts on Sepolia`

### Edit 2 -- Fix contract count in Comparison Table (REQUIRED)

**Location:** Section 9.1, Table 2, FSL Implementation Status column, line 398
**Current:** `Testnet deployment, 8 contracts, single-guide`
**Change to:** `Testnet deployment, 9 contracts, single-guide`

### Edit 3 -- Fix MindMasteryNFT reference (REQUIRED)

**Location:** Section 7.1, Table 1, MindMasteryNFT row
**Current:** `ERC-1155 [32] achievement credentials`
**Change to:** `ERC-1155 [33] achievement credentials`

Alternatively, if MindMasteryNFT is actually an ERC-721, change the description to `ERC-721 [32] achievement credentials`.

### Edit 4 -- Consider disclosing deployer address (OPTIONAL)

**Location:** Section 7.1, after "All owner-controlled contracts are currently deployed from a single deployer wallet."
**Suggested addition:** Add the deployer address for reproducibility, or add a footnote: "Deployer address available in the public deployment records on Sepolia."

### Edit 5 -- Verify patent filing date (REQUIRED before submission)

**Location:** Header, line 11
**Action:** Confirm that U.S. Provisional No. 64/063,037 was actually filed on 11 May 2026 before submitting the manuscript with this claim.

---

## 5. REFERENCES NEEDED

1. **Gas cost analysis.** If mainnet deployment is discussed as future work, a reference to current Ethereum gas economics or L2 fee structures would strengthen Section 10.1.

2. **ERC-4337 account abstraction.** Reference [34] is cited for account abstraction but no implementation timeline is given. Consider citing a recent account abstraction adoption study if available.

3. **JWT revocation lists.** Section 10.2 references RFC 8725 [35] for JWT best practices. Consider also citing RFC 7009 (OAuth 2.0 Token Revocation) if server-side revocation list implementation is planned.

4. **Ethereum address de-anonymization.** Section 6.3 cites Zyskind et al. [14] for address clustering risks. A more recent and directly relevant reference on blockchain address de-anonymization (e.g., Meiklejohn et al. or Victor & Weintraud) would strengthen this claim.

5. **Soulbound token implementation.** The paper cites ERC-5192 [21] but does not clarify whether SovereignAchievement implements the ERC-5192 interface or uses a custom non-transferability mechanism. A clarifying sentence would preempt reviewer questions.

---

## 6. PEER-REVIEW RISK

### HIGH RISK

- **Internal inconsistency on contract count.** A reviewer who reads both the table (9 contracts) and Section 8/Table 2 (8 contracts) will flag this as careless at minimum, and question data reliability at worst. Fix before submission.

- **No quantitative results.** BHTY reviewers will expect at least basic metrics (number of test transactions, gas costs, authentication latency). The paper currently reads as a pure architecture paper with no empirical validation. Section 8 heading says "Deployment Results" but provides no measurable results.

### MEDIUM RISK

- **Reference [32]/[33] swap.** Citing the wrong ERC standard for a contract in the core implementation table undermines technical credibility.

- **Single-author, single-tester.** The paper is transparent about this limitation, but reviewers may question whether the architecture has been validated by anyone other than the designer. The planned IRB study should be emphasized as imminent rather than aspirational.

- **Patent date discrepancy.** If the patent was not yet filed at the time the manuscript date implies, this is a factual error that could raise integrity concerns.

### LOW RISK

- **Testnet-only deployment.** The paper acknowledges this clearly and repeatedly. BHTY is accustomed to proof-of-concept submissions, but the lack of any mainnet deployment or formal security audit will be noted.

- **Comparison table fairness.** Welzel et al. (2025) is characterized as having "no deployment reported." If the Welzel paper describes any prototype or evaluation, this characterization should be verified for accuracy.

- **The term "practitioners" on line 25.** While this is used in a general healthcare context (not referring to FSL roles), a cautious reviewer familiar with the FSL lexicon might flag it. Consider replacing with "healthcare professionals" for consistency with the sovereignty framing.

---

*Review generated by Audit Agent on 2026-05-12. All contract addresses cross-referenced against canonical records. Lexicon compliance checked against FSL governance standards.*

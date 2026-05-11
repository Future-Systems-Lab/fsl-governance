# Smart Contract Agent Review: BHTY Paper Draft

**Date:** 2026-05-10
**Reviewer:** Smart Contract Agent (Claude Opus 4.6)
**Paper:** EIP-191 Consent Architecture for Sovereign Behavioral Health Data Governance
**Scope:** Contract address correctness, EIP-191 implementation accuracy, gas/security claims, Solidity accuracy, on-chain event naming

---

## 1. SUMMARY

The paper presents a technically sound architecture that correctly uses EIP-191 `personal_sign` as a unified authentication and consent mechanism, with JWT session management layered on top. The hybrid on-chain/off-chain data model is appropriate for the use case and the contract design choices are defensible. However, the paper contains several factual discrepancies between its contract descriptions and the actual deployed Solidity source code, and conflates v1 and v2 contract addresses in ways that would not survive peer verification against on-chain records.

---

## 2. STRENGTHS

1. **Correct EIP-191 description.** The paper accurately describes the `personal_sign` flow, 65-byte ECDSA signature output, server-side address recovery, and nonce-based replay prevention (Section 3.2). The six-step authentication flow is technically precise and would be reproducible by an implementer.

2. **Honest limitation disclosure.** The paper explicitly acknowledges testnet-only deployment, single-practitioner scope, centralized components (PostgreSQL, Vercel, VPS), and the absence of formal user study (Section 7.2). This level of transparency is uncommon and strengthens credibility.

3. **Sound hybrid data model rationale.** The on-chain/off-chain split (Section 4.3) correctly identifies the tension between blockchain immutability and healthcare data deletion requirements (e.g., GDPR right to erasure). Anchoring consent events on-chain while keeping sensitive data off-chain is architecturally appropriate.

---

## 3. GAPS

### CRITICAL

**3.1 Contract table contains incorrect token standard classifications and misleading access control labels (Section 4.1, lines 148-158)**

| Paper Claim | Actual (from source code) | Severity |
|---|---|---|
| `PractitionerAchievement` and `ParticipantAchievement` listed as two separate ERC-1155 contracts | A single contract `SovereignAchievement` (0xC3F11d2F1F12bB96b9DCF7e8f85e9704D2869B8D) handles both via token ID offsets (1-10 participant, 11-20 guide) | CRITICAL |
| SovereignLedger listed as "Open registration" | Contract is `Ownable` with `pause()`/`unpause()` owner-only functions; `registerClaim()` is open but `verifyClaim()` is restricted to the guide or owner. "Open registration" is misleading without noting the owner pause capability | IMPORTANT |
| SovereignSession described as "Guide + Participant co-signed" | Only the guide calls `startSession()`; either party can call `endSession()`. There is no co-signature mechanism. The two parties do NOT both sign the same attestation on-chain | CRITICAL |
| AlchemistForge described as having "two functions" (`alchemize()` and celebrate) with "no owner, no admin functions" | Cannot verify from this repo -- AlchemistForge source is not in the governance repository. The contract address is confirmed (0xE092336F8f5082e57CcBb341A110C20ad186A324) but the function names and permissionless claim should be verified against the verified source on Blockscout | IMPORTANT |

**3.2 Contract count discrepancy (Section 4.1, line 146)**

Paper claims "nine smart contracts." The canonical `contracts.json` lists 10 contracts (including NeuroBalanceConsent at 0x21571805e57f792b66604b140a45D8C1b2E196b8, described as a "scaffolded shell"). If NeuroBalanceConsent is excluded as a shell, the paper should state why. If PractitionerAchievement and ParticipantAchievement are actually the single SovereignAchievement contract, the count drops to eight unique contracts plus NeuroBalanceConsent.

**3.3 SovereignSession "co-signed" claim is factually incorrect (Section 6.3, line 251-252)**

The paper states: "The contract enables both the participant and Sovereign Guide to co-sign a session attestation on-chain, creating cryptographic proof that both parties consented to the session occurring."

The actual contract (`SovereignSession.sol`) shows that only `msg.sender` (the guide) calls `startSession()`, passing the participant address as a parameter. The participant does NOT sign any on-chain transaction for session start. `endSession()` can be called by either party but is a unilateral action, not a co-signature. This is a significant overstatement that a blockchain reviewer will immediately flag.

### IMPORTANT

**3.4 BenevolenceFund address version confusion**

The paper does not include BenevolenceFund's address inline, but the canonical v2 address is `0x96E8006a1fBB693B55fFf6254B8BF19EC605251B`. Multiple other files in the repository (README.md, FSL_WALLET_REGISTRY.md, compliance docs) reference an older v1 address `0xbe710a0a5a80dfa3ca7dfadc959176d545b18271`. If the paper is submitted alongside any supplementary materials referencing v1 addresses, this will create confusion.

**3.5 SovereignLedger address version confusion**

The paper's table does not list SovereignLedger's address, but the canonical v2 address is `0x4afA577fA914068451e0Aa97b61F23960f02aCc4`. Multiple repository files (README.md, DECENTRALIZATION_MIGRATION_RECORD.md, grants) reference the v1 address `0xf32979200768e8726d5EC5E5AB0CA7407d64A94e` (called "SovereignLedgerDAO"). The paper should clarify which version is described.

**3.6 Missing gas cost analysis**

Section 7.1 discusses "authentication latency" (3-5 seconds) but provides no gas cost estimates for on-chain operations. A reviewer will ask: What does a `registerClaim()` call cost? What does `startSession()` + `endSession()` cost? What about `alchemize()`? Even on testnet, gas estimates are meaningful for projecting mainnet viability.

**3.7 HS256 JWT signing (Section 3.3, line 118)**

The paper specifies HS256 (symmetric HMAC) for JWT signing. This means the same secret is used for signing and verification. If any middleware component is compromised, tokens can be forged. For a sovereignty-focused architecture, RS256 (asymmetric) would be more consistent with the threat model. This is a design choice worth justifying, not necessarily a flaw.

### NICE-TO-HAVE

**3.8 No Solidity version or OpenZeppelin version specified**

The contracts use `pragma solidity ^0.8.20` (some use `^0.8.24`). OpenZeppelin contract imports are used extensively but the version is not specified in the paper. For reproducibility, the paper should state the compiler version and dependency versions.

**3.9 "Soulbound" implementation detail**

SovereignAchievement implements soulboundness via `_beforeTokenTransfer` override. This is the correct OZ 4.x pattern. However, OZ 5.x removed this hook in favor of `_update()`. The paper should note which OZ version is used to avoid confusion.

**3.10 Rate limiting claim (Section 4.4, line 192)**

"1000 requests per minute per IP" is stated without context. For a behavioral health platform with sensitive data, this seems high. No justification is provided for why this threshold was chosen.

---

## 4. SPECIFIC EDITS

| Section | Line(s) | Issue | Recommended Edit |
|---|---|---|---|
| 4.1 | 146 | "nine smart contracts" | Reconcile with actual count. If SovereignAchievement is one contract, and NeuroBalanceConsent is included, list is: HNT, EHT, MindMasteryNFT, SovereignLedger, AlchemistForge, BenevolenceFund, SovereignAchievement, SovereignSession, NeuroBalanceConsent = 9. Update table to show SovereignAchievement as one contract with dual-role token ID ranges, not two separate contracts. |
| 4.1 | 150 | MindMasteryNFT listed as "ERC-721" | Correct -- the source code confirms ERC-721 (ERC721URIStorage). However, `canonical/contracts.json` in the repository labels it ERC-1155. Fix the JSON file, not the paper. |
| 4.1 | 156-157 | PractitionerAchievement / ParticipantAchievement as separate contracts | Replace with single "SovereignAchievement" row: "ERC-1155 soulbound credentials (participant tiers 1-10, guide tiers 11-20)" with access control "Owner-minted" |
| 4.1 | 158 | SovereignSession access control "Guide + Participant co-signed" | Change to "Guide-initiated, either party can end" |
| 6.3 | 251-252 | "both the participant and Sovereign Guide to co-sign" | Rewrite: "The guide initiates a session attestation on-chain, and either party may record its conclusion, creating a verifiable on-chain record of session occurrence." |
| 6.3 | 252 | "wallet-native session attestation architecture eliminates the need for centralized scheduling systems" | Soften: the contract records session occurrence, but scheduling (booking, calendar) still requires off-chain systems. The contract replaces the *attestation* authority, not the scheduling system. |
| 3.2 | 105 | "65-byte ECDSA signature over the EIP-191 prefixed message hash" | Technically correct. The signature is `{r, s, v}` = 32 + 32 + 1 = 65 bytes. No change needed. |
| 7.1 | 270 | "Testnet limitations...network may be reorganized" | Add: Sepolia is a proof-of-authority (PoA) / proof-of-stake testnet, not PoW. Reorganization is unlikely but the network can be reset entirely by Ethereum Foundation. |

---

## 5. REFERENCES NEEDED

1. **EIP-1271** (Smart Contract Signature Verification) -- the paper should cite this as a limitation: the architecture assumes EOA wallets only. Smart contract wallets (e.g., Safe, ERC-4337 accounts) use EIP-1271, not EIP-191, for signature verification. This is a meaningful gap in the "self-sovereign" claim.

2. **ERC-5192** (Minimal Soulbound Interface) -- SovereignAchievement implements soulbound behavior via transfer blocking but does not implement ERC-5192's `Locked` event or `locked()` function. Citing this EIP and noting the deviation would strengthen the technical precision.

3. **ERC-4337** (Account Abstraction) -- relevant to the "wallet dependency" limitation (Section 7.1). Account abstraction could lower the adoption barrier the paper identifies without compromising the consent model.

4. **OpenZeppelin Contracts version** -- cite the specific version used (likely 4.x given the `_beforeTokenTransfer` hook pattern).

5. **EIP-712** (Typed Structured Data Hashing and Signing) -- the paper should explain why EIP-191 `personal_sign` was chosen over EIP-712 typed data signing. EIP-712 provides structured, domain-separated signing that is arguably more appropriate for consent messages. A reviewer will ask this question.

---

## 6. PEER-REVIEW RISK

A blockchain-expert reviewer will challenge the following:

1. **"Co-signed" claim for SovereignSession is the highest-risk factual error.** Any reviewer who reads the contract source will see that `startSession()` is a single-party call. The paper's claim that "both the participant and Sovereign Guide co-sign a session attestation" is verifiably false from the contract code. This will damage credibility if not corrected before submission.

2. **Why EIP-191 instead of EIP-712?** EIP-712 provides typed, structured, domain-separated signing -- it was specifically designed for application-layer consent/authorization messages. Using raw `personal_sign` (EIP-191) means the consent message is a free-form string that could be replayed across domains if the nonce mechanism fails. A reviewer will ask why the more purpose-built standard was not used.

3. **No on-chain consent verification.** The paper claims "consent events (wallet signatures verified on-chain via smart contracts)" in Section 4.3, but none of the contract source code includes `ecrecover` or any signature verification logic. All EIP-191 verification happens server-side (off-chain). The on-chain contracts record *attestations*, not *consent proofs*. This distinction matters for the paper's core thesis.

4. **Revocation semantics are weak.** The paper claims consent is "revocable" (Section 5.1), but the mechanism is JWT expiration (15 minutes) and wallet disconnection. There is no on-chain revocation event, no revocation registry, and no way to prove that consent was revoked at a specific time. A reviewer will note that this is session termination, not consent revocation in the cryptographic sense.

5. **Single deployer wallet owns all owner-controlled contracts.** The deployer wallet `0xf22cbF25deEeA36FFF828BAf73CCb049345eF248` is the owner of HNT, SovereignLedger, BenevolenceFund, SovereignAchievement, and potentially others. This is a single point of centralized control that undermines the "sovereign" framing. The paper acknowledges centralized components but does not discuss the deployer-as-owner concentration risk explicitly.

6. **"Zero personally identifiable information" claim needs qualification.** Ethereum addresses are pseudonymous, not anonymous. If a participant's wallet address is linked to their real identity through any external channel (exchange KYC, ENS name, social media), all their AlchemistForge shadow aspects become attributable. The paper should cite blockchain deanonymization literature.

---

*Review generated by Smart Contract Agent. All contract addresses and source code verified against the fsl-governance repository as of 2026-05-10.*

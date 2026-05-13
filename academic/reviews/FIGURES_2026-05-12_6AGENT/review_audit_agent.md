# Audit Agent — Figure Review

**Perspective:** Factual accuracy — contract addresses correct? Event names match Solidity? Architecture matches deployed reality?
**Method:** Cross-reference figure content against deployed contracts, canonical addresses, and paper text.

---

## FIGURE 1 — System Architecture

**VERDICT: NEEDS REVISION**

ISSUES:
- Factual: The five platforms shown (EncryptHealth, HypnoNeuro, SovereignLedger, AlchemistForge, NeuroBalance) match deployed reality. However, the paper claims nine contracts and the figure doesn't show them individually. A reviewer could question whether all nine actually exist.
- Addresses: No contract addresses are visible in the figure. For a paper whose core claim is on-chain verifiability, this is a missed opportunity. At minimum, abbreviated addresses (0x1ae1...84e2 format) should be shown.
- Architecture accuracy: The EIP-191 auth layer is depicted but it's unclear whether all five platforms actually share it. In reality, EncryptHealth, HypnoNeuro, Command Center, and AlchemistForge share the pattern; NeuroBalance has a scaffolded consent toggle but not the full EIP-191 flow. The figure should not imply uniformity that doesn't exist.
- Missing: SovereignSession is not represented as a distinct component despite having its own deployed contract. The paper discusses it extensively.

SUGGESTED IMPROVEMENT: Show all 9 contracts by name with abbreviated addresses. Mark which are fully deployed vs scaffolded. Show SovereignSession explicitly.

---

## FIGURE 2 — EIP-191 Consent Flow

**VERDICT: NEEDS REVISION**

ISSUES:
- Factual: The 6-step sequence matches the deployed implementation (verified against EncryptHealth and Command Center auth flows): (1) EIP-6963 discovery, (2) eth_requestAccounts, (3) nonce from server, (4) message construction, (5) personal_sign, (6) ECDSA recovery + JWT.
- Event accuracy: No Solidity events are emitted during the consent flow (it's off-chain until the session attestation). The figure correctly doesn't show on-chain events here.
- Implementation gap: The figure shows "server-side nonce generation" (step 3) but the deployed Command Center uses a simplified pattern without server nonces — it constructs the message client-side with a timestamp. The figure should match the deployed implementation, not an idealized version.
- JWT: The JWT issuance is correct (HS256, 15-minute expiry per deployed code).

SUGGESTED IMPROVEMENT: Ensure the sequence exactly matches one of the deployed implementations (Command Center or EncryptHealth). Note any simplifications from the paper's description.

---

## FIGURE 3 — Zero-PHI Data Classification

**VERDICT: NEEDS REVISION**

ISSUES:
- Factual: The three tiers are correctly defined:
  - Tier 1 (on-chain): consent attestation hashes, session event emissions, soulbound achievement tokens — VERIFIED against deployed contracts (SessionStarted, SessionEnded, ShadowRecorded, Celebrated events).
  - Tier 2 (off-chain, encrypted): session metadata in PostgreSQL — VERIFIED (session_logs table contains wallet_address, session_type, timestamp, duration, content_hash — no clinical fields).
  - Tier 3 (IPFS, wallet-gated): documents — VERIFIED (BHTY paper pinned, recovery bundle pinned, both accessible only via CID).
- Accuracy concern: The paper claims "no Safe Harbor identifiers in any tier." AUDIT CHECK: Wallet addresses are in all three tiers. A strict reading of HIPAA Safe Harbor's "any unique identifying number" clause *could* argue a wallet address is a unique identifier. The paper addresses this (pseudonymous ≠ anonymous) but the figure should explicitly acknowledge this nuance rather than implying zero identifiers.

SUGGESTED IMPROVEMENT: Add an annotation to Tier 1 noting: "Wallet addresses are pseudonymous identifiers — not linked to real-world identity by FSL infrastructure."

---

## FIGURE 4 — Attestation Lifecycle

**VERDICT: NEEDS REVISION**

ISSUES:
- Factual: Cross-referencing against SovereignSession.sol (0xbeb13A360C6F0C77Ea3af3650Ab9762a1B9965A1):
  - `startSession(address _participant, bytes32 _sessionId)` — called by guide (msg.sender). CORRECT in figure.
  - `endSession(bytes32 _sessionId)` — callable by guide OR participant. The figure should show both parties as eligible to end.
  - `SessionStarted` event parameters: `(sessionId, guide, participant, timestamp)`. CORRECT.
  - `SessionEnded` event parameters: `(sessionId, guide, participant, startTime, endTime, duration)`. CORRECT.
- Critical accuracy issue: The figure should NOT imply that both parties authenticate before session start. The deployed contract uses SINGLE-PARTY auth (guide-initiated). Bilateral consent is Phase 5 research, not deployed. Any figure suggesting two-party auth pre-session would be a factual misrepresentation.
- Missing: The figure doesn't show that `startSession()` passes `_participant` as a parameter (not verified via signature). This is an important limitation that the paper acknowledges and Phase 5 proposes to solve.

SUGGESTED IMPROVEMENT: Clearly label the guide's `startSession()` as the sole on-chain initiator. Add a note: "Phase 5 research adds bilateral EIP-191 verification before session start." Don't overstate current deployment capabilities.

---

## COMPARATIVE BENCHMARK

ADvoCATE (Rantos et al., 2019) figures include contract function names, deployed network identifiers, and explicit data field listings in their architecture diagrams. This level of specificity is expected for blockchain system papers.

**Overall assessment:** The figures are broadly factually accurate but lack the specificity that makes blockchain papers credible — addresses, event signatures, function names, and explicit deployed-vs-planned annotations. The Phase 5 boundary (deployed single-party vs planned bilateral) must be crystal clear to avoid any appearance of overclaiming.

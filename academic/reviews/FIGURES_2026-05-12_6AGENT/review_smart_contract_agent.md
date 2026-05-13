# Smart Contract Agent — Figure Review

**Perspective:** Technical accuracy of contract representation, events, addresses, data flows
**Benchmark:** IEEE/ACM blockchain papers with contract interaction diagrams showing function signatures and event emissions

---

## FIGURE 1 — System Architecture

**VERDICT: NEEDS REVISION**

ISSUES:
- Technical: The five platform boxes are present (EncryptHealth, HypnoNeuro, SovereignLedger, AlchemistForge, NeuroBalance) but contract addresses are not shown. For a paper that emphasizes on-chain verifiability, every contract should have its Blockscout-verifiable address.
- The nine contracts are not individually represented — the reader cannot see that SovereignLedger, AlchemistForge, BenevolenceFund, etc. are distinct smart contracts with different access control models.
- The EIP-191 auth layer connecting all platforms is not visually distinguished from other connections.

SUGGESTED IMPROVEMENT: Show the 9 contracts as a distinct on-chain layer with abbreviated addresses. Group by access model (permissionless vs owner-controlled). Show EIP-191 as the horizontal auth bus connecting all platforms to the contract layer.

---

## FIGURE 2 — EIP-191 Consent Flow

**VERDICT: NEEDS REVISION**

ISSUES:
- Technical: The 6-step flow is structurally correct: (1) EIP-6963 provider discovery, (2) eth_requestAccounts, (3) nonce generation, (4) consent message construction, (5) personal_sign, (6) ECDSA recovery + JWT. However, the diagram doesn't distinguish which steps are on-chain vs off-chain vs client-side.
- The `personal_sign` call (step 5) is the critical cryptographic moment — it should be visually prominent as the consent+auth unification point. Currently it's just another numbered step.
- Missing: The JWT issuance and cookie setting (step 6 output) should show the transition from "unauthenticated" to "wallet-gated session."

SUGGESTED IMPROVEMENT: Color-code client-side (browser), server-side (Vercel), and blockchain interactions. Add a bold visual marker at step 5 showing where consent = authentication.

---

## FIGURE 3 — Zero-PHI Data Classification

**VERDICT: NEEDS REVISION**

ISSUES:
- Technical: Three tiers are correct: Tier 1 (on-chain: attestation hashes, event emissions, soulbound tokens), Tier 2 (off-chain encrypted: session metadata, wellness metrics), Tier 3 (IPFS wallet-gated: documents). Content descriptions match the paper.
- Missing: No indication of which smart contracts produce Tier 1 data (e.g., SovereignSession emits SessionStarted, AlchemistForge emits ShadowRecorded). The contract-to-tier mapping would strengthen the technical argument.
- The "zero PHI" claim needs visual reinforcement — explicitly show what is NOT stored (names, SSN, DOB, etc.).

SUGGESTED IMPROVEMENT: Add a column showing which contracts feed each tier. Add a "Not Present" section listing the 18 Safe Harbor identifiers with explicit exclusion.

---

## FIGURE 4 — Attestation Lifecycle

**VERDICT: NEEDS REVISION**

ISSUES:
- Technical: The lifecycle appears correct (guide starts session → session active → session ends) but the Solidity event names should be exact: `SessionStarted(bytes32 indexed sessionId, address indexed guide, address indexed participant, uint256 timestamp)` and `SessionEnded(...)`. Currently event signatures are abbreviated or missing.
- The figure doesn't show that `startSession()` is guide-only (single-party initiation) — this is an important architectural detail that motivates the Phase 5 two-party mutual auth research.
- Missing: The `endSession()` showing either party can call it.

SUGGESTED IMPROVEMENT: Show the exact Solidity function signatures as code-formatted callouts. Explicitly label "Guide tx" vs "Either party tx" on the arrows. Add a visual note indicating the Phase 5 bilateral consent upgrade path.

---

## COMPARATIVE BENCHMARK

MedRec (Azaria et al., 2016) contract diagrams: Show contract inheritance hierarchies, function-level interactions, and explicit on-chain vs off-chain data storage boundaries with labeled arrows.

FSL figures lack: contract-level specificity, function signatures, event names, and the on-chain/off-chain boundary that is the paper's central architectural contribution.

**Overall assessment:** Technically defensible content but presentation doesn't leverage the on-chain verifiability that distinguishes FSL from all prior work. Rebuild with contract-level detail.

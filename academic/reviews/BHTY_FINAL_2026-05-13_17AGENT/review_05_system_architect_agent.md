# Review: System Architect Agent (Agent 5 of 17)

**Reviewer:** system_architect_agent
**Date:** 2026-05-13
**Document:** `academic/BHTY_PAPER_v2.md` (v2, 594 lines)
**Scope:** Figure-to-text alignment, listing verification, 17-agent council reference, architecture diagram completeness

---

## VERDICT: CONDITIONAL ACCEPT

**OVERALL:** The paper presents a coherent five-platform architecture with nine deployed contracts. Figure-to-text alignment is largely consistent but contains one confirmed event-name mismatch between Listing 2 and the deployed contract that must be corrected. The architecture diagram claims in Figure 1's caption are well-supported by the paper body. The 17-agent AI council, mentioned in the LOI, is absent from the paper -- which is acceptable given the paper's scope, but should be noted for cross-document consistency.

---

## CRITICAL

### C1. Listing 2 "SessionCompleted" vs Deployed "SessionEnded" Mismatch

**Location:** Lines 314-319 (Listing 2), Line 504 (Figure 4 caption)
**Evidence:** Listing 2 defines `event SessionCompleted(...)`. The deployed `SovereignSession.sol` at `contracts/sovereign-session/SovereignSession.sol` line 35 emits `event SessionEnded(...)`. The ABI file (`SovereignSession_abi.json`) confirms `SessionEnded`. The v2/v3 SVG figures for Figure 4 also use `SessionEnded`.
**Impact:** A reviewer who checks the deployed contract or the ABI against the paper will find a name mismatch. This undermines the paper's claim of describing a "deployed" system. The Figure 4 caption (line 504) also says "triggering a `SessionCompleted` event" -- doubly inconsistent with the deployed code.
**Fix:** Change Listing 2 and Figure 4 caption to use `SessionEnded`. Alternatively, if the paper intends to show a generalized pattern (as Listing 1 does), add an explicit disclaimer that event names are illustrative and may differ from deployed contract names. The first option is strongly preferred since Listing 2 is presented as a deployed pattern.

### C2. Listing 2 Event Signature Does Not Match Deployed Contract Signature

**Location:** Lines 307-319
**Evidence:** Listing 2 shows `SessionStarted(address indexed guide, address indexed participant, bytes32 contentHash, uint256 timestamp)`. The deployed contract emits `SessionStarted` with parameters `(bytes32 indexed sessionId, address indexed guide, address indexed participant, uint256 timestamp)` -- note the additional `sessionId` parameter and absence of `contentHash`. Similarly, the deployed `SessionEnded` has parameters `(bytes32 indexed sessionId, address indexed guide, address indexed participant, uint256 startTime, uint256 endTime, uint256 duration)` which differs substantially from Listing 2's `SessionCompleted(address indexed guide, address indexed participant, uint256 duration, uint256 timestamp)`.
**Impact:** The listing purports to show the deployed event pattern but differs in parameter count, parameter names, and indexed fields. This is a factual accuracy issue for a systems paper.
**Fix:** Either (a) update Listing 2 to match deployed signatures exactly, or (b) add an explicit note that Listing 2 shows a simplified/generalized pattern and does not represent the deployed contract verbatim.

---

## HIGH

### H1. Figure 4 Caption Text-to-Figure Misalignment

**Location:** Line 504
**Evidence:** The caption says "triggering a `SessionCompleted` event." The deployed figures (v2 and v3 SVGs at `academic/figures/v2/fig4_attestation_lifecycle.svg` and `academic/figures/v3/fig4_attestation_lifecycle.svg`) render `SessionEnded`. The caption contradicts its own figure.
**Fix:** Update caption to say `SessionEnded`.

### H2. NeuroBalanceConsent Described as "Biosensor consent scaffold" in Table but "pre-implementation phase" in Text

**Location:** Line 108 vs Line 359
**Evidence:** Section 3.1 says NeuroBalance is "currently in pre-implementation phase." Table 1 (Section 7.1) lists NeuroBalanceConsent with purpose "Biosensor consent scaffold" and a deployed contract address. A deployed contract is not "pre-implementation" -- it is at minimum a scaffold deployment.
**Impact:** Internal inconsistency. A reviewer will ask: is the contract deployed or is the platform in pre-implementation?
**Fix:** Harmonize language. Suggested: "NeuroBalance is currently in scaffolded pre-implementation; the NeuroBalanceConsent smart contract has been deployed as infrastructure scaffolding ahead of full platform development."

---

## MEDIUM

### M1. Figure 1 Architecture Diagram Completeness

**Location:** Line 112, Lines 498-499 (Figure 1 caption)
**Evidence:** The caption describes five platforms, on-chain and off-chain components, and data flow arrows. The paper body describes nine contracts, five platforms, PostgreSQL, IPFS, JWT middleware, and CORS/TLS infrastructure. Without viewing the actual rendered figure, I can verify that the caption claims are consistent with the paper's architectural description. However, the caption does not mention the middleware verification layer (Section 3.3), which is architecturally significant.
**Recommendation:** Consider whether the middleware layer should appear in Figure 1 or its caption. It is a critical trust boundary.

### M2. Figure 2 and Figure 3 Caption-to-Text Consistency

**Location:** Lines 500-503
**Evidence:** Figure 2 caption describes a six-step flow matching Section 3.2 exactly. Figure 3 caption describes a three-tier data classification matching Section 5.1. Both are internally consistent. No issues found.

### M3. 17-Agent Council Not Referenced in Paper

**Location:** Absent from paper; present in LOI (line 41: "A 17-agent AI council runs 24/7 on self-hosted infrastructure")
**Evidence:** The paper makes no mention of the 17-agent AI governance council. The AI Use Disclosure (line 510) mentions "AI tools (Anthropic Claude, Claude Code)" for drafting assistance but does not describe the governance infrastructure.
**Impact:** This is not a paper deficiency -- the 17-agent council is operational infrastructure, not part of the consent architecture being described. However, for cross-document consistency, the LOI claims a capability the paper does not describe.
**Recommendation:** No change needed for this paper. If the 17-agent council is referenced in future ASU submissions, ensure the BHTY paper is not cited as the source for that claim.

### M4. Listing 1 Pattern Verification

**Location:** Lines 197-225
**Evidence:** Listing 1 uses `ethers.verifyMessage()` which is the standard ethers.js v5/v6 API for EIP-191 verification. The pattern is correct: recover address, compare to claimed address (case-insensitive), validate required phrases. The code is explicitly labeled as a "generalized pattern" with "implementation-specific details omitted." This is appropriate for an academic paper.
**Status:** No issues found. The pattern is technically sound.

---

## LOW

### L1. No Sequence Diagram for Multi-Guide Consent Flow

**Location:** Section 10.3, item 1
**Evidence:** The paper acknowledges single-guide limitation but provides no architectural sketch of how multi-guide consent would work. For a systems architecture paper, even a brief description of the intended multi-guide consent pattern would strengthen the future work section.

### L2. Table 1 vs Table 2 Numbering

**Location:** Lines 348-361 (contracts table), Lines 406-414 (comparison table)
**Evidence:** The contracts table in Section 7.1 is not explicitly labeled "Table 1" in the markdown -- it appears as an unlabeled table. The comparison table in Section 9.1 is introduced as "Table 2" (line 404). The data availability statement (line 594) references "Table 1." The first table should be explicitly labeled "Table 1" for consistency.

---

## DONE WELL

1. **Hybrid data model clarity.** The on-chain/off-chain split is clearly articulated with specific data elements assigned to each layer. The three-tier classification in Figure 3 provides a useful architectural reference.

2. **Listing 1 is well-scoped.** By explicitly labeling it as a generalized pattern, the paper avoids exposing proprietary implementation while still demonstrating technical competence. The ethers.js verification pattern is correct and complete.

3. **Contract table is comprehensive.** Nine contracts with addresses, purposes, and access control models. The spectrum from permissionless to owner-controlled is well-articulated.

4. **Authentication flow description.** The six-step flow in Section 3.2 is precise, sequentially correct, and addresses security concerns (nonce TTL, single-use, CSPRNG).

5. **Revocation semantics honesty.** The paper does not overclaim JWT revocation capabilities and explicitly acknowledges the stateless token limitation.

---

## UNIQUE PERSPECTIVE (System Architect)

The architecture described is genuinely novel in its unification of authentication and consent into a single cryptographic event. From a systems architecture standpoint, the most significant design decision is the choice to perform EIP-191 verification server-side rather than on-chain -- this is the correct tradeoff for a system that needs to issue JWTs, but it means the "decentralized" claim applies only to the identity and attestation layers, not to the access control enforcement layer. The paper acknowledges this honestly (Section 10.1, "centralized components"), which is the right approach.

The critical gap is the Listing 2 / deployed contract divergence. For a paper whose central claim is that the system is "deployed" and "functioning," any mismatch between code listings and actual deployed code is a credibility risk. This is the single most important fix before submission.

The absence of the 17-agent council from the paper is architecturally appropriate -- it is governance infrastructure, not consent infrastructure -- but the LOI should be updated to clarify this distinction if both documents will be reviewed by the same committee.

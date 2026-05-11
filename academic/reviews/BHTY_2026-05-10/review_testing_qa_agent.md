# Testing/QA Agent Review: BHTY Paper Draft

**Reviewer:** Testing/QA Agent (Reproducibility Focus)
**Date:** 2026-05-10
**Manuscript:** EIP-191 Consent Architecture for Sovereign Behavioral Health Data Governance
**Target Venue:** Blockchain in Healthcare Today (BHTY)

---

## 1. SUMMARY

The paper describes a five-platform decentralized consent architecture using EIP-191 wallet signatures for behavioral health data governance. While the architectural narrative is coherent and the conceptual design is well-motivated, the manuscript **cannot be replicated from the paper alone**. Critical implementation details -- smart contract source code, API endpoint specifications, JWT payload structure, database schema, consent message template, and middleware logic -- are described only at the narrative level without the concrete artifacts (code listings, formal specifications, or pseudocode) needed for independent reproduction. The paper reads as an architecture whitepaper rather than a reproducible systems paper.

---

## 2. STRENGTHS

1. **Clear threat model and gap identification.** Section 2.4 cleanly articulates the four-function unification (authentication, consent, authorization, attribution) that distinguishes FSL from prior work (MedRec, ConsentChain). The gap claim is specific and falsifiable.

2. **Honest limitations section.** Section 7.2 forthrightly acknowledges single-practitioner scope, testnet-only deployment, no formal user study, and browser wallet dependency. This preempts several obvious reviewer objections.

3. **Principled hybrid data model.** The on-chain/off-chain split (Section 4.3) is well-reasoned: consent events on-chain for immutability, sensitive data off-chain for GDPR-style deletion rights. The rationale is clearly articulated.

---

## 3. GAPS

### CRITICAL

- **C1: No code listings or pseudocode anywhere in the paper.** The paper describes nine smart contracts but provides zero lines of Solidity. AlchemistForge is the central case study (Section 6), yet the contract's `alchemize()` and celebration functions are described only in prose. A reproducibility-focused reviewer will immediately flag this. At minimum, the AlchemistForge and SovereignSession contracts need full or abbreviated source listings.

- **C2: "Figure 1" is referenced (Section 3.2) but does not exist in the manuscript.** The six-step authentication flow references "Figure 1" which is never provided. This is a hard gap -- the paper promises a figure and fails to deliver it.

- **C3: Consent message template is withheld.** Section 5.2 states "The exact message structure is proprietary to the FSL implementation." For a paper whose central claim is that consent messages replace click-through agreements, withholding the message template makes the consent design unverifiable and unreproducible. A reviewer will ask: how can we evaluate whether the consent is truly "informed" if we cannot see the message?

- **C4: No API specification.** Section 3.2 references a "server-side nonce endpoint" and "server-side verification endpoint" but provides no route paths, request/response schemas, or HTTP method specifications. The middleware layer (Section 3.3) describes header names generically ("as a verified address header") rather than specifying the actual header names (e.g., `x-wallet-address`). Section 4.4 mentions `x-wallet-address`, `x-signature`, and `x-message` headers but these are not cross-referenced with Section 3.3.

- **C5: No database schema.** The paper references PostgreSQL storage for session metadata, wellness metrics, and provider access grants (Sections 4.3, 3.4) but provides no schema, no table definitions, and no description of how wallet addresses are indexed or how consent grants are stored relationally.

### IMPORTANT

- **I1: Deployment results are vague.** Section 6.4 states AlchemistForge "has recorded transmutation events from unique wallet addresses, with corresponding celebration events" but provides no actual counts. A reproducibility paper should report concrete metrics: N wallet addresses, M events, gas costs per transaction, timestamp range.

- **I2: JWT claims structure is unspecified.** Section 3.2 says the JWT contains "the verified address, role (participant or guide), and a 15-minute expiration" but does not specify the claims schema (e.g., `sub`, `role`, `exp`, `iat`). The HS256 signing key management (rotation, storage) is not discussed.

- **I3: IPFS integration is mentioned but undetailed.** Section 4.3 references "IPFS content hashes anchored to SovereignLedger" and "IPFS-pinned, wallet-gated decryption" but does not explain the pinning strategy, the encryption scheme, or how wallet-gated decryption works (envelope encryption? threshold scheme? simple symmetric key derived from ECDH?).

- **I4: Six-layer thesis is introduced but never elaborated.** Section 3.1 mentions "Financial, Identity, Governance, Compliance, Therapeutic, and Research" layers as "the canonical architectural framing" but never maps platforms to layers or explains how each layer is implemented. This creates an unkept promise in the text.

- **I5: SovereignSession co-signing protocol is undescribed.** Section 6.3 states that "both the participant and Sovereign Guide co-sign a session attestation on-chain" but does not describe the co-signing protocol. Is it a multisig? Sequential signatures? A single transaction with two prior off-chain signatures? The contract address is given but no ABI or interface.

- **I6: Inconsistency in header naming.** Section 3.3 generically says the middleware injects the verified address "as a verified address header," while Section 4.4 specifically names `x-wallet-address`, `x-signature`, and `x-message`. These sections describe the same system but use different levels of specificity, creating ambiguity about whether these are the same headers or different ones.

- **I7: EIP-6963 mentioned without integration detail.** Section 3.2 Step 1 mentions EIP-6963 multi-provider discovery and "preferring Brave Wallet" but provides no implementation detail on the discovery mechanism or preference logic.

### NICE-TO-HAVE

- **N1: No performance benchmarks.** Section 7.1 claims "3-5 seconds" for the personal_sign flow but provides no methodology for this measurement (browser? network? wallet?). No latency data for middleware verification, JWT refresh, or smart contract calls.

- **N2: No threat model diagram.** The paper would benefit from a formal threat model showing trust boundaries between the wallet, client app, API server, PostgreSQL, and blockchain.

- **N3: Reference [3] URL has a typo.** "self-soverereign" in the URL is misspelled (should be "self-sovereign"), though this may reflect the actual URL as published by the author.

- **N4: Table 1 (Section 4.1) lacks deployed contract addresses.** Only SovereignSession has its address listed. For reproducibility on Sepolia, all nine addresses should be provided so a reviewer can verify on-chain.

- **N5: The analytics dashboard URL (`alchemistforge.io/analytics`) is stated but not verified in the paper.** No screenshot or data sample is provided.

---

## 4. SPECIFIC EDITS

| Section | Edit Required |
|---------|--------------|
| 3.2 | Add Figure 1 (authentication flow diagram) or remove the reference |
| 4.1 | Add deployed Sepolia addresses for all nine contracts in the table |
| 4.1 | Add abbreviated Solidity source for AlchemistForge (at minimum the `alchemize()` function signature and event definitions) |
| 4.3 | Specify the IPFS encryption and wallet-gated decryption scheme |
| 5.2 | Either provide the consent message template or remove the claim that readers can evaluate its informed-consent properties. A redacted version with structure preserved would be a compromise |
| 6.3 | Add the SovereignSession co-signing protocol: function signatures, event definitions, and the multi-party signing flow |
| 6.4 | Replace vague "has recorded transmutation events" with concrete deployment metrics (N addresses, M events, date range, gas costs) |
| 3.1 | Either elaborate the six-layer thesis with a mapping table (layer to platform to implementation) or remove the reference |
| 3.3 vs 4.4 | Reconcile the header naming: use consistent, specific header names in both sections |
| 7.1 | Add methodology for the "3-5 seconds" latency claim (device, browser, network conditions, sample size) |

---

## 5. REFERENCES NEEDED

1. **JWT security best practices.** The paper uses JWTs with HS256 but cites no standard. Add: RFC 7519 (JSON Web Token) and OWASP JWT Security Cheat Sheet.

2. **ECDSA signature recovery.** The paper references `ecrecover` semantics without citing the cryptographic basis. Add: SEC 1, Section 4.1.6 (Public Key Recovery Operation), or reference the ethers.js / viem documentation used.

3. **Nonce-based replay prevention.** The nonce mechanism (Section 3.2 Step 3) is standard but uncited. Add a reference to challenge-response authentication literature or NIST SP 800-63B.

4. **IPFS.** Section 4.3 references IPFS without citation. Add: Benet, J. (2014). IPFS - Content Addressed, Versioned, P2P File System. arXiv:1407.3561.

5. **Soulbound tokens.** Section 4.1 references "soulbound" ERC-1155 tokens without citing Weyl, Ohlhaver, and Buterin (2022), "Decentralized Society: Finding Web3's Soul."

6. **ERC token standards.** ERC-20, ERC-721, and ERC-1155 are referenced but not cited. Add the respective EIP references.

7. **Reproducibility methodology.** Consider citing ACM guidelines on artifact evaluation or similar standards to frame the paper's reproducibility claims.

---

## 6. PEER-REVIEW RISK

A reviewer focused on reproducibility would likely flag the following issues as grounds for major revision or rejection:

1. **"Show me the code."** The paper describes a software system but contains zero code. For a venue like BHTY that publishes implementation papers, this is a significant gap. The reviewer will ask: "If I wanted to build this, what would I build?" The paper does not answer this question at the implementation level.

2. **Proprietary consent message undermines the central claim.** The paper's thesis is that cryptographic consent is superior to click-through consent. But the consent message -- the artifact that makes the signature "informed" -- is withheld as proprietary. This creates a logical contradiction: the paper asks readers to accept that wallet-signed consent is meaningful without showing them what is being consented to.

3. **Missing Figure 1 signals incomplete manuscript.** A reference to a nonexistent figure suggests the paper was submitted in draft state. This is a red flag for any reviewer.

4. **No evaluation section.** The paper has no Section titled "Evaluation." Section 6.4 (Deployment Results) is three sentences with no quantitative data. A systems paper without evaluation metrics -- even basic ones like transaction counts, latency measurements, or gas costs -- will be viewed as incomplete.

5. **Reproducibility vs. IP tension.** The paper occupies an uncomfortable middle ground: it claims open deployment (public testnet, public GitHub repo) while withholding key implementation details (consent message, API routes, contract source in-paper). A reviewer will ask whether the GitHub repository actually contains the artifacts needed for replication, and if so, why they are not excerpted in the paper.

6. **Single-author conflict of interest.** The author is the founder, sole architect, lead engineer, and (implicitly) sole practitioner. While disclosed, this means no independent party has verified any claims. Combined with the lack of quantitative evaluation, this raises credibility concerns for peer review.

---

*Review generated by Testing/QA Agent on 2026-05-10. Focus: reproducibility, internal consistency, and completeness for independent replication.*

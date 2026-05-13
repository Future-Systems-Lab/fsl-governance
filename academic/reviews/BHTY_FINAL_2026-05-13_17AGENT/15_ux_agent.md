# Review 15: UX Agent

**Reviewer:** ux_agent (reader experience, accessibility, clarity, figure readability)
**Date:** 2026-05-13
**Document:** `academic/BHTY_PAPER_v2.md`
**Review Type:** 17-agent independent review

---

## VERDICT: ACCEPT WITH MINOR REVISIONS

## OVERALL: 7/10

The paper is well-structured and internally consistent, but it presents significant readability barriers for non-blockchain readers. A health informatics researcher, IRB member, or behavioral health practitioner encountering this paper through BHTY will face unfamiliar terminology, unexplained acronyms, and code listings that assume Solidity/JavaScript fluency. The six-step authentication flow and three-layer revocation model are clearly explained, but the "so what" -- why this matters for real people in behavioral health -- gets lost in the architectural detail.

---

## CRITICAL ISSUES

### C1. Section 10.3 Dual-Numbered Item "10" Breaks Reader Navigation
- Items 9 and 10 in the limitations list are correctly numbered, but then a second item "10" appears (Mainnet deployment). This numbering collision means a reader referencing "limitation 10" cannot know which item is meant.
- In a 10-item list that is the paper's primary limitations disclosure, this is a structural navigation failure, not just a typo.
- **Fix:** Renumber the second "10" as "11."

### C2. Phase 5 Description (Item 10a) Overwhelms the Limitations Section
- The Phase 5 entry (Two-Party Mutual Auth + Encrypted Recording) is approximately 150 words -- longer than most items in the list combined. It introduces new system names (Doxy.me, Daily.co, Zoom), new cryptographic primitives (AES-256-GCM), and new architectural concepts (bilateral cryptographic consent, client-side encrypted recording, IPFS-pinned video).
- A reader who has followed the paper's architecture through Sections 3-8 is suddenly asked to absorb an entirely new system in a limitations bullet point. This is a cognitive overload problem.
- **Recommendation:** Either compress to 2-3 sentences ("Phase 5 doctoral research will extend SovereignSession to require bilateral wallet signatures and implement client-side encrypted session recording. This is not claimed as implemented.") or extract into a separate "Future Research Directions" subsection.

---

## HIGH ISSUES

### H1. Non-Blockchain Reader Cannot Follow Without External Knowledge
The paper assumes the reader knows:
- What an Ethereum wallet is and how `personal_sign` works
- What EIP-191, EIP-712, EIP-6963, EIP-1271, ERC-20, ERC-1155, ERC-4337, ERC-5192 are
- What JWT, ECDSA, Keccak-256, and CORS mean
- What Sepolia testnet is and why it matters
- What "soulbound" means in a token context

Some of these are defined (EIP-191 in Section 2.3, soulbound in Section 2.5). Many are not. A behavioral health researcher reading BHTY may understand consent models deeply but have never interacted with a Web3 wallet.

**Recommendation:** Add a brief glossary or expand inline definitions for the top 5 terms a non-blockchain reader will encounter: wallet, signature, testnet, smart contract, and gas.

### H2. Code Listings Assume Developer Fluency
- **Listing 1** (JavaScript/ethers.js) is clean and well-commented. However, a non-developer reader will not understand what `ethers.verifyMessage` does despite the inline comment. The surrounding prose (Section 4.2) explains the verification pattern well, but the code listing itself is opaque to non-technical readers.
- **Listing 2** (Solidity events) shows event signatures with no explanation of what `indexed` means, what `bytes32 contentHash` represents, or why events matter for auditability.
- **Recommendation:** Add 1-2 sentences of plain-language explanation directly after each listing. Something like: "In plain terms, this code checks that the person who signed the consent message is the same person who claims to own the wallet address."

### H3. Listing 2 "SessionCompleted" vs Deployed "SessionEnded"
- Listing 2 shows `event SessionCompleted(...)` but the deployed Solidity contract (`SovereignSession.sol`, line 35) uses `event SessionEnded(...)`.
- From a UX/trust perspective: if a technically inclined reader checks the on-chain ABI or the contract source, they will find the event name does not match the paper. This creates confusion about whether the paper describes the actual system or an idealized version.
- Figure 4 caption also references "SessionCompleted" -- the mismatch propagates.
- **Fix:** Align Listing 2 and Figure 4 with the deployed event name `SessionEnded`, or add a footnote explaining the naming discrepancy.

---

## MEDIUM ISSUES

### M1. Figure References Are Text-Only (No Embedded Figures in Markdown)
- Figures 1-4 are referenced via `![Figure X](figures/fig_...)` image links. In the Markdown source, these render only if the reader has access to the figure files. A reviewer reading the `.md` file directly will see only alt text.
- The figure captions in Section "Figure Captions" at the end are detailed and well-written, but they are separated from the figures themselves by the entire references section. A reader encountering Figure 1 in Section 3.1 must scroll past 200+ lines to find the caption.
- **Recommendation:** Ensure the submission format (PDF/HTML) embeds figures inline. For the Markdown source, consider placing abbreviated captions directly below each figure reference.

### M2. Table 1 (Section 7.1) Contract Table Readability
- The contract table lists nine contracts with addresses, purposes, and access control levels. The Ethereum addresses are 42-character hex strings that add visual noise.
- A non-blockchain reader seeing `0x1ae1e10929f008d1f9883ce574a318abd86084e2` will not know what to do with it.
- **Recommendation:** Truncate addresses to `0x1ae1...4e2` in the table and provide full addresses in an appendix or data availability statement.

### M3. Reference OCR Errors Damage Trust
- Reference [7]: "Brber, K." is clearly an OCR corruption.
- Reference [11]: "Milber, M." is also likely corrupted.
- A reader who checks citations and finds incorrect author names will question the paper's overall attention to detail. This is a reader-trust issue.

### M4. Reference [32] (ERC-721) Has No In-Text Citation
- ERC-721 is listed as reference [32] but never cited in the paper body. A reader following the reference numbering sequentially will notice the gap (references jump from [31] to [33] in the contract table).
- **Fix:** Either cite ERC-721 where relevant (e.g., noting that FSL uses ERC-1155 rather than ERC-721 for credentials) or remove the orphaned reference.

### M5. Section 5.3 Revenue Split Appears in an Unexpected Location
- The 70/27/3 revenue split discussion appears in Section 5 (Zero-PHI Data Model) under the heading "Practitioner Independence and Tax Responsibility." A reader navigating by section headings would not expect to find revenue model details in the data model section.
- **Recommendation:** This content belongs in Section 7 (Implementation) or Section 10 (Discussion) where system economics would be expected.

---

## LOW ISSUES

### L1. "Sovereign Guide" Jargon Density
- The term "Sovereign Guide" is used 20+ times. While defined at first use, the branding-heavy term may feel out of place in an academic paper to some readers. Consider whether "credentialed facilitator" could be used in some instances for variety.

### L2. Section Numbering Consistency
- Sections are numbered 1-11, but the paper flow has uneven depth. Section 2 (Background) has five subsections (2.1-2.6). Section 8 (Deployment Results) has zero subsections. This inconsistency is minor but affects scanning.

### L3. IPFS Mentioned Without Explanation
- IPFS appears in Sections 5.1 and 10.3 but is never expanded (InterPlanetary File System) or explained. A reader unfamiliar with decentralized storage will not understand why IPFS is relevant.

### L4. "AlchemistForge" Name Not Intuitive
- The contract name "AlchemistForge" does not self-describe its function. "Voluntary Engagement Recorder" or similar would be more accessible. This is a minor naming concern for reader comprehension.

---

## DONE WELL

1. **Six-step authentication flow is excellent.** Section 3.2 walks through wallet detection to JWT issuance in numbered steps with clear technical detail. This is the most readable section of the paper and could serve as a standalone tutorial.

2. **Three-layer revocation model is clearly structured.** The numbered list in Section 10.2 (JWT expiration, grant deletion, re-authentication) is easy to follow and honestly caveated.

3. **Comparative table (Table 2) communicates differentiation effectively.** The property-by-property comparison is the clearest way to show how FSL differs from prior work. A reader can scan this table in 30 seconds and understand the contribution.

4. **Honest limitations.** The paper does not oversell. Phrases like "architect-initiated or campaign-generated," "no external organic adoption has been measured," and "single Sovereign Guide (the principal investigator)" are refreshingly candid.

5. **Consent message design rationale (Section 2.4).** The three-reason comparison of EIP-191 vs EIP-712 is well-structured and accessible even to readers who do not know both standards. Each reason has a clear heading and plain-language explanation.

---

## UNIQUE PERSPECTIVE: UX / READER EXPERIENCE

The fundamental UX question for this paper is: **Can a behavioral health researcher who has never used a crypto wallet understand why this system matters?**

Currently, the answer is "partially." The paper does an excellent job explaining the problem (centralized consent is broken) and the solution architecture (wallet signatures unify identity and consent). But between the problem statement and the solution, the reader must absorb a large amount of blockchain infrastructure knowledge that the paper does not teach.

The paper's ideal reader is someone who already understands both behavioral health consent challenges AND Ethereum wallet mechanics. This intersection is small. BHTY's audience skews toward healthcare professionals exploring blockchain, not blockchain engineers exploring healthcare. The paper should therefore err on the side of over-explaining blockchain concepts and under-explaining healthcare consent problems (which the BHTY audience already understands).

Three specific UX improvements would significantly broaden accessibility:

1. **A "How It Works" paragraph in Section 1** that describes the user experience in plain language: "A participant opens the platform in their browser. Their crypto wallet prompts them to read and sign a consent message. That single signature proves who they are, records their consent, and grants them access. No username, no password, no checkbox."

2. **Inline plain-language summaries after each code listing.** Listing 1 should end with: "In practice, this means the server can mathematically prove that a specific wallet owner approved a specific consent message, without ever seeing their private key."

3. **A reader roadmap at the end of Section 1** indicating which sections are essential for different audiences: "Sections 3-4 describe the core architecture. Section 9 provides the comparative evaluation. Section 10 discusses limitations. Readers primarily interested in the consent model may focus on Sections 4 and 9."

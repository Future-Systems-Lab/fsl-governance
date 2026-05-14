# Academic Reviewer Agent -- FSL Command Center Review

**Date:** 2026-05-14
**Surface:** fsl-command-center.vercel.app (index.html)
**Perspective:** Academic reviewer evaluating DEng application credibility, BHTY paper anchoring, and research framing

---

## WHAT'S GOOD

1. **Thesis is visible and well-framed.** Section 02 presents a clear, defensible thesis statement with the "proving ground" logic articulated: behavioral health chosen because it imposes the strictest regulatory load, highest stigma cost, and most complex consent topology. This is exactly the framing a doctoral committee wants to see.

2. **ASU-specific alignment is strong.** The academic reviewer note names Dr. Dragan Boscovic (Blockchain Research Lab), Dr. Gail-Joon Ahn (Zero Trust), and Dr. Hassan Ghasemzadeh (wearable AI) as faculty targets. The convergent-framing language ("independent architecture arriving at convergent framing through different cryptographic primitives") demonstrates awareness of existing ASU work.

3. **BHTY paper is IPFS-anchored with a clickable link.** The CID is displayed (QmNUhpwRPrZd5Vk6wLy4pAhFBz3fWYWntKkHC5LXMyCmXu) and linked to the IPFS gateway. This is an immutable timestamp proof -- exactly what academic reviewers need.

4. **Submission timelines are explicit.** Patent non-provisional deadline (May 2027), ASU priority deadline (Oct 1, 2026), BS MIS conferral (July 2026), BHTY submission target (Q3 2026) are all laid out in a clean table.

5. **Open-source contributions are listed with direct PR links.** Eight PRs across DIF, OpenZeppelin, Ethereum/EIPs, Hyperledger Fabric, Uniswap, Balancer, BigchainDB, and OpenMRS -- all verifiable with one click.

6. **Phase 1 Demonstration framing is honest.** The testnet badge and "working prototype, not a finished product" language shows academic integrity -- no overclaiming.

7. **Evidence portfolio section links to fsl-governance repo.** Master Timeline, Deployment Registry, IP Registry, and Domain/DNS Inventory are all linked.

---

## WHAT'S MISSING

1. **The six-layer thesis framework is buried in paragraph text.** The six layers (Financial, Identity, Governance, Compliance, Therapeutic, Research) are listed inline in the thesis section but not visually structured. An academic reviewer scanning the page will miss this -- it reads as a wall of text, not a framework diagram.

2. **No conference or journal targets beyond "Q3 2026."** Which journals? IEEE? ACM? JMIR? A serious academic application needs target venues named. The BHTY paper card says "Journal submission target Q3 2026" but does not name the journal.

3. **No methodology framing.** The page says "praxis-track applied engineering" but does not explain what research methodology is being used. Is this design science research? Action research? Mixed methods? A DEng committee will want to see this.

4. **No literature positioning.** There is no mention of how FSL relates to existing work -- Boscovic's Hyperledger Fabric approach, Ghasemzadeh's wearable research, or the broader decentralized identity literature (DIF, W3C DIDs, Verifiable Credentials). Academic reviewers expect at minimum a nod to prior art.

5. **GPA is mentioned (3.94) but no transcript link or degree verification path.** The BS MIS from CSU Global is claimed but not verifiable from this page.

6. **The BHTY paper IPFS link goes to a raw IPFS gateway.** There is no abstract, no author list, no keywords displayed on this page. A reviewer should be able to read a 3-sentence abstract without clicking through.

7. **No IRB status or ethics review mention.** The academic reviewer note mentions "IRB scaffold" in the evidence portfolio bullets but there is no section explaining ethical review plans for human subjects research.

8. **No publications list.** Beyond the BHTY paper, are there any other publications, preprints, or technical reports? Academic reviewers expect a publication record.

9. **The reviewer surface (/reviewer) is mentioned but there is no indication of what it contains.** The link says "Open Reviewer Surface" but a reviewer has no idea what they will find there.

---

## SPECIFIC ADDITIONS NEEDED

| Priority | Addition |
|----------|----------|
| **CRITICAL** | Add a visual six-layer framework diagram or structured grid showing the six thesis layers (Financial, Identity, Governance, Compliance, Therapeutic, Research) with 1-2 bullet points each. This is the intellectual backbone -- it must be scannable. |
| **HIGH** | Add a BHTY paper abstract (3-5 sentences) directly on the page, visible without clicking through to IPFS. Include author, keywords, and target journal name. |
| **HIGH** | Name 2-3 target journals/conferences explicitly (e.g., IEEE Blockchain, ACM CCS, JMIR Mental Health, Blockchain in Healthcare Today). |
| **HIGH** | Add a "Research Methodology" line: "Design science research with iterative artifact development" or equivalent -- one sentence that signals methodological awareness. |
| **MEDIUM** | Add a brief literature positioning note: "Extends Boscovic et al. (permissioned Hyperledger Fabric) to public Ethereum with EIP-191 wallet-native consent" or similar. |
| **MEDIUM** | Add IRB status: "IRB protocol scaffolded; submission planned for [date] through [institution]." |
| **MEDIUM** | Describe what the /reviewer surface contains: "Structured walkthrough of six-layer thesis with on-chain verification, BHTY supporting data, and credential documentation." |
| **LOW** | Add a "Publications & Technical Reports" subsection if any exist beyond the BHTY paper. |
| **LOW** | Link to CSU Global degree verification or at minimum state expected conferral date more prominently. |

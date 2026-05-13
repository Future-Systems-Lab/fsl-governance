# Review 13: Legal/IP Agent — Intellectual Property and Legal Review

**Reviewer:** legal_ip_agent (Agent 13 of 17)
**Date:** 2026-05-13
**Document:** `~/fsl-governance/academic/BHTY_PAPER_v2.md`
**Focus:** Patent 64/063,037 reference accuracy, trademark 99533250 positioning, conflict of interest disclosure, IP exposure risk, assignment status implications

---

## VERDICT: ACCEPT WITH MINOR REVISIONS

## OVERALL

The paper navigates intellectual property disclosure with reasonable care. The IP header identifies both the provisional patent and trademark, the conflict of interest disclosure is present, and the code listings avoid proprietary implementation details. However, several IP-related risks require attention before publication: the patent filing date claim must be verified, the paper may disclose enough architectural detail to constitute prior art against the author's own patent claims, and the conflict of interest disclosure — while present — could be more prominent. The trademark positioning is appropriate. The paper's open-source stance (GitHub repository, IPFS-pinned manuscript, public contract addresses) creates a tension with patent protection that should be consciously managed.

---

## CRITICAL

1. **Patent filing date accuracy.** The header states "Patent: U.S. Provisional No. 64/063,037 (filed 11 May 2026)." If this paper is being prepared for submission on or around 2026-05-13, the filing date of 11 May 2026 is either very recent or potentially not yet filed at manuscript preparation time. **ACTION: Verify the patent was actually filed on or before the claimed date. If the provisional has not yet been filed, remove the filing date or state "filing pending." Claiming a filing date that has not occurred is a material misrepresentation in an academic publication and could affect patent prosecution.**

2. **IP exposure risk: paper as prior art against own patent.** This is the most significant IP concern. Publication of this paper creates prior art that could be cited against the author's own patent claims during prosecution. Specific risks:
   - The six-step authentication flow (Section 3.2) is described in detail sufficient for a person of ordinary skill to reproduce it.
   - The consent-as-authentication unification (Section 4) is the likely core patent claim, and it is thoroughly described.
   - The three-layer revocation model (Section 10.2) is specified in operational detail.
   - The AlchemistForge permissionless engagement pattern (Section 6.2) is fully described.

   Under 35 U.S.C. Section 102(b)(1)(A), the inventor's own disclosure creates a one-year grace period for filing a patent application. Since the provisional is claimed as filed 11 May 2026 and this paper is being prepared for submission around the same date, the timing is tight but potentially within the grace period — provided the provisional was filed before or on the same day as publication. **ACTION: Ensure the provisional patent application was filed BEFORE this paper is published or made publicly available (including IPFS pinning). The IPFS pin with CID already listed in the manuscript may constitute public disclosure if the pin is already live.**

---

## HIGH

3. **IPFS pinning as prior art trigger.** The data availability statement includes an IPFS CID: `QmNUhpwRPrZd5Vk6wLy4pAhFBz3fWYWntKkHC5LXMyCmXu` with gateway URLs. If this CID is already accessible (pinned and resolvable), the paper is already publicly available regardless of journal publication status. This means the prior art clock may have already started. Under AIA (America Invents Act) rules, a public disclosure by the inventor starts the one-year grace period under 35 U.S.C. Section 102(b)(1)(A). **ACTION: Confirm that the provisional patent application was filed before the IPFS pin became publicly accessible. If not, the one-year grace period starts from the IPFS pin date, not the journal publication date.**

4. **Trademark 99533250 positioning.** The header lists "Trademark: USPTO Serial No. 99533250 (Class 42, Live/Under Examination)." Class 42 covers "Scientific and technological services and research and design relating thereto." This is appropriate for a software/technology platform. The "Live/Under Examination" status is accurately reported as a current state. However, the paper does not use the TM or (R) symbol after "Future Systems Lab" or any platform names (EncryptHealth, HypnoNeuro, etc.) in the body text. If trademark protection is intended for the platform names, standard practice would be to mark the first use with TM. The absence of trademark marking does not affect legal rights (use-based rights exist regardless) but reduces notice to potential infringers. **RECOMMENDATION: Add TM to the first use of "Future Systems Lab" and each platform name, or add a blanket trademark notice in a footnote.**

5. **Conflict of interest disclosure: adequate but could be more prominent.** The disclosure at line 592 states: "The author is the founder, sole architect, and lead engineer of Future Systems Lab." This is accurate and transparent. However, it is located at the very end of the manuscript, after the references. BHTY may require the COI disclosure in a specific location. More importantly, the disclosure does not mention: (a) the patent application (which creates a financial interest in the paper's claims), (b) the trademark application, or (c) whether the author has any financial interest in the commercialization of the described system. **RECOMMENDATION: Expand the COI disclosure to: "The author is the founder, sole architect, and lead engineer of Future Systems Lab. The author holds a pending provisional patent (64/063,037) and trademark application (99533250) related to the described system. The author has a financial interest in the commercialization of the technology described in this paper."**

---

## MEDIUM

6. **Code listings: minimal IP exposure.** Listing 1 (EIP-191 verification pattern) uses standard ethers.js API calls — this is publicly available knowledge and does not expose proprietary implementation. Listing 2 (Solidity event signatures) shows event patterns that are already public on-chain (events are part of the contract ABI and visible on Sepolia). The paper correctly labels these as "patterns" rather than actual implementation code. **STATUS: PASS — no proprietary code exposed.**

7. **Revenue split disclosure.** Section 5.3 discloses the 70/27/3 revenue split (practitioner/FSL operations/BenevolenceFund). This is enforced by smart contract and publicly verifiable on-chain. However, disclosing the exact revenue model in an academic paper provides competitors with business model intelligence. From an IP perspective, revenue splits are not patentable, but they are competitively sensitive. The author should be aware that this disclosure is permanent (especially given IPFS pinning). **RISK: LOW — the information is already on-chain and publicly queryable.**

8. **Assignment status implications.** The patent header lists the author as the patent applicant. If FSL is a separate legal entity (LLC, corporation), the patent may need to be assigned from the individual inventor to the entity for proper IP protection. The paper does not indicate whether such an assignment has been executed. If the author is prosecuting the patent as an individual, this creates a gap between the IP owner (individual) and the commercial entity (FSL). **RECOMMENDATION: If an assignment is planned or executed, note it in the IP header or verify that the provisional names the correct applicant/assignee.**

---

## LOW

9. **Open-source repository reference.** The data availability statement references "github.com/Future-Systems-Lab" as the source code location. If the patent covers specific implementations, making the source code publicly available strengthens the prior art argument and may narrow the patent's enforceable scope. The author should ensure that the provisional patent claims are drafted broadly enough to survive the specific implementation disclosure. This is a patent prosecution concern, not a paper concern, but the paper's data availability statement makes it relevant.

10. **US Patent 12,235,984 comparison.** The paper compares FSL against US Patent 12,235,984 in Section 9. This comparison is appropriate for academic purposes and does not create freedom-to-operate issues (the comparison is factual and identifies differences). However, the comparison implicitly acknowledges awareness of the prior patent, which could be relevant in future patent prosecution if any of FSL's claims overlap with 12,235,984's claims. **RISK: LOW — the systems are architecturally distinct as described.**

11. **Nine contracts accurately claimed.** The paper consistently states nine contracts in the abstract and Section 7.1 table. This count is verifiable against the Sepolia deployment and matches the table contents. **STATUS: PASS.**

---

## DONE WELL

- **IP header is prominently placed.** Patent and trademark information appears on the first page, above the abstract, giving clear notice.
- **Code listings avoid proprietary disclosure.** Both listings show patterns, not implementation — a careful balance between academic transparency and IP protection.
- **Conflict of interest disclosure is present.** While it could be expanded, its existence is a positive.
- **"Outside HIPAA scope" framing avoids regulatory compliance claims.** The paper never claims HIPAA compliance, which would create legal obligations. The "outside scope" framing is legally defensible.
- **Smart contract addresses enable independent verification.** Public contract addresses on a public testnet allow reviewers to verify claims without accessing proprietary code.
- **Honest adoption framing.** The "architect-initiated, no organic adoption" disclosure prevents any fraud-on-the-patent-office risk that could arise from overclaiming user adoption metrics.

---

## UNIQUE PERSPECTIVE (Legal/IP)

The central IP tension in this paper is the simultaneous desire to publish (for academic credit and priority establishment) and to protect (via patent and trademark). The provisional patent provides a one-year window to file a non-provisional, but the detailed disclosure in this paper — combined with the IPFS pin and open-source repository — creates a body of prior art that will constrain the non-provisional's claim scope. The patent examiner will have access to this paper (it will be indexed and likely cited in prosecution) and will use it to evaluate whether the claims are novel and non-obvious. The author's best strategy is to ensure the provisional patent claims are at least as broad as the paper's disclosure — anything described in the paper but not claimed in the provisional may be difficult to add later. The timing is the most critical issue: the IPFS pin must not predate the provisional filing. If the CID listed in the manuscript was pinned before May 11, 2026, the paper constitutes prior art with a publication date before the filing date, which would complicate prosecution even under the inventor grace period (since the grace period runs from publication, not from filing, and the non-provisional must be filed within one year of publication). I strongly recommend the author confirm the chronological sequence: (1) provisional filed, (2) IPFS pinned, (3) paper submitted to BHTY.

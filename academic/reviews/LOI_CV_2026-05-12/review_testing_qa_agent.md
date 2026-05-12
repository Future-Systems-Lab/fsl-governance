# Testing/QA Agent Review — LOI + CV Package
**Date:** 2026-05-12
**Documents under review:**
- LOI: `academic/LOI_ASU_DEng_text.md`
- CV: `academic/CV_MegMontanezDavenport.html`

---

## LOI — Letter of Intent

### VERDICT: STRONG — ready for submission with minor corrections noted below.

### CRITICAL

- **Smart contract count discrepancy (LOI vs. CV vs. GitHub profile).** The LOI states "Eight smart contracts are live on Ethereum Sepolia testnet" (line 41). The CV lists eight named contracts with Blockscout links. However, the GitHub profile README (verified live) states "Nine Ethereum smart contracts deployed and verified on Sepolia." The LOI and CV are internally consistent at eight, but the live GitHub profile says nine. This needs to be reconciled across all three surfaces before submission. Whichever number is correct, all documents must agree.

- **Date on the LOI reads "January 2027"** (line 8) for a Spring 2027 application. Confirm this is the intended submission date. If the LOI is being submitted in 2026 for a Spring 2027 start, "January 2027" is plausible as the final submission window, but reviewers reading it in May 2026 may find it confusing.

### HIGH

- **Game count: LOI says "45 browser-based therapeutic games (15 per level across L1, L2, L3)."** The CV says "three flagship demos (one per level)" and describes the architecture as supporting "expansion to full catalog." These two statements are not contradictory, but an admissions reader could perceive a gap: is it 45 games or 3 demos? The LOI implies 45 exist; the CV clarifies 3 exist with architecture for 45. Recommend the LOI acknowledge "3 deployed, 45 architected" or similar honest phrasing to prevent the committee from reading the CV and questioning the LOI's claim.

### MEDIUM

- **"Sovereign Guide" vs. "Provider" terminology.** The LOI uses "Sovereign Guide" once (line 50, in the applied project research question about "Sovereign Guide participation") but also references "provider" language in the clinical narrative sections. The CV uses "provider" and "sovereign guides" in the credentialing section. Per project memory, user-facing copy should use "Sovereign Guides." This is largely consistent but worth a final pass to ensure the LOI narrative sections are aligned.

- **No explicit mention of limitations or risks in the LOI.** The LOI is honest about non-traditional credentials, the lack of prior computer experience, and the testnet-only deployment status. However, it does not explicitly name risks (e.g., testnet vs. mainnet, no IRB approval yet, no peer-reviewed publications yet). An admissions committee may appreciate a brief "limitations and next steps" framing. The honesty is implicit but could be made explicit.

### LOW

- **The LOI is long.** At approximately 3,200 words, it is a substantial read. The narrative structure is compelling and the emotional arc is purposeful, but some admissions committees have page limits. Confirm ASU DEng LOI length requirements.

- **Minor: "listing 1: AI Use Disclosure" referenced on line 61 but no listing content follows.** If this is meant to reference an appended disclosure, the appendix is not included in the reviewed file.

### DONE WELL

- **Narrative coherence is exceptional.** The LOI traces a single unbroken line from childhood trauma through clinical practice through EJ's death through FSL's creation through the DEng application. Every section earns the next.
- **Advisor selection is specific and well-researched.** Boscovic, Ahn, and Ghasemzadeh are named with specific research citations, thesis references, and lab affiliations. This is not generic "I want to work with your faculty" language.
- **The four research questions are concrete and testable.** They map directly to the FSL architecture, which gives the committee something tangible to evaluate.
- **Honest about non-traditional path.** Does not hide or apologize for credentials; instead frames them as assets.

### UNIQUE PERSPECTIVE (Testing/QA Lens)

The LOI functions as a system integration test: it claims a live, deployed, multi-component architecture exists and works. From a QA perspective, the testability of the LOI's claims is high — every major claim maps to a verifiable artifact (Blockscout links, GitHub repos, NPI lookup, USPTO serial number). This is unusual for an LOI. The risk is that any single broken link or mismatched number undermines the "it's live and it works" narrative that is central to the document's persuasive power. The contract count discrepancy (8 vs. 9) is the kind of inconsistency that a skeptical reviewer would notice.

---

## CV — Meg Montanez-Davenport

### VERDICT: STRONG — professionally designed, verifiable, with a few items to correct.

### CRITICAL

- **Smart contract count: CV lists 8 named contracts with links. GitHub profile says 9.** Same discrepancy noted in the LOI review. The CV names: HypnoNeuroToken, EHTv2, MindMasteryNFT, SovereignLedger, AlchemistForge, BenevolenceFund, SovereignAchievement, HNT v2. That is eight. If a ninth exists, it must be added. If the GitHub profile is wrong, it must be corrected.

- **OpenZeppelin PR #6414 is flagged by automated review (CodeRabbit) as having a mismatch between the PR description ("clarify ReentrancyGuard NatSpec") and actual content (only modifies README with an HTML comment).** This is the kind of thing an engineering faculty reviewer might check. If the PR is genuinely a documentation clarification, the changeset should match the description. Otherwise, listing it could backfire if scrutinized.

### HIGH

- **LinkedIn link text mismatch.** The `<a>` tag links to `linkedin.com/in/meg-monta%C3%B1ez-davenport-680652226/` but the visible display text reads `linkedin.com/in/dr-meg-montanez-davenport`. These are different URL slugs. The link itself appears to resolve (LinkedIn returned a 999 status which is their standard bot-block, not a 404), but the display text showing a different slug than the actual href is a verifiability issue. An admissions reviewer who types the display text into a browser will get a different result than clicking the link.

- **OpenMRS PR #594 is listed as "Open" in the CV but is actually Closed (closed without merge by maintainer jayasanka-sack on March 19, 2026).** The CV text says "Closed" for this PR, which is accurate. Confirmed consistent.

- **SunCodes date range: LOI says "2018-2023", CV says "2018-2024".** One-year discrepancy in the end date of SunCodes Holistic Health. Pick one and make both documents match.

- **Hyperledger Fabric PR #5419 has an unresolved DCO sign-off requirement.** A contributor flagged that the commit lacks a "signed-off-by" line. This is a process compliance issue that, if left unresolved, means the PR cannot be merged. Listing it as "Open" is accurate, but the committee may wonder why basic contribution requirements were not met.

### MEDIUM

- **Blockscout links are JavaScript-rendered pages.** All eight contract links point to valid Blockscout addresses, but the pages require JavaScript to render contract details. A reviewer opening these in a restricted browser or PDF reader will see blank pages. Consider adding contract names inline (which the CV already does — good) and optionally noting "verified on Blockscout" so the reader does not need to click to confirm.

- **americaoutloud.news returns 403 Forbidden on automated fetch.** The author archive page and individual article URLs are blocked by the site's bot protection. The URLs likely work in a normal browser, but automated verification is not possible. This is not a broken link — it is a site configuration issue — but it means these cannot be programmatically verified.

- **90-second skimmability test.** The CV is a two-column HTML layout with a dark sidebar. For print: the `@media print` styles are present but minimal. The CV is dense. A committee member skimming in 90 seconds will likely catch: the name, the summary paragraph, the Riccobene role with the 64% metric, the smart contract list, and the education section. The sprint-by-sprint breakdown (Sprints 1-7) under HypnoNeuro is detailed but may be too granular for a 90-second skim. Consider whether the sprint detail serves the admissions reader or whether a condensed version with a "full build log available at [link]" would be more effective.

- **Several certifications in the sidebar lack separator punctuation between the institution name and date** (e.g., line 187: `<strong>Certified Smart Contract Auditor</strong>Blockchain Council · Jan 2026` — missing a line break or separator after the closing `</strong>` tag). This is a rendering issue that may cause the cert name and institution to run together visually.

### LOW

- **The CV does not include a "References available upon request" line.** This is conventional but not required. Note for completeness.

- **Google Fonts dependency.** The CV loads three font families from Google Fonts. If rendered offline or in a restricted network, fallback fonts will apply. The fallback chain (`'DM Sans', sans-serif`) is reasonable.

- **The "NC Accident & Health Insurance Producer" certification lists "Pre-licensing completed Apr 2026, exam scheduled."** If the exam has been taken by submission time, update. If not, this is honest and appropriate.

### DONE WELL

- **Every major claim is hyperlinked to a verifiable source.** Smart contracts link to Blockscout. PRs link to GitHub. Publications link to the publication site. This is unusually strong for an academic CV.
- **The Riccobene section is the standout for an engineering management program.** Concrete metrics (64% growth, $380K to $624K, 30.4% to 38.1% share), a clear system design narrative, and a multi-year engagement. This is the most "engineering management" content on the CV and it lands well.
- **Professional visual design.** The two-column layout with teal accent color, monospace date labels, and organized sidebar sections is polished. It communicates technical competence through its own presentation.
- **Intellectual property section is well-placed and concise.** Patent application, trademark, NPI, and EIN all in one block.

### UNIQUE PERSPECTIVE (Testing/QA Lens)

The CV is a living test harness. Every link is a test case. The strength of this CV is that it invites verification — and mostly passes. The failures are edge cases (LinkedIn display text mismatch, one PR with a content/description mismatch, the 8-vs-9 contract count). The risk profile is that this CV actively encourages a technically sophisticated reviewer to click through and verify, which means any single broken or inconsistent artifact carries disproportionate weight. The QA recommendation is: before submission, click every link in a clean browser session, verify every number matches across LOI/CV/GitHub, and resolve the open PR compliance issues (Hyperledger DCO, OpenZeppelin content mismatch) or remove those PRs from the CV.

---

## Cross-Document Consistency Summary

| Claim | LOI | CV | Live Source | Status |
|---|---|---|---|---|
| Smart contract count | 8 | 8 (named) | GitHub profile says 9 | MISMATCH |
| Game count | 45 (15 per level) | 3 demos (architecture for full catalog) | -- | NEEDS ALIGNMENT |
| SunCodes date range | 2018-2023 | 2018-2024 | -- | MISMATCH |
| Riccobene dates | 2019-2025 | 2019-2025 | -- | MATCH |
| Riccobene metrics | 64%, $380K-$624K, 30.4%-38.1% | Same | -- | MATCH |
| NPI number | 1497696264 | 1497696264 | -- | MATCH |
| USPTO serial | 99533250 | 99533250 | -- | MATCH |
| Patent app number | 64/063,037 | 64/063,037 | -- | MATCH |
| Advisor names | Boscovic, Ahn, Ghasemzadeh | Referenced in pub descriptions | -- | MATCH |
| BS MIS institution | Colorado State University Global | CSU Global | -- | MATCH |
| D.N.Psy. institution | Kingdom College of Natural Health | Kingdom College of Natural Health | -- | MATCH |
| Email | future.systems.lab@proton.me | Both emails listed | -- | MATCH |

---

## Action Items (Priority Order)

1. **Reconcile contract count across LOI, CV, and GitHub profile (8 vs. 9).**
2. **Fix LinkedIn display text to match actual href slug.**
3. **Align SunCodes end date (2023 vs. 2024) across LOI and CV.**
4. **Clarify game count in LOI (45 architected vs. 3 deployed).**
5. **Fix certification sidebar punctuation/spacing in CV HTML.**
6. **Evaluate whether OpenZeppelin and Hyperledger PRs should remain on CV given open compliance/content issues.**
7. **Confirm LOI date ("January 2027") is appropriate for the submission timeline.**
8. **Verify AI Use Disclosure appendix is attached or included.**

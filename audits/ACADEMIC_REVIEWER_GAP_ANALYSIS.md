# Academic Reviewer Gap Analysis -- FSL Command Center

**Audit Sections:** 2 (Gap Inventory) + 3 (Reviewer Experience Recommendations)
**Date:** 2026-04-29
**Auditor:** Automated analysis of `index.html` (public landing) and `api/dashboard-content.js` (gated dashboard)
**Command Center Version:** v7
**Scope:** Readiness for ASU DEng admissions reviewers, faculty, IP counsel, grant reviewers, BHTY paper reviewers

---

## Section 2: Gap Inventory

### Category A: Artifact Evidence

| # | Item | Present | Quality | Location | Gap |
|---|------|---------|---------|----------|-----|
| A1 | Live deployed contract links (Blockscout/Etherscan for all 8 v2 Sepolia contracts) | **Yes** | Strong | `index.html:195-202` -- all 8 contracts with Blockscout links | All 8 contracts listed with addresses and direct Blockscout explorer links. Links use `eth-sepolia.blockscout.com`. No Etherscan mirror links provided (minor). |
| A2 | On-chain transaction provenance (deployment tx hashes, sample events) | **No** | Absent | -- | No deployment tx hashes shown anywhere. No sample event logs or transaction examples. A reviewer cannot verify *when* contracts were deployed or see sample interactions without manually searching Blockscout. |
| A3 | IPFS-pinned methodology document CIDs | **Yes** | Strong | `dashboard-content.js:345` (FSL_METHODOLOGY CID) + 16 other document CIDs at lines 331-347 | FSL_METHODOLOGY is explicitly pinned (`bafkreihzetzx...`). 17 document CIDs total plus 3 platform CIDs. All have Pinata gateway links. However, methodology CID is **only visible in the gated dashboard**, not on the public landing page. |
| A4 | 8 OSS PRs with merge status and direct GitHub links | **Partial** | Needs work | `index.html:144-151` | All 8 PRs listed with direct GitHub links. However, every PR shows status "Submitted" -- no distinction between merged, open, closed, or stale. An academic reviewer needs actual merge status (merged/open/closed) to evaluate community acceptance. |
| A5 | Gitea mirror reference (git.futuresystemslab.io) | **Yes** | Adequate | `index.html:131` | Listed in the Academic Reviewer Note section with a direct link. |
| A6 | Smart contract audit/scan results | **Partial** | Honest but incomplete | `index.html:205`, `dashboard-content.js:198,544` | States "Mainnet requires security audit" (index.html:205). Dashboard lists "Smart contracts -> Ethereum mainnet (audit required)" as not started, and budgets $2K-5K for security audit. Honest disclosure, but no mention of automated scan results (Slither, MythX) or any preliminary analysis. |

**Category A Summary:** Contract addresses and IPFS CIDs are well-documented. Critical gaps: no deployment tx hashes, no actual PR merge statuses, no preliminary security scan results, and methodology CID is gated behind wallet auth.

---

### Category B: Research Documentation

| # | Item | Present | Quality | Location | Gap |
|---|------|---------|---------|----------|-----|
| B1 | BHTY paper draft link or reference | **No** | Absent | -- | No reference to a BHTY paper, conference submission, or working paper anywhere in either file. |
| B2 | IRB protocol scaffold mention | **No** | Absent | -- | No mention of IRB, Institutional Review Board, human subjects protocol, or ethics review anywhere. If participant data collection is planned, reviewers will expect at least a scaffold or exemption rationale. |
| B3 | Case Study Participant #1 (Dr. Meg as N=1) documentation | **No** | Absent | -- | No mention of Dr. Meg as first participant, N=1 case study, or self-experimentation documentation. The "120 rows" of database data could be this, but it is not framed as research evidence. |
| B4 | Methodology description ("how the system was built") | **Yes** | Present but gated | `dashboard-content.js:345` (IPFS CID), `index.html:109` (framing) | The public page states "the deployed system IS the research contribution; the Research Document formalizes methodology, results, and generalizability" (line 109). An FSL_METHODOLOGY document is IPFS-pinned. However, neither file contains an inline methodology summary. Reviewers must click through to IPFS to read it. |
| B5 | "The deployed system IS the research contribution" framing | **Yes** | Strong | `index.html:109` | Explicitly stated in the Academic Reviewer Note section. Clear praxis-track framing. |
| B6 | Research Document vs. thesis terminology | **Yes** | Correct | `index.html:107-109` | Uses "Applied Project" and "Research Document" -- correct DEng terminology. Does not use "thesis" or "dissertation." |

**Category B Summary:** Academic positioning language is correct. Major gaps: no BHTY paper reference, no IRB mention, no N=1 case study framing. Methodology exists as IPFS document but is not summarized inline for reviewers.

---

### Category C: Academic Positioning

| # | Item | Present | Quality | Location | Gap |
|---|------|---------|---------|----------|-----|
| C1 | ASU DEng application status (target enrollment, priority deadline) | **Yes** | Strong | `index.html:110` | "Spring 2027 (priority deadline October 1, 2026)" clearly stated. |
| C2 | LOI link | **No** | Absent | -- | The dashboard footnote at line 531 mentions "ASU DEng LOI + CV finalized" but no link to the LOI is provided anywhere. The public landing has no LOI link. |
| C3 | CV link (current version) | **Yes** | Strong | `index.html:129` | Direct link to `Future-Systems-Lab-profile/CV_MegMontanezDavenport.html` in the Academic Reviewer Note resource table. |
| C4 | BS MIS conferment status (July 2026, GPA 3.94) | **Yes** | Strong | `index.html:110` | "BS MIS from CSU Global confers July 2026 (GPA 3.94, direct-qualifying applicant)" clearly stated. |
| C5 | Math prerequisites cleared (Calc I/II, Linear Algebra, Statistics, Python) | **No** | Absent | -- | No mention of specific math prerequisites anywhere. A reviewer checking DEng admissions requirements would want to see these satisfied. |
| C6 | Practitioner credentials (D.N.Psy., BCHN, CBHP, NPI 1497696264) | **Yes** | Strong | `index.html:374` (footer), `dashboard-content.js:368,574` | Footer: "Dr. Meg Montanez-Davenport, D.N.Psy., BCHN, CBHP". NPI 1497696264 listed in legitimacy section (index:364) and dashboard infrastructure section. Taxonomy code 175F00000X included. |
| C7 | Faculty alignment (Boscovic primary, Ahn + Ghasemzadeh co-advisors) | **Yes** | Strong | `index.html:113-116` | All three named with rationale. Boscovic linked to ASU Blockchain Research Laboratory and Vishnoi MedFabric4Me thesis. Ahn linked to Zero Trust. Ghasemzadeh linked to wearable sensors. |

**Category C Summary:** Strong academic positioning overall. Gaps: no LOI link (despite being finalized) and no math prerequisite documentation.

---

### Category D: IP and Governance

| # | Item | Present | Quality | Location | Gap |
|---|------|---------|---------|----------|-----|
| D1 | USPTO Class 42 Serial 99533250 status | **Yes** | Strong | `index.html:365`, `dashboard-content.js:579` | Serial number, filing date (Dec 6, 2025), class, and current status ("Pending" on public, "Under Review -- Office Action response filed 2026-04-20" on dashboard). |
| D2 | Class 35 + Class 44 planned filings | **Yes** | Adequate | `dashboard-content.js:369,580-581` | Dashboard lists both: Class 35 (marketplace/directory, post-Class 42 clearance) and Class 44 (Naturopathic Psychology and Hypnosis Center, before practitioner onboarding). Not visible on public landing page. |
| D3 | Wyoming LLC EIN 42-2050630 | **Yes** | Strong | `index.html:363`, `dashboard-content.js:368,521` | Listed in both public legitimacy section and dashboard. Confirmed status shown. |
| D4 | Trademark notice | **Partial** | Needs work | `index.html:365` | Serial number and filing date shown, but no standard TM symbol applied to "Future Systems Lab" in headers or navigation. No trademark notice footer text (e.g., "FUTURE SYSTEMS LAB is a trademark of Future Systems Lab LLC"). |
| D5 | Reviewer access terms or NDA language | **No** | Absent | -- | No reviewer-specific access terms, NDA language, confidentiality notice, or "this material is shared under academic review privilege" language anywhere. The wallet gate exists but there is no explicit reviewer tier or terms. |

**Category D Summary:** Core IP documentation is solid. Gaps: no TM symbol usage, planned filings only visible on gated dashboard, and no reviewer access terms.

---

### Category E: Infrastructure Transparency

| # | Item | Present | Quality | Location | Gap |
|---|------|---------|---------|----------|-----|
| E1 | 17-agent pipeline description or diagram | **Partial** | Functional but no diagram | `dashboard-content.js:204-206` | Dashboard section "Agent Gateway -- 17 agents" with a clickable grid (agent-grid div populated by JS). Individual agent modals with roles, responsibilities, and approval chains. However, no architectural diagram showing agent interactions, pipeline flow, or decision topology. Public page only mentions "17 AI Agents" as a stat number. |
| E2 | Pre-mainnet readiness gates (5/13 status) | **Partial** | Scattered | `dashboard-content.js:160-202` | Decentralization layer items listed as Done/Not Started. 8 items completed, 5 not started. But there is no explicit "mainnet readiness gate" checklist with a clear denominator (e.g., "5 of 13 gates passed"). Reviewers must count manually. |
| E3 | Decentralization scorecard | **No** | Absent | -- | No formal scorecard. The decentralization items are listed as a table but not scored, weighted, or tracked against a target. The DECENTRALIZATION_ROADMAP.md is linked (index.html:355) but not summarized inline. |
| E4 | Threat model / security posture | **No** | Absent | -- | No threat model, attack surface analysis, or security posture document referenced. SECURITY.md exists in the repo root but is not linked from either page. Weekly GitHub Actions security scan is mentioned (dashboard-content.js:262) but no results shown. |
| E5 | Architectural decision records (why EIP-191, why Sepolia, why no PHI, why Brave Wallet) | **Partial** | Implicit only | `index.html:87`, `dashboard-content.js:137-156` | Auth flow table explains EIP-191 flow mechanically. "Zero custodial SDKs" and "Zero relay servers" noted. Brave Wallet recommended in wallet hint (index.html:92). But no explicit ADR-style "we chose X because Y" documents. The *what* is documented; the *why* is scattered in descriptive text, not in a reviewable decision log. |

**Category E Summary:** Operational infrastructure is well-documented for an admin. Major gaps for academic review: no architecture diagram, no formal readiness gate tracker, no decentralization scorecard, no threat model, and no structured ADRs.

---

### Category F: Reproducibility

| # | Item | Present | Quality | Location | Gap |
|---|------|---------|---------|----------|-----|
| F1 | Public contract addresses + ABIs | **Partial** | Addresses only | `index.html:195-202` | All 8 contract addresses listed with Blockscout links. However, no ABIs are provided or linked. A reviewer wanting to call `read` functions must extract ABIs from Blockscout manually. No link to a contract registry JSON or ABI directory. |
| F2 | "How to verify" walkthrough for reviewers | **No** | Absent | -- | No step-by-step verification guide. No instructions like "install Brave, visit Blockscout, paste address, check Functions tab." A non-blockchain-native reviewer (e.g., faculty) would not know how to verify claims. |
| F3 | Sample read-only interaction instructions | **No** | Absent | -- | No sample `eth_call` instructions, no "try calling balanceOf()" walkthrough, no screenshots of expected Blockscout output. |
| F4 | Blockscout/Etherscan links to specific transaction evidence | **Partial** | Links to addresses only | `index.html:195-202`, `dashboard-content.js:418-424` | Links go to contract *addresses* on Blockscout, not to specific transactions. No deployment tx links, no sample event links, no "here is proof this contract was deployed on date X" evidence. |

**Category F Summary:** Contract addresses are public and linked. Critical gap: no reviewer verification walkthrough, no ABIs, no transaction-level evidence, no sample interactions. A non-technical reviewer cannot independently verify any claim.

---

## Section 3: Recommended Structure for Academic Reviewer Experience

### 3.1 Should there be a separate public reviewer summary?

**Yes -- strongly recommended.** The current architecture splits content between:
- Public landing (`index.html`): Contains contract addresses, OSS PRs, academic framing, and ecosystem stats. Does NOT contain IPFS CIDs, methodology doc, agent details, IP filings beyond Class 42, or infrastructure architecture.
- Gated dashboard (`dashboard-content.js`): Contains the full evidence portfolio but requires wallet authentication.

**Problem:** An ASU admissions reviewer, grant panel member, or faculty evaluator will not have a configured Ethereum wallet. They will see only the public landing page, which is missing critical evidence (IPFS methodology CID, full IP portfolio, agent architecture, decentralization status). The gated dashboard is designed for operational administration, not academic review.

**Recommendation:** Create a dedicated `/reviewer` or `/academic` public page (no wallet required) that presents:
1. The Academic Reviewer Note (already exists at index.html:105-135)
2. Evidence table with all 8 contract addresses + deployment tx hashes + Blockscout links
3. IPFS methodology document CID with direct gateway link (currently gated)
4. OSS PR table with actual merge status (merged/open/closed)
5. One-page "How to Verify" walkthrough for non-technical reviewers
6. CV + LOI links
7. Faculty alignment rationale (already exists)
8. Pre-mainnet readiness status as a clear gate checklist
9. Honest security posture statement

This page should be linkable in the ASU application, LOI, grant proposals, and paper submissions.

### 3.2 Should faculty get a read-only wallet tier?

**Not yet -- but plan for it.** The current wallet gate is binary: either you are the admin wallet (`0x7394...BCC3`) or you are locked out. For the current stage (pre-enrollment, pre-IRB), this is acceptable.

**When a faculty tier becomes necessary:**
- Upon ASU enrollment (January 2027) when Boscovic, Ahn, or Ghasemzadeh need to inspect the live system
- During IRB protocol review if reviewers need to see the data flow
- During DEng committee reviews of the Applied Project

**Recommended implementation when needed:**
- Add a `reviewer` tier to the JWT auth system (currently only `admin` exists)
- Map specific wallet addresses to the reviewer tier in the allow-list
- Reviewer tier shows: evidence portfolio, contract state, agent status, IPFS docs
- Reviewer tier hides: runbooks, SSH credentials, PM2 commands, funding details, outreach targets
- Alternative: generate time-limited read-only links (no wallet required) for committee review sessions

### 3.3 What is the minimum viable reviewer surface?

The minimum viable academic reviewer surface requires fixing the following gaps **before the October 1, 2026 priority deadline**:

**Must-have (blocks application credibility):**
1. LOI link added to public page (reportedly finalized but not linked)
2. OSS PR merge statuses updated (currently all say "Submitted" -- some may be merged or closed)
3. Deployment tx hashes for all 8 contracts (proves when they were deployed)
4. IPFS methodology CID moved to public page (currently gated)
5. "Pre-mainnet, not yet formally audited" honest security statement (present in scattered form but needs a clear single statement)
6. Math prerequisite documentation (Calc I/II, Linear Algebra, Statistics, Python)

**Should-have (strengthens reviewer confidence):**
7. "How to Verify" one-page walkthrough for non-blockchain-native reviewers
8. N=1 case study framing (Dr. Meg as first participant) with data summary
9. IRB protocol scaffold or exemption rationale
10. Formal decentralization readiness scorecard (X of Y gates passed)
11. At least one ADR document (why EIP-191, why Sepolia testnet, why no PHI on-chain)
12. Contract ABIs linked or embedded

**Nice-to-have (differentiates for competitive admission):**
13. BHTY or working paper draft reference
14. Threat model summary
15. Architecture diagram for 17-agent pipeline
16. TM symbol applied consistently to "Future Systems Lab"
17. Dedicated `/reviewer` page consolidating all evidence

**Timeline recommendation:** Items 1-6 are documentation-only changes achievable in a single sprint. Items 7-12 require modest content creation. Items 13-17 are stretch goals. All must-haves should be complete before the LOI is submitted or the October 1, 2026 deadline, whichever comes first.

---

## Appendix: File Reference

| File | Role | Lines Audited |
|------|------|---------------|
| `/tmp/cc-academic/index.html` | Public landing page (no auth) | 1-448 (full) |
| `/tmp/cc-academic/api/dashboard-content.js` | Gated dashboard content (JWT required) | 1-612 (full) |
| `/tmp/cc-academic/ecosystem.html` | Ecosystem pitch page | 1-50 (header only) |
| `/tmp/cc-academic/docs/` | Supporting docs (7 files) | Filenames only |

---

*This is a report-only audit. No changes were made to the codebase.*
*Audited 2026-04-29 by automated analysis.*

# Consolidated Recommendations -- FSL Command Center 6-Agent Review

**Date:** 2026-05-14
**Surface:** fsl-command-center.vercel.app (index.html)
**Reviewers:** Academic, Blockchain/Security, Healthcare/Credentials, IP/Legal, Partner/Collaborator, UX/Navigation

---

## EXECUTIVE SUMMARY

The Command Center is a strong single-page evidence surface that successfully presents FSL's scope, technical artifacts, and honest Phase 1 framing. The core strengths are: all 9 contracts with Blockscout links, IPFS-anchored BHTY paper, explicit testnet disclosure, clear IP filings, and a functional sticky nav. The primary gaps cluster around three themes: (1) missing explanatory depth for the six-layer thesis and security model, (2) credentials and legitimacy information buried too deep, and (3) structural HTML/CSS issues that break layout consistency.

---

## CRITICAL (Fix before next external review)

| # | Recommendation | Source Agent(s) | Effort |
|---|---------------|-----------------|--------|
| C1 | **Six-layer thesis framework needs visual structure.** The six layers (Financial, Identity, Governance, Compliance, Therapeutic, Research) are buried in a paragraph. Add a 6-card grid or structured table with 1-2 bullets per layer. This is the intellectual backbone of the DEng application. | Academic | Medium |
| C2 | **Credentials must appear above the fold.** "Dr. Meg Montanez-Davenport, D.N.Psy., BCHN, CBHP" is only in the footer. Add to the hero subtitle or the academic reviewer note. Healthcare reviewers and academic evaluators look for this first. | Healthcare, UX | Small |
| C3 | **Security/trust model disclosure.** Add a subsection disclosing: (a) all contracts deployed from a single EOA, (b) no multisig successor yet (or plans for one), (c) which contracts are owner-controlled vs permissionless. Technical evaluators will flag this immediately if absent. | Blockchain/Security | Medium |
| C4 | **Fix container div -- Verify and Evidence sections render outside 1200px max-width.** The closing `</div>` for `.container` is at line 382 but sections continue after it. These sections have no width constraint on large screens. | UX | Small |
| C5 | **Add patent scope description.** The provisional application number is listed but no reviewer can tell what it covers. Add 1-2 sentences: "Covers [method/system for X]." Patent attorneys cannot evaluate an application number alone. | IP/Legal | Small |

---

## HIGH (Fix before ASU October 2026 deadline)

| # | Recommendation | Source Agent(s) | Effort |
|---|---------------|-----------------|--------|
| H1 | Add BHTY paper abstract (3-5 sentences) directly on the page with author, keywords, and target journal name. | Academic | Small |
| H2 | Name 2-3 target journals/conferences (e.g., IEEE Blockchain, JMIR Mental Health, Blockchain in Healthcare Today). | Academic | Small |
| H3 | Add deployer wallet address to the contracts section. It is already public on-chain. | Blockchain/Security | Small |
| H4 | Add access control labels to the contracts table: "Owner-controlled" vs "Permissionless" column or tags. | Blockchain/Security | Small |
| H5 | Add XRPL evidence: at minimum one address or transaction hash with explorer link. "Dual-chain" is claimed but only Ethereum is demonstrated. | Blockchain/Security, Partner | Medium |
| H6 | Define the "Sovereign Guide" model: 2-3 sentences on scope, differentiation from licensed clinical practice, and regulatory positioning. | Healthcare | Small |
| H7 | Add professional affiliations (ISOM, NANP, etc.) and hyperlink NPI to NPPES lookup. | Healthcare | Small |
| H8 | Add USPTO hyperlinks for both trademark serials and the patent application. Name the actual trademark word marks. | IP/Legal | Small |
| H9 | Add nav links for Legitimacy, Verify, and Evidence sections. Currently unreachable from the sticky nav. | UX | Small |
| H10 | Renumber sections sequentially (01-13) or remove numbering. Gaps (06->08->12->unnumbered) look unfinished. | UX | Small |
| H11 | Add "Collaboration Opportunities" section listing partnership types sought (biosensor, academic, XRPL, game dev). | Partner | Medium |
| H12 | Add architecture diagram or text-based component map showing platform/contract/IPFS/auth relationships. | Partner | Medium |

---

## MEDIUM (Improve before Q3 2026 BHTY submission)

| # | Recommendation | Source Agent(s) | Effort |
|---|---------------|-----------------|--------|
| M1 | Add research methodology line: "Design science research with iterative artifact development" or equivalent. | Academic | Small |
| M2 | Add literature positioning note referencing Boscovic et al. and relevant prior work. | Academic | Small |
| M3 | Add IRB status statement. | Academic | Small |
| M4 | Describe /reviewer surface contents before the user clicks through. | Academic | Small |
| M5 | Add smart contract verification status (source verified on Blockscout: yes/no). | Blockchain/Security | Small |
| M6 | Add audit status disclosure (no third-party audit; automated analysis status). | Blockchain/Security | Small |
| M7 | Explain IPFS pinning strategy (provider, redundancy, monitoring). | Blockchain/Security | Small |
| M8 | Add credential verification links or name issuing bodies for D.N.Psy., BCHN, CBHP. | Healthcare | Small |
| M9 | Strengthen educational/non-clinical boundary for game descriptions. | Healthcare | Small |
| M10 | Clarify AlchemistForge as "Jungian-inspired personal development" vs "shadow work" if non-clinical. | Healthcare | Small |
| M11 | Add inventor name to patent listing. | IP/Legal | Small |
| M12 | State open-source license for FSL repos and confirm no patent conflict. | IP/Legal | Small |
| M13 | Add LLC formation date or link to Wyoming SOS business search. | IP/Legal | Small |
| M14 | Add team/org structure: solo founder + AI council if that is the reality. | Partner | Small |
| M15 | Add on-chain activity metrics (testnet txns, sessions attested, tokens minted). | Partner | Medium |
| M16 | Clarify Gitea vs GitHub relationship. | Partner | Small |
| M17 | Verify /reviewer route is live on Vercel; fix or remove if 404. | UX | Small |
| M18 | Add "Back to Top" button. | UX | Small |
| M19 | Fix wallet hint popup positioning (hardcoded margin-top:220px is brittle). | UX | Small |
| M20 | Move Legitimacy Indicators higher in page order (before or after Disclaimer). | UX | Small |

---

## LOW (Polish items)

| # | Recommendation | Source Agent(s) | Effort |
|---|---------------|-----------------|--------|
| L1 | Add "Publications & Technical Reports" subsection. | Academic | Small |
| L2 | Link to CSU Global degree verification. | Academic | Small |
| L3 | Add brief EIP-191 auth explainer for non-technical reviewers. | Blockchain/Security | Small |
| L4 | Mention canonical config sync mechanism visibly. | Blockchain/Security | Small |
| L5 | Add brief practice history summary visible on page (not just CV link). | Healthcare | Small |
| L6 | Add informed consent model reference for game participation. | Healthcare | Small |
| L7 | Add NDA/confidentiality note to reviewer access section. | IP/Legal | Small |
| L8 | Add trademark status stages (Filed/Examined/Published/Registered). | IP/Legal | Small |
| L9 | Add 2-minute demo video or walkthrough link. | Partner | Medium |
| L10 | Add revenue model or sustainability statement. | Partner | Small |
| L11 | Add quick-restore/emergency buttons to footer if part of design. | UX | Small |
| L12 | Consider mobile-friendly contracts display (stacked cards vs table). | UX | Medium |
| L13 | Reduce hero text density (consolidate testnet badge + wallet notice). | UX | Small |

---

## IMPLEMENTATION PRIORITY ORDER

For maximum impact with minimum effort, address in this order:

1. **C2 + C4** (small fixes, big impact) -- Credentials above fold + container div fix
2. **C5 + H8** (small fixes) -- Patent scope + USPTO links
3. **C1** (medium effort) -- Six-layer thesis visual framework
4. **C3** (medium effort) -- Security/trust model disclosure
5. **H9 + H10** (small fixes) -- Nav links + section renumbering
6. **H1 + H2** (small fixes) -- BHTY abstract + journal targets
7. **H3 + H4** (small fixes) -- Deployer address + access control labels
8. **H5** (medium effort) -- XRPL evidence
9. **H6 + H7** (small fixes) -- Sovereign Guide definition + affiliations
10. **H11 + H12** (medium effort) -- Partner section + architecture diagram

---

## FILES IN THIS REVIEW

| File | Agent |
|------|-------|
| `01_ACADEMIC_REVIEWER_AGENT.md` | Academic Reviewer |
| `02_BLOCKCHAIN_SECURITY_AGENT.md` | Blockchain/Security |
| `03_HEALTHCARE_CREDENTIALS_AGENT.md` | Healthcare/Credentials |
| `04_IP_LEGAL_AGENT.md` | IP/Legal |
| `05_PARTNER_COLLABORATOR_AGENT.md` | Partner/Collaborator |
| `06_UX_NAVIGATION_AGENT.md` | UX/Navigation |
| `CONSOLIDATED.md` | This file |

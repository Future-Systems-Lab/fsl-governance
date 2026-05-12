# FSL Aggregate Review -- All Documents & Surfaces
**Date:** 2026-05-12
**Scope:** BHTY paper + LOI + CV + 7 public surfaces

---

## A. UNIVERSAL BLOCKERS (appear across 2+ review passes)

### U1. Smart contract count inconsistency (8 vs. 9)
- **Appears in:** BHTY paper, LOI, CV, fsl-governance README, Command Center
- **Details:** The BHTY paper abstract says 9 contracts; Sections 8 and 9.1 say 8. The LOI and CV both say 8. The governance README lists 8 (with stale addresses). The Command Center shows only 5. The canonical registry has 9 active contracts.
- **Impact:** This is the single most pervasive inconsistency across the entire FSL document and surface ecosystem. A reviewer, auditor, or grant evaluator checking any two sources will find a contradiction.
- **Fix:** Confirm canonical count is 9. Update BHTY Sections 8 and 9.1 ("Eight" to "Nine"), LOI, CV, README contract table, and Command Center to all reflect 9.

### U2. fsl-governance README contract table is severely stale
- **Appears in:** Public Surfaces review (CRITICAL), BHTY review (implicit -- paper references on-chain state), LOI/CV review (contract count mismatch)
- **Details:** 5 of 8 entries in the README contract table point to deprecated v1 addresses or retired stubs. The banned name "PractitionerAchievement" appears. Missing SovereignSession and NeuroBalanceConsent.
- **Impact:** The README is the canonical registry of record for external parties. Every other document and surface that correctly uses v2 addresses is undermined by this single stale table.
- **Fix:** Replace the README contract table with the canonical v2 table from `contracts/DEPLOYED_CONTRACTS.md`. 10 minutes.

### U3. "Sovereign Guide" terminology incomplete across documents
- **Appears in:** LOI/CV review (3 FSL-context violations in CV), Public Surfaces review (no violations found but "Sovereign Guide" also does not appear positively)
- **Details:** CV uses "provider" in three FSL-context descriptions: "Provider Portal," "provider-facilitated video sessions," "4-tier provider credentialing system." These should read "Sovereign Guide." Live surfaces correctly avoid "provider" but also do not use "Sovereign Guide" -- latent risk if practitioner roles are added later.
- **Fix:** Find-and-replace the 3 CV instances. Pre-load "Sovereign Guide" into surface templates. 5 minutes for CV.

### U4. Figures/content not fully verifiable across surfaces
- **Appears in:** BHTY review (figures captioned but not embedded), Public Surfaces review (Command Center truncated, encrypthealth.io and sovereignledger.io empty)
- **Details:** BHTY Figures 1-4 must accompany the manuscript as separate files. Command Center HTML was truncated at CSS. encrypthealth.io and sovereignledger.io returned no auditable content.
- **Impact:** Incomplete submission (BHTY) or incomplete audit (surfaces) prevents full verification.
- **Fix:** Confirm BHTY figure files exist. Re-scrape three surfaces with full DOM capture.

---

## B. DOCUMENT-SPECIFIC BLOCKERS

### BHTY Paper v2

| ID | Issue | Severity | Est. Fix Time |
|----|-------|----------|---------------|
| B-1 | Contract count: "Eight" in Sections 8 and 9.1, should be "Nine" | CRITICAL | 2 min |
| B-2 | MindMasteryNFT reference [32] is ERC-721 but description says ERC-1155; should cite [33] | CRITICAL | 5 min |
| B-3 | No quantitative deployment data (gas costs, latency, transaction counts) | HIGH | 1-2 hr |
| B-4 | Figures 1-4 captioned but not embedded; files must exist for submission | HIGH | 30 min to verify |

### LOI

| ID | Issue | Severity | Est. Fix Time |
|----|-------|----------|---------------|
| L-1 | "45 browser-based therapeutic games" -- actual count is 3 demos | CRITICAL | 10 min |
| L-2 | Header date "January 2027" -- should match actual submission date | HIGH | 2 min |
| L-3 | SunCodes end date "2018-2023" vs. CV's "2018-2024" | HIGH | 5 min |
| L-4 | Riccobene "pandemic-driven shortages" referenced in 2019; pandemic began 2020 | HIGH | 5 min |

### CV

| ID | Issue | Severity | Est. Fix Time |
|----|-------|----------|---------------|
| C-1 | BS MIS listed as "Conferred July 2026" -- should be "Expected July 2026" if submitting before conferral | HIGH | 2 min |
| C-2 | 3 instances of "provider" in FSL context should be "Sovereign Guide" | HIGH | 5 min |
| C-3 | LinkedIn display text does not match actual href slug | HIGH | 3 min |
| C-4 | OpenZeppelin PR #6414 has CodeRabbit flag; Hyperledger PR #5419 has unresolved DCO | MEDIUM | 15 min |

### Public Surfaces

| ID | Issue | Severity | Est. Fix Time |
|----|-------|----------|---------------|
| S-1 | README contract table: 5 of 8 entries are deprecated v1 addresses/stubs | CRITICAL | 10 min |
| S-2 | Command Center: wrong HNT address, "ClaimChain" name, missing contracts/agents | CRITICAL | 30 min |
| S-3 | encrypthealth.io and sovereignledger.io not auditable | CRITICAL | 1 hr |
| S-4 | Trademark 99533250 absent from every surface | HIGH | 30 min |
| S-5 | Banned term "PractitionerAchievement" in README | HIGH | 5 min |

---

## C. UNIFIED QUICK-FIX QUEUE (ranked by severity, estimated time)

| # | Fix | Document/Surface | Severity | Est. Time |
|---|-----|-----------------|----------|-----------|
| 1 | Rewrite "45 games" to "3 demos with architecture for expansion" in LOI | LOI | CRITICAL | 10 min |
| 2 | Replace README contract table with canonical v2 from DEPLOYED_CONTRACTS.md | fsl-governance README | CRITICAL | 10 min |
| 3 | Change "Eight" to "Nine" in BHTY Sections 8 and 9.1 | BHTY paper | CRITICAL | 2 min |
| 4 | Fix MindMasteryNFT ERC reference ([32] to [33]) in BHTY | BHTY paper | CRITICAL | 5 min |
| 5 | Reconcile SunCodes end date across LOI and CV | LOI + CV | CRITICAL | 5 min |
| 6 | Reconcile smart contract count to 9 across all documents and surfaces | ALL | CRITICAL | 15 min |
| 7 | Update Command Center data (HNT address, ClaimChain rename, missing contracts/agents) | Command Center | CRITICAL | 30 min |
| 8 | Re-scrape encrypthealth.io and sovereignledger.io; audit for patent + lexicon | Live sites | CRITICAL | 1 hr |
| 9 | Correct LOI header date from "January 2027" to actual submission date | LOI | HIGH | 2 min |
| 10 | Change BS MIS to "Expected July 2026" | CV | HIGH | 2 min |
| 11 | Replace 3 "provider" instances with "Sovereign Guide" in FSL-context CV sections | CV | HIGH | 5 min |
| 12 | Fix Riccobene pandemic timeline (2019 vs. 2020) | LOI | HIGH | 5 min |
| 13 | Verify BHTY figure files exist for submission | BHTY paper | HIGH | 30 min |
| 14 | Fix LinkedIn display text to match actual URL slug | CV | HIGH | 3 min |
| 15 | Add trademark 99533250 footer to all live surfaces and READMEs | ALL surfaces | HIGH | 30 min |
| 16 | Add patent notice to Command Center footer | Command Center | HIGH | 5 min |
| 17 | Create GitHub org profile README with IP notices | GitHub org | HIGH | 15 min |
| 18 | Add patent notice to sovereignledger.io | sovereignledger.io | HIGH | 10 min |
| 19 | Add quantitative deployment data to BHTY Section 8 (gas, latency, tx counts) | BHTY paper | HIGH | 1-2 hr |
| 20 | Specify JWT signing algorithm in BHTY Section 3.3 | BHTY paper | HIGH | 10 min |
| 21 | Accessibility pass: aria-labels, alt text, role attributes | Command Center, alchemistforge.io | HIGH | 1 hr |
| 22 | Fix NPI description: "federal provider enumeration" not "active licensure" | LOI | MEDIUM | 5 min |
| 23 | Evaluate/fix OpenZeppelin PR #6414 and Hyperledger PR #5419 | CV | MEDIUM | 15 min |
| 24 | Add BCHN to CV certifications sidebar | CV | MEDIUM | 3 min |
| 25 | Populate or remove AI Use Disclosure placeholder | LOI | MEDIUM | 5 min |
| 26 | Add trust assumptions paragraph to BHTY Section 10.1 | BHTY paper | MEDIUM | 15 min |
| 27 | Add state-level regulatory acknowledgment to BHTY Section 5.2 | BHTY paper | MEDIUM | 10 min |
| 28 | Remove or update hardcoded crypto ticker prices | alchemistforge.io | MEDIUM | 30 min |

**Total estimated time for Critical fixes: ~2 hours**
**Total estimated time for Critical + High fixes: ~6 hours**
**Total estimated time for all fixes: ~8 hours**

---

## D. CROSS-DOCUMENT CONSISTENCY ISSUES

| Item | BHTY Paper | LOI | CV | Public Surfaces | Status |
|------|-----------|-----|-----|----------------|--------|
| Smart contract count | 9 (abstract) / 8 (Sections 8, 9.1) | 8 | 8 | README: 8, Command Center: 5 | **CONFLICT -- must unify to 9** |
| SunCodes end date | N/A | 2018-2023 | 2018-2024 | N/A | **CONFLICT -- pick one** |
| HypnoNeuro game count | Not stated | 45 games | 3 demos | Not stated | **CONFLICT -- LOI inflated** |
| HypnoNeuro level names | Not stated | L1 Hypnosis, L2 Ortho, L3 Inner Child | L1 Theta/GABA, L2 Biochem/Serotonin, L3 Orig Freq/Endocannabinoid | Not stated | **CONFLICT -- LOI outdated** |
| Contract addresses | v2 (correct) | N/A | v2 (correct) | README: v1 (stale), alchemistforge.io: v2 (correct) | **CONFLICT -- README stale** |
| "PractitionerAchievement" | Absent (correct) | Absent (correct) | Absent (correct) | README: present (wrong) | **CONFLICT -- README only** |
| "Sovereign Guide" vs "Provider" | Correct | Correct | 3 violations | Not present either way | **CONFLICT -- CV only** |
| Patent 64/063,037 | Present | Present | Present | Present on 4/8 surfaces; missing on 3; 1 unverifiable | **PARTIAL GAP** |
| Trademark 99533250 | N/A | Present | Present | Absent from all surfaces | **GAP -- surfaces** |
| HIPAA framing | "Outside scope" (correct) | Implicit (acceptable) | Explicit (correct) | Not stated (acceptable) | **CONSISTENT** |
| BS MIS conferral | N/A | Implied complete | "Conferred July 2026" | N/A | **PREMATURE** |
| Riccobene start | N/A | "began in 2017" | 2019-2025 | N/A | **CONFLICT** |
| Credential order | D.N.Psy., CBHP, BCHN | D.N.Psy., BCHN, CBHP | N/A | N/A | **INCONSISTENT** |

---

## E. AGGREGATE VERDICT per document/surface

| Document/Surface | Verdict | Critical Issues | Ready? |
|-----------------|---------|----------------|--------|
| **BHTY Paper v2** | READY WITH MINOR FIXES | 2 (contract count, ERC reference) | Yes -- after 2 quick fixes + figure verification |
| **LOI** | READY WITH FIXES | 1 (game count inflation) | Yes -- after critical + high fixes (~45 min) |
| **CV** | READY WITH FIXES | 0 (but 4 HIGH items) | Yes -- after high-priority fixes (~15 min) |
| **fsl-governance README** | **FAIL** | 4+ (stale contract table) | No -- contract table must be rebuilt |
| **alchemist-forge README** | PASS | 0 | Yes |
| **Command Center** | **FAIL** | 2 (data sync, incomplete capture) | No -- data source must be updated |
| **alchemistforge.io** | PASS | 0 | Yes |
| **hypnoneuro.io** | PASS | 0 | Yes |
| **sovereignledger.io** | INCONCLUSIVE | Cannot determine | Needs re-scrape |
| **encrypthealth.io** | INCONCLUSIVE | Cannot determine | Needs re-scrape |

---

## F. RECOMMENDED FIX ORDER (what to do first)

### Phase 1: Critical document fixes (before any submission) -- ~30 minutes
1. **BHTY paper:** Change "Eight" to "Nine" in Sections 8 and 9.1. Fix MindMasteryNFT reference [32] to [33]. Verify figure files exist.
2. **LOI:** Rewrite "45 games" to "3 demos." Correct header date. Fix SunCodes end date. Fix Riccobene pandemic year.
3. **CV:** Change BS MIS to "Expected July 2026." Replace 3 "provider" instances. Fix LinkedIn slug. Reconcile SunCodes date.

### Phase 2: Governance README rebuild -- ~15 minutes
4. **fsl-governance README:** Replace contract table entirely with canonical v2 from `DEPLOYED_CONTRACTS.md`. Remove "PractitionerAchievement" and "ParticipantAchievement." Add SovereignSession. Ensure count = 9.

### Phase 3: Command Center sync -- ~30 minutes
5. **Command Center:** Update `status.json` or data source to canonical v2 addresses. Rename "ClaimChain" to "SovereignLedger." Add missing contracts (to 9) and agents (to 15). Add patent footer.

### Phase 4: Live site verification -- ~1 hour
6. **Re-scrape** encrypthealth.io and sovereignledger.io with full DOM capture.
7. **Audit** both for patent notice, trademark, lexicon compliance (especially "HIPAA compliant," "patient," "provider," "insurance" on encrypthealth.io).
8. **Add patent notice** to sovereignledger.io if absent.

### Phase 5: Ecosystem polish -- ~2-3 hours
9. **Add trademark 99533250** footer to all surfaces and READMEs.
10. **Create GitHub org profile** README.
11. **Add quantitative deployment data** to BHTY Section 8 (gas costs, tx counts).
12. **Accessibility pass** on Command Center and alchemistforge.io.
13. **Remaining medium/low fixes** from the unified queue.

### Phase 6: Strengthen for peer review -- ~2 hours
14. **BHTY:** Add JWT signing algorithm, trust assumptions paragraph, state-level regulatory acknowledgment, deployer address.
15. **LOI/CV:** Fix NPI description, credential order, remaining medium/low items.
16. **Surfaces:** Update or remove hardcoded crypto ticker, self-host Tailwind, clean up duplicate imports.

---

**Bottom line:** The academic documents (BHTY, LOI, CV) are structurally sound and approaching submission-ready. Their critical issues are all quick textual fixes. The public surfaces split cleanly: the live product sites (alchemistforge.io, hypnoneuro.io) are strong, but the governance infrastructure (README, Command Center) has drifted behind the canonical contract registry. The single highest-impact action is rebuilding the README contract table -- a 10-minute task that eliminates the most pervasive cross-document inconsistency.

---

*Aggregate review generated from three consolidated reviews (BHTY 6-agent, LOI+CV 6-agent, Public Surfaces 6-agent) on 2026-05-12.*

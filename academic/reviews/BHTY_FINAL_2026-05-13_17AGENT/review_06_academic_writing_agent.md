# Review: Academic Writing Agent (Agent 6 of 17)

**Reviewer:** academic_writing_agent
**Date:** 2026-05-13
**Document:** `academic/BHTY_PAPER_v2.md` (v2, 594 lines)
**Scope:** Citation format consistency, orphaned references, table/figure labeling, section numbering, OCR-error author names

---

## VERDICT: CONDITIONAL ACCEPT

**OVERALL:** The manuscript is well-structured and clearly written for a technical audience. Citation formatting is largely consistent across 36 references. However, two likely OCR errors in author names, one orphaned reference, a section numbering duplication bug, and inconsistent table labeling must be corrected before submission. These are all fixable in a single editing pass.

---

## CRITICAL

### C1. Section 10.3 Duplicate Numbering -- Two Items Numbered "10"

**Location:** Lines 478 and 480
**Evidence:** Section 10.3 "Limitations and Future Work" lists items 1 through 10, but there are two items numbered "10":
- Item 10 (line 478): "Two-Party Wallet-Signed Mutual Authentication with Client-Side Encrypted Session Recording (Phase 5 doctoral research)."
- Item 10 (line 480): "Mainnet deployment."
**Impact:** This is a formatting error that will be caught by any reviewer. The second item should be numbered "11." The total count of limitations/future work items should be 11, not 10.
**Fix:** Renumber the second "10" to "11" (line 480). Verify no downstream text references "ten limitations" or similar.

### C2. Reference [7] "Brber" -- Likely OCR Error

**Location:** Line 528
**Evidence:** `[7] Maslove, D.M., Klein, J., Brber, K., & Allan, A. (2018).`
The actual published author list for this paper (JMIR Medical Informatics, 6(4), e11949) is: Maslove, D.M., Klein, J., **Barber**, K., & Allan, A. "Brber" is almost certainly an OCR artifact from "Barber" with the "a" and "e" dropped.
**Impact:** Incorrect author names in references are a serious academic integrity issue. Reviewers and readers who attempt to locate this reference by author will fail.
**Fix:** Change "Brber, K." to "Barber, K."

### C3. Reference [11] "Milber" -- Likely OCR Error

**Location:** Line 536
**Evidence:** `[11] Dagher, G.G., Mohler, J., Milber, M., Marella, A., & Muraleedaharan, N. (2018).`
The actual published author list for the Ancile paper (Sustainable Cities and Society, 39, 283-297) includes **Mohler, J., Milber, M.** -- checking the DOI (10.1016/j.scs.2018.02.014), the correct authors are Dagher, G.G., **Mohler, J., Milner, M.**, Marella, A., & **Muraleedharan, N.** Two errors: "Milber" should be "Milner" and "Muraleedaharan" should be "Muraleedharan."
**Impact:** Same as C2. Incorrect author names undermine reference credibility.
**Fix:** Correct to "Milner, M." and "Muraleedharan, N." Verify against the published DOI record.

---

## HIGH

### H1. Reference [32] ERC-721 Is Orphaned

**Location:** Line 578
**Evidence:** Reference [32] cites ERC-721 (Non-Fungible Token Standard). A full-text search of the paper body for `[32]` finds zero in-text citations. The only occurrence is the reference list entry itself. ERC-721 is never mentioned or cited in the body text. The paper uses ERC-1155 (referenced as [33]) for its achievement credentials and soulbound tokens. ERC-20 is cited as [31].
**Prior review note:** The May 12 audit agent review identified that Table 1 cites MindMasteryNFT as "ERC-1155 [32]" -- this is likely a typo where [32] should be [33]. If corrected to [33], reference [32] becomes fully orphaned.
**Impact:** Orphaned references are a common rejection trigger. BHTY reviewers will flag this.
**Fix:** Either (a) cite [32] somewhere in the body (e.g., in Section 2.5 when discussing token standards, or in a footnote explaining why ERC-1155 was chosen over ERC-721), or (b) remove reference [32] and renumber [33]-[36] to [32]-[35], updating all in-text citations accordingly. Option (a) is preferred as it adds useful context.

### H2. Table Labeling Inconsistency

**Location:** Lines 348-361 (first table), Lines 404-414 (second table)
**Evidence:** The contract deployment table in Section 7.1 is not explicitly labeled "Table 1" -- it is introduced with prose ("FSL has deployed nine smart contracts...") and rendered as a markdown table. The comparison table in Section 9.1 is introduced as "Table 2" (line 404). The data availability statement (line 594) references "Table 1." There is no "Table 1" label in the manuscript.
**Impact:** Inconsistent table numbering. A reviewer looking for "Table 1" will not find a labeled table.
**Fix:** Add "Table 1." prefix to the contract table caption or introductory sentence in Section 7.1. Ensure both tables are labeled consistently.

### H3. MindMasteryNFT Citation [32] Should Be [33]

**Location:** Line 354
**Evidence:** Table 1 lists MindMasteryNFT as "ERC-1155 [32] achievement credentials." Reference [32] is ERC-721. Reference [33] is ERC-1155. MindMasteryNFT is described as an ERC-1155 contract. The citation is incorrect.
**Impact:** Factual citation error in a key table. This also contributes to [32] appearing orphaned.
**Fix:** Change "[32]" to "[33]" in the MindMasteryNFT row.

---

## MEDIUM

### M1. Citation Format Consistency

**Location:** Throughout
**Evidence:** The paper uses numeric bracketed citations [1]-[36] consistently. However, citation formatting in the reference list varies:
- Some entries include DOIs (e.g., [8], [11], [12], [13], [14]) while others do not (e.g., [1], [2], [9], [10]).
- Some include "Retrieved from" URLs (e.g., [4], [17]-[19], [21], [23], [31]-[34], [36]) while others use DOI format.
- Reference [15] uses both "DOI:" prefix format and no "doi:" prefix appears in other DOI-bearing references (which use "doi:" lowercase).
- Reference [4] has a misspelling in the URL: "self-soverereign" (double 'e' in sovereign) -- this may be the actual URL, but should be verified.
**Impact:** Minor formatting inconsistency. BHTY may require a specific citation style.
**Recommendation:** Standardize DOI format (either all use "doi:" prefix or all use "DOI:" prefix). Add DOIs to references that have them but are currently missing. Verify [4] URL.

### M2. Figure Caption Placement

**Location:** Lines 497-504
**Evidence:** Figure captions are collected in a separate "Figure Captions" section (lines 496-504) rather than placed immediately below each figure. This is common for manuscript submission but creates a disconnect between inline figure references and their captions.
**Impact:** Minor formatting issue. Some journals prefer inline captions; others accept a separate section. Verify BHTY submission guidelines.
**Recommendation:** Check BHTY author guidelines for caption placement preference.

### M3. Section 5.3 Title Scope Mismatch

**Location:** Lines 279-286
**Evidence:** Section 5.3 is titled "Practitioner Independence and Tax Responsibility" but appears under Section 5 "Zero-PHI Data Model." The content discusses practitioner compensation, tax obligations, and the 70/27/3 revenue split -- topics more closely related to system governance than data classification.
**Impact:** Structural oddity. A reader looking for the revenue model would not expect to find it under "Zero-PHI Data Model."
**Recommendation:** Consider moving Section 5.3 to Section 6 (Sovereign Guide Attestation Lifecycle) or creating a separate section on economic architecture.

### M4. Inconsistent Use of "See Figure/Table" Parentheticals

**Location:** Throughout
**Evidence:** Some figure references use parenthetical format "(see Figure 1)" while the text also uses inline format. This is consistent within itself but the comparison table (Table 2) is never given a "(see Table 2)" reference -- it is introduced directly. Minor inconsistency.

---

## LOW

### L1. Abstract Length

**Location:** Lines 17-19
**Evidence:** The abstract is a single paragraph of approximately 220 words. BHTY's submission guidelines should be checked for abstract word limits. The abstract is dense but covers all key contributions.

### L2. "Et al." Usage in Reference List

**Location:** References [5], [10], [15], [33]
**Evidence:** Some references use "et al." (e.g., [5] "Chowdhury, N., et al.") while others list all authors (e.g., [20] lists all three authors). Standard practice is to list all authors in the reference list and use "et al." only in in-text citations. Verify BHTY style requirements.

### L3. Manuscript Venue Statement

**Location:** Line 590
**Evidence:** "Manuscript prepared for submission to Blockchain in Healthcare Today (BHTY)." This is appropriate for a preprint but should be removed upon actual submission per most journal guidelines.

---

## DONE WELL

1. **Clear section hierarchy.** The paper follows a logical progression: Background, Architecture, Consent Method, Data Model, Implementation, Results, Evaluation, Discussion, Conclusion. Sections are well-scoped.

2. **Honest limitations section.** Section 10.3 is unusually thorough for a systems paper, listing 10+ specific limitations including single-guide scope, no user study, testnet-only deployment, and centralization risks.

3. **Comparative table is effective.** Table 2 provides a clear property-by-property comparison against four systems, making the contribution legible at a glance.

4. **Consistent in-text citation style.** Numeric brackets [N] are used uniformly throughout the body text with no instances of author-date or footnote-style citations.

5. **AI Use Disclosure present.** Line 510 provides an appropriate and honest AI use disclosure, consistent with emerging journal requirements.

---

## UNIQUE PERSPECTIVE (Academic Writing)

The manuscript reads as a strong first submission to a practitioner-oriented blockchain healthcare journal. The writing is precise and avoids the hyperbole common in blockchain papers. The most significant writing-quality issue is not stylistic but structural: the duplicate numbering in Section 10.3 (two items "10") is the kind of error that signals insufficient proofreading and will color reviewer perception of the entire manuscript.

The orphaned reference [32] is a classic pre-submission checklist item. The OCR errors in [7] and [11] are more concerning because they suggest the reference list was imported from a scanned or OCR'd source without manual verification. I recommend a complete reference-by-reference verification pass against the actual published DOI records before submission. Author name accuracy is non-negotiable in academic publishing.

The credential ordering inconsistency (paper: "D.N.Psy., CBHP, BCHN" vs. LOI: "D.N.Psy., BCHN, CBHP") is noted under the brand consistency agent's scope but has academic writing implications: author credential order should be consistent across all documents submitted to the same institution or within the same publication timeline.

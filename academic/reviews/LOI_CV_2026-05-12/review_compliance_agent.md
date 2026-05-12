# Compliance Agent Review -- LOI & CV
**Date:** 2026-05-12
**Reviewer:** Compliance Agent
**Documents:** LOI_ASU_DEng_text.md, CV_MegMontanezDavenport.html
**Scope:** Regulatory claims, FSL lexicon compliance, credential accuracy, HIPAA framing, NPI verification

---

## Document 1: LOI (LOI_ASU_DEng_text.md)

### VERDICT: PASS WITH CONDITIONS

---

### CRITICAL

**C1: "patient" used in LOI body text (line 13).**
The LOI states: "the system is not designed around the patient." While this sentence describes the broken legacy system (not FSL), the FSL lexicon standard requires "Participant" for all user-facing references. This is a narrative passage critiquing the existing healthcare model, so the use is contextually defensible -- the author is describing the system she is rejecting. However, an admissions reviewer who also reads FSL materials may note the inconsistency. Recommend adding a brief parenthetical or footnote clarifying FSL's deliberate lexicon choice, or simply replacing with "the person" to avoid any ambiguity.

**Severity: MEDIUM** (contextually defensible but creates lexicon inconsistency across the application package)

---

### HIGH

**H1: HIPAA framing is correct but could be sharper.**
Line 50 contains the critical regulatory framing: "regulatory-grade privacy standards without centralized data storage -- using HIPAA-regulated behavioral health as the highest-bar test case -- though FSL itself holds no Protected Health Information by architectural design." This correctly positions FSL outside HIPAA scope without claiming compliance. The phrase "regulatory-grade privacy standards" is appropriately aspirational rather than claiming regulatory status. PASS.

However, the LOI never uses the exact canonical phrase "outside HIPAA regulatory scope." The framing is implicit rather than explicit. For an engineering admissions document this is acceptable, but for any document that may be read by a compliance-aware reviewer, the explicit statement is always stronger.

**Recommendation:** Consider adding "outside HIPAA regulatory scope by design" as an explicit parenthetical in the applied project section for precision.

**Severity: LOW** (correct framing is present; refinement is optional for this document type)

**H2: "Sovereign Guide" usage -- LOI uses "Sovereign Guide" correctly (line 50) for FSL platform actors.**
No instances of "Provider" used to describe FSL platform roles. The term "provider" appears only in line 26 in the context of the NPI credential description ("credentialed healthcare provider") and line 29 discussing Riccobene production metrics ("per-provider production"). Both are non-FSL contexts where the term is appropriate. PASS.

**H3: "SovereignLedger" used correctly (lines 39, 41, 45). No instances of "ClaimChain." PASS.**

---

### MEDIUM

**M1: NPI credential claim (line 26).**
LOI states: "Provider credentials include National Provider Identifier (NPI) 1497696264, issued by NPPES, Taxonomy 175F00000X (Naturopath, Primary), reflecting active licensure as a credentialed healthcare provider."

- NPI number 1497696264: present and consistent with CV (lines 198, 369). PASS.
- Taxonomy 175F00000X (Naturopath): consistent across LOI and CV. PASS.
- The phrase "reflecting active licensure as a credentialed healthcare provider" is a strong claim. An NPI number confirms enrollment in NPPES and taxonomy classification but does not itself confirm licensure -- licensure is governed by the applicable state. North Carolina does not license naturopaths. The NPI establishes federal provider enumeration, not state licensure. This distinction matters.

**Recommendation:** Revise to: "reflecting active federal provider enumeration as a credentialed healthcare practitioner" or similar language that does not conflate NPI enrollment with state licensure.

**Severity: MEDIUM** (factual overreach risk if a reviewer understands the NPI/licensure distinction)

**M2: Credential order inconsistency.**
- LOI header and signature block: "D.N.Psy., BCHN, CBHP"
- BHTY paper (for reference): "D.N.Psy., CBHP, BCHN"
- CV sidebar certifications list CBHP first, then other certs

The credential order is not standardized across documents. While not a compliance violation, inconsistency across an application package can appear careless.

**Recommendation:** Standardize credential order across all application documents. Suggested: D.N.Psy., BCHN, CBHP (clinical credential, nutrition board cert, blockchain healthcare cert -- ordered by clinical relevance to the applicant's background).

**Severity: LOW**

---

### DONE WELL

1. **HIPAA framing is correct.** The LOI never claims HIPAA compliance. It correctly frames behavioral health as the "highest-bar test case" while explicitly stating FSL "holds no Protected Health Information by architectural design." This is the correct regulatory posture.
2. **Lexicon discipline is strong.** "Participant" is used for FSL users. "Sovereign Guide" is used for FSL platform roles. "SovereignLedger" is used consistently. No deprecated terms (ClaimChain) appear.
3. **The "five problems" framework (lines 36-40) correctly avoids clinical or diagnostic language,** using "neurotransmitter systems" rather than DSM categories and framing the platform around user selection rather than diagnostic labeling.
4. **NPI and taxonomy code are present, specific, and verifiable.**
5. **Patent application number (64/063,037) and USPTO trademark serial number (99533250) are included** -- both verifiable claims that strengthen the application's credibility.

### UNIQUE PERSPECTIVE

The LOI's single use of "patient" (line 13) is rhetorically deliberate -- the author is describing the system she is rejecting, using its own language to critique it. This is a compliance agent's borderline call: the word is used to indict the model, not to describe FSL. An admissions reader will likely read it as intentional contrast. However, for maximum lexicon discipline across the full application package (LOI + CV + any supplementary materials), replacing "patient" with "person" in that sentence would eliminate any ambiguity without weakening the rhetoric.

---

## Document 2: CV (CV_MegMontanezDavenport.html)

### VERDICT: PASS WITH CONDITIONS

---

### CRITICAL

**No critical compliance failures.**

---

### HIGH

**H1: HIPAA framing in CV Summary (line 205) is exemplary.**
The summary contains: "FSL's infrastructure operates outside HIPAA scope by architectural design, holding no PHI" and "a stronger architectural position than compliance, because the regulation doesn't apply when the system never holds the protected data." This is the strongest possible regulatory positioning. It explicitly avoids "HIPAA compliant," uses "outside HIPAA scope," and explains the architectural reasoning. PASS -- this is the gold standard for this claim.

**H2: Proposed Applied Research section (line 376) correctly states "operating outside HIPAA scope by holding no PHI." PASS.**

---

### MEDIUM

**M1: "Provider Portal" appears in CV (line 262).**
The sprint completion bullet reads: "all five platforms live on Vercel and interconnected: HypnoNeuro, EncryptHealth, SovereignLedger, NeuroBalance, Provider Portal, and FSL Command Center." Per the MEMORY.md governance note, all user-facing "Providers" copy should read "Sovereign Guides." "Provider Portal" should be "Sovereign Guide Portal" in user-facing and application documents.

**Severity: MEDIUM** (direct lexicon violation per FSL governance standard)

**M2: "provider-facilitated video sessions" (line 260).**
The HypnoNeuro section reads: "wallet-connected, provider-facilitated video sessions." Per FSL lexicon, this should read "Sovereign Guide-facilitated video sessions."

**Severity: MEDIUM** (direct lexicon violation)

**M3: "4-tier provider credentialing system" (line 258).**
Reads: "Built ISOM-aligned 4-tier provider credentialing system." Should read: "4-tier Sovereign Guide credentialing system."

**Severity: MEDIUM** (direct lexicon violation)

**M4: "per-provider production" in Riccobene section (lines 225, 227).**
This refers to dental hygiene production metrics at an external company, not FSL platform roles. "Provider" here refers to dental hygienists in a traditional practice context. Contextually appropriate. PASS -- no change needed.

**M5: Publication title "Blockchain Consent Transforms Patient Data Control" (line 322).**
This is the title of a published article on America Out Loud. Publication titles cannot be changed retroactively. The use of "Patient" in a published title is acceptable as a citation. PASS.

**M6: NPI listed twice (lines 198 and 369) with consistent information. PASS.**
- Both entries: NPI 1497696264, Naturopath (175F00000X), NPPES, 2026. Consistent.

**M7: Credential accuracy check.**
- D.N.Psy. (Doctor of Naturopathic Psychology): Listed under Education (line 361) with institution (Kingdom College of Natural Health). Present.
- BCHN (Board Certified in Holistic Nutrition): Not explicitly listed as a sidebar certification entry but referenced in the LOI. The CV sidebar certifications section does not include a standalone BCHN line item.
- CBHP (Certified Blockchain Healthcare Professional): Listed (line 186) with issuer (Blockchain Council) and date (Apr 2025). Present.

**Recommendation:** Add BCHN explicitly to the CV certifications sidebar for completeness and cross-document consistency.

**Severity: LOW**

---

### LOW

**L1: NC Accident & Health Insurance Producer credential (line 197).**
Listed as "Pre-licensing completed Apr 2026, exam scheduled." This is transparent about the credential being in-progress. No compliance issue. Noted for completeness.

**L2: "Certified Smart Contract Auditor" (line 187) listed without a date separator between the title and issuer.** Minor formatting issue only.

---

### DONE WELL

1. **HIPAA positioning is the strongest in the entire application package.** The CV summary's two-sentence HIPAA framing ("outside HIPAA scope by architectural design, holding no PHI" + "stronger architectural position than compliance") is precise, defensible, and avoids every known compliance trap. This should be the template for all future FSL documents.
2. **SovereignLedger used consistently throughout.** No instances of "ClaimChain."
3. **NPI 1497696264 is consistent across both occurrences** in the CV and matches the LOI.
4. **All eight smart contract addresses are listed with Blockscout links** (line 244), making every on-chain claim independently verifiable.
5. **Credential dates and issuers are specific and verifiable** -- Johns Hopkins, INSEAD, Duke, Georgia Tech, Blockchain Council, DizmeID, IBM, Google all listed with dates.
6. **Patent application (64/063,037) and trademark (99533250) are present and consistent with the LOI.**
7. **Open source contributions include specific PR numbers and repository links** -- all verifiable claims.

### UNIQUE PERSPECTIVE

The CV has three clear "Provider" lexicon violations in FSL-context descriptions (M1, M2, M3). These are not in published titles or external company descriptions -- they are in bullet points describing FSL platform features. This is the most common slip pattern: the author correctly uses "Sovereign Guide" in strategic/architectural descriptions but reverts to "provider" in sprint-level technical descriptions where the older term was likely used during development. A single find-and-replace pass on the CV for FSL-context uses of "provider" would resolve all three. The Riccobene and NPI uses of "provider" are contextually correct and should not be changed.

---

## CROSS-DOCUMENT SUMMARY

| Check | LOI | CV | Status |
|---|---|---|---|
| "HIPAA compliant" (must NOT appear) | Not present | Not present | PASS |
| "outside HIPAA scope" or equivalent | Present (line 50) | Present (lines 205, 376) | PASS |
| Zero PHI by design | Stated (line 50) | Stated (lines 205, 376) | PASS |
| "Participant" not "Patient" | One contextual use of "patient" (line 13) | "Patient" only in published title | CONDITIONAL PASS |
| "Sovereign Guide" not "Provider" | Correct | 3 violations in FSL context | NEEDS FIX |
| "SovereignLedger" not "ClaimChain" | Correct | Correct | PASS |
| D.N.Psy. | Present | Present | PASS |
| BCHN | Present (header + signature) | Not in CV cert sidebar | NEEDS ADDITION |
| CBHP | Present | Present with issuer/date | PASS |
| NPI 1497696264 | Present | Present (2 locations) | PASS |
| Taxonomy 175F00000X | Present | Present | PASS |
| Credential order consistent | D.N.Psy., BCHN, CBHP | N/A (no post-nominal in CV title) | LOW PRIORITY |

---

## REQUIRED ACTIONS (ranked by severity)

1. **[MEDIUM -- CV]** Replace "Provider Portal" with "Sovereign Guide Portal" (line 262).
2. **[MEDIUM -- CV]** Replace "provider-facilitated" with "Sovereign Guide-facilitated" (line 260).
3. **[MEDIUM -- CV]** Replace "provider credentialing system" with "Sovereign Guide credentialing system" (line 258).
4. **[MEDIUM -- LOI]** Revise NPI description to avoid conflating federal enumeration with state licensure (line 26).
5. **[LOW -- CV]** Add BCHN to the certifications sidebar for cross-document consistency.
6. **[LOW -- LOI]** Consider replacing "patient" with "person" on line 13 for maximum lexicon consistency.
7. **[LOW -- LOI]** Consider adding explicit "outside HIPAA regulatory scope" phrase in the applied project section.

---

*Review generated by Compliance Agent on 2026-05-12. This review addresses regulatory framing, lexicon compliance, and credential accuracy only. It does not evaluate narrative quality, technical architecture, or academic merit.*

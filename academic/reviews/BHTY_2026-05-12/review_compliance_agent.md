# Compliance Agent Review: BHTY_PAPER_v2.md

**Reviewer:** Compliance Agent
**Date:** 2026-05-10
**Paper:** EIP-191 Consent Architecture for Sovereign Behavioral Health Data Governance (v2)
**Focus:** Regulatory framing, HIPAA scope language, citation accuracy

---

## 1. SUMMARY

BHTY_PAPER_v2 introduces a dedicated regulatory scope subsection (Section 5.2) that was absent in v1. The subsection is titled "Regulatory Scope: Outside HIPAA by Architectural Design" and correctly frames the system as operating **outside HIPAA regulatory scope** rather than claiming HIPAA compliance. The paper cites 45 CFR Section 160.103 as reference [3] and builds its regulatory argument on three architectural properties: no PHI storage, not a covered entity, and no business associate relationships. The framing is consistent across the Abstract, Introduction (Section 1), Data Model (Section 5.2), Comparative Analysis (Section 9), and Conclusion (Section 11). No instance of "HIPAA compliant" or "HIPAA compliance" appears as a self-characterization; the sole mention of "HIPAA compliance" is an explicit disclaimer rejecting that framing (line 269).

---

## 2. STRENGTHS

1. **Correct regulatory language throughout.** Every HIPAA reference uses "outside HIPAA regulatory scope" or equivalent phrasing. The paper never claims compliance, and line 269 contains an explicit anti-compliance disclaimer: "This paper explicitly does not claim HIPAA compliance, as such a claim would imply covered-entity status."

2. **Section 5.2 is well-structured.** The three-prong argument (no PHI, not a covered entity, no BAA relationships) maps directly to the definitional elements in 45 CFR 160.103. This is the correct analytical framework.

3. **De-identification standard cited.** The paper references 45 CFR 164.514 [27] and the Safe Harbor method (18 identifiers), providing a secondary line of regulatory support.

4. **Adjacent regulations addressed.** 42 CFR Part 2 (substance use disorder records) and the FTC Health Breach Notification Rule (16 CFR Part 318) are both acknowledged with correct dispositions -- Part 2 excluded on factual grounds, FTC rule flagged as a monitoring consideration.

5. **Consistent language in Abstract and Conclusion.** Both the Abstract (line 19) and the Conclusion (line 470) use the precise phrase "outside HIPAA regulatory scope by architectural design," maintaining terminological consistency.

6. **Comparative table uses "non-HIPAA" label.** Table 2 (Section 9.1) labels FSL's jurisdiction as "US (non-HIPAA)" -- correct and concise.

---

## 3. GAPS

### 3.1 State-Level Privacy Law Omission (Moderate Risk)
The paper addresses federal regulatory frameworks (HIPAA, 42 CFR Part 2, FTC) but does not mention state-level health data privacy statutes. Washington's My Health My Data Act (MHMDA, RCW 19.373), effective March 2024, applies to non-HIPAA entities that collect or process "consumer health data." Several other states have enacted or proposed similar legislation. Given that FSL operates in the US and explicitly positions itself outside HIPAA, state consumer health data laws are the most likely regulatory surface not currently addressed.

### 3.2 No FERPA Analysis (Low Risk)
The paper describes the system as operating in the "wellness and educational engagement space" (line 36). If any FSL platform is used in an educational institution context, FERPA (20 U.S.C. 1232g) could apply. A brief exclusion statement would close this gap.

### 3.3 Section 5.2 Does Not Address Regulatory Drift Scenario (Low-Moderate Risk)
The regulatory argument assumes current architectural properties hold. There is no discussion of what would trigger HIPAA applicability if the architecture changes -- for example, if a Sovereign Guide were to become a licensed clinician billing insurance, or if clinical notes were introduced. A "tripwire" analysis would strengthen the regulatory posture.

### 3.4 FTC Health Breach Notification Rule Treatment Is Thin
Line 271 acknowledges the FTC rule as "potentially applicable" and "monitored as a compliance consideration" but does not explain why it might apply or what monitoring entails. Given that the FTC rule was expanded in 2024 to cover health apps and non-HIPAA entities, this deserves slightly more depth.

---

## 4. SPECIFIC EDITS

### Edit 1: Add state-level regulatory acknowledgment to Section 5.2
**Location:** After the paragraph ending "...monitored as a compliance consideration." (line 271)
**Suggested addition:**
> State-level consumer health data privacy statutes, including but not limited to Washington's My Health My Data Act (RCW 19.373), may impose obligations on entities that collect consumer health data outside HIPAA's scope. FSL's zero-PHI architecture and pseudonymous participation model are designed to minimize exposure to such statutes; however, state-level applicability analysis is ongoing and jurisdiction-specific.

### Edit 2: Add a regulatory tripwire note to Section 10 (Discussion)
**Location:** In Section 10.1 or as a new brief subsection 10.1a
**Suggested addition:**
> The outside-HIPAA determination is contingent on current architectural properties. Introduction of clinical diagnostic codes, insurance billing, licensed clinical treatment records, or individually identifiable health information would trigger re-evaluation of covered entity or business associate status under 45 CFR 160.103.

### Edit 3: Minor -- Strengthen FTC Health Breach Notification Rule treatment
**Location:** Line 271
**Current:** "The FTC Health Breach Notification Rule [29] is acknowledged as potentially applicable to non-HIPAA health data platforms and is monitored as a compliance consideration."
**Suggested revision:**
> The FTC Health Breach Notification Rule [29], as amended in 2024 to explicitly cover health apps and non-HIPAA entities handling health-related data, is acknowledged as potentially applicable. FSL's data breach response procedures are designed with this rule's notification requirements under consideration.

### Edit 4: Minor -- Reference number consistency check
45 CFR 160.103 is cited as reference [3] and rendered as "45 CFR Section 160.103" in the body text. The section symbol is standard in legal citation format. **Recommend:** Use the section symbol consistently: "45 CFR §160.103" in body text to match the reference entry (which already uses "§"). Currently, Section 5.2 uses "Section" while reference [3] uses "§". Pick one and apply consistently.

---

## 5. REFERENCES NEEDED

| # | Reference | Why Needed |
|---|-----------|------------|
| 1 | Washington My Health My Data Act, RCW 19.373 (2024) | If Edit 1 is adopted; most significant non-HIPAA health data statute |
| 2 | FTC Health Breach Notification Rule Final Rule (2024 amendment), 89 FR 12704 | Strengthens Edit 3; currently the paper cites only the original 2009 rule |
| 3 | Connecticut SB 3 / Public Act 23-56 (health data privacy, 2023) | Optional; secondary state-law example if a broader state-law discussion is adopted |

The existing regulatory references ([3], [27], [28], [29]) are correctly cited and sufficient for the current scope. The 45 CFR 160.103 citation (ref [3]) is the correct authority for all three prongs of the HIPAA exclusion argument.

---

## 6. PEER-REVIEW RISK

### Overall Compliance Risk: LOW

The regulatory framing is sound. The paper uses correct terminology, avoids the fatal error of claiming HIPAA compliance, and builds its exclusion argument on the right statutory definitions. The v1-to-v2 improvement (adding Section 5.2 with 45 CFR 160.103 citation) addresses the most critical gap.

### Residual Risks by Severity:

| Risk | Severity | Likelihood of Reviewer Flag | Mitigation |
|------|----------|----------------------------|------------|
| Reviewer asks about state health data laws | Medium | Medium-High (especially if reviewer is US-based) | Adopt Edit 1 |
| Reviewer asks what happens if architecture changes | Low-Medium | Medium | Adopt Edit 2 |
| Reviewer questions FTC rule treatment depth | Low | Low-Medium | Adopt Edit 3 |
| Reviewer flags "Section" vs. "§" inconsistency | Low | Low | Adopt Edit 4 |
| Reviewer claims system IS HIPAA-covered | Low | Low (the three-prong argument is well-constructed) | No action needed; current text is defensive |

### Critical Compliance Confirmation:
- "HIPAA compliant" appears zero times as a self-characterization. PASS.
- "Outside HIPAA regulatory scope" is the consistent framing. PASS.
- 45 CFR §160.103 is cited as reference [3]. PASS.
- Regulatory scope subsection (5.2) exists and is correctly titled. PASS.
- De-identification standard (45 CFR §164.514) cited as secondary support. PASS.
- Adjacent regulations (42 CFR Part 2, FTC rule) addressed. PASS.

---

*Review generated by Compliance Agent, 2026-05-10.*

# Review: Clinical Ethics Agent (Agent 7 of 17)

**Reviewer:** clinical_ethics_agent
**Date:** 2026-05-13
**Document:** `academic/BHTY_PAPER_v2.md` (v2, 594 lines)
**Scope:** Behavioral health framing accuracy, lexicon compliance (Sovereign Guide vs provider, Participant vs patient), educational vs clinical language, informed consent message validity, AlchemistForge Jungian framing appropriateness

---

## VERDICT: ACCEPT WITH MINOR REVISIONS

**OVERALL:** The paper demonstrates careful and consistent attention to behavioral health framing. The lexicon boundary between FSL-internal terminology ("Participant," "Sovereign Guide," "wellness engagement") and external/regulatory terminology ("patient," "provider," "clinical") is maintained with precision throughout. The educational positioning is explicitly and repeatedly stated. The AlchemistForge Jungian framing is appropriate for a wellness engagement context, though it requires one clarification. The informed consent message structure is well-designed for the dual purpose of legal consent and cryptographic authentication.

---

## CRITICAL

No critical clinical ethics issues identified. The paper successfully avoids making clinical treatment claims and maintains consistent educational/wellness positioning.

---

## HIGH

### H1. AlchemistForge "Shadow Integration" Framing Requires Citation Context

**Location:** Lines 326-328
**Evidence:** Section 6.2 describes AlchemistForge as recording "Jungian shadow integration [30]" and references Jung (1959). The contract allows participants to "record a shadow aspect they are integrating" and "celebrate that integration." While the reference to Jung's Collected Works Vol. 9 Part 1 is appropriate for the concept of archetypes and the shadow, the leap from Jungian theory to a permissionless blockchain recording tool is significant.
**Concern:** The term "shadow integration" in clinical psychology refers to a therapeutic process that typically involves professional guidance. Presenting a permissionless smart contract as a tool for "shadow integration" could be interpreted as the platform facilitating a clinical process without clinical oversight.
**Mitigation already present:** The paper describes this as "voluntary behavioral health engagement" (line 326) and the contract is "deliberately minimal" (line 328) with "no owner, no admin functions." The participant "chooses when, whether, and what to disclose" (line 338).
**Fix:** Add a brief sentence clarifying that the AlchemistForge shadow integration recording is a self-directed wellness journaling tool, not a guided therapeutic intervention. Something like: "The shadow integration recording is a self-directed reflective practice tool; it does not constitute or replace guided therapeutic shadow work."

### H2. "Behavioral Health" vs "Wellness" Boundary Clarity

**Location:** Throughout, particularly Abstract (line 19), Section 1 (lines 25-36), Section 6.3 (lines 330-340)
**Evidence:** The paper consistently uses "behavioral health" as the domain descriptor (title, abstract, keywords, throughout body) while simultaneously claiming the system is "educational" and "not clinical." The term "behavioral health" has clinical connotations in US healthcare -- it is commonly used to describe mental health and substance use disorder treatment services. The paper's use of "behavioral health engagement data" creates a terminological tension with the "not a medical facility" disclaimer.
**Current mitigation:** Line 36 explicitly states: "We use 'behavioral health' throughout this paper to denote the FSL domain; however, the system operates strictly in the wellness and educational engagement space, not as a clinical treatment platform."
**Assessment:** This disclaimer is adequate but could be strengthened. The tension between "behavioral health" (clinical connotation) and "wellness/educational" (non-clinical positioning) is inherent to the paper's positioning and may draw reviewer scrutiny.
**Recommendation:** Consider adding a footnote to the first use of "behavioral health" that provides the FSL-specific definition more prominently, or consider using "behavioral wellness" in FSL-specific contexts while reserving "behavioral health" for the domain literature discussion.

---

## MEDIUM

### M1. Lexicon Compliance Audit -- PASS

**Location:** Full document scan
**Evidence:**
- "Participant" is used consistently for FSL users (24+ instances). "Patient" appears only in: (a) regulatory citations (42 CFR Part 2 "patient records," line 277; HIPAA definitions), (b) comparison table actor models ("Patient + Provider," line 412), (c) literature review descriptions of external systems.
- "Sovereign Guide" is used consistently for FSL practitioners (15+ instances). "Provider" appears only in: (a) comparison table descriptions of external systems, (b) wallet provider technical context ("wallet providers," "provider preference"), (c) regulatory context.
- "Practitioner" appears once in Section 5.3 (line 279, "independent practitioners") to describe the legal status of Sovereign Guides -- this is appropriate legal language, not clinical language.
- No instances of "therapist," "counselor," "clinician," or "treatment" are used to describe FSL services.
**Status:** PASS. Lexicon boundary is clean.

### M2. Informed Consent Message Design

**Location:** Lines 124-131 (Section 3.2, Step 4), Lines 230-238 (Section 4.3)
**Evidence:** The consent message contains:
- Plain-language description of what the user is consenting to
- Educational disclaimers (FSL is not a medical facility; data is educational, not clinical)
- Wallet address, nonce, and timestamp for cryptographic binding
The server validates required phrases including "educational purposes," "not a medical facility," and "sovereign data governance" (Listing 1, lines 212-214).
**Assessment:** The informed consent design is ethically sound for a wellness platform. The required-phrase validation ensures that every authenticated session was preceded by an explicit acknowledgment that the platform is educational and non-clinical. This is a stronger consent mechanism than click-through agreements because the participant must approve the full text in their wallet before signing.
**Minor concern:** The paper does not describe how consent message updates are handled. If the consent language changes (e.g., new disclaimers are added), are existing JWTs invalidated? Section 3.5 describes refresh and revocation but does not address consent message versioning.
**Recommendation:** Add a sentence noting whether consent message versioning is implemented and how message updates affect existing sessions.

### M3. "Sovereign" Terminology -- Appropriateness Check

**Location:** Throughout ("Sovereign Guide," "Sovereign Ledger," "SovereignSession," "SovereignAchievement," "sovereign data governance")
**Evidence:** The term "sovereign" is used extensively in FSL branding. In the clinical ethics context, "sovereignty" over health data is a meaningful concept aligned with patient autonomy principles. However, "Sovereign Guide" as a practitioner title could be misinterpreted as implying the guide has autonomous clinical authority.
**Assessment:** The paper defines "Sovereign Guide" parenthetically as "credentialed wellness facilitator" (line 100), which is appropriate. The sovereignty concept is consistently framed as applying to the participant's data, not to the guide's clinical authority.
**Status:** No change needed. The definition is clear.

### M4. Phase 5 Doctoral Research Framing

**Location:** Lines 478 (Section 10.3, item 10)
**Evidence:** Phase 5 is described as "Two-Party Wallet-Signed Mutual Authentication with Client-Side Encrypted Session Recording." The framing includes: "both Sovereign Guide and Participant submit EIP-191 signatures before session start," "live video encrypted in the browser (AES-256-GCM)," "participant holds sole decryption key," and "no auto-play capability."
**Clinical ethics assessment:** The Phase 5 design is ethically strong. Two-party mutual consent for session recording addresses a significant gap in telehealth ethics -- current platforms (Doxy.me, Zoom) allow recording with one-party initiation. Client-side encryption with participant-held keys ensures the recording cannot be accessed without explicit participant consent. The "no auto-play" design prevents accidental exposure.
**Status:** Phase 5 framing is correct and ethically well-positioned. The paper appropriately marks it as future work, not a current claim.

---

## LOW

### L1. "Educational Purposes" Framing Durability

**Location:** Lines 36, 212, 269-270
**Evidence:** The paper positions FSL as educational and non-clinical. If FSL later adds clinical features (e.g., outcome tracking, treatment planning), the "educational purposes" framing would need to be revisited. This is not a current issue but a sustainability consideration.

### L2. 42 CFR Part 2 Dismissal

**Location:** Lines 277-278
**Evidence:** The paper states 42 CFR Part 2 "does not apply because FSL does not operate as a federally assisted program and does not maintain substance use disorder patient records." This is correct but brief. If AlchemistForge shadow integration recordings ever touch substance use themes (which is possible given the self-directed nature), the 42 CFR Part 2 analysis may need revisiting.
**Recommendation:** No change needed for current paper. Flag for future regulatory review if AlchemistForge content becomes more structured.

### L3. No IRB Discussion for Case Study #1

**Location:** Line 394
**Evidence:** Section 8 mentions "the principal investigator's Case Study #1" but does not discuss IRB status for this self-study. Self-study by the PI may or may not require IRB approval depending on institutional policy. The paper notes IRB approval is planned for the formal participant study (Section 10.3, item 9).
**Recommendation:** Add a brief note clarifying that Case Study #1 is PI self-testing and does not involve external participants, hence IRB approval was not sought for this phase.

---

## DONE WELL

1. **Explicit non-clinical positioning.** The paper states its educational/wellness nature at least five times in different contexts (Abstract, Section 1, Section 3.1, Section 4.3, Section 5.2). This redundancy is appropriate and protective.

2. **Informed consent as architecture, not policy.** The most ethically significant contribution is that the consent mechanism is enforced by code (server rejects unsigned or improperly signed messages) rather than by policy (platform promises to check consent). This eliminates the gap between consent policy and consent enforcement.

3. **Revocation honesty.** The paper does not overclaim revocability. Section 10.2 explicitly acknowledges that JWT disconnection does not invalidate tokens and provides a precise characterization of what revocation means in this architecture.

4. **Voluntary disclosure model.** AlchemistForge's design -- where the participant chooses what to disclose, when, and whether -- is a strong implementation of participant autonomy. No data is collected passively or automatically.

5. **Zero-PHI as ethical design.** The decision to hold no PHI rather than to protect PHI is an ethically significant architectural choice. It eliminates entire categories of harm (data breach, unauthorized access to clinical records) by design.

---

## UNIQUE PERSPECTIVE (Clinical Ethics)

This paper presents the strongest consent architecture I have reviewed in the behavioral health informatics literature. The unification of authentication and informed consent into a single cryptographic event is not just a technical innovation -- it is an ethical innovation. Traditional informed consent in digital health is performative: the platform presents a wall of text, the user clicks a box, and the platform records the click. FSL's model is substantive: the participant must read the consent text in their wallet, approve it with a cryptographic signature, and the server validates that the required ethical disclaimers were present in the signed message.

The primary ethical tension in the paper is the "behavioral health" label. The paper is positioning itself in the behavioral health literature (the target journal is "Blockchain in Healthcare Today") while simultaneously claiming it is not a healthcare platform. This tension is inherent to the system's design -- it operates in the behavioral health domain while declining covered-entity status. The paper handles this tension honestly and repeatedly, but reviewers from a clinical background may still question whether a system that records "shadow integration" and "wellness engagement" is truly outside the scope of behavioral health treatment. The explicit definition of "behavioral health" as used in this paper (line 36) and the repeated educational disclaimers provide adequate defense, but the author should be prepared for this line of questioning during peer review.

The AlchemistForge Jungian framing is the most ethically nuanced element. Shadow work is a legitimate psychological concept, but its deployment in a permissionless, unsupervised context requires the kind of careful framing the paper mostly provides. The one missing piece is an explicit statement that the smart contract recording is a self-directed reflective tool, not a guided therapeutic process.

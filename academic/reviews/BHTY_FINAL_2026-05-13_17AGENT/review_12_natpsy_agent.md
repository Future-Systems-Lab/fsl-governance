# Review 12: NatPsy Agent — Naturopathic Psychology Domain Review

**Reviewer:** natpsy_agent (Agent 12 of 17)
**Date:** 2026-05-13
**Document:** `~/fsl-governance/academic/BHTY_PAPER_v2.md`
**Focus:** Behavioral health domain framing, sovereignty model for mental health, orthomolecular/Walsh Protocol references, Jungian shadow integration in AlchemistForge, educational wellness positioning

---

## VERDICT: ACCEPT WITH MINOR REVISIONS

## OVERALL

The paper positions FSL squarely in the "educational wellness" space rather than clinical behavioral health — a critical distinction that is mostly well-maintained but occasionally blurred. The sovereignty model is philosophically appropriate for naturopathic and integrative psychology approaches that emphasize client autonomy and self-directed healing. The Jungian shadow integration framing for AlchemistForge is the most distinctive behavioral health contribution and is handled with appropriate minimalism. The paper does not reference orthomolecular approaches or Walsh Protocol, which is appropriate since those are clinical frameworks and the paper explicitly avoids clinical positioning. The author's credentials (D.N.Psy., CBHP, BCHN) signal naturopathic psychology and holistic nutrition expertise, which aligns with the educational wellness framing.

---

## CRITICAL

1. **No critical naturopathic psychology issues identified.** The paper's behavioral health claims are appropriately scoped and do not overreach into clinical territory.

---

## HIGH

2. **"Behavioral health" vs. "educational wellness" framing tension.** The paper uses "behavioral health" 20+ times (title, abstract, keywords, throughout body) but explicitly states the system "operates strictly in the wellness and educational engagement space, not as a clinical treatment platform" (Section 1, line 36). "Behavioral health" in standard usage implies clinical services — mental health treatment, substance abuse treatment, behavioral interventions. The paper attempts to redefine "behavioral health" as a domain descriptor (what the data is about) rather than a service descriptor (what the platform provides), but this creates persistent ambiguity. A BHTY reviewer or reader may assume clinical behavioral health services are being offered. Recommend adding a definitions subsection or a more prominent disclaimer that "behavioral health" in this paper refers to the domain of data (wellness engagement related to behavioral patterns) rather than clinical behavioral health services.

3. **Sovereign Guide scope of practice undefined.** The paper introduces "Sovereign Guide (credentialed wellness facilitator)" but never specifies what credentials are required, what services a Sovereign Guide provides, or how the platform ensures Sovereign Guides do not provide clinical services. From a naturopathic psychology perspective, the boundary between "educational wellness facilitation" and "psychotherapy" or "counseling" is regulated at the state level and varies significantly by jurisdiction. The paper's architecture prevents PHI storage but does not prevent a Sovereign Guide from providing clinical services through the platform — it simply does not record clinical data. This is an important distinction: the architecture is zero-PHI, but the practice could still be clinical. The paper should acknowledge this boundary risk.

---

## MEDIUM

4. **Jungian shadow integration framing is appropriate but underexplained.** Section 6.2 describes AlchemistForge as recording "voluntary behavioral health engagement — specifically, Jungian shadow integration [30]." The single reference to Jung (1959) is the canonical source. However, the paper does not explain why shadow integration was chosen as the specific behavioral health use case, how shadow integration maps to the contract's functions (record a shadow aspect, mark integration complete), or what "shadow aspect" means for non-Jungian readers. For BHTY's audience (which includes clinicians, informaticists, and technologists), a 1-2 sentence explanation of the shadow integration concept would improve accessibility. The current framing assumes familiarity with Jungian analytical psychology.

5. **"Transmutation" terminology unexplained.** Section 8 references "demonstration transmutation events" — this is alchemical language consistent with Jungian individuation (shadow work as psychological alchemy), but it is jargon that will be opaque to most BHTY readers. Either define the term or use "engagement events" in the results section while reserving "transmutation" for the AlchemistForge-specific context.

6. **No mention of trauma-informed design.** For a system dealing with behavioral health engagement, particularly shadow integration (which involves confronting suppressed psychological material), the absence of any discussion of trauma-informed design principles is notable. The voluntary disclosure model partially addresses this (participants choose what to disclose), but the paper does not discuss: safeguards against triggering disclosures, the absence of a crisis protocol, or the lack of a human-in-the-loop for AlchemistForge (which is fully permissionless). From a naturopathic psychology standpoint, shadow work without practitioner guidance carries psychological risk, and a permissionless contract that records shadow aspects without any gatekeeping raises duty-of-care questions.

7. **Orthomolecular/Walsh Protocol absence is appropriate.** The paper does not reference orthomolecular approaches, Walsh Protocol, or biochemical individuality frameworks. This is correct — these are clinical intervention frameworks that would contradict the educational wellness positioning. The BCHN (Board Certified in Holistic Nutrition) credential in the author's byline suggests familiarity with these frameworks, but their omission from the paper is appropriate and intentional. **STATUS: PASS — no action needed.**

---

## LOW

8. **"Sovereignty" metaphor is philosophically aligned with naturopathic principles.** The naturopathic principle of "docere" (doctor as teacher) and the emphasis on patient self-responsibility maps well to the data sovereignty model. The participant is not a passive data subject but an active sovereign over their own information. This philosophical alignment is implicit but not stated. Consider adding a sentence to Section 1 connecting data sovereignty to the broader wellness autonomy tradition.

9. **No discussion of somatic or embodied data.** NeuroBalance is described as integrating "biometric data with on-chain consent management" but is in pre-implementation. From a naturopathic psychology perspective, biometric data (heart rate variability, galvanic skin response, sleep patterns) in a behavioral health context raises different sovereignty questions than session attestation data. The paper acknowledges NeuroBalance's pre-implementation status but does not discuss the additional consent requirements that biometric data will introduce. This is acceptable as future work but worth flagging.

10. **AlchemistForge "celebration" language.** Section 6.2 describes marking integration as complete using the language of "celebration." This is therapeutically appropriate (reinforcing positive behavioral change) and consistent with strengths-based approaches in naturopathic psychology. However, "celebration" is not a neutral technical term and may seem out of place in an academic paper. Consider "acknowledgment" or "attestation of completion" in the formal text.

---

## DONE WELL

- **Educational wellness positioning is clearly and consistently stated.** The paper never claims to provide clinical services, never uses diagnostic language, and explicitly disclaims covered-entity status.
- **Voluntary disclosure model respects autonomy.** AlchemistForge's design — the participant chooses what to disclose, when to disclose, and whether to mark integration — embodies the naturopathic principle of participant autonomy.
- **Zero-PHI model avoids clinical data entanglements.** By storing no clinical data, the system avoids the ethical and legal complexities of behavioral health record management.
- **Honest framing of AlchemistForge participation.** The paper states participation is "architect-initiated or campaign-generated" with "no external organic adoption." This prevents misleading claims about therapeutic effectiveness or user engagement.
- **Pseudonymous participation protects mental health data.** Wallet-address-only identification is particularly valuable in the behavioral health context where stigma remains a barrier to seeking help.
- **Author credentials are appropriate.** D.N.Psy. (Doctor of Naturopathic Psychology), CBHP (Certified Behavioral Health Professional), BCHN (Board Certified in Holistic Nutrition) are relevant credentials for a wellness technology paper.

---

## UNIQUE PERSPECTIVE (Naturopathic Psychology)

The paper occupies a novel and somewhat precarious position at the intersection of technology and behavioral health philosophy. From a naturopathic psychology standpoint, the sovereignty model is not just a technical architecture — it reflects a philosophical commitment to the therapeutic relationship as a collaboration between autonomous agents rather than a power dynamic between provider and patient. The Jungian shadow integration use case in AlchemistForge is particularly interesting because it takes one of the most personal and psychologically charged processes (confronting one's shadow) and provides a mechanism for the individual to record that process on their own terms, with no intermediary, no diagnostic label, and no clinical record. This is philosophically radical. However, the paper does not engage with the clinical literature on self-directed shadow work — which is limited and mixed in outcomes. The permissionless nature of AlchemistForge means there is no screening, no readiness assessment, and no crisis intervention available. While this is consistent with the "educational, not clinical" framing, a behavioral health practitioner reading this paper may reasonably ask: what happens when someone records a deeply distressing shadow aspect on an immutable blockchain and later regrets the disclosure? The paper should at least acknowledge this risk, even if the technical answer (pseudonymous, voluntary, no PII) mitigates it significantly.

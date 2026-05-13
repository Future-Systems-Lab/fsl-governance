# Compliance Agent — Figure Review

**Perspective:** Do the figures reinforce the zero-PHI / outside-HIPAA-scope framing? Or do they accidentally suggest PHI handling?
**Benchmark:** FSL lexicon compliance — no "patient," "diagnosis," "treatment," "provider" (display copy), "HIPAA compliant"

---

## FIGURE 1 — System Architecture

**VERDICT: NEEDS REVISION**

ISSUES:
- Compliance: The architecture diagram shows platform connections and data flows. If arrow labels include terms like "health records," "patient data," or "medical information," these would undermine the zero-PHI argument. From the SVG source, the labels appear to use FSL-compliant terminology ("consent attestation," "session data") but they are too small to verify at the rendered resolution.
- PHI risk: The connection between platforms and the database layer could be misread as "FSL stores health data in PostgreSQL" — the figure needs to make explicit that PostgreSQL holds engagement metadata (session timestamps, wallet addresses), NOT clinical content.
- HIPAA framing: The figure does not visually communicate that FSL operates outside HIPAA scope. A reviewer expecting a HIPAA-compliant system diagram will look for encryption markers, access control layers, and audit trails — FSL's argument is different (no PHI, therefore HIPAA doesn't apply) but the figure doesn't make this case.

SUGGESTED IMPROVEMENT: Add a clear visual boundary labeled "Zero-PHI Perimeter" showing that no clinical data crosses into FSL's on-chain or off-chain storage. Annotate the PostgreSQL layer explicitly: "Engagement metadata only — no clinical content, no Safe Harbor identifiers."

---

## FIGURE 2 — EIP-191 Consent Flow

**VERDICT: NEEDS REVISION**

ISSUES:
- Compliance: The consent flow is the strongest zero-PHI visual because it shows that the only data exchanged is a wallet address, a nonce, and a signature — no name, email, or clinical information. But this isn't visually emphasized.
- Lexicon: If any step references "patient authentication" or "health data consent," it violates FSL lexicon. Should use "participant authentication" and "engagement consent."
- PHI risk: The consent message construction (step 4) should visually show what IS in the message (wallet address, timestamp, educational disclaimer) and what is NOT (name, DOB, diagnosis).

SUGGESTED IMPROVEMENT: Add a callout box at step 4 showing the exact consent message format — emphasizing that it contains zero PII/PHI by design.

---

## FIGURE 3 — Zero-PHI Data Classification

**VERDICT: NEEDS REVISION (closest to usable)**

ISSUES:
- Compliance: This is the right figure to make the zero-PHI case. The three tiers correctly classify data by sensitivity and storage location. However, the figure needs to explicitly enumerate the 18 HIPAA Safe Harbor identifiers and show their absence across all tiers.
- PHI risk: Tier 2 label mentions "session metadata and aggregate wellness metrics" — a reviewer could argue that "wellness metrics" constitutes PHI if linked to a wallet address. The figure should clarify that wallet addresses are pseudonymous and that the metrics are engagement-derived (session count, completion rate), not clinical measurements.
- HIPAA framing: The figure title says "Zero-PHI Data Classification" which correctly frames the argument, but the visual doesn't sell it. The absence of PHI should be the dominant visual element, not a footnote.

SUGGESTED IMPROVEMENT: Split the figure into two sections: LEFT shows what FSL stores (pseudonymous engagement data), RIGHT shows what FSL explicitly does NOT store (the 18 Safe Harbor identifiers, checked off as "excluded"). This visual contrast makes the zero-PHI argument undeniable.

---

## FIGURE 4 — Attestation Lifecycle

**VERDICT: NEEDS REVISION**

ISSUES:
- Compliance: The attestation lifecycle correctly shows that only wallet addresses, timestamps, and content hashes are recorded on-chain. But the figure doesn't make this explicit — a reviewer seeing "session data" in an attestation flow might assume clinical content is recorded.
- Lexicon: Labels should use "Sovereign Guide" not "provider" or "practitioner" (for display copy context). "Participant" not "patient."
- PHI risk: The SessionStarted event parameters should be visually displayed: `(sessionId, guide address, participant address, timestamp)` — making it obvious that no clinical content is in the event.

SUGGESTED IMPROVEMENT: Show the exact on-chain data fields next to the attestation event, with a clear label: "On-chain record: wallet addresses + timestamp ONLY. No session content. No clinical data."

---

## COMPARATIVE BENCHMARK

For a paper making a "we don't need HIPAA because we hold no PHI" argument, the figures must be airtight. Any visual ambiguity about what data FSL handles will invite reviewer skepticism. MedRec and ADvoCATE paper figures explicitly show their data classification with labeled fields — FSL's figures should do the same, with the added emphasis on exclusion.

**Overall assessment:** None of the figures actively violate FSL compliance, but none of them actively reinforce the zero-PHI argument either. The figures are compliance-neutral when they should be compliance-positive. Figure 3 is closest to usable but needs the "what we DON'T store" visual to complete the argument.

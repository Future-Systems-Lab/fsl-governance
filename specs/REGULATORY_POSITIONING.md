# FSL Regulatory Positioning
**Status:** Authoritative as of May 5, 2026
**Last updated:** May 5, 2026

---

## Core Position

FSL operates OUTSIDE HIPAA regulatory scope by architectural design.

FSL is:
- NOT a covered entity (not a healthcare provider, health plan, or healthcare clearinghouse)
- NOT a business associate (does not process PHI on behalf of a covered entity)
- NOT a billing entity
- NOT subject to FHIR interoperability requirements

FSL records only:
- That a session occurred between two wallets
- At a specific timestamp
- With a specific service descriptor
- For a specific cost (paid by participant to practitioner directly, outside FSL)

FSL records contain NO:
- Personal health information (PHI)
- Demographic data
- Diagnostic codes
- Treatment information
- Insurance data
- Clinical notes
- Billing details

---

## What Practitioners Are Responsible For

If a Sovereign Guide using FSL is independently a covered entity (licensed clinician with NPI billing through insurance), HIPAA applies to THEIR practice — not to FSL.

The Sovereign Guide is responsible for:
- Their own HIPAA compliance program
- Their own clinical records (held in their own systems)
- Their own billing infrastructure
- Their own insurance interactions
- Their own FHIR-formatted record exchange if needed

FSL provides infrastructure that allows sessions to be cryptographically attested between wallets. The clinical and billing layers belong entirely to the practitioner.

---

## Why This Architecture Is Stronger

1. **HIPAA structural inapplicability** is stronger than "HIPAA compliance" — the regulation doesn't apply because there's no PHI to protect.

2. **No insurance regulation exposure** — FSL is not a billing entity.

3. **No legal-review bottleneck** for FSL operations — practitioners and participants can transact today.

4. **Zero PHI breach risk** — you can't leak what you don't hold.

5. **Genuinely sovereign architecture** — neither party depends on FSL to maintain clinical or billing records.

---

## Behavioral Health Proving Ground Context

FSL was designed against the constraint of serving behavioral health, where HIPAA + 42 CFR Part 2 (Substance Use Disorder records) impose the strictest data protection rules. The deliberate stress test framing remains valid:

The proving ground is one of the most heavily regulated domains. By proving the architecture works WITHOUT touching PHI in that domain, FSL demonstrates the pattern is exportable to other regulated domains (financial records, government identity, educational credentials) where participant-controlled data sovereignty is load-bearing.

The architecture's value is in what it REFUSES to handle, not in what it processes.

---

## What This Changes In Document Updates

The following documents need to be reviewed to ensure consistent regulatory positioning:

### Already Aligned (no changes needed)
- Whitepaper Section 1 (drafted May 5, 2026) — references HIPAA + 42 CFR Part 2 as proving ground regulatory context, which is correct

### Needs Update (Tomorrow's Work)
- IPFS Methodology Document — currently frames FSL as more deeply HIPAA-aligned than the architecture supports. Add to IPFS Methodology reframe session.
- BHTY Academic Paper draft — verify regulatory framing matches new position
- Pitch deck — verify wording aligns
- Terms of Service — verify FSL is not representing itself as a covered entity

### Faculty Engagement Notes
- Boscovic positioning frame — "credentialed provider who lived both sides of the system failure" — still valid; references Dr. Meg's clinical experience, not FSL's regulatory status

---

## Going Forward

When asked "Is FSL HIPAA compliant?":

**Don't say:** "Yes, FSL is HIPAA compliant."

**Say:** "FSL operates outside HIPAA's regulatory scope by architectural design. The system holds no PHI. HIPAA applies to healthcare providers, health plans, and healthcare clearinghouses — FSL is none of these. The practitioners using FSL are independently responsible for their own HIPAA compliance within their own clinical practices."

When asked "Is FSL FHIR compliant?":

**Don't say:** "Yes, FSL supports FHIR."

**Say:** "FSL doesn't exchange clinical records, so FHIR doesn't apply at the infrastructure layer. Practitioners can maintain FHIR-formatted records in their own clinical systems independent of FSL."

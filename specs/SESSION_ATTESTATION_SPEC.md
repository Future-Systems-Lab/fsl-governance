# Session Attestation Portal — Architecture Spec
## SovereignLedger's actual job
**Status:** Spec finalized — replaces earlier superbill spec
**Last updated:** May 5, 2026

---

## What SovereignLedger Does

SovereignLedger is a session-occurrence attestation layer. Nothing more.

It records on-chain proof that:
- Wallet A (Sovereign Guide) and
- Wallet B (Participant)
- Engaged in a session at timestamp T

That's the entire scope. No clinical content. No financial content. No PII. No CPT codes. Just immutable proof a session happened between two consenting wallets.

---

## What SovereignLedger Does NOT Do

- Generate superbills
- Hold or process insurance information
- Apply CPT codes
- Track fees or payment
- Submit anything to insurers
- Hold PHI
- Provide clinical documentation
- Process billing in any form

---

## The Practitioner-Participant Relationship

The billing/clinical relationship is OUTSIDE FSL:

- Practitioner generates their own superbill using their existing clinical software
- Practitioner provides CPT codes per their own licensure
- Practitioner sets their own fees
- Participant pays the practitioner directly (FSL doesn't see the transaction)
- Participant submits superbill to their own insurer if pursuing reimbursement
- Participant fills in their own PII at submission time

FSL's job: prove the session happened. That's it.

---

## Why This Architecture Is Stronger

1. **Zero HIPAA exposure** — no PHI ever touches FSL
2. **Zero insurance regulation exposure** — FSL is not a billing entity
3. **Genuinely sovereign** — the attestation record belongs to both parties on-chain, not held by FSL
4. **No legal-review bottleneck** — users can transact today; FSL doesn't gate billing flow
5. **Architecturally clean separation** — FSL is infrastructure, not a clinical system

---

## What Each Party Gets

**Participant:**
- Verifiable, immutable record they had a session (without depending on practitioner's records)
- On-chain timestamp they own forever
- Can independently demonstrate to insurers that a session occurred with a credentialed practitioner

**Sovereign Guide:**
- Verifiable record of services rendered
- Builds on-chain reputation (session count, tenure, credential tier)
- Soulbound credential reflects depth of engagement (cannot be transferred or sold)

**FSL:**
- Provides infrastructure
- Stays out of clinical and billing flows
- Charges practitioners for tooling and visibility, NOT for billing services

---

## Premium Tier Differentiation (Revised — Not Billing-Based)

### Free Tier
- Wallet-gated access
- Basic SovereignLedger attestations (registerClaim with session metadata)
- Standard session count display
- Soulbound credential earned over time
- Listed in basic practitioner directory

### Premium Tier
- Verified credential tier publicly displayed
- Practice analytics dashboard (anonymized aggregate metrics, no PII)
- White-label practitioner profile page
- Participant-practitioner matching algorithm
- Featured placement in directory
- Custom branding for their FSL profile
- Priority technical support

Note: Premium tier does NOT include billing features. FSL never enters the billing relationship.

---

## What Gets Built Next (Post-Admission / Post-Funding)

1. Session-attestation UI improvements:
   - Auto-hash generation (Sovereign Guide doesn't enter hash manually)
   - Participant consent check before anchoring (mutual signature)
   - Claim history list (not just count)
   - Link between on-chain attestation and backend session booking
   - Participant notification on-chain or via Telegram bot

2. Sovereign Guide profile page enhancements (premium tier features above)

3. Directory and matching infrastructure

---

## Dependencies

- SovereignLedger v2 wired (DONE — commit e70e3c74d)
- Session close event hooks (need verify exist on each platform)
- Practitioner tier subscription system (NOT YET BUILT)

---

## Out Of Scope Permanently

The following will NEVER be FSL features:
- Superbill generation
- CPT code library
- Insurance integration
- Reimbursement processing
- PHI storage or transmission
- Billing software

These are practitioner-side responsibilities, between practitioner and participant.

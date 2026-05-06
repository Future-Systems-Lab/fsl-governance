# Superbill Portal — Architecture Spec
## Status: Spec only — not yet built
**Last updated:** May 5, 2026

---

## Core Principle

FSL provides the decentralized superbill skeleton. The participant owns the personal data layer. PII never enters FSL infrastructure.

---

## Auto-Population (FSL-Generated)

When a session closes on HypnoNeuro or EncryptHealth, the superbill auto-populates:

- Sovereign Guide wallet address (not name unless practitioner opts in)
- Service rendered (generic descriptor for free tier; custom for premium tier)
- Cost
- Date/time of session
- Session ID / on-chain attestation reference (links to SovereignLedger registerClaim)
- Sovereign Guide credential tier (from SovereignAchievement ERC-1155 soulbound NFT)

NO participant PII is auto-populated. Architecturally enforced.

---

## User-Filled Section (At Submission Time)

When the participant downloads/sends the superbill to their insurer for reimbursement, THEY fill in:

- Name
- DOB
- Address
- Insurance member ID
- Group number
- Provider NPI (if their insurer requires it beyond wallet address)
- Any other carrier-specific fields

This data NEVER touches FSL infrastructure. The user fills it client-side at the moment of submission, prints/downloads/emails to insurer themselves.

---

## Tier Differentiation

### Free Tier (Generic Skeleton)
- Service descriptors are generic ("wellness session — 60 min")
- No CPT codes auto-applied (regulatory caution)
- Standard FSL-branded layout
- Practitioner can edit before sending to participant

### Premium Tier (White-Label)
- Practitioner-customizable service code library
- Practice branding/logo
- Custom payment terms
- Specialized fields for modality (orthomolecular protocols, hypnotherapy session types, etc.)
- Practice-specific late fee language
- Optional: practitioner uploads their own CPT code library if they're a licensed clinician with billing rights

---

## On-Chain Attestation

The superbill is a structured form of SovereignLedger claim. Use registerClaim() with claim type = "superbill" and metadata pointing to encrypted IPFS-pinned superbill skeleton (no PII).

The attestation proves:
- Session occurred
- Sovereign Guide identity (via wallet)
- Service rendered
- Cost
- Timestamp

Insurer can verify on-chain that the session happened without FSL ever holding PHI.

---

## Compliance Notes (BEFORE BUILD)

1. CPT code auto-population is regulated territory — defer until legal review complete (post-funding TODO)
2. Free tier defaults to generic descriptors to stay outside billing regulation scope
3. Premium tier requires practitioner attestation that they have appropriate billing credentials (NPI, state license, etc.) before unlocking custom CPT codes
4. HIPAA does NOT apply to FSL because no PHI is held — but document this clearly in spec to defend the architectural choice

---

## Build Status

NOT YET BUILT. This is a future spec for when the practitioner pricing tiers go live.

Estimated complexity:
- Free tier (generic): MEDIUM (form generation + IPFS pin + registerClaim wiring)
- Premium tier (customization): HIGH (template engine, code library management, branding)

---

## Dependencies

- SovereignLedger v2 wired (DONE)
- Practitioner subscription tier system (NOT YET BUILT)
- Session close event hooks (need to verify exist on each platform)
- IPFS encrypted upload flow for participant side (need to verify)

---

## Add to Tomorrow's Agenda

This spec is ready. Flag for review when practitioner tier system is being designed. Likely a Q3 2026 build target post-funding or post-ASU admission.

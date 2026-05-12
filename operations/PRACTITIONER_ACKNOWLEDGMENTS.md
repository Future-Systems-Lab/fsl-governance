# Sovereign Guide Onboarding Acknowledgments

**Implementation:** Wallet-signed via EIP-191 `personal_sign` during onboarding
**Storage:** Signed attestation hash in PostgreSQL + on-chain anchor via SovereignLedger
**Status:** Draft — requires attorney review before live deployment

> **NOTICE:** This document is operational policy documentation, not legal advice. Dr. Meg should have a licensed attorney review these acknowledgments before deploying them as binding wallet-signed consent in the production onboarding flow.

---

## 1. INDEPENDENT PRACTITIONER STATUS

"I acknowledge that I am an independent practitioner using FSL's Web3 infrastructure to facilitate my own practice. I am NOT an employee, contractor, or agent of Future Systems Lab LLC. FSL provides decentralized payment rails, attestation infrastructure, and credential verification. I am solely responsible for the practice of my profession."

## 2. TAX RESPONSIBILITY

"I acknowledge that ALL income I receive through the FSL ecosystem — including but not limited to session fees from participants, HNT token rewards, BenevolenceFund distributions, SovereignAchievement credentials with monetary value, and any other crypto or fiat compensation — is my own taxable income. I am solely responsible for:

- Reporting all income to my taxing authority (IRS, state, local)
- Self-employment tax (Schedule C, SE Tax for US recipients)
- Quarterly estimated tax payments where applicable
- Tracking cost basis on any crypto received and capital gains when converted/spent
- Maintaining records for tax purposes

FSL does NOT issue W-2s, does NOT withhold taxes, does NOT remit taxes on my behalf, and does NOT provide tax advice. I understand crypto receipts are generally taxable as ordinary income at fair market value on the date received."

## 3. LICENSE & SCOPE OF PRACTICE

"I acknowledge that I am personally responsible for maintaining all licenses, certifications, and scope-of-practice compliance required by my state, federal, and professional governing bodies. FSL verifies credentials at intake but does not guarantee, supervise, or oversee my practice. Any disciplinary action, license lapse, or scope violation is solely my responsibility."

## 4. HIPAA & PRIVACY

"I acknowledge that FSL operates outside HIPAA regulatory scope by architectural design. If I am independently a HIPAA covered entity or business associate (e.g., I bill insurance, I integrate FSL with my covered EHR), I am responsible for maintaining my own HIPAA program. FSL is not my business associate. No Business Associate Agreement (BAA) exists or is required."

## 5. PROFESSIONAL LIABILITY

"I acknowledge that professional liability insurance, malpractice coverage, and any other practice insurance is my sole responsibility. FSL does not provide coverage for my practice."

## 6. INSURANCE BILLING

"If I bill insurance for any session conducted through FSL infrastructure, I do so as an independent provider with my own NPI, billing credentials, and payer contracts. FSL does not submit claims, hold payer relationships, or have access to insurance reimbursement on my behalf. Sovereign Navigation is participant-facing education only — not insurance administration."

## 7. DATA HANDLING

"I acknowledge that any clinical notes, treatment plans, diagnostic information, or PHI I generate during practice is stored and protected by me using my own systems — not by FSL. FSL holds zero PHI. Any clinical records are my responsibility under applicable record-keeping laws."

## 8. PARTICIPANT RELATIONSHIPS

"I acknowledge that any practitioner-participant relationship formed through FSL is between me and the participant directly. FSL is not a party to the therapeutic relationship. Termination, transfer, and continuity of care are between practitioner and participant."

## 9. REVENUE SPLIT ACKNOWLEDGMENT

"I acknowledge the standard revenue split: 70% to me as Sovereign Guide, 27% to FSL operations, 3% to BenevolenceFund. BenevolenceFund distributes annually April 1: 44/33/22% to top 3 Guides by participant HNT earned, plus 1% to top participant. Distribution from BenevolenceFund is contingent on participation metrics and is not guaranteed compensation."

## 10. NO EMPLOYMENT BENEFITS

"As an independent practitioner, I am not entitled to: health insurance, retirement contributions, paid time off, unemployment insurance, workers' compensation, or any other employee benefit through FSL."

---

## Implementation Notes

- All 10 acknowledgments presented individually during `/provider/credential-gate` onboarding
- Each must be explicitly accepted (checkbox or equivalent)
- Combined document signed via EIP-191 `personal_sign` with Guide's wallet
- Signed message includes: all 10 acknowledgment texts + Guide wallet address + server nonce + ISO 8601 timestamp
- Server verifies signature via ECDSA recovery
- Attestation stored in `provider_accounts` table (`consents_signed_at`, `consents_ipfs_hash`)
- Content hash anchored on-chain via SovereignLedger contract
- Guide cannot access `/provider/dashboard` until all consents are signed (enforced by middleware consent gate)

## Attorney Review Required Before Live Deployment

Items requiring legal review:
1. Independent contractor classification language (IRS 20-factor test compliance)
2. Tax disclaimer adequacy (state-specific requirements vary)
3. HIPAA scope positioning (confirm no BAA trigger exists)
4. Revenue split characterization (profit-sharing vs. fee-for-service vs. licensing)
5. Enforceability of wallet-signed acknowledgments as binding agreements
6. State-specific practitioner scope-of-practice requirements
7. Professional liability disclaimer adequacy

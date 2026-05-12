# Sovereign Guide Gateway — Integration TODO

**Status:** Planning (requires attorney review of acknowledgments before implementation)

## Current State

The `/provider/credential-gate` page currently requires:
- 9 consent items covering sovereignty, PHI, 70/27/3 fee split, attestation, BenevolenceFund, tiers, dispute resolution, revocation
- EIP-191 `personal_sign` on all items
- Calls `/api/provider/sign-consents` on success
- Writes `consents_signed_at` + consent hash to `provider_accounts`

## Required Updates

### 1. Expand Acknowledgments to 10 Items
Replace current 9-item consent list with the 10 acknowledgments from `PRACTITIONER_ACKNOWLEDGMENTS.md`:
1. Independent Practitioner Status
2. Tax Responsibility (all income, not just FSL rewards)
3. License & Scope of Practice
4. HIPAA & Privacy (practitioner's own program)
5. Professional Liability
6. Insurance Billing (if applicable)
7. Data Handling
8. Participant Relationships
9. Revenue Split Acknowledgment
10. No Employment Benefits

### 2. Display Crypto Tax Reference
- Add link to `CRYPTO_TAX_REFERENCE.md` content within the onboarding flow
- Display before acknowledgment #2 (Tax Responsibility)
- Not gated — informational only

### 3. On-Chain Hash Anchor
- Combined acknowledgment document signed via EIP-191
- Content hash stored in PostgreSQL (`consents_ipfs_hash`)
- Hash anchored on-chain via SovereignLedger contract call

### 4. Middleware Enforcement
- Guide cannot access `/provider/dashboard` until all 10 acknowledgments signed
- Enforced by existing consent gate middleware (no new middleware needed)
- `consents_signed_at` timestamp in JWT claims controls access

## Blocked By
- [ ] Attorney review of acknowledgment language
- [ ] Dr. Meg approval of final acknowledgment text
- [ ] Tax professional review of crypto tax reference accuracy

## Files
- `operations/PRACTITIONER_ACKNOWLEDGMENTS.md` — the 10 acknowledgments
- `academic/study_materials/CRYPTO_TAX_REFERENCE.md` — tax reference sheet
- `encrypthealth/frontend/app/provider/credential-gate/page.tsx` — current implementation
- `encrypthealth/frontend/app/api/provider/sign-consents/route.ts` — consent storage API

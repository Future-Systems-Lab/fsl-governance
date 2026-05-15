# Phase 5 — Doctoral Research Contribution: Canonical Framing

**Locked:** 2026-05-14
**Single source of truth for:** LOI, advisor packet, BHTY paper, ASU application essays, Command Center

---

## Short Form (≤30 words)

Dual multi-sig EIP-191 session attestation with threshold-derived client-side encryption — bilateral wallet-signed consent where no single party can decrypt unilaterally.

---

## Long Form

Both Sovereign Guide AND Participant produce EIP-191 signatures over the same session payload (bilateral, temporally bound, written on-chain). Session recording is client-encrypted; the encryption keys are threshold-derived from both signatures, so neither party — and not FSL — can decrypt the recording unilaterally.

**Why this is an open research problem:**

- EIP-191 is single-signer by design — no canonical pattern for mutual signing bound to a session.
- EIP-1271 validates contract-account signatures — wrong shape for two independent EOA signatures co-bound to a session payload.
- Existing multi-sig wallets (Safe, etc.) solve treasury, not session attestation. Threshold signature schemes (FROST, GG18/GG20) exist as cryptographic primitives but no deployed consent pattern combines them with EIP-191 mutual session auth and client-encrypted recording without centralized key custody.
- The intersection — wallet-signed mutual session auth bound to client-encrypted media, no key escrow — is the genuine gap.

**Status:** Phase 1 deployed and operational on Sepolia (SovereignSession contract verified, deep-dive 2026-05-14 confirms Phase 5 NOT IMPLEMENTED). Phases 2–4 scaffolded/specified. Phase 5 is the unsolved layer and the applied-project contribution submitted with the ASU DEng (Spring 2027) application.

---

## Corrected Phase Status (per deep-dive 2026-05-14)

| Phase | Label | Status | Evidence |
|-------|-------|--------|----------|
| 1 | Contract Deployment | ✅ Deployed | SovereignSession at 0xbeb1...65A1, signaling server on VPS |
| 2 | Bilateral Consent Capture | ⚠️ Scaffolded | Single-party (Guide-only) attestation deployed. Co-signing pending Phase 5 |
| 3 | EncryptHealth Integration | ⚠️ Specified | Architecture specified. Direct contract calls pending |
| 4 | Session Attestation | ⚠️ Specified | Schema designed. No on-chain attestation transactions to date |
| 5 | Dual Multi-Sig + Threshold Encryption | 🔴 Open Research Problem | Not implemented in any form. This is the doctoral contribution |

---

## Usage Rules

- **Bošković panel / Ghasemzadeh panel:** Short form only, in passing
- **Ahn panel:** Long form in full, primary real estate. Add "Technical primitives under evaluation" naming FROST and GG18/GG20 as candidates (NOT selected)
- **BHTY paper:** Use "in-development architectural extension under a pending provisional patent" — do not name threshold schemes in the journal paper
- **LOI / ASU application:** Long form, with Phase status table
- **CV:** Keep existing SovereignSession entry, update if Phase status table language is adopted

# Superbill Upload Flow Audit

**Date:** 2026-04-29
**Scope:** EncryptHealth Sovereign Guide dashboard superbill upload flow
**Repo:** HypnoNeuro/encrypthealth/frontend + VPS backend at 74.208.202.239

---

## Answer: NO

A Sovereign Guide cannot upload a superbill end-to-end via the dashboard right now. The flow is partially built but has critical gaps preventing a complete upload-to-attestation pipeline.

---

## Component-by-Component Assessment

### 1. UI — PARTIAL

**What exists:**
- The **provider dashboard** (`app/provider/dashboard/page.tsx`) has a "Register Claim on SovereignLedger" form that accepts a participant wallet, session hash, and claim type (with "Superbill" as a dropdown option). This is an on-chain attestation form, NOT a file upload form.
- The **participant-facing sovereign-ledger page** (`app/sovereign-ledger/page.tsx`) has a document upload button ("Upload Document") that accepts PDF/JPG/PNG/DOC files and calls `POST /api/documents/upload`. It labels these as "Superbills, EOBs, lab results, receipts."
- The **provider demo dashboard** (`app/provider/demo/[slug]/page.tsx`) has a superbills tab that fetches from `GET /api/provider-data/superbills/:wallet` and displays demo data.

**What's missing:**
- **No superbill upload UI on the provider/guide dashboard itself.** The guide cannot upload a superbill PDF from their dashboard. They can only register an on-chain claim with a session hash.
- The upload UI exists only on the participant side (sovereign-ledger page), not on the guide side.

### 2. Backend Superbill Generation — EXISTS

**What exists:**
- `superbill-routes.js` on VPS provides:
  - `POST /api/sessions/practitioner-complete` — auto-generates a superbill PDF (via Python scripts) when a guide marks a session complete. Stores base64 PDF in `session_superbills` table.
  - `GET /api/sessions/superbill/:sessionId` — retrieves a generated superbill by session ID.
  - `POST /api/sessions/sign-superbill` — signs a superbill with a wallet signature hash.
- `superbillService.js` generates PDFs using Python scripts (`superbill_fsl.py`, `superbill_practitioner.py`) and stores them in PostgreSQL.
- `provider-data-routes.js` provides `GET /api/provider-data/superbills/:wallet` listing superbills for a guide.

**What's missing:**
- The `POST /api/documents/upload` endpoint called by the participant sovereign-ledger page **does not exist** on the backend. The upload silently fails and falls back to "local-only" hash.

### 3. Encryption — PARTIAL

**What exists:**
- `lib/filecoin.ts` provides `uploadHealthData()` using Lighthouse SDK for IPFS/Filecoin encrypted storage. Used in `provider/notes/page.tsx` for wellness plans.
- `grantProviderAccess()` and `revokeProviderAccess()` exist for wallet-gated file sharing.

**What's missing:**
- The superbill flow does NOT use the Lighthouse/Filecoin encryption pipeline. Superbills are stored as base64 in PostgreSQL, not encrypted on IPFS.
- The participant upload flow calls a non-existent `/api/documents/upload` endpoint, not the Lighthouse SDK.

### 4. On-Chain Attestation — EXISTS (but disconnected)

**What exists:**
- Provider dashboard calls `registerClaim()` on SovereignLedger contract (`0x4afA577...`) on Sepolia with MetaMask.
- Contract supports claim types including "superbill."
- Read-side: fetches total claims and guide-specific claim IDs from chain.

**What's missing:**
- The on-chain attestation is manual — the guide must paste a session hash and participant wallet. There is no automated flow where completing a session auto-generates a superbill AND anchors it on-chain in one action.

### 5. Consent Check — NOT IMPLEMENTED

**What exists:**
- `lib/filecoin.ts` has `grantProviderAccess()` / `revokeProviderAccess()` for data sovereignty.

**What's missing:**
- No consent verification happens in the superbill flow. There is no check that the participant has granted the guide permission before generating or viewing a superbill.

---

## Summary Table

| Component | Status | Notes |
|-----------|--------|-------|
| Guide upload UI | MISSING | No file upload on provider dashboard; only manual claim form |
| Participant upload UI | BROKEN | Calls non-existent `/api/documents/upload` endpoint |
| Backend generation | EXISTS | Auto-generates PDF on session complete via Python scripts |
| Backend retrieval | EXISTS | GET endpoint returns base64 PDF |
| Backend signing | EXISTS | POST endpoint marks superbill as signed |
| Document upload endpoint | MISSING | `/api/documents/upload` not implemented |
| IPFS/Filecoin encryption | UNUSED | Lighthouse SDK exists but not wired into superbill flow |
| On-chain attestation | EXISTS | Manual only; not integrated with superbill generation |
| Consent/access control | MISSING | No participant consent check in superbill pipeline |

---

## Estimated Work to Complete

1. **Create `/api/documents/upload` backend endpoint** — Accept multipart file, store in PostgreSQL and/or pin to Lighthouse IPFS. ~2-4 hours.
2. **Add superbill file upload to provider dashboard** — File input + FormData POST to backend. ~2-3 hours.
3. **Wire Lighthouse encryption into superbill storage** — Replace or supplement base64 PostgreSQL storage with encrypted IPFS pinning. ~3-5 hours.
4. **Automate on-chain attestation** — After superbill generation, auto-call `registerClaim()` with the IPFS CID as session hash. ~2-3 hours.
5. **Add consent verification** — Before generating/viewing superbill, check that participant has granted access via Lighthouse ACL. ~3-4 hours.
6. **End-to-end integration testing** — Verify full flow: session complete -> PDF generated -> encrypted on IPFS -> anchored on-chain -> participant notified -> consent-gated retrieval. ~2-3 hours.

**Total estimated effort: 14-22 hours of development work.**

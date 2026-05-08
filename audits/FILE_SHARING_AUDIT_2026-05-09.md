# File Sharing & Data Sovereignty Audit
## Honest Assessment: What's Real vs. Scaffolded
**Date:** May 9, 2026
**Scope:** EncryptHealth frontend file upload, download, revocation, sharing, encryption

---

## Summary

| Feature | Status | Detail |
|---------|--------|--------|
| **File upload** | FULLY IMPLEMENTED | Lighthouse SDK → IPFS, CID returned, registered on VPS |
| **Download My Record** | PARTIALLY IMPLEMENTED | Works on sovereignty/data page only. Settings + dashboard buttons have no handler. |
| **Revoke All Access** | PARTIALLY IMPLEMENTED | Per-guide revocation works (multi-layer). Dashboard "Revoke All Access" button has no onClick handler. |
| **Access sharing (grant)** | FULLY IMPLEMENTED | Backend consent API + Lighthouse shareFile() + local state |
| **Access revocation (per-guide)** | FULLY IMPLEMENTED | Lighthouse revokeFileAccess + consent API + EIP-191 signed proof |
| **Client-side encryption** | NOT IMPLEMENTED | Delegated entirely to Lighthouse SDK. No local AES/crypto library. |
| **Consent scopes** | PARTIALLY IMPLEMENTED | UI lets user select scopes (mood, nutrition, etc.) but scopes are NOT sent to backend — backend receives only wallet addresses |

---

## 1. File Upload

**Status: FULLY IMPLEMENTED**

- `uploadHealthData()` in `lib/filecoin.ts` calls Lighthouse SDK
- File → Lighthouse encrypted upload → CID returned
- CID registered in localStorage (`fsl_cids`) + synced to VPS `/api/cids`
- Sovereign Ledger page has working upload UI for PDF, JPG, PNG, DOC
- Lighthouse handles encryption (FHE) — FSL does not encrypt client-side
- Returns `{ cid, encrypted: true }` — the `encrypted: true` flag reflects Lighthouse's encryption, not FSL code

**Honest note:** The claim "your wallet key is the only master key" depends on Lighthouse's implementation, not FSL code. FSL delegates encryption entirely.

## 2. Download My Record

**Status: PARTIALLY IMPLEMENTED**

| Surface | Wired? | What happens |
|---------|--------|-------------|
| `/sovereignty/data` page | YES | Retrieves all CIDs from localStorage, fetches from Lighthouse gateway, packages as JSON, triggers browser download |
| `/participant/settings` "Export All Health Data" button | NO | Button exists, no onClick handler |
| `/participant/dashboard` sidebar | NO | Button exists, no handler |

**What gets downloaded:** JSON blob containing all CID entries + their IPFS content. Does NOT include uploaded files as binary — only the JSON data Lighthouse returns. Does not include PostgreSQL records (session history, mood entries, billing) — only IPFS-pinned content.

## 3. Revoke All Access

**Status: PARTIALLY IMPLEMENTED**

**Per-guide revocation (works):**
1. Lighthouse `revokeFileAccess()` — removes decryption permission for specific CID + wallet
2. Backend `/api/consent/revoke` — marks consent as revoked in PostgreSQL
3. EIP-191 `personal_sign` — cryptographic proof of revocation intent
4. Local state update — marks grant as `active: false`

**"Revoke All Access" button on dashboard sidebar:**
- Button rendered (line 179)
- **Has no onClick handler** — purely cosmetic
- Does NOT invalidate JWT (JWT expires naturally at 15-min TTL)
- Does NOT delete PostgreSQL data

## 4. Access Sharing

**Status: FULLY IMPLEMENTED**

Two paths:
1. **Backend consent API** (`/api/consent/grant`) — records grant in PostgreSQL `consent_grants` table
2. **Lighthouse SDK** (`shareFile()`) — grants decryption access to provider wallet for specific CID

**Gap:** Consent scopes (mood data, nutrition, lab results, session notes) are selectable in UI but **never transmitted to backend**. The backend receives only `{ user_wallet, provider_wallet }` — no scope information. Scope enforcement does not exist server-side.

## 5. Encryption

**Status: DELEGATED (not FSL-implemented)**

| Layer | What | Implementation |
|-------|------|---------------|
| File encryption | Lighthouse FHE | Delegated to Lighthouse SDK |
| File decryption | Lighthouse gateway | Delegated — gateway handles auth per wallet |
| JWT | HMAC-SHA256 | `jose` library, server-side |
| Wallet signatures | ECDSA (EIP-191) | ethers.js, browser |
| localStorage | **UNENCRYPTED** | Plain JSON — CIDs, grant records, wallet refs |
| Client-side AES | **NOT IMPLEMENTED** | No crypto-js, tweetnacl, or libsodium in dependencies |

**Critical finding:** localStorage stores CIDs, provider wallet addresses, access grant history, and timestamps in plaintext. An XSS vulnerability could expose the entire consent and data reference graph.

---

## What Dr. Meg Can Say to Reviewers

**Safe to say:**
- "Files are encrypted and stored on IPFS via Lighthouse — a decentralized storage network"
- "Access is controlled per-wallet — participants grant and revoke file access to specific Sovereign Guides"
- "Consent grants are recorded in PostgreSQL and can be revoked with a wallet signature"
- "The architecture is designed for participant-controlled data sovereignty"

**Should NOT say:**
- "FSL encrypts files client-side" — encryption is delegated to Lighthouse
- "Download My Record exports everything" — it exports IPFS content only, not PostgreSQL records
- "Revoke All Access deletes all data" — the dashboard button is non-functional; per-guide revocation works

**Accurate framing:**
- "File encryption is handled by Lighthouse's decentralized storage network. FSL's contribution is the wallet-scoped consent architecture — who can access what, controlled by cryptographic signatures."

---

## Buttons That Need Wiring (Not Yet — Audit Only)

| Button | Location | Current State |
|--------|----------|---------------|
| "Export All Health Data" | participant/settings | No onClick handler |
| "Download My Record" | participant/dashboard sidebar | No onClick handler |
| "Revoke All Access" | participant/dashboard sidebar | No onClick handler |

These are the three buttons a reviewer might click and get no response.

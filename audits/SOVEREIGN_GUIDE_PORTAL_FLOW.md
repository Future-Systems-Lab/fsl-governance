# Sovereign Guide Portal — User Experience Flow
## What a Sovereign Guide sees and can do on the EncryptHealth dashboard
**Date:** May 6, 2026
**Based on:** commit e70e3c74d (SovereignLedger integration wired)

---

## 1. What the Sovereign Guide SEES after login

The dashboard displays two main sections:

### Section A: Recent Participant Activity
- Currently shows: **"No participants have completed sessions yet. Activity will appear here as participants engage."**
- This is the empty state (mock data was removed in the same commit batch). Real activity will populate here once participants complete sessions.

### Section B: SovereignLedger — On-Chain Attestations
Two metric tiles + an action form:

| Tile | What It Shows |
|------|--------------|
| **Total On-Chain Claims** | A large number showing the total claim count from the SovereignLedger v2 contract (read via `claimCount()`) |
| **Your Attestations** | Count of claims specifically tied to this Guide's wallet address (read via `getGuideClaims(address)`) |

Below the tiles: a form to anchor new records on-chain.

At the bottom: the contract address displayed as a truncated link (e.g., `0x4afA57...aCc4 on Sepolia`).

---

## 2. What the Sovereign Guide CAN DO

### Action 1: View total on-chain claim count
- **What:** See how many total claims have been registered across ALL Guides
- **Flow:** Automatic — loads on page render, reads from Sepolia via RPC fallback chain
- **No user action required**

### Action 2: View their own attestation count
- **What:** See how many claims are tied to their specific wallet
- **Flow:** Automatic — reads `getGuideClaims(walletAddress)` on page load
- **No user action required**

### Action 3: Register a new claim on-chain
- **What:** Anchor a session record to the SovereignLedger v2 contract
- **Flow:**
  1. Guide fills in 3 fields:
     - **Participant wallet** — the participant's 0x address (text input, required)
     - **Session hash** — an IPFS CID or SHA-256 hash of the session record (text input, required)
     - **Claim type** — dropdown with 3 options: "Session" (default), "Attestation", "Superbill"
  2. Guide clicks **"Register Claim on SovereignLedger"** button
  3. Browser wallet (Brave Wallet / MetaMask) pops up requesting transaction signature
  4. Guide confirms the transaction in their wallet
  5. Button shows "Anchoring..." with a loading spinner while the transaction processes
  6. On success: green text appears — "Anchored on-chain! Tx: 0xabc123...def456"
  7. The two metric tiles auto-refresh (Total Claims and Your Attestations increment)
  8. On error: red text appears with the error message

---

## 3. What it does NOT do (that someone might expect)

| Expected Feature | Actual State |
|-----------------|-------------|
| Upload a file (PDF, image) | **NOT available** — Guide enters a hash, not a file. There's no file upload UI. |
| Auto-generate session hash | **NOT available** — Guide must manually provide the hash (copy from IPFS or generate externally) |
| Verify participant consent first | **NOT checked** — the form doesn't verify whether the participant has consented to this Guide anchoring their record |
| Show historical claim details | **NOT available** — only shows the count of Guide's claims, not a list with dates/types/participants |
| Link to session in EncryptHealth backend | **NOT wired** — the on-chain attestation and the backend session booking system are separate; no automatic connection |
| Encrypt the session hash before anchoring | **NOT done** — the hash is written to chain as plain text (the hash itself doesn't reveal content, but there's no additional encryption layer) |
| Participant notification | **NOT triggered** — the participant is not notified when a Guide anchors a record referencing their wallet |

---

## 4. Which side is the UI on?

**Sovereign Guide side only.** The form and metrics are on the `/provider/dashboard` route, which is the Guide-facing dashboard.

The participant side (`/sovereign-ledger` route) has a separate page that was previously wired to call `POST /api/documents/upload` — but that endpoint doesn't exist (identified in the superbill flow audit). The participant-side sovereign ledger page is effectively non-functional for uploads.

---

## 5. Summary

The current SovereignLedger integration gives Sovereign Guides a working, real on-chain attestation mechanism — they can register claims with participant wallet, session hash, and claim type, and see their attestation count. It's functional but minimal:

- **Works:** reading claim counts, writing new claims to Sepolia
- **Missing:** file upload, automatic hash generation, consent verification, claim history display, participant notification, backend session integration

This is the foundation layer. The superbill flow audit (fsl-governance/audits/SUPERBILL_FLOW_AUDIT.md) documents the 5 missing links needed for end-to-end session documentation.

# NeuroBalance Scaffold Audit
## Verified Against GitHub Repo: Future-Systems-Lab/NeuroBalance-Watch
**Date:** May 3, 2026
**Commit:** 6102ee6 (single commit, shallow clone)
**Last repo update:** March 16, 2026

---

## Component Status Summary

| # | Component | Status | Evidence | Notes |
|---|-----------|--------|----------|-------|
| 1 | Backend service (FastAPI) | **IMPLEMENTED** (code exists, NOT deployed) | `build/backend/backend/app/main.py` — FastAPI app with biometric, frequency, auth, consent routers | No live endpoint. No requirements.txt. No PM2/systemd evidence. Never deployed to VPS. |
| 2a | Polar integration | **NOT STARTED** | No Polar SDK, API calls, or device-specific code found | Only generic `device_id` string field in schema |
| 2b | OpenBCI integration | **NOT STARTED** | No OpenBCI SDK or protocol code | Only referenced in README aspirationally |
| 2c | Emotiv integration | **NOT STARTED** | No Emotiv SDK or API code | Only referenced in README |
| 2d | Dexcom integration | **NOT STARTED** | No Dexcom API code | Only referenced in README |
| 2e | Nutromics integration | **NOT STARTED** | No Nutromics integration code | Only referenced in README |
| 2f | Multi-device API spec | **DESIGNED** (schema exists) | `BiometricData` Pydantic model accepts generic `device_id`, `reading_type`, `raw_data[]`, `sample_rate` | Generic ingestion schema — no device-specific protocol handling |
| 3a | Data ingestion endpoint | **IMPLEMENTED** (code exists) | `build/backend/backend/app/api/v1/biometric.py` — `POST /api/v1/biometric/ingest` | Accepts raw float arrays with device_id and reading_type. Encrypts and stores. |
| 3b | Schema validation | **IMPLEMENTED** | Pydantic `BiometricData` model with field validators | Basic type validation only. No device-specific schema enforcement. |
| 3c | Rate limiting | **NOT STARTED** | No rate limiting middleware found | FastAPI app has no throttling |
| 4a | Wallet-gated consent for biosensor | **DESIGNED** (React Native UI + README description) | `app/Consents.js` — React Native toggle UI for health data consent | NOT EIP-191 wallet signature. Uses simple toggle → generic `setConsent()` call. |
| 4b | EIP-191 signature flow for biosensor | **NOT STARTED** | Auth uses email/password JWT, not wallet signatures | `build/backend/backend/app/api/v1/auth.py` — email/password flow, `wallet_address` stored as string field only |
| 4c | Smart contract integration for consent | **DESIGNED** (empty contract deployed) | `contracts/NeuroBalanceConsent.sol` — **EMPTY contract body** (`contract NeuroBalanceConsent {}`) | Contract at 0x2157...96b8 on Sepolia is an empty shell — no functions, no storage |
| 5a | On-chain biosensor attestation | **NOT STARTED** | No attestation function in contract (contract is empty) | AlchemistForge `alchemize()` handles attestation in the broader FSL ecosystem, but NeuroBalance has no direct chain integration |
| 5b | Schema for biosensor data on-chain | **NOT STARTED** | No on-chain schema defined | Empty contract has no struct/event definitions |
| 5c | IPFS off-chain storage integration | **NOT STARTED** | No IPFS code in the repo | Backend uses local PostgreSQL with Fernet encryption only |
| 6 | Frontend / participant-facing UI | **IMPLEMENTED** (code exists, NOT deployed) | `build/frontend/` — React dashboard with `NeurotransmitterDashboard.jsx`, `BiofieldCoherence.jsx` + React Native `app/` with consent toggles | Two frontends exist: a web dashboard and a React Native mobile app. Neither deployed. |
| 7 | Real device testing | **NOT STARTED** | No test data, no device pairing logs, no integration test files | `demo/` folder contains only UI screenshots (mock data). No evidence of any real device connection. |

---

## Detailed Findings

### The Smart Contract is Empty

```solidity
pragma solidity ^0.8.20;
contract NeuroBalanceConsent {}
```

This is a placeholder deployed to Sepolia at `0x21571805e57f792b66604b140a45D8C1b2E196b8`. It has no functions, no events, no storage. The ABI file is also invalid (contains shell commands, not JSON).

### Auth is Email/Password, Not Wallet-Gated

The backend uses standard email/password registration with JWT tokens. A `wallet_address` field exists in the user model but is stored as a string — there is no signature verification, no EIP-191 flow, no on-chain consent mechanism. This is fundamentally different from the wallet-gated EIP-191 architecture in the main EncryptHealth platform.

### The Backend is Feature-Rich but Never Deployed

The FastAPI backend (`build/backend/`) is well-structured with:
- Biometric data ingestion endpoint
- Fernet encryption for data at rest
- SQLAlchemy models for readings and frequency analysis
- JWT authentication
- CRUD operations for biometric data

But: no `requirements.txt`, no deployment scripts, no PM2 config, no evidence it was ever run on the VPS or any server.

### The Frontend is Visualization-Only

Two frontends exist:
1. **React web dashboard** (`build/frontend/`) — Chart.js visualizations for 5 neurotransmitter channels + biofield coherence score
2. **React Native mobile app** (`app/`) — Consent toggle UI

Neither has a build script that produces output (`package.json` build command is `echo 'Static build'`).

### Device Integration is Aspirational

The README references Polar, OpenBCI, Emotiv, Dexcom, Nutromics — but none have any code, SDK, or API integration. The `device_id` field in the biometric schema is a plain string with no device-specific protocol handling.

---

## Status Legend

- **DEPLOYED** = Live endpoint, tested, verified working in production
- **IMPLEMENTED** = Code exists in repo, could theoretically run, never deployed/tested
- **DESIGNED** = Specification, documentation, or UI mockup exists — no functional code
- **NOT STARTED** = No evidence in repository

---

## Interview-Safe Language

Based on this audit, accurate claims about NeuroBalance:

**Safe to say:**
- "NeuroBalance has a consent contract deployed on Sepolia" (true — though it's empty)
- "The backend architecture is scaffolded with encrypted biometric data ingestion" (true — code exists)
- "The multi-device API spec accepts generic biosensor data" (true — Pydantic schema)
- "Frontend visualization components exist for 5 neurotransmitter channels" (true)

**NOT safe to say:**
- "NeuroBalance has wallet-gated consent for biosensor streams" (FALSE — uses email/password)
- "Device integrations are built for Polar, OpenBCI, Emotiv, Dexcom, Nutromics" (FALSE — no device-specific code)
- "Biosensor data is anchored on-chain" (FALSE — contract is empty, no IPFS)
- "NeuroBalance is deployed and operational" (FALSE — no live endpoint)
- "The multi-device API spec covers [specific devices]" (FALSE — generic schema only)

**Accurate framing:**
> "NeuroBalance is architecturally scaffolded — the backend data model, encrypted ingestion endpoint, and consent contract address exist. The architecture is ready to receive biosensor data the moment device integrations and the consent contract are completed. It's not deployed yet."

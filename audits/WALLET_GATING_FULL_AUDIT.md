# FSL Ecosystem — Public Surface Access Control Audit

**Date:** 2026-04-29  
**Auditor:** Claude Opus 4.6 (automated)  
**Scope:** All publicly reachable FSL surfaces — frontends, APIs, infrastructure, smart contracts, GitHub repos, Gitea instance

> **Note:** Command Center gating is scoped separately (see `COMMAND_CENTER_ACCESS_CLASSIFICATION.md`).

---

## Critical Finding

**Hardcoded database password** in `/opt/encrypthealth/backend/index.js` — the `DB_CONFIG` block contains a plaintext fallback password for the `encrypthealth_api` Postgres user. Even though `.env` is loaded first, the fallback is readable in source and in the Gitea mirror. This should be removed immediately regardless of gating work.

---

## 1. Frontend Sites

| # | Surface | HTTP | Current State | Content Type | Audience | Recommendation | Rationale | Complexity |
|---|---------|------|---------------|-------------|----------|----------------|-----------|------------|
| 1 | `futuresystemslab.io` | 200 | Fully public, no auth | Marketing/mission landing — "Own your health data" | General public | **PUBLIC** | Marketing site; establishes credibility and mission | — |
| 2 | `hypnoneuro.io` | 200 | Fully public, wallet connect available | Wellness platform frontend — HypnoNeuro brand | Participants + prospects | **PUBLIC** (landing) / **WALLET-GATED** (dashboard) | Landing page is marketing; wallet-connected features should require EIP-191 | Low |
| 3 | `encrypthealth.io` | 200 | Fully public, wallet connect available | Wellness platform frontend — EncryptHealth brand | Participants + prospects | **PUBLIC** (landing) / **WALLET-GATED** (dashboard) | Same pattern as HypnoNeuro | Low |
| 4 | `sovereignledger.io` | 200 | Fully public, no wallet references in HTML | Governance/health sovereignty portal | Sovereign Guides + admin | **WALLET-GATED** (general) / **ROLE-GATED** (admin views) | Governance data is semi-sensitive; participants can view, admin can edit | Medium |
| 5 | `alchemistforge.io` | 200 | Fully public, wallet connect available | Shadow-work transmutation dApp | Participants | **PUBLIC** (landing) / **WALLET-GATED** (transmutation flow) | Gamified wellness tool; transmutation should require wallet | Low |
| 6 | `alchemistforge.io/analytics` | 200 | **Fully public, no auth guard** | On-chain transformation analytics dashboard | Admin / researchers | **ROLE-GATED** | Exposes aggregate engagement metrics, transmutation counts, wallet activity — should be admin-only or faculty-readonly | **Medium** |
| 7 | `fsl-command-center.vercel.app` | 200 | Wallet connect present | Ops dashboard — PM2, domains, agents, tasks | Admin only | **ROLE-GATED** | Already scoped separately; must be admin-whitelist only | (Separate scope) |

## 2. API Endpoints

### 2.1 Public routes (by design — in `PUBLIC_ROUTES` array)

| # | Endpoint | Auth | Exposes | Recommendation | Rationale | Complexity |
|---|----------|------|---------|----------------|-----------|------------|
| 8 | `GET /api/health` | None | `{"status":"ok"}` | **PUBLIC** | Standard health check, no sensitive data | — |
| 9 | `GET /api/status` | None | Service name + version | **PUBLIC** | Minimal info, acceptable | — |
| 10 | `GET /api/fsl-status` | None | PM2 process list, domain statuses, task counts, agent count (17), game count (45), platform count (5), contract count (8), engagement metrics | **ROLE-GATED** | Exposes full operational metrics including process names, task pipeline status, and engagement data. Should require admin wallet. | **Medium** |
| 11 | `GET /api/fsl-tasks` | None | Task pipeline — completed, in-progress, pending items | **ROLE-GATED** | Internal project management data; admin-only | **Medium** |

### 2.2 Unauthenticated GET routes (auth middleware passes all GETs through)

| # | Endpoint | Auth | Exposes | Recommendation | Rationale | Complexity |
|---|----------|------|---------|----------------|-----------|------------|
| 12 | `GET /api/infra` | **None (GET pass-through)** | PM2 process names, statuses, memory, CPU, uptime for all 5 services | **REMOVE or ROLE-GATED** | Leaks infrastructure topology — process names (FSL_Agent_Gateway_Bot, cloudflare-tunnel, SovereignLedger, encrypthealth-api, fsl-discord-engine), memory footprints, restart counts | **High priority** |
| 13 | `GET /api/records/:wallet` | Wallet in URL only | Health records for any wallet | **WALLET-GATED** (verify caller = wallet owner) | Currently returns data for any wallet passed in URL. Caller should prove ownership via EIP-191 | Medium |
| 14 | `GET /api/tokens/:wallet` | Wallet in URL only | HNT token balance | **WALLET-GATED** | Same as above | Medium |
| 15 | `GET /api/mood-logs` | Optional x-wallet-address header | Mood log entries (empty without header) | **WALLET-GATED** | Data is personal; should require signature verification even for reads | Medium |
| 16 | `GET /api/nutrition-logs` | Optional x-wallet-address header | Nutrition log entries | **WALLET-GATED** | Same as mood-logs | Medium |
| 17 | `GET /api/providers/role` | Optional header | Returns `participant` without wallet, real role with wallet | **WALLET-GATED** | Role info should require verified wallet | Low |
| 18 | `GET /api/consent/practitioners/:wallet` | Wallet in URL | Consent relationships | **WALLET-GATED** | Consent data is sensitive — must verify caller owns the wallet | Medium |
| 19 | `GET /api/providers/:wallet/availability` | Wallet in URL | Sovereign Guide schedule | **WALLET-GATED** | Schedule data; verify caller is participant or the guide | Low |
| 20 | `GET /api/sessions/:sessionId` | None (session ID only) | Session details | **WALLET-GATED** | Session data should require participant or guide wallet proof | Medium |
| 21 | `GET /api/participants/:wallet/stats` | Wallet in URL | Engagement statistics | **WALLET-GATED** | Personal metrics | Medium |
| 22 | `GET /api/participants/:wallet/activity` | Wallet in URL | Activity history | **WALLET-GATED** | Personal data | Medium |
| 23 | `GET /api/participants/:wallet/billing` | Wallet in URL | Billing info | **WALLET-GATED** | Financial data — high sensitivity | **Medium-High** |
| 24 | `GET /api/participants/:wallet/upcoming` | Wallet in URL | Upcoming sessions | **WALLET-GATED** | Schedule data | Low |
| 25 | `GET /api/trial/status/:wallet` | Wallet in URL | Trial subscription status | **PUBLIC** (low risk) | Non-sensitive, but verify if desired | Low |

### 2.3 POST routes (properly gated)

All POST routes (`/api/user`, `/api/tokens/mint`, `/api/consent/grant`, `/api/consent/revoke`, `/api/mood-logs`, `/api/nutrition-logs`, `/api/nft/mint-sovereign`, `/api/sessions/book`, etc.) **require EIP-191 signature verification**. This is correct.

**Exception:** `POST /api/subscribe` allows `walletAddress: "card-user-pending"` to bypass signature — acceptable for Stripe card onboarding flow but should be monitored.

## 3. Infrastructure

| # | Surface | Current State | Recommendation | Rationale | Complexity |
|---|---------|---------------|----------------|-----------|------------|
| 26 | `git.futuresystemslab.io` (Gitea) | HTTP 200, **5 repos publicly browsable** without auth | **ROLE-GATED** or make repos private | Gitea mirrors (fsl-web, fsl-governance, fsl-command-center, HypnoNeuro, FSL-profile) are fully readable. Source code includes DB connection strings. | **High priority** |
| 27 | Gitea API (`/api/v1/repos/search`) | Returns all repos without auth | **Disable anonymous API access** | Allows automated enumeration of all repos and code | Medium |
| 28 | SSH access (`root@74.208.202.239`) | Key-based (not public) | **ROLE-GATED** (already) | Properly restricted to key holders | — |

## 4. Smart Contracts (Sepolia)

| # | Surface | Current State | Recommendation | Rationale |
|---|---------|---------------|----------------|-----------|
| 29 | Contract read functions | Blockchain-public (by design) | **PUBLIC** | Cannot be gated on-chain; all read functions are inherently public on Ethereum | 
| 30 | UI displaying contract data | Public via frontends | **PUBLIC** or **WALLET-GATED** per surface | Gate at the UI layer if needed; on-chain data is always readable via Etherscan |

## 5. Public GitHub Repos

| # | Repo | Sensitive Info in README | Recommendation | Rationale |
|---|------|------------------------|----------------|-----------|
| 31 | `fsl-governance` | 1 match ("hardcoded secrets detection" — refers to scan tooling, not actual secrets) | **PUBLIC** | Governance specs, agent definitions, IPFS manifests — academic portfolio value |
| 32 | `alchemist-forge` | 0 | **PUBLIC** | dApp source — open source portfolio piece |
| 33 | `fsl-command-center` | 0 | **PUBLIC** | Frontend only; API keys should not be in repo | 
| 34 | `fsl-web` | 0 | **PUBLIC** | Marketing site source |
| 35 | `mental-health-on-chain` | 0 | **PUBLIC** | Smart contracts — academic showcase |
| 36 | `open-source-portfolio` | 0 | **PUBLIC** | OSS contribution tracker |
| 37 | `Future-Systems-Lab-profile` | 0 | **PUBLIC** | Org profile |
| 38 | `remix-contract-backups` | 0 | **PUBLIC** | Contract source backups |
| 39 | Forked repos (fabric, fabex, EIPs, Uniswap, OpenZeppelin, etc.) | N/A | **PUBLIC** | Standard OSS forks — academic context |

---

## Summary Table

| Classification | Count | Surfaces |
|---|---|---|
| **PUBLIC** | 16 | futuresystemslab.io, /api/health, /api/status, smart contract reads, all GitHub repos (8), contract UI reads, trial status |
| **WALLET-GATED (EIP-191)** | 13 | hypnoneuro.io dashboard, encrypthealth.io dashboard, alchemistforge.io transmutation flow, /api/records, /api/tokens, /api/mood-logs, /api/nutrition-logs, /api/providers/role, /api/consent/practitioners, /api/providers/availability, /api/sessions, /api/participants/*, /api/participants/billing |
| **ROLE-GATED** | 7 | sovereignledger.io admin views, alchemistforge.io/analytics, fsl-command-center, /api/fsl-status, /api/fsl-tasks, Gitea instance, Gitea API |
| **REMOVE / RELOCATE** | 2 | /api/infra (exposes infrastructure topology), hardcoded DB password fallback in index.js |

---

## Priority Order (highest risk + easiest to fix first)

| Priority | Surface | Action | Risk | Effort |
|---|---|---|---|---|
| **P0** | Hardcoded DB password in `/opt/encrypthealth/backend/index.js` | Remove plaintext fallback; rely solely on `.env` | **Critical** — credential in source code visible on Gitea | 5 min |
| **P1** | `GET /api/infra` | Add to role-gated check or remove entirely | **High** — leaks full infrastructure topology (process names, memory, CPU) to any HTTP client | 15 min |
| **P2** | Gitea public repos (`git.futuresystemslab.io`) | Set repos to private or require login for browsing | **High** — source code including DB config patterns visible without auth | 10 min |
| **P3** | `GET /api/fsl-status` + `GET /api/fsl-tasks` | Move out of `PUBLIC_ROUTES`; require admin wallet | **Medium** — exposes operational metrics, task pipeline | 20 min |
| **P4** | `alchemistforge.io/analytics` | Add wallet-gated or role-gated guard | **Medium** — engagement analytics visible to anyone | 30 min |
| **P5** | GET endpoints returning data for any wallet in URL | Enforce EIP-191 verification on GETs for `/api/records/:wallet`, `/api/participants/:wallet/*`, `/api/consent/practitioners/:wallet` | **Medium** — personal health/billing data accessible if wallet address is known | 2-3 hrs |

---

## Auth Middleware Summary

The `walletAuth` middleware in `/opt/encrypthealth/backend/middleware/auth.js` has the following behavior:

- **PUBLIC_ROUTES**: `/api/provider/verification`, `/api/status`, `/api/health`, `/api/webhook/stripe`, `/api/game-sessions`, `/api/fsl-status`, `/api/fsl-tasks`, `/api/trial`, `/api/subscription` — no auth at all
- **All GET requests**: Pass through with optional `x-wallet-address` header (no signature required)
- **All POST/PUT/DELETE requests**: Require `x-wallet-address` + `x-signature` + `x-message` headers with EIP-191 verification

**Key gap:** GET requests never verify wallet ownership. Any client can set `x-wallet-address` to any value and read that wallet's data. This means health records, mood logs, billing info, and session details are effectively **unprotected** for reads.

---

*This audit is documentation only — no changes were implemented.*

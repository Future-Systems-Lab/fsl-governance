# Security Vulnerabilities Fixed -- 2026-05-07

**Server:** 74.208.202.239  
**Service:** encrypthealth-api (PM2 id 11)  
**Date:** 2026-05-07  

---

## PRIORITY 1 (CRITICAL): walletAuth GET Bypass

**Vulnerability:** The `walletAuth` middleware passed ALL GET requests without verifying identity. Anyone could read any participant's sessions, mood logs, health data, billing, and stats by setting the `x-wallet-address` header to any wallet address.

**Fix applied to:** `/opt/encrypthealth/backend/middleware/auth.js`

**Changes:**
- Rewrote middleware to require JWT (Bearer token) for ALL non-public GET requests
- Defined an explicit allowlist of public routes: `/api/health`, `/api/status`, `/api/provider/verification`, `/api/webhook/stripe`, `/api/game-sessions`, `/api/fsl-status/public`, `/api/auth/verify`
- Any GET to a route not in the public list without a valid JWT returns 401
- Legacy EIP-191 signature auth still accepted for POST/PUT/DELETE (backward compatibility)
- Added `POST /api/auth/verify` endpoint: accepts `{walletAddress, signature, message}`, validates EIP-191 signature, returns a 24-hour JWT
- Installed `jsonwebtoken` package; generated and set `JWT_SECRET` in `.env`

**Verification:**
```
GET /api/sessions/0xf22c... -> 401 (was 200/500)
GET /api/mood-logs?wallet=0xf22c... -> 401
GET /api/participants/0xf22c.../stats -> 401
GET /api/records/0xf22c... with x-wallet-address header -> 401
GET /api/health -> 200 (public, correct)
GET /api/fsl-status/public -> 200 (public, correct)
```

---

## PRIORITY 2 (P0): Hardcoded DB Password

**Vulnerability:** Database password `mWO2racvxD0cNiwFHGVUYewYpQ1dvIWU` was hardcoded as a fallback in `index.js` on the server. Additionally, the old password `ehapi2026` was hardcoded in 9 frontend API route source files in the HypnoNeuro repo with the full connection string including the server IP.

**Fix applied to:**
- `/opt/encrypthealth/backend/index.js` (server)
- 9 files in `HypnoNeuro/encrypthealth/frontend/app/api/` (local repo)

**Changes:**
- Server: Replaced `process.env.DB_PASSWORD || 'mWO2racvxD0cNiwFHGVUYewYpQ1dvIWU'` with `process.env.DB_PASSWORD`
- Server: Added startup guard -- if `DB_PASSWORD` is not set in environment, the process exits with a fatal error
- Local repo: Removed hardcoded `postgresql://encrypthealth_api:ehapi2026@74.208.202.239:5432/encrypthealth` fallback from all 9 frontend route files, replaced with `process.env.DATABASE_URL!` (required, no fallback)

**Verification:**
```
grep -c "mWO2racvxD0cNiwFHGVUYewYpQ1dvIWU" index.js -> 0
grep -c "ehapi2026" frontend/app/api/**/*.ts -> 0
API started successfully with env-only password
```

**Files fixed in HypnoNeuro repo:**
- `frontend/app/api/providers/directory/route.ts`
- `frontend/app/api/sovereign-ledger/my-records/route.ts`
- `frontend/app/api/provider/save-profile/route.ts`
- `frontend/app/api/provider/complete-onboarding/route.ts`
- `frontend/app/api/provider/accept-match/route.ts`
- `frontend/app/api/provider/sovereign-ledger/route.ts`
- `frontend/app/api/provider/matches/route.ts`
- `frontend/app/api/provider/onboarding-status/route.ts`
- `frontend/app/api/provider/save-availability/route.ts`

---

## PRIORITY 3 (P1): /api/infra Exposed Without Auth

**Vulnerability:** The `/api/infra` endpoint exposed PM2 process details (names, memory, CPU, uptime, restart counts) to anyone without authentication. It was not in `PUBLIC_ROUTES` but the old middleware passed all GETs.

**Fix applied to:** `/opt/encrypthealth/backend/middleware/auth.js`

**Changes:**
- The new auth middleware requires JWT for all non-public routes, which includes `/api/infra`
- `/api/infra` is NOT in the `PUBLIC_ROUTES` list, so it now requires JWT authentication

**Verification:**
```
GET /api/infra -> 401 (was 200)
```

---

## PRIORITY 4 (P2): Gitea Repos Publicly Visible

**Vulnerability:** 5 Gitea repositories were set to public visibility, exposing source code:
- Future-Systems-Lab-profile
- HypnoNeuro
- fsl-command-center
- fsl-governance
- fsl-web

**Fix:** Set all 5 repos to private via Gitea API.

**Verification:**
```
Gitea API repos/search: Public repos: NONE - all private
```

---

## PRIORITY 5 (P3): /api/fsl-status Split (Public/Private)

**Vulnerability:** The `/api/fsl-status` endpoint returned both public data (domain status, engagement metrics, game/contract counts) and sensitive operational data (PM2 process details, task lists, internal metrics) to anyone.

**Fix applied to:** `/opt/encrypthealth/backend/fsl-status-route.js`

**Changes:**
- Created `GET /api/fsl-status/public` -- returns only: domain status, engagement (on-chain), agent/game/platform/contract counts
- `GET /api/fsl-status` now requires JWT auth and returns the full dataset including PM2 details, tasks, and internal metrics
- `GET /api/fsl-tasks` also requires JWT auth (removed from PUBLIC_ROUTES)
- `/api/fsl-status/public` is in the PUBLIC_ROUTES allowlist

**Verification:**
```
GET /api/fsl-status/public -> 200 (safe aggregate data only)
GET /api/fsl-status -> 401 (requires JWT)
```

---

## PRIORITY 6 (P4): AlchemistForge Analytics Audit

**Finding:** The analytics page at `https://alchemistforge.io/analytics` only shows on-chain data from Sepolia: transmutation counts, unique wallets, celebrations, and contract addresses. No operational data (PM2, SSH, internal IPs, passwords) is exposed.

**Action:** No change needed. Page is safe to remain public.

---

## Summary

| Priority | Vulnerability | Severity | Status |
|----------|--------------|----------|--------|
| P0 | walletAuth GET bypass | CRITICAL | FIXED |
| P0 | Hardcoded DB password | CRITICAL | FIXED |
| P1 | /api/infra exposed | HIGH | FIXED |
| P2 | Gitea repos public | MEDIUM | FIXED |
| P3 | fsl-status data leak | MEDIUM | FIXED |
| P4 | AlchemistForge analytics | LOW | NO ACTION (safe) |

**API restarted:** `pm2 restart encrypthealth-api --update-env && pm2 save` -- confirmed running.

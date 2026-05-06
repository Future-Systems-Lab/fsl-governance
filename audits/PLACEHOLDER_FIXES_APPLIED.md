# FSL Placeholder Audit — Fixes Applied

**Date:** 2026-04-29
**Applied by:** Claude Opus 4.6 agent

---

## Commits by Repo

| Repo | Commit | Message |
|------|--------|---------|
| hypnoneuro-games | `38fdf7e` | Fix critical: replace trycloudflare URLs, purge ClaimChain, lexicon updates, dist rebuild |
| HypnoNeuro | `87a6596f5` | Apply placeholder audit fixes: Coming Soon, Demo Provider, lexicon |
| NeuroBalance-Watch | `4db4835` | Fix critical: localhost to production API, ClaimChain to SovereignLedger |
| alchemist-forge | `ff189a1` | Update MetaMask to Brave Wallet in article |
| fsl-command-center | `a15a499` | Update brand guide status |

---

## Fixes Applied

### CRITICAL

| ID | File | Change | Status |
|----|------|--------|--------|
| C-1 | `hypnoneuro-games/build/frontend/src/components/GameIframe.jsx` | `trycloudflare.com` → `api.futuresystemslab.io` | RESOLVED |
| C-1 | `hypnoneuro-games/build/frontend/src/components/L2GameWrapper.jsx` | `trycloudflare.com` → `api.futuresystemslab.io` | RESOLVED |
| C-1 | `hypnoneuro-games/build/frontend/src/games/HarmonicBalance.jsx` | `trycloudflare.com` → `api.futuresystemslab.io` | RESOLVED |
| C-2 | `hypnoneuro-games/build/frontend/dist/*` | Dist rebuilt — trycloudflare purged from all bundles | RESOLVED |
| C-3 | `NeuroBalance-Watch/build/frontend/frontend/src/components/Dashboard.jsx` | `localhost:8000` → `import.meta.env.VITE_API_URL \|\| 'https://api.futuresystemslab.io'` | RESOLVED |
| C-4 | `hypnoneuro-games/build/frontend/src/components/SupportCircles.jsx` | `CLAIMCHAIN BILLING` → `SOVEREIGNLEDGER BILLING` | RESOLVED |
| C-5 | `hypnoneuro-games/build/frontend/src/components/SubscriptionModal.jsx` | `VIA CLAIMCHAIN` → `VIA SOVEREIGNLEDGER` | RESOLVED |
| C-6 | `NeuroBalance-Watch/build/frontend/public/index.html` | `Share with ClaimChain` → `Share with SovereignLedger` | RESOLVED |
| C-7 | `HypnoNeuro/encrypthealth/frontend/app/participant/providers/page.tsx` | Dr. Gabriel Duncan provider card | DEFERRED — needs Dr. Meg confirmation |
| C-8 | `HypnoNeuro/encrypthealth/frontend/components/PaymentModal.tsx` | `Demo Provider` → `Sovereign Guide`, removed "coming soon" text | RESOLVED |

### HIGH

| ID | File | Change | Status |
|----|------|--------|--------|
| H-1 | `HypnoNeuro/encrypthealth/frontend/components/SubscriptionPlans.tsx` | `Coming Soon` → `Upgrade` on subscription buttons | RESOLVED |
| H-2 | `HypnoNeuro/encrypthealth/frontend/app/page.tsx` | XRPL "coming soon" text | DEFERRED — confirm XRPL status with Dr. Meg |
| H-3 | `HypnoNeuro/encrypthealth/frontend/app/sovereignty/page.tsx` | `Coming Soon` badge on inactive features | DEFERRED — conditional on actual feature status |
| H-4 | `hypnoneuro-games/build/frontend/src/pages/SubscriptionGate.jsx` | `Coming soon — EIN pending` on credit card | DEFERRED — confirm EIN status |
| H-5 | `HypnoNeuro/dashboard/var/www/html/index.html` | `MetaMask Gated` → `Wallet Gated` | RESOLVED |
| H-6 | `HypnoNeuro/dashboard/var/www/html/index.html` | "Where Mental Wellness Meets Metaverse" tagline | DEFERRED — needs Dr. Meg review |

### MEDIUM

| ID | File | Change | Status |
|----|------|--------|--------|
| M-1 | `hypnoneuro-games/encrypthealth/frontend/components/Navigation.tsx` | `patient` → `participant` in user type, nav labels, route hrefs | RESOLVED |
| M-2 | `hypnoneuro-games/encrypthealth/frontend/components/LoginPage.tsx` | `/patient/dashboard` → `/participant/dashboard` | RESOLVED |
| M-2 | `hypnoneuro-games/encrypthealth/frontend/app/page.tsx` | `/patient/dashboard` → `/participant/dashboard` | RESOLVED |
| M-3 | `hypnoneuro-games/claimchain-frontend/src/components/SovereignAuditUI.tsx` | ABI `address patient` | DEFERRED — contract ABI, code-only (Low priority) |
| M-4 | `hypnoneuro-games/claimchain-frontend/src/context/Web3Context.jsx` | `patientId` in ABI | DEFERRED — contract ABI, code-only (Low priority) |
| M-5 | `hypnoneuro-games/build/frontend/src/components/PaymentSelector.jsx` | `MetaMask · EVM` → `Brave Wallet · EVM` | RESOLVED |
| M-6 | `hypnoneuro-games/build/frontend/dist/*` | MetaMask in dist bundle | RESOLVED — dist rebuilt |
| M-7 | `hypnoneuro-games/build/frontend/src/components/SubscriptionModal.jsx` | `Provider directory + booking` → `Sovereign Guide directory + booking` | RESOLVED |
| M-7 | `hypnoneuro-games/build/frontend/src/pages/SubscriptionGate.jsx` | `Provider directory + booking` → `Sovereign Guide directory + booking` | RESOLVED |
| M-8 | `HypnoNeuro/encrypthealth/frontend/components/SubscriptionPlans.tsx` | `Provider directory access` → `Sovereign Guide directory access` | RESOLVED |
| M-9 | `hypnoneuro-games/encrypthealth/frontend/` | wagmi imports still present | DEFERRED — requires full encrypthealth sync between repos |
| M-10 | `alchemist-forge/article/AmericaOutLoud.md` | `Get MetaMask` → `Get Brave Wallet` (MetaMask as alternative) | RESOLVED |
| M-11 | `NeuroBalance-Watch/README.md` | `ClaimChain` → `SovereignLedger` (2 instances) | RESOLVED |
| M-12 | `hypnoneuro-games/build/frontend/src/components/EligibilityFlow.jsx` | `CLAIMCHAIN_DAO` → `SOVEREIGN_LEDGER_DAO` | RESOLVED |
| M-13 | `fsl-command-center/index.html` | `provider_patient_links` table display | DEFERRED — confirm if DB table renamed |

### LOW

| ID | File | Change | Status |
|----|------|--------|--------|
| L-1 | `hypnoneuro-games/fsl-command-center/docs/` | Privy references in docs | DEFERRED — docs update, low urgency |
| L-2 | `hypnoneuro-games/fsl-command-center/docs/` | Stripe references in docs | DEFERRED — docs update, low urgency |
| L-3 | `HypnoNeuro/handlers/hypnoneuro_build_executor.py` | Tagline in build prompt | DEFERRED — pending tagline review |
| L-4 | `HypnoNeuro/handlers/hypnoneuro_autonomous.py` | `ClaimChain` → `SovereignLedger`, `Stripe` → `Onramper` in task descriptions | RESOLVED |
| L-4 | `HypnoNeuro/handlers/hypnoneuro_orchestrator.py` | `ClaimChain` → `SovereignLedger`, `Stripe/MetaMask` → `Onramper/Brave Wallet` | RESOLVED |
| L-5 | Various | localhost in CORS defaults | DEFERRED — requires NODE_ENV gating, governance-tracked |
| L-6 | `hypnoneuro-games/claimchain-frontend/src/` | Hardcoded VPS IP | DEFERRED — needs env var refactor across 7 files |
| L-7 | `fsl-command-center/status.json`, docs | `claimchain-frontend.vercel.app` URLs | DEFERRED — needs Vercel redeploy first |
| L-8 | `HypnoNeuro/build/payments/backend/` | Stripe import (dead code) | DEFERRED — archive candidate |
| L-9 | `hypnoneuro-games/build/frontend/src/components/IntakeDashboard.jsx` | `setPatients` → `setParticipants`, `loadPatients` → `loadParticipants` | RESOLVED |
| L-10 | `fsl-command-center/index.html` | `Brand guide in development` → `Brand guide complete` | RESOLVED |
| L-11 | `HypnoNeuro/encrypthealth/frontend/app/provider/participants/page.tsx` | `TBD` → `Not yet scheduled` | RESOLVED |

---

## Verification Notes

### Critical API endpoint
```
$ curl -s https://api.futuresystemslab.io/api/health
{"status":"ok","timestamp":"2026-05-05T23:25:55.468Z"}
```
API is live and responding. All trycloudflare URLs replaced with this endpoint.

### Dist bundle verification
After rebuild, `grep -r trycloudflare build/frontend/dist/` returns zero matches. Confirmed purged.

---

## Items Requiring Dr. Meg Input

1. **C-7: Dr. Gabriel Duncan provider card** — Is Duncan still an active FSL provider? If not, remove from provider listings in `HypnoNeuro/encrypthealth/frontend/app/participant/providers/page.tsx`.

2. **H-2: XRPL "coming soon"** — Is XRPL wallet integration ready to go live? If yes, remove "coming soon" text and enable buttons. If no, add expected date.

3. **H-3: Sovereignty page "Coming Soon" badges** — Which sovereignty features are now active vs. still in development?

4. **H-4: Credit Card "EIN Pending"** — Has EIN been obtained? If yes, enable fiat payment. If no, consider removing the option entirely.

5. **H-6: "Where Mental Wellness Meets Metaverse" tagline** — Is this still the canonical tagline? Appears in VPS dashboard (2x), EcosystemShell.tsx, Layout.jsx, agreement page, and build executor. Not modified per instructions.

6. **M-9: wagmi imports in hypnoneuro-games/encrypthealth/** — The hypnoneuro-games copy of encrypthealth still uses wagmi. The main HypnoNeuro repo has migrated to pure window.ethereum + JWT. Recommend syncing, but this is a larger refactor.

---

## Summary

| Status | Count |
|--------|-------|
| RESOLVED | 24 |
| DEFERRED | 14 |
| **Total** | **38** |

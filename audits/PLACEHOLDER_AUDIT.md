# FSL Ecosystem Placeholder & Integrity Audit

**Date:** 2026-04-29
**Scope:** HypnoNeuro, hypnoneuro-games, alchemist-forge, fsl-web, fsl-command-center, fsl-governance, NeuroBalance-Watch
**Mode:** Audit only -- no files modified

---

## Critical (User-Facing Inaccuracy)

### C-1. trycloudflare.com URLs hardcoded in game source files (hypnoneuro-games) — RESOLVED ✓
- **File:** `hypnoneuro-games/build/frontend/src/components/GameIframe.jsx:8`
- **File:** `hypnoneuro-games/build/frontend/src/components/L2GameWrapper.jsx:6`
- **File:** `hypnoneuro-games/build/frontend/src/games/HarmonicBalance.jsx:4`
- **Current text:** `const VPS_API = 'https://relating-club-detail-emerald.trycloudflare.com'`
- **Why:** Cloudflare temporary tunnels expire unpredictably. These are the API URLs for game session recording, HNT minting, and L2 supplement recommendations. When the tunnel expires, all game completions silently fail -- users play sessions but receive no tokens and no session records.
- **Recommended fix:** Replace with `https://fsl-api.encrypthealth.io` or the production VPS nginx proxy URL.

### C-2. trycloudflare.com URL baked into production dist bundle (hypnoneuro-games) — RESOLVED ✓
- **File:** `hypnoneuro-games/build/frontend/dist/assets/GameIframe-RLRRTYAx.js:1`
- **File:** `hypnoneuro-games/build/frontend/dist/assets/L2GameWrapper-Cie9nh-G.js:1`
- **File:** `hypnoneuro-games/build/frontend/dist/assets/HarmonicBalance-BZ_-U_ZP.js:1`
- **Current text:** `https://relating-club-detail-emerald.trycloudflare.com` embedded in minified JS
- **Why:** Even if source is fixed, the dist bundle served to users still contains the dead tunnel URL. Requires a rebuild after fixing C-1.
- **Recommended fix:** Fix source (C-1), then `npm run build` to regenerate dist.

### C-3. localhost:8000 hardcoded in NeuroBalance-Watch frontend component — RESOLVED ✓
- **File:** `NeuroBalance-Watch/build/frontend/frontend/src/components/Dashboard.jsx:22-23`
- **Current text:** `axios.get(\`http://localhost:8000/earthing/sessions/${userAddress}\`)`
- **Why:** Production frontend calls localhost -- will fail for every user who is not running the backend locally. Dashboard shows no data.
- **Recommended fix:** Replace with environment variable or production API URL.

### C-4. "CLAIMCHAIN BILLING" visible to users in SupportCircles (hypnoneuro-games) — RESOLVED ✓
- **File:** `hypnoneuro-games/build/frontend/src/components/SupportCircles.jsx:588`
- **Current text:** `CLAIMCHAIN BILLING`
- **Why:** User-facing label uses retired brand name. Should be "SOVEREIGNLEDGER BILLING" per FSL Brand Guide.
- **Recommended fix:** Replace with `SOVEREIGNLEDGER BILLING`.

### C-5. "PAYMENT PROCESSING VIA CLAIMCHAIN" in SubscriptionModal (hypnoneuro-games) — RESOLVED ✓
- **File:** `hypnoneuro-games/build/frontend/src/components/SubscriptionModal.jsx:118`
- **Current text:** `PAYMENT PROCESSING VIA CLAIMCHAIN · SOVEREIGN WELLNESS DATA PLATFORM`
- **Why:** Same retired brand in user-visible footer of subscription modal. Also baked into dist JS bundle.
- **Recommended fix:** Replace "CLAIMCHAIN" with "SOVEREIGNLEDGER".

### C-6. "Share with ClaimChain" consent label in NeuroBalance-Watch — RESOLVED ✓
- **File:** `NeuroBalance-Watch/build/frontend/public/index.html:184`
- **Current text:** `<span class="consent-label">Share with ClaimChain</span>`
- **Why:** User-facing consent checkbox uses retired brand name. Consent language must be accurate.
- **Recommended fix:** Replace with "Share with SovereignLedger".

### C-7. "Dr. Gabriel Duncan" as live provider in EncryptHealth participant-facing pages — RESOLVED ✓
- **File:** `HypnoNeuro/encrypthealth/frontend/app/participant/providers/page.tsx:88`
- **File:** `HypnoNeuro/encrypthealth/frontend/app/participant/settings/page.tsx:24`
- **File:** `HypnoNeuro/encrypthealth/frontend/app/providers/[id]/page.tsx:64`
- **File:** `HypnoNeuro/encrypthealth/frontend/app/provider/demo/[slug]/page.tsx:11`
- **File:** `HypnoNeuro/encrypthealth/frontend/app/provider/login/[slug]/page.tsx:7`
- **Resolution (2026-04-29):** All Dr. Gabriel Duncan provider cards, profiles, demo data, login entries, and references removed from HypnoNeuro, hypnoneuro-games, and fsl-governance. "Biological Dentistry" removed from insurance modality lists. Doxy.me table row removed. Docs updated.

### C-8. "Demo Provider" and "Real booking coming soon" in PaymentModal — RESOLVED ✓
- **File:** `HypnoNeuro/encrypthealth/frontend/components/PaymentModal.tsx:59,61`
- **Current text:** `Demo Provider` badge and `This is a demo provider. Real booking coming soon.`
- **Why:** Users see "Demo" label on what should be a production booking flow.
- **Recommended fix:** Remove demo labeling if booking is live; otherwise gate the feature entirely.

---

## High (Stale Status / Resolved Issues)

### H-1. "Coming Soon" on subscription plan buttons (EncryptHealth) — RESOLVED ✓
- **File:** `HypnoNeuro/encrypthealth/frontend/components/SubscriptionPlans.tsx:99`
- **Current text:** `{tier.price === "Free" ? "Current Plan" : "Coming Soon"}`
- **Why:** Subscription upgrade is already built and functional via SubscriptionGate. Buttons should say "Upgrade" not "Coming Soon".
- **Recommended fix:** Update button text to reflect actual subscription flow availability.

### H-2. "XRPL support coming soon" on landing page — RESOLVED ✓
- **File:** `HypnoNeuro/encrypthealth/frontend/app/page.tsx:455`
- **Resolution (2026-04-29):** XRPL wallet button enabled (opacity/pointerEvents removed), GemWallet/Crossmark connection flow wired up. "Coming soon" badge replaced with "XRPL mainnet live". XRPL balance display added to EcosystemShell header with RPC fallback chain (s2.ripple.com -> s1.ripple.com -> xrplcluster.com). Mainnet wallet: rwR3etLJVxtQXYs2d9jgBQxzHBivtCMdPd.

### H-3. "Coming Soon" on sovereignty page features — DEFERRED (confirm feature status)
- **File:** `HypnoNeuro/encrypthealth/frontend/app/sovereignty/page.tsx:116`
- **Current text:** `Coming Soon` badge on inactive sovereignty features
- **Why:** Vague "Coming Soon" with no date or context.
- **Recommended fix:** Replace with specific status or remove feature cards that are not yet available.

### H-4. "Credit Card -- Coming Soon (EIN Pending)" in payment selector — DEFERRED (confirm EIN status)
- **File:** `hypnoneuro-games/build/frontend/src/pages/SubscriptionGate.jsx:57,249`
- **File:** `hypnoneuro-games/build/frontend/src/components/PaymentSelector.jsx:36`
- **Current text:** `Coming soon — EIN pending`
- **Why:** If EIN is obtained, this should be activated. If not, the "pending" status has been showing for months.
- **Recommended fix:** Confirm EIN status. Either enable fiat payments or remove the card option entirely to avoid stale appearance.

### H-5. "MetaMask Gated" in VPS dashboard — RESOLVED ✓
- **File:** `HypnoNeuro/dashboard/var/www/html/index.html:105`
- **Current text:** `27 Browser Games · L1/L2/L3 · MetaMask Gated`
- **Why:** Games are gated by EIP-1193 wallet (Brave Wallet primary), not specifically MetaMask. Misleading.
- **Recommended fix:** Change to `Wallet Gated` or `Brave Wallet Gated`.

### H-6. "Where Mental Wellness Meets Metaverse" tagline in VPS dashboard — RESOLVED ✓
- **File:** `HypnoNeuro/dashboard/var/www/html/index.html:63,270`
- **Resolution (2026-04-29):** Tagline updated to "Sovereignty by Design" across VPS dashboard (header + footer), EcosystemShell.tsx, fsl-web (layout meta + landing page footer), fsl-command-center (index.html footer, ecosystem.html title/nav/footer), agreement page, provider login page. GitHub org description also updated. HypnoNeuro game pages intentionally left unchanged per brand guide scope.

---

## Medium (Lexicon / Branding Inconsistencies)

### M-1. "patient" in Navigation.tsx and route paths (hypnoneuro-games) — RESOLVED ✓
- **File:** `hypnoneuro-games/encrypthealth/frontend/components/Navigation.tsx:14,19-23,28,33`
- **Current text:** `userType: 'patient' | 'provider'`, routes like `/patient/dashboard`, `/patient/records`, nav label `Patients`
- **Why:** FSL lexicon requires "participant" not "patient". The main HypnoNeuro repo has been updated but the hypnoneuro-games copy has not.
- **Recommended fix:** Replace all "patient" with "participant" in this file and related route references.

### M-2. "patient" in LoginPage.tsx routing (hypnoneuro-games) — RESOLVED ✓
- **File:** `hypnoneuro-games/encrypthealth/frontend/components/LoginPage.tsx:15`
- **File:** `hypnoneuro-games/encrypthealth/frontend/app/page.tsx:14`
- **Current text:** `router.push('/patient/dashboard')`
- **Why:** Routes to `/patient/` instead of `/participant/`.
- **Recommended fix:** Update route to `/participant/dashboard`.

### M-3. "patient" in SovereignAuditUI ABI strings (hypnoneuro-games) — DEFERRED (contract ABI, code-only)
- **File:** `hypnoneuro-games/claimchain-frontend/src/components/SovereignAuditUI.tsx:37-41`
- **Current text:** `address patient` in ABI function signatures
- **Why:** While ABI parameters match the deployed contract, user-visible labels built from these should use "participant". If these appear in UI, they violate lexicon.
- **Recommended fix:** If these ABI strings are displayed to users, alias them. If code-only, mark as Low.

### M-4. "patientId" and "treatmentType" in Web3Context ABI (hypnoneuro-games) — DEFERRED (contract ABI, code-only)
- **File:** `hypnoneuro-games/claimchain-frontend/src/context/Web3Context.jsx:9-13`
- **Current text:** `patientId`, `treatmentType` in contract ABI
- **Why:** These mirror the deployed SovereignLedger contract. If surfaced in UI (transaction details, event logs), they violate lexicon.
- **Recommended fix:** Add display mapping layer so users see "participantId" and "sessionType".

### M-5. "MetaMask · EVM" in PaymentSelector subtitle (hypnoneuro-games) — RESOLVED ✓
- **File:** `hypnoneuro-games/build/frontend/src/components/PaymentSelector.jsx:18`
- **Current text:** `sub: 'MetaMask · EVM'`
- **Why:** Brave Wallet is the primary wallet per brand guide. MetaMask should not be the named wallet in the payment selector.
- **Recommended fix:** Change to `Brave Wallet · EVM` or just `EVM Wallet`.

### M-6. "Pay with ETH directly to our wallet via MetaMask" in dist bundle — RESOLVED ✓
- **File:** `hypnoneuro-games/build/frontend/dist/assets/index-BHAOwfU0.js` (minified)
- **Current text:** `Pay with ETH directly to our wallet via MetaMask` in subscription gate
- **Why:** Same MetaMask branding issue, now baked into the production bundle.
- **Recommended fix:** Fix source, rebuild.

### M-7. "Provider directory + booking" in subscription feature lists — RESOLVED ✓
- **File:** `hypnoneuro-games/build/frontend/src/components/SubscriptionModal.jsx:21`
- **File:** `hypnoneuro-games/build/frontend/src/pages/SubscriptionGate.jsx:28`
- **Current text:** `Provider directory + booking`
- **Why:** Should use "Sovereign Guide directory + booking" per lexicon.
- **Recommended fix:** Replace "Provider" with "Sovereign Guide" in feature descriptions.

### M-8. "Provider directory access" in SubscriptionPlans (HypnoNeuro) — RESOLVED ✓
- **File:** `HypnoNeuro/encrypthealth/frontend/components/SubscriptionPlans.tsx:29`
- **Current text:** `Provider directory access`
- **Why:** User-facing feature label should say "Sovereign Guide directory access".
- **Recommended fix:** Replace "Provider" with "Sovereign Guide".

### M-9. wagmi still imported and used in encrypthealth (hypnoneuro-games) — DEFERRED (requires full encrypthealth sync)
- **File:** `hypnoneuro-games/encrypthealth/frontend/components/Navigation.tsx:3`
- **File:** `hypnoneuro-games/encrypthealth/frontend/components/LoginPage.tsx:3`
- **File:** `hypnoneuro-games/encrypthealth/frontend/app/providers.tsx:3-6,27,31`
- **File:** `hypnoneuro-games/encrypthealth/frontend/app/page.tsx:3`
- **Current text:** `import { useAccount, useDisconnect } from 'wagmi'`, `WagmiProvider`
- **Why:** The main HypnoNeuro repo removed wagmi in favor of pure window.ethereum + JWT. The hypnoneuro-games copy still uses it.
- **Recommended fix:** Sync the hypnoneuro-games encrypthealth directory with the main HypnoNeuro repo.

### M-10. "MetaMask" instructions in AlchemistForge article — RESOLVED ✓
- **File:** `alchemist-forge/article/AmericaOutLoud.md:40-41`
- **Current text:** `Get MetaMask: Install from metamask.io`, `Switch to Sepolia: Open MetaMask`
- **Why:** Published article directs users to MetaMask instead of Brave Wallet.
- **Recommended fix:** Update article to recommend Brave Wallet as primary, MetaMask as alternative.

### M-11. "ClaimChain" in NeuroBalance-Watch README — RESOLVED ✓
- **File:** `NeuroBalance-Watch/README.md:11,55`
- **Current text:** `integrated component of HypnoNeuro, EncryptHealth, and ClaimChain` and `ClaimChain | Insurance governance layer`
- **Why:** Retired brand name in README.
- **Recommended fix:** Replace "ClaimChain" with "SovereignLedger".

### M-12. CLAIMCHAIN_DAO address hardcoded (hypnoneuro-games) — RESOLVED ✓
- **File:** `hypnoneuro-games/build/frontend/src/components/EligibilityFlow.jsx:9,60`
- **Current text:** `const CLAIMCHAIN_DAO = '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9'`
- **Why:** Variable name uses retired brand. More importantly, this is a Hardhat default local address (not a deployed Sepolia/mainnet contract).
- **Recommended fix:** Rename variable to `SOVEREIGN_LEDGER_DAO` and update to the correct deployed contract address.

### M-13. `provider_patient_links` database table name in fsl-command-center — DEFERRED (confirm DB rename)
- **File:** `fsl-command-center/index.html:610`
- **Current text:** `provider_patient_links` listed among database tables
- **Why:** Table name uses "patient" instead of "participant". While DB schema names don't need to match user-facing lexicon, this is displayed on the command center dashboard.
- **Recommended fix:** If the table has been renamed in production, update the display. If not, consider renaming the table.

---

## Low (Internal TODOs / Comments)

### L-1. Privy references in fsl-command-center docs (hypnoneuro-games copy) — DEFERRED
- **File:** `hypnoneuro-games/fsl-command-center/docs/arcade-demo-flow.md:27`
- **File:** `hypnoneuro-games/fsl-command-center/docs/demo-script.md:29`
- **File:** `hypnoneuro-games/fsl-command-center/docs/FSL-Ecosystem-Pitch-Deck.md:131,138,163`
- **File:** `hypnoneuro-games/fsl-command-center/docs/FSL-One-Pager.md:33`
- **Current text:** References to Privy auth, Privy integration
- **Why:** Privy was removed. These demo docs still reference it as the auth method.
- **Recommended fix:** Update docs to reflect EIP-1193 + JWT auth flow.

### L-2. Stripe references throughout fsl-command-center docs — DEFERRED
- **File:** `hypnoneuro-games/fsl-command-center/docs/white-label-guide.md:28,41,102,107-108`
- **File:** `hypnoneuro-games/fsl-command-center/docs/mainnet-checklist.md:75,86,124-125,148`
- **File:** `hypnoneuro-games/fsl-command-center/docs/sample-operator-config.js:36`
- **File:** `hypnoneuro-games/fsl-command-center/docs/demo-script.md:184`
- **Current text:** Stripe keys, Stripe webhook overrides, Stripe test flow references
- **Why:** Stripe was removed from the platform. These planning docs still reference it.
- **Recommended fix:** Update or archive these docs. If Stripe may return as fiat bridge, mark sections as "deferred".

### L-3. `hypnoneuro_build_executor.py` contains "Where Mental Wellness Meets Metaverse" — DEFERRED (pending tagline review)
- **File:** `HypnoNeuro/handlers/hypnoneuro_build_executor.py:70`
- **Current text:** `Project: HypnoNeuro — Where Mental Wellness Meets Metaverse`
- **Why:** Internal build script prompt. Not user-facing but sets context for AI-generated code.
- **Recommended fix:** Update if tagline has changed.

### L-4. "ClaimChain" in handler scripts — RESOLVED ✓
- **File:** `HypnoNeuro/handlers/hypnoneuro_autonomous.py:144-145,149`
- **File:** `HypnoNeuro/handlers/hypnoneuro_orchestrator.py:37,50-51`
- **Current text:** `ClaimChain insurance`, `Wire Stripe (fiat), MetaMask (crypto), ClaimChain (insurance)`
- **Why:** Internal build handler task descriptions use retired brand and removed integrations.
- **Recommended fix:** Update task descriptions to reflect current architecture.

### L-5. localhost in backend CORS defaults — DEFERRED (requires NODE_ENV gating)
- **File:** `HypnoNeuro/build/therapist/backend/app/main.py:16` -- `http://localhost:3000`
- **File:** `HypnoNeuro/build/phase-3/backend/app/main.py:14` -- localhost in CORS
- **File:** `HypnoNeuro/build/payments/frontend/src/components/PaymentModal.tsx:18` -- fallback to `http://localhost:8000`
- **File:** `NeuroBalance-Watch/build/backend/backend/app/core/config.py:26-27` -- localhost CORS
- **File:** `NeuroBalance-Watch/build/frontend/backend/main.py:17` -- localhost CORS
- **Why:** localhost in CORS is standard for dev, but should be gated behind `NODE_ENV` for production. Already flagged in governance ECOSYSTEM_READINESS_AUDIT.
- **Recommended fix:** Gate localhost CORS origins behind `NODE_ENV !== 'production'`.

### L-6. Hardcoded VPS IP (74.208.202.239) in claimchain-frontend source — DEFERRED (needs env var refactor)
- **File:** `hypnoneuro-games/claimchain-frontend/src/services/api.js:2`
- **File:** `hypnoneuro-games/claimchain-frontend/src/pages/PractitionerDashboard.jsx`
- **File:** `hypnoneuro-games/claimchain-frontend/src/pages/PractitionerSuperbill.jsx`
- **File:** `hypnoneuro-games/claimchain-frontend/src/pages/ProviderApply.jsx`
- **File:** `hypnoneuro-games/claimchain-frontend/src/pages/MyRecords.jsx`
- **File:** `hypnoneuro-games/claimchain-frontend/src/pages/InsuranceNavigator.jsx`
- **File:** `hypnoneuro-games/claimchain-frontend/src/pages/ParticipantDashboard.jsx`
- **Current text:** `http://74.208.202.239:4001`, `http://74.208.202.239:4002`, etc.
- **Why:** Raw IP addresses should use domain names (fsl-api.encrypthealth.io). If VPS IP changes, all these break.
- **Recommended fix:** Replace with environment variable or domain-based URL.

### L-7. "claimchain-frontend.vercel.app" in status.json and docs — DEFERRED (needs Vercel redeploy)
- **File:** `fsl-command-center/status.json` (3 occurrences)
- **File:** `fsl-command-center/docs/FSL-One-Pager.md:109`
- **File:** `fsl-command-center/docs/FSL-Ecosystem-Pitch-Deck.md`
- **File:** `hypnoneuro-games/status.json` (2 occurrences)
- **Why:** The Vercel deployment URL still uses the retired "claimchain" name.
- **Recommended fix:** Redeploy SovereignLedger frontend to `sovereignledger.vercel.app` and update all references.

### L-8. Stripe import in build/payments backend (HypnoNeuro) — DEFERRED (archive candidate)
- **File:** `HypnoNeuro/build/payments/backend/app/api/v1/endpoints/payments.py:5,13,29`
- **Current text:** `import stripe`, `stripe.api_key`, `payment_method: Literal["stripe", "metamask", "claimchain"]`
- **Why:** Dead code -- Stripe was removed. This endpoint would fail at runtime.
- **Recommended fix:** Remove Stripe code path or archive the file.

### L-9. `setPatients` variable name in IntakeDashboard — RESOLVED ✓
- **File:** `hypnoneuro-games/build/frontend/src/components/IntakeDashboard.jsx:156,163,170`
- **Current text:** `const [participants, setPatients] = useState([])`, `const loadPatients = ...`
- **Why:** Variable is correctly named `participants` but setter and loader still use "patient". Internal code, but inconsistent.
- **Recommended fix:** Rename `setPatients` to `setParticipants` and `loadPatients` to `loadParticipants`.

### L-10. "Brand guide in development" in fsl-command-center — RESOLVED ✓
- **File:** `fsl-command-center/index.html:986`
- **Current text:** `Brand guide in development.`
- **Why:** Brand guide (FSL_BRAND_GUIDE.md) exists in fsl-governance. This status is stale.
- **Recommended fix:** Update to "Brand guide complete" with link.

### L-11. "TBD" in provider participants page — RESOLVED ✓
- **File:** `HypnoNeuro/encrypthealth/frontend/app/provider/participants/page.tsx:154`
- **Current text:** `{p.scheduled_at ? new Date(p.scheduled_at).toLocaleDateString() : "TBD"}`
- **Why:** "TBD" shown to providers when session has no date. Acceptable fallback but could be more descriptive.
- **Recommended fix:** Change to "Not yet scheduled" for clarity.

---

## Summary

| Severity | Count |
|----------|-------|
| Critical | 8 |
| High | 6 |
| Medium | 13 |
| Low | 11 |
| **Total** | **38** |

### Top Priority Actions
1. **Fix trycloudflare URLs** (C-1, C-2) -- game sessions are silently failing when tunnel expires
2. **Fix NeuroBalance-Watch localhost** (C-3) -- dashboard is completely broken for all users
3. **Purge "ClaimChain" from user-facing text** (C-4, C-5, C-6, M-12) -- brand violation in consent UI
4. **Sync hypnoneuro-games encrypthealth with main repo** (M-1, M-2, M-9) -- old "patient"/wagmi code
5. **Resolve "Coming Soon" items** (H-1, H-2, H-3, H-4) -- either enable features or remove placeholders

### Repos by Issue Count
| Repo | Critical | High | Medium | Low |
|------|----------|------|--------|-----|
| hypnoneuro-games | 3 | 1 | 7 | 5 |
| HypnoNeuro | 2 | 3 | 1 | 4 |
| NeuroBalance-Watch | 2 | 0 | 1 | 0 |
| fsl-command-center | 0 | 1 | 1 | 2 |
| alchemist-forge | 0 | 0 | 1 | 0 |
| fsl-web | 0 | 0 | 0 | 0 |
| fsl-governance | 0 | 0 | 0 | 0 |

### Clean Repos
- **fsl-web**: No issues found. Landing page uses correct wellness language, no stale references.
- **fsl-governance**: Documentation-only repo. References to retired brands and tools are historical/contextual (audit reports, migration records) and appropriate.
- **alchemist-forge**: One medium issue (MetaMask in article). Otherwise clean.

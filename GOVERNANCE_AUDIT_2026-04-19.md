# FSL Governance & Security Audit — 2026-04-19

## Executive Summary

Full ecosystem audit across security, smart contracts, compliance, and infrastructure. 3 agents deployed in parallel. 8 smart contracts reviewed, 5 platforms scanned, 64 database tables checked, all PM2 processes audited.

**Overall Status:** OPERATIONAL with critical items requiring attention before mainnet.

---

## 1. SECURITY FINDINGS

### Critical

| Issue | Location | Risk |
|-------|----------|------|
| JWT hardcoded fallback secret | `app/api/auth/verify/route.ts`, `middleware.ts` | Anyone with source code can forge JWTs if env var is unset |
| Backend API has no auth middleware | VPS `/opt/encrypthealth/backend/index.js` — 28 routes, none have JWT verification | Any client reaching port 4001 can call mint, consent, NFT endpoints |
| ABI mismatch in anchorToChain.ts | Calls `store()`/`retrieve()` on AlchemistForge which only has `alchemize()`/`celebrateEgregiously()` | All IPFS chain-anchoring calls silently fail |

### High

| Issue | Location | Risk |
|-------|----------|------|
| EHT token owner can mint unlimited | `EHT.sol` — `onlyOwner` on `mint()` | Centralization/rug risk on mainnet |
| 5 of 8 deployed contracts have no local source | HNT v2, MindMasteryNFT, SovereignLedger, BenevolenceFund, Achievement contracts | Cannot audit, verify, or redeploy |
| fsl-discord-engine: 76 restarts | PM2 crash loop | Persistent bug in scheduler |
| fsl-governance repo has no .gitignore | `fsl-governance` GitHub repo | Secrets could be accidentally committed |

### Medium

| Issue | Location | Risk |
|-------|----------|------|
| No swap configured on VPS | System | OOM killer could terminate processes under memory pressure |
| CORS wildcard on encrypthealth.io | Vercel frontend headers | Overly permissive for health platform |
| No JWT secret rotation policy | auth/verify | Long-lived symmetric key |
| `transferFrom()` skips resonance tracking in EHT | `EHT.sol` | Inconsistent token behavior |

---

## 2. SMART CONTRACT AUDIT

### 8 Contracts on Sepolia

| Contract | Address | Owner? | Rug Risk | Mainnet Ready? |
|----------|---------|--------|----------|----------------|
| AlchemistForge | 0xE092...A324 | No | None | YES — add string length limit |
| EHT Token | 0xbDae...2CdC | Yes (deployer) | MEDIUM — unlimited mint | NO — cap supply or renounce |
| HNT v2 | 0x1ae1...84e2 | Unknown | Unknown | NO — no source to audit |
| MindMasteryNFT | 0xCb9E...7771 | Unknown | Unknown | NO — no source to audit |
| SovereignLedger | 0xf329...A94e | Unknown | Unknown | NO — no source to audit |
| BenevolenceFund | 0xbe71...8271 | Unknown | Unknown | NO — no source to audit |
| PractitionerAchievement | 0xe23e...f987 | Unknown | Unknown | NO — no source to audit |
| ParticipantAchievement | 0x406c...6fc6 | Unknown | Unknown | NO — no source to audit |

### Additional Contracts (local source, deployment status unclear)

- OrthomolecularToken — custom owner pattern, no transfer mechanism
- BackupArchiveContract — 2-of-3 multisig, no timeout enforcement
- HypnoNeuroGame — ReentrancyGuard (good), unbounded arrays
- FrequencyOracle — centralized oracle, owner-controlled
- PlantIntelligenceNFT — owner-controlled minting
- SovereignConsentRegistry — fully permissionless, no admin (good)

### No contracts are upgradeable. All redeployment required for fixes.

---

## 3. COMPLIANCE / LEXICON SCAN

### Critical Violations — HypnoNeuro Games

| Banned Word | Instances | Files | Priority |
|-------------|-----------|-------|----------|
| "patient" (affirmative use) | 15+ | KnowledgeBase.jsx, HelpCenter.jsx, OperatorRegister.jsx, GameSelection.jsx, BookingConfirmation.jsx, IntakeDashboard.jsx | CRITICAL |
| "SovereignLedger" (should be SovereignLedger) | 15+ | ConsentManager.jsx, OperatorPage.jsx, ProviderOnboard.jsx, HelpCenter.jsx, GameSelection.jsx, SubscriptionGate.jsx, KnowledgeBase.jsx | CRITICAL |
| "Provider/Providers" (should be Sovereign Guides) | 4 | NutritionProtocol.jsx, BookingConfirmation.jsx, KnowledgeBase.jsx, AllergyTracker.jsx | HIGH |

### EncryptHealth Frontend — Mostly Clean

| Issue | Files | Priority |
|-------|-------|----------|
| "clinical" in affirmative context | provider/attestations/page.tsx, provider/notes/page.tsx | HIGH |

### Educational disclaimers: PRESENT across all major pages. PASS.

---

## 4. INFRASTRUCTURE HEALTH

| Metric | Value | Status |
|--------|-------|--------|
| VPS Disk | 17G / 239G (7%) | Healthy |
| VPS RAM | 2.3G / 7.6G | Healthy |
| VPS Load | 0.16 | Healthy |
| VPS Uptime | 46 days | Stable |
| Database | 64 tables, 12 MB | Healthy |
| Daily Backup | Cron at 02:00 UTC, last run OK | Active |
| Cloudflare Tunnel | systemd enabled, Restart=on-failure | Auto-recovers |
| PM2 Processes | 5 online | All running |
| IPFS Pins (Pinata) | Tested CIDs return 200 | Accessible |

---

## 5. PRIORITIZED TODO LIST

### Critical — Blocks Launch

| # | Item | Effort |
|---|------|--------|
| 1 | Add JWT verification middleware to backend API routes | 2-3 hours |
| 2 | Remove hardcoded JWT fallback secret from source code | 15 min |
| 3 | Fix anchorToChain.ts ABI mismatch (points to wrong contract) | 1 hour |
| 4 | Recover or redeploy 5 contracts with missing source code | 4-8 hours |
| 5 | Cap EHT token supply or add governance before mainnet | 2 hours |
| 6 | Fix HypnoNeuro lexicon violations — "patient" in 7 files | 2 hours |
| 7 | Replace "SovereignLedger" with "SovereignLedger" in HypnoNeuro (7 files) | 1 hour |

### High — Fix Before Users

| # | Item | Effort |
|---|------|--------|
| 8 | Fix fsl-discord-engine crash loop (76 restarts) | 1 hour |
| 9 | Replace "Provider" with "Sovereign Guide" in HypnoNeuro UI (4 files) | 30 min |
| 10 | Replace "clinical" in EncryptHealth provider notes (2 files) | 15 min |
| 11 | Add .gitignore to fsl-governance repo | 5 min |
| 12 | XRPL verify-xrpl endpoint — add cryptographic signature verification | 4 hours |
| 13 | Twitter API keys — get real keys from developer.x.com | 15 min (Dr. Meg) |
| 14 | Reddit API credentials — create script app | 15 min (Dr. Meg) |

### Medium — Quality of Life

| # | Item | Effort |
|---|------|--------|
| 15 | Configure 2GB swap on VPS | 10 min |
| 16 | Tighten CORS from wildcard to FSL domains only | 30 min |
| 17 | Add JWT secret rotation mechanism | 2 hours |
| 18 | Implement backup retention (7 daily + 4 weekly) | 30 min |
| 19 | Add string length limit to AlchemistForge contract | Redeploy needed |
| 20 | Fix EHT transferFrom to call _activateResonance | Redeploy needed |
| 21 | Deploy EncryptHealth frontend changes (favicon, API URL, email) | 5 min (needs approval) |

### Low — Nice to Have

| # | Item | Effort |
|---|------|--------|
| 22 | Add proxy/upgrade pattern to contracts for future fixes | Architecture decision |
| 23 | Implement Mastodon auto-posting | 2 hours |
| 24 | hypnosispsych.com — update nameservers or retire domain | 15 min (Dr. Meg) |
| 25 | NPI application status tracker on Command Center | 30 min |
| 26 | ENS registration (futuresystemslab.eth) | Cost + 30 min |

---

## Generated By

FSL Agent Council — Security, Compliance, Smart Contract, System Architect agents
Date: 2026-04-19
Commit: See git log for associated fixes

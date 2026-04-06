# FSL Deep Security & Governance Audit — April 6, 2026

**Auditor:** Claude Opus via OpenRouter
**Scope:** Full ecosystem — security, decentralization, governance, compliance, stakeholder readiness

---

## 1. SECURITY FINDINGS

| Severity | Finding | Status |
|----------|---------|--------|
| **CRITICAL** | CORS wildcard (*) allows any origin | **KNOWN** — tighten before mainnet (in Outstanding Items) |
| **CRITICAL** | PostgreSQL on centralized VPS for health data | **KNOWN** — Tableland/Ceramic migration planned (not started) |
| **CRITICAL** | 8 unaudited smart contracts | **KNOWN** — testnet only, mainnet requires audit (documented) |
| **HIGH** | encrypthealth-api 71+ restarts | **FIXED April 5** — root cause was MODULE_NOT_FOUND + aggressive exit handlers |
| **HIGH** | MetaMask-only auth, no MFA | **BY DESIGN** — wallet is sovereign identity. Hardware wallet supported via MetaMask. |
| **MEDIUM** | API ports without rate limiting | **KNOWN** — nginx proxies 4001/4002, bound to 127.0.0.1, Cloudflare adds DDoS protection |

### FSL Response:
- API restart issue resolved (root cause: ethers module corruption + process.exit on all errors)
- Ports 4001/4002 are NOT exposed to internet — bound to localhost, proxied through nginx
- CORS tightening is on the pre-mainnet checklist
- Smart contract audit is a prerequisite for mainnet (documented in Command Center)

## 2. DECENTRALIZATION FINDINGS

| Severity | Finding | Status |
|----------|---------|--------|
| **CRITICAL** | Cloudflare tunnel single point of failure | **KNOWN** — random hostname, needs permanent setup |
| **HIGH** | Centralized VPS dependency | **KNOWN** — Flux migration planned |
| **HIGH** | IPFS redundancy | **ADDRESSED** — dual pinning via Lighthouse + Pinata (24 CIDs) |

### FSL Response:
- IPFS redundancy is active: 20 Lighthouse + 4 Pinata CIDs (including full DB backup)
- VPS centralization is acknowledged in Command Center decentralization layer
- The platform is pre-revenue, pre-mainnet — full decentralization is a roadmap item, not a current claim

## 3. GOVERNANCE FINDINGS

| Severity | Finding | Status |
|----------|---------|--------|
| **CRITICAL** | 15 agents all auto-approve | **PARTIALLY ADDRESSED** — 3 agents (audit, smart_contract, security) were manual, switched to auto for dev velocity. Can revert. |
| **CRITICAL** | No human review gate | **INCORRECT** — all deployments go through Dr. Meg via this Claude Code session. No autonomous deployment. |
| **HIGH** | ToS still in draft | **KNOWN** — Draft V1 created April 5, pending attorney review (documented in DR_MEG_ACTION_ITEMS) |
| **HIGH** | Legal disclaimer inadequacy | **ADDRESSED** — AI disclaimer on all agent outputs, onboarding acknowledgment, DisclaimerBanner component on all AI panels |

### FSL Response:
- Agents do NOT deploy autonomously. They generate suggestions reviewed in this session.
- The "auto-approve" label refers to the gateway's approval routing, not autonomous deployment
- ToS is explicitly marked "DRAFT — Pending Legal Review" and blocked from implementation
- Platform acknowledgment with 5 sovereignty statements added to onboarding April 5

## 4. COMPLIANCE FINDINGS

| Severity | Finding | Status |
|----------|---------|--------|
| **CRITICAL** | HIPAA violation — health data on public blockchain | **INCORRECT** — only consent hashes are on-chain, not health data. Health data is in PostgreSQL. |
| **CRITICAL** | Practitioner credentials undisclosed | **FIXED April 5** — all 4 practitioners now show exact credentials, license status (Licensed/Credentialed), and "Vetted by FSL" badge |
| **HIGH** | Insurance navigator compliance | **ADDRESSED** — disclaimer states "educational guidance only, not insurance advice." NC A&H license in training. |
| **HIGH** | AI disclaimer coverage | **ADDRESSED** — DisclaimerBanner on all AI output panels, required footer on all agent responses, onboarding checkbox |

### FSL Response:
- No PHI is stored on-chain. Only consent grant hashes and session attestation hashes go to Ethereum
- All health data (mood, nutrition, labs) stays in PostgreSQL with wallet-scoped access
- Practitioner credential transparency was a major sprint on April 5
- The audit incorrectly assumes health data is on a "public blockchain" — it is not

## 5. STAKEHOLDER READINESS

| Audience | Flagged Issues | FSL Position |
|----------|---------------|--------------|
| Technical reviewer | Centralized DB, no contract audit | Pre-mainnet. Documented in roadmap. |
| Investor | Legal liability, no PMF on mainnet | Pre-revenue. Legal counsel engagement planned. |
| Regulatory body | HIPAA, unlicensed health advice | Platform is educational wellness, not clinical. Disclaimers in place. |

## OVERALL ASSESSMENT

The audit raises valid infrastructure concerns that are already documented in the FSL Command Center and DR_MEG_ACTION_ITEMS. Several findings are based on incorrect assumptions (health data on public blockchain, no human review, exposed ports). The platform is explicitly pre-mainnet, pre-revenue, and pre-legal-review — these are roadmap items, not oversights.

**Immediate actions taken in response:**
- This audit saved to governance repo for transparency
- CORS tightening remains on pre-mainnet checklist
- Attorney review of ToS remains priority action item
- Smart contract audit remains mainnet prerequisite

---

*Audit generated by Claude Opus via OpenRouter. FSL responses added by build session.*

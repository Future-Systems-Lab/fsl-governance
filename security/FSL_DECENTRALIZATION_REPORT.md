# FSL Decentralization Sovereignty Report
**Date:** April 3, 2026
**Auditor:** FSL System Architect Agent
**Overall Sovereignty Score: 4.8/10**

---

## Executive Summary

The FSL ecosystem has strong *philosophical* alignment with sovereignty but significant *technical* centralization. The single VPS at 74.208.202.239 is the critical bottleneck — all API calls, token minting, session recording, and CID indexing route through one server. Smart contracts are partially decentralized (SovereignConsentRegistry is excellent; EHT/HNT minting is owner-controlled). IPFS storage via Lighthouse is available but optional. Wallet-first identity is enforced.

**Verdict:** FSL talks sovereignty but runs on a single server. The bridge from centralized infrastructure to decentralized protocol is the next major engineering milestone.

---

## Category Scores

| Category | Score | Status |
|----------|-------|--------|
| Data Storage | 4/10 | Database-first, IPFS optional |
| Identity | 7/10 | Wallet-first, email optional |
| Payment | 6/10 | Crypto active, ISO 20022, no Stripe lock-in |
| Infrastructure | 2/10 | Single VPS = single point of failure |
| Smart Contracts | 5/10 | Mixed — Consent decentralized, tokens centralized |
| Content | 3/10 | All on Vercel/VPS, no IPFS hosting yet |
| Communication | 3/10 | Telegram centralized, no wallet-to-wallet messaging |
| **OVERALL** | **4.8/10** | **Requires significant decentralization work** |

---

## AUDIT 1: Data Storage Sovereignty (4/10)

| Finding | Severity | Status |
|---------|----------|--------|
| Session records stored in PostgreSQL on VPS only | HIGH | Database is source of truth, not blockchain |
| Blockchain anchoring available (anchorToChain.ts) but optional | MEDIUM | Not enforced by default |
| Mood/nutrition data goes to VPS `/api/mood-logs` and `/api/nutrition-logs` | HIGH | Not encrypted at rest in PostgreSQL |
| Lighthouse IPFS encryption available for health data uploads | OK | Functional via filecoin.ts |
| CID registry centralized on VPS `/api/cids` | MEDIUM | If VPS dies, CID index lost |
| No AWS/Google/Firebase dependencies found | OK | Clean |

**Recommendation:** Make on-chain anchoring mandatory for session records. Move CID registry to smart contract (BackupArchive at 0xE092336F).

---

## AUDIT 2: Identity Sovereignty (7/10)

| Finding | Severity | Status |
|---------|----------|--------|
| Wallet is primary identity across all platforms | OK | MetaMask + XRPL supported |
| Email collection optional via Privy (never required) | LOW | Acceptable |
| Google/Apple OAuth available in onboarding but optional | LOW | Wallet mandatory first |
| No KYC requirements for basic access | OK | Sovereign |
| No username/password flow exists | OK | Pure wallet auth |

**Recommendation:** Remove Privy OAuth options from onboarding to strengthen sovereignty messaging. If kept, make wallet-only the prominent path.

---

## AUDIT 3: Payment Sovereignty (6/10)

| Finding | Severity | Status |
|---------|----------|--------|
| Crypto payments fully active (ISO 20022: XRP, XLM, HBAR, ALGO, ADA) | OK | Sovereign |
| Stripe integration pending ("Coming Soon — awaiting EIN") | LOW | Not active, not a dependency |
| HNT minting via VPS API, not direct smart contract call from frontend | MEDIUM | Centralized minting authority |
| HNT is real ERC-20 on Sepolia (token-engine.js calls mint via viem) | OK | On-chain token |
| No PayPal or payment processor lock-in | OK | Clean |

**Recommendation:** Move HNT minting authority to a multi-sig or governance contract. Add supply cap to prevent unlimited minting.

---

## AUDIT 4: Infrastructure Sovereignty (2/10)

| Finding | Severity | Status |
|---------|----------|--------|
| ALL API routes through single VPS 74.208.202.239 | CRITICAL | Complete SPOF |
| 3 PM2 processes on one server (encrypthealth-api, SovereignLedger, FSL_Agent_Gateway_Bot) | HIGH | No redundancy |
| PostgreSQL on same VPS with no documented backup | HIGH | Data loss risk |
| No CDN or edge caching | MEDIUM | Performance + availability |
| Vercel hosting is centralized but has global CDN | LOW | Acceptable fallback |
| No failover or load balancing | HIGH | Zero redundancy |

**Third-Party Dependencies:**
| Service | Risk Level | Can FSL Operate Without It? |
|---------|-----------|---------------------------|
| Lighthouse (IPFS) | LOW | Yes — data also in PostgreSQL |
| Infura (RPC) | MEDIUM | Swap to Alchemy or public RPC |
| Telegram Bot API | LOW | Yes — ops tool only |
| Calendly | LOW | Yes — direct booking possible |
| Fullscript | LOW | Yes — supplement ordering optional |
| Blockscout | LOW | Yes — read-only explorer |
| OpenRouter (AI) | MEDIUM | Agent Gateway depends on it |

**Recommendation:** Deploy API to second VPS or edge function. Implement nightly pg_dump to offsite. Add health check monitoring with auto-restart.

---

## AUDIT 5: Smart Contract Sovereignty (5/10)

| Contract | Admin Controls | Risk |
|----------|---------------|------|
| SovereignConsentRegistry | NONE — fully decentralized | EXCELLENT |
| HypnoNeuroGame | No admin functions | GOOD |
| EHT Token | `onlyOwner` mint — unlimited | HIGH |
| PlantIntelligenceNFT | `onlyOwner` mint | MEDIUM |
| FrequencyOracle | `onlyOwner` can modify any player data | HIGH |
| MindMasteryNFT | `onlyOwner` mint | MEDIUM |
| SovereignLedger | registerClaim open to any caller | OK |

**No proxy/upgrade patterns detected** — all contracts are immutable (secure but non-upgradeable).

**Recommendation:** Document all owner keys publicly. Add time-lock to owner functions. Consider transferring ownership to multi-sig.

---

## AUDIT 6: Content Sovereignty (3/10)

| Finding | Severity | Status |
|---------|----------|--------|
| All platforms hosted on Vercel only | MEDIUM | Centralized CDN |
| No IPFS hosting for frontend bundles | HIGH | Not deployed yet |
| NFT images (11.4 MB) on Vercel dist, not IPFS | MEDIUM | Should be on IPFS |
| Governance documents in git repo only | LOW | Should anchor to IPFS |
| deploy-ipfs.sh script created, awaiting API key | PENDING | Ready to execute |

**Recommendation:** Get Lighthouse API key, run deploy-ipfs.sh, register ENS domains.

---

## AUDIT 7: Communication Sovereignty (3/10)

| Finding | Severity | Status |
|---------|----------|--------|
| Telegram for all notifications | LOW | Centralized but acceptable for ops |
| No email marketing dependencies (Mailchimp/Sendgrid) | OK | Clean |
| No wallet-to-wallet messaging | MEDIUM | Gap for participant-practitioner comms |
| Notifications are VPS-generated push, not on-chain events | MEDIUM | Centralized |

**Roadmap Recommendations:**
- **XMTP Protocol** — wallet-to-wallet encrypted messaging for participant-practitioner communication
- **Push Protocol** — decentralized notifications triggered by on-chain events
- **Lens Protocol** — decentralized social layer for wellness community

---

## Top 5 Gaps Fixed This Sprint

1. ✅ IPFS deploy script created (`deploy-ipfs.sh`) — ready for API key
2. ✅ ENS setup guide documented with cost estimates
3. ✅ Unstoppable Domains guide documented with comparison
4. ✅ IPFS manifest template created for CID tracking
5. ✅ All third-party dependencies mapped with risk levels

## Top 5 Gaps Requiring Dr. Meg Action

1. **Get Lighthouse API key** — https://files.lighthouse.storage → create account → generate key
2. **Register ENS domains** — futuresystemslab.eth + 4 platform domains (~$75/year, needs ETH on mainnet)
3. **Register Unstoppable Domains** — 5 .x domains (~$200 one-time)
4. **Point futuresystemslab.io DNS** — A record to 74.208.202.239 for HTTPS
5. **Set up second VPS** — redundancy for API (estimated $15-20/mo)

## Roadmap Items

| Item | Priority | Effort | Impact |
|------|----------|--------|--------|
| IPFS frontend hosting | HIGH | 1 hour (after API key) | Content sovereignty |
| ENS domain registration | HIGH | 30 min + ETH gas | Decentralized naming |
| Second VPS for API redundancy | HIGH | 4 hours | Infrastructure sovereignty |
| Multi-sig for contract ownership | MEDIUM | 2 hours | Smart contract sovereignty |
| XMTP wallet-to-wallet messaging | MEDIUM | 8 hours | Communication sovereignty |
| Push Protocol notifications | LOW | 4 hours | Notification sovereignty |
| HNT supply cap + governance | LOW | 4 hours | Token sovereignty |

---

*This report feeds into the FSL decentralization roadmap. Current score of 4.8/10 reflects a system with sovereign philosophy but centralized execution. Achieving 7+/10 requires: IPFS hosting, ENS domains, API redundancy, and multi-sig contract ownership.*

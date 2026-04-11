# FSL Decentralization Migration Record

## "From Centralized Infrastructure to Sovereign Ecosystem"

**Author:** Dr. Meg Montanez-Davenport, D.N.Psy., BCHN, CBHP
**Organization:** Future Systems Lab
**Date:** April 11, 2026
**Version:** 1.0

---

### Why Transparency Matters

FSL is committed to radical transparency about what is and is not decentralized. This record documents every migration decision, timeline, and rationale — for academic research, grant applications, and participant trust.

Decentralization is not binary. It is a spectrum, and claiming "fully decentralized" without documenting the centralized components that remain is dishonest. This document is the honest account.

---

### Current State (April 11, 2026)

| Metric | Score |
|--------|-------|
| **Overall decentralization** | **65%** |
| Participant-facing layers | 90% |
| Infrastructure layers | 35% |

---

### What IS Decentralized (Confirmed)

| Component | Method | Evidence | Date Confirmed |
|-----------|--------|----------|---------------|
| Authentication | Wallet-only via EIP-1193 + personal_sign + JWT | No email/password endpoint exists in codebase | April 8, 2026 |
| Payments | Crypto-only. Stripe removed entirely. Onramper + Coinbase Pay (fiat-to-crypto bridges, non-custodial) | `grep -r "stripe" src/` returns 0 results | April 10, 2026 |
| Session records | SovereignLedger smart contract on Sepolia | Contract: `0xf32979200768e8726d5EC5E5AB0CA7407d64A94e` | March 2026 |
| Governance docs | IPFS via Pinata | CID: `Qmcu3Xb5eHxz2XG3jMy5oQHAmzKPzLH7DHQ5qeWq6THmVH` | April 10, 2026 |
| HypnoNeuro frontend | IPFS via Unstoppable Domains | CID: `QmZp389KSgioqgSs9NYXWrFB9tFdBF2sWwBq1c2n7AQnJh` at hypnoneuro.crypto | April 11, 2026 |
| Token (HNT) | ERC-20 on Sepolia | Contract: `0x1ae1e10929f008d1f9883ce574a318abd86084e2` | March 2026 |
| Identity | Wallet address only | No PII stored on-chain. No email, name, or SSN in any database table | By design |
| Shadow work (AlchemistForge) | On-chain Identify/Transmute/Celebrate | Contract: `0xE092336F8f5082e57CcBb341A110C20ad186A324` | March 2026 |
| Consent mechanism | Cryptographic signature (personal_sign) verified via ethers.verifyMessage | JWT issued only after signature verification | April 9, 2026 |
| Open source | 8 PRs to major repos | GitHub: Future-Systems-Lab org | March-April 2026 |

---

### What Is NOT Decentralized (Honest)

#### 1. AI Agents — OpenRouter / Anthropic

**Current state:** 17 AI agents route through OpenRouter API to Anthropic Claude models. This is a centralized dependency.

**Why:** No production-ready decentralized LLM exists that matches the capability needed for autonomous building, compliance scanning, and complex multi-step tasks. The agents don't just answer questions — they write code, deploy infrastructure, and make architectural decisions.

**Decentralized alternatives evaluated:**
- **Ollama** (open source, self-hosted) — Capable for simple tasks (compliance scanning, copy review). Cannot replace Claude for complex builds. Can run on Akash Network.
- **Bittensor / TAO** — Decentralized AI network. Early stage but promising. Subnet architecture could theoretically serve agent requests. Not production-ready for FSL's use case as of April 2026.
- **Gensyn** — Decentralized ML compute. In development. Focused on training, not inference serving.

**Migration plan:**
- Phase 1: Deploy Ollama on Akash for simple agents (compliance, lexicon scanning)
- Phase 2: Evaluate Bittensor/TAO as inference subnets mature
- Phase 3: Hybrid — simple agents on decentralized infra, complex agents on centralized until viable alternative exists

**Timeline:** Post-funding, beginning Q3 2026
**Partnership opportunity:** Bittensor, Gensyn, and Akash may benefit from FSL as a real-world wellness AI use case.

#### 2. VPS Compute — IONOS

**Current state:** All backend services run on a single IONOS VPS (74.208.202.239). This is centralized compute.

**Why:** Akash Network deployment requires AKT tokens (~$20-30 for 3 months) and Docker image preparation. The migration is straightforward but blocked on token acquisition.

**What's on the VPS:**
- encrypthealth-api (Node.js/Express, port 4001)
- FSL_Agent_Gateway_Bot (Python, Telegram)
- SovereignLedger (Node.js)
- Cloudflare tunnel (quick tunnel to expose API)
- PostgreSQL database

**Migration plan:**
- Deploy API + Gateway to Akash via Cloudmos UI
- IONOS remains as hot backup (not retired — backup layer)
- Layered architecture: Akash (primary) → IONOS (backup) → GitHub (code) → IPFS (immutable)

**Estimated cost:** ~$20-28 for 3 months (50-80 AKT)
**Timeline:** When AKT tokens acquired
**SDL templates:** Ready (see akash_deployment_plan.md)

#### 3. Frontend Hosting — Vercel

**Current state:** All 5 platform frontends deploy to Vercel via `vercel --prod`. Vercel is centralized.

**Why:** GitHub account was flagged on April 10, 2026, blocking 4EVERLAND deployment (requires GitHub OAuth). Vercel deployments continue to work from local builds.

**Progress toward decentralization:**
- hypnoneuro.crypto → IPFS via Unstoppable Domains (LIVE as of April 11, 2026)
- encrypthealth.io still on Vercel (Next.js SSR requires server, pure IPFS won't work without static export)

**Migration plan:**
1. Resolve GitHub flag → enables 4EVERLAND
2. Create static export of EncryptHealth (requires architectural change from SSR to SSG for IPFS-compatible build)
3. Pin static exports to IPFS
4. Point .crypto Unstoppable Domains to IPFS CIDs
5. Vercel remains as accessibility layer for .io domains

**Blocker:** EncryptHealth uses Next.js server-side rendering (API routes, middleware). Pure IPFS hosting requires converting to static site generation or moving API routes to a separate backend.
**Timeline:** Post GitHub flag resolution + architectural refactor

#### 4. Database — PostgreSQL on IONOS

**Current state:** 67-table PostgreSQL database on the IONOS VPS. Contains session metadata, user records, trial access, billing data.

**Why:** Full on-chain database storage is prohibitively expensive on Ethereum (even on testnet, storing structured relational data on-chain costs orders of magnitude more than PostgreSQL). The hybrid approach is intentional.

**What's in PostgreSQL (non-sovereign):**
- Session metadata (timestamps, types, duration)
- Trial access records
- Subscription status
- API operational data

**What's on-chain (sovereign):**
- Session attestations (SovereignLedger)
- Shadow work records (AlchemistForge)
- Token balances (HNT, EHT)
- NFT ownership (MindMasteryNFT)

**Migration plan:**
- Keep PostgreSQL for operational data that doesn't need sovereignty
- Move all participant-facing session records fully on-chain post-mainnet
- Evaluate Ceramic Network or Tableland for hybrid on-chain/off-chain data
- IPFS snapshots of database state as immutable backups

**Timeline:** Post-mainnet deployment

#### 5. Smart Contracts — Sepolia Testnet

**Current state:** All 8 smart contracts are deployed on Sepolia testnet. Testnet ETH has no monetary value. Transactions are not permanent in the same way mainnet transactions are.

**Why:** Mainnet deployment requires approximately 0.2 ETH (~$440) for gas fees. FSL's EIN is pending from the IRS, which blocks Coinbase Commerce setup, which blocks revenue collection, which blocks ETH accumulation.

**Contracts awaiting mainnet:**
- HypnoNeuroToken (HNT) — ERC-20 loyalty token
- EncryptHealthToken (EHT) — governance token
- MindMasteryNFT — ERC-721 game progression
- SovereignLedger — session records
- AlchemistForge — shadow work
- BenevolenceFund — community access fund
- ClaimChainDAO — governance
- EncryptHealthVault — data access control

**Migration plan:** EIN → Coinbase Commerce → accumulate ETH → professional security audit → mainnet deployment
**Estimated cost:** $450 gas + $2K-5K audit = $2,450-5,450
**Timeline:** EIN arrival + 30-60 days

#### 6. Email — Proton Mail

**Current state:** All FSL communications use future.systems.lab@proton.me. Proton Mail is a centralized service, though it is end-to-end encrypted and privacy-first.

**Why:** No production-ready decentralized email service exists with equivalent reliability, deliverability, and encryption. Proton is the most sovereignty-aligned centralized option available.

**Alternatives evaluated:**
- Skiff Mail — shut down (acquired by Notion)
- Dmail — Web3 email, early stage, limited adoption
- Hashmail — blockchain-based, not production-ready

**Migration plan:** Monitor decentralized email ecosystem. Switch when a viable alternative achieves production reliability.
**Timeline:** When viable alternative exists (no ETA)

---

### Layered Backup Architecture

Every FSL layer has a backup path. No single point of failure can take down the entire ecosystem.

| Layer | Primary | Backup | Immutable |
|-------|---------|--------|-----------|
| Code | GitHub | Gitea (git.futuresystemslab.io) | IPFS pins |
| Frontend | Vercel (.io domains) | 4EVERLAND IPFS (migration) | .crypto Unstoppable Domains |
| Compute | IONOS VPS | Akash Network (migration) | Local backup scripts |
| Database | IONOS PostgreSQL | On-chain records (SovereignLedger) | IPFS snapshots |
| Auth | JWT (session) | Wallet signature (permanent) | On-chain consent record |
| Governance | GitHub repo | IPFS pins | Unstoppable Domains |
| DNS | Namecheap (.io) | Unstoppable Domains (.crypto/.x/.888) | Blockchain DNS |

---

### Partnership Opportunities

These projects may benefit from FSL as a real-world use case:

| Project | Opportunity | FSL Benefit |
|---------|------------|-------------|
| Akash Network | First wellness platform on decentralized compute | Decentralized VPS replacement |
| Bittensor / TAO | AI agents for wellness — novel subnet use case | Decentralized AI inference |
| Gensyn | ML compute for wellness AI | Decentralized training |
| XRPL Foundation | ISO 20022 wellness payments — grant-funded use case | Payment rail integration |
| Unstoppable Domains | Sovereign wellness identity showcase | More .crypto domains |
| 4EVERLAND | IPFS frontend hosting — Next.js support | Vercel replacement |

---

### Academic Record

This migration is documented as applied research for the Arizona State University Doctor of Engineering program (enrollment: January 2027).

**Research question:** "Can decentralized infrastructure provide a viable alternative to centralized health tech platforms while preserving participant sovereignty?"

**Answer being demonstrated:** Yes — with a documented migration path, honest accounting of what remains centralized, specific timelines for each migration, and cost estimates for each phase.

**Key insight:** Decentralization is not an event — it is a process. The honest documentation of that process, including the components that cannot yet be decentralized, is itself a contribution to the field.

---

### Future Scope — Full Decentralization Roadmap

#### Phase 1 — Foundation (Complete, $0)
- [x] Wallet-only authentication (personal_sign + JWT)
- [x] Crypto-only payments (Stripe removed)
- [x] IPFS governance documents
- [x] hypnoneuro.crypto on IPFS via Unstoppable Domains
- [x] 8 smart contracts on Sepolia
- [x] Sovereignty-first lexicon (no clinical language)

#### Phase 2 — Decentralized Compute (~$30 AKT)
- [ ] Akash Network deployment (API + Gateway)
- [ ] IONOS as hot backup only
- [ ] Ollama for simple agents on Akash
- [ ] Docker images built and pushed

#### Phase 3 — Mainnet (~$440 ETH + $2-5K audit)
- [ ] Professional smart contract security audit
- [ ] Mainnet contract deployment (all 8 contracts)
- [ ] Real session records on mainnet SovereignLedger
- [ ] HNT token on mainnet with real value
- [ ] BenevolenceFund accepting real ETH

#### Phase 4 — Frontend Sovereignty (GitHub flag + 4EVERLAND)
- [ ] GitHub account flag resolved
- [ ] All frontends deployed to IPFS via 4EVERLAND
- [ ] Vercel as backup/accessibility layer only
- [ ] Full .crypto domain suite purchased and pointed

#### Phase 5 — AI Sovereignty (Post-funding)
- [ ] Bittensor/TAO agent evaluation
- [ ] Simple agents migrated to decentralized inference
- [ ] Complex agents: hybrid approach documented
- [ ] Akash primary compute, IONOS retired

#### Phase 6 — Full Scale (2028-2029)
- [ ] Dual doctoral press moment (D.N.Psy. + D.Eng.)
- [ ] Guinness World Record confirmation
- [ ] White-label college licensing
- [ ] International Sovereign Guide network
- [ ] encrypthealth.com acquisition
- [ ] Target: 95%+ decentralization score

---

### Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | April 11, 2026 | Initial document — complete migration record |

---

*This document is maintained as part of FSL's applied doctoral research and world record evidence package.*
*Future Systems Lab · All Rights Reserved*
*Educational platform. Not medical advice.*

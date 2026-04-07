# FSL Decentralization Roadmap
## Current State + Migration Path to Full Sovereignty
### April 7, 2026

---

## FULLY SOVEREIGN ✅

| Component | Implementation |
|-----------|---------------|
| Wallet authentication | MetaMask / GemWallet / Crossmark / WalletConnect |
| Payment rails | ETH / USDC / XRP / XLM / HBAR / ALGO / ADA |
| Smart contracts | 8 contracts on Ethereum Sepolia |
| IPFS storage | Pinata (active) + Lighthouse (API recovering) |
| DNS | Unstoppable Domains backup layer (.888, .crypto) |
| HNT token | Sovereign contract, no central issuer, earned-only |
| Health records | Wallet-anchored, hash-only on-chain, data in encrypted DB |
| Fonts | Self-hosted Chakra Petch (no Google Fonts CDN) |

## PARTIALLY DECENTRALIZED 🟡

| Component | Current | Target | Timeline |
|-----------|---------|--------|----------|
| Smart contracts | Sepolia testnet | Ethereum mainnet | Q3 2026 (after audit) |
| Session data | PostgreSQL on VPS | Ceramic / Tableland | Post-mainnet |
| Code hosting | GitHub (Microsoft) | Radicle + Gitea | Q2 2026 |
| IPFS pinning | Pinata only | Pinata + Lighthouse dual-pin | When Lighthouse API recovers |

## CENTRALIZED — DOCUMENTED 🔴

| Component | Why centralized | Mitigation | Roadmap |
|-----------|----------------|------------|---------|
| Vercel hosting | Frontend CDN, fast deploys | IPFS backup via Lighthouse | Q4 2026 |
| IONOS VPS | Backend API + PostgreSQL | Multi-region VPS, then decentralized DB | Q3 2026 |
| Daily.co | Video sessions | Migrate to Huddle01 (Web3-native) | Post-revenue |
| Stripe | Fiat bridge | Training wheels only — crypto primary | Remove post-traction |
| CryptoCompare | Ticker prices | Public market data — acceptable | N/A |

## CODE HOSTING MIGRATION PLAN

| Phase | Action | Timeline |
|-------|--------|----------|
| 1 (Now) | GitHub stays as public portfolio + primary | Active |
| 2 | Mirror all repos to Radicle | Q2 2026 |
| 3 | Self-hosted Gitea on VPS as backup | Q2 2026 |
| 4 | IPFS snapshot of each release | Q3 2026 |

## MAINNET READINESS GATES

See `PRE_MAINNET_GATES.md` for full checklist. Key blockers:
- [ ] Smart contract audit (third party)
- [ ] ToS attorney review
- [ ] NC A&H license confirmed
- [ ] First paying user + MRR validated

## RADICLE SETUP PLAN

1. Install Radicle CLI: `curl -sSf https://radicle.xyz/install | sh`
2. Initialize each repo: `rad init`
3. Push to Radicle network: `rad push`
4. Share Radicle IDs in README alongside GitHub

## GITEA SELF-HOSTED PLAN

1. Install Gitea on VPS port 3000
2. Mirror all GitHub repos to Gitea
3. Set up auto-mirror on every git push
4. Gitea URL: `git.futuresystemslab.io`

## HUDDLE01 MIGRATION PLAN

1. Huddle01 is Web3-native video (wallet-gated rooms)
2. Replace Daily.co room creation in `/api/sessions/book` endpoint
3. Huddle01 rooms are NFT-gated natively
4. Timeline: Post-revenue sprint

## ACADEMIC NOTE

This roadmap is part of Dr. Meg Montanez-Davenport's Doctor of Engineering (Engineering Management) applied project at ASU (target Oct 2026).

The tension between pragmatic centralization and sovereignty-first architecture is a core research theme — documented here transparently as an engineering management decision log. Every centralized dependency is acknowledged, mitigated, and scheduled for migration.

---

*Document version 1.0 — April 7, 2026*
*Maintained by FSL system_architect_agent.*

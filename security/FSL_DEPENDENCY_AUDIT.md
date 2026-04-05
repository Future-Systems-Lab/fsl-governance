# FSL Infrastructure Dependency Audit
**Date:** April 3, 2026

## Full Dependency Map

| Tool | Type | Centralized? | Sovereignty Risk | Current Status | Decentralized Alternative | Action |
|------|------|-------------|-----------------|----------------|--------------------------|--------|
| IONOS VPS | Hosting | YES | HIGH | Single server at 74.208.202.239 | Akash Network, Fleek | Roadmap — add second VPS first |
| Vercel | Frontend CDN | YES | MEDIUM | 6 platforms deployed | IPFS + Unstoppable Domains | Ready — deploy-ipfs.sh exists |
| PostgreSQL | Database | YES | HIGH | Single instance, no replication | Ceramic Network / Tableland | Roadmap — backup system live |
| Sepolia RPC (Infura) | Blockchain | YES | MEDIUM | Single RPC endpoint | Alchemy backup + public RPC | Add fallback RPC |
| Lighthouse | IPFS pinning | Partial | LOW | SDK installed, key needed | Direct IPFS node | Acceptable |
| Doxy.me | Video | YES | LOW | Free HIPAA tier | Jitsi Meet (self-hosted) | Acceptable |
| Telegram | Notifications | YES | MEDIUM | All alerts via bot | Push Protocol / XMTP | Roadmap |
| CryptoCompare | Prices | YES | LOW | Ticker data source | Chainlink oracles | Acceptable |
| CoinGecko | Prices (backup) | YES | LOW | Fallback price source | Chainlink oracles | Acceptable |
| Fullscript | Labs + supplements | YES | LOW | Practitioner ordering | Direct lab partnerships | Acceptable |
| Calendly | Booking | YES | LOW | Session scheduling | Cal.com (self-hosted) | Roadmap |
| MetaMask | Wallet | Partial | LOW | Primary wallet provider | Multi-wallet (already supports XRPL) | Acceptable |
| GitHub | Source code | YES | MEDIUM | All repos | Radicle (decentralized git) | Roadmap |
| OpenRouter | AI | YES | MEDIUM | Agent Gateway LLM | Local Ollama / self-hosted | Roadmap |
| Blockscout | Explorer | YES | LOW | Contract verification | Self-hosted explorer | Acceptable |

## Sovereignty Score by Category

| Category | Score | Rationale |
|----------|-------|-----------|
| Identity | 8/10 | Wallet-first, no email required, XRPL support |
| Payments | 7/10 | Crypto primary, ISO 20022 coins, Stripe optional |
| Data Storage | 4/10 | Single PostgreSQL, backup now live, IPFS pending |
| Smart Contracts | 7/10 | 8 contracts on Sepolia, immutable, verifiable |
| Frontend Hosting | 3/10 | Vercel only, IPFS deploy ready but not active |
| Communication | 3/10 | Telegram centralized, no XMTP/Push |
| Infrastructure | 3/10 | Single VPS, no redundancy, no failover |
| **OVERALL** | **5.0/10** | Up from 4.8 — backup system added |

## Immediate Actions (This Sprint)
1. ✅ Daily PostgreSQL backup with cron + Telegram alerts
2. ✅ Contract registry documented and ready for IPFS anchor
3. ⏳ IPFS document upload (needs Lighthouse API key)
4. ⏳ Frontend IPFS deploy (needs Lighthouse API key)

## Roadmap to 8/10 Sovereignty
| Phase | Action | Score Impact | Effort |
|-------|--------|-------------|--------|
| Phase 1 | IPFS hosting active + Unstoppable Domains pointed | +1.5 | 2 hours (after API key) |
| Phase 2 | Second VPS with PostgreSQL replication | +1.0 | 4 hours + $10/mo |
| Phase 3 | XMTP wallet-to-wallet messaging | +0.5 | 8 hours |
| Phase 4 | Ceramic Network for participant data | +1.0 | 20 hours |
| Phase 5 | Akash Network hosting | +0.5 | 8 hours |

*Achieving 8/10 requires Phases 1-3. Phases 4-5 are aspirational.*

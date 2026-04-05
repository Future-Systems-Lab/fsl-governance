# FSL Data Sovereignty Report — Sprint 012
**Date:** April 3, 2026

## Current Sovereignty Score: 5.0/10

### What Was Decentralized This Sprint
1. ✅ Automated daily PostgreSQL backups (2am UTC, Telegram-confirmed)
2. ✅ Backup retention policy (7 days rolling)
3. ✅ Smart contract registry documented (8 contracts)
4. ✅ IPFS deploy pipeline ready (deploy-sovereign.sh)
5. ✅ Full dependency audit completed
6. ✅ Unstoppable Domains pointing instructions documented

### What Remains Centralized
| Component | Risk Level | Mitigation |
|-----------|-----------|------------|
| VPS (single server) | HIGH | Backup live, second VPS recommended |
| PostgreSQL (no replication) | HIGH | Daily backups, IPFS backup planned |
| Vercel (frontend hosting) | MEDIUM | IPFS deploy ready, needs API key |
| Telegram (notifications) | MEDIUM | Acceptable for ops, XMTP on roadmap |
| OpenRouter (AI) | MEDIUM | Agent Gateway dependent, Ollama alternative |

### Blocker: Lighthouse API Key
The following are ready to execute but blocked on API key:
- Frontend IPFS deployment (all 5 platforms)
- Document IPFS anchoring (18 documents)
- Database backup IPFS archival
- Unstoppable Domains pointing

### Roadmap to Full Decentralization

**Q2 2026 (Current)**
- [x] Daily backups automated
- [x] Contract registry complete
- [ ] IPFS hosting (blocked on API key)
- [ ] Unstoppable Domains pointed (blocked on IPFS)
- [ ] Second VPS provisioned

**Q3 2026**
- [ ] XMTP messaging integration
- [ ] Push Protocol notifications
- [ ] Ceramic Network evaluation
- [ ] PostgreSQL streaming replication

**Q4 2026**
- [ ] Akash Network hosting evaluation
- [ ] Mainnet contract migration
- [ ] Full IPFS-first hosting
- [ ] Radicle code hosting

### Cost of Full Decentralization
| Item | Monthly Cost | One-Time Cost |
|------|-------------|---------------|
| Second VPS (Hetzner) | $10 | $0 |
| Lighthouse IPFS pinning | $0 (free tier) | $0 |
| Unstoppable Domains | $0 (already owned) | $0 |
| ENS domains (5) | ~$6 | ~$75 |
| Akash Network hosting | ~$15 | $0 |
| **Total** | **~$31/month** | **~$75** |

Current infrastructure cost: ~$15/month (IONOS VPS)
Fully decentralized cost: ~$46/month
**Incremental cost of sovereignty: $31/month**

---

*This report feeds into investor materials and XRPL grant application.*
*Sprint 013 recommended focus: IPFS activation (requires Lighthouse API key from Dr. Meg)*

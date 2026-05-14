# FSL Domain & DNS Inventory

**DNS Provider:** Cloudflare (all .io domains)
**Last verified:** 2026-05-13

---

| Domain | Purpose | Registrar | DNS | Hosting | Status |
|--------|---------|-----------|-----|---------|--------|
| futuresystemslab.io | Landing page | Cloudflare | Cloudflare | Vercel | Live |
| encrypthealth.io | EncryptHealth platform | Cloudflare | Cloudflare | Vercel | Live |
| hypnoneuro.io | HypnoNeuro games | Cloudflare | Cloudflare | Vercel | Live |
| sovereignledger.io | SovereignLedger portal | Cloudflare | Cloudflare | Vercel | Live |
| alchemistforge.io | AlchemistForge interface | Cloudflare | Cloudflare | Vercel | Live |
| sovereigncoverage.io | Sovereign Navigation portal | Cloudflare | Cloudflare | Vercel | Live |
| git.futuresystemslab.io | Gitea self-hosted mirror | Cloudflare | Cloudflare Tunnel | VPS (IONOS) | Live |
| api.futuresystemslab.io | Backend API | Cloudflare | Cloudflare Tunnel | VPS (IONOS) | Live |

## Recovery Paths

- **Cloudflare account compromise:** Recover via Proton Mail (future.systems.lab@proton.me) + 2FA backup codes
- **Registrar lock:** All domains should have registrar lock enabled
- **DNS propagation:** TTL typically 300s (5 min) for A/CNAME records; up to 48h for NS changes
- **Backup DNS:** Unstoppable Domains (.crypto, .888) as decentralized fallback

## VPS Infrastructure

| Resource | Provider | IP | Purpose |
|----------|----------|----|---------|
| Primary VPS | IONOS | 74.208.202.239 | API + PM2 + PostgreSQL + Agent Gateway |

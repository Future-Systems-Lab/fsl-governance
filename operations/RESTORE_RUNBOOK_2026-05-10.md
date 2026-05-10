# FSL Disaster Recovery Runbook — 2026-05-10

## Scenario coverage
1. VPS destroyed / unrecoverable
2. GitHub account compromised or repos deleted
3. Database corruption / data loss
4. Smart contract address registry lost
5. Domain/DNS loss

## Canonical references
- **VPS**: 74.208.202.239 (Ubuntu 22.04, nginx, PM2, PostgreSQL 15)
- **Git author**: "Meg Montañez-Davenport" <future.systems.lab@proton.me>
- **Deployer wallet (EVM)**: 0xf22cbF25deEeA36FFF828BAf73CCb049345eF248
- **XRPL mainnet**: rwR3etLJVxtQXYs2d9jgBQxzHBivtCMdPd
- **Sepolia v2 contracts**:
  - HNT: 0x1ae1e10929f008d1f9883ce574a318abd86084e2
  - SovereignLedger v2: 0x4afA577fA914068451e0Aa97b61F23960f02aCc4
  - BenevolenceFund: 0x96E8006a1fBB693B55fFf6254B8BF19EC605251B
  - SovereignAchievement: 0xC3F11d2F1F12bB96b9DCF7e8f85e9704D2869B8D
  - AlchemistForge: 0xE092336F8f5082e57CcBb341A110C20ad186A324
- **Gitea mirror**: git.futuresystemslab.io (VPS port 3000, Cloudflare tunnel)
- **Pinata IPFS**: key stored in /opt/encrypthealth/backend/.env (PINATA_API_KEY, PINATA_SECRET)
- **Cloudflare tunnel**: f4c42952-1f2e-48a2-8236-86b958609953 (config at /etc/cloudflared/config.yml)
- **Vercel token**: stored in ~/.bashrc on VPS (VERCEL_TOKEN)

## Restore procedure — VPS lost

```bash
# 1. Provision new Ubuntu 22.04 box
# 2. Install dependencies
apt update && apt install -y nginx postgresql postgresql-contrib nodejs npm git
npm install -g pm2 vercel

# 3. Clone all repos from GitHub (primary source)
cd ~
git clone git@github.com:Future-Systems-Lab/HypnoNeuro.git
git clone git@github.com:Future-Systems-Lab/hypnoneuro-games.git
git clone git@github.com:Future-Systems-Lab/fsl-web.git
git clone git@github.com:Future-Systems-Lab/alchemist-forge.git
git clone git@github.com:Future-Systems-Lab/fsl-command-center.git

# 4. Restore PostgreSQL from backup
# Copy most recent /root/backups/encrypthealth_*.sql.gz from offsite backup
gunzip -c encrypthealth_LATEST.sql.gz | psql -U postgres encrypthealth

# 5. Restore .env files from secure offline backup
# Place at: /opt/encrypthealth/backend/.env

# 6. Install and start PM2 services
cd /opt/encrypthealth/backend && npm install && pm2 start index.js --name encrypthealth-api

# 7. Restore Cloudflare tunnel
# Install cloudflared, copy creds from backup to /etc/cloudflared/
cloudflared service install
systemctl start cloudflared

# 8. Point DNS to new IP (Cloudflare dashboard)
# A records: encrypthealth.io, hypnoneuro.io, sovereignledger.io, alchemistforge.io

# 9. Restore Vercel token in ~/.bashrc
echo 'export VERCEL_TOKEN=<token>' >> ~/.bashrc

# 10. Verify all services
pm2 list
curl -s http://localhost:4001/api/health
```

## Restore procedure — GitHub lost

```bash
# Push from Gitea mirror (git.futuresystemslab.io) to new GitHub org
cd /path/to/gitea/repos
for repo in HypnoNeuro hypnoneuro-games fsl-web alchemist-forge fsl-command-center fsl-governance; do
  cd $repo
  git remote add new-github git@github.com:NEW-ORG/$repo.git
  git push new-github --all
  git push new-github --tags
  cd ..
done
```

## Restore procedure — Database corruption

```bash
# Stop services
pm2 stop encrypthealth-api

# Restore from most recent pg_dump
dropdb -U postgres encrypthealth
createdb -U postgres encrypthealth
gunzip -c /root/backups/encrypthealth_LATEST.sql.gz | psql -U postgres encrypthealth

# Restart
pm2 restart encrypthealth-api

# Verify
psql -U encrypthealth_api -h 127.0.0.1 -d encrypthealth -c "SELECT count(*) FROM provider_accounts;"
```

## Restore procedure — Contract registry lost

Contracts are **immutable on Sepolia** — no redeployment needed. Re-reference addresses from this runbook:
- HNT: 0x1ae1e10929f008d1f9883ce574a318abd86084e2
- SovereignLedger v2: 0x4afA577fA914068451e0Aa97b61F23960f02aCc4
- BenevolenceFund: 0x96E8006a1fBB693B55fFf6254B8BF19EC605251B
- SovereignAchievement: 0xC3F11d2F1F12bB96b9DCF7e8f85e9704D2869B8D
- AlchemistForge: 0xE092336F8f5082e57CcBb341A110C20ad186A324

Verify with: `curl -s "https://eth-sepolia.blockscout.com/api/v2/addresses/<addr>" | jq .is_contract`

## Restore procedure — Domain/DNS lost

1. Re-acquire domains via Cloudflare Registrar
2. DNS records:
   - encrypthealth.io → Vercel (CNAME: cname.vercel-dns.com)
   - hypnoneuro.io → Vercel (CNAME: cname.vercel-dns.com)
   - sovereignledger.io → Vercel (CNAME: cname.vercel-dns.com)
   - alchemistforge.io → Vercel (CNAME: cname.vercel-dns.com)
   - api.futuresystemslab.io → Cloudflare Tunnel (proxied)
   - git.futuresystemslab.io → Cloudflare Tunnel (proxied)
   - session.futuresystemslab.io → Cloudflare Tunnel (proxied)
3. SSL auto-provisions via Vercel (platform domains) + Cloudflare (tunnel domains)

## Verification checklist (post-restore)

- [ ] 4 platform .io domains resolve and load
- [ ] api.futuresystemslab.io responds 200
- [ ] git.futuresystemslab.io (Gitea) accessible
- [ ] PM2 shows all expected processes online
- [ ] PostgreSQL accepts connections (localhost only)
- [ ] Daily pg_dump cron firing (`crontab -l | grep pg_dump`)
- [ ] 5/5 Sepolia contracts return non-empty bytecode
- [ ] Deployer wallet (0xf22c...) has Sepolia ETH for gas
- [ ] Discord/Telegram content engine posting at 8 PM EST
- [ ] Cloudflare tunnel healthy (`systemctl status cloudflared`)
- [ ] rpcbind remains disabled (`systemctl status rpcbind`)

## Last verified

2026-05-10 — session close-out. Next verification recommended: before mainnet launch.

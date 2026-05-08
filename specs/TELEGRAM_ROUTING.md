# FSL Telegram Routing Map
## Which bot sends what, and why

**Updated:** May 8, 2026

---

## Bots

| Bot | Username | Purpose | Token env var |
|-----|----------|---------|---------------|
| **FSL Agent Gateway** | `@FSL_Agent_Gateway_Bot` | All operational alerts, council outputs, sprint digests | `TELEGRAM_BOT_TOKEN` (encrypthealth .env) + `TELEGRAM_BOT_TOKEN` (clawdbot .env) |
| **MHOC Chain Bot** | `@mhoc_chain_bot` | mental-health-on-chain campaign notifications only | `MHOC_BOT_TOKEN` (encrypthealth .env) + `MENTAL_HEALTH_BOT_TOKEN` (clawdbot .env) |

## Chat

| Chat ID | Owner | Purpose |
|---------|-------|---------|
| `5996868018` | Dr. Meg | All FSL operational alerts + MHOC campaign alerts |

---

## Routing Table

### FSL Agent Gateway Bot → Chat 5996868018

| Alert Type | Source | Trigger |
|------------|--------|---------|
| Daily sprint digest | `/opt/sovereign-session/scripts/daily-digest.sh` | Cron 03:00 UTC |
| Faucet refill executed | `/opt/encrypthealth/faucet-refill.sh` | Cron 03:15 UTC, when balance < 0.2 SepETH |
| Faucet wallet low | `/opt/encrypthealth/faucet-refill.sh` | When refill wallet balance insufficient |
| Security sweep results | `/opt/encrypthealth/security_sweep.sh` | Cron 03:00 UTC |
| Reviewer faucet alerts | `/opt/encrypthealth/backend/routes/reviewer-faucet.js` | When daily funding count hits 5+ |
| Agent council decisions | ClawdBot council pipeline | On council vote completion |
| Deployment notifications | Manual / CI | After `vercel --prod --yes` |

### MHOC Chain Bot → Campaign channels

| Alert Type | Source | Trigger |
|------------|--------|---------|
| Campaign orchestration | `/opt/clawdbot/campaign/` | Scheduled campaign events |
| mental-health-on-chain updates | ClawdBot MHOC module | Campaign activity |

---

## History

- **Pre-May 8, 2026:** `TELEGRAM_BOT_TOKEN` in encrypthealth .env pointed to `@mhoc_chain_bot`. All operational alerts (faucet, security, digest) were routed through the MHOC bot by mistake.
- **May 8, 2026:** Fixed. `TELEGRAM_BOT_TOKEN` now points to `@FSL_Agent_Gateway_Bot`. `MHOC_BOT_TOKEN` preserved for campaign use.

## Rules

1. **Operational alerts** (faucet, security, digest, council, deployments) → use `TELEGRAM_BOT_TOKEN` → `@FSL_Agent_Gateway_Bot`
2. **Campaign notifications** (MHOC, social media orchestration) → use `MHOC_BOT_TOKEN` → `@mhoc_chain_bot`
3. **Never cross-contaminate.** If you add a new alert, check which bot it should use.
4. **All scripts** should use env vars (`$TELEGRAM_BOT_TOKEN`, `$TELEGRAM_CHAT_ID`), never hardcoded tokens.

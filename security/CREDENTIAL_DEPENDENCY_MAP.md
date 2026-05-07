# FSL Credential Dependency Map
## Every credential → every service that depends on it
**Last updated:** May 7, 2026

Use this map when rotating any credential. Update every dependent, restart every affected service, verify every test.

---

## Credential: TELEGRAM_BOT_TOKEN (FSL_Agent_Gateway_Bot — 8729...)
- **Type:** Telegram bot token
- **Rotation source:** @BotFather → FSL_Agent_Gateway_Bot → API Token → Revoke
- **Rotation requires human action:** Yes — BotFather via Telegram app
- **Downstream services:**
  | Service | File Path | Restart Required |
  |---------|-----------|-----------------|
  | Content engine (fsl-discord-engine) | `/opt/clawdbot/.env` → TELEGRAM_BOT_TOKEN | Yes — `pm2 restart fsl-discord-engine --update-env` |
  | Agent approval listener | `/opt/clawdbot/.env` → TELEGRAM_BOT_TOKEN | Yes — `pm2 restart FSL_Agent_Gateway_Bot --update-env` |
  | Health monitor (cron) | `/opt/clawdbot/systemd.env` → TELEGRAM_BOT_TOKEN | No restart — cron sources fresh each run |
- **Propagation steps:**
  1. Update `/opt/clawdbot/.env` line `TELEGRAM_BOT_TOKEN=<new>`
  2. Update `/opt/clawdbot/systemd.env` line `TELEGRAM_BOT_TOKEN=<new>`
  3. `pm2 restart fsl-discord-engine --update-env`
  4. `pm2 restart FSL_Agent_Gateway_Bot --update-env`
  5. `pm2 save`
- **Test:** `curl -s "https://api.telegram.org/bot<token>/getMe"` → should return `ok: true`
- **Note:** `agent_approval_listener.py` previously had a hardcoded fallback — removed May 7, 2026. Now reads from env only.

---

## Credential: TELEGRAM_BOT_TOKEN (mhoc_chain_bot — 8638...)
- **Type:** Telegram bot token
- **Rotation source:** @BotFather → mhoc_chain_bot → API Token → Revoke
- **Rotation requires human action:** Yes
- **Downstream services:**
  | Service | File Path | Restart Required |
  |---------|-----------|-----------------|
  | Monitor alerts (cron) | `/opt/encrypthealth/.env` → TELEGRAM_BOT_TOKEN | No — cron sources fresh |
  | Security sweep (cron) | `/opt/encrypthealth/.env` → TELEGRAM_BOT_TOKEN | No — cron sources fresh |
- **Propagation steps:**
  1. Update `/opt/encrypthealth/.env` line `TELEGRAM_BOT_TOKEN=<new>`
- **Test:** Send test message via `curl -s -X POST "https://api.telegram.org/bot<token>/sendMessage" -d '{"chat_id":"5996868018","text":"test"}'`

---

## Credential: TELEGRAM_CHAT_ID
- **Type:** Telegram chat/channel ID
- **Rotation source:** Telegram (new group/channel creation)
- **Rotation requires human action:** Yes — only if creating new channel
- **Downstream services:**
  | Service | File Path |
  |---------|-----------|
  | Content engine | `/opt/clawdbot/.env` → TELEGRAM_CHAT_ID (3 entries — deduplicate) |
  | Monitor alerts | `/opt/encrypthealth/.env` → TELEGRAM_CHAT_ID |
  | Health monitor | `/opt/clawdbot/systemd.env` → TELEGRAM_CHAT_ID |

---

## Credential: MENTAL_HEALTH_BOT_TOKEN (mental_healthchain_bot — 8344...)
- **Type:** Telegram bot token
- **Rotation source:** @BotFather
- **Downstream services:**
  | Service | File Path |
  |---------|-----------|
  | Stored only | `/opt/clawdbot/.env` → MENTAL_HEALTH_BOT_TOKEN |
- **Note:** Not currently used by any active service. Reserved.

---

## Credential: DB_PASSWORD (PostgreSQL encrypthealth_api)
- **Type:** Database password
- **Rotation source:** PostgreSQL `ALTER USER` (CC can rotate without human action)
- **Rotation requires human action:** No
- **Downstream services:**
  | Service | File Path | Restart Required |
  |---------|-----------|-----------------|
  | EncryptHealth API | `/opt/encrypthealth/backend/ecosystem.config.js` → DB_PASSWORD | Yes — `pm2 restart encrypthealth-api` |
  | EncryptHealth API | `/opt/encrypthealth/backend/index.js` → fallback | Yes |
  | EncryptHealth API | `/opt/encrypthealth/backend/.env` → DB_PASSWORD | Yes |
  | Monitor | `/opt/encrypthealth/.env` → DB_PASSWORD | No — cron sources fresh |
  | Monitor | `/opt/encrypthealth/monitor.js` → pool config | If hardcoded, update |
  | Backup script | `/opt/encrypthealth/backup.sh` → sources from .env | No restart — cron sources fresh |
  | Subscription middleware | `/opt/encrypthealth/backend/middleware/subscription.js` → process.env.DB_PASSWORD | Yes — `pm2 restart encrypthealth-api --update-env` |
  | Achievements service | `/opt/encrypthealth/backend/services/achievements.js` → process.env.DB_PASSWORD | Yes |
- **Propagation steps:**
  1. `sudo -u postgres psql -c "ALTER USER encrypthealth_api PASSWORD '<new>'"`
  2. Update `/opt/encrypthealth/backend/ecosystem.config.js`
  3. Update `/opt/encrypthealth/backend/index.js` (if hardcoded fallback)
  4. Update `/opt/encrypthealth/backend/.env`
  5. Update `/opt/encrypthealth/.env`
  6. `pm2 restart encrypthealth-api --update-env`
  7. `pm2 save`
  8. Save new password to `/root/.db_password_encrypthealth` (chmod 600)
- **Note:** Backup script now sources from .env (fixed May 7). No more hardcoded fallbacks in consent module (fixed May 7).
- **Test:** `curl -s http://localhost:4001/api/health` → should return `{"status":"ok"}`

---

## Credential: DISCORD_WEBHOOK_URL
- **Type:** Discord webhook URL
- **Rotation source:** Discord server settings → Integrations → Webhooks
- **Rotation requires human action:** Yes
- **Downstream services:**
  | Service | File Path |
  |---------|-----------|
  | Content engine | `/opt/clawdbot/.env` → DISCORD_WEBHOOK_URL |
- **Propagation:** Update .env, `pm2 restart fsl-discord-engine --update-env`

---

## Credential: DISCORD_BOT_TOKEN
- **Type:** Discord bot token
- **Rotation source:** Discord Developer Portal → Bot → Reset Token
- **Downstream services:**
  | Service | File Path |
  |---------|-----------|
  | Content engine | `/opt/clawdbot/.env` → DISCORD_BOT_TOKEN |
- **Propagation:** Update .env, `pm2 restart fsl-discord-engine --update-env`

---

## Credential: BLUESKY_APP_PASSWORD
- **Type:** Bluesky app password
- **Rotation source:** bsky.app → Settings → App Passwords
- **Rotation requires human action:** Yes
- **Downstream services:**
  | Service | File Path |
  |---------|-----------|
  | Content engine | `/opt/clawdbot/.env` → BLUESKY_APP_PASSWORD |
- **Propagation:** Update .env, `pm2 restart fsl-discord-engine --update-env`

---

## Credential: MASTODON_ACCESS_TOKEN
- **Type:** Mastodon access token
- **Rotation source:** Mastodon instance → Settings → Development → Applications
- **Downstream services:**
  | Service | File Path |
  |---------|-----------|
  | Content engine | `/opt/clawdbot/.env` → MASTODON_ACCESS_TOKEN |
- **Propagation:** Update .env, `pm2 restart fsl-discord-engine --update-env`

---

## Credential: DEVTO_API_KEY
- **Type:** Dev.to API key
- **Rotation source:** dev.to → Settings → Extensions → DEV API Keys
- **Downstream services:**
  | Service | File Path |
  |---------|-----------|
  | Content engine | `/opt/clawdbot/.env` → DEVTO_API_KEY |
- **Propagation:** Update .env, `pm2 restart fsl-discord-engine --update-env`

---

## Credential: TWITTER_API_KEY + TWITTER_API_SECRET + TWITTER_ACCESS_TOKEN + TWITTER_ACCESS_SECRET
- **Type:** Twitter/X OAuth credentials (4 values)
- **Rotation source:** developer.twitter.com → Project → Keys and Tokens
- **Rotation requires human action:** Yes
- **Downstream services:**
  | Service | File Path |
  |---------|-----------|
  | Content engine | `/opt/clawdbot/.env` → 4 TWITTER_* keys |
- **Note:** Twitter posting may be disabled/suspended. Verify before rotating.

---

## Credential: GITHUB_PAT
- **Type:** GitHub Personal Access Token (classic, `ghp_` prefix)
- **Rotation source:** github.com/settings/tokens
- **Rotation requires human action:** Yes
- **Current scopes:** `read:org, repo` — OVERLY BROAD (see PAT scope analysis)
- **Downstream services:**
  | Service | File Path |
  |---------|-----------|
  | Autonomous build scripts | `/opt/clawdbot/.env` → GITHUB_PAT |
  | Task scripts | `/opt/clawdbot/add_tasks_t07_t08.sh` |
- **Recommended:** Replace with fine-grained PAT scoped to 3 repos only

---

## Credential: PINATA_JWT
- **Type:** Pinata IPFS API JWT
- **Rotation source:** app.pinata.cloud → API Keys
- **Downstream services:**
  | Service | File Path |
  |---------|-----------|
  | IPFS operations | `/opt/clawdbot/.env` → PINATA_JWT (3 entries — deduplicate) |
  | Backend IPFS | `/opt/encrypthealth/backend/.env` → PINATA_API_KEY + PINATA_API_SECRET |

---

## Credential: ETHERSCAN_API_KEY
- **Type:** Etherscan API key (read-only)
- **Rotation source:** etherscan.io → My Account → API Keys
- **Downstream services:**
  | Service | File Path |
  |---------|-----------|
  | Clawdbot | `/opt/clawdbot/.env` → ETHERSCAN_API_KEY |
  | Backend | `/opt/encrypthealth/backend/.env` → ETHERSCAN_API_KEY (if present) |

---

## Credential: ANTHROPIC_API_KEY
- **Type:** Anthropic Claude API key
- **Rotation source:** console.anthropic.com → API Keys
- **Downstream services:**
  | Service | File Path |
  |---------|-----------|
  | Agent council | `/opt/clawdbot/.env` → ANTHROPIC_API_KEY |
  | Backend | `/opt/encrypthealth/backend/.env` → ANTHROPIC_API_KEY |

---

## Credential: OPENROUTER_KEY
- **Type:** OpenRouter LLM API key
- **Rotation source:** openrouter.ai → Keys
- **Downstream services:**
  | Service | File Path |
  |---------|-----------|
  | Agent approval listener | `/opt/clawdbot/systemd.env` → OPENROUTER_KEY |

---

## Credential: DEPLOY_PRIVATE_KEY
- **Type:** Ethereum deployer wallet private key
- **Rotation source:** Generate new wallet (ethers.js or hardware wallet)
- **Rotation requires human action:** Yes — fund new wallet, redeploy contracts
- **Downstream services:**
  | Service | File Path |
  |---------|-----------|
  | Clawdbot | `/opt/clawdbot/.env` → DEPLOY_PRIVATE_KEY |
  | Backend | `/opt/encrypthealth/backend/.env` → DEPLOYER_PRIVATE_KEY |
  | Backup archive | `/opt/clawdbot/handlers/backup-archive/.env.local` → DEPLOY_PRIVATE_KEY |
- **Note:** Testnet only ($0 at risk). Rotate before mainnet deployment.

---

## Credential: XRPL_WALLET_SECRET / XRPL_SEED
- **Type:** XRPL wallet secret key
- **Rotation source:** Generate new XRPL wallet
- **Downstream services:**
  | Service | File Path |
  |---------|-----------|
  | Clawdbot | `/opt/clawdbot/.env` → XRPL_WALLET_SECRET |
  | Backend | `/opt/encrypthealth/backend/.env` → XRPL_SEED |
- **Note:** ~$7.50 XRP at risk (15 XRP, mostly reserve). LOW priority.

---

## Credential: GITEA_TOKEN
- **Type:** Gitea personal access token
- **Rotation source:** git.futuresystemslab.io → Settings → Applications
- **Downstream services:**
  | Service | File Path |
  |---------|-----------|
  | Clawdbot | `/opt/clawdbot/.env` → GITEA_TOKEN |
  | Git remotes | Embedded in remote URLs for Gitea mirrors |

---

## Credential: LIGHTHOUSE_API_KEY
- **Type:** Lighthouse.storage API key (IPFS/Filecoin)
- **Rotation source:** lighthouse.storage dashboard
- **Downstream services:**
  | Service | File Path |
  |---------|-----------|
  | Clawdbot | `/opt/clawdbot/.env` → LIGHTHOUSE_API_KEY |
  | Systemd env | `/opt/clawdbot/systemd.env` → LIGHTHOUSE_API_KEY |
  | Backend | `/opt/encrypthealth/backend/.env` → LIGHTHOUSE_API_KEY + NEXT_PUBLIC_LIGHTHOUSE_API_KEY |
- **Note:** May be deprecated in favor of Pinata. Verify usage.

---

## Credential: STRIPE_SECRET_KEY + STRIPE_WEBHOOK_SECRET
- **Type:** Stripe payment API keys
- **Status:** STALE — Stripe/fiat was removed from FSL. These keys should be deleted.
- **Location:** `/opt/encrypthealth/backend/.env`
- **Action:** Remove from .env (FSL is crypto-only, no fiat)

---

## Credential: GOOGLE_HEALTH_CLIENT_ID + GOOGLE_HEALTH_CLIENT_SECRET
- **Type:** Google Health API OAuth credentials
- **Status:** Unknown usage — may be stale
- **Location:** `/opt/clawdbot/.env`, `/opt/encrypthealth/backend/.env`
- **Action:** Verify if in use; remove if stale

---

## Credential: DAILY_API_KEY + DAILY_WEBHOOK_ID
- **Type:** Daily.co WebRTC API credentials
- **Rotation source:** daily.co dashboard
- **Downstream services:**
  | Service | File Path |
  |---------|-----------|
  | Clawdbot | `/opt/clawdbot/.env` → DAILY_API_KEY, DAILY_WEBHOOK_ID |
  | Backend | `/opt/encrypthealth/backend/.env` → DAILY_API_KEY |

---

## Credential: VERIFIABLE_API_KEY
- **Type:** Verifiable.com credential verification API
- **Downstream services:**
  | Service | File Path |
  |---------|-----------|
  | Clawdbot | `/opt/clawdbot/.env` → VERIFIABLE_API_KEY |
  | Backend | `/opt/encrypthealth/backend/.env` → VERIFIABLE_API_KEY |

---

## Summary: .env File Map

| File | Credentials Count | Used By |
|------|------------------|---------|
| `/opt/clawdbot/.env` | 31 keys | Content engine, agent council, build scripts |
| `/opt/encrypthealth/.env` | 3 keys | Monitor, security sweep (cron) |
| `/opt/encrypthealth/backend/.env` | 26 keys | EncryptHealth API (PM2) |
| `/opt/clawdbot/systemd.env` | 4 keys | Health monitor, agent listener |
| `/opt/clawdbot/handlers/backup-archive/.env.local` | 6 keys | Backup archive scripts |

---

## Issues Found During Mapping

1. **TELEGRAM_CHAT_ID duplicated 3 times** in `/opt/clawdbot/.env` — should be 1 entry
2. **PINATA_JWT duplicated 3 times** in `/opt/clawdbot/.env` — should be 1 entry
3. **Stripe keys still present** in backend .env — should be removed (FSL is crypto-only)
4. **Google Health keys** — verify if in use or stale
5. **systemd.env** had stale token — fixed May 7, 2026
6. **agent_approval_listener.py** had hardcoded old token as fallback — removed May 7, 2026

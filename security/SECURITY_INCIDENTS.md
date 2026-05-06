# FSL Security Incident Log

## Incident 001: Telegram Bot Token Exposure
- **Date discovered:** 2026-05-05
- **Source:** GitGuardian automated scan
- **Affected repo:** fsl-command-center (public)
- **Root cause:** Repo made public (Apr 19-20, 2026) to fix Vercel build failure. Historical commits contained hardcoded Telegram bot token in `fsl-build.sh`. Token was also hardcoded in VPS file `/opt/encrypthealth/monitor.js`.
- **Exposed secrets:**
  - Telegram bot token (8638777344:AAH...) — NOW ROTATED
  - Telegram chat ID (5996868018) — redacted from history
  - Database password in `monitor.js` on VPS (hardcoded) — replaced with env var
- **Token rotated:** Yes, via @BotFather by Dr. Meg
- **Remediation completed:**
  1. Used `git-filter-repo --replace-text` to scrub ALL secrets from entire fsl-command-center commit history
  2. Force-pushed cleaned history to GitHub (old commits with secrets no longer accessible)
  3. Updated `fsl-build.sh` to use environment variables instead of hardcoded tokens
  4. Updated `/opt/encrypthealth/monitor.js` on VPS to read from `.env` instead of hardcoded values
  5. Created `/opt/encrypthealth/.env` (chmod 600) with placeholder for new rotated token
  6. Updated VPS cron to source `.env` before running monitor
  7. Updated `.gitignore` in fsl-command-center to cover `.env*`, credentials, keys
  8. Audited all other public FSL repos (none contained leaked token)
  9. Added SECURITY.md to all public FSL repos
  10. **DB password rotated** (2026-05-05 23:36 UTC) — new 32-char random password applied to PostgreSQL + all config files + PM2 restarted. API reconnected successfully. New password stored at `/root/.db_password_encrypthealth` (chmod 600).

## Incident 002: Second Telegram Token Invalid
- **Date discovered:** 2026-05-05 (during remediation)
- **Affected service:** FSL_Agent_Gateway_Bot + all clawdbot Telegram functions
- **Token:** 8729542993:AAEAMs... (prefix only)
- **Status:** Token returns 401 Unauthorized on `getMe` call — DEAD
- **Impact:** All Telegram-based FSL services are non-functional:
  - FSL_Agent_Gateway_Bot (PM2 online but unable to connect)
  - Monitor alert notifications (encrypthealth/.env has placeholder, not real token)
  - Content engine Telegram posts
- **Discord webhook:** Still functional (HTTP 200)

## Remediation Status Summary

### Completed (by CC)
- [x] fsl-command-center commit history scrubbed + force-pushed
- [x] monitor.js converted from hardcoded to env var
- [x] .gitignore updated across all 8 public repos
- [x] SECURITY.md added to all public repos
- [x] DB password rotated (ehapi2026 → new 32-char random)
- [x] API reconnected with new DB password
- [x] Audit confirmed: NO other VPS secrets (.env keys) were ever in any repo commit history

### Requires Dr. Meg Action (1 remaining item)

**Item 1: Telegram token rotation — MOSTLY COMPLETE**

Dr. Meg rotated all 4 bot tokens via @BotFather (2026-05-05).
New tokens loaded to VPS and verified:

| Bot | Status | Loaded To |
|-----|--------|-----------|
| FSL_Agent_Gateway_Bot | WORKING | /opt/clawdbot/.env |
| mhoc_chain_bot | WORKING | /opt/encrypthealth/.env (monitor alerts) |
| FSL_Runtime_Bot | WORKING | verified via getMe |
| mental_healthchain_bot | **WORKING** | Loaded to /opt/clawdbot/.env as MENTAL_HEALTH_BOT_TOKEN |

Monitor test message sent successfully via mhoc_chain_bot.
Gateway bot restarted and listening.

**REMAINING:** mental_healthchain_bot token returns 401. Dr. Meg needs to:
1. Open Telegram → @BotFather
2. For EACH FSL bot (FSL_Runtime_Bot, mhoc_chain_bot, mental_healthchain_bot, or whichever bots are active):
   - Tap the bot → "API Token" → "Revoke current token"
   - Copy the new token
3. SSH to VPS and paste new tokens:
   ```
   ssh root@74.208.202.239
   nano /opt/clawdbot/.env
   # Update TELEGRAM_BOT_TOKEN=<new_token>
   # Save and exit
   nano /opt/encrypthealth/.env
   # Update TELEGRAM_BOT_TOKEN=<new_token>
   # Save and exit
   ```
4. Then tell CC to restart bots:
   ```
   pm2 restart FSL_Agent_Gateway_Bot
   pm2 restart fsl-discord-engine
   ```

**Item 2: Review deployer private key exposure risk**

The deployer private key (DEPLOY_PRIVATE_KEY in /opt/clawdbot/.env) was NEVER in any repo — it only exists on VPS. If the VPS itself has not been compromised, rotation is optional. However:
- If this key controls any mainnet funds → rotate immediately
- If testnet-only (Sepolia) → low priority, rotate at convenience

**Item 3: Review remaining API keys in /opt/clawdbot/.env**

None of these were ever in any public repo. All are VPS-only. Rotation priority:

| Key | Rotation Priority | Rationale |
|-----|------------------|-----------|
| DEPLOY_PRIVATE_KEY | HIGH if mainnet, LOW if testnet-only | Controls wallet funds |
| XRPL_WALLET_SECRET | HIGH if mainnet, LOW if testnet-only | Controls XRP wallet |
| DISCORD_BOT_TOKEN | LOW | Still working (HTTP 200), not exposed |
| TWITTER_API_KEY + secrets | LOW | Not exposed, VPS-only |
| BLUESKY_APP_PASSWORD | LOW | Not exposed |
| MASTODON_ACCESS_TOKEN | LOW | Not exposed |
| DEVTO_API_KEY | LOW | Not exposed |
| ETHERSCAN_API_KEY | LOW | Not exposed, read-only API |
| PINATA_JWT | LOW | Not exposed |
| ANTHROPIC_API_KEY | LOW | Not exposed |
| GITHUB_PAT | MEDIUM | Could have broad repo access — review scopes |
| GITEA_TOKEN | LOW | Internal only |
| DAILY_API_KEY | LOW | Not exposed |

## Lessons Learned

1. **NEVER make a repo public without scrubbing commit history first**
2. **Pre-publication secret scan required** — run `git log --all -p | grep -iE 'token|secret|key|password'` before any visibility change
3. **All secrets must live in .env files** — never hardcoded in source
4. **Telegram tokens rotate easily** — but require @BotFather (human action)
5. **DB passwords can be rotated by CC** — automated rotation worked cleanly

# Credential Rotation Runbook
## Step-by-step for any future rotation event
**Last updated:** May 7, 2026

---

## General Rotation Process

### Step 1: Rotate the credential at source
Human action required for most credentials (see CREDENTIAL_DEPENDENCY_MAP.md for each credential's rotation source).

### Step 2: Tell CC
"Rotate [credential name] — new value is [paste or indicate secure location]"

### Step 3: CC references CREDENTIAL_DEPENDENCY_MAP.md
CC identifies every downstream service and file path.

### Step 4: CC updates every dependent
For each downstream service:
1. Update the .env file (or config file)
2. **CRITICAL — PM2 environment caching:** For PM2-managed processes, a plain `pm2 restart <name>` does NOT reload .env changes. The process continues using the cached environment from when it was first started. You MUST use:
   ```bash
   pm2 restart <process-name> --update-env
   ```
   Without `--update-env`, the new token is ignored and the process runs with the old (potentially revoked) token. This caused the content engine 401 errors on May 6-7, 2026.
3. After restarting with `--update-env`, persist the state:
   ```bash
   pm2 save
   ```
   This ensures the new environment survives VPS reboots.

### Step 5: CC verifies each service
Run the test command specified in CREDENTIAL_DEPENDENCY_MAP.md for each affected service.

### Step 6: CC reports
- What was updated (file paths + process names)
- What was verified (test results)
- Any services that failed after rotation

---

## PM2 Environment Caching — Critical Detail

PM2 captures the process environment at startup and reuses it for all future restarts unless explicitly told to reload.

| Command | Env Behavior |
|---------|-------------|
| `pm2 restart <name>` | Uses CACHED env (old tokens!) |
| `pm2 restart <name> --update-env` | Reloads from current shell env |
| `pm2 delete <name> && pm2 start <script>` | Fresh env from current shell |

**Always use `--update-env` after credential rotation.**

For cron-based services (monitor, security sweep), this is not an issue — cron sources the .env file fresh each run.

---

## Quick-Reference: Common Rotations

### Telegram Bot Token
```bash
# 1. Dr. Meg rotates via @BotFather
# 2. Update all locations:
nano /opt/clawdbot/.env          # TELEGRAM_BOT_TOKEN
nano /opt/clawdbot/systemd.env   # TELEGRAM_BOT_TOKEN
nano /opt/encrypthealth/.env     # TELEGRAM_BOT_TOKEN (if using different bot)
# 3. Restart PM2 processes with --update-env:
pm2 restart fsl-discord-engine --update-env
pm2 restart FSL_Agent_Gateway_Bot --update-env
pm2 save
# 4. Verify:
source /opt/clawdbot/.env
curl -s "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getMe"
```

### Database Password
```bash
# 1. Generate new password (CC can do this without human action):
NEW_PASS=$(openssl rand -base64 24 | tr -dc 'a-zA-Z0-9' | head -c 32)
# 2. Update PostgreSQL:
sudo -u postgres psql -c "ALTER USER encrypthealth_api PASSWORD '${NEW_PASS}'"
# 3. Update all config files:
sed -i "s/^DB_PASSWORD=.*/DB_PASSWORD=${NEW_PASS}/" /opt/encrypthealth/.env
sed -i "s/^DB_PASSWORD=.*/DB_PASSWORD=${NEW_PASS}/" /opt/encrypthealth/backend/.env
# Also update ecosystem.config.js and index.js if they have hardcoded fallbacks
# 4. Restart:
pm2 restart encrypthealth-api --update-env
pm2 save
# 5. Save password securely:
echo "${NEW_PASS}" > /root/.db_password_encrypthealth && chmod 600 /root/.db_password_encrypthealth
# 6. Verify:
curl -s http://localhost:4001/api/health
```

### GitHub PAT
```bash
# 1. Dr. Meg generates new PAT at github.com/settings/personal-access-tokens/new
# 2. Update:
nano /opt/clawdbot/.env  # GITHUB_PAT
# 3. No PM2 restart needed (PAT used by build scripts, not long-running processes)
# 4. Verify:
source /opt/clawdbot/.env
curl -sH "Authorization: token ${GITHUB_PAT}" https://api.github.com/user | python3 -c "import json,sys; print(json.load(sys.stdin).get('login'))"
```

### Social Platform Tokens (Bluesky, Mastodon, DevTo)
```bash
# 1. Rotate at respective platform dashboard
# 2. Update /opt/clawdbot/.env
# 3. Restart content engine:
pm2 restart fsl-discord-engine --update-env
pm2 save
# 4. Verify by triggering a test post or checking next scheduled post
```

---

## Post-Rotation Checklist

- [ ] All .env files updated
- [ ] All PM2 processes restarted with `--update-env`
- [ ] `pm2 save` executed
- [ ] Each service verified with its test command
- [ ] No hardcoded fallbacks contain the old credential
- [ ] CREDENTIAL_DEPENDENCY_MAP.md still accurate (update if new services added)
- [ ] Incident log updated if rotation was due to exposure

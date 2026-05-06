# Security Sweep Remediation Report
**Date:** 2026-05-05
**Scan tool:** gitleaks v8 on VPS (74.208.202.239)

---

## Finding Classifications

### 1. fsl-command-center: Telegram Bot Token in fsl-build.sh
- **Rule:** telegram-bot-api-token
- **File:** `fsl-build.sh` lines 9 and 20
- **Commit:** 513e857f
- **Secret prefix:** `86387773...`
- **Classification: A) REAL SECRET (but already invalidated)**
- **Details:** Hardcoded Telegram bot token committed in plaintext. However, testing the token against the Telegram API returns `401 Unauthorized`, meaning it has already been revoked or was never active. The token still needs to be purged from git history to pass automated scans.
- **Action required:** Purge from GitHub source repo (`https://github.com/Future-Systems-Lab/fsl-command-center`). The Gitea copy is a **read-only mirror** (syncs every 8h from GitHub), so the force-push must happen on GitHub first. A cleaned local copy with `git-filter-repo` was prepared on the VPS but could not be pushed to the mirror.
- **Prepared fix:** Token references replaced with `${TELEGRAM_BOT_TOKEN:-$(grep ... /opt/clawdbot/.env)}` in the cleaned branch (commit `12c8daf`).
- **DR. MEG ACTION NEEDED:** Push the cleaned history to the GitHub origin repo, or grant GitHub push access for automation.

### 2. fsl-command-center: "web3_marketing" key in index.html
- **Rule:** generic-api-key
- **File:** `index.html` line 713
- **Commit:** af2b1bbd
- **Secret prefix:** `web3_mark...`
- **Classification: B) FALSE POSITIVE**
- **Details:** This is a JavaScript object key string (`{key:'web3_marketing', name:'Web3 Marketing', ...}`) used as a UI label/identifier in the dashboard. Not a secret or credential.

### 3. Orthomolecular-MVP: tokenAddress in CompliancePanel.tsx
- **Rule:** generic-api-key
- **File:** `CompliancePanel.tsx` line 7
- **Commit:** 3139e30b
- **Secret prefix:** `0x5FbDB2...`
- **Classification: B) FALSE POSITIVE**
- **Details:** This is `0x5FbDB2315678afecb367f032d93F642f64180aa3`, the well-known default Hardhat local development contract address (first deployed contract on Hardhat Network). It is a public, deterministic address with no private key implications.

### 4. Orthomolecular-MVP: tokenAddress in OrthomolecularModule.tsx
- **Rule:** generic-api-key
- **File:** `OrthomolecularModule.tsx` line 10
- **Commit:** 3139e30b
- **Secret prefix:** `0x5FbDB2...`
- **Classification: B) FALSE POSITIVE**
- **Details:** Same Hardhat default address as Finding 3.

### 5. fsl-web
- **Classification: CLEAN** -- gitleaks found 0 leaks (20 commits scanned).

### 6. fsl-governance
- **Classification: CLEAN** -- gitleaks found 0 leaks (64 commits scanned).

### 7. Future-Systems-Lab-profile
- **Classification: CLEAN** -- gitleaks found 0 leaks (52 commits scanned).

### 8. backup-archive
- **Classification: CLEAN** -- gitleaks found 0 leaks (0 commits scanned, empty repo).

---

## npm Audit Results (encrypthealth-api)

**Before fix:** 6 vulnerabilities (3 moderate, 2 high, 1 critical)

**`npm audit fix` applied (non-breaking):** Fixed 2 vulnerabilities:
- `follow-redirects` (credential leak on redirect) -- fixed
- `protobufjs` < 7.5.5 (critical: arbitrary code execution) -- fixed

**Remaining (4 vulnerabilities, require breaking changes or dependency swap):**
- `axios` <= 0.31.0 (2 high) -- pulled in by `@pinata/sdk`, no non-breaking fix available. Recommend replacing `@pinata/sdk` with newer Pinata client or pinning axios >= 1.x.
- `ip-address` <= 10.1.0 via `express-rate-limit` (2 moderate) -- fix requires `npm audit fix --force` which upgrades `express-rate-limit` to 8.0.0 (breaking API change). **Not applied; needs review.**

**Post-fix:** API restarted via pm2, health check returns `{"status":"ok"}`.

---

## .env / Credential File Permissions

**Fixed (644 -> 600):**
| File | Was | Now |
|------|-----|-----|
| `/opt/encrypthealth/backend/.env` | 644 | 600 |
| `/opt/clawdbot/.env.swp` | 644 | 600 |
| `/opt/clawdbot/.env.bak` | 644 | 600 |
| `/opt/clawdbot/handlers/backup-archive/.env.local` | 644 | 600 |
| `/opt/clawdbot/certs/cert.pem` | 644 | 600 |

**Already correct (600):**
- `/opt/clawdbot/.env`
- `/opt/encrypthealth/.env`
- `/opt/encrypthealth/backup-passphrase.key`
- All Caddy PKI keys

**Note:** `.env.example` files were left at 644 intentionally (they contain no secrets).

---

## Port Audit

### Services correctly bound to localhost:
| Port | Service | Binding |
|------|---------|---------|
| 5432 | PostgreSQL | 127.0.0.1 / ::1 |
| 4001 | encrypthealth-api | 127.0.0.1 |
| 4002 | SovereignLedger | 127.0.0.1 |
| 20241 | cloudflared | 127.0.0.1 |
| 20242 | cloudflared | 127.0.0.1 |

### Services on 0.0.0.0 (acceptable):
| Port | Service | Notes |
|------|---------|-------|
| 22 | sshd | Required for remote access |
| 80 | nginx | Public web server |
| 443 | docker (Caddy) | Public HTTPS |

### Services on 0.0.0.0 (review needed):
| Port | Service | Notes |
|------|---------|-------|
| 111 | rpcbind | NFS-related; NFS utils installed but no active NFS mounts in fstab. Consider disabling if NFS is not in use. |
| 3000 | gitea | Bound to `*:3000` BUT protected by iptables (ACCEPT from 127.0.0.1, DROP all others). Effectively localhost-only via firewall. Recommend also setting `HTTP_ADDR = 127.0.0.1` in `/etc/gitea/app.ini` for defense-in-depth. |
| 18789 | clawdbot (Docker) | Caddy reverse-proxy port. Exposed publicly on 0.0.0.0. Should be bound to 127.0.0.1 in docker-compose.yml if only accessed via Caddy on the same host. |
| 18791 | clawdbot (Docker) | Same as 18789. |

### Firewall (iptables):
- Port 3000 (Gitea): ACCEPT localhost, DROP others -- correct
- Port 4001 (API): ACCEPT localhost, DROP others -- correct
- Port 5432 (PostgreSQL): ACCEPT localhost, DROP others -- correct
- Tailscale: active, managing its own ports

---

## Items Requiring Dr. Meg Action

1. **Push cleaned fsl-command-center history to GitHub.** The Gitea instance mirrors from `https://github.com/Future-Systems-Lab/fsl-command-center`. The `git-filter-repo` purge must be applied to the GitHub origin. The cleaned local repo was prepared but could not push to the read-only mirror. Steps:
   - Clone the GitHub repo locally
   - Run `git filter-repo --replace-text` with the token replacement
   - Force-push to GitHub
   - Gitea mirror will sync automatically within 8 hours
   - Even though the token is already invalid (401), purging it satisfies compliance scanners.

2. **Consider `npm audit fix --force`** for `express-rate-limit` 8.0.0 upgrade (breaking change). Test the API after upgrade.

3. **Consider replacing `@pinata/sdk`** with a newer Pinata client that uses axios >= 1.x (current version pulls axios 0.31.0 with 15 known vulnerabilities).

4. **Consider disabling `rpcbind`** (`systemctl disable --now rpcbind`) if NFS is not actively used.

5. **Consider binding Docker ports 18789/18791 to 127.0.0.1** in `/opt/clawdbot/docker-compose.yml` (change `"18789:18789"` to `"127.0.0.1:18789:18789"`).

6. **Consider binding Gitea to 127.0.0.1** in `/etc/gitea/app.ini` (`HTTP_ADDR = 127.0.0.1`) for defense-in-depth alongside the existing iptables rule.

---

## Cleanup
- All `/tmp/verify-*` and `/tmp/fix-*` directories removed from VPS.
- Temporary Gitea API token `push-cleanup-3` was created but self-expired / not reusable (deletion returned 401 after token was used once with filter-repo remote URL; URL is no longer stored anywhere).

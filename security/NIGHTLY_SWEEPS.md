# FSL Nightly Security Sweeps

## Overview

Automated nightly security sweep running on VPS (74.208.202.239) at 03:00 UTC daily.
Script location: `/opt/encrypthealth/security_sweep.sh`
Log file: `/var/log/fsl-security-sweep.log`

## What Runs Nightly

### 1. Gitleaks Secret Scanning
- Clones every repo from `git.futuresystemslab.io/dr-meg/` as a bare mirror
- Scans full git history (all commits, all branches) using `gitleaks detect`
- Detects: API keys, tokens, passwords, private keys, cloud credentials
- Repos are auto-discovered via Gitea API; falls back to hardcoded list if API is down

### 2. npm Dependency Audit
- Runs `npm audit` on Node.js projects at:
  - `/opt/encrypthealth/backend`
  - `/opt/clawdbot/discord`
  - `/opt/clawdbot`
- Reports high and critical vulnerability counts

### 3. Environment File Permissions
- Checks that `.env` files at `/opt/clawdbot/.env` and `/opt/encrypthealth/.env` have `600` permissions
- Flags any file readable by group or world

### 4. Exposed Port Detection
- Checks for services on ports 3000, 5432, 27017, 6379 bound to non-localhost addresses
- These should only be accessible via localhost or behind a reverse proxy

## Alert Thresholds

| Severity | Action |
|----------|--------|
| Critical (leaked secrets, critical npm vuln) | Immediate Telegram alert to chat 5996868018 |
| Non-critical | Logged to `/var/log/fsl-security-sweep.log`, no alert |

## Adding New Repos to the Scan

New repos are automatically picked up if they are created under the `dr-meg` user on Gitea (`git.futuresystemslab.io`). No configuration change needed.

To add repos from a different Gitea user or external source, edit the fallback list in `/opt/encrypthealth/security_sweep.sh`:
```bash
GITEA_REPOS="fsl-governance HypnoNeuro fsl-command-center ..."
```

## Whitelist Management

### Allowlist Configuration
File: `/opt/encrypthealth/gitleaks-allowlist.toml`

Central allowlist for suppressing known false positives and revoked secrets. Used by the sweep script's `--config` flag.

### Known Findings File
File: `/opt/encrypthealth/known-findings.txt`

Tracks findings that have been reviewed and classified as non-actionable. The sweep script distinguishes NEW findings (alert) from KNOWN findings (suppress, log only).

### Current Whitelisted Items

| Item | Repo | Reason | Date | Verified By |
|------|------|--------|------|-------------|
| Hardhat default address 0x5FbDB231... | Orthomolecular-MVP | False positive — Hardhat dev default | 2026-05-05 | CC audit |
| web3_marketing UI label | fsl-command-center | False positive — UI config key, not secret | 2026-05-05 | CC audit |
| Revoked Telegram token in history | fsl-command-center | Token revoked 2026-05-05 via @BotFather | 2026-05-05 | Dr. Meg |

### Adding New Whitelist Entries

1. Verify the finding is genuinely a false positive or revoked secret
2. Add entry to `/opt/encrypthealth/gitleaks-allowlist.toml` with comment:
   ```toml
   # Whitelisted [date] — [reason] — verified by [who] — ref: [audit doc]
   ```
3. Add repo key to `/opt/encrypthealth/known-findings.txt`
4. Update this table
5. Approval: Dr. Meg or CC security audit

### Excluding Per-Repo False Positives

Create a `.gitleaksignore` file in the repo root listing fingerprints to ignore:

```
# Hardhat default contract address (not a real secret)
af2b1bbdef23d1925e4b066caf669cd2707ab323:index.html:generic-api-key:713
```

The fingerprint is printed in gitleaks JSON output for each finding.

Alternatively, add inline comments: `// gitleaks:allow` on the line containing the false positive.

## Alert Logic (v2)

| Finding Type | Action |
|-------------|--------|
| NEW finding (not in known-findings.txt) | Immediate Telegram alert |
| KNOWN finding (in known-findings.txt) | Suppressed, logged only |
| Critical npm vuln (new) | Immediate Telegram alert |
| .env permissions wrong | Immediate Telegram alert |
| Unexpected public port (not whitelisted) | Immediate Telegram alert |

## Pre-Publication Policy

Before making ANY private repo public, you MUST run a full history scan first:

```bash
gitleaks detect --source /path/to/repo --verbose
```

See `PRE_PUBLICATION_CHECKLIST.md` for the complete checklist.

## Cron Entry

```
0 3 * * * /opt/encrypthealth/security_sweep.sh >> /var/log/fsl-security-sweep.log 2>&1
```

## Tools Installed on VPS

- `gitleaks` v8.18.2 at `/usr/local/bin/gitleaks`
- `git-secrets` at `/usr/local/bin/git-secrets` (available for pre-commit hooks)

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

## Excluding False Positives

Create a `.gitleaksignore` file in the repo root listing fingerprints to ignore:

```
# Hardhat default contract address (not a real secret)
af2b1bbdef23d1925e4b066caf669cd2707ab323:index.html:generic-api-key:713
```

The fingerprint is printed in gitleaks JSON output for each finding.

Alternatively, add inline comments: `// gitleaks:allow` on the line containing the false positive.

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

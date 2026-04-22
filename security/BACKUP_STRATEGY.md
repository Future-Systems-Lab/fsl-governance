# FSL Backup Strategy

## Daily On-Site Backup

- **Script:** `/opt/encrypthealth/daily-backup.sh`
- **Schedule:** 02:00 UTC daily (cron)
- **Output:** `/opt/backups/fsl_daily_YYYY-MM-DD.sql`
- **Retention:** 7 days (older files auto-deleted)
- **Database:** PostgreSQL `encrypthealth` (64 tables, ~12MB)

## Off-Site Encrypted Backup

- **Script:** `/opt/encrypthealth/offsite-backup.sh`
- **Schedule:** 02:15 UTC daily (15 min after on-site dump)
- **Process:**
  1. Encrypts daily dump with AES-256 symmetric GPG
  2. Passphrase stored at `/opt/encrypthealth/backup-passphrase.key` (chmod 600)
  3. Pins encrypted file to IPFS via Pinata (if PINATA_JWT configured)
  4. Logs result to `/opt/backups/backup.log`
  5. Cleans up encrypted file after upload

## Recovery Procedure

```bash
# 1. Download encrypted backup from IPFS
curl -o backup.sql.gpg "https://gateway.pinata.cloud/ipfs/{CID}"

# 2. Decrypt
gpg --decrypt --passphrase-file /opt/encrypthealth/backup-passphrase.key backup.sql.gpg > backup.sql

# 3. Restore
sudo -u postgres psql encrypthealth < backup.sql
```

## Passphrase Management

- Passphrase file: `/opt/encrypthealth/backup-passphrase.key`
- 256-bit random hex generated via `openssl rand -hex 32`
- Permissions: `600` (root only)
- **CRITICAL:** Back up this passphrase separately — without it, encrypted backups are irrecoverable. Store a copy in a password manager or secure offline location.

## What's Backed Up

| Data | On-Site | Off-Site (IPFS) |
|------|---------|-----------------|
| PostgreSQL dump | Daily, 7-day retention | Daily, encrypted, permanent on IPFS |
| Smart contracts | N/A | Immutable on Sepolia blockchain |
| Governance docs | GitHub (fsl-governance) | IPFS pinned (17 CIDs) |
| Source code | GitHub (11 repos) | Gitea mirror (5 repos) |
| .env files | VPS only | NOT backed up externally (sensitive) |

## Gaps

- `.env` files are not backed up off-site — passphrase and API keys exist only on VPS
- Gitea mirror is incomplete (5 of 10 repos)
- IPFS backup requires Pinata JWT — if not configured, only on-site encryption runs

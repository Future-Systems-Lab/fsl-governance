# Fail2ban Configuration — VPS 74.208.202.239

## Status

- **Service:** Active (running since March 22, 2026)
- **Enabled:** Yes (auto-starts on boot)
- **Active Jails:** 1 (sshd)

## SSH Jail Configuration

```ini
[sshd]
enabled = true
port = ssh
logpath = /var/log/secure
maxretry = 3
bantime = 86400    # 24 hours
findtime = 600     # 10 minutes
```

## Current Statistics (as of April 21, 2026)

| Metric | Value |
|--------|-------|
| Currently banned IPs | 77 |
| Total banned (lifetime) | 2,070 |
| Total failed attempts caught | 235,845 |
| Currently failing | 3 |

## Defaults

```ini
[DEFAULT]
bantime = 3600     # 1 hour default
findtime = 600     # 10 minute window
maxretry = 5       # 5 attempts default
```

## Verification Command

```bash
ssh root@74.208.202.239
fail2ban-client status
fail2ban-client status sshd
```

## Pre-Mainnet Gate Status

Gate 10 (Fail2ban): **COMPLETE** — Active and protecting SSH since March 22, 2026.

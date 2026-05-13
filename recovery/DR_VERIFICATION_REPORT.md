# Disaster Recovery Verification Report

**Date:** 2026-05-12
**Verified by:** Claude Code (automated verification)
**Status:** PASS — system is rebuildable

---

## Recovery Artifacts

| # | Artifact | Status | Detail |
|---|----------|--------|--------|
| 1 | Recovery bundle | ✅ | 267MB, SHA256 `32283912a962...`, 87 entries, 6 git bundles |
| 2 | Pinata CID | ✅ | `QmQUoao9qYg46oqcqxAkJHf6T1xpFs3c1au7Sb3zW5ohVd` — HTTP 200 |
| 3 | Lighthouse pin | ⚠️ | HTTP 402 (payment/quota issue) — Pinata is primary, Lighthouse is secondary |
| 4 | Restore guide | ✅ | 285 lines, 9 phases documented |
| 5 | encrypt_bundle.sh | ✅ | Executable, 1183 bytes |
| 6 | decrypt_bundle.sh | ✅ | Executable, 1183 bytes |
| 7 | weekly_recovery_pin.sh | ✅ | Executable, 5443 bytes, tested successfully |
| 8 | Weekly cron | ✅ | `0 3 * * 0` — Sunday 3 AM |
| 9 | Monthly IPFS health cron | ✅ | `0 4 1 * *` — 1st of month 4 AM |
| 10 | ~/.fsl_recovery_env | ✅ | chmod 600, 893 bytes, PINATA_JWT + TELEGRAM creds |
| 11 | IPFS_PINNING_POLICY.md | ✅ | 52 lines |
| 12 | FSL_PERSONAL_CUSTODY_CHECKLIST.md | ✅ | Created 2026-05-12 |
| 13 | DR_INVENTORY.md | ✅ | 181 lines |
| 14 | RESTORE_RUNBOOK_2026-05-10.md | ✅ | 140 lines |
| 15 | check_ipfs_pins.sh | ✅ | Executable, monthly cron registered |

## Bundle Contents Verification

| Component | Present | Count |
|-----------|---------|-------|
| Git bundles | ✅ | 6 (fsl-governance, HypnoNeuro, hypnoneuro-games, fsl-command-center, fsl-web, alchemist-forge) |
| Contracts directory | ✅ | 34 entries (v2 source, ABIs, recovered, sovereign-session) |
| Academic outputs | ✅ | 4 entries (BHTY paper, CV, IPFS anchors) |
| Legal / patent | ✅ | 26 entries (receipt, assignment, claims, figures, specification) |
| Config templates | ✅ | 5 entries (cloudflared, PM2, PostgreSQL schema, Vercel) |
| Secrets templates | ✅ | 2 entries (env.template with redacted secrets) |
| DNS records | ✅ | 2 entries (Cloudflare DNS export) |
| Operational docs | ✅ | 6 entries (DR inventory, pinning policy, practitioner acks) |

## Key File Verification

| File | In Bundle |
|------|-----------|
| fsl-governance.bundle | ✅ |
| HypnoNeuro.bundle | ✅ |
| fsl-command-center.bundle | ✅ |
| alchemist-forge.bundle | ✅ |
| postgresql-schema.sql | ✅ |
| BHTY_PAPER_v2.md | ✅ |
| CV_MegMontanezDavenport.html | ✅ |
| RECEIPT_64-063037.pdf | ✅ |
| env.template | ✅ |

## IPFS Gateway Resolution

| Gateway | HTTP | Status |
|---------|------|--------|
| Pinata (gateway.pinata.cloud) | 200 | ✅ Primary — resolves |
| Lighthouse (gateway.lighthouse.storage) | 402 | ⚠️ Payment/quota — secondary |

## 48-Hour Rebuild Assessment

**Can FSL be rebuilt in 48 hours from these artifacts alone?**

**YES** — with the following conditions:

1. **Dr. Meg provides:** Recovery bundle decryption passphrase, wallet seed phrases, account credentials (per Personal Custody Checklist)
2. **Under 3 hours (normal):** If VPS is accessible, git bundles restore all repos, PM2 resurrects services, Vercel auto-deploys frontends from GitHub push
3. **Under 48 hours (worst case):** New VPS provisioned, DNS propagation (up to 48h for TTL expiry), fresh PM2 setup, Vercel reconnected, smart contracts already on-chain (immutable)

**What cannot be rebuilt:**
- Wallet private keys (must be from personal custody)
- Account passwords/2FA (must be from personal custody)
- On-chain state is immutable — contracts survive any infrastructure failure

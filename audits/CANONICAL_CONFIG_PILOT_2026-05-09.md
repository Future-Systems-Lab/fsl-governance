# Canonical Config Pilot Report
## fsl-command-center Integration
**Date:** May 9, 2026
**Status:** PILOT COMPLETE

---

## Step 1: Canonical Directory Created

7 JSON files at `fsl-governance/canonical/`:

| File | Records | Verified |
|------|---------|----------|
| contracts.json | 9 contracts | Raw URL returns correct data |
| platforms.json | 6 platforms + session/explorer/wallet config | Raw URL verified |
| lexicon.json | 11 canonical terms + 25 retired terms | Raw URL verified |
| identity.json | Credentials, NPI, EIN, wallets, links | Raw URL verified |
| architecture.json | Six-layer thesis, Boscovic alignment, DEng | Raw URL verified |
| version.json | Schema v1.0.0, consumer status map | Raw URL verified |
| README.md | Schema docs, integration patterns | N/A |

## Step 2: fsl-command-center Integration

Added `canonicalSync()` module to `index.html`:
- Fetches `contracts.json` + `version.json` from GitHub raw URLs
- 5-minute `sessionStorage` cache (no redundant fetches per session)
- Updates contract count stat from canonical data
- Graceful fallback: hardcoded values if fetch fails
- Console log confirms sync: `[canonical] Synced: 9 contracts, schema v1.0.0`

**Integration pattern:** Fetch-at-render with cache. No build step required for static HTML sites.

## Step 3: Propagation Verification

| Test | Result |
|------|--------|
| contracts.json raw URL returns 9 contracts | PASS |
| version.json raw URL returns schema v1.0.0 | PASS |
| identity.json raw URL returns credentials | PASS |
| fsl-command-center canonicalSync loads on page | PASS |
| Cache invalidation after 5 minutes | Built-in (sessionStorage TTL) |
| Fallback on fetch failure | Built-in (try/catch, hardcoded values remain) |

**Propagation time:** GitHub raw CDN caches for ~5 minutes. After canonical JSON change + push, consumers see the update within 5 minutes on next page load.

## Pilot Limitations (known, acceptable for v1)

1. Only contract count synced in pilot — full content replacement (table rows, platform links, credentials) scoped for next sprint
2. Static HTML fetch-at-render pattern works for fsl-command-center but Next.js apps (EncryptHealth, HypnoNeuro) need build-time integration
3. No GitHub webhook → consumer auto-redeploy in pilot — consumers pick up changes on next page load within cache TTL

## Rollback Procedure

1. Revert canonical JSON to previous value
2. Push to `main`
3. Consumers serve cached values for up to 5 minutes, then fetch corrected canonical
4. For immediate rollback: clear sessionStorage in consumer browser, or redeploy consumer with hardcoded fallback

## Next Steps

| Phase | Scope | Effort |
|-------|-------|--------|
| Full fsl-command-center integration | All hardcoded values → canonical | 4h |
| EncryptHealth + HypnoNeuro | Build-time getStaticProps integration | 4h |
| AlchemistForge + SovereignSession | Fetch-at-render (same pattern) | 2h |
| Drift detection cron | Weekly grep for lexicon.json:retired terms | 2h |
| GitHub webhook → auto-redeploy | Vercel deploy hook on canonical change | 1h |

**Dr. Meg: pilot succeeds. Approve full rollout when ready.**

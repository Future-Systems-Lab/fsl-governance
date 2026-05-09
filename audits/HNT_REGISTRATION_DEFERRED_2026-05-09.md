# HNT Token Registration Prompt — Deferred
**Date:** May 9, 2026
**Status:** Queued for next sprint

---

## Concept
One-time `wallet_watchAsset` (EIP-747) prompt after first wallet connect to add HNT token to participant's wallet display.

## Why Defer
1. Working baseline must be confirmed first — CSP fix just deployed, mood pills + consent grants need Dr. Meg verification
2. This is a new feature on top of unverified infrastructure
3. Requires new DB table (`fsl_token_registrations`)
4. Should be built AFTER HNT minting is wired (otherwise participant adds a token that never receives balance)

## When to Build
After Dr. Meg confirms:
- Mood pills work post-CSP fix
- Consent grants work post-public endpoint migration
- HNT minting approved (PROTECTED MODE)

Then build registration prompt as part of the HNT rewards sprint.

## Effort
~1 hour (simple `wallet_watchAsset` call + first-time check)

# XRPL Health Check Timeout Fix — 2026-04-29

## Alert

```
FSL Monitor Alert
XRPL check timed out (15s)
Timestamp: 2026-04-29T19:00:17.178Z
```

## Root Cause

The `checkXRPL()` function used `xrplcluster.com` as its sole endpoint with `ledger_index: 'current'`. Two compounding issues:

1. **Slow endpoint:** `xrplcluster.com` responded in ~8 seconds on the test run (vs 0.3s for Ripple's own endpoints). This is close to the 15s timeout and frequently exceeds it under load.

2. **`ledger_index: 'current'` forces rippled path:** This parameter bypasses the fast clio cache layer and forces a query to the live rippled node. Ripple's `s1`/`s2` endpoints use clio servers (confirmed by their response warning: "This is a clio server"). Dropping `ledger_index: 'current'` uses validated data from clio — sufficient for balance monitoring and 25x faster.

## Endpoint Benchmark (from VPS)

| Endpoint | Response Time | Notes |
|----------|-------------|-------|
| xrplcluster.com | 8.05s | Slow, no clio, single point of failure |
| s1.ripple.com:51234 | 0.32s | Clio server, fast, validated data |
| s2.ripple.com:51234 | 0.29s | Clio server, fastest, validated data |

## Fix Applied

1. **Primary endpoint switched** from `xrplcluster.com` to `s2.ripple.com:51234` (fastest)
2. **Fallback chain added:** `s2.ripple.com` → `s1.ripple.com` → `xrplcluster.com` (last resort)
3. **Removed `ledger_index: 'current'`** — uses validated data from clio cache (sufficient for balance checks)
4. **Each endpoint gets its own 15s timeout** — if primary fails, next endpoint is tried immediately
5. **Error logging:** Failed endpoints log to stderr before trying next

## Verification

```
Run 1: OK 2026-04-30T01:44:05.686Z
Run 2: OK 2026-04-30T01:44:16.162Z
Run 3: OK 2026-04-30T01:44:26.599Z
```

3/3 consecutive passes. Total run time ~10s per check (previously timing out at 15s).

## Files Changed

- `/opt/encrypthealth/monitor.js` — `checkXRPL()` function rewritten with 3-endpoint fallback chain

## Relationship to Previous Fix

This is a follow-up to the April 27 fix (documented in `XRPL_PARSE_ERROR_2026-04-27.md`). That fix added the 15s timeout, null checks, and error forwarding. The timeout was correct — it surfaced the underlying endpoint reliability issue that was previously masked by the bare catch block. This fix addresses the root cause: the slow endpoint itself.

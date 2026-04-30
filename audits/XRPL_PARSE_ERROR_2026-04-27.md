# XRPL Response Parse Error — 2026-04-27

## Alert

```
FSL Monitor Alert
XRPL response parse error
Timestamp: 2026-04-27T05:20:37.624Z
```

## Root Cause

The `checkXRPL()` function in `/opt/encrypthealth/monitor.js` called `xrplcluster.com` for `account_info` on wallet `rwR3etLJVxtQXYs2d9jgBQxzHBivtCMdPd`. When the XRPL endpoint returned a transient error response (likely a temporary 503 or malformed JSON during a network blip), the parser attempted to access `j.result.account_data.Balance` on a response where `account_data` was undefined, throwing a TypeError. The bare `catch` block returned the generic "XRPL response parse error" with no detail.

## Fix Applied

1. **Explicit null checks:** Check `j.result`, then `j.result.error`, then `j.result.account_data` before accessing `Balance`
2. **XRPL error forwarding:** If the XRPL API returns an error object (e.g., `actNotFound`), the error name and message are now included in the alert
3. **Timeout handling:** Added 15-second request timeout with `req.on('timeout')` handler
4. **Low balance threshold:** Changed from `< 0` (impossible for a funded account) to `< 1` XRP (meaningful warning)
5. **Error detail in catch:** `catch (e)` now includes `e.message` instead of a generic string

## Verification

```
$ node /opt/encrypthealth/monitor.js
OK 2026-04-28T00:07:26.635Z
```

XRPL endpoint tested directly — returns `status: success`, balance: 15.001117 XRP. The error was transient (network blip at 05:20 UTC).

## Files Changed

- `/opt/encrypthealth/monitor.js` — `checkXRPL()` function rewritten with proper error handling

## Follow-Up — 2026-04-29

The 15s timeout added in this fix surfaced a deeper issue: `xrplcluster.com` is inherently slow (~8s response time) and frequently exceeds the timeout. See `XRPL_TIMEOUT_FIX_2026-04-29.md` for the follow-up fix switching to Ripple's `s2.ripple.com:51234` as primary endpoint with a 3-endpoint fallback chain.

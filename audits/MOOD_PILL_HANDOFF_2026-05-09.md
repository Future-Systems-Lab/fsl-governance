# Mood Pill Interaction — Engineering Handoff
## For Human Engineer Takeover
**Date:** May 9, 2026
**Status:** BROKEN — multiple CC fix attempts failed

---

## 1. File Paths and Line Numbers

### Mood Pill Component (JSX with onClick)
**File:** `HypnoNeuro/encrypthealth/frontend/app/participant/dashboard/page.tsx`
**Line 309:**
```jsx
<button key={m} onClick={() => postMood(m.split(" ")[1])} className={`rounded-full border px-3 py-1.5 text-xs text-white transition ${activeMood === m.split(" ")[1] ? "border-[#00FF88] bg-[#00FF88]/20 scale-105" : "border-[#00D9FF]/20 bg-[#00D9FF]/5 hover:bg-[#00D9FF]/15"}`}>{activeMood === m.split(" ")[1] ? `${m} ✓` : m}</button>
```

### postMood Function
**File:** Same file, **lines 121-136:**
```typescript
const postMood = async (mood: string) => {
  setActiveMood(mood);                              // line 122 — visual highlight
  const w = (address || "").toLowerCase();           // line 123 — get wallet
  if (!w) { setTimeout(() => setActiveMood(null), 1500); return; }  // line 124 — GUARD
  try {
    const res = await fetch("https://api.futuresystemslab.io/api/mood-logs-public", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ walletAddress: w, mood }),
    });
    if (!res.ok) console.error("[mood] POST failed:", res.status);
  } catch (e) { console.error("[mood] fetch error:", e); }
  fetch(`https://api.futuresystemslab.io/api/mood-logs-public?wallet=${w}&days=14`)
    .then(r => r.json()).then(d => { if (Array.isArray(d)) setMoodHistory(d); }).catch(() => {});
  setTimeout(() => setActiveMood(null), 1500);
};
```

### Address Resolution (CRITICAL)
**File:** Same file, **lines 46-51:**
```typescript
const { address: ethAddress, isConnected: ethConnected } = useAccount();  // wagmi
const hasJWTCookie = typeof window !== "undefined" && document.cookie.includes("fsl_jwt=");
const xrplAddress = (typeof window !== "undefined" && hasJWTCookie) ? localStorage.getItem("xrpl_address") : null;
const address = ethAddress || xrplAddress;  // wagmi address OR XRPL localStorage
```

### VPS API Endpoint
**File:** `/opt/encrypthealth/backend/index.js` (on VPS 74.208.202.239)
**Position:** Before auth middleware (public, no JWT needed)
```javascript
app.post("/api/mood-logs-public", async (req, res) => {
  const { walletAddress, mood } = req.body;
  if (!walletAddress || !mood) return res.status(400).json({ error: "walletAddress and mood required" });
  try {
    const { rows } = await pool.query(
      'INSERT INTO mood_logs (wallet_address, mood, logged_at) VALUES ($1, $2, NOW()) RETURNING id, mood, logged_at',
      [walletAddress.toLowerCase(), mood]
    );
    res.json({ success: true, record: rows[0] });
  } catch(e) { res.status(500).json({ error: e.message }); }
});
```

### Next.js API Route (EXISTS BUT DOES NOT WORK)
**File:** `HypnoNeuro/encrypthealth/frontend/app/api/mood-logs/route.ts`
**Note:** This route exists but CANNOT connect to PostgreSQL because Vercel serverless functions have no network path to the VPS database. `DATABASE_URL` is not set in Vercel env. This route always returns 500.

### JWT Auth Flow (Cookie Setting)
**File:** `HypnoNeuro/encrypthealth/frontend/app/page.tsx`
**Lines 179, 244, 272:** Cookie set as:
```javascript
document.cookie = `fsl_jwt=${verifyData.token}; path=/; max-age=900; SameSite=Lax`;
```
JWT is created by the VPS backend at `/api/auth/verify` using `JWT_SECRET` from VPS env.

### mood_logs Table Schema
```sql
CREATE TABLE mood_logs (
  id SERIAL PRIMARY KEY,
  wallet_address VARCHAR(100) NOT NULL,
  mood VARCHAR(50) NOT NULL,
  logged_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_mood_wallet ON mood_logs(wallet_address);
```

---

## 2. Every Fix Attempted and Why Each Failed

### Attempt 1: Call VPS API directly via `apiFetch()`
**What:** Dashboard called `apiFetch('/api/mood-logs', ...)` which prepends `API_BASE` = `https://api.futuresystemslab.io`
**Why failed:** VPS `/api/mood-logs` is behind auth middleware. Cross-origin request from `encrypthealth.io` to `api.futuresystemslab.io` doesn't include the `fsl_jwt` cookie (different origin, `credentials: 'include'` not set, and even if set, CORS `Access-Control-Allow-Credentials` may not be configured).

### Attempt 2: Guard `if (!address) return` removed
**What:** `postMood` had `if (!address) return` which silently blocked the function when wagmi `address` was null.
**Why this was a real issue:** Dr. Meg authenticates via custom EIP-191 flow on landing page, not via wagmi. Wagmi's `useAccount()` returns null address. But...
**Why removing it didn't fully fix:** Even without the guard, the address is still needed for the API body (`walletAddress: w`). If `w` is empty string, the VPS returns 400.

### Attempt 3: Create Next.js API route `/api/mood-logs` (same-origin)
**What:** Created `app/api/mood-logs/route.ts` that reads JWT from cookie, connects to PostgreSQL via `pg.Pool`.
**Why failed:** Vercel serverless functions run in Vercel's cloud infrastructure. They have NO network path to the VPS PostgreSQL at `74.208.202.239:5432`. The `DATABASE_URL` env var was never set in Vercel because there's no way for Vercel to reach the VPS DB. `pg.Pool` with `connectionString: undefined` silently fails.

### Attempt 4: Create `/api/mood-logs-public` on VPS (before auth middleware)
**What:** Added a public endpoint on the VPS that accepts `walletAddress` in the request body, no JWT needed.
**API confirmed working:** `curl -X POST https://api.futuresystemslab.io/api/mood-logs-public -H "Content-Type: application/json" -d '{"walletAddress":"0x739414BC...","mood":"Calm"}'` → returns 200 + record.
**Dashboard updated:** `postMood` now calls `https://api.futuresystemslab.io/api/mood-logs-public` directly.
**Why it may still fail:** Line 124 still has `if (!w) return`. If `address` is null/empty (wagmi not connected + no XRPL address in localStorage), `w` is empty string, guard triggers, API never called. **The visual highlight fires (line 122 runs before the guard) but no API call follows.**

---

## 3. Current State

### Does the VPS endpoint respond?
**YES.** Verified via curl:
```
POST https://api.futuresystemslab.io/api/mood-logs-public
Body: {"walletAddress":"0x739414BC271521Bea000A9aB2FbF79182124BCC3","mood":"Grounded"}
Response: 200 {"success":true,"record":{"id":27,"mood":"Grounded","logged_at":"2026-05-09T12:31:47.011Z"}}
```

### Is the JWT cookie set correctly?
**LIKELY YES** — set at `path=/; max-age=900; SameSite=Lax` on `encrypthealth.io`. But the current code doesn't use the JWT for mood logging — it uses wallet address in the body. The JWT cookie IS needed for the address resolution (line 48: `hasJWTCookie` gates the XRPL address fallback).

### What does the network tab show when a pill is clicked?
**UNKNOWN.** CC cannot run an authenticated browser session. Playwright can't inject a real wallet connection that populates wagmi state. This is the critical gap — only a human with a connected wallet can observe the network tab.

### What does the browser console show?
**UNKNOWN.** Same limitation. The debug `console.log` statements were added but CC cannot observe them.

---

## 4. Hypothesized Root Causes (ranked by likelihood)

### #1 — MOST LIKELY: `address` is null
**Why:** Dr. Meg authenticates via the custom landing page flow (EIP-191 → JWT cookie), NOT via wagmi's `connectAsync()`. Wagmi's `useAccount()` returns `{ address: undefined }`. The XRPL fallback (`localStorage.getItem("xrpl_address")`) is also null because Dr. Meg uses Brave Wallet (EVM), not XRPL.

**Result:** `address` = `undefined || null` = `null`. `w` = `"".toLowerCase()` = `""`. Guard on line 124 (`if (!w)`) triggers. Function returns. API never called. Pill highlights briefly then resets.

**Fix:** Read the wallet address from the JWT cookie payload instead of wagmi state. The JWT contains `{ address: "0x739414BC..." }`. Decode it client-side: `JSON.parse(atob(cookie.split('.')[1])).address`.

### #2 — CORS blocks the fetch
**Why:** `encrypthealth.io` → `api.futuresystemslab.io` is cross-origin. If the VPS doesn't send `Access-Control-Allow-Origin: *` or `Access-Control-Allow-Origin: https://encrypthealth.io`, the browser blocks the request silently.

**Fix:** Check VPS CORS config. Add `encrypthealth.io` to allowed origins.

### #3 — Address is present but empty string
**Why:** wagmi returns empty string instead of undefined in some states.

**Fix:** Change guard to `if (!w || w.length < 10) return` with console.log to trace.

---

## 5. Other Broken Interactions Dr. Meg Has Flagged

### Provider Card Toggles
**Status:** Toggle UI exists on Dr. Meg's card, missing on Christina/Henry.
**Root cause:** Christina and Henry don't have `wallet` property set in the hardcoded PROVIDERS array. Toggle renders conditionally on `p.wallet`.
**Fix needed:** Either assign wallet addresses to all guides or show disabled toggles (already partially implemented).

### Press Start Circles (State 2)
**Status:** Bottom sheet may not show circles for returning participants.
**Root cause:** Same `address` resolution issue — if `address` is null, the circles fetch works (public endpoint) but the state detection (`stats?.sessionCount || upcoming.length`) may evaluate incorrectly.
**Fix needed:** Verify with connected wallet.

### Celebration Rewards
**Status:** Not built yet. Queued in deferred backlog.

---

## 6. Recommended Fix for Human Engineer

1. Open `encrypthealth.io/participant/dashboard` in Brave with wallet connected
2. Open DevTools Console + Network tab
3. Click any mood pill
4. Report: (a) does `postMood` log to console? (b) does a network request fire? (c) what's the `address` variable value?
5. If `address` is null: decode wallet from JWT cookie instead of wagmi:
```typescript
function getWalletFromJWT(): string | null {
  const match = document.cookie.match(/fsl_jwt=([^;]+)/);
  if (!match) return null;
  try {
    const payload = JSON.parse(atob(match[1].split('.')[1]));
    return payload.address || null;
  } catch { return null; }
}
// Then in component: const address = ethAddress || xrplAddress || getWalletFromJWT();
```
6. If CORS blocks: add `res.setHeader('Access-Control-Allow-Origin', 'https://encrypthealth.io')` to VPS mood-logs-public endpoint.

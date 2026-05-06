# FSL Command Center — Metric Auto-Update Audit

**Audit date:** 2026-04-29
**Source repo:** `Future-Systems-Lab/fsl-command-center` (commit on main)
**Dashboard file:** `index.html` (single-file SPA, 1109 lines)
**Live API:** `https://api.futuresystemslab.io/api/fsl-status` (polled every 60 s)

---

## How the Dashboard Works

The dashboard defines 7 stat cards at **lines 296–304** of `index.html`. Five of them have DOM `id` attributes and are overwritten by the `fetchLiveStatus()` function (lines 110–164), which calls the VPS API at `https://api.futuresystemslab.io/api/fsl-status`. Two cards have **no id** and are never updated — their values are baked into the HTML.

Initial (fallback) values in the HTML are displayed until the API responds. If the API is unreachable, the fallback values persist.

---

## Metric-by-Metric Audit

| # | Metric | HTML Fallback | DOM id | Live-Updated? | Source | File / Line |
|---|--------|--------------|--------|---------------|--------|-------------|
| 1 | **Tasks Done** | 40 | `stat-completed` | YES | `d.tasks.completed` from VPS API | `index.html:297` (fallback), `:131` (update) |
| 2 | **PM2 Processes** | 4 | `stat-pm2` | YES | `d.pm2.length` from VPS API | `index.html:298` (fallback), `:116` (update) |
| 3 | **Wellness Games** | 31 | `stat-games` | YES | `d.games` from VPS API | `index.html:299` (fallback), `:118` (update) |
| 4 | **AI Agents** | 17 | `stat-agents` | YES | `d.agents` from VPS API | `index.html:300` (fallback), `:117` (update) |
| 5 | **Smart Contracts** | 8 | `stat-contracts` | YES | `d.contracts` from VPS API | `index.html:301` (fallback), `:119` (update) |
| 6 | **IPFS CIDs** | 20 | **(none)** | **NO — HARDCODED** | — | `index.html:302` |
| 7 | **GitHub Repos** | 50 | **(none)** | **NO — HARDCODED** | — | `index.html:303` |

---

## Detail on the Two Hardcoded Metrics

### IPFS CIDs (line 302)

```html
<div class="stat"><div class="stat-val">20</div><div class="stat-label">IPFS CIDs</div></div>
```

- No `id` attribute, no JavaScript touches this element.
- The number `20` is static HTML — it will stay `20` forever unless someone edits the file.

### GitHub Repos (line 303)

```html
<div class="stat"><div class="stat-val">50</div><div class="stat-label">GitHub Repos</div></div>
```

- No `id` attribute, no JavaScript touches this element.
- The number `50` is static HTML.

---

## Recommendations

| Metric | Should Auto-Update? | Proposed Source | Complexity | Notes |
|--------|---------------------|-----------------|------------|-------|
| **IPFS CIDs** | YES | Pinata API (`https://api.pinata.cloud/data/pinList`) or add `ipfs_cids` field to the existing `/api/fsl-status` endpoint on the VPS | **LOW** | Add an `id="stat-ipfs"` to the HTML element. Either (a) have the VPS API count Pinata pins and return `d.ipfs_cids`, or (b) call Pinata directly from the browser (requires a read-only API key or proxy). Option (a) is simpler and keeps the pattern consistent with the other 5 metrics. |
| **GitHub Repos** | YES | GitHub REST API (`https://api.github.com/orgs/Future-Systems-Lab`) returns `public_repos` count, or add `github_repos` field to `/api/fsl-status` | **LOW** | Add `id="stat-repos"` to the HTML element. The GitHub org endpoint is unauthenticated and returns `public_repos`. A single `fetch()` in the existing `fetchLiveStatus()` or a new lightweight call would work. Alternatively, the VPS API can cache the count to avoid GitHub rate limits. |

### Suggested Implementation Plan

**Step 1 — HTML (2 minutes):**
Add `id` attributes to lines 302–303:
```html
<div class="stat"><div class="stat-val" id="stat-ipfs">20</div><div class="stat-label">IPFS CIDs</div></div>
<div class="stat"><div class="stat-val" id="stat-repos">50</div><div class="stat-label">GitHub Repos</div></div>
```

**Step 2 — Option A: Extend VPS API (recommended, ~30 min):**
In the `/api/fsl-status` endpoint on the VPS, add two fields:
- `ipfs_cids`: call Pinata `pinList` API and return the count.
- `github_repos`: call `https://api.github.com/orgs/Future-Systems-Lab` and return `public_repos`. Cache for 5 minutes to avoid rate limits.

Then in `fetchLiveStatus()` add:
```js
var si = document.getElementById('stat-ipfs');
if (si && d.ipfs_cids) si.textContent = d.ipfs_cids;
var sr = document.getElementById('stat-repos');
if (sr && d.github_repos) sr.textContent = d.github_repos;
```

**Step 2 — Option B: Browser-side fetch (no VPS change, ~15 min):**
Add a separate function that calls GitHub directly:
```js
fetch('https://api.github.com/orgs/Future-Systems-Lab')
  .then(r => r.json())
  .then(d => {
    var el = document.getElementById('stat-repos');
    if (el && d.public_repos) el.textContent = d.public_repos;
  });
```
For IPFS, Pinata requires auth, so browser-side is not ideal — VPS proxy is better.

---

## Additional Observations

1. **Fallback values are stale.** The HTML fallbacks (40 tasks, 4 PM2 processes, 31 games) no longer match reality. These should be updated periodically so the dashboard looks correct even when the API is down.

2. **The API also drives:**
   - Critical systems bar dot colors (PM2 process status)
   - PM2 restart count display
   - Domain status table rows
   - Live VPS Infrastructure table (separate endpoint: `https://encrypthealth.io/api/infra`, polled every 30 s)

3. **The AGENTS array (lines 1015–1033) is fully hardcoded** in JavaScript — 17 agent definitions. If new agents are added, someone must edit the HTML. This could be moved to a JSON file or API endpoint for maintainability.

4. **The crypto ticker** (lines 992–1012) is live, fetching from CryptoCompare API every 60 seconds.

---

## Summary

- **5 of 7 metrics** are already live-updating from the VPS API — well done.
- **2 of 7 metrics** (IPFS CIDs, GitHub Repos) are hardcoded and will drift.
- Both fixes are **LOW complexity** — estimated 30–45 minutes total to wire both to live sources.
- No code changes made in this audit.

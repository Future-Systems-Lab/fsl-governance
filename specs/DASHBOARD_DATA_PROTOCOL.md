# Dashboard Data Protocol
## Single Source of Truth for Command Center
**Status:** Active
**Last updated:** April 29, 2026

---

## Architecture

Dashboard content is driven by JSON data files in `fsl-governance/dashboard-data/`. The Command Center's `/api/dashboard-content` serverless function fetches these JSONs at request time, renders HTML, and returns to the authenticated client.

### Data Files

| File | Content | Update Frequency |
|------|---------|-----------------|
| `outreach-revenue.json` | Outreach targets, trademark filings, revenue status | When facts change |
| `external-blockers.json` | External dependencies and their resolution status | When resolved/updated |
| `completed-milestones.json` | Shipped work (append-only) | On each milestone completion |
| `funding-strategy.json` | Funding sources, cost breakdown, grant status | When strategy changes |
| `grant-tracker.json` | Grant applications: status, amounts, deadlines | When grant status changes |
| `agent-roster.json` | 17-agent council composition and roles | When agents are added/modified |
| `reviewer-data.json` | Academic reviewer portfolio: contracts, OSS PRs, credentials, faculty, platforms | When evidence changes |
| `infrastructure-status.json` | (Future) Static infra config | Rarely |

### Live Data (fetched at request time, not from JSON)

| Data | Source | Endpoint |
|------|--------|----------|
| PM2 process status | VPS API | `/api/infra` |
| On-chain metrics | Sepolia RPC / Blockscout | `/api/fsl-status` engagement |
| Game count, contract count | VPS API | `/api/fsl-status` |
| Domain health | VPS API | `/api/fsl-status` domains |

---

## Update Protocol

### Rule: When ANY agent completes a tracked milestone, update the relevant JSON as part of the same task.

Examples:
- Contract deployed → append to `completed-milestones.json`
- NPI status changes → update `outreach-revenue.json` + `external-blockers.json`
- New agent onboarded → append to `agent-roster.json`
- Trademark filed → update `outreach-revenue.json`
- Grant submitted → update `funding-strategy.json`

### Update Steps

1. Read the current JSON file
2. Modify the relevant entry (or append for milestones)
3. Update `lastUpdated` to today's date
4. Commit with message: `"Update dashboard data: [what changed]"`
5. Push to fsl-governance

### Rendering (IMPLEMENTED)

The `/api/dashboard-content` serverless function (Vercel):
1. Fetches each JSON from `https://raw.githubusercontent.com/Future-Systems-Lab/fsl-governance/main/dashboard-data/[file].json`
2. Caches responses in memory with a **5-minute TTL** (per-file, per serverless instance)
3. Renders JSON data into HTML table rows using render helper functions (`renderOutreachRows`, `renderBlockerRows`, `renderMilestoneText`, `renderFundingCostRows`, `renderGrantRows`)
4. Concatenates rendered sections with static HTML segments (`STATIC_BEFORE_BLOCKERS`, `STATIC_OUTREACH_TAIL`, `STATIC_TAIL`)
5. Returns the complete HTML to the authenticated client

**Latency note:** First request after cold start or cache expiry fetches 5 JSONs in parallel from GitHub. Subsequent requests within the 5-minute window serve from cache with zero fetch overhead.

### Status Badge Mapping

| JSON status | Badge | Color |
|-------------|-------|-------|
| `active` / `resolved` | ● Active / ✓ Resolved | Green |
| `in-progress` / `scheduled` | ⚠️ In progress / Scheduled | Amber |
| `pending` / `pre-revenue` | ✗ Pending / Pre-revenue | Red |
| `active-todo` | ⚠️ Active TODO | Amber |

---

## Schema Rules

### All JSON files must have:
- `lastUpdated` field (ISO date string)
- Consistent item structure within each file

### Adding new items:
- Append to the `items` or `milestones` array
- Do not change existing item structure
- New fields can be added but existing fields must not be removed

### Removing items:
- Set `status` to `"removed"` rather than deleting (preserves history)
- Or move to a `"retired"` array within the same file

---

## PROTECTED MODE

The rendering logic in `/api/dashboard-content` is frozen after implementation. Changes to how data is rendered require council approval. Changes to the data itself (JSON updates) are routine and auto-approved when they reflect verified facts.

---

## Migration from Hardcoded Content (COMPLETE)

Completed April 29, 2026. The `/api/dashboard-content.js` was refactored from a monolithic hardcoded HTML template to a data-driven architecture.

### Migrated sections (JSON-driven):
- [x] Outreach & Revenue table → `outreach-revenue.json`
- [x] External Blockers table → `external-blockers.json`
- [x] Completed milestones line → `completed-milestones.json`
- [x] Funding strategy (Phase 3 cost rows, sources, totals, note) → `funding-strategy.json`
- [x] Grant Tracker table → `grant-tracker.json`

### Remaining static (intentional):
- Agent roster → rendered client-side from JS array in `dashboard.html` (not server-rendered)
- Infrastructure status → live API polling (`/api/infra`, `/api/fsl-status`)
- Architecture, runbooks, academic timeline → structural content that rarely changes
- Phase 4 cost rows → hardcoded (not in `funding-strategy.json` yet; add if needed)

### How to update dashboard data without a code commit:
1. Edit the relevant JSON file in `fsl-governance/dashboard-data/`
2. Commit and push to `main`
3. Wait up to 5 minutes for cache expiry
4. Dashboard automatically reflects the new data

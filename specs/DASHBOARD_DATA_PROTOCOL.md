# Dashboard Data Protocol
## Single Source of Truth for Command Center
**Status:** Active
**Last updated:** May 7, 2026

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

### Rendering

The `/api/dashboard-content` serverless function:
1. Fetches each JSON from GitHub raw content API (or bundled at build time)
2. Renders the data into HTML table rows using consistent status badge patterns
3. Returns the complete HTML to the authenticated client

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

## Migration from Hardcoded Content

The `/api/dashboard-content.js` currently has all content hardcoded as HTML strings. Migration path:

1. JSON files created with current accurate state (DONE)
2. Refactor `/api/dashboard-content.js` to read JSONs and render (next step)
3. Remove hardcoded HTML for sections backed by JSON data
4. Keep hardcoded HTML for structural sections (nav, CSS, layout) that don't change with data

Sections to migrate:
- [x] Outreach & Revenue table → `outreach-revenue.json`
- [x] External Blockers table → `external-blockers.json`
- [x] Completed milestones line → `completed-milestones.json`
- [x] Funding strategy → `funding-strategy.json`
- [x] Agent roster → `agent-roster.json`
- [ ] Infrastructure status → live API (already dynamic)
- [ ] Smart contracts table → could be JSON but addresses rarely change
- [ ] Platform listing → could be JSON

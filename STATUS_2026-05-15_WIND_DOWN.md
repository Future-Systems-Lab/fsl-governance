# Wind-Down Status — 2026-05-15

## Completed this session

- `3541e6e` (fsl-command-center, branch audit-advisor-restructure-2026-05-14) — Security & disclosure audit: classified all public exposure (9 critical, 9 intelligence, 10 perception), two-domain split proposal, reconciliation of wallet/revenue/phase discrepancies
- `5fef5d2` (HypnoNeuro, main) — pushed previously unpushed commit

## Pending — queued but not started

- **FIX 1:** Kill ◆ diamond from hero + favicon cache bust v3 (fsl-command-center-v2)
- **FIX 2:** Promote AlchemistForge above fold + reorder landing page
- **FIX 3:** First-time wallet connection guide + tooltip helpers
- **Content audit:** Line-by-line text check of v1 dashboard against canonical facts (CONTENT_AUDIT_2026-05-15.md partially exists but needs canonical verification pass)
- **Brand mark embed:** Permission Bridge mono-gold on advisor packet v3 PDF

## Known issues to address on return

- **Revenue split 67/30/3 displayed in 4 locations** — canonical is 70/27/3 (index.html, advisors-ghasemzadeh.html, api/dashboard-content.js, AUDIT doc)
- **v2 wallet gate is client-side only** — all "hidden" admin content ships in JS bundle, extractable by anyone with devtools. Needs server-side verification or split to separate project.
- **getting-started.html exposes faucet wallet 0xF809dfC...** with no gate (fully public)
- **status.json is fully public** and contains VPS ports, sprint history, biosensor outreach targets
- **Telegram bot 404'd since May 14** — references in dashboard still say "routing fixed"
- **"Phases 1-4 deployed" still appears** in sprint history — needs honest-phasing correction
- **HypnoNeuro has 53 Dependabot vulnerabilities** (12 high, 36 moderate, 5 low)

## Reminders for Dr. Meg

- BHTY paper page-by-page review before re-pinning (commits 9d0032f + 27e2605, NOT pinned to IPFS yet)
- Advisor packet v2 not distributed, awaiting review
- Telegram bot replacement decision needed
- Security audit at `~/fsl-command-center/SECURITY_AUDIT_2026-05-15.md` — review and approve before any removals or domain split
- USPTO Class 35 Serial 99821948 — verify filing via TSDR
- Wallet 0x7394...BCC3 — clarify what this is (not found in codebase)

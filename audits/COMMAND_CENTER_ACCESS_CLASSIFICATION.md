# Command Center Access Classification

## PUBLIC vs WALLET-GATED Content Split

**Date:** April 29, 2026
**Auditor:** Claude Opus 4.6 (1M context)
**Source:** `fsl-command-center/index.html` (1073 lines, v6)
**Snapshot:** April 29, 2026

---

## Classification

| # | Section | ID | Lines (approx) | Classification | Rationale |
|---|---------|-----|-----------------|---------------|-----------|
| 0 | Critical Systems Bar | (top bar, no ID) | 59-188 | **GATED** | Contains VPS SSH modal (line 178), PM2 status modal (lines 179-188) with IP `74.208.202.239`, SSH root commands, PM2 restart procedures, file paths `/opt/encrypthealth/backend`, `/opt/clawdbot`. Also contains restore modal (line 173) with git checkout + deploy commands. |
| 1 | Crypto Ticker | (no section ID) | 191-193 | **PUBLIC** | Public crypto price feed, no operational data. |
| 2 | Academic Reviewer Note | `academic-reviewer-note` | 213-243 | **PUBLIC** | Doctoral program details, faculty targets, evidence portfolio summary, CV link. Academic credibility -- intended for public reviewers. |
| 3 | Open Source Portfolio | `oss` | 246-263 | **PUBLIC** | 8 public GitHub PRs with links. All already public on GitHub. |
| 4 | Ecosystem at a Glance | `ecosystem` | 266-279 | **PUBLIC** | Aggregate stat counters (tasks, games, agents, contracts, IPFS CIDs, repos). High-level numbers only. |
| 5 | Platforms | `platforms` | 282-296 | **PUBLIC** | Platform names, public URLs, IPFS domains, Vercel fallback URLs. All externally accessible. |
| 6 | Smart Contracts | `contracts` | 299-317 | **PUBLIC** | On-chain contract addresses on Sepolia -- already public on block explorers. Revenue split model is public knowledge. |
| 7 | Architecture | `architecture` | 320-414 | **MIXED** | Auth flow description (lines 323-343): PUBLIC -- documents EIP-191 pattern, no secrets. Decentralization layer completed/not-started (lines 345-389): PUBLIC -- status checklist. Domain status (lines 362-376): PUBLIC. Agent Gateway (lines 391-414): **GATED** -- 17 agent definitions with internal roles, approval gates, council protocol details. See edge cases. |
| 8 | Wellness Games | `games` | 417-488 | **PUBLIC** | 45 game names and neurotransmitter targets. Product catalog -- no operational details. |
| 9 | Infrastructure Status | `infrastructure` | 491-647 | **GATED** | Contains: VPS IP `74.208.202.239` (lines 520-521), API port 4001, PostgreSQL table names and row counts (lines 528-549), GitHub repo visibility matrix (lines 552-575), IPFS CID manifest (lines 577-621), database backup CIDs (line 617), IP/trademark details with EIN `42-2050630` and NPI `1497696264` (line 631), full emergency restore procedures with SSH commands (lines 636-720), Agent Council protocol with `/root/` paths and CHAT_ID reference (lines 723-753). |
| 10 | Runbooks | `runbooks` | 650-755 | **GATED** | Emergency restore commands for every system: SSH root commands, PM2 restart procedures, pg_dump/psql commands, file paths. Agent Council locked items, review protocol with `/root/fsl-governance/` path, deploy procedures, Telegram CHAT_ID reference. |
| 11 | Pending Items | `pending` | 758-793 | **GATED** | Technical debt items expose security vulnerabilities (mint endpoint in PUBLIC_ROUTES, missing contract source, uncapped EHT supply, wildcard CORS). External blockers contain business-sensitive timelines. |
| 12 | Sprint History | `sprint-history` | 796-942 | **MIXED** | Build trajectory phases (lines 819-870): PUBLIC -- high-level roadmap. Funding requirements (lines 879-907): **Edge case** -- see below. Outreach & Revenue (lines 910-927): **Edge case**. Licensing & IP pricing (lines 929-935): PUBLIC -- intended for prospects. Brand guides (lines 937-941): PUBLIC. |

---

## Sensitive Content Found

### IP Addresses
| Line | Content |
|------|---------|
| 178 | `ssh root@74.208.202.239` (VPS access modal) |
| 179 | `ssh root@74.208.202.239` (PM2 status modal) |
| 182 | `ssh root@74.208.202.239` (PM2 restart) |
| 185-186 | `ssh root@74.208.202.239` (Agent Gateway restart) |
| 520 | `74.208.202.239` (VPS infrastructure card) |
| 521 | `74.208.202.239:4001` (API server card with port) |
| 668 | `ssh root@74.208.202.239` (EncryptHealth API restore) |
| 676 | `ssh root@74.208.202.239` (Agent Gateway restore) |
| 705 | `ssh root@74.208.202.239` (DB backup) |
| 709 | `ssh root@74.208.202.239` (DB restore) |
| 717 | `ssh root@74.208.202.239` (Full system restart) |

### SSH Commands (all as root)
Lines: 178, 179, 182, 185-186, 668, 676, 705, 709, 717

### File Paths
| Line | Path |
|------|------|
| 183 | `/opt/encrypthealth/backend` |
| 186 | `/opt/clawdbot` |
| 384 | `/tmp/` (Lighthouse backup) |
| 661 | `~/HypnoNeuro/encrypthealth/frontend` |
| 669 | `/opt/encrypthealth/backend` |
| 677 | `/opt/clawdbot` |
| 697 | `~/HypnoNeuro` |
| 706 | `/opt/encrypthealth/backups/` |
| 710 | `/opt/encrypthealth/backups/` |
| 738 | `/root/fsl-governance/` |

### PM2 Process Names
Lines: 89, 130-131, 181-188, 669, 677, 718, 1048
Processes: `encrypthealth-api`, `FSL_Agent_Gateway_Bot`, `SovereignLedger`, `cloudflare-tunnel`

### Database Details
| Line | Content |
|------|---------|
| 522 | PostgreSQL -- 67 tables, 120 rows |
| 528-549 | Full table names and row counts (25 tables with data) |
| 547-549 | 42 schema-ready table names listed |
| 706 | `pg_dump -U postgres encrypthealth` |
| 710 | `psql -U postgres encrypthealth` |

### Business Entity Identifiers
| Line | Content |
|------|---------|
| 631 | EIN: `42-2050630` |
| 631 | NPI: `1497696264` |

### Internal References
| Line | Content |
|------|---------|
| 101 | API URL: `https://api.futuresystemslab.io` |
| 741 | `Telegram CHAT_ID=REDACTED_CHAT_ID` |
| 1023 | Infra polling URL: `https://encrypthealth.io/api/infra` |

### Security Vulnerabilities Exposed
| Line | Content |
|------|---------|
| 767 | `/api/tokens/mint` in PUBLIC_ROUTES -- should require auth |
| 769 | EHT token -- owner can mint unlimited |
| 771 | CORS wildcard configuration |

---

## Edge Cases for Dr. Meg Review

### 1. Agent Gateway Cards (Section 7, lines 391-414 + JS lines 978-1020)
**Current classification:** GATED
**Consideration:** The 17 agent names and high-level roles could serve as a public showcase of the AI council architecture (impressive for academic reviewers). However, the detailed duties, approval gates, and council protocol (lines 723-753) expose internal governance mechanics.
**Recommendation:** Split -- show agent names/icons/roles as PUBLIC, keep duties/approval logic/council protocol GATED.

### 2. Funding Requirements (Section 12, lines 879-907)
**Current classification:** Borderline
**Consideration:** Grant applications benefit from transparency about funding needs. However, exact dollar amounts and the "$11K-15K for full decentralization" figure could be used to assess FSL's financial vulnerability.
**Recommendation:** PUBLIC for grant/investor audiences, but Dr. Meg should confirm comfort level with public dollar amounts.

### 3. Outreach & Revenue Table (Section 12, lines 910-927)
**Current classification:** Borderline
**Consideration:** Includes "Pre-revenue" status and specific outreach targets (Christina Veselak, Dr. Henry Ealy). Useful for transparency but could be used competitively.
**Recommendation:** GATED -- move to operational dashboard.

### 4. Database Table Names and Schema (Section 9, lines 528-549)
**Current classification:** GATED
**Consideration:** Table names reveal internal data model. Even without connection strings, they map the entire application surface area.
**Recommendation:** Confirmed GATED.

### 5. IPFS CID Manifest (Section 9, lines 577-621)
**Current classification:** Borderline
**Consideration:** CIDs are content-addressed and the documents they point to are already public on Pinata gateways. However, aggregating all 20 CIDs in one place creates a convenient map of all governance artifacts.
**Recommendation:** PUBLIC -- these are already accessible and meant to demonstrate IPFS commitment. The database backup CID (line 617) should be GATED separately.

### 6. EIN and NPI Numbers (line 631)
**Current classification:** GATED (within Infrastructure section)
**Consideration:** EIN is semi-public (required on some filings). NPI is publicly searchable on NPPES. Could be moved to a public "Entity" card.
**Recommendation:** Ask Dr. Meg -- these are technically public records but aggregating them with VPS details is risky.

### 7. Live VPS Infrastructure Panel (Section 9, lines 491-514)
**Current classification:** GATED
**Consideration:** Shows real-time PM2 process status. Useful for operational monitoring but exposes process names, memory usage, restart counts -- useful for attack reconnaissance.
**Recommendation:** Confirmed GATED.

---

## Summary

| Classification | Count | Sections |
|---------------|-------|----------|
| **PUBLIC** | 6 | Ticker, Academic Note, OSS Portfolio, Ecosystem Stats, Platforms, Smart Contracts, Games |
| **GATED** | 4 | Critical Systems Bar, Infrastructure, Runbooks, Pending Items |
| **MIXED** | 2 | Architecture (split auth flow PUBLIC / agent council GATED), Sprint History (split roadmap PUBLIC / outreach+funding GATED) |
| **Edge cases** | 7 | See above -- requires Dr. Meg decision |

# Multi-Agent Council Review: Reviewer Surface vs. Dashboard Differentiation

**Date:** 2026-05-07
**Council Output:** Seven-point analysis for Dr. Meg review
**Surfaces Analyzed:**
- `/index.html` -- Public landing (Command Center)
- `/reviewer.html` -- Public reviewer evidence portfolio
- `/getting-started.html` -- Public reviewer getting-started guide
- `/dashboard.html` + `/api/dashboard-content.js` -- Wallet-gated admin dashboard

---

## 1. Content Differentiation Audit

| Content | Public Landing | Reviewer | Getting Started | Dashboard | Overlap? | Correct Placement? |
|---------|---------------|----------|-----------------|-----------|----------|-------------------|
| **Crypto ticker** | Yes | Yes | Yes | Yes | 4x overlap | MISPLACED on reviewer -- distracting for academics, signals "crypto project" before thesis is established |
| **Academic reviewer note / program info** | Yes (detailed) | Yes (structured) | No | No | 2x overlap | MISPLACED on landing -- landing has MORE detail than reviewer page about the program; reviewer page should be the definitive source |
| **Faculty alignment (Boscovic, Ahn, Ghasemzadeh)** | Yes | Yes | No | No | 2x overlap | OK on both, but landing version is more detailed (includes Vishnoi thesis reference) while reviewer page is shorter |
| **Smart contracts table (8 contracts)** | Yes (full addresses, Blockscout links) | Yes (truncated addresses, Etherscan links) | No | No | 2x overlap | OK on both but links differ (Blockscout vs Etherscan) -- should be consistent |
| **Open source PRs (8 PRs)** | Yes (compact) | Yes (detailed with status badges) | No | No | 2x overlap | OK -- reviewer version is better with Open/Closed status |
| **Platform ecosystem** | Yes (table) | Yes (cards with status) | No | No | 2x overlap | Reviewer version is better (cards with descriptions); landing is redundant |
| **Credentials (degrees, certs, NPI)** | Yes (in academic note) | Yes (dedicated section) | No | No | 2x overlap | MISPLACED on landing -- credentials belong on reviewer page |
| **Game library (45 games)** | Yes (full 45-game table) | No | No | No | Landing only | MISPLACED -- 45-game catalog is deep detail inappropriate for landing; belongs in reviewer appendix or dashboard |
| **Sprint history / roadmap** | Yes (4-phase cards) | No | No | No | Landing only | MISPLACED -- internal roadmap on public landing; should be dashboard-only |
| **EIN / NPI / trademark** | Yes (in academic note + legitimacy section) | Yes (in credentials) | No | Yes (in IP section) | 3x overlap | REDUNDANT -- landing has it twice (academic note + legitimacy section) |
| **Wallet connect button** | Yes (prominent) | No | No | No | Landing only | OK -- landing is gateway to dashboard |
| **How to verify** | No | Yes | No | No | Reviewer only | CORRECT |
| **Research artifacts links** | No | Yes | No | No | Reviewer only | CORRECT |
| **Getting started / wallet setup** | No | Link only | Yes (full guide) | No | Getting-started only | CORRECT |
| **AlchemistForge interactive ritual** | No | No | Yes (detailed) | No | Getting-started only | CORRECT |
| **Critical systems bar** | No | No | No | Yes | Dashboard only | CORRECT |
| **Live VPS infrastructure** | No | No | No | Yes | Dashboard only | CORRECT |
| **Agent council (17 agents)** | No | No | No | Yes | Dashboard only | CORRECT |
| **Runbooks / emergency restore** | No | No | No | Yes | Dashboard only | CORRECT |
| **Funding requirements** | No | No | No | Yes | Dashboard only | CORRECT |
| **Outreach targets** | No | No | No | Yes | Dashboard only | CORRECT |
| **Database schema (67 tables)** | No | No | No | Yes | Dashboard only | CORRECT |
| **Pending items / tech debt** | No | No | No | Yes | Dashboard only | CORRECT |
| **Lexicon rules** | No | No | No | Yes | Dashboard only | CORRECT |
| **Auth flow architecture** | No | No | No | Yes | Dashboard only | CORRECT |
| **IPFS manifest (20 CIDs)** | No | No | No | Yes | Dashboard only | CORRECT |
| **Brand guides** | No | No | No | Yes | Dashboard only | CORRECT |
| **Revenue model / pricing** | No | No | No | Yes | Dashboard only | CORRECT |
| **GitHub repos (50)** | No | No | No | Yes | Dashboard only | CORRECT |

### Summary Findings

**Good news:** The dashboard is well-differentiated. It genuinely functions as an operations center with live polling, runbooks, agent council, funding data, and technical debt tracking. Very little dashboard content leaks onto public surfaces.

**Problems:**
1. The **public landing (index.html)** is trying to be both a "connect your wallet" gateway AND a reviewer page. It duplicates most reviewer content and adds internal details (game catalog, sprint history) that don't belong on either surface.
2. The **reviewer page** is clean and well-structured but is missing the "why" -- it is a catalog of evidence without a thesis statement.
3. The **crypto ticker** on the reviewer page signals "crypto project" before the reviewer understands the thesis. An engineering management faculty member seeing scrolling crypto prices will pattern-match to speculation, not infrastructure.

---

## 2. One-Minute Pitch (Draft)

**Current state:** The reviewer page opens with "FSL Evidence Portfolio / For Academic Reviewers / Sovereignty by Design" and immediately offers four action buttons. There is no thesis paragraph. A reviewer lands on a catalog with no argument.

**Proposed opening paragraph (under 60 seconds of reading):**

> Behavioral health data is uniquely vulnerable. It carries the highest stigma cost for exposure, the strictest regulatory requirements (HIPAA + 42 CFR Part 2), and the most complex consent topology of any data domain -- yet current systems store it in centralized databases controlled by entities other than the person it describes. Future Systems Lab is a working infrastructure framework that moves data sovereignty from policy language into cryptographic enforcement: participants control their own records through wallet-based identity, consent is recorded as signed blockchain attestations, and session data is encrypted to keys only the participant holds. This is not a whitepaper. Every contract, platform, and credential listed below is deployed and independently verifiable. The architecture is designed to generalize beyond behavioral health -- to real estate, supply chain, identity, and any domain where participant-controlled data sovereignty is load-bearing. This portfolio documents the system as an applied doctoral engineering project for ASU's Ira A. Fulton Schools of Engineering.

**Why this works:**
- Opens with a problem statement any faculty member understands (data vulnerability)
- Establishes the domain choice rationale (hardest regulatory environment = strongest proof)
- Explains the mechanism in plain English (wallet identity, signed consent, encrypted data)
- Differentiates from theory ("this is not a whitepaper")
- Claims generalizability (the engineering management hook)
- States the academic context last (after credibility is established)

---

## 3. Evidence Hierarchy

### Ranked for Engineering Management Faculty Reviewer

#### ABOVE THE FOLD (first screen, no scroll)
1. **One-minute pitch** (see Section 2 above) -- thesis statement, not a title card
2. **Program context** -- DEng, Fulton Schools, Spring 2027, praxis-track
3. **Three key numbers** -- 8 deployed contracts, 4 operational platforms, 45 therapeutic games
4. **One verifiable link** -- a single "click to verify" Etherscan link proving deployment is real
5. **Tiered reading paths** -- "2 min summary / 15 min technical / 30 min full" (see Section 6)

#### BODY (scrollable sections)
6. **Deployed smart contracts** -- full table with Etherscan links and status badges
7. **Platform ecosystem** -- live URLs with LIVE/SCAFFOLDED status
8. **Open source contributions** -- 8 PRs with Open/Closed status
9. **How to verify** -- step-by-step for non-crypto reviewers
10. **Credentials** -- degrees, certifications, NPI, entity
11. **Faculty alignment** -- Boscovic, Ahn, Ghasemzadeh with rationale

#### APPENDIX / DEEP-DIVE (linked, not inline)
12. **Full game catalog** (45 games) -- link to separate page or collapsible section
13. **Research artifacts** -- CV, academic directory, methodology docs
14. **Getting started guide** -- interactive wallet verification (already on separate page)
15. **Convergent design story** -- Vishnoi thesis relationship (currently missing, see Section 7)
16. **Decentralization roadmap** -- link to GitHub document

---

## 4. Status Badge System

### Specification

| Badge | Color | CSS Class | Meaning | Verification |
|-------|-------|-----------|---------|-------------|
| **LIVE** | Green (#22CC66) | `.s-live` | Deployed, operational, verifiable on-chain or at URL | Reviewer can click link and see it working now |
| **SCAFFOLDED** | Amber (#FFB400) | `.s-scaffolded` | Architecture exists, code written, contract deployed but not yet in production use | Contract visible on Etherscan, functionality not yet active |
| **PLANNED** | Gray (#ffffff55) | `.s-planned` | Designed and specified, not yet built | Design docs exist in fsl-governance repo |
| **COMPLETED** | Blue (#00D9FF) | `.s-completed` | Milestone achieved, independently verifiable | Timestamp + proof link |

### Current Usage Audit

The reviewer page currently uses:
- `.s-live` (green "Operational") -- correctly applied to 4 platforms
- `.s-scaffolded` (amber "Scaffolded") -- correctly applied to NeuroBalance
- `.s-open` (aqua "Open") -- used for PR status, appropriate
- `.s-closed` (dim "Closed") -- used for closed PR, appropriate

**Missing from current implementation:**
- No PLANNED badge exists -- needed for NeuroBalance biosensor features, mainnet migration, etc.
- No COMPLETED badge exists -- needed for milestones like "v2 contracts deployed April 21, 2026"
- The public landing uses `.s-live` with "Submitted" text for PRs -- this is misleading. "Submitted" is not the same as "Live." PRs should use "Open" or "Merged" status.

### Proposed Badge Markup

```html
<span class="s s-live">LIVE</span>
<span class="s s-scaffolded">SCAFFOLDED</span>
<span class="s s-planned">PLANNED</span>
<span class="s s-completed">COMPLETED</span>
```

Each badge should include a tooltip or inline note explaining what the status means for a reviewer who has never seen these terms.

---

## 5. Jargon Audit

Sentence-by-sentence review of `/reviewer.html`:

| Term | Plain English Alternative | Inline Definition |
|------|--------------------------|-------------------|
| **EIP-191** | "message signing standard" | A standard format for signing a message with your blockchain identity, like digitally signing a document |
| **Sepolia** | "Ethereum test network" | A free test version of the Ethereum blockchain used for development; identical to production but with no real money |
| **Sepolia Testnet** | "Ethereum test network" | (same as above) |
| **personal_sign** | "digital signature" | A wallet function that creates a cryptographic signature proving you approved a specific message |
| **smart contract** | "automated program on the blockchain" | A program deployed to the blockchain that executes rules automatically, like a vending machine that enforces its own terms |
| **wallet-gated** | "login-protected via blockchain identity" | Access controlled by proving ownership of a blockchain identity (wallet), rather than a username/password |
| **on-chain** | "recorded on the blockchain" | Data written permanently to the public blockchain ledger, visible to anyone and impossible to alter |
| **testnet** | "test network" | A free copy of a blockchain used for development and testing, with no real monetary value |
| **soulbound** | "non-transferable credential" | A digital credential permanently attached to one identity that cannot be sold or given away |
| **ERC-1155** | "multi-token standard" | A technical standard for creating multiple types of digital credentials in a single contract |
| **ERC-20** | "token standard" | A technical standard for creating fungible (interchangeable) digital tokens on Ethereum |
| **IPFS** | "decentralized file storage" | A peer-to-peer file storage network where files are addressed by their content, not location |
| **consent gate** | "permission checkpoint" | A step where users explicitly approve data access before it can proceed |
| **Etherscan** | "blockchain inspector" | A public website where anyone can view all transactions and contracts on Ethereum (like a public ledger viewer) |
| **block explorer** | "blockchain inspector" | (same as Etherscan above) |
| **deployer wallet** | "creator's blockchain identity" | The blockchain account that created and deployed the smart contracts |
| **EIP-1193** | "wallet connection standard" | A standard protocol that lets websites communicate with blockchain wallets |
| **chain ID** | "network identifier" | A number that uniquely identifies which blockchain network you are connected to |
| **RPC URL** | "network connection address" | The web address your wallet uses to communicate with a blockchain network |
| **transmutation** | (domain-specific, keep) | Part of the Jungian shadow work framework -- a therapeutic metaphor, not blockchain jargon |
| **nigredo / albedo / rubedo** | (domain-specific, keep) | Alchemical stage names used as therapeutic metaphors in the shadow work protocol |
| **XRPL** | "XRP Ledger (payment blockchain)" | A separate blockchain optimized for fast, low-cost payments |
| **WalletConnect** | (proper noun, keep) | A protocol for connecting mobile wallets to websites via QR code |
| **CID** | "content identifier" | A unique fingerprint for a file stored on IPFS, like a permanent URL based on the file's contents |
| **JWT** | (not on reviewer page) | N/A -- only in dashboard |
| **PM2** | (not on reviewer page) | N/A -- only in dashboard |

### Recommendation

For each technical term on the reviewer page, add either:
1. An inline parenthetical on first use: "deployed on Sepolia (Ethereum's free test network)"
2. A glossary tooltip via `<abbr>` or `title` attribute
3. A "Terms" sidebar or footer glossary

The **getting-started page already does this well** with its primer boxes explaining wallets, Sepolia, and testnet rationale. The reviewer page should adopt the same pattern for its first-use jargon.

---

## 6. Navigation Hierarchy

### Proposed Reading Paths

#### Path A: 2-Minute Executive Summary (Busy Reviewers)
1. Read the one-minute pitch (Section 2 above)
2. Scan the three key numbers (8 contracts, 4 platforms, 45 games)
3. Click ONE Etherscan link to verify a contract exists
4. Read the faculty alignment section
5. Done. Total: ~2 minutes.

**Implementation:** Add a "2-Minute Summary" button at top of reviewer page that scrolls to a condensed card containing only these elements, or add a `#summary` anchor with a dedicated condensed section.

#### Path B: 15-Minute Architecture Review (Technical Reviewers)
1. Read the one-minute pitch
2. Review the full smart contracts table -- click 2-3 Etherscan links
3. Review the platform ecosystem -- visit 1-2 live URLs
4. Review the open source contributions -- click 2-3 GitHub PRs
5. Read the "How to Verify" section
6. Scan credentials
7. Done. Total: ~15 minutes.

**Implementation:** This is approximately the current reviewer page structure. Add numbered section markers and a progress indicator.

#### Path C: 30-Minute Research Methodology (Academic Reviewers)
1. Complete Path B (15 min)
2. Follow the "Research Artifacts" links -- read methodology document, BHTY paper draft
3. Review the decentralization roadmap
4. Read the convergent design story (Vishnoi thesis connection -- currently MISSING)
5. Review the CV
6. Done. Total: ~30 minutes.

**Implementation:** Add a "Deep Dive" section at the bottom of the reviewer page linking to all research artifacts with reading-time estimates.

#### Path D: Interactive Experience (Variable, Tier 1-3)
- **Tier 1 (5 min):** Install Brave, view the getting-started page, see wallet setup
- **Tier 2 (10 min):** Connect wallet, complete AlchemistForge ritual (3 on-chain transactions)
- **Tier 3 (30 min):** Full ecosystem walk -- HypnoNeuro games, HNT minting, session flow

**Implementation:** Already partially built via the getting-started page. The reviewer page hero already has buttons for these tiers. The labeling is good ("See It Live", "Try It", "Experience It") but lacks time estimates on the buttons themselves.

### Current State vs. Proposed

The reviewer page currently offers four buttons: "Read About It" / "See It Live (5 min)" / "Try It (10 min)" / "Experience It (30 min)". This is a solid start. What is missing:
- The "Read About It" button just scrolls to #overview -- it should offer the 2-minute vs 15-minute vs 30-minute read paths
- No visual progress indicator showing "you are here" in the reading flow
- No estimated read times on body sections

---

## 7. Missing Content Gap Analysis

### Checked Items

| Content | Present on Reviewer Surface? | Location if Found | Assessment |
|---------|-----------------------------|--------------------|------------|
| **"Why decentralization for behavioral health?"** | PARTIALLY -- one sentence in overview ("the deployed system IS the research contribution") | reviewer.html #overview | INSUFFICIENT. The "why behavioral health" argument is buried in the public landing's academic note (index.html) but absent from the reviewer page where it matters most. The landing says: "chosen because it imposes the strictest regulatory load...the highest stigma cost...the most complex consent topology." This belongs on the reviewer page, not the landing. |
| **EJ origin story (personal motivation)** | NO | Nowhere | MISSING. There is no personal narrative explaining why Dr. Meg built this -- lived experience on both sides of the system failure, practitioner who saw data sovereignty failures firsthand. The Boscovic alignment note hints at it ("designed by a credentialed practitioner who lived both sides") but it is not developed. |
| **Comparison to existing blockchain health projects** | NO | Nowhere | MISSING. No mention of MedRec (MIT), BurstIQ, Patientory, MedFabric4Me, or any competing/related project. A reviewer in this space will wonder how FSL differs from prior art. |
| **"How this differs from typical health-tech startups"** | NO | Nowhere | MISSING. No comparison to centralized health-tech (Headspace, BetterHelp, etc.) or explanation of why decentralization matters vs. "just use a database with good security." |
| **Regulatory positioning (operates outside HIPAA by design)** | PARTIALLY | index.html academic note mentions "HIPAA + 42 CFR Part 2" | INSUFFICIENT. The landing references HIPAA as the regulatory load, but the reviewer page never explains FSL's deliberate positioning outside HIPAA scope (naturopathic psychology, not covered entities). The compliance position document exists on IPFS but is not surfaced on the reviewer page. |
| **Convergent design story (Vishnoi thesis)** | PARTIALLY | index.html mentions "completion of the academic lifecycle his lab started (Vishnoi MedFabric4Me thesis)" | INSUFFICIENT on reviewer page. The Boscovic alignment on the reviewer page says only "Independent build, deeper sovereignty model, completion of the academic lifecycle his lab started." It does not name Vishnoi or explain convergent independent arrival. |

### Priority Missing Content

**P0 -- Must add before submission:**
1. "Why decentralization for behavioral health?" argument (the thesis statement)
2. Convergent design story with Vishnoi thesis named explicitly
3. Regulatory positioning paragraph (outside HIPAA by design)

**P1 -- Should add:**
4. Brief comparison to MedRec, BurstIQ, Patientory (prior art positioning)
5. How FSL differs from centralized health-tech (BetterHelp, Headspace)
6. EJ origin story (1-2 sentences on personal motivation)

**P2 -- Nice to have:**
7. Literature review summary or link
8. Generalizability examples (real estate, supply chain) as a brief section

---

## 8. Dashboard Differentiation Strategy

### Current Dashboard Sections -- Classification

| Dashboard Section | Action | Rationale |
|------------------|--------|-----------|
| **Critical systems bar** (wallet gate, EncryptHealth, VPS, Agent Gateway, Email, PM2, Discord, IPFS) | KEEP | Pure ops -- real-time health indicators, exactly what a control room needs |
| **Ecosystem stats** (tasks, PM2, games, agents, contracts, transmutations, wallets, CIDs, repos) | KEEP but differentiate | Dashboard version has live-polled values (stat-transmutations, stat-wallets). Add actual API-fetched numbers. Landing has static numbers -- remove from landing entirely. |
| **Architecture: Auth flow** | KEEP | Internal technical detail, appropriately gated |
| **Architecture: Decentralization layer** | KEEP | Completion tracking for internal roadmap items |
| **Architecture: Domain status** | KEEP | Live domain health checks -- operational data |
| **Agent gateway (17 agents)** | KEEP | Internal operational -- agent grid with modal details, approval gates, duties |
| **Live VPS infrastructure** | KEEP | Real-time PM2 process monitoring -- pure control room |
| **Infrastructure: system cards** | KEEP | VPS IP, API server, database, security scan status |
| **Database schema (67 tables, 25 with data)** | KEEP | Internal data inventory |
| **GitHub repos (50)** | KEEP | Internal repo inventory with visibility status |
| **IPFS manifest (20 CIDs)** | KEEP | Internal content-addressing inventory |
| **Intellectual property** | KEEP | Trademark status tracking |
| **Runbooks / emergency restore** | KEEP | SSH commands, PM2 restart procedures, DB backup/restore |
| **Agent council protocol** | KEEP | Locked items, review protocol, lexicon rules |
| **Pending items / tech debt** | KEEP | Internal priority tracking |
| **External blockers** | KEEP | Timeline dependencies |
| **Funding requirements** | KEEP | Dollar amounts appropriately gated |
| **Outreach and revenue** | KEEP | Named targets, pricing, licensing -- appropriately gated |
| **Brand guides** | KEEP | Internal brand documentation |
| **Sprint history / roadmap** | REMOVE from landing, KEEP on dashboard only | Currently on public landing -- should be dashboard-only |

### Items to ADD to Dashboard

| Addition | Rationale |
|----------|-----------|
| **Real-time on-chain activity feed** | Show recent AlchemistForge transmutations, HNT mints, SovereignLedger attestations as they happen |
| **Reviewer analytics** | How many unique visitors to /reviewer, /getting-started, conversion to wallet connection |
| **Faucet balance monitor** | The getting-started page checks faucet balance -- dashboard should show this prominently |
| **Grant application status tracker** | XRPL, ASU, NIH grant stages with deadlines |
| **Academic milestone timeline** | BS MIS conferment, ASU application, LOI submission, enrollment dates |
| **Agent budget burn rate** | Current $5/day, $50/month budget usage vs. allocation |
| **Governance log** | Timestamped log of all council decisions, IPFS-pinned, with CID references |

### Dashboard Design Principle

The dashboard should feel like **mission control**, not a styled version of the public page. Current state is good -- the critical systems bar, live VPS polling, runbooks, and agent council are genuinely operational. The main issue is the public landing duplicating dashboard-level detail (game catalogs, sprint history, full contract tables).

---

## 9. Priority Fix List

### P0 -- Before Any Reviewer Sees This

| # | Fix | Surface | Impact |
|---|-----|---------|--------|
| P0-1 | **Add thesis paragraph to /reviewer** | reviewer.html | Reviewer currently sees a title and buttons but no argument. The one-minute pitch (Section 2) must be the first thing they read. |
| P0-2 | **Remove crypto ticker from /reviewer and /getting-started** | reviewer.html, getting-started.html | Scrolling crypto prices signal "speculation" before thesis is established. Replace with a static FSL brand bar or remove entirely. |
| P0-3 | **Add "Why decentralization for behavioral health?" to /reviewer** | reviewer.html | The strongest argument (strictest regulatory load, highest stigma cost, most complex consent topology) is currently only on the landing page. |
| P0-4 | **Add convergent design story** | reviewer.html | Name the Vishnoi MedFabric4Me thesis explicitly. Explain independent convergent arrival. This is the strongest faculty alignment argument. |
| P0-5 | **Add regulatory positioning paragraph** | reviewer.html | Explain the deliberate HIPAA positioning: naturopathic psychology operates outside covered-entity scope, making blockchain-based consent a design choice, not a regulatory workaround. |

### P1 -- Before Application Submission

| # | Fix | Surface | Impact |
|---|-----|---------|--------|
| P1-1 | **Strip internal details from /index.html** | index.html | Remove 45-game catalog, sprint history, detailed credentials from landing. Landing should be: thesis, hero stats, wallet connect, link to /reviewer. |
| P1-2 | **Add jargon definitions on first use** | reviewer.html | Add inline parentheticals for Sepolia, EIP-191, personal_sign, soulbound, ERC-1155, etc. (see Section 5 table) |
| P1-3 | **Standardize Etherscan links** | reviewer.html, index.html | reviewer.html uses sepolia.etherscan.io, index.html uses eth-sepolia.blockscout.com. Pick one and be consistent. Etherscan is more familiar to non-crypto reviewers. |
| P1-4 | **Add reading path indicators** | reviewer.html | Label sections with estimated read times. Add "2-min / 15-min / 30-min" path navigation. |
| P1-5 | **Add status badge tooltips** | reviewer.html | Each LIVE/SCAFFOLDED badge should have a title attribute explaining what it means. |
| P1-6 | **Add prior art comparison** | reviewer.html | Brief table comparing FSL to MedRec, BurstIQ, Patientory, MedFabric4Me. |
| P1-7 | **Fix PR status on landing** | index.html | PRs show "Submitted" with `.s-live` (green) badge. Should show "Open" with `.s-open` (aqua). "Submitted" with a green "Live" badge implies they were merged/accepted. |

### P2 -- Polish

| # | Fix | Surface | Impact |
|---|-----|---------|--------|
| P2-1 | **Add print stylesheet refinements to /reviewer** | reviewer.html | Print styles exist but could be improved -- ensure the thesis paragraph prints cleanly for committee printouts. |
| P2-2 | **Add EJ origin story** | reviewer.html | 1-2 sentences on personal motivation, placed in a "Background" section. |
| P2-3 | **Add generalizability examples section** | reviewer.html | Brief mention of real estate, supply chain, identity domains. |
| P2-4 | **Consolidate index.html** | index.html | After P1-1, the landing should be ~50% its current size. Wallet connect + thesis + link to /reviewer. |
| P2-5 | **Add PLANNED badge CSS** | reviewer.html | The `.s-planned` class does not exist yet. Add gray badge for planned items. |
| P2-6 | **Dashboard: add governance log** | dashboard | Timestamped council decision log with IPFS CID references. |
| P2-7 | **Dashboard: add reviewer analytics** | dashboard | Track /reviewer page visits, time on page, getting-started conversion. |

---

## Appendix: Surface Architecture Summary

```
PUBLIC SURFACES (no wallet required):
  /                    -- Landing page: thesis + wallet connect + link to /reviewer
  /reviewer            -- Evidence portfolio for academic reviewers
  /reviewer/getting-started  -- Interactive wallet verification guide

GATED SURFACE (wallet required):
  /dashboard           -- Admin control room (ops, agents, funding, runbooks)
```

**Design principle:** Public surfaces are for PERSUASION (convince a reviewer the work is real and significant). The dashboard is for OPERATION (run the system). These should share almost zero content.

**Current violation:** The landing page (index.html) tries to do both -- it has operational detail (game catalogs, sprint history) mixed with persuasion content (academic note, credentials). This dilutes both purposes.

---

*Council output generated 2026-05-07. For Dr. Meg review and prioritization.*

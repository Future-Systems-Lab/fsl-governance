# Command Center Proposed Reorganization

**Date:** 2026-04-29
**Status:** PROPOSAL -- Pending Dr. Meg approval
**Implementation:** Blocked until approved

---

## Design Principles

1. **Academic reviewers first** -- the page should tell a compelling story for ASU DEng review within the first 3 scrolls
2. **Consolidate duplicates** -- doctoral info appears 4 times; platforms appear twice; merge into single authoritative sections
3. **Runbooks at the bottom** -- SSH commands, restore procedures, and council protocol are operational, not showcase material
4. **Fix container bug** -- Sections 14-19 are currently outside the `<div class="container">` wrapper

---

## Proposed Section Order

### 1. HERO -- Identity + Mission
**Maps from:** Critical Systems Bar (L58-96), Crypto Ticker (L189-190), Navigation (L192-208)
**Changes:** Keep as-is. These are fixed/sticky UI elements.

---

### 2. FOR ACADEMIC REVIEWERS -- DEng Applied Project
**Maps from:** For Reviewers card (L212-216) + Doctoral Context card (L434-453) + Section 13 Academic (L760-775) + Section 18 Doctoral Capstone (L974-993)
**Changes:** 
- **Consolidate all 4 duplicates into ONE authoritative block** at the top
- Merge the best content from each: the brief intro (L212), the full description with research themes (L974-993), the CV/GitHub/Gitea links (L448-451), and the table format (L763-773)
- Single gold-bordered section immediately after the nav
- Remove Sections 13 and 18 entirely (duplicate content)

---

### 3. ECOSYSTEM AT A GLANCE -- Metric Tiles
**Maps from:** Stats Overview (L300-311)
**Changes:** Relocate directly under the academic intro. No content changes needed -- tiles are already live-updated from API.

---

### 4. PLATFORMS -- Deployed + Scaffolded
**Maps from:** Platforms Section 03 (L417-432) + Live Ecosystem Status Section 14 (L779-789)
**Changes:**
- **Merge these two sections** -- S03 has the detailed table (URLs, IPFS domains, Vercel fallbacks); S14 has the card grid with live status dots
- Keep the S03 table as the authoritative view, add live status dots inline
- Remove S14 entirely (duplicate)
- Include the v4 Status Update milestone checklist (L335-353) as a collapsible "Latest Milestone" sub-card within this section

---

### 5. ARCHITECTURE -- Auth, Decentralization, Agents (Consolidated)
**Maps from:** Auth Architecture (L455-480) + Decentralization Layer Section 02 (L368-415) + Agent Gateway Section 05 (L502-526)
**Changes:**
- Group these three related sections under a single "Architecture" header
- Sub-sections: 5a Auth Flow, 5b Decentralization Status, 5c Agent Council (17 agents)
- The auth flow table and decentralization checklist are strong academic evidence -- keep them prominent
- No content changes, just grouping under one conceptual umbrella

---

### 6. INFRASTRUCTURE STATUS -- VPS, DB, GitHub, IPFS
**Maps from:** System Status Section 01 (L355-366) + Live VPS Infrastructure (L313-333) + Database Section 07 (L602-627) + GitHub Section 08 (L629-655) + IPFS Manifest Section 09 (L657-704)
**Changes:**
- Group under single "Infrastructure" header
- Sub-sections: 6a Live VPS (real-time table), 6b System Cards (VPS/API/DB/Security), 6c Database Schema, 6d GitHub Repos, 6e IPFS Manifest
- Move Live VPS table up to be the first sub-section (most dynamic content)
- No content changes within sub-sections

---

### 7. SMART CONTRACTS -- Full Table
**Maps from:** Smart Contracts Section 04 (L482-500)
**Changes:** Keep as-is. Standalone section appropriate for its weight (7 contracts with addresses, purposes, explorer links). Already well-structured.

---

### 8. GAME LIBRARY -- 45 Games by Level
**Maps from:** Wellness Games Section 06 (L528-600)
**Changes:** Keep as-is. The 3-level, 15-game-per-level structure is clean. No changes needed.

---

### 9. OPEN SOURCE PORTFOLIO -- 8 PRs
**Maps from:** Open Source Contributions Section 16 (L806-824) + brief mention in GitHub Section 08 (L651)
**Changes:**
- Promote to standalone section (already is S16, just relocate in page order)
- Remove the one-liner from the GitHub section (L651-652) to avoid duplication
- This is strong academic evidence -- position after games but before operational content

---

### 10. BUSINESS & IP -- Licensing, Revenue, Trademarks, Brand
**Maps from:** Licensing & IP Section 12 (L749-758) + Intellectual Property Section 15 (L791-804) + Brand & Positioning Section 19 (L995-1002)
**Changes:**
- **Consolidate these 3 related sections** into one "Business & IP" section
- Sub-sections: 10a Revenue Model & Pricing, 10b Trademarks & Entity Info, 10c Brand Guides
- Currently scattered across 3 non-adjacent sections (12, 15, 19)

---

### 11. BUILD TRAJECTORY & ROADMAP
**Maps from:** Build Trajectory Section 17 (L826-886) + Funding Requirements Section 17.1 (L888-919)
**Changes:**
- Keep the 4-phase roadmap cards
- Funding Requirements stays as sub-section
- Move Outreach & Revenue Section 11 (L727-747) content here as sub-section "11c Outreach & Milestones" -- these are roadmap items, not standalone section material

---

### 12. PENDING ITEMS & OUTSTANDING WORK
**Maps from:** Outstanding Items Section 10 (L706-725) + Pending Items Section 17.2 (L921-937)
**Changes:**
- **Merge these two sections** -- both track incomplete work
- Sub-sections: 12a Technical Debt (from S10, 9 items) and 12b External Blockers (from S17.2, 10 items)
- Distinguish by actionability: technical debt = things we can fix; external blockers = things we're waiting on

---

### 13. RUNBOOKS (PROTECTED) -- Relocated as Block
**Maps from:** Emergency Restore block (L218-298) + Agent Council Protocol Section 17.5 (L939-972) + PM2/VPS Modals (L171-187)
**Changes:**
- **Relocate Emergency Restore from position 2 (right after For Reviewers) to position 13 (near bottom)**
- This is the biggest structural change -- academic reviewers currently see SSH commands and server IPs before the ecosystem overview
- Group with Agent Council Protocol (already marked INTERNAL)
- Keep the Critical Systems Bar dots at the top (those are status indicators, not runbook content)
- Modals remain as modals (they're hidden by default, triggered on click)
- Consider adding a simple `[Runbooks]` nav link rather than prominent gold border at page top

---

### FOOTER
**Maps from:** Footer (L1004-1010)
**Changes:** Keep as-is. Update inventory snapshot date on implementation.

---

## Summary of Changes

| Action | Count | Details |
|--------|-------|---------|
| Sections consolidated (duplicates merged) | 6 removed | Doctoral x3 merged into 1, Platforms x2 merged into 1, Outstanding+Pending merged |
| Sections relocated | 3 | Emergency Restore moved to bottom, Open Source moved up, Outreach folded into Roadmap |
| Sections grouped under umbrella headers | 2 | Architecture (auth+decentral+agents), Infrastructure (VPS+DB+GitHub+IPFS) |
| New consolidated sections | 1 | Business & IP (Licensing+IP+Brand) |
| Sections kept as-is | 3 | Smart Contracts, Game Library, Footer |
| Container bug fix | 1 | Sections 14-19 moved inside `<div class="container">` |
| Duplicate ID fix | 1 | Two elements with `id="academic"` |

## Current vs. Proposed Section Count

| Metric | Current | Proposed |
|--------|---------|----------|
| Top-level sections | 22 (incl. unnumbered) | 13 + footer |
| Duplicate content blocks | 6 | 0 |
| Sections outside container | 6 | 0 |

---

## Implementation Notes

1. This is a pure HTML reorder -- no JavaScript logic changes needed (all scripts reference IDs, not DOM position)
2. The live-polling scripts (VPS infrastructure, crypto ticker, domain status) are position-independent
3. Agent card rendering via JS array is position-independent
4. Nav links will need href updates to match new section IDs
5. Estimated implementation time: 2-3 hours for reorder + testing

---

*Awaiting Dr. Meg approval before any implementation begins.*

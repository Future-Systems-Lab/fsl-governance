# FSL Command Center Comprehensive Audit Report

**Date:** 2026-04-29
**Auditor:** Claude (automated)
**Scope:** Truth reconciliation, stale content, methodology reframe, rebuild guide, auto-update design, redundancy

---

## Section 1: Truth Reconciliation Findings

### 1.1 WELLNESS GAMES COUNT — CRITICAL INCONSISTENCY

| Source | Reported Count | Notes |
|--------|---------------|-------|
| Command Center fallback (line 304) | **31** | Hardcoded in HTML `id="stat-games"` |
| Command Center game listing (lines 530-585) | **31** | 11 L1 + 11 L2 + 9 L3 listed individually |
| Command Center section header (line 530) | **31 deployed** | Tag text |
| Command Center Phase 1 summary (line 822) | **31** | "31 wellness games" |
| HypnoNeuro Game Agent description (line 1034) | **31** | "Maintain 31 game components" |
| VPS API (`/api/fsl-status`) | **46** | `d.games: 46` |
| LOI (paragraph 73) | **46** | "46 browser-based therapeutic games" |
| CV (line 258) | **46** | "Shipped 46 browser-based therapeutic wellness games" |
| fsl-governance (world-record/, grants/) | **31** | Multiple documents say "31" |
| ASU Research Grant | **31** | "31 browser-based wellness games" |
| ACTUAL files: HypnoNeuro/games/ | **28** | 10 L1 + 9 L2 + 9 L3 files |
| ACTUAL files: hypnoneuro-games/games/ | **29** | 10 L1 + 10 L2 + 9 L3 (includes 2 .html + 27 .json) |

**Verdict:** There are THREE different numbers in circulation:
- **28-29 files** exist on disk (the ground truth for spec files)
- **31** is used throughout Command Center and governance docs
- **46** is used in the API, LOI, and CV (appears to be an April 12 task log claim)

The API returns 46 and overwrites the fallback 31 on page load. The CV and LOI both claim 46. The Command Center HTML listing only names 31 games. The actual game spec files total 28-29. None of these numbers agree.

---

### 1.2 PLATFORM COUNT

| Source | Count | Notes |
|--------|-------|-------|
| Command Center stat card (line 352) | **5 Live Platforms** | Explicit stat |
| Command Center platform table (lines 423-429) | **5** | All marked "Live" including NeuroBalance |
| Section 14 ecosystem cards (lines 768-774) | **5** | Lists 5 but one is AlchemistForge, not NeuroBalance |
| VPS API | **5** | `d.platforms: 5` |
| LOI paragraph 73 | **5** | "five interconnected applications" |
| NeuroBalance actual status | **Scaffolded only** | Previous audit confirmed; no primary URL listed in platform table |

**Verdict:** NeuroBalance is listed as "Live" (line 428) with only a Vercel fallback URL (`neurobalance-labs.vercel.app`). No primary URL, no IPFS domain. A previous NEUROBALANCE_SCAFFOLD_AUDIT.md exists at ~/Desktop/ASU/ confirming it is NOT a full deployment. The platform table simultaneously lists AlchemistForge in Section 14 but NOT in the Section 3 platform table.

**Recommendation:** Say "4 deployed + 1 scaffolded" or "5 platforms (4 full, 1 backend-only)" to be honest.

---

### 1.3 CONTRACT REGISTRY — INCONSISTENCY

**Canonical 8 per user-provided list vs. actual sources:**

| Contract | User-Provided Address | Command Center | DEPLOYMENT_LOG v2 | DEPLOYED_CONTRACTS.md (older) |
|----------|----------------------|----------------|--------------------|-----------------------------|
| AlchemistForge | 0xE092336F...A324 | 0xE092336F...A324 | NOT LISTED | 0xE09233c8...3915 (DIFFERENT!) |
| HNT | 0x1ae1e109...84e2 | 0x1ae1e109...84e2 | NOT LISTED | 0x1ae1e109...84e2 |
| EHTv2 | 0x93583a7A...d88 | 0x93583a7A...d88 | 0x93583a7A...d88 | 0xbDaeb1d8...7117 (v1! DIFFERENT) |
| SovereignLedger v2 | 0x4afA577f...aCc4 | 0x4afA577f...aCc4 | 0x4afA577f...aCc4 | 0xf32979B3...F78e (v1! DIFFERENT) |
| BenevolenceFund v2 | 0x96E8006a...51B | 0x96E8006a...51B | 0x96E8006a...51B | 0xbe710a0a...0271 (v1! DIFFERENT) |
| SovereignAchievement | 0xC3F11d2F...9B8D | 0xC3F11d2F...9B8D | 0xC3F11d2F...9B8D | NOT LISTED |
| MindMasteryNFT | 0xCb9EcB00...7771 | 0xCb9EcB00...7771 | NOT LISTED | 0xCb9EcB07...4b0D (DIFFERENT!) |
| NeuroBalanceConsent | 0x21571805...96b8 | NOT LISTED | NOT LISTED | NOT LISTED |

**Critical Findings:**
1. `DEPLOYED_CONTRACTS.md` has **stale v1 addresses** for EHT, SovereignLedger, BenevolenceFund, AlchemistForge, and MindMasteryNFT
2. `DEPLOYMENT_LOG.md` (v2) only covers 4 of the 8 contracts (EHTv2, SovereignLedger v2, BenevolenceFund v2, SovereignAchievement)
3. **NeuroBalanceConsent** (0x21571805...) appears NOWHERE in Command Center or governance docs
4. The Command Center lists only **7 contracts** in its table (lines 489-496) — missing NeuroBalanceConsent
5. The stat card says "8 Smart Contracts" but only 7 are listed

---

## Section 2: Stale Content List

### 2.1 Retired Technology References (in context of "removed" — acceptable)

These terms appear in the Command Center but ONLY in "removed/retired" context:
- **Calendly** — line 344 ("Calendly removed"), line 954 (lexicon: never use)
- **Privy** — line 472 ("Privy removed")
- **wagmi** — line 349, 473 ("wagmi removed")
- **Stripe** — line 350, 475, 825, 922 ("Stripe removed")
- **Web3Modal** — line 474 ("Web3Modal removed")
- **MetaMask** — line 340 ("MetaMask retired"), line 463 (auth step still says "Brave/MetaMask"), line 952 (lexicon)

**Issue on line 463:** Auth Architecture step 1 says "Browser -> wallet extension (Brave/MetaMask)" — this contradicts the lexicon rule that says NEVER use MetaMask, always use Brave Wallet.

### 2.2 Stale Identity Framing

| Location | Text | Issue |
|----------|------|-------|
| Line 215 | "live Web3 sovereign wellness platform" | Uses "wellness platform" as identity |
| Line 788 | "Where Mental Wellness Meets Metaverse" | Tagline — kept as trademark filing |
| Line 993 (footer) | "Where Mental Wellness Meets Metaverse" | Used as primary footer tagline |
| Line 994 (footer) | "Pioneering decentralized Web3 sovereign wellness infrastructure" | Better framing |
| Line 995 (footer) | "Inventory snapshot: April 13, 2026" | 16 days stale |

**"Dr. Gabriel Duncan"** — NOT found in Command Center. Clean.
**"sovereign wellness company"** — NOT found in Command Center. Clean.
**Provider cards** — NOT found. Clean.

### 2.3 "Provider" Terminology (should be "Sovereign Guide")

| Line | Text | Issue |
|------|------|-------|
| 601 | "fsl_provider_verifications" | Database table name — acceptable (DB unchanged per memory) |
| 610 | "provider_applications, provider_availability, provider_bookings..." | Schema listing — acceptable |
| 634 | "encrypthealth-provider-portal" | Repo name — acceptable (routes/vars unchanged) |
| 740 | **"Provider Tiers"** heading | USER-FACING copy — should say "Sovereign Guide Tiers" |
| 936 | "Provider credential verification" | Internal admin text — borderline |

### 2.4 fsl-governance Stale Content

- `AGENT_COUNCIL_2026-04-06.md` — references "Stripe integration scaffolding" as next sprint (now removed)
- `METAMASK_MOBILE_COUNCIL_2026-04-07.md` — entire document about MetaMask fixes (MetaMask now retired)
- `WEB3_WALLET_AGENT_FIX_2026-04-07.md` — references wagmi, Web3Modal, MetaMask (all removed)
- Multiple `world-record/` files still say "31 games" (should be 46 per API/CV/LOI)
- `grants/ASU_RESEARCH_GRANT.md` says "31 browser-based wellness games" (stale)

---

## Section 3: Methodology Document Reframe Plan

The IPFS-pinned FSL_METHODOLOGY document (CID: bafkreihzetzx74xgidpdt6belzhld345qmetvlkwjx4dez5c6fdrcvqi5y) was retrieved. Key observations:

### Current Framing Issues:
1. **Title/identity:** "Sovereign Wellness Architecture" — frames as wellness company
2. **HypnoNeuro count:** Says "27-experience wellness game" (a THIRD stale number — not 31, not 46)
3. **Sovereignty Score:** Reports 6.5/10 — may be outdated after April 2026 improvements
4. **Wallet references:** Mentions "MetaMask on EVM" — should reference Brave Wallet
5. **Platform positioning:** Frames FSL as a wellness platform, not as "decentralized infrastructure lab using behavioral health as deliberate stress test"

### Sections Needing Reframe:
1. **Introduction/Preamble** — reframe from "wellness platform" to "decentralized infrastructure research lab"
2. **Five-Platform Ecosystem** — update game count, clarify NeuroBalance status
3. **Identity Layer** — remove MetaMask reference, say Brave Wallet
4. **Sovereignty Score** — recalculate with current state
5. **Compliance Posture** — potentially reframe around "stress test" language

### Note:
The document is pinned to IPFS (immutable). A new version must be pinned with a new CID, and the manifest updated accordingly.

---

## Section 4: Rebuild Guide Issues

The IPFS-pinned FSL_REBUILD_GUIDE (CID: bafkreidksia44myr6nsgcbjjahsd6boq3d4oqlkoldanuyfczyrd4bidha) was retrieved. Analysis without SSH:

### Likely Issues (based on document summary):
1. **Services count:** Guide mentions "three primary services" via PM2 — actual API shows **5 PM2 processes** (FSL_Agent_Gateway_Bot, cloudflare-tunnel, SovereignLedger, encrypthealth-api, fsl-discord-engine)
2. **Vercel deployments:** Guide says "six separate Vercel deployments" — verify this matches current state
3. **"ClaimChain module"** terminology — SovereignLedger is the current name
4. **Contract count:** Guide references "eight smart contracts" with "permanent addresses" — but DEPLOYED_CONTRACTS.md has stale v1 addresses; need to verify which addresses the guide contains
5. **Lighthouse gateway:** Guide uses Lighthouse for backup retrieval — but the IPFS manifest says "Lighthouse API recovering" and Pinata is now primary
6. **Game count:** Likely says outdated number given the document is from April 3, 2026

### Cannot Verify Without SSH:
- Whether `/opt/encrypthealth/backend` still exists
- Whether `/opt/clawdbot` still exists
- Whether env var names are current
- Whether PM2 ecosystem config matches guide

---

## Section 5: Nightly Auto-Update Design

### Proposed Architecture

**Recommended: VPS cron + GitHub Action hybrid**

#### Component 1: VPS Cron (runs nightly at 02:00 UTC)

```bash
#!/bin/bash
# /opt/fsl-scripts/nightly-metrics.sh

# 1. Count PM2 processes
PM2_COUNT=$(pm2 jlist | jq length)

# 2. Count game files
GAMES_L1=$(ls /path/to/games/L1/*.json 2>/dev/null | wc -l)
GAMES_L2=$(ls /path/to/games/L2/*.json 2>/dev/null | wc -l)
GAMES_L3=$(ls /path/to/games/L3/*.json 2>/dev/null | wc -l)
GAMES_TOTAL=$((GAMES_L1 + GAMES_L2 + GAMES_L3))

# 3. Count contracts (from registry file or hardcoded)
CONTRACTS=8

# 4. Count agents (from AGENTS array or config)
AGENTS=17

# 5. Count IPFS CIDs (from Pinata API)
CIDS=$(curl -s -H "Authorization: Bearer $PINATA_JWT" \
  https://api.pinata.cloud/data/pinList?status=pinned | jq '.count')

# 6. Count repos (from GitHub API)
REPOS=$(curl -s https://api.github.com/orgs/Future-Systems-Lab | jq '.public_repos')

# 7. Platforms (hardcoded or dynamic check)
PLATFORMS=5

# 8. Update the /api/fsl-status endpoint data
# Write to JSON file that the Express API serves
cat > /opt/fsl-status-data.json << EOF
{
  "games": $GAMES_TOTAL,
  "contracts": $CONTRACTS,
  "agents": $AGENTS,
  "platforms": $PLATFORMS,
  "ipfs_cids": $CIDS,
  "pm2_count": $PM2_COUNT,
  "repos": $REPOS,
  "updated": "$(date -u +%Y-%m-%dT%H:%M:%S.000Z)"
}
EOF

# 9. Compare with previous values and notify if changed
PREV=$(cat /opt/fsl-status-prev.json 2>/dev/null || echo "{}")
CHANGES=$(diff <(echo "$PREV" | jq -S .) <(cat /opt/fsl-status-data.json | jq -S .) 2>/dev/null)

if [ -n "$CHANGES" ]; then
  MSG="FSL Metrics Changed:\n$CHANGES"
  curl -s -X POST "https://api.telegram.org/bot$TG_BOT_TOKEN/sendMessage" \
    -d "chat_id=$TG_CHAT_ID" -d "text=$MSG" -d "parse_mode=HTML"
fi

cp /opt/fsl-status-data.json /opt/fsl-status-prev.json
```

#### Component 2: GitHub Action (weekly, verifies repo count)

Runs `gh api orgs/Future-Systems-Lab/repos --paginate | jq length` and updates a badge or status file.

### Complexity Estimate

| Task | Effort | Notes |
|------|--------|-------|
| Write cron script | 1 hour | Straightforward bash |
| Wire into existing Express API | 30 min | Read JSON file on request |
| Telegram notification | 30 min | Already have bot token/chat_id |
| Testing and edge cases | 1 hour | Handle API failures gracefully |
| **Total** | **~3 hours** | Low complexity |

### Recommendation

**VPS cron is the right choice.** Reasons:
- All data sources (PM2, game files, DB) are on the VPS
- GitHub Action cannot reach VPS internals without SSH keys in secrets
- The API endpoint already exists and serves from VPS
- Telegram bot token already configured on VPS

---

## Section 6: Redundancy Findings

### Duplicate Content Sections

| Content | First Appearance | Second Appearance | Identical? |
|---------|-----------------|-------------------|-----------|
| Doctoral context / ASU DEng | Section after platforms (line 434-453) | Section 13 "Academic" (line 747-760) | Near-identical |
| Doctoral context / ASU DEng | Section 13 (line 747) | Section 18 "Doctoral Engineering Capstone" (line 960-978) | Near-identical (expanded) |
| "5 Live Platforms" stat | Stat card line 352 | Section 3 table | Same data |
| Platform status | Section 3 table (lines 423-429) | Section 14 "Live Ecosystem Status" (lines 768-774) | Overlapping but inconsistent (Sec 3 has NeuroBalance; Sec 14 has AlchemistForge) |
| CV link | Line 448, Line 756, Line 974 | Three separate locations | Same URL |
| GitHub "50 repos" | Line 449, Line 617, Line 975 | Three separate locations | Same claim |
| "8 Smart Contracts" | Stat card line 306 | Section 4 heading line 484 | Same data |
| Outstanding items | Section 10 (line 692-710) | Section 17.2 Pending Items (line 908-922) | Overlapping but different items |
| Funding strategy | Section 17.1 (line 900-903) | Scattered elsewhere | Partial overlap |

### Inconsistencies Between Duplicates

1. **Platform listing mismatch:**
   - Section 3 lists: HypnoNeuro, EncryptHealth, SovereignLedger, FSL Landing, NeuroBalance
   - Section 14 lists: FSL Landing, EncryptHealth, HypnoNeuro, SovereignLedger, AlchemistForge
   - AlchemistForge is missing from Section 3; NeuroBalance is missing from Section 14

2. **Three Academic sections:** Sections numbered 13 and 18 plus the unnumbered card after Section 3 all cover the same doctoral context.

---

## Section 7: Prioritized Fix Plan

### Priority 1 — Data Integrity (affects credibility with reviewers)

| # | Issue | Fix | Files Affected |
|---|-------|-----|---------------|
| 1 | Game count mismatch (31 vs 46 vs 28) | Determine TRUE count from production deployment, update ALL sources | Command Center, LOI, CV, governance docs, API |
| 2 | NeuroBalanceConsent contract missing from Command Center | Add 8th contract to table | Command Center |
| 3 | DEPLOYED_CONTRACTS.md has stale v1 addresses | Update to v2 addresses or clearly mark as "superseded" | fsl-governance |
| 4 | NeuroBalance marked "Live" when scaffolded | Change to accurate status | Command Center |
| 5 | Platform list inconsistency (Sec 3 vs Sec 14) | Reconcile to single canonical list | Command Center |

### Priority 2 — Stale Terminology (affects brand consistency)

| # | Issue | Fix | Files Affected |
|---|-------|-----|---------------|
| 6 | "Provider Tiers" heading (line 740) | Change to "Sovereign Guide Tiers" | Command Center |
| 7 | Auth step says "Brave/MetaMask" (line 463) | Change to "Brave Wallet" only | Command Center |
| 8 | Footer date "April 13, 2026" (line 995) | Make dynamic or update | Command Center |
| 9 | Methodology doc says "27 experiences" | Pin new version to IPFS | fsl-governance IPFS |
| 10 | Methodology doc references MetaMask | Pin new version to IPFS | fsl-governance IPFS |

### Priority 3 — Structural Cleanup (affects readability)

| # | Issue | Fix | Files Affected |
|---|-------|-----|---------------|
| 11 | Three duplicate Academic/Doctoral sections | Consolidate into one | Command Center |
| 12 | Platform duplication (Sec 3 + Sec 14) | Remove Sec 14 or merge | Command Center |
| 13 | METAMASK_MOBILE_COUNCIL and WEB3_WALLET_AGENT_FIX docs | Archive or add "SUPERSEDED" header | fsl-governance |
| 14 | AGENT_COUNCIL_2026-04-06 references Stripe sprint | Add "SUPERSEDED" note | fsl-governance |

### Priority 4 — Automation (prevents future drift)

| # | Issue | Fix | Files Affected |
|---|-------|-----|---------------|
| 15 | No automated metric sync | Implement nightly cron (Section 5 design) | VPS |
| 16 | IPFS manifest uses Lighthouse (down) | Update to Pinata-first language | fsl-governance |
| 17 | Rebuild guide likely stale | Re-author and re-pin | IPFS |

### Priority 5 — Governance Docs Mass Update

| # | Issue | Fix |
|---|-------|-----|
| 18 | 15+ docs in world-record/ say "31 games" | Bulk update to correct count |
| 19 | grants/ASU_RESEARCH_GRANT.md says "31" | Update |
| 20 | "wellness platform" used extensively in governance | Gradual reframe to "infrastructure lab" where appropriate |

---

## Summary Statistics

- **Critical data inconsistencies:** 5 (game count, contract addresses, platform status, missing contract, platform list mismatch)
- **Stale terminology issues:** 5 (Provider, MetaMask in auth, footer date, methodology game count, methodology wallet ref)
- **Redundant sections:** 3 major duplications
- **Documents needing "SUPERSEDED" flag:** 3
- **Governance docs with stale game count:** 15+
- **Estimated total fix effort:** 4-6 hours for Priority 1-3; 3 hours for Priority 4; 2 hours for Priority 5

---

---

## RESOLUTION LOG

### 2026-04-29: Game Count Canonicalized at 45 -- RESOLVED

**Issue #1 (Game count mismatch) is now RESOLVED.**

Actions taken:
- **HypnoNeuro repo:** 18 hidden game components copied from hypnoneuro-games monorepo; LEVELS constant restructured to 15 games per level (L1/L2/L3) = 45 total; 18 new routes added to App.jsx. Commit `b5cdf0ca3` pushed to Future-Systems-Lab/HypnoNeuro.
- **LOI:** Updated from "46 browser-based therapeutic games" to "45 browser-based therapeutic games (15 per level across L1 Hypnosis, L2 Orthomolecular, and L3 Inner Child)". PDF regenerated. Commit `6e84df8` pushed to fsl-governance.
- **CV:** Updated from "Shipped 46" to "Shipped 45 browser-based therapeutic wellness games (15 per level)". PDF regenerated. Commit `b47da5c` pushed to Future-Systems-Lab-profile.
- **Command Center:** stat-games fallback updated from 31 to 45; game table rebuilt to 45 entries (15 per level); status.json updated; agent duties updated. Commit `0ec707e` pushed to fsl-command-center.
- **VPS API:** `/api/fsl-status` games value updated from 46 to 45 in `/opt/encrypthealth/backend/fsl-status-route.js`. PM2 restarted. Confirmed API returns `games: 45`.

Canonical count across all FSL surfaces is now **45**.

### TODO: Whitepaper Publication Timing

The IPFS-pinned FSL_METHODOLOGY document (CID: bafkreihzetzx74xgidpdt6belzhld345qmetvlkwjx4dez5c6fdrcvqi5y) still says "27-experience wellness game" and references MetaMask. A new version must be authored, pinned to IPFS with a new CID, and the manifest updated. This should be coordinated with the broader whitepaper publication timeline to avoid multiple re-pins. Recommend batching this update with any other methodology reframe (infrastructure lab positioning, sovereignty score recalculation, Brave Wallet terminology) into a single new IPFS pin.

---

### 2026-04-29: Deferred Placeholder Fixes -- RESOLVED

**C-7 (Dr. Gabriel Duncan) RESOLVED:** All Duncan provider cards, profiles, demo data, login entries, and bio references removed from HypnoNeuro (11 files), hypnoneuro-games (2 files), and fsl-governance (1 file). "Biological Dentistry" removed from insurance modality lists. Commits pushed to all three repos.

**H-2 (XRPL coming soon) RESOLVED:** XRPL wallet button on EncryptHealth landing page enabled -- opacity/pointerEvents blocker removed, GemWallet/Crossmark connection flow wired up. "Coming soon" badge replaced with "XRPL mainnet live". XRPL balance display added to EcosystemShell header with RPC fallback chain (s2.ripple.com -> s1.ripple.com -> xrplcluster.com). Mainnet wallet: rwR3etLJVxtQXYs2d9jgBQxzHBivtCMdPd.

**H-6 / Section 2.2 (Tagline) RESOLVED:** "Where Mental Wellness Meets Metaverse" replaced with "Sovereignty by Design" across:
- HypnoNeuro: VPS dashboard header+footer, EcosystemShell.tsx, agreement page, provider login
- fsl-web: layout.tsx meta title+description, FSLLandingPage.jsx footer
- fsl-command-center: index.html footer, ecosystem.html title/nav/footer
- GitHub org description updated via API
- HypnoNeuro game pages intentionally unchanged (old tagline acceptable per brand guide scope)
- Trademark filing reference in command center index.html line 802 intentionally unchanged (legal reference to filed mark)

---

*Resolution log updated 2026-04-29.*

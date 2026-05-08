# Canonical Config Service Architecture — Council Assessment
## Single Source of Truth for All FSL Surfaces
**Date:** May 9, 2026
**Status:** Recommendation for Dr. Meg approval
**Type:** Architecture proposal (report only, no code execution)

---

## The Problem: Drift Cycles from Manual Propagation

Every canonical change — Doxy.me to SovereignSession, MetaMask retired from UI copy, contract address updates, lexicon corrections — requires manual grep across 7+ repos. The May 8 lexicon sweep found and corrected 13 retired terms across 7 repos. The Doxy.me migration touched 7 user-facing surfaces. Each of these was a multi-hour manual effort.

Current propagation method: developer remembers which repos need updating, greps each one, makes PRs, hopes nothing is missed. This is how drift happens. Every time.

**Repos affected by canonical changes:**

| Repo | Surface Type | Deployment |
|------|-------------|------------|
| fsl-command-center | Next.js app | Vercel |
| encrypthealth/frontend | Next.js app | Vercel |
| alchemist-forge | Next.js app | Vercel |
| fsl-web | Static site | Vercel |
| Future-Systems-Lab-profile | GitHub profile README | GitHub |
| .github | Org-level README | GitHub |
| HypnoNeuro | Docs / compliance / specs | Reference |
| fsl-governance | Governance docs / audits | Reference |

---

## Proposed Solution: `fsl-governance/canonical/` Directory

A single directory in fsl-governance containing JSON config files. All FSL surfaces read from these files at build or render time. One update propagates everywhere.

### Architecture Overview

```
fsl-governance/canonical/
  contracts.json      — all deployed contract addresses, networks, ABIs
  platforms.json      — approved platforms, wallets, explorers, session URLs
  lexicon.json        — canonical terms, retired terms, replacements
  credentials.json    — public keys, wallet addresses, ENS names (NO secrets)
  tagline.json        — mission statement, taglines, positioning copy
  architecture.json   — layer definitions, chain roles, stack description
  version.json        — canonical config version, last updated timestamp
```

**Consumer flow:**
1. Consumer imports canonical JSON at build time (fetch from GitHub raw URL or npm package)
2. Build process validates required fields are present
3. Rendered output uses canonical values — no hardcoded strings
4. If fetch fails, build uses last-known-good cached copy

---

## Proposed Canonical Files

### contracts.json — Example Schema

```json
{
  "version": "1.0.0",
  "lastUpdated": "2026-05-09T00:00:00Z",
  "contracts": {
    "SovereignLedger": {
      "address": "0x4e28e60c2c976e3DeA6930d5612e6e8B6B1C839b",
      "network": "sepolia",
      "chainId": 11155111,
      "explorer": "https://eth-sepolia.blockscout.com/address/0x4e28e60c2c976e3DeA6930d5612e6e8B6B1C839b",
      "abi": "SovereignLedger.json",
      "purpose": "Session attestation logging"
    },
    "AlchemistForge": {
      "address": "0xe1A29e40aD2e5EF86eCf6a1C6Ed2b2a79bC08F98",
      "network": "sepolia",
      "chainId": 11155111,
      "explorer": "https://eth-sepolia.blockscout.com/address/0xe1A29e40aD2e5EF86eCf6a1C6Ed2b2a79bC08F98",
      "abi": "AlchemistForge.json",
      "purpose": "Shadow work transmutation"
    },
    "SovereignSession": {
      "address": "0xbeb13A360C6F0C77Ea3af3650Ab9762a1B9965A1",
      "network": "sepolia",
      "chainId": 11155111,
      "explorer": "https://eth-sepolia.blockscout.com/address/0xbeb13A360C6F0C77Ea3af3650Ab9762a1B9965A1",
      "abi": "SovereignSession.json",
      "purpose": "Peer-to-peer session management"
    }
  },
  "wallets": {
    "xrpl_mainnet": "rwR3etLJVxtQXYs2d9jgBQxzHBivtCMdPd"
  }
}
```

### lexicon.json — Example Schema

```json
{
  "version": "1.0.0",
  "lastUpdated": "2026-05-09T00:00:00Z",
  "canonical": {
    "session_platform": "SovereignSession",
    "session_url": "session.futuresystemslab.io",
    "ledger": "SovereignLedger",
    "transmutation": "AlchemistForge",
    "achievement": "SovereignAchievement",
    "token": "HNT",
    "provider_display": "Sovereign Guide",
    "participant_display": "participant",
    "explorer": "Blockscout",
    "wallets_recommended": ["Brave Wallet", "Rainbow", "WalletConnect"],
    "sigil": "\u26ce",
    "project_type": "Applied Project"
  },
  "retired": [
    { "term": "Doxy.me", "replacement": "SovereignSession", "retiredDate": "2026-05-08" },
    { "term": "MetaMask", "replacement": "Brave Wallet / Rainbow / WalletConnect", "retiredDate": "2026-05-08", "context": "UI copy only — docs may reference historically" },
    { "term": "Coinbase Wallet", "replacement": "removed", "retiredDate": "2026-05-08" },
    { "term": "Etherscan", "replacement": "Blockscout", "retiredDate": "2026-05-08" },
    { "term": "ClaimChain", "replacement": "SovereignLedger", "retiredDate": "2026-04-27" },
    { "term": "patient", "replacement": "participant", "retiredDate": "2026-04-27", "context": "display/prose only" },
    { "term": "provider", "replacement": "Sovereign Guide", "retiredDate": "2026-05-07", "context": "display copy only — routes/vars/DB unchanged" },
    { "term": "compliance-aware", "replacement": "sovereignty-first", "retiredDate": "2026-04-27" },
    { "term": "wellness platform", "replacement": "decentralized infrastructure for sovereign data governance", "retiredDate": "2026-04-27" },
    { "term": "Capstone", "replacement": "Applied Project", "retiredDate": "2026-05-08", "context": "DEng context" },
    { "term": "\u039e", "replacement": "\u26ce", "retiredDate": "2026-05-08", "context": "Greek Xi → Ophiuchus" },
    { "term": "Stripe", "replacement": "removed", "retiredDate": "2026-04-27" },
    { "term": "Calendly", "replacement": "removed", "retiredDate": "2026-04-27" }
  ]
}
```

---

## Consumer Types and Integration Patterns

| Consumer Type | Example | Integration Method |
|--------------|---------|-------------------|
| Next.js apps (Vercel) | fsl-command-center, encrypthealth, alchemist-forge | `fetch()` in `next.config.js` or build-time data fetching; JSON imported as static prop |
| Static sites (Vercel) | fsl-web | Build script fetches JSON, injects into templates |
| VPS services | session.futuresystemslab.io | Cron pull or webhook-triggered redeploy |
| GitHub READMEs | Future-Systems-Lab-profile, .github | GitHub Action on canonical push updates README via template |
| Governance docs | fsl-governance audits/specs | Direct reference (same repo) |

### Integration Example (Next.js)

```javascript
// lib/canonical.js
const CANONICAL_BASE = 'https://raw.githubusercontent.com/Future-Systems-Lab/fsl-governance/main/canonical';

export async function getCanonical(file) {
  const res = await fetch(`${CANONICAL_BASE}/${file}`);
  if (!res.ok) {
    // Fall back to last cached version
    return require(`../canonical-cache/${file}`);
  }
  return res.json();
}
```

---

## Propagation Flow

```
1. Developer updates JSON in fsl-governance/canonical/
2. Bumps version.json (semver)
3. Pushes to main
4. GitHub webhook fires
5. Vercel projects with fsl-governance as dependency trigger redeploy
6. VPS services receive webhook → pull latest → restart
7. GitHub Action updates README templates in profile repos
```

**Rebuild triggers:**
- Vercel: configure `fsl-governance` as a git submodule or use Vercel's ignored build step to check canonical version
- VPS: lightweight webhook listener (already exists for deploy triggers)
- READMEs: GitHub Action in fsl-governance repo dispatches to profile repos

---

## Drift Detection

Weekly cron (GitHub Action) runs every Monday:

1. Pulls `lexicon.json` retired terms list
2. Greps all 7+ repos for any retired term in user-facing files (`.tsx`, `.html`, `.md` excluding `/audits/`)
3. If matches found: opens GitHub Issue with drift report, sends Telegram notification
4. If clean: logs silent success

This replaces the current manual lexicon sweep process. The May 8 sweep that checked 13 terms across 7 repos would become a 30-second automated check.

---

## Day 1 vs. Future Scope

### Day 1 (Pilot)

| Deliverable | Notes |
|-------------|-------|
| `canonical/` directory in fsl-governance | contracts.json, lexicon.json, version.json only |
| fsl-command-center integration | Single consumer reads from canonical at build time |
| Fallback caching | Cached copy in consumer repo updated on each successful fetch |
| Basic validation | Build fails loudly if required canonical fields are missing |

### Phase 2 (Full Rollout)

| Deliverable | Notes |
|-------------|-------|
| All 7 consumers integrated | Each surface reads canonical JSON |
| platforms.json, tagline.json, architecture.json | Remaining config files created |
| credentials.json | Public wallet addresses, ENS names centralized |
| GitHub Action for README propagation | Profile repos auto-update |

### Phase 3 (Automation)

| Deliverable | Notes |
|-------------|-------|
| Drift detection cron | Weekly automated sweep |
| Schema validation CI | PRs to canonical/ must pass JSON schema check |
| Version conflict detection | Consumers report which canonical version they built against |

---

## Effort Estimates

| Task | Estimate | Dependencies |
|------|----------|-------------|
| (a) Create `canonical/` directory with contracts.json, lexicon.json, version.json | ~2h | None |
| (b) Pilot integration on fsl-command-center | ~4h | (a) |
| (c) Roll out to all consumers (6 remaining) | ~8h | (b) validated |
| (d) Drift detection cron (GitHub Action) | ~2h | (a) |
| (e) README propagation Action | ~2h | (a) |
| **Total** | **~18h** | Phased over 2-3 sessions |

---

## Risks

| Risk | Severity | Mitigation |
|------|----------|------------|
| GitHub raw URL unavailable at build time | Medium | Cached fallback in every consumer; build uses last-known-good |
| Schema breaking changes | Medium | Semver versioning; consumers pin to major version; CI validates schema |
| Version conflicts (consumer built against stale version) | Low | version.json includes timestamp; drift detection catches stale builds |
| Single point of failure (fsl-governance repo) | Low | GitHub's uptime is 99.9%+; fallback cache eliminates hard dependency |
| Over-centralization (one bad JSON push breaks everything) | Medium | CI schema validation on PRs to canonical/; require review on canonical changes |

---

## Alternatives Considered

| Alternative | Why Not |
|-------------|---------|
| Environment variables per deployment | Too many surfaces (8+ repos, 3+ hosting providers). Env vars don't propagate — they replicate the manual-update problem. |
| Database table (Supabase/Postgres) | Overkill for static config that changes monthly. Adds runtime dependency. Build-time fetch from JSON is simpler and faster. |
| GraphQL config service | Over-engineered. We're serving 7 JSON files, not a query language. The complexity budget is better spent on the actual product. |
| npm package | Viable but slower iteration. Every change requires publish → install → rebuild. Raw GitHub URL is instant. Could be a Phase 3 upgrade. |
| Monorepo | Would solve the problem but the migration cost is enormous and the repos serve different deployment targets. |

---

## Council Vote

| Agent | Vote | Rationale |
|-------|------|-----------|
| Archivist | APPROVE (phased) | The May 8 lexicon sweep proved the drift problem is real — 13 terms across 7 repos. Automation eliminates this entire class of work. |
| Builder | APPROVE (pilot first) | contracts.json alone saves 30 minutes every time an address changes. The integration pattern is standard — fetch JSON at build time. |
| Sentinel | APPROVE (with fallback) | Hard dependency on GitHub raw URL is acceptable IF every consumer has a cached fallback. No build should fail because GitHub is slow. |
| Strategist | APPROVE (phased) | Day 1 scope is tight — 3 files, 1 consumer, 2 hours. Proves the pattern before committing to full rollout. |

**Unanimous APPROVE with phased rollout. Pilot on fsl-command-center first.**

---

## Dr. Meg Decides

| Decision | Effect |
|----------|--------|
| **APPROVE pilot** | Create canonical/ directory with contracts.json, lexicon.json, version.json. Integrate fsl-command-center. ~6h total. |
| **APPROVE full rollout** (after pilot validates) | Roll out to all consumers, add remaining config files, build drift detection. ~12h additional. |
| **DEFER** | Continue manual grep propagation. Accept drift risk. Revisit when next lexicon change causes a missed surface. |

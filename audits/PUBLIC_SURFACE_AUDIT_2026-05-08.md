# Public Surface Audit
## What Reviewers See + Repo Visibility Assessment
**Date:** May 8, 2026
**Auditor:** Claude Opus 4.6 (1M context)

---

## 1. Future-Systems-Lab/.github/profile/README.md

**Status:** VERIFIED CORRECT

- Repo is PUBLIC (required for org README to display)
- `profile/README.md` exists at correct path
- Content matches canonical six-layer thesis
- "Sovereignty by Design" tagline present
- 9 contracts badge in header
- Key Repositories section: 5 public repos only (no private links)
- Deployed Platforms section: hypnoneuro.io, encrypthealth.io, sovereignledger.io
- Pre-publication access note present
- Link to /reviewer evidence portfolio
- Link to CV
- Contact: future.systems.lab@proton.me
- No broken links to private repos

**Incognito verification:** Org README renders at top of github.com/Future-Systems-Lab. Six-layer thesis, curated repos, deployed platforms all visible.

---

## 2. Future-Systems-Lab-profile Repo

**Status:** CLEAN — contains only CV assets

| File | Purpose | Safe to be public? |
|------|---------|-------------------|
| CV_MegMontanezDavenport.html | CV source (GitHub Pages) | YES — public document |
| CV_MegMontanezDavenport.pdf | CV PDF | YES — public document |
| index.html | GitHub Pages landing | YES |
| README.md | Org profile + ecosystem overview | YES — reviewed this session |
| SECURITY.md | Security policy | YES — standard open source |

**No operational docs, no governance materials, no private references.**

---

## 3. /reviewer Page (fsl-command-center.vercel.app/reviewer.html)

**Status:** CLEAN — no private repo links remaining

- All GitHub links point to public repos only (fsl-governance, alchemist-forge)
- Deployed platform URLs used for HypnoNeuro/EncryptHealth/SovereignLedger
- Contract addresses link to Blockscout (public chain data)
- CV links to GitHub Pages (public)
- World Record Evidence row removed (per Dr. Meg's prior decision)

---

## 4. Command Center Dashboard (fsl-command-center.vercel.app)

**Status:** CLEAN — updated this session

- "Public Repos" row: 5 public repos only
- "Deployed" row: 3 platform URLs
- No private repo links in Key Repos section

---

## 5. Public Repo Justification Audit

### Must remain PUBLIC (functional requirement)

| Repo | Justification |
|------|--------------|
| **.github** | Org profile README display (GitHub requirement) |
| **Future-Systems-Lab-profile** | GitHub Pages CV hosting (Pages requires public repo) |
| **future-systems-lab.github.io** | GitHub Pages root |

### Recommended PUBLIC (reviewer evidence / OSS contributions)

| Repo | Justification | Sensitive content? |
|------|--------------|-------------------|
| **fsl-governance** | Reviewer-linked academic artifacts, specs, contract source | SEE SECTION 6 |
| **alchemist-forge** | Deployed dApp, public case study, MIT licensed | No |
| **mental-health-on-chain** | Public case study series, deployed contracts | No |
| **open-source-portfolio** | Links to upstream public PRs | No |

### Recommended REVIEW (may not need to be public)

| Repo | Current | Assessment |
|------|---------|-----------|
| **fsl-command-center** | PUBLIC | Source contains wallet auth logic, admin whitelist address, dashboard data URLs. Deployed via Vercel. Source doesn't need to be public — deployment URL is the public surface. **Recommend: MAKE PRIVATE** |
| **fsl-web** | PUBLIC | Landing page source. Low sensitivity but no reviewer need. **Recommend: MAKE PRIVATE** |
| **secure-health-login** | PUBLIC | Legacy wallet auth demo. Referenced from org README previously. **Recommend: MAKE PRIVATE or archive** |
| **encrypthealth-open-source** | PUBLIC | Schema + ERD. Possibly useful for reviewers. **Recommend: KEEP or archive** |

### Should be PRIVATE (no justification for public)

| Repo | Current | Assessment |
|------|---------|-----------|
| **anonymous-therapy-prototype** | PUBLIC | Archived, historical. No reviewer value. **Recommend: MAKE PRIVATE** |
| **CBD-Continuum-Retail** | PUBLIC | Archived retail case study. **Recommend: MAKE PRIVATE** |
| **arch-spec** | PUBLIC | Unknown content. **Recommend: REVIEW then MAKE PRIVATE** |
| **autonomous-governance-dao** | PUBLIC | Unknown content. **Recommend: REVIEW then MAKE PRIVATE** |
| **declaration** | PUBLIC | Unknown content. **Recommend: REVIEW then MAKE PRIVATE** |
| **org-inventory-and-showcase** | PUBLIC | Old inventory. **Recommend: MAKE PRIVATE** |
| **remix-contract-backups** | PUBLIC | Contract backups. **Recommend: MAKE PRIVATE** |
| **tokenomics-patient-consistency** | PUBLIC | Uses "patient" (retired term). **Recommend: MAKE PRIVATE** |
| **mydata-did-consent** | PUBLIC | DID reference. Low value. **Recommend: MAKE PRIVATE** |

### OSS Forks (public, expected — leave as-is)

These are forks of public upstream repos for FSL's OSS contributions. All public, all appropriate.

| Repo | Upstream |
|------|----------|
| aries-vcr, fabric, fabex | Hyperledger |
| openmrs-module-fhir2, openmrs-core, openmrs-contrib-fhir2-ig | OpenMRS |
| openzeppelin-contracts | OpenZeppelin |
| presentation-exchange | DIF |
| EIPs | Ethereum |
| v3-core | Uniswap |
| balancer-v2-monorepo | Balancer |
| bigchaindb | BigchainDB |
| Others: cosmos-sdk, ehrbase, medblocks-ui, panacea-core, smart-contract-best-practices, spellbook, synthea, tag-security, zkreference, blockchain-explorer | Various references |

### Duplicate Forks (noise cleanup)

9 repos with `-1` or `-2` suffix are duplicate forks. Recommend deletion.

---

## 6. fsl-governance — Council Assessment

**Question:** Should fsl-governance stay public or split?

### Content appropriate for public reviewer access:
- `academic/` — LOI, BHTY paper draft, methodology
- `contracts/` — Solidity source, ABIs, deployment logs
- `specs/` — Architecture specs, privacy spec, wallet support
- `compliance/` — Lexicon guide, regulatory positioning
- `DECENTRALIZATION_ROADMAP.md`
- `CV_MegMontanezDavenport.pdf`
- `README.md`

### Content that should NOT be public:
- `security/CREDENTIAL_DEPENDENCY_MAP.md` — Maps every credential to every service (no values exposed, but reveals infrastructure topology)
- `security/SECURITY_INCIDENTS.md` — Incident log (reveals past vulnerabilities)
- `security/ROTATION_RUNBOOK.md` — Credential rotation procedures
- `security/DEPLOYER_WALLET_AUDIT.md` — Wallet audit details
- `runbooks/REVIEWER_FAUCET_SETUP.md` — VPS SSH commands, wallet setup procedures
- `agendas/DEFERRED_BACKLOG.md` — Internal operational backlog
- `world-record/` — Guinness content (Dr. Meg: private until post-acceptance)
- `dashboard-data/` — JSON data files with agent roster, outreach details

### Council Recommendation: SPLIT

**Option A (recommended):** Split into two repos:
- `fsl-governance` → MAKE PRIVATE (operational, security, internal)
- `fsl-research` → NEW PUBLIC repo (academic artifacts, specs, contract source, roadmap)

**Option B (faster, lower risk):** Keep fsl-governance public but move sensitive files to a private `fsl-internal` repo. Risk: git history may contain sensitive content even if files are moved.

**Option C (simplest, Dr. Meg's current posture):** Make fsl-governance PRIVATE. Update /reviewer links to point to raw file URLs served via a different mechanism (IPFS pins, or direct file downloads from VPS). This breaks existing reviewer links but is the safest option.

### Specific risk in current state:
The `security/` directory exposes infrastructure topology (which services depend on which credentials, VPS paths, SSH patterns). No actual secrets are exposed, but this is useful reconnaissance for an attacker. This is the strongest argument for making fsl-governance private.

---

## 7. Summary of Dr. Meg Decisions Needed

| # | Decision | Urgency |
|---|----------|---------|
| 1 | Make fsl-command-center PRIVATE? (source not needed public, deployed URL is the surface) | Medium |
| 2 | Make fsl-governance PRIVATE or SPLIT? (security/ dir exposes infra topology) | **High** |
| 3 | Archive/privatize 9 unnecessary public repos? (anonymous-therapy-prototype, CBD-Continuum, etc.) | Low |
| 4 | Delete 9 duplicate forks? (-1, -2 suffix repos) | Low |
| 5 | Pin 8 repos (manual GitHub UI action) | Low |

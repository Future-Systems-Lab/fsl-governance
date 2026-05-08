# Repository Visibility Audit
## Future-Systems-Lab GitHub Organization
**Date:** May 8, 2026
**Auditor:** Claude Opus 4.6 (1M context)
**Total repos:** 80 (37 public, 31 private, 12 forks)

---

## Critical Findings

### FINDING 1: Key repos referenced on /reviewer are PRIVATE
The curated Key Repositories list (Command Center, /reviewer, org README) links to repos reviewers cannot access:

| Repo | Current | On /reviewer? | Issue |
|------|---------|--------------|-------|
| **HypnoNeuro** | PRIVATE | Yes (Key Repos) | Reviewers get 404 |
| **EncryptHealth** | PRIVATE | Yes (Key Repos) | Reviewers get 404 |
| **SovereignLedger** | PRIVATE | Yes (Key Repos) | Reviewers get 404 |

**Recommendation:** Either make these public or remove from curated list and note "private — available on request." Dr. Meg decision required.

### FINDING 2: "tokenomics-patient-consistency" uses retired term
Public repo name contains "patient" — contradicts FSL lexicon (participant).
**Recommendation:** Archive or rename.

---

## Full Audit Table

### Core FSL Repos (decision needed)

| Repo | Current | Recommended | Reason |
|------|---------|------------|--------|
| fsl-governance | PUBLIC | PUBLIC | Governance artifacts, specs, academic — reviewer-critical |
| fsl-command-center | PUBLIC | PUBLIC | Dashboard + reviewer surface |
| alchemist-forge | PUBLIC | PUBLIC | Deployed contract, public case study |
| mental-health-on-chain | PUBLIC | PUBLIC | Public awareness series |
| open-source-portfolio | PUBLIC | PUBLIC | OSS contribution evidence |
| fsl-web | PUBLIC | PUBLIC | Landing page |
| .github | PUBLIC | PUBLIC | Org profile README |
| Future-Systems-Lab-profile | PUBLIC | PUBLIC | CV, GitHub Pages |
| **HypnoNeuro** | PRIVATE | DR. MEG DECIDES | Contains 45 games, frontend — IP concern vs reviewer access |
| **EncryptHealth** | PRIVATE | DR. MEG DECIDES | Contains consent architecture — IP concern vs reviewer access |
| **SovereignLedger** | PRIVATE | DR. MEG DECIDES | Session attestation backend — IP concern vs reviewer access |
| NeuroBalance-Watch | PRIVATE | PRIVATE | Hardware prototype, pre-release |
| backup-archive | PRIVATE | PRIVATE | Contains backup data |
| ip-proof | PRIVATE | PRIVATE | IP protection documents |

### Archived/Historical (no action needed)

| Repo | Current | Recommended | Reason |
|------|---------|------------|--------|
| anonymous-therapy-prototype | PUBLIC | PUBLIC (archived) | Historical, clearly labeled |
| CBD-Continuum-Retail | PUBLIC | PUBLIC (archived) | Historical case study |
| Where-Mental-Wellness-Meets-Metaverse | PRIVATE | PRIVATE | Legacy name, superseded |
| declaration | PUBLIC | REVIEW | Unknown purpose — check content |

### Internal/Lab Repos (correct as private)

| Repo | Current | Notes |
|------|---------|-------|
| encrypthealth-db | PRIVATE | Database schemas |
| encrypthealth-inner-child-labs | PRIVATE | Lab experiments |
| encrypthealth-neurobalance-labs | PRIVATE | Lab experiments |
| encrypthealth-ortho-labs | PRIVATE | Lab experiments |
| encrypthealth-provider-portal | PRIVATE | Sovereign Guide portal |
| EncryptHealthToken | PRIVATE | Token contract source |
| HypnoNeuro-Core | PRIVATE | Core game engine |
| hypnoneuro-games | PRIVATE | Game implementations |
| hypnoneuro-mind-loop | PRIVATE | Game module |
| hypnoneuro-omop-etl | PRIVATE | ETL pipeline |
| HypnoNeuroToken | PRIVATE | Token contract source |
| InnerChild-Healing-System | PRIVATE | Lab module |
| InstaPsych | PRIVATE | Prototype |
| Orthomolecular-Dashboard | PRIVATE | Dashboard |
| Orthomolecular-MVP | PRIVATE | MVP |
| Orthomolecular-MVP-web | PRIVATE | Web frontend |
| fsl-engagement-research | PRIVATE | Research data |
| gabapentin-pharmacovigilance | PRIVATE | Clinical research |
| future-systems-mental-wellness | PRIVATE | Legacy |
| dental-diagnostic-systems-architecture | PRIVATE | Dental (suppressed) |
| wireless-dental-imaging-case-study | PRIVATE | Dental (suppressed) |
| decentralized-education-data-provenance | PRIVATE | Education research |
| Future-Systems-Lab | PRIVATE | Org config |

### OSS Forks (public, expected)

| Repo | Fork of | Notes |
|------|---------|-------|
| aries-vcr | hyperledger | DID reference |
| fabric | hyperledger | OSS contribution |
| openmrs-module-fhir2 | openmrs | OSS contribution |
| openzeppelin-contracts | OpenZeppelin | OSS contribution |
| presentation-exchange | DIF | OSS contribution |
| EIPs | ethereum | OSS contribution |
| v3-core | Uniswap | OSS contribution |
| balancer-v2-monorepo | balancer | OSS contribution |
| bigchaindb | bigchaindb | OSS contribution |

### Duplicate Forks (noise — consider cleanup)

| Repo | Issue |
|------|-------|
| balancer-v2-monorepo-1 | Duplicate fork |
| bigchaindb-1 | Duplicate fork |
| blockchain-explorer-1, -2 | Duplicate forks |
| EIPs-1 | Duplicate fork |
| openmrs-module-fhir2-1 | Duplicate fork |
| openzeppelin-contracts-1 | Duplicate fork |
| presentation-exchange-1 | Duplicate fork |
| v3-core-1 | Duplicate fork |

**Recommendation:** Delete duplicate forks (the `-1`, `-2` variants). They clutter the org page and provide no value. Only keep the original forks used for OSS contributions.

### Lexicon Issues in Public Repo Names

| Repo | Issue |
|------|-------|
| tokenomics-patient-consistency | "patient" in name — retired term |
| secure-health-login | Fine — no lexicon violation |
| encrypthealth-open-source | Fine |

---

## Security Check

- No credentials found in public repo names
- fsl-governance is public — contains specs, audits, academic artifacts (appropriate)
- world-record directory is public in fsl-governance (Guinness content) — already flagged, /reviewer link removed
- No .env files in public repos (verified via prior security sweeps)

---

## Dr. Meg Decisions Needed

1. **HypnoNeuro / EncryptHealth / SovereignLedger visibility** — make public for reviewers, or remove from Key Repos list?
2. **Duplicate forks cleanup** — delete the 9 `-1`/`-2` variant repos?
3. **tokenomics-patient-consistency** — archive or rename?
4. **declaration** repo — what is it? Keep or archive?
5. **Pin repos** — manual action at https://github.com/orgs/Future-Systems-Lab/repositories (Customize pins button)

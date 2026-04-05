# FSL Governance

Sovereign governance repository for Future Systems Lab — agent specs, smart contract registry, IPFS manifest, security scans, and compliance documentation.

## Structure

```
/agents       — 15 AI agent specifications + gateway config
/contracts    — Deployed smart contract addresses (Sepolia)
/ipfs         — IPFS CID manifest for all pinned content
/security     — Dependency audits, ecosystem audits, weekly scan reports
/compliance   — HIPAA position, lexicon guide, sovereignty governance
```

## Automated Security Scans

Weekly scans run every Monday at 6:00 UTC via GitHub Actions:
- npm audit across all frontends
- FSL Lexicon violation scan (non-sovereign language)
- Hardcoded secrets detection
- HTTP (non-HTTPS) endpoint scan

Reports are committed to `/security/WEEKLY_SCAN_YYYY-MM-DD.md`. Issues are auto-created for critical findings.

## Smart Contracts (Sepolia)

| Contract | Address |
|----------|---------|
| HNT v2 | `0x1ae1e10929f008d1f9883ce574a318abd86084e2` |
| EHT | `0xbDaeb1d8AfFb527adF64b93972e554E61E4D7117` |
| MindMasteryNFT | `0xCb9EcB07caD18c0A2E95b1d6Dc1a5c7b7c9c4b0D` |
| SovereignLedger | `0xf32979B3a7F8A83946F59F925cCf26f0a9e5F78e` |
| BenevolenceFund | `0xbe710a0a5a80dfa3ca7dfadc959176d545b18271` |

## Agents (15 total)

| # | Agent | Approval |
|---|-------|----------|
| 1 | audit | auto |
| 2 | system_architect | auto |
| 3 | backend | auto |
| 4 | frontend | auto |
| 5 | smart_contract | auto |
| 6 | database | auto |
| 7 | compliance | auto |
| 8 | security | auto |
| 9 | testing | auto |
| 10 | documentation | auto |
| 11 | approval_gate | auto |
| 12 | hypnoneuro | auto |
| 13 | game_architect | auto |
| 14 | natpsy_advisor | auto |
| 15 | orthomolecular_specialist | auto |

---

Future Systems Lab LLC — Wyoming

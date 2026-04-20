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
| EHT | `0xbDaeb1d05E02D2751Ad07121510b5f0C436E2CdC` |
| MindMasteryNFT | `0xCb9EcB00574DB29976c7C54045d443666D5C7771` |
| SovereignLedger | `0xf32979200768e8726d5EC5E5AB0CA7407d64A94e` |
| AlchemistForge | `0xE092336F8f5082e57CcBb341A110C20ad186A324` |
| PractitionerAchievement | `0xe23e39799a47af1c383464c958e7724eed36f987` |
| ParticipantAchievement | `0x406c30894a14b53a6b5700025c06dd0697586fc6` |
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

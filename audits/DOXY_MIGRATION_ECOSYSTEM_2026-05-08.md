# Doxy.me Migration — Ecosystem-Wide Audit
## SovereignSession Replaces All Third-Party Video Tooling
**Date:** May 8, 2026
**Result:** User-facing surfaces CLEAN. Documentation references remain (historical).

---

## User-Facing Surfaces (P0)

| Surface | Status |
|---------|--------|
| fsl-command-center (all pages) | **CLEAN** |
| EncryptHealth frontend (all pages) | **CLEAN** (7 refs removed this session) |
| AlchemistForge | **CLEAN** |
| Future-Systems-Lab-profile | **CLEAN** |
| .github org README | **CLEAN** |
| fsl-web | **CLEAN** |
| session.futuresystemslab.io | **CLEAN** (built without Doxy.me) |

## Documentation (P2 — historical, not user-facing)

| File | Refs | Assessment |
|------|------|-----------|
| `fsl-governance/audits/CROSS_PLATFORM_AUDIT_2026-05-07.md` | 5 | Historical audit — describes the Doxy.me problem. Keep as-is (audit record). |
| `fsl-governance/audits/ENCRYPTHEALTH_DASHBOARD_CLEANUP_2026-05-08.md` | 7 | Council assessment doc — describes the migration plan. Keep as-is. |
| `fsl-governance/specs/SOVEREIGN_SESSION_BUILD_PLAN.md` | 4 | Build plan — describes what SovereignSession replaces. Keep as-is. |
| `fsl-governance/audits/SOVEREIGN_VIDEO_PROPOSAL_2026-05-07.md` | 8 | Original proposal — historical context. Keep as-is. |
| `HypnoNeuro/docs/stakeholders/FSL_COMPLIANCE_POSITION.md` | 26 | **OUTDATED** — describes Doxy.me as current video solution. **NEEDS UPDATE.** |

## Action Required

Only one file needs content update:

**`HypnoNeuro/docs/stakeholders/FSL_COMPLIANCE_POSITION.md`** — This compliance position doc describes Doxy.me as the current video solution with BAA details. Now that SovereignSession replaces Doxy.me, this doc should be updated to reflect the new architecture (peer-to-peer WebRTC, no third-party video dependency, no BAA needed because no PHI transmitted).

All other Doxy.me references are in historical audit/proposal docs that correctly describe the *before* state. These should be preserved as the migration record.

## Migration Complete

- All 7 EncryptHealth Doxy.me URLs replaced with session.futuresystemslab.io
- CSP allowlist updated (doxy.me → session.futuresystemslab.io)
- meeting_link auto-populates with SovereignSession room URL on booking confirmation
- Context-aware "Join Session" button respects ±15min booking window
- SovereignSession contract: 0xbeb13A360C6F0C77Ea3af3650Ab9762a1B9965A1

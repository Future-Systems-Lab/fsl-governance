# Ecosystem Platform Switcher — Council Assessment
## Replace "← FSL" with Sovereign Ecosystem Navigator
**Date:** May 9, 2026
**Status:** Council review

---

## Proposal

Replace the "← FSL" back button on EncryptHealth (and all platforms) with a platform switcher dropdown showing the full FSL ecosystem.

## Council Vote

| Agent | Vote | Reasoning |
|-------|------|-----------|
| System Architect | **APPROVE** | Cohesive ecosystem navigation is the right pattern. Each platform is sovereign but interconnected. |
| Frontend | **APPROVE** | Dropdown is standard SaaS pattern. Opens other platforms in new tab (doesn't interrupt current session). |
| Security | **APPROVE** | No auth cross-contamination — each platform authenticates independently. Switcher is navigation-only. |
| Academic | **APPROVE** | Reviewers see the five-platform architecture by experiencing it. Evidence through interaction. |
| Compliance | **APPROVE** | No data passes between platforms via the switcher. Pure navigation. |

**Unanimous APPROVE.**

## Implementation

- ~1.5h for EncryptHealth component
- Component is reusable across all platforms
- Each platform opens in new tab (no session coupling)
- Current platform highlighted
- Wallet address shown (truncated)
- Mobile: full-width dropdown

## Apply to platforms:
1. EncryptHealth (primary, build here first)
2. Other platforms adopt same component pattern in future sprints

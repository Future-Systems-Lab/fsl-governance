# EncryptHealth Landing Page Cleanup — Council Assessment
## Information Architecture + Mixed-Audience Separation
**Date:** May 8, 2026
**Status:** Awaiting Dr. Meg decision — DO NOT execute without approval

---

## Current Problems

| Issue | Severity | Detail |
|-------|----------|--------|
| Three CTAs competing | HIGH | No clear primary action for any audience |
| "$75 consult with Dr. Meg" | HIGH | Reads as commercial, belongs on practitioner site (hypnosispsych.com) |
| "3 Days Free — No Credit Card" | HIGH | SaaS trial language contradicts sovereignty positioning |
| "GemWallet/Crossmark — XRPL coming soon" | MEDIUM | Implies incomplete integration |
| Sovereign Guide recruitment + participant onboarding same view | MEDIUM | Mixed audience messaging |
| "Convert USD to crypto instantly" | LOW | Onramper belongs in transaction flow, not landing |

---

## Three Audiences

| Audience | Current Path | Recommended Path |
|----------|-------------|-----------------|
| **Participants** | Mixed CTAs, unclear entry | Single CTA: "Create My Sovereign Record" |
| **Practitioners** | Stacked CTA in main view | Subtle link → /sovereign-guide (separate page) |
| **Reviewers** | No dedicated path | Subtle link → /reviewer evidence portfolio |

---

## Recommended Cleanup

### KEEP
- "EncryptHealth: Sovereign Health Records" header
- Sovereignty definition + three checkmarked principles
- Brave Wallet primary recommendation
- Ticker (reduced prominence, top bar, not hero section)

### REMOVE from primary view
| Element | Reason | Where it belongs |
|---------|--------|-----------------|
| "$75 consult with Dr. Meg" | Commercial, practitioner-specific | hypnosispsych.com or Sovereign Guide profile |
| "3 Days Free — No Credit Card" | SaaS trial language | Remove entirely — sovereignty > trial |
| "GemWallet/Crossmark — XRPL coming soon" | Incomplete perception | Remove "coming soon," just say "XRPL supported" |
| "Convert USD to crypto instantly" | Transaction-flow context | Onramper appears during actual payment, not landing |
| Sovereign Guide recruitment CTA | Wrong audience | Separate /sovereign-guide page |

### ADD
- Reviewer link (subtle, near top): "Evaluating for ASU? [View evidence portfolio →](/reviewer)"
- Clear single CTA: "Create My Sovereign Record" with Brave Wallet badge
- Breathing room — whitespace around primary CTA

---

## Proposed Layout

```
┌─────────────────────────────────────────────┐
│ [Ticker — minimal, top bar]                 │
├─────────────────────────────────────────────┤
│                                             │
│  EncryptHealth                              │
│  Sovereign Health Records                   │
│                                             │
│  ✓ You control your data                    │
│  ✓ You choose your Sovereign Guide          │
│  ✓ No PHI held by FSL infrastructure        │
│                                             │
│  [ Create My Sovereign Record ]  ← PRIMARY  │
│   Brave Wallet recommended                  │
│                                             │
│  ─────────────────────────────────          │
│  Are you a practitioner?                    │
│  Join as a Sovereign Guide →                │
│                                             │
│  Reviewing for ASU? View evidence →         │
│                                             │
├─────────────────────────────────────────────┤
│ Footer: HypnoNeuro · AlchemistForge ·       │
│ SovereignLedger · FSL Command Center        │
│ Sovereignty by Design                       │
└─────────────────────────────────────────────┘
```

---

## Council Vote

| Agent | Recommendation |
|-------|---------------|
| System Architect | APPROVE cleanup — single CTA principle, audience separation |
| Frontend | APPROVE — breathing room around CTA improves conversion |
| Security | APPROVE — removing Onramper from landing reduces attack surface |
| Compliance | APPROVE — removing "$75 consult" prevents commercial/platform conflation |
| Academic | APPROVE — reviewer link addition is valuable for ASU evaluators |
| Content | APPROVE — "3 Days Free" is anti-sovereignty messaging |

**Unanimous: APPROVE proposed cleanup**

---

## Implementation Plan

| Step | File | Effort |
|------|------|--------|
| 1. Remove commercial CTAs | `HypnoNeuro/encrypthealth/frontend/app/page.tsx` | 30 min |
| 2. Simplify to single CTA | Same file | 30 min |
| 3. Add reviewer link | Same file | 10 min |
| 4. Add practitioner link | Same file | 10 min |
| 5. Reduce ticker prominence | `components/FSLTicker.tsx` | 15 min |
| 6. Create /sovereign-guide route | New page | 1-2 hours |
| 7. Test across viewports | Playwright | 30 min |
| **Total** | | **~3-4 hours** |

**Requires HypnoNeuro repo build cycle** (Next.js, Vercel deploy).

---

## Dr. Meg Decision Needed

1. **APPROVE full cleanup** → Execute per plan (~3-4h)
2. **APPROVE partial** → Specify which removals/additions
3. **DEFER** → Keep current landing, address post-Phase 4
4. **MODIFY** → Different layout or audience prioritization

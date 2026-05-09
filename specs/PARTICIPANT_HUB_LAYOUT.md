# Participant Hub Layout
## Canonical Structure for Dashboard Module Grid
**Date:** May 9, 2026
**Status:** Approved by Dr. Meg — canonical reference for designer/v0.dev/Lovable builds

---

## Layout: 2x2 Module Grid

```
┌──────────────────────┬──────────────────────┐
│ 🌿 Orthomolecular    │ 🧠 HypnoNeuro        │
│                      │                      │
│ [?] explainer        │ [?] explainer        │
│ Status snapshot      │ Status snapshot      │
│ Tap → enters module  │ Tap → enters module  │
├──────────────────────┼──────────────────────┤
│ ⛎ AlchemistForge     │ 👥 Sovereign Guides   │
│                      │                      │
│ [?] explainer        │ [?] explainer        │
│ Status snapshot      │ Status snapshot      │
│ Tap → enters module  │ Tap → enters module  │
└──────────────────────┴──────────────────────┘
```

### Card Anatomy

Each card displays:
- Module emoji + name (top-left)
- `?` icon in top-right corner (clickable → explainer popover)
- Status snapshot (relevant data per module)
- Tap card → enters module route
- Tap `?` → tooltip/popover with brief explanation

---

## Module Explainers

### 🌿 Orthomolecular
> Naturopathic and orthomolecular medicine: using nutrients, amino acids, and biotype assessment to optimize mental and physical wellness. Identify your nutrient pattern, track food and supplements, and receive AI-generated protocol guidance.

**Route:** `/orthomolecular`
**Status snapshot:** mood streak, last logged mood, supplement count

### 🧠 HypnoNeuro
> Therapeutic frequency sessions across three protocol layers: GABA/Endocannabinoid (calm), Orthomolecular (nutrient-focused), and Inner Child Healing. Engage with sovereign wellness games designed for neurotransmitter activation.

**Route:** `https://hypnoneuro.io` (external, with wallet passthrough)
**Status snapshot:** sessions completed, last session date

### ⛎ AlchemistForge
> On-chain shadow integration ritual. Name what you've been avoiding, transmute it on the Sepolia blockchain, witness your own transformation. Permanent. Pseudonymous. Sovereign.

**Route:** `https://alchemistforge.io` (external)
**Status snapshot:** transmutations completed, last ritual date

### 👥 Sovereign Guides
> Vetted naturopathic and orthomolecular practitioners. Connect 1:1 or join Support Circles. Grant scoped access to your sovereign record — revoke any time. Pseudonymous unless you choose otherwise.

**Route:** `/participant/providers`
**Status snapshot:** upcoming sessions, active consent grants, next circle

---

## Wellness Tip of the Day

Positioned below the 2x2 grid. Each tip card includes:
- Tip text (orthomolecular education)
- Category badge (GABA, Serotonin, Dopamine, Orthomolecular Protocol, etc.)
- "Order via Fullscript →" link to Dr. Meg's static dispensary

### Current State
- Links to static dispensary: `https://us.fullscript.com/welcome/hypnosispsych`
- Practitioner: Dr. Meg Montañez-Davenport (Naturopathic Psychology and Hypnosis Center)

### When Fullscript API Credentials Arrive
Pending: email to `api@fullscript.com` + sandbox credentials at `fullscript.dev/applications`

Integration build (~4h):
1. Each Wellness Tip auto-links to relevant supplement via Granular Search API
2. Mood pattern analysis → supplement suggestions with Fullscript Embed
3. Orthomolecular biotype results → matching protocol auto-linked
4. One-click order via Fullscript Embed (inline, no context switching)
5. Order webhook → log to FSL for correlation data

### Deferred (Until Credentials)
- Dynamic catalog search per tip
- Inline Embed ordering
- Order webhook → FSL correlation data

---

## Preserved Elements

These remain on the dashboard outside the 2x2 grid:
- **Sovereignty Banner** (top): "You own this data" + Revoke/Export buttons
- **Mood Tracker Widget**: Map Your Frequency pills (above grid)
- **Press Start FAB**: 4-state controller (bottom-right)
- **Sidebar** (desktop): wallet info, sovereignty controls, HNT balance, nav
- **Activity Feed** (desktop, right rail): recent activity log

---

## Mobile Behavior
- 2x2 grid → single column stack (same order: Orthomolecular, HypnoNeuro, AlchemistForge, Sovereign Guides)
- Sidebar hidden, activity feed hidden
- Press Start FAB always visible

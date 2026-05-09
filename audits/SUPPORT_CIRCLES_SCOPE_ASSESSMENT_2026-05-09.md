# Support Circles + Avatar Sessions — Scope Assessment
## Before Executing: Read This
**Date:** May 9, 2026

---

## What Was Requested (3 items)

1. Reorder Press Start bottom sheet (5 min)
2. Build full Support Circle session calendar with DB tables, booking, roster, calendar export (~12h)
3. Build provider profile pages with booking integration (~4h)

## What Should Execute Now vs. Later

### EXECUTE NOW (~30 min)

- Reorder Press Start buttons (avatar primary, guide secondary, HypnoNeuro tertiary)
- Avatar Session button opens a brief explainer with "Join a regular session for now" redirect
- This is the correct interim UX while Support Circles are built

### DEFER TO DEDICATED SPRINT (~16h)

| Component | Effort | Dependencies |
|-----------|--------|-------------|
| `support_circle_sessions` table + API | 3h | DB migration, VPS backend route |
| `support_circle_participants` table + API | 2h | Join/leave endpoints, roster management |
| `/participant/avatar-sessions` page | 4h | Calendar view, filters, session cards |
| Provider profile pages `/providers/[wallet]` | 3h | Dynamic routing, DB queries |
| Bottom sheet → live session preview | 2h | Depends on session table existing |
| Seed data + screenshots | 1h | Depends on all above |
| Testing | 1h | E2E verification |

### Why Defer

1. **Two new database tables** require careful schema design and migration — not a quick edit
2. **SovereignSession contract only supports 2-party sessions** — Support Circles need the multi-party contract extension (identified in Phase 5++ spec as post-avatar-layer)
3. **No Sovereign Guide has scheduled a Support Circle yet** — the calendar would be empty in production
4. **The avatar layer doesn't exist** — calling these "Avatar Sessions" when they're video sessions risks confusing participants
5. **The ASU application deadline is Oct 1** — shipping stable infrastructure evidence matters more than new features

### What's Already Documented

The Support Circles architecture is fully specified in:
- `specs/SOVEREIGN_SESSION_BUILD_PLAN.md` (Phase 5++)
- `agendas/DEFERRED_BACKLOG.md` (post-avatar-layer)
- `/reviewer` research roadmap (Phase 8)

These specs ARE the evidence for reviewers. Building a half-wired calendar UI weakens the "functional infrastructure scaffolds" framing.

---

## Recommended Path

1. **Now:** Reorder Press Start buttons + explainer overlay (30 min)
2. **Next sprint:** Support Circles DB + API + calendar page (dedicated 16h sprint)
3. **Post-acceptance:** Avatar layer + multi-party SovereignSession contract
4. **Post-avatar:** Full Support Circle experience with 3D avatars

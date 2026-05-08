# Tier 3 Handoff — Council Assessment
## EncryptHealth Re-Authentication Friction for Reviewers
**Date:** May 8, 2026
**Status:** Awaiting Dr. Meg decision

---

## Problem

Reviewer completes Tier 2 (alchemize on Sepolia), clicks "Continue to Tier 3 — EncryptHealth: Sovereign Health Records," lands on encrypthealth.io. The page is wallet-gated — reviewer must re-authenticate with wallet to proceed. They've already authenticated at Tier 2.

---

## Options

### Option (a): Status Quo — Reviewer Re-Signs at EncryptHealth

**Effort:** 10 minutes (add tooltip explaining the re-auth)

**Pros:**
- Architecturally honest. Each platform validates wallet auth independently — this IS the architecture being evaluated.
- No cross-platform session coupling. Security boundaries stay clean.
- Reviewer experiences the actual participant flow, not a shortcut.
- Zero engineering risk.

**Cons:**
- Reads as friction to non-technical reviewers who expect SSO-style flow.
- ~10% reviewer dropout risk at this handoff point.

**Implementation:** Add tooltip on the Tier 3 button:
> "Tier 3 opens EncryptHealth — each FSL platform validates wallet auth independently. This is the sovereignty architecture: no centralized session server linking your activity across platforms."

### Option (b): JWT/Session Handoff

**Effort:** 8-12 hours

**Pros:**
- Seamless reviewer journey across tiers.

**Cons:**
- Cross-domain JWT passing requires either: (i) shared subdomain cookie (futuresystemslab.io), (ii) URL-encoded token in redirect, or (iii) postMessage handoff via iframe.
- All three introduce attack surface: CSRF on shared cookies, token leakage in URL bar/referrer, XSS via postMessage.
- Contradicts the architectural thesis — "each platform is sovereign" becomes "platforms share session state."
- If a reviewer discovers the handoff mechanism, it weakens the "no centralized intermediary" claim.
- Significant engineering for a reviewer UX improvement that benefits ~5-10 people.

**Security constraints (if pursued):**
- JWT signed by EncryptHealth-specific key (not shared with Command Center)
- 5-minute expiry, single-use nonce
- PKCE-style challenge to prevent replay
- No PII/PHI in token payload — wallet address only

### Option (c): Reviewer-Mode Public Preview on EncryptHealth

**Effort:** 3-4 hours

**Pros:**
- Best reviewer experience. Shows architecture without forcing participation.
- Public surface means reviewers can evaluate the platform design even if they don't want to connect a wallet.
- Can include annotated screenshots of the wallet-gated experience.

**Cons:**
- New surface to build and maintain.
- Reviewers see a curated view, not the actual participant experience.

**Content outline (if approved):**
```
encrypthealth.io/reviewer (public, no wallet required)
├── Architecture overview card
│   "EncryptHealth holds no PHI — your wallet IS your identity"
├── Screenshots of wallet-gated experience
│   - Record creation flow
│   - Document vault
│   - Session attestation view
├── One-click: "Try it yourself — connect wallet"
│   → Standard wallet-gated flow
├── Ecosystem links
│   → HypnoNeuro, AlchemistForge, SovereignLedger, SovereignSession
└── Back to /reviewer evidence portfolio
```

---

## Council Vote

| Agent | Vote | Reasoning |
|-------|------|-----------|
| System Architect | **(a)** | The re-auth IS the architecture. Hiding it with a handoff undermines the thesis. |
| Security | **(a)** | Cross-domain JWT is unnecessary attack surface for 5 reviewers. |
| Frontend | **(c) with (a) fallback** | Reviewer-mode preview is the best reviewer UX, but (a) is fine with a tooltip. |
| Academic | **(a)** | DEng reviewers evaluate architectural decisions, not UX smoothness. The friction is the evidence. |
| Compliance | **(a)** | Independent auth per platform is the compliance-safe default. |

**Majority: Option (a) — with explanatory tooltip.**

If Dr. Meg later wants (c) for a polished ASU application demo, it can be scoped as a post-Phase 4 task (~3-4h). But for now, the tooltip makes the friction into a feature demonstration.

---

## Recommended Tooltip Text

On the Tier 3 button in `/reviewer/alchemize`:

> "Each FSL platform authenticates your wallet independently — no centralized session server links your activity across platforms. This is the sovereignty architecture in action."

---

## Dr. Meg Decision Needed

- **APPROVE (a)** → Add tooltip to Tier 3 button, document in reviewer spec
- **APPROVE (c)** → Build reviewer-mode preview at encrypthealth.io/reviewer (~3-4h)
- **APPROVE (b)** → Build JWT handoff with security constraints (~8-12h, not recommended)

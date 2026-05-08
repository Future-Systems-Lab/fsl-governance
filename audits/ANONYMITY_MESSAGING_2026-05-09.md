# Anonymity Messaging — Council Assessment
## Wallet = Pseudonymous Identity, Not Money
**Date:** May 9, 2026
**Status:** Recommendation for Dr. Meg approval
**Type:** Messaging and UX proposal (report only, no code execution)

---

## The Problem: Users Equate "Wallet" with Money

When FSL surfaces say "connect your wallet," users hear:
- "I need to pay something"
- "This is a crypto thing, I don't do crypto"
- "This is complicated financial technology"

What we actually mean:
- "Your wallet IS your identity — pseudonymous, self-sovereign, no email or password"
- "No funds required. No purchase. No financial transaction."
- "You control your identity. We never see your name unless you choose to share it."

This gap is especially critical for the reviewer experience. Academic reviewers evaluating a DEng applied project are not crypto-native. The first time they see "Connect Wallet," many will bounce unless the anonymity/pseudonymity value is immediately clear.

---

## Canonical Messaging: Three Versions

### Version 1: Primary Explainer (Landing Pages)

> **Your wallet is your anonymous identity.**
> No email. No password. No personal data collected. When you connect a wallet, you appear as a pseudonymous address — like `0x7a3B...9f2E`. You control what you reveal. We never see your name, email, or location unless you explicitly choose to share it. No funds are required to participate.

**Use on:** Landing pages, onboarding flows, about sections, /reviewer Tier 0.

### Version 2: Short Badge (Action Moments)

> **Anonymous by default** — your wallet is a pseudonymous identity, not a payment method. No funds needed.

**Use on:** Next to every "Connect Wallet" button, inline with wallet-gated actions, confirmation modals.

### Version 3: Inline Tooltip (First Wallet Connect)

> Connecting a wallet creates a pseudonymous identity (like `0x7a3B...9f2E`). No personal information is collected or stored. No funds are required.

**Use on:** Tooltip/popover triggered on first wallet connect interaction. Dismissable, shown once per session.

---

## 10 Surfaces to Update

| # | Surface | Placement | Version |
|---|---------|-----------|---------|
| 1 | **/reviewer** (fsl-command-center) | Tier 0 hero section, above "Connect Wallet" CTA | Primary explainer (V1) |
| 2 | **/reviewer** wallet connect modal | Inline below wallet connect button | Short badge (V2) |
| 3 | **/getting-started** (fsl-command-center) | "Why a wallet?" explainer section | Primary explainer (V1) |
| 4 | **EncryptHealth landing** | Hero section, participant onboarding flow | Primary explainer (V1) |
| 5 | **EncryptHealth dashboard** connect prompt | Next to wallet connect button | Short badge (V2) |
| 6 | **AlchemistForge** connect prompt | Next to "Begin Transmutation" wallet gate | Short badge (V2) |
| 7 | **AlchemistForge** landing/about | Explanation section | Primary explainer (V1) |
| 8 | **fsl-web** (main site) | Technology/approach section | Primary explainer (V1) |
| 9 | **GitHub org README** (.github) | Under "How to Interact" section | Short badge (V2) |
| 10 | **SovereignSession** join flow | Pre-session wallet connect step | Inline tooltip (V3) |

---

## Design: Recurring Visual Pattern

Every anonymity message across all surfaces uses the same visual treatment:

| Element | Specification |
|---------|--------------|
| **Icon** | Shield with eye-slash (privacy/anonymity) — consistent across all surfaces |
| **Accent color** | Gold (#D4A843 or closest brand match) — the sovereignty color |
| **Typography** | Bold lead sentence ("Your wallet is your anonymous identity.") followed by regular-weight explanation |
| **Badge variant** | Compact pill shape with shield icon + "Anonymous by default" text, gold border |
| **Tooltip variant** | Light popover with shield icon, appears on hover/first-click near wallet connect |

**Visual consistency rule:** If a user sees the gold shield + anonymity message on /reviewer, they should immediately recognize the same pattern on EncryptHealth, AlchemistForge, or any other FSL surface. One pattern, everywhere.

---

## Updated Jargon Tooltip: "Wallet" on /reviewer

The /reviewer page's jargon tooltip system should update the "wallet" entry:

**Current (if exists):**
> Wallet: A digital wallet for interacting with the blockchain.

**Updated:**
> **Wallet** — Your pseudonymous identity on the network. Appears as an address like `0x7a3B...9f2E`. No email, no password, no personal data collected. Not a payment method — no funds required to participate. Recommended: Brave Wallet (built into Brave browser) or Rainbow.

This tooltip should trigger on hover/tap for the word "wallet" anywhere it appears on /reviewer.

---

## Council Recommendation: APPLY NOW

### Why Not Defer to Canonical Config Service?

The canonical config service (assessed separately, CANONICAL_CONFIG_ARCHITECTURE_2026-05-09.md) is the right long-term home for this messaging. Once `lexicon.json` or a dedicated `messaging.json` canonical file exists, these three versions should live there and propagate automatically.

**But that is a multi-day project.** The canonical service requires:
- Creating the canonical directory (~2h)
- Piloting on one consumer (~4h)
- Rolling out to all consumers (~8h)

Meanwhile, reviewers are seeing the /reviewer page TODAY. Academic faculty evaluating FSL's architecture will encounter "Connect Wallet" with no anonymity context. Every day without this messaging is a potential bounce.

### Immediate Application: ~2h

| Task | Estimate |
|------|----------|
| Add V1 explainer to /reviewer Tier 0 | 15 min |
| Add V2 badge to /reviewer wallet connect | 15 min |
| Add V1 to /getting-started | 15 min |
| Add V2 to EncryptHealth connect prompts | 15 min |
| Add V1 to EncryptHealth landing | 15 min |
| Add V2 to AlchemistForge connect + V1 to landing | 15 min |
| Add V1 to fsl-web | 10 min |
| Add V2 to GitHub org README | 5 min |
| Add V3 tooltip to SovereignSession join | 10 min |
| Update wallet jargon tooltip on /reviewer | 5 min |
| **Total** | **~2h** |

Each surface change is a small copy addition — no component refactoring, no new dependencies, no architectural changes. This is text insertion work.

### Migration Path

When the canonical config service ships:
1. Move the three message versions into `canonical/messaging.json`
2. Replace hardcoded copy in each surface with canonical fetch
3. Future message updates propagate automatically

The immediate application is not wasted work — it's the content that will later be centralized.

---

## Council Vote

| Agent | Vote | Rationale |
|-------|------|-----------|
| Archivist | APPLY NOW | The messaging content is defined and final. Deferring to canonical means reviewers see no anonymity context for days or weeks. The content doesn't change — only the delivery mechanism changes later. |
| Builder | APPLY NOW | 2 hours of copy insertion vs. 14+ hours to build canonical first. The ROI is obvious. Apply now, migrate later. |
| Sentinel | APPLY NOW | Privacy messaging is a trust signal. Every surface without it is a surface where users assume "wallet = money = complexity." This is a security-adjacent concern — users who don't understand pseudonymity may avoid connecting entirely. |
| Strategist | APPLY NOW | The reviewer experience is the highest-priority surface. Academic reviewers evaluating the DEng applied project need to understand that wallet-based identity IS the innovation, not a barrier. This messaging converts skeptics into participants. |

**Unanimous APPLY NOW. All four agents recommend immediate application to all 10 surfaces.**

---

## Dr. Meg Decides

| Decision | Effect |
|----------|--------|
| **APPROVE** | Execute immediately. Apply anonymity messaging to all 10 surfaces (~2h). Update wallet jargon tooltip on /reviewer. Migrate to canonical config when it ships. |
| **DEFER** | Add messaging.json to canonical config scope. Surfaces remain without anonymity context until canonical service is built and rolled out (estimated 1-2 weeks). |

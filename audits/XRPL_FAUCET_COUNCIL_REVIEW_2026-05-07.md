# XRPL Reviewer Faucet — Council Review
## Agent Council Discussion
**Date:** May 7-8, 2026
**Status:** Recommendation for Dr. Meg approval

---

## Question 1: Is XRPL reviewer funding needed for ASU DEng review?

**Council assessment: NO — not for the reviewer ritual experience.**

The DEng applied project thesis is about consent architecture and sovereign data governance. The proving ground is behavioral health. The on-chain evidence that matters to reviewers is:
- Session attestations (SovereignLedger — Ethereum)
- Shadow work transmutations (AlchemistForge — Ethereum)
- Credential minting (SovereignAchievement — Ethereum)
- Token earning (HNT — Ethereum)

XRPL serves the **payment settlement layer** — it's how participants pay Sovereign Guides for sessions. That's an operational concern, not a research artifact. No reviewer needs to send XRP to evaluate the architecture.

**However:** XRPL's presence in the architecture IS evidence of multi-chain design thinking. The question is whether reviewers need to *interact* with it or just *see* it.

---

## Question 2: Server-side XRPL faucet architecture — right approach?

**Council assessment: OVER-ENGINEERED for the use case.**

XRPL testnet faucet is unlimited and free (https://faucet.tequ.dev/ gives 1000 XRP instantly). There's no scarcity problem to solve — unlike Sepolia ETH where public faucets rate-limit and sometimes run dry.

If we did build XRPL reviewer funding:
- No refill wallet needed (testnet faucet is infinite)
- But: requires xrpl.js library on VPS, XRPL testnet wallet generation, separate signing flow
- Failure modes: XRPL testnet can be unstable, GemWallet/Xaman install friction

The engineering cost doesn't match the evidentiary value.

---

## Question 3: Would reviewers actually connect a second wallet?

**Council assessment: UNLIKELY.**

The Tier 1→2 flow already asks reviewers to:
1. Install Brave Wallet (or have one)
2. Add Sepolia network
3. Get faucet ETH
4. Sign an attestation
5. Submit an alchemize() transaction

Adding "now install GemWallet or Xaman, connect to XRPL testnet, get XRP" doubles the friction for marginal evidentiary gain. Engineering management faculty evaluating a DEng application will spend 10-30 minutes on review, not 60+.

The reviewers who go through Tier 2 on EVM are already demonstrating engagement. A second chain won't change an admission decision.

---

## Question 4: Read-only XRPL proof as alternative?

**Council assessment: THIS IS THE RIGHT ANSWER.**

Show the XRPL mainnet wallet `rwR3etLJVxtQXYs2d9jgBQxzHBivtCMdPd` as read-only evidence on /reviewer Tier 0:
- Live balance display (15 XRP, queried via s2.ripple.com)
- Transaction history link
- "FSL operates on two blockchains: Ethereum for governance and XRPL for payment settlement"
- XRP Ledger explorer link for the wallet

This proves multi-chain architecture without requiring reviewer interaction. It's one card on /reviewer, not a whole pipeline.

**Already partially done:** The getting-started page already shows the XRPL wallet address and links to GemWallet/Xaman as optional. The ticker already shows XRP price. The thesis section already lists "XRPL payment rails" in the Financial layer.

---

## Question 5: Ship now, defer, or skip?

**Council recommendation: ALTERNATIVE — read-only XRPL card on /reviewer Tier 0.**

| Option | Recommendation |
|--------|---------------|
| BUILD full XRPL faucet pipeline | SKIP — over-engineered, low reviewer engagement probability |
| DEFER until ASU acceptance | Acceptable but unnecessary — the read-only proof is sufficient |
| SKIP entirely | Too aggressive — XRPL IS part of the architecture, should be visible |
| **ALTERNATIVE: read-only XRPL evidence card** | **RECOMMENDED** — maximum evidence, zero reviewer friction |

---

## Recommended Implementation (if approved)

Add one card to /reviewer Tier 0 under the Financial layer:

```
XRPL Payment Layer — Live
Wallet: rwR3etLJVxtQXYs2d9jgBQxzHBivtCMdPd
Balance: [live query] XRP
Purpose: Sovereign Guide session payment settlement
Explorer: [XRPL explorer link]
"FSL operates across Ethereum (governance, identity, credentialing) 
and XRPL (payment settlement). This dual-chain architecture uses 
each network for what it does best."
```

Estimated effort: 30 minutes. No new wallets, no faucets, no reviewer installs.

---

## Council Vote

| Agent Role | Vote | Rationale |
|-----------|------|-----------|
| System Architect | ALTERNATIVE | Engineering cost/benefit doesn't justify full pipeline |
| Frontend | ALTERNATIVE | One card is cleaner UX than a second wallet flow |
| Backend | SKIP or ALTERNATIVE | No new VPS infrastructure needed for read-only |
| Security | ALTERNATIVE | Fewer keys on VPS = less attack surface |
| Compliance | ALTERNATIVE | Multi-chain evidence without multi-chain reviewer liability |
| Academic | ALTERNATIVE | Reviewers evaluate architecture decisions, not chain count |
| Content | ALTERNATIVE | "Dual-chain by design" is a stronger narrative than "try both chains" |

**Unanimous: ALTERNATIVE**

---

## Awaiting Dr. Meg Approval

Options:
- **Approve ALTERNATIVE** → CC adds read-only XRPL card to /reviewer (30 min)
- **Approve BUILD** → CC builds full XRPL faucet pipeline (4-6 hours)
- **Approve SKIP** → No XRPL changes, existing mentions sufficient

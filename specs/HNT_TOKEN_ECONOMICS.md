# HNT Token Economics
## Sovereign Wellness Cooperative Economy
**Date:** May 9, 2026
**Status:** Economic model locked — council ratified
**Last Updated:** May 9, 2026

---

## 1. HNT Earning (Participant Side)

| Action | HNT Earned | Notes |
|--------|-----------|-------|
| First Support Circle registration | 5 | One-time bonus |
| Subsequent circle registration | 2 | Per registration |
| Circle completion (attended) | 25 | On SessionCompleted event |
| 1:1 session completion | 25 | On SessionCompleted event |
| 3-circle streak bonus | 50 | Consecutive weekly attendance |
| 7-circle milestone | 100 | + Tier 1 SovereignAchievement NFT |
| Lab upload + anchoring | 10 | Per anchored lab |
| 30-day mood logging streak | 15 | Sustained engagement reward |

All HNT minted on-chain via HNT contract `0x1ae1e10929f008d1f9883ce574a318abd86084e2` (Sepolia). Wallet-scoped. Non-transferable participation token (not speculative).

---

## 2. HNT Discount Tiers (Consumption)

| Tier | HNT Required | Session Discount | HNT Burned |
|------|-------------|-----------------|------------|
| 1 | 7 HNT | 7% off next session | 7 HNT |
| 2 | 11 HNT | 11% off next session | 11 HNT |
| 3 | 22 HNT | 22% off next session (max) | 22 HNT |

- HNT is **burned** on use (removed from circulation)
- Participants can **stack** — save for Tier 3 instead of spending Tier 1 multiple times
- Discount applied at booking confirmation, verified on-chain
- **FSL treasury absorbs the discount** — Guides are paid from FULL session value

---

## 3. Session Revenue Split (Locked)

### The 70/27/3 Model

Every session payment splits:

```
Participant pays session fee
├── 70% → Sovereign Guide (paid in USDC by default)
├── 27% → FSL Operations (infrastructure, development, support)
└──  3% → BenevolenceFund smart contract
```

### HNT Discount Absorption

When a participant redeems HNT for a discount, **FSL treasury absorbs the difference**:

```
Example: $200 session, participant redeems 22% HNT discount

Participant pays: $156 (after 22% discount)
Guide receives:   $140 (70% of FULL $200 — not discounted)
FSL ops receives:  $10 (27% of $200 = $54, minus $44 discount absorbed)
BenevolenceFund:    $6 (3% of $200 — always from full value)
```

**Guide payout protection:** Guides are ALWAYS paid from the full session value. The discount comes out of FSL's 27% operations share. If the discount exceeds FSL's share (extreme edge case at 22% discount on low-margin sessions), FSL subsidizes the difference.

### Session Pricing

| Rate Type | Rate | Notes |
|-----------|------|-------|
| Initial consult (60 min) | **$___** | Awaiting Dr. Meg confirmation |
| Follow-up (30 min) | **$___** | |
| Follow-up (60 min) | **$___** | |
| Circle session (per participant) | **$___** | |

### Guide Payout Method

- **Default:** USDC (stablecoin) to Guide's wallet
- **Optional:** ETH or XRP (config in provider settings)
- **Frequency:** Automatic settlement after each session

---

## 4. BenevolenceFund Distribution

### Annual Distribution — April 1

The BenevolenceFund smart contract (`0x96E8006a1fBB693B55fFf6254B8BF19EC605251B`) distributes its accumulated balance on April 1 each year.

| Recipient | Share | Ranking Method |
|-----------|-------|----------------|
| 1st Place Guide | 44% | Ranked by total participant HNT earned under their care |
| 2nd Place Guide | 33% | Same metric |
| 3rd Place Guide | 22% | Same metric |
| Top Participant | 1% (in crypto) | Highest HNT earned that year |

**Ranking metric:** Total HNT earned by a guide's participants — not raw session count. This incentivizes engagement quality (participants who log mood, attend circles, upload labs) over volume alone.

---

## 5. Guide HNT Bonus Tiers

Guides earn HNT bonuses based on monthly session volume:

| Tier | Sessions/Month | HNT Bonus | Additional |
|------|---------------|-----------|------------|
| Standard | 1–10 | — | Base 70% payout |
| Growth | 11–25 | 5% HNT bonus | On top of USDC payout |
| Sovereign | 26+ | 10% HNT bonus | On top of USDC payout |
| Featured | Top 3 quarterly | 15% HNT bonus | + Featured Guide badge in directory |

### HNT Utility for Guides

Guide-earned HNT unlocks:
- **Achievement NFT redemption** — mint SovereignGuide NFTs as credential proof
- **Tier unlocks** — starter → growth → sovereign tier progression
- **Co-op grants** — stake HNT to fund participant scholarships
- **Governance staking** — weight in FSL governance decisions (future)

---

## 6. Economic Projections

### Solo Guide (Dr. Meg) — $200 Session

| Scenario | Sessions/yr | Gross Revenue | Guide (70%) | FSL Ops (27%) | BenevolenceFund (3%) | Avg Discount Impact on FSL |
|----------|------------|--------------|-------------|--------------|---------------------|---------------------------|
| Light | 50 | $10,000 | $7,000 | $2,700 | $300 | -$1,000 |
| Moderate | 100 | $20,000 | $14,000 | $5,400 | $600 | -$2,000 |
| Active | 200 | $40,000 | $28,000 | $10,800 | $1,200 | -$4,000 |

**Note:** Discount impact assumes 10% average discount across sessions. FSL absorbs this from its 27% share.

### Multi-Guide Economy (5 guides, each 100 sessions/yr at $200)

| Metric | Value |
|--------|-------|
| Total sessions | 500 |
| Total gross | $100,000 |
| Total Guide payouts | $70,000 |
| FSL Operations | $27,000 |
| BenevolenceFund pool | $3,000 |
| April 1 distribution: 1st place | $1,320 (44%) |
| April 1 distribution: 2nd place | $990 (33%) |
| April 1 distribution: 3rd place | $660 (22%) |
| Top participant (crypto) | $30 (1%) |

---

## 7. Participant Narrative

> By engaging with FSL, you earn HNT through participation — sessions, circles, mood logging, lab uploads. HNT becomes session discounts AND contributes to a community fund that distributes annually to the guides who serve you best and the participant who engages most deeply. Your wellness journey creates wellness for others.

---

## 8. Sovereign Guide Narrative

> You receive 70% of every session fee in USDC — calculated from the FULL session price, never reduced by participant discounts. FSL absorbs discounts from its operations share. As your practice grows, HNT bonuses stack on top (5%/10%/15% by volume). The annual BenevolenceFund distribution rewards the guides whose participants thrive most. Top 3 guides share 99% of the fund.

---

## 9. ASU Reviewer Framing

This economic model is a deployed implementation of cooperative health economics on-chain:
- **Problem:** Practitioner income preservation in discount-driven wellness markets
- **Solution:** Token-mediated participation rewards + FSL-absorbed discounts + cooperative redistribution fund
- **Mechanism:** BenevolenceFund smart contract (`0x96E8006a1fBB693B55fFf6254B8BF19EC605251B`) enforces transparent, on-chain distribution
- **Innovation:** Guide payout calculated from full session value — discounts are an FSL treasury cost, not a guide income reduction
- **Research contribution:** Demonstrates that blockchain governance can solve practitioner economics problems that traditional platforms (BetterHelp, Talkspace) solve through extraction

---

## 10. Implementation Prerequisites

1. Dr. Meg confirms session rates (fills in table in Section 3)
2. PROTECTED MODE approval for deployer key usage (HNT minting)
3. HNT burn function on discount redemption (contract may need update)
4. BenevolenceFund distribution function (already in contract — `distribute()`)
5. Guide ranking algorithm (by participant HNT earned, not raw session count)
6. USDC settlement integration (Transak or direct transfer)
7. SovereignLedger v2 settlement function (70/27/3 split with discount absorption)

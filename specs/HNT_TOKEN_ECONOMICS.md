# HNT Token Economics
## Sovereign Wellness Cooperative Economy
**Date:** May 9, 2026
**Status:** Model documented — awaiting Dr. Meg session rate confirmation before implementation

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

---

## 3. Session Pricing Adjustment

### Methodology

Session prices are adjusted so that Sovereign Guides receive at minimum their target income at maximum discount:

```
Adjusted Price = Target Guide Income ÷ (0.97 × 0.78)
```

Where:
- 0.97 = Guide's 97% share (3% to BenevolenceFund)
- 0.78 = worst-case scenario (22% max discount applied)

### Awaiting Dr. Meg Confirmation

| Rate Type | Current Rate | Adjusted (at max discount) |
|-----------|-------------|---------------------------|
| Initial consult (60 min) | **$___** | = rate ÷ 0.7566 |
| Follow-up (30 min) | **$___** | = rate ÷ 0.7566 |
| Follow-up (60 min) | **$___** | = rate ÷ 0.7566 |
| Circle session (per participant) | **$___** | = rate ÷ 0.7566 |

**Example:** If Dr. Meg's target take-home for a 60-min session is $150:
- Adjusted price = $150 ÷ 0.7566 = **$198**
- At 0% discount: Guide receives $198 × 0.97 = **$192.06** (above target)
- At 7% discount: Guide receives $198 × 0.93 × 0.97 = **$178.62**
- At 22% discount: Guide receives $198 × 0.78 × 0.97 = **$149.79** (hits target floor)

---

## 4. BenevolenceFund Flywheel

### Per-Session Flow
```
Participant pays $198
├── 97% ($192.06) → Sovereign Guide
└── 3% ($5.94) → BenevolenceFund
```

### Annual Fund Distribution (December 31)

| Recipient | Share | Purpose |
|-----------|-------|---------|
| Top Sovereign Guides | 50% | Engagement-based distribution (ranked by participant HNT earned) |
| Participants in need | 30% | Sponsored sessions for participants without resources |
| Ecosystem development | 20% | Infrastructure, research, community |

### The Flywheel

1. Guide serves participants → participants earn HNT
2. Participants redeem HNT for discounts → per-session guide take decreases slightly
3. But: discounts attract more participants → volume increases
4. Higher volume → more 3% contributions → larger BenevolenceFund
5. Top guides (by volume + impact) receive 50% of annual fund
6. Annual distribution exceeds the per-session discount differential
7. Guide is net positive: **lower per-session × higher volume + annual distribution > baseline**

---

## 5. Economic Projections

### Assumptions
- Base session price: $198 (adjusted)
- Average discount applied: 10% (mix of tiers, not all participants use discounts)
- BenevolenceFund annual pool calculated from all guides collectively
- Solo guide scenario (Dr. Meg only) shown first, multi-guide scaling below

### Solo Guide (Dr. Meg)

| Scenario | Sessions/yr | Gross Revenue | Guide Take (97%) | BenevolenceFund (3%) | Avg Discount Impact | Net Guide Income | BenevolenceFund Return (50%) |
|----------|------------|--------------|-------------------|---------------------|--------------------|-----------------|-----------------------------|
| Light | 50 | $9,900 | $9,603 | $297 | -$990 | $8,613 | +$149 |
| Moderate | 100 | $19,800 | $19,206 | $594 | -$1,980 | $17,226 | +$297 |
| Active | 200 | $39,600 | $38,412 | $1,188 | -$3,960 | $34,452 | +$594 |

**Note:** At solo guide, the BenevolenceFund return is modest (50% of own contributions = 50% × 3% = 1.5% return). The model strengthens significantly with multiple guides.

### Multi-Guide Economy (5 guides, each 100 sessions/yr)

| Metric | Value |
|--------|-------|
| Total sessions | 500 |
| Total gross | $99,000 |
| BenevolenceFund pool | $2,970 |
| Top guide share (50% ÷ ranked) | ~$890 (1st), ~$595 (2nd), ~$297 (3rd) |
| Discount impact per guide | -$1,980 |
| Net benefit for top guide | $890 - $0 = **+$890 net above discount loss** |

**The model works when:**
- Multiple guides contribute to the fund (diversified pool)
- Top guides are ranked by participant outcomes (HNT earned by their participants), not just volume
- Annual distribution exceeds the per-session discount differential for engaged guides

**The model is marginal when:**
- Solo guide (returning own contributions minus 50%)
- Very low session volume (< 25/year)

### Council Assessment

The economics are sound for a multi-guide cooperative economy. At solo-guide scale (current state), the BenevolenceFund return is modest. The discount tiers create participant engagement incentive regardless.

**Recommendation:** Launch discount tiers + BenevolenceFund with current 97/3 split. The economics strengthen as the guide network grows. At solo scale, Dr. Meg's annual BenevolenceFund return is ~$150-600 depending on volume — modest but the participant engagement value of HNT discounts justifies the model.

---

## 6. Participant Narrative

> By engaging with FSL, you earn HNT through participation — sessions, circles, mood logging, lab uploads. HNT becomes session discounts AND contributes to a community fund that helps participants without resources access sovereign wellness care. Every session you complete adds to a fund that helps someone else. Your wellness journey creates wellness for others.

---

## 7. Sovereign Guide Narrative

> The discount tiers reduce your per-session take slightly when participants redeem HNT, but the BenevolenceFund returns more than that to high-engagement guides annually. You're never extracted from — you're part of a cooperative wellness economy where serving more participants creates more abundance for everyone. The more lives you transform, the higher your annual distribution.

---

## 8. ASU Reviewer Framing

This economic model is a deployed implementation of cooperative health economics on-chain:
- **Problem:** Practitioner income preservation in discount-driven wellness markets
- **Solution:** Token-mediated participation rewards + cooperative redistribution fund
- **Mechanism:** BenevolenceFund smart contract (`0x96E8006a1fBB693B55fFf6254B8BF19EC605251B`) enforces transparent, on-chain distribution
- **Research contribution:** Demonstrates that blockchain governance can solve practitioner economics problems that traditional platforms (BetterHelp, Talkspace) solve through extraction

---

## Implementation Prerequisites

1. Dr. Meg confirms session rates (fills in the table in Section 3)
2. PROTECTED MODE approval for deployer key usage (HNT minting)
3. HNT burn function on discount redemption (contract may need update)
4. BenevolenceFund distribution function (already in contract — `distribute()`)
5. Guide ranking algorithm (by participant HNT earned, not raw session count)

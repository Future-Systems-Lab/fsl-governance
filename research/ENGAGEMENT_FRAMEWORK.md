# FSL Engagement Tracking Methodology Framework
## Public Research Methodology — No PII or Activity Data

**Last Updated:** May 5, 2026

This document describes the engagement tracking methodology for FSL's sovereign wellness ecosystem. It contains the analytical framework and research design only — no user activity data, wallet addresses, or transaction hashes.

---

## Thematic Tagging Framework

Each content post across FSL's 5-platform distribution network (Discord, Telegram, Bluesky, Mastodon, Dev.to) is tagged with present themes for attribution analysis:

| Tag | Definition |
|-----|-----------|
| WOUND | References personal pain, trauma, hardship |
| MEDICINE | References healing, what someone carries that helps others |
| SOVEREIGNTY | References autonomy, ownership, power |
| IDENTITY | References self, who one is |
| INVITATION | Direct ask to act |
| QUESTION | Interrogative format |
| STATEMENT | Declarative format |
| LONG-FORM | Multi-sentence content |
| SHORT-FORM | Single sentence content |

Tags are not mutually exclusive. A single post may carry multiple tags (e.g., WOUND + MEDICINE + SOVEREIGNTY + QUESTION + LONG-FORM).

---

## Research Hypotheses (To Test — Not Validated Findings)

These are predictions to validate as engagement data accumulates. They are stated as testable hypotheses, not conclusions:

1. **H1:** Question format outperforms statement format for response rate
2. **H2:** Wound + Medicine + Sovereignty triad outperforms single-theme posts for engagement
3. **H3:** Long-form content with callback structure outperforms short-form for conversion (wallet acquisition)
4. **H4:** Personal-narrative framing outperforms abstract-concept framing for user action

**Status:** No data collected yet. Hypotheses derived from initial content design observations and behavioral health communication literature.

---

## Future Predictive Analytics Direction

As data accumulates, the following analytical approaches become feasible:

### Regression
- Predict engagement rate (replies + shares) from thematic tag combination
- Independent variables: tag presence (binary), platform, day of week, post length
- Dependent variable: engagement rate (normalized per platform)

### Classification
- Classify posts as HIGH / LOW conversion potential before publishing
- Train on historical tag-to-conversion mappings
- Use for content engine prompt optimization

### Clustering
- Identify natural groupings of high-performing content
- Unsupervised analysis of tag co-occurrence patterns
- Surface thematic combinations not hypothesized a priori

### Time Series
- Track sovereignty-framing resonance over time
- Detect content fatigue or theme saturation
- Inform rotation strategy for content engine

---

## Privacy-by-Design Constraints

FSL's architecture is wallet-gated and pseudonymous. The following are structurally NOT trackable without explicit user opt-in:

- Real identity behind a wallet address
- Email or contact information
- Direct marketing channel to wallet holders
- Demographic data
- Geographic location
- Device or browser fingerprinting

**This is a feature, not a limitation.** The sovereignty promise depends on it. Any future research must work within these constraints.

### Implications for Research Design
- All engagement metrics are aggregate or wallet-indexed (pseudonymous)
- No individual-level demographic analysis without opt-in
- Research publications must use de-identified, aggregate data only
- IRB protocol required before any formal data collection begins

---

## Future Algorithm (Post-Admission Research Direction)

Once external user data accumulates, a dynamic content attribution model can:

1. **Tag** each post with thematic markers at publish time
2. **Correlate** marker presence with response rate and conversion rate
3. **Surface** which combinations consistently outperform
4. **Inform** content engine prompts dynamically (closed-loop optimization)

This creates a publishable research pipeline: "Behavioral Health User Acquisition Through Sovereignty Framing on Decentralized Platforms."

### Academic Collaboration Targets
- Dr. Dragan Boscovic (ASU) — blockchain analytics, tokenomics engagement modeling
- Dr. Hassan Ghasemzadeh (ASU) — behavioral health digital intervention effectiveness

---

## FSL Contract Address Reference

All contracts deployed on Ethereum Sepolia testnet. Verifiable on [Sepolia Etherscan](https://sepolia.etherscan.io).

| Contract | Address | Purpose |
|----------|---------|---------|
| AlchemistForge | 0xE092336F8f5082e57CcBb341A110C20ad186A324 | Shadow work transmutation attestation |
| HypnoNeuro Token (HNT) | 0x1ae1e10929f008d1f9883ce574a318abd86084e2 | Earned engagement token |
| EHTv2 | 0x93583a7A24e50075c79b06db0be8Cf4D45B0bd88 | Capped supply token (144K max) |
| SovereignLedger v2 | 0x4afA577fA914068451e0Aa97b61F23960f02aCc4 | Consent governance |
| BenevolenceFund v2 | 0x96E8006a1fBB693B55fFf6254B8BF19EC605251B | Session fee redistribution (50/30/20) |
| SovereignAchievement | 0xC3F11d2F1F12bB96b9DCF7e8f85e9704D2869B8D | ERC-1155 soulbound tier credentials |
| MindMasteryNFT | 0xCb9EcB00574DB29976c7C54045d443666D5C7771 | NFT credentialing |

---

## Engagement Metrics Architecture

Engagement is measured at two layers:

### On-Chain (Verifiable)
- Total transmutations (AlchemistForge `alchemize()` call count)
- Unique sovereign wallets (distinct addresses interacting with FSL contracts)
- Credential tier distribution (SovereignAchievement token holdings)
- HNT distribution (earned token allocation)

### Off-Chain (Platform-Reported)
- Content replies per platform
- Content shares per platform
- Click-through rate to alchemistforge.io
- Discord/Telegram member count

On-chain metrics are the source of truth. Off-chain metrics supplement but do not override.

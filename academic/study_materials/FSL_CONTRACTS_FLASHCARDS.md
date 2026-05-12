# FSL Contract Flashcards

## Individual Contracts

**Q: What does HypnoNeuroToken (HNT) do?**
A: ERC-20 utility token rewarding participants for completing wellness engagements — in-ecosystem engagement currency, owner-minted.

**Q: What does EncryptHealthToken v2 (EHT) do?**
A: ERC-20 platform token with 144K supply cap — gates premium features and rewards Sovereign Guide participation.

**Q: What does MindMasteryNFT do?**
A: ERC-1155 achievement credential marking completion of L1/L2/L3 mind-mastery progressions — unlocks tier-based content.

**Q: What does SovereignLedger v2 do?**
A: Core attestation contract — records session start/complete events on-chain. Sessions are publicly verifiable without exposing content.

**Q: What does AlchemistForge do?**
A: Fully permissionless shadow-integration contract — no owner, no admin, no pause. Anyone calls `alchemize()` to record voluntary behavioral engagement on-chain.

**Q: What does BenevolenceFund v2 do?**
A: Community treasury receiving 3% of session fees — distributes annually to top 3 Guides (44/33/22%) plus 1% crypto to top participant.

**Q: What does SovereignAchievement do?**
A: ERC-1155 soulbound (non-transferable) credential — 10 tiers for both Guides and Participants, proves achievement without enabling resale.

**Q: What does NeuroBalanceConsent do?**
A: Consent scaffold for future biosensor integration — currently an empty shell, will handle wallet-signed consent for biometric data sharing.

**Q: What does SovereignSession do?**
A: Guide-initiated session attestation — records full session lifecycle on-chain with content hashes (not content). Guide initiates; participant does NOT co-sign on-chain.

## Integration Flashcards

**Q: How does authentication work across all 5 platforms?**
A: EIP-191 `personal_sign` → server ECDSA recovery → JWT cookie → middleware verification on every request. Single wallet signature = authentication + consent + authorization.

**Q: What's the session payment split?**
A: 70% Sovereign Guide (USDC) / 27% FSL operations / 3% BenevolenceFund.

**Q: What's on-chain vs off-chain?**
A: On-chain: consent hashes, session attestations, achievement credentials, engagement records. Off-chain: session metadata, wellness metrics, encrypted documents (IPFS). Never stored: names, SSNs, diagnoses, treatment plans.

**Q: Why is AlchemistForge special compared to other contracts?**
A: It's the only fully permissionless contract — no owner, no admin functions. Proves that meaningful behavioral health engagement can be recorded on a public blockchain with zero PII.

**Q: What makes SovereignAchievement different from MindMasteryNFT?**
A: SovereignAchievement is soulbound (non-transferable) and covers both Guides and Participants across 10 tiers. MindMasteryNFT is the game-level achievement for L1/L2/L3 progression.

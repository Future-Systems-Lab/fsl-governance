# FSL Smart Contract Reference — 9 Deployed Sepolia Contracts

## 1. HypnoNeuroToken (HNT)
**Address:** [0x1ae1e10929f008d1f9883ce574a318abd86084e2](https://eth-sepolia.blockscout.com/address/0x1ae1e10929f008d1f9883ce574a318abd86084e2)
**Standard:** ERC-20
**What it does:** Utility token rewarding participants for completing wellness engagements (game completions, achievement unlocks, on-chain participation). Used as in-ecosystem engagement currency. Owner-minted — FSL controls supply.

## 2. EncryptHealthToken v2 (EHT)
**Address:** [0x93583a7A24e50075c79b06db0be8Cf4D45B0bd88](https://eth-sepolia.blockscout.com/address/0x93583a7A24e50075c79b06db0be8Cf4D45B0bd88)
**Standard:** ERC-20, 144K supply cap
**What it does:** Platform token for EncryptHealth. Gates premium features, rewards Sovereign Guide network participation. Hard-capped supply prevents inflation.

## 3. MindMasteryNFT
**Address:** [0xCb9EcB00574DB29976c7C54045d443666D5C7771](https://eth-sepolia.blockscout.com/address/0xCb9EcB00574DB29976c7C54045d443666D5C7771)
**Standard:** ERC-1155
**What it does:** Achievement credential marking completion of structured mind-mastery progressions across L1/L2/L3. Unlocks tier-based content access on HypnoNeuro.

## 4. SovereignLedger v2
**Address:** [0x4afA577fA914068451e0Aa97b61F23960f02aCc4](https://eth-sepolia.blockscout.com/address/0x4afA577fA914068451e0Aa97b61F23960f02aCc4)
**What it does:** Core attestation contract. Records session events (start/complete) on-chain via emitted events. The "claims lifecycle" infrastructure — sessions are publicly verifiable without exposing content. Open registration — any wallet can submit attestations.

## 5. AlchemistForge
**Address:** [0xE092336F8f5082e57CcBb341A110C20ad186A324](https://eth-sepolia.blockscout.com/address/0xE092336F8f5082e57CcBb341A110C20ad186A324)
**What it does:** Permissionless shadow-integration contract. Records voluntary on-chain "transmutation" events. Fully sovereign — no admin, no owner, no pause mechanism. Two functions: `alchemize()` and `celebrateEgregiously()`. Anyone can call — no authentication required.

## 6. BenevolenceFund v2
**Address:** [0x96E8006a1fBB693B55fFf6254B8BF19EC605251B](https://eth-sepolia.blockscout.com/address/0x96E8006a1fBB693B55fFf6254B8BF19EC605251B)
**What it does:** Community treasury contract. Receives 3% of session fees. Distributes annually on April 1: top 3 Guides by participant HNT earned (44/33/22%) + 1% crypto to top participant by HNT earned. Owner-distributed.

## 7. SovereignAchievement
**Address:** [0xC3F11d2F1F12bB96b9DCF7e8f85e9704D2869B8D](https://eth-sepolia.blockscout.com/address/0xC3F11d2F1F12bB96b9DCF7e8f85e9704D2869B8D)
**Standard:** ERC-1155 (soulbound — non-transferable)
**What it does:** 10-tier achievement credential system. Issued to both Sovereign Guides and Participants using token ID ranges to differentiate. Soulbound to wallet — cannot be sold, traded, or transferred. Proves achievement without enabling credential resale.

## 8. NeuroBalanceConsent
**Address:** [0x21571805e57f792b66604b140a45D8C1b2E196b8](https://eth-sepolia.blockscout.com/address/0x21571805e57f792b66604b140a45D8C1b2E196b8)
**What it does:** Consent scaffold for NeuroBalance biosensor layer (pre-implementation). Will handle wallet-signed consent for biometric data sharing when biosensor integration goes live. Currently an empty shell.

## 9. SovereignSession
**Address:** [0xbeb13A360C6F0C77Ea3af3650Ab9762a1B9965A1](https://eth-sepolia.blockscout.com/address/0xbeb13A360C6F0C77Ea3af3650Ab9762a1B9965A1)
**What it does:** Guide-initiated session attestation. Records full session lifecycle on-chain: SessionRequested → Confirmed → Active → Completed → Finalized. Emits events with content hashes (not content). Guide initiates; participant does NOT co-sign on-chain (corrected from earlier documentation).

---

## How They Work Together

**Authentication layer (all platforms):**
- User connects wallet via EIP-191 `personal_sign`
- Server verifies signature via ECDSA recovery, issues JWT
- JWT gates platform access via middleware on every request

**Session flow:**
- Sovereign Guide initiates session → SovereignSession records lifecycle on-chain
- Session completion → emits SessionCompleted event
- 70% of session fee to Guide (USDC) / 27% FSL ops / 3% BenevolenceFund

**Achievement flow:**
- Participant earns HNT for game completions
- Threshold reached → mint MindMasteryNFT (ERC-1155) for tier unlock
- Major milestone → mint SovereignAchievement (soulbound credential)

**Engagement flow:**
- AlchemistForge: anyone can call `alchemize()` — fully permissionless
- NeuroBalanceConsent: future biosensor consent layer (not yet active)

---

## Deployer & Governance

All contracts deployed from: `0xf22cbF25deEeA36FFF828BAf73CCb049345eF248`
(Dr. Meg's canonical wallet — also Case Study Participant #1)

**Network:** Ethereum Sepolia testnet (pre-mainnet)
**Block explorer:** [Blockscout](https://eth-sepolia.blockscout.com) (verified contracts)
**Backup explorers:** Routescan, Etherscan Sepolia

**Centralization note:** All owner-controlled contracts deploy from single wallet. Multisig governance planned for mainnet migration.

---

## Talking Points

- "Nine verified contracts on Sepolia — every FSL system is deployed, not theoretical"
- "EIP-191 wallet signature unifies authentication and consent into a single cryptographic event"
- "Zero PHI on-chain by design — the system never holds protected health information"
- "Soulbound credentials prove achievement without enabling resale"
- "Permissionless contracts (AlchemistForge) demonstrate fully sovereign participation"
- "BenevolenceFund redistributes 3% to community — embedded redistribution, not charity"
- "Behavioral health is the proving ground — the architecture is domain-agnostic"

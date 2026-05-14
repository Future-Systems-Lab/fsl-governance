# FSL Deployment Registry — Canonical Sepolia Contracts

**Network:** Ethereum Sepolia Testnet
**Explorer:** https://eth-sepolia.blockscout.com
**Deployer Wallet:** 0xf22cbF25deEeA36FFF828BAf73CCb049345eF248
**Last verified:** 2026-05-13

---

## 9 Deployed Smart Contracts

| # | Contract | Address | Purpose | Access Control | Status |
|---|----------|---------|---------|---------------|--------|
| 1 | HypnoNeuroToken (HNT) | 0x1ae1e10929f008d1f9883ce574a318abd86084e2 | ERC-20 wellness engagement token | Owner-minted | Deployed |
| 2 | EHTv2 | 0x93583a7A24e50075c79b06db0be8Cf4D45B0bd88 | ERC-20 platform token (144K cap) | Owner-minted | Deployed |
| 3 | MindMasteryNFT | 0xCb9EcB00574DB29976c7C54045d443666D5C7771 | ERC-1155 achievement credentials | Owner-minted | Deployed |
| 4 | SovereignLedger v2 | 0x4afA577fA914068451e0Aa97b61F23960f02aCc4 | Session governance + attestation | Open registration | Deployed |
| 5 | AlchemistForge | 0xE092336F8f5082e57CcBb341A110C20ad186A324 | Voluntary shadow integration | Fully permissionless | Deployed |
| 6 | BenevolenceFund v2 | 0x96E8006a1fBB693B55fFf6254B8BF19EC605251B | 3% community wellness treasury | Owner-distributed | Deployed |
| 7 | SovereignAchievement | 0xC3F11d2F1F12bB96b9DCF7e8f85e9704D2869B8D | ERC-1155 soulbound credentials (20 tiers) | Owner-minted | Deployed |
| 8 | NeuroBalanceConsent | 0x21571805e57f792b66604b140a45D8C1b2E196b8 | Biosensor consent scaffold | Owner-controlled | Scaffolded |
| 9 | SovereignSession | 0xbeb13A360C6F0C77Ea3af3650Ab9762a1B9965A1 | Guide-initiated session attestation | Guide-initiated | Deployed |

## Verification

All contracts can be independently verified at:
`https://eth-sepolia.blockscout.com/address/{ADDRESS}`

## Key Events

| Contract | Event | Parameters |
|----------|-------|-----------|
| SovereignSession | SessionStarted | sessionId, guide, participant, timestamp |
| SovereignSession | SessionEnded | sessionId, guide, participant, startTime, endTime, duration |
| AlchemistForge | ShadowRecorded | wallet, aspectHash |
| AlchemistForge | Celebrated | wallet, timestamp |

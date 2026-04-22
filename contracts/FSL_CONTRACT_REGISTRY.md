# FSL Smart Contract Registry
**Network:** Sepolia Testnet
**Last Updated:** April 21, 2026

## Active Contracts (v2)

| Contract | Address | Purpose | Deployed |
|----------|---------|---------|----------|
| EHTv2 (ERC-20) | 0x93583a7A24e50075c79b06db0be8Cf4D45B0bd88 | Energetic Healing Token — MAX_SUPPLY 144K, burn, owner-only mint | Sprint 016 |
| SovereignLedger v2 | 0x4afA577fA914068451e0Aa97b61F23960f02aCc4 | Session governance — claim registration, verification, pause | Sprint 016 |
| BenevolenceFund v2 | 0x96E8006a1fBB693B55fFf6254B8BF19EC605251B | 3% session fee community fund — annual 50/30/20 distribution | Sprint 016 |
| SovereignAchievement (ERC-1155) | 0xC3F11d2F1F12bB96b9DCF7e8f85e9704D2869B8D | Unified soulbound NFTs — 10 participant + 10 guide tiers | Sprint 016 |
| HNT v2 (ERC-20) | 0x1ae1e10929f008d1f9883ce574a318abd86084e2 | Sovereign wellness token — earned by participants | Pre-Sprint |
| MindMasteryNFT (ERC-1155) | 0xCb9EcB00574DB29976c7C54045d443666D5C7771 | L1/L2/L3 level gating NFT — soulbound | Pre-Sprint |
| AlchemistForge | 0xE092336F8f5082e57CcBb341A110C20ad186A324 | Shadow integration — permissionless on-chain recording | Pre-Sprint |

## Retired Contracts (v1 — historical reference only)

| Contract | Address | Retired | Reason |
|----------|---------|---------|--------|
| EHT v1 | 0xbDaeb1d05E02D2751Ad07121510b5f0C436E2CdC | Sprint 016 | No supply cap — replaced by EHTv2 |
| SovereignLedger v1 | 0xf32979200768e8726d5EC5E5AB0CA7407d64A94e | Sprint 016 | Minimal stub — replaced by full v2 |
| BenevolenceFund v1 | 0xbe710a0a5a80dfa3ca7dfadc959176d545b18271 | Sprint 016 | 214-byte stub — replaced by full v2 |
| PractitionerAchievement v1 | 0xe23e39799a47af1c383464c958e7724eed36f987 | Sprint 016 | 214-byte stub — replaced by SovereignAchievement |
| ParticipantAchievement v1 | 0x406c30894a14b53a6b5700025c06dd0697586fc6 | Sprint 016 | 214-byte stub — replaced by SovereignAchievement |

## Deployer Wallet
- Address: 0xf22cbF25deEeA36FFF828BAf73CCb049345eF248
- Used for: All contract deployments and admin functions
- Dr. Meg's sovereign wallet

## Block Explorer
All contracts viewable at: https://eth-sepolia.blockscout.com

## Admin Controls
| Contract | Owner Functions | Risk |
|----------|---------------|------|
| HNT v2 | mint() — owner only | Medium (minting authority) |
| MindMasteryNFT | mint() — owner only | Medium |
| SovereignLedger | registerClaim() — open to all | Low |
| AlchemistForge | store() — open to all | Low |
| BenevolenceFund | distribute() — owner only (annual) | Low (yearly only) |

## Mainnet Migration Plan
When ready for mainnet:
1. Deploy identical contracts to Ethereum mainnet (or Polygon for lower gas)
2. Update all frontend contract addresses
3. Migrate token balances via snapshot + airdrop
4. Announce migration period (30 days)
5. Disable Sepolia contracts after migration

*This registry is anchored to IPFS and AlchemistForge contract.*

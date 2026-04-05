# FSL Smart Contract Registry
**Network:** Sepolia Testnet
**Last Updated:** April 3, 2026

## Deployed Contracts

| Contract | Address | Purpose | Deployed |
|----------|---------|---------|----------|
| HNT v2 (ERC-20) | 0x1ae1e10929f008d1f9883ce574a318abd86084e2 | Sovereign wellness token — earned by participants | Pre-Sprint |
| EHT (ERC-20) | 0xbDaeb1d05E02D2751Ad07121510b5f0C436E2CdC | Energetic Healing Token — practitioner rewards | Pre-Sprint |
| MindMasteryNFT (ERC-1155) | 0xCb9EcB00574DB29976c7C54045d443666D5C7771 | L1/L2/L3 level gating NFT — soulbound | Pre-Sprint |
| SovereignLedger | 0xf32979200768e8726d5EC5E5AB0CA7407d64A94e | Session attestation + superbill records | Pre-Sprint |
| AlchemistForge | 0xE092336F8f5082e57CcBb341A110C20ad186A324 | Document anchoring + backup archive | Pre-Sprint |
| BenevolenceFund | 0xbe710a0a5a80dfa3ca7dfadc959176d545b18271 | 3% session fee community fund | Sprint 011 |
| PractitionerAchievement (ERC-1155) | 0xe23e39799a47af1c383464c958e7724eed36f987 | 10-tier practitioner soulbound NFTs | Sprint 011 |
| ParticipantAchievement (ERC-1155) | 0x406c30894a14b53a6b5700025c06dd0697586fc6 | 10-tier participant soulbound NFTs | Sprint 011 |

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

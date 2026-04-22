# V2 Contract Deployment Log — Sepolia

**Date:** 2026-04-21
**Network:** Sepolia (Chain ID: 11155111)
**Deployer:** 0xf22cbF25deEeA36FFF828BAf73CCb049345eF248
**Balance after deploy:** 12.49 ETH
**Compiler:** Solidity 0.8.20, optimizer enabled (200 runs)
**RPC:** Infura Sepolia

## Deployed Contracts

| Contract | Address | Constructor Args |
|----------|---------|-----------------|
| EHTv2 | `0x93583a7A24e50075c79b06db0be8Cf4D45B0bd88` | None (MAX_SUPPLY minted to deployer in constructor) |
| SovereignLedger v2 | `0x4afA577fA914068451e0Aa97b61F23960f02aCc4` | None |
| BenevolenceFund v2 | `0x96E8006a1fBB693B55fFf6254B8BF19EC605251B` | None |
| SovereignAchievement | `0xC3F11d2F1F12bB96b9DCF7e8f85e9704D2869B8D` | ("FSL Sovereign Achievement", "https://api.futuresystemslab.io/api/nft/metadata/{id}") |

## Verification

All 4 contracts confirmed on Blockscout (is_contract: true).
EHTv2 auto-detected as ERC-20 "Energetic Healing Token".

## Blockscout Links

- [EHTv2](https://eth-sepolia.blockscout.com/address/0x93583a7A24e50075c79b06db0be8Cf4D45B0bd88)
- [SovereignLedger v2](https://eth-sepolia.blockscout.com/address/0x4afA577fA914068451e0Aa97b61F23960f02aCc4)
- [BenevolenceFund v2](https://eth-sepolia.blockscout.com/address/0x96E8006a1fBB693B55fFf6254B8BF19EC605251B)
- [SovereignAchievement](https://eth-sepolia.blockscout.com/address/0xC3F11d2F1F12bB96b9DCF7e8f85e9704D2869B8D)

## Artifacts

ABIs stored at `contracts/v2/artifacts/`:
- EHTv2.json
- SovereignLedger.json
- BenevolenceFund.json
- SovereignAchievement.json

## Deploy Environment

- Node: v20.20.1
- Hardhat: v2.22.x
- OpenZeppelin: v4.9.6
- VPS: 74.208.202.239 at /opt/fsl-contracts/

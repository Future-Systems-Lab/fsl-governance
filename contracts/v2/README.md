# FSL Smart Contracts v2 — Mainnet Ready

Clean rewrites of the Sprint 011 proof-of-concept contracts. These replace the Sepolia stubs with production-quality implementations.

## Contracts

| Contract | File | Replaces (Sepolia) | Description |
|----------|------|--------------------|-------------|
| SovereignLedger | `SovereignLedger.sol` | 0xf329...A94e | On-chain session governance with claim registration, verification, and pause |
| BenevolenceFund | `BenevolenceFund.sol` | 0xbe71...8271 | 3% session fee community fund with annual 50/30/20 distribution |
| SovereignAchievement | `SovereignAchievement.sol` | 0xe23e...f987 + 0x406c...6fc6 | Unified ERC-1155 soulbound achievement NFTs — 10 participant tiers + 10 guide tiers |

## Changes from v1

- **SovereignLedger:** v1 was 729 bytes with custom logic. v2 adds structured claims with participant/guide indexing, verification flow, and pause mechanism.
- **BenevolenceFund:** v1 was a 214-byte stub with only `getOwner()`. v2 implements full fund management with receive(), annual distribution with 300-day cooldown, and ReentrancyGuard.
- **SovereignAchievement:** v1 deployed identical 214-byte stubs to two separate addresses. v2 combines both into a single ERC-1155 contract with soulbound (non-transferable) tokens and 20 tier IDs (10 participant + 10 guide).

## Deployment

```bash
# Requires Hardhat + OpenZeppelin
npm install @openzeppelin/contracts
npx hardhat compile
npx hardhat run scripts/deploy.js --network sepolia
```

## Security Notes

- All contracts use OpenZeppelin v4 base contracts
- BenevolenceFund uses ReentrancyGuard on distribute()
- SovereignAchievement is soulbound — _beforeTokenTransfer blocks all transfers except minting
- SovereignLedger has owner-only pause for emergencies
- No upgradeable patterns — immutable once deployed

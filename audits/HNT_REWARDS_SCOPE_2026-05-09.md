# HNT Rewards + Celebrations — Scope Assessment
## Before Executing: Council Review Required
**Date:** May 9, 2026

---

## What's Requested vs What's Feasible Now

### CAN DO NOW (~2h)

| Item | Effort | Dependency |
|------|--------|-----------|
| CelebrationOverlay reusable component | 1h | None |
| Celebration on circle registration (client-side) | 30min | Component above |
| On-chain HNT balance read (ethers.js from client) | 30min | Sepolia RPC |
| Dashboard stat cards show live balances | 30min | RPC read |

### REQUIRES PROTECTED MODE APPROVAL (~8h)

| Item | Effort | Dependency |
|------|--------|-----------|
| Backend HNT minting on registration | 2h | Deployer private key, contract call authority |
| Backend HNT minting on completion | 2h | SessionCompleted event listener, deployer key |
| Streak tracking DB + logic | 2h | New table, backend cron |
| SovereignAchievement NFT minting at milestones | 2h | Deployer key, contract call |

### WHY PROTECTED MODE

The HNT contract `mint()` function requires the contract owner (deployer wallet) to sign the transaction. This means:
- The VPS backend needs `DEPLOYER_PRIVATE_KEY` to call `mint()`
- Every mint is a real Sepolia transaction costing gas
- Incorrect mint logic could drain the deployer wallet of Sepolia ETH
- Per FSL council protocol: smart contract calls with private keys require Dr. Meg approval

### RECOMMENDATION

1. **Now:** Build CelebrationOverlay + client-side balance reads + registration celebration (visual only, no actual HNT mint)
2. **Next sprint:** Backend minting service with Dr. Meg approval for deployer key usage
3. **Post-acceptance:** Production token economics with mainnet deployment

This keeps celebrations working visually while the token economics are designed properly.

---

## Dr. Meg Decision

1. **APPROVE visual celebrations only** → Build CelebrationOverlay + balance reads now. HNT minting deferred.
2. **APPROVE full scope** → Authorize deployer key usage for testnet HNT minting. CC builds backend minting service.
3. **DEFER entirely** → Add to deferred backlog, focus on working baseline.

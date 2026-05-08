# SovereignSession Deployment Log

## Sepolia Testnet

- **Contract:** 0xbeb13A360C6F0C77Ea3af3650Ab9762a1B9965A1
- **Deployer:** 0xd9C092fc32B2d71Db6AF1b92300B6a741a6476c1 (refill wallet)
- **Date:** May 8, 2026
- **Network:** Sepolia (chainId 11155111)
- **Verify:** https://eth-sepolia.blockscout.com/address/0xbeb13A360C6F0C77Ea3af3650Ab9762a1B9965A1

## Signaling Server

- **Host:** VPS 74.208.202.239
- **Port:** 4050 (localhost, behind Cloudflare tunnel)
- **Process:** PM2 `sovereign-session-signaling`
- **Protocol:** WebSocket with EIP-191 wallet auth per connection

## Phase 1 Gate Results

- Contract deployed: PASS
- Signaling server running: PASS
- EIP-191 wallet auth: PASS
- Two-wallet signaling test: PASS
- Message relay: PASS

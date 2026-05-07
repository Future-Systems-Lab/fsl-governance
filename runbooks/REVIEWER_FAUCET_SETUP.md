# Reviewer Faucet Wallet Setup
## Dr. Meg Action Required — DO NOT delegate to CC
**Status:** Awaiting wallet creation
**Last updated:** May 7, 2026

---

## Purpose

Dedicated wallets that auto-fund academic reviewers with testnet tokens so they can interact with FSL contracts during review (Tier 2 experience). Separate from deployer wallet — never reuse deployer for faucet operations.

---

## Sepolia EVM Faucet Wallet

### Dr. Meg Steps:

1. **Create new wallet** in Brave Wallet:
   - Open Brave → Wallet → Add Account → Create Account
   - Name it "FSL Reviewer Faucet (Sepolia)"
   - Copy the NEW address (starts with 0x...)

2. **Fund from deployer:**
   - Switch to deployer wallet in Brave
   - Send ~1 Sepolia ETH to the new faucet wallet address
   - Confirm tx on Sepolia Etherscan

3. **Deploy private key to VPS:**
   ```bash
   ssh root@74.208.202.239
   # Add faucet private key — NEVER share via chat, paste directly
   echo "REVIEWER_FAUCET_PRIVATE_KEY=<paste_here>" >> /opt/encrypthealth/.env
   echo "REVIEWER_FAUCET_ADDRESS=<paste_address>" >> /opt/encrypthealth/.env
   chmod 600 /opt/encrypthealth/.env
   ```

4. **Report to CC:** Only the faucet wallet ADDRESS (not the private key). CC uses the address for display and balance monitoring.

### Funding Parameters:
- Amount per reviewer: 0.01 Sepolia ETH
- Daily cap: 0.5 Sepolia ETH (50 reviewers/day)
- Lifetime cap per address: 1 funding ever
- Rate limit per IP: 10 fundings/day

---

## XRPL Testnet Faucet Wallet

### Dr. Meg Steps:

1. **Create XRPL testnet wallet:**
   - Visit https://testnet-faucet.xrpl-labs.com/
   - Click "Generate testnet credentials"
   - Save the address + secret securely

2. **Fund from XRPL testnet faucet:**
   - The faucet auto-funds 1000 XRP on testnet
   - No additional funding needed initially

3. **Deploy to VPS:**
   ```bash
   ssh root@74.208.202.239
   echo "XRPL_REVIEWER_FAUCET_SECRET=<paste_here>" >> /opt/encrypthealth/.env
   echo "XRPL_REVIEWER_FAUCET_ADDRESS=<paste_address>" >> /opt/encrypthealth/.env
   chmod 600 /opt/encrypthealth/.env
   ```

4. **Report to CC:** Only the XRPL faucet wallet ADDRESS.

### Funding Parameters:
- Amount per reviewer: 10 XRP (testnet)
- Daily cap: 500 XRP
- Lifetime cap per address: 1 funding ever

---

## Security Rules

- Faucet private keys NEVER appear in:
  - Chat messages
  - Git commits
  - Log files
  - Error messages
  - Client-side code
- Keys stored ONLY in VPS .env (chmod 600)
- CC references keys via process.env variable names only
- Faucet wallets are testnet-only — $0 real value
- If a faucet wallet is compromised, create a new one (no real funds at risk)

---

## After Setup

Tell CC: "Faucet wallets created. Sepolia address: 0x[address]. XRPL testnet address: r[address]. Keys deployed to VPS .env."

CC will then:
1. Verify VPS env vars are loaded
2. Create the /api/reviewer/request-funding endpoint
3. Wire the Tier 2 reviewer flow
4. Test end-to-end

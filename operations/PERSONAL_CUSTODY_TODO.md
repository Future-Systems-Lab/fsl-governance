# Personal Custody TODO

**Owner:** Dr. Meg Montanez-Davenport
**Created:** 2026-05-12

---

## DEFERRED UNTIL MAINNET MIGRATION

- **Hardware wallet: Arculus card** (https://arculus.co)
  - NFC tap-to-sign, EIP-1193 compatible with existing Brave Wallet flow
  - Multi-chain: Ethereum + XRP (covers deployer + XRPL mainnet)
  - ~$130
  - Generate FRESH wallet on card for mainnet deployment — do NOT import Sepolia deployer 0xf22cbF25 seed (treat hot wallet keys as compromised for mainnet use)
  - Steel seed plate the Arculus 12-word recovery phrase
  - Safety deposit box for steel plate
  - **Trigger:** mainnet migration
- Steel seed plate (for Arculus recovery phrase)
- Safety deposit box for wallet seeds + 2FA backup codes + legal documents
- Successor letter with attorney

### Rationale

All FSL contracts currently on Sepolia testnet. Deployer wallet 0xf22cbF25deEeA36FFF828BAf73CCb049345eF248 holds no real economic value. Custody discipline scales appropriately to value at risk. Upgrade to full custody protocol when:

(a) Mainnet contract deployment, OR
(b) BenevolenceFund receives first real session fees, OR
(c) Patent assignment recorded and FSL LLC begins receiving licensing revenue

### Currently Maintained

- Password manager with master password recovery
- Proton 2FA enabled
- ~/.fsl_recovery_env chmod 600
- Recovery bundle encrypted + IPFS pinned (Pinata)
- Weekly automated backup cron (Sunday 3 AM)

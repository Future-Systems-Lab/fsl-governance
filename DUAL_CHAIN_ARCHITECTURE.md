# FSL Dual-Chain Architecture
**Date:** 2026-04-07
**Author:** Dr. Meg Montanez-Davenport, D.N.Psy.

---

## Primary Chain: Ethereum (Sepolia Testnet)

All 8 smart contracts deployed on Ethereum Sepolia:

| Contract | Address | Purpose |
|----------|---------|---------|
| SovereignLedger | 0xf329...F78e | On-chain health records, session attestation |
| BenevolenceFund | 0xbe71...8271 | Community wellness treasury |
| HNT Token | Deployed | Sovereign Wellness Token |
| EHT Token | Deployed | EncryptHealth utility token |
| MindMasteryNFT | Deployed | Frequency achievement NFTs |
| AlchemistForge | Deployed | Shadow work document anchoring |
| BackupArchive | Deployed | Agreement hash storage |
| SessionAttestation | Deployed | Session completion proofs |

Mainnet deployment pending security audit.

## Secondary Payment Layer: XRPL (ISO 20022 Aligned)

XRPL serves as the payment layer for ISO 20022 aligned session payments:

- **XRP** (Ripple)
- **XLM** (Stellar Lumens)
- **HBAR** (Hedera)
- **ALGO** (Algorand)
- **ADA** (Cardano)

Wallet support via GemWallet and Crossmark. Currently disabled on landing page with "XRPL support coming soon" — dual-chain architecture visible but activation pending full end-to-end testing.

## Reserved for Future Activation

- **WalletConnect** — Architected and previously deployed. Removed from landing page for simplicity. Can be re-enabled by adding the WalletConnect button back with Web3Modal v5 configuration (already in providers.tsx via @web3modal/wagmi).

- **Card Payment (Stripe)** — Card button routes to Stripe checkout via POST /api/subscribe. Stripe test keys active on backend. Production Stripe activation pending business verification.

## Current Landing Page Wallet Hierarchy

1. **Brave Wallet** (primary) — injected() connector, personal_sign gate
2. **GemWallet / Crossmark** (XRPL) — disabled, coming soon
3. **Card** (Stripe bridge) — tier selector → Stripe checkout URL

## Sovereignty Principle

Wallet-first. Card is a bridge, not a destination. Every card subscriber is guided toward sovereign wallet setup post-payment.

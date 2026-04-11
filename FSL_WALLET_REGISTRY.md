# FSL Wallet Registry

**Last Updated:** April 11, 2026
**DO NOT include private keys or seeds in this document.**

---

## Active Wallets

| Wallet | Address | Network | Purpose | Status |
|--------|---------|---------|---------|--------|
| Dr. Meg Brave (EVM) | `0x739414BC271521Bea000A9aB2FbF79182124BCC3` | ETH Mainnet + Sepolia | Participant testing, personal wallet | Active, mining Sepolia ETH |
| Deployer (EVM) | `0xf22cbF25deEeA36FFF828BAf73CCb049345eF248` | ETH Mainnet + Sepolia | Smart contract deployment, admin | $0 mainnet, active Sepolia |
| FSL XRPL | `rwR3etLJVxtQXYs2d9jgBQxzHBivtCMdPd` | XRPL Mainnet | XRP session payments | NOT ACTIVATED — needs 10 XRP reserve |
| XRPL Testnet | `r992bUGu257HcnFvNiuxCo64v6brj9RdtK` | XRPL Testnet | Payment flow testing | Funded via faucet |
| Keplr (Cosmos) | TBD | Cosmos / Akash | Future Akash compute payments | Created, no AKT |

## XRPL Mainnet Activation

The XRPL mainnet wallet (`rwR3etLJ...`) returns "Account not found" — it has never been funded. XRPL requires a 10 XRP reserve to activate an account.

**To activate:**
1. Send 10+ XRP to `rwR3etLJVxtQXYs2d9jgBQxzHBivtCMdPd` from any exchange or wallet
2. At current XRP price (~$1.36), this costs ~$14
3. After activation, the address can receive session payments

## Smart Contract Addresses (Sepolia)

| Contract | Address |
|----------|---------|
| HypnoNeuroToken (HNT v2) | `0x1ae1e10929f008d1f9883ce574a318abd86084e2` |
| EncryptHealthToken (EHT) | `0xbDaeb1d05E02D2751Ad07121510b5f0C436E2CdC` |
| MindMasteryNFT | `0xCb9EcB00574DB29976c7C54045d443666D5C7771` |
| ClaimChainDAO | `0xf32979200768e8726d5EC5E5AB0CA7407d64A94e` |
| AlchemistForge | `0xE092336F8f5082e57CcBb341A110C20ad186A324` |
| BenevolenceFund | `0xbe710a0a5a80dfa3ca7dfadc959176d545b18271` |

---

*Addresses only — no private keys or seeds.*

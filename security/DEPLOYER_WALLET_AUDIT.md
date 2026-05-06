# FSL Deployer Wallet Audit

**Date:** 2026-04-29
**Auditor:** Automated investigation via Claude Code
**Classification:** LOCAL ONLY -- DO NOT PUSH TO GITHUB

---

## Wallet Addresses Investigated

| Wallet | Network Type |
|--------|-------------|
| `0xf22cbF25deEeA36FFF828BAf73CCb049345eF248` | EVM (Ethereum, L2s) |
| `rwR3etLJVxtQXYs2d9jgBQxzHBivtCMdPd` | XRPL |

---

## Chain-by-Chain Findings

### 1. Sepolia Testnet (Ethereum)

| Metric | Value |
|--------|-------|
| **Balance** | 12.4937 ETH (testnet -- no real value) |
| **Transaction Count** | 41 nonce / ~46 total txs |
| **Contract Deployments** | 7 |
| **Token Holdings** | 144,000 EHT (EnerHealth), 100,000,018 HNT (HypnoNeuro) |

**Deployed Contracts (Sepolia):**

| Contract Address | Notes |
|-----------------|-------|
| `0xc3f11d2f1f12bb96b9dcf7e8f85e9704d2869b8d` | |
| `0x96e8006a1fbb693b55fff6254b8bf19ec605251b` | |
| `0x4afa577fa914068451e0aa97b61f23960f02acc4` | |
| `0x93583a7a24e50075c79b06db0be8cf4d45b0bd88` | EnerHealth (EHT) token |
| `0x406c30894a14b53a6b5700025c06dd0697586fc6` | |
| `0xe23e39799a47af1c383464c958e7724eed36f987` | |
| `0xbe710a0a5a80dfa3ca7dfadc959176d545b18271` | |

**Risk:** NONE. Sepolia is a testnet. All ETH and tokens here have zero monetary value.

---

### 2. Ethereum Mainnet

| Metric | Value |
|--------|-------|
| **Balance** | 0.0 ETH |
| **Transaction Count** | 0 |

**Risk:** NONE. This address has never been used on Ethereum mainnet.

---

### 3. Polygon (PoS)

| Metric | Value |
|--------|-------|
| **Balance** | 0.0 POL |
| **Transaction Count** | 0 |

**Risk:** NONE.

---

### 4. Optimism

| Metric | Value |
|--------|-------|
| **Balance** | 0.0 ETH |
| **Transaction Count** | 0 |

**Risk:** NONE.

---

### 5. Arbitrum One

| Metric | Value |
|--------|-------|
| **Balance** | 0.0 ETH |
| **Transaction Count** | 0 |

**Risk:** NONE.

---

### 6. Base

| Metric | Value |
|--------|-------|
| **Balance** | 0.0 ETH |
| **Transaction Count** | 0 |

**Risk:** NONE.

---

### 7. XRPL (XRP Ledger Mainnet)

| Metric | Value |
|--------|-------|
| **Balance** | 15.001117 XRP |
| **Sequence** | 103489610 |
| **Owner Count** | 0 (no trust lines, escrows, or offers) |
| **Transaction Count** | 2 (both inbound payments) |

**Transaction History:**
- Received 15.001116 XRP (initial funding)
- Received 0.000001 XRP (dust/test transaction)

**Risk:** LOW. The wallet holds ~15 XRP. At ~$0.50/XRP this is approximately $7.50 USD. The 10 XRP reserve requirement means only ~5 XRP ($2.50) is actually spendable. No trust lines have been established, no tokens issued, no outbound transactions ever sent.

---

## Total USD Value at Risk

| Chain | Asset | Amount | Approx USD |
|-------|-------|--------|-----------|
| Sepolia | ETH | 12.49 | $0.00 (testnet) |
| Sepolia | EHT token | 144,000 | $0.00 (testnet) |
| Sepolia | HNT token | 100M | $0.00 (testnet) |
| Ethereum Mainnet | ETH | 0.0 | $0.00 |
| Polygon | POL | 0.0 | $0.00 |
| Optimism | ETH | 0.0 | $0.00 |
| Arbitrum | ETH | 0.0 | $0.00 |
| Base | ETH | 0.0 | $0.00 |
| **XRPL** | **XRP** | **15.00** | **~$7.50** |
| | | **TOTAL AT RISK** | **~$7.50** |

---

## Cross-Chain Entity Relationship

Both the EVM address (`0xf22cbF25deEeA36FFF828BAf73CCb049345eF248`) and the XRPL address (`rwR3etLJVxtQXYs2d9jgBQxzHBivtCMdPd`) are referenced together throughout the FSL/HypnoNeuro codebase, including:

- `HypnoNeuro/encrypthealth/frontend/components/PaymentModal.tsx`
- `HypnoNeuro/encrypthealth/frontend/components/EcosystemShell.tsx`
- `HypnoNeuro/dashboard/var/www/html/index.html`
- `hypnoneuro-games/build/frontend/src/pages/SubscriptionGate.jsx`
- `fsl-command-center/status.json`

There is no cryptographic proof linking the two addresses cross-chain, but their co-occurrence in the same codebase as project deployer/payment addresses strongly indicates they are controlled by the same entity.

---

## Key Rotation Priority Recommendation

### Priority: LOW (no urgency)

**Rationale:**
1. **No real funds at risk on EVM chains.** The deployer address has zero balance and zero transactions on all EVM mainnets (Ethereum, Polygon, Optimism, Arbitrum, Base). It has only been used on the Sepolia testnet.
2. **Negligible XRPL exposure.** The XRPL wallet holds ~$7.50, most of which is locked as the 10 XRP account reserve.
3. **No deployed mainnet contracts.** Since no contracts have been deployed to any mainnet, there are no ownership/admin concerns for live contracts.
4. **Sepolia contracts are disposable.** Testnet contracts can be redeployed at will with a new key.

### Recommended Actions (non-urgent):

1. **Before any mainnet deployment:** Generate a fresh deployer key. Do not reuse this testnet deployer for production.
2. **Consider a hardware wallet** for the mainnet deployer to ensure the private key never touches disk.
3. **Rotate the XRPL wallet** if the private key is stored in plaintext anywhere in the codebase or on a server. The ~$7.50 is not worth the risk of a leaked key enabling social-engineering attacks or impersonation.
4. **Audit `.env` files and deployment scripts** to ensure no private keys are committed to version control.
5. **Use a multisig or Safe** for any mainnet contract ownership going forward.

---

## Summary

**No real funds are at material risk.** The EVM deployer has only ever been used on Sepolia testnet. The XRPL wallet holds approximately $7.50 worth of XRP. Key rotation is recommended as a hygiene measure before any mainnet deployment, but there is no emergency requiring immediate action.

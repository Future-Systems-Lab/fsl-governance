# FSL Canonical Link Standards
## Block Explorer, RPC, and External Service References
**Updated:** May 8, 2026

---

## Block Explorer

**Canonical:** `eth-sepolia.blockscout.com` (Blockscout)

| Use Case | URL Pattern |
|----------|-------------|
| Transaction | `https://eth-sepolia.blockscout.com/tx/{hash}` |
| Address/Contract | `https://eth-sepolia.blockscout.com/address/{address}` |
| Token | `https://eth-sepolia.blockscout.com/token/{address}` |

### Rationale
- Open source (no vendor lock-in)
- No API key required for basic queries
- No rate limits on explorer pages
- Better event decoding UX (decoded logs default)
- Verified source code display with Sourcify integration
- Consistent with FSL sovereignty thesis (open infra over proprietary)

### Etherscan — When Acceptable
- Internal developer docs comparing explorers
- Contract verification pages where both explorers verify source (mention both)
- Never in user-facing UI copy or reviewer surfaces

---

## RPC Endpoints

| Priority | URL | Use |
|----------|-----|-----|
| Primary | `https://ethereum-sepolia-rpc.publicnode.com` | Free, no key |
| Fallback | `https://sepolia.gateway.tenderly.co` | Free, no key |
| Fallback | `https://rpc.sepolia.org` | Community, sometimes slow |

---

## XRPL Explorer

**Canonical:** `livenet.xrpl.org`

| Use Case | URL Pattern |
|----------|-------------|
| Account | `https://livenet.xrpl.org/accounts/{address}` |

---

## Wallet Chain Config

When prompting `wallet_addEthereumChain`, use Blockscout as the explorer:

```javascript
blockExplorerUrls: ['https://eth-sepolia.blockscout.com']
```

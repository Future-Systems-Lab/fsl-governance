# SovereignSession Wallet Support Matrix
## Phase 2 — Canonical Reference

**Updated:** May 8, 2026

---

## Promoted Wallets (UI copy + deep links)

| Wallet | Tier | Platform | Notes |
|--------|------|----------|-------|
| **Brave Wallet** | PRIMARY | Desktop (built-in), Mobile (in-app dApp browser) | No extension needed — built into Brave Browser |
| **Rainbow** | SECONDARY | Desktop (extension), Mobile (in-app dApp browser) | Best UX, independent |
| **WalletConnect** | FALLBACK | Universal | QR code (desktop) or deep link (mobile) to any compatible wallet |

## Transparently Supported (EIP-1193 detection)

Any wallet that injects `window.ethereum` works automatically. FSL does not promote, instruct, or name these wallets in UI copy — but they work if the user has them installed.

## Never Promoted or Mentioned

| Wallet | Reason |
|--------|--------|
| MetaMask | Retired ecosystem-wide per FSL canonical (commit ab8bdf8, April 2026) |
| Coinbase Wallet | Coinbase Inc. is a publicly-traded centralized exchange — brand association undercuts FSL sovereignty thesis |

---

## Detection Flow

```
1. Check window.ethereum exists
   ├── YES → Use directly (covers desktop extensions + mobile in-app browsers)
   │         Prefer Brave Wallet if window.ethereum.isBraveWallet
   └── NO
       ├── Mobile? → Show "Open in your wallet's browser" + deep links
       │             - Brave Mobile deep link
       │             - Rainbow Mobile deep link
       │             - WalletConnect QR fallback
       └── Desktop? → WalletConnect QR primary
```

---

## Browser Compatibility Testing Matrix

### Desktop — Automated Test Results (May 8, 2026)
| Browser | Wallet | WebRTC | Playwright | Status |
|---------|--------|--------|-----------|--------|
| Brave | Brave Wallet (native) | Chromium WebRTC | 12/12 PASS (via Chromium) | PRIMARY |
| Chrome | Extension wallets | Chromium WebRTC | 12/12 PASS | Verified |
| Firefox | Extension wallets | Firefox WebRTC | 12/12 PASS | Verified |
| Safari | WalletConnect only (no extensions) | Safari WebRTC | Pending (WebKit deps on AlmaLinux) | Best-effort |
| Edge | Extension wallets | Chromium WebRTC | Covered by Chromium baseline | Verified |

### Mobile Native Browsers
| Browser | Wallet | WebRTC | Status |
|---------|--------|--------|--------|
| Safari iOS | WalletConnect deep link | iOS WebRTC | Supported |
| Chrome Android | WalletConnect deep link | Android WebRTC | Supported |

### Mobile In-App dApp Browsers
| App | window.ethereum | WebRTC | Status |
|-----|----------------|--------|--------|
| Brave Mobile | Native | Yes | PRIMARY |
| Rainbow Mobile | Native | Yes | SECONDARY |
| Status | Native | Yes | Supported |
| Opera Crypto | Native | Yes | Supported |

---

## Authentication Pattern

All wallet auth follows the FSL canonical EIP-191 pattern (commit be51a7880):

```
1. eth_requestAccounts → get wallet address
2. personal_sign(message, address) → EIP-191 signature
3. Server: ethers.verifyMessage(message, signature) → recovered address
4. Compare recovered vs claimed → authenticate
```

No ethers.js on the client. Pure `window.ethereum` EIP-1193 calls only.

---

## WalletConnect Integration (Phase 3)

WalletConnect v2 integration is scaffolded as a Phase 3 addition:
- Requires `@walletconnect/modal` + `@walletconnect/ethereum-provider`
- WalletConnect project ID from cloud.walletconnect.com
- QR modal for desktop, deep links for mobile
- Same EIP-191 personal_sign flow once connected

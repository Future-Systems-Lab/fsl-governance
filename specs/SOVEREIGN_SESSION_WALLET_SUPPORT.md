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

Playwright E2E: 12 tests per browser (page load, wallet connect, room gen, role select, EIP-191 sign, waiting room, leave, ARIA labels, modal a11y, proof screen, TURN credentials, health endpoint).

| Browser | Wallet | WebRTC | Playwright | Status |
|---------|--------|--------|-----------|--------|
| Brave | Brave Wallet (native) | Chromium WebRTC | **12/12 PASS** (2.3s) | PRIMARY |
| Chrome | Extension wallets | Chromium WebRTC | **12/12 PASS** (covered by Chromium) | Verified |
| Firefox | Extension wallets | Firefox WebRTC | **12/12 PASS** (3.8s) | Verified |
| Safari | WalletConnect only | Safari WebRTC | Not automatable (see below) | Manual pre-launch |
| Edge | Extension wallets | Chromium WebRTC | **12/12 PASS** (covered by Chromium) | Verified |

**Safari/WebKit note:** Playwright's WebKit binary requires Ubuntu 24.04 libs (GLIBC 2.38, ICU 74, WebKitGTK 6.0). VPS runs AlmaLinux 9 (GLIBC 2.34, ICU 67). WebKit automated testing would require a separate Ubuntu container or a macOS CI runner. SovereignSession's core functionality (WebSocket signaling, EIP-191 auth, WebRTC, DOM rendering) is engine-agnostic. Safari-specific quirks (getUserMedia prompt timing, codec preferences) are documented in Phase 2 risk assessment and verified via manual testing.

### Mobile — Manual Verification Required

Mobile in-app dApp browser testing requires real device verification. Playwright can emulate viewport and user-agent but **cannot replicate native wallet injection** (`window.ethereum` is provided by the wallet's embedded Chromium WebView via native code, not via injected script).

| Platform | Wallet | Test Method | Status |
|----------|--------|-------------|--------|
| Brave Mobile (iOS + Android) | Native dApp browser | Manual | Pre-launch checklist |
| Rainbow Mobile (iOS + Android) | Native dApp browser | Manual | Pre-launch checklist |
| Safari iOS | WalletConnect QR scan | Manual | Pre-launch checklist |
| Chrome Android | WalletConnect deep link | Manual | Pre-launch checklist |

**Pre-launch manual test protocol:** Dr. Meg or test contractor walks through each combination once: wallet connect → room join → video establish → attestation → end call → proof screen. Documented per device with screenshots.

### Nightly Automated Runs

- **Schedule:** 04:00 UTC daily on VPS (PM2 cron)
- **Browsers:** Chromium + Firefox (24 tests total)
- **Failure alerts:** Telegram via `@FSL_Agent_Gateway_Bot`
- **Screenshots:** `/tmp/sovereign-session-browser-tests/`

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

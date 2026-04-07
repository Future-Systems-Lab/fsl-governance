# FSL Agent Council — MetaMask Mobile Security Fix
## April 7, 2026

### Issues Addressed
1. MetaMask mobile redirect loop (deep link opens login instead of connecting)
2. MetaMask harmful website warning (PhishFort blocklist)

---

## Council Recommendations

### SYSTEM_ARCHITECT: Abandon deep links → WalletConnect for mobile
Use WalletConnect connector for mobile MetaMask instead of deep links. Detect mobile and switch connector.

### FRONTEND: Auto-connect on MetaMask browser
Add AutoConnect component that detects `window.ethereum` and auto-connects via wagmi injected connector on mount. This handles the case where MetaMask browser loads the page but wagmi doesn't auto-connect.

### SECURITY: Interstitial warning page
Add cookie-based warning acknowledgment for MetaMask phishing flag while awaiting PhishFort approval.

### HYPNONEURO: Direct URL navigation
Use `window.location.replace()` instead of `window.open()` for game launch to avoid popup blockers.

### COMPLIANCE: DNS TXT verification
Add `_metamask-verification` DNS TXT record + email security@metamask.io directly.

---

## Implementation Status

- [ ] AutoConnect component added to layout
- [ ] WalletConnect for mobile MetaMask
- [ ] DNS TXT verification record
- [ ] PhishFort submission follow-up email

*Council consultation saved for governance record.*

# XRPL Signature Verification — Implementation Spec

## Current State

The `/api/auth/verify-xrpl` endpoint validates:
1. XRPL address format (starts with 'r', 25-35 chars)
2. Signed message contains the address (prevents blind replay)
3. Crossmark exception: accepts 'crossmark-signed' (wallet-level auth only)

**Gap:** No cryptographic verification of the XRPL signature.

## Implementation Plan

### Dependencies
```bash
npm install xrpl ripple-keypairs
```

### Verification Flow
```
1. Client sends: { address, signedMessage }
2. Server fetches account public key from XRPL ledger:
   - Connect to wss://s.altnet.rippletest.net:51233 (testnet)
   - account_info request for address
   - Extract RegularKey or master public key
3. Verify signature:
   - ripple-keypairs.verify(messageHex, signatureHex, publicKey)
4. If valid: issue JWT
5. If invalid: 401
```

### GemWallet Format
GemWallet's `signMessage()` returns:
```json
{
  "result": {
    "signedMessage": "hex-encoded-signature"
  }
}
```
The signature is over the raw message bytes using the account's Ed25519 or secp256k1 key.

### Crossmark Format
Crossmark's `signInAndWait()` returns:
```json
{
  "response": {
    "data": {
      "address": "rXXX..."
    }
  }
}
```
No message signature is returned. Crossmark authenticates via PIN/biometric at the wallet level — the server cannot verify independently.

### Recommendation

For Crossmark: continue trusting wallet-level auth (acceptable for testnet). For mainnet, require GemWallet or implement a custom signing flow via Xaman (formerly Xumm) which provides verifiable signatures.

## Estimated Effort
- 4 hours for full implementation
- Priority: HIGH for mainnet, MEDIUM for testnet

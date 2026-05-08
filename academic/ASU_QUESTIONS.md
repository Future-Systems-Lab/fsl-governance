# ASU DEng — Anticipated Questions and Answers
## Prepared for Faculty Review
**Last Updated:** May 9, 2026

---

## Q: How does each participant have their own personalized dashboard without a traditional account system?

Every participant dashboard is wallet-scoped. When a participant connects their wallet, they sign an EIP-191 message proving ownership of their wallet address. The backend verifies the signature and issues a JWT cookie tied to that specific address. Every subsequent API call and PostgreSQL query filters by that wallet address. Blockchain reads (HNT balance, NFTs, achievement tiers) are also filtered by wallet address directly from Sepolia contracts.

This means:
- No username/password database exists to breach
- No central identity authority — blockchain verifies ownership, FSL never grants or revokes identity
- Each participant's health records, session history, mood entries, and billing records are stored in PostgreSQL keyed to their wallet address
- Participant sovereignty controls (Download My Record, Revoke All Access) give participants full data portability and deletion rights at any time
- FSL is the infrastructure layer, not the gatekeeper

This is the Identity layer of the six-layer thesis in deployed production form. The dashboard isn't personalized by FSL — it's cryptographically gated by the participant's own private key.

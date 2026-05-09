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

---

## Q: How is file encryption handled?

File encryption is delegated to Lighthouse, a decentralized storage network built on IPFS that provides access control at the encryption layer. FSL's architectural contribution is the consent layer on top: wallet-scoped access grants and revocations, signed with EIP-191, anchored to Sepolia via the BackupArchive contract. The combination means: files are encrypted by infrastructure FSL doesn't control (Lighthouse), and access is governed by cryptographic signatures the participant controls (EIP-191). FSL is never in the trust chain for file content.

Proxy re-encryption (the academic frontier that would remove Lighthouse as a dependency entirely) is identified as a DEng research contribution — specifically aligned with Dr. Boscovic's lab's work on proxy re-encryption architectures for health data.

---

## Q: Does FSL integrate with supplement ordering platforms?

FSL integrates with Fullscript, the leading professional supplement dispensary platform. The Wellness Tip of the Day feature surfaces orthomolecular education with direct ordering links to Dr. Meg's Fullscript dispensary.

Planned: Full Fullscript API integration (REST API with Granular Search + Professional Catalog) to dynamically surface supplement recommendations based on participant mood patterns, Walsh biotype results, and neurotransmitter frequency data. This closes the loop between FSL's orthomolecular intelligence layer and actionable supplement protocols — without FSL ever handling transactions or storing purchase data. Participants order directly through Fullscript's HIPAA-compliant platform.

Dr. Meg has an active Fullscript practitioner dispensary under Naturopathic Psychology and Hypnosis Center (hypnosispsych.com) — the dispensary relationship is practitioner-to-participant, not platform-to-participant. FSL integrates as the technology layer. API access request to fullscript.dev is pending.

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

Planned: Full Fullscript API integration (REST API with Granular Search + Professional Catalog) to dynamically surface supplement recommendations based on participant mood patterns, orthomolecular biotype results, and neurotransmitter frequency data. This closes the loop between FSL's orthomolecular intelligence layer and actionable supplement protocols — without FSL ever handling transactions or storing purchase data. Participants order directly through Fullscript's HIPAA-compliant platform.

Dr. Meg has an active Fullscript practitioner dispensary under Naturopathic Psychology and Hypnosis Center (hypnosispsych.com) — the dispensary relationship is practitioner-to-participant, not platform-to-participant. FSL integrates as the technology layer. API access request to fullscript.dev is pending.

---

## Q: How does the HNT token economic model work?

HNT (Healing Neurotransmitter Token) is a participation token on Sepolia testnet. Participants earn HNT through therapeutic engagement — sessions, circles, mood logging, lab uploads. HNT converts to session discounts (7/11/22% tiers, burned on use).

The economic model is a cooperative flywheel: 3% of every session fee goes to the BenevolenceFund smart contract. The fund distributes annually — 50% to top Sovereign Guides (ranked by participant outcomes), 30% to participants in need (sponsored sessions), 20% to ecosystem development.

Session prices are adjusted so Sovereign Guides receive at minimum their target income even at maximum discount (22%). The adjustment formula: Target Income ÷ (0.97 × 0.78). At solo-guide scale, the BenevolenceFund return is modest (~$150-600/year). At multi-guide scale, top guides recover the discount differential and more through annual distribution.

This is a deployed implementation of cooperative health economics — solving the practitioner income preservation problem that centralized platforms solve through extraction. The BenevolenceFund contract enforces transparent, on-chain distribution without intermediary discretion.

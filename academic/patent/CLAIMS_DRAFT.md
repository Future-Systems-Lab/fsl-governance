# Provisional Patent Application — Claims Draft

## Independent Claims

### Claim 1 — Integrated System

1. A computer-implemented system for sovereign behavioral health data governance, comprising:
   a. a wallet authentication module configured to detect an Ethereum-compatible wallet provider on a participant's computing device and request account authorization through said wallet provider;
   b. a consent attestation module configured to construct a human-readable consent message containing a sovereignty declaration, educational disclaimers, the participant's wallet address, a server-generated cryptographic nonce, and a timestamp, and to request the participant's cryptographic signature of said consent message via the EIP-191 personal_sign method;
   c. a server verification module configured to recover the signer's address from the cryptographic signature using ECDSA signature recovery, verify the recovered address matches the claimed participant address, validate that the consent message contains required consent phrases, and issue a short-lived authentication token containing the verified address and an assigned role;
   d. a middleware enforcement layer configured to intercept requests to protected resources, verify the authentication token, extract the verified wallet address and role, and enforce role-based access control;
   e. a smart contract layer deployed on a blockchain network, comprising one or more permissionless smart contracts configured to record behavioral health engagement attestation events on-chain, wherein said attestation events are associated with wallet addresses and contain no personally identifiable health information; and
   f. an off-chain encrypted storage layer configured to store session metadata and wellness engagement metrics in an encrypted format accessible only through wallet-gated decryption;
   wherein the system is architecturally constrained to hold zero personally identifiable health information (PHI) such that the system operates outside the scope of health information privacy regulations applicable to covered entities.

### Claim 2 — Consent Attestation Method

2. A computer-implemented method for cryptographic consent attestation in a behavioral health data governance system, comprising:
   a. detecting an available wallet provider on a participant's computing device;
   b. requesting and receiving the participant's blockchain wallet address from the wallet provider;
   c. generating a cryptographic nonce using a cryptographically secure random number generator;
   d. constructing a consent message comprising a plain-language description of the data access scope, one or more disclaimers regarding the nature of the platform, the participant's wallet address, the cryptographic nonce, and a timestamp;
   e. requesting the participant's cryptographic signature of the consent message via an Ethereum-compatible personal signing method;
   f. receiving the cryptographic signature from the wallet provider after the participant has reviewed and approved the consent message;
   g. recovering the signer's address from the cryptographic signature using elliptic curve digital signature algorithm (ECDSA) signature recovery;
   h. verifying that the recovered address matches the claimed participant address;
   i. validating that the signed consent message contains one or more required consent phrases; and
   j. issuing an authentication token derived from the verified signature, wherein the authentication token serves simultaneously as proof of identity, proof of informed consent, and session authorization;
   wherein the single cryptographic signature event unifies user authentication, informed consent, and session authorization into one verifiable, attributable, revocable, and portable consent artifact.

### Claim 3 — Zero-PHI Architectural Constraint

3. A system for health-related data governance, comprising:
   a. a data classification layer that categorizes data elements as on-chain public attestation data, off-chain encrypted operational data, or excluded data that is never collected or stored;
   b. wherein on-chain public attestation data comprises wallet addresses, consent event hashes, session attestation timestamps, and achievement credentials, and wherein said on-chain data contains no personally identifiable health information;
   c. wherein off-chain encrypted operational data comprises aggregate session metadata and wellness engagement metrics stored in an encrypted database and encrypted distributed file system, accessible only through wallet-gated decryption;
   d. wherein excluded data comprises real names, government identifiers, clinical diagnoses, treatment plans, and insurance identifiers, and wherein the system is architecturally configured to never collect, store, or transmit said excluded data;
   e. a consent-gated access control mechanism wherein participant data access by credentialed wellness practitioners is conditioned upon a participant-initiated cryptographic consent grant that the participant can revoke at any time; and
   f. a blockchain attestation layer that records session governance events on a public blockchain as immutable audit trail entries containing no protected health information;
   wherein the architectural constraint of holding zero PHI positions the system outside the regulatory scope of health information privacy laws applicable to covered entities, creating a privacy posture that is stronger than regulatory compliance because the protected data category does not exist within the system.

### Claim 4 — Sovereign Guide Attestation Model

4. A computer-implemented method for consent-gated practitioner access in a decentralized behavioral health system, comprising:
   a. maintaining a default state of no access, wherein a credentialed wellness practitioner designated as a Sovereign Guide has no visibility into a participant's records;
   b. receiving a consent grant from the participant, wherein the consent grant comprises a cryptographic wallet signature authorizing a specific Sovereign Guide, identified by wallet address, to access the participant's records within a defined scope;
   c. enabling the Sovereign Guide to view participant records within the granted scope upon verification of the consent grant;
   d. upon occurrence of a wellness session, recording a session attestation on a blockchain network through a smart contract call initiated by the Sovereign Guide, wherein the attestation comprises the participant's wallet address, the Sovereign Guide's wallet address, a session identifier, and a timestamp;
   e. emitting one or more blockchain events associated with the session attestation, wherein said events are publicly queryable but contain no personally identifiable health information; and
   f. upon receiving a revocation request from the participant, immediately terminating the Sovereign Guide's access to the participant's records, wherein historical session attestations recorded on-chain remain as an immutable audit trail;
   wherein the participant maintains sovereign control over all access grants and revocations, and the Sovereign Guide's authority is limited to initiating session attestation events within an active consent grant.

### Claim 5 — Multi-Platform Unified Authentication

5. A system for unified cryptographic authentication across a plurality of interconnected platforms, comprising:
   a. a plurality of web-based platforms, each serving a distinct function in a decentralized data governance ecosystem;
   b. a shared authentication architecture wherein each platform accepts a single cryptographic wallet signature as the unified mechanism for user authentication, informed consent, and session authorization;
   c. a role-based access control layer wherein the authentication token derived from the cryptographic signature contains a verified wallet address and an assigned role, and wherein different platforms enforce different role requirements;
   d. a session continuity mechanism comprising a silent token refresh that issues fresh authentication tokens without requiring re-signing, while maintaining the security property that any individual token is valid for a bounded time period; and
   e. a cross-platform consent model wherein a participant's consent grant to a credentialed practitioner is recognized across the plurality of platforms;
   wherein a single wallet-signed consent event provides authenticated access to the entire ecosystem without requiring separate credentials, account creation, or personally identifiable information for any platform.

---

## Dependent Claims

6. The system of claim 1, wherein the wallet authentication module implements multi-provider discovery to detect and prioritize among a plurality of injected Ethereum-compatible wallet providers.

7. The system of claim 1, wherein the authentication token is a JSON Web Token (JWT) with a bounded expiration period of no more than 24 hours, delivered as a browser cookie with security attributes preventing cross-site access.

8. The method of claim 2, wherein the cryptographic nonce has a time-to-live after which it is invalidated, preventing replay of the consent message.

9. The method of claim 2, wherein the consent message further comprises a role-specific consent scope, such that a participant signing a Sovereign Guide consent message receives a different role assignment than a participant signing a standard access consent message.

10. The system of claim 3, wherein the off-chain encrypted storage layer comprises an InterPlanetary File System (IPFS) node with content-addressed storage, and wherein document decryption keys are derived from or gated by the participant's wallet private key.

11. The method of claim 4, wherein the smart contract for session attestation is permissionless such that any wallet address can initiate a session attestation, and wherein the attestation records are publicly queryable by any party.

12. The method of claim 4, further comprising minting a blockchain-based achievement credential to the participant's wallet address upon completion of one or more session milestones, wherein the achievement credential is a soulbound token that cannot be transferred.

13. The system of claim 5, wherein the plurality of platforms comprises a health data management platform, a wellness engagement activity platform, a session governance and billing platform, a voluntary behavioral engagement recording platform, and a biometric wellness dashboard platform.

14. The system of claim 1, wherein the behavioral health engagement attestation events recorded on-chain comprise voluntary self-authored disclosures by the participant, and wherein no clinical diagnosis, treatment plan, or practitioner assessment is recorded on-chain.

15. The system of claim 1, further comprising an engagement incentive mechanism wherein the system mints a blockchain-based token to the participant's wallet address upon completion of a wellness engagement activity, wherein the token serves as a non-financial loyalty mechanism.

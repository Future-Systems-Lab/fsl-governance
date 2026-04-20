# EIP-191 Consent Architecture for Sovereign Behavioral Health Data Governance: A Decentralized Implementation

**Authors:** Meg Montanez-Davenport, D.N.Psy., CBHP, BCHN

**Affiliation:** Future Systems Lab, NC, USA

**Corresponding author:** future.systems.lab@proton.me

**Intellectual Property:** Future Systems Lab, USPTO Serial No. 99533250, Class 42 (pending)

**Keywords:** blockchain consent, self-sovereign identity, behavioral health, EIP-191, wallet-based authentication, data sovereignty, decentralized health informatics

---

## Abstract

Centralized behavioral health platforms create a fundamental asymmetry: participants generate intimate wellness data, yet have no cryptographic control over who accesses it, when, or why. This paper presents the architecture and implementation of Future Systems Lab (FSL), a five-platform sovereign wellness ecosystem that replaces traditional click-through consent with EIP-191 cryptographic signatures as the sole mechanism for identity verification, data access authorization, and session governance. We describe the full authentication flow from wallet connection through JSON Web Token issuance, the consent-gated access patterns that enforce participant sovereignty at the middleware layer, and the hybrid on-chain/off-chain data model that anchors consent events to Ethereum while maintaining operational performance. We present AlchemistForge, a purpose-built smart contract for recording voluntary behavioral health engagement (shadow integration) on-chain, as a proof-of-concept demonstrating that meaningful wellness participation data can be captured with full cryptographic consent and zero personally identifiable information. The system has been deployed on Sepolia testnet with five interconnected platforms, eight smart contracts, and a functioning multi-role consent architecture. We discuss the architectural tradeoffs between decentralization and usability, the limitations of testnet deployment, and the path toward a production system suitable for formal evaluation.

---

## 1. Introduction

Behavioral health data occupies a uniquely sensitive position in the health informatics landscape. Unlike laboratory results or imaging data, behavioral health records often contain subjective self-disclosures, therapeutic narratives, and psychological assessments that participants may not want shared even with other healthcare providers [1]. Yet the systems that store this data — electronic health records, therapy platforms, and wellness applications — operate on centralized architectures where the platform operator, not the participant, controls access.

The consent mechanisms governing these systems are equally centralized. A typical behavioral health application presents a Terms of Service agreement as a prerequisite to account creation. The participant clicks "I agree" — a legally binding but cryptographically meaningless act. The platform then stores their data in a database it controls, shares it according to policies the participant did not write, and may change those policies unilaterally. The participant's consent is a one-time event with no ongoing enforcement mechanism and no auditable trail [2].

This paper presents an alternative architecture. Future Systems Lab (FSL) is a sovereign wellness ecosystem comprising five interconnected platforms that use Ethereum wallet signatures (EIP-191) as the sole mechanism for identity, consent, and access control. In this system:

- **Identity** is a wallet address, not a username and password.
- **Consent** is a cryptographic signature, not a checkbox.
- **Access** is gated by verifiable token claims, not session cookies with opaque identifiers.
- **Revocation** is participant-initiated and immediate, not buried in account settings.

We describe the complete system architecture, the cryptographic consent flow, and a proof-of-concept deployment demonstrating that behavioral health engagement data can be captured with full participant sovereignty and zero personally identifiable information.

---

## 2. Background and Related Work

### 2.1 Self-Sovereign Identity in Healthcare

Self-sovereign identity (SSI) proposes that individuals should own and control their digital identities without relying on centralized authorities [3]. In healthcare contexts, SSI has been explored through verifiable credentials for vaccination records [4], decentralized identifiers (DIDs) for cross-institutional patient identification [5], and blockchain-based consent management for clinical trial data [6].

However, most SSI implementations in healthcare introduce significant infrastructure complexity — DID registries, verifiable credential issuers, and holder wallets that require specialized software. These systems often replicate the complexity they seek to eliminate, trading one set of intermediaries for another.

### 2.2 EIP-191: Signed Data Standard

Ethereum Improvement Proposal 191 defines a standard for signing arbitrary data with an Ethereum private key [7]. The `personal_sign` method, widely implemented across wallet providers, allows a user to sign a human-readable message that can be cryptographically verified by any party holding the user's public address. This creates a minimal SSI primitive: the wallet IS the identity, the signature IS the consent, and verification requires no infrastructure beyond the Ethereum address itself.

### 2.3 Consent Architecture in Health Informatics

Existing blockchain-based consent systems include MedRec [8], which uses smart contracts to manage access permissions for electronic health records, and ConsentChain [9], which provides granular consent management through blockchain transactions. These systems typically store consent metadata on-chain while keeping health data off-chain — a pattern FSL follows. However, most implementations focus on consent for data sharing between institutions rather than consent as the foundational authentication mechanism.

### 2.4 The Gap

No existing system, to our knowledge, uses EIP-191 wallet signatures as the simultaneous mechanism for:
1. User authentication (replacing username/password)
2. Informed consent (replacing click-through agreements)
3. Session authorization (replacing OAuth tokens)
4. Behavioral health data attribution (replacing PII-based records)

FSL addresses this gap by unifying these four functions into a single cryptographic event.

---

## 3. System Architecture

### 3.1 Platform Overview

FSL comprises five interconnected platforms, each serving a distinct function in the sovereign wellness ecosystem:

1. **EncryptHealth** — The primary health data platform. Manages participant records, session booking, provider directories, and consent-gated data access. Deployed as a modern web application with a relational database backend.

2. **HypnoNeuro** — A collection of a suite of browser-based wellness engagement activities with wallet-gated access and token-based engagement incentives.

3. **SovereignLedger** — On-chain session governance. Records session attestations, superbill generation, and billing events as blockchain transactions.

4. **AlchemistForge** — A purpose-built smart contract and interface for recording voluntary behavioral health engagement (shadow integration) on-chain.

5. **NeuroBalance** — A wearable wellness dashboard integrating biometric data with on-chain consent management.

All five platforms share a single authentication architecture: EIP-191 wallet signature → JWT cookie → middleware-verified access.

### 3.2 Authentication Flow

The authentication flow proceeds in six steps (Figure 1):

**Step 1 — Wallet Detection.** The client application detects available wallet providers using the `window.ethereum` interface. FSL implements EIP-6963 multi-provider discovery, preferring Brave Wallet when available but supporting any injected Ethereum provider.

**Step 2 — Account Request.** The application calls `eth_requestAccounts` on the selected provider, prompting the user to authorize the connection. This returns the user's Ethereum address but does not yet constitute consent.

**Step 3 — Nonce Generation.** The client requests a cryptographic nonce from the server (a server-side nonce endpoint). The server generates a 128-bit random nonce using a cryptographically secure random number generator and returns it to the client. This nonce prevents replay attacks.

**Step 4 — Consent Message Construction.** The client constructs a human-readable consent message containing:
- A plain-language description of what the user is consenting to
- Educational disclaimers (FSL is not a medical facility; data is educational)
- The user's wallet address
- The server-generated nonce
- An ISO 8601 timestamp

This message serves simultaneously as informed consent and authentication challenge.

**Step 5 — Cryptographic Signature.** The client calls `personal_sign` with the consent message and the user's address. The wallet provider displays the full message text and requires explicit user approval before signing. The resulting signature is a 65-byte ECDSA signature over the EIP-191 prefixed message hash.

**Step 6 — Server Verification and JWT Issuance.** The client sends `{address, signature, message}` to a server-side verification endpoint. The server:
- Recovers the signer address from the signature using ECDSA signature recovery
- Verifies the recovered address matches the claimed address
- Validates the consent message contains required phrases (educational disclaimer, sovereignty acknowledgment)
- Issues a JSON Web Token (JWT) containing the verified address, role (participant or guide), and a 15-minute expiration
- The JWT is delivered to the client as a secure cookie with appropriate expiration

### 3.3 Middleware Verification Layer

Every protected route passes through a server-side middleware layer that:
1. Extracts the an HTTP-only session cookie from the request
2. Verifies the JWT signature using a standard JWT verification library with the server's HS256 secret
3. Checks token expiration
4. Extracts the verified wallet address and role from the payload
5. Injects the verified address into request headers (as a verified address header)
6. Enforces role-based access (guide role required for provider routes)

If verification fails, page routes redirect to the landing page; API routes return 401. The middleware runs on every request to protected routes, ensuring that every page load and API call is authorized by a valid, unexpired token derived from a cryptographic consent signature.

### 3.4 Consent-Gated Access Patterns

The architecture implements three levels of consent gating:

**Level 1 — Platform Access.** The initial `personal_sign` consent grants access to the platform. Without this signature, the middleware blocks all protected routes.

**Level 2 — Provider Access.** Participants can grant specific Sovereign Guides access to their wellness records through a separate consent transaction. This grant is stored in the database and can be revoked immediately by the participant.

**Level 3 — On-Chain Attestation.** Session records, superbills, and achievement milestones are anchored to the blockchain through smart contract calls, creating an immutable audit trail of consent-authorized interactions.

### 3.5 Session Refresh

To prevent session interruption during active use, the system implements a silent JWT refresh mechanism. A client-side timer fires before JWT expiry. The refresh endpoint verifies the existing JWT is still valid and issues a fresh 15-minute token with the same claims. This allows indefinite session continuity without requiring re-signing, while maintaining the security property that any individual token is valid for at most 15 minutes.

---

## 4. Implementation

### 4.1 Smart Contracts

FSL has deployed eight smart contracts on the Ethereum Sepolia testnet:

| Contract | Purpose | Access Control |
|----------|---------|---------------|
| HypnoNeuroToken (HNT) | ERC-20 wellness engagement token | Owner-minted |
| EncryptHealthToken (EHT) | Platform-specific ERC-20 | Owner-minted |
| MindMasteryNFT | ERC-721 achievement credentials | Owner-minted |
| SovereignLedger | Session governance and claim registration | Open registration |
| AlchemistForge | Voluntary behavioral engagement recording | Fully permissionless |
| BenevolenceFund | Community wellness treasury | Owner-distributed annually |
| PractitionerAchievement | ERC-1155 soulbound guide credentials | Owner-minted |
| ParticipantAchievement | ERC-1155 soulbound participant credentials | Owner-minted |

The contracts range from fully permissionless (AlchemistForge — anyone can call `alchemize()`) to owner-controlled (token minting, achievement awards). This spectrum reflects a deliberate architectural choice: participation data is sovereign (the participant controls when and what they record), while credential issuance is governed (the platform verifies achievements before minting).

### 4.2 Wallet Integration

FSL uses a minimal wallet integration layer that communicates directly with `window.ethereum`, avoiding the dependency chain of wallet abstraction libraries. The a client-side wallet context provider:

1. Reads the JWT cookie synchronously on mount to determine authentication state
2. Exposes a connection method for initiating wallet connections
3. Implements a refresh method for re-reading authentication state after token refresh
4. Implements provider preference logic when multiple wallets are injected

This approach eliminates external wallet SDK dependencies that introduce relay servers, WebSocket connections, and cloud-hosted session state — all of which contradict the sovereignty model.

### 4.3 Hybrid Data Model

FSL employs a hybrid on-chain/off-chain data architecture:

**On-chain (Ethereum Sepolia):**
- Consent events (wallet signatures verified on-chain via smart contracts)
- Session attestations (IPFS content hashes anchored to SovereignLedger)
- Achievement credentials (soulbound ERC-1155 tokens)
- Engagement records (AlchemistForge shadow aspects)

**Off-chain (PostgreSQL + IPFS):**
- Session metadata (aggregate engagement data)
- Wellness engagement metrics (aggregate, non-clinical)
- Encrypted health documents (IPFS-pinned, wallet-gated decryption)

This hybrid approach addresses the fundamental tension between blockchain immutability and healthcare data requirements: sensitive data is encrypted and stored off-chain where it can be managed (and deleted if necessary), while consent events and attestations are anchored on-chain where they provide an immutable audit trail.

### 4.4 Content Security and API Protection

The backend API implements origin-based CORS whitelisting restricted to FSL platform domains. All sensitive endpoints require wallet signature authentication via middleware that verifies `x-wallet-address`, `x-signature`, and `x-message` headers. Rate limiting (1000 requests per minute per IP) prevents abuse. The API is accessible only through a Cloudflare tunnel providing TLS termination, DDoS protection, and IP obfuscation of the origin server.

---

## 5. Consent Design

### 5.1 Cryptographic Consent vs. Click-Through Consent

Traditional click-through consent suffers from four fundamental weaknesses:

1. **Non-verifiability.** There is no cryptographic proof that the user read or understood the terms. A checkbox state is trivially forgeable.
2. **Non-attributability.** The consent event is tied to a session cookie or account ID, not to a cryptographic identity. Anyone with the credentials can "consent."
3. **Non-revocability.** Revoking consent requires navigating account settings and trusting the platform to honor the revocation. There is no independent verification.
4. **Non-portability.** The consent exists only in the platform's database. The user has no independent record of what they consented to.

EIP-191 wallet signatures address all four weaknesses:

1. **Verifiable.** The signature is a cryptographic proof that the holder of the private key approved the exact message text. Any third party can verify this independently.
2. **Attributable.** The signature is bound to a specific Ethereum address. Only the holder of the corresponding private key could have produced it.
3. **Revocable.** The participant can revoke platform access by disconnecting their wallet. The JWT expires in 15 minutes and cannot be renewed without a valid cookie.
4. **Portable.** The signed message and signature constitute a self-contained proof of consent that the participant can retain and present to any verifier.

### 5.2 The FSL Consent Message

The FSL consent message is designed to function simultaneously as a legal informed consent document and a cryptographic authentication challenge:

The consent message contains a sovereignty declaration, educational disclaimers, the participant's wallet address, a server-generated nonce, and an ISO 8601 timestamp. The exact message structure is proprietary to the FSL implementation.

This message contains four categories of information:
- **Consent scope:** What the user is agreeing to (educational wellness platform access)
- **Disclaimers:** What FSL is not (not a medical facility, not clinical)
- **Rights declaration:** The user's sovereignty over their own data
- **Cryptographic binding:** The wallet address, nonce, and timestamp that prevent replay and ensure attribution

The server validates that the signed message contains the required consent phrases before issuing a JWT. A message that omits the disclaimers or modifies the consent scope will be rejected.

---

## 6. Case Study: AlchemistForge

### 6.1 Design

AlchemistForge is a minimal smart contract designed to record voluntary behavioral health engagement — specifically, Jungian shadow integration — on the Ethereum blockchain. The contract has two functions:

The contract exposes two public functions: one for recording a shadow aspect (keyed to the caller's address) and one for marking the integration as complete. Both emit events that are publicly queryable. The full contract source is verified on-chain and available in the project's public repository.

The design is deliberately minimal: no owner, no admin functions, no pause mechanism, no token economics. The contract exists solely to record a participant's voluntary disclosure (a shadow aspect they are integrating) and their subsequent celebration of that integration.

### 6.2 Privacy Properties

AlchemistForge demonstrates that meaningful behavioral health engagement data can be captured on a public blockchain with zero personally identifiable information:

- The participant is identified only by their Ethereum wallet address (pseudonymous)
- The shadow aspect text is voluntary and self-authored by the participant
- No diagnosis, treatment plan, or clinical assessment is recorded
- The data is publicly verifiable but not attributable to a real-world identity without external information
- The participant chooses when, whether, and what to disclose

### 6.3 Deployment Results

As of the writing of this paper, AlchemistForge has been deployed on Sepolia testnet at address `0xE092336F8f5082e57CcBb341A110C20ad186A324`. The contract has recorded transmutation events from unique wallet addresses, with corresponding celebration events. A public analytics dashboard at `alchemistforge.io/analytics` reads directly from the blockchain to display participation metrics without any centralized data store.

---

## 7. Discussion

### 7.1 Architectural Tradeoffs

The FSL architecture makes explicit tradeoffs between decentralization and usability:

**Authentication latency.** The `personal_sign` flow requires 3-5 seconds (nonce request + user approval + signature verification) compared to sub-second username/password authentication. We mitigate this with short-lived JWTs that avoid re-signing on every page load, combined with a silent refresh mechanism for session continuity.

**Wallet dependency.** Participants must have a Web3 wallet (Brave Browser with Brave Wallet, or a compatible alternative). This introduces a significant adoption barrier for non-technical users. FSL addresses this by supporting alternative blockchain wallet providers as additional authentication paths.

**Testnet limitations.** All contracts are deployed on Sepolia testnet, which has no economic security guarantees. Transactions are free and the network may be reorganized. Production deployment requires migration to a mainnet (Ethereum, Polygon, or similar) with associated gas costs.

**Centralized components.** Despite the decentralized authentication layer, FSL retains centralized components: the PostgreSQL database, the Vercel frontend hosting, and the VPS-hosted API server. These components are necessary for operational performance but represent single points of failure. The hybrid data model ensures that consent events and critical attestations are anchored on-chain even if centralized components become unavailable.

### 7.2 Limitations

1. **Single practitioner deployment.** The current system has been tested with a single Sovereign Guide (the PI). Multi-practitioner consent dynamics, including cross-practitioner data sharing and consent conflict resolution, remain untested.

2. **No formal user study.** This paper describes the architecture and implementation, not participant outcomes. A formal evaluation of participant-perceived sovereignty, consent comprehension, and engagement metrics requires IRB approval and is planned as future work.

3. **Testnet only.** No real economic value is at stake. The security assumptions of the consent architecture have not been tested under adversarial conditions with real financial incentives.

4. **Browser wallet requirement.** The system requires a browser with an injected Ethereum provider. Mobile support is limited to browsers with built-in wallets (Brave Mobile).

### 7.3 Future Work

1. **IRB-approved participant study.** A mixed-methods evaluation comparing participant-perceived data sovereignty under wallet-based consent vs. traditional click-through consent.

2. **Mainnet deployment.** Migration of contracts to Ethereum mainnet or Polygon with formal security audit.

3. **XRPL payment integration.** Extension of the consent architecture to support XRP Ledger payment channels for session billing.

4. **Cross-platform consent federation.** Enabling participants to use a single wallet signature to authorize data sharing across multiple independent wellness platforms.

5. **Formal verification.** Mathematical proof that the consent architecture satisfies the properties of verifiability, attributability, revocability, and portability claimed in Section 5.

---

## 8. Conclusion

This paper presented the architecture and implementation of a wallet-based consent system for behavioral health data governance. By using EIP-191 cryptographic signatures as the unified mechanism for authentication, consent, and access control, the system eliminates the architectural separation between identity and authorization that characterizes centralized health platforms. The consent event becomes the authentication event — a single cryptographic act that is verifiable, attributable, revocable, and portable.

The AlchemistForge case study demonstrates that meaningful behavioral health engagement data can be captured on a public blockchain with full participant sovereignty and zero personally identifiable information. The five-platform FSL ecosystem demonstrates that this consent architecture can scale to a multi-service environment with role-based access control, session-scoped provider access, and on-chain attestation.

The system is not without limitations — testnet deployment, single-practitioner scope, and browser wallet dependency constrain its current applicability. However, the architectural pattern of unifying consent and authentication through cryptographic signatures is generalizable beyond the FSL context and may inform the design of future health informatics systems where participant data sovereignty is a first-class requirement.

---

## References

[1] Rothstein, M.A. (2010). The Hippocratic bargain and health information technology. *Journal of Law and the Biosciences*, 1(1), 7-12.

[2] Cate, F.H., & Mayer-Schonberger, V. (2013). Notice and consent in a world of Big Data. *International Data Privacy Law*, 3(2), 67-73.

[3] Allen, C. (2016). The path to self-sovereign identity. *Life with Alacrity*. Retrieved from http://www.lifewithalacrity.com/2016/04/the-path-to-self-soverereign-identity.html

[4] Eisenstadt, M., Ramachandran, M., Chowdhury, N., et al. (2020). COVID-19 antibody test/vaccination certification: There's an app for that. *IEEE Open Journal of Engineering in Medicine and Biology*, 1, 148-155.

[5] Houtan, B., Hafid, A.S., & Makrakis, D. (2020). A survey on blockchain-based self-sovereign patient identity in healthcare. *IEEE Access*, 8, 90478-90494.

[6] Maslove, D.M., Klein, J., Brber, K., & Allan, A. (2018). Using blockchain technology to manage clinical trials data: A proof-of-concept study. *JMIR Medical Informatics*, 6(4), e11949.

[7] Ethereum Foundation. (2018). EIP-191: Signed data standard. *Ethereum Improvement Proposals*. Retrieved from https://eips.ethereum.org/EIPS/eip-191

[8] Azaria, A., Ekblaw, A., Vieira, T., & Lippman, A. (2016). MedRec: Using blockchain for medical data access and permission management. *International Conference on Open and Big Data (OBD)*, 25-30.

[9] Rantos, K., Drosatos, G., Demertzis, K., et al. (2019). ADvoCATE: A consent management platform for personal data processing in the IoT using blockchain technology. *International Conference on Security for Information Technology and Communications*, 300-313.

[10] Ethereum Foundation. (2023). EIP-6963: Multi injected provider discovery. *Ethereum Improvement Proposals*. Retrieved from https://eips.ethereum.org/EIPS/eip-6963

[11] Nakamoto, S. (2008). Bitcoin: A peer-to-peer electronic cash system. *Bitcoin.org*.

[12] Buterin, V. (2014). A next-generation smart contract and decentralized application platform. *Ethereum Whitepaper*.

---

*Manuscript prepared for submission to Blockchain in Healthcare Today (BHTY). Pre-print version archived in FSL governance repository and IPFS.*

*Conflicts of interest: The author is the founder and lead engineer of Future Systems Lab.*

*Data availability: All smart contracts are publicly verifiable on Ethereum Sepolia testnet. Source code is available at github.com/Future-Systems-Lab.*

# Provisional Patent Application — Figure Specifications

Dr. Meg: create these 4 figures for inclusion. Hand-sketched, draw.io, Lucidchart, or any format is acceptable for a provisional filing. Label each figure clearly.

---

## Figure 1 — Overall System Architecture

**Caption:** "Block diagram illustrating the five-platform sovereign data governance ecosystem with wallet authentication layer, on-chain attestation layer, and off-chain encrypted storage layer."

**What to show:**
- Five platform boxes: EncryptHealth, HypnoNeuro, SovereignLedger, AlchemistForge, NeuroBalance
- Shared authentication layer across all five (EIP-191 wallet signature → JWT)
- On-chain layer: Ethereum Sepolia with contract boxes (HNT, SovereignLedger v2, AlchemistForge, BenevolenceFund, SovereignAchievement)
- Off-chain layer: PostgreSQL (session metadata, consent grants) + IPFS (encrypted documents)
- Arrows showing data flow: wallet → signature → JWT → platform access → on-chain events + off-chain storage
- Label the "Zero-PHI boundary" — a dashed line showing that no PHI crosses into any storage layer

---

## Figure 2 — EIP-191 Consent Attestation Flow

**Caption:** "Sequence diagram illustrating the six-step consent attestation flow from wallet connection through JWT issuance."

**What to show (sequence diagram format, left to right):**
- Actors: Participant, Wallet Provider, Client Application, Server, Blockchain
- Step 1: Client → Wallet: eth_requestAccounts
- Step 2: Client → Server: Request nonce (POST /api/auth/nonce)
- Step 3: Server → Client: Return 128-bit nonce
- Step 4: Client constructs consent message (address + nonce + timestamp + disclaimers)
- Step 5: Client → Wallet: personal_sign(message, address) — Wallet displays message, participant approves
- Step 6: Client → Server: {address, signature, message}
- Step 7: Server: ecrecover(signature) → verify address match → validate consent phrases → issue JWT
- Step 8: Server → Client: Set-Cookie (JWT, HttpOnly, Secure, SameSite)
- Label: "Single cryptographic event serves as authentication + consent + authorization"

---

## Figure 3 — Zero-PHI Data Flow Architecture

**Caption:** "Data flow diagram showing the separation between on-chain public attestation data and off-chain encrypted participant data, with the zero-PHI architectural constraint."

**What to show:**
- Three columns: "On-Chain (Public, Immutable)", "Off-Chain (Encrypted, Deletable)", "Never Stored"
- On-Chain column: wallet addresses (pseudonymous), consent event hashes, session attestation timestamps, achievement credentials (soulbound NFTs), engagement records (AlchemistForge shadow aspects — voluntary, self-authored)
- Off-Chain column: session metadata (aggregate), wellness engagement metrics, encrypted health documents (IPFS-pinned, wallet-gated decryption), consent grant records (who can see what)
- Never Stored column: real names, SSNs, diagnoses, treatment plans, insurance IDs, clinical assessments
- Dashed boundary labeled "HIPAA scope boundary — system operates entirely outside"
- Arrow showing: "Participant controls deletion of off-chain data; on-chain attestations are permanent but contain no PHI"

---

## Figure 4 — Sovereign Guide ↔ Participant Attestation Lifecycle

**Caption:** "State diagram illustrating the consent-gated lifecycle of a Sovereign Guide's access to participant records, from initial consent grant through session attestation to revocation."

**What to show (state diagram or lifecycle flow):**
- State 1: No Access (default — Sovereign Guide cannot see participant data)
- Transition: Participant signs consent grant (EIP-191 signature authorizing specific Guide)
- State 2: Active Access (Guide can view participant records within granted scope)
- Transition: Session occurs → Guide initiates session attestation → on-chain event emitted
- State 3: Session Recorded (attestation on SovereignLedger, HNT reward minted)
- Transition: Participant revokes consent grant
- State 4: Access Revoked (Guide can no longer view records; historical attestations remain on-chain)
- Label: "Participant controls all state transitions except session attestation initiation (Guide-initiated)"

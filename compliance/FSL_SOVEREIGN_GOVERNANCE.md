# FSL Sovereign Governance Model

## Philosophy: Participant-Led Record Ownership

Future Systems Lab inverts the traditional Electronic Health Record (EHR) model. In the FSL ecosystem:

- **The participant owns the record**, not the clinic, hospital, or insurer.
- **The participant invites practitioners**, not the other way around.
- **The participant revokes access** at any time, with no questions asked and no intermediary required.
- **The record follows the participant**, across practitioners, platforms, and time.

This is sovereign wellness governance.

---

## Wallet-Linked Identity

FSL does not use usernames, passwords, or email-based authentication. Identity is wallet-linked:

- **MetaMask (EVM)**: Ethereum-compatible wallet for session attestation, HNT rewards, and NFT minting on Sepolia testnet.
- **XRPL Wallets (GemWallet, Crossmark)**: XRP Ledger-compatible wallets for ISO 20022-aligned payments and cross-ledger identity.

Your wallet address IS your identity. There is no account to hack, no password to forget, no centralized database storing your credentials. If you lose your wallet, you lose access — but no one else ever had it.

---

## Practitioner Invite & Access Grant Flow

### Step 1: Participant Connects Wallet
The participant connects their MetaMask or XRPL wallet to any FSL platform (EncryptHealth, SovereignLedger, HypnoNeuro, NeuroBalance).

### Step 2: Participant Invites Practitioner
From the EncryptHealth dashboard, the participant can:
- Search registered FSL practitioners by name or wallet address
- View practitioner credentials, specialty, and verification status
- Select which data scopes to grant access to

### Step 3: Scoped Access Grant
Access is never all-or-nothing. The participant selects specific data scopes:

| Scope | Description |
|-------|-------------|
| Mood Data | Daily mood tracking entries, patterns, and trends |
| Nutrition Journal | Food logs, supplement tracking, and dietary patterns |
| Lab Results | Lab panels, biomarker results, and wellness indicators |
| Session Notes | Session summaries, practitioner notes, and protocols |
| Biomarker Data | Wearable sync data from NeuroBalance (heart rate, HRV, sleep) |
| Superbills | Generated superbills and insurance submission records |

### Step 4: On-Chain Attestation
The access grant is recorded on SovereignLedger (Sepolia testnet):
- Contract: `0xf32979200768e8726d5EC5E5AB0CA7407d64A94e`
- Function: `registerClaim(bytes32 claimHash, bytes32 dataHash)`
- The grant is immutable — it can be audited at any time by either party.

### Step 5: Practitioner Notified
The practitioner receives a Telegram notification via the FSL Agent Gateway Bot:
> "[Participant wallet] has granted you access to their sovereign record. Scopes: Mood Data, Lab Results. View in your dashboard."

### Step 6: Practitioner Accesses Record
The practitioner's dashboard shows the new participant with their granted scopes. The practitioner can only see what was explicitly granted.

---

## Revocation Rights

The participant can revoke practitioner access at any time:

1. Navigate to EncryptHealth → Data Sovereignty → Active Provider Access
2. Select the practitioner
3. Click "Revoke Access"
4. The revocation is recorded on SovereignLedger
5. The practitioner is immediately removed from the participant's record
6. The practitioner receives a Telegram notification confirming revocation

**There is no cooling period, no approval required, and no questions asked.** The participant's sovereignty over their record is absolute.

---

## Comparison: FSL vs Traditional Models

| Feature | Traditional EHR | Standard Telehealth | FSL Sovereign Model |
|---------|----------------|--------------------|--------------------|
| **Record Ownership** | Clinic/hospital | Platform | Participant |
| **Identity** | SSN + DOB | Email + password | Wallet address |
| **Data Location** | Clinic server | Cloud (AWS/Azure) | On-chain + encrypted |
| **Access Control** | Admin-managed | Platform-managed | Participant-managed |
| **Revocation** | HIPAA request (30 days) | Account deletion | Instant, on-chain |
| **Portability** | Fax/CD-ROM | PDF export | Wallet-linked, universal |
| **Audit Trail** | Internal logs | Platform logs | Blockchain-verified |
| **Provider Selection** | Insurance network | Platform directory | Participant invites |
| **Data Monetization** | By clinic/insurer | By platform | Never — participant only |
| **Interoperability** | HL7/FHIR (limited) | API (proprietary) | On-chain (universal) |

---

## SovereignLedger as Access Control Layer

SovereignLedger is the governance backbone of the FSL ecosystem:

- **Session Attestation**: Every completed session is hashed and registered on-chain, creating an immutable record of care.
- **Superbill Generation**: Superbills are auto-generated, signed by the participant's wallet, and stored with on-chain attestation hashes.
- **Access Grants**: When a participant invites a practitioner, the grant is recorded as a claim on SovereignLedger.
- **Revocation**: When access is revoked, a new claim is registered nullifying the previous grant.
- **Audit Trail**: Any party can verify the complete history of access grants and revocations by querying the SovereignLedger contract.

Contract Address: `0xf32979200768e8726d5EC5E5AB0CA7407d64A94e` (Sepolia Testnet)

---

## HNT Tokens as Wellness Incentive

HNT (HypnoNeuro Token) is a wellness incentive mechanism:

- **Earned** by completing sessions across all 27 HypnoNeuro wellness experiences
- **Used** to unlock advanced levels (L2 Orthomolecular, L3 Inner Child Healing)
- **Never currency** — HNT is not a payment instrument, not a security, and not a store of value
- **Sovereign** — HNT balances are wallet-linked and controlled by the participant
- **On-chain** — All HNT transactions are recorded on Sepolia testnet

The MindMastery NFT is minted when a participant completes all three levels, serving as a sovereign declaration of their wellness journey.

---

## FSL Lexicon

FSL uses specific language to reflect its sovereign, non-clinical model:

| FSL Term | Instead Of | Reason |
|----------|-----------|--------|
| Participant | Patient | Participants are active, empowered agents in their wellness |
| Session | Treatment/Appointment | Sessions are collaborative, not prescriptive |
| Practitioner | Doctor/Provider | Broader than licensed physicians; includes nutritionists, hypnotherapists |
| Wellness | Diagnosis/Medical care | FSL supports wellness, not clinical diagnosis |
| Sovereign | Compliant | Sovereignty is proactive; compliance is reactive |
| Record | Chart/File | Records belong to participants, not institutions |
| Access Grant | Referral | The participant grants access; they are not referred |

---

## Entity Information

**Future Systems Lab LLC**
- Wyoming Entity (no state income tax)
- Website: hypnosispsych.com
- Founder: Dr. Meg Montañez-Davenport, D.N.Psy., CBHP, BCHN, ISOM

---

*This document serves as the foundational governance framework for the FSL ecosystem and supports grant applications, investor materials, and regulatory discussions.*

*Last updated: April 3, 2026*

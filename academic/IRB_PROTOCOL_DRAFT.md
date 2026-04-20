# IRB Protocol Draft — Pre-Submission Framework

**Note:** This is a pre-draft establishing the research framework for ASU's IRB process when Dr. Meg enrolls in the DEng program (January 2027). ASU will have their own forms and requirements — this document provides the foundational protocol structure and rationale.

---

## 1. Study Information

**Title:** Blockchain-Based Consent Architecture for Sovereign Behavioral Health Data Governance

**Principal Investigator:** Dr. Meg Montanez-Davenport, D.N.Psy., CBHP, BCHN

**Affiliation:** Future Systems Lab (FSL) — Applied doctoral engineering research project

**Expected IRB Submission:** Spring 2027 (upon ASU DEng enrollment)

**Study Duration:** 12 months from IRB approval

**Funding Source:** Self-funded; potential XRPL grants and institutional support pending

---

## 2. Research Questions

### Primary
1. Does wallet-based cryptographic consent (EIP-191 personal_sign) improve participant-perceived data sovereignty compared to traditional click-through consent mechanisms?

2. Does on-chain recording of behavioral health engagement (via AlchemistForge shadow integration) produce measurable increases in participant engagement and self-reported transformation outcomes?

### Secondary
3. What is the adoption curve for wallet-native identity in a behavioral health context among participants unfamiliar with Web3?

4. Does the 70/30/3 sovereign revenue split model (Guide/Platform/Benevolence Fund) produce sustainable practitioner retention compared to traditional platform commission structures?

---

## 3. Study Design

**Type:** Mixed-methods observational study with quantitative on-chain analytics and qualitative participant surveys

**Design:** Non-interventional — the study observes existing platform behavior. No clinical intervention is introduced. The FSL platform is an educational wellness technology, not a clinical treatment.

**Arms:**
- Group A: Participants who complete wallet-based consent and engage with EncryptHealth
- Group B: Participants who complete AlchemistForge shadow integration
- Group C: Participants in both (overlap expected)

**No control group required** — this is observational research on an existing platform, not a clinical trial.

---

## 4. Participant Population

**Target population:** Adults (18+) who voluntarily create accounts on the FSL sovereign wellness platform

**Inclusion criteria:**
- Age 18 or older
- Capable of operating a Web3 wallet (Brave Wallet or compatible)
- Voluntary platform registration via cryptographic consent

**Exclusion criteria:**
- Minors (under 18)
- Individuals unable to provide informed consent
- No exclusions based on diagnosis, condition, or demographics — FSL is an educational platform open to all

**Estimated enrollment:** 50-200 participants over 12 months

**Recruitment:** Organic platform registration. No active recruitment for research purposes — the study observes naturally occurring platform usage. Participants will be informed that anonymized, aggregate usage data may be used for research purposes as part of the consent flow.

---

## 5. Data Collection

### On-Chain Data (Public, Pseudonymous)
| Data Type | Source | Identifiability |
|-----------|--------|-----------------|
| Wallet addresses | Ethereum/Sepolia blockchain | Pseudonymous — no PII linked |
| Consent signatures (EIP-191) | On-chain transaction | Public, cryptographic proof |
| AlchemistForge shadow entries | AlchemistForge contract events | Pseudonymous, participant-chosen text |
| Session attestations | SovereignLedger contract | Session hashes, no content |
| HNT token balances | HNT ERC-20 contract | Public balances |
| NFT achievements | MindMasteryNFT contract | Tier data only |

### Off-Chain Data (Platform Database, Encrypted)
| Data Type | Source | Identifiability |
|-----------|--------|-----------------|
| Session engagement metrics | PostgreSQL (encrypted at rest) | Keyed to wallet address (pseudonymous) |
| Mood log entries | Platform mood tracker | Aggregated, no PII |
| Page interaction patterns | Frontend analytics | Anonymous |

### Data NOT Collected
- **No clinical data** — no diagnoses, no treatment plans, no clinical assessments
- **No PII** — no names, emails, phone numbers, SSNs, or physical addresses
- **No biometric data** — no facial recognition, no fingerprints
- **No IP addresses** — not logged by the platform
- **No insurance information** — sovereigncoverage email is separate from research

---

## 6. Privacy Protections

### Architectural Protections
1. **Wallet-based pseudonymity:** Participants are identified solely by their Ethereum wallet address. No mapping between wallet addresses and real-world identities exists in the system.

2. **Participant-controlled data:** All health records in EncryptHealth are accessible only to the participant's wallet. The platform cannot read participant data without explicit cryptographic consent (EIP-191 signature).

3. **On-chain immutability:** Consent records are permanently recorded on-chain, providing an auditable trail that the participant authorized each data access event.

4. **IPFS-encrypted storage:** Documents are encrypted and pinned to IPFS (Pinata). Only the participant's wallet can decrypt via Lighthouse SDK access control.

5. **No server-side decryption:** The backend API never holds decryption keys. All encryption/decryption occurs client-side in the participant's browser.

### Research-Specific Protections
6. **Aggregate reporting only:** All research findings will be reported in aggregate. No individual wallet addresses will be published.

7. **Opt-out mechanism:** Participants can revoke consent at any time via the platform's "Revoke All Access" function, which clears all provider access grants.

8. **Data minimization:** Only the minimum data necessary to answer the research questions is collected.

---

## 7. Consent Mechanism

### Platform Consent (Already Implemented)
Participants provide cryptographic consent via EIP-191 `personal_sign` when connecting to the platform. The consent message includes:

```
FSL Sovereign Access Agreement

I am a sovereign being choosing to access
an educational wellness discovery platform.

I understand:
- This is an educational technology interface
- FSL is not a medical facility
- Sovereign Guides are independent wellness professionals
- HNT tokens are educational loyalty points only
- I hold full sovereignty over my wellness journey

AI Disclaimer: FSL uses AI for educational
content only -- not clinical assessment.

Wallet: {address}
Nonce: {nonce}
Timestamp: {timestamp}
```

### Research Consent (To Be Added)
An additional research consent addendum will be presented to participants who may be included in the study:

```
Research Participation Notice

Your anonymized, aggregate platform usage data may be used for
academic research on blockchain-based consent architecture and
sovereign health data governance.

- No personal information is collected
- Your wallet address is your only identifier
- You can opt out at any time via Settings > Revoke Access
- Research findings will be published in aggregate only

By signing, you acknowledge this notice.
```

This addendum will be a separate `personal_sign` request, distinct from the platform consent.

---

## 8. Risk Assessment

**Risk Level: MINIMAL**

| Risk | Likelihood | Mitigation |
|------|-----------|------------|
| Loss of pseudonymity (wallet linked to identity) | Very low — no PII collected, no identity mapping exists | Wallet addresses are inherently pseudonymous. Participants are advised not to use wallets linked to their real identity if privacy is a concern. |
| Emotional distress from shadow work (AlchemistForge) | Low — participant-initiated, self-directed | AlchemistForge is optional. Entries are self-chosen. Platform includes educational disclaimers. No therapeutic relationship exists. |
| Data breach | Very low — no centralized PII store | Health records encrypted client-side. Database contains only pseudonymous wallet addresses and engagement metrics. Daily encrypted backups. |
| Smart contract vulnerability | Low — Sepolia testnet, no real funds | All contracts on testnet. No financial loss possible. V2 contracts written with OpenZeppelin base. |

**This study does NOT involve:**
- Clinical interventions or treatments
- Vulnerable populations (children, prisoners, cognitively impaired)
- Deception
- Experimental drugs or devices
- Collection of biological specimens
- Access to medical records

---

## 9. Data Storage and Retention

- **On-chain data:** Permanent (blockchain immutability). Public and pseudonymous.
- **Off-chain database:** Encrypted PostgreSQL on IONOS VPS. Daily backups with 7-day rotation. Access restricted to PI.
- **IPFS data:** Encrypted, pinned to Pinata. Participant-controlled access via wallet signature.
- **Research datasets:** De-identified aggregate datasets will be stored for 5 years post-publication per ASU data retention policy.
- **Raw data destruction:** Individual-level off-chain data will be deleted 3 years after study completion.

---

## 10. Dissemination Plan

Research findings will be submitted to:
1. IEEE conference proceedings (blockchain + health informatics track)
2. AMIA Annual Symposium (health informatics)
3. Peer-reviewed journal (target: JAMIA, IEEE JBHI, or INCOSE Systems Engineering)
4. FSL governance repository (open access, IPFS-anchored)

All publications will use aggregate data only. No individual wallet addresses or participant-identifiable information will be published.

---

## 11. Qualifications of the PI

Dr. Meg Montanez-Davenport holds:
- Doctor of Naturopathic Psychology (D.N.Psy.)
- Certified Blockchain Healthcare Professional (CBHP) — Blockchain Council
- Board Certified Holistic Nutritionist (BCHN)
- ISOM Certified (International Society for Orthomolecular Medicine)
- Certified Smart Contract Auditor — Blockchain Council
- Member: IEEE, INCOSE, ISC2, AMIA, HIMSS, PDMA, ISOM, NANP

Professional experience includes designing and building the FSL sovereign wellness ecosystem — 8 smart contracts, 5 platforms, 16 autonomous AI agents — as an applied doctoral engineering research project.

---

## 12. Appendices

- **Appendix A:** FSL Consent Message (EIP-191 format) — see Section 7
- **Appendix B:** Smart Contract Addresses — see fsl-governance/contracts/FSL_CONTRACT_REGISTRY.md
- **Appendix C:** Platform Architecture — see fsl-governance/GOVERNANCE_AUDIT_2026-04-19.md
- **Appendix D:** IPFS Governance Documents — see docs/FSL_IPFS_MANIFEST.md
- **Appendix E:** FSL Lexicon Guide — see fsl-governance/FSL_BRAND_GUIDE.md

---

*This protocol draft is anchored to the FSL governance repository and IPFS for provenance. Version: 2026-04-20.*

# Future Systems Lab — Privacy Policy

**Effective Date:** April 21, 2026
**Last Updated:** April 21, 2026
**Entity:** Future Systems Lab LLC, 1309 Coffeen Ave Ste 1200, Sheridan, WY 82801
**Contact:** future.systems.lab@proton.me

---

## 1. Overview

Future Systems Lab ("FSL," "we," "us") operates a sovereign wellness platform ecosystem including EncryptHealth, HypnoNeuro, SovereignLedger, AlchemistForge, and NeuroBalance (collectively, "the Platforms"). This Privacy Policy describes how we collect, use, and protect information when you use our Platforms.

FSL is designed around the principle of data sovereignty: you own your data, you control who accesses it, and you can revoke access at any time.

## 2. Information We Collect

### 2.1 Wallet Address (Pseudonymous Identifier)

When you connect to FSL, your Ethereum or XRPL wallet address serves as your sole identifier. We do not collect your name, email address, phone number, physical address, Social Security number, date of birth, or any other personally identifiable information (PII).

Your wallet address is pseudonymous — it is not linked to your real-world identity within our systems.

### 2.2 Consent Signature

When you sign the FSL Sovereign Access Agreement via your wallet (EIP-191 personal_sign), we store the cryptographic signature as proof of your informed consent. This signature contains: the consent message text, your wallet address, a server-generated nonce, and a timestamp.

### 2.3 Session and Engagement Data

If you use the Platforms, we may store:
- Session booking records (date, time, duration, guide wallet address)
- Wellness engagement metrics (mood entries, game progress — aggregate, non-clinical)
- Token balances and achievement records
- On-chain transaction hashes for sessions anchored to the blockchain

We do **not** store clinical diagnoses, treatment plans, medical records, or protected health information (PHI).

### 2.4 On-Chain Data

Certain interactions are recorded on the Ethereum blockchain (Sepolia testnet):
- AlchemistForge shadow aspect entries (voluntary, self-authored text)
- Session attestation hashes
- Token transfers and NFT awards

On-chain data is public and permanent by nature. You control what you submit — we cannot delete blockchain transactions once confirmed.

### 2.5 Technical Data

We collect standard technical data for platform operation:
- Browser type and version (via standard HTTP headers)
- Page interaction patterns (anonymous, no IP logging)
- Error logs for debugging (no PII included)

We do **not** log IP addresses, device fingerprints, or tracking cookies.

## 3. How We Use Information

We use collected information solely for:
- Authenticating your wallet connection and maintaining your session
- Delivering wellness platform features you request
- Recording session attestations on-chain (with your explicit consent)
- Generating aggregate analytics (no individual identification)
- Maintaining platform security and preventing abuse

We do **not**:
- Sell your data to third parties
- Share your data with advertisers
- Use your data for behavioral targeting
- Create marketing profiles from your wellness activity

## 4. Data Sovereignty and Access Control

### 4.1 You Own Your Data

All wellness records associated with your wallet are accessible only to you. The Platform cannot read your encrypted documents without your cryptographic consent.

### 4.2 Consent-Gated Access

Sovereign Guides (practitioners) can only access your records if you explicitly grant consent. You can revoke this consent at any time through the Platform settings. Revocation is immediate.

### 4.3 Data Portability

Your on-chain data (transactions, attestations, token balances) is publicly verifiable and portable. You can access it directly from the Ethereum blockchain without depending on FSL's infrastructure.

## 5. Data Storage and Security

- **Database:** Encrypted PostgreSQL hosted on a secured VPS with firewall protection
- **IPFS:** Encrypted documents pinned to IPFS with wallet-gated decryption
- **API:** Protected by Cloudflare tunnel with TLS encryption, CORS whitelisting, and rate limiting
- **Backups:** Daily automated encrypted backups with multi-site replication
- **Authentication:** JWT tokens with 15-minute expiration, HS256 signing, no stored passwords

## 6. Third-Party Services

FSL uses the following third-party services:
- **Ethereum Network:** For smart contract interactions (public blockchain)
- **Cloudflare:** For content delivery, DDoS protection, and DNS
- **Vercel:** For frontend hosting
- **Pinata:** For IPFS document pinning
- **CoinGecko:** For cryptocurrency price data (no user data shared)

We do not share your wallet address or engagement data with any third party.

## 7. Children's Privacy

FSL is not intended for use by individuals under 18 years of age. We do not knowingly collect data from minors.

## 8. Your Rights

You have the right to:
- **Access** your data by connecting your wallet
- **Revoke** Sovereign Guide access at any time
- **Delete** your off-chain records by contacting us (on-chain records are permanent)
- **Export** your wellness data in standard formats
- **Disconnect** your wallet to end your session immediately

## 9. Changes to This Policy

We may update this Privacy Policy from time to time. Changes will be posted on the Platforms with an updated effective date. Your continued use of the Platforms after changes constitutes acceptance.

## 10. Contact

For privacy questions or data requests:
- **Email:** future.systems.lab@proton.me
- **Insurance Navigation:** sovereigncoverage@futuresystemslab.io

## 11. Disclaimer

FSL is an educational wellness technology platform, not a medical facility. We do not provide diagnoses, treatment plans, or clinical assessments. Sovereign Guides are independent wellness professionals, not FSL employees. For medical concerns, consult a licensed healthcare provider.

---

*This Privacy Policy is anchored to the FSL governance repository for version control and provenance.*

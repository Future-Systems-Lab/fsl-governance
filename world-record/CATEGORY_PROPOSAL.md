# Guinness World Records — New Category Proposal

## Proposed Category

**Category Name:** Most Decentralized Wellness Platform

**Parent Category:** Technology > Software > Blockchain / Decentralized Applications

---

## Category Definition

The "Most Decentralized Wellness Platform" is measured by the number of core platform functions that operate without centralized intermediaries. Each function is scored as either decentralized (1 point) or centralized (0 points) across a standardized checklist of 10 platform functions.

---

## Scoring Criteria (10 Functions)

| # | Function | Decentralized (1 pt) | Centralized (0 pts) |
|---|----------|---------------------|---------------------|
| 1 | **Authentication** | Wallet-only (no email, password, OAuth, SSO) | Any centralized identity provider |
| 2 | **Payment Processing** | Cryptocurrency-only or decentralized onramp (no Stripe, PayPal, Square) | Any centralized payment processor |
| 3 | **Session Records** | On-chain (blockchain-based, immutable) | Database, EHR, or cloud storage |
| 4 | **Governance Documents** | IPFS or equivalent decentralized storage | AWS S3, Google Drive, or centralized cloud |
| 5 | **User Identity** | Wallet-based (no PII stored by platform) | Email, SSN, or any PII-based identity |
| 6 | **Consent Mechanism** | Cryptographic signature (personal_sign, EIP-712) | Checkbox, click-through, or verbal |
| 7 | **Revenue Distribution** | On-chain or smart contract-enforced split | Manual distribution or centralized processor |
| 8 | **Wellness Content Delivery** | Self-hosted or decentralized hosting (IPFS, Arweave) | Centralized CDN only |
| 9 | **Token/Reward System** | On-chain token (ERC-20, NFT) | Points system in centralized database |
| 10 | **Open Source Contributions** | At least 5 PRs to recognized open source projects | Closed source or fewer than 5 contributions |

**Scoring:**
- 10/10 = Fully decentralized
- 7-9/10 = Highly decentralized
- 4-6/10 = Partially decentralized
- 0-3/10 = Centralized with blockchain features

---

## Why This Category Is Measurable

Each criterion has a binary outcome (decentralized or not) that can be independently verified:

- **Authentication:** Inspect login flow — is there an email field? If yes, centralized. If wallet-only, decentralized. Verifiable by visiting the platform.
- **Payment Processing:** Inspect codebase for Stripe, PayPal, etc. Search `grep -r "stripe\|paypal\|square"`. If found, centralized. Verifiable by code review.
- **Session Records:** Check for smart contract that records sessions. Verify on block explorer. If records are in a database only, centralized.
- **Governance Documents:** Verify IPFS CID resolves to the document. If documents are only on a website, centralized.
- **User Identity:** Check if platform stores email, name, or PII. If wallet address only, decentralized.
- **Consent Mechanism:** Check if login requires cryptographic signature. If checkbox, centralized.
- **Revenue Distribution:** Check smart contract for payment split logic. If manual, centralized.
- **Content Delivery:** Check hosting infrastructure. CDN + IPFS = partially. IPFS-only = full.
- **Token System:** Check for on-chain token contract. If database points, centralized.
- **Open Source:** Count PRs on GitHub. Binary: 5+ or fewer.

---

## Why This Category Is Breakable

A future platform could beat the current record by:

1. **Achieving a higher decentralization score** — If FSL scores 8/10 (e.g., content delivery still partially centralized via Vercel), a competitor could score 9/10 or 10/10.
2. **Achieving the same score with more platforms** — FSL has 5 integrated platforms. A competitor with 6+ equally decentralized platforms would hold a stronger claim.
3. **Achieving the same score on mainnet** — FSL's contracts are on Sepolia testnet. A competitor with equivalent decentralization on Ethereum mainnet has a stronger claim.
4. **Achieving the same score with more games/content** — FSL has 31 games. A competitor with 50+ fully decentralized wellness experiences would hold a stronger claim.

This ensures the record is not a one-time, unbreakable achievement but an ongoing benchmark that incentivizes decentralization in wellness technology.

---

## Why This Category Is Verifiable

All evidence is publicly auditable:

- **Smart contracts** are on a public blockchain (Sepolia/Ethereum mainnet) — anyone can read the code and verify deployment
- **IPFS documents** are retrievable by anyone with the CID
- **Source code** is on GitHub (public repositories)
- **Live platform** is accessible at a public URL
- **Articles** are published on a public news site
- **Open source PRs** are on public GitHub repositories

No evidence requires private access, proprietary tools, or trust in the claimant's self-reporting. Every claim can be independently verified by a third party with an internet connection and a block explorer.

---

## Why This Category Is Standardized

The 10-function checklist provides a standardized framework that:

- Applies equally to any wellness platform worldwide
- Does not favor any specific blockchain, programming language, or country
- Can be evaluated by any qualified technical reviewer
- Produces a numeric score that enables direct comparison
- Accounts for the specific functions relevant to wellness platforms (not general dApps)

---

## FSL's Current Score

| # | Function | FSL Status | Score |
|---|----------|-----------|-------|
| 1 | Authentication | Wallet-only (Brave + personal_sign) | 1 |
| 2 | Payment Processing | Crypto + Onramper (no Stripe) | 1 |
| 3 | Session Records | SovereignLedger on Sepolia | 1 |
| 4 | Governance Documents | IPFS via Pinata | 1 |
| 5 | User Identity | Wallet address only, no PII | 1 |
| 6 | Consent Mechanism | personal_sign + ethers.verifyMessage | 1 |
| 7 | Revenue Distribution | 70/30/3 split (smart contract planned) | 0.5* |
| 8 | Wellness Content Delivery | Vercel (centralized CDN) | 0** |
| 9 | Token/Reward System | HNT on Sepolia (ERC-20) | 1 |
| 10 | Open Source | 8 PRs to major repos | 1 |

**FSL Score: 8.5 / 10**

*Revenue split is defined in code but not yet enforced by smart contract on every transaction.
**Content is served via Vercel; 4EVERLAND/IPFS migration planned.

---

*Category proposal prepared April 10, 2026*
*Future Systems Lab · All Rights Reserved*

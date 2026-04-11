> **HOLD — Submit after ASU DEng acceptance and institutional email confirmed (Spring/Summer 2027 upon acceptance)**

# ASU DEng Research Grant Application — Future Systems Lab

**Target:** ASU Ira A. Fulton Schools of Engineering — DEng Research Funding
**Ask:** Research stipend + $15,000 infrastructure funding
**Applicant:** Dr. Meg Montanez-Davenport, D.N.Psy., BCHN, CBHP (DEng candidate, January 2027)
**Organization:** Future Systems Lab (FSL)

---

## Executive Summary

Future Systems Lab is a live, operational decentralized Web3 sovereign wellness platform that serves as the applied research artifact for a Doctor of Engineering thesis at Arizona State University. The platform comprises 5 integrated platforms, 8 deployed smart contracts, 31 browser-based wellness games, and 17 autonomous AI agents — all operating in production on the Sepolia testnet with a clear mainnet migration path.

This grant funds the infrastructure required to transition FSL from testnet demonstration to mainnet production: professional security audit, Ethereum mainnet deployment gas, production-grade payment onramp, and decentralized compute migration. The research question — "Can decentralized infrastructure provide a viable alternative to centralized health tech platforms while preserving participant sovereignty?" — requires mainnet operation to answer definitively.

## Problem Statement

Centralized wellness platforms concentrate participant data, payment flows, and access control in corporate infrastructure. This creates single points of failure, privacy vulnerabilities, and power asymmetries between platforms and participants. No peer-reviewed research exists on whether fully decentralized architecture can serve wellness use cases at production scale.

## Proposed Solution

FSL is the research instrument. It demonstrates decentralized alternatives for each centralized component:
- Authentication: wallet-only (personal_sign + JWT) vs email/password
- Payments: cryptocurrency + Onramper vs Stripe/PayPal
- Records: on-chain (SovereignLedger) vs centralized EHR
- Governance: IPFS-pinned documents vs corporate policy
- Consent: cryptographic signature vs checkbox

The platform scores 8.5/10 on a custom decentralization scoring framework (documented in CATEGORY_PROPOSAL.md). Mainnet deployment would raise this to 9.5/10.

## Technical Specifications

- **Frontend:** Next.js 14 (EncryptHealth), Vite/React (HypnoNeuro)
- **Smart Contracts:** 8 Solidity contracts on Sepolia (ERC-20, ERC-721, custom)
- **Authentication:** EIP-1193 + personal_sign + JWT via jose/ethers.js
- **Payments:** ISO 20022-aligned (XRP, XLM, HBAR, ALGO, ADA) + Onramper + Coinbase Pay
- **Storage:** PostgreSQL (session data) + IPFS/Pinata (governance) + Ethereum (records)
- **Agents:** 17 autonomous AI agents via OpenRouter/Claude

## Budget Breakdown

| Item | Cost | Purpose |
|------|------|---------|
| Mainnet contract deployment | $450 | 8 contracts to Ethereum mainnet |
| Smart contract security audit | $5,000 | Required before mainnet (industry standard) |
| Onramper production API | $2,000 | Live fiat-to-crypto for participants |
| Decentralized compute (Akash/Flux) | $100 | Replace centralized VPS |
| .crypto domains (4) | $320 | Sovereign DNS layer |
| PR/academic publication | $500 | Conference submission + press |
| Infrastructure (12 months) | $1,200 | VPS, IPFS, monitoring |
| Research data collection tools | $500 | Analytics for thesis data |
| **Total** | **$10,070** | |

## Timeline

| Semester | Milestone |
|----------|-----------|
| Spring 2027 | DEng enrollment, thesis proposal, mainnet preparation |
| Fall 2027 | Mainnet deployment, first production participants |
| Spring 2028 | Data collection, conference paper submission |
| Fall 2028 | Thesis writing, defense preparation |
| Spring 2029 | Defense, publication, DEng conferred |

## Team

- **Dr. Meg Montanez-Davenport** — D.N.Psy., BCHN, CBHP. Founder. Designed and built entire platform.
- **DEng Advisor** — (to be assigned upon enrollment)
- **17 AI Agents** — Autonomous infrastructure management

## Evidence

- Live platform: https://encrypthealth.io (5 platforms operational)
- 31 wellness games: https://hypnoneuro.io
- 8 smart contracts verified on Sepolia
- IPFS governance documents pinned
- 8 open source PRs to major blockchain/healthcare repos
- 3 published articles (America Out Loud)
- World record documentation package (Guinness submission ready)
- GitHub: https://github.com/Future-Systems-Lab

---


- XRPL mainnet wallet: `rwR3etLJVxtQXYs2d9jgBQxzHBivtCMdPd` — activated Apr 11, 2026 (TX: 36A916...2E4C91)
- Decentralization Migration Record: IPFS CID `QmdCYh3vV4aGFnft9DkxxDrKhc9BWac6E9YSbNBAndo2B4`

---

*Educational platform. Not medical advice.*

# FSL Pre-Mainnet Deployment Gates

All items below must be completed and signed off before any FSL contract is deployed to Ethereum mainnet or any paid session goes live.

## Smart Contract Security
- [ ] Third-party audit of all 8 Sepolia contracts (HNT v2, EHT, MindMasteryNFT, SovereignLedger, AlchemistForge, BenevolenceFund, PractitionerAchievement, ParticipantAchievement)
- [ ] Audit firm selected and engaged
- [ ] All Critical/High findings remediated before mainnet deploy

## Legal
- [ ] ToS V1 attorney-reviewed and published to all four domains
- [ ] Insurance Navigator flow reviewed by counsel (sovereign governance framing confirmed)
- [ ] HIPAA counsel sign-off — hash-only on-chain architecture satisfies safe harbor
- [ ] AI disclaimer coverage reviewed

## Infrastructure
- [x] CORS allowlist audited — no rotating or unknown hostnames (completed April 6, 2026)
- [ ] Cloudflare named tunnel (stable hostname) replacing quick tunnel
- [ ] Fail2ban confirmed active on all exposed services
- [x] PostgreSQL not publicly accessible (confirmed localhost-only)

## Commercial
- [ ] At least one paying user and confirmed MRR before approaching XRPH or investors
- [ ] NC A&H insurance producer license confirmed active — update all "licensing pending" language

## Status
Pre-mainnet. All contracts on Sepolia testnet only. This document is the governing checklist.

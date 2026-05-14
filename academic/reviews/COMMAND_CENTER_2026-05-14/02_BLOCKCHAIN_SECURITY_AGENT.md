# Blockchain/Security Agent -- FSL Command Center Review

**Date:** 2026-05-14
**Surface:** fsl-command-center.vercel.app (index.html)
**Perspective:** Blockchain/Web3 technical evaluator and security reviewer

---

## WHAT'S GOOD

1. **All 9 contract addresses are listed with Blockscout links.** Each contract in the table has a clickable "View" link to eth-sepolia.blockscout.com. A technical evaluator can verify every contract on-chain in under 30 seconds.

2. **Contract purposes are clearly labeled.** Each row includes the contract name, token standard (ERC-20, ERC-1155), address, and a brief purpose description. HNT v2, EHTv2, MindMasteryNFT, SovereignLedger v2, AlchemistForge, BenevolenceFund v2, SovereignAchievement, NeuroBalanceConsent, and SovereignSession are all present.

3. **Sepolia testnet is honestly disclosed.** The hero badge says "Phase 1 Demonstration -- Sepolia Testnet" and the contracts section has an amber "Sepolia Testnet" tag. No attempt to disguise testnet as mainnet.

4. **EIP-191 auth pattern is implemented and visible in the source.** The wallet connect script uses `personal_sign` (EIP-191) with a structured message containing wallet address and timestamp. The code comment explicitly says "Canonical FSL EIP-191 pattern -- matches HypnoNeuro/EncryptHealth (be51a7880)."

5. **Zero-PHI architecture is stated.** The disclaimer says "No protected health information (PHI) is collected, stored, or transmitted." The thesis section mentions "no PHI held by design."

6. **Revenue split is disclosed.** "67% practitioner / 30% platform / 3% Benevolence Fund" with a note that "Mainnet requires security audit."

7. **Wallet recommendation is Brave Wallet** with fallback to "Rainbow, Rabby, or any EIP-1193 wallet" -- demonstrates understanding of the EIP-1193 standard.

---

## WHAT'S MISSING

1. **Single-deployer-wallet limitation is not disclosed.** The auth script shows a single-wallet check (`data.connected` vs `data.expected`) but there is no public statement that all contracts are deployed from a single EOA. This is a centralization risk that technical evaluators will flag immediately.

2. **No multisig or named successor information.** There is no mention of a Gnosis Safe, multisig wallet, or any succession plan for the deployer key. If Dr. Meg is incapacitated, what happens to contract ownership? This is a governance gap.

3. **Access control models are not explained.** The contracts table lists 9 contracts but does not indicate which are permissionless (anyone can interact) vs. owner-controlled (onlyOwner functions). For example: Can anyone mint HNT? Or only the deployer? Can anyone create a SovereignSession? This distinction is critical for security review.

4. **No smart contract audit status.** The page says "Mainnet requires security audit" but does not state whether any audit (even self-audit or automated tooling like Slither/Mythril) has been performed on the current testnet contracts.

5. **No deployer wallet address disclosed.** The contract addresses are listed but the deploying wallet is not. A security reviewer would want to verify that all 9 contracts share the same deployer.

6. **XRPL integration is mentioned but not evidenced.** The thesis says "Public Ethereum + XRPL dual-anchor" and the sprint history mentions "Dual chain ETH primary + XRPL secondary" but there are no XRPL addresses, transaction links, or explorer references anywhere on the page.

7. **IPFS pinning strategy is not explained.** The BHTY paper CID is listed, and the stats show "20 IPFS CIDs," but there is no information about pinning infrastructure (Pinata? 4EVERLAND? Self-hosted?), redundancy, or what happens if pins expire.

8. **JWT auth flow is mentioned but not explained.** The code shows `personal_sign` -> `/api/auth` -> JWT -> `/dashboard` but the public page does not explain the auth architecture for a technical reviewer who is not reading source code.

9. **No contract source verification status.** Are the contracts verified on Blockscout (source code published)? This is a basic trust signal for any blockchain evaluator.

---

## SPECIFIC ADDITIONS NEEDED

| Priority | Addition |
|----------|----------|
| **CRITICAL** | Add a "Security Architecture" or "Trust Model" subsection disclosing: (a) single-deployer EOA limitation, (b) multisig succession plan or lack thereof, (c) which contracts have owner-only functions vs. permissionless interaction. |
| **HIGH** | Disclose the deployer wallet address. It is already public on-chain; listing it here signals transparency rather than obscurity. |
| **HIGH** | Add access control labels to the contracts table: a column or tag indicating "Owner-controlled" vs "Permissionless" for each contract. |
| **HIGH** | Add XRPL evidence: at minimum one XRPL address or transaction hash with an explorer link (e.g., xrpscan.com or bithomp.com). |
| **MEDIUM** | Add smart contract verification status: "Source verified on Blockscout: Yes/No" for each contract, or a blanket statement. |
| **MEDIUM** | Add audit status: "No third-party audit performed. Automated analysis via [Slither/Mythril] completed [date]" or equivalent honest disclosure. |
| **MEDIUM** | Explain IPFS pinning: "Pinned via [Pinata/4EVERLAND/self-hosted]. Dual-pin policy active. [X] CIDs monitored." |
| **LOW** | Add a brief EIP-191 auth explainer for non-source-reading reviewers: "Authentication uses EIP-191 personal_sign -- the wallet signs a structured message; the server verifies the signature and issues a JWT. No password, no email, no PHI." |
| **LOW** | Mention the canonical config sync mechanism (the page already has it in JS but it is invisible to reviewers). |

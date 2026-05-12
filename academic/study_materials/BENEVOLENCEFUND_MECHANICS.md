# BenevolenceFund Distribution Mechanics

**Contract:** [0x96E8006a1fBB693B55fFf6254B8BF19EC605251B](https://eth-sepolia.blockscout.com/address/0x96E8006a1fBB693B55fFf6254B8BF19EC605251B)
**Standard:** Custom (owner-controlled distribution)
**Network:** Ethereum Sepolia testnet

---

## Source of Funds

3% of every session payment flows to BenevolenceFund. This is part of the locked 70/27/3 revenue split:
- 70% → Sovereign Guide (USDC direct payment)
- 27% → FSL Operations
- 3% → BenevolenceFund

The 3% allocation is embedded in the platform's payment processing logic, not enforced by the smart contract itself. The contract holds funds; distribution is triggered by the owner (FSL).

## Distribution Formula

Annual distribution on **April 1**, based on the preceding year's HNT earnings data:

| Rank | Recipient | Share |
|------|-----------|-------|
| 1st | Top Sovereign Guide by participant HNT earned | 44% |
| 2nd | Second Guide by participant HNT earned | 33% |
| 3rd | Third Guide by participant HNT earned | 22% |
| Bonus | Top Participant by HNT earned | 1% (crypto) |

**Ranking metric:** Total HNT earned by a Guide's participants (not the Guide's own HNT). This incentivizes Guides who drive the most participant engagement, not Guides who accumulate tokens themselves.

## Payment Mechanism

- Distribution is an **owner-initiated transaction** from the BenevolenceFund contract
- Owner calls a distribution function specifying recipient addresses and amounts
- Funds transfer on-chain to recipient wallet addresses
- Transaction is publicly verifiable on Blockscout

## Centralization Risk — Honest Assessment

**Current state (Phase 1):**
- The 3% allocation is **not enforced on-chain** — it's calculated in the backend payment logic and manually transferred
- Distribution is **owner-initiated** — Dr. Meg (deployer wallet) triggers the annual payout
- Ranking calculation happens **off-chain** (PostgreSQL query on HNT earnings data)
- No on-chain governance mechanism — recipients cannot dispute or verify rankings independently without querying the same off-chain data

**What would decentralize it:**
- On-chain revenue split enforcement (smart contract receives payment, auto-splits 70/27/3)
- On-chain ranking oracle (reads HNT balances/transfers to determine top 3 Guides)
- Timelock + multisig on distribution (prevent unilateral owner distribution)
- Transparent ranking methodology published and verifiable

**Planned for mainnet:** Multisig governance on BenevolenceFund, on-chain ranking verification, timelock on distribution. Not implemented in Phase 1 testnet.

## Tax Implications

**For FSL LLC:**
- BenevolenceFund distributions are business expenses (payments to independent contractors / incentive compensation)
- Must issue 1099-MISC or 1099-NEC to recipients if >$600/year
- Crypto distributions have cost basis at time of distribution

**For Sovereign Guides (recipients):**
- Distributions are taxable income at fair market value at time of receipt
- If received as crypto (not USDC), taxable event occurs at receipt
- Guides are independent contractors, not employees — responsible for own estimated taxes

**For Participants (1% bonus):**
- Crypto bonus is taxable income at FMV
- If <$600, no 1099 required from FSL but still reportable by recipient

**Disclaimer:** This is architectural documentation, not tax advice. FSL recommends all recipients consult their own tax professional.

## Phase 1 Reality

As of May 2026:
- **BenevolenceFund has received $0** — no real session payments have occurred (testnet only, no mainnet deployment)
- **Zero distributions have been made**
- **The contract exists and is verified on Sepolia** — the mechanism is deployed but unfunded
- **The 70/27/3 split is documented and coded** but has never processed a real transaction
- **First distribution target:** April 1, 2027 (conditional on mainnet launch and real session revenue)

This is consistent with the honest framing in BHTY paper Section 8: all participation is architect-initiated or campaign-generated; no external organic adoption has been measured.

## Due Diligence Questions & Answers

**Q: Has BenevolenceFund ever distributed funds?**
A: No. The contract is deployed on testnet. No real funds have been received or distributed.

**Q: Who controls the distribution?**
A: The deployer wallet (0xf22cbF25deEeA36FFF828BAf73CCb049345eF248) — currently a single key held by the founder. Multisig planned for mainnet.

**Q: Is the 3% allocation enforced on-chain?**
A: No. It's calculated in backend payment logic. On-chain enforcement is planned for mainnet.

**Q: Can Guides verify their ranking independently?**
A: Not currently. Rankings are calculated from off-chain HNT data. On-chain ranking verification is a mainnet milestone.

**Q: What happens if FSL shuts down before distribution?**
A: Funds in the contract remain on-chain and accessible to the owner wallet. If the owner key is lost, funds are permanently locked. This is a known centralization risk documented for mainnet governance improvements.

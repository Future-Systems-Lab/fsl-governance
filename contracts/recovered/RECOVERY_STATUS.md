# Contract Source Recovery — 2026-04-19

## Recovered (2 of 5)

| Contract | Address | Source |
|----------|---------|--------|
| HypnoNeuroToken (HNT v2) | 0x1ae1e10929f008d1f9883ce574a318abd86084e2 | Recovered from git history (commit c447375d0) |
| MindMasteryNFT | 0xCb9EcB00574DB29976c7C54045d443666D5C7771 | Recovered from git history (commit c447375d0) |

## Not Recovered (3 of 5)

| Contract | Address | Status |
|----------|---------|--------|
| SovereignLedger | 0xf32979200768e8726d5EC5E5AB0CA7407d64A94e | Not verified on Blockscout. No .sol in SovereignLedger repo or git history. Deployment artifacts lost. |
| BenevolenceFund | 0xbe710a0a5a80dfa3ca7dfadc959176d545b18271 | Not verified on Blockscout. No local source found anywhere. |
| PractitionerAchievement | 0xe23e39799a47af1c383464c958e7724eed36f987 | Not verified on Blockscout. No local source found. |
| ParticipantAchievement | 0x406c30894a14b53a6b5700025c06dd0697586fc6 | Not verified on Blockscout. No local source found. |

## Recovery Options

For unrecovered contracts:
1. **Decompile bytecode** — get the ABI and approximate source from bytecode (lossy)
2. **Redeploy from new source** — write clean contracts and deploy fresh addresses
3. **Verify on Blockscout** — if original source exists on another machine, verify it to make it public

## Recommendation

Since these are on Sepolia testnet, the cleanest path is to write new, audited versions and redeploy before mainnet. The Sepolia deployments serve as proof-of-concept only.

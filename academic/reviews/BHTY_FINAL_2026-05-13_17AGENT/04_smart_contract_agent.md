# smart_contract_agent — Review of BHTY_PAPER_v2

VERDICT: MINOR FIXES

OVERALL ASSESSMENT: The paper describes nine deployed smart contracts on Ethereum Sepolia with a coherent access control spectrum from permissionless to owner-controlled. The contract table is well-structured and the architectural rationale is sound. However, a confirmed event name mismatch in Listing 2, an orphaned ERC-721 reference, and unverified on-chain claims require correction before publication.

CRITICAL ISSUES (BLOCKERS):

- [CRITICAL] Listing 2 (line 314) — Event name "SessionCompleted" does not match the deployed SovereignSession contract, which emits "SessionEnded." This is a factual error. The paper's code listing must match the deployed bytecode. Either: (a) update Listing 2 to use "SessionEnded" and update the Figure 4 caption (line 504) which also references "SessionCompleted," or (b) if a contract upgrade is planned, deploy a new version with "SessionCompleted" and update the contract address in Table 1. Option (a) is strongly recommended -- the paper should describe what IS deployed, not what was intended.

- [CRITICAL] 9 contracts claimed (line 348, line 389, Table 1) — Count verification:
  1. HypnoNeuroToken (HNT) — 0x1ae1...84e2
  2. EncryptHealthToken (EHT) — 0x9358...d88
  3. MindMasteryNFT — 0xCb9E...7771
  4. SovereignLedger v2 — 0x4afA...Cc4
  5. AlchemistForge — 0xE092...A324
  6. BenevolenceFund v2 — 0x96E8...251B
  7. SovereignAchievement — 0xC3F1...B8D
  8. NeuroBalanceConsent — 0x2157...96b8
  9. SovereignSession — 0xbeb1...65A1

  Count: 9 contracts confirmed. Consistent with abstract (line 19), Section 7.1 (line 348), and Section 8 (line 389). No discrepancy.

HIGH PRIORITY:

- [HIGH] AlchemistForge "no owner, no pause" claim (Section 6.2, lines 328-329) — The paper states: "no owner, no admin functions, no pause mechanism, no token economics." This is a strong claim of full permissionlessness. Verification requires reading the deployed contract source at 0xE092336F8f5082e57CcBb341A110C20ad186A324 on Sepolia. The paper should either: (a) confirm the contract is verified on Etherscan/Sepolia explorer and invite readers to verify, or (b) publish the contract source in the paper or supplementary materials. The "Fully permissionless" access control label in Table 1 (line 356) is consistent with this claim. If the contract inherits from OpenZeppelin Ownable or includes any onlyOwner modifier, this claim is false. The paper's GitHub reference (line 594) should include the specific contract source files.

- [HIGH] Reference [32] ERC-721 — ERC-721 is listed in the references (line 578) but never cited anywhere in the body text. The paper uses ERC-1155 for NFTs (MindMasteryNFT, SovereignAchievement) and ERC-20 for tokens (HNT, EHT). ERC-721 is the standard NFT interface but is not used in any FSL contract. This is an orphaned reference. Either: (a) remove reference [32] and renumber subsequent references, or (b) add a sentence explaining why ERC-1155 was chosen over ERC-721 (e.g., "FSL selected ERC-1155 [33] over ERC-721 [32] for achievement credentials because ERC-1155 supports multiple token types within a single contract, reducing deployment costs and simplifying credential management").

- [HIGH] Section 7.1 — SovereignLedger v2 and BenevolenceFund v2 both have "v2" designations, implying predecessor contracts exist. The paper does not mention the v1 contracts or explain the upgrade. Were the v1 contracts deprecated? Are they still on-chain? If so, do they present any security risk (e.g., participants interacting with old contracts)? The upgrade history should be briefly noted.

- [HIGH] Section 7.1 — NeuroBalanceConsent is listed as "Biosensor consent scaffold" with "Owner-controlled" access (line 359). Section 3.1 describes NeuroBalance as "pre-implementation phase" (line 108). A deployed contract for a pre-implementation platform is architecturally ambiguous. Is this contract functional or a placeholder? The paper should clarify.

MEDIUM PRIORITY:

- [MEDIUM] Section 5.3 — The 70/27/3 revenue split is described as "enforced by smart contract logic" (line 286) via SovereignLedger. The paper should specify: (a) whether this split is hardcoded or configurable by the owner, (b) whether the split percentages can be upgraded, and (c) whether the BenevolenceFund v2 contract is the recipient of the 3% or if that routing is also in SovereignLedger. If the owner can change the split percentages, the "architectural rather than contractual" claim is weakened.

- [MEDIUM] Section 7.1 — SovereignAchievement is described as issuing "soulbound (non-transferable) credentials" (line 362). The paper references ERC-5192 (line 80) as the soulbound interface. However, ERC-5192 is built on top of ERC-721, not ERC-1155. The paper should clarify whether SovereignAchievement implements a custom non-transferability mechanism (e.g., overriding `safeTransferFrom` to revert) or uses a formal soulbound standard. If it uses a custom mechanism, this should be specified.

- [MEDIUM] Section 6.1 — "Either the guide or participant can mark the session as complete through the contract interface" (line 299). This implies both addresses have permission to call the completion function. The access control for this is not specified. Can any address call completion on any session? Is there a mapping of session ID to authorized addresses? The paper should describe the session completion access control.

- [MEDIUM] Table 1 — Access control column uses four categories: "Owner-minted," "Open registration," "Fully permissionless," "Owner-controlled," "Owner-distributed," "Guide-initiated." These categories are not defined. "Open registration" for SovereignLedger v2 is unclear -- does this mean anyone can register as a Guide? If so, what prevents unauthorized entities from initiating sessions?

- [MEDIUM] Section 7.1 — "All owner-controlled contracts are currently deployed from a single deployer wallet" (line 364). The paper acknowledges this as a limitation. However, it does not state whether the deployer wallet is a hardware wallet or a software wallet, nor whether the private key is stored in any key management system. For a paper about cryptographic sovereignty, the deployer key security model matters.

LOW PRIORITY:

- [LOW] Listing 2 — The `SessionStarted` event includes a `contentHash` parameter (line 309) but the `SessionCompleted` event does not (line 314). This means the completion attestation cannot independently verify what content was associated with the session. Presumably the content hash from `SessionStarted` is linked by the same guide/participant address pair, but this requires off-chain correlation.

- [LOW] Section 8 — "Contract deployment date range: 2025-2026" (line 387). This is vague. The specific deployment dates (or at least block numbers) for each contract would allow independent verification on Sepolia explorer.

- [LOW] Section 10.3 — Duplicate numbering: two items labeled "10" (lines 478 and 480). The second "10" (Mainnet deployment) should be "11."

WHAT THIS AGENT BELIEVES IS DONE WELL:

- The access control spectrum from "Fully permissionless" (AlchemistForge) to "Owner-controlled" (token minting) is a thoughtful architectural design that matches the sensitivity level of each operation.
- The nine-contract architecture with clear purpose separation demonstrates genuine smart contract engineering, not a toy deployment.
- The honest acknowledgment of single-deployer centralization (line 364) and planned multisig migration shows architectural maturity.
- The soulbound credential design using ERC-1155 with token ID ranges is an elegant solution for multi-type credentials.
- AlchemistForge's honest disclosure of campaign wallets and no organic adoption (line 394) prevents any misrepresentation of deployment traction.

UNIQUE DOMAIN PERSPECTIVE:

- The SessionCompleted vs. SessionEnded mismatch is the single most important fix. In smart contract development, event names are part of the ABI and are used by indexers (The Graph, Etherscan event logs, custom subgraphs). If the paper says "SessionCompleted" but the contract emits "SessionEnded," any developer building on this paper's documentation will write incorrect event filters. This is not a cosmetic issue -- it is a functional error that would cause integration failures.
- The paper would benefit from including contract verification status (verified/unverified on Sepolia Etherscan) in Table 1. Verified contracts allow anyone to read the source and confirm the paper's claims. Unverified contracts require trusting the paper's descriptions.
- The absence of any mention of gas costs is notable. Even on testnet, gas consumption per operation (session start, session end, token mint, achievement award) provides useful data for mainnet cost projections.

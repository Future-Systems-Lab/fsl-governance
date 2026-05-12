# Smart Contract Agent Review — FSL Command Center
## Date: 2026-05-12
## Reviewer: Smart Contract Agent (6-Agent Council)

---

## VERDICT: FAIL — 4 of 9 canonical contracts missing; v1 stale addresses used for 2 contracts

---

## CONTRACT INVENTORY AUDIT

### Canonical 9 vs. Command Center Registry

| # | Canonical Contract | Canonical Address | Found in CC? | Address Match? |
|---|---|---|---|---|
| 1 | HNT | `0x1ae1e10929f008d1f9883ce574a318abd86084e2` | YES (as "HypnoNeuroToken") | NO — CC shows `0x411426f8E735F7940B20491609F08817A805b198` (v1/stale) |
| 2 | EHT | `0x93583a7A24e50075c79b06db0be8Cf4D45B0bd88` | YES (as "EncryptHealthToken") | NO — CC shows `0xbDaeb1d05E02D2751Ad07121510b5f0C436E2CdC` (v1/stale) |
| 3 | MindMasteryNFT | `0xCb9EcB00574DB29976c7C54045d443666D5C7771` | YES | YES — address matches canonical |
| 4 | SovereignLedger v2 | `0x4afA577fA914068451e0Aa97b61F23960f02aCc4` | NO — listed as "ClaimChain" at `0xf329...4A94e` | NO — wrong name AND wrong address |
| 5 | AlchemistForge | `0xE092336F8f5082e57CcBb341A110C20ad186A324` | YES | YES — address matches canonical |
| 6 | BenevolenceFund v2 | `0x96E8006a1fBB693B55fFf6254B8BF19EC605251B` | NO | N/A — completely absent |
| 7 | SovereignAchievement | `0xC3F11d2F1F12bB96b9DCF7e8f85e9704D2869B8D` | NO | N/A — completely absent |
| 8 | NeuroBalanceConsent | `0x21571805e57f792b66604b140a45D8C1b2E196b8` | NO | N/A — completely absent (card exists for "NeuroBalance Watch" but no contract address shown) |
| 9 | SovereignSession | `0xbeb13A360C6F0C77Ea3af3650Ab9762a1B9965A1` | NO | N/A — completely absent |

**Summary: 5 of 9 contracts appear in the registry. Only 2 of those 5 have correct canonical addresses (MindMasteryNFT, AlchemistForge). 4 contracts are entirely missing. 2 contracts (HNT, EHT) use stale v1 addresses.**

---

## MISSING ELEMENTS

1. **BenevolenceFund v2** (`0x96E8...251B`) — No mention anywhere in the Command Center. Zero matches in content.
2. **SovereignAchievement** (`0xC3F1...9B8D`) — No card, no registry chip, no reference.
3. **NeuroBalanceConsent** (`0x2157...96b8`) — The "NeuroBalance Watch" card exists as a project card but shows no contract address. The on-chain consent contract is not linked.
4. **SovereignSession** (`0xbeb1...65A1`) — No mention anywhere.
5. **SovereignLedger v2** (`0x4afA...aCc4`) — Named "ClaimChain" in the UI and linked to a different address (`0xf32979200768e8726d5EC5E5AB0CA7407d64A94e`). The canonical v2 address is not present.

---

## PRESENT BUT BROKEN

1. **HNT address is stale v1**: CC links to `0x411426f8E735F7940B20491609F08817A805b198`. Canonical v2 is `0x1ae1e10929f008d1f9883ce574a318abd86084e2`. This appears in both the HypnoNeuro project card and the Contract Registry chip. The Blockscout link will resolve to the old/abandoned deployment.

2. **EHT address is stale v1**: CC links to `0xbDaeb1d05E02D2751Ad07121510b5f0C436E2CdC`. Canonical v2 is `0x93583a7A24e50075c79b06db0be8Cf4D45B0bd88`. Same issue — both project card and registry chip point to the wrong contract.

3. **SovereignLedger v2 misnamed as "ClaimChain"**: The contract registry lists "ClaimChain" at `0xf32979200768e8726d5EC5E5AB0CA7407d64A94e`. This is neither the correct canonical name ("SovereignLedger") nor the correct v2 address (`0x4afA577fA914068451e0Aa97b61F23960f02aCc4`). This is a double fault: wrong name + wrong address.

4. **Contract count stat says "5 Contracts Live"**: The canonical count is 9. Even if only counting those displayed, the deployer wallet is included as a "contract chip" (6 chips total), so the stat is inconsistent with its own registry.

5. **status.json fetch with no fallback rendering**: The JS fetches `status.json` but if it fails (line 1371 `.catch(() => {})`), the status silently swallows the error. Status badges show static "LIVE" in HTML regardless of actual chain state — they are hardcoded, not driven by real-time data.

---

## BLOCKSCOUT LINKS

- Blockscout links ARE present for all contracts shown in the registry. Links use the correct `https://eth-sepolia.blockscout.com/address/` format.
- However, 3 of the 6 Blockscout links point to wrong/stale addresses (HNT, EHT, ClaimChain/SovereignLedger).
- The deployer wallet Blockscout link (`0xf22c...F248`) is present and consistent.

---

## REAL-TIME STATUS

- **No real-time on-chain status is shown.** All "LIVE" badges are hardcoded in static HTML.
- The `status.json` fetch exists but: (a) it drives project detail modals only (not the badges), and (b) it silently fails with an empty catch.
- There is no WebSocket, no polling of chain state, no RPC call to verify contract liveness.
- The `setInterval` on line 1206 only updates the clock, not contract status.

---

## "PractitionerAchievement" BANNED NAME CHECK

- **PASS** — The string "PractitionerAchievement" does not appear anywhere in the Command Center content. Zero matches. The word "Practitioner" is entirely absent.

---

## DOMAIN-SPECIFIC FINDINGS

1. **Contract Registry is incomplete and misleading**: Presenting 5 contracts (+ deployer wallet) as the full registry when 9 canonical contracts exist creates a false sense of completeness. The label "All deployed contracts" (line 1099) is factually incorrect.

2. **v1 vs v2 address confusion is a security/trust risk**: Users clicking Blockscout links for HNT and EHT will land on abandoned v1 contracts. If those v1 contracts have known vulnerabilities or have been drained, this could mislead users into interacting with deprecated deployments.

3. **No verification status indicators**: While the card subtitle claims "Blockscout verified," there is no per-contract indicator showing verified vs. unverified status. This should be a visible badge on each contract chip.

4. **Missing contracts are active governance contracts**: SovereignSession, SovereignAchievement, BenevolenceFund v2, and NeuroBalanceConsent are not peripheral — they handle sessions, achievements, fund distribution, and consent. Their absence from the Command Center means there is no dashboard visibility for critical governance operations.

5. **Network designation**: All contracts are on Sepolia testnet. This is correctly indicated in the registry header. No mainnet contracts are misrepresented.

---

## REQUIRED FIXES (Priority Order)

| Priority | Fix |
|---|---|
| P0 | Update HNT address to canonical `0x1ae1e10929f008d1f9883ce574a318abd86084e2` |
| P0 | Update EHT address to canonical `0x93583a7A24e50075c79b06db0be8Cf4D45B0bd88` |
| P0 | Rename "ClaimChain" to "SovereignLedger" and update address to `0x4afA577fA914068451e0Aa97b61F23960f02aCc4` |
| P0 | Add BenevolenceFund v2 (`0x96E8006a1fBB693B55fFf6254B8BF19EC605251B`) to registry |
| P0 | Add SovereignAchievement (`0xC3F11d2F1F12bB96b9DCF7e8f85e9704D2869B8D`) to registry |
| P0 | Add NeuroBalanceConsent (`0x21571805e57f792b66604b140a45D8C1b2E196b8`) to registry and NeuroBalance Watch card |
| P0 | Add SovereignSession (`0xbeb13A360C6F0C77Ea3af3650Ab9762a1B9965A1`) to registry |
| P1 | Update "5 Contracts Live" stat to "9 Contracts Live" |
| P1 | Remove "All deployed contracts" claim or make it accurate |
| P2 | Add real-time contract status via RPC calls or indexer polling |
| P2 | Add per-contract Blockscout verification badge |

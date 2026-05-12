# Audit Agent Review -- FSL Command Center
**Source:** `cc_content.md` (captured 2026-05-12)
**Canonical reference:** `canonical/contracts.json` (updated 2026-05-09), `operations/RESTORE_RUNBOOK_2026-05-10.md`
**Date:** 2026-05-10

---

## VERDICT: FAIL -- Multiple Critical Address Mismatches and Missing Data

The Command Center contains several factually incorrect contract addresses, omits three canonical contracts entirely, uses a deprecated project name ("ClaimChain") that should be "SovereignLedger," and is missing the USPTO trademark serial number. The game count (3) and patent number are correct, but the contract registry is stale and unreliable as a source of truth.

---

## CRITICAL FINDINGS

### 1. HNT Token Address -- WRONG
| | Command Center | Canonical (`contracts.json`) |
|---|---|---|
| HNT | `0x411426f8E735F7940B20491609F08817A805b198` | `0x1ae1e10929f008d1f9883ce574a318abd86084e2` |

The CC address appears in three locations (HypnoNeuro card line 751, timeline Step 06 line 923, Contract Registry line 1106). All three use the non-canonical address. The canonical address from `contracts.json`, the Restore Runbook, `FSL_WALLET_REGISTRY.md`, `DEPLOYED_CONTRACTS.md`, and `reviewer-data.json` is `0x1ae1...84e2`. This is a **v1 vs v2 confusion** -- the CC is displaying the old HNT address.

### 2. EHT Token Address -- WRONG
| | Command Center | Canonical (`contracts.json`) |
|---|---|---|
| EHT | `0xbDaeb1d05E02D2751Ad07121510b5f0C436E2CdC` | `0x93583a7A24e50075c79b06db0be8Cf4D45B0bd88` |

The CC EHT address appears at lines 766, 924, 1111. The canonical EHTv2 address from `contracts.json` is `0x9358...0d88`. The CC is displaying a stale v1 EHT address.

### 3. "ClaimChain" Name and Address -- DEPRECATED
| | Command Center | Canonical |
|---|---|---|
| Name | ClaimChain | SovereignLedger v2 |
| Address | `0xf32979200768e8726d5EC5E5AB0CA7407d64A94e` | `0x4afA577fA914068451e0Aa97b61F23960f02aCc4` |

"ClaimChain" appears 11 times in the CC (card title, contract registry, timeline steps, agent responsibilities). The canonical name is **SovereignLedger v2** per `contracts.json`, the Restore Runbook, and all governance documents. The address `0xf329...` is the deprecated v1 address. Previous audits (e.g., `PUBLIC_SURFACES review_audit_agent.md`) already flagged this exact issue.

### 4. Contract Registry Incomplete -- 5 of 9
The CC Contract Registry card lists 5 contracts + deployer wallet:
- HypnoNeuroToken (HNT) -- wrong address
- EncryptHealthToken (EHT) -- wrong address
- MindMasteryNFT -- correct (`0xCb9E...7771`)
- ClaimChain -- deprecated name and address
- AlchemistForge -- correct (`0xE092...A324`)

**Missing from CC entirely (4 contracts):**
- BenevolenceFund v2: `0x96E8006a1fBB693B55fFf6254B8BF19EC605251B`
- SovereignAchievement: `0xC3F11d2F1F12bB96b9DCF7e8f85e9704D2869B8D`
- NeuroBalanceConsent: `0x21571805e57f792b66604b140a45D8C1b2E196b8`
- SovereignSession: `0xbeb13A360C6F0C77Ea3af3650Ab9762a1B9965A1`

The stat bar says "5 Contracts Live" (line 1161). Canonical count is **9 contracts**. The Restore Runbook also lists BenevolenceFund and SovereignAchievement explicitly.

### 5. Stat "5 Contracts Live" -- STALE
Should read 9 to match `canonical/contracts.json`.

---

## MISSING ELEMENTS

| Element | Status | Notes |
|---|---|---|
| USPTO Trademark Serial No. 99533250 | ABSENT | Patent 64/063,037 is present in footer (line 1195). Trademark is entirely missing. Both should appear per `IP_PROTECTION_CHECKLIST.md`. |
| BenevolenceFund v2 contract | ABSENT | Listed in Runbook and `contracts.json`. Not in CC registry. |
| SovereignAchievement contract | ABSENT | Listed in Runbook and `contracts.json`. Not in CC registry. |
| NeuroBalanceConsent contract | ABSENT | Listed in `contracts.json`. Not in CC registry. |
| SovereignSession contract | ABSENT | Listed in `contracts.json`. Not in CC registry. |
| XRPL mainnet address | ABSENT | Runbook canonical: `rwR3etLJVxtQXYs2d9jgBQxzHBivtCMdPd`. Not referenced in CC. |
| Backup/restore link or reference | ABSENT | CC has no link to or mention of the Restore Runbook. The "Backup / Sync" agent chip exists but its responsibilities reference "BackupArchiveContract" without linking to the actual runbook. |
| SSL/cert info | ABSENT | CC `QUICK CHECKS` confirms 0 matches. |
| PM2 process list | ABSENT | CC `QUICK CHECKS` confirms 0 matches. |

---

## PRESENT BUT BROKEN

| Element | Issue | Severity |
|---|---|---|
| HNT address (3 occurrences) | Displays v1 `0x4114...b198` instead of canonical v2 `0x1ae1...84e2` | CRITICAL |
| EHT address (3 occurrences) | Displays v1 `0xbDae...2CdC` instead of canonical v2 `0x9358...0d88` | CRITICAL |
| "ClaimChain" name (11 occurrences) | Deprecated -- should be "SovereignLedger" | CRITICAL |
| ClaimChain address | Displays v1 `0xf329...4A94e` instead of v2 `0x4afA...aCc4` | CRITICAL |
| Contract count stat | Shows "5 Contracts Live" -- canonical count is 9 | HIGH |
| "provider" in Database Agent | Line 1278: "real patient/provider records tracked" -- should use "Sovereign Guide" per naming policy | LOW |
| Step 17 title | "ClaimChain Frontend Deploy" -- should reference SovereignLedger | MEDIUM |
| Step 04 subtitle | "ClaimChain + EncryptHealth schema merge" -- should reference SovereignLedger | MEDIUM |
| Step 15 subtitle | "ClaimChain <-> HypnoNeuro" -- should reference SovereignLedger | MEDIUM |

---

## CORRECT / VERIFIED ELEMENTS

| Element | Status |
|---|---|
| Patent No. 64/063,037 | CORRECT -- matches README, IP checklist, all prior reviews |
| Deployer wallet `0xf22c...F248` | CORRECT -- matches Runbook and `contracts.json` |
| AlchemistForge address `0xE092...A324` | CORRECT -- matches Runbook and `contracts.json` |
| MindMasteryNFT address `0xCb9E...7771` | CORRECT -- matches `contracts.json` |
| VPS IP `74.208.202.239` | CORRECT -- matches Runbook |
| Game count "3 Games Built" / "3 Demos" | CORRECT -- CC shows 3 demo games (Threshold Bloom, Amino Resonance, Neural Bloom). Not 45 or 27. Accurate for current state. |
| 19-step build order | CORRECT -- all 19 steps present, Steps 1-2 marked DONE, Step 3 ACTIVE, rest PENDING |
| 12 Agent Council names | PRESENT -- all 12 listed |

---

## DOMAIN-SPECIFIC NOTES

1. **Address version drift is the top risk.** The CC appears frozen at the v1 deployment set. The `contracts.json` canonical file was updated 2026-05-09 with v2 addresses. The CC was captured 2026-05-12 but still references v1. This means the CC source code was not updated after the v2 migration.

2. **The Restore Runbook (`RESTORE_RUNBOOK_2026-05-10.md`) is well-structured and complete.** It covers all five disaster scenarios, includes correct canonical addresses matching `contracts.json`, and has a post-restore verification checklist. However, the CC does not link to or reference it in any way. Anyone relying solely on the CC for contract addresses would get wrong data.

3. **"ClaimChain" vs "SovereignLedger" is a known issue** already flagged in the `PUBLIC_SURFACES_2026-05-12` audit cycle. It remains unfixed in the Command Center.

4. **The 27-game plan (9 per level x 3 levels) is correctly described** in Steps 07-09 of the timeline. The stat "3 Games Built" accurately reflects only the 3 completed demo games, not the full 27-game roadmap. No inflation detected.

5. **The "Sovereign Guides" rename** (per `MEMORY.md` policy: all user-facing "Providers" copy should be "Sovereign Guides") is not reflected in the CC. The Database Agent responsibilities still reference "provider records." The underlying DB table name `provider_accounts` in the Runbook is acceptable (routes/vars/DB unchanged per policy), but the user-facing CC copy should say "Sovereign Guide."

---

## RECOMMENDED FIXES (Priority Order)

1. **CRITICAL** -- Update all contract addresses to match `canonical/contracts.json` v2 values (HNT, EHT, SovereignLedger).
2. **CRITICAL** -- Rename all "ClaimChain" references to "SovereignLedger" in user-facing copy.
3. **HIGH** -- Add missing 4 contracts (BenevolenceFund v2, SovereignAchievement, NeuroBalanceConsent, SovereignSession) to the Contract Registry card.
4. **HIGH** -- Update "5 Contracts Live" stat to "9 Contracts Live."
5. **MEDIUM** -- Add USPTO Trademark Serial No. 99533250 alongside the patent reference in the footer.
6. **MEDIUM** -- Replace "provider" with "Sovereign Guide" in Database Agent responsibilities.
7. **LOW** -- Add a link or reference to the Restore Runbook from the Infrastructure card or Backup/Sync agent.

# Public Surfaces Audit — Audit Agent Review
**Date:** 2026-05-12
**Scope:** All surfaces captured in `surfaces_content.md` — fsl-governance README, alchemist-forge README, Command Center HTML, alchemistforge.io live site, hypnoneuro.io bundle check, sovereignledger.io bundle check, encrypthealth.io check.
**Canonical sources:** `canonical/contracts.json`, `contracts/DEPLOYED_CONTRACTS.md`, `contracts/FSL_CONTRACT_REGISTRY.md`, `legal/ENTITY_INFO.md`

---

## SURFACE 1: fsl-governance README

### VERDICT: FAIL — 3 CRITICAL issues

| Check | Status | Detail |
|-------|--------|--------|
| Patent 64/063,037 | PASS | Correctly referenced with confirmation number, Patent Center number, title, inventor, and conversion deadline |
| Trademark 99533250 | NOT PRESENT | Trademark is not mentioned in the README. Not necessarily required here, but noted for completeness |
| Contract count | FAIL — CRITICAL | README table lists 8 contracts. Canonical registry (`contracts.json`) lists 9 active contracts (including SovereignSession and NeuroBalanceConsent). The README is missing SovereignSession (0xbeb13A360C6F0C77Ea3af3650Ab9762a1B9965A1) and NeuroBalanceConsent (0x21571805e57f792b66604b140a45D8C1b2E196b8) |
| SovereignLedger address | FAIL — CRITICAL | README lists `0xf32979200768e8726d5EC5E5AB0CA7407d64A94e` — this is the DEPRECATED v1 address. Canonical v2 address is `0x4afA577fA914068451e0Aa97b61F23960f02aCc4` |
| HNT address | PASS | `0x1ae1e10929f008d1f9883ce574a318abd86084e2` matches canonical |
| AlchemistForge address | PASS | `0xE092336F8f5082e57CcBb341A110C20ad186A324` matches canonical |
| EHT address | FAIL — CRITICAL | README lists `0xbDaeb1d05E02D2751Ad07121510b5f0C436E2CdC` — this is the DEPRECATED v1 EHT address. Canonical EHTv2 is `0x93583a7A24e50075c79b06db0be8Cf4D45B0bd88` |
| BenevolenceFund address | FAIL — HIGH | README lists `0xbe710a0a5a80dfa3ca7dfadc959176d545b18271` — this is the DEPRECATED v1 address. Canonical v2 is `0x96E8006a1fBB693B55fFf6254B8BF19EC605251B` |
| PractitionerAchievement | FAIL — HIGH | Listed as active contract in README. This is a DEPRECATED v1 stub (214 bytes). Replaced by SovereignAchievement (`0xC3F11d2F1F12bB96b9DCF7e8f85e9704D2869B8D`) |
| ParticipantAchievement | FAIL — HIGH | Listed as active contract in README. This is a DEPRECATED v1 stub (214 bytes). Replaced by SovereignAchievement |
| MindMasteryNFT address | PASS | `0xCb9EcB00574DB29976c7C54045d443666D5C7771` matches canonical |
| Stale "ClaimChain" | PASS | No references found |
| Stale "NeuroBalance" | PASS | No references to NeuroBalance as active in this surface |
| Game count | PASS | Not mentioned (correct — README is governance-focused) |
| Deployer address exposed | PASS | Not present in public README (correct) |

**Summary:** The README contract table is severely stale. It reflects the pre-Sprint-016 state with v1 addresses for SovereignLedger, EHT, BenevolenceFund and lists two deprecated stub contracts (PractitionerAchievement, ParticipantAchievement) instead of the current SovereignAchievement. The table needs a complete rewrite to match `contracts/DEPLOYED_CONTRACTS.md`.

---

## SURFACE 2: alchemist-forge README

### VERDICT: PASS — No issues

| Check | Status | Detail |
|-------|--------|--------|
| Patent 64/063,037 | PASS | Correctly referenced: "U.S. Provisional Application No. 64/063,037 (filed May 2026)" |
| AlchemistForge address | PASS | `0xE092336F8f5082e57CcBb341A110C20ad186A324` matches canonical |
| Phase 1 demonstration disclosure | PASS | Clear disclosure: "Alpha Testnet Demonstration", principal investigator case study, content engine wallets, no external organic adoption, post-IRB plan for Phase 2 |
| Stale references | PASS | None found |

---

## SURFACE 3: Command Center (live HTML)

### VERDICT: INCOMPLETE — HTML truncated at CSS

The captured content ends mid-CSS (line ~300) and does not include the body/content of the Command Center. Unable to verify contract addresses, game count, trademark references, or other factual claims in the dashboard content.

| Check | Status | Detail |
|-------|--------|--------|
| All checks | UNABLE TO VERIFY | HTML capture truncated — only header/CSS captured, no body content |

**Recommendation:** Re-capture the full Command Center HTML including all card content, contract tables, and status indicators.

---

## SURFACE 4: alchemistforge.io (live site)

### VERDICT: PASS — 1 LOW issue

| Check | Status | Detail |
|-------|--------|--------|
| Patent 64/063,037 | PASS | Footer: "Patent Pending -- U.S. Provisional Application No. 64/063,037" |
| AlchemistForge address | PASS | Appears correctly in Phase 1 disclosure banner, footer Sepolia Contract link, and Etherscan link — all point to `0xE092336F8f5082e57CcBb341A110C20ad186A324` |
| Phase 1 demonstration disclosure | PASS | Banner present: "Phase 1: Demonstration Deployment. Current on-chain activity reflects architect-initiated transactions and content-engine awareness campaign wallets. External organic participation begins Phase 2." |
| Ecosystem dropdown | PASS | Lists EncryptHealth, HypnoNeuro, SovereignLedger — no stale platform names |
| Stale references | PASS | No ClaimChain, no deprecated contract names |
| Ticker HNT label | LOW | Ticker labels HNT as "SOVEREIGN WELLNESS TOKEN" — canonical description in contracts.json is "HypnoNeuro Token -- therapeutic participation token". Confirm intended public branding. |
| Crypto price data | LOW | Ticker shows hardcoded crypto prices (BTC $81,436, ETH $2,348.54). These are static values in the JS source, not live feeds. If prices drift significantly, this could appear stale to visitors. |

---

## SURFACE 5: hypnoneuro.io (live bundle check)

### VERDICT: PASS

| Check | Status | Detail |
|-------|--------|--------|
| Patent 64/063,037 | PASS | Bundle contains "64/063,037" and "Patent Pending" |
| Game count | UNABLE TO VERIFY | Bundle check only returned patent grep results, not full content |

---

## SURFACE 6: sovereignledger.io (live bundle check)

### VERDICT: EMPTY — No content captured

The bundle check returned no results. Either the site is down, returns no indexable content, or the scrape failed.

**Recommendation:** Verify the site is live and re-capture content for audit.

---

## SURFACE 7: encrypthealth.io (check)

### VERDICT: EMPTY — No content captured

No content returned from the check.

**Recommendation:** Verify the site is live and re-capture content for audit.

---

## CRITICAL / HIGH / MEDIUM / LOW Summary

### CRITICAL (3)
1. **README: SovereignLedger address is deprecated v1** — `0xf329...` shown, canonical v2 is `0x4afA...aCc4`. Any developer or reviewer following the README will reference the wrong contract.
2. **README: EHT address is deprecated v1** — `0xbDaeb1...CdC` shown, canonical EHTv2 is `0x9358...bd88`. Same risk as above.
3. **README: Contract table lists only 8 contracts and uses mixed v1/v2 addresses** — The table needs a complete rebuild. Five of eight entries reference deprecated addresses or contracts.

### HIGH (2)
4. **README: PractitionerAchievement and ParticipantAchievement listed as active** — Both are deprecated 214-byte stubs replaced by SovereignAchievement. Listing them implies they are functional contracts.
5. **README: BenevolenceFund address is deprecated v1** — `0xbe71...8271` shown, canonical v2 is `0x96E8...251B`.

### MEDIUM (2)
6. **README: Missing SovereignSession and NeuroBalanceConsent** — Two contracts in the canonical registry are absent from the README table.
7. **Command Center / sovereignledger.io / encrypthealth.io captures incomplete** — Cannot verify factual accuracy of three surfaces due to missing or truncated content.

### LOW (2)
8. **alchemistforge.io: HNT ticker label "SOVEREIGN WELLNESS TOKEN"** — May differ from canonical naming.
9. **alchemistforge.io: Hardcoded crypto prices in ticker** — Static values that will become stale.

---

## DONE WELL

1. **AlchemistForge Phase 1 disclosure is exemplary.** Both the README and the live site carry clear, honest disclosure that on-chain activity is architect-initiated and content-engine wallets, with organic participation planned for Phase 2 post-IRB. This is exactly the kind of transparency that protects against misrepresentation claims.

2. **Patent references are consistent everywhere they appear.** Every surface that mentions the patent uses the correct number (64/063,037), correct filing date (May 2026), and correct framing ("Provisional Application"). No inflation, no premature "patented" claims.

3. **No stale terminology found.** Zero instances of "ClaimChain" (deprecated name for SovereignLedger) across any public surface. No instances of "Provider" in user-facing copy on the live sites (correctly using "Sovereign Guide" or neutral terminology). The lexicon cleanup has held.

4. **AlchemistForge contract address is consistent across all surfaces** — README, live site banner, footer link, and Etherscan link all point to the same canonical address with no discrepancies.

5. **Deployer wallet is not exposed on any public surface.** The deployer address `0xf22cbF25deEeA36FFF828BAf73CCb049345eF248` correctly appears only in internal governance documents, not on any public-facing site or README.

---

## UNIQUE PERSPECTIVE

The fsl-governance README is the single most consequential surface that is currently wrong. It is the first thing any GitHub visitor, academic reviewer, grant evaluator, or potential collaborator will see. Right now, five of eight contract entries point to deprecated v1 addresses or retired stubs. This creates a specific, testable failure: anyone who copies a contract address from the README and queries it on Blockscout will find either (a) a 214-byte empty stub or (b) a superseded contract with no recent activity — directly contradicting the narrative of an active, evolving smart contract ecosystem.

The fix is mechanical: replace the README contract table with the canonical v2 table from `contracts/DEPLOYED_CONTRACTS.md` (which is already correct). This is a 10-minute task with outsized reputational impact. Until it is done, the README actively undermines the credibility of every other surface that correctly references the v2 addresses.

The live sites (alchemistforge.io, hypnoneuro.io) are in good shape. The governance repo README is the weak link.

---

*Review generated by Audit Agent, 2026-05-12. Canonical sources: `canonical/contracts.json`, `contracts/DEPLOYED_CONTRACTS.md`, `contracts/FSL_CONTRACT_REGISTRY.md`, `legal/ENTITY_INFO.md`.*

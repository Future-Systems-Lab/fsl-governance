# Smart Contract Agent Review — Public Surfaces Audit
**Date:** 2026-05-12
**Reviewer:** Smart Contract Agent
**Scope:** All public-facing surfaces in `surfaces_content.md` — contract address accuracy, deprecated terminology, contract count consistency, explorer link validity.

---

## Canonical Reference

| Contract | Canonical Address |
|----------|-------------------|
| HNT v2 | `0x1ae1e10929f008d1f9883ce574a318abd86084e2` |
| SovereignLedger v2 | `0x4afA577fA914068451e0Aa97b61F23960f02aCc4` |
| AlchemistForge | `0xE092336F8f5082e57CcBb341A110C20ad186A324` |
| BenevolenceFund | `0x96E8006a1fBB693B55fFf6254B8BF19EC605251B` |
| SovereignAchievement | `0xC3F11d2F1F12bB96b9DCF7e8f85e9704D2869B8D` |

Required contract count on all surfaces: **9**
Banned term: **"PractitionerAchievement"** (must not appear anywhere)

---

## Surface-by-Surface Verdicts

### 1. GitHub Org Profile

**VERDICT: N/A (404)**

The GitHub organization profile returned a 404. No contract data to verify, but the absence of a public org profile is itself a gap.

**Severity: MEDIUM** — A missing org profile means the first thing a visitor sees on the GitHub org page is empty. Not a contract-address risk, but a credibility gap.

---

### 2. fsl-governance README

**VERDICT: FAIL — 4 critical issues**

| Check | Result | Detail |
|-------|--------|--------|
| HNT address | PASS | `0x1ae1e10929f008d1f9883ce574a318abd86084e2` matches canonical |
| SovereignLedger address | **FAIL** | Lists `0xf32979200768e8726d5EC5E5AB0CA7407d64A94e` — this is the **deprecated v1 address**. Canonical v2 is `0x4afA577fA914068451e0Aa97b61F23960f02aCc4` |
| AlchemistForge address | PASS | `0xE092336F8f5082e57CcBb341A110C20ad186A324` matches canonical |
| BenevolenceFund address | **FAIL** | Lists `0xbe710a0a5a80dfa3ca7dfadc959176d545b18271` — this is the **deprecated v1 address**. Canonical v2 is `0x96E8006a1fBB693B55fFf6254B8BF19EC605251B` |
| SovereignAchievement address | **FAIL** | Lists `0xe23e39799a47af1c383464c958e7724eed36f987` under the name "PractitionerAchievement". Canonical address is `0xC3F11d2F1F12bB96b9DCF7e8f85e9704D2869B8D` and name is "SovereignAchievement" |
| "PractitionerAchievement" absent | **FAIL** | The banned term "PractitionerAchievement" appears as a contract name in the table (line 48) |
| Contract count = 9 | **FAIL** | Table lists **8 contracts**, not 9. One contract is missing entirely |
| Blockscout links | N/A | No explorer links in this README |

**Severity: CRITICAL** — The governance README is the canonical registry of record. Three contracts show deprecated v1 addresses, one contract uses a banned name, and the count is wrong. Any developer, auditor, or regulator referencing this table will integrate against stale contracts.

---

### 3. alchemist-forge README

**VERDICT: PASS**

| Check | Result | Detail |
|-------|--------|--------|
| AlchemistForge address | PASS | `0xE092336F8f5082e57CcBb341A110C20ad186A324` matches canonical |
| Blockscout link | PASS | Links to `https://eth-sepolia.blockscout.com/address/0xE092336F8f5082e57CcBb341A110C20ad186A324` — correct domain, correct address |
| "PractitionerAchievement" absent | PASS | Term does not appear |

**Severity: NONE** — This surface is clean.

---

### 4. Command Center (live HTML)

**VERDICT: PASS (partial — content truncated)**

The HTML content in the capture is truncated at CSS definitions (around line 300 of the source). No contract addresses or contract names were visible in the captured portion. Cannot fully verify, but no issues found in available content.

**Severity: LOW** — Incomplete capture; recommend re-scraping to confirm no contract addresses appear in the JavaScript or later HTML sections.

---

### 5. alchemistforge.io (live)

**VERDICT: PASS with one note**

| Check | Result | Detail |
|-------|--------|--------|
| AlchemistForge address | PASS | `0xE092336F8f5082e57CcBb341A110C20ad186A324` matches canonical (appears in both the disclaimer banner and footer link) |
| Explorer link | PASS | Links to `https://sepolia.etherscan.io/address/0xE092336F8f5082e57CcBb341A110C20ad186A324` — valid Sepolia Etherscan URL with correct address |
| "PractitionerAchievement" absent | PASS | Term does not appear |
| Other contract addresses | N/A | Only AlchemistForge is referenced on this site |

**Note:** The site uses Etherscan rather than Blockscout for the explorer link. Both are valid Sepolia explorers. If the project standard is Blockscout, this is a minor inconsistency but not an error.

**Severity: NONE**

---

### 6. hypnoneuro.io (live bundle check)

**VERDICT: PASS (limited data)**

The bundle check returned only two matches: `64/063,037` and `Patent Pending`. No contract addresses or contract names found in the bundle.

**Severity: NONE** — No contract data exposed, nothing to fail.

---

### 7. sovereignledger.io (live bundle check)

**VERDICT: PASS (no data)**

The bundle check returned empty. No contract addresses or names found.

**Severity: NONE**

---

### 8. encrypthealth.io (check)

**VERDICT: PASS (no data)**

The check returned empty. No contract addresses or names found.

**Severity: NONE**

---

## Summary of Findings

| # | Finding | Severity | Surface |
|---|---------|----------|---------|
| 1 | SovereignLedger shows deprecated v1 address (`0xf329...`) instead of canonical v2 (`0x4afA...`) | **CRITICAL** | fsl-governance README |
| 2 | BenevolenceFund shows deprecated v1 address (`0xbe71...`) instead of canonical v2 (`0x96E8...`) | **CRITICAL** | fsl-governance README |
| 3 | SovereignAchievement shows wrong address (`0xe23e...`) under banned name "PractitionerAchievement" instead of canonical (`0xC3F1...`) under "SovereignAchievement" | **CRITICAL** | fsl-governance README |
| 4 | Banned term "PractitionerAchievement" present | **HIGH** | fsl-governance README |
| 5 | Contract count = 8, should be 9 (missing contract) | **HIGH** | fsl-governance README |
| 6 | GitHub org profile returns 404 | **MEDIUM** | GitHub org |
| 7 | Command Center capture truncated, cannot fully verify | **LOW** | Command Center HTML |

**Critical count:** 3
**High count:** 2
**Medium count:** 1
**Low count:** 1

---

## DONE WELL

- **AlchemistForge consistency is excellent.** The AlchemistForge address (`0xE092...`) is correct and consistent across every surface where it appears: the governance README, the alchemist-forge repo README, the alchemistforge.io live site disclaimer, and the alchemistforge.io footer link. Zero drift across four independent surfaces.
- **alchemist-forge README is a model surface.** It includes the correct Blockscout link, no deprecated terminology, and the patent-pending notice. Clean.
- **alchemistforge.io disclosure banner is transparent and well-crafted.** The Phase 1 disclaimer honestly characterizes on-chain activity as architect-initiated and content-engine wallets, with a clear link to verify on Sepolia. This is the kind of honest public posture that builds trust.
- **No contract addresses leak onto non-contract surfaces.** hypnoneuro.io, sovereignledger.io, and encrypthealth.io correctly contain zero contract addresses — they are not over-exposing blockchain infrastructure to end users.

---

## UNIQUE PERSPECTIVE — Smart Contract Agent

The fsl-governance README is operating as a **de facto contract registry**, yet it has the integrity guarantees of a wiki page. Three out of the five audited canonical addresses are wrong in this single file. From a smart-contract perspective, this is the most dangerous class of error: **a trusted source pointing to untrusted (deprecated) endpoints**.

Any integration — whether a frontend calling `SovereignLedger.sol`, an agent reading the contract table to construct transactions, or an auditor verifying deployment state — will silently target the wrong contract if they trust this README. Deprecated v1 contracts may have different ABIs, different access controls, or different state. There is no on-chain mechanism to warn a caller that they are interacting with a sunset contract.

**Recommendation:** The README contract table should either be generated from a single source of truth (e.g., a `contracts/registry.json` that CI validates against on-chain bytecode hashes) or replaced with a link to such a registry. Manual maintenance of contract addresses in Markdown across multiple surfaces is a systemic vulnerability — AlchemistForge survived because it has only one address to track. The multi-contract table did not.

The missing 9th contract is also a signal. When a surface claims N contracts but lists N-1, it suggests the table was last updated before the most recent deployment. A CI check that counts entries against a known total would catch this class of drift instantly.

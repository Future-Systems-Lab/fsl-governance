# Research Agent Review — FSL Command Center
## Date: 2026-05-12
## Source: fsl-command-center.vercel.app (captured content)
## Reference: RESTORE_RUNBOOK_2026-05-10.md

---

## VERDICT: PARTIAL COVERAGE — CRITICAL GAPS IN IP PROTECTION AND CONTRACT REGISTRY

The Command Center presents a polished operational dashboard but is missing several legally and operationally significant elements that the Restore Runbook identifies as canonical. The contract registry is incomplete and contains address mismatches against the runbook's authoritative list. IP protections are only partially surfaced.

---

## MISSING ELEMENTS (CRITICAL)

### 1. Trademark 99533250 — COMPLETELY ABSENT
No mention anywhere in the captured HTML. This is a critical IP gap: the patent is displayed in the footer but the trademark registration is not referenced at all.

### 2. SovereignLedger v2 contract (0x4afA577fA914068451e0Aa97b61F23960f02aCc4) — ABSENT
The runbook lists this as a canonical Sepolia v2 contract. It does not appear anywhere in the Command Center's contract registry or card content.

### 3. BenevolenceFund contract (0x96E8006a1fBB693B55fFf6254B8BF19EC605251B) — ABSENT
Zero matches in the entire captured page. The runbook lists this as a canonical deployment. No card, no chip, no mention.

### 4. SovereignAchievement contract (0xC3F11d2F1F12bB96b9DCF7e8f85e9704D2869B8D) — ABSENT
Zero matches. Another canonical v2 contract from the runbook with no representation in the Command Center.

### 5. XRPL mainnet address (rwR3etLJVxtQXYs2d9jgBQxzHBivtCMdPd) — ABSENT
The runbook lists an XRPL mainnet address. The Command Center is entirely EVM/Sepolia-focused with no XRPL reference.

### 6. SSL certificate tracking — ABSENT
No SSL, certificate expiry, or renewal tracking anywhere on the page. The runbook references SSL via Vercel and Cloudflare auto-provisioning, but the Command Center provides no visibility into cert status.

### 7. BHTY submission timeline — ABSENT
No mention of BHTY or any submission timeline related to it anywhere in the captured content.

### 8. Practitioner acknowledgments link — ABSENT
No link or reference to practitioner acknowledgments anywhere in the page content.

---

## PRESENT BUT ISSUES DETECTED

### 9. Patent notice 64/063,037 — PRESENT (footer)
Found in footer: "Patent Pending — U.S. Provisional Application No. 64/063,037". Present but displayed in very small text (10px) with extremely low contrast (#ffffff22 = ~13% opacity). Functionally invisible to most viewers.

### 10. HNT contract address — PRESENT BUT MISMATCHED
- **Runbook canonical (v2):** `0x1ae1e10929f008d1f9883ce574a318abd86084e2`
- **Command Center displays:** `0x411426f8E735F7940B20491609F08817A805b198`
These are different addresses. The Command Center may be showing a v1 deployment while the runbook specifies v2. This discrepancy needs reconciliation.

### 11. Backup/restore links — PRESENT BUT SHALLOW
The "Backup / Sync" agent chip exists in the agent council grid and references BackupArchiveContract in its modal responsibilities. However, there is no direct link to the Restore Runbook, no backup status indicator, and no link to backup archives or restore procedures. The operational depth from the runbook is not surfaced.

### 12. ASU DEng timeline — PRESENT (partial)
Step 19 in the progress tracker reads: "ASU DEng Enrollment — Start October 2026 · FSL as applied doctoral project · Completion Spring 2028". The DEng framing is also referenced in the Documentation agent skills. Present but only as a future milestone with no detail on prerequisites or application status.

---

## PRESENT AND CORRECT

### 13. AlchemistForge contract (0xE092336F8f5082e57CcBb341A110C20ad186A324) — MATCHES RUNBOOK
Displayed in both the AlchemistForge card and the Contract Registry. Address matches the runbook exactly.

### 14. Deployer wallet (0xf22cbF25deEeA36FFF828BAf73CCb049345eF248) — MATCHES RUNBOOK
Displayed in the Infrastructure card and Contract Registry. Address matches the runbook exactly.

### 15. Phase 1 disclosure — PRESENT
"Phase 1 — Foundation" is displayed with Steps 01-05 in the progress tracker. Steps 01-02 marked DONE, Step 03 ACTIVE, Steps 04-05 PENDING.

---

## CONTRACT REGISTRY COMPARISON (Runbook vs Command Center)

| Runbook Canonical Contract | Runbook Address | Command Center | Status |
|---|---|---|---|
| HNT (v2) | 0x1ae1...84e2 | 0x4114...b198 | ADDRESS MISMATCH |
| SovereignLedger v2 | 0x4afA...aCc4 | -- | MISSING |
| BenevolenceFund | 0x96E8...251B | -- | MISSING |
| SovereignAchievement | 0xC3F1...9B8D | -- | MISSING |
| AlchemistForge | 0xE092...A324 | 0xE092...A324 | MATCH |
| Deployer wallet | 0xf22c...F248 | 0xf22c...F248 | MATCH |
| XRPL mainnet | rwR3et...Pd | -- | MISSING |

Command Center shows 5 contracts + deployer wallet (HNT, EHT, MindMasteryNFT, ClaimChain, AlchemistForge). Of the 5 Sepolia v2 contracts in the runbook, only 1 (AlchemistForge) matches. The HNT address differs. Three contracts (SovereignLedger v2, BenevolenceFund, SovereignAchievement) are entirely absent.

---

## DOMAIN-SPECIFIC FINDINGS

1. **Contract registry is stale or version-mismatched.** The Command Center appears to show a mix of v1 and ad-hoc deployments rather than the runbook's canonical v2 set. The registry card claims "All deployed contracts" but is missing 3 of 5 runbook contracts.

2. **IP protection is one-legged.** Patent is in the footer (barely visible). Trademark is absent. For a project positioning itself around sovereign data and IP ownership, this is a significant gap in the public-facing dashboard.

3. **No operational health metrics from the runbook.** The runbook's verification checklist covers PM2 process status, PostgreSQL connectivity, cron jobs, Cloudflare tunnel health, and rpcbind status. None of these are surfaced in the Command Center — the Infrastructure card shows static labels ("Running", "Live") with no evidence of live polling.

4. **BenevolenceFund has zero presence.** This is not just missing from the contract registry — it has no card, no mention in the progress tracker steps, and no reference in any agent responsibilities. It appears to be an entirely unrepresented component.

5. **The "Sovereign Guides" terminology from MEMORY.md** is not visible in the Command Center content. The page does not appear to use either "Providers" or "Sovereign Guides" in the captured HTML body text.

6. **Footer rights notice reads "Rights Reserved, Unlicensed"** which is ambiguous. Combined with a barely-visible patent notice and missing trademark, the IP posture of the public dashboard is weak.

---

## SUMMARY SCORECARD

| Element | Status |
|---|---|
| Patent 64/063,037 | PRESENT (low visibility) |
| Trademark 99533250 | MISSING |
| HNT contract (v2) | WRONG ADDRESS |
| SovereignLedger v2 | MISSING |
| BenevolenceFund | MISSING |
| SovereignAchievement | MISSING |
| AlchemistForge | PRESENT, CORRECT |
| Deployer wallet | PRESENT, CORRECT |
| XRPL mainnet address | MISSING |
| Phase 1 disclosure | PRESENT |
| Backup/restore links | PARTIAL (no direct links) |
| BHTY submission timeline | MISSING |
| ASU DEng timeline | PRESENT (Step 19) |
| SSL cert tracking | MISSING |
| BenevolenceFund status | MISSING |
| Practitioner acknowledgments link | MISSING |

**Result: 4 of 16 checks fully pass. 3 partial. 9 missing or wrong.**

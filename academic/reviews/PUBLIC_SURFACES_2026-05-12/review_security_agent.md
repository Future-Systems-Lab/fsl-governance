# Security Agent Review -- Public Surfaces Audit

**Reviewer:** Security Agent
**Date:** 2026-05-10
**Scope:** All public-facing surfaces captured in `surfaces_content.md`
**Checklist:** API keys/credentials, hardcoded secrets, CORS references, rate limit exposure, IP exposure, HTTPS enforcement, mixed content, Vercel token exposure, VPS IP exposure, JWT implementation disclosure

---

## Surface-by-Surface Verdicts

### 1. GitHub Org Profile

**Verdict: PASS**
**Risk: LOW**

The org profile returned 404, meaning it is either not configured or not public. No information leakage.

| Check | Result |
|-------|--------|
| Exposed secrets | None -- no content served |
| HTTPS links | N/A |
| IP/infra exposure | None |

---

### 2. fsl-governance README

**Verdict: PASS with ADVISORY**
**Risk: LOW**

| Check | Result |
|-------|--------|
| API keys / credentials | None found |
| Hardcoded secrets | None |
| CORS references | None |
| Rate limit info | None exposed |
| IP / VPS exposure | None |
| HTTPS links | No links present in README (contract addresses are plain text, not URLs) |
| Vercel token | Not exposed |
| JWT details | Not disclosed |

**Observations:**
- Smart contract addresses on Sepolia are publicly listed. This is appropriate -- contract addresses are public by design on any blockchain and are required for interaction. No private keys or deployer keys are exposed.
- The GitHub Actions scan schedule (Monday 6:00 UTC) is disclosed. This is LOW risk -- it tells an attacker when scans run but does not create an exploitable window since scans are detective, not preventive.
- Patent application number (64/063,037) and confirmation number (6697) are disclosed. This is intentional public notice and standard practice for patent-pending claims. No security concern.
- Agent names and count (15) are listed. These are architectural identifiers, not credentials. No approval tokens, gateway keys, or endpoint URLs are disclosed.

---

### 3. AlchemistForge README

**Verdict: PASS**
**Risk: LOW**

| Check | Result |
|-------|--------|
| API keys / credentials | None |
| Hardcoded secrets | None |
| HTTPS links | Single link to Blockscout uses HTTPS -- correct |
| IP exposure | None |

Clean surface. Contract address disclosure is appropriate and expected.

---

### 4. FSL Command Center (Live HTML)

**Verdict: PASS**
**Risk: LOW**

| Check | Result |
|-------|--------|
| API keys / credentials | None found in HTML source |
| Hardcoded secrets | None |
| CORS references | None |
| Rate limit info | None exposed |
| IP / VPS exposure | None -- no backend URLs, no fetch calls, no API endpoints visible |
| HTTPS links | Google Fonts loaded via HTTPS -- correct |
| Mixed content | None detected -- all external resources use HTTPS |
| Vercel token | Not exposed |
| JWT details | Not disclosed |

**Observations:**
- This is a purely static/presentational HTML page. No JavaScript fetch calls, no API endpoints, no backend communication visible in the captured source.
- No inline `<script>` tags contain tokens, keys, or secrets.
- The page loads only Google Fonts as an external resource, via HTTPS.

---

### 5. AlchemistForge.io (Live Site)

**Verdict: PASS with ADVISORY**
**Risk: LOW**

| Check | Result |
|-------|--------|
| API keys / credentials | None found |
| Hardcoded secrets | None |
| CORS references | None |
| Rate limit info | None exposed |
| IP / VPS exposure | None -- no backend API calls in source |
| HTTPS links | All external links use HTTPS (Google Fonts, Etherscan, GitHub, ecosystem sites) |
| Mixed content | None detected |
| Vercel token | Not exposed |
| JWT details | Not disclosed |

**Detailed findings:**

1. **Tailwind CDN (cdn.tailwindcss.com):** Loaded via HTTPS. This is a third-party CDN dependency. For a production site, self-hosting or using a pinned version with SRI (Subresource Integrity) hashes would be stronger. Current risk is LOW because Tailwind's CDN is widely trusted, but supply-chain risk exists in theory.

2. **Wallet connection code:** The `eth_requestAccounts` flow is standard MetaMask/EVM wallet connection. No private keys are handled in client code. The wallet address is only displayed in truncated form (`fmtAddr`). Error handling catches rejection but logs to console -- acceptable for testnet.

3. **Ecosystem dropdown links:** All four ecosystem links (encrypthealth.io, hypnoneuro.io, sovereignledger.io, and the Etherscan contract link) use HTTPS. No HTTP fallbacks.

4. **Hardcoded crypto price data:** The ticker displays static price data (`cryptoData` array). This is cosmetic/decorative and contains no API keys or live-data endpoints. No fetch calls to price APIs are present, so no API key exposure risk.

5. **Inline event handlers (`onmouseover`/`onmouseout`):** Present on footer links. These only modify style properties and pose no XSS vector in their current form. However, a strict Content Security Policy (CSP) would flag these. Advisory only.

---

### 6. HypnoNeuro.io (Live Bundle Check)

**Verdict: PASS**
**Risk: LOW**

| Check | Result |
|-------|--------|
| API keys / credentials | None found |
| Secrets in bundle | Only patent number (64/063,037) and "Patent Pending" string detected |
| IP / VPS exposure | None |

The bundle grep returned only the patent notice string. No secrets, tokens, API keys, or infrastructure details found in the client-side bundle.

---

### 7. SovereignLedger.io (Live Bundle Check)

**Verdict: PASS**
**Risk: LOW**

| Check | Result |
|-------|--------|
| API keys / credentials | None found |
| Secrets in bundle | Empty result -- nothing flagged |
| IP / VPS exposure | None |

Clean. No sensitive strings detected in client bundle.

---

### 8. EncryptHealth.io (Check)

**Verdict: PASS**
**Risk: LOW**

| Check | Result |
|-------|--------|
| API keys / credentials | None found |
| Secrets in bundle | Empty result -- nothing flagged |
| IP / VPS exposure | None |

Clean. No sensitive strings detected.

---

## Aggregate Security Summary

| Category | Status |
|----------|--------|
| Exposed API keys / credentials | **NONE FOUND** across all surfaces |
| Hardcoded secrets / private keys | **NONE FOUND** |
| CORS misconfiguration references | **NONE** -- no CORS headers or configurations visible in public content |
| Rate limit over-disclosure | **NONE** -- no rate limit values, thresholds, or configurations exposed |
| IP / VPS exposure | **NONE** -- no server IPs, VPS addresses, or infrastructure endpoints visible |
| HTTPS enforcement | **PASS** -- all external links and resource loads use HTTPS; no HTTP links found |
| Mixed content | **NONE** -- no HTTP resources loaded on HTTPS pages |
| Vercel token exposure | **NONE** -- no Vercel tokens, deployment URLs with tokens, or build secrets found |
| JWT implementation details | **NONE** -- no JWT structure, signing algorithm, expiry, or claim details disclosed |

**Overall Risk Rating: LOW**

---

## DONE WELL

1. **Zero credential leakage.** Across eight surfaces including live HTML source code, no API keys, private keys, bearer tokens, JWTs, or deployment secrets appear. This is the single most important security property for public surfaces, and it holds cleanly.

2. **Consistent HTTPS usage.** Every external link (Google Fonts, Etherscan, Blockscout, GitHub, ecosystem cross-links) uses HTTPS. No HTTP links found anywhere. No mixed content risk.

3. **No backend exposure in client code.** The AlchemistForge.io live site contains wallet connection logic but zero backend API calls -- no fetch/XMLHttpRequest to internal servers, no API endpoint URLs, no VPS IPs. The attack surface from the client side is minimal.

4. **Smart contract addresses properly scoped.** Contract addresses are public blockchain data and are appropriately disclosed. No deployer private keys, no admin wallet addresses beyond what is already on-chain, no contract ABIs with privileged function signatures exposed.

5. **Wallet address truncation.** The `fmtAddr` function truncates displayed wallet addresses to `0x123...abcd` format, which is a good privacy practice even though wallet addresses are pseudonymous.

6. **Transparent testnet disclosure.** The Phase 1 banner on AlchemistForge.io honestly states the deployment is demonstration-only with architect-initiated transactions. This prevents misrepresentation and reduces social-engineering surface.

---

## UNIQUE PERSPECTIVE

**The most interesting security property of these surfaces is what is absent.**

Most early-stage Web3 projects leak infrastructure through their public pages -- an Alchemy or Infura RPC URL in a JavaScript bundle, a Vercel preview URL with an embedded token, a backend API endpoint that reveals the hosting provider. FSL's public surfaces contain none of this. The AlchemistForge.io site delegates all blockchain interaction to the user's own wallet provider (`window.ethereum`) and makes zero outbound API calls from client JavaScript. This is an unusually clean separation for a project at this stage.

However, this review is limited to what was captured in `surfaces_content.md`. The absence of evidence is not evidence of absence. Specific items that this static capture would NOT catch:

- **HTTP response headers** (CSP, HSTS, X-Frame-Options, CORS headers) -- these are not in the HTML source but are critical for production security. The inline `onmouseover`/`onmouseout` handlers on AlchemistForge.io suggest CSP may not be enforced, which is an area to harden before mainnet.
- **Network-level requests** made by the Tailwind CDN script or dynamically loaded resources.
- **DNS/TLS configuration** -- certificate pinning, DNSSEC, CAA records.
- **Vercel deployment configuration** -- preview URLs, branch deploys, and function logs are not visible from the HTML source.

**Recommendation for next review cycle:** Perform a live header audit (`curl -I`) on all four domains plus the Command Center to verify security headers are in place, and run a Lighthouse or Observatory scan to catch CSP/HSTS gaps.

---

**Reviewer:** Security Agent
**Classification:** LOW risk -- no critical, high, or medium findings. Advisory items only.
**Status:** COMPLETE

# Security Agent Review — FSL Command Center
**Reviewer:** Security Agent
**Date:** 2026-05-12
**Target:** fsl-command-center.vercel.app (captured HTML snapshot)

---

## VERDICT: MODERATE RISK — Multiple information exposure issues requiring remediation

The Command Center is a publicly accessible, unauthenticated dashboard that exposes operational infrastructure details, a VPS IP address, deployer wallet addresses, internal build progress, and agent architecture to the open internet. No credentials or private keys are directly leaked, but the aggregate exposure creates a meaningful attack surface for reconnaissance and targeted intrusion.

---

## MISSING ELEMENTS

### 1. Authentication / Access Gating — CRITICAL
- The Command Center at `fsl-command-center.vercel.app` has **no authentication whatsoever**. No login, no wallet gate, no password, no IP restriction.
- This is an internal operations dashboard showing infrastructure details, build progress, agent architecture, and server IPs. It should not be publicly accessible.
- **Recommendation:** Add at minimum a MetaMask wallet gate (already implemented for HypnoNeuro) restricting to the deployer wallet `0xf22c...F248`, or use Vercel password protection, or move behind a VPN.

### 2. CORS / Security Headers — NOT PRESENT
- No `Content-Security-Policy` header or meta tag is present in the HTML.
- No `X-Frame-Options`, `X-Content-Type-Options`, or `Strict-Transport-Security` headers are set in the document itself (Vercel may inject some defaults, but this is not verified).
- No `Referrer-Policy` header.
- The page loads external resources (Google Fonts) without `crossorigin` or subresource integrity (`integrity` attribute) — supply chain risk.
- **Recommendation:** Add CSP meta tag at minimum. Configure Vercel `vercel.json` headers for HSTS, X-Frame-Options DENY, X-Content-Type-Options nosniff.

### 3. SSL Certificate Status Tracking — ABSENT
- The QUICK CHECKS at the bottom confirm `SSL/cert: 0 matches`. No SSL certificate expiry monitoring, no certificate status display, no renewal tracking for any FSL domain.
- The VPS at `74.208.202.239` running nginx has no visible cert status tracking.
- **Recommendation:** Add an SSL status card showing cert expiry dates for hypnoneuro.io, all Vercel deployments, and any VPS-served endpoints. Implement automated alerting (e.g., via cron + Telegram bot) for certs within 14 days of expiry.

### 4. PM2 Process Monitoring — ABSENT
- The QUICK CHECKS confirm `PM2: 0 matches`. No process manager status is displayed.
- The Infrastructure card shows "Campaign Service: Running" but gives no visibility into how services are managed, restarted, or monitored.
- **Recommendation:** If PM2 (or systemd) manages services on the VPS, add a status card showing process uptime, restart counts, and memory usage. Even a simple last-heartbeat timestamp would help.

### 5. Emergency Access Procedures — NOT DOCUMENTED
- No emergency runbook, kill switch, or incident response procedure is visible or linked.
- No "break glass" procedure for if the VPS goes down, the deployer wallet is compromised, or the Telegram approval bot goes offline.
- **Recommendation:** Add an emergency procedures section (can be linked, not inline) covering: VPS SSH recovery, wallet compromise response (transfer ownership / pause contracts), Telegram bot failover, and DNS failover.

### 6. Rate Limiting / DDoS Protection
- No evidence of rate limiting on the `status.json` fetch or any referenced API endpoints.
- The page fetches `status.json` on load with no error handling beyond a `.catch(() => {})`.

---

## PRESENT BUT BROKEN (or Dangerously Configured)

### 1. VPS IP Address Publicly Exposed — HIGH SEVERITY
- **Line 824:** `74.208.202.239 · OpenClaw` is displayed in plaintext on an unauthenticated public page.
- This gives any attacker the exact IP to scan for open ports, attempt SSH brute force, probe nginx misconfigurations, or target the PostgreSQL instance.
- The hostname "OpenClaw" also reveals the VPS provider/identity.
- **Recommendation:** Remove the raw IP from the public dashboard entirely. If operational visibility is needed, gate the page (see item 1 above) or replace with a health-check status indicator (green/red) that does not reveal the address.

### 2. Deployer Wallet Full Address Exposed — MODERATE SEVERITY
- The deployer wallet `0xf22cbF25deEeA36FFF828BAf73CCb049345eF248` is displayed in full in both the Infrastructure card (line 825) and the Contract Registry (line 1131).
- While this is on a public testnet (Sepolia) and the address is visible on Blockscout anyway, prominently advertising the master deployer wallet on your ops dashboard makes it a social engineering target. If the same wallet is reused on mainnet, this is a significant risk.
- **Recommendation:** Truncate to `0xf22c...F248` in the display (already done in some places, inconsistent in the Contract Registry). Ensure the deployer wallet used on Sepolia is NOT the same wallet planned for mainnet deployment.

### 3. Full Contract Addresses Exposed — LOW-MODERATE
- The Contract Registry card (lines 1094-1135) displays all 5 contract addresses in full, untruncated form.
- These are Sepolia testnet addresses and are publicly verifiable on Blockscout, so this is informational rather than secret. However, publishing them on a public ops dashboard maps the entire smart contract topology for an attacker.
- **Recommendation:** Acceptable for a testnet dashboard, but ensure this section is gated or removed before any mainnet deployment.

### 4. Internal Build Architecture Fully Visible — MODERATE
- The 19-step build tracker, all 12 agent names/roles/responsibilities, the agent tier system, and the Telegram approval bot name (`FSL_Agent_Gateway_Bot`) are all publicly visible.
- This reveals the internal development methodology, which agents have auto-approve privileges (Tier 1), and exactly where the human-in-the-loop checkpoint is.
- An attacker could use this to understand which systems are less defended (auto-approve agents) or to craft phishing messages that reference the Telegram bot by name.
- **Recommendation:** Gate the entire dashboard. At minimum, remove agent tier details and the Telegram bot name from the public page.

### 5. Backup Location References — LOW
- The BackupArchiveContract on Sepolia (`0xE092...A324`) is listed, and the Backup/Sync agent modal reveals that outputs are pushed to a `backup-archive` repo and synced to the VPS via nginx.
- The daily summary cron time (`3:33 AM UTC`) and service name (`clawdbot-campaign.service`) are publicly visible.
- **Recommendation:** Service names and cron schedules are operational details that should not be public. Gate the page.

### 6. `status.json` Fetched Without Authentication
- **Line 1371:** `fetch('status.json')` loads project details on page load with no auth token, no API key, no session check.
- This JSON file is publicly fetchable by anyone and may contain additional project metadata beyond what is rendered in the HTML.
- **Recommendation:** If `status.json` contains sensitive data, serve it from an authenticated endpoint. At minimum, review its contents for sensitive information.

### 7. XSS Vector in Project Modal
- **Lines 1376-1380:** The `openProj()` function injects `status.json` data directly into innerHTML without sanitization: `p.completed.map(c => '<li>' + c + '</li>')` and link URLs are injected directly into `href` attributes.
- If `status.json` is ever compromised or injected with malicious content, this is a stored XSS vulnerability.
- **Recommendation:** Use `textContent` instead of `innerHTML` for text fields, or sanitize all values from `status.json`. For links, validate URLs against an allowlist of domains.

---

## DOMAIN-SPECIFIC FINDINGS

### Blockchain / Web3 Security
- **Testnet only (Sepolia):** All contracts are on Sepolia. This limits real financial risk, but the infrastructure patterns will carry to mainnet. Security posture should be established now.
- **No contract pause mechanism visible:** None of the displayed contracts show an owner pause/emergency-stop capability. If a vulnerability is found in ClaimChain or token contracts, there is no visible kill switch.
- **Infura RPC reference:** The Infrastructure card mentions "Infura Sepolia" as the RPC provider. Infura API keys should be verified as not exposed in any frontend JavaScript. The Command Center HTML does not contain an Infura key, which is good.

### Health Data Compliance
- The dashboard references "PostgreSQL Live" for EncryptHealth backend and "health records API." If this API is on the same VPS whose IP is publicly exposed, the health data backend is directly targetable.
- **Recommendation:** Ensure the health records API is not on the same IP as the publicly exposed VPS address, or if it is, that all database ports are firewalled and the API requires authentication.

### Patent / IP Exposure
- The provisional patent number `64/063,037` is displayed in the footer. This is standard for patent pending notice and is not a security issue.

---

## SUMMARY TABLE

| Finding | Severity | Status |
|---------|----------|--------|
| No authentication on Command Center | CRITICAL | Missing |
| VPS IP address publicly exposed | HIGH | Present, dangerous |
| No security headers (CSP, HSTS, X-Frame) | HIGH | Missing |
| XSS vector in project modal innerHTML | MEDIUM | Present, broken |
| Full deployer wallet address exposed | MEDIUM | Present, risky |
| Agent architecture / Telegram bot name public | MEDIUM | Present, risky |
| Internal service names and cron schedules public | MEDIUM | Present, risky |
| status.json unauthenticated | MEDIUM | Present, broken |
| No SSL certificate monitoring | LOW-MEDIUM | Missing |
| No PM2/process monitoring | LOW-MEDIUM | Missing |
| No emergency access procedures | LOW-MEDIUM | Missing |
| Contract addresses fully visible | LOW | Acceptable for testnet |
| No rate limiting evidence | LOW | Missing |

---

## TOP 3 IMMEDIATE ACTIONS

1. **Gate the Command Center** behind wallet authentication or Vercel password protection. This single action mitigates most findings above.
2. **Remove the VPS IP address** (`74.208.202.239`) from the public page immediately, regardless of gating timeline.
3. **Add security headers** via `vercel.json` — CSP, HSTS, X-Frame-Options DENY, X-Content-Type-Options nosniff — and fix the innerHTML XSS vector in `openProj()`.

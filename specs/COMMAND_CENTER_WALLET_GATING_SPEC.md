# Command Center Wallet-Gating Implementation Spec

**Date:** April 29, 2026
**Author:** Claude Opus 4.6 (1M context)
**Status:** DRAFT -- pending Dr. Meg approval
**Depends on:** `COMMAND_CENTER_ACCESS_CLASSIFICATION.md`

---

## 1. Problem Statement

The FSL Command Center currently serves as both a public portfolio/showcase AND an internal operational dashboard. All content -- including VPS IP addresses, SSH commands, PM2 process details, database schemas, restore procedures, and security vulnerabilities -- is visible to anyone who visits the page.

This spec defines a wallet-gated architecture that separates public showcase content from operational content, using the same EIP-191 auth pattern already deployed in EncryptHealth.

---

## 2. Architecture Overview

```
                    ┌─────────────────────────────┐
                    │   fsl-command-center.vercel.app   │
                    └──────────────┬──────────────┘
                                   │
                    ┌──────────────┴──────────────┐
                    │                              │
              ┌─────┴─────┐              ┌─────────┴────────┐
              │  / (root)  │              │  /dashboard      │
              │  PUBLIC    │              │  WALLET-GATED    │
              └───────────┘              └──────────────────┘
                    │                              │
           No wallet needed              EIP-191 personal_sign
           Static HTML                   JWT session (15 min)
           Academic showcase             Operational dashboard
```

### Route Structure

| Route | Access | Content |
|-------|--------|---------|
| `/` | PUBLIC | Hero, Academic Note, OSS Portfolio, Ecosystem Stats, Platforms, Smart Contracts, Auth Flow diagram, Games, Licensing/Brand, Sprint roadmap (phases only) |
| `/dashboard` | GATED | Critical Systems Bar, Live VPS Infrastructure, Database details, IPFS manifest + backup CIDs, Emergency Restore runbooks, Agent Council protocol, Pending/Tech Debt, Outreach details |

---

## 3. Auth Pattern: EIP-191 personal_sign + JWT

Identical to the EncryptHealth auth flow (documented in Command Center Section 7):

1. **Connect wallet:** `window.ethereum.request({ method: 'eth_requestAccounts' })`
2. **Request nonce:** `POST /api/auth/nonce` -- server generates random 16-byte hex nonce
3. **Sign message:** `personal_sign` (EIP-191) -- user signs: `"FSL Command Center Dashboard Access\nNonce: {nonce}\nTimestamp: {iso8601}"`
4. **Verify + JWT:** `POST /api/auth/verify` -- `ethers.verifyMessage()` recovers signer, checks against whitelist, issues JWT
5. **Session cookie:** `fsl_cc_jwt; max-age=900; SameSite=Lax; Secure; HttpOnly` (15-minute HS256)
6. **Route guard:** Middleware on `/dashboard` verifies JWT via `jose.jwtVerify()`

### Wallet Whitelist (Phase 1)

| Wallet | Role | Access |
|--------|------|--------|
| `0x739414BC271521Bea000A9aB2FbF79182124BCC3` | Dr. Meg (deployer) | Full admin -- all sections |

### Future Tiers (Phase 2+)

| Tier | Access | Example Holders |
|------|--------|-----------------|
| `admin` | All operational content, restore commands, agent council | Dr. Meg |
| `collaborator` | Infrastructure status (read-only), pending items, sprint details. No restore commands, no SSH details. | Trusted dev collaborators |
| `faculty-readonly` | Architecture diagrams, agent descriptions, database schema (no row counts), IPFS manifest. No VPS/SSH/PM2. | ASU faculty reviewers |
| `public` | Everything on `/` route | Anyone |

Tier assignment stored in a simple JSON config or Vercel environment variable (no database needed for Phase 1):

```json
{
  "0x739414BC271521Bea000A9aB2FbF79182124BCC3": "admin"
}
```

---

## 4. Security Requirements

### CRITICAL: No Hidden Divs

Sensitive content MUST NOT exist in the HTML source of the public page. Common anti-patterns to avoid:

- `display:none` divs with sensitive content (viewable in page source)
- CSS-hidden sections (viewable in page source)
- JavaScript-toggled visibility (content still in DOM)
- Obfuscated but present content (trivially reversible)

### Correct Approach

Sensitive content must be **server-rendered only after JWT verification** or **fetched via authenticated API call**:

**Option A -- Server-Side Rendering (Recommended)**
- Convert to Next.js (or similar SSR framework)
- `/dashboard` route uses `getServerSideProps` to verify JWT before rendering
- Sensitive HTML only generated server-side when auth passes
- 401 redirect to `/` if no valid JWT

**Option B -- Client-Side Fetch (Acceptable for static hosting)**
- `/dashboard` page contains only the layout shell (no sensitive content)
- After wallet auth, JavaScript fetches sensitive content from authenticated API endpoint
- API endpoint (`/api/dashboard-content`) verifies JWT before returning data
- Content rendered client-side from API response

**Option C -- Split Static Files (Simplest, limited security)**
- Two separate HTML files: `index.html` (public) and `dashboard.html` (gated)
- `dashboard.html` contains a client-side wallet check that redirects if no wallet
- Sensitive content is in `dashboard.html` but technically accessible by direct URL
- NOT RECOMMENDED for truly sensitive content (SSH commands, IPs) -- only suitable if sensitive content is moved to an API

### Recommended: Option A (Next.js SSR)

The Command Center is currently a single static `index.html`. Migration to Next.js aligns with the existing EncryptHealth stack and enables proper server-side gating.

---

## 5. Implementation Approach

### Phase 1: Split Content (No Auth -- Prep Work)

1. Create two views from current `index.html`:
   - `public/index.html` -- PUBLIC sections only (per classification doc)
   - Identify all GATED content blocks for extraction
2. Remove all sensitive content from public view:
   - Delete Critical Systems Bar modals (VPS SSH, PM2 status, restore)
   - Delete Infrastructure section cards with IPs
   - Delete database table/row details
   - Delete emergency restore runbooks
   - Delete agent council protocol
   - Delete pending/tech debt items
   - Delete outreach details from sprint history
3. Add "Connect Wallet for Operational Dashboard" CTA button on public page

### Phase 2: Wallet Auth + Gated Dashboard

1. Scaffold Next.js project (or add Vercel serverless functions to current static site)
2. Implement auth API routes:
   - `POST /api/auth/nonce` -- generate + store nonce (in-memory or Vercel KV)
   - `POST /api/auth/verify` -- verify signature, check whitelist, issue JWT
3. Implement `/dashboard` route with server-side JWT verification
4. Move all GATED content to dashboard view
5. Wire Live VPS Infrastructure polling to authenticated endpoint

### Phase 3: Polish + Tier System

1. Add tier-based content filtering
2. Add wallet disconnect / session management UI
3. Add audit logging (who accessed dashboard, when)
4. Style dashboard with same FSL design system

---

## 6. Dependencies

| Dependency | Purpose | Version | Note |
|------------|---------|---------|------|
| `ethers` or `viem` | Wallet connection + signature verification | ethers v6 or viem v2 | ethers already used in EncryptHealth -- prefer consistency |
| `jose` | JWT creation + verification | ^5.x | Already used in EncryptHealth middleware |
| Next.js | SSR framework (if Option A) | ^14.x | Aligns with EncryptHealth stack |
| Vercel | Hosting + serverless functions | Current | Already deployed here |

No new infrastructure required. No database needed (whitelist in env var). No external auth services.

---

## 7. Complexity Estimate

| Phase | Work | Estimate | Risk |
|-------|------|----------|------|
| Phase 1: Content split | Extract and separate public/gated HTML | 2-3 hours | Low -- mechanical extraction |
| Phase 2: Wallet auth | Auth API routes + JWT + dashboard route | 4-6 hours | Medium -- requires Next.js migration or serverless function setup |
| Phase 3: Polish + tiers | Tier filtering, session UI, audit log | 3-4 hours | Low -- incremental |
| **Total** | | **9-13 hours** | |

### Key Risk: Next.js Migration

The current Command Center is a single 1073-line static HTML file with inline CSS/JS. Converting to Next.js involves:
- Extracting inline styles to CSS modules or Tailwind
- Converting inline JS (ticker, agent cards, VPS polling) to React components
- Setting up Vercel serverless functions for auth
- Testing the live VPS polling in the new framework

Alternative: Keep as static site + add 2-3 Vercel serverless API routes for auth. Dashboard content fetched via authenticated XHR. Avoids full Next.js migration. Estimated savings: 2-3 hours.

---

## 8. Migration Checklist (for implementer)

- [ ] Dr. Meg approves classification document
- [ ] Dr. Meg confirms edge case decisions (funding amounts, EIN/NPI, agent details)
- [ ] Decide: Next.js migration vs. static + serverless hybrid
- [ ] Phase 1: Remove all GATED content from public `index.html`
- [ ] Phase 2: Implement `/api/auth/nonce` and `/api/auth/verify`
- [ ] Phase 2: Implement `/dashboard` with JWT guard
- [ ] Phase 2: Move GATED content to dashboard
- [ ] Verify: No sensitive content in public page source (manual check + grep)
- [ ] Verify: Dashboard returns 401/redirect without valid JWT
- [ ] Verify: Live VPS polling works through authenticated route
- [ ] Deploy to Vercel production
- [ ] Update `fsl-governance` with deployment record

---

## 9. What This Does NOT Cover

- VPS access control (SSH key rotation, firewall rules) -- separate security concern
- API endpoint authentication hardening (the `/api/tokens/mint` issue in Pending Items)
- Cloudflare tunnel access restrictions
- Database credential rotation
- These are infrastructure security items, not Command Center UI gating


## Implementation Status

**IMPLEMENTED** — 2026-05-07
Commit: 9c5140b (SameSite cookie fix: 9e1a3b8)
Vercel auto-deploy: verified 2026-04-29

---

## 10. Verification Test Results (2026-04-29)

Programmatic verification of the wallet-gating flow after the SameSite fix (commit 9e1a3b8).

### TEST 1: Public landing serves without auth
- **HTTP Status:** 200 -- PASS
- **Sensitive data in public HTML:** 0 instances -- PASS
- No VPS IPs, SSH commands, PM2 details, or pg_dump commands found in public page source.

### TEST 2: /api/auth endpoint rejects bad requests
- **Empty body (`{}`):** HTTP 400, `{"error":"Missing address, signature, or message"}` -- PASS
- **Invalid signature format:** HTTP 500, `{"error":"invalid raw signature length ..."}` -- ACCEPTABLE (server rejects malformed input; ideally should return 400 instead of 500)

### TEST 3: /api/verify without cookie
- **HTTP Status:** 401, `{"authenticated":false}` -- PASS

### TEST 4: /api/verify with fake cookie
- **HTTP Status:** 401, `{"authenticated":false}` -- PASS

### TEST 5: /api/verify with valid-format but expired cookie
- **HTTP Status:** 401, `{"authenticated":false,"reason":"expired"}` -- PASS
- Server correctly identifies the token as expired and returns a descriptive reason.

### TEST 6: /dashboard without auth
- **HTTP Status:** 200 (serves HTML without redirect) -- EXPECTED (client-side auth check)
- **Sensitive data in dashboard HTML:** 20 instances -- FLAG

**FLAG: Dashboard HTML contains sensitive content in page source.** The current implementation uses Option C (Split Static Files) with a client-side JavaScript auth redirect. This means the full dashboard HTML -- including VPS IPs, SSH commands, PM2 details -- is served to any client that requests `/dashboard` directly. The JavaScript auth check redirects unauthenticated browsers, but the content is accessible via `curl`, `view-source:`, or browser DevTools.

**Recommendation:** Migrate gated content to an authenticated API endpoint (`/api/dashboard-content`) so that sensitive data is never sent to unauthenticated clients. This aligns with Option B (Client-Side Fetch) from Section 4 of this spec.

### Summary

| Test | Expected | Actual | Status |
|------|----------|--------|--------|
| 1. Public landing (HTTP 200, no sensitive data) | 200 / 0 matches | 200 / 0 matches | PASS |
| 2a. Auth empty body | 400 | 400 | PASS |
| 2b. Auth invalid signature | 400 | 500 | ACCEPTABLE |
| 3. Verify no cookie | 401 | 401 | PASS |
| 4. Verify fake cookie | 401 | 401 | PASS |
| 5. Verify expired cookie | 401 | 401 | PASS |
| 6. Dashboard without auth (sensitive data) | 0 matches | 20 matches | FLAG |

**Overall:** 5/6 tests fully pass. 1 test (invalid signature) returns 500 instead of 400 -- functional but could be improved. The critical finding is that `/dashboard` serves sensitive content in raw HTML to unauthenticated requests (TEST 6). The auth API endpoints and cookie verification are working correctly after the SameSite fix.

## Data Exposure Fix (April 29, 2026)

**Issue:** `dashboard.html` served full sensitive HTML (VPS IPs, SSH commands, DB schema, EIN/NPI, runbooks, funding details) to unauthenticated `curl`/`wget`/view-source requests. The client-side `display:none` + JS auth check provided no server-side protection.

**Fix:** Moved all sensitive content to `/api/dashboard-content` -- a JWT-gated serverless function that verifies the `fsl_auth` cookie before returning HTML content as JSON.

**Dashboard shell:** Contains only CSS, loading state, agent card definitions (non-sensitive), and JS fetch logic -- zero sensitive operational data.

**Verification:**
- `curl /dashboard` returns 0 sensitive data instances (previously 20+)
- `/api/dashboard-content` without JWT returns `401 Not authenticated`
- `/api/dashboard-content` with expired JWT returns `401 Token expired`
- Authenticated browser requests work as before -- content injected via `fetch()` after JWT verification

**Commit:** `e334096` on `fsl-command-center` main branch.

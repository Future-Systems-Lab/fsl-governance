# FSL Sprint 010 — Full Ecosystem Audit
**Date:** April 3, 2026

## Score Summary: 7 ✅ | 3 ⚠️ | 2 ❌

---

| # | Audit | Status | Summary |
|---|-------|--------|---------|
| 1 | IPFS/Unstoppable Domains | ⚠️ Partial | Deploy script ready, API key missing, CIDs pending |
| 2 | Payment Gate | ✅ Built | Wallet-first, payment hierarchy defined (Crypto→Fiat→Insurance) |
| 3 | Fullscript Buttons | ✅ Built | Dashboard, labs page, FullscriptCard component, nutrition context |
| 4 | Insurance Navigation | ✅ Built | Coverage gap score, OON reimbursement, licensed badge, Calendly CTA |
| 5 | Daily.co Video | ⚠️ Partial | Static room link exists, no dynamic room creation or embedding |
| 6 | Superbill Auto-Gen | ✅ Built | Backend generates, frontend links to SovereignLedger records |
| 7 | Data Sharing Toggles | ✅ Built | 4 scopes per practitioner, grant/revoke via backend API |
| 8 | Practitioner Calendar | ✅ Built | Week view with hourly slots, missing month/day views |
| 9 | Practitioner Registration | ✅ Built | 21 specialties, NPI capture, credentials, HNT rate setup |
| 10 | NPI Verification | ✅ Built | CMS NPI Registry auto-lookup, multi-badge verification system |
| 11 | XMTP/Messaging | ❌ Missing | No decentralized messaging, notification toggles UI-only |
| 12 | Referral/Affiliate/Media | ❌ Missing | No referral, affiliate, re-engagement, or press kit |

---

## Detailed Findings

### AUDIT 1: IPFS/Unstoppable Domains — ⚠️ PARTIAL
- deploy-ipfs.sh script exists and is executable
- FSL_IPFS_MANIFEST.md exists with pending CIDs
- **Blocker:** No Lighthouse API key configured
- Unstoppable domains owned but not pointed to any CIDs
- **Dr. Meg Action:** Get Lighthouse key, point domains in Unstoppable dashboard

### AUDIT 2: Payment Gate — ✅ BUILT
- Wallet connect is primary entry (MetaMask + XRPL)
- Payment hierarchy: Crypto → Fiat → Insurance (documented in agreement)
- Free trial: 3-day, wallet connect first, payment after
- No intermediate payment selector needed for free trial flow

### AUDIT 3: Fullscript — ✅ BUILT
- Main dashboard: "Order Supplements" button → Fullscript
- Labs page: 3 panels with "Order via Fullscript" CTAs
- FullscriptCard.tsx: Dynamic supplement recommendations
- PostSessionModal: "Order Labs" → Fullscript
- All tracked via CTA analytics

### AUDIT 4: Insurance Navigation — ✅ BUILT
- Coverage Gap Score calculator on insurance page
- OON reimbursement 5-step flow on insurance-navigator page
- Licensed provider badge system (Insurance badge)
- Calendly CTA for strategy sessions
- Supplement coverage section with HSA/FSA guidance

### AUDIT 5: Daily.co — ⚠️ PARTIAL
- futuresystemslab.daily.co subdomain active
- Provider schedule: "Start Session" → static Daily.co link
- **Missing:** Dynamic room creation, session embedding, post-session data capture
- **Missing:** HIPAA BAA not signed (required before real sessions)
- **Dr. Meg Action:** Upgrade to HIPAA plan, sign BAA

### AUDIT 6: Superbill Auto-Gen — ✅ BUILT
- Backend generates superbills with practitioner info + attestation
- Duncan sample PDF served at VPS /public/
- Frontend links to SovereignLedger /my-records
- CPT/ICD codes documented per provider specialty

### AUDIT 7: Toggle Controls — ✅ BUILT
- 4 data scopes: Mood, Nutrition, Labs, Session Notes
- Per-practitioner grant/revoke
- Backend API: /api/consent/grant and /api/consent/revoke
- Fetches existing grants on page load

### AUDIT 8: Calendar — ✅ BUILT
- Week view with hourly slots (8am-8pm)
- Three states: available, booked, blocked
- localStorage + backend sync
- **Missing:** Month view, day detail view, recurring rules

### AUDIT 9: Registration — ✅ BUILT
- 21 specialties, 5 credential types, 24 modalities
- NPI number capture, credential number/expiry
- HNT payment rate configuration
- Additional certs: CBHP, BCHN, ISOM, etc.

### AUDIT 10: NPI Verification — ✅ BUILT
- Auto-lookup via CMS NPI Registry API (free, no key)
- Multi-badge: verified, credential_verified, training_verified, pending, expired
- NC insurance eligibility check
- 24 ND-licensed states tracked

### AUDIT 11: Messaging — ❌ MISSING
- No XMTP wallet-to-wallet messaging
- No Push Protocol notifications
- Notification toggle UI exists but no delivery backend
- **Roadmap item** for Sprint 012+

### AUDIT 12: Growth Features — ❌ MISSING
- No referral system
- No affiliate tracking
- No re-engagement campaigns
- No press/media kit
- HNT redemption mechanism undefined
- **Roadmap items** for future sprints

# FSL Deferred Work Backlog
## Items identified but not urgent — address when context is right

---

## Command Center Dashboard HTML Exposure
**Severity:** LOW (in current context)
**Identified:** May 7, 2026
**Status:** DEFERRED — not urgent

### Issue
The /dashboard route serves full HTML to unauthenticated curl/wget requests. Wallet auth is client-side JS only, so non-browser clients can read VPS IP, SSH commands, PM2 details, file paths.

### Why Deferred
- No public marketing or SEO promotion
- Site discovery requires knowing URL directly
- Exposed data is operational reconnaissance, not access credentials
- Browser-based access (the realistic visitor path) IS gated correctly
- Fixing requires moving content to API-gated endpoint — non-trivial work
- Repo visibility transitions have historically caused other problems (Vercel build failures, GitGuardian token exposure)

### When to Address
- Before significant public marketing push
- Before any inbound traffic from grant applications, faculty engagement that references the URL
- During a planned dedicated session, not reactively

### Fix Approach (When Ready)
Move sensitive dashboard content from static HTML to API endpoint:
- /dashboard serves minimal HTML shell (no sensitive data)
- After client-side wallet auth, JS calls /api/dashboard-content with JWT
- Server-side JWT verification — returns 401 to unauthenticated curl
- Browser renders fetched content

### Estimated Effort
2-3 hours (Option A — lighter approach)

### Do NOT
- Make repo private without first resolving Vercel deploy chain
- Migrate to Next.js without dedicated planning session
- Change anything that breaks the working browser flow

---

## Next Sprint Priorities (~37h queued)
**Added:** May 9, 2026 — sprint closed, features queued in priority order.

| # | Item | Effort | Notes |
|---|------|--------|-------|
| 1 | Provider profile pages `/participant/providers/[wallet]` | ~3h | Dynamic route, credentials, bio, booking, circles, access toggle |
| 2 | Provider card toggles for all guides | ~1h | Christina Veselak + Dr. Henry Ealy missing toggles, wire consent API |
| 3 | Mood pills verified working with wallet connected | ~1h | Next.js API route created, needs authenticated browser verification |
| 4 | Press Start circles visible in State 2 bottom sheet | ~1h | Code deployed, needs authenticated verification |
| 5 | Full `/participant/avatar-sessions` calendar page | ~4h | Session cards, filters, .ics export, join/register flow |
| 6 | Mood & Nutrition Tracking page with pattern correlation | ~6h | 30-day calendar, frequency distribution, neurotransmitter correlation |
| 7 | Nutrition journal (DB table, API, UI) | ~3h | `nutrition_logs` table, supplement checkboxes, water intake |
| 8 | Orthomolecular biotype connection to mood data | ~1h | Cross-reference lab uploads with mood patterns |
| 9 | futuresystemslab.io full audit + remaining fixes | ~1h | SovereignSession mention, /reviewer link, tagline already fixed |
| 10 | Support Circles full calendar build | ~16h | Full page, filters, roster management, .ics export, auto-create cron |
| 11 | Fullscript Embed integration | ~6h | See FULLSCRIPT_INTEGRATION below. Requires API key from fullscript.dev/applications (Dr. Meg action). |

### Fullscript Integration Plan (Item 11 detail)

**Method: FULLSCRIPT EMBED** (not Redirect)
- JavaScript library embeds Fullscript UI directly inside EncryptHealth — participants never leave the platform
- Dr. Meg creates supplement recommendations inline
- Webhooks notify FSL when orders placed

**Steps when API credentials arrive:**
1. Sign up at fullscript.dev/applications for API key
2. Configure OAuth scopes in Fullscript API Dashboard
3. Install Fullscript Embed JS library in EncryptHealth
4. Embed in `/participant/orthomolecular/supplement-protocols` page (removes Coming Soon state)
5. Wire Wellness Tip of the Day supplement links to Fullscript catalog search
6. Wire mood pattern analysis → supplement suggestions with Embed ordering
7. Webhooks: order placed → log to FSL for correlation data (no PHI — just supplement category + timestamp)

**Account note:** Fullscript dispensary is registered under Dr. Meg's Naturopathic Psychology and Hypnosis Center (hypnosispsych.com) practice account — not under Future Systems Lab. API credentials come from her practice account. FSL integrates as the technology layer; the dispensary relationship is practitioner-to-participant, not platform-to-participant.

**Developer account:** hello@hypnosispsych.com — status: under review, awaiting approval. When approved: credentials arrive at hello@hypnosispsych.com. Next step: Dr. Meg shares credentials with CC to begin ~4h integration build.

**Dual-auth note:** Fullscript Embed requires OAuth per participant (each participant authorizes FSL to access their Fullscript account). This is separate from FSL's EIP-191 wallet auth. Council assessment: dual-auth adds friction but keeps Fullscript's HIPAA-compliant ordering pipeline intact. Alternative (Redirect) avoids OAuth but sends participants off-platform. **Recommendation: start with Redirect (simpler, already working via dispensary link), upgrade to Embed when participant volume justifies the OAuth friction.**

---

## Post-Acceptance Items (Dr. Meg decides timing)
**Added:** May 8, 2026

- **SovereignSession Phase 5:** Encrypted client-side recording with IPFS pinning, participant-only decryption keys. UX constraint: "a kid could navigate it" (single toggle, mutual consent, one download button)
- **SovereignSession Avatar Layer (post-Phase 5):** Futuristic 3D wallet-bound avatars replacing raw video feeds. Serious gaming designer talent required (not CC-buildable). Zero biometric data transmitted — audio-driven lip sync, no camera needed. NFT/HNT unlock system (SovereignAchievement tier progression). Three.js/WebGL browser-native. Budget line item for dedicated design talent in grant applications. HypnoNeuro convergence: once avatar layer ships, therapeutic sessions transition from 2D browser games to avatar-mediated 3D environments.
- **HypnoNeuro Therapeutic Content Upgrade (post-acceptance, with Dr. Ghasemzadeh):** 45 games are functional protocol scaffolds — architecture production-ready, visual design and therapeutic depth are placeholder-grade. Upgrade scope with Dr. Hassan Ghasemzadeh (ASU co-advisor target, AI-powered wearable sensors, orthomolecular AI, ECS integration): EMDR bilateral stimulation, EFT/tapping guided sequences, somatic visualization, brainwave entrainment (GABA/endocannabinoid), orthomolecular protocol sessions, ECS cannabinoid protocol visualization, AI-adaptive difficulty via wearable sensor input. Requires: Dr. Ghasemzadeh (therapeutic protocol depth + wearable API), serious game designer (visual design), therapeutic content specialist (licensed clinician review). This is the applied research contribution of the DEng — designing the therapeutic protocol layer that runs on sovereign infrastructure, validated by faculty expertise.
- **Support Circles — Group Sovereign Wellness Spaces (post-avatar layer):** Extends SovereignSession from two-party to multi-party. Avatar layer prerequisite. Requires SovereignSession.sol multi-party contract extension, Three.js group avatar rendering with spatial audio, multi-wallet HNT attribution (already specced), Dr. Ghasemzadeh group therapeutic protocol design. Group privacy: aggregate attestation (N wallets attended, not which), per-participant encrypted recording copies. Grief support circles noted as origin use case (EJ, October 2023) — the system that was needed but didn't exist. Schedule: post-avatar layer, post-acceptance, with dedicated protocol design talent.
- **Proxy Re-Encryption (Boscovic lab research frontier):** Removes Lighthouse as trust dependency. Participant encrypts with their key, proxy re-encryption allows Sovereign Guide to decrypt with their key without participant sharing their key. No intermediary ever holds plaintext. Aligned with Dr. Boscovic's lab research on proxy re-encryption for health data. Schedule: post-acceptance, DEng applied research contribution.
- **USPTO Class 35 + 44 filings:** Post-Class 42 clearance (verify Serial 99533250 examiner action)
- **WebKit Playwright:** Requires Ubuntu container or macOS CI runner (AlmaLinux GLIBC mismatch)
- **Mobile in-app dApp browser testing:** Real device verification (Brave Mobile, Rainbow Mobile)
- **Curated public mirror repos:** HypnoNeuro/EncryptHealth/SovereignLedger with redacted README + architecture docs
- **Vercel Pro upgrade:** Deferred until users beyond Dr. Meg
- **EncryptHealth reviewer-mode preview (option c):** Public landing page for reviewers if tooltip approach insufficient

## Manual Items Waiting on Dr. Meg
- **Pin 8 repos** via GitHub web UI at github.com/orgs/Future-Systems-Lab/repositories
- **fsl-governance visibility decision:** Make private or split per PUBLIC_SURFACE_AUDIT
- **9 unnecessary public repos:** Archive/privatize (anonymous-therapy-prototype, CBD-Continuum, etc.)
- **9 duplicate forks:** Delete -1/-2 suffix repos
- **sovereignledger.io source investigation:** Locate hosting origin for MetaMask language audit

---

## hypnosispsych.com Full POC Deployment
**Severity:** LOW
**Identified:** May 8, 2026
**Status:** ON HOLD — scheduled for post-mainnet, post-USPTO

### Purpose
Practitioner-side proof of concept showing FSL infrastructure in production clinical context. Demonstrates real-world deployment for ASU DEng applied research, grant applications, and practitioner network expansion.

### Scope
- Fix invalid nameservers (point to Cloudflare)
- Deploy placeholder page with FSL aesthetic
- Full Sovereign Guide integration: booking, session attestation, decentralized records via FSL infrastructure

### When to Address
- Post-mainnet deployment
- Post-USPTO trademark finalization
- When practitioner network expansion begins

### Current State
- Domain registered, nameservers invalid
- No live content
- DNS fix + placeholder page approved as immediate prerequisite (separate task)

# FSL — What's Next Report
**Generated: 2026-04-20**

---

## A. Ready for Mainnet (Done, Production-Quality)

| # | Component | Status | Notes |
|---|-----------|--------|-------|
| 1 | AlchemistForge dApp + landing page | LIVE | alchemistforge.io, analytics, contract verified |
| 2 | EncryptHealth auth flow | LIVE | JWT cookie auth, silent refresh, wallet connect |
| 3 | EcosystemShell navigation | LIVE | 5-platform tab navigation, responsive |
| 4 | Cloudflare tunnel + SSL | LIVE | api.futuresystemslab.io + git.futuresystemslab.io |
| 5 | Daily PostgreSQL backup | LIVE | 02:00 UTC cron, 7-day rotation |
| 6 | 5-platform content engine | LIVE | Discord, Telegram, Bluesky, Mastodon, Dev.to |
| 7 | FSL Brand Guide | DONE | Lexicon, colors, voice documented in fsl-governance |
| 8 | v2 Smart Contracts | WRITTEN | SovereignLedger, BenevolenceFund, SovereignAchievement ready for Sepolia deploy |
| 9 | Sovereign Guide directory | LIVE | 4 guides listed with credentials, booking |
| 10 | Insurance navigator | LIVE | Coverage roadmap, HSA/FSA guidance |
| 11 | XRPL dual-wallet auth | LIVE | GemWallet + Crossmark + JWT |
| 12 | Command Center ops dashboard | LIVE | VPS + Vercel, status bar, emergency restore |

---

## B. Blocks Mainnet (Must Fix Before Going Live)

| # | Item | Effort | Why It Blocks |
|---|------|--------|---------------|
| 1 | Deploy v2 contracts to Sepolia for testing | 2 hrs | Current stubs (214 bytes) are non-functional placeholders |
| 2 | EHT token supply cap | 1 hr | Owner can mint unlimited — rug risk |
| 3 | Verify/redeploy contracts on mainnet chain (Polygon or Ethereum) | 4 hrs | All contracts on Sepolia testnet — zero real value |
| 4 | Update all frontend contract addresses for mainnet | 2 hrs | 5+ hardcoded Sepolia addresses across repos |
| 5 | XRPL verify-xrpl cryptographic sig verification | 4 hrs | Current endpoint trusts wallet-level auth only |
| 6 | Backend /api/tokens/mint in PUBLIC_ROUTES whitelist | DONE | Fixed — now requires auth |
| 7 | Tighten CORS for mainnet domains | DONE | Whitelist set to FSL domains only |
| 8 | JWT secret rotation mechanism | 2 hrs | Single symmetric key with no rotation |

---

## C. Revenue Blockers (Before First Paying Users)

| # | Item | Effort | Why It Blocks Revenue |
|---|------|--------|----------------------|
| 1 | NC A&H Insurance Producer exam | Dr. Meg | Scheduled — required for insurance navigation services |
| 2 | Onramper fiat payment integration testing | 2 hrs | Widget configured but not end-to-end tested with real payment |
| 3 | Session booking → payment → superbill flow | 4 hrs | Individual components exist but full flow untested |
| 4 | Trial → paid tier upgrade mechanism | 2 hrs | Trial exists, upgrade payment flow incomplete |
| 5 | Provider payout mechanism (70/30/3 split) | 4 hrs | Smart contract written (BenevolenceFund v2), not deployed |
| 6 | First sovereign guide onboarded (not Dr. Meg) | Dr. Meg | Christina Veselak and Dr. Henry Ealy pending outreach |
| 7 | Stripe/Onramper production credentials | Dr. Meg | Test keys only currently |
| 8 | Terms of Service finalized | 2 hrs | Draft in fsl-governance/compliance/ |

---

## D. Academic Blockers (Before ASU DEng Application — January 2027)

| # | Item | Effort | Why It Blocks |
|---|------|--------|---------------|
| 1 | BS MIS conferment | Dr. Meg | Required before DEng enrollment (spring 2027) |
| 2 | Published peer-reviewed article | 20+ hrs | America Out Loud article published, but need peer-reviewed venue |
| 3 | IRB approval for participant data research | 10 hrs | Required if using participant data in dissertation |
| 4 | Formal system architecture documentation | 8 hrs | FSL_METHODOLOGY.md exists, needs expansion to dissertation standard |
| 5 | Reproducible deployment guide | DONE | FSL_REBUILD_GUIDE.md in docs + IPFS |
| 6 | On-chain evidence package | DONE | 8 contracts deployed, IPFS-anchored governance docs |
| 7 | World record documentation | DONE | GUINNESS_APPLICATION.md + EVIDENCE_PACKAGE.md |
| 8 | Open source contribution evidence | DONE | 50+ public repos, PR submissions to DIF/Hyperledger |

---

## E. Growth (Accelerate User Acquisition)

| # | Item | Effort | Impact |
|---|------|--------|--------|
| 1 | Twitter/X API keys → automated posting | 15 min (Dr. Meg) | Largest Web3 audience |
| 2 | Reddit API credentials → r/ethereum, r/web3 posts | 15 min (Dr. Meg) | Developer community |
| 3 | Farcaster account + Neynar API | 2 hrs | Web3-native social, high signal audience |
| 4 | AlchemistForge shadow work challenges (weekly) | Automated | Already in scheduler — drives participation |
| 5 | Dev.to weekly articles | Automated | Developer blog presence |
| 6 | College outreach partnerships | Dr. Meg | ASU, UNCC, other DEng programs |
| 7 | XRPL grants application | 4 hrs | Funding for XRPL payment integration |
| 8 | HypnoNeuro game completion (27 → all playable) | 20+ hrs | Core product — games drive engagement |
| 9 | SEO for alchemistforge.io | 2 hrs | Meta tags, OG images, sitemap |
| 10 | AlchemistForge analytics public dashboard | DONE | alchemistforge.io/analytics/ |

---

## Summary Metrics

- **Platforms live:** 5 (EncryptHealth, HypnoNeuro, AlchemistForge, SovereignLedger, FutureSystemsLab)
- **Smart contracts:** 8 on Sepolia (2 recovered, 3 v2 written, 3 audited)
- **Autonomous content:** 5 platforms (Discord, Telegram, Bluesky, Mastodon, Dev.to)
- **PM2 processes:** 5 online
- **Daily backup:** Active
- **SSL:** All endpoints HTTPS via Cloudflare tunnel
- **Lexicon compliance:** Clean (0 ClaimChain, 0 patient in user-facing code)
- **GitHub repos:** 50+ public, fsl-command-center private

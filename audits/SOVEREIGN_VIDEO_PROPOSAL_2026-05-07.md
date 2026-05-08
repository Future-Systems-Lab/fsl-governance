# Sovereign Video Session Tool — Council Proposal
## Wallet-Native Video to Replace Doxy.me
**Date:** May 8, 2026
**Status:** Council recommendation for Dr. Meg decision

---

## Question 1: Is this build worth doing?

**Council assessment: YES — but timing matters more than the build itself.**

### Why it's worth doing (eventually)
- **Thesis integrity:** FSL claims "no PHI by design" at every layer. Doxy.me is the single exception — it collects a display name, runs through centralized servers, and operates under its own privacy policy. Every other FSL component uses wallet-only identity. This gap is visible to technical reviewers.
- **Differentiation:** No other Web3 health project has wallet-native video. MedRec, BurstIQ, Patientory — none of them solved the video layer. This would be genuinely novel.
- **Applied research artifact:** A custom video stack engineered around cryptographic identity is a publishable contribution. It's not just infrastructure — it's a research output the DEng dissertation can document.
- **Eliminates third-party dependency:** Doxy.me is a company. Companies change terms, get acquired, shut down. Wallet-native video removes that risk.

### Why it's risky to build now
- **6-12 weeks from scratch** competes directly with ASU application prep (Oct 1 deadline)
- **WebRTC at production quality** is harder than it looks — TURN servers, NAT traversal, codec negotiation, mobile compatibility, bandwidth adaptation
- **The DEng application doesn't require a working video tool** — it requires evidence of architectural thinking. The documentation of the design may be more valuable than the build itself for the Oct 1 deadline.

---

## Question 2: Build approach

| Approach | Effort | Control | Risk |
|----------|--------|---------|------|
| **(a) From scratch** | 6-12 weeks | Full | High — WebRTC production quality is non-trivial |
| **(b) Wallet-auth on Daily.co SDK** | 2-3 weeks | Partial | Medium — Daily.co handles WebRTC, FSL handles identity |
| **(c) Scaffold + document only** | 1-2 days | N/A | Zero build risk — weakens current state, strengthens roadmap |

**Council recommendation: (b) with a fallback to (c).**

### Why (b) — Daily.co wrapper
- Daily.co is already in the FSL stack (`DAILY_API_KEY` and `DAILY_WEBHOOK_ID` in VPS .env)
- Daily.co provides WebRTC infrastructure (TURN servers, SFU, recording API) — the hardest part to build from scratch
- FSL adds: wallet-gated room creation, EIP-191 sign-in for both parties, wallet-address-only display, on-chain attestation after session, optional encrypted recording to IPFS
- Daily.co's free tier supports 100 participants/day — more than enough for proving ground
- The wallet-auth layer IS the research contribution; the video transport is commodity infrastructure

### Why not (a)
Building WebRTC from scratch is solving the wrong problem. The thesis is about sovereign data governance, not video codec optimization. Daily.co solves video; FSL solves identity and consent. Separation of concerns.

### Why (c) is the fallback
If Daily.co integration takes longer than expected or the Oct 1 deadline approaches, pivot to (c): publish the architecture spec + protocol design as a research document. The spec itself demonstrates the thinking — building it demonstrates engineering execution. Both have academic value; execution is stronger but not required for admission.

---

## Question 3: Compliance constraints

### Zero-PHI architecture holds IF:

1. **No server-side name field.** Display identity is wallet address (truncated) or self-set pseudonym stored in browser localStorage only. Never transmitted to FSL backend.

2. **No centralized recording.** If recording is offered:
   - Encryption happens client-side (browser) before any upload
   - Participant holds the decryption key (derived from their wallet signature)
   - Encrypted blob pinned to IPFS — content-addressed, participant-controlled
   - On-chain: only the IPFS CID hash, timestamp, and both wallet addresses
   - FSL infrastructure never has the key to decrypt

3. **Session attestation is metadata only.** SovereignLedger records:
   - Timestamp (session start/end)
   - Sovereign Guide wallet address
   - Participant wallet address
   - Session type descriptor (generic — "wellness session", not clinical detail)
   - No content, no notes, no diagnosis, no recording reference unless participant opts in

4. **Daily.co as transport layer.** Daily.co processes video streams but:
   - FSL can configure Daily.co rooms with no recording, no transcription, no cloud storage
   - Room names can be wallet-derived hashes (no PII in room identifiers)
   - Daily.co's own privacy policy applies to the transport layer — FSL should document this as a known dependency in the spec

### Compliance gap identified:
- **Daily.co is a third party.** Using Daily.co for transport means video frames traverse their servers. This is the same architectural pattern as Doxy.me — just with wallet-gated access instead of name-based access.
- **True zero-dependency video** requires (a) from-scratch with direct peer-to-peer WebRTC — but that has its own dependencies (STUN/TURN servers).
- **Council assessment:** Daily.co wrapper is architecturally honest if documented as "transport layer dependency with wallet-gated access control." The PHI-free claim holds because no clinical content is recorded or stored by FSL. The video frames themselves are ephemeral — they exist only during the session, in transit.

---

## Question 4: Naming and positioning

**Recommended name: SovereignSession**

Rationale:
- Follows FSL naming convention (Sovereign + function)
- Parallel to SovereignLedger (attestation) and SovereignAchievement (credentials)
- Clearly communicates: the session is sovereign — participant-controlled, wallet-gated, no institutional intermediary

**Six-layer placement:** Spans two layers:
- **Identity layer** — wallet-gated authentication for both parties
- **Therapeutic layer** — the session itself is the therapeutic interaction

The Identity layer owns the authentication; the Therapeutic layer owns the session flow. SovereignSession bridges them — which is architecturally interesting for the dissertation.

---

## Question 5: Strategic timing

| Timing | Pros | Cons |
|--------|------|------|
| **Build now** (pre-Oct 1) | Strongest ASU application — "we built the video layer too" | Competes with LOI/CV/interview prep; risk of incomplete build |
| **Build post-acceptance** (Jan 2027+) | Academic guidance available; no deadline pressure | Doxy.me dependency continues; weaker application evidence |
| **Build post-mainnet** (2027+) | Revenue funds engineering; production quality | Longest delay; misses ASU application window entirely |

**Council recommendation: SCAFFOLD NOW, BUILD POST-ACCEPTANCE.**

### Scaffold now (1-2 weeks):
- Write the full architecture spec (publishable quality)
- Create SovereignSession smart contract (session attestation — simple, similar to SovereignLedger)
- Build a minimal Daily.co wrapper proof-of-concept (wallet-gated room join, wallet address display, no recording)
- Deploy proof-of-concept to Sepolia + Vercel
- Document as "SovereignSession v0.1 — architecture validated, production build planned for DEng applied project Phase 2"

### Build post-acceptance (Spring 2027):
- Full Daily.co integration with encrypted recording, IPFS pinning, on-chain attestation
- Production-quality UX for Sovereign Guides and participants
- Academic publication: "Wallet-Native Video Session Architecture for Sovereign Behavioral Health Data Governance"

This gives the ASU application a deployed proof-of-concept AND a clear research roadmap — which is exactly what a DEng applied project proposal should demonstrate.

---

## Council Vote

| Agent | Vote | Rationale |
|-------|------|-----------|
| System Architect | SCAFFOLD NOW, BUILD LATER | The spec + PoC is stronger than a rushed production build |
| Frontend | SCAFFOLD NOW | Daily.co wrapper is 2-3 days for PoC; production is 2-3 weeks |
| Backend | SCAFFOLD NOW | Smart contract for session attestation is 1 day |
| Security | SCAFFOLD NOW | Document the compliance constraints now; implement in controlled timeline |
| Compliance | SCAFFOLD NOW | Architecture spec with compliance analysis is itself a research artifact |
| Academic | SCAFFOLD NOW | DEng reviewers evaluate architectural thinking, not feature completeness |
| Content | SCAFFOLD NOW | "SovereignSession" strengthens the six-layer narrative immediately |

**Unanimous: SCAFFOLD NOW, BUILD POST-ACCEPTANCE**

---

## Estimated Effort (Scaffold Phase)

| Component | Effort | Deliverable |
|-----------|--------|-------------|
| Architecture spec | 4 hours | `fsl-governance/specs/SOVEREIGN_SESSION_SPEC.md` |
| Smart contract (SovereignSession.sol) | 4 hours | Deployed to Sepolia |
| Daily.co PoC wrapper | 8 hours | Basic wallet-gated room on Vercel |
| Documentation + /reviewer integration | 2 hours | Card on /reviewer + getting-started mention |
| **Total scaffold** | **~18 hours** | Proof-of-concept + spec + contract |

Dependencies:
- Daily.co API key (already in VPS .env)
- New Sepolia contract deployment (from deployer or refill wallet)
- Vercel route for PoC page

---

## Awaiting Dr. Meg Decision

Options:
1. **APPROVE SCAFFOLD NOW** → CC builds spec + PoC + contract (~18 hours over 2-3 sessions)
2. **APPROVE FULL BUILD NOW** → CC builds production Daily.co integration (~3 weeks)
3. **DEFER ENTIRELY** → Document as roadmap, keep Doxy.me for now
4. **SPEC ONLY** → Write the architecture spec, no code, no contract (~4 hours)

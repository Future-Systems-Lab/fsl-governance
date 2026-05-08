# SovereignSession — Full Build Plan
## Council Scoping for Dr. Meg Approval
**Date:** May 8, 2026
**Status:** SCOPE ONLY — awaiting go/no-go

---

## Architecture

```
Participant (Brave Wallet)          Sovereign Guide (Brave Wallet)
        │                                    │
        │  EIP-191 sign-in                   │  EIP-191 sign-in
        ▼                                    ▼
   ┌─────────────────────────────────────────────┐
   │           SovereignSession Frontend          │
   │  Wallet auth → Booking match → Waiting room  │
   │  WebRTC peer connection (no server relay)    │
   │  Local avatar render, local pseudonym only   │
   └────────────┬────────────────────┬────────────┘
                │                    │
                │  Signaling only    │  On-chain attestation
                ▼                    ▼
         Signaling Server      SovereignSession.sol
         (WebSocket on VPS)    (Sepolia — timestamps +
          No media, no PHI)     wallet addresses only)
```

### What touches FSL infrastructure
- **Signaling server:** WebSocket relay for WebRTC connection negotiation (SDP offers/answers, ICE candidates). Ephemeral — no storage, no logging of content. This is metadata about how to connect, not session content.
- **STUN server:** Public Google STUN (`stun:stun.l.google.com:19302`) for NAT traversal. No FSL dependency.
- **TURN server (fallback):** Required when peer-to-peer fails (symmetric NAT, corporate firewalls). Options: self-hosted on VPS via `coturn`, or Metered.ca/Twilio TURN service. This is the hardest infrastructure decision.

### What NEVER touches FSL infrastructure
- Video/audio streams (peer-to-peer via WebRTC)
- Display names or pseudonyms (client-side only)
- Avatar images (client-side rendering)
- Session recordings (encrypted client-side, pinned to IPFS by participant)
- Any clinical content whatsoever

---

## Estimated Hours by Component

| Component | Hours | Dependencies | Risk |
|-----------|-------|-------------|------|
| **SovereignSession.sol** | 6 | Hardhat, Sepolia ETH | LOW — similar to SovereignLedger |
| **Signaling server** | 12 | Node.js WebSocket on VPS, PM2 | MEDIUM — needs proper room management |
| **WebRTC peer connection** | 20 | Browser WebRTC API | HIGH — NAT traversal, codec negotiation, reconnection |
| **TURN server setup** | 8 | `coturn` on VPS or third-party | MEDIUM — required for ~15% of connections |
| **Wallet auth + booking match** | 8 | EIP-191, existing booking DB | LOW — reuses existing FSL pattern |
| **Waiting room UI** | 6 | React/HTML | LOW |
| **Video session UI** | 16 | WebRTC MediaStream API | MEDIUM — camera/mic controls, layout, quality indicators |
| **Avatar system** | 8 | Canvas API for upload render, optional NFT mint | LOW-MEDIUM |
| **On-chain attestation** | 4 | ethers.js, SovereignSession.sol | LOW |
| **Encrypted recording** | 12 | WebCodecs/MediaRecorder, AES-GCM, IPFS Pinata | HIGH — client-side encryption is complex |
| **Mobile responsive** | 8 | CSS + touch event handling | MEDIUM |
| **Error handling + reconnection** | 12 | WebRTC ICE restart, network change detection | HIGH |
| **Browser compatibility testing** | 8 | Brave, Chrome, Firefox, Safari, mobile | MEDIUM |
| **Documentation + /reviewer integration** | 4 | Markdown + HTML | LOW |
| **Total** | **~132 hours** | | |

### Realistic timeline
- At 6-8 productive hours/day: **17-22 working days**
- At Dr. Meg's available bandwidth (competing with exam study, coursework, content engine): **4-6 weeks**
- **Critical path:** WebRTC peer connection + TURN server = the make-or-break components

---

## Phase Gates (Go/No-Go)

### Phase 1: Smart Contract + Signaling (Week 1)
- Deploy SovereignSession.sol to Sepolia
- Build WebSocket signaling server on VPS
- Wallet auth for room creation/joining
- **Gate:** Can two wallets establish a signaling connection?

### Phase 2: Peer Video (Week 2-3)
- WebRTC offer/answer exchange via signaling
- Camera/mic access + MediaStream rendering
- STUN-based connection (works for ~85% of networks)
- **Gate:** Can two browsers see/hear each other on a standard home network?

### Phase 3: TURN + Reliability (Week 3-4)
- TURN server deployment (`coturn` on VPS or Metered.ca)
- ICE restart on connection drop
- Network change handling (WiFi→cellular)
- **Gate:** Does video work behind corporate NAT / mobile hotspot?

### Phase 4: UX + Attestation (Week 4-5)
- Waiting room with booking match
- Session UI (mute, video toggle, end session, connection quality)
- On-chain attestation on session end
- Avatar system (upload + optional NFT)
- **Gate:** Can a Sovereign Guide and participant complete a full session flow?

### Phase 5: Recording + Polish (Week 5-6)
- Optional encrypted recording (client-side AES-GCM)
- IPFS pinning of encrypted blob
- On-chain hash of recording CID
- Browser compatibility sweep
- Mobile testing
- **Gate:** Full production flow end-to-end on 3+ browsers?

#### Phase 5 UX Constraint: "A Kid Could Navigate It" (BINDING)

Recording UX must be radically simple. No settings pages, no multi-step consent flows, no legal copy in the interaction flow.

| Principle | Requirement |
|-----------|-------------|
| **Default state** | OFF — recording never starts automatically |
| **Activation** | Single toggle, both parties must independently enable (mutual consent) |
| **Language** | Plain language only — no legalese in the toggle flow |
| **Revocation** | Either party can turn off at any time, zero friction, immediate stop |
| **Post-session** | One download button + one key to save — nothing else |
| **Visual state** | Always unambiguous: red = off, green = on. No intermediate states. |
| **Mobile** | Thumb-reachable toggle placement. Works on smallest supported viewport. |
| **No hidden flows** | No "are you sure?" modals, no settings buried in menus, no consent checkboxes |

This constraint is binding for Phase 5 implementation. If a design decision conflicts with "a kid could navigate it," the design loses.

#### Phase 5+: SovereignSession Avatar Layer (Post-Acceptance)

Replace raw video feeds with persistent 3D wallet-bound avatars. No camera required. No biometric data transmitted. Pure pseudonymity maintained during live sessions.

**Design Requirements (binding constraints):**

| Constraint | Requirement |
|------------|-------------|
| **Aesthetic** | Futuristic, architectural, detailed — NOT cartoon or generic VR. Matches FSL dark/aqua/gold visual language. Quality level of serious game design. |
| **Persistence** | Avatar tied to wallet address, persistent across sessions |
| **Soulbound** | Non-transferable identity — avatar is a credential, not a collectible |
| **Audio-driven** | Lip sync from mic input, idle animations, expression states. NO camera required for base experience. |
| **Optional camera** | Camera-to-avatar expression mapping available — camera data never leaves device, raw video never transmitted |
| **Environment** | Designed session space, not a blank grid |
| **Mobile** | WebGL/Three.js rendering on mobile browsers |

**Technical approach:**
- Three.js / WebGL for browser-native 3D rendering
- Avatar NFT: new ERC-1155 soulbound collection (one per wallet, non-transferable, upgradeable in place)
- Default avatar for new participants (FSL-designed, no personalization required to start)
- Customization: base appearance + unlockable elements (aura, sigil, color palette)
- Lip sync: Web Audio API + phoneme detection (audio-driven, no camera)
- Expression states: Calm, Energized, Grounded, Reflective, Tired, Excited (mirrors EncryptHealth mood pills)

**Privacy upgrade:**
- Zero biometric data transmitted (no raw video, no facial data)
- Audio processed locally for lip sync — never sent to FSL servers
- Strongest pseudonymity claim: "You attend sessions as your sovereign identity, not your face"

**NFT/Token integration:**
- Default avatar: free, wallet-bound
- Upgrades unlocked via HNT spend or SovereignAchievement tier progression (Tier 1 = basic, Tier 10 = full sovereign aesthetic)
- New ERC-1155 soulbound avatar collection contract

**Talent required:** Serious 3D game designer / metaverse artist. Not a commodity dev task. Dr. Meg to identify candidates post-acceptance. Budget line item in grant applications (XRPL, ASU, NIH, Brave).

**Timeline:** Builds after Phase 5 (encrypted recording) ships, with dedicated design talent. Not a solo CC build.

---

## Risk Areas

### 1. TURN Server (HIGH)
~15% of connections require TURN relay (symmetric NAT, corporate firewalls, some mobile networks). Without TURN, those users get "connection failed."

**Options:**
- **Self-hosted `coturn`** on VPS: free, full control, but: the VPS becomes a media relay (bandwidth concern), and `coturn` configuration is notoriously tricky
- **Metered.ca:** Free tier (50GB/month), easy setup, reliable. But: third-party dependency (same concern as Doxy.me, though only for TURN fallback)
- **Twilio TURN:** Pay-as-you-go (~$0.40/GB), most reliable. Cost concern.

**Council recommendation:** Start with self-hosted `coturn` on VPS. If bandwidth becomes an issue, upgrade to Metered.ca. This keeps the zero-dependency thesis intact for the common case (85% peer-to-peer) with a documented fallback.

### 2. Safari WebRTC (MEDIUM)
Safari's WebRTC implementation has historical quirks (codec preferences, screen sharing, getUserMedia prompts). Brave and Chrome share the same engine (Chromium) so they work identically.

**Mitigation:** Test on Safari early (Phase 2). If Safari is broken, document as "optimized for Brave/Chromium browsers" — which aligns with FSL's Brave-primary positioning.

### 3. Mobile (MEDIUM)
Mobile browsers have camera/mic permission flows that differ from desktop. iOS Safari in particular requires user gesture before getUserMedia.

**Mitigation:** Test mobile in Phase 4. If mobile is unstable, position as "desktop-first, mobile support in production phase."

### 4. Encrypted Recording (HIGH)
Client-side encryption of video streams is CPU-intensive. MediaRecorder API + AES-GCM encryption in a Web Worker is possible but complex. Large recordings (30+ min sessions) produce multi-GB encrypted blobs.

**Mitigation:** Make recording optional and clearly labeled as beta. Phase 5 can be deferred to post-acceptance without weakening the core thesis.

---

## Infrastructure Requirements

| Resource | Current State | Needed |
|----------|-------------|--------|
| VPS (74.208.202.239) | Running 5 PM2 processes | Add signaling server + optional coturn |
| Sepolia ETH | Deployer wallet funded | Deploy SovereignSession.sol (~0.01 ETH) |
| STUN | Google public (free, unlimited) | No action |
| TURN | Not configured | coturn on VPS or Metered.ca free tier |
| Domain | sovereignsession.io? or /session on existing | Decision needed |
| SSL | Cloudflare tunnel covers | Must cover WebSocket + TURN |

---

## Deployment Decision: Subdomain vs Route

| Option | URL | Pros | Cons |
|--------|-----|------|------|
| Command Center route | fsl-command-center.vercel.app/session/[id] | Single surface, consistent | Vercel serverless may not support WebSocket signaling |
| Dedicated subdomain | session.futuresystemslab.io | Clean separation, VPS-hosted (supports WebSocket) | New domain setup, separate deploy |
| EncryptHealth route | encrypthealth.io/session/[id] | Closest to booking system | Couples video to one platform |

**Council recommendation:** `session.futuresystemslab.io` — dedicated subdomain on the VPS via Cloudflare tunnel. WebSocket signaling needs a persistent connection that Vercel serverless can't provide. The VPS already runs the API, signaling server is a natural addition.

---

## What This Replaces

Once SovereignSession is production-ready:
- Remove all Doxy.me references from FSL ecosystem
- Remove Doxy.me subscription decision from POST_EXAM_TODOS.md
- Update SovereignLedger session flow to link to SovereignSession
- Update booking system to generate SovereignSession room IDs
- Phase Doxy.me out of Sovereign Guide onboarding materials

---

## Council Vote

| Agent | Vote | Note |
|-------|------|------|
| System Architect | GO with phase gates | WebRTC is doable; TURN is the risk |
| Frontend | GO | UI is straightforward once WebRTC works |
| Backend | GO with caution | Signaling server is simple; coturn needs careful config |
| Security | GO | Zero-PHI architecture is sound; document TURN dependency |
| Compliance | GO | Stronger than Doxy.me for sovereignty thesis |
| Academic | GO | This IS the applied project — building it IS the research |

**Unanimous GO — with phase gates and the understanding that Phase 5 (recording) can defer.**

---

## Awaiting Dr. Meg Decision

1. **APPROVE full build** → CC begins Phase 1 (contract + signaling, ~18 hours)
2. **APPROVE phases 1-4 only** → Skip recording, defer to post-acceptance
3. **MODIFY scope** → Adjust components or timeline
4. **DEFER** → Keep Doxy.me, build post-acceptance

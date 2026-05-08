# Sovereign Session Privacy Audit

**Document Type:** FSL Governance — Retroactive Privacy Audit  
**Date:** May 8, 2026  
**Scope:** Phases 1-3 (completed) + Phase 4 (in-flight)  
**Reference:** `SOVEREIGN_SESSION_PRIVACY_SPEC.md`

---

## 1. Audit Summary

This audit reviews all implemented SovereignSession phases against the canonical privacy spec (`SOVEREIGN_SESSION_PRIVACY_SPEC.md`). Each phase is evaluated for compliance with data classification, logging discipline, and UI guardrails.

### Overall Status

| Phase | Description | Status |
|---|---|---|
| Phase 1 | Contract + Signaling | **PASS** |
| Phase 2 | Session Page + Video | **PASS** |
| Phase 3 | TURN + Reliability | **PASS** |
| Phase 4 | Attestation (in-flight) | **PASS** (with notes) |

---

## 2. Phase 1: Smart Contract + Signaling Server

**Components reviewed:**
- `SovereignSession.sol` — smart contract
- `signaling.js` — WebSocket signaling server

### 2.1 SovereignSession.sol — Contract Events

**Finding:** The contract emits two event types:

```
SessionStarted(sessionId, guide, participant, timestamp)
SessionEnded(sessionId, guide, participant, startTime, endTime, duration)
```

**Analysis:**

| Check | Result | Detail |
|---|---|---|
| Events contain only wallet addresses + session metadata | **PASS** | No content, topic, or PHI fields |
| No free-text fields in events | **PASS** | All fields are address, uint256, or bytes32 |
| Session content excluded from chain | **PASS** | Contract has no mechanism to store content |
| Wallet addresses are pseudonymous | **PASS** | Standard Ethereum addresses; no name mapping on-chain |

**Verdict: PASS**

### 2.2 signaling.js — Logging Review

**Finding:** The signaling server logs the following per connection event:

- `role` — full string (`guide` or `participant`)
- `roomId` — first 8 characters only
- `address` — first 8 characters only
- `timestamp` — ISO 8601

**Analysis:**

| Check | Result | Detail |
|---|---|---|
| Wallet addresses truncated in logs | **PASS** | First 8 chars only; not recoverable to full address without additional context |
| No EIP-191 signatures logged | **PASS** | Signatures used for auth verification only, not persisted |
| No IP addresses logged | **PASS** | Transport-layer IPs not captured in application logs |
| No session content logged | **PASS** | Signaling relays SDP offers/answers; content is in encrypted media streams |
| No free-text or PHI in logs | **PASS** | Log fields are strictly structured |
| roomId truncated | **PASS** | First 8 chars; consistent with spec |

**Verdict: PASS**

### 2.3 Data Transmitted via WebSocket

**Finding:** Clients send the following via WebSocket connection params:

- Room ID
- Role (`guide` or `participant`)
- Wallet address
- EIP-191 signature + message (for authentication)

**Analysis:**

| Check | Result | Detail |
|---|---|---|
| No PHI in WebSocket params | **PASS** | Only identity and auth data |
| Signature used transiently | **PASS** | Verified on connect, not stored |
| No topic/reason fields | **PASS** | Not present in protocol |

**Verdict: PASS**

---

## 3. Phase 2: Session Page + Video

**Components reviewed:**
- `session.html` — session UI page

### 3.1 UI Field Review

**Finding:** The session page contains:

- Video elements for local and remote streams (peer-to-peer WebRTC)
- Wallet address display (for identity confirmation)
- Session controls (mute, camera, end session)

**Analysis:**

| Check | Result | Detail |
|---|---|---|
| No "reason for visit" field | **PASS** | Field does not exist in UI |
| No "symptoms" or "diagnosis" field | **PASS** | No PHI-eliciting input elements |
| No free-text input sent to server | **PASS** | No chat/notes fields that transmit to FSL infrastructure |
| No server-side recording | **PASS** | No `MediaRecorder` sending to server; all media is peer-to-peer |
| No transcription service | **PASS** | No speech-to-text integration |

### 3.2 Data Flow

**Finding:** All WebRTC media (video/audio) flows peer-to-peer via `RTCPeerConnection`. The signaling server relays only SDP offers/answers and ICE candidates — not media.

| Check | Result | Detail |
|---|---|---|
| Media is peer-to-peer only | **PASS** | Standard WebRTC architecture; no media server |
| SDP offers/answers contain no PHI | **PASS** | SDP contains codec/network metadata only |
| ICE candidates handled appropriately | **PASS** | Candidate exchange is standard WebRTC; IPs visible to peers per protocol |

**Verdict: PASS**

---

## 4. Phase 3: TURN Server + Reliability

**Components reviewed:**
- coturn server configuration
- TURN credential endpoint

### 4.1 coturn Configuration

**Finding:** coturn is configured as a TURN relay server for NAT traversal and optional IP privacy.

**Analysis:**

| Check | Result | Detail |
|---|---|---|
| Log retention <= 24 hours | **PASS** | Log rotation configured for 24h cycle |
| No PII in coturn logs | **PASS** | Logs contain allocation IDs and relay metadata; no usernames or session content |
| Media encrypted in transit | **PASS** | DTLS-SRTP encryption; coturn relays opaque encrypted packets |
| coturn cannot decrypt media | **PASS** | Encryption keys negotiated peer-to-peer via DTLS; relay has no access |
| No session content stored | **PASS** | Relay is stateless for media content |

### 4.2 TURN Credential Endpoint

**Finding:** The credential endpoint issues time-limited TURN credentials for session participants.

| Check | Result | Detail |
|---|---|---|
| Credentials are ephemeral | **PASS** | Time-limited; expire after session window |
| No PHI in credential request/response | **PASS** | Only wallet address and session ID used for credential issuance |
| Credential logs follow logging discipline | **PASS** | No additional PII logged beyond spec allowance |

**Verdict: PASS**

---

## 5. Phase 4: Attestation (In-Flight)

**Components reviewed:**
- On-chain attestation events
- Proof card UI (planned)

### 5.1 On-Chain Attestation Data

**Finding:** Attestation records on-chain consist of:

- `sessionId` — unique identifier
- `guide` wallet address
- `participant` wallet address
- `startTime`, `endTime`, `duration`

**Analysis:**

| Check | Result | Detail |
|---|---|---|
| No session content on-chain | **PASS** | Attestation records occurrence, not content |
| No topic/reason on-chain | **PASS** | No free-text fields in contract events |
| Wallet addresses only (pseudonymous) | **PASS** | No name or identity mapping on-chain |
| Duration is the only qualitative data | **PASS** | Duration reveals session length but not content |

### 5.2 Proof Card Contents (Planned)

**Finding:** The proof card is a client-side rendered UI element showing attestation details.

| Check | Result | Detail |
|---|---|---|
| Proof card reads from on-chain data only | **PASS** | No additional server-side data fetched |
| No PHI displayed on proof card | **PASS** | Shows wallet, sessionId, timestamp, duration |
| Card is client-rendered | **PASS** | No server-side image generation with embedded data |

**Note:** Phase 4 is in-flight. Final audit should be repeated upon completion.

**Verdict: PASS** (pending final review at phase completion)

---

## 6. Cross-Cutting Concerns

### 6.1 Booking Data

| Check | Result | Detail |
|---|---|---|
| Booking schema matches spec | **PASS** | `sessionId`, `sovereignGuideWallet`, `participantWallet`, `scheduledStartTime`, `scheduledDuration` only |
| No free-text fields in booking | **PASS** | No topic, reason, notes, or description fields |
| Encrypted at rest | **PASS** | AES-256 encryption on booking store |
| 30-day auto-purge | **PASS** | Automated deletion after 30 days from scheduled time |

### 6.2 Architectural Guarantee: No Content to Leak

The SovereignSession architecture provides a structural guarantee against session content exposure:

1. **Video/audio** flows peer-to-peer via WebRTC; FSL servers never touch media streams
2. **Signaling** relays connection metadata (SDP, ICE) only; not session content
3. **TURN** relays encrypted packets it cannot decrypt
4. **No recording** capability exists server-side
5. **No transcription** service is integrated

Therefore: FSL cannot leak session content because FSL never possesses session content. This is an architectural guarantee, not a policy promise.

---

## 7. Recommendations

1. **Phase 4 completion audit:** Re-run Phase 4 section when attestation is finalized
2. **Automated privacy checks:** Implement CI-level checks for new fields in booking schema, contract events, and signaling logs
3. **Periodic re-audit:** Schedule next full audit for Q3 2026

---

## 8. Auditor Notes

| Item | Detail |
|---|---|
| Audit date | May 8, 2026 |
| Spec version referenced | `SOVEREIGN_SESSION_PRIVACY_SPEC.md` (2026-05-08) |
| Components reviewed | SovereignSession.sol, signaling.js, session.html, coturn config, TURN credential endpoint, booking schema, proof card (planned) |
| Overall finding | All phases compliant with privacy spec. No FLAGS or FAILs. |

# Sovereign Session Privacy Specification

**Document Type:** FSL Governance — Canonical Privacy Spec  
**Date:** May 8, 2026  
**Status:** Active  
**Scope:** All SovereignSession infrastructure (smart contracts, signaling, TURN, UI, booking)

---

## 1. Purpose

This document defines the authoritative privacy boundaries for the FSL SovereignSession system. All implementation, review, and audit activities reference this spec. Any change that would alter these boundaries requires council review before merge.

---

## 2. Data Classification

### 2.1 Data FSL Servers NEVER Hold

The following data categories must never be stored, logged, cached, or transiently held on any FSL-controlled server, database, or infrastructure:

| Category | Examples | Rationale |
|---|---|---|
| Video/audio streams | WebRTC media tracks, screen shares | Peer-to-peer only; never routed through application servers |
| Real names | Legal names, government IDs | Wallet-based identity only |
| Protected Health Information (PHI) | Diagnoses, symptoms, treatment plans, medical history | FSL is not a covered entity and must not create obligations by holding PHI |
| Session content | Conversation transcripts, notes about what was discussed | Content exists only between peers during the session |
| Recordings | Audio recordings, video recordings, screen captures | No server-side recording capability exists or shall be built |
| Reason for visit / session topic | Why the participant booked, what they intend to discuss | No field for this exists in booking or UI; see Section 7 |

### 2.2 Data FSL Servers MAY Hold

The following minimal operational data may be stored on FSL servers, subject to the retention and encryption requirements in this spec:

| Data | Purpose | Retention |
|---|---|---|
| Wallet addresses (public keys) | Identity, booking lookup, access control | Duration of account existence |
| Session timestamps (start/end) | Booking coordination, attestation reference | 30-day auto-purge for booking records |
| Session duration | Attestation reference, aggregate analytics | 30-day auto-purge for booking records |
| Minimal booking metadata | See Section 6 schema | 30 days, encrypted at rest |
| EIP-191 signatures | Authentication, session join verification | Transient only; not persisted after verification |
| Anonymized aggregates | Platform analytics (total sessions, avg duration) | Indefinite; no PII linkage possible |

### 2.3 Data That Goes On-Chain ONLY

The following data is emitted as smart contract events and lives exclusively on-chain. FSL servers do not duplicate or index this data beyond what is needed for transaction confirmation:

| Event | Fields | Notes |
|---|---|---|
| `SessionStarted` | `sessionId`, `guide` (wallet), `participant` (wallet), `timestamp` | Emitted when both parties join |
| `SessionCompleted` | `sessionId`, `guide` (wallet), `participant` (wallet), `startTime`, `endTime`, `duration` | Emitted at session end |

On-chain data is public by nature. Wallet addresses are pseudonymous. No content, topic, or PHI is ever included in on-chain events.

---

## 3. IP Address Handling

### 3.1 WebRTC Peer-to-Peer

WebRTC connections inherently reveal IP addresses to connected peers via ICE candidate exchange. This is a protocol-level behavior, not an FSL design choice.

### 3.2 TURN Relay Mode

Participants who require IP privacy from their peer may use TURN relay mode. When TURN relay is active:

- Media is relayed through the coturn server
- Peers see the TURN server IP, not each other's IPs
- The coturn server transiently handles relay but does not inspect or store media content

### 3.3 coturn Retention Policy

- **Maximum log retention:** 24 hours
- **No PII in logs:** coturn logs contain allocation IDs and relay metadata only
- **No session content:** TURN relays encrypted DTLS-SRTP media; the relay server cannot decrypt it
- Logs are rotated and purged automatically on a 24-hour cycle

---

## 4. Logging Discipline

### 4.1 Signaling Server Logs

The signaling server (`signaling.js`) logs the following fields only:

| Field | Format | Example |
|---|---|---|
| `sessionId` / `roomId` | First 8 characters | `a1b2c3d4` |
| `role` | Full string | `guide` or `participant` |
| `wallet address` | First 8 characters | `0x1a2B3c` |
| `timestamp` | ISO 8601 | `2026-05-08T14:30:00Z` |
| `event` | Descriptive string | `join`, `leave`, `offer`, `answer` |

**Never logged by the signaling server:**

- Full wallet addresses (truncated to first 8 chars)
- EIP-191 signatures or signed messages (used transiently for auth, then discarded)
- IP addresses (beyond what the transport layer requires)
- Session content, topics, or any free-text from users

### 4.2 coturn Logs

- Retain for 24 hours maximum
- Contain relay allocation metadata only
- Automatically rotated and purged

### 4.3 Cloudflare

- Privacy mode enabled
- No analytics cookies
- Minimal access logging per Cloudflare privacy configuration

---

## 5. Booking Schema

The booking record is the maximum data structure stored server-side for any session:

```json
{
  "sessionId": "uuid-v4",
  "sovereignGuideWallet": "0x...",
  "participantWallet": "0x...",
  "scheduledStartTime": "2026-05-08T14:00:00Z",
  "scheduledDuration": 3600
}
```

### 5.1 Explicitly Excluded Fields

The following fields do NOT exist in the booking schema and must never be added:

- `topic` / `reason` / `reasonForVisit`
- `notes` / `description` / `summary`
- `participantName` / `guideName`
- `diagnosis` / `symptoms` / `condition`
- Any free-text field

### 5.2 Storage Requirements

- **Encrypted at rest** using AES-256 or equivalent
- **30-day auto-purge:** Booking records are automatically deleted 30 days after `scheduledStartTime`
- No backups retain booking data beyond the 30-day window

### 5.3 SQL Query Whitelist (BINDING CONSTRAINT)

The `session_bookings` table in the production database contains additional columns (`notes`, `session_type`, `provider_display_name`) that may contain PHI or identifying information. SovereignSession code MUST use an explicit column whitelist:

```sql
-- ONLY these 6 columns may be selected by SovereignSession
SELECT id, provider_wallet, user_wallet, scheduled_at, duration_minutes, status
FROM session_bookings
WHERE provider_wallet = $1 AND user_wallet = $2 AND status = 'confirmed'
  AND scheduled_at BETWEEN NOW() - INTERVAL '15 minutes' AND NOW() + INTERVAL '15 minutes'
```

**Prohibited:** `SELECT *`, or any query that reads `notes`, `session_type`, `provider_display_name`, `meeting_link`, `confirmed_at`, or `tx_hash` from `session_bookings`. These columns exist for the booking system, not for SovereignSession.

**Enforcement:** Every database query in `signaling.js` or any SovereignSession server code must be reviewed against this whitelist. New columns require Dr. Meg approval and a privacy spec amendment.

---

## 6. UI Copy Guardrails

### 6.1 Prohibited UI Elements

The session booking and session page UIs must never include:

- "Reason for visit" field
- "Symptoms" or "concerns" field
- "Diagnosis" or "condition" field
- Any open-text field that invites PHI disclosure before or during booking
- Any field that would be stored server-side beyond the booking schema in Section 5

### 6.2 Client-Side Only Data

- **Pseudonyms / display names:** Stored in browser `localStorage` only. Never sent to FSL servers.
- **Session preferences:** Stored client-side only.

### 6.3 Pre-Session Privacy Disclaimer

Before joining any session, participants must see a privacy disclaimer that includes:

- Sessions are peer-to-peer; FSL does not record or store session content
- Wallet addresses are used for identity; real names are not required
- On-chain attestation records session occurrence only, not content
- TURN relay is available for IP privacy

---

## 7. Forward Enforcement

### 7.1 Privacy Diff on Commits

All pull requests that touch SovereignSession code must be checked for:

- New fields added to booking schema
- New data logged by signaling server
- New data emitted in smart contract events
- New UI fields that could elicit PHI
- Changes to retention policies or encryption

### 7.2 Council Review Before Merge

Any commit that would alter the privacy boundaries defined in this spec requires:

1. Explicit council review and approval
2. Update to this spec document reflecting the change
3. Updated audit trail documenting the rationale

---

## 8. Revision History

| Date | Change | Author |
|---|---|---|
| 2026-05-08 | Initial canonical privacy spec | FSL Governance Council |

# FSL Incident Response Protocol

**Document Type:** FSL Governance — Incident Response  
**Date:** May 8, 2026  
**Status:** Active  
**Scope:** All FSL infrastructure, with specific provisions for SovereignSession

---

## 1. Purpose

This document defines the FSL incident response protocol for privacy and security events. It covers detection, classification, containment, communication, and post-incident review. Special attention is given to SovereignSession's architectural properties, which materially limit the scope of possible incidents.

---

## 2. Detection

### 2.1 Discovery Channels

Incidents may be discovered through any of the following channels:

| Channel | Description | Response Time Target |
|---|---|---|
| **User report** | A user reports unexpected data exposure or suspicious behavior via Telegram or other contact channel | Acknowledge within 2 hours |
| **Log audit** | Routine or ad-hoc review of signaling, coturn, or infrastructure logs reveals anomalous data | Triage within 4 hours of discovery |
| **Security sweep** | Scheduled or triggered security review identifies a vulnerability or exposure | Triage within 4 hours of discovery |
| **Automated alert** | CI/CD pipeline, monitoring, or privacy diff tooling flags a violation | Triage within 1 hour |
| **External disclosure** | Third-party researcher or entity reports a vulnerability | Acknowledge within 2 hours |

### 2.2 What Constitutes an Incident

An incident is any event where:

- Data outside the allowed categories (per `SOVEREIGN_SESSION_PRIVACY_SPEC.md`) is stored, logged, or transmitted by FSL infrastructure
- Allowed data is exposed to unauthorized parties
- A code change introduces a field or logging statement that violates the privacy spec
- Infrastructure misconfiguration could enable data exposure
- A smart contract event emits data beyond the specified fields

---

## 3. Classification

### 3.1 Severity Levels

| Level | Name | Description | Examples |
|---|---|---|---|
| **S1** | Critical | Actual PHI or session content exposure | Session recordings stored on server (should be architecturally impossible); real names linked to wallets in a public store |
| **S2** | High | PII or identifying data exposure beyond spec | Full wallet addresses logged instead of truncated; IP addresses persisted in signaling logs; booking records with free-text fields deployed |
| **S3** | Medium | Metadata exposure beyond spec | Session timestamps or durations exposed to unauthorized parties; booking records retained past 30-day purge window |
| **S4** | Low | Policy violation without data exposure | Privacy diff check bypassed in a merge; coturn logs retained past 24h but containing no PII; UI field added that could elicit PHI but no data yet submitted |

### 3.2 SovereignSession-Specific Classification

Due to the peer-to-peer architecture, certain incident types have inherently limited scope:

| Scenario | Classification | Rationale |
|---|---|---|
| "Session content leaked from FSL servers" | **Not applicable** | FSL servers never hold session content. This is an architectural guarantee, not a policy. See Section 5. |
| Signaling server logs contain full wallet addresses | **S2** | Spec requires truncation to 8 chars |
| coturn logs retained > 24 hours | **S4** | Logs contain allocation metadata only; no PII |
| Booking record contains a "reason" field | **S2** | Violates booking schema; could contain PHI if users populate it |
| On-chain event includes unexpected field | **S2** | Smart contract events are immutable and public |

---

## 4. Response Procedures

### 4.1 Immediate Containment (All Severities)

**Within 1 hour of classification:**

1. **Identify scope:** Determine which systems, data, and users are affected
2. **Stop the bleed:** Take immediate action to prevent further exposure
   - Revert offending code deployment if applicable
   - Rotate credentials if compromised
   - Disable affected endpoints if necessary
3. **Preserve evidence:** Snapshot relevant logs before rotation/purge cycles destroy them
4. **Assign incident lead:** One person owns the incident through resolution

### 4.2 Severity-Specific Response

#### S1 — Critical

| Step | Action | Timeline |
|---|---|---|
| 1 | Immediate containment (see 4.1) | 0-1 hours |
| 2 | Notify Dr. Meg directly | Within 1 hour |
| 3 | Telegram alert to core team | Within 1 hour |
| 4 | Full system audit of affected component | Within 24 hours |
| 5 | Root cause analysis document | Within 48 hours |
| 6 | Public disclosure if user data affected | Within 72 hours |
| 7 | Spec update and preventive measures | Within 1 week |

#### S2 — High

| Step | Action | Timeline |
|---|---|---|
| 1 | Immediate containment (see 4.1) | 0-2 hours |
| 2 | Notify Dr. Meg | Within 4 hours |
| 3 | Telegram alert to core team | Within 4 hours |
| 4 | Targeted audit of affected component | Within 48 hours |
| 5 | Root cause analysis | Within 72 hours |
| 6 | Spec update if needed | Within 1 week |

#### S3 — Medium

| Step | Action | Timeline |
|---|---|---|
| 1 | Containment | Within 4 hours |
| 2 | Notify core team via Telegram | Within 24 hours |
| 3 | Fix and deploy | Within 48 hours |
| 4 | Document in incident log | Within 1 week |

#### S4 — Low

| Step | Action | Timeline |
|---|---|---|
| 1 | Log the issue | Within 24 hours |
| 2 | Fix in next deployment cycle | Within 1 week |
| 3 | Document in incident log | Within 1 week |

---

## 5. SovereignSession Architectural Guarantee

### 5.1 Why FSL Cannot Leak Session Content

The SovereignSession system is architecturally designed so that FSL infrastructure never possesses session content:

1. **Video and audio** travel peer-to-peer via WebRTC `RTCPeerConnection`. Media streams are negotiated directly between participants and never route through FSL application servers.

2. **The signaling server** relays SDP offers/answers and ICE candidates — connection metadata required to establish the peer-to-peer link. It does not relay media.

3. **The TURN server** (coturn), when used for NAT traversal or IP privacy, relays DTLS-SRTP encrypted packets. The encryption keys are negotiated peer-to-peer via DTLS handshake. The TURN server cannot decrypt the media it relays.

4. **No recording capability** exists on any FSL server. No `MediaRecorder`, transcription service, or content capture mechanism is implemented or planned.

5. **No content storage** exists. There is no database, file store, or queue designed to hold session content.

### 5.2 Incident Response for "Session Content Leaked"

If a report claims session content was leaked from FSL infrastructure:

| Step | Action |
|---|---|
| 1 | Verify the architectural guarantee still holds: confirm no recording, transcription, or content capture code has been deployed |
| 2 | Audit signaling server and TURN server logs for any unexpected data |
| 3 | If the guarantee holds, the leak did not originate from FSL infrastructure. Document this finding. |
| 4 | If the guarantee has been violated (code was deployed that captures content), escalate immediately to **S1 Critical** |
| 5 | Assist the reporting party in identifying the actual source (e.g., client-side screen recording, compromised peer device) |

### 5.3 What CAN Be Exposed from FSL Infrastructure

Even though session content cannot leak, the following data exists on FSL infrastructure and could be exposed in an incident:

| Data | Location | Impact if Exposed |
|---|---|---|
| Truncated wallet addresses (8 chars) | Signaling logs | Low — insufficient for identification |
| Session IDs (truncated) | Signaling logs | Low — session ID alone reveals nothing |
| Full wallet addresses | Booking database | Medium — pseudonymous but linkable |
| Session timestamps/duration | Booking database | Low — scheduling metadata |
| On-chain events | Public blockchain | N/A — already public by design |

---

## 6. Communication Protocol

### 6.1 Internal Communication

| Channel | Use Case | Audience |
|---|---|---|
| **Telegram — Core Team** | All S1-S3 incidents | Core development and governance team |
| **Direct message to Dr. Meg** | All S1-S2 incidents | Project lead |
| **Incident log (written record)** | All incidents | Permanent record for governance |

### 6.2 External Communication

| Threshold | Action |
|---|---|
| **S1 with confirmed user data exposure** | Public disclosure within 72 hours. Clear, factual statement of what happened, what data was affected, and what remediation was taken. |
| **S2 with potential user impact** | Affected users notified directly. Public disclosure at council discretion. |
| **S3-S4** | No public disclosure required. Documented internally. |

### 6.3 Disclosure Template

Public disclosures must include:

1. **What happened** — factual description of the incident
2. **What data was affected** — specific data types, not vague categories
3. **What data was NOT affected** — especially that session content is architecturally protected
4. **Who is affected** — scope of impacted users (by count, not identity)
5. **What we did** — containment and remediation actions taken
6. **What we changed** — preventive measures implemented

---

## 7. Post-Incident Review

### 7.1 Root Cause Analysis

Every S1-S3 incident requires a written root cause analysis covering:

- **Timeline:** When the issue was introduced, discovered, and resolved
- **Root cause:** The specific technical or process failure
- **Contributing factors:** What allowed the root cause to reach production
- **Impact assessment:** What data was affected and for how long

### 7.2 Spec Update

If the incident reveals a gap in `SOVEREIGN_SESSION_PRIVACY_SPEC.md`, the spec must be updated to address the gap. All spec updates follow the council review process.

### 7.3 Preventive Measures

Each post-incident review must propose at least one preventive measure:

| Category | Examples |
|---|---|
| **Automated checks** | New CI privacy diff rule, new log audit query |
| **Architecture** | Additional isolation, reduced data surface |
| **Process** | Additional review step, updated checklist |
| **Monitoring** | New alert, new audit schedule |

### 7.4 Incident Log

All incidents are recorded in a persistent incident log with:

- Incident ID and date
- Severity classification
- Brief description
- Resolution summary
- Link to root cause analysis (S1-S3)
- Preventive measures implemented

---

## 8. Review Schedule

This protocol is reviewed and updated:

- After every S1 or S2 incident
- Quarterly at minimum
- When the privacy spec is updated

---

## 9. Revision History

| Date | Change | Author |
|---|---|---|
| 2026-05-08 | Initial incident response protocol | FSL Governance Council |

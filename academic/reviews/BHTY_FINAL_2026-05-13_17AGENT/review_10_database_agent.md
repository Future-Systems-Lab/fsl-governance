# Review 10: Database Agent — Off-Chain Data Model

**Reviewer:** database_agent (Agent 10 of 17)
**Date:** 2026-05-13
**Document:** `~/fsl-governance/academic/BHTY_PAPER_v2.md`
**Focus:** PostgreSQL claims accuracy, off-chain storage model, session data fields, consent grants model, data lifecycle claims

---

## VERDICT: ACCEPT WITH MINOR REVISIONS

## OVERALL

The paper describes a hybrid on-chain/off-chain data model with PostgreSQL as the relational backend. The off-chain storage architecture is presented at an appropriate level of abstraction for an academic paper — schema details are omitted, which is acceptable for IP protection but limits verifiability of specific data model claims. The consent grant storage and deletion model described in Sections 3.4 and 10.2 is logically coherent. The paper does not mention a "67-table schema" — it avoids specific schema size claims entirely, which is the correct approach given the IP sensitivity. The data lifecycle discussion in Section 10.2 is the weakest database-related section, as it describes revocation mechanics but does not address data retention, archival, or deletion policies for the off-chain store.

---

## CRITICAL

1. **Data lifecycle incompleteness (Section 10.2).** Section 10.2 describes revocation semantics (JWT expiration, consent grant deletion, re-authentication) but does not address what happens to the actual session data in PostgreSQL after consent is revoked. When a participant revokes a Sovereign Guide's access, the consent grant record is deleted — but what about the session_logs, engagement metrics, and other off-chain data that was collected under that consent? The paper states "Past data stored in the database is not deleted by session termination; data deletion is handled through a separate data lifecycle process (see Section 10.2)" at line 190, but Section 10.2 never actually describes that data lifecycle process. This is a circular reference to a missing specification. **ACTION: Either describe the data deletion/retention policy or explicitly state it is undefined and planned as future work.**

---

## HIGH

2. **No schema disclosure or abstraction.** The paper mentions "PostgreSQL" (Section 5.1, line 254) and references database operations (consent grant storage, session metadata) but provides zero schema information — no table names, no field definitions, no relationship descriptions. This is a deliberate choice (likely for IP protection), but it means the off-chain data model is entirely unverifiable. For a paper claiming "zero PHI," the inability to inspect the actual database schema is a gap. At minimum, the paper should describe the abstract data entities: what tables exist (consent_grants, sessions, users/wallets, etc.) and what fields they contain at a category level.

3. **Consent grant model: delete vs. soft-delete ambiguity.** Section 3.4 states that revoking guide access "deletes the consent grant server-side." Section 10.2 states "the corresponding database record is deleted immediately." The paper uses "deleted" consistently, implying hard deletion. From a database perspective, hard deletion of consent grants eliminates the audit trail — there is no record that consent was ever granted and then revoked. This conflicts with the paper's emphasis on auditability. If this is truly a hard DELETE (not a soft-delete with a revoked_at timestamp), the paper should acknowledge the auditability tradeoff. If it is a soft-delete, the language should be corrected.

---

## MEDIUM

4. **"Session metadata (aggregate engagement data, no clinical notes)" is vague.** Section 5.1 lists off-chain data as "Session metadata (aggregate engagement data, no clinical notes)" and "Wellness engagement metrics (aggregate, non-clinical)." These descriptions are too vague to evaluate the zero-PHI claim from a database perspective. What constitutes "session metadata"? Duration? Participant mood ratings? Engagement scores? Topic categories? Some of these could arguably be health information depending on granularity. The paper should provide at least an enumerated list of field categories stored in the session records table.

5. **IPFS storage model underspecified.** Section 5.1 mentions "Encrypted documents (IPFS-pinned, wallet-gated decryption)" but does not describe: (a) what documents are stored on IPFS, (b) what encryption scheme is used, (c) how the encryption key is derived from the wallet, (d) whether the IPFS CID is stored in PostgreSQL or on-chain, (e) how wallet-gated decryption is enforced. Phase 5 (Section 10.3 item 10) describes AES-256-GCM client-side encryption for session recordings, but this is future work. The current IPFS usage is not specified.

6. **No database backup, replication, or availability claims.** For a system claiming to protect participant data sovereignty, the paper makes no claims about database reliability. Is the PostgreSQL instance replicated? Are backups encrypted? Is there a disaster recovery plan? While these are operational concerns, the paper's claim that "consent events and critical attestations are anchored on-chain even if centralized components become unavailable" (Section 10.1) implicitly acknowledges that the off-chain database could become unavailable. The paper should note whether off-chain data loss is recoverable.

---

## LOW

7. **Wallet address as primary identifier.** The paper implies that the Ethereum wallet address serves as the primary key for user records in PostgreSQL. This is architecturally sound for pseudonymity but creates a key management problem: if a participant loses their wallet key, they lose access not just to on-chain credentials but to their off-chain data relationship. The paper acknowledges key loss (Section 10.3 item 5) for on-chain credentials but does not address the off-chain implications.

8. **No indexing or query performance discussion.** For a system that performs middleware-level consent grant checks on every request (Section 3.3), query performance on the consent_grants table is operationally critical. The paper does not discuss database indexing strategy or expected query patterns. This is acceptable for an architecture paper but relevant for reproducibility.

9. **Reference [32] ERC-721 is orphaned.** Reference [32] cites ERC-721 (Non-Fungible Token standard). In Table 1, MindMasteryNFT is cited as "ERC-1155 [33]" — correctly referencing ERC-1155. However, [32] (ERC-721) does not appear to be cited anywhere in the body text. It exists in the references list but has no corresponding in-text citation. This is an orphaned reference that should be removed or cited.

---

## DONE WELL

- **Hybrid on-chain/off-chain architecture is well-reasoned.** The decision to anchor consent events on-chain while keeping operational data in PostgreSQL correctly balances immutability requirements with practical database operations (updates, deletes, queries).
- **Zero-PHI framing is architecturally sound.** The three-property argument (no PHI storage, not a covered entity, no BAA relationships) is well-structured from a data model perspective.
- **Three-layer revocation model is logically complete.** JWT expiration, consent grant deletion, and re-authentication enforcement address the three temporal dimensions of access control (future expiry, immediate revocation, action-level verification).
- **Honest acknowledgment of centralized database as SPOF.** Section 10.1 explicitly names the PostgreSQL database as a centralized component and single point of failure.
- **Content hash anchoring pattern.** The use of content hashes on-chain with full data off-chain is a well-established pattern correctly applied.

---

## UNIQUE PERSPECTIVE (Database)

The most significant database concern is the circular reference in the data lifecycle. The paper creates an expectation in Section 4.1 that data deletion is addressed in Section 10.2, but Section 10.2 only covers access revocation, not data deletion. For a system built on data sovereignty, this is a conceptual gap: sovereignty implies the participant can not only revoke access but also request deletion of their off-chain data (a right that exists under GDPR and is increasingly expected in US privacy law). The paper's zero-PHI argument may reduce the urgency of this gap (if the data contains no PHI, deletion is less critical from a regulatory standpoint), but from a sovereignty perspective, the participant should still be able to request deletion of their session metadata and engagement records. The absence of any data retention policy, even a simple "data is retained for X period and then purged" statement, is the single largest gap in the off-chain data model description. Additionally, the hard-delete vs. soft-delete ambiguity for consent grants suggests the database design may not have fully reconciled the tension between auditability (keep records of what happened) and sovereignty (delete what the participant wants deleted).

# FSL IPFS Redundancy Strategy

**Last Updated:** April 6, 2026

## Overview

FSL implements redundant IPFS pinning across multiple services (Lighthouse + Pinata) ensuring data persistence and censorship resistance. Database backups are cryptographically content-addressed and permanently accessible via any IPFS gateway.

## Architecture

Content is pinned to multiple IPFS pinning services simultaneously. Each file receives a unique Content Identifier (CID) derived from a cryptographic hash of its contents. This CID is immutable — the same content always produces the same CID, and any modification produces a different CID, providing tamper-evidence by design.

## Active Pinning Services

| Service | Status | Purpose |
|---------|--------|---------|
| Lighthouse | Primary (API intermittent) | 20 governance documents + 3 platform frontends |
| Pinata | Backup (active) | Database backups, redundant pinning |

## Database Backup

| Field | Value |
|-------|-------|
| File | `encrypthealth_backup_20260405.sql.gz` |
| CID | `QmWyjDuRJksNcf2jGsQxn2yiiPLMumFeADdofuMJPQeH5D` |
| Size | 42,018 bytes |
| Pinned via | Pinata |
| Gateway | https://gateway.pinata.cloud/ipfs/QmWyjDuRJksNcf2jGsQxn2yiiPLMumFeADdofuMJPQeH5D |
| Alt Gateway | https://ipfs.io/ipfs/QmWyjDuRJksNcf2jGsQxn2yiiPLMumFeADdofuMJPQeH5D |

## Censorship Resistance Properties

- Content-addressed: retrievable by CID from any IPFS node worldwide
- Multi-provider: pinned across independent infrastructure providers
- Immutable: CID changes if content is altered (tamper-evident)
- Decentralized retrieval: no single gateway dependency

## Governance Documents on IPFS

17 governance documents and 3 platform frontends are pinned via Lighthouse. Full CID manifest maintained at `~/HypnoNeuro/docs/FSL_IPFS_MANIFEST.md` and in the `fsl-governance/ipfs/` repository.

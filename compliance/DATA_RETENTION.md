# FSL Data Retention Policy
**Effective Date:** April 10, 2026
**Entity:** Future Systems Lab LLC (Wyoming)

---

## What FSL Retains

| Data Type | Retained | Storage Location | Retention Period |
|-----------|----------|-----------------|-----------------|
| Wallet address (public) | Yes | PostgreSQL + on-chain | Indefinite |
| On-chain attestation hashes | Yes | Ethereum Sepolia | Permanent (blockchain) |
| IPFS document CIDs | Yes | Pinata IPFS | Permanent (content-addressed) |
| Subscription status | Yes | PostgreSQL | Duration of subscription |
| Session metadata (timestamps, type) | Yes | PostgreSQL | Duration of account |
| JWT session tokens | Yes | Server memory | 15 minutes (auto-expire) |

## What FSL Does NOT Collect or Store

| Data Type | Collected | Stored | Notes |
|-----------|-----------|--------|-------|
| Name | No | No | Wallet address is the sole identifier |
| Email address | No | No | No email required for any flow |
| Phone number | No | No | |
| Physical address | No | No | |
| IP address | No | No | Not logged by application layer |
| Browser fingerprint | No | No | |
| Device identifiers | No | No | |
| Biometric data | No | No | |
| Private keys or seed phrases | No | No | Never transmitted to FSL servers |
| Health records content | No | No | Encrypted in participant wallet only |
| Cookie tracking data | No | No | Only functional JWT cookie (15min) |
| Analytics or telemetry | No | No | No third-party analytics installed |

## On-Chain Records

All on-chain records (session attestations, document hashes, token transactions) are:
- Public by nature of the Ethereum blockchain
- Permanent and immutable
- Not deletable by FSL or any party
- Linked only to wallet address (pseudonymous)

## Data Deletion

Participants may request deletion of operational data (subscription status, session metadata) by contacting future.systems.lab@proton.me. On-chain records and IPFS pins are permanent by design and cannot be deleted.

## Third-Party Data Sharing

FSL does not sell, rent, share, or transfer participant data to any third party. Practitioner access to participant records requires explicit wallet-signed consent which can be revoked at any time.

## Governing Law

This policy is governed by the laws of the State of Wyoming, USA.

---

**Contact:** future.systems.lab@proton.me
**IPFS CID:** Qmcu3Xb5eHxz2XG3jMy5oQHAmzKPzLH7DHQ5qeWq6THmVH

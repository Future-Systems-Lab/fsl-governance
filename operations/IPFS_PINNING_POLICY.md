# FSL IPFS Pinning Policy

## Dual-Pin Standard

All FSL academic and legal outputs are pinned to **both** Pinata and Lighthouse for redundancy. Both providers produce the same CID (IPFS content addressing is deterministic).

### Providers
1. **Pinata** (https://pinata.cloud) — primary FSL infrastructure, used for ecosystem encrypted backups
2. **Lighthouse** (https://lighthouse.storage) — secondary, long-term storage with Filecoin deal

### Why Dual-Pin
- Lighthouse had a ~1 week outage historically — single-provider IPFS pinning is fragile
- Dual-pin means the file is retrievable via either gateway if one provider is down
- Same CID from both providers confirms file integrity

## What Gets Pinned

| Category | Examples | Priority |
|----------|----------|----------|
| Academic papers | BHTY paper, all revisions | Immediate |
| Patent disclosures | Provisional, non-provisional | Immediate |
| Application materials | ASU LOI, CV (final versions) | At submission |
| Case study docs | AlchemistForge documentation | At publication |
| Presentations | TEDx transcript, conference slides | At delivery |

## Pinning Procedure

1. Generate SHA256 hash of source file
2. Upload to Pinata via API (`/pinning/pinFileToIPFS`)
3. Upload to Lighthouse via API (`/api/v0/add`)
4. Verify CIDs match (sanity check)
5. Verify both gateways resolve (HTTP 200)
6. Document in `academic/IPFS_ANCHORS.md`
7. Commit + push

## Gateway Fallback Order

1. `https://gateway.pinata.cloud/ipfs/[CID]`
2. `https://gateway.lighthouse.storage/ipfs/[CID]`
3. `https://ipfs.io/ipfs/[CID]` (public gateway, slower)

## Re-Pin Policy

- Refresh pins annually (verify still active on both providers)
- Monthly health check via `operations/check_ipfs_pins.sh`
- Telegram alert if either provider returns 404

## Credentials

- Pinata: `${PINATA_API_KEY}` / `${PINATA_API_SECRET}` in `/opt/encrypthealth/backend/.env`
- Lighthouse: `${LIGHTHOUSE_API_KEY}` in `/opt/encrypthealth/backend/.env`
- NEVER commit credentials to source code

# JWT Secret Rotation Policy

## Current Implementation

- **Algorithm:** HS256 (symmetric HMAC-SHA256)
- **Secret:** `JWT_SECRET` environment variable (Vercel + VPS)
- **Token TTL:** 15 minutes
- **Refresh:** Silent refresh via `/api/auth/refresh` every 13 minutes

## Rotation Procedure

### Step 1: Generate New Secret
```bash
openssl rand -hex 64
```

### Step 2: Update Vercel
```bash
cd ~/HypnoNeuro/encrypthealth/frontend
vercel env rm JWT_SECRET production
echo "NEW_SECRET_HERE" | vercel env add JWT_SECRET production
vercel --prod
```

### Step 3: Update VPS
```bash
ssh root@74.208.202.239
sed -i 's/^JWT_SECRET=.*/JWT_SECRET=NEW_SECRET_HERE/' /opt/encrypthealth/backend/.env
pm2 restart encrypthealth-api
```

### Step 4: Verify
All existing JWTs will expire within 15 minutes. Users will need to reconnect their wallet — this is expected and acceptable since JWT TTL is short.

## Rotation Schedule

- **Minimum:** Rotate after any suspected compromise
- **Recommended:** Rotate quarterly (every 90 days)
- **Before mainnet:** Rotate immediately before mainnet launch
- **After incidents:** Rotate immediately after any security incident

## Dual-Secret Grace Period (Future Enhancement)

For zero-downtime rotation:
1. Accept JWTs signed with either old OR new secret for 15 minutes
2. After 15 minutes (all old tokens expired), remove old secret
3. Requires code change to try both secrets in middleware

Not currently implemented — the 15-minute TTL makes hard rotation acceptable.

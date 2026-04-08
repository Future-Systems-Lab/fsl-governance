# FSL Security Scan — April 7, 2026
**Auditor:** claude-opus-4 via OpenRouter
**Scope:** Wallet gate, CORS, API, auth, PostgreSQL, IPFS, smart contracts

---

## CRITICAL (Must fix before launch)

1. **Database Exposed to Internet**
   - PostgreSQL on 74.208.202.239:5432 directly accessible
   - ACTION: Configure firewall to only allow localhost connections
   - ACTION: Use SSH tunnel or VPN for remote access

2. **No Server-Side Auth Validation**
   - Endpoints trust client-provided wallet addresses without verification
   - Anyone can call `/api/trial/activate/:wallet` with any address
   - ACTION: Implement message signature verification on backend
   - ACTION: Validate wallet ownership for ALL endpoints

3. **Unprotected Stripe Endpoint**
   - `/api/subscribe` accepts POST without wallet auth
   - ACTION: Require authenticated wallet before checkout session

## HIGH (Fix within 1 week)

1. **Missing Rate Limiting**
   - No protection against API abuse
   - ACTION: Implement rate limiting on all endpoints (express-rate-limit)
   
2. **No Database Connection Pooling**
   - Direct connections will exhaust under load
   - ACTION: Implement pg-pool with appropriate limits

3. **Client-Side Auth State Manipulation**
   - localStorage can be manually edited to bypass trial
   - ACTION: Move trial state validation to backend only

4. **Exposed Internal Infrastructure**
   - 22 hardcoded CORS origins reveals internal structure
   - ACTION: Use environment-based CORS configuration

## MEDIUM (Fix within 1 month)

1. **No API Key/Secret for External Services**
   - Daily.co room creation likely unprotected
   - ACTION: Implement API authentication for all third-party integrations

2. **Missing Security Headers**
   - No mention of HSTS, CSP, X-Frame-Options
   - ACTION: Configure security headers in Vercel and Express

3. **Testnet Contracts in Production**
   - Using Sepolia addresses in production code
   - ACTION: Clear separation of testnet/mainnet configurations

## LOW (Nice to have)

1. **IPFS Redundancy**
   - Single point of failure with Pinata
   - ACTION: Add backup IPFS provider

2. **Audit Logging**
   - No mention of security event logging
   - ACTION: Log all auth attempts and sensitive operations

3. **Input Validation**
   - Mood logs and document uploads need validation
   - ACTION: Implement request validation middleware

## WELL-SECURED

1. **No JWT/Session Complexity** - Reduces attack surface
2. **Explicit CORS Origins** - No wildcards is good practice
3. **Removed MetaMask** - Reducing unused code
4. **HTTPS Everywhere** - .io domains through Cloudflare
5. **Personal_sign Required** - Good wallet ownership proof
6. **Environment Isolation** - Separate domains for different services

**IMMEDIATE ACTION**: Firewall PostgreSQL and implement backend signature verification for all wallet-authenticated endpoints.
# FSL Deferred Work Backlog
## Items identified but not urgent — address when context is right

---

## Command Center Dashboard HTML Exposure
**Severity:** LOW (in current context)
**Identified:** May 7, 2026
**Status:** DEFERRED — not urgent

### Issue
The /dashboard route serves full HTML to unauthenticated curl/wget requests. Wallet auth is client-side JS only, so non-browser clients can read VPS IP, SSH commands, PM2 details, file paths.

### Why Deferred
- No public marketing or SEO promotion
- Site discovery requires knowing URL directly
- Exposed data is operational reconnaissance, not access credentials
- Browser-based access (the realistic visitor path) IS gated correctly
- Fixing requires moving content to API-gated endpoint — non-trivial work
- Repo visibility transitions have historically caused other problems (Vercel build failures, GitGuardian token exposure)

### When to Address
- Before significant public marketing push
- Before any inbound traffic from grant applications, faculty engagement that references the URL
- During a planned dedicated session, not reactively

### Fix Approach (When Ready)
Move sensitive dashboard content from static HTML to API endpoint:
- /dashboard serves minimal HTML shell (no sensitive data)
- After client-side wallet auth, JS calls /api/dashboard-content with JWT
- Server-side JWT verification — returns 401 to unauthenticated curl
- Browser renders fetched content

### Estimated Effort
2-3 hours (Option A — lighter approach)

### Do NOT
- Make repo private without first resolving Vercel deploy chain
- Migrate to Next.js without dedicated planning session
- Change anything that breaks the working browser flow

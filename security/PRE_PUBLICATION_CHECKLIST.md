# Pre-Publication Security Checklist

Run this checklist before making any private repository public.

## Step 1: Full Git History Secret Scan

```bash
gitleaks detect --source /path/to/repo --verbose
```

Review every finding. If any real secrets are found, they must be rotated immediately -- removing them from history is not sufficient, as the secret was already exposed.

To remove from history after rotation:
```bash
git filter-repo --invert-paths --path path/to/file-with-secret
```

## Step 2: Grep for Common Secret Patterns

```bash
# Telegram tokens
grep -rn 'bot[0-9]\{10\}:AA' .

# Generic high-entropy strings in config
grep -rnE '(password|secret|token|api_key)\s*[:=]\s*["\x27][A-Za-z0-9+/]{20,}' .

# Private keys
grep -rn 'PRIVATE KEY' .
grep -rn 'BEGIN RSA' .
grep -rn 'BEGIN EC' .

# AWS credentials
grep -rnE 'AKIA[0-9A-Z]{16}' .

# Database connection strings with credentials
grep -rnE 'mongodb(\+srv)?://[^:]+:[^@]+@' .
grep -rnE 'postgres://[^:]+:[^@]+@' .
```

## Step 3: Review .env Files and .gitignore

- Confirm `.env` is listed in `.gitignore`
- Confirm no `.env` files are tracked: `git ls-files | grep '\.env'`
- Provide a `.env.example` with placeholder values, never real credentials

## Step 4: Check for Hardcoded URLs with Credentials

```bash
grep -rnE 'https?://[^:]+:[^@]+@' .
```

Look for URLs like `https://user:password@host.com` in code, configs, or documentation.

## Step 5: Confirm .gitignore Coverage

Ensure `.gitignore` includes at minimum:
```
.env
.env.*
*.pem
*.key
*.p12
*.pfx
credentials.json
service-account*.json
*.secret
node_modules/
```

## Step 6: Review CI/CD Configurations

- Ensure no secrets are hardcoded in workflow files (`.github/workflows/`)
- All secrets should use repository secrets or environment variables
- Check for debug/verbose logging that might print secrets

## Step 7: Final Confirmation

- [ ] gitleaks reports zero findings (or all are documented false positives)
- [ ] No .env files in tracked history
- [ ] .gitignore covers all secret file patterns
- [ ] No hardcoded credentials in URLs
- [ ] All real secrets found have been rotated
- [ ] Repository has been reviewed by at least one other team member

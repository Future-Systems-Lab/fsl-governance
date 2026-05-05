# Security Policy

## Reporting Vulnerabilities

If you discover a security vulnerability in any FSL repository, please report it responsibly:

**Email:** future.systems.lab@proton.me
**Subject:** [SECURITY] Brief description

Do NOT open a public GitHub issue for security vulnerabilities.

## Secret Scanning

All FSL repositories are scanned for secrets using GitGuardian. Pre-commit hooks are recommended for all contributors.

## Recommended Pre-Commit Setup

```bash
# Install git-secrets
brew install git-secrets

# Configure for this repo
git secrets --install
git secrets --register-aws
```

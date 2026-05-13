# FSL Personal Custody Checklist

**Owner:** Dr. Meg Montanez-Davenport
**Purpose:** Items that CANNOT be recovered from any backup — Dr. Meg must secure these independently.
**Last reviewed:** 2026-05-12

---

## Wallet Seed Phrases

- [ ] **Deployer wallet** (0xf22cbF25deEeA36FFF828BAf73CCb049345eF248) — seed phrase written on paper or stamped on steel seed plate
- [ ] **XRPL wallet** (rwR3etLJVxtQXYs2d9jgBQxzHBivtCMdPd) — seed phrase secured separately
- [ ] Both stored in fireproof safe or safety deposit box
- [ ] NOT stored digitally (no cloud, no photo, no note app)

## Recovery Bundle Passphrase

- [ ] Passphrase for `encrypt_bundle.sh` / `decrypt_bundle.sh` — memorized or written in sealed envelope
- [ ] Stored separately from seed phrases (different physical location)
- [ ] At least one trusted person knows the location (dead man's switch)

## Account Credentials

- [ ] **Proton Mail** (future.systems.lab@proton.me) — password + 2FA backup codes
- [ ] **GitHub** (Future-Systems-Lab org) — PAT, SSH key passphrase, 2FA backup codes
- [ ] **Cloudflare** — email login, 2FA backup codes (DNS for all .io domains)
- [ ] **Vercel** — login credentials (deploys all frontends)
- [ ] **IONOS VPS** — root password, SSH key (74.208.202.239)
- [ ] **Pinata** — API credentials (IPFS pinning)
- [ ] **USPTO** — Patent Center login (for patent filings)
- [ ] **Gitea** (git.futuresystemslab.io) — admin credentials
- [ ] **Daily.co** — API key (video sessions)
- [ ] **Telegram** — bot tokens (Agent Gateway, mental-health-on-chain)

## Hardware Recommendations

- [ ] **Steel seed plate** (e.g., Cryptosteel, Billfodl) — fire/flood-proof wallet seed storage
- [ ] **Hardware wallet** (e.g., Ledger, Trezor) — for mainnet deployment (Phase 3)
- [ ] **Safety deposit box** — for steel plate + sealed envelope with recovery passphrase
- [ ] **Fireproof safe** (home) — for daily-access credentials binder

## Verification Schedule

| Frequency | Action |
|-----------|--------|
| Monthly | Verify wallet seed phrases are accessible and readable |
| Quarterly | Test recovery bundle decrypt with passphrase |
| Annually | Rotate VPS SSH keys, review account 2FA backup codes |
| On any compromise | Execute emergency procedures per RESTORE_GUIDE.md Phase 9 |

## What the Recovery Bundle Covers (NO personal action needed)

- All git repos (full history)
- Smart contract source + ABIs
- Database schema
- Academic outputs
- Legal documents
- Configuration templates (secrets REDACTED)

## What the Recovery Bundle Does NOT Cover (PERSONAL ACTION REQUIRED)

- Wallet private keys / seed phrases
- Account passwords and 2FA codes
- Recovery bundle decryption passphrase
- Physical documents (LLC certificate, insurance license)
- Personal identity documents needed for account recovery

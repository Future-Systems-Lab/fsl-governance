# FSL Canonical Config
## Single Source of Truth for All FSL Surfaces

All FSL platforms and surfaces read from these JSON files at build or render time. Changes here propagate to all consumers automatically.

---

## Files

| File | Contents | Consumers |
|------|----------|-----------|
| `contracts.json` | All 9 deployed Sepolia contracts with addresses, types, descriptions | Contract tables, proof cards, verification links |
| `platforms.json` | Platform URLs, session tooling config, block explorer, wallet preferences | Navigation links, meeting URLs, explorer links |
| `lexicon.json` | Canonical terms, retired terms, anonymity messaging | Drift detection, UI copy validation |
| `credentials.json` | Dr. Meg's credentials, NPI, EIN, contact, wallets | Footers, about sections, profile pages |
| `architecture.json` | Six-layer thesis, tagline, Boscovic alignment, DEng framing | Thesis sections, reviewer pages, org READMEs |
| `version.json` | Schema version, consumer integration status | Cache busting, health checks |

## How Consumers Read Canonical

**Static sites (fsl-command-center, alchemist-forge):**
```javascript
// Fetch at page load, 5-minute cache
const CANONICAL_BASE = 'https://raw.githubusercontent.com/Future-Systems-Lab/fsl-governance/main/canonical';
const contracts = await fetch(`${CANONICAL_BASE}/contracts.json`).then(r => r.json());
```

**Next.js apps (EncryptHealth, HypnoNeuro):**
```javascript
// In getStaticProps or server component
const res = await fetch(`${CANONICAL_BASE}/contracts.json`);
const contracts = await res.json();
```

**VPS services (signaling server, agent council):**
```javascript
// Read at startup, re-fetch on SIGUSR1
const canonical = JSON.parse(fs.readFileSync('/opt/fsl-canonical/contracts.json'));
```

## How to Update

1. Edit the relevant JSON file in this directory
2. Update `version.json` `last_updated` timestamp
3. Commit and push to `main`
4. Consumer surfaces pick up changes on next render/build/restart

## Drift Detection

Weekly cron checks all FSL repos for terms in `lexicon.json:retired`. Any match triggers a Telegram alert with proposed fix.

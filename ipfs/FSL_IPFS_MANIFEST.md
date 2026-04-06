# FSL IPFS Deployment Manifest
**Last Updated:** April 3, 2026
**Status:** Awaiting Lighthouse API Key Configuration

## Platform CIDs

| Platform | CID | IPFS Gateway URL | Vercel Fallback | Status |
|----------|-----|-----------------|-----------------|--------|
| HypnoNeuro | bafybeifmucxg5frqusidh4ihysjfytijmjxjha2c5acn2rgybnztdmgg5a | https://gateway.lighthouse.storage/ipfs/bafybeifmucxg5frqusidh4ihysjfytijmjxjha2c5acn2rgybnztdmgg5a | https://hypnoneuro-frontend.vercel.app | Live |
| hypnosispsych.888 | HypnoNeuro Frontend | bafybeifmucxg5frqusidh4ihysjfytijmjxjha2c5acn2rgybnztdmgg5a | Live - Unstoppable Domains |
| EncryptHealth | pending | pending | https://frontend-omega-six-b9szh0blg5.vercel.app | Awaiting deploy |
| SovereignLedger | pending | pending | https://claimchain-frontend.vercel.app | Awaiting deploy |
| NeuroBalance | pending | pending | https://neurobalance-labs.vercel.app | Awaiting deploy |
| FSL Web | pending | pending | https://fsl-web.vercel.app | Awaiting deploy |

## How to Deploy

1. Set your Lighthouse API key: `export LIGHTHOUSE_API_KEY=your_key_here`
2. Run: `~/HypnoNeuro/scripts/deploy-ipfs.sh`
3. CIDs will be updated in this file automatically

## How to Access via IPFS

- Gateway: `https://gateway.lighthouse.storage/ipfs/{CID}`
- Alternative: `https://ipfs.io/ipfs/{CID}`
- ENS: `futuresystemslab.eth` (once registered)

## How to Get a Lighthouse API Key

1. Go to https://files.lighthouse.storage
2. Create account with MetaMask
3. Navigate to API Keys section
4. Generate new key
5. Store in environment: `LIGHTHOUSE_API_KEY=...`

## IPFS Document CIDs — 2026-04-03

| Document | CID |
|----------|-----|
| FSL_EXECUTIVE_SUMMARY.md | bafkreigtggji4zfmfortzmh6izt5brfpv2jqrhqvenlfpltwkteq34fe7y |
| FSL_ONE_PAGER.md | bafkreidzwm5rffyrr4awmsj5h26qpdh4mtt3spqcmb37eufqiyfrmvggqe |
| FSL_LEXICON_GUIDE.md | bafkreif5abazp3d3lejofdlqh6657cqaarwvazqq22dtgw3aml5g6x4cni |
| FSL_BENEVOLENCE_MODEL.md | bafkreig3xjk6nhb3b22klrekkdozd7mcmbaodocutgwmx2wdaeatgpy5gy |
| FSL_COMPLIANCE_POSITION.md | bafkreibgqmddyjikjq5q5rueglx4hekedtjxagmxyuq7mu44k3xoy7lh3y |
| FSL_SOVEREIGN_GOVERNANCE.md | bafkreihslbmqnkvuhmf36hgvjpxr54mt3opjyxvm6dkdb7snx4zjw7hkgy |
| FSL_ECOSYSTEM_AUDIT.md | bafkreihalxi5zjfeehf57jj26ckfs4xadmd7ai6ltngssfvggtnt6wbgk4 |
| FSL_CONTRACT_REGISTRY.md | bafkreifnbzqal5k6upjzwfwn5vl2bdw5prekiirekzw5vk2kpc26kkdwlu |
| FSL_DECENTRALIZATION_REPORT.md | bafkreif7ltvxjyuyz77l6mflbyug55q5gquoahkmgsbiado3ufz4hvelqq |
| FSL_DATA_SOVEREIGNTY_REPORT.md | bafkreidzddgrsx2nan27ujumr5msaeleslltv7upvlronzcfmugxavzyom |
| FSL_DEPENDENCY_AUDIT.md | bafkreihralgt5khklty7woyzhmjkwz7s4rwggibn4qlmqqygmqcos2xvyq |
| FSL_VIDEO_HIPAA.md | bafkreiazeoaxojpdmc5beoahk6257zgjucqb4g4zjqyl3sc7bek6khpmfy |
| DR_MEG_ACTION_ITEMS.md | bafkreids7odp6sjlttpqaemutoyvcqwpqgnrogix23dvhisdsjm2wsaajy |
| FSL_EXPLAINER_STORYBOARD.md | bafkreifkoypv4wishhs5aiih66fhaczu2uebvil5dwuws63xgeoq77ckry |

| FSL_METHODOLOGY.md | bafkreihzetzx74xgidpdt6belzhld345qmetvlkwjx4dez5c6fdrcvqi5y |
| FSL_REBUILD_GUIDE.md | bafkreidksia44myr6nsgcbjjahsd6boq3d4oqlkoldanuyfczyrd4bidha |
| FSL_PHILOSOPHICAL_FOUNDATION.md | bafkreicxscwa332blthoyfhjgmbdyor6wgxdsvp3tksz3dvf3ms744g5ii |

## IPFS Deploy: 2026-04-04


## Platform IPFS CIDs — 2026-04-04

| HypnoNeuro | bafkreiandgxutlydumi4ssf7fohph23yp5ddrpa4xlwnb3jf2jblc5ngdu | https://gateway.lighthouse.storage/ipfs/bafkreiandgxutlydumi4ssf7fohph23yp5ddrpa4xlwnb3jf2jblc5ngdu |
| SovereignLedger | bafkreidndcipw27q543zc3ffhwlnfxkiufqfb2h3t4zqmxct5swkjajtde | https://gateway.lighthouse.storage/ipfs/bafkreidndcipw27q543zc3ffhwlnfxkiufqfb2h3t4zqmxct5swkjajtde |
| NeuroBalance | bafkreidqxgtxom6vtmzv7tx7bmui6pzuemzifsd77mwm7q3u2afbili45a | https://gateway.lighthouse.storage/ipfs/bafkreidqxgtxom6vtmzv7tx7bmui6pzuemzifsd77mwm7q3u2afbili45a |

## Database Backups — Pinata IPFS

| Backup | CID | Date | Size | Gateway |
|--------|-----|------|------|---------|
| encrypthealth_backup_20260405.sql.gz | QmWyjDuRJksNcf2jGsQxn2yiiPLMumFeADdofuMJPQeH5D | 2026-04-05 | 42 KB | https://gateway.pinata.cloud/ipfs/QmWyjDuRJksNcf2jGsQxn2yiiPLMumFeADdofuMJPQeH5D |
| fsl_full_backup_20260406.sql.gz | QmW2NJTnV72rditWLkwUYmtRYt3VgsEQwAfTnfrcGNY8RK | 2026-04-06 | 45 KB | https://gateway.pinata.cloud/ipfs/QmW2NJTnV72rditWLkwUYmtRYt3VgsEQwAfTnfrcGNY8RK |

## Infrastructure Configs — Pinata IPFS

| Config | CID | Date | Size | Gateway |
|--------|-----|------|------|---------|
| nginx_config_20260406.conf | QmZ3qhNxjCHaUf7BeBJwocqDcgV2h1FriCRw7FddjLiJYZ | 2026-04-06 | 2 KB | https://gateway.pinata.cloud/ipfs/QmZ3qhNxjCHaUf7BeBJwocqDcgV2h1FriCRw7FddjLiJYZ |
| pm2_dump_20260406.json | QmT8zJQrAjXUhh9RjfdCiF9tTQWY4tk3Wg1UCQB2rbvStR | 2026-04-06 | 19 KB | https://gateway.pinata.cloud/ipfs/QmT8zJQrAjXUhh9RjfdCiF9tTQWY4tk3Wg1UCQB2rbvStR |

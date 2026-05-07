# IPFS Re-Pin Queue — Narrative Drift Remediation

**Date:** 2026-04-29
**Status:** Queue assembled — awaiting updated document authoring and Lighthouse API key

---

## Document CIDs Requiring Review

| CID | Document | Contains Wellness Framing | Action |
|-----|----------|--------------------------|--------|
| bafkreigtggji4zfmfortzmh6izt5brfpv2jqrhqvenlfpltwkteq34fe7y | FSL_EXECUTIVE_SUMMARY.md | Yes — "sovereign wellness experience," "Where Mental Wellness Meets Metaverse" as FSL tagline | Re-pin with updated version |
| bafkreidzwm5rffyrr4awmsj5h26qpdh4mtt3spqcmb37eufqiyfrmvggqe | FSL_ONE_PAGER.md | Yes — "Sovereign Wellness Infrastructure" title, "frequency-based sovereign wellness" | Re-pin with updated version |
| bafkreif5abazp3d3lejofdlqh6657cqaarwvazqq22dtgw3aml5g6x4cni | FSL_LEXICON_GUIDE.md | Yes — 7 wellness-framing instances, "Where Mental Wellness Meets Metaverse" as official tagline | Re-pin with updated version |
| bafkreig3xjk6nhb3b22klrekkdozd7mcmbaodocutgwmx2wdaeatgpy5gy | FSL_BENEVOLENCE_MODEL.md | Likely — references "Sovereign Wellness Benevolence Fund" | Review; re-pin if needed |
| bafkreibgqmddyjikjq5q5rueglx4hekedtjxagmxyuq7mu44k3xoy7lh3y | FSL_COMPLIANCE_POSITION.md | Yes — 1 wellness-framing instance | Re-pin with updated version |
| bafkreihslbmqnkvuhmf36hgvjpxr54mt3opjyxvm6dkdb7snx4zjw7hkgy | FSL_SOVEREIGN_GOVERNANCE.md | Yes — 1 instance ("sovereign wellness governance") | Re-pin with updated version |
| bafkreihzetzx74xgidpdt6belzhld345qmetvlkwjx4dez5c6fdrcvqi5y | FSL_METHODOLOGY.md | Yes — "27-experience wellness game," wellness-only framing | Re-pin with updated version |
| bafkreicxscwa332blthoyfhjgmbdyor6wgxdsvp3tksz3dvf3ms744g5ii | FSL_PHILOSOPHICAL_FOUNDATION.md | Yes — "frequency company" framing, no infrastructure thesis | Re-pin with updated version |
| bafkreifkoypv4wishhs5aiih66fhaczu2uebvil5dwuws63xgeoq77ckry | FSL_EXPLAINER_STORYBOARD.md | Yes — "sovereign wellness ecosystem" | Re-pin with updated version |
| bafkreihalxi5zjfeehf57jj26ckfs4xadmd7ai6ltngssfvggtnt6wbgk4 | FSL_ECOSYSTEM_AUDIT.md | Unknown — source not in fsl-governance | Review source; re-pin if needed |
| bafkreifnbzqal5k6upjzwfwn5vl2bdw5prekiirekzw5vk2kpc26kkdwlu | FSL_CONTRACT_REGISTRY.md | Yes — "sovereign wellness token" | Re-pin with updated version |
| bafkreif7ltvxjyuyz77l6mflbyug55q5gquoahkmgsbiado3ufz4hvelqq | FSL_DECENTRALIZATION_REPORT.md | Unknown — source not in fsl-governance | Review source; re-pin if needed |
| bafkreidzddgrsx2nan27ujumr5msaeleslltv7upvlronzcfmugxavzyom | FSL_DATA_SOVEREIGNTY_REPORT.md | Unknown — source not in fsl-governance | Review source; re-pin if needed |
| bafkreidksia44myr6nsgcbjjahsd6boq3d4oqlkoldanuyfczyrd4bidha | FSL_REBUILD_GUIDE.md | Unknown — source not in fsl-governance | Review source; re-pin if needed |

## CIDs That Are Clean (No Action)

| CID | Document | Notes |
|-----|----------|-------|
| bafkreihralgt5khklty7woyzhmjkwz7s4rwggibn4qlmqqygmqcos2xvyq | FSL_DEPENDENCY_AUDIT.md | Technical audit — no wellness framing |
| bafkreiazeoaxojpdmc5beoahk6257zgjucqb4g4zjqyl3sc7bek6khpmfy | FSL_VIDEO_HIPAA.md | HIPAA-specific — framing is appropriate |
| bafkreids7odp6sjlttpqaemutoyvcqwpqgnrogix23dvhisdsjm2wsaajy | DR_MEG_ACTION_ITEMS.md | Internal action items — low visibility |
| QmWyjDuRJksNcf2jGsQxn2yiiPLMumFeADdofuMJPQeH5D | encrypthealth_backup DB | Database backup — no narrative content |
| QmW2NJTnV72rditWLkwUYmtRYt3VgsEQwAfTnfrcGNY8RK | fsl_full_backup DB | Database backup — no narrative content |
| QmZ3qhNxjCHaUf7BeBJwocqDcgV2h1FriCRw7FddjLiJYZ | nginx_config | Config file — no narrative content |
| QmT8zJQrAjXUhh9RjfdCiF9tTQWY4tk3Wg1UCQB2rbvStR | pm2_dump | Config file — no narrative content |

## Process

1. Author updated versions of each flagged document with infrastructure-thesis framing
2. Pin updated documents via Lighthouse (`deploy-ipfs.sh`)
3. Record new CIDs in `FSL_IPFS_MANIFEST.md`
4. Old CIDs remain on IPFS (content-addressed, immutable) but are no longer referenced

---

**Total requiring re-pin:** 13 documents (9 confirmed wellness framing, 4 need review)
**Total clean:** 7 (no action needed)

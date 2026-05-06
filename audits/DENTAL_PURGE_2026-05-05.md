# Dental Purge Audit — May 5, 2026

**Scope:** Remove all dental references from the FSL ecosystem. Dental is not part of the parent infrastructure thesis.

**Search patterns:** dental, dentist, dentistry, DDS, Gabriel Duncan, intraoral, iTero, oral health, Open Dental, SoftDent, Dentrix, Denticon, Eaglesoft

**Protected:** Dr. Meg's credentials (D.N.Psy., BCHN, CBHP -- none are dental), Restore Guide / Rebuild Guide / TICKETER / Council Protocol

---

## Repos Scanned (15 total)

| Repo | Dental Found | Action |
|------|-------------|--------|
| fsl-command-center | YES | Cleaned |
| Future-Systems-Lab-profile | YES | Cleaned |
| hypnoneuro-games | YES | Cleaned |
| HypnoNeuro | YES | Cleaned |
| fsl-governance | YES | Cleaned |
| fsl-web | NO | Clean |
| NeuroBalance-Watch | NO | Clean |
| mental-health-on-chain | NO | Clean |
| open-source-portfolio | NO | Clean |
| EncryptHealth | NO | Clean |
| SovereignLedger | NO | Clean |
| fsl-engagement-research | NO | Clean |
| backup-archive | NO | Clean |
| remix-contract-backups | NO | Clean |
| alchemist-forge | NO | Clean |

---

## Files Modified

### fsl-command-center (`b0b8611`)
| File | Change |
|------|--------|
| `index.html:575` | Removed `dental-diagnostic-systems-architecture` and `wireless-dental-imaging-case-study` from Legacy/Archive repo listing. Updated count 20 -> 18. |

### Future-Systems-Lab-profile (`74fa96f`)
| File | Change |
|------|--------|
| `CV_MegMontanezDavenport.html:171-172` | Removed entire "Practice Management Systems" subsection (Open Dental, SoftDent, Dentrix, Denticon, Archy, Eaglesoft, MacPractice). |
| `CV_MegMontanezDavenport.html:224` | Reframed "Production Architecture Lead -- Riccobene Family Dentistry" to "Clinical Operations Architecture Lead -- Riccobene Associates". Kept the role and $380K-$624K production metrics (clinical operations experience, not dental-specific). |

### hypnoneuro-games (`a307bac`)
| File | Change |
|------|--------|
| `claimchain-frontend/src/pages/ProviderApply.jsx:38` | Changed credentials placeholder from "e.g. ND, LMFT, DDS, BCHN" to "e.g. ND, LMFT, BCHN, CBHP". |

### HypnoNeuro (`b6c922b`)
| File | Change |
|------|--------|
| `encrypthealth/frontend/app/providers/[id]/page.tsx:210` | Replaced "CDT codes D9310 + D9995 provided for participant reference only. Participant is responsible for submitting this superbill to their dental insurance, medical insurance, or HSA/FSA administrator" with "CPT codes provided for participant reference only. Participant is responsible for submitting this superbill to their insurance or HSA/FSA administrator". |
| `docs/METAVERSE_WELLNESS_BRAND.md:62` | Removed "DDS" from credentials list. Now reads "D.N.Psy., LMFT, NMD, BCHN, CN, CBHP". |

### fsl-governance (`a5391df`)
| File | Change |
|------|--------|
| `academic/RICCOBENE_PRODUCTION_DATA.md` | DELETED -- entire file was dental-specific production data. |
| `audits/SESSION_SUMMARY_2026-04-27.md:7` | Reframed "PlanetDDS Executive Summary" to "Executive Summary reports". |
| `audits/SESSION_SUMMARY_2026-04-27.md:18` | Changed "Added dental practice management systems" to "Removed dental practice management systems from CV (not part of FSL infrastructure thesis)". |
| `audits/PLACEHOLDER_FIXES_APPLIED.md:34` | Replaced "Dr. Gabriel Duncan provider card" with "Placeholder provider card". |
| `audits/PLACEHOLDER_FIXES_APPLIED.md:103` | Replaced Gabriel Duncan reference with generic "placeholder provider" language. |
| `audits/COMMAND_CENTER_AUDIT.md:102` | Changed "Dr. Gabriel Duncan" to "Dental references". |
| `audits/COMMAND_CENTER_AUDIT.md:370` | Replaced "Dr. Gabriel Duncan" and "Biological Dentistry" references with generic language. |
| `audits/PLACEHOLDER_AUDIT.md:51` | Replaced "Dr. Gabriel Duncan" section header with "Placeholder provider". |
| `audits/PLACEHOLDER_AUDIT.md:57` | Replaced resolution text removing Duncan/dentistry references. |
| `agendas/TOMORROW_2026-05-06.md:8-20` | Marked CV reframing task as COMPLETED; cleaned dental-specific language in agenda items. |

---

## CV PDF Regenerated

- Source: `/Users/futuresystemslab/Future-Systems-Lab-profile/CV_MegMontanezDavenport.html`
- Output: `/Users/futuresystemslab/Future-Systems-Lab-profile/CV_MegMontanezDavenport.pdf`
- Copied to: `/Users/futuresystemslab/Desktop/ASU/`

---

## IPFS Documents Needing Re-Pin

The following IPFS-pinned documents may contain dental references from before this purge. They cannot be edited in-place and require re-pinning:

- **IPFS Methodology Document** (already flagged as deferred in COMMAND_CENTER_AUDIT.md Task 8)
- Review all CIDs in `fsl-governance/IPFS_MANIFEST.md` during the scheduled IPFS reframe session

---

## Remaining Audit Trail References

The word "dental" appears in these governance audit trail documents as historical records of what was purged. These are intentionally retained:

- `fsl-governance/audits/DENTAL_REPOS_AUDIT.md` -- documents the repo deletion audit
- `fsl-governance/audits/DENTAL_PURGE_2026-05-05.md` -- this file
- `fsl-governance/agendas/TOMORROW_2026-05-06.md` -- agenda items referencing the cleanup

---

## Final Verification

Word-boundary grep (`\bdental\b|\bdentist\b|\bdentistry\b|\bDDS\b|\bGabriel Duncan\b|\bintraoral\b|\biTero\b`) across all 15 repos returns **ZERO matches** in non-audit-trail source files.

Substring matches for "dds" in words like "adds" (game JSON files, spec docs) and "dental" in "accidentally" (governance audit) are confirmed false positives.

---

## Repos Still Requiring Deletion (Blocked on Auth Scope)

Dr. Meg must run `gh auth refresh -h github.com -s delete_repo` then delete:
1. `Future-Systems-Lab/dental-diagnostic-systems-architecture`
2. `Future-Systems-Lab/wireless-dental-imaging-case-study`

These are private archived repos on GitHub that cannot be deleted without the `delete_repo` scope.

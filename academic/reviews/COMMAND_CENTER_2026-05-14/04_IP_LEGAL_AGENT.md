# IP/Legal Agent -- FSL Command Center Review

**Date:** 2026-05-14
**Surface:** fsl-command-center.vercel.app (index.html)
**Perspective:** Patent attorney, IP partner, or legal due diligence reviewer

---

## WHAT'S GOOD

1. **Patent Pending is prominently displayed.** "U.S. Provisional Application No. 64/063,037" appears in the hero section (gold text) and again in the footer. Double placement ensures visibility.

2. **Both trademark serials are listed.** Serial 99533250 (Class 42 -- Software/Tech Platform) with publishing date May 19, 2026, and Serial 99821948 (Class 35 -- Online Marketplace/Directory) filed May 13, 2026. Both are in the Public Legitimacy Indicators section.

3. **Assignment ID 1803665 is present.** The patent line reads "Assigned to FSL LLC (ID 1803665)" which confirms the provisional application has been assigned from the individual inventor to the LLC.

4. **EIN 42-2050630 is disclosed.** Entity identified as "Future Systems Lab LLC" in Wyoming. This is appropriate for a legitimacy page.

5. **Filing dates and deadlines are in the timeline table.** Patent non-provisional filing deadline May 2027, patent filed May 11, 2026. The timeline is clear enough for an IP attorney to understand the clock.

6. **IP Registry is linked in the Evidence Vault.** The link goes to fsl-governance/evidence/IP_REGISTRY.md on GitHub.

---

## WHAT'S MISSING

1. **No patent claims summary or scope description.** The provisional application number is listed but there is zero information about what the patent covers. A patent attorney needs at minimum a one-sentence scope: "Covers [X method/system] for [Y purpose]." Without this, the patent pending notice is just a number.

2. **No inventor name on the patent listing.** The assignment says "Assigned to FSL LLC" but does not name the inventor. Is it Dr. Meg alone? Are there co-inventors? This matters for assignment chain verification.

3. **Trademark status detail is insufficient.** Serial 99533250 says "Publishing May 19, 2026" -- does this mean it is in the publication period for opposition? Serial 99821948 says "Filed May 13, 2026" -- has it been assigned to an examiner? An IP reviewer wants status stages (Filed -> Examined -> Published -> Registered).

4. **No trademark word mark or design mark identification.** What is the actual mark? "Future Systems Lab"? "FSL"? "HypnoNeuro"? "EncryptHealth"? The serials are listed but not the marks themselves.

5. **No link to USPTO TSDR or Patent Center.** The trademark serials and patent application are listed as plain text with no hyperlinks to the USPTO Trademark Status and Document Retrieval (TSDR) system or Patent Center where they can be independently verified.

6. **Open-source licensing is not addressed.** Eight PRs are submitted to third-party repos. Five public repos are linked. What license does FSL use? MIT? Apache 2.0? Proprietary? An IP attorney needs to know whether the open-source contributions create licensing obligations that conflict with the patent.

7. **The EIN is public -- this is fine.** EINs are not confidential (they are on tax forms, W-9s, etc.). However, there is no registered agent or formation date listed. An IP partner doing due diligence would want to verify the LLC is in good standing.

8. **No confidentiality or NDA reference for the reviewer surface.** The "Request Reviewer Access" section offers access to "the full evidence portfolio" but does not mention whether reviewers will be asked to sign an NDA or confidentiality agreement before accessing non-public materials.

---

## SPECIFIC ADDITIONS NEEDED

| Priority | Addition |
|----------|----------|
| **CRITICAL** | Add a 1-2 sentence patent scope description: "Provisional application covers [method/system for sovereign data governance using wallet-native consent and on-chain attestation in regulated health environments]" or similar. |
| **HIGH** | Add hyperlinks to USPTO for both trademarks: `https://tsdr.uspto.gov/#caseNumber=99533250&caseSearchType=US_APPLICATION&caseType=DEFAULT` and equivalent for 99821948. |
| **HIGH** | Add a hyperlink or reference for patent verification via USPTO Patent Center. |
| **HIGH** | Name the trademark word marks (e.g., "FUTURE SYSTEMS LAB" Class 42, "FUTURE SYSTEMS LAB" Class 35 or whatever the actual marks are). |
| **MEDIUM** | Add inventor name to the patent listing. |
| **MEDIUM** | State the open-source license used for FSL public repos and confirm no conflict with patent claims. |
| **MEDIUM** | Add LLC formation date and state of good standing, or link to Wyoming Secretary of State business search. |
| **LOW** | Add NDA/confidentiality note to the reviewer access section: "Reviewers may be asked to execute a mutual NDA before accessing non-public technical documentation." |
| **LOW** | Add trademark status stages (Filed / Examined / Published / Registered) for clarity. |

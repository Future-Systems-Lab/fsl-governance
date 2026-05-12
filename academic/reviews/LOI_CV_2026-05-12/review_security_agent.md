# Security Agent Review — LOI & CV (ASU DEng Application)

**Reviewer:** Security Agent
**Date:** 2026-05-12
**Documents:** LOI_ASU_DEng_text.md, CV_MegMontanezDavenport.html

---

## Document 1: Letter of Intent (LOI)

### VERDICT: PASS

### Critical Issues
None.

### High Issues
None.

### Medium Issues

1. **EIP-191 claim is technically imprecise.** The LOI references "EIP-191 wallet-gated consent architecture" (via the CV/platform description) but does not explicitly appear in the LOI text itself. The LOI describes "wallet-gated" and "cryptographic permission" without specifying EIP-191 by name. This is acceptable for the LOI context -- the claim is directional rather than technical, and avoids overclaiming a specific standard in a narrative document. No action required, but note the CV carries the burden of technical precision here.

2. **"On-chain guarantee" language (line 39).** The phrase "it is an on-chain guarantee" for consent governance is strong. On Sepolia testnet, this is technically an on-testnet guarantee with no economic finality. The LOI does disclose Sepolia deployment elsewhere (line 41), but the "guarantee" language in the privacy section does not qualify the testnet status. Recommend softening to "on-chain enforcement" or adding a testnet qualifier in context.

### Low Issues

1. **Patent number referenced correctly.** U.S. Provisional Patent Application No. 64/063,037, filed 11 May 2026, is consistently cited. Provisional patent format and number structure are plausible. No overclaim -- correctly identified as "provisional."

2. **No exposed credentials or keys.** Email address (proton.me) is intentional contact info, not a credential leak. No API keys, private keys, seed phrases, or secrets present.

3. **HIPAA positioning is correct.** The LOI states the system uses "HIPAA-regulated behavioral health as the highest-bar test case" while clarifying "FSL itself holds no Protected Health Information by architectural design" (line 50). This is the correct "outside scope" framing -- it does not claim HIPAA compliance, it claims architectural avoidance of PHI, which means HIPAA does not apply. This is the strongest possible security posture for this design pattern.

4. **IP exposure is appropriate.** The LOI describes architectural patterns (consent-first, wallet-gated, decentralized governance) without exposing implementation details (contract logic, key management schemes, specific cryptographic flows). Patent-safe.

### Done Well
- HIPAA framing is precisely correct: "outside scope by architectural design" rather than claiming compliance. This is a meaningful security distinction that many applicants get wrong.
- No overclaiming of security properties. Claims are bounded: "testnet," "provisional patent," "proving ground." The LOI does not assert production-grade security or mainnet deployment.
- Zero-PHI architecture is described as a design choice, not an accident -- this demonstrates security-by-design thinking.
- Patent 64/063,037 is referenced consistently and correctly as provisional.

### Unique Perspective
The LOI's strongest security insight is the reframing of HIPAA from a compliance target to a scope-avoidance strategy. Most health-tech applications treat HIPAA compliance as a badge; this LOI argues that never holding PHI is architecturally superior to protecting PHI you do hold. From a security standpoint, this is correct -- the best data protection is not collecting the data. This positions the applicant as someone who understands threat modeling at the architectural level rather than the checklist level.

---

## Document 2: Curriculum Vitae (CV)

### VERDICT: PASS

### Critical Issues
None.

### High Issues

1. **Ethereum wallet addresses and contract addresses are publicly exposed.** Eight Sepolia contract addresses and two wallet addresses are listed with Blockscout links. Since these are testnet addresses with no mainnet economic value, this is **acceptable** for an academic CV. However, if any of these addresses are reused on mainnet in the future, this CV creates a permanent public linkage between the applicant's identity and on-chain activity. **Recommendation:** Add a note or maintain awareness that testnet addresses should not be reused on mainnet if pseudonymity is desired.

### Medium Issues

1. **EIP-191 claim accuracy.** The CV references "EIP-191 wallet-gated consent architecture" in the summary and "EIP-191 Consent Architecture" as a manuscript title. EIP-191 is a signed data standard (prefixed message signing, `\x19Ethereum Signed Message:\n`). Using it for consent attestation is a valid application -- wallet holders sign a message attesting consent, and the signature is verifiable on-chain. The claim is technically sound. The CV also mentions "EIP-712" in the Secure Health Login project and "EIP-6963" in skills tags. EIP-712 (typed structured data signing) is the more modern standard for structured consent messages; the CV correctly differentiates between EIP-191 (SovereignLedger consent) and EIP-712 (practitioner login). No overclaim detected.

2. **EIN publicly listed.** The CV includes EIN 42-2050630. This is a public record for LLCs but including it on a CV is unusual and marginally increases social engineering surface. Low risk but unnecessary for an academic document.

3. **NPI number publicly listed (1497696264).** NPI numbers are public via NPPES lookup, so this is not a leak. However, NPI combined with full name and location creates a rich identity anchor. Acceptable for a professional CV but worth noting.

### Low Issues

1. **No private keys, API keys, or secrets exposed.** Clean.

2. **No server IPs or infrastructure details exposed.** VPS is referenced as "OpenClaw VPS" without IP addresses or SSH details. Correct operational security.

3. **HIPAA framing is consistent with LOI.** The CV states: "FSL's infrastructure operates outside HIPAA scope by architectural design, holding no PHI" and "a stronger architectural position than compliance, because the regulation doesn't apply when the system never holds the protected data." This is the correct framing -- "outside scope," not "compliant." Consistent across both documents.

4. **Patent 64/063,037 referenced correctly.** Matches LOI. Provisional status correctly indicated. Title is disclosed ("System and Method for Sovereign Data Governance via Wallet-Signed Consent Attestation in a Zero-PHI Behavioral Health Architecture") which is standard for provisional applications in academic CVs.

5. **"Certified Smart Contract Auditor" listed.** This is a Blockchain Council credential. The CV does not overclaim it as equivalent to a Trail of Bits or OpenZeppelin audit engagement. Appropriate.

6. **SSH Ed25519 listed as a skill tag.** This is an authentication method, not a credential exposure. Appropriate.

### Done Well
- Clean separation between testnet and production claims. No assertion of mainnet deployment.
- EIP-191 and EIP-712 are correctly differentiated by use case (consent attestation vs. structured login).
- HIPAA language is identical in framing to the LOI -- "outside scope by architectural design." No drift between documents.
- Smart contract addresses are verifiable via Blockscout links, supporting claims with on-chain evidence without exposing private infrastructure.
- No overclaiming of security certifications. CISA is listed as Packt (a course provider), not as the ISACA CISA professional certification. Honest representation.
- Patent title disclosure is appropriate for an academic CV and does not expose implementation-level IP beyond the architectural pattern.

### Unique Perspective
The CV's most notable security property is its verifiability surface. By publishing eight testnet contract addresses with block explorer links, every deployment claim can be independently confirmed on-chain. This is unusual for an academic CV and represents a higher standard of evidence than most applicants provide. The security trade-off (identity-address linkage) is acceptable given the testnet context and the applicant's choice to operate under real identity rather than pseudonymously. The consistent "outside HIPAA scope" language across both documents demonstrates disciplined messaging -- the applicant has clearly thought about the legal and security implications of this architectural choice and maintains the distinction rigorously.

---

## Cross-Document Consistency Check

| Claim | LOI | CV | Consistent? |
|---|---|---|---|
| Patent 64/063,037 | Filed 11 May 2026 | Filed 11 May 2026, sole inventor | Yes |
| HIPAA posture | Outside scope, no PHI | Outside scope by design, no PHI | Yes |
| Smart contracts on Sepolia | 8 contracts | 8 contracts with addresses | Yes |
| EIP-191 consent | Implied (wallet-gated, cryptographic) | Explicitly named | Yes |
| Trademark Serial No. | 99533250 | 99533250 | Yes |
| NPI | 1497696264 | 1497696264 | Yes |

No contradictions detected between documents.

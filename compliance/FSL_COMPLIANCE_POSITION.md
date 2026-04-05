---

## Video Session HIPAA Compliance

### Infrastructure
FSL uses Doxy.me (doxy.me) as the video conferencing infrastructure for sovereign wellness sessions between practitioners and participants. Doxy.me provides free HIPAA-compliant telehealth video with a signed BAA at no cost.

### HIPAA Compliance Measures
- **BAA:** Business Associate Agreement signed with Doxy.me (free, included with account)
- **Encryption:** 128-bit AES encryption for video/audio
- **Data Retention:** Doxy.me does not store session video
- **Room Privacy:** Each practitioner has a permanent private room URL
- **Access:** Browser-based, no software download required
- **Recording:** Disabled by default
- **Audit Logging:** Session start/end timestamps logged via SovereignLedger contract

### Data Flow
1. Practitioner clicks "Start Session" → opens their Doxy.me room (e.g. https://doxy.me/hypnosispsych)
2. Participant joins via practitioner's Doxy.me room URL (no download required)
3. Session conducts via encrypted browser-based video
4. Session ends → practitioner closes room
5. Session attestation hash written to SovereignLedger contract (Sepolia)
6. Superbill auto-generates with session metadata (no PHI in superbill)
7. Doxy.me does not retain session data

### Practitioner Responsibility
Each practitioner acknowledges HIPAA responsibilities during onboarding via wallet signature, recorded on SovereignLedger contract.

### Current Status
- Doxy.me rooms: Pending practitioner setup (https://doxy.me/hypnosispsych, etc.)
- HIPAA mode: Available at no cost
- BAA: Available at no cost during signup
- Technical implementation: Ready

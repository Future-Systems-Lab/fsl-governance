# FSL Daily.co HIPAA Compliance Guide

## Overview

Future Systems Lab uses Daily.co for sovereign video wellness sessions between practitioners and participants. Before any real participant sessions can occur, HIPAA compliance must be established.

## Why HIPAA Compliance is Required

FSL practitioners conduct wellness sessions that may involve discussion of health-related topics. While FSL uses sovereign wellness language (not clinical diagnostic language), the video infrastructure must meet HIPAA standards to protect participant privacy and satisfy practitioner licensing requirements.

## Daily.co HIPAA Plan

- **URL:** https://www.daily.co/hipaa
- **What it provides:**
  - End-to-end encrypted video and audio (in transit and at rest)
  - No data retention by Daily.co after session ends
  - Signed Business Associate Agreement (BAA)
  - HIPAA-compliant room configurations
  - Audit logs of all sessions
  - SOC 2 Type II compliance
- **Estimated pricing:** $99-299/month depending on usage tier (verify current pricing at daily.co/pricing)

## Steps for Dr. Meg to Complete

### Step 1: Upgrade Daily.co Account
1. Log in to https://dashboard.daily.co with futuresystemslab.daily.co credentials
2. Navigate to Billing → Upgrade Plan
3. Select the HIPAA-compliant plan tier
4. Enter payment information

### Step 2: Sign BAA
1. After upgrading, navigate to Settings → HIPAA
2. Review the Business Associate Agreement
3. Sign electronically
4. Download a copy for FSL records
5. Store signed BAA in ~/HypnoNeuro/docs/legal/

### Step 3: Enable HIPAA Mode
1. In Daily.co dashboard → Settings → HIPAA
2. Toggle "HIPAA Mode" to ON
3. This enforces: private rooms only, no recording by default, auto-expiry

### Step 4: Update Room Creation Settings
All rooms created via API must include:
```json
{
  "privacy": "private",
  "properties": {
    "enable_recording": false,
    "enable_chat": true,
    "enable_screenshare": false,
    "exp": 1234567890,
    "eject_at_room_exp": true
  }
}
```

### Step 5: Practitioner BAA Acknowledgment
- Each practitioner must acknowledge BAA during onboarding
- Wallet signature required
- Acknowledgment recorded on SovereignLedger contract

## Compliance Position

- FSL LLC (Wyoming entity) operates as a wellness platform, not a covered entity under HIPAA
- However, practitioners on the platform may be covered entities
- The BAA with Daily.co protects all parties
- Session data is encrypted, not retained by Daily.co, and audit-logged
- FSL SovereignLedger contract records session attestations (hashes only, no PHI)

## Current Status

| Item | Status |
|------|--------|
| Daily.co subdomain | ✅ Active (futuresystemslab.daily.co) |
| HIPAA plan upgrade | ❌ Pending Dr. Meg action |
| BAA signed | ❌ Pending |
| HIPAA mode enabled | ❌ Pending |
| Room creation API updated | ✅ Code ready (needs HIPAA plan active) |
| Practitioner BAA step | ✅ Code ready (in onboarding flow) |

*Last updated: April 3, 2026*

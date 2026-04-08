# FSL Agent Council — Dashboard Redesign
**Date:** 2026-04-07
**Status:** Awaiting Dr. Meg approval before build
**Council:** frontend_agent, natpsy_agent, hypnoneuro_agent, system_architect_agent, compliance_agent

---

## Frontend Agent Response:

**Above the fold (mobile first priority):**

1. **Header Bar**: Participant name + "Health Record" + Settings gear
2. **Clinical Summary Card** (full width):
   - Current Health Status: "Stable" / "Monitoring" / "Active Care"
   - Last Session: Date + Practitioner
   - Next Appointment: Date + Type
   - Primary Concern: Single line text

3. **Vital Metrics Grid** (2x2):
   - Sleep Quality: 7-day average
   - Stress Response: HRV trend
   - Mood Stability: 30-day pattern
   - Energy Levels: Weekly average

**Below the fold:**
- Recent Sessions (list view)
- Treatment Notes
- Data Sovereignty Status

**Remove entirely:**
- Vitality Score circle
- NFTs Earned
- Quick Actions grid
- Activity Feed

**Visual hierarchy:** Dark background, thin white borders, data in clean tables. Numbers large, labels small. FSL aqua only for active states and CTAs.

---

## NatPsy Agent Response:

**Critical health data for practitioner view:**

1. **Baseline Assessments**:
   - PHQ-9 trend (depression)
   - GAD-7 trend (anxiety)
   - Sleep quality index
   - Nutritional compliance %

2. **Progress Indicators**:
   - Days in program
   - Session completion rate
   - Self-reported improvement areas
   - Supplement protocol adherence

3. **Clinical Observations**:
   - Mood stability over time (line graph, not emojis)
   - Energy/fatigue patterns
   - Cognitive clarity self-reports
   - Physical symptom tracker

**Language shift:**
- "Sessions completed" -> "Treatment sessions"
- "Mood tracking" -> "Emotional regulation data"
- "Points/scores" -> "Clinical metrics"

---

## HypnoNeuro Agent Response:

**Session display format:**

```
TREATMENT SESSION RECORD
Date: 2024-01-15 | Duration: 45 min
Protocol: Anxiety Reduction Series 3/8
Practitioner: Dr. Margaret Thompson

Objective Metrics:
- HRV Coherence: 78%
- Breathing Rate: 6 bpm
- Session Depth: Theta-dominant

Subjective Report:
- Pre-session anxiety: 7/10
- Post-session: 3/10
- Integration notes logged

Next Session: 2024-01-22
Protocol continuation recommended
```

**Remove:** Stars, badges, "achievements"
**Add:** Clinical protocol names, objective biometrics, pre/post assessments

---

## System Architect Agent Response:

**Layout Structure:**

```
Desktop: Left metrics panel (280px fixed) + scrollable treatment timeline
Mobile: Single column, collapsible sections
Navigation: Top bar only, no bottom nav
Cards: Flat design, 1px borders, 8px radius max
```

**Data architecture:**
- Hierarchical: Summary -> Details -> Raw Data
- Time-based organization (most recent first)
- Clinical categories, not feature categories

---

## Compliance Agent Response:

**Required sovereignty indicators:**

1. **Data Ownership Badge** (top right):
   - "Your Data - Your Keys" with lock icon
   - Subtle, not prominent

2. **Export Controls** (in settings):
   - Download full health record (JSON/PDF)
   - Attestation certificates
   - Session transcripts

3. **Billing Transparency**:
   - "Sovereign Billing" -> "Payment History"
   - Show: Date, Amount, Service
   - Hide: Blockchain details unless requested

4. **Privacy Status**:
   - Small indicator: "E2E Encrypted"
   - IPFS backup status (icon only)
   - Last sync timestamp

**Compliance text:** Small footer link to "Data Rights and Privacy Policy"

**Remove:** HNT balance from main view (move to billing section), NFT language entirely

---

## Summary of Council Consensus

### REMOVE from dashboard:
- Vitality Score circle
- NFTs Earned card
- HNT Balance from main view (move to billing)
- Mood emoji buttons
- Quick Actions grid
- "Frequency Portal Activity" card
- Gamified language throughout

### ADD to dashboard:
- Clinical Summary Card (health status, last/next session, primary concern)
- Vital Metrics Grid (sleep, stress, mood stability, energy)
- Treatment Session Timeline (clinical format, not game scores)
- Baseline Assessment trends (PHQ-9, GAD-7)
- Subtle data ownership indicator (top right)

### LANGUAGE CHANGES:
- "Sessions" -> "Treatment Sessions"
- "Mood tracking" -> "Emotional Regulation Data"
- "Vitality Score" -> removed
- "Sovereign Billing" -> "Payment History"
- "Start Session" -> "Schedule Appointment"
- "Launch HypnoNeuro" -> "Therapeutic Protocols"

### LAYOUT:
- Desktop: Left metrics panel (280px fixed) + scrollable treatment timeline
- Mobile: Single column, clinical summary above fold
- Top bar navigation only
- Flat cards, 1px borders, 8px radius max
- Dark #030B0F, aqua #00D9FF for active states only

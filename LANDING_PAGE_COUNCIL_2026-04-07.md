# Landing Page Council Assessment
**Date:** 2026-04-07
**Agents:** system_architect, frontend, compliance

---

## SYSTEM_ARCHITECT

**Above the fold (mobile):**
- Animated logo (reduced size)
- One-line tagline
- Single primary CTA button
- Trust indicator (e.g., "HIPAA Compliant")

**Optimal 3-scroll structure:**
1. **Scroll 1**: Hero + Core value prop (3 platform cards max)
2. **Scroll 2**: Social proof + Single conversion path
3. **Scroll 3**: Compliance footer + secondary links

**5 Recommendations:**
1. Consolidate 5 platforms into 3 flagship offerings - users can't process 5 choices
2. Move smart contract addresses to separate technical docs page
3. Implement progressive disclosure - details load on user interaction, not by default
4. Cache and lazy-load all below-fold content
5. Create separate landing pages for each user type (patient vs practitioner)

---

## FRONTEND

**Sections to cut entirely:**
- Sovereignty philosophy (move to About page)
- Smart contract addresses (technical docs)
- Insurance/HSA education (separate resource page)
- Team/founder section (move to About)

**Sections to collapse:**
- 5 platforms → 3 icon cards with hover expand
- Subscription tiers → "See Pricing" link

**Single CTA:** "Start Your Mental Wellness Journey" → leads to platform selector

**5 Recommendations:**
1. Replace text-heavy sections with icons + 5-word descriptions
2. Implement "Learn More" expandable cards instead of static content
3. Remove all scroll-jacking animations that slow page consumption
4. Use floating CTA that follows scroll after 50% page depth
5. Create 15-second value prop video to replace 3+ text sections

---

## COMPLIANCE

**Must stay on main page:**
- HIPAA compliance badge/statement
- "Not medical advice" disclaimer
- Link to Terms of Service
- Link to Privacy Policy
- Age restriction notice (if applicable)

**Required disclaimers:**
- Healthcare disclaimer in footer (can be small text)
- Cryptocurrency/payment risk disclosure near any pricing
- Data processing location disclosure

**5 Recommendations:**
1. Consolidate all legal links in expandable footer section
2. Add single-line disclaimer below fold: "Healthcare services provided by licensed practitioners. Not medical advice."
3. Include "By using this site..." passive consent banner for terms
4. Move detailed compliance info to dedicated /legal subdirectory
5. Add practitioner verification badge/link near any provider claims
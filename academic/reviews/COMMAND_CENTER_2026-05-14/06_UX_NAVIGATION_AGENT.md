# UX/Navigation Agent -- FSL Command Center Review

**Date:** 2026-05-14
**Surface:** fsl-command-center.vercel.app (index.html)
**Perspective:** UX evaluator assessing scannability, navigation, mobile responsiveness, and information findability

---

## WHAT'S GOOD

1. **Sticky nav bar with section anchors.** The nav bar is fixed at the top with links to Academic, OSS, Ecosystem, Platforms, Contracts, Games, and Roadmap. It persists on scroll.

2. **Contracts are findable in under 10 seconds.** The nav has a "Contracts" link that jumps directly to the table. The table is clean with address, purpose, and explorer link columns.

3. **Section numbering provides orientation.** Sections are numbered (02, 03, 04, 05, 06, 08, 12) giving the reader a sense of progression, though the numbering gaps may cause confusion (see below).

4. **Status badges are consistent and color-coded.** Green "Live," amber "In Development"/"Scaffolded," red unused but reserved. The visual language is clear.

5. **Dark theme with high-contrast accents.** Aqua (#00D9FF), green (#22CC66), amber (#FFB400), violet (#7B2FBE), and gold (#FFD700) against a dark background (#050c17) provides good readability.

6. **Mobile responsive CSS is present.** The `@media(max-width:768px)` rules adjust the stat grid to 2 columns and the card grid to single column. Table overflow-x is enabled.

7. **Crypto ticker adds visual dynamism.** XRP, XLM, HBAR, ALGO, ADA, ETH, BTC prices with 24h change create a professional fintech aesthetic.

8. **Card-grid layout is well-structured.** The card-grid using `grid-template-columns: repeat(auto-fill, minmax(260px, 1fr))` adapts cleanly to different viewport widths.

---

## WHAT'S MISSING

1. **Section numbering is inconsistent.** The sections jump from 06 (Contracts) to 08 (Wellness Games) to 12 (Sprint History), then unnumbered sections (Legitimacy, Verify, Evidence). This suggests sections were removed or reordered without renumbering. It looks unfinished.

2. **Dr. Meg's credentials are only in the footer.** A visitor looking for "who built this" must scroll to the very bottom. There is no "About" section, no founder bio card, and no credentials in the hero or above-the-fold area.

3. **No "Back to Top" button or section progress indicator.** The page is long (400+ lines of rendered content). Once a visitor scrolls past the nav, there is no quick way to return to the top except scrolling.

4. **The nav does not cover all sections.** The nav has links for Academic, OSS, Ecosystem, Platforms, Contracts, Games, and Roadmap -- but NOT for Legitimacy Indicators, Verify On-Chain, or Evidence Vault. These sections are unreachable from the nav.

5. **No quick-restore or emergency buttons at the bottom.** The user specifically asked about these. There are no "restore" or "emergency" action buttons in the footer or anywhere else on the page.

6. **The wallet hint popup positioning is fragile.** The hint div uses `margin-top:220px` with absolute positioning, which will misalign on different screen sizes. The mobile override (`position:relative; margin-top:8px`) helps but the desktop positioning is brittle.

7. **Dead link risk: /reviewer.** The nav area links to `/reviewer` but there is no indication whether this route exists on the deployed Vercel site. If it 404s, this is a dead link visible to every reviewer who clicks it.

8. **The hero section is text-heavy.** Between the title, subtitle, tagline, patent pending notice, testnet badge, wallet button, wallet hint, and wallet-gated notice, the hero has 7 distinct text elements. This reduces scannability.

9. **Tables on mobile are scroll-dependent.** The contracts table has 4 columns (Contract, Address, Purpose, Explorer) and the address column uses monospace 0.65rem font. On mobile, horizontal scrolling is enabled but the UX is poor -- the user may not realize the table scrolls.

10. **Evidence Vault and Verify sections are outside the container div.** The `</div>` closing the container appears at line 382, but the Verify and Evidence sections start at lines 385 and 405 respectively. This means these sections have no max-width constraint and will render full-width on large screens, breaking the visual consistency.

11. **Section ordering logic is unclear.** The current order is: Academic Note -> Thesis -> Research/IP -> Disclaimer -> OSS -> Ecosystem -> Platforms -> Contracts -> Games -> Sprint History -> Legitimacy -> Verify -> Evidence. The disclaimer at position 4 interrupts the research flow. Legitimacy indicators at position 11 are buried.

---

## SPECIFIC ADDITIONS NEEDED

| Priority | Addition |
|----------|----------|
| **CRITICAL** | Fix the container div: move Verify On-Chain and Evidence Vault sections INSIDE the container, or add a separate max-width container wrapper. They currently render outside the 1200px constraint. |
| **HIGH** | Add nav links for Legitimacy, Verify, and Evidence sections. All 13 sections should be navigable from the sticky nav. |
| **HIGH** | Renumber sections sequentially (01-13) or remove numbering entirely. The gaps (06 -> 08 -> 12 -> unnumbered) look like a bug. |
| **HIGH** | Add credentials/founder info above the fold -- either in the hero or in the academic reviewer note. Do not rely on the footer for this. |
| **MEDIUM** | Verify that /reviewer route is live on Vercel. If it 404s, either deploy it or remove the link. |
| **MEDIUM** | Add a "Back to Top" button, either floating or at the bottom of each major section. |
| **MEDIUM** | Fix the wallet hint popup positioning: use CSS anchoring or a proper tooltip library instead of hardcoded margin-top. |
| **MEDIUM** | Move Legitimacy Indicators higher in the page -- before or immediately after the Disclaimer. Credentials and legitimacy should be visible early. |
| **LOW** | Add quick-restore/emergency buttons to the footer if they are part of the intended design. |
| **LOW** | Consider a mobile-friendly contracts display: stacked cards instead of a horizontal-scroll table. |
| **LOW** | Reduce hero text density: consolidate the testnet badge and wallet-gated notice into one element. |

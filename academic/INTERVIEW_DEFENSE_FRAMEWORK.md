# ASU DEng Interview Defense Framework
## "Isn't this scope too broad?" — How to Respond

**Status:** Stage 2 Prep (post-acceptance interview practice)
**Last Updated:** April 28, 2026

---

## The Question in Various Forms

- "Isn't this scope too broad?"
- "How can one architecture work for healthcare AND finance AND government?"
- "Aren't you overreaching by claiming generalizability?"
- "Why should we believe this scales beyond mental health?"

---

## Defense Structure — Three Layers

### Layer 1: Demonstrated Architectural Patterns (Not Theory)

> "I'm not theorizing about this — I've built it. Eight smart contracts are live on Sepolia. The architecture I'm describing exists in production. The same consent-first, wallet-gated, decentralized pattern that handles a participant's mental health session in HypnoNeuro is the same pattern that handles their session attestation in SovereignLedger, the same pattern that handles their shadow integration record in AlchemistForge, and the same pattern that handles their tier credentialing in SovereignAchievement. Five different use cases — same architectural primitives. That's not aspiration; that's a documented design pattern under load."

**Evidence to point to:**
- 8 deployed contracts on Sepolia (links in CV)
- 5 live platforms
- Routescan/Blockscout verifications

### Layer 2: Pattern Already Proven in Adjacent Domains

> "The components I'm using aren't novel inventions. Wallet-based identity is proven in DeFi handling billions in value. Consent receipts are proven in DIF Presentation Exchange. ERC-721/1155 soulbound credentialing is proven in Ethereum identity systems. IPFS content addressing is proven in distributed file systems. What FSL contributes is the integration pattern — composing these primitives into a coherent governance architecture for sensitive personal data. The DEng applied project formalizes that integration pattern so other domains can adopt it."

**Evidence to point to:**
- Open-source PR contributions (8 PRs on EIPs, OpenZeppelin, Hyperledger, etc.)
- DIF Presentation Exchange #486 (consent example)
- Cross-protocol composition in FSL stack

### Layer 3: Mental Health as Deliberate Stress Test

> "I chose behavioral health deliberately as the proving ground because if the architecture holds here — where stigma is highest, consent is most complex, regulatory burden is highest under HIPAA and 42 CFR Part 2, and the human cost of failure is measured in lives — it holds for any domain with lower stakes. A system that protects mental health records protects medical records. A system that handles complex behavioral consent handles informed consent in clinical trials. A system that survives the trust requirements of trauma survivors survives the trust requirements of any institution. That's stress-testing, not overreach."

**Why mental health is the hardest case:**
- Highest stigma stakes (employment, custody, security clearance)
- Most sensitive PHI (42 CFR Part 2 extra federal protection)
- Lowest patient power during acute episodes
- Highest crisis frequency with lethal consequences
- Most complex consent (capacity, court-ordered, family)
- Most interoperability failures even within same health system

---

## The Reverse Move — Turn the Question Back

> "What I'd actually argue is the opposite of overreach: every domain you mentioned — finance, government, education, healthcare — is already failing the same way for the same architectural reason. Centralized custody of sensitive data, breached repeatedly, with individuals having no recourse. The question isn't whether one architecture can address them. The question is why we keep building the same broken pattern. My applied project is documenting the proof that we don't have to."

---

## Concrete Cross-Sector Examples

| Breach | Year | Records | Same Pattern Failing |
|--------|------|---------|----------------------|
| Equifax | 2017 | 147M | Centralized credit data |
| Anthem | 2015 | 78M | Centralized health data |
| SolarWinds | 2020 | Federal+ | Centralized supply chain trust |
| Stryker | 2025 | Medical devices | Centralized medical device data |

Each = the same architectural pattern failing.
FSL = the alternative pattern, demonstrated.

---

## Confidence Frame for Delivery

**DON'T:** Defend defensively or apologize for scope.

**DO:** Speak as someone who has already built the proof and is offering to document it for the field. The DEng isn't validation of an idea — it's the academic discipline applied to existing infrastructure.

---

## Practice Notes

- Read these out loud until the cadence is natural
- Memorize the three-layer structure (demonstrated → proven primitives → stress test)
- Have at least one concrete example ready per layer
- Watch for the "scope too broad" question phrased indirectly ("interesting that you chose...", "how does this scale...", "what about regulatory differences across sectors...")
- Default response pattern: "Three things to that — first, demonstrated; second, proven primitives; third, stress test"

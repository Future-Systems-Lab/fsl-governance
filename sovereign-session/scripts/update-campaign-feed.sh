#!/bin/bash
# Update canonical/campaign-feed.json with today's AlchemistForge content
# Cron: 0 1 * * * (runs at 01:00 UTC, after 8 PM EST campaign posts)
# Requires: git credentials configured on VPS

set -uo pipefail

CANONICAL_DIR="/root/fsl-governance/canonical"
FEED_FILE="$CANONICAL_DIR/campaign-feed.json"
DATE=$(date -u +"%Y-%m-%d")
TS=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

# Campaign quotes — rotating daily. Campaign engine can override this file directly.
# For now, seed with curated shadow integration quotes.
QUOTES=(
  "The shadow you refuse to face becomes the wall you cannot see. Name it. The blockchain remembers what you chose to transmute."
  "Sovereignty begins where compliance ends. You don't need permission to own your own experience."
  "Every wallet signature is a declaration of authorship. You signed your shadow. You own your transformation."
  "The proving ground chose behavioral health because the stakes are highest where stigma meets data sovereignty."
  "Your frequency is not a diagnosis. It is a direction. GABA, serotonin, dopamine — all paths home."
  "The system that failed EJ was centralized. The system we build is sovereign. Every session attested. Every record yours."
  "Transmutation is not therapy. It is architecture. The contract enforces what the institution cannot — permanent proof you showed up."
)

THEMES=("Shadow Integration" "Sovereignty" "On-Chain Identity" "Proving Ground" "Frequency Alignment" "Origin Story" "Architecture as Ritual")

# Pick today's quote based on day of year
DAY_OF_YEAR=$(date +%j)
IDX=$((DAY_OF_YEAR % ${#QUOTES[@]}))

cat > "$FEED_FILE" << FEED
{
  "date": "$DATE",
  "quote": "${QUOTES[$IDX]}",
  "theme": "${THEMES[$IDX]}",
  "sigil": "\u26CE",
  "source": "AlchemistForge daily campaign",
  "fallback_quote": "You are the sovereign of your own experience. What you transmute becomes your story.",
  "last_updated": "$TS"
}
FEED

# Commit and push
cd /root/fsl-governance
git add canonical/campaign-feed.json
git commit --author="Meg Montañez-Davenport <future.systems.lab@proton.me>" -m "Daily campaign feed update — $DATE" --allow-empty 2>/dev/null
git push 2>/dev/null

echo "[$(date -u)] Campaign feed updated: ${THEMES[$IDX]}" >> /opt/sovereign-session/logs/campaign-feed.log

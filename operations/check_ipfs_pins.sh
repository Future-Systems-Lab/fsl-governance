#!/bin/bash
# FSL IPFS Pin Health Check
# Run monthly via cron: 0 0 1 * * /path/to/check_ipfs_pins.sh
# Sends Telegram alert if any pin is unreachable

TELEGRAM_BOT_TOKEN="${TELEGRAM_BOT_TOKEN}"
TELEGRAM_CHAT_ID="${TELEGRAM_CHAT_ID}"

# Known CIDs to check
CIDS=(
  "QmNUhpwRPrZd5Vk6wLy4pAhFBz3fWYWntKkHC5LXMyCmXu|BHTY_PAPER_v2"
)

GATEWAYS=(
  "https://gateway.pinata.cloud/ipfs"
  "https://ipfs.io/ipfs"
)

FAILURES=""

for entry in "${CIDS[@]}"; do
  CID="${entry%%|*}"
  NAME="${entry##*|}"
  for GW in "${GATEWAYS[@]}"; do
    STATUS=$(curl -s -o /dev/null -w "%{http_code}" --max-time 30 "$GW/$CID")
    if [ "$STATUS" != "200" ]; then
      FAILURES="$FAILURES\n❌ $NAME ($CID) — $GW returned $STATUS"
      echo "FAIL: $NAME at $GW — HTTP $STATUS"
    else
      echo "OK: $NAME at $GW — HTTP 200"
    fi
  done
done

if [ -n "$FAILURES" ]; then
  MSG="🚨 FSL IPFS Pin Health Check FAILED\n$FAILURES\n\nRun: check_ipfs_pins.sh for details"
  if [ -n "$TELEGRAM_BOT_TOKEN" ] && [ -n "$TELEGRAM_CHAT_ID" ]; then
    curl -s -X POST "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/sendMessage" \
      -d "chat_id=$TELEGRAM_CHAT_ID" \
      -d "text=$MSG" \
      -d "parse_mode=HTML" > /dev/null
    echo "Telegram alert sent"
  else
    echo "WARNING: Telegram credentials not set — alert not sent"
  fi
  exit 1
else
  echo "All IPFS pins healthy"
  exit 0
fi

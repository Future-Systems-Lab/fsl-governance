#!/bin/bash
# SovereignSession Browser Compatibility Matrix — Nightly Runner
# Cron: 0 4 * * * /opt/sovereign-session/tests/run-matrix.sh
# Runs at 04:00 UTC after security sweep (03:00) and digest (03:00)

set -uo pipefail

export SESSION_URL="${SESSION_URL:-https://session.futuresystemslab.io}"
export SCREENSHOT_DIR="/tmp/sovereign-session-browser-tests"
export NODE_ENV=test

# Load Telegram creds
export $(grep -v '^#' /opt/encrypthealth/.env | grep -E '^(TELEGRAM_BOT_TOKEN|TELEGRAM_CHAT_ID)=' | xargs) 2>/dev/null

LOGDIR="/opt/sovereign-session/logs"
LOGFILE="${LOGDIR}/browser-matrix-$(date -u +%Y%m%d).log"
mkdir -p "$SCREENSHOT_DIR" "$LOGDIR"

echo "[$(date -u)] Starting browser matrix test" >> "$LOGFILE"

cd /opt/sovereign-session

# Run Playwright tests
npx playwright test tests/sovereign-session/browser-matrix.spec.js \
  --reporter=list \
  --timeout=60000 \
  2>&1 | tee -a "$LOGFILE"

EXIT_CODE=${PIPESTATUS[0]}

# Count results
PASS_COUNT=$(grep -c "PASS" "$LOGFILE" || true)
FAIL_COUNT=$(grep -c "FAIL\|ERROR" "$LOGFILE" || true)

echo "[$(date -u)] Complete: exit=$EXIT_CODE pass=$PASS_COUNT fail=$FAIL_COUNT" >> "$LOGFILE"

# Send Telegram alert on failure
if [ "$EXIT_CODE" -ne 0 ] && [ -n "${TELEGRAM_BOT_TOKEN:-}" ]; then
  FAIL_SUMMARY=$(grep -E "FAIL|ERROR|✗" "$LOGFILE" | tail -5 | head -c 500)
  curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
    -H "Content-Type: application/json" \
    -d "{\"chat_id\":${TELEGRAM_CHAT_ID},\"text\":\"Browser matrix test FAILED ($FAIL_COUNT failures)\n\n${FAIL_SUMMARY}\"}" > /dev/null 2>&1
fi

# Rotate old screenshots (keep 7 days)
find "$SCREENSHOT_DIR" -name "*.png" -mtime +7 -delete 2>/dev/null

exit $EXIT_CODE

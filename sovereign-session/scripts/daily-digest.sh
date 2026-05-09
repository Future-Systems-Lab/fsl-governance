#!/bin/bash
# FSL Daily Sprint Digest — Telegram report via FSL Agent Gateway Bot
# Cron: 0 3 * * * /opt/sovereign-session/scripts/daily-digest.sh
# Runs at 03:00 UTC alongside security sweep
# Uses TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID from /opt/encrypthealth/.env

set -uo pipefail

# Load env
export $(grep -v '^#' /opt/encrypthealth/.env | grep -E '^(TELEGRAM_BOT_TOKEN|TELEGRAM_CHAT_ID)=' | xargs) 2>/dev/null

if [ -z "${TELEGRAM_BOT_TOKEN:-}" ] || [ -z "${TELEGRAM_CHAT_ID:-}" ]; then
  echo "[$(date -u)] ERROR: Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID" >> /opt/sovereign-session/logs/digest.log
  exit 1
fi

DATE=$(date -u +"%Y-%m-%d")
CHAT_ID="${TELEGRAM_CHAT_ID}"

# --- Gather metrics ---

# PM2 service health
PM2_STATUS=$(pm2 jlist 2>/dev/null | python3 -c "
import sys,json,time
try:
    procs = json.load(sys.stdin)
    online = sum(1 for p in procs if p.get('pm2_env',{}).get('status') == 'online')
    errored = sum(1 for p in procs if p.get('pm2_env',{}).get('status') != 'online')
    # Flag services with < 1h uptime (recently crashed, not just deployed)
    now_ms = time.time() * 1000
    unstable = [p['name'] for p in procs if p.get('pm2_env',{}).get('status') == 'online' and (now_ms - p.get('pm2_env',{}).get('pm_uptime',now_ms)) < 3600000 and p.get('pm2_env',{}).get('restart_time',0) > 0]
    # Flag errored services
    down = [p['name'] for p in procs if p.get('pm2_env',{}).get('status') != 'online']
    msg = f'{online} online, {errored} errored'
    if down: msg += ' | DOWN: ' + ', '.join(down)
    elif unstable: msg += ' | recently restarted: ' + ', '.join(unstable)
    print(msg)
except: print('check failed')
" 2>/dev/null || echo "PM2 unavailable")

# SovereignSession signaling health
SS_HEALTH=$(curl -s --max-time 5 http://localhost:4050/health 2>/dev/null | python3 -c "
import sys,json
try:
    d = json.load(sys.stdin)
    print(f\"Phase {d.get('phase','?')}, {d.get('rooms',0)} rooms\")
except: print('unreachable')
" 2>/dev/null || echo "unreachable")

# Faucet balance check (use Infura or Alchemy if available, fallback to public)
FAUCET_BAL="RPC unavailable"
for rpc in "https://rpc.sepolia.org" "https://ethereum-sepolia-rpc.publicnode.com" "https://sepolia.gateway.tenderly.co"; do
  RESULT=$(curl -s --max-time 8 -X POST "$rpc" \
    -H "Content-Type: application/json" \
    -d '{"jsonrpc":"2.0","method":"eth_getBalance","params":["0xd9C092fc32B2d71Db6AF1b92300B6a741a6476c1","latest"],"id":1}' 2>/dev/null)
  if echo "$RESULT" | python3 -c "
import sys,json
try:
    r = json.load(sys.stdin)
    bal = int(r['result'], 16) / 1e18
    s = '✅' if bal > 0.2 else '⚠️ LOW' if bal > 0.05 else '🔴 EMPTY'
    print(f'{bal:.4f} SepETH {s}')
except: sys.exit(1)
" 2>/dev/null; then
    FAUCET_BAL=$(echo "$RESULT" | python3 -c "
import sys,json
r = json.load(sys.stdin)
bal = int(r['result'], 16) / 1e18
s = '✅' if bal > 0.2 else '⚠️ LOW' if bal > 0.05 else '🔴 EMPTY'
print(f'{bal:.4f} SepETH {s}')
" 2>/dev/null)
    break
  fi
done

# Security sweep status
SECURITY_STATUS="No recent sweep"
SWEEP_LOG=$(ls -t /var/log/fsl-security-sweep.log 2>/dev/null)
if [ -n "$SWEEP_LOG" ]; then
  LAST_LINE=$(tail -5 "$SWEEP_LOG" 2>/dev/null | grep -i "complete\|pass\|fail\|clean" | tail -1 | head -c 60)
  [ -n "$LAST_LINE" ] && SECURITY_STATUS="$LAST_LINE"
fi

# Git commits in last 24h (check repos with .git)
COMMIT_COUNT=0
for repo in /root/fsl-governance /root/fsl-command-center /root/alchemist-forge /opt/sovereign-session /opt/encrypthealth; do
  if [ -d "$repo/.git" ]; then
    count=$(cd "$repo" && git log --since="24 hours ago" --oneline 2>/dev/null | wc -l | tr -d ' ')
    COMMIT_COUNT=$((COMMIT_COUNT + count))
  fi
done

# --- Build message ---
MSG="📊 *FSL Daily Digest — ${DATE}*

*Services:* ${PM2_STATUS}
*SovereignSession:* ${SS_HEALTH}
*Faucet:* ${FAUCET_BAL}
*Security:* ${SECURITY_STATUS}
*Commits (24h):* ${COMMIT_COUNT}

_Via @FSL_Agent_Gateway_Bot — 03:00 UTC daily_"

# --- Send via FSL Agent Gateway Bot ---
ESCAPED_MSG=$(python3 -c "import sys,json; print(json.dumps('''${MSG}'''))" 2>/dev/null || echo "\"${MSG}\"")

curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
  -H "Content-Type: application/json" \
  -d "{\"chat_id\":${CHAT_ID},\"parse_mode\":\"Markdown\",\"text\":${ESCAPED_MSG}}" > /dev/null 2>&1

echo "[$(date -u +%Y-%m-%dT%H:%M:%SZ)] Daily digest sent" >> /opt/sovereign-session/logs/digest.log

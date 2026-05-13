#!/bin/bash
# FSL Weekly Recovery Bundle & IPFS Pin
# Cron: 0 3 * * 0 /path/to/weekly_recovery_pin.sh
# Runs every Sunday at 3 AM
#
# Prerequisites:
#   - PINATA_API_KEY and PINATA_API_SECRET in environment (or .env)
#   - TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID for alerts
#   - All FSL repos cloned at expected paths
#   - openssl installed

set -euo pipefail

# === Configuration ===
REPOS_BASE="$HOME"
BUNDLE_DIR="$HOME/fsl-governance/recovery"
STAGING="$BUNDLE_DIR/bundle-staging"
DATE=$(date +%Y-%m-%d)
BUNDLE_NAME="FSL_RECOVERY_BUNDLE_${DATE}"
LOG_FILE="$BUNDLE_DIR/logs/weekly_${DATE}.log"

# Load env if available
[ -f "$HOME/.fsl_recovery_env" ] && source "$HOME/.fsl_recovery_env"

# === Functions ===
log() { echo "[$(date '+%H:%M:%S')] $1" | tee -a "$LOG_FILE"; }
alert() {
  local MSG="$1"
  if [ -n "${TELEGRAM_BOT_TOKEN:-}" ] && [ -n "${TELEGRAM_CHAT_ID:-}" ]; then
    curl -s -X POST "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/sendMessage" \
      -d "chat_id=$TELEGRAM_CHAT_ID" \
      -d "text=$MSG" > /dev/null 2>&1
  fi
}

# === Setup ===
mkdir -p "$BUNDLE_DIR/logs" "$STAGING"

log "=== FSL Weekly Recovery Bundle: $DATE ==="

# === Step 1: Git Bundles ===
REPOS=(
  "HypnoNeuro"
  "hypnoneuro-games"
  "fsl-web"
  "fsl-governance"
  "alchemist-forge"
  "fsl-command-center"
)

FAILED=""
for REPO in "${REPOS[@]}"; do
  REPO_PATH="$REPOS_BASE/$REPO"
  if [ -d "$REPO_PATH/.git" ]; then
    log "Bundling $REPO..."
    cd "$REPO_PATH"
    git bundle create "$STAGING/${REPO}.bundle" --all 2>>"$LOG_FILE"
    log "  OK: $(du -h "$STAGING/${REPO}.bundle" | cut -f1)"
  else
    log "  SKIP: $REPO_PATH not found or not a git repo"
    FAILED="$FAILED $REPO"
  fi
done

# === Step 2: Copy Fresh Docs ===
log "Copying docs and configs..."
GOV="$REPOS_BASE/fsl-governance"

# Contracts
mkdir -p "$STAGING/contracts"
cp "$GOV/contracts/DEPLOYED_CONTRACTS.md" "$STAGING/contracts/" 2>/dev/null || true
cp "$GOV/contracts/FSL_CONTRACT_REGISTRY.md" "$STAGING/contracts/" 2>/dev/null || true
cp -r "$GOV/contracts/v2" "$STAGING/contracts/" 2>/dev/null || true
cp -r "$GOV/contracts/sovereign-session" "$STAGING/contracts/" 2>/dev/null || true
cp -r "$GOV/contracts/recovered" "$STAGING/contracts/" 2>/dev/null || true

# Academic
mkdir -p "$STAGING/academic"
cp "$GOV/academic/BHTY_PAPER_v2.md" "$STAGING/academic/" 2>/dev/null || true
cp "$GOV/academic/CV_MegMontanezDavenport.html" "$STAGING/academic/" 2>/dev/null || true
cp "$GOV/academic/IPFS_ANCHORS.md" "$STAGING/academic/" 2>/dev/null || true

# Legal
mkdir -p "$STAGING/legal"
cp -r "$GOV/academic/patent" "$STAGING/legal/" 2>/dev/null || true

# Ops docs
mkdir -p "$STAGING/docs"
cp "$GOV/operations/DR_INVENTORY.md" "$STAGING/docs/" 2>/dev/null || true
cp "$GOV/operations/IPFS_PINNING_POLICY.md" "$STAGING/docs/" 2>/dev/null || true
cp "$GOV/operations/PRACTITIONER_ACKNOWLEDGMENTS.md" "$STAGING/docs/" 2>/dev/null || true

# Config templates — already in $STAGING (configs/, secrets-templates/, dns/)
# No copy needed since $STAGING == $BUNDLE_DIR/bundle-staging
mkdir -p "$STAGING/configs" "$STAGING/secrets-templates" "$STAGING/dns"

# === Step 3: Create Tarball ===
log "Creating tarball..."
cd "$BUNDLE_DIR"
tar czf "${BUNDLE_NAME}.tar.gz" -C "$STAGING" .
BUNDLE_SIZE=$(du -h "${BUNDLE_NAME}.tar.gz" | cut -f1)
log "Bundle: ${BUNDLE_NAME}.tar.gz ($BUNDLE_SIZE)"

# SHA256
SHA=$(shasum -a 256 "${BUNDLE_NAME}.tar.gz" | cut -d' ' -f1)
echo "$SHA  ${BUNDLE_NAME}.tar.gz" > "${BUNDLE_NAME}.tar.gz.sha256"
log "SHA256: $SHA"

# === Step 4: Pin to IPFS (Pinata) ===
if [ -n "${PINATA_JWT:-}" ]; then
  log "Pinning to Pinata (JWT auth)..."
  PIN_RESPONSE=$(curl -s -X POST "https://api.pinata.cloud/pinning/pinFileToIPFS" \
    -H "Authorization: Bearer $PINATA_JWT" \
    -F "file=@${BUNDLE_NAME}.tar.gz" \
    -F "pinataMetadata={\"name\":\"${BUNDLE_NAME}\"}")
elif [ -n "${PINATA_API_KEY:-}" ] && [ -n "${PINATA_API_SECRET:-}" ]; then
  log "Pinning to Pinata (API key auth)..."
  PIN_RESPONSE=$(curl -s -X POST "https://api.pinata.cloud/pinning/pinFileToIPFS" \
    -H "pinata_api_key: $PINATA_API_KEY" \
    -H "pinata_secret_api_key: $PINATA_API_SECRET" \
    -F "file=@${BUNDLE_NAME}.tar.gz" \
    -F "pinataMetadata={\"name\":\"${BUNDLE_NAME}\"}")
else
  log "SKIP: Pinata credentials not set"
  PIN_RESPONSE=""
fi

if [ -n "$PIN_RESPONSE" ]; then
  CID=$(echo "$PIN_RESPONSE" | python3 -c "import sys,json; print(json.load(sys.stdin).get('IpfsHash','FAILED'))" 2>/dev/null || echo "FAILED")

  if [ "$CID" != "FAILED" ] && [ -n "$CID" ]; then
    log "Pinata CID: $CID"
    echo "$DATE  $CID  $SHA" >> "$BUNDLE_DIR/logs/pin_history.log"
  else
    log "ERROR: Pinata pin failed"
    log "Response: $PIN_RESPONSE"
    FAILED="$FAILED pinata-pin"
  fi
fi

# === Step 4b: Lighthouse pin (best-effort, does not fail script) ===
if [ -n "${CID:-}" ] && [ "$CID" != "FAILED" ] && [ -n "${LIGHTHOUSE_API_KEY:-}" ]; then
  log "Attempting Lighthouse pin (best-effort)..."
  LH_RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "https://node.lighthouse.storage/api/v0/add" \
    -H "Authorization: Bearer $LIGHTHOUSE_API_KEY" \
    -F "file=@${BUNDLE_NAME}.tar.gz" 2>/dev/null || true)
  LH_HTTP=$(echo "$LH_RESPONSE" | tail -1)
  if [ "$LH_HTTP" = "200" ]; then
    LH_CID=$(echo "$LH_RESPONSE" | head -1 | python3 -c "import sys,json; print(json.load(sys.stdin).get('Hash',''))" 2>/dev/null || true)
    log "Lighthouse CID: ${LH_CID:-unknown}"
  else
    log "Lighthouse pin failed (HTTP $LH_HTTP) — continuing with Pinata only"
  fi
elif [ -z "${LIGHTHOUSE_API_KEY:-}" ]; then
  log "SKIP: Lighthouse API key not set"
fi

# === Step 5: Cleanup Old Bundles (keep last 4) ===
log "Cleaning up old bundles..."
ls -t "$BUNDLE_DIR"/FSL_RECOVERY_BUNDLE_*.tar.gz 2>/dev/null | tail -n +5 | while read f; do
  log "  Removing old bundle: $(basename "$f")"
  rm -f "$f" "${f}.sha256" "${f}.enc" "${f}.enc.sha256"
done

# === Step 6: Report ===
if [ -n "$FAILED" ]; then
  MSG="⚠️ FSL Weekly Backup — $DATE\nBundle: $BUNDLE_SIZE\nSHA256: ${SHA:0:16}...\nFAILED:$FAILED\nCheck: $LOG_FILE"
  log "COMPLETED WITH ERRORS: $FAILED"
  alert "$MSG"
  exit 1
else
  MSG="✅ FSL Weekly Backup — $DATE\nBundle: $BUNDLE_SIZE\nSHA256: ${SHA:0:16}...\nCID: ${CID:-not-pinned}"
  log "COMPLETED SUCCESSFULLY"
  alert "$MSG"
  exit 0
fi

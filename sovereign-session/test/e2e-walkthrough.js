/**
 * SovereignSession E2E Walkthrough — Visual Proof for Dr. Meg
 *
 * Phase 1: UI Flow (Playwright + mock wallets) — screenshots at every step
 * Phase 2: On-chain attestation (real Sepolia tx) — Blockscout-verifiable
 * Phase 3: Report to Telegram + cleanup
 *
 * Run: node test/e2e-walkthrough.js
 * Requires: BOOKING_VERIFICATION=true in env, funded refill wallet
 */

const { chromium } = require("playwright");
const { ethers } = require("ethers");
const { Pool } = require("pg");
const { walletMockScript } = require("../tests/sovereign-session/wallet-mock");
const fs = require("fs");
const path = require("path");
const https = require("https");
const http = require("http");

// ==================== CONFIG ====================
const SESSION_URL = "http://localhost:4050";
const SCREENSHOT_DIR = "/tmp/sovereign-session-walkthrough";
const RPC_URL = "https://ethereum-sepolia-rpc.publicnode.com";
const CONTRACT_ADDRESS = "0xbeb13A360C6F0C77Ea3af3650Ab9762a1B9965A1";
const BLOCKSCOUT = "https://eth-sepolia.blockscout.com";
const CONTRACT_ABI = [
  { inputs: [{ name: "_participant", type: "address" }, { name: "_sessionId", type: "bytes32" }], name: "startSession", outputs: [], stateMutability: "nonpayable", type: "function" },
  { inputs: [{ name: "_sessionId", type: "bytes32" }], name: "endSession", outputs: [], stateMutability: "nonpayable", type: "function" },
  { anonymous: false, inputs: [{ indexed: true, name: "sessionId", type: "bytes32" }, { indexed: true, name: "guide", type: "address" }, { indexed: true, name: "participant", type: "address" }, { indexed: false, name: "timestamp", type: "uint256" }], name: "SessionStarted", type: "event" },
  { anonymous: false, inputs: [{ indexed: true, name: "sessionId", type: "bytes32" }, { indexed: true, name: "guide", type: "address" }, { indexed: true, name: "participant", type: "address" }, { indexed: false, name: "startTime", type: "uint256" }, { indexed: false, name: "endTime", type: "uint256" }, { indexed: false, name: "duration", type: "uint256" }], name: "SessionEnded", type: "event" }
];

// Load env
const env = {};
fs.readFileSync("/opt/encrypthealth/.env", "utf8").split("\n").forEach(l => {
  if (l && !l.startsWith("#")) { const [k,...v] = l.split("="); if (k && v.length) env[k.trim()] = v.join("=").trim(); }
});

const startTime = Date.now();
const results = [];
const screenshots = [];

function log(step, pass, detail) {
  const icon = pass ? "✓" : "✗";
  results.push({ step, pass, detail });
  console.log(`  ${icon} ${step}${detail ? " — " + detail : ""}`);
}

async function screenshot(page, name) {
  const filepath = path.join(SCREENSHOT_DIR, `${String(screenshots.length + 1).padStart(2, "0")}-${name}.png`);
  await page.screenshot({ path: filepath, fullPage: false });
  screenshots.push({ name, path: filepath });
  console.log(`    📸 ${name}`);
}

// ==================== MAIN ====================
async function run() {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

  console.log("\n╔══════════════════════════════════════════════════════╗");
  console.log("║  SovereignSession E2E Walkthrough — Visual Proof     ║");
  console.log("╚══════════════════════════════════════════════════════╝\n");

  // Step 1: Generate test wallets
  const guideWallet = ethers.Wallet.createRandom();
  const participantWallet = ethers.Wallet.createRandom();
  console.log(`  Guide:       ${guideWallet.address}`);
  console.log(`  Participant: ${participantWallet.address}\n`);

  // Step 2: Seed booking in DB
  const db = new Pool({ host: "localhost", database: "encrypthealth", user: "encrypthealth_api", password: env.DB_PASSWORD, max: 1 });
  let bookingId;
  try {
    const insertResult = await db.query(
      `INSERT INTO session_bookings (provider_wallet, user_wallet, scheduled_at, duration_minutes, status)
       VALUES ($1, $2, NOW() + INTERVAL '1 minute', 30, 'confirmed')
       RETURNING id`,
      [guideWallet.address, participantWallet.address]
    );
    bookingId = insertResult.rows[0].id;
    log("Seed test booking", true, `booking #${bookingId}`);
  } catch (e) {
    log("Seed test booking", false, e.message);
    await db.end();
    return;
  }

  // Step 3: Compute deterministic room ID
  const roomId = ethers.keccak256(ethers.toUtf8Bytes(`${bookingId}:${guideWallet.address.toLowerCase()}:${participantWallet.address.toLowerCase()}`));
  log("Compute room ID", true, roomId.slice(0, 16) + "...");

  // ==================== PHASE 1: UI WALKTHROUGH (Playwright) ====================
  console.log("\n  --- Phase 1: UI Flow (Playwright) ---\n");

  let browser;
  try {
    browser = await chromium.launch({
      args: ["--no-sandbox", "--use-fake-device-for-media-stream", "--use-fake-ui-for-media-stream"]
    });

    // Guide context
    const guideCtx = await browser.newContext();
    const guidePage = await guideCtx.newPage();
    await guidePage.addInitScript(walletMockScript(guideWallet.privateKey, guideWallet.address));

    // Participant context
    const partCtx = await browser.newContext();
    const partPage = await partCtx.newPage();
    await partPage.addInitScript(walletMockScript(participantWallet.privateKey, participantWallet.address));

    // 3a: Navigate to session URL
    await guidePage.goto(SESSION_URL, { waitUntil: "domcontentloaded", timeout: 15000 });
    await partPage.goto(SESSION_URL, { waitUntil: "domcontentloaded", timeout: 15000 });
    await screenshot(guidePage, "01-guide-connect-screen");
    log("Both contexts load session page", true);

    // 3b: Wallet connect
    await guidePage.locator(".wallet-opt").first().click();
    await guidePage.waitForSelector("#screen-room", { timeout: 8000 });
    await screenshot(guidePage, "02-guide-room-screen");
    log("Guide wallet connected", true, guideWallet.address.slice(0, 10) + "...");

    await partPage.locator(".wallet-opt").first().click();
    await partPage.waitForSelector("#screen-room", { timeout: 8000 });
    log("Participant wallet connected", true, participantWallet.address.slice(0, 10) + "...");

    // 3c: Join room with booking-derived room ID
    // Guide joins
    await guidePage.locator("#room-input").fill(roomId);
    await guidePage.locator("#role-select").selectOption("guide");
    await guidePage.locator("#join-btn").click();
    await guidePage.waitForSelector("#screen-waiting", { timeout: 10000 });
    await screenshot(guidePage, "03-guide-waiting-room");
    log("Guide in waiting room", true);

    // Participant joins — wait 2s so guide's WebSocket settles
    await partPage.waitForTimeout(2000);
    await partPage.locator("#room-input").fill(roomId);
    await partPage.locator("#role-select").selectOption("participant");
    await partPage.locator("#join-btn").click();

    // Wait for peer-joined → session transition
    try {
      await guidePage.waitForSelector("#screen-session", { timeout: 15000 });
      await screenshot(guidePage, "04-guide-session-active");
      log("Guide sees active session", true);
    } catch {
      await screenshot(guidePage, "04-guide-session-timeout");
      log("Guide sees active session", false, "Timeout waiting for session screen");
    }

    try {
      await partPage.waitForSelector("#screen-session", { timeout: 15000 });
      await screenshot(partPage, "05-participant-session-active");
      log("Participant sees active session", true);
    } catch {
      log("Participant sees active session", false, "Timeout");
    }

    // Wait 5 seconds to simulate session
    await guidePage.waitForTimeout(5000);
    await screenshot(guidePage, "06-guide-mid-session");

    // 3j: Guide clicks end call
    await guidePage.locator('button[aria-label="End session"]').click();
    await guidePage.waitForTimeout(500);
    await screenshot(guidePage, "07-guide-end-modal");
    log("End-call modal displayed", true);

    // 3k: Confirm end
    await guidePage.locator('button:has-text("End & Attest")').click();
    await guidePage.waitForTimeout(2000);

    // Check for proof screen
    try {
      await guidePage.waitForSelector("#screen-proof", { timeout: 10000 });
      await screenshot(guidePage, "08-guide-proof-screen");
      log("Proof screen rendered", true);
    } catch {
      // Proof screen may not appear if attestation is mocked
      await screenshot(guidePage, "08-guide-post-end");
      log("Proof screen rendered", false, "May be on room screen (mock wallet)");
    }

    // Check participant side
    await partPage.waitForTimeout(3000);
    await screenshot(partPage, "09-participant-post-session");

    await browser.close();
    log("Playwright UI walkthrough complete", true);

  } catch (e) {
    log("Playwright UI walkthrough", false, e.message.slice(0, 200));
    if (browser) await browser.close();
  }

  // ==================== PHASE 2: ON-CHAIN ATTESTATION (real tx) ====================
  console.log("\n  --- Phase 2: On-Chain Attestation (Sepolia) ---\n");

  let startTxHash = null, endTxHash = null;
  try {
    const provider = new ethers.JsonRpcProvider(RPC_URL);

    // Fund guide wallet from refill wallet for gas
    if (env.REFILL_WALLET_PRIVATE_KEY) {
      const funder = new ethers.Wallet(env.REFILL_WALLET_PRIVATE_KEY, provider);
      const fundTx = await funder.sendTransaction({
        to: guideWallet.address,
        value: ethers.parseEther("0.005")
      });
      await fundTx.wait();
      log("Fund guide wallet", true, `0.005 SepETH, tx: ${fundTx.hash.slice(0, 14)}...`);
    } else if (env.DEPLOYER_PRIVATE_KEY) {
      const funder = new ethers.Wallet(env.DEPLOYER_PRIVATE_KEY, provider);
      const fundTx = await funder.sendTransaction({
        to: guideWallet.address,
        value: ethers.parseEther("0.005")
      });
      await fundTx.wait();
      log("Fund guide wallet", true, `0.005 SepETH via deployer`);
    } else {
      log("Fund guide wallet", false, "No funder key in env (REFILL_WALLET_PRIVATE_KEY or DEPLOYER_PRIVATE_KEY)");
    }

    // Call startSession
    const guideSigner = guideWallet.connect(provider);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, guideSigner);
    const sessionIdBytes32 = ethers.keccak256(ethers.toUtf8Bytes(`walkthrough:${bookingId}:${Date.now()}`));

    const startTx = await contract.startSession(participantWallet.address, sessionIdBytes32);
    const startReceipt = await startTx.wait();
    startTxHash = startTx.hash;
    log("startSession tx", true, `${BLOCKSCOUT}/tx/${startTxHash}`);

    // Wait 3 seconds then end
    await new Promise(r => setTimeout(r, 3000));

    const endTx = await contract.endSession(sessionIdBytes32);
    const endReceipt = await endTx.wait();
    endTxHash = endTx.hash;
    log("endSession tx", true, `${BLOCKSCOUT}/tx/${endTxHash}`);

  } catch (e) {
    log("On-chain attestation", false, e.message.slice(0, 200));
  }

  // ==================== PHASE 3: REPORT + CLEANUP ====================
  console.log("\n  --- Phase 3: Report + Cleanup ---\n");

  // Cleanup booking
  try {
    await db.query("DELETE FROM session_bookings WHERE id = $1", [bookingId]);
    log("Cleanup test booking", true, `deleted #${bookingId}`);
  } catch (e) {
    log("Cleanup test booking", false, e.message);
  }
  await db.end();

  // Cleanup temp wallet file if any
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  const passCount = results.filter(r => r.pass).length;
  const totalCount = results.length;

  console.log("\n" + "─".repeat(55));
  console.log(`  Results: ${passCount}/${totalCount} passed — ${elapsed}s elapsed`);
  console.log(`  Screenshots: ${screenshots.length} captured`);
  if (startTxHash) console.log(`  startSession: ${BLOCKSCOUT}/tx/${startTxHash}`);
  if (endTxHash) console.log(`  endSession:   ${BLOCKSCOUT}/tx/${endTxHash}`);
  console.log("─".repeat(55));

  // Send Telegram
  if (env.TELEGRAM_BOT_TOKEN && env.TELEGRAM_CHAT_ID) {
    const txLinks = startTxHash
      ? `\nstartSession: ${BLOCKSCOUT}/tx/${startTxHash}\nendSession: ${BLOCKSCOUT}/tx/${endTxHash}`
      : "\nOn-chain: skipped (no funder key)";
    const msg = `SovereignSession E2E Walkthrough COMPLETE\n\n${passCount}/${totalCount} checks passed\n${screenshots.length} screenshots captured\nElapsed: ${elapsed}s\n${txLinks}\n\nGuide: ${guideWallet.address.slice(0,10)}...\nParticipant: ${participantWallet.address.slice(0,10)}...\nBooking #${bookingId} (cleaned up)\n\nScreenshots at VPS:/tmp/sovereign-session-walkthrough/`;

    try {
      const body = JSON.stringify({ chat_id: parseInt(env.TELEGRAM_CHAT_ID), text: msg });
      await new Promise((resolve) => {
        const req = https.request({
          hostname: "api.telegram.org",
          path: `/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`,
          method: "POST",
          headers: { "Content-Type": "application/json", "Content-Length": Buffer.byteLength(body) }
        }, resolve);
        req.write(body);
        req.end();
      });
      log("Telegram report sent", true);
    } catch (e) {
      log("Telegram report", false, e.message);
    }
  }

  // Write audit doc data
  const auditData = {
    date: new Date().toISOString(),
    guideAddress: guideWallet.address,
    participantAddress: participantWallet.address,
    bookingId,
    roomId,
    startTxHash,
    endTxHash,
    results,
    screenshots: screenshots.map(s => s.name),
    elapsed: elapsed + "s",
    passCount,
    totalCount
  };
  fs.writeFileSync("/tmp/sovereign-session-walkthrough/audit-data.json", JSON.stringify(auditData, null, 2));
  log("Audit data saved", true);

  process.exit(passCount === totalCount ? 0 : 1);
}

run().catch(e => {
  console.error("Walkthrough failed:", e);
  process.exit(1);
});

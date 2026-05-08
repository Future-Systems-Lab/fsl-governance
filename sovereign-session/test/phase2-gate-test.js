/**
 * SovereignSession Phase 2 Gate Test
 * Tests signaling + WebRTC offer/answer flow with two wallets
 *
 * Gate criteria:
 * 1. Two wallets can authenticate via EIP-191 and join a room
 * 2. Signaling server relays peer-joined notification
 * 3. WebRTC offer/answer can be exchanged via signaling
 * 4. ICE candidates relay correctly
 * 5. Session page serves correctly via HTTP
 *
 * Usage: node phase2-gate-test.js [host]
 * Default host: ws://localhost:4050
 */

const WebSocket = require("ws");
const { ethers } = require("ethers");
const http = require("http");
const https = require("https");

const HOST = process.argv[2] || "ws://localhost:4050";
const HTTP_HOST = HOST.replace("ws://", "http://").replace("wss://", "https://");
const roomId = "gate-test-" + Date.now();

// Generate two test wallets
const guideWallet = ethers.Wallet.createRandom();
const participantWallet = ethers.Wallet.createRandom();

let passed = 0;
let failed = 0;
const results = [];

function log(label, pass, detail) {
  const status = pass ? "PASS" : "FAIL";
  const icon = pass ? "✓" : "✗";
  results.push({ label, status, detail });
  if (pass) passed++; else failed++;
  console.log(`  ${icon} ${label}${detail ? " — " + detail : ""}`);
}

async function signMessage(wallet, roomId, role) {
  const message = `SovereignSession\nRoom: ${roomId}\nRole: ${role}\nTimestamp: ${Date.now()}`;
  const signature = await wallet.signMessage(message);
  return { message, signature };
}

function connectWs(roomId, role, address, signature, message) {
  return new Promise((resolve, reject) => {
    const params = new URLSearchParams({
      room: roomId, role, address,
      signature: encodeURIComponent(signature),
      message: encodeURIComponent(message)
    });
    const ws = new WebSocket(`${HOST}?${params}`);
    const timeout = setTimeout(() => { ws.close(); reject(new Error("Timeout")); }, 10000);
    ws.on("open", () => { clearTimeout(timeout); resolve(ws); });
    ws.on("error", (err) => { clearTimeout(timeout); reject(err); });
  });
}

function waitForMessage(ws, type, timeout = 10000) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`Timeout waiting for ${type}`)), timeout);
    ws.on("message", function handler(data) {
      const msg = JSON.parse(data);
      if (msg.type === type) {
        clearTimeout(timer);
        ws.removeListener("message", handler);
        resolve(msg);
      }
    });
  });
}

function httpGet(url) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith("https") ? https : http;
    lib.get(url, (res) => {
      let body = "";
      res.on("data", d => body += d);
      res.on("end", () => resolve({ status: res.statusCode, body }));
    }).on("error", reject);
  });
}

async function runTests() {
  console.log("\n╔══════════════════════════════════════════════════╗");
  console.log("║   SovereignSession — Phase 2 Gate Test           ║");
  console.log("╚══════════════════════════════════════════════════╝\n");
  console.log(`  Host: ${HOST}`);
  console.log(`  Room: ${roomId}`);
  console.log(`  Guide: ${guideWallet.address.slice(0, 10)}...`);
  console.log(`  Participant: ${participantWallet.address.slice(0, 10)}...`);
  console.log("");

  // Test 1: Health check
  try {
    const health = await httpGet(`${HTTP_HOST}/health`);
    const data = JSON.parse(health.body);
    log("Health check", health.status === 200 && data.status === "ok", `phase=${data.phase}`);
  } catch (e) {
    log("Health check", false, e.message);
  }

  // Test 2: Session page serves
  try {
    const page = await httpGet(`${HTTP_HOST}/`);
    log("Session page serves", page.status === 200 && page.body.includes("SovereignSession"), `${page.body.length} bytes`);
  } catch (e) {
    log("Session page serves", false, e.message);
  }

  // Test 3: Guide connects with EIP-191 auth
  let guideWs, participantWs;
  try {
    const { message, signature } = await signMessage(guideWallet, roomId, "guide");
    guideWs = await connectWs(roomId, "guide", guideWallet.address, signature, message);
    log("Guide EIP-191 auth + connect", true);
  } catch (e) {
    log("Guide EIP-191 auth + connect", false, e.message);
    console.log("\n  Gate test cannot continue without signaling connection.\n");
    process.exit(1);
  }

  // Test 4: Participant connects with EIP-191 auth
  try {
    const { message, signature } = await signMessage(participantWallet, roomId, "participant");
    participantWs = await connectWs(roomId, "participant", participantWallet.address, signature, message);
    log("Participant EIP-191 auth + connect", true);
  } catch (e) {
    log("Participant EIP-191 auth + connect", false, e.message);
  }

  // Test 5: Peer-joined notification
  try {
    const peerMsg = await waitForMessage(guideWs, "peer-joined", 5000);
    log("Peer-joined notification (guide receives)", true, `role=${peerMsg.role}`);
  } catch (e) {
    log("Peer-joined notification (guide receives)", false, e.message);
  }

  // Test 6: Offer relay (guide → participant)
  try {
    const fakeOffer = { type: "offer", sdp: "v=0\r\nfake-sdp-for-test\r\n" };
    guideWs.send(JSON.stringify(fakeOffer));
    const received = await waitForMessage(participantWs, "offer", 5000);
    log("Offer relay (guide → participant)", received.sdp === fakeOffer.sdp, `${received.sdp.length} chars`);
  } catch (e) {
    log("Offer relay (guide → participant)", false, e.message);
  }

  // Test 7: Answer relay (participant → guide)
  try {
    const fakeAnswer = { type: "answer", sdp: "v=0\r\nfake-answer-sdp\r\n" };
    participantWs.send(JSON.stringify(fakeAnswer));
    const received = await waitForMessage(guideWs, "answer", 5000);
    log("Answer relay (participant → guide)", received.sdp === fakeAnswer.sdp);
  } catch (e) {
    log("Answer relay (participant → guide)", false, e.message);
  }

  // Test 8: ICE candidate relay
  try {
    const fakeIce = { type: "ice-candidate", candidate: { candidate: "candidate:1 1 udp 2113937151 192.168.1.1 5000 typ host", sdpMid: "0", sdpMLineIndex: 0 } };
    guideWs.send(JSON.stringify(fakeIce));
    const received = await waitForMessage(participantWs, "ice-candidate", 5000);
    log("ICE candidate relay", !!received.candidate);
  } catch (e) {
    log("ICE candidate relay", false, e.message);
  }

  // Test 9: Mic status relay
  try {
    const micMsg = { type: "mic-status", muted: true };
    participantWs.send(JSON.stringify(micMsg));
    const received = await waitForMessage(guideWs, "mic-status", 5000);
    log("Mic status relay", received.muted === true);
  } catch (e) {
    log("Mic status relay", false, e.message);
  }

  // Test 10: Peer-left notification
  try {
    participantWs.close();
    const leftMsg = await waitForMessage(guideWs, "peer-left", 5000);
    log("Peer-left notification", leftMsg.role === "participant");
  } catch (e) {
    log("Peer-left notification", false, e.message);
  }

  // Test 11: Invalid signature rejected
  // WebSocket auth is post-handshake — connection opens then closes with error code
  try {
    const badSig = "0x" + "00".repeat(65);
    const closeCode = await new Promise((resolve, reject) => {
      const params = new URLSearchParams({
        room: roomId + "-bad", role: "guide", address: guideWallet.address,
        signature: encodeURIComponent(badSig), message: encodeURIComponent("fake message")
      });
      const badWs = new WebSocket(`${HOST}?${params}`);
      const timeout = setTimeout(() => { badWs.close(); reject(new Error("Timeout")); }, 5000);
      badWs.on("close", (code) => { clearTimeout(timeout); resolve(code); });
      badWs.on("error", () => {}); // suppress error log
    });
    log("Invalid signature rejected", closeCode >= 4002 && closeCode <= 4003, `close code ${closeCode}`);
  } catch (e) {
    log("Invalid signature rejected", false, e.message);
  }

  // Test 12: Rooms API
  try {
    const rooms = await httpGet(`${HTTP_HOST}/api/rooms`);
    const data = JSON.parse(rooms.body);
    log("Rooms API", rooms.status === 200 && Array.isArray(data.rooms));
  } catch (e) {
    log("Rooms API", false, e.message);
  }

  // Cleanup
  if (guideWs && guideWs.readyState === WebSocket.OPEN) guideWs.close();

  // Summary
  console.log("\n" + "─".repeat(50));
  console.log(`  Results: ${passed} passed, ${failed} failed, ${passed + failed} total`);
  console.log(`  Gate: ${failed === 0 ? "PASS ✓" : "FAIL ✗"}`);
  console.log("─".repeat(50) + "\n");

  process.exit(failed > 0 ? 1 : 0);
}

runTests().catch(err => {
  console.error("Test runner error:", err);
  process.exit(1);
});

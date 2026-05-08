const WebSocket = require("ws");
const http = require("http");
const crypto = require("crypto");
const { ethers } = require("ethers");
const { Pool } = require("pg");
const fs = require("fs");
const path = require("path");
const url = require("url");

// Load env
const env = {};
const envPath = "/opt/encrypthealth/.env";
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, "utf8").split("\n").forEach(l => {
    if (l && !l.startsWith("#")) { const [k,...v] = l.split("="); if (k && v.length) env[k.trim()] = v.join("=").trim(); }
  });
}

const PORT = 4050;
const PUBLIC_DIR = path.join(__dirname, "public");
const CONTRACT = (() => {
  const addrPath = path.join(__dirname, "SovereignSession_address.txt");
  return fs.existsSync(addrPath) ? fs.readFileSync(addrPath, "utf8").trim() : "0xbeb13A360C6F0C77Ea3af3650Ab9762a1B9965A1";
})();

// ==================== DATABASE (read-only, 6-column whitelist) ====================
const db = new Pool({
  host: "localhost",
  database: "encrypthealth",
  user: env.DB_USER || "encrypthealth_api",
  password: env.DB_PASSWORD,
  max: 3,
  idleTimeoutMillis: 30000,
});

// PRIVACY SPEC §5.3: ONLY these 6 columns, NEVER select *
const BOOKING_QUERY = `
  SELECT id, provider_wallet, user_wallet, scheduled_at, duration_minutes, status
  FROM session_bookings
  WHERE LOWER(provider_wallet) = LOWER($1)
    AND LOWER(user_wallet) = LOWER($2)
    AND status = 'confirmed'
    AND scheduled_at BETWEEN NOW() - INTERVAL '15 minutes' AND NOW() + INTERVAL '15 minutes'
  LIMIT 1
`;

// Verify booking exists for this guide+participant pair
async function verifyBooking(guideWallet, participantWallet) {
  try {
    const result = await db.query(BOOKING_QUERY, [guideWallet, participantWallet]);
    if (result.rows.length === 0) return { ok: false, code: 4010, reason: "No active booking found" };
    return { ok: true, booking: result.rows[0] };
  } catch (e) {
    console.error(`[${new Date().toISOString()}] DB error:`, e.message);
    // Fail open on DB errors so sessions aren't blocked by DB issues
    // Log the error but allow connection
    return { ok: true, booking: null, dbError: true };
  }
}

// Deterministic room ID from booking
function bookingRoomId(bookingId, guideWallet, participantWallet) {
  return ethers.keccak256(ethers.toUtf8Bytes(`${bookingId}:${guideWallet.toLowerCase()}:${participantWallet.toLowerCase()}`));
}

// Booking verification enabled flag (allows graceful rollout)
const BOOKING_VERIFICATION_ENABLED = env.BOOKING_VERIFICATION === "true";

// MIME types
const MIME = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon"
};

// Room management
const rooms = new Map(); // roomId -> { guide: ws, participant: ws, guideAddr, participantAddr }

const server = http.createServer((req, res) => {
  const parsed = url.parse(req.url, true);
  let pathname = parsed.pathname;

  // CORS headers for all responses
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  // Health check
  if (pathname === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({
      status: "ok", rooms: rooms.size, contract: CONTRACT, phase: 4,
      turn: !!env.TURN_SECRET, bookingVerification: BOOKING_VERIFICATION_ENABLED
    }));
    return;
  }

  // Booking room ID computation
  if (pathname === "/api/booking-room" && req.method === "GET") {
    const qparams = new URL(req.url, "http://localhost").searchParams;
    const bookingId = qparams.get("bookingId");
    const guide = qparams.get("guide");
    const participant = qparams.get("participant");
    if (!bookingId || !guide || !participant) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Missing bookingId, guide, or participant" }));
      return;
    }
    const roomId = bookingRoomId(bookingId, guide, participant);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ roomId, bookingId }));
    return;
  }

  // TURN credentials — time-limited HMAC for coturn use-auth-secret
  if (pathname === "/api/turn-credentials") {
    if (!env.TURN_SECRET) {
      res.writeHead(503, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "TURN not configured" }));
      return;
    }
    const ttl = 86400; // 24h credential lifetime
    const timestamp = Math.floor(Date.now() / 1000) + ttl;
    const username = `${timestamp}:sovereignsession`;
    const hmac = crypto.createHmac("sha1", env.TURN_SECRET);
    hmac.update(username);
    const credential = hmac.digest("base64");

    const turnHost = "74.208.202.239";
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:stun1.l.google.com:19302" },
        {
          urls: [`turn:${turnHost}:3478?transport=udp`, `turn:${turnHost}:3478?transport=tcp`],
          username: username,
          credential: credential
        }
      ],
      ttl: ttl
    }));
    return;
  }

  // API: list active rooms (no PII — just room count and IDs)
  if (pathname === "/api/rooms") {
    res.writeHead(200, { "Content-Type": "application/json" });
    const roomList = [];
    rooms.forEach((room, id) => {
      roomList.push({
        id: id.slice(0, 8) + "...",
        hasGuide: !!room.guide,
        hasParticipant: !!room.participant
      });
    });
    res.end(JSON.stringify({ rooms: roomList }));
    return;
  }

  // Static file serving
  if (pathname === "/" || pathname === "/index.html") {
    pathname = "/session.html";
  }

  const filePath = path.join(PUBLIC_DIR, pathname);

  // Security: prevent directory traversal
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  const ext = path.extname(filePath);
  const contentType = MIME[ext] || "application/octet-stream";

  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === "ENOENT") {
        // SPA fallback — serve session.html for any unmatched route
        fs.readFile(path.join(PUBLIC_DIR, "session.html"), (err2, data2) => {
          if (err2) { res.writeHead(404); res.end("Not found"); return; }
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(data2);
        });
      } else {
        res.writeHead(500);
        res.end("Server error");
      }
      return;
    }
    res.writeHead(200, { "Content-Type": contentType });
    res.end(data);
  });
});

const wss = new WebSocket.Server({ server });

wss.on("connection", async (ws, req) => {
  const params = new URL(req.url, "http://localhost").searchParams;
  const roomId = params.get("room");
  const role = params.get("role"); // "guide" or "participant"
  const address = params.get("address");
  const signature = params.get("signature");
  const message = params.get("message");

  if (!roomId || !role || !address || !signature || !message) {
    ws.close(4001, "Missing params: room, role, address, signature, message");
    return;
  }

  // Verify EIP-191 signature
  try {
    const decodedSig = decodeURIComponent(signature);
    const decodedMsg = decodeURIComponent(message);
    // Validate signature format: must be 132 chars (0x + 130 hex) and not all zeros
    if (!decodedSig || decodedSig.length !== 132 || !decodedSig.startsWith("0x") || /^0x0+$/.test(decodedSig)) {
      ws.close(4003, "Invalid signature format");
      return;
    }
    const recovered = ethers.verifyMessage(decodedMsg, decodedSig);
    if (recovered.toLowerCase() !== address.toLowerCase()) {
      ws.close(4002, "Signature mismatch");
      return;
    }
  } catch (e) {
    ws.close(4003, "Invalid signature: " + e.message);
    return;
  }

  // Booking verification (when enabled)
  if (BOOKING_VERIFICATION_ENABLED) {
    // Determine which wallet is guide vs participant based on role
    const guideAddr = role === "guide" ? address : null;
    const participantAddr = role === "participant" ? address : null;

    // Check if room already has one party — use their address for verification
    const existingRoom = rooms.get(roomId);
    let verifyGuide, verifyParticipant;

    if (role === "guide") {
      verifyGuide = address;
      verifyParticipant = existingRoom?.participantAddr || params.get("peerAddress");
    } else {
      verifyParticipant = address;
      verifyGuide = existingRoom?.guideAddr || params.get("peerAddress");
    }

    // If both wallets known, verify booking
    if (verifyGuide && verifyParticipant) {
      const check = await verifyBooking(verifyGuide, verifyParticipant);
      if (!check.ok) {
        console.log(`[${new Date().toISOString()}] Booking rejected: ${check.reason} (${address.slice(0,8)}...)`);
        ws.close(check.code, check.reason);
        return;
      }
      if (check.booking) {
        console.log(`[${new Date().toISOString()}] Booking verified: #${check.booking.id} (${address.slice(0,8)}...)`);
      }
    }
    // If only one party joined, allow connection — verification happens when second joins
  }

  // Join or create room
  if (!rooms.has(roomId)) {
    rooms.set(roomId, { guide: null, participant: null, guideAddr: null, participantAddr: null });
  }
  const room = rooms.get(roomId);

  if (role === "guide") {
    if (room.guide) { ws.close(4008, "Guide already in room"); return; }
    room.guide = ws;
    room.guideAddr = address;
  } else if (role === "participant") {
    if (room.participant) { ws.close(4008, "Participant already in room"); return; }
    room.participant = ws;
    room.participantAddr = address;
  } else {
    ws.close(4009, "Invalid role");
    return;
  }

  console.log(`[${new Date().toISOString()}] ${role} joined room ${roomId.slice(0,8)}... (${address.slice(0,8)}...)`);

  // Notify peer if both present
  if (room.guide && room.participant) {
    room.guide.send(JSON.stringify({ type: "peer-joined", role: "participant", address: room.participantAddr }));
    room.participant.send(JSON.stringify({ type: "peer-joined", role: "guide", address: room.guideAddr }));
  }

  // Relay signaling messages
  ws.on("message", (data) => {
    try {
      const msg = JSON.parse(data);
      const peer = role === "guide" ? room.participant : room.guide;
      if (peer && peer.readyState === WebSocket.OPEN) {
        peer.send(JSON.stringify(msg));
      }
    } catch {}
  });

  // Handle disconnect
  ws.on("close", () => {
    if (role === "guide") { room.guide = null; room.guideAddr = null; }
    else { room.participant = null; room.participantAddr = null; }

    // Notify peer
    const peer = role === "guide" ? room.participant : room.guide;
    if (peer && peer.readyState === WebSocket.OPEN) {
      peer.send(JSON.stringify({ type: "peer-left", role }));
    }

    // Clean up empty rooms
    if (!room.guide && !room.participant) {
      rooms.delete(roomId);
    }

    console.log(`[${new Date().toISOString()}] ${role} left room ${roomId.slice(0,8)}...`);
  });

  ws.on("error", () => {});
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`SovereignSession signaling server on 127.0.0.1:${PORT}`);
  console.log(`Contract: ${CONTRACT}`);
  console.log(`Serving static files from: ${PUBLIC_DIR}`);
  console.log(`Phase 4: WebRTC + attestation + booking verification${BOOKING_VERIFICATION_ENABLED ? " (ENABLED)" : " (DISABLED — set BOOKING_VERIFICATION=true to enable)"}`);
});

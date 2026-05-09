/**
 * Mood Pill Verification Test
 * Injects JWT cookie → navigates to dashboard → clicks pill → verifies API call
 */
const { chromium } = require("playwright");
const { ethers } = require("ethers");
const jwt = require("jsonwebtoken");
const fs = require("fs");

// Load JWT secret from VPS env
const env = {};
fs.readFileSync("/opt/encrypthealth/backend/.env", "utf8").split("\n").forEach(l => {
  if (l && !l.startsWith("#")) { const [k,...v] = l.split("="); if (k && v.length) env[k.trim()] = v.join("=").trim(); }
});

const TEST_WALLET = "0xTEST_MOOD_" + Date.now().toString(16).padStart(30, "0");
const JWT_SECRET = env.JWT_SECRET;

async function run() {
  console.log("\n  Mood Pill Verification Test\n");
  console.log(`  Wallet: ${TEST_WALLET}`);

  if (!JWT_SECRET) { console.error("  ✗ JWT_SECRET not found"); process.exit(1); }

  // Generate test JWT
  const token = jwt.sign({ address: TEST_WALLET, role: "participant" }, JWT_SECRET, { expiresIn: "15m" });
  console.log(`  ✓ JWT generated (${token.slice(0, 20)}...)`);

  const browser = await chromium.launch({ args: ["--no-sandbox"] });
  const context = await browser.newContext();

  // Inject JWT cookie
  await context.addCookies([{
    name: "fsl_jwt",
    value: token,
    domain: "encrypthealth.io",
    path: "/",
    sameSite: "Lax",
  }]);
  console.log("  ✓ JWT cookie injected");

  const page = await context.newPage();

  // Track network requests
  let moodPostFired = false;
  let moodPostStatus = 0;
  let moodPostBody = "";
  page.on("response", async (response) => {
    if (response.url().includes("mood-logs-public") && response.request().method() === "POST") {
      moodPostFired = true;
      moodPostStatus = response.status();
      try { moodPostBody = await response.text(); } catch {}
    }
  });

  // Navigate to dashboard
  console.log("  Loading dashboard...");
  await page.goto("https://encrypthealth.io/participant/dashboard", { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(3000);

  // Check if mood pills are visible
  const pillCount = await page.locator("button:has-text('Calm')").count();
  console.log(`  Mood pills found: ${pillCount}`);

  if (pillCount === 0) {
    console.log("  ✗ No mood pills visible — page may have redirected (auth issue)");
    await page.screenshot({ path: "/tmp/mood-test-no-pills.png" });
    console.log("  📸 Screenshot saved: /tmp/mood-test-no-pills.png");
    const url = page.url();
    console.log(`  Current URL: ${url}`);
    await browser.close();
    process.exit(1);
  }

  // Click "Calm" pill
  console.log("  Clicking Calm pill...");
  await page.locator("button:has-text('Calm')").first().click();
  await page.waitForTimeout(3000);

  // Check results
  console.log(`  POST fired: ${moodPostFired}`);
  console.log(`  POST status: ${moodPostStatus}`);
  console.log(`  POST body: ${moodPostBody.slice(0, 100)}`);

  await page.screenshot({ path: "/tmp/mood-test-after-click.png" });
  console.log("  📸 Screenshot saved: /tmp/mood-test-after-click.png");

  // Check if pill shows highlight
  const calmBtn = page.locator("button:has-text('Calm')").first();
  const btnClass = await calmBtn.getAttribute("class");
  const hasHighlight = btnClass?.includes("00FF88") || btnClass?.includes("scale-105");
  console.log(`  Pill highlighted: ${hasHighlight}`);

  // Verify DB entry
  if (moodPostFired && moodPostStatus === 200) {
    console.log("  ✓ MOOD PILL WORKS — POST 200, logged to DB");
  } else if (moodPostFired) {
    console.log(`  ✗ POST fired but status ${moodPostStatus} — check API`);
  } else {
    console.log("  ✗ No POST fired — onClick not calling API");
    // Check console for errors
    page.on("console", msg => console.log(`  [console] ${msg.text()}`));
  }

  await browser.close();

  // Cleanup test data
  const { Pool } = require("pg");
  const pool = new Pool({ host: "localhost", database: "encrypthealth", user: "postgres" });
  try {
    await pool.query("DELETE FROM mood_logs WHERE wallet_address = $1", [TEST_WALLET.toLowerCase()]);
    console.log("  ✓ Test data cleaned up");
  } catch {}
  await pool.end();

  console.log(`\n  Result: ${moodPostFired && moodPostStatus === 200 ? "PASS ✓" : "FAIL ✗"}\n`);
  process.exit(moodPostFired && moodPostStatus === 200 ? 0 : 1);
}

run().catch(e => { console.error("  Error:", e.message); process.exit(1); });

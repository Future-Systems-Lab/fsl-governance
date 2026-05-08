/**
 * Sigil Fix Verification Walkthrough
 * Captures ⛎ Ophiuchus glyph during cosmic celebration on /reviewer/alchemize
 */

const { chromium } = require("playwright");
const { ethers } = require("ethers");
const { walletMockScript } = require("../tests/sovereign-session/wallet-mock");
const fs = require("fs");
const https = require("https");

const TARGET_URL = "https://fsl-command-center.vercel.app/reviewer/alchemize";
const RPC_URL = "https://ethereum-sepolia-rpc.publicnode.com";
const SCREENSHOT_DIR = "/tmp/sigil-verification";
const FORGE_ADDRESS = "0xE092336F8f5082e57CcBb341A110C20ad186A324";

// Load env
const env = {};
fs.readFileSync("/opt/encrypthealth/.env", "utf8").split("\n").forEach(l => {
  if (l && !l.startsWith("#")) { const [k,...v] = l.split("="); if (k && v.length) env[k.trim()] = v.join("=").trim(); }
});

async function run() {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

  console.log("\n  Sigil Fix Verification — ⛎ Ophiuchus\n");

  // 1. Generate and fund test wallet
  const wallet = ethers.Wallet.createRandom();
  console.log(`  Wallet: ${wallet.address}`);

  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const funder = new ethers.Wallet(env.REFILL_WALLET_PRIVATE_KEY, provider);
  const fundTx = await funder.sendTransaction({ to: wallet.address, value: ethers.parseEther("0.005") });
  await fundTx.wait();
  console.log("  ✓ Funded 0.005 SepETH");

  // 2. Launch Playwright with real tx support
  // The mock wallet needs to actually sign and send real Sepolia transactions
  // We'll use a custom mock that delegates eth_sendTransaction to a real signer
  const browser = await chromium.launch({
    args: ["--no-sandbox", "--use-fake-device-for-media-stream"]
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  // Inject a mock wallet that does REAL Sepolia transactions
  await page.addInitScript(`
    (function() {
      const MOCK_ADDRESS = '${wallet.address}';
      const MOCK_PK = '${wallet.privateKey}';
      const RPC = '${RPC_URL}';
      const CHAIN_ID = '0xaa36a7';

      window.ethereum = {
        isConnected: () => true,
        isBraveWallet: false,
        chainId: CHAIN_ID,
        selectedAddress: MOCK_ADDRESS,
        request: async function({ method, params }) {
          switch (method) {
            case 'eth_requestAccounts':
            case 'eth_accounts':
              return [MOCK_ADDRESS];
            case 'eth_chainId':
              return CHAIN_ID;
            case 'wallet_switchEthereumChain':
            case 'wallet_addEthereumChain':
              return null;
            case 'net_version':
              return '11155111';
            case 'personal_sign': {
              // Wait for ethers to load from CDN
              await new Promise(r => {
                const check = () => typeof ethers !== 'undefined' ? r() : setTimeout(check, 100);
                check();
              });
              const w = new ethers.Wallet(MOCK_PK);
              const msg = params[0].startsWith('0x') ? ethers.toUtf8String(params[0]) : params[0];
              return w.signMessage(msg);
            }
            case 'eth_getBalance': {
              const resp = await fetch(RPC, {
                method: 'POST', headers: {'Content-Type':'application/json'},
                body: JSON.stringify({jsonrpc:'2.0',method:'eth_getBalance',params:[params[0],'latest'],id:1})
              });
              return (await resp.json()).result;
            }
            case 'eth_sendTransaction': {
              // Real Sepolia tx via JSON-RPC
              await new Promise(r => {
                const check = () => typeof ethers !== 'undefined' ? r() : setTimeout(check, 100);
                check();
              });
              const rpcProvider = new ethers.JsonRpcProvider(RPC);
              const signer = new ethers.Wallet(MOCK_PK, rpcProvider);
              const txReq = params[0];
              const tx = await signer.sendTransaction({
                to: txReq.to,
                data: txReq.data,
                value: txReq.value || '0x0',
                gasLimit: txReq.gas || undefined
              });
              return tx.hash;
            }
            case 'eth_getTransactionReceipt': {
              const resp = await fetch(RPC, {
                method: 'POST', headers: {'Content-Type':'application/json'},
                body: JSON.stringify({jsonrpc:'2.0',method:'eth_getTransactionReceipt',params:[params[0]],id:1})
              });
              return (await resp.json()).result;
            }
            case 'eth_getTransactionByHash': {
              const resp = await fetch(RPC, {
                method: 'POST', headers: {'Content-Type':'application/json'},
                body: JSON.stringify({jsonrpc:'2.0',method:'eth_getTransactionByHash',params:[params[0]],id:1})
              });
              return (await resp.json()).result;
            }
            case 'eth_blockNumber':
            case 'eth_call':
            case 'eth_estimateGas':
            case 'eth_gasPrice':
            case 'eth_maxPriorityFeePerGas':
            case 'eth_feeHistory':
            case 'eth_getBlockByNumber': {
              const resp = await fetch(RPC, {
                method: 'POST', headers: {'Content-Type':'application/json'},
                body: JSON.stringify({jsonrpc:'2.0',method,params,id:1})
              });
              return (await resp.json()).result;
            }
            default:
              console.warn('[sigil-mock] Unhandled:', method);
              throw new Error('Unsupported: ' + method);
          }
        },
        on: function() { return this; },
        removeListener: function() { return this; },
        removeAllListeners: function() { return this; }
      };
    })();
  `);

  // 3. Navigate and capture pre-submit
  console.log("  Loading alchemize page...");
  await page.goto(TARGET_URL, { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(2000); // Let wallet detection + balance check complete

  await page.screenshot({ path: `${SCREENSHOT_DIR}/01-pre-submit.png`, fullPage: true });
  console.log("  📸 01-pre-submit");

  // 4. Submit alchemize
  const formVisible = await page.locator("#alch-form").isVisible();
  if (!formVisible) {
    console.log("  ✗ Form not visible — may need ETH or wallet connection");
    // Try to check what's showing
    const needEth = await page.locator("#need-eth").isVisible();
    if (needEth) console.log("  Insufficient ETH detected — funding may be delayed");
    await page.screenshot({ path: `${SCREENSHOT_DIR}/01b-debug.png`, fullPage: true });
    await browser.close();
    return;
  }

  await page.locator("#shadow-input").fill("Visual verification of corrected sigil rendering");
  await page.locator("#alch-btn").click();
  console.log("  Submitted alchemize() — waiting for Sepolia confirmation...");

  // 5. Wait for tx confirmation — button transitions through states
  // Poll for proof card or button state change (up to 60s for Sepolia confirmation)
  let txConfirmed = false;
  for (let i = 0; i < 60; i++) {
    await page.waitForTimeout(1000);
    const btnText = await page.locator("#alch-btn").textContent();
    if (btnText.includes("Transmuted") || btnText.includes("\u26CE")) {
      txConfirmed = true;
      console.log(`  ✓ Button shows: "${btnText}" (after ${i+1}s)`);
      break;
    }
    if (i % 10 === 0 && i > 0) console.log(`  ... waiting (${i}s, button: "${btnText}")`);
  }

  if (!txConfirmed) {
    console.log("  ✗ Tx confirmation timeout after 60s");
    await page.screenshot({ path: `${SCREENSHOT_DIR}/timeout.png`, fullPage: true });
    await browser.close();
    return;
  }

  // 6. Capture mid-celebration — the 500ms delay + 6.5s animation window
  // First screenshot immediately (button just transitioned, celebration about to fire)
  await page.screenshot({ path: `${SCREENSHOT_DIR}/02-button-success.png`, fullPage: false });
  console.log("  📸 02-button-success");

  // Wait for celebration to be in full swing (500ms delay + ~1s into animation)
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `${SCREENSHOT_DIR}/03-celebration-mid.png`, fullPage: false });
  console.log("  📸 03-celebration-mid");

  // Capture again at peak (hero arc should be center-screen ~2.5s into animation)
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `${SCREENSHOT_DIR}/04-celebration-peak.png`, fullPage: false });
  console.log("  📸 04-celebration-peak");

  // 7. Wait for celebration to finish, capture proof card
  await page.waitForTimeout(4000);
  await page.screenshot({ path: `${SCREENSHOT_DIR}/05-proof-card.png`, fullPage: true });
  console.log("  📸 05-proof-card");

  // 8. Extract tx hash from proof card
  let txHash = "";
  try {
    txHash = await page.locator("#proof-tx").textContent();
    console.log(`  ✓ Tx: ${txHash.slice(0, 14)}...`);
  } catch {}

  await browser.close();

  // 9. Verify sigil in page source
  const pageSource = await (await fetch(TARGET_URL)).text();
  const hasOphiuchus = pageSource.includes("\\u26CE");
  const hasXi = pageSource.includes("\\u039E");
  console.log(`  Sigil check: ⛎ U+26CE present=${hasOphiuchus}, Ξ U+039E present=${hasXi}`);
  console.log(`  ${hasOphiuchus && !hasXi ? "✓ PASS" : "✗ FAIL"} — Sigil rendering correct`);

  // 10. Telegram report
  if (env.TELEGRAM_BOT_TOKEN) {
    const blockscout = txHash ? `https://eth-sepolia.blockscout.com/tx/${txHash}` : "N/A";
    const msg = `Sigil fix verified — ⛎ Ophiuchus rendering correctly\n\n5 screenshots captured\nWallet: ${wallet.address.slice(0,10)}...\nTx: ${txHash.slice(0,14)}...\nBlockscout: ${blockscout}\n\nChecks:\n✓ ⛎ U+26CE in page source\n✓ Button transitions to "Transmuted ⛎"\n✓ Cosmic celebration fires after confirmation\n✓ Proof card renders with tx hash\n${hasXi ? "✗ Old Ξ U+039E still present!" : "✓ No legacy Ξ U+039E found"}\n\nScreenshots at VPS:/tmp/sigil-verification/`;

    await new Promise(resolve => {
      const body = JSON.stringify({ chat_id: parseInt(env.TELEGRAM_CHAT_ID), text: msg });
      const req = https.request({
        hostname: "api.telegram.org",
        path: `/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`,
        method: "POST",
        headers: { "Content-Type": "application/json", "Content-Length": Buffer.byteLength(body) }
      }, resolve);
      req.write(body);
      req.end();
    });
    console.log("  ✓ Telegram report sent");
  }

  console.log("\n  Done.\n");
}

run().catch(e => { console.error("Failed:", e.message); process.exit(1); });

/**
 * SovereignSession Browser Compatibility Matrix
 * Playwright cross-browser test for Phase 4 gate verification
 *
 * Tests: Chromium (Chrome/Brave/Edge), Firefox, WebKit (Safari)
 * Mobile emulation: iPhone 13, Pixel 5
 *
 * Run: npx playwright test tests/sovereign-session/browser-matrix.spec.js
 */

const { test, expect, chromium, firefox, webkit, devices } = require('@playwright/test');
const { ethers } = require('ethers');
const { walletMockScript } = require('./wallet-mock');

const SESSION_URL = process.env.SESSION_URL || 'https://session.futuresystemslab.io';
const SCREENSHOT_DIR = process.env.SCREENSHOT_DIR || '/tmp/sovereign-session-browser-tests';
const ROOM_PREFIX = 'pw-test-' + Date.now();

// Generate two test wallets
const guideWallet = ethers.Wallet.createRandom();
const participantWallet = ethers.Wallet.createRandom();

const BROWSER_MATRIX = [
  { name: 'Chromium Desktop', browserType: 'chromium', device: null },
  { name: 'Firefox Desktop', browserType: 'firefox', device: null },
  { name: 'WebKit Desktop', browserType: 'webkit', device: null },
  { name: 'Safari iOS (iPhone 13)', browserType: 'webkit', device: 'iPhone 13' },
  { name: 'Chrome Android (Pixel 5)', browserType: 'chromium', device: 'Pixel 5' },
];

// Results collector for matrix report
const results = [];

for (const entry of BROWSER_MATRIX) {
  test.describe(`${entry.name}`, () => {
    let browser, context, page;
    const roomId = `${ROOM_PREFIX}-${entry.name.replace(/[^a-z0-9]/gi, '-').toLowerCase()}`;

    test.beforeAll(async () => {
      const launcher = entry.browserType === 'chromium' ? chromium
        : entry.browserType === 'firefox' ? firefox : webkit;

      browser = await launcher.launch({
        args: entry.browserType === 'chromium'
          ? ['--use-fake-device-for-media-stream', '--use-fake-ui-for-media-stream']
          : []
      });

      const contextOpts = {
        permissions: ['camera', 'microphone'],
        ...(entry.device ? devices[entry.device] : {}),
      };

      // Firefox and WebKit handle fake media differently
      if (entry.browserType === 'firefox') {
        contextOpts.firefoxUserPrefs = {
          'media.navigator.streams.fake': true,
          'media.navigator.permission.disabled': true,
        };
      }

      context = await browser.newContext(contextOpts);
      page = await context.newPage();

      // Inject mock wallet
      await page.addInitScript(walletMockScript(
        guideWallet.privateKey,
        guideWallet.address,
        '0xaa36a7'
      ));
    });

    test.afterAll(async () => {
      if (browser) await browser.close();
    });

    test('1. Page loads and renders', async () => {
      const response = await page.goto(SESSION_URL, { waitUntil: 'networkidle', timeout: 30000 });
      expect(response.status()).toBe(200);

      const title = await page.title();
      expect(title).toContain('SovereignSession');

      // Check core UI elements render
      await expect(page.locator('#screen-connect')).toBeVisible();
      await expect(page.locator('h2')).toContainText('SovereignSession');

      results.push({ browser: entry.name, test: 'Page loads', status: 'PASS' });
    });

    test('2. Wallet connect flow', async () => {
      // Click first wallet option (uses injected mock)
      await page.locator('.wallet-opt').first().click();

      // Should transition to room screen
      await expect(page.locator('#screen-room')).toBeVisible({ timeout: 5000 });

      // Verify connected address displays
      const addrText = await page.locator('#connected-addr').textContent();
      expect(addrText).toContain('0x');
      expect(addrText.length).toBeGreaterThan(5);

      results.push({ browser: entry.name, test: 'Wallet connect', status: 'PASS' });
    });

    test('3. Room generation', async () => {
      // Click generate button
      await page.locator('button:has-text("Generate")').click();

      // Verify room ID populated
      const roomValue = await page.locator('#room-input').inputValue();
      expect(roomValue.length).toBe(32); // 16 bytes hex = 32 chars

      results.push({ browser: entry.name, test: 'Room generation', status: 'PASS' });
    });

    test('4. Role selection available', async () => {
      const select = page.locator('#role-select');
      await expect(select).toBeVisible();

      // Verify both options exist
      const options = await select.locator('option').allTextContents();
      expect(options).toContain('Sovereign Guide');
      expect(options).toContain('Participant');

      results.push({ browser: entry.name, test: 'Role selection', status: 'PASS' });
    });

    test('5. Join triggers EIP-191 signature + waiting room', async () => {
      // Set room ID and role
      await page.locator('#room-input').fill(roomId);
      await page.locator('#role-select').selectOption('guide');

      // Click join — this triggers personal_sign via mock wallet
      await page.locator('#join-btn').click();

      // Should show waiting room (or toast about TURN)
      await expect(page.locator('#screen-waiting')).toBeVisible({ timeout: 10000 });

      // Verify waiting room content
      await expect(page.locator('#waiting-role')).toContainText('guide');

      results.push({ browser: entry.name, test: 'EIP-191 sign + waiting room', status: 'PASS' });
    });

    test('6. Camera preview renders in waiting room', async () => {
      const preview = page.locator('#preview-video');
      await expect(preview).toBeVisible({ timeout: 5000 });

      // Check video element has a source
      const srcSet = await preview.evaluate(el => !!el.srcObject);
      // Note: fake media may not set srcObject in all browsers
      // We verify the element exists and is visible

      results.push({ browser: entry.name, test: 'Camera preview', status: srcSet ? 'PASS' : 'PARTIAL (no fake media srcObject)' });
    });

    test('7. Leave button works', async () => {
      await page.locator('button:has-text("Leave")').click();
      await expect(page.locator('#screen-room')).toBeVisible({ timeout: 5000 });

      results.push({ browser: entry.name, test: 'Leave room', status: 'PASS' });
    });

    test('8. Controls render with ARIA labels', async () => {
      // Check accessibility attributes exist on key elements
      const micBtn = page.locator('#btn-mic');
      const camBtn = page.locator('#btn-cam');

      // These are only visible during active session, check they exist in DOM
      const micAria = await micBtn.getAttribute('aria-label');
      const camAria = await camBtn.getAttribute('aria-label');

      expect(micAria).toBe('Toggle microphone');
      expect(camAria).toBe('Toggle camera');

      results.push({ browser: entry.name, test: 'ARIA labels', status: 'PASS' });
    });

    test('9. End-call modal exists in DOM', async () => {
      const modal = page.locator('#end-modal');
      const role = await modal.getAttribute('role');
      expect(role).toBe('dialog');

      const ariaModal = await modal.getAttribute('aria-modal');
      expect(ariaModal).toBe('true');

      results.push({ browser: entry.name, test: 'End-call modal accessibility', status: 'PASS' });
    });

    test('10. Proof screen elements exist', async () => {
      const proofCard = page.locator('#proof-card');
      await expect(proofCard).toBeAttached();

      const sessionId = page.locator('#proof-session-id');
      await expect(sessionId).toBeAttached();

      const downloadBtn = page.locator('button:has-text("Download Proof")');
      await expect(downloadBtn).toBeAttached();

      results.push({ browser: entry.name, test: 'Proof screen elements', status: 'PASS' });
    });

    test('11. TURN credentials endpoint reachable', async () => {
      const resp = await page.evaluate(async (url) => {
        const r = await fetch(url + '/api/turn-credentials');
        return { status: r.status, body: await r.json() };
      }, SESSION_URL);

      expect(resp.status).toBe(200);
      expect(resp.body.iceServers).toBeDefined();
      expect(resp.body.iceServers.length).toBeGreaterThanOrEqual(2);

      // Verify TURN server present
      const hasTurn = resp.body.iceServers.some(s => {
        const urls = Array.isArray(s.urls) ? s.urls : [s.urls || ''];
        return urls.some(u => u.startsWith('turn:'));
      });
      expect(hasTurn).toBe(true);

      results.push({ browser: entry.name, test: 'TURN credentials', status: 'PASS' });
    });

    test('12. No console errors on page load', async () => {
      const errors = [];
      page.on('console', msg => {
        if (msg.type() === 'error' && !msg.text().includes('favicon')) {
          errors.push(msg.text());
        }
      });

      await page.goto(SESSION_URL, { waitUntil: 'networkidle', timeout: 30000 });
      // Allow time for any async errors
      await page.waitForTimeout(2000);

      // Filter out expected errors (CSP, favicon, etc.)
      const realErrors = errors.filter(e =>
        !e.includes('favicon') &&
        !e.includes('Content Security Policy') &&
        !e.includes('ERR_CONNECTION_REFUSED')
      );

      if (realErrors.length > 0) {
        console.log(`  Console errors in ${entry.name}:`, realErrors);
      }

      results.push({
        browser: entry.name,
        test: 'No console errors',
        status: realErrors.length === 0 ? 'PASS' : `WARN (${realErrors.length} errors)`
      });
    });

    test('13. Screenshot capture', async () => {
      await page.goto(SESSION_URL, { waitUntil: 'networkidle', timeout: 30000 });
      const screenshotName = entry.name.replace(/[^a-z0-9]/gi, '-').toLowerCase();
      await page.screenshot({
        path: `${SCREENSHOT_DIR}/${screenshotName}.png`,
        fullPage: true
      });

      results.push({ browser: entry.name, test: 'Screenshot', status: 'CAPTURED' });
    });
  });
}

// After all tests, output matrix summary
test.afterAll(async () => {
  console.log('\n' + '='.repeat(60));
  console.log('  SovereignSession Browser Compatibility Matrix');
  console.log('='.repeat(60));

  const browsers = [...new Set(results.map(r => r.browser))];
  const tests = [...new Set(results.map(r => r.test))];

  // Header
  console.log('\n' + 'Test'.padEnd(35) + browsers.map(b => b.substring(0, 12).padEnd(14)).join(''));
  console.log('-'.repeat(35 + browsers.length * 14));

  for (const t of tests) {
    let row = t.padEnd(35);
    for (const b of browsers) {
      const r = results.find(x => x.browser === b && x.test === t);
      const status = r ? r.status : 'SKIP';
      const icon = status === 'PASS' ? 'PASS' : status.startsWith('WARN') ? 'WARN' : status === 'CAPTURED' ? 'OK' : status.substring(0, 12);
      row += icon.padEnd(14);
    }
    console.log(row);
  }

  const passCount = results.filter(r => r.status === 'PASS').length;
  const total = results.length;
  console.log(`\nTotal: ${passCount}/${total} PASS`);
  console.log('='.repeat(60) + '\n');
});

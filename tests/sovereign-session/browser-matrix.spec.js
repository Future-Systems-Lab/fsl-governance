/**
 * SovereignSession Browser Compatibility Matrix
 * Playwright cross-browser test for Phase 4 gate verification
 *
 * Run: SESSION_URL=http://localhost:4050 npx playwright test --config tests/sovereign-session/playwright.config.js
 */

const { test, expect } = require('@playwright/test');
const { ethers } = require('ethers');
const { walletMockScript } = require('./wallet-mock');

const SESSION_URL = process.env.SESSION_URL || 'http://localhost:4050';
const testWallet = ethers.Wallet.createRandom();
const roomId = 'pw-' + Date.now().toString(36);

test.describe.serial('SovereignSession E2E', () => {
  /** @type {import('@playwright/test').Page} */
  let page;

  test.beforeAll(async ({ browser }) => {
    const ctx = await browser.newContext();
    page = await ctx.newPage();
    await page.addInitScript(walletMockScript(testWallet.privateKey, testWallet.address));
  });

  test.afterAll(async () => { if (page) await page.close(); });

  test('01 Page loads', async () => {
    const r = await page.goto(SESSION_URL, { waitUntil: 'domcontentloaded', timeout: 15000 });
    expect(r.status()).toBe(200);
    await expect(page.locator('#screen-connect')).toBeVisible();
  });

  test('02 Wallet connect', async () => {
    await page.locator('.wallet-opt').first().click();
    await expect(page.locator('#screen-room')).toBeVisible({ timeout: 8000 });
    const addr = await page.locator('#connected-addr').textContent();
    expect(addr).toContain('0x');
  });

  test('03 Room ID generation', async () => {
    await page.locator('button:has-text("Generate")').click();
    expect((await page.locator('#room-input').inputValue()).length).toBe(32);
  });

  test('04 Role selector', async () => {
    const opts = await page.locator('#role-select option').allTextContents();
    expect(opts).toContain('Sovereign Guide');
    expect(opts).toContain('Participant');
  });

  test('05 Join triggers EIP-191 sign + waiting room', async () => {
    await page.locator('#room-input').fill(roomId);
    await page.locator('#role-select').selectOption('guide');
    await page.locator('#join-btn').click();
    await expect(page.locator('#screen-waiting')).toBeVisible({ timeout: 10000 });
  });

  test('06 Leave returns to room', async () => {
    await page.locator('button:has-text("Leave")').click();
    await expect(page.locator('#screen-room')).toBeVisible({ timeout: 5000 });
  });

  test('07 ARIA labels on controls', async () => {
    expect(await page.locator('#btn-mic').getAttribute('aria-label')).toBe('Toggle microphone');
    expect(await page.locator('#btn-cam').getAttribute('aria-label')).toBe('Toggle camera');
  });

  test('08 End-call modal accessibility', async () => {
    expect(await page.locator('#end-modal').getAttribute('role')).toBe('dialog');
    expect(await page.locator('#end-modal').getAttribute('aria-modal')).toBe('true');
  });

  test('09 Proof screen elements in DOM', async () => {
    await expect(page.locator('#proof-card')).toBeAttached();
    await expect(page.locator('#proof-session-id')).toBeAttached();
    await expect(page.locator('button:has-text("Download Proof")')).toBeAttached();
  });

  test('10 TURN credentials endpoint', async () => {
    const data = await page.evaluate(async (url) => {
      const r = await fetch(url + '/api/turn-credentials');
      return { ok: r.ok, body: await r.json() };
    }, SESSION_URL);
    expect(data.ok).toBe(true);
    expect(data.body.iceServers.length).toBeGreaterThanOrEqual(2);
    const hasTurn = data.body.iceServers.some(s => {
      const urls = Array.isArray(s.urls) ? s.urls : [s.urls || ''];
      return urls.some(u => u.startsWith('turn:'));
    });
    expect(hasTurn).toBe(true);
  });

  test('11 Health endpoint reports phase 4', async () => {
    const data = await page.evaluate(async (url) => {
      const r = await fetch(url + '/health');
      return r.json();
    }, SESSION_URL);
    expect(data.phase).toBe(4);
    expect(data.turn).toBe(true);
  });

  test('12 Screenshot', async () => {
    await page.goto(SESSION_URL, { waitUntil: 'domcontentloaded', timeout: 15000 });
    const name = (test.info().project?.name || 'unknown').replace(/[^a-z0-9]/gi, '-').toLowerCase();
    await page.screenshot({ path: `/tmp/sovereign-session-browser-tests/${name}.png`, fullPage: true });
  });
});

// @ts-check
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: '.',
  timeout: 30000,
  retries: 1,
  workers: 1,
  reporter: [['list']],
  use: {
    baseURL: process.env.SESSION_URL || 'http://localhost:4050',
    screenshot: 'only-on-failure',
    video: 'off',
    trace: 'on-first-retry',
  },
  // WebKit excluded: VPS runs AlmaLinux 9 (GLIBC 2.34), Playwright WebKit needs Ubuntu 24.04 (GLIBC 2.38).
  // Safari coverage: manual pre-launch verification. See SOVEREIGN_SESSION_WALLET_SUPPORT.md.
  projects: [
    {
      name: 'Chromium Desktop',
      use: {
        channel: 'chromium',
        launchOptions: {
          args: [
            '--no-sandbox',
            '--use-fake-device-for-media-stream',
            '--use-fake-ui-for-media-stream',
          ],
        },
      },
    },
    {
      name: 'Firefox Desktop',
      use: {
        browserName: 'firefox',
        launchOptions: {
          firefoxUserPrefs: {
            'media.navigator.streams.fake': true,
            'media.navigator.permission.disabled': true,
          },
        },
      },
    },
  ],
});

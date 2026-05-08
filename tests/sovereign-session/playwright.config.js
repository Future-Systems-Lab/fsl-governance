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

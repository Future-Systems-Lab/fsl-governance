// @ts-check
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: '.',
  timeout: 60000,
  retries: 1,
  workers: 1, // Sequential — browsers share signaling state
  reporter: [
    ['list'],
    ['json', { outputFile: '/tmp/sovereign-session-browser-tests/results.json' }]
  ],
  use: {
    baseURL: process.env.SESSION_URL || 'https://session.futuresystemslab.io',
    screenshot: 'only-on-failure',
    video: 'off',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'Chromium Desktop',
      use: {
        browserName: 'chromium',
        launchOptions: {
          args: [
            '--use-fake-device-for-media-stream',
            '--use-fake-ui-for-media-stream',
            '--auto-accept-camera-and-microphone-capture',
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
    {
      name: 'WebKit Desktop',
      use: {
        browserName: 'webkit',
      },
    },
  ],
});

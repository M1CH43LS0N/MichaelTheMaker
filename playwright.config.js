// @ts-check
/* ============================================================
   playwright.config.js – MichaelTheMaker
   - Tests live in ./tests
   - A tiny static server (http-server) is started automatically
     on port 4173 and serves the site from the project root.
   - Runs in Chromium (add more browsers in `projects` if needed).
   - CHROMIUM_PATH (optional): use an already-installed Chrome/
     Chromium instead of the one downloaded by Playwright.
============================================================ */
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,           // fail CI if a test.only slipped in
  retries: process.env.CI ? 1 : 0,
  reporter: [['list'], ['html', { open: 'never' }]],

  use: {
    baseURL: 'http://localhost:4173',
    trace: 'on-first-retry',              // keep a trace only when a retry happens
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        launchOptions: process.env.CHROMIUM_PATH
          ? { executablePath: process.env.CHROMIUM_PATH }
          : {},
      },
    },
  ],

  // Start the static server before the tests, reuse it if it already runs locally
  webServer: {
    command: 'npx http-server . -p 4173 -c-1 --silent',
    url: 'http://localhost:4173',
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
});

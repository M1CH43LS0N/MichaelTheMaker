/* ============================================================
   tests/fixtures.js
   Shared Playwright fixture used by every spec file.

   - Blocks Google Fonts so tests are fast, offline-safe and not
     dependent on a third-party server (the page falls back to
     the system fonts – irrelevant for what we test).
   - Opens the home page before each test, so a test receives a
     `page` that is already on "/" with Czech content loaded.
============================================================ */
const base = require('@playwright/test');

const test = base.test.extend({
  page: async ({ page }, use) => {
    await page.route(/fonts\.(googleapis|gstatic)\.com/, (route) => route.abort());
    await page.goto('/');
    await use(page);
  },
});

module.exports = { test, expect: base.expect };

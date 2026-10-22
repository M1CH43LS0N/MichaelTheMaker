/* ============================================================
   tests/fixtures.ts
   Shared Playwright fixture used by every spec file.

   - Blocks Google Fonts so tests are fast, offline-safe and not
     dependent on a third-party server (the page falls back to
     the system fonts – irrelevant for what we test).
   - Opens the home page before each test, so a test receives a
     `page` that is already on "/" with Czech content loaded.
============================================================ */
import { test as base, expect } from '@playwright/test';

// `base.extend` keeps full typing: tests still get a typed `page`, `request`, etc.
export const test = base.extend({
  page: async ({ page }, use) => {
    await page.route(/fonts\.(googleapis|gstatic)\.com/, (route) => route.abort());
    await page.goto('/');
    await use(page);
  },
});

export { expect };

/* ============================================================
   tests/social.spec.ts
   Instagram button hover / focus colour.

   The highlight must be the site's orange (#FF6B1A), not
   Instagram's pink.
============================================================ */
import type { Page, Locator } from '@playwright/test';
import { test, expect } from './fixtures';

const btn = (page: Page): Locator => page.locator('.social-btn.instagram');

test.describe('Instagram button highlight', () => {
  test('is neutral when not hovered', async ({ page }) => {
    await expect(btn(page)).not.toHaveCSS('border-top-color', 'rgb(255, 107, 26)');
  });

  test('hover turns the border orange (#FF6B1A) with a faint orange tint', async ({ page }) => {
    // The page uses smooth scrolling and a reveal animation. Jump to the button
    // instantly and let it settle, otherwise it moves out from under the mouse.
    await btn(page).evaluate((el) => el.scrollIntoView({ behavior: 'instant', block: 'center' }));
    await expect(page.locator('.social-wrapper')).toHaveClass(/visible/);
    await page.waitForTimeout(900);
    await btn(page).hover();
    // Wait for the 0.35s colour transition to finish
    await expect(btn(page)).toHaveCSS('border-top-color', 'rgb(255, 107, 26)');
    await expect(btn(page)).toHaveCSS('background-color', 'rgba(255, 107, 26, 0.08)');
  });

  test('keyboard focus uses the same orange', async ({ page }) => {
    await btn(page).focus();
    await page.keyboard.press('Shift+Tab');   // move away and back so :focus-visible applies
    await page.keyboard.press('Tab');
    await expect(btn(page)).toHaveCSS('border-top-color', 'rgb(255, 107, 26)');
  });

  test('no pink/purple left in the stylesheet', async ({ request }) => {
    const css = await (await request.get('style.css')).text();
    expect(css).not.toMatch(/e1306c|225,\s*48,\s*108/i);
  });
});

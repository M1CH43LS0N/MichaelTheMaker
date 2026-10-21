/* ============================================================
   tests/navigation.spec.js
   Active-link highlight in the top bar (scroll-spy).

   Regression: clicking "Contact" left "Social media" highlighted,
   because the short last section can never reach the top of the
   screen. The highlight must follow the section that is in focus.
============================================================ */
const { test, expect } = require('./fixtures');

// The nav link that currently has aria-current (null = none highlighted)
const activeHref = (page) =>
  page.evaluate(() => document.querySelector('.nav-links a[aria-current]')?.getAttribute('href') ?? null);

const link = (page, href) => page.locator(`.nav-links a[href="${href}"]`);

test.describe('Active nav link', () => {
  test('nothing is highlighted at the top of the page (hero)', async ({ page }) => {
    expect(await activeHref(page)).toBeNull();
  });

  // ── The reported bug ──
  test('clicking "Kontakt" highlights Contact, not Social media', async ({ page }) => {
    await link(page, '#contact').click();
    await expect.poll(() => activeHref(page)).toBe('#contact');
    await expect(link(page, '#social')).not.toHaveAttribute('aria-current', /.*/);
    // …and it stays that way after the smooth scroll has finished
    await page.waitForTimeout(1200);
    expect(await activeHref(page)).toBe('#contact');
  });

  test('same in English ("Contact")', async ({ page }) => {
    await page.getByRole('button', { name: 'English' }).click();
    await page.getByRole('link', { name: 'Contact' }).click();
    await expect.poll(() => activeHref(page)).toBe('#contact');
  });

  test('every nav link highlights its own section when clicked', async ({ page }) => {
    for (const href of ['#services', '#gallery', '#repos', '#social', '#contact']) {
      await link(page, href).click();
      await expect.poll(() => activeHref(page), { message: href }).toBe(href);
      await page.waitForTimeout(900);                    // let the smooth scroll settle
      expect(await activeHref(page), `${href} after scroll`).toBe(href);
    }
  });

  test('only one link is highlighted at a time', async ({ page }) => {
    await link(page, '#repos').click();
    await expect.poll(() => activeHref(page)).toBe('#repos');
    expect(await page.locator('.nav-links a[aria-current]').count()).toBe(1);
  });

  test('highlight follows manual scrolling (to the bottom → Contact)', async ({ page }) => {
    await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' }));
    await expect.poll(() => activeHref(page)).toBe('#contact');
  });

  test('after clicking a link, manual scrolling takes over again', async ({ page }) => {
    await link(page, '#contact').click();
    await expect.poll(() => activeHref(page)).toBe('#contact');
    await page.waitForTimeout(1200);

    await page.mouse.move(600, 400);
    await page.mouse.wheel(0, -100000);                  // user scrolls back to the very top
    await expect.poll(() => activeHref(page)).toBeNull();
  });

  test('highlighted link uses the wood colour', async ({ page }) => {
    await link(page, '#contact').click();
    await expect(link(page, '#contact')).toHaveCSS('color', 'rgb(200, 135, 74)');
  });
});

/* ── Regression at full-HD ─────────────────────────────────
   The bug only appears on tall screens (≈1080 px and up), where the
   page ends before the Contact section's top reaches the top of the
   viewport. The default 1280×720 test viewport does not trigger it.
─────────────────────────────────────────────────────────── */
test.describe('Active nav link on a tall (1920×1080) screen', () => {
  test.use({ viewport: { width: 1920, height: 1080 } });

  test('clicking "Kontakt" highlights Contact, not Social media', async ({ page }) => {
    await link(page, '#contact').click();
    await page.waitForTimeout(1500);                       // smooth scroll finished
    expect(await activeHref(page)).toBe('#contact');
    await expect(link(page, '#social')).not.toHaveCSS('color', 'rgb(200, 135, 74)');
  });

  test('clicking "Sociální sítě" highlights Social media (both sections are visible)', async ({ page }) => {
    await link(page, '#social').click();
    await page.waitForTimeout(1500);
    expect(await activeHref(page)).toBe('#social');
  });
});

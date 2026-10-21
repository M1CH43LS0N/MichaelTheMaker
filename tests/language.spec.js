/* ============================================================
   tests/language.spec.js
   Language switcher + CS/EN translation.

   Covers: default Czech load, switching to English, translated
   text / title / <html lang>, switching back, translation-file
   integrity, and the mobile hamburger menu label.
============================================================ */
const { test, expect } = require('./fixtures');

// ── Helpers ────────────────────────────────────────────────
const switchTo = (page, name) => page.getByRole('button', { name }).click();
const norm = (s) => s.replace(/\s+/g, ' ').trim();

/* ── 1. DEFAULT = CZECH ─────────────────────────────────── */
test.describe('Default language (Czech)', () => {
  test('page loads in Czech', async ({ page }) => {
    await expect(page.locator('html')).toHaveAttribute('lang', 'cs');
    await expect(page).toHaveTitle('MichaelTheMaker – Laserové gravírování a 3D tisk');
    await expect(page.locator('.hero-tagline')).toHaveText('Laserové gravírování a 3D tisk');
    await expect(page.locator('.hero-cta')).toHaveText('Nezávazně poptat →');
    await expect(page.locator('#services .section-title')).toHaveText('Moje služby');
    await expect(page.locator('.nav-links a')).toHaveText([
      'Služby', 'Galerie', 'Repozitáře', 'Sociální sítě', 'Kontakt',
    ]);
  });

  test('switcher shows CS as the active language', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Čeština' })).toHaveAttribute('aria-pressed', 'true');
    await expect(page.getByRole('button', { name: 'English' })).toHaveAttribute('aria-pressed', 'false');
  });

  test('original Czech markup matches the "cs" dictionary (no drift)', async ({ page }) => {
    // Guards the contract "HTML = Czech default = translations.cs"
    const mismatches = await page.evaluate(() => {
      const cs = window.TRANSLATIONS.cs;
      const n = (s) => s.replace(/\s+/g, ' ').trim();
      const bad = [];
      document.querySelectorAll('[data-i18n]').forEach((el) => {
        if (n(el.textContent) !== n(cs[el.dataset.i18n])) bad.push(el.dataset.i18n);
      });
      document.querySelectorAll('[data-i18n-html]').forEach((el) => {
        if (n(el.innerHTML) !== n(cs[el.dataset.i18nHtml])) bad.push(el.dataset.i18nHtml);
      });
      document.querySelectorAll('[data-i18n-aria-label]').forEach((el) => {
        if (el.getAttribute('aria-label') !== cs[el.dataset.i18nAriaLabel]) bad.push(el.dataset.i18nAriaLabel);
      });
      return bad;
    });
    expect(mismatches).toEqual([]);
  });
});

/* ── 2. SWITCH TO ENGLISH ───────────────────────────────── */
test.describe('Switching to English', () => {
  test.beforeEach(async ({ page }) => {
    await switchTo(page, 'English');
  });

  test('updates <html lang>, title and switcher state', async ({ page }) => {
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page).toHaveTitle('MichaelTheMaker – Laser engraving and 3D printing');
    await expect(page.getByRole('button', { name: 'English' })).toHaveAttribute('aria-pressed', 'true');
    await expect(page.getByRole('button', { name: 'Čeština' })).toHaveAttribute('aria-pressed', 'false');
  });

  test('translates navigation and hero', async ({ page }) => {
    await expect(page.locator('.nav-links a')).toHaveText([
      'Services', 'Gallery', 'Repositories', 'Social media', 'Contact',
    ]);
    await expect(page.locator('.hero-tagline')).toHaveText('Laser engraving and 3D printing');
    await expect(page.locator('.hero-sub')).toContainText('3D printing and engraving are my passion');
    await expect(page.locator('.hero-cta')).toHaveText('Make a no-obligation inquiry →');
  });

  test('uses "text me" instead of "write" in the English copy', async ({ page }) => {
    await expect(page.locator('.hero-sub')).toContainText('Just text me and we will figure out');
    await expect(page.locator('#contact')).toContainText('do not hesitate to text me.');
    // The word "write" must not appear anywhere in the English page
    const text = await page.evaluate(() => document.body.innerText);
    expect(text).not.toMatch(/\bwrit(e|ing)\b/i);
  });

  test('translates section titles that contain markup', async ({ page }) => {
    await expect(page.locator('#services .section-title')).toHaveText('My services');
    await expect(page.locator('#gallery .section-title')).toHaveText('Gallery of creations');
    await expect(page.locator('#repos .section-title')).toHaveText('Design repositories');
    await expect(page.locator('#social .section-title')).toHaveText('Social media');
    await expect(page.locator('#contact .section-title')).toHaveText('Contact & orders');
    // The highlighted <span> is preserved
    await expect(page.locator('#services .section-title span')).toHaveText('services');
  });

  test('translates service cards, social button, contact and footer', async ({ page }) => {
    await expect(page.locator('.service-card h3')).toHaveText(['Laser engraving', '3D printing']);
    await expect(page.locator('.service-card .repo-arrow')).toHaveText(['Materials overview ↗', 'Materials guide ↗']);
    await expect(page.locator('.social-btn.instagram')).toContainText('@MichalJor on Instagram');
    await expect(page.locator('#contact')).toContainText('Jičín, Czech Republic');
    await expect(page.locator('#contact')).toContainText('When enquiring, please include');
    await expect(page.locator('footer')).toContainText('Laser engraving and 3D printing');
  });

  test('keeps brand name, e-mail and links untouched', async ({ page }) => {
    await expect(page.locator('.hero-name')).toHaveText('MichaelTheMaker');
    await expect(page.locator('a[href^="mailto:"]')).toHaveAttribute('href', 'mailto:michal.jor96@gmail.com');
    await expect(page.locator('.repo-name')).toHaveText(['MakerWorld', 'Printables', '3Axis – Laser Cut']);
    await expect(page.locator('a.service-card').first()).toHaveAttribute('href', /mimowork\.com/);
  });

  test('every marked element shows its English string', async ({ page }) => {
    const mismatches = await page.evaluate(() => {
      const en = window.TRANSLATIONS.en;
      const bad = [];
      document.querySelectorAll('[data-i18n]').forEach((el) => {
        if (el.textContent !== en[el.dataset.i18n]) bad.push(el.dataset.i18n);
      });
      document.querySelectorAll('[data-i18n-html]').forEach((el) => {
        if (el.innerHTML !== en[el.dataset.i18nHtml]) bad.push(el.dataset.i18nHtml);
      });
      document.querySelectorAll('[data-i18n-aria-label]').forEach((el) => {
        if (el.getAttribute('aria-label') !== en[el.dataset.i18nAriaLabel]) bad.push(el.dataset.i18nAriaLabel);
      });
      return bad;
    });
    expect(mismatches).toEqual([]);
  });
});

/* ── 3. SWITCH BACK ─────────────────────────────────────── */
test('switching EN → CS restores the original Czech page exactly', async ({ page }) => {
  const before = norm(await page.evaluate(() => document.body.innerText));

  await switchTo(page, 'English');
  expect(norm(await page.evaluate(() => document.body.innerText))).not.toBe(before);

  await switchTo(page, 'Čeština');
  expect(norm(await page.evaluate(() => document.body.innerText))).toBe(before);
  await expect(page.locator('html')).toHaveAttribute('lang', 'cs');
  await expect(page).toHaveTitle('MichaelTheMaker – Laserové gravírování a 3D tisk');
});

/* ── 4. TRANSLATION FILE INTEGRITY ──────────────────────── */
test.describe('Translation integrity', () => {
  test('cs and en define exactly the same keys, none empty', async ({ page }) => {
    const result = await page.evaluate(() => {
      const { cs, en } = window.TRANSLATIONS;
      return {
        onlyCs: Object.keys(cs).filter((k) => !(k in en)),
        onlyEn: Object.keys(en).filter((k) => !(k in cs)),
        empty: [...Object.entries(cs), ...Object.entries(en)].filter(([, v]) => !v.trim()).map(([k]) => k),
      };
    });
    expect(result).toEqual({ onlyCs: [], onlyEn: [], empty: [] });
  });

  test('every data-i18n key used in index.html exists in both languages', async ({ page }) => {
    const missing = await page.evaluate(() => {
      const { cs, en } = window.TRANSLATIONS;
      const keys = new Set();
      document.querySelectorAll('[data-i18n],[data-i18n-html],[data-i18n-aria-label]').forEach((el) => {
        ['i18n', 'i18nHtml', 'i18nAriaLabel'].forEach((a) => el.dataset[a] && keys.add(el.dataset[a]));
      });
      return [...keys].filter((k) => !(k in cs) || !(k in en));
    });
    expect(missing).toEqual([]);
  });
});

/* ── 5. MOBILE ──────────────────────────────────────────── */
test.describe('Mobile layout', () => {
  test.use({ viewport: { width: 375, height: 700 } });

  test('hamburger label follows the language and the open/closed state', async ({ page }) => {
    // Czech, closed → open
    await page.getByRole('button', { name: 'Otevřít menu' }).click();
    await expect(page.getByRole('button', { name: 'Zavřít menu' })).toHaveAttribute('aria-expanded', 'true');

    // Switching language closes the menu (click outside the panel) and relabels the button
    await switchTo(page, 'English');
    await expect(page.getByRole('button', { name: 'Open menu' })).toHaveAttribute('aria-expanded', 'false');

    // English, closed → open
    await page.getByRole('button', { name: 'Open menu' }).click();
    await expect(page.getByRole('button', { name: 'Close menu' })).toBeVisible();
  });

  test('menu links are translated', async ({ page }) => {
    await switchTo(page, 'English');
    await page.getByRole('button', { name: 'Open menu' }).click();
    await expect(page.getByRole('link', { name: 'Services' })).toBeVisible();
  });
});

test.describe('Smallest phones (320px)', () => {
  test.use({ viewport: { width: 320, height: 640 } });

  test('header fits: switcher is fully visible, no horizontal overflow', async ({ page }) => {
    const box = await page.locator('.lang-switch').boundingBox();
    expect(box.x).toBeGreaterThanOrEqual(0);
    expect(box.x + box.width).toBeLessThanOrEqual(320);

    // Logo, switcher and hamburger must not overlap each other
    const logo = await page.locator('.nav-logo').boundingBox();
    expect(logo.x + logo.width).toBeLessThanOrEqual(box.x);

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    expect(overflow).toBe(false);
  });
});

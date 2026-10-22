/* ============================================================
   tests/favicon.spec.ts
   Favicon, home-screen icons and web manifest.

   Checks that every icon referenced from <head> and from
   site.webmanifest really exists and is served correctly.
============================================================ */
import type { Page } from '@playwright/test';
import { test, expect } from './fixtures';

// Shape of site.webmanifest (only the fields the tests look at)
interface WebManifest {
  name: string;
  short_name: string;
  start_url: string;
  theme_color: string;
  background_color: string;
  icons: { src: string; sizes: string; type: string; purpose: string }[];
}

// Resolve a (relative) href against the current page URL
const abs = (page: Page, href: string): string => new URL(href, page.url()).toString();

test.describe('Favicon & icons', () => {
  test('<head> declares favicon, apple-touch-icon, manifest and theme-color', async ({ page }) => {
    await expect(page.locator('link[rel="icon"][href="favicon.ico"]')).toHaveCount(1);
    await expect(page.locator('link[rel="icon"][sizes="32x32"][type="image/png"]')).toHaveCount(1);
    await expect(page.locator('link[rel="icon"][sizes="16x16"][type="image/png"]')).toHaveCount(1);
    await expect(page.locator('link[rel="apple-touch-icon"][sizes="180x180"]')).toHaveCount(1);
    await expect(page.locator('link[rel="manifest"]')).toHaveAttribute('href', 'site.webmanifest');
    await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute('content', '#0f0e0c');
  });

  test('every icon link in <head> resolves to an image', async ({ page, request }) => {
    const hrefs = await page.$$eval(
      'link[rel="icon"], link[rel="apple-touch-icon"]',
      (els) => els.map((e) => e.getAttribute('href') ?? '')
    );
    expect(hrefs.length).toBeGreaterThanOrEqual(4);
    for (const href of hrefs) {
      const res = await request.get(abs(page, href));
      expect(res.status(), href).toBe(200);
      expect(res.headers()['content-type'], href).toMatch(/image\//);
    }
  });

  test('PNG icons have the declared dimensions', async ({ page }) => {
    const sizes = await page.evaluate(async () => {
      const load = (src: string) => new Promise<[number, number]>((ok) => { const i = new Image(); i.onload = () => ok([i.naturalWidth, i.naturalHeight]); i.src = src; });
      return {
        f16:  await load('assets/icons/favicon-16x16.png'),
        f32:  await load('assets/icons/favicon-32x32.png'),
        apple: await load('apple-touch-icon.png'),
        i192: await load('assets/icons/icon-192.png'),
        i512: await load('assets/icons/icon-512.png'),
        mask: await load('assets/icons/icon-maskable-512.png'),
      };
    });
    expect(sizes).toEqual({
      f16: [16, 16], f32: [32, 32], apple: [180, 180],
      i192: [192, 192], i512: [512, 512], mask: [512, 512],
    });
  });

  test('favicon.ico contains 16, 32 and 48 px images', async ({ page, request }) => {
    const buf = await (await request.get(abs(page, 'favicon.ico'))).body();
    expect(buf.readUInt16LE(0)).toBe(0);                 // reserved
    expect(buf.readUInt16LE(2)).toBe(1);                 // type 1 = icon
    const count = buf.readUInt16LE(4);
    const sizes: number[] = [];
    for (let i = 0; i < count; i++) sizes.push(buf[6 + i * 16] || 256);   // width byte of each entry
    expect(sizes.sort((a, b) => a - b)).toEqual([16, 32, 48]);
  });
});

test.describe('Web manifest', () => {
  test('is valid JSON with the required fields', async ({ page, request }) => {
    const res = await request.get(abs(page, 'site.webmanifest'));
    expect(res.status()).toBe(200);
    const m: WebManifest = JSON.parse(await res.text());
    expect(m.name).toContain('MichaelTheMaker');
    expect(m.short_name).toBe('MichaelTheMaker');
    expect(m.start_url).toBe('./');
    expect(m.theme_color).toBe('#0f0e0c');
    expect(m.background_color).toBe('#0f0e0c');
  });

  test('lists 192, 512 and a maskable 512 icon that all exist', async ({ page, request }) => {
    const m: WebManifest = JSON.parse(await (await request.get(abs(page, 'site.webmanifest'))).text());
    const byPurpose = (p: string) => m.icons.filter((i) => i.purpose === p).map((i) => i.sizes).sort();
    expect(byPurpose('any')).toEqual(['192x192', '512x512']);
    expect(byPurpose('maskable')).toEqual(['512x512']);

    for (const icon of m.icons) {
      const res = await request.get(abs(page, new URL(icon.src, abs(page, 'site.webmanifest')).href));
      expect(res.status(), icon.src).toBe(200);
    }
  });
});

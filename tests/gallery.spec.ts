/* ============================================================
   tests/gallery.spec.ts
   Gallery lightbox (large image preview).

   Covers: opening by click / keyboard, correct image, NO visible
   description, closing (button, Escape, backdrop), not closing on
   image click, previous / next with wrap-around, focus handling,
   scroll lock, and translated labels in English.
============================================================ */
import type { Page } from '@playwright/test';
import { test, expect } from './fixtures';

// Image order exactly as in index.html
const IMAGES: string[] = [
  'assets/3d_print_01.png',
  'assets/3d_print_04.jpg',
  'assets/3d_print_05.jpg',
  'assets/3d_print_02.png',
  'assets/3d_print_03.png',
  'assets/laser_01.jpg',
];

// Locators shared by the tests
const locators = (page: Page) => ({
  items:    page.locator('.gallery-item'),
  box:      page.locator('#lightbox'),
  img:      page.locator('#lightbox .lightbox-img'),
  counter:  page.locator('#lightbox .lightbox-counter'),
  close:    page.locator('#lightbox .lightbox-close'),
  prev:     page.locator('#lightbox .lightbox-prev'),
  next:     page.locator('#lightbox .lightbox-next'),
});

test.describe('Gallery thumbnails', () => {
  test('lightbox is closed on page load', async ({ page }) => {
    const { box } = locators(page);
    await expect(box).toBeHidden();
    await expect(page.locator('body')).not.toHaveClass(/lightbox-open/);
  });

  test('all 6 thumbnails are present and accessible as buttons', async ({ page }) => {
    const { items } = locators(page);
    await expect(items).toHaveCount(6);
    for (let i = 0; i < 6; i++) {
      await expect(items.nth(i)).toHaveAttribute('role', 'button');
      await expect(items.nth(i)).toHaveAttribute('tabindex', '0');
      await expect(items.nth(i)).toHaveAttribute('data-full', IMAGES[i]);
      await expect(items.nth(i)).toHaveAttribute('aria-label', /.+/);
    }
  });
});

test.describe('Opening the preview', () => {
  test('click opens the large image and counter, moves focus in', async ({ page }) => {
    const { items, box, img, counter, close } = locators(page);

    await items.nth(3).click();

    await expect(box).toBeVisible();
    await expect(box).toHaveAttribute('role', 'dialog');
    await expect(box).toHaveAttribute('aria-modal', 'true');
    await expect(img).toHaveAttribute('src', IMAGES[3]);
    await expect(img).toHaveAttribute('alt', 'Fotografie 4');   // neutral label, screen readers only
    await expect(counter).toHaveText('4 / 6');
    await expect(close).toBeFocused();
    // Page behind must not scroll while the preview is open
    await expect(page.locator('body')).toHaveClass(/lightbox-open/);
  });

  test('no image description is shown anywhere (gallery or lightbox)', async ({ page }) => {
    const { items, box } = locators(page);
    await expect(page.locator('.lightbox-caption')).toHaveCount(0);
    await expect(page.locator('#gallery figcaption')).toHaveCount(0);
    await items.nth(2).click();
    await expect(box).toHaveText('3 / 6');                       // the counter is the only text
  });

  test('the large image really loads', async ({ page }) => {
    const { items, img } = locators(page);
    await items.first().click();
    await expect
      .poll(() => img.evaluate((el) => {
        const image = el as HTMLImageElement;   // the locator points at an <img>
        return image.complete && image.naturalWidth > 0;
      }))
      .toBe(true);
  });

  for (let i = 0; i < IMAGES.length; i++) {
    test(`thumbnail ${i + 1} opens ${IMAGES[i]}`, async ({ page }) => {
      const { items, img, counter } = locators(page);
      await items.nth(i).click();
      await expect(img).toHaveAttribute('src', IMAGES[i]);
      await expect(counter).toHaveText(`${i + 1} / 6`);
    });
  }

  test('Enter and Space on a focused thumbnail open the preview', async ({ page }) => {
    const { items, box, img } = locators(page);

    await items.nth(1).focus();
    await page.keyboard.press('Enter');
    await expect(box).toBeVisible();
    await expect(img).toHaveAttribute('src', IMAGES[1]);
    await page.keyboard.press('Escape');
    await expect(box).toBeHidden();

    await items.nth(2).focus();
    await page.keyboard.press('Space');
    await expect(box).toBeVisible();
    await expect(img).toHaveAttribute('src', IMAGES[2]);
  });
});

test.describe('Closing the preview', () => {
  test('✕ button closes it, unlocks scroll and restores focus', async ({ page }) => {
    const { items, box, close } = locators(page);
    await items.nth(2).click();
    await expect(box).toBeVisible();

    await close.click();

    await expect(box).toBeHidden();
    await expect(page.locator('body')).not.toHaveClass(/lightbox-open/);
    await expect(items.nth(2)).toBeFocused();
  });

  test('Escape closes it', async ({ page }) => {
    const { items, box } = locators(page);
    await items.first().click();
    await page.keyboard.press('Escape');
    await expect(box).toBeHidden();
  });

  test('clicking the dark backdrop closes it', async ({ page }) => {
    const { items, box } = locators(page);
    await items.first().click();
    await expect(box).toBeVisible();
    await box.click({ position: { x: 8, y: 8 } });   // top-left corner = empty backdrop
    await expect(box).toBeHidden();
  });

  test('clicking the image itself does NOT close it', async ({ page }) => {
    const { items, box, img } = locators(page);
    await items.first().click();
    await img.click();
    await expect(box).toBeVisible();
  });

  test('can be reopened after closing', async ({ page }) => {
    const { items, box, img } = locators(page);
    await items.first().click();
    await page.keyboard.press('Escape');
    await items.nth(4).click();
    await expect(box).toBeVisible();
    await expect(img).toHaveAttribute('src', IMAGES[4]);
  });
});

test.describe('Navigating inside the preview', () => {
  test('next / previous buttons change the image', async ({ page }) => {
    const { items, img, counter, next, prev } = locators(page);
    await items.first().click();

    await next.click();
    await expect(img).toHaveAttribute('src', IMAGES[1]);
    await expect(counter).toHaveText('2 / 6');

    await prev.click();
    await expect(img).toHaveAttribute('src', IMAGES[0]);
    await expect(counter).toHaveText('1 / 6');
  });

  test('wraps around at both ends', async ({ page }) => {
    const { items, img, next, prev } = locators(page);

    await items.first().click();
    await prev.click();                                   // before first → last
    await expect(img).toHaveAttribute('src', IMAGES[5]);

    await next.click();                                   // after last → first
    await expect(img).toHaveAttribute('src', IMAGES[0]);
  });

  test('← and → keys navigate', async ({ page }) => {
    const { items, img } = locators(page);
    await items.nth(2).click();

    await page.keyboard.press('ArrowRight');
    await expect(img).toHaveAttribute('src', IMAGES[3]);
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('ArrowLeft');
    await expect(img).toHaveAttribute('src', IMAGES[1]);
  });

  test('Tab keeps focus inside the dialog', async ({ page }) => {
    const { items, close, prev, next } = locators(page);
    await items.first().click();
    await expect(close).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(prev).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(next).toBeFocused();
    await page.keyboard.press('Tab');                     // wraps back to the first control
    await expect(close).toBeFocused();

    await page.keyboard.press('Shift+Tab');               // and backwards
    await expect(next).toBeFocused();
  });
});

test.describe('Lightbox in English', () => {
  test('controls and image label are translated', async ({ page }) => {
    const { items, box, img, close, prev, next } = locators(page);

    await page.getByRole('button', { name: 'English' }).click();
    await items.nth(5).click();

    await expect(box).toHaveAttribute('aria-label', 'Image preview');
    await expect(close).toHaveAttribute('aria-label', 'Close preview');
    await expect(prev).toHaveAttribute('aria-label', 'Previous image');
    await expect(next).toHaveAttribute('aria-label', 'Next image');
    await expect(img).toHaveAttribute('alt', 'Photo 6');
  });

  test('switching language while open updates the alt text', async ({ page }) => {
    const { items, img } = locators(page);
    await items.nth(0).click();
    await expect(img).toHaveAttribute('alt', 'Fotografie 1');

    // The page behind a modal is normally unreachable by mouse, so trigger the
    // switcher programmatically (same code path as clicking it).
    await page.evaluate(() => window.I18N.setLang('en'));
    await expect(img).toHaveAttribute('alt', 'Photo 1');
  });
});

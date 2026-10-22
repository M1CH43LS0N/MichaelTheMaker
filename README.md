# MichaelTheMaker

A personal website focused on custom **laser engraving** and **3D printing**. The site serves as a digital business card, a portfolio and a contact point for potential customers.

---

## Contents

- [About the project](#about-the-project)
- [Features](#features)
- [Bilingual version (CS / EN)](#bilingual-version-cs--en)
- [Image preview in the gallery](#image-preview-in-the-gallery)
- [Project structure](#project-structure)
- [Technologies used](#technologies-used)
- [Getting started](#getting-started)
- [Adding photos to the gallery](#adding-photos-to-the-gallery)
- [Connecting the contact form](#connecting-the-contact-form)
- [Favicon and icons](#favicon-and-icons)
- [Automated tests (Playwright)](#automated-tests-playwright)
- [Customization](#customization)

---

## About the project

The website was designed with an emphasis on modern aesthetics and user experience. The dark background with warm amber and orange accents evokes the warmth of wood and glowing filament – the materials I work with most often.

The site is built as a pure static website with no dependency on frameworks or server-side logic. Just upload it to any web hosting or GitHub Pages and it works right away.

---

## Features

- **Responsive design** – Mobile First approach; the site works correctly on phones, tablets and computers
- **Scroll animations** – elements fade in smoothly as you scroll through the page, using `IntersectionObserver`
- **Hamburger menu** – on mobile devices the navigation collapses into a slide-out menu
- **Hero section** – a full-screen intro section with an animated title, a pulsing glow effect and an animated laser line
- **Services section** – two cards describing laser engraving and 3D printing, each linking to a materials overview
- **Gallery** – a grid of photos of my own creations, loaded from the local `assets/` folder
- **Image preview (lightbox)** – clicking a photo in the gallery opens a large preview (without a text description) with arrows and keyboard controls
- **Czech / English** – the whole site is available in two languages, the CS | EN switcher is in the header; Czech is the default
- **Repositories** – direct links to the MakerWorld, Printables and 3Axis Laser Cut communities
- **Social media** – a link to the Instagram profile
- **Contact form** – a ready-made form waiting to be connected (Formspree, EmailJS or your own backend)
- **Smooth scrolling** – navigation links scroll smoothly to the relevant section
- **Active section highlight** – the navigation link of the section the user is looking at (or has just clicked) is visually highlighted; this also works for the last section, Contact, on tall monitors
- **Favicon and icons** – an icon in the browser tab, on the iOS and Android home screen, and a `site.webmanifest`
- **Automated tests** – end-to-end tests in Playwright written in TypeScript (languages, translations, lightbox, navigation, favicon)

---

## Project structure

```
MakerMichal/
├── index.html        # Main HTML file – the entire page structure
├── style.css         # Styles – Mobile First, CSS variables, animations
├── script.js         # JavaScript – menu, scroll reveal, active section highlight
├── translations.js   # Translations – "cs" and "en" dictionaries (all texts in one place)
├── i18n.js           # Language logic and the CS | EN switcher
├── lightbox.js       # Image preview for the gallery
├── favicon.ico       # Tab icon (16/32/48 px)
├── apple-touch-icon.png  # iOS home screen icon (180×180)
├── site.webmanifest  # Web manifest (name, colors, icons for Android)
├── package.json      # Dependencies for the tests (Playwright, TypeScript, http-server)
├── playwright.config.ts  # Test configuration (TypeScript)
├── tsconfig.json     # TypeScript settings for the tests (type checking)
├── tests/
│   ├── fixtures.ts       # Shared test setup
│   ├── globals.d.ts      # Types for window.TRANSLATIONS and window.I18N
│   ├── language.spec.ts  # Language and translation tests
│   ├── gallery.spec.ts   # Gallery preview tests
│   ├── navigation.spec.ts # Active section highlight tests
│   ├── favicon.spec.ts   # Favicon and manifest tests
│   └── social.spec.ts    # Instagram button highlight tests
└── assets/
    ├── icons/            # Icons (favicon-16x16, favicon-32x32, icon-192, icon-512, icon-maskable-512, logo-source.jpg)
    ├── 3d_print_01.png
    ├── 3d_print_02.png
    ├── 3d_print_03.png
    ├── 3d_print_04.jpg
    ├── 3d_print_05.jpg
    ├── laser_01.jpg
    └── README.md     # Guide for adding photos
```

---

## Technologies used

| Technology | Purpose |
|---|---|
| HTML5 | Page structure, semantic tags |
| CSS3 | Styles, animations, responsive layout (Grid, Flexbox) |
| Vanilla JavaScript | Interactivity without library dependencies |
| Google Fonts | Fonts: Bebas Neue (headings) + DM Sans (text) |
| IntersectionObserver API | Scroll animations |
| Playwright + TypeScript | Automated end-to-end tests with static type checking (development dependency only) |

The website itself has no npm packages, no frameworks and no build process – the files can be opened directly in a browser (the scripts are deliberately classic scripts, not ES modules, so that opening the site from disk works too). `npm` is only needed to run the tests.

---

## Getting started

### Locally

Just open `index.html` directly in a browser. No installation is required.

For better results (correct loading of fonts and images) I recommend running a simple local server:

```bash
# Python 3
python -m http.server 8000

# Node.js (npx)
npx serve .
```

Then open `http://localhost:8000` in your browser.

### Deploying to GitHub Pages

1. Upload the contents of the `MakerMichal/` folder to a GitHub repository
2. In the repository settings, go to **Settings → Pages**
3. As the source, select the `main` branch and the `/ (root)` folder
4. The site will be available at `https://your-name.github.io/repository-name/`

---

## Adding photos to the gallery

Photos are located in the `assets/` folder and are displayed in the **Gallery** section using the CSS `background-image` property. Clicking a photo opens a large preview (see [Image preview in the gallery](#image-preview-in-the-gallery)).

### Adding a new photo

1. Copy the image into the `assets/` folder (recommended format: `.jpg` or `.webp`, at least 800 × 600 px)
2. In `index.html`, find the section with `id="gallery"`
3. Add a new element to the grid:

```html
<div class="gallery-item" role="button" tabindex="0" aria-haspopup="dialog"
     data-full="assets/photo-name.jpg"
     data-i18n-aria-label="gallery.item7"
     aria-label="Fotografie 7"
     style="background-image: url('assets/photo-name.jpg');
            background-size: cover;
            background-position: center;">
</div>
```

4. In `translations.js`, add the key `gallery.item7` to **both** languages (`cs` and `en`) – it is a short neutral name (e.g. `Fotografie 7` / `Photo 7`) that is read only by screen readers. No photo description is shown on the site.

The lightbox picks up new photos automatically, no additional code is needed.

### Changing the order of photos

The order in the code corresponds to the order on the page – move the `<div class="gallery-item">` blocks as needed.

---

## Bilingual version (CS / EN)

The website exists in Czech and English. **The default language is Czech** – `index.html` contains Czech text, so nothing is rewritten on first load. The **CS | EN** switcher is on the right side of the header (on mobile, next to the hamburger menu).

### How it works

- All translations are in the `translations.js` file (the `cs` and `en` objects).
- Translatable elements in `index.html` have one of these attributes:
  - `data-i18n="key"` – replaces the element's text,
  - `data-i18n-html="key"` – replaces the HTML content (for texts containing `<span>` or `&amp;`),
  - `data-i18n-aria-label="key"` – translates the `aria-label` attribute.
- When the switcher is clicked, `i18n.js` rewrites all marked elements and sets `<html lang>`, `<title>` and the button state (`aria-pressed`). It sends the `i18n:change` event to other scripts (menu, lightbox).
- Brand names (MichaelTheMaker, MakerWorld, Printables, 3Axis), the e-mail address and Instagram are not translated.

### How to change or add text

1. In `translations.js`, edit (or add) the key in **both** the `cs` and `en` blocks.
2. For new text, add the appropriate `data-i18n*` attribute in `index.html`.
3. The Czech text in `index.html` must match the `cs` block – an automated test checks this.

> The selected language is not saved – after the page is refreshed, Czech is always shown.

---

## Image preview in the gallery

Clicking any photo in the gallery opens a full-screen preview (`lightbox.js`, the `#lightbox` markup at the end of `index.html`).

| Action | Controls |
|---|---|
| Open | click a photo, or `Enter` / `Space` on a focused photo |
| Close | the ✕ button, the `Esc` key, a click on the dark background |
| Previous / next | on-screen arrows or the `←` / `→` keys (the first photo follows the last one) |

Other features: a counter ("3 / 6") below the image (no photo description), names for screen readers are translated along with the site, page scrolling is locked, focus stays inside the dialog and returns to the photo after closing, and the animation respects `prefers-reduced-motion`.

---

## Connecting the contact form

The form in the **Contact** section is currently just HTML with no submission logic. To actually receive messages, connect it to one of these services:

### Formspree (the simplest, free)

1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form and copy its ID
3. In `index.html`, change the form's `action` attribute:

```html
<form class="contact-form" action="https://formspree.io/f/YOUR_ID" method="POST">
```

### EmailJS (no backend, free up to 200 messages/month)

1. Sign up at [emailjs.com](https://www.emailjs.com)
2. Set up an e-mail template and a service ID
3. Add the EmailJS SDK to `index.html` and call `emailjs.sendForm()` on submit

---

## Favicon and icons

The icon in the browser tab, in bookmarks/favorites and on the phone home screen is based on the logo (`assets/icons/logo-source.jpg`) with a transparent background. The links are in the `<head>` of `index.html` and are **relative** (without a leading `/`), so they also work on GitHub Pages in a subfolder.

| File | Location | Size | Purpose |
|---|---|---|---|
| `favicon.ico` | site root | 16 + 32 + 48 px in one file | older browsers, Windows, bookmarks |
| `favicon-32x32.png`, `favicon-16x16.png` | `assets/icons/` | 32×32, 16×16 | sharp icon in the tab of modern browsers |
| `apple-touch-icon.png` | site root | 180×180, **no transparency** | "Add to Home Screen" on iPhone / iPad |
| `icon-192.png`, `icon-512.png` | `assets/icons/` | 192×192, 512×512 | Android / Chrome (via the manifest) |
| `icon-maskable-512.png` | `assets/icons/` | 512×512, logo inside the "safe zone" | Android – icon cropped to a circle / rounded shape |
| `site.webmanifest` | site root | – | name, colors and list of icons for Android / Chrome |

The color `#0f0e0c` (the site background) is used as the `theme-color`, the `background_color` and the background of icons that cannot be transparent (iOS, maskable).

### Replacing the logo

1. Replace `assets/icons/logo-source.jpg` with the new logo (square, ideally 1024×1024 px).
2. Re-create all the files from the table above (e.g. via [realfavicongenerator.net](https://realfavicongenerator.net)) and overwrite them under the same names.
3. After changing an icon, browsers often keep the old version in cache – a hard refresh or a new file name / `?v=2` after the link will help.

---

## Automated tests (Playwright)

The tests are written in **Playwright with TypeScript** and run in Chromium against a local server that starts automatically.

### Running

[Node.js](https://nodejs.org) 18+ is required.

```bash
npm install                      # installs Playwright, TypeScript and http-server
npx playwright install chromium  # downloads the browser (only needed once)
npm run typecheck                # (optional) type-checks the tests
npm test                         # runs all tests
```

Other commands:

```bash
npm run test:headed              # with a visible browser window
npm run test:ui                  # interactive UI mode
npm run test:report              # opens the HTML report of the last run
npx playwright test tests/gallery.spec.ts   # just one file
npx playwright test -g "Escape"             # only tests matching a name
```

Playwright runs `.ts` files directly, so no separate compile (build) step is needed. `npm run typecheck` (`tsc --noEmit`) additionally checks the types and catches mistakes before a browser is even started.

If you already have Chrome/Chromium installed, you can use its path instead of downloading: `CHROMIUM_PATH=/path/to/chrome npm test`.

### What the tests cover

| File | Scenarios |
|---|---|
| `tests/language.spec.ts` | the site loads in Czech; the switcher shows CS as active; switching to English changes `<html lang>`, the title, navigation, hero, headings with a `<span>`, service cards, contact and footer; brand names, the e-mail and links stay unchanged; going back to Czech restores the original page; both language versions have the same keys; the Czech HTML text matches the `cs` dictionary; the hamburger menu label on mobile; the header fits at 320 px |
| `tests/gallery.spec.ts` | the lightbox is closed after load; thumbnails are accessible buttons; a click opens the correct image (all 6), the counter, and moves focus; no photo description is shown anywhere; the image actually loads; opening with the keyboard; closing with the button / `Esc` / a click on the background; clicking the image does not close it; previous / next and wrap-around; arrow keys; Tab stays inside the dialog; translation of the screen reader names in English |
| `tests/navigation.spec.ts` | active section highlight: after clicking "Contact", "Social media" is not highlighted (including on a 1920×1080 monitor, where the bug appeared); each link highlights its own section; at most one link is highlighted at any time; after manual scrolling, the highlight follows the page position |
| `tests/favicon.spec.ts` | the `<head>` contains all icons, the manifest and `theme-color`; all referenced files exist and have the correct dimensions; `favicon.ico` contains 16, 32 and 48 px; the manifest is valid JSON with the correct icons |
| `tests/social.spec.ts` | the Instagram button turns orange (`#FF6B1A`) on hover and on keyboard focus, and no pink is left in the CSS |

The tests block Google Fonts so they are fast and independent of the internet (this does not affect the functionality being tested).

---

## Customization

All colors of the site are defined as CSS variables at the beginning of `style.css`. Changing a single value updates the whole site:

```css
:root {
  --clr-bg:      #0f0e0c;   /* main background */
  --clr-surface: #1a1814;   /* section background */
  --clr-wood:    #c8874a;   /* amber – headings and accents */
  --clr-glow:    #ff6b1a;   /* orange – buttons and effects */
  --clr-text:    #e8ddd0;   /* main text */
  --clr-muted:   #7a6e63;   /* secondary text */
}
```

### Most common changes

| What to change | Where |
|---|---|
| Name / brand name | `index.html` – heading, navigation logo, footer |
| E-mail address | `index.html` – Contact section, the `href="mailto:..."` attribute |
| Instagram link | `index.html` – Social media and Contact sections |
| Texts and descriptions | `index.html` (Czech) **and** `translations.js` (Czech + English) |
| English translation | `translations.js` – the `en` block |
| Colors | `style.css` – the `:root` block at the beginning of the file |
| Photos | the `assets/` folder, paths in the Gallery section of `index.html` |

---

## License

This project is a personal presentation and is not intended for redistribution as a template.
The photos in the `assets/` folder are the property of the author and must not be used without permission.

---

*MichaelTheMaker – Jičín, Czech Republic*

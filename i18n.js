/* ============================================================
   i18n.js – MichaelTheMaker
   Language engine + language switcher (Czech / English).

   Requires translations.js to be loaded first.

   Public API (window.I18N):
     I18N.t(key)        → translated string for the current language
     I18N.getLang()     → "cs" | "en"
     I18N.setLang(code) → switch language and update the whole page

   Other scripts are told about a switch through a DOM event:
     document.addEventListener('i18n:change', (e) => e.detail.lang)
============================================================ */
(function () {
  'use strict';

  /* ── CONFIG ──────────────────────────────────────────────
     Czech is the default: index.html ships with Czech text,
     so nothing is rewritten on first load.
  ─────────────────────────────────────────────────────────── */
  const DEFAULT_LANG = 'cs';
  const SUPPORTED    = Object.keys(window.TRANSLATIONS);

  let currentLang = DEFAULT_LANG;

  /* ── LOOKUP ──────────────────────────────────────────────
     Returns the string for `key` in the current language.
     Falls back to Czech, then to the key itself, so a missing
     translation never shows "undefined" on the page.
  ─────────────────────────────────────────────────────────── */
  function t(key) {
    const dict = window.TRANSLATIONS;
    if (dict[currentLang] && key in dict[currentLang]) return dict[currentLang][key];
    if (key in dict[DEFAULT_LANG]) return dict[DEFAULT_LANG][key];
    return key;
  }

  /* ── APPLY TRANSLATIONS TO THE DOM ───────────────────────
     Walks every element carrying a data-i18n* attribute and
     writes the translated value into it.
     innerHTML is only ever fed from our own translations.js
     (never from user input), so it is safe here.
  ─────────────────────────────────────────────────────────── */
  function applyToDom() {
    // Plain text
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      el.textContent = t(el.dataset.i18n);
    });

    // Text that contains markup (<span>, &amp;)
    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      el.innerHTML = t(el.dataset.i18nHtml);
    });

    // aria-label attributes (gallery images, lightbox buttons, switcher group)
    document.querySelectorAll('[data-i18n-aria-label]').forEach((el) => {
      el.setAttribute('aria-label', t(el.dataset.i18nAriaLabel));
    });
  }

  /* ── SWITCHER STATE ──────────────────────────────────────
     Marks the active language button with aria-pressed so both
     the CSS (highlight) and screen readers know which is active.
  ─────────────────────────────────────────────────────────── */
  function updateSwitcher() {
    document.querySelectorAll('.lang-switch [data-lang]').forEach((btn) => {
      btn.setAttribute('aria-pressed', String(btn.dataset.lang === currentLang));
    });
  }

  /* ── SWITCH LANGUAGE ─────────────────────────────────────
     1. update <html lang> (screen readers, hyphenation, SEO)
     2. update <title>
     3. rewrite all marked elements
     4. update the switcher buttons
     5. notify other scripts (menu button label, lightbox …)
  ─────────────────────────────────────────────────────────── */
  function setLang(lang) {
    if (!SUPPORTED.includes(lang) || lang === currentLang) return;

    currentLang = lang;
    document.documentElement.lang = lang;
    document.title = t('meta.title');

    applyToDom();
    updateSwitcher();

    document.dispatchEvent(new CustomEvent('i18n:change', { detail: { lang } }));
  }

  /* ── WIRE UP THE SWITCHER BUTTONS ──────────────────────── */
  document.querySelectorAll('.lang-switch [data-lang]').forEach((btn) => {
    btn.addEventListener('click', () => setLang(btn.dataset.lang));
  });

  /* ── EXPOSE PUBLIC API ─────────────────────────────────── */
  window.I18N = { t, setLang, getLang: () => currentLang };
})();

/* ============================================================
   tests/globals.d.ts
   Type declarations for the globals that the site's own scripts
   put on `window` (translations.js and i18n.js).

   They let the tests call `window.TRANSLATIONS` / `window.I18N`
   inside page.evaluate() with full type checking.
============================================================ */

type Lang = 'cs' | 'en';

interface Translations {
  cs: Record<string, string>;
  en: Record<string, string>;
}

interface I18NApi {
  t(key: string): string;
  setLang(lang: Lang): void;
  getLang(): Lang;
}

declare global {
  interface Window {
    TRANSLATIONS: Translations;
    I18N: I18NApi;
  }
}

export {};

/* ============================================================
   translations.js – MichaelTheMaker
   Single source of truth for every translatable string.

   HOW IT IS USED
     - index.html marks translatable elements with:
         data-i18n="key"             → replaces the element's text
         data-i18n-html="key"        → replaces the element's inner HTML
                                       (only for strings that contain
                                       markup such as <span> or &amp;)
         data-i18n-aria-label="key"  → replaces the aria-label attribute
     - i18n.js looks the keys up here when the language is switched.
     - The Czech text in index.html is the default that is shown on
       first load; the "cs" block below must mirror it exactly so that
       switching EN → CS restores the original wording.

   HOW TO ADD A STRING
     1. Add the same key to BOTH "cs" and "en".
     2. Add the matching data-i18n* attribute in index.html.
     (An automated test fails if a key exists in only one language.)

   Brand names (MichaelTheMaker, MakerWorld, Printables, 3Axis …),
   the e-mail address and the Instagram handle are intentionally
   not translated.

   NOTE: This is a plain script (no ES modules) on purpose, so the
   site still works when index.html is opened straight from disk.
============================================================ */
window.TRANSLATIONS = {

  /* ── ČESKY (default) ─────────────────────────────────────── */
  cs: {
    'meta.title': 'MichaelTheMaker – Laserové gravírování a 3D tisk',

    // Navigation
    'nav.services': 'Služby',
    'nav.gallery': 'Galerie',
    'nav.repos': 'Repozitáře',
    'nav.social': 'Sociální sítě',
    'nav.contact': 'Kontakt',
    'nav.openMenu': 'Otevřít menu',
    'nav.closeMenu': 'Zavřít menu',
    'lang.group': 'Jazyk',

    // Hero
    'hero.tagline': 'Laserové gravírování a 3D tisk',
    'hero.sub': '3D tisk a gravírování jsou moje vášeň, kterou měním v realitu podle vašich představ. Nejraději pro vás proměňuji hotové modely – ať už z repozitářů, nebo ty, které si sami navrhnete. A když máte v hlavě něco speciálního, co nikde jinde není? Stačí napsat a vymyslíme, jak to společně dáme do kupy.',
    'hero.cta': 'Nezávazně poptat →',

    // Services
    'services.label': 'Co nabízím',
    'services.title': 'Moje <span>služby</span>',
    'services.intro': 'Sháníte kreativní hračky pro Vaše ratolesti, stylový stojánek na mobil, nebo dřevěné hodiny s fotkou pro Vaše blízké? Stačí říct – s mou technikou se meze nekladou a vytvořím přesně to, co hledáte.',
    'services.laser.title': 'Laserové gravírování',
    'services.laser.text': 'Gravírování a vypalování vzorů, nápisů nebo fotografií do dřeva, překližky, kůže a dalších materiálů. Ideální pro personalizované dárky, dekorace nebo nápisy.',
    'services.laser.link': 'Přehled materiálů ↗',
    'services.print.title': '3D tisk',
    'services.print.text': 'Tisk funkčních prototypů, designových doplňků, náhradních dílů i unikátních dekorativních předmětů. Pracuji s PLA, PETG a dalšími filamentovými materiály.',
    'services.print.link': 'Průvodce materiály ↗',

    // Gallery
    'gallery.label': 'Moje práce',
    'gallery.title': 'Galerie <span>výtvorů</span>',
    'gallery.intro': 'Ukázky dokončených projektů – od personalizovaných dárkových předmětů po funkční 3D výtisky a gravírované dřevěné dekorace.',
    // Short neutral labels for the gallery images (screen readers only: button
    // label + lightbox alt text). No visible descriptions are shown.
    // Numbered in the order the images appear in index.html
    'gallery.item1': 'Fotografie 1',
    'gallery.item2': 'Fotografie 2',
    'gallery.item3': 'Fotografie 3',
    'gallery.item4': 'Fotografie 4',
    'gallery.item5': 'Fotografie 5',
    'gallery.item6': 'Fotografie 6',

    // Lightbox controls
    'lightbox.dialog': 'Náhled obrázku',
    'lightbox.close': 'Zavřít náhled',
    'lightbox.prev': 'Předchozí obrázek',
    'lightbox.next': 'Další obrázek',

    // Repositories
    'repos.label': 'Inspirace & soubory',
    'repos.title': 'Repozitáře <span>návrhů</span>',
    'repos.intro': 'Procházejte komunitní repozitáře plné volně dostupných modelů pro 3D tisk i souborů pro laserové řezání.',
    'repos.makerworld': 'Velká komunita pro sdílení 3D tiskových modelů od Bambu Lab. Tisíce prověřených souborů zdarma.',
    'repos.printables': 'Komunitní platforma Prusa Research s rozsáhlou knihovnou 3D modelů v češtině.',
    'repos.axis': 'Bezplatné vektorové soubory pro laserové řezání a gravírování: dekorace, krabičky, písmena a mnoho dalšího.',

    // Social
    'social.label': 'Sledujte mě',
    'social.title': 'Sociální <span>sítě</span>',
    'social.intro': 'Hoďte mi follow na Instagramu! Uvidíte tam moje nové kousky jako první, mrknete se pod pokličku toho, jak tvořím, a občas tam nasdílím i něco z mého osobního života – od cestování až po dobré jídlo.',
    'social.button': '@MichalJor na Instagramu',

    // Contact
    'contact.label': 'Zájem o výrobek?',
    'contact.title': 'Kontakt &amp; <span>objednávka</span>',
    'contact.intro': 'Pokud máte zájem o výrobek na míru, poptávku nebo jen chcete vědět víc – neváhejte napsat.',
    'contact.location': 'Jičín, Česká republika',
    'contact.tip': '💡 Při poptávce prosím uveďte: co chcete vyrobit, z jakého materiálu, rozměry a termín, do kdy výrobek potřebujete.',

    // Footer
    'footer.text': '© 2026 <span>MichaelTheMaker</span> — Laserové gravírování a 3D tisk'
  },

  /* ── ENGLISH ─────────────────────────────────────────────── */
  en: {
    'meta.title': 'MichaelTheMaker – Laser engraving and 3D printing',

    // Navigation
    'nav.services': 'Services',
    'nav.gallery': 'Gallery',
    'nav.repos': 'Repositories',
    'nav.social': 'Social media',
    'nav.contact': 'Contact',
    'nav.openMenu': 'Open menu',
    'nav.closeMenu': 'Close menu',
    'lang.group': 'Language',

    // Hero
    'hero.tagline': 'Laser engraving and 3D printing',
    'hero.sub': '3D printing and engraving are my passion, and I turn them into reality based on your ideas. I most enjoy bringing ready-made models to life for you – whether they come from repositories or are ones you designed yourself. And if you have something special in mind that exists nowhere else? Just text me and we will figure out how to put it together.',
    'hero.cta': 'Make a no-obligation inquiry →',

    // Services
    'services.label': 'What I offer',
    'services.title': 'My <span>services</span>',
    'services.intro': 'Looking for creative toys for your kids, a stylish phone stand, or a wooden clock with a photo for your loved ones? Just say the word – with my equipment there are no limits, and I will create exactly what you are looking for.',
    'services.laser.title': 'Laser engraving',
    'services.laser.text': 'Engraving and burning patterns, lettering or photographs into wood, plywood, leather and other materials. Ideal for personalised gifts, decorations or signs.',
    'services.laser.link': 'Materials overview ↗',
    'services.print.title': '3D printing',
    'services.print.text': 'Printing of functional prototypes, design accessories, spare parts and unique decorative objects. I work with PLA, PETG and other filament materials.',
    'services.print.link': 'Materials guide ↗',

    // Gallery
    'gallery.label': 'My work',
    'gallery.title': 'Gallery of <span>creations</span>',
    'gallery.intro': 'Examples of finished projects – from personalised gift items to functional 3D prints and engraved wooden decorations.',
    'gallery.item1': 'Photo 1',
    'gallery.item2': 'Photo 2',
    'gallery.item3': 'Photo 3',
    'gallery.item4': 'Photo 4',
    'gallery.item5': 'Photo 5',
    'gallery.item6': 'Photo 6',

    // Lightbox controls
    'lightbox.dialog': 'Image preview',
    'lightbox.close': 'Close preview',
    'lightbox.prev': 'Previous image',
    'lightbox.next': 'Next image',

    // Repositories
    'repos.label': 'Inspiration & files',
    'repos.title': 'Design <span>repositories</span>',
    'repos.intro': 'Browse community repositories full of freely available models for 3D printing and files for laser cutting.',
    'repos.makerworld': 'A large community for sharing 3D printing models from Bambu Lab. Thousands of proven files for free.',
    'repos.printables': 'Prusa Research community platform with an extensive library of 3D models, also available in Czech.',
    'repos.axis': 'Free vector files for laser cutting and engraving: decorations, boxes, letters and much more.',

    // Social
    'social.label': 'Follow me',
    'social.title': 'Social <span>media</span>',
    'social.intro': 'Give me a follow on Instagram! You will see my new pieces first, get a peek behind the scenes of how I create, and now and then I will share something from my personal life – from travelling to good food.',
    'social.button': '@MichalJor on Instagram',

    // Contact
    'contact.label': 'Interested in a product?',
    'contact.title': 'Contact &amp; <span>orders</span>',
    'contact.intro': 'If you are interested in a custom-made product, an enquiry, or simply want to know more – do not hesitate to text me.',
    'contact.location': 'Jičín, Czech Republic',
    'contact.tip': '💡 When enquiring, please include: what you want made, from which material, the dimensions, and the deadline by which you need the product.',

    // Footer
    'footer.text': '© 2026 <span>MichaelTheMaker</span> — Laser engraving and 3D printing'
  }
};

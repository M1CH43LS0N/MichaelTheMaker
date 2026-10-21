# MichaelTheMaker

Osobní webová prezentace zaměřená na zakázkové **laserové gravírování** a **3D tisk**. Stránka slouží jako digitální vizitka, portfolio a kontaktní bod pro potenciální zákazníky.

---

## Obsah

- [O projektu](#o-projektu)
- [Funkce](#funkce)
- [Dvojjazyčná verze (CS / EN)](#dvojjazyčná-verze-cs--en)
- [Náhled obrázků v galerii](#náhled-obrázků-v-galerii)
- [Struktura projektu](#struktura-projektu)
- [Použité technologie](#použité-technologie)
- [Spuštění](#spuštění)
- [Přidání fotografií do galerie](#přidání-fotografií-do-galerie)
- [Napojení kontaktního formuláře](#napojení-kontaktního-formuláře)
- [Favicon a ikony](#favicon-a-ikony)
- [Automatické testy (Playwright)](#automatické-testy-playwright)
- [Přizpůsobení](#přizpůsobení)

---

## O projektu

Web byl navržen s důrazem na moderní estetiku a uživatelský zážitek. Tmavé pozadí s teplými jantarovými a oranžovými akcenty evokuje teplo dřeva a žhavého filamentu – materiálů, se kterými pracuji nejčastěji.

Stránka je postavena jako čistý statický web bez závislostí na frameworcích nebo serverové logice. Stačí ji nahrát na jakýkoliv webhosting nebo GitHub Pages a okamžitě funguje.

---

## Funkce

- **Responzivní design** – přístup Mobile First; web funguje správně na mobilech, tabletech i počítačích
- **Animace při scrollování** – prvky se plynule zobrazují při procházení stránky pomocí `IntersectionObserver`
- **Hamburger menu** – na mobilních zařízeních se navigace skryje do vysouvacího menu
- **Hero sekce** – plnoobrazovková úvodní sekce s animovaným názvem, pulzujícím světelným efektem a animovanou laserovou linkou
- **Sekce služeb** – dvě karty popisující laserové gravírování a 3D tisk, každá odkazuje na přehled materiálů
- **Galerie** – mřížka fotografií vlastních výtvorů načítaná z lokální složky `assets/`
- **Náhled obrázků (lightbox)** – kliknutím na fotografii v galerii se otevře velký náhled (bez textového popisu) se šipkami a ovládáním z klávesnice
- **Čeština / angličtina** – celý web je dostupný ve dvou jazycích, přepínač CS | EN je v hlavičce; výchozí je čeština
- **Repozitáře** – přímé odkazy na komunity MakerWorld, Printables a 3Axis Laser Cut
- **Sociální sítě** – odkaz na Instagram profil
- **Kontaktní formulář** – připravený formulář čekající na napojení (Formspree, EmailJS nebo vlastní backend)
- **Plynulé scrollování** – navigační odkazy plynule posunují na příslušnou sekci
- **Zvýraznění aktivní sekce** – navigační odkaz sekce, na kterou se uživatel dívá (nebo na kterou právě klikl), se vizuálně odliší; funguje i pro poslední sekci Kontakt na vysokých monitorech
- **Favicon a ikony** – ikona v záložce prohlížeče, na ploše iOS a Androidu a `site.webmanifest`
- **Automatické testy** – end-to-end testy v Playwrightu (jazyky, překlady, lightbox)

---

## Struktura projektu

```
MakerMichal/
├── index.html        # Hlavní HTML soubor – veškerá struktura stránky
├── style.css         # Styly – Mobile First, CSS proměnné, animace
├── script.js         # JavaScript – menu, scroll reveal, zvýraznění aktivní sekce
├── translations.js   # Překlady – slovníky "cs" a "en" (všechny texty na jednom místě)
├── i18n.js           # Jazyková logika a přepínač CS | EN
├── lightbox.js       # Náhled obrázků z galerie
├── favicon.ico       # Ikona záložky (16/32/48 px)
├── apple-touch-icon.png  # Ikona pro plochu iOS (180×180)
├── site.webmanifest  # Webový manifest (název, barvy, ikony pro Android)
├── package.json      # Závislosti pro testy (Playwright, http-server)
├── playwright.config.js  # Konfigurace testů
├── tests/
│   ├── fixtures.js       # Společná příprava testů
│   ├── language.spec.js  # Testy jazyků a překladů
│   ├── gallery.spec.js   # Testy náhledu galerie
│   ├── navigation.spec.js # Testy zvýraznění aktivní sekce
│   └── favicon.spec.js   # Testy favicon a manifestu
└── assets/
    ├── icons/            # Ikony (favicon-16x16, favicon-32x32, icon-192, icon-512, icon-maskable-512, logo-source.jpg)
    ├── 3d_print_01.png
    ├── 3d_print_02.png
    ├── 3d_print_03.png
    ├── 3d_print_04.jpg
    ├── 3d_print_05.jpg
    ├── laser_01.jpg
    └── README.md     # Návod pro přidávání fotografií
```

---

## Použité technologie

| Technologie | Účel |
|---|---|
| HTML5 | Struktura stránky, sémantické tagy |
| CSS3 | Styly, animace, responzivní layout (Grid, Flexbox) |
| Vanilla JavaScript | Interaktivita bez závislostí na knihovnách |
| Google Fonts | Písma: Bebas Neue (nadpisy) + DM Sans (text) |
| IntersectionObserver API | Animace při scrollování |
| Playwright (JavaScript) | Automatické end-to-end testy (pouze vývojová závislost) |

Web samotný nemá žádné npm balíčky, žádné frameworky ani build proces – soubory lze otevřít přímo v prohlížeči (skripty jsou záměrně klasické, ne ES moduly, aby fungovalo i otevření z disku). `npm` je potřeba pouze ke spouštění testů.

---

## Spuštění

### Lokálně

Stačí otevřít `index.html` přímo v prohlížeči. Žádná instalace není nutná.

Pro lepší výsledky (správné načítání fontů a obrázků) doporučuji spustit jednoduchý lokální server:

```bash
# Python 3
python -m http.server 8000

# Node.js (npx)
npx serve .
```

Pak otevřít `http://localhost:8000` v prohlížeči.

### Nasazení na GitHub Pages

1. Nahrajte obsah složky `MakerMichal/` do GitHub repozitáře
2. V nastavení repozitáře přejděte na **Settings → Pages**
3. Jako zdroj vyberte větev `main` a složku `/ (root)`
4. Web bude dostupný na `https://vase-jmeno.github.io/nazev-repozitare/`

---

## Přidání fotografií do galerie

Fotografie se nacházejí ve složce `assets/` a jsou zobrazeny v sekci **Galerie** pomocí CSS vlastnosti `background-image`. Kliknutím se otevře velký náhled (viz [Náhled obrázků v galerii](#náhled-obrázků-v-galerii)).

### Přidání nové fotografie

1. Zkopírujte obrázek do složky `assets/` (doporučený formát: `.jpg` nebo `.webp`, minimálně 800 × 600 px)
2. V souboru `index.html` vyhledejte sekci `id="gallery"`
3. Přidejte nový element do mřížky:

```html
<div class="gallery-item" role="button" tabindex="0" aria-haspopup="dialog"
     data-full="assets/nazev-fotky.jpg"
     data-i18n-aria-label="gallery.item7"
     aria-label="Fotografie 7"
     style="background-image: url('assets/nazev-fotky.jpg');
            background-size: cover;
            background-position: center;">
</div>
```

4. V `translations.js` přidejte klíč `gallery.item7` do **obou** jazyků (`cs` i `en`) – jde o krátký neutrální název (např. `Fotografie 7` / `Photo 7`), který čtou pouze odečítače obrazovky. Žádný popis fotografie se na webu nezobrazuje.

Lightbox si nové fotografie najde automaticky, žádný další kód není potřeba.

### Změna pořadí fotografií

Pořadí v kódu odpovídá pořadí zobrazení na stránce – přesuňte bloky `<div class="gallery-item">` dle potřeby.

---

## Dvojjazyčná verze (CS / EN)

Web existuje v češtině a angličtině. **Výchozí jazyk je čeština** – `index.html` obsahuje český text, takže se při prvním načtení nic nepřepisuje. Přepínač **CS | EN** je v hlavičce vpravo (na mobilu vedle hamburger menu).

### Jak to funguje

- Všechny překlady jsou v souboru `translations.js` (objekty `cs` a `en`).
- Přeložitelné prvky v `index.html` mají atribut:
  - `data-i18n="klic"` – nahradí text prvku,
  - `data-i18n-html="klic"` – nahradí HTML obsah (pro texty se `<span>` nebo `&amp;`),
  - `data-i18n-aria-label="klic"` – přeloží atribut `aria-label`.
- `i18n.js` po kliknutí na přepínač přepíše všechny označené prvky, nastaví `<html lang>`, `<title>` a stav tlačítek (`aria-pressed`). Ostatním skriptům (menu, lightbox) pošle událost `i18n:change`.
- Názvy značek (MichaelTheMaker, MakerWorld, Printables, 3Axis), e-mail a Instagram se nepřekládají.

### Jak změnit nebo přidat text

1. V `translations.js` upravte (nebo přidejte) klíč v **obou** blocích `cs` i `en`.
2. U nového textu přidejte v `index.html` příslušný atribut `data-i18n*`.
3. Český text v `index.html` musí odpovídat bloku `cs` – hlídá to automatický test.

> Zvolený jazyk se neukládá – po obnovení stránky se vždy zobrazí čeština.

---

## Náhled obrázků v galerii

Kliknutí na libovolnou fotografii v galerii otevře celoobrazovkový náhled (`lightbox.js`, markup `#lightbox` na konci `index.html`).

| Akce | Ovládání |
|---|---|
| Otevřít | klik na fotografii, nebo `Enter` / `Mezerník` na zaostřené fotografii |
| Zavřít | tlačítko ✕, klávesa `Esc`, klik na tmavé pozadí |
| Předchozí / další | šipky na obrazovce nebo klávesy `←` / `→` (po poslední fotce následuje první) |

Další vlastnosti: počet ("3 / 6") pod obrázkem (bez popisu fotografie), názvy pro odečítače se překládají s webem, zamknuté scrollování stránky, focus zůstává uvnitř dialogu a po zavření se vrací na fotografii, animace respektuje `prefers-reduced-motion`.

---

## Napojení kontaktního formuláře

Formulář v sekci **Kontakt** je momentálně pouze HTML bez odesílací logiky. Pro skutečné přijímání zpráv ho napojte na jednu z těchto služeb:

### Formspree (nejjednodušší, zdarma)

1. Zaregistrujte se na [formspree.io](https://formspree.io)
2. Vytvořte nový formulář a zkopírujte ID
3. V `index.html` změňte atribut `action` formuláře:

```html
<form class="contact-form" action="https://formspree.io/f/VASE_ID" method="POST">
```

### EmailJS (bez backendu, zdarma do 200 zpráv/měsíc)

1. Zaregistrujte se na [emailjs.com](https://www.emailjs.com)
2. Nastavte e-mailovou šablonu a service ID
3. Přidejte EmailJS SDK do `index.html` a zavolejte `emailjs.sendForm()` při odeslání

---

## Favicon a ikony

Ikona v záložce prohlížeče, v záložkách/oblíbených a na ploše telefonu vychází z loga (`assets/icons/logo-source.jpg`) s průhledným pozadím. Odkazy jsou v `<head>` souboru `index.html` a jsou **relativní** (bez úvodního `/`), takže fungují i na GitHub Pages v podsložce.

| Soubor | Umístění | Velikost | K čemu slouží |
|---|---|---|---|
| `favicon.ico` | kořen webu | 16 + 32 + 48 px v jednom souboru | starší prohlížeče, Windows, záložky |
| `favicon-32x32.png`, `favicon-16x16.png` | `assets/icons/` | 32×32, 16×16 | ostrá ikona v záložce moderních prohlížečů |
| `apple-touch-icon.png` | kořen webu | 180×180, **bez průhlednosti** | „Přidat na plochu“ na iPhonu / iPadu |
| `icon-192.png`, `icon-512.png` | `assets/icons/` | 192×192, 512×512 | Android / Chrome (přes manifest) |
| `icon-maskable-512.png` | `assets/icons/` | 512×512, logo uvnitř „bezpečné zóny“ | Android – ikona oříznutá do kruhu / zaoblení |
| `site.webmanifest` | kořen webu | – | název, barvy a seznam ikon pro Android / Chrome |

Barva `#0f0e0c` (pozadí webu) je použita jako `theme-color`, `background_color` a pozadí ikon, které nemohou být průhledné (iOS, maskable).

### Výměna loga

1. Nahraďte `assets/icons/logo-source.jpg` novým logem (čtvercové, ideálně 1024×1024 px).
2. Vytvořte znovu všechny soubory z tabulky výše (např. přes [realfavicongenerator.net](https://realfavicongenerator.net)) a přepište je pod stejnými názvy.
3. Po změně ikony prohlížeče často drží starou verzi v cache – pomůže tvrdé obnovení nebo nový název souboru / `?v=2` za odkazem.

---

## Automatické testy (Playwright)

Testy jsou napsané v **Playwrightu (JavaScript)** a běží v Chromiu proti lokálnímu serveru, který se spustí automaticky.

### Spuštění

Je potřeba [Node.js](https://nodejs.org) 18+.

```bash
npm install                      # nainstaluje Playwright a http-server
npx playwright install chromium  # stáhne prohlížeč (stačí jednou)
npm test                         # spustí všechny testy
```

Další příkazy:

```bash
npm run test:headed              # s viditelným oknem prohlížeče
npm run test:ui                  # interaktivní UI režim
npm run test:report              # otevře HTML report posledního běhu
npx playwright test tests/gallery.spec.js   # jen jeden soubor
npx playwright test -g "Escape"             # jen testy podle názvu
```

Pokud už máte nainstalovaný Chrome/Chromium, můžete použít jeho cestu místo stahování: `CHROMIUM_PATH=/cesta/k/chrome npm test`.

### Co testy pokrývají

| Soubor | Scénáře |
|---|---|
| `tests/language.spec.js` | web se načte česky; přepínač ukazuje CS jako aktivní; přepnutí na angličtinu změní `<html lang>`, titulek, navigaci, hero, nadpisy se `<span>`, karty služeb, kontakt i patičku; značky, e-mail a odkazy zůstanou beze změny; návrat na češtinu obnoví původní stránku; obě jazykové verze mají stejné klíče; český HTML text odpovídá slovníku `cs`; popisek hamburger menu na mobilu; hlavička se vejde na 320 px |
| `tests/gallery.spec.js` | lightbox je po načtení zavřený; miniatury jsou přístupná tlačítka; klik otevře správný obrázek (všech 6), počítadlo a přesune focus; nikde se nezobrazuje popis fotografie; obrázek se skutečně načte; otevření klávesnicí; zavření tlačítkem / `Esc` / klikem na pozadí; klik na obrázek nezavře; předchozí / další a zacyklení; šipky na klávesnici; Tab zůstává v dialogu; překlad názvů pro odečítače v angličtině |
| `tests/navigation.spec.js` | zvýraznění aktivní sekce: po kliknutí na „Kontakt“ se nezvýrazní „Sociální sítě“ (včetně monitoru 1920×1080, kde se chyba projevovala); každý odkaz zvýrazní svou sekci; vždy je zvýrazněn nejvýše jeden odkaz; po ručním scrollování se zvýraznění řídí polohou stránky |
| `tests/favicon.spec.js` | `<head>` obsahuje všechny ikony, manifest a `theme-color`; všechny odkazované soubory existují a mají správné rozměry; `favicon.ico` obsahuje 16, 32 a 48 px; manifest je platný JSON se správnými ikonami |

Testy blokují Google Fonts, aby byly rychlé a nezávislé na internetu (nemá to vliv na testovanou funkčnost).

---

## Přizpůsobení

Všechny barvy webu jsou definovány jako CSS proměnné na začátku souboru `style.css`. Změna jedné hodnoty aktualizuje celý web:

```css
:root {
  --clr-bg:      #0f0e0c;   /* hlavní pozadí */
  --clr-surface: #1a1814;   /* pozadí sekcí */
  --clr-wood:    #c8874a;   /* jantarová – nadpisy a akcenty */
  --clr-glow:    #ff6b1a;   /* oranžová – tlačítka a efekty */
  --clr-text:    #e8ddd0;   /* hlavní text */
  --clr-muted:   #7a6e63;   /* sekundární text */
}
```

### Nejčastější úpravy

| Co změnit | Kde |
|---|---|
| Jméno / název značky | `index.html` – nadpis, navigační logo, patička |
| E-mailová adresa | `index.html` – sekce Kontakt, atribut `href="mailto:..."` |
| Instagram odkaz | `index.html` – sekce Sociální sítě a Kontakt |
| Texty a popisy | `index.html` (česky) **a** `translations.js` (česky + anglicky) |
| Anglický překlad | `translations.js` – blok `en` |
| Barvy | `style.css` – blok `:root` na začátku souboru |
| Fotografie | Složka `assets/`, cesty v `index.html` sekci Galerie |

---

## Licence

Tento projekt je osobní prezentace a není určen k redistribuci jako šablona.
Fotografie ve složce `assets/` jsou vlastnictvím autora a nesmí být použity bez souhlasu.

---

*MichaelTheMaker – Jičín, Česká republika*

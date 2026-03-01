# MichaelTheMaker

Osobní webová prezentace zaměřená na zakázkové **laserové gravírování** a **3D tisk**. Stránka slouží jako digitální vizitka, portfolio a kontaktní bod pro potenciální zákazníky.

---

## Obsah

- [O projektu](#o-projektu)
- [Funkce](#funkce)
- [Struktura projektu](#struktura-projektu)
- [Použité technologie](#použité-technologie)
- [Spuštění](#spuštění)
- [Přidání fotografií do galerie](#přidání-fotografií-do-galerie)
- [Napojení kontaktního formuláře](#napojení-kontaktního-formuláře)
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
- **Repozitáře** – přímé odkazy na komunity MakerWorld, Printables a 3Axis Laser Cut
- **Sociální sítě** – odkaz na Instagram profil
- **Kontaktní formulář** – připravený formulář čekající na napojení (Formspree, EmailJS nebo vlastní backend)
- **Plynulé scrollování** – navigační odkazy plynule posunují na příslušnou sekci
- **Zvýraznění aktivní sekce** – navigační odkaz aktuálně viditelné sekce se vizuálně odliší

---

## Struktura projektu

```
MakerMichal/
├── index.html        # Hlavní HTML soubor – veškerá struktura stránky
├── style.css         # Styly – Mobile First, CSS proměnné, animace
├── script.js         # JavaScript – menu, scroll reveal, aktivní navigace
└── assets/
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

Žádné npm balíčky, žádné frameworky, žádný build proces – soubory lze otevřít přímo v prohlížeči.

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

Fotografie se nacházejí ve složce `assets/` a jsou zobrazeny v sekci **Galerie** pomocí CSS vlastnosti `background-image`.

### Přidání nové fotografie

1. Zkopírujte obrázek do složky `assets/` (doporučený formát: `.jpg` nebo `.webp`, minimálně 800 × 600 px)
2. V souboru `index.html` vyhledejte sekci `id="gallery"`
3. Přidejte nový element do mřížky:

```html
<div class="gallery-item"
     style="background-image: url('assets/nazev-fotky.jpg');
            background-size: cover;
            background-position: center;">
</div>
```

### Změna pořadí fotografií

Pořadí v kódu odpovídá pořadí zobrazení na stránce – přesuňte bloky `<div class="gallery-item">` dle potřeby.

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
| Texty a popisy | `index.html` – přímo v příslušných sekcích |
| Barvy | `style.css` – blok `:root` na začátku souboru |
| Fotografie | Složka `assets/`, cesty v `index.html` sekci Galerie |

---

## Licence

Tento projekt je osobní prezentace a není určen k redistribuci jako šablona.
Fotografie ve složce `assets/` jsou vlastnictvím autora a nesmí být použity bez souhlasu.

---

*MichaelTheMaker – Jičín, Česká republika*

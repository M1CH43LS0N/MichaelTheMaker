/* ============================================================
   script.js – MichaelTheMaker
   Contains:
     1. Hamburger menu toggle (mobile nav)
     2. Scroll-reveal via IntersectionObserver
     3. Active nav-link highlight on scroll (scroll-spy)

   Depends on i18n.js (window.I18N) for the translated aria-label
   of the hamburger button. The gallery lightbox lives in lightbox.js
   and the language switcher in i18n.js.
============================================================ */

/* ── 1. HAMBURGER MENU TOGGLE ────────────────────────────────
   Toggles the .open class on both the button and the nav list.
   Also updates aria-expanded for accessibility (screen readers).
   Closes the menu automatically when:
     - A nav link is clicked (smooth-scrolls to section)
     - The user clicks anywhere outside the nav
     - The Escape key is pressed
─────────────────────────────────────────────────────────── */
const navToggle = document.querySelector('.nav-toggle');
const navLinks  = document.querySelector('.nav-links');

function openMenu() {
  navToggle.classList.add('open');
  navLinks.classList.add('open');
  navToggle.setAttribute('aria-expanded', 'true');
  navToggle.setAttribute('aria-label', I18N.t('nav.closeMenu'));
}

function closeMenu() {
  navToggle.classList.remove('open');
  navLinks.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', I18N.t('nav.openMenu'));
}

function toggleMenu() {
  navToggle.classList.contains('open') ? closeMenu() : openMenu();
}

// Toggle on hamburger button click
navToggle.addEventListener('click', toggleMenu);

// Close when any nav link is clicked (the scroll then happens via href)
navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', closeMenu);
});

// Close when clicking outside the nav area
document.addEventListener('click', (e) => {
  if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
    closeMenu();
  }
});

// Keep the hamburger's aria-label in the active language when the user
// switches CS/EN (its label depends on open/closed state, so i18n.js
// does not manage it through a data-i18n attribute).
document.addEventListener('i18n:change', () => {
  navToggle.setAttribute(
    'aria-label',
    I18N.t(navToggle.classList.contains('open') ? 'nav.closeMenu' : 'nav.openMenu')
  );
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMenu();
});


/* ── 2. SCROLL-REVEAL ────────────────────────────────────────
   Watches every .reveal and .reveal-stagger element.
   When it enters the viewport, "visible" is added, triggering
   the CSS transitions defined in style.css.
─────────────────────────────────────────────────────────── */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target); // animate once only
      }
    });
  },
  {
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
  }
);

document.querySelectorAll('.reveal, .reveal-stagger').forEach((el) => {
  revealObserver.observe(el);
});


/* ── 3. ACTIVE NAV-LINK HIGHLIGHT (scroll-spy) ───────────────
   Highlights the nav link of the section the user is looking at.
   The active link gets the wood colour (inline style) and
   aria-current="location" for screen readers.

   Rules, in priority order:
     1. A link the user just clicked wins until they scroll/type/click
        by themselves. Without this, a short last section (Contact)
        can never reach the top of the screen, because the page ends
        first – so the previous section stayed highlighted.
     2. Scrolled to the very bottom of the page → the last section.
     3. Otherwise the last section whose top edge has passed the
        "trigger line" just below the fixed header (120px).
─────────────────────────────────────────────────────────── */
const sections    = document.querySelectorAll('section[id]');
const navLinkList = document.querySelectorAll('.nav-links a');

let clickedId = null;   // section id of the nav link that was just clicked

// Which section should be highlighted right now?
function getActiveSectionId() {
  if (clickedId) return clickedId;                                   // rule 1

  const atBottom =
    window.scrollY > 0 &&
    window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
  if (atBottom) return sections[sections.length - 1].id;             // rule 2

  let currentId = '';                                                // rule 3
  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 120) currentId = section.id;
  });
  return currentId;
}

// Paint the highlight on the matching link, clear it on the others
function updateActiveLink() {
  const currentId = getActiveSectionId();

  navLinkList.forEach((link) => {
    const isActive = link.getAttribute('href') === `#${currentId}`;
    link.style.color = isActive ? 'var(--clr-wood)' : '';
    if (isActive) link.setAttribute('aria-current', 'location');
    else          link.removeAttribute('aria-current');
  });
}

// Rule 1: remember the clicked link …
navLinkList.forEach((link) => {
  link.addEventListener('click', () => {
    clickedId = link.getAttribute('href').slice(1);
    updateActiveLink();
  });
});

// … and forget it as soon as the user takes over (mouse wheel, touch,
// scrollbar / page click, keyboard). The smooth-scroll animation itself
// fires none of these events, so it keeps the clicked link highlighted.
['wheel', 'touchstart', 'pointerdown', 'keydown'].forEach((type) => {
  window.addEventListener(
    type,
    (e) => {
      // Pressing Enter/Space on a nav link is a click, not a manual scroll
      if (type === 'keydown' && e.target.closest && e.target.closest('.nav-links a')) return;
      // Clicking a nav link must not cancel its own highlight
      if (type === 'pointerdown' && e.target.closest && e.target.closest('.nav-links a')) return;
      clickedId = null;
      updateActiveLink();
    },
    { passive: true }
  );
});

window.addEventListener('scroll', updateActiveLink, { passive: true });
window.addEventListener('resize', updateActiveLink);
updateActiveLink();   // set the correct state on page load

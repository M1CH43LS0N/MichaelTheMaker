/* ============================================================
   script.js – MichaelTheMaker
   Contains:
     1. Hamburger menu toggle (mobile nav)
     2. Scroll-reveal via IntersectionObserver
     3. Active nav-link highlight on scroll
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
  navToggle.setAttribute('aria-label', 'Zavřít menu');
}

function closeMenu() {
  navToggle.classList.remove('open');
  navLinks.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', 'Otevřít menu');
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


/* ── 3. ACTIVE NAV-LINK HIGHLIGHT ───────────────────────────
   As the user scrolls, the nav link matching the current section
   is highlighted in the wood colour via an inline style.
─────────────────────────────────────────────────────────── */
const sections    = document.querySelectorAll('section[id]');
const navLinkList = document.querySelectorAll('.nav-links a');

window.addEventListener(
  'scroll',
  () => {
    let currentId = '';

    sections.forEach((section) => {
      if (window.scrollY >= section.offsetTop - 120) {
        currentId = section.getAttribute('id');
      }
    });

    navLinkList.forEach((link) => {
      link.style.color =
        link.getAttribute('href') === `#${currentId}`
          ? 'var(--clr-wood)'
          : '';
    });
  },
  { passive: true }
);

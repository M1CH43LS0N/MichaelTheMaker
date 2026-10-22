/* ============================================================
   lightbox.js – MichaelTheMaker
   Full-screen image preview for the gallery.

   Behaviour
     - Click (or Enter / Space) on a gallery item opens the preview.
     - Close: ✕ button, Escape key, or click on the dark backdrop.
     - Previous / next: on-screen arrows or ← / → keys (wraps around).
     - Focus moves into the dialog, is kept inside while it is open
       (Tab trap) and returns to the clicked thumbnail on close.
     - Page scrolling is locked while the preview is open.
     - No visible description is shown. The image's alt text comes from
       the thumbnail's aria-label ("Fotografie 3" / "Photo 3"), so it is
       translated automatically with the rest of the page.

   Expected markup (see index.html)
     .gallery-item[data-full="assets/photo.jpg"][aria-label="…"]
     #lightbox  >  .lightbox-close, .lightbox-prev, .lightbox-next,
                   figure > img.lightbox-img + .lightbox-counter
============================================================ */
(function () {
  'use strict';

  /* ── ELEMENT REFERENCES ────────────────────────────────── */
  const items   = Array.from(document.querySelectorAll('.gallery-item[data-full]'));
  const box     = document.getElementById('lightbox');
  if (!box || items.length === 0) return;   // nothing to do without markup

  const img     = box.querySelector('.lightbox-img');
  const counter = box.querySelector('.lightbox-counter');
  const btnClose = box.querySelector('.lightbox-close');
  const btnPrev  = box.querySelector('.lightbox-prev');
  const btnNext  = box.querySelector('.lightbox-next');

  let index = 0;             // which gallery item is currently shown
  let lastFocused = null;    // element to give focus back to on close

  const isOpen = () => !box.hidden;

  /* ── SHOW ONE IMAGE ──────────────────────────────────────
     `% length` makes navigation wrap: after the last image
     comes the first, before the first comes the last.
  ─────────────────────────────────────────────────────────── */
  function show(i) {
    index = (i + items.length) % items.length;
    const item = items[index];
    const label = item.getAttribute('aria-label') || '';

    img.src = item.dataset.full;
    img.alt = label;
    counter.textContent = `${index + 1} / ${items.length}`;
  }

  /* ── OPEN ──────────────────────────────────────────────── */
  function open(i) {
    lastFocused = document.activeElement;
    show(i);
    box.hidden = false;
    document.body.classList.add('lightbox-open');   // lock page scroll
    btnClose.focus();                               // move focus into dialog
  }

  /* ── CLOSE ───────────────────────────────────────────────
     Removing src stops a large image from lingering in memory.
  ─────────────────────────────────────────────────────────── */
  function close() {
    box.hidden = true;
    document.body.classList.remove('lightbox-open');
    img.removeAttribute('src');
    if (lastFocused) lastFocused.focus();           // restore focus
  }

  /* ── OPEN FROM GALLERY ITEMS ───────────────────────────── */
  items.forEach((item, i) => {
    item.addEventListener('click', () => open(i));

    // Items are <div role="button">, so Enter/Space must be wired manually
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();                         // stop Space scrolling the page
        open(i);
      }
    });
  });

  /* ── CONTROLS ──────────────────────────────────────────── */
  btnClose.addEventListener('click', close);
  btnPrev.addEventListener('click', () => show(index - 1));
  btnNext.addEventListener('click', () => show(index + 1));

  // Click on the dark backdrop (anything that is not the image, counter or a button) closes
  box.addEventListener('click', (e) => {
    if (!e.target.closest('.lightbox-img, .lightbox-counter, button')) close();
  });

  /* ── KEYBOARD ────────────────────────────────────────────
     Escape = close, ← / → = navigate, Tab = cycle focus inside
     the dialog so keyboard users cannot tab into the hidden page.
  ─────────────────────────────────────────────────────────── */
  document.addEventListener('keydown', (e) => {
    if (!isOpen()) return;

    if (e.key === 'Escape')     { close(); return; }
    if (e.key === 'ArrowLeft')  { show(index - 1); return; }
    if (e.key === 'ArrowRight') { show(index + 1); return; }

    if (e.key === 'Tab') {
      const focusable = [btnClose, btnPrev, btnNext];
      const first = focusable[0];
      const last  = focusable[focusable.length - 1];

      // Focus is not on a control (e.g. user clicked the image): pull it back in
      if (!focusable.includes(document.activeElement)) {
        e.preventDefault();
        first.focus();
        return;
      }

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  /* ── LANGUAGE CHANGE WHILE OPEN ──────────────────────────
     Re-render the current image so its alt text switches
     language immediately (the thumbnails' aria-labels are
     already updated by i18n.js at this point).
  ─────────────────────────────────────────────────────────── */
  document.addEventListener('i18n:change', () => {
    if (isOpen()) show(index);
  });
})();

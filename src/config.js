/* ==========================================================================
   CONFIG
   Non-text settings. Tweak these numbers to change how the site *feels*
   without touching any component code.
   ========================================================================== */

const config = {
  /* ---- Page transition ---------------------------------------------------
     1) the new page slides up from the bottom (coverMs)
     2) THEN its contents rise in one after another (contentMs + staggerMs)   */
  transition: {
    coverMs: 600, // how long the new page takes to slide up
    contentMs: 600, // how long each piece of content takes to appear
    staggerMs: 80, // gap between one piece of content and the next
  },

  /* ---- Homepage menu hover (italic lean) --------------------------------- */
  menuHover: {
    skewDeg: -12, // lean angle. Negative leans right, like italics
    durationMs: 300, // how fast the lean happens
  },
};

export default config;

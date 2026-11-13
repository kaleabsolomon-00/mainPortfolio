/* ==========================================================================
   CONFIG
   Non-text settings. Tweak these numbers to change how the site *feels*
   without touching any component code.
   ========================================================================== */

const config = {
  /* ---- Page transition (the cream wipe) -------------------------------- */
  transition: {
    coverMs: 450, // time for the cream layer to slide up and cover the page
    revealMs: 450, // time for it to slide away and reveal the new page
    // Keep coverMs + revealMs under ~1000ms so the site never feels slow.
  },

  /* ---- Homepage menu hover effect -------------------------------------- */
  menuHover: {
    shiftPx: 24, // how far a word slides to the side on hover
    skewDeg: -6, // how much it leans (negative = leans right)
    durationMs: 350,
  },
};

export default config;

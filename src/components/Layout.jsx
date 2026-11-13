/* ==========================================================================
   LAYOUT
   The frame around one page: the side rail + the page itself.
   PageTransition renders one Layout per screen, so each page carries its own
   rail and the rail slides up together with it.
   `path` tells the rail whether to show social links (home) or "Home".
   ========================================================================== */

import SideRail from "./SideRail.jsx";

export default function Layout({ path, children }) {
  return (
    <>
      <SideRail isHome={path === "/"} />
      {children}
    </>
  );
}

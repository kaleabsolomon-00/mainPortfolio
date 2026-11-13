/* ==========================================================================
   SIDE RAIL
   The thin vertical strip on the left of every page.
   - Home page:   shows your social links (vertical text)
   - Other pages: shows a vertical "HOME" link and a line
   - Always:      shows © year at the bottom
   Text comes from content.js. Looks come from SideRail.css.
   ========================================================================== */

import { useLocation } from "react-router-dom";

import content from "../content.js";
import TransitionLink from "./TransitionLink.jsx";
import "./SideRail.css";

export default function SideRail() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <aside className="rail" aria-label="Site sidebar">
      <div className="rail__top">
        {isHome ? (
          // Social links on the homepage
          content.contact.socials.map((social) => (
            <a
              key={social.label}
              className="rail__text label"
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {social.label}
            </a>
          ))
        ) : (
          // Back-to-home link everywhere else
          <TransitionLink to="/" className="rail__text label">
            Home
          </TransitionLink>
        )}
        <span className="rail__line" aria-hidden="true" />
      </div>

      <p className="rail__text label">© {content.site.year}</p>
    </aside>
  );
}

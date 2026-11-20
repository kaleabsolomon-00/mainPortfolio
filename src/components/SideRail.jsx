/* ==========================================================================
   SIDE RAIL
   The thin vertical strip on the left of every page.
   - Home page:   shows your social links (vertical text)
   - Other pages: shows a vertical "HOME" link and a line
   - Always:      shows © year at the bottom
   Text comes from content.js. Looks come from SideRail.css.
   ========================================================================== */

import { Link } from "react-router-dom";

import content from "../content.js";
import "./SideRail.css";
import SocialIcon, { hasIcon } from "./SocialIcon.jsx";

export default function SideRail({ isHome }) {
  return (
    <aside className="rail" aria-label="Site sidebar">
      <div className="rail__top">
        {isHome ? (
          // Social links on the homepage: logo only
          content.contact.socials.map((social) => (
            <a
              key={social.label}
              className={
                hasIcon(social.icon) ? "rail__icon" : "rail__text label"
              }
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label} // screen readers read the name
              title={social.label} // tooltip on hover
            >
              {/* If the icon name is missing or misspelled, the text shows
                  instead, so a link never disappears */}
              {hasIcon(social.icon) ? (
                <SocialIcon name={social.icon} />
              ) : (
                social.label
              )}
            </a>
          ))
        ) : (
          // Back-to-home link everywhere else
          <Link to="/" className="rail__text label">
            Home
          </Link>
        )}
        <span className="rail__line" aria-hidden="true" />
      </div>

      <p className="rail__text label">© {content.site.year}</p>
    </aside>
  );
}

/* ==========================================================================
   HOME PAGE
   The menu IS the homepage: giant words that lean like italics on hover.
   Text:    content.js → home, nav, site
   Numbers: config.js  → menuHover (lean angle and speed)
   Layout:  Home.css
   data-reveal marks what rises in after the page transition (order 1, 2, 3…)
   ========================================================================== */

import { Link } from "react-router-dom";

import content from "../content.js";
import config from "../config.js";
import "./Home.css";

export default function Home() {
  const { skewDeg, durationMs } = config.menuHover;

  // Hand the hover numbers to CSS as variables
  const menuVars = {
    "--skew": `${skewDeg}deg`,
    "--hover-ms": `${durationMs}ms`,
  };

  // The intro appears after the last menu word (max order is 9)
  const introOrder = Math.min(content.nav.length + 1, 9);

  return (
    <main className="page theme-dark home">
      {/* Left: short intro */}
      <section className="home__intro" data-reveal={introOrder}>
        <p className="label">{content.home.kicker}</p>
        <p className="home__text">{content.home.intro}</p>
        <p className="home__text">{content.home.status}</p>
        <p className="label">{content.site.availability}</p>
      </section>

      {/* Right: the big menu. Each word rises in one after another. */}
      <nav className="home__nav" aria-label="Main">
        <ul style={menuVars}>
          {content.nav.map((item, index) => (
            <li key={item.path} data-reveal={Math.min(index + 1, 9)}>
              <Link to={item.path} className="home__link">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  );
}

/* ==========================================================================
   LAB PAGE
   Experiments, notes and small builds: living proof that you keep building.
   Text:    content.js → lab
   Numbers: config.js  → menuHover (same lean as the menu)
   Layout:  Lab.css
   To add an entry, copy a { ... } block in content.js → lab.entries.
   ========================================================================== */

import content from "../content.js";
import config from "../config.js";
import "./Lab.css";

export default function Lab() {
  const { title, intro, entries, labels } = content.lab;
  const { skewDeg, durationMs } = config.menuHover;

  // Hand the hover numbers to CSS as variables
  const listVars = {
    "--skew": `${skewDeg}deg`,
    "--hover-ms": `${durationMs}ms`,
  };

  return (
    <main className="page theme-light lab">
      {/* Left: title + intro */}
      <section className="lab__intro" data-reveal="1">
        <h1 className="lab__title">{title}</h1>
        <p>{intro}</p>
      </section>

      {/* Right: the entries */}
      <div className="lab__list" style={listVars}>
        {entries.length === 0 ? (
          <p className="lab__empty" data-reveal="2">
            {labels.empty}
          </p>
        ) : (
          entries.map((entry, index) => (
            <article
              key={entry.id}
              className="entry"
              data-reveal={Math.min(index + 2, 9)}
            >
              <p className="label entry__date">{entry.date}</p>

              <h2 className="entry__title">
                {/* The title becomes a link only if the entry has a url */}
                {entry.url ? (
                  <a
                    className="entry__link"
                    href={entry.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="entry__name">{entry.title}</span>
                    <span className="entry__arrow" aria-hidden="true">
                      ↗
                    </span>
                    <span className="sr-only"> ({labels.view})</span>
                  </a>
                ) : (
                  <span className="entry__name">{entry.title}</span>
                )}
              </h2>

              <p className="entry__summary">{entry.summary}</p>

              {entry.tags.length > 0 && (
                <ul className="tags">
                  {entry.tags.map((tag) => (
                    <li key={tag} className="tag">
                      {tag}
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))
        )}
      </div>
    </main>
  );
}

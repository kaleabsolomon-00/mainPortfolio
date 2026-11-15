/* ==========================================================================
   ABOUT PAGE
   Text:   content.js → about (and site.name for the photo placeholder)
   Layout: About.css
   data-reveal="n" = the order things rise in after the page transition
   Sections with no content in content.js are hidden automatically.
   ========================================================================== */

import content from "../content.js";
import "./About.css";

export default function About() {
  const {
    title,
    headline,
    intro,
    quote,
    quoteNote,
    skills,
    education,
    languages,
    kudos,
    cvUrl,
    photo,
    photoAlt,
    labels,
  } = content.about;

  return (
    <main className="page theme-light about">
      <div className="about__grid">
        {/* ---- Title + headline ------------------------------------------ */}
        <header className="about__head">
          <h2 className="about__headline" data-reveal="1">
            {headline}
          </h2>
        </header>

        {/* ---- Portrait (or a placeholder until you add one) -------------- */}
        <figure className="about__photo" data-reveal="2">
          {photo ? (
            <img src={photo} alt={photoAlt} />
          ) : (
            <div className="about__photo-fallback" aria-hidden="true">
              {content.site.name.charAt(0)}
            </div>
          )}
        </figure>

        {/* ---- Main text column ------------------------------------------ */}
        <div className="about__body">
          {/* Your story: one <p> per string in content.about.intro */}
          <div className="about__intro" data-reveal="3">
            {intro.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* Quote (hidden when quote is "") */}
          {quote && (
            <blockquote className="about__quote" data-reveal="4">
              <p>“{quote}”</p>
              {quoteNote && <p className="about__quote-note">{quoteNote}</p>}
            </blockquote>
          )}

          {/* Skills, grouped */}
          {skills.length > 0 && (
            <section className="about__section" data-reveal="5">
              <h2>{labels.skills}</h2>
              <div className="about__skills">
                {skills.map((skill) => (
                  <div key={skill.group}>
                    <h3 className="about__group-title">{skill.group}</h3>
                    <ul className="tags">
                      {skill.items.map((item) => (
                        <li key={item} className="tag">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education + languages */}
          <section className="about__section" data-reveal="6">
            <h2>{labels.education}</h2>
            <p>
              <strong>{education.program}</strong>
              <br />
              {education.school}
              <br />
              <span className="about__note">{education.note}</span>
            </p>

            {languages.length > 0 && (
              <>
                <h2 className="about__subheading">{labels.languages}</h2>
                <ul className="tags">
                  {languages.map((language) => (
                    <li key={language} className="tag">
                      {language}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </section>

          {/* Thank-you note + optional CV download */}
          <section className="about__section" data-reveal="7">
            {kudos.text && (
              <>
                <h2>{labels.kudos}</h2>
                <p>{kudos.text}</p>
                {kudos.people.length > 0 && (
                  <ul className="about__people">
                    {kudos.people.map((person) => (
                      <li key={person.name}>
                        {person.url ? (
                          <a
                            className="link"
                            href={person.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {person.name}
                          </a>
                        ) : (
                          person.name
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}

            {cvUrl && (
              <p className="about__cv">
                <a className="link label" href={cvUrl} download>
                  {labels.cv}
                </a>
              </p>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

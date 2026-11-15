/* ==========================================================================
   WORK PAGE
   The big project names ARE the page. Click one to open its case study.
   Text:    content.js → work (projects and labels)
   Numbers: config.js  → menuHover (same lean as the homepage menu)
   Layout:  Work.css
   To add a project, copy a { ... } block in content.js → work.projects.
   ========================================================================== */

import { useState } from "react";

import content from "../content.js";
import config from "../config.js";
import "./Work.css";

/* ---- One project (name + expandable case study) ------------------------- */
function Project({ project, labels, isOpen, onToggle }) {
  const panelId = `panel-${project.id}`;

  // If the image file can't be loaded (wrong path, typo), we hide it so the
  // details still show instead of a broken picture.
  const [imageFailed, setImageFailed] = useState(false);
  const hasImage = Boolean(project.image) && !imageFailed;

  return (
    <article className={`project ${isOpen ? "project--open" : ""}`}>
      {/* The big clickable name */}
      <button
        type="button"
        className="project__head"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        <span className="project__title-wrap">
          <span className="project__name">{project.name}</span>
          <span className="project__meta label">
            {project.category} · {project.year}
          </span>
        </span>
        {/* "+" turns into "×" when open (see Work.css) */}
        <span className="project__toggle" aria-hidden="true">
          +
        </span>
      </button>

      {/* The case study. Collapsed panels are hidden from keyboard and
          screen readers via CSS visibility. */}
      <div className="project__panel" id={panelId}>
        <div className="project__panel-inner">
          <div
            className={`project__body ${
              hasImage ? "project__body--with-image" : ""
            }`}
          >
            {hasImage && (
              <div className="project__media">
                <img
                  className="project__image"
                  src={project.image}
                  alt={`${project.name} screenshot`}
                  onError={() => {
                    // Helps you debug: shows which path failed
                    console.warn(`Image not found: ${project.image}`);
                    setImageFailed(true);
                  }}
                />
              </div>
            )}

            <div className="project__text">
              {/* Problem / solution / result: the proof recruiters scan for */}
              <dl className="project__story">
                {["problem", "solution", "result"].map((key) => (
                  <div key={key}>
                    <dt className="label">{labels[key]}</dt>
                    <dd>{project[key]}</dd>
                  </div>
                ))}
              </dl>

              {/* Tech stack */}
              {project.stack.length > 0 && (
                <div>
                  <p className="label project__stack-label">{labels.stack}</p>
                  <ul className="tags">
                    {project.stack.map((tech) => (
                      <li key={tech} className="tag">
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Links (each one hidden if its url is "") */}
              {(project.liveUrl || project.repoUrl) && (
                <div className="project__links">
                  {project.liveUrl && (
                    <a
                      className="link label"
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {labels.live} ↗
                    </a>
                  )}
                  {project.repoUrl && (
                    <a
                      className="link label"
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {labels.repo} ↗
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ---- The page ------------------------------------------------------------ */
export default function Work() {
  const { title, intro, projects, labels } = content.work;
  const { skewDeg, durationMs } = config.menuHover;

  // Which project is open. null = all closed, so nothing is open until
  // the visitor clicks a project name.
  const [openId, setOpenId] = useState(null);

  // Hand the hover numbers to CSS as variables
  const listVars = {
    "--skew": `${skewDeg}deg`,
    "--hover-ms": `${durationMs}ms`,
  };

  return (
    <main className="page theme-light work">
      {/* Left: title + intro */}
      <section className="work__intro" data-reveal="1">
        <h1 className="work__title label">{title}</h1>
        <p>{intro}</p>
      </section>

      {/* Right: the project list */}
      <div className="work__list" style={listVars}>
        {projects.map((project, index) => (
          <div key={project.id} data-reveal={Math.min(index + 2, 9)}>
            <Project
              project={project}
              labels={labels}
              isOpen={openId === project.id}
              onToggle={() =>
                setOpenId(openId === project.id ? null : project.id)
              }
            />
          </div>
        ))}
      </div>
    </main>
  );
}

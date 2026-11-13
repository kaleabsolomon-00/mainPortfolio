/* TEMPORARY: proves that content, config and styles are wired up correctly.
   Step 2 replaces this file with the real router. */

import content from "./content.js";
import config from "./config.js";

export default function App() {
  return (
    <main className="page theme-dark">
      <p className="label">Step 1 check</p>
      <h1>{content.site.name}</h1>
      <p>{content.home.intro}</p>
      <p className="label">
        Transition: {config.transition.coverMs + config.transition.revealMs}ms
      </p>
    </main>
  );
}

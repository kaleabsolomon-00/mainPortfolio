/* PLACEHOLDER: replaced in Step 3 */
import content from "../content.js";

export default function About() {
  return (
    <main className="page theme-dark">
      <h1 data-reveal="1">{content.about.title}</h1>
      <p data-reveal="2">{content.about.headline}</p>
    </main>
  );
}

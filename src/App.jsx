/* ==========================================================================
   APP
   The list of pages. To add a new page:
     1. create src/pages/MyPage.jsx
     2. import it below and add  "/my-page": MyPage  to `pages`
     3. add { label, path } to `nav` in content.js
   ========================================================================== */

import PageTransition from "./components/PageTransition.jsx";

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Work from "./pages/Work.jsx";
import Lab from "./pages/Lab.jsx";
import Contact from "./pages/Contact.jsx";

/* address → page component */
const pages = {
  "/": Home,
  "/about": About,
  "/work": Work,
  "/lab": Lab,
  "/contact": Contact,
};

export default function App() {
  return <PageTransition pages={pages} />;
}

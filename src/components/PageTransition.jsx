/* ==========================================================================
   PAGE TRANSITION
   Shows the current page and, when the address changes, plays ONE transition:

     1. the NEW page slides up from the bottom, in its own background color
     2. once it covers the screen, the old page is removed
     3. the new page's contents (elements marked data-reveal) rise in

   The transition is driven by the URL, so links, the Back/Forward buttons
   and typed addresses all behave the same way.

   Numbers: src/config.js       Looks: PageTransition.css
   ========================================================================== */

import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import config from "../config.js";
import Layout from "./Layout.jsx";
import content from "../content.js";
import "./PageTransition.css";

const { coverMs, contentMs, staggerMs } = config.transition;

/* Share the timings with CSS as variables (runs once when the file loads) */
const root = document.documentElement;
root.style.setProperty("--cover-ms", `${coverMs}ms`);
root.style.setProperty("--content-ms", `${contentMs}ms`);
root.style.setProperty("--stagger-ms", `${staggerMs}ms`);

/* Visitors who prefer less motion get instant page changes */
const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* "instant" because global.css enables smooth scrolling for the whole site */
const scrollToTop = () =>
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
/* Browser tab title for each page, built from content.js:
   "About | Kaleab", and "Kaleab | Software Engineer" for the homepage */
const titleFor = (path) => {
  const item = content.nav.find((entry) => entry.path === path);
  return item
    ? `${item.label} | ${content.site.name}`
    : `${content.site.name} | ${content.site.role}`;
};

/* Move keyboard focus to the new page after a transition. Without this, the
   link you pressed disappears and keyboard / screen-reader users lose their
   place. The newest <main> on screen is the page we just navigated to. */
const focusNewPage = () => {
  const mains = document.querySelectorAll(".screen main");
  const main = mains[mains.length - 1];
  if (!main) return;
  main.setAttribute("tabindex", "-1"); // focusable by script, not by Tab
  main.focus({ preventScroll: true });
};

export default function PageTransition({ pages }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Unknown addresses fall back to the homepage
  const path = pages[pathname] ? pathname : "/";

  const nextId = useRef(1); // unique id for every screen we create
  const shownPath = useRef(path); // the page we last started showing
  const timers = useRef([]); // pending timeouts, cleaned up on unmount

  /* A "screen" is one rendered page. Normally there is exactly one.
     During a transition there are two: the old page, and the new page
     sliding up over it.
       status:  "current"  = a normal page in the document
                "incoming" = the new page sliding up (fixed over the screen)
       animated: should its contents play the rise-in animation?
       revealStart: ms to wait before contents start (= slide duration)     */
  const [screens, setScreens] = useState([
    { id: 0, path, status: "current", animated: true, revealStart: 0 },
  ]);

  // Typed a bad address? Send the visitor home.
  useEffect(() => {
    if (!pages[pathname]) navigate("/", { replace: true });
  }, [pathname, pages, navigate]);

  // Keep the browser tab title in sync with the current page
  useEffect(() => {
    document.title = titleFor(path);
  }, [path]);

  // Focus the new page after a transition
  useEffect(() => {
    if (path === shownPath.current) return;
    shownPath.current = path;

    // No animation for visitors who asked for reduced motion
    if (prefersReducedMotion()) {
      scrollToTop();
      setScreens([
        {
          id: nextId.current++,
          path,
          status: "current",
          animated: false,
          revealStart: 0,
        },
      ]);
      timers.current.push(setTimeout(focusNewPage, 50));
      return;
    }

    const id = nextId.current++;

    // 1) add the new page on top; it slides up on its own
    setScreens((prev) => [
      ...prev,
      { id, path, status: "incoming", animated: true, revealStart: coverMs },
    ]);

    // 2) when it has covered the screen, drop the old page(s) underneath.
    //    The new page stays mounted, so its content animation keeps running.
    timers.current.push(
      setTimeout(() => {
        scrollToTop();
        setScreens((prev) =>
          prev
            .filter((screen) => screen.id >= id)
            .map((screen) =>
              screen.id === id ? { ...screen, status: "current" } : screen,
            ),
        );
        focusNewPage();
      }, coverMs + 50), // +50ms safety so the slide has fully finished
    );
  }, [path]);

  // Clear pending timers if the app is torn down
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  return (
    <>
      {screens.map((screen) => {
        const Page = pages[screen.path];

        const className = [
          "screen",
          screen.animated && "screen--animated",
          screen.status === "incoming" && "screen--incoming",
        ]
          .filter(Boolean)
          .join(" ");

        return (
          <div
            key={screen.id}
            className={className}
            style={{ "--reveal-start": `${screen.revealStart}ms` }}
          >
            <Layout path={screen.path}>
              <Page />
            </Layout>
          </div>
        );
      })}
    </>
  );
}

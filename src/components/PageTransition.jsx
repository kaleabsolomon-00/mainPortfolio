/* ==========================================================================
   PAGE TRANSITION
   Provides the "cream wipe" between pages.

   How to use it anywhere in the app:
     const goTo = useTransitionNavigate();
     goTo("/about");
   (Most of the time you won't call it directly, use <TransitionLink> instead.)

   Timings come from src/config.js. Looks come from PageTransition.css.
   ========================================================================== */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";

import config from "../config.js";
import "./PageTransition.css";

const { coverMs, revealMs } = config.transition;

/* Share the timings with CSS as variables. This runs once when the file loads,
   so the very first page animation already knows its duration. */
const root = document.documentElement;
root.style.setProperty("--cover-ms", `${coverMs}ms`);
root.style.setProperty("--reveal-ms", `${revealMs}ms`);

const TransitionContext = createContext(null);

/* Hook: returns a function that navigates WITH the wipe animation */
export function useTransitionNavigate() {
  const goTo = useContext(TransitionContext);
  if (!goTo) {
    throw new Error(
      "useTransitionNavigate must be used inside <PageTransition>",
    );
  }
  return goTo;
}

/* Visitors who prefer less motion skip the animation entirely */
const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function PageTransition({ children }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // "idle" → "covering" → "revealing" → "idle"
  const [phase, setPhase] = useState("idle");

  const busy = useRef(false); // blocks clicks while a transition is running
  const timers = useRef([]); // so we can clean up if the component unmounts

  const later = (fn, ms) => {
    timers.current.push(setTimeout(fn, ms));
  };

  // Clear any pending timers when the app unmounts
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const goTo = useCallback(
    (path) => {
      // Ignore clicks during a transition, or on the page we're already on
      if (busy.current || path === pathname) return;

      // Accessibility: no animation, just go
      if (prefersReducedMotion()) {
        navigate(path);
        window.scrollTo(0, 0);
        return;
      }

      busy.current = true;
      setPhase("covering"); // 1) cream layer slides up and covers the page

      later(() => {
        navigate(path); // 2) swap the page while it is hidden
        window.scrollTo(0, 0);
        setPhase("revealing"); // 3) cream layer slides away

        later(() => {
          setPhase("idle"); // 4) reset, ready for the next click
          busy.current = false;
        }, revealMs);
      }, coverMs);
    },
    [navigate, pathname],
  );

  return (
    <TransitionContext.Provider value={goTo}>
      {children}
      {/* The cream layer itself. aria-hidden: it's purely decorative. */}
      <div className={`wipe wipe--${phase}`} aria-hidden="true" />
    </TransitionContext.Provider>
  );
}

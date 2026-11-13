/* ==========================================================================
   TRANSITION LINK
   Use this instead of <a> or <Link> for any link to another page of the site.

     <TransitionLink to="/about" className="something">About</TransitionLink>

   It is still a real <a href>, so right-click, "open in new tab" and
   Ctrl/Cmd+click keep working. Only a normal click plays the wipe.
   ========================================================================== */

import { useTransitionNavigate } from "./PageTransition.jsx";

export default function TransitionLink({ to, children, onClick, ...rest }) {
  const goTo = useTransitionNavigate();

  const handleClick = (event) => {
    onClick?.(event);

    // Let the browser handle new-tab clicks and anything already handled
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault(); // stop the browser's own page load
    goTo(to); // play the wipe, then change route
  };

  return (
    <a href={to} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}

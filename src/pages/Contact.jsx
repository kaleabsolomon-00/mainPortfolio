/* ==========================================================================
   CONTACT PAGE
   No form: just a big greeting, your email (with a copy button) and links.
   Text:   content.js → contact
   Layout: Contact.css
   data-reveal="n" = the order things rise in after the page transition
   ========================================================================== */

import { useEffect, useRef, useState } from "react";

import content from "../content.js";
import "./Contact.css";

export default function Contact() {
  const { title, text, email, socials, labels } = content.contact;

  // true for 2 seconds after the email has been copied
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);

  // Clear the timer if the page is left while it is running
  useEffect(() => () => clearTimeout(timer.current), []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked (rare): the mailto link above still works
    }
  };

  return (
    <main className="page theme-light contact">
      {/* Giant greeting */}
      <h1 className="contact__title" data-reveal="1">
        {title}
      </h1>

      <div className="contact__details">
        <p className="contact__text" data-reveal="2">
          {text}
        </p>

        {/* Email + copy button */}
        <div className="contact__row" data-reveal="3">
          <span className="label">{labels.email}</span>
          <div className="contact__email-line">
            <a className="link contact__email" href={`mailto:${email}`}>
              {email}
            </a>
            <button
              type="button"
              className="contact__copy label"
              onClick={copyEmail}
            >
              {copied ? labels.copied : labels.copy}
            </button>
            {/* Announces "Copied!" to screen readers */}
            <span className="sr-only" aria-live="polite">
              {copied ? labels.copied : ""}
            </span>
          </div>
        </div>

        {/* Social links (the section hides itself if the list is empty) */}
        {socials.length > 0 && (
          <div className="contact__row" data-reveal="4">
            <span className="label">{labels.elsewhere}</span>
            <ul className="contact__socials">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    className="link"
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}

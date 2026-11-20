/* ==========================================================================
   SOCIAL ICON
   Turns an icon name from content.js into a logo.
     <SocialIcon name="github" />

   To support another platform:
     1. import its icon from "react-icons/fa6" (browse them at react-icons.github.io/react-icons)
     2. add one line to the `icons` list below
   ========================================================================== */

import {
  FaBehance,
  FaDribbble,
  FaEnvelope,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaTelegram,
  FaTiktok,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

/* icon name (used in content.js) → logo */
const icons = {
  behance: FaBehance,
  dribbble: FaDribbble,
  email: FaEnvelope,
  github: FaGithub,
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
  telegram: FaTelegram,
  tiktok: FaTiktok,
  x: FaXTwitter,
  youtube: FaYoutube,
};

/* Returns null for an unknown name, so the caller can fall back to text */
export const hasIcon = (name) => Boolean(icons[name]);

export default function SocialIcon({ name }) {
  const Icon = icons[name];
  if (!Icon) return null;

  // aria-hidden: the link around it carries the accessible name
  return <Icon aria-hidden="true" focusable="false" />;
}

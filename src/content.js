/* ==========================================================================
   CONTENT
   Every word on the website is defined here. Pages never contain hard-coded
   text, they read from this file. To change a sentence, add a project, or
   update a link, edit it here and save.

   TIPS
   - Keep the structure (names before the colon), change only the text.
   - To add a project: copy one { ... } block in `work.projects` and edit it.
   - Leave a field as "" if you don't need it; empty links are hidden.
   ========================================================================== */

const content = {
  /* ---- Site-wide ------------------------------------------------------- */
  site: {
    name: "Kaleab",
    fullName: "Kaleab [Your Last Name]", // TODO: replace
    role: "Software Engineer",
    year: 2026, // shown in the © label on every page
    location: "Addis Ababa, Ethiopia",
    availability: "Open to international remote work",
  },

  /* ---- Main menu (homepage + navigation) --------------------------------
     `path` must match a route in App.jsx. Order here = order on screen.   */
  nav: [
    { label: "Work", path: "/work" },
    { label: "About", path: "/about" },
    { label: "Lab", path: "/lab" },
    { label: "Contact", path: "/contact" },
  ],

  /* ---- Home -------------------------------------------------------------- */
  home: {
    kicker: "KALEAB", // small label above the intro
    intro:
      "Full-stack developer exploring AI and machine learning, building products that are real and useful.",
    status: "Software Engineering student at AASTU",
  },

  /* ---- About ------------------------------------------------------------- */
  about: {
    title: "About",
    headline: "I'm Kaleab. A developer, builder and problem solver.",

    // Each string is one paragraph.
    intro: [
      "Write your story here: what got you into code, what you are studying, what you love building.",
      "Write a second paragraph: what you are looking for next, such as remote roles, internships or collaborations.",
    ],

    // A quote you live by (optional: set to "" to hide)
    quote: "Replace this with a line that shows how you think.",
    quoteNote:
      "One or two sentences on why this quote matters to you and how it shapes your work.",

    // Skills grouped by area. Short and scannable beats long and complete.
    skills: [
      {
        group: "Front-end",
        items: ["React", "JavaScript", "HTML & CSS"],
      },
      {
        group: "Back-end",
        items: ["Node.js", "REST APIs", "Databases"],
      },
      {
        group: "AI / ML",
        items: ["Python", "Model basics", "Data handling"],
      },
      {
        group: "Tools",
        items: ["Git & GitHub", "VS Code", "Figma"],
      },
    ],

    // Education, short and factual
    education: {
      school: "Addis Ababa Science and Technology University (AASTU)",
      program: "BSc in Software Engineering",
      note: "Fourth year",
    },

    languages: ["Amharic (fluent)", "English (fluent)"],

    // Thank-you list (optional: set to [] to hide)
    kudos: {
      text: "Replace this with a short thank-you note to people who helped you grow.",
      people: [
        // { name: "Person Name", url: "https://..." },
      ],
    },

    cvUrl: "", // e.g. "/cv.pdf" (put the file in /public)
    // Portrait shown beside your story. Put the file in /public/images/
    // and write its path here. Leave "" to show a placeholder.
    photo: "", // e.g. "/images/me.jpg"
    photoAlt: "Portrait of Kaleab",

    // Small section headings on the About page
    labels: {
      skills: "Skills",
      education: "Education",
      languages: "Languages",
      kudos: "Kudos",
      cv: "Download CV",
    },
  },

  /* ---- Work (case studies) ----------------------------------------------
     `category` is the small label under the big project name.
     `problem / solution / result` give recruiters the proof they scan for. */
  work: {
    title: "Work",
    intro:
      "A selection of projects I've designed and built, with the problem, the solution and the stack behind each.",
    projects: [
      {
        id: "project-one", // unique, no spaces
        name: "Project One",
        category: "Full-stack web app",
        year: "2026",
        problem: "What problem does this project solve, and for whom?",
        solution: "What did you build, and what were the key decisions?",
        result: "What happened? Users, performance, what you learned.",
        stack: ["React", "Node.js", "MongoDB"],
        liveUrl: "", // link to the live site
        repoUrl: "", // link to the GitHub repo
        image: "", // e.g. "/images/project-one.png"
      },
      {
        id: "project-two",
        name: "Project Two",
        category: "AI / ML experiment",
        year: "2026",
        problem: "Describe the problem.",
        solution: "Describe your approach.",
        result: "Describe the outcome.",
        stack: ["Python", "scikit-learn"],
        liveUrl: "",
        repoUrl: "",
        image: "",
      },
    ],
  },

  /* ---- Lab (experiments, notes, small builds) --------------------------- */
  lab: {
    title: "Lab",
    intro:
      "Small experiments, things I'm learning and notes from the process. Less polished, more curious.",
    entries: [
      {
        id: "entry-one",
        title: "First experiment",
        date: "2026-11",
        summary:
          "A one or two sentence description of what you tried and learned.",
        tags: ["React", "Animation"],
        url: "", // optional link to a repo, demo or write-up
      },
    ],
  },

  /* ---- Contact ----------------------------------------------------------- */
  contact: {
    title: "Hello.",
    text: "Looking for a developer who builds things that work? I'd love to hear from you.",
    email: "your.email@example.com", // TODO: replace
    socials: [
      { label: "GitHub", url: "https://github.com/your-username" },
      { label: "LinkedIn", url: "https://linkedin.com/in/your-username" },
      // Add or remove as you like:
      // { label: "Telegram", url: "https://t.me/your-username" },
    ],
  },
};

export default content;

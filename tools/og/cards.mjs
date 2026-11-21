// The manifest. One entry per social card. Add a card here, run `pnpm og`, commit the PNG.
//
// `out`      — filename written into src/assets/og/
// `title`    — the big headline. Keep it a claim, not a topic.
// `body`     — the supporting line. Optional.
// `path`     — the section, drawn as a mono /path/ above the title like on the site. Optional.

export const cards = [
  {
    out: 'home.png',
    title: 'I build software for a living and infrastructure for fun.',
    body: 'Kubernetes on a free-tier VM, on purpose. Firmware I had no business reading. Whatever broke this week.',
  },
  {
    out: 'about.png',
    path: 'about',
    title: "Where I've worked, and what I've shipped.",
    body: 'Five years of full-stack — backend, frontend, and the CI/CD and cloud architecture underneath.',
  },
];

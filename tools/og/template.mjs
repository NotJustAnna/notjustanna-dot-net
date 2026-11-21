// The card, as HTML. It's the site in miniature: the crimson header band, the wheat page with a
// mono path label and an extrabold headline, and the footer band with the four leaf tiles.
// Colours are lifted from src/styles/global.css (the light theme, which reads best in a timeline).
// Fonts are the site's own, passed in as data URLs by render.mjs.

const escape = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

export const WIDTH = 1200;
export const HEIGHT = 630;

const c = {
  page: '#f2e6d3',
  ink: '#2b1a10',
  muted: '#6b5340',
  band: '#7c1813',
  bandInk: '#fbf1e3',
  amber: '#e8a020',
  orange: '#d4601a',
  vermilion: '#b5361a',
  crimson: '#9b1b1b',
};

export function template({ path, title, body, avatar, sans, mono }) {
  return `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<style>
  @font-face { font-family: "Open Sans Variable"; font-weight: 300 800; src: url(${sans}) format("woff2"); }
  @font-face { font-family: "Cascadia Code Variable"; font-weight: 200 700; src: url(${mono}) format("woff2"); }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body {
    width: ${WIDTH}px; height: ${HEIGHT}px; overflow: hidden;
    background: ${c.page}; color: ${c.ink};
    font-family: "Open Sans Variable", sans-serif;
    -webkit-font-smoothing: antialiased;
  }
  body { display: flex; flex-direction: column; }
  .mono { font-family: "Cascadia Code Variable", monospace; }
  .band { background: ${c.band}; color: ${c.bandInk}; display: flex; align-items: center; padding: 0 72px; }
  header.band { height: 120px; gap: 22px; }
  header img { width: 64px; height: 64px; object-fit: cover; }
  header .name { font-size: 34px; font-weight: 700; letter-spacing: -0.01em; }
  header .handle { margin-left: auto; font-size: 26px; font-weight: 700; color: ${c.amber}; }
  main { flex: 1; display: flex; flex-direction: column; justify-content: center; padding: 0 72px; }
  .path { font-size: 30px; font-weight: 700; color: ${c.vermilion}; margin-bottom: 18px; }
  h1 {
    font-size: ${title.length > 46 ? 64 : 76}px;
    font-weight: 800; letter-spacing: -0.03em; line-height: 1.08;
    text-wrap: balance; max-width: 1020px;
  }
  .body { margin-top: 24px; font-size: 28px; line-height: 1.4; color: ${c.muted}; max-width: 960px; text-wrap: pretty; }
  footer.band { height: 88px; justify-content: space-between; padding-right: 0; }
  footer .site { font-size: 26px; font-weight: 700; }
  .tiles { display: flex; }
  .tiles span { width: 88px; height: 88px; }
</style>
</head>
<body>
  <header class="band">
    <img src="${avatar}" alt="">
    <span class="name">Anna Silva</span>
    <span class="handle mono">@notjustanna</span>
  </header>
  <main>
    ${path ? `<div class="path mono">/${escape(path)}/</div>` : ''}
    <h1>${escape(title)}</h1>
    ${body ? `<div class="body">${escape(body)}</div>` : ''}
  </main>
  <footer class="band">
    <span class="site mono">notjustanna.net</span>
    <div class="tiles">
      <span style="background:${c.amber}"></span>
      <span style="background:${c.orange}"></span>
      <span style="background:${c.vermilion}"></span>
      <span style="background:${c.crimson}"></span>
    </div>
  </footer>
</body>
</html>`;
}

// The card, as HTML. Colours are lifted from src/styles/global.css `:root` — the blue light
// theme, because it's the one that reads as *this site* in a timeline.

const escape = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

export const WIDTH = 1200;
export const HEIGHT = 630;

export function template({ eyebrow, title, body, avatar }) {
  return `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body {
    width: ${WIDTH}px; height: ${HEIGHT}px;
    background: oklch(0.44 0.115 255);
    color: oklch(0.985 0.005 240);
    font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    overflow: hidden;
  }
  .bg { position: absolute; inset: 0; }
  /* the ambient-background component, flattened */
  .glow {
    background: radial-gradient(ellipse 80% 80% at 50% -20%, rgba(255,255,255,0.18), rgba(255,255,255,0));
  }
  .grid-fine {
    background-image:
      linear-gradient(to right, rgba(255,255,255,0.14) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255,255,255,0.14) 1px, transparent 1px);
    background-size: 32px 32px;
  }
  .grid-coarse {
    background-image:
      linear-gradient(to right, rgba(255,255,255,0.10) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255,255,255,0.10) 1px, transparent 1px);
    background-size: 160px 160px;
  }
  .card {
    position: relative; height: 100%;
    display: flex; flex-direction: column; justify-content: space-between;
    padding: 64px 72px;
  }
  .who { display: flex; align-items: center; gap: 20px; }
  .who img { width: 88px; height: 88px; border-radius: 999px; border: 2px solid rgba(255,255,255,0.4); }
  .who .name { font-size: 34px; font-weight: 700; letter-spacing: -0.01em; line-height: 1.15; }
  .who .handle { font-size: 22px; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; opacity: 0.75; }
  .eyebrow {
    font-size: 20px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;
    opacity: 0.7; margin-bottom: 14px;
  }
  h1 {
    font-size: ${title.length > 46 ? 62 : 74}px;
    font-weight: 800; letter-spacing: -0.025em; line-height: 1.06;
    background: linear-gradient(to right, #dbeafe, #e9d5ff);
    -webkit-background-clip: text; background-clip: text; color: transparent;
    text-wrap: balance;
  }
  .body { margin-top: 22px; font-size: 27px; line-height: 1.4; opacity: 0.9; max-width: 940px; }
  .foot {
    display: flex; align-items: center; gap: 14px;
    font-size: 23px; font-weight: 600; opacity: 0.85;
  }
  .rule { flex: 1; height: 1px; background: rgba(255,255,255,0.35); }
</style>
</head>
<body>
  <div class="bg glow"></div>
  <div class="bg grid-fine"></div>
  <div class="bg grid-coarse"></div>
  <div class="card">
    <div class="who">
      <img src="${avatar}" alt="">
      <div>
        <div class="name">Anna Silva</div>
        <div class="handle">@notjustanna</div>
      </div>
    </div>
    <div>
      ${eyebrow ? `<div class="eyebrow">${escape(eyebrow)}</div>` : ''}
      <h1>${escape(title)}</h1>
      ${body ? `<div class="body">${escape(body)}</div>` : ''}
    </div>
    <div class="foot">
      <span>notjustanna.net</span>
      <span class="rule"></span>
    </div>
  </div>
</body>
</html>`;
}

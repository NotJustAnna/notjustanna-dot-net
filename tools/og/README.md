# @notjustanna/og

Renders the site's social cards from HTML into PNGs. Run it when the copy changes, commit the
output, forget about it.

```sh
pnpm og          # from the repo root
```

Cards land in `src/assets/og/` as 1200x630 PNGs, which is where the pages import them from.

## Adding a card

Add an entry to `cards.mjs` and re-run. `template.mjs` is the design --- it's the site's own
`AmbientBackground` and `:root` palette, flattened into one self-contained HTML file.

## Why it doesn't download a browser

`render.mjs` launches with `channel: 'chrome'`, which uses the Chrome already installed on the
machine. That keeps this a ~2MB dependency instead of a 150MB one. On a machine without Chrome:

```sh
pnpm --filter @notjustanna/og exec playwright install chromium
```

...and drop the `channel` option in `render.mjs`.

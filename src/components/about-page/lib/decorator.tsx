/**
 * Anti-scraping for the e-mail link. The HTML ships a decoy `mailto:`; the real
 * address is only assembled in the browser, by the delegated listener in
 * `src/layouts/base-layout.astro`, the moment someone hovers, focuses or taps
 * a link carrying this attribute. Delegated so it also works in
 * server-rendered markup that never hydrates (like the footer).
 */
export const decoratorProps = { "data-decorate-mail": "" } as const;

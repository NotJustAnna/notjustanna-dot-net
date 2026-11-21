// Renders every card in cards.mjs into src/assets/og/ as a 1200x630 PNG.
//
//   pnpm og
//
// Uses the system Chrome (`channel: 'chrome'`) rather than a Playwright-managed browser, so this
// stays a ~2MB dependency instead of a 150MB one. If that ever stops being true on some machine,
// `pnpm --filter @notjustanna/og exec playwright install chromium` and drop the channel option.

import { chromium } from 'playwright';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { cards } from './cards.mjs';
import { template, WIDTH, HEIGHT } from './template.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const repo = join(here, '..', '..');
const outDir = join(repo, 'src', 'assets', 'og');
const avatarPath = join(repo, 'src', 'assets', 'profile', 'personal', 'avatar-mini.jpg');

const dataUrl = async (file, type) => `data:${type};base64,${(await readFile(file)).toString('base64')}`;
const fonts = join(repo, 'node_modules', '@fontsource-variable');
const avatar = await dataUrl(avatarPath, 'image/jpeg');
const sans = await dataUrl(join(fonts, 'open-sans', 'files', 'open-sans-latin-wght-normal.woff2'), 'font/woff2');
const mono = await dataUrl(join(fonts, 'cascadia-code', 'files', 'cascadia-code-latin-wght-normal.woff2'), 'font/woff2');

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage({ viewport: { width: WIDTH, height: HEIGHT }, deviceScaleFactor: 1 });

for (const card of cards) {
  await page.setContent(template({ ...card, avatar, sans, mono }), { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  const png = await page.screenshot({ type: 'png' });
  await writeFile(join(outDir, card.out), png);
  console.log(`rendered ${card.out}  (${(png.length / 1024).toFixed(0)}kB)`);
}

await browser.close();

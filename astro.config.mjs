// @ts-check

import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import { autumnDark, autumnLight } from './src/lib/shiki-autumn.mjs';

// https://astro.build/config
export default defineConfig({
	site: 'https://notjustanna.net',
	integrations: [mdx(), sitemap(), react()],
	markdown: {
		shikiConfig: {
			// Both themes as CSS variables; blog-post.css picks one from the `.dark` class.
			themes: { light: autumnLight, dark: autumnDark },
			defaultColor: false,
		},
	},
	vite: {
		plugins: [tailwindcss()],
	},
});

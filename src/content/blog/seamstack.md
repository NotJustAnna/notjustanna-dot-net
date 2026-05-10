---
title: I've accidentally built a not-a-framework. It's called SeamStack.
description: I boilerplated too close to the sun and ended up with a new way to build web apps. And somehow it's not a framework.
pubDate: 'May 12 2026'
category: dev
heroImage: '../../assets/blog/seamstack.jpg'
---

Most of my career has been as a "full-stack developer". I put that in quotes because it usually meant "backend developer who also writes some frontend code". I was the person who built the API and wrote a little bit of JavaScript to call it. I was also the person who wrote the CI/CD pipeline and the AWS architecture, when no one more qualified was around to do it.

And I've been doing this for almost six years. Most of them were spent in either a multi-repo setup or, more recently, a pnpm monorepo. I've wired the same build shapes with the same scripts at least a dozen times. During development, hardcode the backend and frontend ports, wire them together. In prod, override a config value so the frontend accesses the backend at the right URL, and make sure the backend can find the built frontend assets it now needs to serve. It's not pretty. Every project gets a slightly different version of the same twenty lines, with slightly different hardcoded ports and paths.

---

## Bun's Fullstack Experience

Bun has this nifty feature where you can import a `.html` file and serve it.

```ts
import { serve } from 'bun';
import clientHtml from './client/index.html';

serve({
  routes: {
    '/*': clientHtml,
    '/api/users': {
      async GET(req) { /* Get all users */ },
      async POST(req) { /* Create a new user */ },
    },
  }
});
```

The `.html` file, in turn, can import `.ts/.tsx` files.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- title, meta tags, etc... -->
    <script type="module" src="./index.tsx"></script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

By running a single entrypoint, you get a dev server that serves your frontend and your backend at the same URL. No proxy config, no port assignment, no "who owns the public URL in dev vs prod" decision. It's one URL. You open it and it works.

... Just one problem, though: You're now stuck with [Bun's routing](https://bun.com/docs/runtime/http/server#basic-setup). [It's... rough](https://bun.com/docs/bundler/fullstack#migration-from-other-frameworks). No middlewares, no ecosystem, no nothing. Even Bun-first frameworks such as Elysia don't work with the fullstack experience. It's a neat demo, but you can't painlessly build a real app with it.

Bun gave me the fullstack experience I wanted, but it was too clunky and DIY for my taste. I wanted the experience, but with the freedom to choose my own tools.

---

## How much can I steal from Bun Fullstack?

It turns out, the answer is "a lot".

On one of my many pet projects, I had the brilliant idea to try to prototype something akin to the Bun Fullstack Experience using Vite and Hono. Vite has a plugin API that gives you access to the dev server's config. Hono has a middleware API that gives you access to the request/response lifecycle. Surely I can wedge myself out of a build script with plugins and middleware, right?

```js
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { seam } from '@seamstack/vite';

export default defineConfig({
  plugins: [react(), seam(), tailwindcss()],
});
```

```ts
// server/index.ts
import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static';
import { seam } from '@seamstack/hono';

const app = new Hono();

const { inlay, host, port } = seam({ serveStatic, port: 3000 });
app.use(inlay);
serve({ fetch: app.fetch, hostname: host, port });
```

The prototype became an MVP target in an afternoon.

The core insight is that dev and prod have inverted ownership. In dev, the frontend owns the public port — it's the dev server, it does HMR, it proxies `/api` to the backend on some private port you don't care about. In prod, the backend owns the port — it serves the API and ships the built assets next to its routes. Bun did all of that for me. I just had to figure out how to do it with Vite and Hono.

Could I game this with a single CLI? Yes. Great. I just needed a config file now. Yoinking the `vite.config.js` ergonomics was the obvious move here.

```ts
// seam.config.ts
import { defineWeave } from '@seamstack/weave';
import vite from '@seamstack/vite';
import hono from '@seamstack/hono';

export default defineWeave({
  fabric: [vite({ root: './client' }), hono({ entry: './server/index.ts' })],
  port: 4567,
})
```

A new thing started to take shape: SeamStack.

---

## It's Middlewares All The Way Down

SeamStack reads its config, resolves who's the asset-source and who's the asset-host, assigns an ephemeral private port to the backend, and injects the proxy rule into the frontend's dev server. You don't open `vite.config.ts`. You don't pick a port. One URL.

The backend needs to know that port. And in prod it needs to know where the built assets are. IPC between a Node process and a spawned `tsx` process. I thought about it for maybe thirty seconds and went with JSON-over-env-vars. `SEAM_INTERNAL__HONO_ADAPTER={"mode":"dev","host":"127.0.0.1","port":51423}`. Unglamorous. Works perfectly. The backend adapter reads the env var and knows everything it needs to know.

Prod was slightly more interesting. The backend starts cold — no SeamStack CLI in the picture, just `node server.js` inside a container. It needs to find the built assets somehow. First attempt: `require('./_seam_prod.js')`. Doesn't exist in dev. `try { require } catch { }`. Graceful degradation. Works.

`_seam_prod.js` is what `seam build` writes into `dist/` — a JS file that default-exports `{ assetsDir, indexHtml }`. The backend adapter finds it, mounts the assets, serves the frontend next to your API routes. The whole "where are the built files" problem, solved in twelve lines.

---

## To Boldly Go Where No Build Tool Has Gone Before

You know what? Supporting every relevant JS backend and frontend under the sun would be funny, actually.

```
seamstack
└── packages
    ├── angular
    ├── astro
    ├── elysia
    ├── express
    ├── fastify
    ├── hono
    ├── nestjs
    └── vite
```

... Oops. By Saturday evening: support for three frontends and five backends. All in the same `fabric` array, all working together with zero config. `seam dev` does all you need.

The interesting cell in the matrix is Angular + NestJS. Both are, charitably, the Spring Framework of the JavaScript ecosystem. Decorators everywhere, opinionated module systems, strong opinions about project structure, strong opinions about *everything*. SeamStack has no opinions about any of that — it just wires them together like husband and wife. Angular and NestJS in the same `fabric` array. SeamStack genuinely does not care. It was a sight to behold.

Sunday: `create-seam`. All the possible combinations someone could imagine. Interactive scaffolder. `pnpm create seam@latest`, pick a frontend, pick a backend, get a working project.

At some point I stopped asking myself whether this was still a prototype.

---

## The Part Where I Realized I Built a Not-A-Framework

Frameworks have opinions. SeamStack's only opinions are about ports and process boundaries — who starts first, who owns the public URL in each phase, where the manifest lives. None of that is an opinion about your code. In a sense, it's as opinionated as Vite is. And no one in their right mind would call Vite opinionated.

One CLI to rule them all. One config file to find them. One command to bring them all and in the darkness bind them.

```bash
pnpm create seam@latest
```

> Cover photo by [Héctor J. Rivas](https://unsplash.com/@hjrc33) on [Unsplash](https://unsplash.com)

---
title: 'Astro is Great, Actually'
description: "I added a blog to my portfolio site. Astro got out of the way entirely. That's rarer than it sounds."
pubDate: 'Apr 07 2026'
category: dev
heroImage: '../../assets/blog/comet.jpg'
---

I've been building personal websites long enough to have opinions about Bootstrap 2. Not nostalgia — opinions. It was the right tool for 2013, it held its ground on IE, and if you think that's funny you've never debugged a flexbox fallback at 1am for a browser that predates flexbox.

Since then: CRA when I wanted to play with the fancy React hooks, Next.js when Next.js was the new hotness, Tailwind the moment I learned it existed (and it never left), Vite when I wanted a cleaner foundation. The through-line is Tailwind and `.tsx`. That's where I live. Everything else is negotiable.

---

## I Wanted to Write Things Down

Dev.to was the obvious first move. It's where dev content lives, the tooling is fine, the audience is there. So I started writing there.

And then I wanted to write about other things. Keyboards. Thoughts that don't resolve into a tutorial. Life, vaguely. Dev.to technically allows it — some people are fine with that — but it never felt right. Dev.to is for dev content. Personal stuff belongs somewhere personal.

Which meant I needed a blog. Which meant I needed blog plumbing.

---

## The Obvious Problem

My portfolio site was just Vite. Static. No backend, no CMS, no server doing anything interesting. "Just add a blog" implies some infrastructure I don't have.

Someone said: Astro.

---

## Astro the Framework

Astro is a static site generator built on top of Vite. Which, first of all, COOL. Migration from my existing setup would be mostly renaming things. But the actually interesting part: Astro has a component model where you can drop in React, Svelte, Vue — it handles hydration for whichever ones need it, leaving everything else as zero-JS static HTML. The integrations list is absurd. MDX out of the box. Image optimization. RSS feeds. Sitemaps. Content collections with schema validation. It's not opinionated about what you're building; it just handles the boring parts so you don't have to.

Okay. I'm interested. What's the catch?

---

## Astro the Language

The catch is `.astro` files.

```astro
---
import { getCollection } from 'astro:content';
import { PostList } from '../components/blog/post-list.astro';
import { BaseLayout } from '../layouts/base-layout.astro';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';

const posts = (await getCollection('posts')).sort(
  (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
);
---

<BaseLayout title={SITE_TITLE} description={SITE_DESCRIPTION}>
  <section>
    <h1>Posts</h1>
    <PostList posts={posts} />
  </section>
</BaseLayout>
```

I looked at them and went: ugh. Frontmatter at the top, template below, logic mixed in — it gave me flashbacks to the Jekyll era of GitHub Pages, which itself gave me flashbacks to PHP files opening with a cascading reverse-indented avalanche of `</div>`s from the template three includes up. You know the files I'm talking about.

What made React work for me was precisely that it isn't that. A component is a function that returns HTML — not *really* HTML, it's JSX, it's movie magic — but the DOM is being treated as an object, not a text file with `<?php echo` stitched into it. I did not get into React to write PHP again.

---

## Oh, I Can Just Keep Using React

Turns out: yes.

My portfolio could stay in React and `.tsx`. The blog content is entirely Markdown with frontmatter. The blog's theming could also be fully written in React and `.tsx` as well. The `.astro` files handle the parts that would be awkward in JSX anyway — the `<html>` shell, path handlers, layout wrappers. Everything with actual logic is still React. Still a function that returns HTML.

Which left me with one question: what actually *are* `.astro` files?

---

## The Lingua Franca

They read like a PHP template. They parse more like Vue or Svelte with frontmatter. They have the structural feel of a Jekyll theme. It's as if someone looked at the entire history of web templating, said "yes, all of it," and produced something simultaneously familiar and alien depending on which corner you're looking at.

The generous read — and I think it's the correct one — is that `.astro` is the lingua franca of frontend templating. English absorbed Latin, German, French, Spanish, and somehow became a language. Not clean, not internally consistent, but widely legible. `.astro` files are like that. Not everyone's cup of tea. Definitely not mine, initially.

But once I understood what layer they operate at, the strangeness stopped mattering. The PHP comparison doesn't hold. It just looks that way from a distance.

---

The blog works. The whole thing is fast, the build tooling is familiar, and at no point did Astro ask me to change how I write components.

That last part is the actual endorsement. Frameworks have opinions. Astro had opinions too, and none of them got in my way. That's impressive.

> Cover photo by [Justin Wolff](https://unsplash.com/@jayphoto) on [Unsplash](https://unsplash.com)
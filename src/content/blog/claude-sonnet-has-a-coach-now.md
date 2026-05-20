---
title: 'Claude Sonnet Has a Coach Now'
description: 'My Sonnet got better AND cheaper? Where do I sign up?'
pubDate: 'May 21 2026'
category: tech
heroImage: '../../assets/blog/coaching.jpg'
---

Let's be real here: the model you use is not determined by the problem you're trying to solve, but by what models you have unlimited-enough access to, in whatever subscription tier you have. You get what you pay for, monthly. This post is about people using Sonnet 4.6.

Anthropic announced what they call the "[advisor strategy](https://claude.com/blog/the-advisor-strategy)", and then added it to Claude Code. I mostly ignored the announcement until I was bored and my Claude Code usage was running a bit thinner than I'd like. I was gonna switch to Sonnet for the rest of the day anyways, so I figured I should test it.

---

## Calling the Smarter Guy Over for Help

Corporate Anthropic jargon aside, this is just a `/advisor` command on Claude Code that enables another tool. When Claude Sonnet (or Haiku) feels unsure, it asks the Opus coach for help. The harness spawns an Opus instance, looks at the shared context, returns a plan or a correction, and disappears. Sonnet gets the advice as if it just made a tool call on what to do next, and keeps driving.

That's the entire shape. No orchestration layer, no subagent pool, no "big model decides what to delegate" — that's the *other* pattern, the older one, and the advisor strategy is the inverse: the cheaper model drives, escalates when it has to, and Opus only shows up when paged.

---

## Somehow, It Works

Anthropic ran the benchmarks — Sonnet+advisor scored 2.7 points higher than Sonnet alone on SWE-bench Multilingual, at 11.9% lower cost per task. For further specifics, see the [blog post](https://claude.com/blog/the-advisor-strategy). The gist is: cheaper and a bit smarter.

And this was published on April 9. Opus 4.7 shipped April 16. The numbers above all use Opus **4.6** as the advisor. Treat them as a floor.

Which means it isn't *"you can stop using Opus."* It's *"you should probably stop reaching for Opus 4.7 medium when you mean Sonnet 4.6 high."*

---

## The Missing Sonnet

Sonnet 4.6 already felt like Opus 4.5. Which is a compliment. The mid-tier of one generation matching the flagship of the previous one is what progress actually looks like, and Anthropic has been doing it for a few cycles now.

Opus, in advisory mode, is surgical. It doesn't rewrite Sonnet's plan. It points at the specific thing Sonnet is about to forget — the edge case, the test, the function that already exists three directories away. Two sentences. Sonnet adjusts and continues.

Sonnet 4.6 with an Opus 4.7 advisor feels, to me, like the Sonnet 4.7 that doesn't, and may never.

The output, when Sonnet finishes, is still distinctly Sonnet. Sonnet's prose, Sonnet's structure, Sonnet's tendency to ship the obvious version and call it done. That's not a complaint — I picked Sonnet on purpose, the texture is fine — it's just that the advisor doesn't change *what kind of code Sonnet writes*. It changes how often Sonnet forgets things.

Which means the thing you don't get is Opus's other gear. Sometimes Opus alone, given a hard problem, goes *completely out of the box* and the result is the kind of code review where you go *wait* and then *huh* and then *okay wow the model was smarter than me i guess*. Opus-as-advisor doesn't do that. The advisor's job is to keep Sonnet on Sonnet's rails, not to drag Sonnet onto Opus's. If you wanted Opus's rails, you wanted Opus.

I don't feel like I'll ever be surprised by Sonnet-plus-Opus the way I am sometimes surprised by Opus alone. The advisor is a safety net, not a booster rocket. It feels like a free Sonnet upgrade. It's good. I'm using it.

---

## The Current Lineup

Opus 4.7 itself isn't going anywhere. The genuinely hard problems — the ones where the breakthrough *is* the answer, where you'd like the model to come back with something you wouldn't have asked for — still go to Opus solo.

Sonnet 4.6 is now getting lifetime Opus 4.7 coaching on my Claude Code instances. Opus will catch the mistakes Sonnet makes, and Sonnet will keep doing what it does best.

I'm quietly retiring efforts "medium" and below for Opus. I don't need them anymore. Sonnet 4.6 high with an Opus 4.7 advisor is doing the same job at numbers I prefer and quality I don't mind enough to argue with.

---

Look, I know. Second LLM post in two months. If you're mad about it, please don't be. I don't write posts about clankers unless I know it'll be mildly interesting. LLMs are not interesting enough to write about more than once a month and, as far as this blog is concerned, are the tools I do the funny experiments with. Sometimes they're scaffolders-at-scale. Sometimes they're test subjects (see: [last month](/post/llms-got-autism-from-the-internet/)). Sometimes they're a smart Ghidra on a keyboard's firmware. Today they're getting coached, and that's worth a note.

> Cover photo by [Eileen Pan](https://unsplash.com/@eileenp) on [Unsplash](https://unsplash.com)
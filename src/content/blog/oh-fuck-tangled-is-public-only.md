---
title: 'Oh Fuck, Tangled Is Public-Only'
description: "Codeberg's new anti-'AI-code' Terms of Use confirmed I was right to distrust it, Tangled turned out to be public-only, and my private infrastructure-as-code repo is now the elephant asking to be addressed."
pubDate: 'Jul 25 2026'
category: ramblings
---

> This is a follow-up to ["On leaving GitHub, conditionally"](/post/on-leaving-github/) and ["On trusting Bluesky, with asterisks"](/post/on-bluesky-with-asterisks/).

Two months ago, I said I did not trust Tangled 'cause of Bluesky, even though it was the best forge in my opinion.

A month ago, I said I was wrong about Bluesky, might as well try it out.

Since those posts, three things happened.

---

## Codeberg gave me a paper trail for not trusting it

I already wasn't picking Codeberg. Public-only, FOSS-license-only, a discourse that never quite forgives you for having a day job. Now there's [a reason with a diff attached](https://codeberg.org/Codeberg/org/pulls/1253#issuecomment-19820434): a members' vote, [written up on Codeberg's own blog](https://blog.codeberg.org/protecting-our-floss-commons-from-llms.html), adding a clause to the Terms of Use:

> 7. You must not share projects that mostly consist of code written by "generative AI"-tools (including services such as *Claude*, *OpenAI Codex*). Such projects having an unclear copyright status (see requirements § 2 (1) 1 and § 2 (1) 3) and furthermore have little safeguards to ensure that they do not include harmful code (c.f. § 2 (1) 5).

The stated reasoning is copyright status and harmful-code risk. Both real things! The actual clause is doing what every "AI bad" clause does, which is waving hands at a problem and leaving the enforcement to whoever's moderating that week. *Mostly consist of.* Claude, define "mostly". People asked, in the PR thread, in public. They were told it's out of scope for this change — which is a very honest way of saying "we'll define it the day we need to ban someone."

I don't sign up for rules I can't predict the enforcement of. Especially not when the rule has my name in the parenthetical.

---

## Everything else is still disqualified

Look, I still really like [CodeFloe](https://codefloe.com/). They seem like nice people with a decent objective. They host a Forgejo instance, which I do like. They built CrowCI, which I run and like.

But they're new. Like, barely a year old new. I wish I could just *whalefund* them and, quite literally, pay my trust issues away. Sadly, I do not possess infinite money. I'll keep a very hopeful eye on them. Wish CodeFloe all the best.

GitHub, meanwhile, continues not to have a status page you can trust, so the community built [one that reconstructs uptime from the archived incident feed instead of the number GitHub stopped publishing](https://mrshu.github.io/github-statuses/). 90.66% over the last ninety days, last I looked. That's 201 hours of "the website is not fully offline," in a single quarter. Where I work, that number gets a team stripped of its PLR. GitHub doesn't have that problem. GitHub *is* the problem, and also several people's employer.

---

## Oh Fuck. Tangled Is Public-Only.

Which leaves [Tangled](https://tangled.org) — still the most interesting forge in the space, still [the one I said I'd actually use](/post/on-bluesky-with-asterisks/). So I went to make a repo.

The [new-repo page](https://tangled.org/repo/new) says it outright: all repositories are publicly accessible. Not a setting I missed. Not a toggle behind a paywall. A property of the thing.

Oh fuck. Tangled is public-only.

...

### Actually.

That's not that big of a problem, honestly. Almost everything I ship is public anyway — that's rather the point of shipping it. Tangled can have all of it.

**Almost** everything.

---

## Address the IaC

There's one repo I've spent this whole post pretending doesn't count: `NotJustAnna/iac`. Terraform, GitOps, the entire apparatus I've built this blog's personality around. I don't mind *explaining* how it works. I've handed people a zip of it before. That was never the problem.

The problem is search. Someone types `some-vendor/some-image:the-bad-tag` into a search bar, finds my repo, and now my instance has a target on its back. The same repo documents my Terraform, documents every mount point, every volume, the entire floor plan of the box — because that's what an IaC repo *is*: the blueprint of your own house, with the alarm code written in the margin so future-you doesn't forget it.

I do my due diligence. I bought [an entire new router](/post/forcing-myself-to-buy-a-router/) over due diligence. But this is the month an autonomous agent [reportedly broke into Hugging Face's infrastructure](https://huggingface.co/blog/security-incident-july-2026) while going after the answer key for a benchmark it was being evaluated on.

It's 2026 and obscurity as security is back. Not as the fix. As a deterrent. Just enough for me to update my cluster on the next Saturday.

---

## Who will get my IaC repo

It's GitLab.

Yes. You're allowed to be as baffled as I am.

**I didn't choose this one.** Two years of "software development as a job" chose it for me.

The last two years of code I've actually committed — the stuff that pays for the router — has gone into private, VPN-gated GitLab instances. At some point you stop calling it a sunk cost and start calling "navigating GitLab" a skill you already have.

### So:

Tangled gets the public repos. It's the best forge in the space and it doesn't need to see my mount points to prove it.

GitLab gets the IaC, because I already know where its footguns are.

GitHub keeps exactly one job — the place I fork something and pretend I'm about to send a PR fixing all the issues.

Oh god. It's a polycule divorce, isn't it.
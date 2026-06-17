---
title: 'On leaving GitHub, conditionally'
description: 'GitHub is bad and the only alternative I actually want is gated by Bluesky moderation. So nothing.'
pubDate: 'May 09 2026'
category: ramblings
---

> **Update, a month on:** I was more wrong than right about the identity layer being hostage to Bluesky moderation. Follow-up: ["On trusting Bluesky, with asterisks"](/post/on-bluesky-with-asterisks/).

GitHub sucks. Microsoft is somehow actively making it worse. Both of these are stable
facts and neither is news. The interesting part is what comes next, which
is: nothing comes next.

There is no free, usually VC-backed, drop-in alternative on the horizon. The window
in which that could have happened closed somewhere around the GitLab IPO,
and at this point GitHub has accumulated enough network effect that even an
identical product launched tomorrow would lose. Code lives where the issues
live. Issues live where the contributors are. Contributors are wherever
their friends already have accounts. Chicken, meet egg, meet the egg's
extended family.

So we are left with what we have. Which means the federated and self-hosted
side of the world. Which is a mess.

---

## The naming soup

There's [Gitea](https://about.gitea.com/) — the original. Then
[Forgejo](https://forgejo.org/), which is what happened when a chunk of the
Gitea community looked at Gitea Ltd. taking on outside investment in 2022
and decided that no, actually, the thing you're doing is not the thing we
agreed to build. So they hard-forked. Forgejo is now a separate codebase
under separate governance with separate releases and they no longer pull
from upstream.

Then there's [Codeberg](https://codeberg.org/) — the German non-profit that
runs *an instance* of Forgejo. So Forgejo is the software, Codeberg is the
host. One of them is code, the other is a place. People conflate them
constantly. I've done it in this paragraph if you're not paying attention.

Then there's [CodeFloe](https://codefloe.com/) — also a host running
Forgejo, founded last year by Patrick Schratz, which exists because of two
specific Codeberg policies. Codeberg is public-only and FOSS-license-only.
Which is a defensible position for a non-profit dedicated to free software,
and a completely useless position for anyone who wants to commit something
they haven't open-sourced yet, or who is allergic to the GPL, or who wants
to keep an in-progress idea private until they're done being embarrassed by
it. So Schratz spun up CodeFloe with private repos and unrestricted
licensing on the same Forgejo software. Same engine, opposite policy.

This is fine. This is how forks are supposed to work. The mess is that to
even make sense of "should I move my code there" you need to internalize
the difference between a software project and a hosting policy, between two
forks that share lineage but not direction, and between three names that
all start with C-o-d-e or G-i-t-e and rhyme. The discourse hasn't caught
up. Most of the "leave GitHub" advice you'll see online treats Gitea,
Forgejo, and Codeberg as either three names for the same thing or three
genuinely separate options, with no signal as to which.

For what it's worth: Forgejo is the software. CodeFloe is the host that
will accept your closed-source side project. Codeberg is the host I'd
point you at if your project is FOSS and you want to support a non-profit.
Self-hosting Forgejo is an option if you can either run it HA or pay
someone who can. Both of those cost more than people pretending to give
you advice will admit.

---

## tangled

There is one project in this space that I actually find interesting, which
is [tangled.org](https://tangled.org/). It's a git forge built on ATProto —
same protocol as Bluesky — with a federated model where repos live on
user-runnable servers called "knots" and the social and metadata layer
sits in your PDS. Stacked PRs. Jujutsu support. CI that pulls dependencies
from nixpkgs. Built in the open. The team is small and shipping.

It also looks, currently, like a wireframe that someone forgot to skin. No
theme support, hilarious amount of whitespace, the visual register of an
academic paper from 2003. Which I would forgive instantly if the
fundamentals were right. The fundamentals appear to be right. I would use
it.

I don't.

---

## Waffles

Tangled uses ATProto for identity, which means in theory I can bring my
own PDS and stay clear of Bluesky-the-company. In practice, almost
everyone's PDS is hosted by Bluesky, the federation relays are operated by
Bluesky, and the cultural gravity well of "an ATProto account" is a
Bluesky account. So the question of whether I trust Bluesky's stewardship
of the network is not separable from the question of whether I want to
stake my code's identity layer on it.

And Bluesky's stewardship of the network has a pattern. The pattern is:
suspend trans users for criticism that wouldn't get a transphobe a label,
then dismiss the resulting complaints. In August 2025, [multiple trans
users were suspended for criticizing JK
Rowling](https://www.advocate.com/transgender/bluesky-jk-rowling-2673905189) —
including Jessie Earl, whose flagged post in full read "I also wish ill on
JK Rowling," which moderation classified as "threats of violence and
incitement of self-harm." Meanwhile [Jesse
Singal](https://techcrunch.com/2024/12/13/bluesky-is-at-a-crossroads-as-users-petition-to-ban-jesse-singal-over-anti-trans-views-harassment/),
the most-blocked account on the platform, was reinstated after a personal
chat with the head of Trust & Safety and continues to post.

When this was raised to the CEO, on the platform, [the response was the
single quote-post
"WAFFLES."](https://bsky.app/profile/jay.bsky.team/post/3m25esnq4t22y)
This was October 2025. It was not a typo. It was a meme reference deployed
as a method of declaring user-safety concerns off-topic. TechCrunch [wrote
it up](https://techcrunch.com/2025/10/05/waffles-eat-bluesky/) as the
short version. Nico Mara-McKay [wrote it
up](https://plutopsyche.medium.com/blueskys-ceo-meltdown-how-leadership-continues-to-fail-its-most-marginalized-users-8bfa7a8824b4)
as the long version, with receipts. The long version is worth reading.

The next part is the part that matters for tangled specifically. In the
days following the WAFFLES incident, several users critical of the CEO
were suspended without violating the terms of service. One of them, a
Black community builder, was reportedly banned not just from Bluesky but
from "basically all ATproto apps/projects" — an effect [documented at the
time](https://bsky.app/profile/rvbdrm.com/post/3m2jxe5ly722x). If that
report holds, it means the federation story ATProto tells about itself —
that you can leave a moderation regime by switching apps — does not yet
describe how the network actually behaves under pressure. The identity
layer and the moderation layer are coupled in practice even where the
protocol claims to decouple them.

You can decide for yourself what this pattern says about the stewardship
of the network. What it says to me is that the people running the
practical identity layer of the ATProto ecosystem think moderation is a
vibes operation, that selective enforcement against the people the
platform was originally built by and for is a forgivable cost, and that
"WAFFLES" is a sufficient response when a user raises that this is a
problem. None of that is a property of the ATProto protocol. All of it is
a property of the company that runs the biggest implementation of it. And
right now, "the biggest implementation" is close enough to "the
implementation" that the distinction doesn't help you.

---

The conditional is: if you can stomach being identified-by, hosted-by, and
moderated-against-the-cultural-defaults-of Bluesky, tangled is the most
interesting forge in the space and you should try it. If you can't, the
honest answer is to host on Codeberg if your code is FOSS and on CodeFloe
if it isn't, and to keep an eye on whether ATProto's identity layer ends up
meaningfully decoupled from Bluesky-the-company in the next two years.
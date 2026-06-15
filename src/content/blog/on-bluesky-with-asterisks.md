---
title: 'On trusting Bluesky, with asterisks'
description: 'I was somewhat wrong about ATProto. The protocol decoupling mostly holds. I still do not trust it 100%, and the asterisks are where I live now.'
pubDate: 'Jun 15 2026'
category: ramblings
---

> This is a follow-up to ["On leaving GitHub, conditionally"](https://notjustanna.net/post/on-leaving-github/).

Last month I said I wouldn't put my code's identity layer on ATProto, because
the moderation layer and the identity layer were coupled in practice even
where the protocol claimed to decouple them. The load-bearing evidence was
one report: a user reportedly banned not just from Bluesky but from
"basically all ATproto apps/projects."

Some people were quick to point out that I was more wrong than right.

---

## What I got wrong

Here was the reasoning: Bluesky moderates badly, the identity layer is
mostly Bluesky, therefore the identity layer is moderated badly, therefore
your DID is hostage. Clean. The middle step is where it falls apart.

If you host your own PDS, you are, in fact, clear of Bluesky's moderation.
That's not a marketing claim, it's just how the thing is built. Your repo
of record is *yours*. Bluesky labelling a Bluesky account does not reach
into a PDS Bluesky doesn't run. The decoupling I waved away as theoretical
is real, and I should have said so.

So: walk it back. If you leave Bluesky's PDS, you are safe from Bluesky
moderation.

There's a bag of asterisks included, though.

---

## The asterisks

**(\*) — as long as Bluesky doesn't ban your DID from their relay.**

A relay aggregates everyone's repos into one firehose that apps subscribe
to. It *could* refuse to carry you. The good news — and I do mean good news —
is that as far as I can tell, it never has. Not once. The relay has stayed a
dumb pipe, which is exactly what you want a relay to be. (\*\*)

**(\*) — as long as apps unrelated to Bluesky don't volunteer to honor
Bluesky's bans.**

This was the actual fear last time — the "banned from basically all ATproto
apps" report. Digging, I can't find a single case of a non-Bluesky app
deferring to Bluesky's moderation list. Nobody went "oh, *they* banned you?
say no more." The decoupling holds. Good.

**(\*) — your PDS can't be Bluesky's.**

Which doesn't mean you host it — it means someone other than Bluesky does.
So: someone else runs it, or you do. They fail differently.

### The managed options

A PDS hosts *all* your data, and most independents bill it by the gigabyte.
Periwrinkle — the best commercial independent I've found — gives you 500MB
free. That's an ocean right up until it's your cat photos *and* your tangled
repos in the same bucket; git history is not small. Their paid tier is $4
for 5GB.

Here's the part that stings: the only two PDSes I can find that *don't* count
your gigabytes are Bluesky's and [Eurosky's](https://eurosky.tech/). One is
the company I spent a whole post not trusting. The other is a Dutch
non-profit running free, apparently-unlimited accounts on Hetzner in Germany,
and I genuinely cannot find the catch — which, for a free thing run on a
non-profit's grant money, *is* the catch. "Free and unlimited" is a sentence
with an expiry date, and someone else holds the pen. So the exit is either a
downgrade you pay for, or a gift you don't control.

### Hosting it yourself

The pitch is you stop renting, and the numbers back it: [GalaxyGate's
Lightning tier](https://galaxygate.net/hosting/vps/) is $3 for 15GB of NVMe,
unmetered bandwidth, weekly backups, and an actual computer attached —
cheaper *and* bigger than $4-for-5GB. Of course it is.

It's a container and a domain and an afternoon — right up until you learn
what happens when a PDS goes down. [The network keeps your account alive for
a grace period](https://atproto.com/specs/account) off whatever the relays
already cached, so your old posts don't vanish; but you can't *write*
anything new, and anything fetched straight from your PDS — blobs, repo
contents, the files in a git repo — is unreachable until you're back. Which
is a delightful property to pair with self-hosting your forge: [just don't
put the IaC repo that manages your PDS on
tangled](/post/self-hosting-everything-including-the-single-point-of-failure/).
The day the PDS falls over is the day you need that repo, and it's the one
day it's behind the door you can't open. Chicken, meet egg, meet the egg's
sysadmin locked out of the henhouse.

---

## The asterisks on the asterisks

The relay thing — **(\*\*)** — only matters if the apps you care about
actually depend on Bluesky's relay. And they don't have to! There are
multiple relays now. Multiple jetstreams. You can run your own, or point at
someone else's, and the official Bluesky one becomes just *a* relay instead
of *the* relay. This is great. This is the network growing up.

... and then, tangled uses the Bluesky relay and jetstream. (***)

So for the one forge I actually wanted to use, the asterisk is live. Not
fatal — the relay has never banned anyone, see above — but live. The escape
hatch exists and tangled hasn't walked through it.

And **(\*\*\*)** on *that*: the standard reassurance is "if the Bluesky devs do
wrong, the community will route around them." Will it, though? I want to
believe it. But the entire history of the internet is a series of "someone
made everyone else's life materially worse and then nothing happened." The
community *can* route around a bad relay. Whether it *will*, fast enough, the
day it matters, is a bet, and I've watched that bet lose before.

---

## Who's actually doing it right

Credit where it's due, and it's due to [colibri.social](https://colibri.social/).

Colibri is the "Discord is visibly dying, here's the lifeboat" app, an
ATProto chat platform with communities, voice, the works. And the reason I'm
pointing at them is the infrastructure, not the feature list. They run their
own jetstream. They run their own PDS for new users. Which means a Colibri
account does not route its identity or its firehose through Bluesky-the-company
by default. They built the decoupling instead of inheriting the
coupling. That's the work, and they did it.

Tangled gets a *maybe good enough?* badge. The forge fundamentals are still
the best in the space — I haven't changed my mind there. But it sits on
Bluesky's relay and jetstream, and it doesn't need to. It wouldn't even have
to self-own the way Colibri did; pointing at *any* non-Bluesky relay would
retire the asterisk. Colibri proved that's a thing a small team can ship.

---

The conditional from last time gets shorter. If you leave Bluesky's PDS,
you are clear of Bluesky moderation, full stop, and I was wrong to imply
otherwise. The trust I'm still withholding isn't from the protocol — the
protocol is fine — it's the gap between "the network *can* route around
Bluesky" and "the network *will*."

So I'm taking it. I'm self-hosting my PDS on the VPS I already pay for.
It's a container, a domain, and a saturday afternoon.

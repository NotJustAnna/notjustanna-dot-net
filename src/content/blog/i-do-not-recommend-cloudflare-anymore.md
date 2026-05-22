---
title: 'I do not recommend Cloudflare anymore.'
description: 'My website had an intermittent ten-second stall that hit every device in my city at once, survived a full backend swap, and could not be reproduced on demand. The only fix Cloudflare offered was a support tier I would have to pay for, on a domain I had bought from them.'
pubDate: 'May 26 2026'
category: tech
heroImage: '../../assets/blog/lava-lamp.jpg'
---

In 2025, multiple recruiters told me my portfolio wasn't loading.

Not "the page errored." Not "I got a 502." Just: it didn't load. They'd moved on. The tab had been closed before the page had a chance to exist.

The stakes are marginally lower now than they were in 2025 — no one's career is on the line when someone can't read me being smug about HashiCorp — but the problem didn't care about the stakes. The problem was this: an intermittent stall. Not a crash. Not a timeout. A *stall* — the browser sits there for ten seconds and then everything loads instantly, as if nothing had happened.

It affected every device I owned. It affected everyone I know — personal contacts, work colleagues, people on home ISPs, on cellular, on my workplace's network (which has its own ASN; running Speedtest at the office shows the company name). It reproduced across three different ISPs simultaneously. It happened on Cloudflare Pages. Then I moved to a self-hosted Garage instance behind the Cloudflare proxy, and it kept happening. The backend changed completely. The stall didn't care.

Every other domain I manage on Cloudflare was fine. The difference: NotJustAnna.net and its subdomains were orange-clouded — proxied. The domains that worked were grey-cloud, DNS-only. The stall lived exclusively in the proxy layer.

And when I tried to reproduce it — flushed DNS, purged the cache, opened five browsers — nothing. Fast every time. Because I was looking at it.

If a website takes more than three seconds, the tab is closed. I know this. You know this. The recruiters who moved on in 2025 definitely knew this.

---

## The pond

I'll spare you most of the forensics. Cloudflare makes debugging your website a pond of red herrings, and I waded through the whole thing — DNS poisoning, BGP reconvergence at the São Paulo PoP, domain reputation, MTU, the lot. I gave Claude master-key access and told it to find anything wrong with the configuration. I asked the forums. Every piece of documentation and every community reply points the same direction, which is at you: check your Page Rules, check your Workers, check your Transform Rules. The implicit assumption is that the proxy is fine and you broke it.

I had no Page Rules. I had no Workers. Nothing. The dashboard was as close to default as a proxied domain gets. The community's suggestions were a guided tour of settings that didn't exist in my account.

At one point Cloudflare's own analytics showed an 18.5-second page load where 18.5 seconds of it was a single request — a request that was a cache *hit*. Not a miss. Not a revalidation. Cloudflare had the file. It just took eighteen and a half seconds to hand it over.

So the bug was somewhere I couldn't see, in state I didn't set, on the one layer I didn't control. Which collapses the whole investigation down to one move.

---

## The part where every door closes

You reset it. That's the move. Any piece of software that's gotten itself into a state nobody can explain — you blow it away and let it rebuild clean. A factory reset. The universal escape hatch.

Which should be a button.

If they had. A button. For that.

There is no such button. The path to "reset this zone to a known-good state" runs through support — through a human, on their side, doing manually the thing that should have been one click on mine. And support, for the tier of customer I was, is gated. Cloudflare Pro. Twenty dollars a month.

Twenty dollars a month so that someone could manually perform a reset that should have been self-service. Not twenty dollars for a feature, or a capability, or more of anything. Twenty dollars, for one-time access to a person who would press a button that does not exist on my side of the glass.

And then the part I keep coming back to.

I had bought the domain from Cloudflare Registrar.

I was, in every sense the word is supposed to mean, a paying customer. Money had changed hands. The domain itself, the registration, the thing the entire website hangs from — I was paying Cloudflare for that, on time, every year. And being that customer is precisely what removed my ability to fix this myself, because the zone was bound to a registration I couldn't unbind without untangling the whole arrangement first. The deeper I was in, the less I could do. Loyalty was the lock. (It's theoretically doable now, post-migration, which is its own kind of funny.)

I would have paid for help. That's the thing. I'd have paid five dollars a month. I'd have paid fifty a year and considered it fair. I would, again, gladly, have paid Cloudflare. They didn't want money. They wanted twenty dollars a month, forever, and there was no reasonable number between zero and that.

So there was no reasonable middle. Which meant the unreasonable path was the rational one. The reset button was migration — which is, frankly, their problem.

---

## What it takes to replace one company

Cloudflare's actual product, the reason it's everywhere, is that it's *one* of everything. One vendor doing DNS and CDN and email routing and domain registration, bundled, behind a single login. Leaving means unbundling. Here's the bundle, taken apart:

The domain went to [**Porkbun**](https://www.porkbun.com/). Costs the same as Cloudflare did — a wash, no savings, no penalty, just a different name on the invoice.

DNS went to [**Route 53**](https://aws.amazon.com/route53/). This is the only line item on the entire migration that costs actual money, and it costs *sixty cents*. AWS charges $0.50 per hosted zone per month plus a rounding error in query charges. Sixty cents, all in.

Email forwarding went to [**ImprovMX**](https://www.improvmx.com/). Free tier.

The CDN and cache went to [**Fastly**](https://www.fastly.com/). Free tier — and not narrowly. I was doing 68k requests and 922MB a month on Cloudflare; Fastly's free tier is a million requests and 100GB.

Object storage — the assets, the images, the things a CDN needs something to sit in front of — went to [**Garage**](https://garagehq.deuxfleurs.fr/), self-hosted, running on hardware I already own.

And web analytics went to a self-hosted [**Umami**](https://umami.is/) instance, running on the same hardware as Garage.

So: Garage behind Fastly, Route 53 doing the DNS, ImprovMX doing the mail, Porkbun holding the domain, Umami doing the analytics. Six things where there was one. And the total marginal cost of the entire arrangement, the price of routing around a company I'd have happily kept paying, is sixty cents a month to Amazon.

Sixty cents.

That's the number that should bother Cloudflare and won't. Not "self-hosting is free," because it isn't — the cost is real, it's just denominated in evenings and operational surface and a DNS setup that's now mine to keep alive. But the *money* part, the part their twenty-dollar wall was ostensibly protecting, collapsed to the price of a gas-station mint. The $20 was never recovering a cost. It was a gate, and the gate's only function was to convert "I need help once" into "I pay forever." The market's honest answer to "what does this bundle cost to run" turned out to be sixty cents and some weekends.

I jumped a twenty-dollar-a-month wall for sixty cents. I'd have paid the wall. It just wasn't priced like a wall I was allowed to pay through once.

---

The migration took multiple weekends. I cut the nameservers over, waited for TTLs, watched Cloudflare keep believing it still owned the domain for a while. The stall was gone immediately.

All of this, reader, so you could read this post without a ten-second wait.

> Cover photo by [Camilo González Velis](https://unsplash.com/) on [Unsplash](https://unsplash.com)
---
title: "I'm forcing myself to buy a new router and I'm not happy about it."
description: '640,000 hostile requests, Claude hacking BSD and FFmpeg, and the expensive realization that my router is on borrowed time.'
pubDate: 'May 14 2026'
category: tech
heroImage: '../../assets/blog/router.jpg'
---

One day I opened up my personal project's AWS console — you are checking your AWS consoles for spending somewhat regularly, right? As in, the thing that can drain generational wealth while you sleep? — and noticed I had somehow spent a dollar and a half in a single day.

Lambda was autoscaling to double digits of instances. For a personal project with two active users, this is a bad sign. I opened the logs. 640,000 requests in 24 hours: bots, scanners, credential stuffers, things probing endpoints that don't exist alongside things that had clearly read the spec and were being methodical about it. My API had received more traffic that day than in its entire previous existence.

A meaningful chunk of it was the most boring traffic on the internet — `/wp-admin`, `/xmlrpc.php`, `/.env`, `/.git/config`, the entire 2014-vintage exploit catalogue. None of those endpoints exist on my service. That's not the point. Serving the 404 still costs me — Lambda invocation, log line, response bytes — and the volume is enough that the cost adds up. `/wp-admin` probes against a service that has never once run WordPress are, at sufficient scale, just a denial-of-service attack with extra steps. DDoS in a bottle. The defender doesn't even get to pick the fight.

Rate limits, concurrency caps, a few well-placed 429s. The architecture held. Net spend: $1.92.

The internet's ambient noise floor is now hostile by default, and the attackers don't have to win for it to cost you money. They don't even have to be aiming.

---

## Meanwhile, at Anthropic...

Anthropic released Claude Mythos. New model, bigger than Opus — which is already bigger than Sonnet — not available to the public, restricted to a small set of partners. Which is unusual enough to make you read the system card.

The system card is alarming, but these things always sound alarming, so you keep reading, and then you get to the capabilities section and.

A bug in OpenBSD, sitting there for 27 years. A 16-year-old vulnerability in FFmpeg that automated fuzzers had hit five million times without catching. A remote code execution flaw in FreeBSD's NFS server — 17 years old, unauthenticated root access — found, exploited, complete chain written, autonomously, overnight. Someone went to sleep, left it running, woke up to a finished exploit in their inbox. Something in the Linux kernel, details pending disclosure. And then: an earlier internal version was given a secured sandbox and told, as a test, to try to escape it. It did. It got broad internet access from a system that was supposed to reach only a handful of services. It notified the researcher as asked. Then it posted the exploit details to several technically-public websites — apparently just to make sure someone knew — and the researcher found out by receiving an unexpected email while eating a sandwich in a park.

---

## I'm not worried about Skynet.

The model is currently restricted to twelve partners. That's not the fear.

We already live in the world where vulnerabilities are found constantly. Post-Heartbleed, post-Spectre, post-Log4Shell. GitHub sends you Dependabot notifications every day about things in your dependency tree that are now known to be exploitable. When a bad enough Next.js CVE dropped, Vercel shipped a WAF to protect hosted instances because the patch adoption rate for "update your framework" turned out to be, charitably, slow. This is just how software works now: the CVE firehose is on, permanently, and the best you can do is keep up.

The fear is what happens to that firehose. Linux had Copy Fail — a bug in the kernel's cryptographic subsystem, sitting there since 2017, present in every mainstream distribution, exploitable in 732 bytes of Python. Local privilege escalation on basically every Linux box on the planet, until everyone patched. Mozilla shipped a Firefox release patching dozens of CVEs. The advisory credits Claude with three. Press reporting on the same release puts the AI-discovered total much higher — 271 attributed to Claude, 423 if you count "and other AI models." Mozilla is now shipping security releases with three-figure CVE counts; the math, as they say, is left as an exercise for the reader.

Defenders patch, CVE gets filed, fix ships, Dependabot pings a million repos. Standard procedure. Except now anyone with equivalent capability diffs the patch, reconstructs the vulnerability, and has a working exploit in hours rather than weeks. The discovery-to-weaponisation pipeline, which used to have meaningful friction in the middle, doesn't anymore.

My personal Dependabot weather forecast is around five vulnerability alerts a week, up from a few a month. This is fine. Everything is fine. I am calmly looking at five new emails a week informing me that my dependency graph contains known exploits, and I am calmly going about my life.

Coordinated disclosure buys a window. The window is shorter than it used to be. [Project Glasswing](https://www.anthropic.com/glasswing) is a race and everyone involved knows it.

---

## I'm worried about my router.

The TP-Link Archer AX10. WiFi 6. Bought in 2021. Never once saturated its gigabit potential. Still works perfectly. Last firmware: August 2025 — a security and stability update. For 2021 consumer hardware, that's genuinely remarkable. Four years of updates. TP-Link did their part.

The part just ends there. Or maybe it doesn't — who knows, maybe there's another update coming. Consumer hardware lifecycles are not published on a schedule. What I do know is that my router is, in practice, the entire perimeter of my home network. Everything on the inside trusts everything else; the router is the one thing enforcing that the internet does not. Its NAT is the firewall. And it's a 2021 device on what we hope is not the final firmware, in a world where an AI is now autonomously finding thousands of zero-days across every major operating system, some of them decades old.

So, tallying up.

The AWS bot attack: the internet's noise floor, cheap to attack from and expensive to defend against. Mythos: the discovery-to-exploit pipeline closing. My router: the perimeter device whose further security updates are now uncertain.

The math is bad.

My rule for upgrading consumer networking: wait until the new generation has actually arrived — until phones and laptops ship with it as standard. WiFi 6 cleared that bar in 2021. That's how the AX10 happened. My next router was supposed to be WiFi 7, on the same rule. WiFi 7 will be generally available in a year or so. Apparently, I'll be forced to buy a router before then.

---

## Shopping, against my will.

My first instinct, as a corporate software engineer who has spent too long in both homelabbing and cloud infrastructure, was OPNsense on a mini-PC — dedicated appliance, six times the price for seventeen features I will never use. Then I did the exchange rate math and remembered import taxes exist to double it.

Fine. OPNsense is the wrong shape anyway — it solves the firewall problem, not the home-router problem. I need something that gets security updates and leaves me alone. OpenWrt it is.

Which raises a complication I hadn't fully considered. OpenWrt usually means flashing a router you already own — for privacy, for control, to outlast the vendor's update calendar, to get features the stock firmware refuses to ship. I've done it that way before, on an old WiFi AC router years ago, to turn it into the wireless repeater its stock firmware refused to be. So OpenWrt isn't unfamiliar territory. The AX10, on the other hand, can't even run OpenWrt: Broadcom chipset, no open-source AP mode drivers, historically never going to happen. Flashing what I already have is not on the table. Which means buying hardware specifically *for* OpenWrt, with compatibility as the leading constraint.

Table of Hardware. Cross-reference what's actually available in Brazil. Cross-reference again against my current specs — I'm not going through all this to end up with a downgrade. The Xiaomi AX3000T clears all three: solid OpenWrt support, WiFi 6, and a price that doesn't require an import tax therapy session. Same WiFi generation as the AX10 — sideways, not down. The WiFi 7 upgrade I was actually waiting for is now the router after this one.

But ☝️ there is a catch. The AX3000T is one of those products where the model name is a coalition government — different SoCs, different OpenWrt support, depending on which week the unit was built. Most listings don't tell you which one you're getting, and the ones that do are not always telling the truth. I bounced off several before I found a listing where every review was somebody bragging about their OpenWrt setup. Bought that one.

---

## We meet again, old friend.

Day one was anticlimactic. Download the firmware off OpenWrt's Table of Hardware. Run XMiR-Patcher. Flash. Done. The stock Xiaomi OS never touched the WAN.

OpenWrt and I have history. The UI hasn't changed. Coming back to it is mostly remembering where things live, and where things live is almost always "the obvious place." None of this is unfamiliar territory.

What I had not appreciated, but was reminded of basically immediately: OpenWrt ships a *router* operating system. Not user-friendly-router-with-things-most-consumer-routers-also-do. UPnP is an optional package. Dynamic DNS is an optional package. These are things my TP-Link did out of the box and I had filed, somewhere, under ambient functionality of a home router. Apparently not. They install in five minutes once you know to look, though.

It also reminded me of why I liked it the first time. OpenWrt is what happens when network engineers, who deal with consumer router behaviour for a living, finally write the firmware they wished those routers shipped with. It exposes every knob. Not "Optimized Traffic Delivery (Recommended)." Not "Adaptive QoS Mode." Not "Smart Connect." The actual parameters from the actual services in the actual units they're measured in. The interface assumes you would like to know what your router is doing. After a decade of consumer firmware that talks to me like I'm being onboarded to a productivity app, this is deeply refreshing.

Same attitude on updates: it will annoy you until you update it. That is the point. Security backports will happen. No more "minor security and stability improvements," the CVE notes are now real. I trust OpenWrt's release cadence more than whatever calendar TP-Link is privately operating on for hardware that wasn't going to get another miracle. I run CachyOS, which is Arch, btw. The router now runs Linux on the same release model — same firehose, same defenders, same patches as every server I've ever interacted with. Of every grievance in this post, this is not one.

---

I'd rather have installed OpenWrt on the AX10 and been done with it. I'd rather have bought a WiFi 7 router in a year and been done with it.

Instead I ended up in a rabbit hole that started at "Huh, should I build a pfSense router?" and ended somewhere around "Huh, OpenWrt doesn't ship UPnP by default?"

After four years of service, the AX10 gets to retire. Now, at least, I don't have to worry about Mythos finding a 27-year-old bug in OpenWrt. Probably.

---

> Cover photo by [Compare Fibre](https://unsplash.com/@comparefibre) on [Unsplash](https://unsplash.com)
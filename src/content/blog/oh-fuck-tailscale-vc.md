---
title: "Oh Fuck, Tailscale's Venture Capital"
description: 'A decade of tunnels and coordination servers — Hamachi, OpenVPN, Tailscale, Headscale, and reluctantly Tailscale again — and the SLA math that keeps making the decision for me.'
pubDate: 'Jul 21 2026'
category: ramblings

---
Everyone's first VPN was Hamachi, probably. Not the kind you use to sail the seven seas — that's a different kind of VPN, with a different kind of forum thread — the kind that let a ten-year-old join a Minecraft server without knowing what NAT stood for. [I've written about Hamachi properly elsewhere](/post/fond-memories-of-hamachi/), the fish, the patent, the UK Ministry of Defence's unwitting /8. This isn't that post.

This is the other one. The one where I count every VPN, tunnel, and self-hosted coordination server I have trusted since, in the order I trusted them, and complain about most of them.

---

## UDP Is UDP, After All

2024, and I discover my TP-Link AX10 has an OpenVPN server built in. Not a feature I went looking for — one of those things you find while clicking through a router's admin panel at 1am because you're bored and the router is right there.

It sat unused for a while. Then I was on hospital wifi, which is the kind of network administered by someone whose actual job is keeping medical devices alive, and who has, correctly, deprioritized whether I can reach my home Jellyfin server. Most of the ports were closed. Most of the obvious things were blocked.

OpenVPN worked anyway. UDP is UDP, after all — the firewall wasn't discriminating against my traffic specifically, it was just doing what locked-down networks do, and a UDP tunnel out to a residential IP doesn't look meaningfully different from anything else on that port. That was the moment "my router has a VPN in it" stopped being a curiosity and started being infrastructure I actually reached for.

---

## PARANOID SECURITY (Their Words, Also Mine)

2024 into 2025, I worked at Avanade. What's relevant to this story is the security culture, which I will describe, generously, as paranoid, and less generously, as also correct. Consulting for enterprise clients will do that to a company. I didn't love living inside it. I also couldn't argue with the reasoning, which is its own kind of annoying.

Then the market did its trillion-dollar meltdown in the first quarter of 2025, and I was part of the layoff that followed. New job in May, structured three days in the office and two from home — which was, genuinely, the first time in my career an office existed that I had to physically go to.

And that's where the AX10's built-in VPN earned its keep for real. From the office, I could reach my home machine like I'd never left it. I could also browse with my home connection's IP address, which meant not having to think twice about opening Bluesky on a work network, because some corners of that app are thirstier than a corporate proxy log really needs to know about.

---

## Two Datacenters, One Of Which Was Under My Desk

Before K3s, I ran what I generously called a ["two-datacenter, two-node" Nomad cluster](/post/i-run-nomad-on-my-gaming-pc-its-great/) — one node an OCI free-tier instance, the other my homelab. WireGuard connected them and carried whatever traffic passed between. By the time I started actually writing about any of this, I was already most of the way through phasing Nomad out.

---

## So, How Do You Kubectl?

Around the same time as the ["Containers, The Wrong Way"](/post/containers-the-wrong-way-for-always-free-fun-and-profit/) posts, K3s raised a question Nomad never really made me answer: how do you reach `kubectl` from somewhere that isn't the node itself?

First answer: OpenVPN. I genuinely don't remember why I picked it over WireGuard at the time — I suspect I was just wrong, and you'll see why in a moment — but the friction showed up fast. Remembering to manually connect to a VPN before every `kubectl` command is a habit that survives about four days.

Second answer: Tailscale. Better. Peer-to-peer, mesh, no manual connect step — we all love P2P, and it's the reason mesh VPNs stopped being a workaround and started being load-bearing infrastructure for everyone doing this kind of thing.

Third answer: Headscale. Tailscale's protocol, self-hosted. This felt, at the time, perfect. I got `*.tailnet.notjustanna.net` as my internal namespace and I loved it, unreasonably, the way you love a thing that's purely for you and nobody else will ever see.

---

## Then Headscale Died With Everything Else

I've [already told this story properly](/post/self-hosting-everything-including-the-single-point-of-failure/), so I'll keep it short here: the single point of failure happened, Headscale went down with it, and Headscale was specifically what `kubectl` used to reach the cluster. No Headscale, no way in, no way to fix the thing that would bring Headscale back.

The fix was a temporary OpenVPN connection, stood up just long enough to fix everything else, immediately followed by regret at having needed it. Fourth answer: back to Tailscale, hosted, someone else's problem now.

I'm still a little sad about `*.tailnet.notjustanna.net`. I don't get to have that anymore.

---

## Oh Fuck, Tailscale's VC

Concurrently to writing ["On Leaving GitHub"](/post/on-leaving-github/), I did the thing you do when you've just spent several thousand words being annoyed at a company's ownership structure, which is look sideways at every other piece of infrastructure you depend on and ask the same question of it.

Tailscale is venture-backed.

Oh fuck.

Okay. Math time. What SLA do I actually need here, and what does it cost to get myself there? For a Headscale-shaped self-hosted answer, the honest requirement is high availability — a single instance is a single point of failure by construction, and I'd already lived through what that costs me once. So: does Headscale do HA?

It does not. [SQLite only, Postgres support dropped, single instance only](https://github.com/juanfont/headscale/issues/2695#issuecomment-3106637622) — you could reasonably call it HA-hostile, and I mean that as a description, not an insult.

Which means the honest math points to: use Tailscale until the VC money runs out. I don't love that conclusion. I also haven't found a cheaper one that's actually true.

---

## Why Choose?

Somewhere in this timeline I also [bought a new router, unhappily](/post/forcing-myself-to-buy-a-router/) — that's genuinely its own post — and the point of buying it was OpenWrt.

OpenWrt gives you complete DNS control. Your router answers to `openwrt.lan`. Your homelab answers to `homelab.lan`. You can map anything you want, because it's your DNS server and nobody's charging you for the privilege. It also does WireGuard. It also does OpenVPN. Yes, it also does Tailscale — see above for why that's not where I'm putting my trust these days.

Why choose? WireGuard as the primary tunnel. OpenVPN as the fallback, specifically for networks that are watching closely enough that a WireGuard handshake would stand out. And the SLA math actually gets better here, because "can I reach my home network" now reduces to "is my router online" — a much smaller, much more honest thing to depend on than a hosted coordination service.

---

## 1000 Minutes

The OCI instance is still on Tailscale. I'm not thrilled about it. I am, reliably, able to `kubectl` without thinking about it, which counts for something.

What actually bothers me is the ephemeral minutes counter. The whole premise of [treating machines as cattle](/post/containers-the-wrong-way-lessons-learnt/) is that long-lived nodes are still, in principle, disposable — replaceable without ceremony. Tailscale's free tier disagrees, quietly, by counting long-lived ephemeral nodes against a shared budget of 1000 minutes a month.

Do the accounting with me:

- 1000 minutes is 16 hours and 40 minutes.
- Five failed reconnects that each take about three and a half hours to resolve is enough to burn through that in a single month.
- Paying doesn't fix the ratio the way you'd hope. The cheapest paid tier doesn't buy you more minutes. Getting to 10,000 minutes means the $18-a-month tier, for one month, then downgrading back once you don't need it anymore.

None of this has actually happened to me. I stay a little wary of it anyway, the way you stay wary of a smoke detector with a dying battery — not because it's gone off, but because you know exactly the conditions under which it would.

---

Self-hosting and needing a real SLA are always a little at odds with each other. That's not news to anyone who's tried both. It only becomes an actual problem when neither side is negotiable — when you need five nines and you're the only person on call, or when you need free and someone else has a board to answer to.

Reader, I need both right now. So I'm doing what everyone in that position eventually does: paying, a little, resentfully, for exactly as much dependency as I can stand, and routing as little through it as I can get away with. If push comes to shove, I'll take the cheapest Tailscale tier there is and call it a compromise instead of a defeat.

I don't actually know what Tailscale's bank account looks like right now. Neither do you. That's sort of the whole post.

---
title: 'Fond Memories of Hamachi'
description: 'I learned about Hamachi because I was ten and wanted to play Minecraft with someone. In 2026, I went down a rabbit hole and found out it was more interesting than it had any right to be.'
pubDate: 'May 27 2026'
category: tech
heroImage: '../../assets/blog/mesh-networking.jpg'
---

I was around ten years old when someone told me I needed to install Hamachi to join their Minecraft server.

I didn't know what a VPN was. I didn't know what NAT was. I installed a program, clicked a button, got a number that started with 5, joined the server, and forgot about all of it immediately. That was the entire experience.

Eventually I learned about static DHCP leases and port forwarding, as one does, and I stopped needing it. I assumed everyone else did the same and we all collectively moved on.

---

## It Turns Out We Did

In 2026, Tailscale exists. WireGuard exists. Every homelab tutorial assumes you already have a mesh VPN running — it's load-bearing infrastructure now, not a workaround. The networking problem Hamachi was solving has been solved so thoroughly that the solution is boring.

So I got curious about what happened to Hamachi, and I found [Alex Pankratov's personal website](https://swapped.cc/#!/hamachi), which has a quiet little page about it. Which sent me down a rabbit hole that I should probably not have followed.

---

## The Fish Named After a Fish

Hamachi — the name — is a fish. Yellowtail. It comes from an internal eTunnels project called "tuna," which was a NAT-traversal layer for IPsec, and someone named Stephen Bevan built a revised version and named it after a different fish, and then eTunnels went under in 2002, and the name was just... sitting there. Pankratov used it.

The entire brand of a product that reached three million users traces back to a fish pun at a dead dot-com.

eTunnels' main contribution, aside from the name, was the UI concept: an IM client repurposed to list network peers. Everyone in 2004 understood the IM paradigm — green dot means online, grey means away. No mental model translation required. You look at Hamachi and you already know what it's doing.

---

## The Actually Interesting Part

Pankratov launched it in 2004 by uploading a setup package to FileForum. The launch, in his words, was "utterly unremarkable." Then it went viral. Three million users in eighteen months, at which point LogMeIn acquired Applied Networking Inc. in 2006 and Hamachi became someone else's problem.

The hosting bill in that pre-acquisition period: a bit over five hundred dollars a month. That was the rack fee. With basic bandwidth allocation.

The reason it could be that cheap is that Hamachi was peer-to-peer — actually peer-to-peer, not "peer-to-peer" as a branding exercise. Clients connected directly to each other. The servers were coordination infrastructure, not data pipes. Almost no traffic flowed through them. The architecture wasn't just elegant; it was what made the business model viable at all.

And the IP addressing scheme, which I had filed away as "weird thing Hamachi did," turns out to have been a deliberate decision. The usual RFC 1918 ranges (10.x, 172.16.x, 192.168.x) were excluded specifically to avoid colliding with the private networks Hamachi was supposed to complement. So they picked 5.0.0.0/8, which was unallocated by IANA at the time.

It was not going to stay that way. In 2010, RIPE NCC got the block, the IPv4 address crunch was already on, and Hamachi users started finding that [real internet hosts on 5.x.x.x addresses were invisible to them](https://labs.ripe.net/author/mkarir/first-impressions-of-pollution-in-two-ripe-ncc-darknets/). Hamachi migrated.

To 25.0.0.0/8.

Which has been assigned to the UK Ministry of Defence since 1985.

The reasoning being, presumably, that the MoD doesn't publicly route their /8, so collisions are between you and several hundred thousand squaddies and nobody outside that arrangement notices. Which is true. It is also extremely funny. The fix for "we picked an IP range and someone official took it" was "let's pick a range that's already taken, but by someone who won't tell anyone."

---

## The Part That Got Me

The NAT-traversal mechanism — the actual secret sauce — was server-coordinated hole punching. The fact that it was server-coordinated is what got it to a 95% success rate when everyone else was getting much worse numbers.

The problem with naive UDP hole punching is that you're asking both peers to punch through their NATs simultaneously without knowing each other's port allocation behavior. If both NATs are address-independent, fine, it works. If one is symmetric, it doesn't. If both are symmetric and incrementing, you can sometimes guess. If both are symmetric and random, you've lost.

Hamachi's trick was that the server actively pinged each client from multiple source ports, watched what external ports the client's NAT allocated in response, classified the NAT, predicted the next port allocation, and then scripted the punch sequence centrally — telling each client exactly which port to send to, exactly when. For incremental NATs behind shared infrastructure, it serialized the negotiations so two peers didn't burn the same predicted port. For TCP it sidestepped most of the simultaneous-open complexity by having the server tell each side what state to be in.

The server drives the process. That's the sentence. Everything else follows from it.

This is, in 2026, how [STUN](https://datatracker.ietf.org/doc/html/rfc8489) plus [ICE](https://datatracker.ietf.org/doc/html/rfc8445) works. You have a coordination server, clients report their observed external addresses, the server brokers the introduction. The difference is that ICE is standardized and public, and Hamachi's version was proprietary and got rolled into a patent application that Pankratov [filed in 2006](https://patents.google.com/patent/US20070157303A1) and was [granted as US8296437B2 in 2012](https://patents.google.com/patent/US8296437B2). It's assigned to GoTo Group — formerly LogMeIn, now a portfolio company several tranches deep in collateralized debt (the assignment record on the patent itself shows Barclays Bank PLC and U.S. Bank Trust as collateral agents, which is the kind of detail you don't usually find on a patent record).

It expires in 2028.

The claims are specific enough to the ping-probing mechanism that WireGuard plus STUN probably doesn't infringe, and the current holders seem to have more pressing problems than enforcement.

Pankratov's [note on his website](https://swapped.cc/#!/hamachi): "Mind the patent app though... not that it is going anywhere it seems." He was already skeptical when he filed it. He turned out to be wrong about it not going anywhere — it granted — and right about where it ended up, which is sitting on a balance sheet next to several lien agreements.

---

## A Brief Materials List

The primitives Hamachi used in 2004 are all still here. Server-assisted NAT traversal. TUN/TAP virtual adapters. Per-pair relay selection for when P2P fails. Broadcast domain emulation so LAN protocols work over the tunnel. The broadcast forwarding piece was unusual at the time; traditional VPNs didn't bother. Hamachi did it because it was the whole point — not just "connect two machines" but "make those machines think they're on the same switch."

Today that's STUN, ICE, WireGuard, and whatever control plane you want to bolt on top. The primitives are standardized. The tooling is mature. The mental model is unchanged.

Someone could build a very clean version of this — kernel FOU for the dataplane, lightweight ICE-style NAT traversal in the control plane, no encryption overhead if you don't need it, minimal complexity if you're just trying to build a mesh across networks you control. Cheaper than Tailscale, simpler than rolling your own WireGuard with a full PKI. Skip the Byzantine NAT types you don't actually encounter, build for the regimes you have.

Huh. Someone should build that.

---

> Cover photo by [Conny Schneider](https://unsplash.com/@choys_) on [Unsplash](https://unsplash.com)
---
title: 'IPv6 Fixes Everything On Purpose'
description: 'IPv6 does not have design flaws so much as it has people bringing DHCP-shaped, firewall-shaped, and subnet-shaped complaints to a protocol that already gave everyone a public address and moved on.'
pubDate: 'Jul 2 2026'
category: tech
heroImage: '../../assets/blog/sixth-floor.jpg'
---

**We're out of IPv4 addresses.** Between IANA handing out its last unallocated blocks in early 2011 and AfriNIC — the last regional registry standing — finally running its own pool dry in 2017, "being out of IPv4 addresses" is a decade-old problem already. We have now been recycling IPv4 addresses like our digital lives depend on it. That's because they do.

This, in turn, created horrible decisions, such as NAT routers, and then the devil's spawn: **Carrier-Grade NAT (CGNAT)**. You may be actively suffering under CGNAT this exact moment — hint hint, your router's address is `100.64.x.x`-shaped. Your CGNAT internet may also be IPv4-only. If that's you, please sue your ISP for emotional damages, like, right now. You may also choose to leave this post to avoid further emotional pain, and that's fine. Go check [test-ipv6.com](https://test-ipv6.com) if you want the receipts.

If you have both a non-CGNAT IPv4 address and IPv6 (aka dual-stack), lucky bastard. If you have CGNAT + true IPv6, that's not as bad as it sounds. And if you're on cellular right now, you may be surprised, but you're most likely on an IPv6-only network.

And if you have IPv6, you may not believe it, but—

---

## Your Device Has A Public Address

Your device has a public address. A public one. Not shared, not translated, not routed through a landlord who reads your mail first — yours, global, sitting right there on the interface. You could host a Minecraft server tonight and tell a friend to connect to `[2001:db8:dead:cafe::a17]` and it would just work.

...Wait. What is that. Why the brackets. Why the colons. Why does it look like a regex pattern procreated with a generated password.

Yes, fine: the addresses are long, they live in brackets, and there is no version of shouting one across a room that doesn't sound like a hostage negotiation.

> Alex: "Jeff, what's the IP of the IPMI of the server that's on fire?"
>
> Jeff: "Get ready, it's a long one. 2001 the lost odyssey, database eight, dead cafe, double colon, alpha seventeen."
>
> Alex: "What."

That's the one complaint about IPv6 I will actually defend.

Here's the thing though. If you have IPv6, you have been quietly routing most of your traffic over it without even realizing it. Check your router's neat stats page and you'll probably see something like mine:

```
RX+TX over IPv6: 4.24 TB
RX+TX over IPv4: 70.27 GB
```

That's not a rounding error. That's two orders of magnitude. You won't believe it, but Google, WhatsApp, and Instagram have all been IPv6-compliant since pretty much forever. You've been living your entire digital life on this network. You just never had a reason to look at the address.

---

## What's My IPv6 Address?

So. It's complicated. Not in the "this is hard" sense — in the "there's more than one, they mean different things, and the honest answer depends on who's asking" sense. Here's mine, freshly massaged so none of it traces back to anything real:

```bash
[anna@anna-desktop ~]$ ip -4 address
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
2: enp7s0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000
    altname enx10ffe02e6885
    inet 172.16.1.1/19 brd 172.16.31.255 scope global dynamic noprefixroute enp7s0
       valid_lft 30468sec preferred_lft 30468sec
[anna@anna-desktop ~]$ ip -6 address
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 state UNKNOWN qlen 1000
    inet6 ::1/128 scope host noprefixroute
       valid_lft forever preferred_lft forever
2: enp7s0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 state UP qlen 1000
    inet6 fdfd:440e:fe67::a17/128 scope global dynamic noprefixroute
       valid_lft 42041sec preferred_lft 42041sec
    inet6 2001:db8:dead:cafe::a17/128 scope global dynamic noprefixroute
       valid_lft 4241sec preferred_lft 1541sec
    inet6 fdfd:440e:fe67:0:9709:db46:b108:867e/64 scope global dynamic noprefixroute
       valid_lft 5069sec preferred_lft 2369sec
    inet6 2001:db8:dead:cafe:45fa:14e0:a8eb:3d67/64 scope global dynamic noprefixroute
       valid_lft 5069sec preferred_lft 2369sec
    inet6 fe80::64e3:4aa:67ae:44f4/64 scope link noprefixroute
       valid_lft forever preferred_lft forever
```

One IPv4 address, private, doing its usual one-address-does-everything routine behind whatever my ISP's up to. Five IPv6 addresses on the same interface: past the loopback, a ULA and a GUA handed out as tidy single addresses — that's the DHCPv6 pair — a ULA and a GUA with the long randomized tail — that's SLAAC — and a link-local `fe80::` address that isn't going anywhere near the internet and isn't supposed to.

Five's the enthusiast's number. Three's the normal one: link-local plus a pair from either DHCPv6 or SLAAC. Either way, that's the actual headline, the thing under the thing: having multiple addresses is great. Who the fuck thought using the same address for link-local nonsense, your identity on the LAN, and your actual presence on the wider internet was ever a reasonable plan? IPv4 asked one number to be your name, your seat at the table, and your mailing address, all at once, and then acted surprised when NAT had to become a permanent fixture just to keep that metaphor from collapsing under its own weight.

IPv6 just doesn't do that. Link stuff gets its own address. LAN identity gets its own address, in a range that isn't going anywhere no matter what your ISP does upstream. Your actual global presence gets its own address, separate from both, that your firewall gets to have opinions about. Nothing's wearing three hats. Nobody's overloaded. It is the most boring kind of correct.

---

## Everything Else Is You, Not IPv6

I see you, poor networking engineer, currently forming an objection. I also see you during the one lecture your course spent on this — I know, because I didn't sleep through it, and I saw you in the corner, three rows back, gone. Anyways.

**"How am I supposed to set a nice 172.16.16–17.x-shaped range for guest DHCP clients?"**

You don't. You have, conservatively, eighteen quintillion addresses sitting in that one subnet. The instinct to carve out a cute little numeric neighborhood for the guest network is a /24-brained habit, and the subnet does not need your help.

**"But without NAT, my devices are all exposed to the internet."**

They aren't. Your router has a firewall. It has had one this whole time. NAT was never the security feature — it was a side effect you got used to leaning on, the way you'd lean on a wall that happened to be next to you, and then started describing as load-bearing.

**"But without NAT, how am I supposed to port forward, or set up a DMZ?"**

Your router has a firewall. Rewriting addresses at the edge and *controlling what's allowed through the edge* are two different jobs that IPv4 taught you to solve with the same tool, badly, and IPv6 is simply declining to keep doing that bit.

---

## Understanding You're The Problem

Reader, strip the specifics away and every one of these complaints resolves to the same misdiagnosis, over and over, always with a real IPv6-native fix sitting right next to it:

- **You're solving a DHCP-shaped problem with IP.** Wanting printers on .50–.60 and IoT junk on .100–.150 is a DHCP reservation policy, not an addressing scheme. Give the range a name in your DHCP server and stop asking the subnet to remember it for you.
- **You're solving a firewall-shaped problem with NAT, UPnP, and DMZ.** Wanting Plex reachable from outside is a stateful firewall rule pointed at Plex's address. UPnP just automated the part where an app begs your router for a hole to crawl through, and everyone agreed that was fine for a decade.
- **You're solving a DNS-shaped problem with IP.** If you're memorizing or hardcoding an address for anything — your NAS, your homelab dashboard, whatever — that's a hostname you haven't set up yet. Split-horizon DNS exists specifically so you never have to know `2001:db8:dead:cafe::a17` by heart.
- **You're solving a subnet-shaped problem without doing subnets.** Wanting IoT, guest, and trusted devices kept apart is a VLAN with its own /64, not one shared range and a hope. You're not short on /64s. You're short on the willingness to hand a few of them out.
- **You want to hand-place every address like a control freak**, because you grew up with 254 or 65,535 of them and scarcity became a personality trait. That's a DHCPv6 reservation keyed to the device's DUID. You get the same tidy list. It just stops needing to also be small.

IPv6 doesn't fail to solve any of this. It refuses to. By design. It looks at the workaround you built your whole mental model around and declines to provide the surface you'd need to keep building it. That refusal reads as breakage the first hundred times you hit it. It isn't. It's the protocol declining to be complicit.

None of this is IPv6 being difficult. It's IPv6 declining to hand you the specific rope you used to hang your old habits on. Reasonable, honestly. This post is a summary of what I have learned so far when toying, obsessing over, and getting mad at IPv6. And it was all my fault.

---

We're better at recycling IPv4 addresses than we are at recycling anything else. Which tracks. Instagram access is, after all, more important than saving the planet — and you can't effectively save the planet without 5 stories, 3 reels, 2 posts, and thirty-plus still photos about it first.

If you're still thinking about that Minecraft server, go host it tonight. Just check if your friends' ISP is IPv6-capable first.

---

> Cover photo by [Arisa Chattasa](https://unsplash.com/@golfarisa) on [Unsplash](https://unsplash.com)
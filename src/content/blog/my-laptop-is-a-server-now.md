---
title: "My laptop can't tell its lid is closed. It's a server now."
description: "In April I said the V14's chassis would give out before its CPU did. It did. Then a friend got stopped at airport security with one laptop too many, and I replaced a Lenovo Tiger Lake i5 with a Lenovo Tiger Lake i5."
pubDate: 'Nov 22 2026'
category: ramblings
---

> This is a follow-up of ["The Laptop That Refused to Retire"](https://notjustanna.net/post/the-laptop-that-refused-to-retire/). It's also, somehow, a follow-up of ["Your Gaming PC is a Server. You just don't know it yet."](https://notjustanna.net/post/your-gaming-pc-is-a-server/), ["I'm half giving up on Kubernetes. But only half."](https://notjustanna.net/post/half-giving-up-on-k8s/) and ["The Skylake i3 Paradox"](https://notjustanna.net/post/the-skylake-i3-paradox/). None of that was planned.

Last month I closed my laptop's lid, and my laptop never found out.

I found out the next morning, when I opened it to a dead battery. Somewhere in an unfocused tab, a paused YouTube video had kept the whole machine awake all night, waiting for me to press play.

---

## Electrical Tape

In April I wrote that the i5-1135G7 would outlive the chassis. "I'm almost certain of it."

I'd like it on the record that I called it.

The lid sensor went first. Then the charger cable caught on something and lost a sliver of its rubber, so now it wears a ring of electrical tape. Neither of these is fatal. Both are the kind of thing a laptop does once it has started making plans.

The CPU, meanwhile, is fine. The CPU has always been fine. Nothing about this machine was ever going to die of processing power.

---

## A Server-Shaped Hole

In August I wrote [a whole post](https://notjustanna.net/post/your-gaming-pc-is-a-server/) arguing that you don't need to buy a server, because the gaming PC under your desk already is one. I meant every word.

I also spent the following months looking at used Xeon towers going for around R$1000.

The argument wasn't wrong. The desktop runs Jellyfin and the *arr stack without noticing, exactly like I said it would. But "without noticing" still means *on*. The 8700G sits there all day so a cron job can wake up and look for new episodes, and the computer I play games on rarely gets a night off. I wanted it to have some well-deserved shutdown. A Xeon tower would have done it.

R$1000 is also R$1000. I kept the tab open and didn't buy it.

---

## Two Laptops Per Passenger

Then, on a Friday, I opened my personal laptop at work and found the bezel had fractured. A piece of it had come away and exposed some of the IPS panel's insides.

The panel itself was fine. Of course it was. It was the R$1000 birthday panel, the one part of that machine I'd picked on purpose.

Still: oh crap. I'd have to fix that, sooner or later.

That same afternoon, a friend called. He was at the airport, moving across the country, and security wasn't letting him through with more than two laptops.

He had three.

Reader, I live five minutes from the airport.

I went and grabbed the third one on a "we'll figure something out later" basis. Then I asked whether he'd rather just sell it to me than have us both work out how to ship a laptop across Brazil. He said he would.

By Saturday it was mine. The first company I worked at handed out laptops by lottery. This one came out of an airport security line.

<!-- TODO: confirm: what you paid for the T14, if you want the R$ number in the post. Left out on purpose. -->

---

## Tiger Lake, Again

It's a ThinkPad T14. Intel i5-1145G7. A better IPS panel than the one I'd just paid R$1000 for, speakers that sound like speakers, Thunderbolt, and a fingerprint reader.

In April I said the V14's chassis behaved like it was made of ThinkPad. Now I own the ThinkPad.

Again, technically. My first laptop, when I was six or seven, was an IBM ThinkPad running Windows 98: no Ethernet port, a modem port, a TrackPoint, and an infrared port I never once saw do anything. I don't remember the model. I also don't know why the adults decided a small child should be playing educational games on an IBM ThinkPad on the carpet (it wasn't the only laptop in the house, to be fair), but I've been quietly obsessed with ThinkPads ever since. The construction that refuses to break. The little red nub in the middle of the keyboard.

Add Thunderbolt, which I [have feelings about](https://notjustanna.net/post/every-port-i-loved-is-now-called-usb-c/), and a fingerprint reader for Windows Hello, and my friend had been trying to get my entire wishlist past airport security without knowing it.

Read that spec sheet again, though. Slower.

Lenovo. Eleventh-gen Intel. Tiger Lake. Core i5. IPS.

I replaced a Lenovo-built 11th gen Tiger Lake i5 IPS-screen laptop with a Lenovo-built 11th gen Tiger Lake i5 IPS-screen laptop. The 1145G7 is the 1135G7 with vPro and two hundred more megahertz on the boost clock.

My last post was about how the i5 stopped needing to get faster once daily usage stopped growing into it. Exhibit A: I have now bought the same i5 twice, and the second time counts as an upgrade.

It went straight into the V14's old job as the ambient computing layer of the apartment. Anime on my chest, recipes on the counter, plugged into the TV.

Which left the V14 without a job.

---

## Alone in the Dark

The V14 has 24GB of RAM. The Oracle VM the cloud half of my homelab runs on has 12.

It took a Thursday. Ubuntu Server 26.04, installed off my Ventoy stick, with Ventoy's `auto_install` plugin feeding an autoinstall file to the stock ISO. No custom image. The 1TB Crucial BX500 that had been holding the entire media library inside the desktop came out and went into the laptop's 2.5" bay.

Then it got the same treatment as the Oracle VM: Podman `.kube` Quadlets, the same git-pull timer, the same repo, now laid out one folder per machine. Jellyfin, Sonarr, Radarr, Prowlarr, Bazarr, and two qBittorrents: a private one that downloads and seeds forever, and a public one that leeches and leaves. The OpenWrt router resolves `*.homelab.lan` to it, and it runs its own Traefik with a local CA, so `jellyfin.homelab.lan` answers over HTTPS from anywhere in the apartment.

Two weeks ago I wrote that there will never be a second node. There still isn't one. Nothing is clustered, nothing schedules across anything, and neither machine knows the other exists. The repo just has two folders now.

Then I ran `docker compose down` on the desktop and didn't bring it back up.

The broken lid sensor turns out to be the most server-appropriate thing about the machine. Every guide to running a laptop as a server starts by telling you to set `HandleLidSwitch=ignore`, so it doesn't suspend the moment you close it. Mine came pre-configured. In hardware. By failure.

I can close the lid now. It still won't find out.

Its hostname is `aloneinthedark`. I name my machines after Siamés songs; the Oracle VM has been `summernights` this entire time, and you're only hearing about it now because it finally has a sibling.

---

## Holy Shit, Batman

On the desktop, Jellyfin transcoded on the 6750 XT through VAAPI. On the laptop it's Quick Sync, on the same Tiger Lake iGPU I described in April as "not embarrassing for anything that wasn't gaming" and then never used for anything at all.

One catch: Tiger Lake ships with its HuC firmware switched off, and Jellyfin's low-power H.264 and HEVC encoders need it. The fix is one line in `/etc/modprobe.d/i915.conf` and a reboot:

```
options i915 enable_guc=2
```

Then I threw the hardest file in the library at it: a 2026 film about a guy trying to save humanity from a cell, 10-bit HEVC with Dolby Vision and HDR10+, tone-mapped down to SDR at 3Mbps, with the entire chain on the iGPU.

320fps.

On a 24fps film, that's over thirteen times realtime, on the integrated graphics of a laptop that can't tell whether its own lid is closed. My exact words at the time were "holy shit batman", and I stand by them. Quick Sync is, and I want to be precise here, *AWESOME*.

The odd file Quick Sync can't decode falls back to the CPU, which turns out to be perfectly decent at it. The CPU has nothing else to do.

In August I wrote about a laptop sitting in somebody's closet with a perfectly good hardware encoder and nothing to do. It never occurred to me that I owned one. Mine wasn't in a closet. It was on my chest, playing anime.

---

In April I wrote that when the V14 ran out of jobs, I'd find it a new home. Hardware doesn't retire. It changes hands.

It never ran out of jobs. It ran out of chassis. And the hands that changed were at airport security, holding one laptop too many.

Planned obsolescence is an unstoppable force. A Brazilian who has spent months pricing used Xeons is an immovable object. The object got a server out of it.

The ThinkPad has Thunderbolt, a fingerprint reader, and no idea what it's in for.

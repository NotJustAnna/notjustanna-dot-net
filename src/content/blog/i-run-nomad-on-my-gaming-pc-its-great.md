---
title: 'I Run Nomad on my Gaming PC (It''s Great)'
description: 'HashiCorp Nomad is designed for hundreds of nodes across multiple datacenters. I run it on my gaming PC. Cluster of one. It''s great.'
pubDate: 'Mar 26 2026'
category: dev
heroImage: '../../assets/blog/gaming-pc.jpg'
---
HashiCorp Nomad is a workload orchestrator. Think Kubernetes, but without the container-first dogma — it can schedule containers, sure, but also raw executables, Java applications, scripts, whatever you have. It's designed for fleets: multiple datacenters, hundreds of nodes, cross-machine scheduling. The kind of infrastructure where "where does this service run" is a question Nomad answers for you.

That's the intended use case. Here's another one.

---

My first professional encounter with Nomad was at a company where our team had no RDP access to the Windows Server we were deploying to. No remote desktop, no SSH, nothing — just Nomad and whatever we chose to run through it.

So Nomad became everything. Restart a service? Nomad. Check backend logs? Nomad. Copy files onto the machine? We deployed Filebrowser through Nomad so we could do that too. The machine was, for all practical purposes, a black box we could only interact with through the web UI and job specs.

This wasn't one rogue team. There were a dozen teams doing the same thing, each with their own trio of Windows Servers — DEV, STG, PRD. Each machine a proper behemoth: 32 or 64GB of RAM, terabytes of storage, quietly running 20-something JVM-based services that would eventually consume most of that memory. Nomad scheduling all of it. Single node, pointed at itself.

Was this production? Yes. Was it highly available? No — it was roughly on par with a Linux box running systemd services, just with a shinier interface and HCL files instead of unit files. But it ran. Teams shipped things. Nomad, against all architectural intent, worked.

None of us questioned this. I had come from SSH, Docker Compose, Portainer — tools where "the interface to the machine" and "the service manager" are different things. Nomad fit neatly into my mental model as *Portainer but for bare-metal Windows*. Web UI, log access, restart buttons. Close enough.

I only found out this was off-label when I finally read the HashiCorp docs. They were very clearly written for someone orchestrating fleets. Multi-datacenter topology. Node pools. Cross-machine scheduling. I was running one agent, pointed at itself, on a machine I couldn't even open a terminal on. The docs and I were not describing the same situation.

And yet: it worked.

---

## How it followed me home

When I decided to self-host Jellyfin and DDNS-Go on my personal machine — which, at the time, ran Windows — I reached for the tool I knew.

Windows, as a self-hosting platform, has two notable properties: it has no good log story, and it has no good service management UI. Task Scheduler exists. Services exist. Neither of them will make you feel good about yourself.

Nomad had a web UI I could reach from anywhere on my Tailscale network, live log tailing, and a restart button. I wrote a job spec, set up `raw_exec`, and Jellyfin was running. Logs accessible. Restartable from work, from my phone, from wherever — no terminal required.

---

## And then I migrated to Linux

Nomad came with me.

This is, I think, the real testament to the setup. When I finally moved to Linux — where proper service management exists, where `journalctl` is right there, where I had every excuse to do it correctly — I kept Nomad. Because clicking through a web UI beats memorizing `journalctl` flags. Because I already had the job specs written and they just worked.

My gaming PC now runs a Nomad agent pointed at itself. A cluster of one. Same off-label usage I accidentally learned at work, just with less mystery Windows Server and significantly more RGB.

When I moved to Linux, I didn't just migrate Jellyfin and DDNS-Go. I added Sunshine to the roster too. And Code Tunnel. The thing I originally wanted to restart from work — the whole reason I went down this path — ended up as just another Nomad job. One more entry in the web UI. Restartable from anywhere, as long as I have a VPN connection to the PC.

---

## Is this wrong?

Technically, yes. Nomad is built for fleets. Running it on one node is like using Kubernetes to manage your dotfiles.

But the off-label usage holds up — and I say this as someone who stumbled into it by accident and only realized it was off-label afterward. It survived a Windows Server I had no other way to access. It survived being someone's actual production infrastructure across an entire organization. It survived my personal Windows machine. It survived a migration to Linux where I had every incentive to switch. What you get at the end of all that is a web UI where you can see your services, read their logs, and restart them from anywhere — and a declarative spec file that travels with you across operating systems.

At some point you stop calling it wrong and start calling it yours.

Sometimes the right tool is the one you already know how to use. Even if you learned it wrong.

---

> Cover photo by [Balkouras Nicos](https://unsplash.com/@ba1kouras) on [Unsplash](https://unsplash.com)
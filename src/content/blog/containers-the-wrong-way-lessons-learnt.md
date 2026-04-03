---
title: 'Containers, The Wrong Way: Lessons Learnt'
description: '"One container for the whole machine" is just a VM with extra steps. A week later: the steward container pattern. A thin Alpine image that orchestrates MORE containers. Don''t extend scratch images — use them.'
pubDate: 'Mar 25 2026'
category: dev
heroImage: '../../assets/blog/learning.jpg'
---
> This is a follow-up of ["Containers, The Wrong Way, For Always-Free Fun and Profit"](https://notjustanna.net/post/containers-the-wrong-way-for-always-free-fun-and-profit/)

In my last post, I told you all a wild idea: stop caring about the host OS of your EC2/VM. Take the OS hostage. Make it a babysitter of privileged container, and from that point on it's as relevant as a bastion VM. Your environment lives in an Docker/Podman image.
Versioned, reproducible, and testable on your laptop/QEMU/VMWare.

A week later, `119 files changed, +612 -4210 lines changed` (this is what an Ansible retirement looks like) and I have one thing to say:

The core idea was right. I just hadn't "thought with containers" all the way through.

---

## Prelude: The host OS matters. A tiny bit.

Here's the thing about the "host OS doesn't matter" premise: it only holds if the host OS *agrees to not matter*. Your privileged container needs to start and be able to take the host OS hostage. That's the whole deal. The host gets you to that point, and then it gets out of the way.

Oracle Linux ships with SELinux enforcing by default. And SELinux, doing exactly what SELinux is designed to do, looked at my privileged container with host networking and nested containers and said: wait just a goshdarned second. And, to be honest? *SELinux is right*. Windows Defender would have a field day trying to defend itself against this OS-level hijacking attack with admin rights.

The fix is... straightforward enough — set SELinux to permissive, reboot. But that's the problem for me. This would mean writing a whole "is SELinux enabled? try disable it and reboot" script to my cloud-init, which is already way too big IMHO.

This isn't Oracle Linux being bad. It isn't SELinux being wrong. It's a contract violation: I needed a host that would get out of the way, and this one wouldn't.

So... back to Ubuntu 24.04 Minimal. No drama. `unattended-upgrades` at 6am UTC. The host goes back to being furniture.

---

## I Wasn't Actually Thinking With Containers

My original idea was, conceptually: take whatever free Linux distro the cloud handed you, bolt a privileged container with Alpine, run everything inside. One container. One image. K3s, Tailscale, manifests, startup logic — all of it, together.

I thought I was thinking with containers. I was actually thinking *"how do I run a VM without virtualizing another Linux kernel."* The question I should have asked earlier: *why stop at one container?*

`rancher/k3s` is a scratch image. No shell, no package manager, nothing. It ships that way intentionally — K3s bundles exactly what it needs and nothing else. The moment I tried to extend it, I was working against a clear signal. The image was telling me something: *don't touch me, use me.*

Same with Tailscale. `tailscale/tailscale` exists, maintained by the people who wrote Tailscale, optimized for exactly this use case. Why was I installing `tailscaled` inside my Alpine image?

Instead of fighting the host OS, I was now fighting my own container image. All the pieces existed upstream, and yet, I was trying to further disassemble them.

---

## The Steward Container

I once used Portainer to manage an entire fleet of VMs and baremetal servers. Got a lot of flack from the internet for using it, too. Portainer manages your container, but it too is a container. It just required mounting the Docker socket, and it managed everything. I should have done that from the beginning.

My once massive container image quickly shrunk into a **steward container** — a thin Alpine image whose only job is orchestrating other containers. It doesn't run K3s. It doesn't run Tailscale. It uses `podman-compose` to bring them up and manages their lifecycle.

```docker
FROM alpine:3.21

RUN apk add --no-cache bash podman podman-compose gettext kubectl curl

COPY . /image
ENTRYPOINT ["sh", "-c"]
CMD ["/image/steward.sh"]
```

K3s runs from `rancher/k3s:v1.35.2-k3s1`. Tailscale runs from `tailscale/tailscale:v1.94.2`. Both are purpose-built, upstream, and updated by bumping a version tag. I don't own their
internals. I just sequence them.

```yaml
services:
  tailscale:
    image: docker.io/tailscale/tailscale:v1.94.2
    privileged: true
    network_mode: host
    # ...

  k3s:
    image: docker.io/rancher/k3s:v1.35.2-k3s1
    privileged: true
    network_mode: host
    # ...
```

And because the steward is just glue — Alpine, bash, Podman Compose — it's entirely mine to change. If I want to rewire how bootstrap works, add a new sequencing step, or swap out how secrets are injected, I edit the steward. K3s and Tailscale don't care — they just get started in a different order, or with different arguments. The concern separation works both ways: I don't touch their images, they don't constrain mine. And the host OS surely won't know any better.

---

## Trade-offs along the way

I found a total of one trade-off: I lost Longhorn.

Longhorn is the right persistent storage story for K3s. It's also sitting behind an iSCSI requirement, which means kernel modules — which means I'd need to build a custom `longhorned-k3s` image that has the right binaries, reaches into the host kernel and hopes it guessed right. That image would be mine to maintain forever, against a scratch base I can't easily inspect or extend.

This is, ironically, the exact trap the whole setup was designed to avoid. So I didn't do it. `/data` on the block volume is fine for a homelab. Local-path PVCs do the job.

The headache of homelab infrastructure is supposed to be *fun* headache. There's a line between "productive friction you learn from" and "work you do instead of the actual thing." Longhorn
crossed that line. I cut it. If this were production, I'd be on EKS and none of this would exist.

---

## The Ephemerality Project is a Success

It takes 2 minutes and 30 seconds from the second Oracle Cloud finishes creating a VM to ArgoCD being fully deployed and deploying my root app.

That's cloud-init, Podman starting the steward, Tailscale coming up, K3s initializing, the API ready, bootstrap done, ArgoCD CRDs registered, root app deployed.

`preserve_boot_volume = false` in Terraform. I genuinely don't care if Oracle recycles the boot volume. Everything stateful is on the block volume. Everything ephemeral is in the image. The VM is cattle. That was the original promise.

It delivered. I just had to actually follow the logic through.

---

## The Short Version

- **The host OS matters exactly once**: getting your first container running. Pick one that gets out of the way immediately. Ubuntu Minimal does this. SELinux-enforcing distros don't — not because they're wrong, but because they conflict with the premise.
- **Don't extend scratch images. Use them.** If an upstream image is minimal or scratch, that's a signal. Compose around it, don't modify it.
- **One container per concern.** The steward pattern — a thin orchestrator managing purpose-built upstream images — is what container thinking actually looks like. "One container for the whole machine" is just a VM with extra steps.
- **Know when to cut.** Not every yak needs shaving. Longhorn would be fun. Longhorn would also be a project. This is a homelab.

---

> Cover photo by [Paul Calescu](https://unsplash.com/@pcalescu) on [Unsplash](https://unsplash.com)
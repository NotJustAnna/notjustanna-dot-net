---
title: 'Container Images Are Operating Systems'
description: "Containers are VMs that share a kernel, your image is a whole operating system, and if you own the machine end-to-end, the second kernel is rent you don't owe."
pubDate: 'Aug 14 2026'
category: dev
highlight: true
heroImage: '../../assets/blog/container-images-are-operating-systems.jpg'
---

> This is, loosely, a do-over of ["Containers, The Wrong Way, For Always-Free Fun and Profit"](https://notjustanna.net/post/containers-the-wrong-way-for-always-free-fun-and-profit/) and its [lessons-learnt sequel](https://notjustanna.net/post/containers-the-wrong-way-lessons-learnt/). Those posts showed you the thing. This one tells you why the thing was never wrong.

Open any Dockerfile a junior dev wrote at work. Read the first line out loud.

`FROM ubuntu:26.04`

Ubuntu 26.04, what the heck are you doing in my "lightweight application packaging format"? You just declared that your application ships on top of an entire operating system.

Somehow, nobody finds this... weird. I think we lost something when we stopped finding it weird. Because the sentence everybody recites — *containers are lightweight because they share the host kernel* — is true, and almost everyone recites it without following it one more step to where it actually leads:

Containers are virtual machines that share a kernel. A "fancy process" on a "chroot with extra steps" *is* a VM, minus exactly one component.

---

## But They're Just Processes

I can hear someone yelling at me through the screen. *Containers aren't VMs. There's no hypervisor, no virtual hardware, no guest kernel. It's a process with namespaces. `ps aux` on the host shows you everything.*

You're not wrong about any individual fact. But let's just tour what this "process" gets.

It gets a network. Not access to the host's network — *a* network: its own interface, its own IP, wired through a bridge into private networks with other guests. Docker is running a virtual switch. It's the same box you'd click together in Proxmox, minus the clicking.

It gets disks. Volumes and bind mounts are storage that exists independently of the guest, attached at start, surviving the guest's death — which is a virtual disk with the serial numbers filed off.

It gets a curated `/dev`. The container doesn't see the host's devices; it sees a tiny allowlist, and anything more has to be granted `--device` by `--device`, enforced through cgroups. Including the GPU: Proxmox passes through the PCIe device and lets the guest kernel drive it, Docker passes through `/dev/dri/renderD128` and lets the guest userland talk to the driver the host already loaded. It's the same passthrough, happening one floor up the stack — except nobody has to negotiate IOMMU groups at 2am.

And it gets root. Root that is not root: uid 0, absolute monarch of everything on the guest list, of nothing beyond it — capabilities dropped, syscalls filtered, horizon ending at the namespace wall. Which is precisely how much monarch root is inside a VM: total authority over a kingdom someone else fenced.

So: a private network, private disks, private devices, and a private root. At some point the honest name for that arrangement is a virtual machine, and the fact that `ps` can see the tenant through the wall is a detail about the wall's material, not about the lease. Namespaces virtualize what the guest can *see*; cgroups virtualize what it can *spend*.

The one thing not being virtualized is the kernel, because you already have a perfectly good one running. Sharing the kernel means every opinion below the syscall line gets confiscated at the door: the guest doesn't pick the kernel version, doesn't load modules, doesn't get a vote on whether the disk underneath is ext4 or Btrfs or ZFS. A VM guest keeps exactly those opinions — and that's the entire difference. Everything above the line, the guest keeps.

---

## FROM ubuntu

Nobody in the unholy year of 2026 builds on nothing. Hand anyone an empty root filesystem and a kernel and they will lose their mind by lunch — no shell, no libc, no `ls`, no certificate store, none of the thousand tiny agreements a userland quietly provides. Everybody wants some shape of *something* underneath. That's not weakness, that's what an OS is *for*. It's why `FROM python:latest` — which sounds like you're pulling some abstract runtime-shaped object — is actually Debian trixie with Python neatly on top; the Dockerfile is genuinely just Debian, `wget python.tar.gz | tar`. Python's maintainers wanted a floor to stand on, same as you.

And "a Debian install CD with Python preinstalled" is the most 2000s idea imaginable. We used to ship those! They were called [virtual appliances](https://en.wikipedia.org/wiki/Virtual_appliance) — TurnKey Linux built a whole catalog of "Debian with one app on it" images, and SUSE sold the concept under the name [JeOS](https://en.wikipedia.org/wiki/Just_enough_operating_system): *Just enough Operating System*. We didn't invent the application-shaped OS image. We rediscovered it, gave it a registry, and pretended it was new.

And you have an entire Leroy Merlin store of floors to choose from. Debian, Alpine, Fedora, CentOS, Rocky, Amazon Linux, Oracle Linux — the entire distro zoo with all of their oh-so-precious opinions of how Linux *linuxes*. Two different libcs, two different package managers, two philosophies about where config files live, side by side on one kernel they weren't consulted about. And notice *which* ones won: Alpine and Debian dominate container bases the way they dominate Raspberry-Pi-shaped machines, for effectively the same reasons. A container and a single-board computer are the same real estate — a small place where every megabyte is rent and every assumption is furniture you didn't ask for. Alpine is the smallest credible userland; Debian is the most predictable one. The market picked the same two answers in both markets, because it was the same question.

You can also open your "Linux From Scratch" book and commit to the bit. `FROM scratch` with a static binary, distroless images, the s6-overlay crowd — all asking "how little OS can I ship and still boot?", which is precisely the question [unikernels](https://en.wikipedia.org/wiki/Unikernel) asked in VM space: compile your app with just enough OS to run it and boot *that* as the guest.

---

## Okay. Here's The Implications.

My Oracle VM had its own aisle of floors on offer — Oracle Linux's opinions, Ubuntu Minimal's opinions. I opinionated that Ubuntu Minimal could play the role of a Proxmox, that a ["Steward OS"](https://notjustanna.net/post/containers-the-wrong-way-for-always-free-fun-and-profit/) based off Alpine would run the show, and that K3s and Tailscale would deploy atop *that*. The only real consequence is that instead of running VMs on VMs, everything got flattened into a slightly complicated sibling relationship.

This arrangement got me a certain amount of raised eyebrows. Kubernetes! In Docker! On a free VM! That's a toy topology; real clusters run on real machines.

Okay. Let's look at a real cluster. You provision an EKS node group and AWS hands you EC2 instances running Amazon Linux or Bottlerocket — an operating system AWS picked, configured, and maintains — whose entire purpose is to boot a kubelet and a container runtime. The OS under your pods is a vendor-managed userland whose only job is to host Kubernetes.

Now describe my setup: an operating system I picked, configured, and maintain (Ubuntu 24.04 Minimal, deliberately doing as little as possible), whose entire purpose is to boot a container runtime that hosts K3s.

Same diagram. Different logo in the corner. The thing people call "K3s in Docker, cursed" and the thing people call "a managed node group, industry standard" differ in who signs the maintenance rota, not in architecture. AWS just doesn't print `FROM bottlerocket` anywhere you can see it.

---

## The Kernel Tax

So if containers are VMs-minus-a-kernel, the honest question is the reverse one: what is the kernel *for*, in a VM? What are you buying when you keep it?

You're buying a boundary against people you don't trust. A second kernel means a guest can be root, be compromised, be actively malicious, and still have to break through a hypervisor to reach the neighbours. That boundary is genuinely load-bearing when the neighbours are strangers — which is to say, it's how every cloud provider sleeps at night. Oracle is not going to run my workloads and yours on a shared kernel, and it would be correct of them to decline it.

But that's *their* tenancy problem. On my side of the fence, every workload on that VM is mine. The K3s cluster is mine, the Tailscale sidecar is mine, every manifest came out of my own repo via ArgoCD. There is no untrusted neighbour. The threat model the second kernel defends against is a person who does not exist.

And the second kernel isn't free. It's a slice of RAM that's spoken for before your workload starts, page caches that can't be shared, another scheduler making decisions on top of the scheduler already making decisions. On a machine with 12GB to its name — thanks for the June haircut, Oracle — that tax has a very legible line item. Virtualize the kernel when you have tenants. When the whole building is yours, the doorman with the guest list is plenty.

---

## Your Calculator Runs Ubuntu

Sidenote, before I close. Snap and Flatpak do the exact same trick. A Snap's `base: core24` *is* Ubuntu 24.04 — a squashfs of the whole userland, one loop device per app in your `lsblk`. A Flatpak's runtime is the same idea with a different logo. Same namespaces, same bind mounts, same architecture this entire post just described.

Which means your calculator app requires a third install of Ubuntu on your machine — the host's, your containers', and now its own — and I don't feel like everyone is anywhere near mad enough about that. On a server, the tenant model is the value. On your desktop, the app's entire job is to touch your files, your fonts, your clipboard — and it's sealed in a box, petitioning through D-Bus for your own documents.

Same machine. Wrong door. That rant is its own post; this is just the receipt that I noticed.

---

Five months ago I called this setup "the wrong way" in the title, twice, because it *felt* wrong and I couldn't articulate why it kept working anyway. This is the articulation, arriving fashionably late: it was never the wrong way. It was VMs with the one redundant part removed, and the only thing actually wrong was the apology in the title.

Consider it withdrawn.

> Cover photo by [Venti Views](https://unsplash.com/@ventiviews) on [Unsplash](https://unsplash.com)

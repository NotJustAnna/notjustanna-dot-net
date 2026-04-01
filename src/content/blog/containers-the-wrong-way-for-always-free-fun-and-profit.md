---
title: 'Containers, The Wrong Way, For Always-Free Fun and Profit'
description: 'Why running K3s "the wrong way" gives you versioned, testable infrastructure that Ansible never could.'
pubDate: 'Mar 23 2026'
category: dev
heroImage: '../../assets/blog/networking.jpg'
---
## Prelude: Oracle Cloud's Always-Free Tier

Oracle Cloud has an always-free tier. Not a trial. Not "free for 12 months." Always free.

Four ARM-based cores, 24GB of RAM, 200GB of storage. For nothing. Forever.

Their Ampere Altra processors are genuinely good silicon. People benchmark these against x86 and come away impressed. And the ARM64 ecosystem is in good shape — most container images you'll actually use (your databases, your ingress controllers, your monitoring stack) have ARM64 builds. The days of "does this even run on ARM" are mostly behind us.

The fact that Oracle is giving this hardware away to get people onto their platform is, frankly, their problem.

If you have any kind of homelab itch — self-hosted apps, a personal Kubernetes playground, a place to run things you don't want living on your laptop — you should have one of these VMs. The barrier is a credit card for verification (they won't charge it) and about twenty minutes.

---

## The VM

Once you have an account, getting a VM up is a few clicks in the OCI console:

1. Compute → Instances → Create Instance
2. Change the shape to **VM.Standard.A1.Flex** — that's the ARM one
3. Set OCPUs to 4 and memory to 24GB (max free allocation)
4. Pick your image.
  - **Oracle Linux** if you're comfortable with `dnf`. **Ubuntu Server** if you're a `apt` person.
  - Either works — both have Minimal variants that strip out a lot of packages out. And if you're about to do what I'm about to describe, you'll want the Minimal version.
5. Add your SSH key
6. Create

You'll also want a separate block volume: Storage → Block Volumes → Create, 150GB, attach it to your instance.

If you're Terraform-inclined, it looks something like this:

```hcl
resource "oci_core_instance" "my-arm-instance" {
  shape = "VM.Standard.A1.Flex"
  shape_config {
    ocpus         = 4
    memory_in_gbs = 24
  }
  source_details {
    source_type             = "image"
    source_id               = var.oracle_linux_minimal_image_id
    boot_volume_size_in_gbs = 50  # OCI minimum
  }
}

resource "oci_core_volume" "data" {
  # this is where anything you'd like to still exist tomorrow lives
  size_in_gbs = 150
}
```

---

## Free Kubernetes. Kinda.

K3s goes up in about thirty seconds:

```bash
curl -sfL https://get.k3s.io | sh
kubectl get nodes
```

This gives you a single-node Kubernetes cluster. One control plane, one worker, same machine. It's not highly available — if the VM goes down, your cluster goes down.
 
If you want something closer to HA, OCI's free tier technically allows you to split your 4 OCPUs and 24GB across multiple VMs — you could do three VMs at 1 OCPU / 8GB each (control pane gets 2 OCPUs) and run a proper multi-node setup with an embedded etcd quorum. That's a valid path. This post is about the single-node case because I don't care about any of that and neither should you for a homelab.
 
The point is: Kubernetes, on ARM, for free. This feels unreasonable but here we are.

---

## The Part Where You Discover You Have a Long-Lived Server Problem

Here's the thing about a cloud VM: you don't touch it daily like your laptop or your desktop. You SSH into it when something breaks, or when you need to add a new service. If you're running Kubernetes, you SSH in even less — `kubectl` handles most of it and you rarely need to touch the node directly.

But the machine keeps running. Packages drift out of date. You hotfixed something at 2am while sick and half-forgot. You're not sure which K3s version you're actually on or whether it's the one you meant to be running. The machine accumulates entropy in the background while you're not looking.

This is the long-lived server problem and it's why configuration management tools exist. The standard answer: write an Ansible playbook, push it to git, have the machine pull and run it on a schedule. Define the desired state, let Ansible converge to it.
 
So you write the playbook. It works. You commit it to git, set up a cron job on the VM to pull and run it every five minutes, and declare victory.

And then you start noticing the friction.

Ansible is... _fine_ for keeping a server configured. But what you're increasingly fighting is a different problem — you want something closer to what `apt upgrade` does, but for your entire environment. Not "apply these tasks," but "this is the version of the world I want, please be it." Ansible can do it but it's not really what it's designed for, and you can feel the difference. The playbook describes a path to the desired state, not the desired state itself. Those are subtly different things and the difference starts to matter when you're maintaining the playbook over months.

The other problem: there's no local testing story. You make a change, push to git, wait for the cron job, SSH in to see if anything broke. Your laptop is not a Linux ARM server with K3s running on it. You can't just run the playbook locally and catch problems before they hit the VM.

---

## The Thought That Won't Go Away

I work with Kubernetes other every day. Kubernetes runs containers. Containers are versioned, immutable artifacts — you build one, push it to a registry, pull it somewhere else, it behaves exactly the same. You can run it locally to test it. You update it by pushing a new version. Rolling back means pulling an old tag.

Everything about this model is better than a long-lived server managed by a configuration management tool.

And somewhere around the third time I was debugging why the playbook had done something unexpected, I had the thought: *why can't I just containerize this entire problem?*

K3s is not a web app. K3s needs to interact with the host kernel — manipulate iptables, create network interfaces, manage cgroups, set up container networking. You can't just `docker run k3s` and expect it to work.

Or... can you?

---

## The `--privileged` flag

`--privileged` is Docker and Podman's "I know what I'm doing" flag. It gives the container essentially full access to the host kernel — every capability, every device, no security filtering. It's the nuclear option.

And it turns out, it's also the officially documented way to run K3s in a container. From K3s's own docs:

```bash
docker run \
  --privileged \
  --name k3s-server \
  -p 6443:6443 \
  -d rancher/k3s:v1.29.3-k3s1 \
  server
```

That's in the K3s documentation. Not a workaround. Not a hack. `--privileged` is how you do this.

Adding `--network host` gives the container the host's network stack directly, which K3s needs to set up its own networking correctly:

```bash
podman run -d \
  --privileged \
  --network host \
  -v /data:/data \
  --restart always \
  ghcr.io/you/k3s-env:latest
```

Does this feel wrong? Yes. A privileged container with host networking is basically just a process. Security people will say this.  They're not wrong.

But it's a process defined by an OCI image. Which means it has a version tag. A Dockerfile in a git repo. A build pipeline. And — crucially — you can `docker run` it on your laptop and test it before it touches anything real.

The trade is: you give up container isolation (which K3s was going to make you give up anyway to do its job) and you get everything else that comes with the container model. That's a good trade.

---

## The Image

```dockerfile
FROM rancher/k3s:v1.29.3-k3s1

# Whatever else you want running alongside K3s
RUN apk add --no-cache tailscale

# K3s auto-deploys anything placed here on startup
COPY argocd-install.yaml /var/lib/rancher/k3s/server/manifests/argocd.yaml
COPY root-app.yaml /var/lib/rancher/k3s/server/manifests/root-app.yaml

COPY entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
```

`rancher/k3s` as the base means K3s is pre-installed at a specific pinned version. K3s has an auto-deploy feature: anything in `/var/lib/rancher/k3s/server/manifests/` gets automatically applied when K3s starts. Drop ArgoCD's install manifest in there, point ArgoCD at a git repo, and everything else deploys itself from git. The image doesn't need to know about any of it.

The entrypoint starts things in the right order:

```bash
#!/bin/bash

# Secrets are in /data/env, written at startup
source /data/env

# Start networking, wait for it to be ready
tailscaled --state=/data/tailscale.state &
tailscale up --authkey=$TAILSCALE_AUTHKEY
until tailscale status; do sleep 2; done

# K3s in the foreground — keeps the container alive
exec k3s server --data-dir=/data/rancher/k3s
```

---

## Oracle Linux's New Job Description

A small shell script runs at VM startup (wired up via systemd) and does exactly this:

```bash
#!/bin/bash
dnf install -y podman
mkdir -p /data
mount /dev/sdb /data

cat > /data/env <<EOF
TAILSCALE_AUTHKEY=your-key-here
OTHER_SECRET=whatever
EOF
chmod 600 /data/env

podman run -d \
  --privileged \
  --network host \
  -v /data:/data \
  --env-file /data/env \
  --restart always \
  --name k3s-env \
  ghcr.io/you/k3s-env:latest
```

Five commands. Run once on first boot. That is the entire configuration management story for Oracle Linux.
 
After that, Oracle Linux's responsibilities are:
- Keeping Podman alive
- Applying its own package updates at 3am via `dnf-automatic` (or `unattended-upgrades` on Ubuntu) — install it, enable the timer, forget about it
 
That's it. Oracle Linux is now a very fancy process supervisor. It doesn't know what's running inside the container and doesn't need to.

---

## The Part That Makes It Worth It

**You can test it locally.**

```bash
docker run -it --privileged --network host \
  -v /tmp/test-data:/data \
  --env-file .env.test \
  ghcr.io/you/k3s-env:latest
```

Your entire server environment, running on your laptop. K3s comes up, deploys things, you poke at it with kubectl. You find the problem before it touches the VM. This was impossible with Ansible.

**Updates are a push.**

Change anything in the Dockerfile — update the K3s version, add a package, update a manifest — build a new image tag, push to your registry. A systemd timer on the VM checks for image updates at 3am:

```bash
podman pull ghcr.io/you/k3s-env:latest && podman restart k3s-env
```

No SSH. No playbook run. No waiting for convergence.

**The boot volume can die and you don't care.**

Everything stateful — K3s cluster state, persistent volumes, all of it — lives at `/data` on the separate block volume, mounted into the container. Oracle can update or replace the boot volume. Run the startup script, the container comes back up, finds its state on `/data`, continues exactly where it left off.

---

## Is This "Correct"?

No. Using `--privileged` is not what containers are designed for. Running K3s inside a container on a VM where you could just run K3s directly is adding a layer that doesn't need to be there from a pure architecture standpoint.

But "architecturally pure" and "actually useful for your situation" are different questions. This approach gives you a reproducible, testable, versionable environment on a server you interact with twice a year. The feedback loop goes from "push to git, wait for cron, SSH in and hope" to "docker run on your laptop, push when it works."

For a free ARM Kubernetes node that you barely touch, that's the right trade.

Also, `--privileged` is in the K3s docs. So maybe it's fine.

---

> Cover photo by [Scott Rodgerson](https://unsplash.com/@scottrodgerson) on [Unsplash](https://unsplash.com)
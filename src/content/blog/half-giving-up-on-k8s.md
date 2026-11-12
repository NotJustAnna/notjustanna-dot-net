---
title: "I'm half giving up on Kubernetes. But only half."
description: "I replaced my containerized single-node K3s with Podman playing Kubernetes YAML under systemd. No cluster, no ArgoCD, no operators, too many lines of bash. Nobody in their right mind does this. The site you're reading is served from it."
pubDate: 'Nov 10 2026'
category: dev
heroImage: '../../assets/blog/pods.jpg'
heroCrop: center-left
---

> This is the end of the road that started with ["Containers, The Wrong Way, For Always-Free Fun and Profit"](https://notjustanna.net/post/containers-the-wrong-way-for-always-free-fun-and-profit/). And also technically a follow-up to ["Container Images Are Operating Systems"](https://notjustanna.net/post/container-images-are-operating-systems/).

I just needed to deploy something I'd been toying with that week, and the thought of putting it on my single-node K3s cluster made me go *Ugh.*

Okay, I have to be honest: Kubernetes is being a pain to manage.

*Fine.* Time to downgrade back to raw containers.

... which means some flavor of `compose.yaml`. *Ugh.*

Isn't there *anything* between a Docker Compose and K3s?

---

## The Job Interview

Kubernetes is a pain because... Kubernetes. Nothing is broken. It's doing exactly what it was built to do, which is ask questions.

Putting a service --- say, Umami, plus its Postgres --- on my cluster...

```bash
[anna@anna-desktop iac]$ ls applications/workloads/umami/
application.yml  deployment.yml       ingress.yml        namespace.yml
database.yml     external-secret.yml  kustomization.yml  service.yml
```

... took 8 files. And every file is an answer to something Kubernetes wanted to know.

1. **Where does the data go?** Well, that's a PersistentVolumeClaim, against a StorageClass, with an access mode, provisioned by whatever you installed to provision things.
2. **How does traffic reach it?** A Service, to give the pod a stable name. Then an Ingress, to give the Service a hostname. Then an ingress controller, to give the Ingress a point.
3. **Which namespace?** The one named after the app. It is always the one named after the app.
4. **Who's allowed to read the secret?** Me. Everyone here is me.
5. **Who syncs it, and how often?** An operator. A different operator from the other operators.

These are excellent questions. For a fleet. Kubernetes makes you describe storage and networking in the abstract and resolves the abstraction later. These answers let Kubernetes deploy your desired application on any of its available nodes.

I have one node. It has one IP. It has one "PVC", called `/data`. It's as available as a not-even-half-full single node can be.

So every deploy is bureaucracy with `kubectl` on the other side of the desk. Punch a hole for the port on the IP. Throw the data in the block volume. That's the whole application, every time, and Kubernetes is unbearably explicit at me about a machine I can see in its entirety from here.

Then there's the support staff. For the six apps worth of stuff I want running, the cluster was running *twenty-nine* pods. The difference is what it takes to keep six apps in the style Kubernetes is accustomed to: ArgoCD to deploy them, External Secrets Operator to hand them passwords, CloudNativePG running three Postgres "clusters" of one instance each, metrics-server, and two ingress controllers, because I'd started trialing Caddy in July and never finished the thought.

Every one of those was a good decision. I'd defend each of them individually, and in [March](https://notjustanna.net/post/containers-the-wrong-way-lessons-learnt/) I did. Homelabs are meant to learn, and I needed to learn Kubernetes, and you do not learn Kubernetes by reading about operators. You learn it by having an operator fail on you at an inconvenient hour.

---

## Composing Your Ticking Time Bomb

I've been running things on Docker professionally since 2020, and for shits and giggles since 2018. And I still feel like I'm handling a ticking time bomb every time I touch a `compose.yaml` with more than one container in it.

One container is fine. One container is a `docker run` line in a `docker.sh` with better handwriting.

Then you add a second container, say, Postgres. There's a network now; you didn't declare it. Everything has a name; the name starts with whatever directory you happened to be standing in. Unrelated things share a file, so they share a fate, and you find out which fate on the day you `up` the wrong one.

I once tamed Docker Compose by putting *Portainer* on top of it. That should tell you how much sanity was left in the account.

Compose never asks you anything. That's the problem, the same way Kubernetes always asking is the problem.

What I want spelled out is the *workload*: this image, this config as its own named object, these limits, this init step, this security posture, each in the same place in every file. Kubernetes does that part right, and eight months of manifests did something to me. I think in `kind:` now. What I want assumed is the *machine*: the port goes on the IP, the data goes on the volume, stop asking.

Compose assumes both. Kubernetes interrogates both. I want the Pod and none of the interview.

---

## Playing With Kubes

The grown-up answer to "containers on one host, no cluster" is [Quadlet](https://docs.podman.io/en/latest/markdown/podman-systemd.unit.5.html): you write a small unit file, systemd generates a service from it, Podman runs it. No control plane. Your init system already knows how to keep a process alive and start things in order, so you let it.

I looked at a Quadlet file. It's `[Unit]`, `[Container]`, `[Service]`, `[Install]`, with every Traefik label as its own `Label=` line. INI, with a systemd accent. It's *that* ugly.

But Quadlet has a side door. A `.kube` unit doesn't describe a container at all. It points at a file of ordinary Kubernetes YAML and hands it to [`podman kube play`](https://docs.podman.io/en/latest/markdown/podman-kube-play.1.html), under systemd, with no cluster anywhere. And `kube play` understands Pods, ConfigMaps and volume claims, and has never heard of a Service, an Ingress or a StorageClass. Ports are `hostPort`. A volume claim is just a named volume on the host's container storage, which on my host is `/data`.

It's the workload half of Kubernetes with the machine half deleted. Somebody shipped exactly my complaint as a feature.

The standard objection writes itself: that's Kubernetes YAML without Kubernetes' benefits. All of the verbosity, none of the features. Nobody would pick it.

...

So this is Umami now. Eight files became two, plus two more just like them for its database. The first is the only systemd I have to look at:

```ini
[Unit]
Description=umami
Requires=umami-db.service
After=umami-db.service

[Kube]
Yaml=umami.yaml
ConfigMap=/run/app-secrets/umami.yaml
Network=apps.network

[Service]
ExecStartPre=/usr/local/bin/fetch-secrets umami.yaml
Restart=always
```

And the second is a Pod. An actual `kind: Pod`, that `kubectl apply` would accept without blinking:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: umami
  labels:
    traefik.enable: "true"
    traefik.http.routers.umami.rule: Host(`umami.notjustanna.net`)
    traefik.http.services.umami.loadbalancer.server.port: "3000"
spec:
  containers:
    - name: umami
      image: ghcr.io/umami-software/umami:postgresql-latest
      envFrom:
        - configMapRef: {name: umami-env}
      resources:
        limits: {memory: 768Mi}
```

Those labels are Docker-style Traefik labels sitting in Kubernetes metadata, read by Traefik's Docker provider through Podman's Docker-compatible socket. Three ecosystems in one YAML block, none of them aware of the others. It works, and I've decided not to think about it too hard.

Then the support staff got laid off.

ArgoCD is now a probably-too-big bash script on a systemd timer. It pulls the repo, diffs it against what's installed, and restarts only the units whose files changed. If it's not in the repo, it still doesn't exist. That rule never needed a controller. It needed `git pull` and `cmp`.

External Secrets Operator is now another bash script that runs before each unit starts. It renders `@secret:/path@` placeholders out of Infisical into a tmpfs and keeps a copy, so Infisical having a bad day doesn't stop my containers from restarting.

CloudNativePG is just... a Postgres container. Services and cluster DNS are pod names on one Podman network. `kubectl` is `podman --connection`, over SSH, over the tailnet.

Since my IaC repo was the single source of truth, all it took was spinning up a QEMU VM to test the port, and a Tuesday morning, inside the weekly window where nothing I run is doing anything, to move over. Terraform replaced the instance. `/data` survived, as block volumes do. Three databases went across by `pg_dump` and came out the other side with identical row counts.

The steward container didn't make the trip. With no cluster to babysit there's nothing left to steward, so Podman comes straight out of Ubuntu's own repos and the host goes back to doing as little as possible.

---

I gave up the cluster. No scheduler, no reconciliation loop noticing drift, no rolling updates, no operators. Every one of those exists to manage the second and third nodes.

There will never be a second node. I ran a fleet manager for a fleet of one, and it spent eight months asking me where the rest of the fleet was.

Who in their right mind replaces containerized K3s with `podman kube play`? No one. You'd have to run Kubernetes first, for no reason, just to find out which parts of it you'd miss.

The files are still Pods. The config is still its own named object, and I still think in `kind:`.

Nothing's bitten me yet; ask me again in February, when I inevitably replace it with something even weirder.

> Cover photo by [Anita Austvika](https://unsplash.com/@anitaaustvika) on [Unsplash](https://unsplash.com)
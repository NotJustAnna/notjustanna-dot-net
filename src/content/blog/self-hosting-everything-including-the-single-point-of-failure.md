---
title: 'Self-Hosting Everything, Including the Single Point of Failure'
description: 'Homelabbing is genuinely fun. I want to say that upfront, before I tell you about the time I locked myself out of my own infrastructure for an afternoon.'
pubDate: 'Mar 27 2026'
category: dev
heroImage: '../../assets/blog/rip-coffee.jpg'
---
Homelabbing is genuinely fun. I want to say that upfront, before I tell you about the time I locked myself out of my own infrastructure for an afternoon.

The premise is compelling: you have a VM, you have K3s, and the open source ecosystem has basically everything you'd pay a SaaS for. Keycloak for OIDC. Forgejo for Git. Headscale for VPN. ArgoCD for GitOps. A few YAML files and you have a self-hosted stack that would make a startup founder weep.

And for a while, it works beautifully. Ansible (yes, Ansible — I've since retired it, but that's [another post](https://notjustanna.net/post/containers-the-wrong-way-lessons-learnt/)) kept everything converging to the right state. ArgoCD synced my apps from a Forgejo repo. Kubectl reached K3s over Headscale. Users — well, me — logged into Forgejo via Keycloak OIDC. My custom Keycloak theme was hosted on Forgejo.

It was elegant. It was self-referential. It was fine, right up until it wasn't.

---

## The Dependency Graph Nobody Warned Me About

Let me draw the graph for you:

- **ArgoCD** deploys everything, including Forgejo, Keycloak and Headscale
- **Forgejo** hosts the GitOps repo ArgoCD syncs from
- **Keycloak** handles auth for Forgejo
- **Forgejo** hosts my custom Keycloak theme
- **Headscale** is how my `kubectl` reached K3s remotely

You see the problem. The dependency graph doesn't have a root. Everything depends on something else that it manages. It's turtles all the way down, except the turtles are also responsible for each other's wellbeing.

This is fine when everything is running. A self-healing cycle. ArgoCD keeps things in sync, everything stays up, life is good.

It is considerably less fine when Oracle decides to release a new Ubuntu Minimal image and `terraform apply` silently replaces your VM.

---

## Do Not `terraform apply` While Distracted

I won't go into the specifics of how Oracle releasing a new image source caused my Terraform to replace the VM — that's a configuration lesson for another day, and also too embarrassing to fully recount. The point is: one moment I had a running K3s node, the next I had a fresh VM.

And everything on it was gone.

This was before the containers setup. No clean `/data` mount, no steward, no "two and a half minutes to a working kubernetes." Just a blank VM and the knowledge that everything I needed to recover was hosted on the thing that no longer existed.

And separately: Headscale was down because ArgoCD hadn't deployed it yet — and Headscale was specifically what kubectl used to reach K3s remotely. No block volume, no `/data`, no steward. Cloud-init got as far as reloading K3s and standing up a blank ArgoCD — the Ansible playbook was in an OCI bucket, so at least that survived — but with no way to kubectl in, that was as far as it got.

**Chicken, meet egg.**

The fix was ugly: I had to edit the Ansible playbook to point ArgoCD at GitHub instead of Forgejo, push that, let it redeploy — and then begin a long series of commits that were mostly commenting and uncommenting service configs. Each change exposed a new chicken-and-egg problem. Forgejo needs Keycloak. Keycloak needs Forgejo for the theme. ArgoCD needs Forgejo. Comment out the OIDC config, deploy, uncomment, redeploy, something else falls over. Repeat.

When it was finally stable, I left myself a note: *disassemble this before it explodes again.*

---

## What I Learned

**Self-referential systems need an escape hatch.**

The pattern I had — GitOps repo on the same machine GitOps is managing — is a known antipattern. The right answer is that your bootstrap source should be independent of what you're bootstrapping.

But here's the thing: I *knew* what I was building had philosophical coherence. The whole point was to depend less on SaaS. Not just for the homelab, but as a stance — I wanted off GitHub, off Tailscale, off the assumption that someone else's free tier was load-bearing infrastructure. Running Forgejo on the same cluster wasn't carelessness; it was the logical extension of that goal. Own everything, all the way down.

What I hadn't stress-tested was the dependency graph when the cluster itself was the patient.

The mistake wasn't Forgejo — it was Forgejo *on the same cluster it was managing*. Those are different decisions. And honestly, the right fix for wanting off GitHub isn't to run Forgejo on your only VM; it's to use something like Codeberg. You can move off SaaS without taking on the operational risk of a self-hosted bootstrap source. The self-hosting purist move and the pragmatic resilience move don't have to be the same decision.

**Headscale was behind the locked door.**

The reason the chicken-and-egg problem was so painful wasn't just the circular deployments — it's that Headscale was my only path to `kubectl`. When the cluster died, my remote access died with it. The tool I needed to fix my infrastructure was running on the infrastructure I needed to fix.

This is the same lesson as Forgejo, applied to access instead of deployment: if something is part of your recovery path, it can't live inside the thing you're recovering.

I genuinely enjoyed running Headscale — the project is impressive and there's something satisfying about owning your own VPN coordination. But after the incident, I couldn't justify self-hosting the thing that stands between me and my cluster. Tailscale's free tier covers 100 devices and 3 users. I am one person with a homelab. I migrated back and haven't thought about it since.

**Some self-hosting is load-bearing in ways that compound.**

After all this, I dropped Forgejo and Keycloak too — at least for now. The overhead of maintaining the auth layer, the themes, the OIDC integration, stopped being worth it relative to what I was actually getting. The homelab is lighter for it.

What I kept: the lesson. If something is load-bearing for your bootstrap sequence, it needs to be independent of what it's bootstrapping. That's the rule. Everything else is negotiable.

---

## The Honest Version

I self-hosted Headscale. I learned what Tailscale actually provides, operationally, by having to do all of it myself. I made an informed decision to go back.

I self-hosted Forgejo inside a circular dependency and paid for it when the cluster went down. I moved the bootstrap repo off the critical path — and eventually off the cluster entirely.

The homelab taught me which abstractions were worth paying for (VPN coordination — yes, for me, right now). It also taught me that the interesting self-hosting problems aren't "can I run this" — you always can — but "where does this fit in the dependency graph, and what happens when it's down."

Homelabbing is fun. Highly recommend. Just draw the dependency graph first.


---

> Cover photo by [Eastman Childs](https://unsplash.com/@eternalseconds) on [Unsplash](https://unsplash.com)
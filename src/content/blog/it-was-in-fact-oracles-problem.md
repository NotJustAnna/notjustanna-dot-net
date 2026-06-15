---
title: "It Was, In Fact, Oracle's Problem"
description: 'Oracle quietly halved the Always Free Ampere A1 tier — 4 OCPU / 24GB down to 2 / 12. Free-tier VMs over the limit get stopped. PAYG VMs over the limit get billed. Resize before they resize you.'
pubDate: 'Jun 15 2026'
category: ramblings
---

> This concerns ["Containers, The Wrong Way, For Always-Free Fun and Profit"](https://notjustanna.net/post/containers-the-wrong-way-for-always-free-fun-and-profit/) and [its follow-up](https://notjustanna.net/post/containers-the-wrong-way-lessons-learnt/).

In March I wrote, about Oracle handing out four ARM cores and 24GB of RAM for free, forever:

> The fact that Oracle is giving this hardware away to get people onto their platform is, frankly, their problem.

Reader, they agreed.

As of today, the Always Free Ampere A1 allocation is **2 OCPUs and 12GB of RAM**. It used to be 4 and 24. They halved it. The same cut, said in the unit that makes it sound less like one: 1,500 OCPU-hours and 9,000 GB-hours a month, down from 3,000 and 18,000.

---

## The Announcement, In Full

There was no announcement. No blog post, no email, no banner in the console telling anyone the deal changed under them. Someone noticed the docs said something different than they used to, and that was the entire communication strategy. Some of Oracle's own pages still showed the old numbers while the new ones were already live.

The free tier got cut in half via a quiet documentation edit. Which is, I have to admit, a very *Oracle* way to do it.

---

## Stopped, Or Billed

Amusement aside, here are the two things that actually matter, because they have a date on them and the date is now.

If you're on a **pure free-tier account**: anything over the new limit gets stopped or reclaimed. Your 4-core VM is no longer a free VM. It's a VM running on borrowed time, and the time is up. It *will* be shut down.

If you're on **Pay-As-You-Go** — and a lot of people went PAYG specifically to get out from under free-tier paper cuts — anything over the limit bills. Your free VM quietly became a paid VM. You will get charged, people have confirmed this with Oracle support, and you will find out the way everyone finds out about a cloud bill. Size it down *before* the invoice, not after.

Free tier: you lose the VM. PAYG: you keep the VM and lose the money. Pick which one is about to happen to you and go fix it today.

---

## Cattle, As Promised

Let me tell how *insufferably smug* I feel right now.

I spent a week rebuilding this whole thing so the VM is *cattle* — nothing on the boot volume I care about, the entire environment in a versioned image, everything stateful sitting on a separate block volume. I did that because long-lived servers rot, not because I had any idea Oracle was about to do this.

But it turns out "the cloud silently changed the deal" is just another flavor of the same problem. Resizing from 4/24 to 2/12 is one number in Terraform and a `terraform apply`. The container doesn't know and doesn't care. The steward comes up, K3s finds its state on `/data` exactly where it left it, ArgoCD redeploys the world, and two and a half minutes later I have the same homelab on half the silicon. It's tighter — 12GB is less room to be careless in — but it runs.

That's the whole payoff of treating the box as disposable. When someone else changes the terms, you change one number. Nobody SSHes into anything at 2am.

---

Frankly, their problem. They solved it by making half of it yours.

You're probably late already. Go shrink your VM.

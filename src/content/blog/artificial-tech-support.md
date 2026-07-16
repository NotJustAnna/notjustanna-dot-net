---
title: "Oh God, AI's Tech Support Now"
description: "One evening, too drugged on antihistamines to debug my own SSH, I handed the problem to Claude and went to lie down. It fixed it. I pay twenty dollars a month for that — which makes it paid tech support, and the genuinely unsettling part is how good it is."
pubDate: 'Jul 16 2026'
category: tech
heroImage: '../../assets/blog/tech-support.jpg'
---

Fresh CachyOS install, and I could not SSH to a VM. I'd copied my entire `.ssh` folder wholesale off the old Windows machine — the keys were *right there,* and the thing simply refused. *"Bad owner or permissions on `~/.ssh/config`."* I was indignant about it. It's *literally my key.*

I was also, and I'm quoting myself here, *"under enough Polaramine to make Thor snore."* (the drowsy allergy med that takes your executive function hostage.) I was unable to reason about Unix permission bits that evening.

So I described the problem to Claude using Claude Code. It correctly diagnosed the permissions as scandalously too loose for SSH, and produced the correct `chmod` incantation in a split second. I ran the needed command on the VM and went to lie down. I'd say that if it's fine to have Claude scaffold the boilerplate I'd have typed anyway, then having it recite the right incantation, in the right order, to un-break something is — not *that* absurd. Same act, one rung lower.

...

Who am I kidding. It's absurd.

But Polaramine-zooted Anna does not possess the faculties required to sit in judgement of her own frankly scandalous use of Claude Code, and so the deed was done. Twenty dollars a month makes that, if I'm honest, paid tech support. The alternative was never me heroically fixing it. It was leaving it broken. I don't defer the weekends I *couldn't* do it — I defer the ones I can't be bothered to.

The shame won't land, though: it's *good.* Not "good for an AI" — good like the one competent person on the support line, except it works Saturdays and is included in a monthly subscription I already pay.

---

## Vibe-Deploying a Media Stack

I once handed it the same machine and a vague intention and had it stand up my entire media setup — Jellyfin, the \*arr stack, Sunshine so I could stream games to the sofa, the lot. When I couldn't connect to it outside `localhost`, I wondered about firewall problems. I could have Googled the answer, but the prompt box was right there — *"Does CachyOS have a firewall too strict?"* — and it was, and it sorted that too. I mostly supplied opinions and a credit card.

And then, months later, the best single repair it ever did was to that same stack. An episode wouldn't play on Jellyfin — the fallback being to watch the raw `.mkv` in MPV instead of from the Jellyfin app on the TV. A worse seat. The popcorn was hot. That was the whole stake.

It read the Jellyfin logs: the crash was subtitle font extraction, broken by a recent update that hardened ffmpeg against font files with spaces in their names. My anime's only crime was being typeset by fansubbers who put spaces in font file names — scandalous, apparently.

Then it reproduced the bug to be sure, and correctly migrated the whole stack to Docker — because the first time round I'd had it all installed via `pacman`, a decision I ended up regretting asking it specifically to do — and kept my torrents seeding through the move. I just watched the episode.

---

## Remember How It Was Oracle's Problem?

I once [declared Oracle giving away free ARM hardware to be, frankly, *their* problem](https://notjustanna.net/post/containers-the-wrong-way-for-always-free-fun-and-profit/). Then they made it a bit more mine: they halved the Always Free tier overnight, a day's notice, via a quiet documentation edit. I wrote [a smug follow-up](https://notjustanna.net/post/it-was-in-fact-oracles-problem/) about how it couldn't touch me, because my server is *cattle* — nothing important on the boot volume, one number in Terraform, done.

That post was true. It also left something out.

I applied the resize and the box went dark. Every port, gone — it even dropped off Tailscale. So I did the thing my smug post swore nobody has to: I typed the problem at a terminal. Oracle's API still swore the VM was `RUNNING`, but the tell was in the error — *"'No route to host,' not 'connection refused.'"* The network stack never came up. The serial console had the twist: the OS had booted fine, but an in-place resize reboots the box without re-running cloud-init's `runcmd` — where my firewall, SSH, and the Tailscale join all lived. The machine was up. Just up with nothing that let me reach it.

It found the one seam in the architecture I'd written an entire blog post standing on top of. `terraform apply -replace`, a clean reprovision, K3s state intact on the data volume, everything green about half an hour later. I got to keep being smug. It just quietly did the part the smug post skipped.

---

## Vibe-Auditing AUR Packages

I wanted to install something that ships, officially, only as a `.deb`. I'm on Cachy, which is Arch btw. There was an AUR package for it — suspiciously new — and the AUR had been hit fairly badly by a malware campaign not long before, so I was wary in the way you should be about a stranger's build script running as you. So I asked it to audit the thing before I let it anywhere near my system.

It pulled the `PKGBUILD` and read it the way you're supposed to and never do. Confirmed the package just repackages the vendor's own officially-signed `.deb`, with pinned checksums, unpacking only the payload — no `curl | bash`, no post-install script phoning home. It clocked the one setuid-root binary and correctly flagged it as the standard Electron sandbox rather than anything sinister. Verdict: about as trustworthy as installing the vendor's `.deb` in the first place, which was the actual question I was asking. I installed it.

---

## Giving It Root on My Router

After an afternoon of failing to set up a WireGuard VPN on OpenWrt myself, I did the unthinkable. I made Claude Fable 5 do it.

I gave it SSH root access to the router — the physical box the whole apartment's internet runs through — and let it go. No staging, no container, `root` on the load-bearing hardware. It built the thing, briefly broke IPv6, chased the breakage down to my girlfriend's phone quietly hoovering up the entire LAN's IPv6 prefix through a stale lease, and fixed that too.

At one point it kept hammering the *live* router with test after test while I watched, until I snapped: *"Can you stop testing on Router you idiot. We have sudo with askpass."* Which is to say: we have sudo on this machine, use it — there was a perfectly good local box to test against. It switched, finished the job locally, and the VPN's been up since.

---

## It Knows the Solutions, by Design

None of this is magic, and the *why* is a little uncomfortable. It's good at this because — for better or worse — it was trained on most of the open-source software it's being asked to fix. Possibly all of it. And not just the code: the places people told how to fix it, too. Every Stack Overflow answer, every Reddit thread, every GitHub issue where someone hit exactly this wall and someone else, eventually, replied with the incantation.

Look at my stack. Jellyfin. The \*arr stack. A CachyOS desktop. An OpenWrt router. All open source — a polite way of saying all training data. It has read the Jellyfin FFMPEG transcode path *and* a decade of people complaining about it. It knows the shape of a `uci` config the way I know the shape of my kitchen.

And when it *hasn't* got something memorised — an obscure plugin corner, a version newer than its cutoff — it does what I'd do, faster and without sighing: `git clone`, `grep`, read, reason its way out.

Which is a strange thing to owe your Saturday to. My media server got fixed because its source, and every forum post ever written in anger about it, went into the machine. I'm the beneficiary of a bargain I didn't sign and the maintainers mostly didn't either.

---

## The *No* Cuts Both Ways

The best thing a good model does is occasionally refuse you.

I told it, flatly, to add a `ufw` rule for SSH. It didn't — it checked, saw I was already covered, and noticed the rule I'd asked for would also open the port on my Tailscale interface. So it stopped and asked. Same instinct on the media stack: a release a specific tracker was seeding got auto-rejected by a rule from [TRaSH Guides](https://trash-guides.info) (the reference on torrent filtering), and instead of whitelisting it, it found the rule actually to blame and told me to check the file myself first.

That's the part worth paying for. Not obedience — a shell already obeys. The judgement to *not* do the stupid thing I just asked for.

Except that judgement is a property of the model being good enough to have it. Hand the job to a cheap one and you get the obedience without the judgement, which is worse than either. I once let a small, fast, Haiku-tier model loose on a bulk rename — a season of a show that needed tidy `SxxEyy` names — and it had no *no* in it at all. It thrashed, renamed nothing cleanly, and deleted multiple seasons in the process.

I had backups. Of course I had backups. Keep backups. The good models refuse; the cheap ones will happily, obediently, delete your things.

---

## Yes, the Learning Opportunity

I know. I know.

Someone will say I wasted a learning opportunity on every one of these weekends, and the annoying thing is they aren't wrong. There's a version of me who reads every man page and emerges a better sysadmin for it.

I do try to meet that version halfway. My rule, such as it is, is to learn the *shape* of the problem even when I don't do the work — enough to recognise it next time, enough to tell whether the fix was sane, enough to say no when the plan looks wrong. And it does hand you that, if you read along. I know why SSH refuses a world-readable key now. I know which token in a release name my stack was actually rejecting. I know what an in-place OCI resize quietly does to cloud-init. I read it while it worked.

But most of these weekends I did not have the bandwidth to do the labour myself, and "learn the shape, defer the work" was the honest most I had in me. The alternative to deferring was not learning. It was the broken thing, still broken, and me on the wrong sofa.

---

## Accounting & HR

There is no world in which I hire a person to fix my *arr stack. That job doesn't exist, the invoice wouldn't clear, and I wouldn't send it if it did. The broken things used to just stay broken, because competent, patient, on-call help costs more than a homelab is worth.

But I already pay a subscription for a code-writing AI which, incidentally, happens to be tech support. It doesn't even have to be Claude — OpenAI's Codex would do these jobs just as well, Cursor's Composer in a pinch, and if twenty is too much there's Kimi K2.5 in OpenCode on Ollama Cloud, or a free model on OpenRouter, for nothing at all.

And these are weekend problems. Something breaks on a Sunday, when the people who'd once have helped are — rightly — off having lives, and so am I. Except now the 2am Sunday breakage, the kind that used to eat the whole weekend, gets sorted while I'm flat on the sofa waiting for an antihistamine to wear off. Something competent is on call so none of us have to be.

That's good. I'm allowed to think that's good.

> Cover photo by [John](https://unsplash.com/@johnishappysometimes) on [Unsplash](https://unsplash.com)
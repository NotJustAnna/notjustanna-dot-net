---
title: 'Your best engineer is your worst engineer'
description: 'In software, the generalist is your best engineer. The one who hedges in public, asks dumb questions, and somehow ships everything by Friday.'
pubDate: 'Jun 4 2026'
category: dev
heroImage: '../../assets/blog/ducks.jpg'
---

*Don't be a duck,* says the corporate slide deck. The duck walks, swims, and flies — but does none of those as well as the specialists. The dog walks better. The fish swims better. The eagle flies better. Therefore: pick a discipline. Specialize. Stop trying to be everything.

Reader, the analogy is wrong. Ducks are *excellent.* They walk fine. They swim well enough to chase fish. They fly far enough to migrate across continents. The comparison only feels damning because nobody benchmarks ducks against ducks. They benchmark ducks against dolphins.

Anyway. I'm flipping it.

---

## Meet Dan

Dan joined a JS company with a resume full of things that were not JS. Submitted his interview code in Kotlin. Got the job anyway. Dan does not care about the latest specialization. Did not RSVP to the AWS Certified Solutions Architect study group. For all he cares, AWS might be the next Big Data thing that never catches on. Moves on.

CI broken on Monday morning, half the team blocked. Dan fixed it before standup. Nobody knows what was wrong. The team needed changes on the AWS infrastructure for next quarter — Dan had never touched it — Dan read enough docs by Wednesday to propose SQS plus Lambda with full reasoning. Someone told him to get the AWS cert. Dan politely declined. The cert was never mentioned again.

Dan once heard about being "a rubber duck for the team." Took that one *personally.* Professional rubber duck. Team velocity went up by something the manager could not explain in the next retro.

When marketing didn't send a photographer to the company event, Dan was the photographer, and his trusty Samsung phone did the job.

Dan once heard "don't be a duck." Dan quacked. *Loudly.*

---

## The shape sorter

The thing Dan does is not "knows a little about a lot." That's the wrong description, and it's the one that makes Dan sound mediocre on a resume.

What Dan actually has is a small bag of moves. Read enough to recognize the shape. Write the smallest version that proves the thing works. When stuck, ask the dumber question. When the dumber question doesn't work, go up one abstraction layer and ask there. Repeat until the thing ships.

The moves are the constant. The domains are interchangeable.

This is the toddler with the shape sorter, grown up. The toddler learns that the square goes in the square hole. Then they learn that a square is just a thing with four equal sides — which means *a lot of stuff* goes in the square hole if you tilt your head. Dan has spent a career tilting their head. The CI bug and the AWS proposal are the same move. *Read the docs until the problem has a known shape, then drop it in the hole.* Not five skills. One method, deployed five times that week.

The specialist carries a map. In sofware development, the map expires. The library they mastered last year shipped a breaking change in March. Dan carries a compass and a willingness to read the changelog.

And the bug is always at the seam. The slow page is the query, which is the index, which is the migration that didn't run on staging, which is the runner that ran out of disk because nobody set up log rotation. Five layers, one bug. The specialist sees the slow page. Dan sees the disk.

---

## Ducking around and quacking out

What makes Dan work is not raw capability. It's something stranger, and worth naming.

No ego about not knowing. Asks shamelessly. Synthesizes fast. Delivers by 5pm. This is, on the surface, the energy of a permanent beginner — which reads as incompetence right up until the shift ends and the thing is somehow working.

The side effect nobody asked for: Dan accidentally does knowledge transfer by existing. Asking "ELI5 the IAM thing" in front of the team teaches three juniors how IAM works without anyone running a workshop. Asking "wait, why does it do that?" surfaces the assumption everyone else was politely pretending to understand.

The questions are not the *price* of the duck. The questions are *part of the work.*

The specialist protects their expertise. It's a moat. It's a job. *Fair.* Dan has nothing to protect, so Dan just asks.

---

If you've read this far and some of Dan sounds like you — congratulations, probably. The discomfort is the diagnostic. Specialists don't read posts about generalists and recognize themselves. Ducks do.

---

## Other ducks

**Hedy Lamarr.** Hollywood actress. Co-invented frequency-hopping spread spectrum during WWII because she wanted to help with torpedoes. The patent expired before anyone realized it was the basis for Wi-Fi, Bluetooth, and GPS. The duck math: *I don't know military signals processing, but I know pianos, and pianos hop frequencies, so.*

**Claude Shannon.** Wrote the foundational paper of digital communication and then spent the rest of his career building juggling robots, unicycles, and a mechanical mouse that solved mazes in 1950. The information theory was the pond he happened to settle in. The toys were the duck.

**Linus Torvalds.** Wrote Linux. Wrote Git. Has described himself as a lunatic who knew just enough C and just enough OS theory to be crazy enough to try. Started building guitar pedal kits during winter holidays a couple of years ago — described as *"LEGO for grown-ups with a soldering iron."* Does not play guitar. Built his own pedal anyway, with a screen, rotary encoders, and a Raspberry Pi Pico. Then started writing the DSP audio code for it. The man who runs the merge window for the Linux kernel, soldering through-hole resistors on Christmas break, because it was the right level of *not-trivial-but-not-overkill.*

**Daniel Besser** is officially titled *Infrastructure & Technical Specialist* at LMG, which is the longest possible way to say he does whatever needs doing today. The audio guy. Also an editor (IMDb credit, look it up). Made a puzzle game called Copacetic on his own time. Music producer. Once figured out how to power a battery-powered remote sensor from mains. The forums call him the Bob Ross of tech and they are not wrong. Watch any LMG video long enough and Daniel is somewhere in the background, doing the eighth thing.

(I borrowed the name. Daniel Besser would hate this framing, because he's famously self-deprecating about being good at any of it. Which is, of course, also the duck disposition. The duck does not know it is a duck.)

The pattern across the list is not "five careers." It's the same disposition reapplied. Each one of them sat down in front of a thing they didn't know and did the duck math: read enough, try the small version, ask the dumb question, iterate. A polymath, on closer inspection, is what you call a duck after the fact. Once enough domains have stacked up that "generalist" starts to sound insulting, the word gets upgraded.

They all kept going.

---

## The quack

Dan will always sound a bit uncertain. *"Uhhh."* *"Sure? I guess?"* *"ELI5 this please."* Hedges in public and ships in private. To anyone watching the surface, Dan is the least confident engineer in the room.

Dan is also, quietly, the right hand of the entire team. Three people are blocked; Dan unblocks them. The doc nobody wrote — Dan wrote it. The deployment that nobody understands — Dan understands it. The performance review will struggle to summarize this, because "fixed everything, knew nothing in particular" is not a competency rubric.

Your best engineer is your worst engineer.

The duck migrates across continents. Nobody puts that on the resume.

And if you're manager, try hiring ducks.

> Cover photo by [Marcus Lenk](https://unsplash.com/@marcuslenk) on [Unsplash](https://unsplash.com)

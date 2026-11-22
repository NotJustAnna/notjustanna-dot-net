---
title: 'The Skylake i3 Paradox'
description: "For decades, last year's i7 was this year's i5 and next year's i3, and nobody felt it, because we kept needing more. Then Skylake happened, and we stopped. I think the chatbots just got there."
pubDate: 'Nov 22 2026'
heroImage: '../../assets/blog/i5.jpg'
category: tech
---

I grew up on a golden rule: i3 for very light tasks, i5 for daily usage, i7 for the serious stuff.

It came with a corollary that everybody who bought a computer in the 2010s knew in their bones. Last generation's i7 is roughly this generation's i5, which is roughly next generation's i3. You could bet on it. You'd have won.

And it never once felt like a bargain, because the rule had a second half nobody said out loud: whatever the i3 could do next year, you'd need it to do next year.

---

## Six Thousand Tabs

For most of computing, what we asked of the machine grew up alongside the machine.

Screens went to 256 colors. Then 1024x768. Then millions of colors (hi, sRGB). Then 1080p. Every step was more pixels, more bits per pixel, more for the hardware to push, and every step was bought and spent in the same year.

The way we *used* computers scaled too. You used to open *the program* and do everything you needed inside it. Then windows. Then multitasking, with a clipboard that worked between programs. Then *drag and drop*, which still feels a little like magic if you think about it for too long.

The browser went the same way. One window was one website; you wanted a second website, you opened a second window. Then tabs. Two or three. Then dozens. Then Linus Tech Tips, with effectively unlimited RAM, trying to find out how many tabs it takes to crash Chrome. (Spoiler: around six thousand.)

Every gain the hardware made, we ate. Moore's law gave, the user took, and both sides of that ledger grew at roughly the same rate for about forty years.

...

Until it didn't.

---

## The Performance Improvement Plan

Skylake shipped in 2015, on Intel's 14nm process. Intel's next node then failed to reach a desktop for six years, and Intel spent them on what I can only call the Skylake Performance Improvement Plan.

Kaby Lake was Skylake with higher clocks. Coffee Lake was Skylake with more cores. Coffee Lake Refresh was Skylake with even more cores. Comet Lake was Skylake with ten cores and a cooling problem.

In 2021, Rocket Lake finally brought a new core: one designed for 10nm, dragged back to 14nm because 10nm still wasn't ready for a desktop. Intel's headline was 19% more IPC. The flagship i9-11900K had eight cores, down from the ten in the i9-10900K it replaced, and found the rest of its performance the old-fashioned way: over a GHz more boost clock than the original Skylake i7, and a 251W power limit to hold it there.

Five years. One new core. 19%.

On paper, that's a company in trouble, and Intel *was* a company in trouble. But Intel also had a stroke of luck that I'm still not sure anyone there noticed: during exactly those five years, for the first time, the average person stopped needing more.

I watched it happen to a Skylake i7, firsthand. An i7-6700HQ, inside a Dell Inspiron 7559 I've [already said plenty about](https://notjustanna.net/post/the-laptop-that-refused-to-retire/). It was my machine from 2016 to 2021, and the only reason it stopped was that the Dell around it literally cooked itself apart. The chip was fine. Skylake had enough CPU, enough iGPU and enough Quick Sync to be a perfectly cromulent machine for anything that wasn't AAA gaming.

(The machine that eventually took over its job was an i5. Of course it was.)

---

## Enough.

I still use the golden rule. Swap in Core 3, Core 5 and Ryzen 5 and it holds up fine. What changed is the middle row: "daily usage", for pretty much the entire mainstream population, is now "very light tasks". The i5 didn't get demoted. The things people do every day just stopped growing.

Phones went exactly the same way, and nobody batted an eye. At some point most phones started shipping a mid-tier chip and the same 4 to 8 GB of RAM, because that was enough for everybody who isn't reading this blog. The last time I went shopping for a phone, I realized I wasn't getting a generational improvement in *any* direction.

Phone manufacturers have this down to a science.

---

## A Search Bar That Answers Follow-Ups

Mainstream people are not asking their GPTs and their Geminis to one-shot a bread-making calculator and baking timer and profit calculator and flavor note-keeping SPA. They're using it, plainly and simply, as a glorified search bar that answers follow-ups. Google used to be the omniscient oracle. Now it's Gemini, and ChatGPT, which Brazilians have lovingly nicknamed *the Chat*. (Mainstream people in Brazil don't even know what "a Claude" is.)

What's interesting is that Google and OpenAI seem to understand this extremely well. They know where *they* sit on the curve right now, and they know people don't need GPT Astra or Gemini Carbon. People need GPT Luna and Gemini Hydrogen, the Haiku-class ones. What people seem to need is an apparently all-knowing, human-adjacent intelligence, in an app that looks like WhatsApp.

It helps that the alternative is ruinous. Almost everybody asking the Chat things pays nothing for it, and serving a frontier model to every one of them, for free, would set money on fire at a scale even these companies would notice.

The model people need turned out to be the model the labs can afford to give away.

---

## Haiku-Class Or Lower

I have to be completely, utterly frank: this took me a long time to get.

I'm the person paying $20 a month for Claude and running subagents for fun. In my head, I was not the mainstream. Then I built [Aru](https://notjustanna.net/post/i-built-a-discord-ai-assistant/), and Aru, for better or for worse, is the sum of one realization:

*Wait a second. A lot of my personal inquiries can be answered by something Haiku-class or lower.*

Because the current Haiku-class models, Luna and Hydrogen, have mostly superseded every Sonnet-class model from the previous generation, and.

and.

Current-gen i3 ≈ last-gen i5.

At the Skylake inflection point.

---

Intel spent five years selling people the same core they had no reason to replace, and may never have known how lucky the timing was. Phone manufacturers knew. They turned "enough" into a product line: the mid-tier chip, the same 8 GB, a new name on the box every year. The AI companies have apparently read both case studies, and the Haiku-class model is the one they're putting in front of everybody.

And I can't stop laughing at the timing. Moore's law tapered off right around when the whole of humanity stopped needing it to keep going. The scaling laws are tapering right around when everybody got their oracle that looks like WhatsApp.

Very convenient. Physics, apparently, reads the market research.

> Cover photo by [Alexandru-Bogdan Ghita](https://unsplash.com/@bogzilla) on [Unsplash](https://unsplash.com)

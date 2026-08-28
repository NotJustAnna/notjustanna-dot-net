---
title: 'The Internet Fits In Two Terabytes Now.'
description: "An LLM is a JPEG thumbnail of the internet, and now we ask it questions."
pubDate: 'Aug 27 2026'
category: tech
heroImage: '../../assets/blog/server.jpg'
---

Every few days someone posts a photo of a Mac Mini on LinkedIn, or three of them daisy-chained, captioned something like "finally got Qwen3 running locally," tokens per second included like a benchmark score. I don't own the hardware and I'm not shopping for it. I just kept seeing the posts and got curious what the numbers actually were.

I did the math, out of spite, as someone bored does, because it's a LinkedIn post.

It turned into an accidental proof of something bigger than whether you should buy a Mac Mini.

---

## Sixty-Four Gigabytes Is The Small One

A 32 billion parameter (or 32B, for short) model, the smallest size anyone calls "good" with a straight face. Each parameter is a number. In FP16, the precision it was trained at, each number is two bytes. Thirty-two billion times two is 64GB. That's before the context window, which is where the conversation lives while you're having it, so call it 64 to 80GB of memory just to say hello.

My desktop has 32GB of RAM. I could empty the whole machine, swap every process to disk, and I still wouldn't fit the small model.

This is why the craze is specifically Mac Minis and Mac Studios and not gaming PCs: Apple's unified memory means the RAM and the GPU draw from the same pool, so a maxed-out Studio can plausibly hold something a normal desktop can't without wiring together enough consumer GPUs to look like a server rack. "Plausibly hold" is doing work in that sentence, because it means quantized down from FP16 to something like Q4, four bits a parameter instead of sixteen. A lossy compression pass, so the model fits on a computer you can buy at a mall. Nobody phrases the post that way. It's always "I'm running it locally," never "I'm running a blurrier copy of it locally, on the one consumer machine where the memory arithmetic barely closes."

That's the small model.

Nobody says how big Claude Fable 5 is. Nor how big GPT 5.6-Sol is. What everyone says, in unison, is that they're *smarter*. Smarter than Claude Opus or Gemini, smarter than last quarter, smarter in a way you can feel. However, we do know everything about their open-weight counterparts. Kimi K3 is 2.8 *trillion* parameters. Same math: 5.6TB of numbers, plus context, so six or seven terabytes of RAM to run a chat window.

You're not even running a *program*. There's no `if` in there. It's a giant grid of weights that turns "the text so far" into "probably this next piece of text." That's the entire mechanism. Every model since GPT-2 is the same trick, a Markov chain on *steroids*: given the last N things, guess the next thing, repeat until it emits a stop token.

There's a meaningful difference between a Markov chain and a modern LLM, though.

---

## Ultra (9)

You've used 7zip. Perhaps out of desperation, or maybe just because you're curious, you've picked "Ultra" from the compression dropdown, watched the progress bar crawl for a while, and gotten a file that's a chunk smaller than the folder you started with. That's entropy coding: find the patterns, give the common stuff short codes, give the rare stuff long codes, write the table down, ship the table with the file.

Now do that to the internet.

Training an LLM model is 7zip on Ultra, except "Ultra" now is a warehouse of GPUs running for months, the "table" is a couple trillion floating-point numbers, and the alphabet you're allowed to code in is fixed up front. That last part has a name: "tokenizer." You decide the dictionary first, then you spend a hundred million dollars of electricity finding the shortest possible description of everything ever written in it.

Backpropagation is the search. Calculus is how the search knows which way is downhill. The GPUs are there because the search is stupid and only works if you do it a quadrillion times. Strip the mysticism off and it's information theory with a power bill.

And then, to make it *useful*, you *supply-chain* it, one escalation at a time:

1. Crawl the public web. [All of it.](https://commoncrawl.org/get-started). Be sure to grab previous snapshots too, because the internet is a moving target and you want to know what it looked like before it was edited. You want the deleted posts, the retracted papers, the forum threads that got nuked. You want the stuff that was there and isn't anymore, because that's part of the story too.

2. The public web is not enough. Crawl [all torrentable e-books and PDFs](https://copyrightalliance.org/wp-content/uploads/2025/06/Bartz-v.-Anthropic-Order.pdf). Pass [the entirety of YouTube through a speech-to-text model](https://www.nytimes.com/2024/04/06/technology/tech-giants-harvest-data-artificial-intelligence.html). It's still not enough. [Buy books in bulk, scan them, and OCR all the characters.](https://www.copyright.gov/fair-use/summaries/Bartz-v-Anthropic-PBC-787-F-Supp-3d-1007-ND-Cal-2025.pdf) Be sure to burn the leftover paper as fuel for your generators to help with the power bill a bit.

3. Filter. Dedupe. Score. Discard most of it.

4. Take all the pull requests you've previously crawled that got merged and turn each one, half mechanically and half with a model, into a lesson on how to do that task so it's suddenly *scarily good* at doing that. Use this "changelog-to-lesson" trick on every other domain you can think of, and feed that back in too.

5. Then don't stop there: take the chat sessions that went badly and have an existing model rewrite them into how they *should* have gone, and feed that back in.

6. At some point someone invented *reasoning*, so now you're reprocessing the generated reasoning corpus with a model to make it shorter and therefore more token-efficient, and then you feed that back in too. 

7. Mixture-of-Experts, so most of the grid stays asleep while only the relevant corners answer you.

8. MoE is not enough, so do a breakthrough or two and invent sparse attention, engrams or something else which helps reduce either the computational load or the memory usage.

9. Lastly, if you're out of RAM: Quantize what comes out, so the numbers take one byte instead of two.

It's *entropymaxxing*, and it's the second coming of Moore's Law: not "the machines double every two years," but "the compression ratio doubles every however-many teraflop-months," and it's held up long enough that the industry now prices it in like it's physics. Every step is the same step: fewer bits, same information.

And it shows. The reason a tiny model like Gemma 4 feels almost *gem-like* --- this weirdly dense, precise thing operating under a parameter budget that shouldn't work --- is not that Google found magic. It's that they made every bit of that FP16 count. It's not good because it's magic. It's good because it's curated information, compressed until nothing in there is wasted.

---

## A Thumbnail

Here's the thing, though: 7zip is lossless. The folder comes back exactly as it went in. A JPEG is not: it throws away the parts of the photo your eye wouldn't notice, and if you push it too far, you get the crunchy face with the blocky shadows. You have seen this. You have seen it on your own face.

An LLM is the JPEG kind.

The public internet is well into the petabytes; a single Common Crawl snapshot alone runs around 100TB compressed, and the archive is years of those. The curated slice they actually train on is tens of terabytes of text. The model that comes out the other side is a handful of terabytes, and it can hand you back a plausible version of nearly any page that went in.

Reader, that is not a compressed image. That is a *thumbnail*.

The thing a JPEG throws away is detail your eye can't see. The thing backprop throws away is detail that didn't help guess the next word, which is to say, the *specific*. The weird forum post. The wrong answer nobody else gave. The one time someone was right and alone.

What survives is the median of everything, rendered at astonishing resolution. 

They didn't save the internet. They saved enough about it to redraw it on demand. The redraw is what you're talking to.

---

## SUMPRODUCT

Somebody put the thumbnail in a spreadsheet.

The weights *are* a spreadsheet: a couple trillion cells of numbers, and inference is the world's most expensive `SUMPRODUCT`. Your prompt is the row you're looking up. The answer is whatever the neighboring cells multiply out to.

And yes, it hallucinates. It's a spreadsheet. Have you *met* a spreadsheet.

---

Nobody needs to believe there's a ghost in the weights to find this vertiginous, and "terrifying" isn't even the right word for it: we are compressing the written output of civilization toward its information-theoretic floor, on purpose, on a schedule, calling the milestones by their model numbers instead of noticing the milestones are also a graph of how close we're getting to entropy itself.

You need about a degree and a half of computer science to see that graph instead of the chatbot sitting on top of it. Most people only ever see the chatbot.

> Cover photo by [Domaintechnik](https://unsplash.com/@fslfsl) on [Unsplash](https://unsplash.com)
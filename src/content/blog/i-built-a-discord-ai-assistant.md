---
title: 'I Built a Discord AI Assistant.'
description: "A chatbot refused a harmless request over a supposed copyright violation. Out of spite, I then proceeded to make a Discord bot about it. I accidentally named it 'to exist'."
pubDate: 'Nov 12 2026'
category: dev
heroImage: '../../assets/blog/ask-anything.jpg'
heroCrop: center-left
---

I, Anna, on a lovely Saturday afternoon, was at my hairdresser.

Engineers reading this are statistically guys with a twenty-minute barbershop habit, so: sometimes the hairdresser puts some hair product on your hair and you sit there for an hour while it does mild biochemistry, with nothing but your phone. Girls in STEM, amirite.

So, instead of doomscrolling, I was *trying* to be productive. I was looking at the fancy pizza places around here. Not to order one: I'd just bought a pizza stone, and I wanted to know if I could recreate those pizzas at home. (Long story. I haven't made any pizza yet.)

Then I figured, y'know what, Claude can probably do the boring part, right from my phone. Look at the menus, scrape them, help me filter and tweak the ingredient lists, and turn the result into a not-bad-looking PDF. Then I'd text my girlfriend the PDF plus a "hey I've been thinkin about makin pizza, I got the flavors from that fancy pizza place we like. what ya think".

It did everything. The looking, the scraping, the filtering, the tweaking.

And then it refused to make the PDF, citing *copyright.* The pizza place's. I reasoned with it. *"Sure, this would be a copyright infringement if I was gonna open my pizza place? But it's for a pizza night at home."*

Claude kept its stance. Over a list of pizza toppings. For my girlfriend. From a restaurant we already give wayy too much money to.

I know where this comes from. Anthropic has been cracking down since the "reverse engineer everything" and "recreate this game with AI" waves. Bad PR, they're trying to IPO, yadda yadda. Knowing where it comes from did not help. Great: yet another classifier, yet another stupid rule, and I pay twenty dollars a month so the service can get worse at pizza.

Any model on OpenRouter would have done it. Even Muse Spark would have done it. That's the Facebook model, the one with a "Contributor" price tier that costs pennies and states, clearly, on the tin, that your data will be used for training. Which makes Meta --- I can't believe I'm typing this --- the only company in the industry being straightforward about data collection. I did not expect to end the year agreeing with *Meta* about consent.

(I checked the following day. Muse Spark, in a terminal harness, made the pizza PDF without a word of complaint. It cost about ten cents in OpenRouter credits.)

---

## Nowhere To Go

I was miffed. I was also stuck between shitty platforms.

Switching to ChatGPT didn't feel like an improvement. Gemini would be a downright downgrade. Claude over the API would probably work, but I'd be burning my money at an *astonishing* rate. I'd trialed self-hosting OpenWebUI once. Not particularly good. I'd tried making my own UI. Also not particularly good. All I wanted was something that just worked in a web browser and on my phone.

I was even open to running some flavor of OpenClaw or Hermes, which dodges the UI problem by living inside a chat app. But I don't like how freeform they are. I definitely don't want an unsupervised agent on my PC, or more realistically in a sandboxed container on my PC or my Oracle box, doing whatever it feels like between messages.

This is the moment I play the backstory card: I was once one of the developers of [MantaroBot](https://github.com/Mantaro/MantaroBot), a Discord bot that at one point sat in the top 20 most used. (By verified metrics on the most popular bot list website. That was fun.)

I'm no stranger to the Discord API, the Gateway, the Intents. I was there before slash commands were a thing. I wrote my own argument parser from scratch, and I'm still proud of it. I know how the weirder, free-form bots work, the [PluralKit](https://pluralkit.me/)s and the Minecraft chat bridges. About a year ago I even saw a private bot that answered every mention by calling GPT-3.5 Turbo. No reasoning, no agentic loop, nothing.

...

I know the agentic loop. Probably more than I should. I know how to make Discord bots. Probably more than I should. I know exactly how far you can stretch the slash commands, the buttons, the popup forms, the embeds, the forums.

Discord is a chat app that works in a browser and on my phone.

It might be a bit clunky (what bot on Discord isn't), but damn. It might just work?

---

## Welcome Back Old Friend

Apparently I was making a new Discord bot, then. Time to decide on a name and an avatar.

Backstory, continued: besides co-developing Mantaro, I also built a bot on my own, called Aru. A much smaller bot, a bit more impressive engineering-wise, dating back to March 29, 2018. Its avatar was Jibril, from [*No Game No Life*](https://en.wikipedia.org/wiki/No_Game_No_Life). The original is long gone.

I don't even know what Aru was supposed to mean. I remember throwing it at Google Translate to make sure I wasn't accidentally naming my bot a slur in some language. I remember it coming back as "yes" somewhere, though that might have been Google Translate hallucinating before hallucinating was cool.

Looking it up now: it's Japanese. ある. "To exist."

(I've watched way too much anime by now to somehow understand *some* Japanese. I wonder if the name was subconscious, in that funny way human brains do things.)

I named a Discord bot *to exist*. Twice. The second one runs on a language model and reasons. René Descartes would have an aneurysm.

So Aru it is. With Jibril as the profile pic.

---

## Correctly, This Time

That same Sunday I asked my [artificial tech support](https://notjustanna.net/post/artificial-tech-support/) to start it for me. The first message was a stack (Kotlin, JDA, Koin) and a spec that can be summed up as: OpenClaw-like but let's do it correctly this time.

Sixteen minutes later there was a bot that compiled, passed its tests, and had made a real tool call through OpenRouter.

The freeform agents wanted to live on my machine and keep busy. Aru just feels like someone cross-bred Claude.ai with a Discord bot.

She has home channels, where she answers everything I say. Anywhere else, she answers mentions, same as that GPT-3.5 bot. She also takes DMs. And in certain forum channels she works more like the AI chat apps do today: each post is its own conversation, with its own model, its own history and its own sandbox.

She doesn't do anything between messages, because nothing asked her to.

The controls are whatever Discord already had lying around. Permission prompts are buttons. When she has a question, it's a popup form. `/model`, `/compact` and `/stop` are slash commands, and right-clicking a message gives you "Rewind to here", which wipes the chat, and her memory, back to that point.

...

And then I couldn't stop.

I wondered if it'd be funny to run a vision model over every custom emote on the server so Aru could use them herself. The whole exercise cost ninety-one cents, after some misfires and re-runs. I taught her to wait while I'm still typing. I taught her to listen to voice notes, because I'm the sort of person who downloads WhatsApp audios and asks a model to deal with them for me.

On day six I told Claude, and I quote, "I wanted to change how Aru works. Like, a lot." The redesign came out as 49 tasks. It worked through all of them, one subagent at a time.

Somewhere in the middle of that, all I could think was "god we're making a MONSTER harness."

As of writing, it has been eleven days, and way too many commits for a single person.

---

## Too Powerful

Aru started out on Muse Spark, at Contributor prices, because I'm cheap and Meta was honest about the terms.

Then I plugged in [Mercury 3](https://www.inceptionlabs.ai/).

Mercury is a diffusion LLM. It doesn't write the answer one token at a time, left to right; it refines the whole thing at once, the way image models do. In practice that means over a thousand tokens per second. At launch pricing it costs ten cents per million tokens in and thirty-five out. Not that I'd know: I'm still on the free tier. A hundred million tokens, and so far she's used half a percent of them.

You ask Aru a question. About five seconds later there's a wall of text that fills the screen. Not streaming in. Just *there*.

I recorded it on OBS and sent the clip to a few close friends with the caption "... I feel like I made something too powerful".

By that evening there was a server called "Aru's Lair", and friends who weren't me were using her. Which taught me something within a day: my friends are technical, patient, lovely people, and they are still *users*. She has `/clear`. She has rewind. She has `/compact`. Guess who trots back to the same channel the next afternoon and just asks away, on top of yesterday's entire conversation.

(She now quietly asks a tiny decision model whether you've changed the subject, and tidies up herself. The first friend to trigger it never knew. That's the feature.)

---

## Something I'd Been Toying With

A bot my friends use has to be up when my PC isn't. It was always going on the Oracle VM.

On Tuesday I published [a post about half giving up on Kubernetes](https://notjustanna.net/post/half-giving-up-on-k8s/). It opens like this:

> I just needed to deploy something I'd been toying with that week, and the thought of putting it on my single-node K3s cluster made me go *Ugh.*

Eight months of cluster. ArgoCD, the operators, twenty-nine pods. All of it retired on a Tuesday morning because I couldn't face writing another eight manifests for a Discord bot with an anime angel on it. She is now one `kind: Pod` and a sidecar, and she was live 79 minutes after I asked.

---

So that's my favorite way to use AI now. She's in my browser and on my phone, and she's as supervised as I want it to be, and she answers in five seconds. She has her own OpenRouter key, and her entire bill so far is $1.15. Most of that was Gemini squinting at emotes.

And she makes PDFs. To test that, I asked her for a funny one. She typeset, in Portuguese, *The Great Definitive (and Completely Useless) Guide to Procrastination*: "Extended Edition, now with 6 pages of NOTHING". It has three pages. Section 4.1, "How to Break the Cycle", reads in full: "You can't. Thanks for reading."

A+. No copyright concerns were raised.

> Cover photo by [Zulfugar Karimov](https://unsplash.com/@zulfugarkarimov) on [Unsplash](https://unsplash.com)
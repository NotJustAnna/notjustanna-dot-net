---
title: 'Valve is a shitty company. We allow Valve to stay shitty.'
description: "My Steam library cost around R$9k, isn't property, isn't inheritable, and isn't going anywhere. This is the accounting of why — and why the answer is everyone else."
pubDate: 'Aug 15 2026'
category: ramblings
---

When I die, my Steam library dies with me.

That's not a metaphor. It's the [Steam Subscriber Agreement](https://store.steampowered.com/subscriber_agreement/): I don't own games, I own a *subscription* to a service that grants me licenses to access games. Licenses are personal. Licenses are non-transferable. Roughly nine thousand reais of purchases — a number that means something when you earn in reais, every one of those games taxed and regionally priced and agonized over — and the legal weight of all of it is a login.

My library will not be part of my estate. There is no mechanism to will it, gift it, or sell it. The community's actual, functioning solution to digital inheritance is *don't ask, don't tell*: write the password down somewhere, tell no one official, and hope Valve never gets curious about why a 2000-born account is still buying games in 2085.

A French court ruled in 2019 that Steam must allow the resale of digital games. Valve appealed. Valve won the appeal. The license stands.

This post is an accounting. Both columns are longer than I'd like.

---

## Abandonware With a Storefront

Valve makes — made? — some of the best games ever shipped. Then it discovered a store that takes a cut of everyone else's games, and the games division became a rounding error with a fan club.

Portal and Half-Life get remembered when there's hardware to sell. *Alyx* exists because the Index needed a reason to. *Aperture Desk Job* exists because the Deck did. Everything else gets the long silence. Left 4 Dead is two games and a decade and a half of nothing. Team Fortress 2 spent *years* overrun by aimbot-and-slur bots — an actual, measurable majority of some servers — while the community trended [#SaveTF2](https://save.tf/) worldwide, twice, before Valve mustered banwaves and a comment. The famous flat structure, where employees work on whatever interests them, has a corollary nobody puts on the recruiting page: nobody has to work on what *doesn't* interest them. Maintenance doesn't interest them.

A live game with a live player base and a live in-game economy, left to rot for years, is not a small studio failing to keep up. It's one of the richest per-capita companies on Earth deciding your game isn't fun *for them* anymore.

---

## The House Always Wins

Speaking of that in-game economy.

Valve didn't invent the lootbox, but TF2's crates and CS:GO's cases industrialized it: real money in, randomized cosmetics out, a marketplace to give the cosmetics prices, and — crucially — an API that let third-party sites treat those prices as chips. The CS:GO skin-gambling scene ran for years, minors included, [YouTubers promoting casinos they secretly owned](https://en.wikipedia.org/wiki/Skin_gambling) included. Valve collected a cut on every skin that moved and sent cease-and-desists only after the press did the investigating.

They'll tell you the gambling sites weren't theirs. True. The casino wasn't theirs, just the mint, the vault, and the teller window.

And while we're listing things Valve merely *allows*: Steam is the storefront where Denuvo became normal. Valve's own DRM is famously mild — and famously optional, layered under whatever a publisher wants to staple on top. The store that could have drawn a line decided lines are the customer's problem. You can now buy a single-player game on Steam that phones an Austrian DRM server before letting you play offline. On Steam. The platform whose whole pitch was convenience beating piracy.

That's the debit column. Ownership, stewardship, gambling — the places where being better would cost actual money.

---

## Credit Where It's Due

But.

Here's the part that makes this post annoying to write. The other column is *long*.

Steam Support refunded me things it had no obligation to. The refund policy — two hours, fourteen days, few questions — got stress-tested by No Man's Sky and again by Cyberpunk 2077, and both times Valve erred toward the customer while the actual publishers hid. Family Sharing means my girlfriend and I stopped buying games twice. [Remote Play Together](https://store.steampowered.com/remoteplay) — couch co-op streamed over the internet, one copy of the game — carried an embarrassing share of my COVID years, and I know I'm not alone in that.

Valve funds [Proton](https://github.com/ValveSoftware/Proton). Valve funds [FEX](https://fex-emu.com/). I run CachyOS on my desktop and play Windows games on it, casually, like that was always normal — and it is normal *now*, because Valve spent a decade paying for Wine, DXVK, and kernel work that mostly benefits people who never bought a Steam Deck. I wrote [a whole post](https://notjustanna.net/post/microsoft-was-right/) about Valve shipping the convergence dream with FOSS. That's still true. I'm still rooting for them.

They hand out the Source SDK like candy, and sometimes entire games' source code — TF2 got that treatment recently, the whole client and server, to the modders Valve itself abandoned it to. It's why we know exactly how cursed Half-Life's code is: there's a [whole genre of video](https://www.youtube.com/watch?v=k238XpMMn38) about the rapidly dwindling sanity of Valve programmers as expressed through code comments, and it exists because Valve *let us read the comments*. Most companies' code is that bad. One company let you check.

Steam itself is a store that puts **Mostly Negative** on the box, in orange, on the page where it's trying to sell you the thing. User reviews with playtime attached, review bombs flagged but *kept* — the graph is right there, you can look at the spike and decide for yourself. Epic ran its store for years with no reviews at all; most storefronts treat customer opinion as a liability to be managed. Steam Community hosts the guides, the forums, the screenshots — the institutional memory of every game, including the abandoned ones. The Workshop made modding a one-click civilian activity instead of a forum-archaeology hobby. (Yes, they tried paid mods in 2015. The community screamed. It was gone in four days — which is, notably, a faster response than TF2 ever got.)

Then there's the entry nobody appreciates because it's invisible when it works: [Steam's relay network](https://partner.steamgames.com/doc/features/multiplayer/steamdatagramrelay). I dabble in AWS networking enough to know what I'm looking at. Global anycast ingress, dedicated backbone, latency-optimized relays for millions of concurrent players — free, to developers, as a platform feature. Go price egress on any cloud at Steam's scale. Go on. I'll wait. The number you're imagining is wrong; the real one is worse. Valve just… eats it, alongside game streaming, broadcast livestreaming, Steam Link, SteamVR — a whole VR runtime that happily drives headsets Valve doesn't sell — and now a second generation of Steam Machines and Steam Controllers, because hardware apparently interests them again this decade.

That's the trap of this company. Every line in the debit column is real, and so is every line in this one. Valve is genuinely generous in a hundred places where it doesn't have to be, and genuinely rotten in the handful of places where it matters.

The columns don't cancel. That's not how this works. But hold the ledger in your head, because the next section is about everyone else's.

---

## Grading on the Steepest Curve in Tech

So why does Valve get away with the rotten handful?

Look at the alternatives. Really look.

| Storefront | The chosen footgun |
|---|---|
| Microsoft | Games for Windows Live. Then the Store. Then the Xbox app. Three launchers, same graveyard¹ — and the [Xbox One reveal](https://www.engadget.com/2013-06-19-xbox-one-drm-used-games-reversal.html), where they announced daily online check-ins for a disc console and reversed it in a month |
| EA | Holds the [Guinness World Record for most-downvoted Reddit comment](https://www.pcgamer.com/eas-infamous-defense-of-lootboxes-wins-a-guinness-world-record-for-most-downvoted-comment-on-reddit/), earned defending lootboxes; Belgium had to [threaten criminal prosecution](https://www.bbc.com/news/technology-43906306) to make them stop |
| Ubisoft | An executive told players to get ["comfortable not owning your games"](https://www.gamesindustry.biz/the-new-ubisoft-and-getting-gamers-comfortable-with-not-owning-their-games/) — then they [revoked The Crew from libraries](https://www.gamedeveloper.com/business/french-consumer-group-sues-ubisoft-over-shutdown-of-the-crew), single-handedly launching Stop Killing Games |
| Epic | Bought exclusivity instead of features; shipped for years without a shopping cart; paid the FTC [$520 million](https://www.ftc.gov/news-events/news/press-releases/2022/12/fortnite-video-game-maker-epic-games-pay-more-half-billion-dollars-over-ftc-allegations) over dark patterns and children's data |
| Sony | Delisted Helldivers 2 from 177 countries over a mandatory PSN login for a game people already owned; tried to [delete 1,318 purchased Discovery seasons](https://www.notebookcheck.net/PlayStation-backpedals-on-decision-to-remove-Discovery-TV-content-from-platform.786697.0.html) from libraries |
| Nintendo | Closed the 3DS and Wii U eShops and took the purchases with them; [sues the concept of preservation](https://www.gamedeveloper.com/business/switch-emulator-yuzu-reaches-2-4-million-settlement-with-nintendo) on sight; the classics catalog is a *Nintendo Switch Online* subscription — for games that don't even know what an IP packet is |
| GOG | …actually fine |

> ¹ The company that was right about convergence fifteen years early has been wrong about game distribution for twenty, consistently.

That table is just the distribution sins, and it still doesn't fit the industry's actual answer to the ownership question: the subscription. Game Pass and PS Plus, where you own even less, monthly. Games rotate out mid-playthrough on a schedule. The classic catalogs are rentals with no purchase option. Game Pass Ultimate went [up fifty percent in one day](https://www.cnbc.com/2025/10/01/microsoft-price-hike-xbox-game-pass-ultimate.html) — twenty to thirty dollars, October 2025, cancellation page reportedly buckling under load — and PS Plus took [a third across every tier](https://www.pushsquare.com/news/2023/08/ps-plus-essential-extra-premium-price-increases-announced-by-sony) two years earlier. My Steam license is a legal fiction, but at least it's a fiction with my name on it. The subscription doesn't even bother with the fiction.

One of these companies clears the bar. GOG sells DRM-free installers you can back up, keep, and — quietly, practically — inherit. GOG is also a fraction of Steam's catalog, running on CD Projekt's patience.

Everyone else didn't lose to Steam's lock-in. They lost to Steam's *baseline*. Valve's competitors looked at a company whose worst qualities are "you own nothing" and "we ignore our games", and failed to beat it on either. Ubisoft's answer to "you own nothing" was to say it louder.

That's the mechanism in the title. Valve stays shitty because shitty-with-Proton-and-refunds is, empirically, the best deal on the table, and we all keep taking the best deal on the table. I keep taking it. My next game is going on Steam and we both know it. There's no boycott math where I punish Valve by giving my money to a company that's worse on every axis Valve fails on, plus several new ones.

---

The license terms won't change until someone loses money over them, and nobody's losing money over them, because the pressure that would force the change requires a competitor worth defecting to, and the entire industry looked at that opening — twenty years wide — and chose the footgun instead.

Meanwhile, the other party clearing GOG's bar is [MyAbandonware](https://www.myabandonware.com/), [Old Games Download](https://oldgamesdownload.com/), [Abandonware Games](https://abandonwaregames.net/): volunteers in a legal gray zone, hosting the games the stores deleted, for free, under permanent threat from the lawyers of the companies that abandoned them. The industry's preservation layer is the part of it that gets sued.

So Valve gets to be shitty at the exact depth we tolerate, which is the exact depth nobody else undercuts.

When the time comes: it's in my password manager, alright?

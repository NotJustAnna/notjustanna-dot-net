---
title: 'Discs Are Tarballs Now'
description: "Everyone's mad they don't own their games anymore, and they're right. I'm mad about something smaller and weirder: my shelf used to be a storage tier."
pubDate: 'Sep 29 2026'
category: tech
heroImage: '../../assets/blog/discs.jpg'
---

It is 2026 and physical media is dead.

Spotify and YouTube Music have a stranglehold on music, and movies live on whichever streaming service currently holds the license.

Which means DVDs and Blu-rays died too. Those were the same formats that carried your films *and* your games, PS2 through PS5, so whatever happened to the movie half dragged the game half along with it.

Blu-ray never stood a chance on the movie/TV side, and not because of the discs. It had to pay the 1080p tax: a more expensive player, more expensive discs, and (at least here) more expensive rentals, all to sell resolution and detail to a Blockbuster-goer who had no idea they were missing any. It took *a lot* to move people from composite to HDMI, from CRTs to flat panels, from SD to HD. The movie being blurry was never a problem. It was just how movies looked. TV had always been blurry, so of course it was still blurry.

Netflix arrives at exactly the right moment: DVDs are still around, internet speeds are finally good enough, Blu-ray is still expensive enough, and you can bit-starve an H.264 stream just enough that it beats a DVD purely by being 1080p with a tiny bit more bitrate (WiFi'd to a first-gen Chromecast, no less). A Blu-ray would wipe the floor with it. The average user would not notice, and didn't. Then the lawyers started skinning Netflix's dominance into a plethora of streaming services, and the discs didn't come back.

Sure.

The movie half went quietly. The game half is where people dig their heels in, because for games the disc also meant *you're allowed*. And now Switch 2 cartridges are game keys: the full circle return to [dongles](https://en.wikipedia.org/wiki/Software_protection_dongle), USB sticks that tell a piece of software you hold a valid license.

So "I want to own my games" is everywhere, and it's very valid. What people want back is *the license*: an object that says you're allowed, instead of a half-assed handshake transaction where the other side is a furious group of lawyers with a boner to take your rights and your money at any time.

They're right. This isn't that post.

---

## Install Wizard, Key Included

Mechanically, physical media was never one thing.

VHS tapes, DVDs, Blu-rays, music CDs: you read from them, directly. No wizard, no nothing. The player plays the thing, and the thing is the movie. Or the album.

PlayStation, Xbox and PC games are something else. A lot of them treat the disc less like "a read-only partition where the software lives" and more like an install wizard with a license key built in, somewhere, in a hidden file or encoded onto some disc metadata. The game copies itself onto your SSD, and afterwards its only job is to be present so the console can check you still own the access. Some discs don't even carry the whole game; the rest arrives over the internet on launch day.

Which means your PS5 has every byte it needs to run Persona 5 Royal, sitting right there, and it will still refuse to boot it. Yeah, it's installed. But the license didn't come from the PS Store, so you better put the disc in now.

It's a disc-shaped dongle.

There are good reasons for this, of fucking course. Modern games expect SSD streaming speeds, and random reads off an optical disc are a joke. Nobody is designing open worlds to stream off a Blu-ray anymore, and nobody should. I understand. It still stings.

Nintendo got it right, just to then get it wronger in the most *Nintendo* way possible. The Switch 1 runs its games straight off the cartridge: read-only flash, fast enough that the console just... uses it, with updates on internal storage and the actual game in your hand. Then the Switch 2 kept the cartridge, kept the plastic, kept the little box, and shipped game-key cards with nothing on them. They took the one physical format in gaming that was still the game and turned it into a cartridge-shaped dongle instead.

---

## Bestowed

Putting a game in a PS2 was a full ritual. Mine was Need for Speed: Underground 2, and I miss it every day.

And the ritual was *true*. The PS2 had no idea NFSU2 existed until you slotted it in, and no memory of it after you took it out, save for the Memory Card (pun intended). The console was an interpreter waiting for a program. The only persistent state in the whole system lived on a second physical object, also in your hand. Inserting the disc meant you had bestowed your PS2 with the data necessary to run NFSU2.

The PS5 ritual looks identical. Same gesture, same satisfying click. Except now it's showing your ID at the door of a building you're already standing inside.

Which is what bugs me about the NFC cartridge crowd. People print little cartridges, embed an NFC tag, write `steam://launch/1091500` on it, tap it on a reader, and Cyberpunk 2077 launches. I get it. I get the ritual. I just understand too much about the inner workings of it. Cyberpunk was already installed. Steam owns the license. The tag holds neither the game nor the right to run it.

Congratulations, you made a physical shortcut on your real desk, instead of your digital desktop.

And would I want the key out of Steam's convenient hands and onto an NFC sticker instead? I sure wouldn't. Both options feel incorrect, for different reasons, and most of those reasons boil down to one sentence: games simply aren't made to be streamed off a disc anymore.

(Yes, GOG exists. Yes, a DRM-free offline installer is basically ownership. No, that's not the point.)

---

## Cold Storage, Room Temperature

Somewhere in all of this, physical media also stopped being a storage architecture, and nobody held a funeral.

On a PS2, the shelf was the library. Every disc on it was cold storage with free mounting: pull one out, slot it in, it's hot. Library size scaled with shelf space, and shelf space is cheap, dumb, and lasts forever. The console needed nothing but itself and, *maybe*, a second memory card.

Now the medium is too slow to be a tier at all, so everything gets staged into hot storage. You want a 30-game library hot and ready? On a PC, it means Steam libraries scattered across a spread of SSDs, and maybe an HDD, because none of them has enough space on its own. On a PS4, that meant hard drive swaps. On a Switch, get ready to spend ungodly amounts of money on prosumer-camera-grade microSD cards.

---

## Fast, Read-Only, Mine

The new COD wants 100+GB? A card can already hold that. SD cards come in terabyte sizes; capacity was never the problem. What I want is *fast*: at least HDD speeds, preferably something DirectStorage-able, random reads and all, so the game runs in place instead of getting staged onto your SSD first. Something like [ExpressCard](https://en.wikipedia.org/wiki/ExpressCard) (a slot that belongs in [a different eulogy](https://notjustanna.net/post/every-port-i-loved-is-now-called-usb-c/)), but 2020: PCIe Gen 4 or 5, in a card. Honestly, I'd take a read-only SD Express card. The game runs straight off it at NVMe speeds, and the internal drive shrinks back to what the memory card used to be: saves, settings, and patches.

Patches are the other reason discs turned into tarballs, and they're the easy part. The card is the read-only lower layer; the patch is a thin writable layer on top, living on internal storage. The console mounts one over the other and runs. Pull the card and the patch is a diff against nothing.

Everything already exists. SD Express puts PCIe and NVMe inside an SD card, which is what finally makes one fast. CFexpress does it in the format cameras use to dump raw video. The Switch 2's expansion slot *only* takes microSD Express. Nintendo put the exact interface I want inside the console, and then used it to store more downloads.

The bottleneck used to be physics. Now it's a line on a bill of materials. Pressing a Blu-ray costs close to nothing per copy; putting 100GB of *fast* flash into every copy costs real money, per unit, forever. That's the entire reason game-key cards exist, and nobody wants to be the one who decides a physical game should cost what a physical game costs.

---

A different future, where each piece of software is its own fast cartridge, and it's glorious. The shelf is the library again, the console is an interpreter again, and the ritual means what it looks like it means.

Instead, it's an authenticated HTTPS link that downloads a tarball, and the tarball is now an integral part of your PC's SSD.

---

> Cover photo by [Cameron Bunney](https://unsplash.com/@bdbillustrations) on [Unsplash](https://unsplash.com)
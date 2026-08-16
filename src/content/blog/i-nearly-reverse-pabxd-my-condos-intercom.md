---
title: "I Nearly Reverse-PABX'd My Condo's Intercom"
description: 'An ATA, some Asterisk, a tunnel to my reverse proxy, and Linphone, all so I could answer the front desk from my desk at work. The condo had other plans.'
pubDate: 'Jul 28 2026'
category: ramblings
---

As a Gen-Z living through the housing apocalypse of the 2020s, I live in a condo, as most zoomers without a buck to their name do.

Which means the front desk is the gatekeeper for everything that arrives. Food. Packages. Family members, sometimes. The occasional confused Uber driver.

When any of those show up, the front desk rings my phone-shaped intercom. Phone-shaped, because it *is* an analog phone.

And it lives in the most inconvenient place the builder could have picked: the kitchen, at the opposite end of the apartment from the bedroom. Sixty seconds of ringing, 55m² of sprint.

I'm an engineer. I can surely engineer my way out of a home-marathon to beat a ringing phone.

---

## Wireless-ing an Analog Intercom

The thing on my kitchen wall is an analog phone wired into a PABX, masquerading as an intercom. Very common in Brazil: the building runs its own little private exchange, and every unit is an extension on it. Dial 09, you get the front desk. Dial 405, you get apartment 405.

An analog telephone invites an ATA into the story. An analog telephone adapter, the box that exists specifically to turn "old dumb analog signal" into "something a computer can route." **Grandstream HT801** or **HT802**, for example. These are dirt cheap. Dirt *dirt* cheap. The analog phone era is over, which means you can buy perfectly good ATAs in bulk for pennies on the dollar, and nobody will ask you why. The ATAs don't even care if they're connected to a real phone line or an intercom, they just want an analog line signal to digitize. Split said line between the existing phone and the ATA: the phone keeps working exactly as it always has, the ATA just gets a copy of the same signal.

Great, we're now digitizing the intercom. The next step is on the homelab: Asterisk. Some tunneling between it and my reverse proxy, because obviously the intercom box isn't getting a public IP. VoIP, SIP, the whole stack. Linphone on the client side. And one line of dialplan doing the actual work I care about: `Dial(SIP/annaPhone&SIP/girlfriendPhone,30)`. Both phones ring at once, first to answer wins, no more "did you get it, I was in the shower." Better still, it works in reverse: dial 09 from Linphone and I'm talking to the front desk from bed, my desk at work, or anywhere else in the world. No more racing across the apartment, no more walking down seven floors to ask whether the package actually arrived or the delivery guy just said the wrong number to the front desk again.

Then I looked at what I'd actually specced. An analog line, split and digitized, tunneled over the internet, terminating on multiple devices behind one address. I hadn't invented anything. I'd network-engineered my intercom straight back into 2004. Analog-to-digital, PABX to Reverse-PABX. It's the revenge of the 2000s, a decade that was all about modems, DSL and NAT. Now, the same ideas are wearing VoIP and SIP hats, calling themselves an intercom-telephone-over-IP over WiFi or 5G to a mobile phone.

It would've been perfect.

---

## Unprogrammed Obsolescence

There's a message board on the elevator. Last week, it was updated to read:

> Dearest residents,
>
> We're modernizing our communications. Deliveries and visitors will be announced through our new condo app.
>
> Please install the app — we will stop phoning you.
>
> Signed, Front Desk & Management.

Reasonable? Actually, yes. Genuinely. Apps for this exist for a reason. I was solving the same convenience problem with a lot less "condo ERP" and a lot more "digitizing telephones". They solved the problem correctly, I'd wager.

> **Intrusive Thought:** I could have then made an AI assistant answer the intercom and @ me on Discord. Front desk would have been terrified. Oh well.

Mildly infuriating anyway. My cyberpunk-adjacent, split-the-analog-line-and-Asterisk-my-way-into-two-phones-ringing-at-once plan got solved by the most 2026 answer imaginable: a mandatory app, sitting on my phone right next to the ones for iFood and Amazon deliveries.

The need evaporated before the solution shipped. There's not really a worse way for an infrastructure project to die.

---

The silver lining is that I'm moving condos in the next couple of months. If the new building doesn't already have an app, I know exactly what's going in the utility closet the first week.

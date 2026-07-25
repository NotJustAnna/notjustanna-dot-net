---
title: 'Every Port I Loved is now called USB-C'
description: 'Every cable and port from my childhood — VGA, PS/2, parallel, serial, RCA — quietly became USB, PCIe, Ethernet, or HDMI, and I have feelings about it.'
pubDate: 'Jul 24 2026'
category: tech
heroImage: '../../assets/blog/usb-c.jpg'
---

I was born in the last month of the year 2000. The Y2K bug didn't get us, thankfully.

My formative years were spent surrounded by a kind of technology that had a cable for every occasion. VCRs. DVD players. CRT TVs, then plasma TVs, which felt like the future arriving early. RCA cables. Composite. S-VIDEO. Speaker wire, bare copper twisted into terminals by hand. P2 for headphones, P10 for anything carrying *professional* audio — which is to say, audio that mattered.

Computers ran the full spread from Windows 98 to XP, and processor names did the marketing department's job for it. Celeron meant *this is a reliable computer*. Pentium meant *this computer is a workhorse*. Nobody needed a spec sheet.

The serial port took modems. And mice. The parallel port took printers, exclusively, with the devotion of a one-purpose organ. Were the serial and parallel port enemies? I never got a straight answer. The gamepad port had its own weird history tangled up with the parallel port that I refuse to look up right now, on principle. PS/2 for keyboards. A different PS/2 for mice, wearing an identical connector like a disguise. Then USB showed up — shiny, magical, undifferentiated — and everyone just... accepted it. Which in hindsight was the first sign.

VGA. DVI, if you were serious. PCI. ISA, aging out in real time. AGP, which existed for exactly one purpose: telling you your computer could play *serious* games.

---

# It is now 2026.

Everything is now WiFi, PCIe, USB, Ethernet, or HDMI/DP. That's the whole list.

Bluetooth is 2.4GHz PAN wearing a brand name, running on the same WiFi chip already doing everything else on your laptop or phone. USB carries DisplayPort now — my vertical monitor gets power and video out of a single USB-C cable, which would have sounded like a lie in 2008. Thunderbolt, the connector that used to feel like a separate tier of civilization, is just USB4: USB, PCIe, and DP, mashed together, occasionally forming a direct Ethernet link between two machines because sure, why not, it's all the same wire underneath.

WiFi does gigabit now. Ethernet does 10Gbps. USB does 40.

eGPUs exist, connecting over PCIe, via USB. You can pull more USB ports — or Thunderbolt, which is USB4 in a better suit — out of a single PCIe lane. You can get HDMI or DP out of a PCIe lane *or* a USB port (about 90% true on a laptop, some smaller and more honest percentage true on a desktop, but I'm counting it). You can get more Ethernet, or WiFi, out of either one. SSDs — genuine miracles of engineering, arguably the single best thing to happen to computing in my lifetime — connect over NVMe, over PCIe. Need power? 70W over Ethernet, 240W over USB.

Gamepad port. Parallel port. Serial port. Analog audio. All technically still alive, behind a USB adapter, like a species kept going in a single zoo enclosure. Your printer is USB or wireless. So is your gamepad. Your TV has HDMI, USB, Ethernet, and a WiFi driver, and that is the entire feature list now.

My motherboard's rear IO is a sea of identical USB ports. A hub turns that into a hundred more identical USB ports. Scale, solved. Problem, gone.

---

## The Accounting

Here's what actually happened, tallied:

| Victim | Interface | Replacement |
|--------|-----------|-------------|
| Video | VGA, DVI, HDMI | absorbed into USB and PCIe |
| Audio | P2, P10, optical | absorbed into USB |
| Storage | IDE, SATA | absorbed into NVMe and PCIe |
| Peripherals | serial, parallel, PS/2, gamepad | absorbed into USB |
| Power | barrel jacks, proprietary bricks | absorbed into USB |

Ethernet stayed Ethernet, but you get it *from* USB now if the motherboard didn't bother giving you enough of it natively.

One column grew. Every other column emptied into it.

---

## The Part I Actually Miss

I'm not saying this is bad. A Thunderbolt dock turning a laptop into a workstation with double the performance is, unavoidably, kind of cool. I grew up somewhere every one of those old cables cost triple what it should have because of import tax, so I am the last person who gets to be precious about "convenience."

I just miss the cables that had exactly one job. RCA was never going to be mistaken for anything else. A parallel cable wasn't secretly also a display cable if you plugged it in wrong. There was a glamour to that specificity — it *felt* infallible, the way a thing built for one purpose always does.

USB, HDMI, Ethernet: general-purpose, and somehow flimsier for it. Break the one USB-C port on a laptop and you've lost power, video, storage, and networking in a single shot. Break a PS/2 port and you'd lost a keyboard.

Make of that what you will.

> Cover photo by [Maxence Pira](https://unsplash.com/@maxence_pira) on [Unsplash](https://unsplash.com)
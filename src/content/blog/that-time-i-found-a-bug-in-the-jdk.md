---
title: 'That Time I Found a Bug in the JDK'
description: 'In 2019, a Discord bot crashed on Java 12. The crash was in the JDK itself. I was 18.'
pubDate: 'Jun 9 2026'
category: ramblings
heroImage: '../../assets/blog/java.jpg'
---

I was 18. Second year of CS. Minding my own business — as much business as an 18-year-old can muster — building a Discord bot in Java because building Discord bots is what the *cool kids* did in 2019, and Java because it was my favorite way to suffer. The bot used a now-defunct library called [Catnip](https://github.com/mewna/catnip), which ran on Vert.x, which ran on Netty, which talked to Discord over TLS WebSockets. Discord runs behind Cloudflare. Anyways.

Java 12 had just landed. This was new — Java 11 was the current LTS but it was early days, nobody had really settled into the LTS-or-nothing rhythm we have now, and Java 12 was right there with shiny new things. One of those shiny new things was a first-class TLSv1.3 implementation. Anyways.

My bot refused to boot on Java 12. The stack trace was 36 frames deep and the bottom of it looked like this:

```java
Caused by: javax.crypto.ShortBufferException: Output buffer too small
    at com.sun.crypto.provider.ChaCha20Cipher$EngineAEADDec.doFinal(ChaCha20Cipher.java:1360)
    at com.sun.crypto.provider.ChaCha20Cipher.engineDoFinal(ChaCha20Cipher.java:701)
```

`com.sun.crypto`. That's not my code. That's the JDK's own ChaCha20-Poly1305 implementation. The Minecraft modding debugging instincts kicked in immediately, but this time I wasn't doing shenanigans with reflection or bytecode manipulation. This was a straight-up bug in the JDK? Or maybe Cloudflare had done something weird with their TLS termination?

The Catnip devs told me to file with Netty. Netty kicked it up the stack to the JDK directly. It became [JDK-8224997](https://bugs.openjdk.java.net/browse/JDK-8224997).

The workaround was disabling either TLSv1.3 or ChaCha20-Poly1305. Worked fine. Gave me a bit of distrust toward Java's TLS implementation at the time. I figured that was the end of it.

---

## A JDK Engineer Emails Me

A few weeks later I got an email from an engineer at Oracle named Jamil. He was working on the fix and couldn't reproduce it.

I was both legitimately surprised he'd reached out to me, and legitimately sorry he'd been assigned that bug. By the time he emailed, Cloudflare had quietly changed something on their end and I couldn't reproduce it either. My logs were gone — piped from a VPS to hasteb.in, paste expired. I had nothing. All I could muster was explaining how Discord's websocket frames could get really big for large guild member lists, and that the crash only happened when the frames got big enough that Netty split them across multiple TLS records.

That was it. That was everything I had.

I was fairly convinced I was going to get yelled at. I had no business handing a JDK engineer a Discord bot reproduction with no logs, and I expected to be told that. I could tell I wasn't being helpful. Not that I could be more helpful somehow than an 18-year-old with no TLS expertise, but still.

I did not get yelled at.

Jamil emailed again a month later. Fixed. In OpenJDK mainline. Commit [34bbd91b1522](http://hg.openjdk.java.net/jdk/jdk/rev/34bbd91b1522). He thanked me for the assistance reproducing it and said it would've taken him longer without the input I'd provided.

Looking back, I handed a JDK engineer a Discord bot reproduction and somehow got away with it.

---

## What Was Actually Wrong

I'm writing this six years later, and only now do I actually understand what Jamil figured out. At the time, the fix landed and I moved on, vaguely relieved nobody had been mean to me on the internet. So this is me, finally, reading the patch.

ChaCha20-Poly1305 in AEAD decryption mode has to buffer data across `update()` calls. It can't release plaintext until `doFinal()` runs and the authentication tag verifies — that's the whole point of authenticated encryption. Correct. Expected.

The bug was in `engineGetOutputSize`, the method that sizes the output buffer *before* decryption runs. For large frames — frames big enough that Netty split them across multiple TLS records — the cipher had accumulated data across several `update()` calls before `doFinal` ran. The output buffer was sized based on only the `doFinal` input:

```java
// Java 12: wrong
Integer.max(inputLen - TAG_LENGTH, 0);

// Fixed:
Integer.max(inLen + cipherBuf.size() - TAG_LENGTH, 0);
```

`+ cipherBuf.size()`. One field. The buffer was undersized by exactly however much had been sitting in the internal buffer from previous calls. `doFinal` ran out of room. `ShortBufferException`.

For small frames it was fine. For large frames, with the specific TLSv1.3 negotiation path Cloudflare was using, it exploded. That's why it only surfaced in Java 12, only on certain servers, only under specific traffic patterns. For all I knew at the time, me and Discord and Cloudflare had collectively broken Java TLS in some unforeseen way.

The answer was six tokens in a buffer sizing formula.

I couldn't have seen that at 18. I didn't know enough about AEAD ciphers to know there *was* an internal buffer to account for. I'd read the stack trace to the bottom and gotten as far as "this isn't my code." Jamil read the same stack trace and got to `cipherBuf.size()`.

---

## The Ending

I didn't have any AI tooling. I had a 36-frame stack trace and the patience to read it to the bottom. Past that, I had Jamil — who took what little I gave him and turned it into six tokens in a buffer sizing formula, and was kind to me about it.

It's in the JDK now. Has been since 2019. Every Java installation running ChaCha20-Poly1305 AEAD decryption across a multi-call update carries that `+ cipherBuf.size()`.

Strange thing to have in your history at 18.

---

> Cover photo by [Quilia](https://unsplash.com/@heyquilia) on [Unsplash](https://unsplash.com)
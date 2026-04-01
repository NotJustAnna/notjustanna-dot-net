---
title: 'Thinking Differently About Universal Microkernels'
description: 'What if your kernel could sandbox drivers without hardware isolation, and your binaries got faster every time you upgraded your CPU?'
pubDate: 'Mar 20 2026'
category: dev
heroImage: '../../assets/blog/kernels.jpg'
---
As a not-Macbook owner, I have to yell this into the void: I really like macOS' kernel. Not macOS — XNU. The kernel underneath.

XNU's a hybrid microkernel — meaning most of the OS lives in userspace rather than baked into the kernel itself. Device drivers? Architecturally designed to be userspace programs, even if Apple doesn't always do it that way. Crash a device driver, you crash the device driver. Not the whole system. The kernel stays up. The kernel doesn't care.

Compare that to Linux, where a buggy driver can take down the entire machine because it's all in the same address space, with the same privileges, one bad pointer away from a kernel panic.

XNU's model is just... better in every way. Cleaner. The kernel does the minimum, as the SOLID gods stated on their Single Responsibility Commandment. Everything else is up to the rest of the operating system. XNU is an actual kernel rather than a cob of corn — which in Linux's case, is one fire away from exploding into popcorn.

And I would love this on my CachyOS with COSMIC desktop. I should be allowed to have bad taste in desktop environment but good taste in kernel architecture. I want my drivers isolated. I want to run whatever userspace I feel like, on x86 or ARM, and not particularly care which one I'm on. I want something like Apple's Universal Binary — one thing that runs everywhere — except _actually_ universal, not "universal between the two architectures Apple currently sells."

So Anyway, I Started ~~Blasting~~ Googling.

---

## Why Does Only Apple Get A Decent Kernel?

Actually...

Microkernels aren't a new idea. They're not even an "Think Different" idea. They've been the "obviously correct" architecture in OS research since the 1980s. The theory is sound: small trusted kernel, everything else in userspace, hardware isolation enforces the boundaries. Fewer things can go wrong. The things that do go wrong are contained.

And yet the consumer OS landscape is:

- **macOS/iOS** — XNU, hybrid microkernel ✓
- **Windows** — monolithic-ish NT kernel, practically speaking
- **Linux** — monolithic, famously so
- **Android** — Linux underneath, with a Java runtime on top

(Everything else is too niche to matter for this conversation. For now. We'll get back to it.)

### And WHY didn't microkernels win?

**The honest answer is performance.** Which is funny, because the company that makes the only mainstream microkernel OS also makes the fastest consumer laptops on the market right now. Apple proved microkernels can be fast. Apple also makes it impossible to run anything else on their hardware. Make it make sense.

But historically: early microkernel implementations (Mach, which XNU is partly based on) were slow because crossing the kernel/userspace boundary has overhead, and if your networking stack and filesystem are both in userspace, every I/O operation crosses that boundary multiple times. L4, a later microkernel, proved you could make those crossings fast enough to matter. But by then Linux had momentum and "fast enough" wasn't enough to displace it.

So we ended up in a world where the kernel architecture that makes more engineering sense, runs on the fastest and most efficient laptop hardware money can buy... which can only be obtained from the Cupertino company.

---

## "The Universal Binary"-sized Elephant in the Room

So while I was down this rabbit hole admiring XNU's architecture, I figured I'd look at the Universal Binary thing more closely. They're neat. The idea that you can ship one file that Just Works™ on both x86 and ARM is exactly the kind of "computers should be less annoying" energy I respect.

I assumed they were doing something clever under the hood. Like shipping LLVM IR and compiling to native on first run. Late-binding optimization. Your binary gets smarter when it lands on new hardware.

Reader, _they are not doing that_.

A Universal Binary is a fat binary. It contains the x86-64 version of your app. And the ARM64 version of your app. Bundled together. The OS picks the right one at launch and ignores the other half.

You're shipping two binaries in a trench coat.

The optimization is frozen at compile time. When Apple releases a new chip, your binary doesn't get smarter. It just... runs the ARM slice, which was compiled for a generic ARM target, not *your specific chip*, not *your cache hierarchy*, not anything about the actual hardware underneath it.

It's the right solution to the wrong problem. It solves "how do we run x86 apps on ARM during a transition period." It does not solve "how do we write software once and have it run optimally everywhere, forever."

I wanted the deeper solution. LLVM IR would have solved this — compile to IR, ship the IR, recompile for whatever hardware you're actually running on. Late-binding optimization. Your binary gets smarter when Apple releases a new chip. For free.
Apple literally makes the compiler that could do this. They maintain Clang. They built their own LLVM-based toolchain. They had all the pieces.
Why???

---

## Someone Already Tried This. Several Someones, Actually.

Let's set the microkernel idea on the shelf for a moment and look at the universal binary problem separately. They're going to converge, I promise. But before we get to what I think the answer is — for both — it's worth knowing that this problem has a graveyard.

Microsoft Research built **Singularity** in 2003 — an entire OS written in managed C#, where the type system replaced hardware memory protection. That's not a metaphor. The language verifier was doing the job the MMU normally does. Load-bearing C#, if you will.

It evolved into a project called Midori, got far enough to run Microsoft's search infrastructure in production, and was quietly killed in 2015. Too much to ask the world to abandon their existing software ecosystem for a managed-code utopia. Graveyard, plot one.

Then, Google built **Fuchsia** — a capability-based microkernel OS with proper driver isolation, a real component model, everything done right. It shipped briefly on the Nest Hub smart display. Then got rolled back to Linux. Now it exists in a state of quantum superposition between "advanced research" and "we'll get to sunsetting that eventually."

The pattern is consistent: build the right thing, hit the ecosystem wall, die.

But there's one entry in this space that *didn't* die, and it's interesting because of how it survived.

---

## eBPF: the idea that snuck in sideways

**eBPF** is nominally a "packet filtering" system in the Linux kernel. The name stands for "extended Berkeley Packet Filter" — very boring, sounds like a networking detail, easy to ignore.

It isn't a networking detail.

Here's what eBPF actually is: a bytecode format, a verifier, and a JIT compiler living inside the Linux kernel. You write a program, the verifier checks that it's safe (no unbounded loops, no invalid memory access, all paths terminate), and then it runs in kernel space with near-zero overhead. No ring transitions. No syscall overhead. Just verified code running at the most privileged level because the verifier already proved it can't do anything wrong.

That's the Singularity bet — type safety replacing hardware protection — except applied narrowly enough that nobody objected to merging it into mainline Linux.

And the scope of what eBPF can do keeps expanding: network processing, system call filtering, security policy enforcement, TCP congestion control, and now — as of recent Linux versions — **writing CPU schedulers**. Userspace-authored, verifier-checked code making scheduling decisions in ring 0. Meta runs their entire production infrastructure networking on eBPF. Cloudflare's DDoS mitigation runs on eBPF.

eBPF is the VM-as-OS idea that actually shipped at scale. It just wore a disguise.

---

## WebAssembly changes the equation

Here's where I think things get interesting.

**WebAssembly (WASM)** is a bytecode format originally designed for running code in browsers at near-native speed. That's its origin story. That's what it says on the tin.

I'm not interested in what it says on the tin.

WASM is defined to be safe by spec. No arbitrary pointer arithmetic. No unverified control flow. Memory accesses are bounds-checked. The verifier is part of the standard. This means: if you have a WASM runtime embedded in your kernel, and you load a driver as a WASM module, the verifier checks the driver before a single instruction executes. The driver cannot, by construction, corrupt memory it wasn't given access to.

If your brain works in the particular weird way that mine does, something just clicked together that probably shouldn't have. XNU isolates drivers through hardware address space separation. WASM isolates modules through verified bytecode. These are the same guarantee. One costs a ring transition. The other costs a verifier pass at load time.

You could just. Use WASM. As the driver sandbox. Instead of the MMU.

And while we're at it — why stop at drivers?

WASI (the WebAssembly System Interface) exists precisely to run system-level code in WASM. It's POSIX, but typed. Capability-gated. You declare what your module needs — filesystem access, network access, memory-mapped I/O — and the host grants exactly that. Nothing undeclared is accessible. Not "restricted." Not "monitored." Just. Not there.

That's not a driver sandbox. That's an entire OS component model.

A network stack as a WASM component that imports `wasi-sockets`. A filesystem driver that imports `wasi-filesystem`. A display server that imports `wasi-gpu` or whatever we'd call it. Each one verified before it runs. Each one incapable of touching what it didn't declare. Each one replaceable without touching anything else.

XNU does this with hardware isolation and a bespoke driver framework. WASM does this with a verifier and an interface definition file.

The Cupertino company spent decades building the infrastructure for this. We have a W3C spec and a Rust library.

These are not as different as they sound.

---

## Great idea. Where do we get drivers? Where do we get apps? 

Here's where the LLVM thing becomes important: the drivers and applications are just waiting to be recompiled.

WASM is a valid LLVM target. LLVM is the backend that powers Clang, Rust, Swift, Kotlin Native, and most modern compiled languages. Which means any language that compiles through LLVM can emit WASM. Not as an afterthought. As a flag you pass to the compiler.

So when someone asks "who writes the drivers for your WASM microkernel" — the answer is nobody. They're already written. In C. Sitting in the Linux kernel tree. Twenty years of accumulated hardware knowledge, weird edge cases, datasheets that lied, and fixes in comments nobody has read since 2009.

You don't rewrite them. You recompile them.

`clang --target=wasm32-wasi driver.c`. The Linux driver doesn't know it isn't on Linux. It asked for memory-mapped I/O access. It got a WASI capability that provides memory-mapped I/O access. Same semantic. Different implementation. Verified safe by construction. Sandboxed by the verifier before a single instruction executes.

Is this emulation? No. There's no semantic gap being papered over. It's just compilation with an intermediate stop that happens to give you safety, portability, and late-binding optimization as byproducts.

Late-binding as in: your kernel stores the WASM bytecode. First boot on new hardware, it recompiles everything with the LLVM backend targeting your actual CPU. AVX-512. Your specific cache hierarchy. Your branch predictor. Your five-year-old driver binary gets Zen 5 optimizations its author never knew existed.

Apple ships two frozen binaries in a trench coat. This ships one bytecode and derives the optimal binary at runtime, on your hardware, for free.

Universal Binary was the right idea. This is the actual implementation.

---

## So what would this actually look like?

A Rust microkernel — Rust because memory safety in the kernel itself matters, and because Rust has excellent embedded/bare-metal support. A small, trusted core: interrupt handling, capability-based IPC, a scheduler, physical memory management. As little as possible.

A WASM runtime (Wasmtime is embeddable as a Rust library, this is its designed use case) handling module loading, verification, and JIT compilation via Cranelift for startup speed and the LLVM backend for optimizing hot paths.

WASI as the system interface. Drivers and kernel modules are WASM components that declare their capability imports. The kernel grants capabilities at load time. A network driver imports networking hardware access. It doesn't get filesystem access. It can't even ask for it.

A persistent module store: compiled WASM cached as native artifacts per hardware profile. Recompiled when the hardware changes. Profile-guided optimization over time as the system learns which paths are hot.

POSIX compatibility as a WASM component itself — a userspace layer, not baked into the kernel. You want Linux semantics? Load the POSIX compatibility module. You want something else? Load something else. The kernel doesn't care.

The result: your COSMIC desktop, or KDE, or whatever you want, running on top of a clean microkernel with isolated drivers, on x86 or ARM, with code that gets better at running on your specific hardware over time.

---

## The wall

And... here's where I have to be honest.

This requires WebAssembly to become a serious systems target, not just a browser and edge-compute story. That's happening — slowly. The Bytecode Alliance (Mozilla, Microsoft, Fastly, Intel, Red Hat) is doing real work on WASI and the Component Model. Wasmtime is production quality-ish. The pieces exist.

But "the pieces exist" is a long way from "the ecosystem exists." Linux driver authors aren't thinking about WASM targets. Systems programmers aren't writing kernel modules in WASM-first workflows. The toolchain integration is immature. The debugging story is rough.

Meanwhile the Android black hole keeps pulling everything in. Amazon just shipped Vega OS — their escape from Android's GPL gravity — and their solution to "what's the application runtime" was JavaScript. React Native on Linux. They escaped the JVM and landed in the V8 engine. Different VM, same fundamental bet, worse type system. The ecosystem gravity is so strong that even the companies with resources to build something better keep reinventing 1996 with a different runtime.

---

## Why I'm not defeated about this

While we were busy eulogizing Singularity and Fuchsia, something quietly happened to Linux.

Someone snuck eBPF in. It now handles networking, security policy, system call filtering, TCP congestion control, and as of recent kernel versions — CPU scheduling. Someone wrote a CPU scheduler in eBPF. It merged. Linus signed off on it.

And separately, people are smuggling Rust into the kernel. Driver by driver. Not a rewrite — a slow infiltration. Memory-safe, verifiable, LLVM-native code quietly becoming acceptable in the codebase that's been C since before most of us were born.

The monolithic cob of corn is being hollowed out. Slowly. Commit by commit. By people with CVEs on their conscience and patience measured in decades.

Maybe Linux gets back to being kernel-sized someday. It wouldn't be the first time an idea took forty years to arrive.

---

> Cover photo by [Łukasz Rawa](https://unsplash.com/@lukasz_rawa) on [Unsplash](https://unsplash.com)
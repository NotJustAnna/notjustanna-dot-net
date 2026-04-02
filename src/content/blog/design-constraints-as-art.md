---
title: 'Design Constraints as Art: Maximizing Your AWS Free Tier    '
description: 'AWS has a free tier. It is weirder, more generous, and more dangerous than you think. Three years of building Lambda backends taught me how to make it sing.'
pubDate: 'Apr 02 2026'
category: dev
heroImage: '../../assets/blog/engineering.jpg'
---

There's a school of thought in creative fields — architecture, music, graphic design — that constraints produce better work than freedom. You don't write a sonnet because fourteen lines is the optimal poem length. You write a sonnet because the form forces decisions you wouldn't have made otherwise, and some of those decisions turn out to be the interesting ones.

Software doesn't get talked about this way. Instead we talk about "optimization" and "cost reduction" like they're chores — things you do after the real design is done, or when someone notices the AWS bill needs its own line item in the board deck. We treat the budget as an obstacle to the architecture, something to apologize for, not something to design *with*.

But the most elegant systems I've built weren't the ones where I had unlimited resources. They were the ones where the budget was effectively zero and the product still had to work. Start from that constraint — not as a failure mode but as a design input — and something different happens. You stop designing systems and start designing *within* systems.

This is a post about AWS's free tier. More specifically: how three years of building the cheapest possible production backends taught me that the constraints aren't obstacles to good architecture. They *are* the architecture.


---

## The Free Tier Is Weirder and More Generous Than You Think

Most people hear "AWS free tier" and think of the 12-month trial. Spin up an EC2 instance, forget about it, get a bill that makes you reconsider your career choices. That's not what I'm talking about.

AWS has an *always-free* tier. Not a trial. Not "free for your first year." Always free. And the serverless portion of it is genuinely, almost suspiciously generous.

Here's what you get for nothing, forever:

- **Lambda**: 1 million invocations/month. 400,000 GB-seconds of compute.
- **API Gateway**: 1 million HTTP API calls/month.
- **DynamoDB**: 25 GB of storage. 25 read capacity units, 25 write capacity units. (On-demand pricing has its own always-free allocation too.)
- **S3**: 5 GB storage. 20,000 GET requests. 2,000 PUT requests.
- **CloudFront**: 1 TB data transfer out. 10 million requests/month.
- **SES**: 3,000 messages/month if you're sending from Lambda.
- **Cognito**: 50,000 monthly active users. Fifty thousand. For free.

Read that Cognito number again. Fifty thousand monthly active users on the auth layer. For a SaaS product. For free. If you have fifty thousand MAU, you either have revenue to pay for auth or you have much bigger problems than a Cognito bill.

The combined effect of these isn't "you can run a toy project." It's "you can run a real SaaS product with real users and your infrastructure bill is, plausibly, zero." Not low. Zero.

I spent three years at a company that specialized in exactly this. Lambda backends, DynamoDB data stores, the whole serverless stack. We weren't doing it for fun — we were doing it because the economics are absurd and our clients liked absurd economics. And somewhere along the way, the constraints stopped being constraints and started being a design language.

---

## The Trap Doors

Not everything in AWS is this benign. There are services that look like they belong in this stack and will absolutely ruin your zero-dollar streak.

**RDS** is the big one. AWS's managed relational database service. It has a 12-month free tier — not always-free. After your first year, you're paying for a `db.t3.micro` that costs roughly $15/month doing nothing. If you started a project on RDS because "I know SQL," congratulations: your note-taking app now has a recurring bill because you didn't want to learn DynamoDB's access pattern model. The constraint was trying to tell you something.

**EC2** is the other one. If you're running Lambda and you also have an EC2 instance "for the things Lambda can't do," you've left the free tier reservation. EC2's always-free allocation is 750 hours/month of `t2.micro` — for 12 months. After that, it's metered. And if you're running something on EC2 that Lambda can't do, you should ask yourself whether you're building a serverless product or a server product that's embarrassed about it.

The rule is simple: if the service doesn't have an always-free tier, it doesn't belong in the zero-dollar stack. Treat the 12-month trials as what they are — onboarding ramps that terminate in invoices.

---

## Let's Build Something

Let's experiment with this. Say you want to build a note-taking SaaS. Markdown-based, collaborative enough, the kind of thing a developer might actually use. Let's call it *Insight Notes*.

I have no notion as to why I'd name it that.

Insight Notes needs: user authentication, a way to store and retrieve documents, a web frontend, transactional email (verification, password resets), and an API. That's it. That's most SaaS products, actually — a surprising number of them are just "auth + CRUD + a nice frontend" wearing different clothes.

Here's the stack: Cognito for auth. Lambda for the API. API Gateway to route HTTP to Lambda. DynamoDB for document storage. S3 + CloudFront for the frontend. SES for email.

Seven services. All of them have always-free tiers. All of them talk to each other natively without you writing glue code. And the total monthly cost for a product with, say, a few hundred active users?

Somewhere between "rounding error" and "the price of a coffee." If you charge a dollar a month per user, you're keeping most of those hundred dollars. That's not a side project math trick — that's a margin most SaaS companies spend years of infrastructure work trying to approach.

This is not a contrived example. This is basically every B2B SaaS with a different coat of paint — and if you can build *this* cheaply, you can build most things cheaply.

---

## One Lambda to Rule Them All

Here's the first thing three years of doing this professionally teaches you: use as few Lambdas as possible.

The instinct, especially if you're coming from microservices, is to split things up. One Lambda for auth callbacks. One for document CRUD. One for search. One for email triggers. It's tidy. It's also wrong.

Every Lambda has a cold start. The first invocation after a period of inactivity has to boot the runtime, load your code, initialize your connections. For a Node.js Lambda with reasonable dependencies, that's somewhere between 200ms and 800ms. For Java or .NET, multiply generously.

One Lambda means one cold start. One user hitting your API with any kind of regularity keeps that Lambda warm. The website doesn't feel like it's booting up a server for every request — because it effectively isn't, as long as someone used it recently enough.

Multiple Lambdas mean multiple independent cold starts. Your auth callback Lambda hasn't been invoked in an hour? Cold start. Your search Lambda? Also cold. Your user just waited 600ms for login and then another 500ms for their first search. The product feels broken and you haven't even done anything wrong — you just split your code the way the microservices blog told you to.

One Lambda. Route internally. Use `lambda-api` — a framework built specifically for this, with zero dependencies, designed around Lambda's execution model rather than retrofitted onto it. It handles the API Gateway proxy integration for you, parses requests, formats responses, and has a router that feels like Express without the thirty transitive dependencies Express brings to your cold start.

Your single Lambda receives everything, routes it, and responds. Cold start happens once, warming benefits everything.

This is the constraint producing the design. You're not choosing a monolith because monoliths are philosophically superior. You're choosing it because the cold start penalty makes the alternative feel terrible to use. The constraint said "you get one warm execution environment" and the design fell out of it.

---

## DynamoDB: The 25 GB Puzzle

DynamoDB is the most opinionated database you will ever use and it's free for 25 GB. Whether that's a gift or a curse depends entirely on whether you're willing to think about your data the way DynamoDB wants you to.

If you're coming from Postgres or MySQL, your first instinct will be to model your data relationally. You'll want foreign keys, you'll want JOINs, you'll want to normalize everything into tidy third-normal-form tables.

Your second instinct will be to search for the AWS serverless SQL solution. That's the devil speaking. Aurora Serverless exists, and it will let you write `SELECT * FROM notes WHERE user_id = ?` like a civilized person, and it will also cold start for up to 30 seconds on the first connection, bill you per ACU-hour whether you're doing anything or not, and cheerfully generate a surprise invoice the moment you get any real traffic. It is not a free tier play. It is not even a cheap play. It is a trap with a familiar interface.

So: DynamoDB. And look — the instinct to resist it is correct, because DynamoDB is genuinely strange. But strange in a way that pays off.

DynamoDB will let you design a relational model. DynamoDB will then punish you for it at read time, slowly, expensively, and without remorse. What it wants instead is single-table design. It wants you to think about your access patterns *first* and your data model *second*. How will Insight Notes be queried? By user ID. By document ID. By user ID sorted by last modified. That's three access patterns, and if you're clever about your partition key and sort key, that's one table.

For Insight Notes, that table might look like this:

| PK | SK | Data |
|---|---|---|
| `USER#anna` | `PROFILE` | `{ email, name, created }` |
| `USER#anna` | `NOTE#01JADX...` | `{ title, content, updated }` |
| `USER#anna` | `FOLDER#work` | `{ name, color, created }` |
| `USER#anna` | `NOTE#01JADX...#META` | `{ folder: "work", tags: [...] }` |

The raw key structure is what DynamoDB actually stores. What you write in code looks considerably more civilized — `dynaorm` is a type-safe client that handles marshaling and unmarshaling, validates your items against a Zod schema before they touch the database, and gives you a fluent query builder so `.query().wherePK("USER#anna").whereSK("begins_with", "NOTE#")` does exactly what it looks like. The constraint forced the data model. The library makes the data model livable.

Everything for one user lives under one partition key. Getting all of a user's notes is a single query. Getting a specific note is a point read. Getting all notes in a folder requires a secondary index or a filter — and this is where the design constraint forces you to think about access patterns *before* you write a single line of code. In Postgres, you'd add a `WHERE folder_id = ?` and not think about it. In DynamoDB, that query either needs to be modeled into the table structure or it costs you an index. Which means you design around how you read, not how you write. Which — and this is the art part — often produces a better data model than the relational one, because you're forced to think about actual user experience instead of abstract data relationships.

The 25 GB free tier sounds small until you do the math. A markdown document is text. Text is small. At 3 KB average per note — title, content, metadata, organizational data — 25 GB holds roughly 8 million notes. That's not a toy constraint. That's a constraint most products will never actually reach.

The real constraint is throughput, not storage. 25 read capacity units and 25 write capacity units is roughly 25 strongly-consistent reads per second for items up to 4 KB, and 25 writes per second for items up to 1 KB. For Insight Notes with a few hundred users, that's fine. For thousands of concurrent users all editing simultaneously — you'll need on-demand capacity, which still has a free allocation but works differently.

The point is: the limit makes you think. Think about item size. Think about access patterns. Think about what "enough" means for your actual product, not some hypothetical scale you haven't earned yet.

---

## The Frontend: Smaller Is Literally Cheaper

S3 + CloudFront for static hosting is standard. What's less obvious is that the free tier makes your frontend size a *financial* concern, not just a performance one.

5 GB of S3 storage is plenty for a frontend. But 20,000 GET requests per month means every asset your page loads counts against a real number. And while CloudFront's 10 million requests and 1 TB transfer are generous, the S3 origin requests behind it aren't free once you exceed the allocation.

So your React bundle size isn't just a Lighthouse score. It's a line item. Fewer assets, smaller bundles, aggressive caching headers — these aren't best practices you should get around to someday. They're the difference between a zero-dollar bill and a not-zero-dollar bill.

This is where the constraint does its best work. You were *supposed* to ship a smaller frontend. You were *supposed* to set proper cache headers. You were *supposed* to lazy-load that charting library nobody uses on the landing page. The free tier just gave you a reason that shows up on an invoice instead of a performance audit.

---

## The Part Where Autoscaling Tries to Bankrupt You

Here's a thing about serverless that nobody warns you about until it's too late.

Traditional servers crash under load. That's bad, but it's also a natural circuit breaker. Your server falls over, users get errors, you wake up and fix it. There's a ceiling.

Lambda doesn't crash under load. Lambda scales. Automatically. To whatever your concurrency limit allows. A thousand concurrent invocations? Lambda will handle it. Ten thousand? Sure, if your account limit permits. DynamoDB on-demand? Scales to meet the request rate. API Gateway? Routes it all through.

This is excellent until someone writes a bot that hits your API ten million times in a day. Or until a legitimate usage spike pushes you past the free tier allocation on every service simultaneously. Or until a misconfigured retry loop in your own frontend hammers your own backend at scale.

The traditional server would have crashed. Your bill would have been zero because the server was down. The serverless stack stays up. The serverless stack *scales to meet the demand*. The serverless stack sends you a bill for meeting that demand.

You need rate limiting. You need it at the API Gateway level (throttling is built in, configure it). You need it at the application level (per-user, per-endpoint, per-operation). You need CloudFront caching in front of everything that can be cached, not for performance but for cost containment. You need billing alerts — AWS lets you set them, and you should set them at thresholds that make you uncomfortable, like $1 and $5 and $10, because the jump from $0 to $50 happens fast when the constraint you relied on was "nobody's using this yet."

Caching, rate limiting, and billing alerts aren't operational maturity for a zero-dollar product. They're structural requirements. The system doesn't crash anymore. Which means the system doesn't stop you from spending money anymore. That's your job now.

---

## The Deal With the Devil

I've spent this entire post talking about AWS services like they're building blocks in a design exercise. And they are. But I need to be honest about what you're actually doing when you build this way, because the constraint-as-art metaphor has a dark edge.

This stack — Lambda, API Gateway, DynamoDB, S3, CloudFront, SES, Cognito — is not "cloud-native." It's *AWS-native*. There's a difference, and the difference matters.

DynamoDB is not Postgres. Your single-table design, your GSIs, your DynamoDB Streams triggers — none of that transfers to Azure or GCP or your own hardware. Lambda's execution model, its cold start characteristics, its integration with API Gateway — those are AWS implementation details dressed up as abstractions. Cognito's user pools, its hosted UI, its token format — AWS-specific.

If you build Insight Notes on this stack and then decide to move to a different cloud provider, you are rewriting most of your backend. Not migrating. Rewriting. The data model changes because DynamoDB's model is DynamoDB's. The auth layer changes because Cognito is Cognito. The compute model changes because Lambda is Lambda.

This is the deal. AWS gives you an extraordinarily generous free tier on services that are extraordinarily specific to AWS. The generosity and the lock-in are the same feature. They want you to build something real on their platform, for free, because they know that "for free" becomes "too expensive to move" once your product has users and your data model is shaped like DynamoDB.

And here's the part that makes the deal complicated rather than simple: for a lot of products, this is fine. Insight Notes doesn't need multi-cloud portability. Most SaaS products don't. The exit cost is real, but the exit is hypothetical, and the operational cost of *not* using the purpose-built services — of running your own Postgres on EC2, your own auth on a container, your own email infrastructure — is higher than the lock-in cost for any product that isn't planning to leave AWS.

The constraint is: you're building on AWS's terms. The art is knowing that, choosing it deliberately, and designing within those terms rather than pretending they don't exist. Don't use DynamoDB and then complain that it's not Postgres. Don't use Lambda and then complain about cold starts. You chose these. They chose you back.

---

## $200 and a Plan

AWS gives you $200 in credits when you sign up. Combined with the always-free tier, that's not a toy budget. That's "launch a product, get your first paying customers, and let the revenue catch up to the infrastructure" budget.

The credits cover the things the free tier doesn't — the occasional Lambda burst that exceeds 1M invocations, the DynamoDB spike during a product launch, the SES costs once you're sending more than 3,000 emails/month. Think of the credits as the buffer between "this is free" and "this costs money but the money is mine now."

Most products that fail don't fail because of infrastructure costs. They fail because nobody used them. The serverless free tier means infrastructure costs are the last thing that kills you, which means you get to fail for the right reasons instead.

---

There's something deeply satisfying about building a system where every design decision has a reason and half those reasons are "because the free tier works this way." It's like writing a sonnet, except the meter is measured in Lambda invocations and the rhyme scheme is your DynamoDB access patterns.

The constraints are real. The lock-in is real. The risk of accidentally autoscaling yourself a bill is real. But the product is also real, and it cost you nothing to build, and the decisions the constraints forced on you — one Lambda, single-table design, tiny frontend, aggressive caching — are decisions you should have been making anyway.

Design constraints as art. AWS as the medium. Your invoice as the critic.

Just set up rate limiting first.

> Cover photo by [© This is Engineering](https://unsplash.com/@thisisengineering) on [Unsplash](https://unsplash.com)
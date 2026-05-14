---
title: 'SQL Is Fine. The Problem Is That We Kept It.'
description: 'SQL survived every replacement attempt not because it won, but because its challengers attacked the wrong layer.'
pubDate: 'May 28 2026'
category: dev
heroImage: '../../assets/blog/mysql.jpg'
---

SQL was designed in 1973. It is younger than C by two years and older than C++ by six. It shares conceptual DNA with COBOL and Pascal.

It is also the interface for almost every serious database in production today.

This is not because it's good.

---

## The Challengers

MongoDB said no more SQL. Redis said no more SQL. RethinkDB said no more SQL. CouchDB, Cassandra, DynamoDB — the entire NoSQL wave of the 2010s was built on the premise that SQL was the problem and that removing it would fix something.

The thing is, "SQL" was three things at once: a data model, a set of consistency guarantees, and a wire protocol. The NoSQL wave attacked the bundle. Most of them dropped joins. Most of them dropped transactions. Most of them dropped referential integrity. A few of them — the ones that survived — found legitimate use cases where those tradeoffs made sense.

None of them dropped the part that was actually causing pain.

Which is: we are serializing queries as plain text and shipping them over a socket like it's 1978.

---

## The Compatibility Argument, Which Doesn't Hold

I can hear a university professor yelling from the rooftop of the nearest university building:

> "SQL is portable. Write once, run anywhere."

I'd like to point out: MySQL SQL. MariaDB SQL. H2 SQL. SQLite SQL. PostgreSQL SQL. Microsoft SQL Server SQL. Oracle SQL.

If these are the same language, then Spanish, Italian, Portuguese, French, and Romanian are the same language. All of them support `SELECT * FROM users WHERE name = 'John'`, but that's not very different from saying that all the romance languages support greeting someone. The surface is the same. The details are not.

The compatibility argument is a reason to keep the relational model. It is not a reason to keep SQL.

---

## The Thesis, Stated Plainly

> The query should be a value in the host language, not a string.

That's the whole post. Everything below is examples and evil plans to get there.

---

## ReQL Got It Right For The Wrong Reasons

RethinkDB's ReQL was the closest anyone has come. The query language wasn't a language. It was a first-class API in the host language that built a query tree and serialized it as structured data.

`r.table("users").filter({name: "John"})` is an object. Not a string. It's ReQL's AST representing the query. It composes safely. It has no injection surface. It can be introspected without parsing. It's a query builder that isn't pretending to be a compiler; it's just building a tree.

RethinkDB lost anyway — not because ReQL was wrong, but because it came bundled with "also abandon your relational model and your existing schema." The market read "no SQL" and heard "start over." Which was the wrong ask.

ReQL was the right idea attached to the wrong migration.

---

## Prisma Is Getting There By Accident

Prisma started as "GraphQL for databases." Then it rewrote itself so GraphQL was the wire between the client and an in-process query engine. Now it's rewriting itself again to be a structured query builder that generates SQL, without the GraphQL round-trip.

Three rewrites, each one closer to the same answer.

`prisma.user.findMany({ where: { active: true } })` is the right interface. The query is a value in TypeScript. It composes. It type-checks. It can't be injected into. The problem is that Prisma then has to serialize the value into a SQL string, ship the string over the wire, and have Postgres parse it back into a tree on the other side.

The query is a tree on the client. It's a tree on the server. In between, for no reason anyone can defend, it becomes a string.

This is the whole problem, in miniature.

---

## This Isn't Anyone's Fault In Particular

It's tempting to point at Postgres here, since Postgres is what most of us actually use. But Postgres maintainers are doing extremely difficult work on an extremely stable system, and "change the wire protocol" is the kind of proposal that should get politely declined. It would be correct of them to decline it.

The same is true of MySQL. And MariaDB. And SQLite. And H2. Every one of these projects has a wire protocol that ships SQL strings, every one of them has an ecosystem that depends on that protocol behaving exactly the way it does, and every one of them would be making an unforced error by moving first. Microsoft or Oracle's SQL servers might be able to pull it off, but they would first need to have an incentive to do so.

The maintainers aren't the problem. The maintainers are doing their job.

The problem is that "every maintainer is correct" and "the wire protocol is bad" are both true at the same time, and neither of those facts moves on its own. The first vendor to add structured queries eats the cost of maintaining two wire formats forever. The reward for going first is that everyone else gets to copy you later, for free. That's not a deal anyone in their right mind takes.

Which is why nobody has.

---

## We Should Embrace-Extend-Extinguish SQL

Let's embrace Microsoft's favorite playbook for winning standards wars.

**Embrace.** Add structured queries as an *optional* wire format in Postgres. Existing SQL clients keep working. New clients can opt in. Nothing breaks. Prisma, Drizzle, every ORM with a query AST suddenly has a way to skip the string round-trip.

**Extend.** Build features that only work on the structured path. Better error messages — column references resolved to source positions in the AST. Better introspection — query plans returned alongside results without re-parsing. Better composition — fragments that compose at the AST level instead of by string concatenation. None of this is possible on the string path. All of it is easy on the tree path.

**Extinguish.** The string path becomes the compatibility mode. New tooling targets the structured path because that's where the features are. Old tooling keeps working forever, because that's what compatibility modes do. Twenty years later, SQL is what you write when you're typing into psql by hand, and nothing else.

This would take a decade. Possibly two. It would take a database vendor with the headcount to maintain two wire formats indefinitely, the discipline to keep the structured one strictly better, and the patience to wait out the ecosystem. Microsoft pulled EEE off because Microsoft had thousands of engineers and unlimited time.

Almost nobody else does. Someone call Microsoft and ask them, politely, with a bag of money.

---

SQL will outlive most of us. Not because it's good. Because the thing that would replace it requires a database vendor, an ORM ecosystem, and roughly every backend developer alive to coordinate around a wire-protocol change, and that's not how infrastructure changes. It changes in ratchets.

The ratchet exists. Nobody's going to pull it.

... unless you're Microsoft and you want to sell more more SQL Server licenses.

> Cover photo by [Jaffer Nizami](https://unsplash.com/@sonofara) on [Unsplash](https://unsplash.com)
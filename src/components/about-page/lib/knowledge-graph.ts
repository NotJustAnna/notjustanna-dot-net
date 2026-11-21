import { K, knowledgebase, type Knowledge } from "./knowledge";

/**
 * The "I already worked with…" explorer's data: categories in display order,
 * one node per technology, hand-curated "goes with" pairs, and context notes.
 *
 * Pairs and notes reference entries in `K` directly, so a typo or a removed
 * technology fails type-checking instead of silently dropping a link.
 */

export type CategoryId = keyof typeof knowledgebase;

type CategoryMeta = {
  id: CategoryId;
  label: string;
  /** Shown in the summary by default; the rest sit behind a "show more" button. */
  inSummary?: boolean;
};

/** Display order and copy for the summary rows. */
const CATEGORY_META: CategoryMeta[] = [
  { id: "backend", label: "Back-end", inSummary: true },
  { id: "frontend", label: "Front-end", inSummary: true },
  { id: "languages", label: "Languages", inSummary: true },
  { id: "development", label: "Dev tools" },
  { id: "ai", label: "AI tools", inSummary: true },
  { id: "deployment", label: "Deployment", inSummary: true },
  { id: "aws", label: "AWS" },
  { id: "collaboration", label: "Collaboration" },
  { id: "databases", label: "Databases" },
  { id: "embedded", label: "Embedded" },
];

export type Node = Knowledge & {
  id: string;
  /** Every category it's listed under, in display order (DynamoDB is both AWS and a database). */
  categories: CategoryId[];
};

export type Category = CategoryMeta & {
  /** In the order `knowledge.ts` lists them: spotlight first, so the summary row leads with the headliners. */
  nodes: Node[];
  /** How many of `nodes` are featured (the spotlight); the summary row shows these and folds the rest. */
  featured: number;
};

const slug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/** One node per technology, keyed by name: the same tech listed twice (AWS + Databases) is one node. */
const byName = new Map<string, Node>();
const nodeFor = (k: Knowledge) => {
  let node = byName.get(k.name);
  if (!node) {
    node = { ...k, id: slug(k.name), categories: [] };
    byName.set(k.name, node);
  }
  return node;
};

export const categories: Category[] = CATEGORY_META.map((meta) => {
  const group = knowledgebase[meta.id] as Record<string, Knowledge[]>;
  const nodes = Object.values(group).flat().map(nodeFor);
  for (const node of nodes) if (!node.categories.includes(meta.id)) node.categories.push(meta.id);
  // Categories without a spotlight ("all") are small enough to show in full.
  const featured = (group.spotlight ?? group.all ?? nodes).length;
  return { ...meta, nodes, featured };
});

export const categoryById = new Map(categories.map((c) => [c.id, c]));

export const nodes: Node[] = [...byName.values()];
export const nodeById = new Map(nodes.map((n) => [n.id, n]));

/* ------------------------------------------------------------------------ */
/* Pairs: undirected "goes with". Edit freely; each line is one connection.  */
/* ------------------------------------------------------------------------ */

const { aws, backend: be, collab, db, deploy, dev, embedded: emb, frontend: fe, lang, ai } = K;

const PAIRS: [Knowledge, Knowledge][] = [
  // Languages
  [lang.java, be.spring], [lang.java, be.micronaut], [lang.java, be.helidon], [lang.java, be.jdbi],
  [lang.java, dev.gradle], [lang.java, dev.intellij], [lang.java, aws.corretto], [lang.java, lang.kt],
  [lang.kt, dev.gradle], [lang.kt, dev.intellij], [lang.kt, be.micronaut], [lang.kt, be.spring],
  [lang.ts, lang.js], [lang.ts, dev.nodeJs], [lang.ts, fe.react], [lang.ts, be.nestjs], [lang.ts, be.prisma],
  [lang.ts, be.typeorm], [lang.ts, fe.vite], [lang.ts, dev.bun], [lang.ts, fe.astro], [lang.ts, fe.nextjs],
  [lang.ts, dev.rxjs], [lang.ts, dev.webstorm], [lang.ts, dev.vsCode],
  [lang.js, dev.nodeJs], [lang.js, be.express], [lang.js, fe.html5], [lang.js, fe.css3], [lang.js, dev.webpack],
  [lang.js, dev.npm], [lang.js, be.sequelize], [lang.js, dev.electron],
  [lang.lua, lang.c], [lang.lua, lang.kt],
  [lang.c, lang.cpp], [lang.c, emb.arduino], [lang.c, dev.linux], [lang.c, dev.wasm],
  [lang.cpp, emb.arduino], [lang.cpp, dev.wasm],
  [lang.bash, dev.linux], [lang.bash, dev.ssh], [lang.bash, lang.pwsh],
  [lang.go, dev.docker], [lang.go, deploy.kubernetes], [lang.go, deploy.terraform],

  // Back-end
  [be.express, dev.nodeJs], [be.express, be.fastify],
  [be.fastify, dev.nodeJs], [be.fastify, lang.ts],
  [be.graphql, fe.react], [be.graphql, dev.nodeJs], [be.graphql, be.nestjs], [be.graphql, dev.insomnia], [be.graphql, dev.postman],
  [be.jdbi, db.postgres],
  [be.ktor, lang.kt], [be.ktor, dev.gradle], [be.ktor, be.spring],
  [be.micronaut, dev.gradle], [be.micronaut, dev.graalvm],
  [dev.graalvm, lang.java], [dev.graalvm, lang.kt],
  [be.nestjs, be.typeorm], [be.nestjs, dev.nodeJs], [be.nestjs, be.prisma],
  [be.prisma, dev.nodeJs], [be.prisma, db.postgres], [be.prisma, db.mysql], [be.prisma, db.sqlite],
  [be.sequelize, db.mysql], [be.sequelize, db.postgres], [be.sequelize, db.mariadb],
  [be.serverless, aws.lambda], [be.serverless, aws.apigateway], [be.serverless, aws.cloudformation], [be.serverless, aws.dynamodb],
  [be.spring, dev.gradle], [be.spring, db.postgres],
  [be.typeorm, db.postgres], [be.typeorm, db.mysql],

  // Databases
  [db.postgres, aws.aurora], [db.mysql, aws.aurora], [db.mysql, db.mariadb],
  [db.mongodb, dev.nodeJs], [db.rethinkdb, lang.java], [db.sqlite, dev.bun], [dev.redis, dev.nodeJs],

  // AWS
  [aws.lambda, aws.apigateway], [aws.lambda, aws.dynamodb], [aws.lambda, aws.sqs], [aws.lambda, aws.sns],
  [aws.lambda, aws.s3], [aws.lambda, aws.cloudwatch], [aws.lambda, aws.iam], [aws.lambda, aws.polly],
  [aws.apigateway, aws.cognito],
  [aws.cloudfront, aws.s3], [aws.cloudfront, aws.route53],
  [aws.s3, aws.polly],
  [aws.ec2, aws.vpc], [aws.ec2, aws.iam], [aws.ec2, aws.cloudwatch],
  [aws.ecs, aws.ecr], [aws.ecs, dev.docker], [aws.eks, deploy.kubernetes], [aws.eks, aws.ecr],
  [aws.codebuild, aws.codepipeline], [aws.codebuild, aws.ecr],
  [aws.ses, aws.sns], [aws.sqs, aws.sns], [aws.ssm, aws.iam],
  [aws.bedrock, ai.claudeCode], [aws.polly, ai.whisper],

  // Deployment
  [deploy.terraform, deploy.aws], [deploy.terraform, deploy.cloudflare], [deploy.terraform, deploy.oracle],
  [deploy.kubernetes, dev.docker], [deploy.kubernetes, deploy.k3s], [deploy.kubernetes, deploy.argocd], [deploy.kubernetes, deploy.traefik],
  [deploy.k3s, deploy.traefik], [deploy.k3s, deploy.oracle], [deploy.k3s, emb.rpi],
  [deploy.argocd, dev.git],
  [deploy.ghactions, collab.github], [deploy.ghactions, dev.docker],
  [deploy.crowci, collab.gitlab], [deploy.crowci, dev.docker], [deploy.crowci, dev.podman],
  [deploy.jenkins, lang.java], [deploy.jenkins, dev.docker], [deploy.jenkins, deploy.sonarqube],
  [deploy.circleci, collab.github], [deploy.travisci, collab.github],
  [deploy.teamcity, dev.intellij],
  [deploy.traefik, dev.docker], [deploy.traefik, dev.podman],
  [deploy.portainer, dev.docker],
  [deploy.ansible, dev.ssh], [deploy.ansible, dev.linux], [deploy.ansible, deploy.ubuntu], [deploy.ansible, deploy.debian],
  [deploy.ubuntu, dev.linux], [deploy.ubuntu, deploy.debian], [deploy.debian, dev.linux], [deploy.debian, emb.rpi],
  [deploy.cloudflare, aws.route53],
  [deploy.oracle, dev.podman],

  // Dev tools
  [dev.docker, dev.podman], [dev.docker, dev.nginx],
  [dev.podman, dev.linux],
  [dev.bun, dev.nodeJs],
  [dev.nodeJs, dev.npm], [dev.nodeJs, dev.yarn], [dev.nodeJs, dev.pnpm],
  [dev.npm, dev.yarn], [dev.npm, dev.pnpm],
  [dev.git, collab.github], [dev.git, collab.gitlab], [dev.git, collab.bitbucket],
  [dev.gradle, dev.intellij],
  [dev.intellij, dev.webstorm],
  [dev.vsCode, ai.copilot],
  [dev.figma, fe.react],
  [dev.insomnia, dev.postman],
  [dev.playwright, dev.puppeteer], [dev.playwright, lang.ts], [dev.puppeteer, dev.nodeJs],
  [dev.ssh, dev.linux], [dev.ssh, dev.tailscale],
  [dev.tailscale, dev.linux], [dev.tailscale, emb.rpi],
  [dev.webpack, fe.react], [dev.webpack, dev.npm],
  [dev.rolldown, lang.ts], [dev.rolldown, fe.vite],
  [dev.electron, dev.nodeJs], [dev.electron, fe.react],
  [dev.nginx, dev.linux],
  [dev.linux, emb.rpi],

  // Front-end
  [fe.astro, fe.vite], [fe.astro, fe.react], [fe.astro, fe.tailwind],
  [fe.react, fe.vite], [fe.react, fe.nextjs], [fe.react, fe.mui], [fe.react, fe.shadcn], [fe.react, fe.tailwind],
  [fe.shadcn, fe.tailwind],
  [fe.tailwind, fe.css3],
  [fe.sass, fe.css3], [fe.sass, fe.bootstrap], [fe.sass, fe.bulma],
  [fe.bootstrap, fe.css3], [fe.bootstrap, fe.html5],
  [fe.bulma, fe.css3],
  [fe.materialize, fe.css3], [fe.materialize, fe.html5],
  [fe.html5, fe.css3],

  // Collaboration
  [collab.github, ai.copilot],
  [collab.bitbucket, collab.jira], [collab.bitbucket, collab.confluence],
  [collab.jira, collab.confluence], [collab.jira, collab.slack], [collab.jira, collab.trello],
  [collab.confluence, collab.bookstack],
  [collab.mattermost, collab.gitlab],
  [collab.gather, collab.zoom], [collab.gworkspace, collab.zoom],

  // AI tools
  [ai.claudeCode, ai.mcp], [ai.claudeCode, dev.vsCode],
  [ai.pi, ai.openrouter], [ai.pi, ai.museSpark],
  [ai.openrouter, ai.museSpark],
  [ai.cursor, dev.vsCode], [ai.cursor, ai.mcp],
  [ai.antigravity, dev.vsCode],

  // Embedded
  [emb.arduino, emb.rpi],
];

/* ------------------------------------------------------------------------ */
/* Context: what I actually did with it. Plain lines, or a line that points  */
/* at other technologies (rendered as links into the explorer): `{}` marks   */
/* where the links go; without it they're appended in parentheses.           */
/* ------------------------------------------------------------------------ */

export type Note = string | { text: string; see: Knowledge[] };

const CONTEXT: [Knowledge, Note[]][] = [
  [aws.s3, ["Static websites", "Presigned uploads", { text: "AWS machinery", see: [aws.polly] }]],

  // AWS
  [aws.lambda, [
    "Whoever invented it deserves a prize",
    { text: "Crawlers and fetch scripts, crons, batched {} processing: if something needs gluing on AWS, Lambda can probably glue it", see: [aws.sqs] },
    { text: "Usually offloads work you shouldn't be wasting an {} on", see: [aws.ec2] },
  ]],
  [aws.cloudfront, ["Nobody has built a better CDN"]],
  [aws.route53, ["Wouldn't trust my DNS to anyone else at this point"]],
  [aws.corretto, ["My JVM of choice, for reasons I can't fully explain"]],
  [aws.dynamodb, ["Good, cheap key-value", "A great place for structured config you need to change in a pinch"]],
  [aws.cognito, ["A serverless Keycloak replacement, and I love it for that"]],
  [aws.ec2, ["Deployed all manner of things on it, from VPNs to bastions"]],
  [aws.ecs, ["Fine, especially when containers need to scale fast and easily"]],
  [aws.eks, [{ text: "A very good flavour of {}", see: [deploy.kubernetes] }]],
  [aws.ecr, ["Glad it exists"]],
  [aws.sqs, [{ text: "Great, especially batched behind {}", see: [aws.lambda] }]],
  [aws.sns, ["Wiring up push to Firebase and Apple is a pain; once it's done, apps just work"]],
  [aws.ses, ["Used for everything from a team-wide VPN rollout to a gateway for anything that needed SMTP"]],
  [aws.bedrock, [{ text: "Only held back by {} existing; otherwise I love having AWS bill for token usage", see: [ai.openrouter] }]],
  [ai.pi, [{ text: "My harness of choice for talking to model APIs, usually through {}", see: [ai.openrouter] }]],
  [dev.vsCode, ["Editor of choice. Fits everything, including writing this blog"]],

  // Dev tools
  [dev.intellij, [{ text: "Hard to make the case for a full IDE these days: with AI in the loop, a light editor like {} does the job", see: [dev.vsCode] }]],
  [dev.webstorm, [{ text: "Hard to make the case for a full IDE these days: with AI in the loop, a light editor like {} does the job", see: [dev.vsCode] }]],
  [dev.nodeJs, [{ text: "For when it's serious and has to be reliable; {} when I want a single binary", see: [dev.bun] }]],
  [dev.bun, [{ text: "For when I want a single binary; {} when reliability matters more", see: [dev.nodeJs] }]],
  [dev.docker, [{ text: "Still king when things need to just work; {} when I want deep systemd integration", see: [dev.podman] }]],
  [dev.podman, [{ text: "Best when you want deep systemd integration; {} when things need to just work", see: [dev.docker] }]],
  [dev.graalvm, ["Native Image is genuinely great, once you survive getting it to build"]],
  [dev.pnpm, ["Package manager of choice"]],
  [dev.npm, [
    "Published several packages to the registry",
    { text: "For installs, I reach for {} instead these days", see: [dev.pnpm] },
  ]],
  [dev.yarn, [{ text: "Reach for {} instead these days", see: [dev.pnpm] }]],
  [dev.rolldown, ["Bundler of choice. Where JavaScript bundling should be headed"]],
  [dev.webpack, [{ text: "No reason to pick it in 2026; everything should be moving to {}", see: [dev.rolldown] }]],
  [dev.electron, [
    "Know my way around it, but it's heavy",
    "Quick-and-dirty app prototyping still lacks a good answer: React Native gets closer, but trades a heavy runtime for a heavy build",
  ]],
  [dev.playwright, ["Testing, scraping and PDF generation"]],
  [dev.puppeteer, ["Testing, scraping and PDF generation"]],
  [dev.tailscale, ["How I reach my servers", "A very decent product, all things considered"]],
  [dev.nginx, ["Still my go-to for static asset hosting"]],
  [dev.redis, ["Used for what it is: key-value in RAM over TCP. Occasionally a quick pub/sub"]],
  [dev.wasm, ["Big fan. Compile it to a binary, run it in a secure sandbox"]],
  [dev.insomnia, [{ text: "Better single-developer experience than {}, worse for collaboration", see: [dev.postman] }]],
  [dev.postman, [{ text: "Better for collaboration; {} wins for solo work", see: [dev.insomnia] }]],

  // Deployment
  [deploy.aws, ["The cloud to be on, for better or for worse"]],
  [deploy.terraform, ["The IaC tool"]],
  [deploy.kubernetes, [
    "Still great for high availability",
    { text: "Just make sure you have a reason: HA, three or more clusters, possibly {}, and the budget for it", see: [aws.eks] },
  ]],
  [deploy.ubuntu, [{ text: "Ubuntu or {}? Depends on how stable the machine needs to be", see: [deploy.debian] }]],
  [deploy.debian, [{ text: "Debian or {}? Depends on how stable the machine needs to be", see: [deploy.ubuntu] }]],
  [deploy.crowci, ["The best option right now for self-hosted CI"]],
  [deploy.traefik, ["Reverse proxy of choice"]],
  [deploy.argocd, [{ text: "Would deploy it again on {}", see: [deploy.kubernetes] }]],
  [deploy.cloudflare, ["Wouldn't turn down a job over it"]],
  [deploy.oracle, ["Know my way around it, mostly thanks to the free tier", "Wouldn't turn down a job over it"]],
  [deploy.ansible, ["Used it; would port away from it as soon as possible"]],
  [deploy.portainer, ["Used it; would port away from it as soon as possible"]],

  // Collaboration
  [collab.github, ["Planned to leave; GHCR kept me"]],

  // Front-end
  [fe.vite, ["The de facto standard for anything web today"]],
  [fe.astro, ["For when the content is static and crawlability and SEO matter", "This site runs on it"]],
  [fe.react, ["Favourite way to make things on the web interactive"]],
  [fe.tailwind, ["Love it. Perfectly opinionated, to the point where a class like mx-6 is actually reasonable"]],
  [fe.shadcn, ["The best way to make a quick-and-dirty site look great"]],

  // Databases
  [db.sqlite, ["The best database for anything local"]],
  [db.postgres, ["The best database for anything distributed"]],

  // Embedded
  [emb.arduino, [{ text: "When timing matters; {} when computing does", see: [emb.rpi] }]],
  [emb.rpi, [{ text: "When computing matters; {} when timing does", see: [emb.arduino] }]],

  // Languages
  [lang.kt, [
    "My main language",
    "Multiplatform is the killer feature; currently porting a Java codebase to Kotlin Common",
    "Coding agents write it remarkably well, which only widens the gap",
  ]],
  [lang.java, [
    { text: "Last chosen to keep a jpackage build as small as possible, trading DX for size by dropping the {} stdlib", see: [lang.kt] },
  ]],
  [lang.ts, [{ text: "Default for anything JS-shaped: compile with tsc or, preferably, bundle with {}", see: [dev.rolldown] }]],
  [lang.js, [{ text: "Only for raw Node scripts, and even then with JSDoc types in {}", see: [dev.vsCode] }]],
  [lang.c, ["Shows up wherever firmware does"]],
  [lang.cpp, ["Shows up wherever firmware does"]],
  [lang.go, [
    { text: "Made it clear why so much OS and networking software, {} included, is written in Go", see: [dev.docker, deploy.traefik] },
  ]],
  [lang.lua, ["The embedded scripting language. Also makes a great configuration format"]],
  [lang.pwsh, ["Scripting on Windows"]],
  [lang.bash, ["Keeps the infrastructure running in a lot of my deploys"]],

  // AI tools
  [ai.claudeCode, [
    "Daily driver",
    "Multi-agent setups: subagents, and named agents talking to each other",
    "Plenty of non-coding automation too",
  ]],
  [ai.openrouter, [
    "Where I go model-hopping: testing providers and new models before settling on one",
    { text: "Where I first used TypeSafe's Jev, and found {}'s Clef and Clairic", see: [deploy.cloudflare] },
  ]],
  [ai.museSpark, ["A relationship of convenience, courtesy of Meta's Contributor pricing"]],
  [ai.ollama, [
    "For running models locally, and for keeping up with what people are running these days",
    "Run it on both CPU and GPU; fine for a quick local deployment",
  ]],
  [ai.mcp, ["The whole spectrum: using servers from my agents, wiring a harness to consume them, and writing my own"]],
  [ai.cursor, ["Used it. Composer models look decent; I'd use it again if a team standardised on it"]],
  [ai.antigravity, ["Used it; I'd use it again if a team standardised on it"]],
  [ai.copilot, ["Used it. Not a fan"]],
  [ai.whisper, ["Mass transcription of audio and video, for further LLM processing"]],
  [aws.polly, ["Reading text aloud"]],

  // Back-end
  [be.spring, [
    "Where most of my backend-heavy apps live",
    { text: "For ad-hoc HTTP servers I reach for {} instead", see: [be.ktor] },
  ]],
  [be.micronaut, [
    { text: "My pick when milliseconds are money: with {}, boot times get absurd", see: [dev.graalvm] },
    { text: "First-class DI for Java, without the weight of {}", see: [be.spring] },
    "Best fit: something HTTP-shaped with a lot of moving parts",
  ]],
  [be.ktor, [
    { text: "A natural fit for {}/Native", see: [lang.kt] },
    "Solid for what it is; happy to work on anything built with it",
  ]],
  [be.graphql, ["My pick when the data is mostly relationships, and lots of them"]],
  [be.jdbi, [
    "The right abstraction over JDBC, no more, no less",
    "Ideal when an app lives and dies by its database",
  ]],
  [be.prisma, [{ text: "ORM of choice on {}", see: [dev.nodeJs] }]],
  [be.nestjs, [
    { text: "{}-style structure for TypeScript", see: [be.spring] },
    "Still my choice when a project needs an OOP backend on TS, usually because of a JS-only dependency",
  ]],
  [be.express, [{ text: "These days I'm migrating Express apps to {}", see: [be.fastify] }]],
  [be.serverless, [
    { text: "Wouldn't start anything on v4 today, but happy to migrate off it while keeping the {}s", see: [aws.lambda] },
  ]],
  [be.helidon, [
    "Used on Aux Cable for a while",
    "Excellent last time I used it, if a bit obscure",
  ]],
  [be.sequelize, [{ text: "Migrated projects off it to {}", see: [be.prisma] }]],
  [be.typeorm, [{ text: "Migrated projects off it to {}", see: [be.prisma] }]],
];

/* ------------------------------------------------------------------------ */

const neighbourIds = new Map<string, Set<string>>();
const link = (x: string, y: string) => {
  if (x === y) return;
  if (!neighbourIds.has(x)) neighbourIds.set(x, new Set());
  if (!neighbourIds.has(y)) neighbourIds.set(y, new Set());
  neighbourIds.get(x)!.add(y);
  neighbourIds.get(y)!.add(x);
};
for (const [a, b] of PAIRS) link(nodeFor(a).id, nodeFor(b).id);

// The AWS umbrella pairs with every AWS service, so new services connect without a hand-written pair.
const awsId = nodeFor(deploy.aws).id;
for (const service of categoryById.get("aws")!.nodes) link(awsId, service.id);

/** A node's pairs, grouped under each partner's first category, in display order. */
export function neighboursOf(id: string): { category: Category; nodes: Node[] }[] {
  const ids = neighbourIds.get(id) ?? new Set<string>();
  return categories
    .map((category) => ({
      category,
      nodes: category.nodes.filter((n) => ids.has(n.id) && n.categories[0] === category.id),
    }))
    .filter((group) => group.nodes.length > 0);
}

export type ResolvedNote = { text: string; see: Node[] };

const contextById = new Map<string, ResolvedNote[]>(
  CONTEXT.map(([k, notes]) => [
    nodeFor(k).id,
    notes.map((n) => (typeof n === "string" ? { text: n, see: [] } : { text: n.text, see: n.see.map(nodeFor) })),
  ]),
);

export const contextOf = (id: string): ResolvedNote[] => contextById.get(id) ?? [];

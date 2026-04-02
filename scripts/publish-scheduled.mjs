#!/usr/bin/env node

const { GITHUB_TOKEN, REPO, GITHUB_USERNAME } = process.env;

if (!GITHUB_TOKEN) throw new Error("GITHUB_TOKEN is not set");
if (!REPO) throw new Error("REPO is not set");
if (!GITHUB_USERNAME) throw new Error("GITHUB_USERNAME is not set");

const headers = {
  Authorization: `Bearer ${GITHUB_TOKEN}`,
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
};

async function ghFetch(path, options = {}) {
  const res = await fetch(`https://api.github.com${path}`, {
    ...options,
    headers: { ...headers, ...options.headers },
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`GitHub API error ${res.status} on ${path}: ${body}`);
  }
  return res.json();
}

const now = Date.now();

const prs = await ghFetch(
  `/repos/${REPO}/pulls?state=open&base=main&per_page=100`
);

const mine = prs.filter((pr) => pr.user.login === GITHUB_USERNAME);

for (const pr of mine) {
  const match = (pr.body ?? "").match(/\[scheduled:\s*([0-9T:+Z-]+)\]/);
  if (!match) continue;

  const scheduledAt = new Date(match[1]);
  if (isNaN(scheduledAt)) {
    console.warn(`PR #${pr.number}: invalid scheduled date "${match[1]}", skipping`);
    continue;
  }

  if (now < scheduledAt.getTime()) continue;

  console.log(`Publishing PR #${pr.number} (scheduled: ${match[1]})`);
  await ghFetch(`/repos/${REPO}/pulls/${pr.number}/merge`, {
    method: "PUT",
    body: JSON.stringify({ merge_method: "rebase" }),
    headers: { "Content-Type": "application/json" },
  });
}

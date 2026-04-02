#!/usr/bin/env node

const { GITHUB_TOKEN, CI_REPO, CI_REPO_OWNER } = process.env;

if (!GITHUB_TOKEN) throw new Error("GITHUB_TOKEN is not set");
if (!CI_REPO) throw new Error("CI_REPO is not set");
if (!CI_REPO_OWNER) throw new Error("CI_REPO_OWNER is not set");

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
  `/repos/${CI_REPO}/pulls?state=open&base=main&per_page=100`
);

const mine = prs.filter((pr) => pr.user.login === CI_REPO_OWNER);

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
  await ghFetch(`/repos/${CI_REPO}/pulls/${pr.number}/merge`, {
    method: "PUT",
    body: JSON.stringify({ merge_method: "rebase" }),
    headers: { "Content-Type": "application/json" },
  });
}

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

function formatDuration(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
  if (minutes > 0) return `${minutes}m ${seconds}s`;
  return `${seconds}s`;
}

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

console.log(`Found ${prs.length} open PR(s) targeting main, ${mine.length} authored by ${CI_REPO_OWNER}`);

for (const pr of mine) {
  console.log(`\nInspecting PR #${pr.number}: ${pr.title}`);

  const match = (pr.body ?? "").match(/\[scheduled:\s*([0-9T:+Z-]+)\]/);
  if (!match) {
    console.log(`PR #${pr.number} is not a scheduled PR (no [scheduled: ...] marker found)`);
    continue;
  }

  const scheduledAt = new Date(match[1]);
  if (isNaN(scheduledAt)) {
    console.log(
      `PR #${pr.number} has an invalid scheduled timestamp: ${match[1]} (skipping)`
    );
    continue;
  }

  const scheduledTime = scheduledAt.getTime();
  if (now < scheduledTime) {
    const msUntilPublish = scheduledTime - now;
    const hoursUntilPublish = (msUntilPublish / (1000 * 60 * 60)).toFixed(2);
    console.log(
      `PR #${pr.number} is scheduled for ${scheduledAt.toISOString()} and will be published in ${hoursUntilPublish} hours (${formatDuration(msUntilPublish)})`
    );
    continue;
  }

  const overdueByMs = now - scheduledTime;
  console.log(
    `Publishing PR #${pr.number} now (scheduled: ${scheduledAt.toISOString()}, overdue by ${formatDuration(overdueByMs)})`
  );
  await ghFetch(`/repos/${CI_REPO}/pulls/${pr.number}/merge`, {
    method: "PUT",
    body: JSON.stringify({ merge_method: "rebase" }),
    headers: { "Content-Type": "application/json" },
  });
  console.log(`PR #${pr.number} merged successfully`);
}

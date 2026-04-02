#!/usr/bin/env bash
set -euo pipefail

NOW=$(date -u +%s)

# Fetch open PRs targeting main, authored by you only
PRS=$(curl -sf \
  -H "Authorization: Bearer $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github+json" \
  "https://api.github.com/repos/$REPO/pulls?state=open&base=main&per_page=100" \
  | jq -c --arg user "$GITHUB_USERNAME" '[.[] | select(.user.login == $user)][]')

echo "$PRS" | while IFS= read -r pr; do
  BODY=$(echo "$pr" | jq -r '.body // ""')
  PR_NUMBER=$(echo "$pr" | jq -r '.number')
  HEAD_REF=$(echo "$pr" | jq -r '.head.ref')

  # Regex match for [scheduled: ISO DATE]
  if [[ "$BODY" =~ \[scheduled:\ ([0-9T:+Z-]+)\] ]]; then
    SCHEDULED_RAW="${BASH_REMATCH[1]}"
    SCHEDULED_TS=$(date -u -d "$SCHEDULED_RAW" +%s 2>/dev/null || date -u -j -f "%Y-%m-%dT%H:%M:%SZ" "$SCHEDULED_RAW" +%s)

    if [[ "$NOW" -ge "$SCHEDULED_TS" ]]; then
      echo "Publishing PR #$PR_NUMBER (scheduled: $SCHEDULED_RAW)"

      # Rebase merge via API (no merge commits)
      curl -sf -X PUT \
        -H "Authorization: Bearer $GITHUB_TOKEN" \
        -H "Accept: application/vnd.github+json" \
        "https://api.github.com/repos/$REPO/pulls/$PR_NUMBER/merge" \
        -d '{"merge_method":"rebase"}'
    fi
  fi
done
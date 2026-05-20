#!/usr/bin/env node

import { execSync } from 'child_process';

const cols = process.stdout.columns || 80;
const tty = process.stdout.isTTY ?? false;

const today = new Date();
today.setHours(0, 0, 0, 0);

const weekStart = new Date(today);
weekStart.setDate(today.getDate() - today.getDay());

// ANSI color helpers — no-op when not a TTY
const R = tty ? '\x1b[0m' : '';
const paint = tty
  ? (...codes) => str => codes.join('') + str + R
  : () => str => str;

const dim      = paint('\x1b[2m');
const bold     = paint('\x1b[1m');
const bWhite   = paint('\x1b[1m\x1b[97m');
const bCyan    = paint('\x1b[1m\x1b[96m');
const bYellow  = paint('\x1b[1m\x1b[93m');
const bGreen   = paint('\x1b[1m\x1b[92m');

function getPRs() {
  return JSON.parse(
    execSync('gh pr list --state open --json number,title,body --limit 100', { encoding: 'utf8' })
  );
}

function parseScheduled(body) {
  const m = (body ?? '').match(/\[scheduled:\s*([^\]]+)\]/);
  if (!m) return null;
  const d = new Date(m[1].trim());
  return isNaN(d.getTime()) ? null : d;
}

function dateKey(d) {
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

function buildMap(prs) {
  const map = new Map();
  for (const pr of prs) {
    const d = parseScheduled(pr.body);
    if (!d) continue;
    const title = pr.title.replace(/^Post:\s*"?/, '').replace(/"$/, '');
    const key = dateKey(d);
    if (!map.has(key)) map.set(key, []);
    map.get(key).push({ number: pr.number, title, date: d });
  }
  return map;
}

function wrapPost(p, cw) {
  const time = p.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  const full = `${time} #${p.number} ${p.title}`;
  const lines = [];
  let rest = full;
  while (rest.length > 0 && lines.length < 3) {
    if (rest.length <= cw) {
      lines.push(rest);
      break;
    }
    if (lines.length === 2) {
      lines.push(rest.slice(0, cw - 1) + '…');
      break;
    }
    const breakAt = rest.lastIndexOf(' ', cw);
    const cut = breakAt > 0 ? breakAt : cw;
    lines.push(rest.slice(0, cut));
    rest = rest.slice(cut).trimStart();
  }
  return lines.map(l => l.padEnd(cw));
}

// Apply color to an already-padded post line (preserves visual width).
// First line starts with "HH:MM "; continuation lines are plain title text.
function paintPostLine(line) {
  const m = line.match(/^(\d{2}:\d{2}) (#\d+)([\s\S]*)$/);
  if (m) return bGreen(m[1]) + ' ' + dim(m[2]) + bWhite(m[3]);
  return bWhite(line);
}

function addDays(base, n) {
  const d = new Date(base);
  d.setDate(base.getDate() + n);
  return d;
}

function render(prs) {
  const map = buildMap(prs);

  const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  let lastWeek = 1;
  for (const [, posts] of map) {
    for (const { date } of posts) {
      const w = Math.floor((date - weekStart) / (7 * 86400000));
      if (w > lastWeek) lastWeek = w;
    }
  }
  const numWeeks = lastWeek + 1;

  const hasPost = Array(7).fill(false);
  for (let w = 0; w < numWeeks; w++) {
    for (let d = 0; d < 7; d++) {
      if ((map.get(dateKey(addDays(weekStart, w * 7 + d))) ?? []).length > 0) hasPost[d] = true;
    }
  }
  const occupiedCount = hasPost.filter(Boolean).length || 7;
  const MIN_CW = 6;
  const fullCw = Math.max(MIN_CW, Math.floor((cols - 18 - (7 - occupiedCount) * MIN_CW) / occupiedCount));
  const colWidths = hasPost.map(has => has ? fullCw : MIN_CW);

  const totalWidth = colWidths.reduce((a, b) => a + b, 0) + 18;
  const sep = dim('─'.repeat(totalWidth));
  const pipe = dim(' │ ');

  const scheduled = [...map.values()].reduce((n, v) => n + v.length, 0);
  const weekOf = weekStart.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const todayLabel = today.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  console.log(
    dim('week of ') + bold(weekOf) +
    dim('   today: ') + bCyan(todayLabel) +
    dim('   ') + bYellow(String(scheduled)) + dim(` post${scheduled !== 1 ? 's' : ''} scheduled`)
  );
  console.log();

  console.log(DAY_NAMES.map((n, i) => {
    const padded = n.padEnd(colWidths[i]);
    return hasPost[i] ? bWhite(padded) : dim(padded);
  }).join(pipe));

  for (let w = 0; w < numWeeks; w++) {
    console.log(sep);
    const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, w * 7 + i));

    console.log(days.map((d, i) => {
      const label = d.getDate() === 1 ? `${MONTHS[d.getMonth()]} 1` : String(d.getDate());
      const isToday = dateKey(d) === dateKey(today);
      const cell = isToday ? `[${label}]` : label;
      const padded = cell.padEnd(colWidths[i]);
      return isToday ? bCyan(padded) : dim(padded);
    }).join(pipe));

    const cells = days.map((d, i) => (map.get(dateKey(d)) ?? []).flatMap(p => wrapPost(p, colWidths[i])));
    const height = Math.max(0, ...cells.map(c => c.length));
    for (let i = 0; i < height; i++) {
      console.log(cells.map((lines, j) => {
        const line = lines[i];
        return line ? paintPostLine(line) : ' '.repeat(colWidths[j]);
      }).join(pipe));
    }
  }

  console.log(sep);
}

render(getPRs());

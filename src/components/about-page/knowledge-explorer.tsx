import { Fragment, useEffect, useId, useMemo, useRef, useState, type ReactNode } from "react";
import { ArrowLeft, Search } from "lucide-react";
import {
  categories,
  categoryById,
  contextOf,
  neighboursOf,
  nodeById,
  nodes,
  type Node,
  type ResolvedNote,
} from "@/components/about-page/lib/knowledge-graph";

/** Padding presets some logos need to look the same size as their neighbours. */
const ENHANCE: Record<string, string> = {
  "bigger-4": "p-0",
  "bigger-3": "p-px",
  "bigger-2": "p-0.5",
  "bigger-1": "p-[3px]",
};

const pathLabel = (label: string) => `/${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}/`;
const normalise = (s: string) => s.toLowerCase().replace(/[^a-z0-9+#]/g, "");

/** The logo on its white square; "fullsize" logos bring their own background. */
function Logo({ node, className }: { node: Node; className: string }) {
  if (node.custom === "fullsize") {
    return <img src={node.icon} alt="" loading="lazy" className={`${className} object-cover shrink-0`} />;
  }
  return (
    <span className={`${className} bg-white flex items-center justify-center shrink-0`}>
      <img src={node.icon} alt="" loading="lazy" className={`size-full object-contain ${ENHANCE[node.custom ?? ""] ?? "p-1"}`} />
    </span>
  );
}

/** Logo and name: summary rows, search results and pairs all use it. */
function NamedButton({ node, onPick }: { node: Node; onPick: (n: Node) => void }) {
  return (
    <button
      type="button"
      onClick={() => onPick(node)}
      className="press cursor-pointer inline-flex items-center gap-2 h-9 pe-3 bg-background hover:bg-foreground hover:text-background transition-colors text-sm font-semibold"
    >
      <Logo node={node} className="size-9" />
      {node.name}
    </button>
  );
}

const hiddenCategories = categories.filter((c) => !c.inSummary);

/** "AWS, Collaboration, Databases and Embedded" */
const listNames = (names: string[]) =>
  names.length < 2 ? names.join("") : `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;

function Summary({ onPick }: { onPick: (n: Node) => void }) {
  const [open, setOpen] = useState<Set<string>>(new Set());
  const [allCategories, setAllCategories] = useState(false);
  const rows = allCategories ? categories : categories.filter((c) => c.inSummary);
  const toggle = (id: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <>
    <ul className="list-none p-0 m-0 divide-y divide-border">
      {rows.map((category) => {
        const expanded = open.has(category.id);
        const shown = expanded ? category.nodes : category.nodes.slice(0, category.featured);
        const rest = category.nodes.length - category.featured;
        return (
          <li key={category.id} className="grid gap-x-6 gap-y-2 py-4 first:pt-0 last:pb-0 sm:grid-cols-[9rem_1fr]">
            <div>
              <div className="font-bold">
                {category.label} <span className="font-normal text-foreground/75 tabular-nums">{category.nodes.length}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5 items-start content-start">
              {shown.map((node) => (
                <NamedButton key={node.id} node={node} onPick={onPick} />
              ))}
              {rest > 0 && (
                <button
                  type="button"
                  onClick={() => toggle(category.id)}
                  aria-expanded={expanded}
                  className="press cursor-pointer h-9 min-w-9 px-2 bg-background hover:bg-foreground hover:text-background transition-colors text-sm font-semibold tabular-nums"
                >
                  {expanded ? "less" : `+${rest}`}
                </button>
              )}
            </div>
          </li>
        );
      })}
    </ul>
    {hiddenCategories.length > 0 && (
      <button
        type="button"
        onClick={() => setAllCategories((v) => !v)}
        aria-expanded={allCategories}
        className="press cursor-pointer mt-4 w-full min-h-10 px-3 py-2 text-left bg-background hover:bg-foreground hover:text-background transition-colors text-sm font-semibold"
      >
        {allCategories ? "Fewer categories" : `Also: ${listNames(hiddenCategories.map((c) => c.label))}`}
      </button>
    )}
    </>
  );
}

function Results({ query, matches, onPick }: { query: string; matches: Node[]; onPick: (n: Node) => void }) {
  if (matches.length === 0) {
    return <p className="m-0 text-foreground/75">Nothing called "{query}" here. Try a shorter name.</p>;
  }
  return (
    <div className="flex flex-wrap gap-1.5">
      {matches.map((node) => (
        <NamedButton key={node.id} node={node} onPick={onPick} />
      ))}
    </div>
  );
}

/** A note's text with its linked technologies dropped in at `{}`, or appended in parentheses. */
function NoteLine({ note, onPick }: { note: ResolvedNote; onPick: (n: Node) => void }) {
  const links = note.see.map((node, i) => (
    <Fragment key={node.id}>
      {i > 0 && (i === note.see.length - 1 ? " and " : ", ")}
      <button type="button" onClick={() => onPick(node)} className="cursor-pointer font-semibold text-link underline underline-offset-2">
        {node.name}
      </button>
    </Fragment>
  ));
  if (links.length === 0) return <>{note.text}</>;
  if (note.text.includes("{}")) {
    const [before, after] = note.text.split("{}", 2);
    return <>{before}{links}{after}</>;
  }
  return <>{note.text} ({links})</>;
}

function Focus({ node, onPick }: { node: Node; onPick: (n: Node) => void }) {
  const notes = contextOf(node.id);
  const groups = neighboursOf(node.id);
  const host = (() => {
    try {
      return new URL(node.link).hostname.replace(/^www\./, "");
    } catch {
      return node.link;
    }
  })();

  return (
    <div>
      <div className="flex items-center gap-4">
        <Logo node={node} className="size-16" />
        <div className="min-w-0">
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.02em] leading-tight m-0">{node.name}</h3>
          <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
            {node.categories.map((id) => (
              <span key={id} className="font-mono text-[0.9em] text-foreground/75">
                {pathLabel(categoryById.get(id)!.label)}
              </span>
            ))}
            <a href={node.link} className="text-link underline underline-offset-2">{host}</a>
          </div>
        </div>
      </div>

      {notes.length > 0 && (
        <ul className="mt-5 mb-0 ps-5 list-[square] marker:text-primary space-y-1">
          {notes.map((note, i) => (
            <li key={i}>
              <NoteLine note={note} onPick={onPick} />
            </li>
          ))}
        </ul>
      )}

      <h4 className="font-mono text-base font-bold mt-6 mb-3">/goes-with/</h4>
      {groups.length === 0 ? (
        <p className="m-0 text-foreground/75">No pairs for this one yet.</p>
      ) : (
        <div className="space-y-3">
          {groups.map(({ category, nodes: partners }) => (
            <div key={category.id} className="grid gap-x-6 gap-y-1.5 sm:grid-cols-[9rem_1fr]">
              <span className="text-sm font-bold sm:pt-2">{category.label}</span>
              <div className="flex flex-wrap gap-1.5">
                {partners.map((partner) => (
                  <NamedButton key={partner.id} node={partner} onPick={onPick} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * "I already worked with…": a one-card summary of every category, which turns
 * into an explorer once you search or pick a technology. Picking re-centres the
 * view on that tech, with my notes on it and what it pairs with.
 */
export function KnowledgeExplorer() {
  const [query, setQuery] = useState("");
  const [focusId, setFocusId] = useState<string | null>(null);
  const searchId = useId();
  const cardRef = useRef<HTMLDivElement>(null);
  const navigated = useRef(false);

  // After picking (or going back), bring the card's top into view if it has scrolled off.
  useEffect(() => {
    if (!navigated.current) return;
    navigated.current = false;
    const card = cardRef.current;
    if (!card || card.getBoundingClientRect().top >= 0) return;
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    card.scrollIntoView({ block: "start", behavior: smooth ? "smooth" : "auto" });
  }, [focusId]);

  const focus = focusId ? nodeById.get(focusId) ?? null : null;
  const q = normalise(query);
  // Exact name first, then prefix matches, then anything containing it: "s3" finds S3 before CSS3.
  const matches = useMemo(() => {
    if (!q) return [];
    const rank = (n: Node) => {
      const name = normalise(n.name);
      return name === q ? 0 : name.startsWith(q) ? 1 : 2;
    };
    return nodes
      .filter((n) => normalise(n.name).includes(q))
      .sort((a, b) => rank(a) - rank(b) || a.name.localeCompare(b.name));
  }, [q]);

  const pick = (node: Node) => {
    navigated.current = true;
    setFocusId(node.id);
    setQuery("");
  };
  const reset = () => {
    navigated.current = true;
    setFocusId(null);
    setQuery("");
  };

  let view: ReactNode;
  let status: string;
  if (q) {
    view = <Results query={query} matches={matches} onPick={pick} />;
    status = `${matches.length} match${matches.length === 1 ? "" : "es"}`;
  } else if (focus) {
    view = <Focus node={focus} onPick={pick} />;
    status = `Showing ${focus.name}`;
  } else {
    view = <Summary onPick={pick} />;
    status = "";
  }

  return (
    <section className="space-y-4" aria-labelledby={`${searchId}-heading`}>
      <div className="space-y-1">
        <h2 id={`${searchId}-heading`} className="text-2xl md:text-3xl font-bold tracking-[-0.025em] m-0">I already worked with…</h2>
        <p className="m-0">
          … at least <strong>{nodes.length} different technologies</strong>. Not all of them by choice. I&apos;d use most of them again.
        </p>
      </div>

      <div ref={cardRef} className="bg-card p-4 sm:p-6 scroll-mt-4">
        <div className="flex gap-1.5 mb-5">
          {(focus || q) && (
            <button
              type="button"
              onClick={reset}
              className="press cursor-pointer shrink-0 inline-flex items-center gap-1.5 h-10 px-3 bg-background hover:bg-foreground hover:text-background transition-colors text-sm font-semibold [&_svg]:size-4"
            >
              <ArrowLeft aria-hidden="true" />
              <span className="max-sm:sr-only">Everything</span>
            </button>
          )}
          <label htmlFor={searchId} className="sr-only">Search technologies</label>
          <div className="relative flex-1">
            <Search aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-foreground/60 pointer-events-none" />
            <input
              id={searchId}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && matches[0]) pick(matches[0]);
                if (e.key === "Escape") reset();
              }}
              placeholder={`Search ${nodes.length} technologies`}
              autoComplete="off"
              className="w-full h-10 ps-9 pe-3 bg-background text-foreground placeholder:text-foreground/60 border-0 outline-none focus-visible:outline-2 focus-visible:outline-ring"
            />
          </div>
        </div>

        <p className="sr-only" aria-live="polite">{status}</p>
        {view}
      </div>
    </section>
  );
}

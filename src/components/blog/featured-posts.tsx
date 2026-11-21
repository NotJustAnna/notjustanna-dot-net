import { useEffect, useState } from 'react';
import type { ImageMetadata } from 'astro';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CategoryPill } from './category-pill';
import { FormattedDate } from './formatted-date';

type Post = {
  id: string;
  data: {
    title: string;
    pubDate: Date;
    updatedDate?: Date;
    description?: string | null;
    category?: 'dev' | 'tech' | 'ramblings';
    heroImage?: ImageMetadata;
  };
};

function Meta({ post }: { post: Post }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-foreground/75">
      <FormattedDate date={post.data.updatedDate ?? post.data.pubDate} />
      {post.data.category && (
        <span className="relative z-10">
          <CategoryPill category={post.data.category} />
        </span>
      )}
    </div>
  );
}

/** The card being shown: hero, big title, description. */
function Lead({ post, shown }: { post: Post; shown: boolean }) {
  return (
    <article
      aria-hidden={!shown}
      inert={!shown}
      className={`press group relative h-full bg-card [grid-area:1/1] transition-opacity duration-300 motion-reduce:transition-none ${
        shown ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {post.data.heroImage && (
        <img
          width={1000}
          height={420}
          src={post.data.heroImage.src}
          alt=""
          className="w-full aspect-[1000/420] object-cover"
        />
      )}
      <div className="p-4 sm:p-5">
        <h3 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.025em] leading-[1.1] text-balance m-0 mb-2 group-hover:text-link transition-colors">
          <a href={`/post/${post.id}/`} className="no-underline text-inherit after:absolute after:inset-0">
            {post.data.title}
          </a>
        </h3>
        <Meta post={post} />
        {post.data.description && (
          <p className="text-[0.9375rem] text-foreground/75 mt-2 mb-0 line-clamp-3">{post.data.description}</p>
        )}
      </div>
    </article>
  );
}

/** A card waiting in the stack: title and meta only. */
function Queued({ post }: { post: Post }) {
  return (
    <article className="press group relative h-full p-4 bg-card">
      <h3 className="text-lg font-bold tracking-[-0.01em] leading-snug text-balance m-0 mb-1 group-hover:text-link transition-colors">
        <a href={`/post/${post.id}/`} className="no-underline text-inherit after:absolute after:inset-0">
          {post.data.title}
        </a>
      </h3>
      <Meta post={post} />
    </article>
  );
}

/** Cards visible in the stack; any beyond this wait unseen at the bottom. */
const VISIBLE_STACK = 4;

/** How long each card rests before autoplay moves on. */
const AUTOPLAY_MS = 6000;

const navButton =
  'press size-9 inline-flex items-center justify-center bg-card text-foreground hover:bg-foreground hover:text-background transition-colors [&_svg]:size-5';

/**
 * A pseudo-carousel: one card shown, the rest waiting as a stack.
 * Next takes the top of the stack and sends the shown card to the bottom; previous undoes it.
 *
 * Autoplays until the visitor interacts with it (clicks, taps, or tabs in); after that it's theirs.
 * Hovering only pauses it, and it never autoplays with reduced motion.
 */
export function FeaturedPosts({ posts }: { posts: Post[] }) {
  const [current, setCurrent] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [stopped, setStopped] = useState(false);
  const count = posts.length;

  useEffect(() => {
    if (count < 2 || stopped || hovered) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // A backgrounded tab skips its turns instead of piling them up.
    const timer = window.setInterval(() => {
      if (!document.hidden) setCurrent((i) => (i + 1) % count);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [count, stopped, hovered]);

  if (count === 0) return null;

  const step = (by: number) => setCurrent((i) => (i + by + count) % count);
  const stop = () => setStopped(true);
  const stack = Array.from({ length: Math.min(count - 1, VISIBLE_STACK) }, (_, k) => posts[(current + 1 + k) % count]);

  return (
    <div
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onPointerDownCapture={stop}
      onFocusCapture={stop}
    >
      <div className="flex items-center gap-2 mb-4">
        <h2 id="featured-heading" className="font-mono text-xl font-bold m-0 me-auto">
          <a href="/featured" className="no-underline hover:text-link transition-colors">/featured/</a>
        </h2>
        {count > 1 && (
          <>
            <button type="button" className={navButton} onClick={() => step(-1)} aria-label="Previous featured post">
              <ChevronLeft />
            </button>
            <button type="button" className={navButton} onClick={() => step(1)} aria-label="Next featured post">
              <ChevronRight />
            </button>
          </>
        )}
      </div>
      <div className="grid md:grid-cols-[4fr_3fr] gap-2">
        {/* Every lead sits in the same cell: images load up front and the height never jumps. */}
        <div className="grid">
          {posts.map((post, i) => (
            <Lead key={post.id} post={post} shown={i === current} />
          ))}
        </div>
        {stack.length > 0 && (
          <ul className="list-none p-0 m-0 gap-2 auto-rows-fr hidden md:grid" aria-label="Up next">
            {stack.map((post) => (
              <li key={post.id}>
                <Queued post={post} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

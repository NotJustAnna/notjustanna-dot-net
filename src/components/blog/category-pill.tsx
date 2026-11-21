import type { Category } from '@/lib/posts';

const hrefs = {
  dev: '/development',
  tech: '/tech',
  ramblings: '/ramblings',
} as const;

/** The category as a path, `/dev/`, in monospace, linking to its page. */
export function CategoryPill({ category }: { category: Category }) {
  return (
    <a
      href={hrefs[category]}
      className="font-mono text-[0.9em] no-underline text-inherit hover:text-foreground transition-colors"
    >
      /{category}/
    </a>
  );
}

export function FeaturedPill() {
  return (
    <a
      href="/featured"
      className="font-mono text-[0.9em] no-underline text-inherit hover:text-foreground transition-colors"
    >
      /featured/
    </a>
  );
}

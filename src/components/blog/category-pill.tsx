import type { Category } from '@/lib/posts';

const hrefs = {
  dev: '/development',
  tech: '/tech',
  ramblings: '/ramblings',
} as const;

/** Static class names so Tailwind picks them up. */
export const CATEGORY_BG = {
  dev: 'bg-cat-dev',
  tech: 'bg-cat-tech',
  ramblings: 'bg-cat-ramblings',
} as const;

/** A small square of the category's colour, then its name. */
export function CategoryPill({ category }: { category: Category }) {
  return (
    <a
      href={hrefs[category]}
      className="inline-flex items-center gap-1.5 no-underline text-muted-foreground hover:text-foreground transition-colors"
    >
      <span aria-hidden="true" className={`size-2.5 ${CATEGORY_BG[category]}`} />
      {category}
    </a>
  );
}

export function FeaturedPill() {
  return (
    <a
      href="/featured"
      className="inline-flex items-center gap-1.5 no-underline text-muted-foreground hover:text-foreground transition-colors"
    >
      <span aria-hidden="true" className="size-2.5 bg-primary" />
      featured
    </a>
  );
}

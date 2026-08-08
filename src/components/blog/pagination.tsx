import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PaginationProps {
  currentPage: number;
  lastPage: number;
  prevUrl?: string;
  nextUrl?: string;
  /** Base path of the paginated route, e.g. `/` or `/tech`. */
  base: string;
}

/** Page numbers around the current page, with `null` marking a gap. */
function pageWindow(currentPage: number, lastPage: number): (number | null)[] {
  const pages = new Set([1, lastPage]);
  for (let i = currentPage - 1; i <= currentPage + 1; i++) {
    if (i >= 1 && i <= lastPage) pages.add(i);
  }

  const sorted = [...pages].sort((a, b) => a - b);
  return sorted.flatMap((page, index) =>
    index > 0 && page - sorted[index - 1] > 1 ? [null, page] : [page],
  );
}

export function Pagination({
  currentPage,
  lastPage,
  prevUrl,
  nextUrl,
  base,
}: PaginationProps) {
  if (lastPage <= 1) return null;

  const hrefFor = (page: number) =>
    page === 1 ? base : `${base === '/' ? '' : base}/${page}`;

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-center gap-1 mt-8"
    >
      <Button variant="ghost" size="icon" asChild={!!prevUrl} disabled={!prevUrl}>
        {prevUrl ? (
          <a href={prevUrl} aria-label="Previous page" className="no-underline">
            <ChevronLeft />
          </a>
        ) : (
          <ChevronLeft />
        )}
      </Button>

      {pageWindow(currentPage, lastPage).map((page, index) =>
        page === null ? (
          <span
            key={`gap-${index}`}
            aria-hidden="true"
            className="px-1 text-muted-foreground select-none"
          >
            &hellip;
          </span>
        ) : (
          <Button
            key={page}
            variant={page === currentPage ? 'default' : 'ghost'}
            size="icon"
            asChild
          >
            <a
              href={hrefFor(page)}
              className="no-underline"
              aria-label={`Page ${page}`}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              {page}
            </a>
          </Button>
        ),
      )}

      <Button variant="ghost" size="icon" asChild={!!nextUrl} disabled={!nextUrl}>
        {nextUrl ? (
          <a href={nextUrl} aria-label="Next page" className="no-underline">
            <ChevronRight />
          </a>
        ) : (
          <ChevronRight />
        )}
      </Button>
    </nav>
  );
}

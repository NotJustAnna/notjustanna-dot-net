import { Badge } from '@/components/ui/badge';

const hrefs = {
  dev: '/development',
  tech: '/tech',
  ramblings: '/ramblings',
} as const;

export function CategoryPill({ category }: { category: 'dev' | 'tech' | 'ramblings' }) {
  return (
    <Badge variant="outline" asChild>
      <a href={hrefs[category]} className="no-underline font-mono">
        #{category}
      </a>
    </Badge>
  );
}
 
import type { ImageMetadata } from 'astro';
import { Card, CardContent } from '@/components/ui/card';
import { CategoryPill, FeaturedPill } from './category-pill';
import { FormattedDate } from './formatted-date';

type Post = {
  id: string;
  data: {
    title: string;
    pubDate: Date;
    description?: string | null;
    category?: 'dev' | 'tech' | 'ramblings';
    heroImage?: ImageMetadata;
    highlight?: boolean;
  };
};

export function PostList({
  posts,
  featureFirst = true,
}: {
  posts: Post[];
  /** Render the first post as a large hero card. Off past page 1. */
  featureFirst?: boolean;
}) {
  return (
    <ul className="space-y-4 list-none p-0 m-0">
      {posts.map((post, i) => {
        const isFeatured = featureFirst && i === 0;
        // Title and meta share a line when they fit, keeping list rows short.
        const isCompact = !isFeatured;
        return (
        <li key={post.id}>
          <div className="group relative">
            <Card
              className={`overflow-hidden gap-0 py-0 flex flex-col ${isFeatured ? '' : 'sm:flex-row'}`}
            >
              {post.data.heroImage && (
                <div className={isFeatured ? 'w-full aspect-[1000/420]' : 'w-full aspect-[1000/420] sm:w-32 sm:aspect-square shrink-0'}>
                  <img
                    width={1000}
                    height={420}
                    src={post.data.heroImage.src}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <CardContent className={isCompact ? 'flex-1 min-w-0 p-3 sm:p-4' : 'p-4'}>
                <div className={isCompact ? 'sm:flex sm:flex-wrap sm:items-baseline sm:gap-x-3 sm:gap-y-1' : ''}>
                  <h2
                    className={`font-semibold text-card-foreground group-hover:text-primary transition-colors m-0 ${isFeatured ? 'text-2xl' : 'text-lg'}`}
                  >
                    <a
                      href={`/post/${post.id}/`}
                      className="no-underline text-inherit after:absolute after:inset-0 after:rounded-2xl"
                    >
                      {post.data.title}
                    </a>
                  </h2>
                  <div
                    className={`flex items-center gap-2 ${isCompact ? 'mt-1 sm:mt-0 sm:ml-auto sm:shrink-0' : 'mt-1'}`}
                  >
                    <p className="text-sm text-muted-foreground m-0">
                      <FormattedDate date={post.data.pubDate} />
                    </p>
                    {post.data.category && (
                      <span className="relative z-10">
                        <CategoryPill category={post.data.category} />
                      </span>
                    )}
                    {post.data.highlight && (
                      <span className="relative z-10">
                        <FeaturedPill />
                      </span>
                    )}
                  </div>
                </div>
                {post.data.description && (
                  <p
                    className={`text-sm text-muted-foreground mb-0 line-clamp-3 ${isCompact ? 'mt-1.5' : 'mt-2'}`}
                  >
                    {post.data.description}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </li>
        );
      })}
    </ul>
  );
}

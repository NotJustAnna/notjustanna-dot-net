import type { ImageMetadata } from 'astro';
import { Card, CardContent } from '@/components/ui/card';
import { CategoryPill } from './category-pill';
import { FormattedDate } from './formatted-date';

type Post = {
  id: string;
  data: {
    title: string;
    pubDate: Date;
    description?: string | null;
    category?: 'dev' | 'tech' | 'ramblings';
    heroImage?: ImageMetadata;
  };
};

export function FeaturedPosts({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null;
  return (
    <ul className="grid gap-4 sm:grid-cols-2 list-none p-0 m-0">
      {posts.map((post) => (
        <li key={post.id}>
          <div className="group relative h-full">
            <Card className="overflow-hidden gap-0 py-0 flex flex-col h-full">
              {post.data.heroImage && (
                <div className="w-full aspect-[1000/420] shrink-0">
                  <img
                    width={1000}
                    height={420}
                    src={post.data.heroImage.src}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg text-card-foreground group-hover:text-primary transition-colors m-0">
                  <a
                    href={`/post/${post.id}/`}
                    className="no-underline text-inherit after:absolute after:inset-0 after:rounded-2xl"
                  >
                    {post.data.title}
                  </a>
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-sm text-muted-foreground m-0">
                    <FormattedDate date={post.data.pubDate} />
                  </p>
                  {post.data.category && (
                    <span className="relative z-10">
                      <CategoryPill category={post.data.category} />
                    </span>
                  )}
                </div>
                {post.data.description && (
                  <p className="text-sm text-muted-foreground mt-2 mb-0 line-clamp-2">
                    {post.data.description}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </li>
      ))}
    </ul>
  );
}

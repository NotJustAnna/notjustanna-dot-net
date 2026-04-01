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

export function PostList({ posts }: { posts: Post[] }) {
  return (
    <ul className="space-y-4 list-none p-0 m-0">
      {posts.map((post, index) => (
        <li key={post.id}>
          <a href={`/post/${post.id}/`} className="group block no-underline">
            <Card
              className={`overflow-hidden gap-0 py-0 flex flex-col ${index !== 0 ? 'sm:flex-row' : ''}`}
            >
              {post.data.heroImage && (
                <div className={index === 0 ? 'w-full aspect-[1000/420]' : 'w-full aspect-[1000/420] sm:w-32 sm:aspect-square shrink-0'}>
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
                <h2
                  className={`font-semibold text-card-foreground group-hover:text-primary transition-colors m-0 ${index === 0 ? 'text-2xl' : 'text-lg'}`}
                >
                  {post.data.title}
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-sm text-muted-foreground m-0">
                    <FormattedDate date={post.data.pubDate} />
                  </p>
                  {post.data.category && (
                    <CategoryPill category={post.data.category} />
                  )}
                </div>
                {post.data.description && (
                  <p className="text-sm text-muted-foreground mt-2 mb-0 line-clamp-3">
                    {post.data.description}
                  </p>
                )}
              </CardContent>
            </Card>
          </a>
        </li>
      ))}
    </ul>
  );
}

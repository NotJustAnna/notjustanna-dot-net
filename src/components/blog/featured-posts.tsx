import type { ImageMetadata } from 'astro';
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
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
      <FormattedDate date={post.data.updatedDate ?? post.data.pubDate} />
      {post.data.category && (
        <span className="relative z-10">
          <CategoryPill category={post.data.category} />
        </span>
      )}
    </div>
  );
}

/** The newest featured post: hero, big title, description. */
function Lead({ post }: { post: Post }) {
  return (
    <article className="press group relative">
      {post.data.heroImage && (
        <img
          width={1000}
          height={420}
          src={post.data.heroImage.src}
          alt=""
          className="w-full aspect-[1000/420] object-cover mb-4"
        />
      )}
      <h3 className="text-3xl sm:text-4xl font-extrabold tracking-[-0.025em] leading-[1.1] text-balance m-0 mb-2 group-hover:text-primary transition-colors">
        <a href={`/post/${post.id}/`} className="no-underline text-inherit after:absolute after:inset-0">
          {post.data.title}
        </a>
      </h3>
      <Meta post={post} />
      {post.data.description && (
        <p className="text-muted-foreground mt-3 mb-0">{post.data.description}</p>
      )}
    </article>
  );
}

/** The rest: titles only. */
function Item({ post }: { post: Post }) {
  return (
    <article className="press group relative">
      <h3 className="text-lg font-bold tracking-[-0.01em] leading-snug text-balance m-0 mb-1 group-hover:text-primary transition-colors">
        <a href={`/post/${post.id}/`} className="no-underline text-inherit after:absolute after:inset-0">
          {post.data.title}
        </a>
      </h3>
      <Meta post={post} />
    </article>
  );
}

export function FeaturedPosts({ posts }: { posts: Post[] }) {
  const [lead, ...rest] = posts;
  if (!lead) return null;

  return (
    <div className="grid md:grid-cols-[3fr_2fr] gap-x-10 gap-y-8">
      <Lead post={lead} />
      {rest.length > 0 && (
        <ul className="list-none p-0 m-0 space-y-6">
          {rest.map((post) => (
            <li key={post.id}>
              <Item post={post} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

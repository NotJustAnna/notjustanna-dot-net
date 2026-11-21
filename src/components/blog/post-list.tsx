import type { ImageMetadata } from 'astro';
import { CategoryPill, FeaturedPill } from './category-pill';
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
    heroCrop?: 'left' | 'center-left' | 'center' | 'center-right' | 'right';
    highlight?: boolean;
  };
};

/** Static class names so Tailwind picks them up. */
const CROP_CLASS = {
  center: 'object-center',
  left: 'object-left',
  'center-left': 'object-[25%_50%]',
  'center-right': 'object-[75%_50%]',
  right: 'object-right',
} as const;

function PostMeta({ post }: { post: Post }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-foreground/75">
      <span>
        {post.data.updatedDate ? (
          <>
            Updated <FormattedDate date={post.data.updatedDate} />
          </>
        ) : (
          <FormattedDate date={post.data.pubDate} />
        )}
      </span>
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
  );
}

/** Square thumbnail, flush to the card's edge. Only for posts that have a hero. */
function Thumb({ image, crop }: { image: ImageMetadata; crop: keyof typeof CROP_CLASS }) {
  return (
    <div className="w-20 sm:w-32 self-stretch min-h-20 sm:min-h-32 shrink-0 bg-muted">
      <img
        width={256}
        height={256}
        src={image.src}
        alt=""
        loading="lazy"
        className={`size-full object-cover ${CROP_CLASS[crop]}`}
      />
    </div>
  );
}

export function PostList({
  posts,
  featureFirst = true,
}: {
  posts: Post[];
  /** Render the first post large, with its hero at full width. Off past page 1. */
  featureFirst?: boolean;
}) {
  return (
    <ul className="list-none p-0 m-0 space-y-2">
      {posts.map((post, i) => {
        const isLead = featureFirst && i === 0;
        return (
          <li key={post.id} className="group relative">
            {isLead ? (
              <article className="press bg-card">
                {post.data.heroImage && (
                  <img
                    width={1000}
                    height={420}
                    src={post.data.heroImage.src}
                    alt=""
                    className={`w-full aspect-[1000/420] object-cover ${CROP_CLASS[post.data.heroCrop ?? 'center']}`}
                  />
                )}
                <div className="p-5 sm:p-7">
                  <h2 className="text-3xl sm:text-4xl font-extrabold tracking-[-0.025em] leading-[1.1] text-balance m-0 mb-2 group-hover:text-link transition-colors">
                    <a href={`/post/${post.id}/`} className="no-underline text-inherit after:absolute after:inset-0">
                      {post.data.title}
                    </a>
                  </h2>
                  <PostMeta post={post} />
                  {post.data.description && (
                    <p className="text-lg text-foreground/75 mt-3 mb-0 max-w-2xl">{post.data.description}</p>
                  )}
                </div>
              </article>
            ) : (
              <article className="press flex items-start bg-card">
                {post.data.heroImage && (
                  <Thumb image={post.data.heroImage} crop={post.data.heroCrop ?? 'center'} />
                )}
                <div className="flex-1 min-w-0 p-3 sm:p-4 sm:px-5">
                  <h2 className="text-lg sm:text-xl font-bold tracking-[-0.01em] leading-snug text-balance m-0 mb-1 group-hover:text-link transition-colors">
                    <a href={`/post/${post.id}/`} className="no-underline text-inherit after:absolute after:inset-0">
                      {post.data.title}
                    </a>
                  </h2>
                  <PostMeta post={post} />
                  {post.data.description && (
                    <p className="text-[0.9375rem] text-foreground/75 mt-1.5 mb-0 line-clamp-2 max-sm:hidden">
                      {post.data.description}
                    </p>
                  )}
                </div>
              </article>
            )}
          </li>
        );
      })}
    </ul>
  );
}

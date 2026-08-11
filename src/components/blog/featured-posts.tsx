import { useEffect, useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import type { ImageMetadata } from 'astro';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
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

/** How long each slide rests before the carousel advances. */
const AUTOPLAY_MS = 6000;

/** Slides visible at once on `sm` and up; below that a single slide fills the row. */
const PER_VIEW = 2;

function FeaturedCard({ post }: { post: Post }) {
  return (
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
              {post.data.updatedDate ? (
                <>
                  Updated <FormattedDate date={post.data.updatedDate} />
                </>
              ) : (
                <FormattedDate date={post.data.pubDate} />
              )}
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
  );
}

export function FeaturedPosts({ posts }: { posts: Post[] }) {
  const [api, setApi] = useState<CarouselApi>();
  const [paused, setPaused] = useState(false);
  // Matches KnowledgeSpotlight: arrows only once there's margin to sit in.
  const hasArrows = useMediaQuery('(min-width: 640px)', { initializeWithValue: false });

  // Nothing to advance to when every post already fits on screen.
  const canCycle = posts.length > PER_VIEW;

  useEffect(() => {
    if (!api || !canCycle || paused) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let timer = window.setInterval(() => api.scrollNext(), AUTOPLAY_MS);
    const stop = () => window.clearInterval(timer);
    // Don't pile up advances while the tab sits in the background.
    const onVisibility = () => {
      stop();
      if (!document.hidden) {
        timer = window.setInterval(() => api.scrollNext(), AUTOPLAY_MS);
      }
    };

    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      stop();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [api, canCycle, paused]);

  if (posts.length === 0) return null;

  return (
    <Carousel
      setApi={setApi}
      opts={{ loop: canCycle, align: hasArrows ? 'start' : 'center' }}
      className="max-sm:-mx-3 max-sm:w-screen max-lg:mx-auto min-sm:max-lg:w-[calc(100vw-150px)] lg:w-full"
      aria-label="Featured posts"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <CarouselContent className="items-stretch max-sm:ps-3">
        {posts.map((post, i) => (
          <CarouselItem
            key={post.id}
            className={`basis-5/6 sm:basis-1/2 ${i === posts.length - 1 ? 'max-sm:pe-3' : ''}`}
          >
            <FeaturedCard post={post} />
          </CarouselItem>
        ))}
      </CarouselContent>
      {hasArrows && canCycle && (
        <>
          <CarouselPrevious />
          <CarouselNext />
        </>
      )}
    </Carousel>
  );
}

import type { ImageMetadata } from 'astro';
import type { ReactNode } from 'react';
import { CategoryPill } from './category-pill';
import { FormattedDate } from './formatted-date';

interface PostArticleProps {
  title: string;
  pubDate: Date;
  updatedDate?: Date;
  category?: 'dev' | 'tech' | 'ramblings';
  heroImage?: ImageMetadata;
  children?: ReactNode;
}

export function PostArticle({
  title,
  pubDate,
  updatedDate,
  category,
  heroImage,
  children,
}: PostArticleProps) {
  return (
    <article>
      <header className="mb-8 md:mb-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-[-0.035em] leading-[1.05] text-balance m-0">
          {title}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-muted-foreground">
          <span>
            <FormattedDate date={pubDate} />
            {updatedDate && (
              <>
                , updated <FormattedDate date={updatedDate} />
              </>
            )}
          </span>
          {category && <CategoryPill category={category} />}
        </div>
      </header>
      {heroImage && (
        <img
          width={1020}
          height={510}
          src={heroImage.src}
          alt=""
          className="w-full object-cover mb-8 md:mb-12 max-[57.75rem]:-mx-4 max-[57.75rem]:w-[calc(100%+2rem)] max-w-none"
        />
      )}
      <div className="prose">{children}</div>
    </article>
  );
}

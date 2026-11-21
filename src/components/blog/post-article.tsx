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
    <article className="bg-card max-[57.75rem]:-mx-4">
      {heroImage && (
        <img
          width={1020}
          height={510}
          src={heroImage.src}
          alt=""
          className="block w-full object-cover"
        />
      )}
      <div className="px-4 py-8 sm:px-8 md:px-12 md:py-12">
        <header className="mb-8 md:mb-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-[-0.035em] leading-[1.05] text-balance m-0">
            {title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-foreground/75">
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
        <div className="prose">{children}</div>
      </div>
    </article>
  );
}

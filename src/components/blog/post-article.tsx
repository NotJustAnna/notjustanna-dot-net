import type { ImageMetadata } from 'astro';
import type { ReactNode } from 'react';
import { Card, CardContent } from '../ui/card';
import { FormattedDate } from './formatted-date';

interface PostArticleProps {
  title: string;
  pubDate: Date;
  updatedDate?: Date;
  heroImage?: ImageMetadata;
  children?: ReactNode;
}

export function PostArticle({
  title,
  pubDate,
  updatedDate,
  heroImage,
  children,
}: PostArticleProps) {
  return (
    <Card className="overflow-hidden gap-0 py-0 hover:translate-y-0 -mx-3 rounded-none md:mx-0 md:rounded-2xl">
      {heroImage && (
        <div className="w-full">
          <img
            width={1020}
            height={510}
            src={heroImage.src}
            alt=""
            className="w-full object-cover"
          />
        </div>
      )}
      <CardContent className="p-6">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground mb-2">
            <FormattedDate date={pubDate} />
            {updatedDate && (
              <span className="italic">
                {' '}
                &middot; Updated <FormattedDate date={updatedDate} />
              </span>
            )}
          </p>
          <h1 className="text-4xl font-bold text-foreground">{title}</h1>
          <hr className="mt-4 border-border" />
        </div>
        <div className="prose">{children}</div>
      </CardContent>
    </Card>
  );
}
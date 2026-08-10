import { getCollection } from 'astro:content';

export const POSTS_PER_PAGE = 10;

export type Category = 'dev' | 'tech' | 'ramblings';

/** Category landing pages, keyed by their URL slug. */
export const CATEGORIES = {
  development: {
    category: 'dev',
    heading: 'Development',
    title: 'Development',
    description: 'Dev & ops posts.',
  },
  tech: {
    category: 'tech',
    heading: 'Technology',
    title: 'Tech',
    description: 'Tech posts.',
  },
  ramblings: {
    category: 'ramblings',
    heading: 'Ramblings',
    title: 'Ramblings',
    description: 'Personal posts.',
  },
} as const satisfies Record<
  string,
  { category: Category; heading: string; title: string; description: string }
>;

/** Latest highlighted posts, newest first, for the home page's featured grid. */
export async function getFeaturedPosts(limit = 4) {
  const posts = await getSortedPosts();
  return posts.filter((post) => post.data.highlight).slice(0, limit);
}

/** Every non-archived post, newest first, optionally narrowed to a single category. */
export async function getSortedPosts(category?: Category) {
  const posts = await getCollection('posts');
  return posts
    .filter((post) => !post.data.archived)
    .filter((post) => !category || post.data.category === category)
    .sort(
      (a, b) =>
        (b.data.updatedDate ?? b.data.pubDate).valueOf() -
        (a.data.updatedDate ?? a.data.pubDate).valueOf(),
    );
}

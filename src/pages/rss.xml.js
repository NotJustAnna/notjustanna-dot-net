import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';

export async function GET(context) {
	const posts = await getCollection('posts', (post) => !post.data.archived);
	const sortedPosts = [...posts].sort((a, b) => {
		const aTime = new Date(a.data.updatedDate ?? a.data.pubDate ?? 0).getTime();
		const bTime = new Date(b.data.updatedDate ?? b.data.pubDate ?? 0).getTime();
		return bTime - aTime;
	});
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: sortedPosts.map((post) => ({
			...post.data,
			link: `/post/${post.id}/`,
		})),
	});
}

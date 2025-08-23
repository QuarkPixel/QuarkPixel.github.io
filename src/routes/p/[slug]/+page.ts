import { error } from '@sveltejs/kit';
import { posts } from '$lib/posts.js';
import { type MetadataRaw, type Metadata, processMetadata } from '$lib/types/postData.js';
import type { MetaTagsProps } from 'svelte-meta-tags';

export const entries = () => posts.map((slug) => ({ slug }));

export const prerender = true;

export async function load({ params }: { params: { slug: string } }): Promise<{
	content: ConstructorOfATypedSvelteComponent;
	postMetadata: Metadata;
	pageMetaTags: MetaTagsProps;
}> {
	try {
		const post = await import(`$posts/${params.slug}.md`);

		const postMetadata = processMetadata(post.metadata as MetadataRaw);

		const pageMetaTags = Object.freeze({
			title: `${postMetadata.title.join('')} - Hsuan's Blog`,
			keywords: [...postMetadata.tags, "Hsuan's Space", 'blog'],
			description: postMetadata.description.at(-1)?.endsWith('。')
				? `${postMetadata.description.join('')}`
				: `${postMetadata.description.join('')} - ${postMetadata.author}`,
			openGraph: {
				type: 'article',
				title: `${postMetadata.title.join('')}`,
				description: postMetadata.description.join(''),
				article: {
					authors: [postMetadata.author],
					publishedTime: postMetadata.date.toISOString(),
					tags: postMetadata.tags
				}
			},
			additionalMetaTags: [
				{
					name: 'author',
					content: postMetadata.author
				}
			]
		}) satisfies MetaTagsProps;

		return {
			pageMetaTags,
			postMetadata: postMetadata,
			content: post.default
		};
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (e) {
		error(404, { message: `Could not find ${params.slug}` });
	}
}

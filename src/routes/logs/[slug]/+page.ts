import { error } from '@sveltejs/kit';
import { logs } from '$lib/posts.js';
import { type MetadataRaw, type Metadata, processMetadata } from '$lib/types/logsMetadata.js';
import type { MetaTagsProps } from 'svelte-meta-tags';

export const entries = () => logs.map((slug) => ({ slug }));

export const prerender = true;

export async function load({ params }: { params: { slug: string } }): Promise<{
	content: ConstructorOfATypedSvelteComponent;
	postMetadata: Metadata;
	pageMetaTags: MetaTagsProps;
}> {
	try {
		const post = await import(`$posts/logs/${params.slug}.md`);
		const postMetadata = processMetadata(post.metadata as MetadataRaw);

		const pageMetaTags = Object.freeze({
			title: `Logs::${postMetadata.id} - Hsuan's Blog`,
			keywords: [...postMetadata.tags, "Hsuan's Space", 'blog'],
			description: postMetadata.description.join(''),
			openGraph: {
				type: 'article',
				title: `Logs::${postMetadata.id} - Hsuan's Blog`,
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

// function normalizeWeeks(value: string) {
// 	if (/^\d+$/.test(value)) {
// 		// 将数字转换为十六进制并转为大写
// 		const hex = parseInt(value, 10).toString(16).toUpperCase();
// 		return `0x${hex}`;
// 	} else {
// 		return '0X' + value.toUpperCase().replace(/^0X/, '');
// 	}
// }

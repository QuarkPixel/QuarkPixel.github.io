import { error } from '@sveltejs/kit';
import { posts } from '$lib/posts.js';
import type { MetadataRaw, Metadata } from '$lib/types/postData.js';

export const entries = () => posts.map((slug) => ({ slug }));

export const prerender = true;

export async function load({
	params
}: {
	params: { slug: string };
}): Promise<{ content: ConstructorOfATypedSvelteComponent; metadata: Metadata }> {
	try {
		const post = await import(`../../../../posts/${params.slug}.md`);

		return {
			content: post.default,
			metadata: preprocess(post.metadata)
		};
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (e) {
		error(404, { message: `Could not find ${params.slug}` });
	}
}

function preprocess(raw: MetadataRaw): Metadata {
	return {
		title: raw.title,
		description: raw.description,
		date: new Date(raw.date),
		author: raw.author,
		tags: raw.tags,
		listSize: raw.listSize !== undefined ? raw.listSize : 'middle',
		cover: raw.cover,
		reprint: raw.reprint
			? {
					link: raw.refLink,
					thought: raw.reprintThought
				}
			: undefined,
		copyright: raw.copyright !== undefined ? raw.copyright : true
	} as Metadata;
}

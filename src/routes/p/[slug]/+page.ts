import { error } from '@sveltejs/kit';
import { posts } from '$lib/posts.js';
import { type MetadataRaw, type Metadata, processMetadata } from '$lib/types/postData.js';

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
			metadata: processMetadata(post.metadata as MetadataRaw)
		};
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (e) {
		error(404, { message: `Could not find ${params.slug}` });
	}
}

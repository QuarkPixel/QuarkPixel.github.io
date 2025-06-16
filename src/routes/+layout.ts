import { error } from '@sveltejs/kit';

export const prerender = true;

export async function load({ params, url }: { params: any; url: URL }): Promise<{ scrollThreshold: number; title?: string }> {
	// 如果不是文章页面路径,返回默认滚动阈值
	if (!url.pathname.startsWith('/p/'))
		return {
			scrollThreshold: 0
		};
	try {
		const post = await import(`../posts/${params.slug}.md`);
		return {
			scrollThreshold: 200,
			title: post.metadata.title
		};
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (e) {
		throw error(404, `Could not find ${params.slug}`);
	}
}

import { browser } from '$app/environment';
import { isFirefox } from '$lib/utils/isFirefox.js';
import { error } from '@sveltejs/kit';
export const prerender = true;

export const load = async ({ params, url }: { params: Record<string, string>; url: URL }) => {
  if(browser && isFirefox()) document.documentElement.classList.add('firefox');
	// 根据路径返回不同的配置
	switch (true) {
		case url.pathname.startsWith('/p/'): {
			try {
				const post = await import(`../../posts/${params.slug}.md`);
				return {
					scrollThreshold: 200,
					title: post.metadata.title
				};
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
			} catch (e) {
				throw error(404, `Could not find ${params.slug}`);
			}
		}

		default: {
			return {
				scrollThreshold: 0
			};
		}
	}
};

// +layout.ts
import { error } from '@sveltejs/kit';
import { isSafari } from '$lib/utils/isSafari.js';
import { browser } from '$app/environment';

export const prerender = true;

export const load = async ({ params, url }: { params: Record<string, string>; url: URL }) => {
	// 判断是否为 Safari 浏览器
	// src/app.css:25
	if (browser && !isSafari()) document.documentElement.classList.add('not-safari');

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

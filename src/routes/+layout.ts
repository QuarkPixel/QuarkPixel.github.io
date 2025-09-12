import { browser } from '$app/environment';
import { isFirefox } from '$lib/utils/isFirefox.js';
import { error } from '@sveltejs/kit';
import type { MetaTagsProps } from 'svelte-meta-tags';
import { BASE_URL } from '$lib/config.js';

export const prerender = true;

export const load = async ({ params, url }: { params: Record<string, string>; url: URL }) => {
	if (browser && isFirefox()) document.documentElement.classList.add('firefox');
	const baseMetaTags = Object.freeze({
		title: "Hsuan's Space",
		keywords: ["Hsuan's Space", 'blog'],
		description:
			"Welcome to Hsuan's personal space - A collection of thoughts, experiences, and creative works by Xuancong Meng.",
		canonical: new URL(url.pathname, BASE_URL).href,
		robots: 'index, follow',
		openGraph: {
			type: 'website',
			url: new URL(url.pathname, BASE_URL).href,
			title: "Hsuan's Space",
			description: 'A collection of thoughts, experiences, and creative works by Xuancong Meng.',
			siteName: "Hsuan's Space",
			images: [
				{
					url: `${BASE_URL}/meta/og-image.webp`,
					alt: "Hsuan's Space"
				}
			]
		},
		twitter: {
			card: 'summary',
			image: `${BASE_URL}/meta/twitter-image.webp`,
			imageAlt: "Hsuan's Space"
		},
		additionalLinkTags: [
			{
				rel: 'icon',
				href: `${BASE_URL}/favicon.ico`
			},
			{
				rel: 'apple-touch-icon',
				href: `${BASE_URL}/meta/apple-touch-icon.png`,
				sizes: '76x76'
			},
			{
				rel: 'alternate',
				type: 'application/rss+xml',
				title: "RSS Feed for Hsuan's Space",
				href: `${BASE_URL}/feed/rss.xml`
			},
			{
				rel: 'alternate',
				type: 'application/atom+xml',
				title: "Atom Feed for Hsuan's Space",
				href: `${BASE_URL}/feed/atom.xml`
			},
			{
				rel: 'alternate',
				type: 'application/json',
				title: "JSON Feed for Hsuan's Space",
				href: `${BASE_URL}/feed/feed.json`
			}
		]
	}) satisfies MetaTagsProps;

	let pageBehavior;

	// 根据路径返回不同的配置
	switch (true) {
		case url.pathname.startsWith('/p/'): {
			try {
				const post = await import(`../../posts/${params.slug}.md`);
				pageBehavior = {
					scrollThreshold: 200,
					title: post.metadata.title,
					titleClass: 'font-noto-serif'
				};
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
			} catch (e) {
				throw error(404, `Could not find ${params.slug}`);
			}
			break;
		}
		case url.pathname.startsWith('/logs/'): {
			pageBehavior = {
				scrollThreshold: 300,
				title: 'Logs::' + params.slug,
				titleClass: 'font-calluna'
			};
			break;
		}
		default: {
			pageBehavior = {
				scrollThreshold: 0
			};
		}
	}

	return { pageBehavior, baseMetaTags };
};

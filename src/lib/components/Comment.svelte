<script lang="ts">
	const { ...rest } = $props();
	import { browser } from '$app/environment';
	import { page } from '$app/state';
	import { getThemeMode, themeMode } from '$lib/stores/theme.js';

	let themeUrl = $state(browser ? `${page.url.origin}/assets/giscus/${getThemeMode()}.css` : '');

	$effect(() => {
		themeUrl = browser ? `${page.url.origin}/assets/giscus/${$themeMode}.css` : '';
	});

	$effect(() => {
		const styleUrl = themeUrl; // Make sure to capture the themeUrl
		const giscusFrame = document.querySelector('.giscus-frame') as HTMLIFrameElement;
		if (giscusFrame?.contentWindow) {
			giscusFrame.contentWindow.postMessage(
				{
					giscus: {
						setConfig: {
							theme: styleUrl
						}
					}
				},
				'https://giscus.app'
			);
		}
	});
</script>

<div {...rest}>
	{#if browser && themeUrl}
		<script
			src="https://giscus.app/client.js"
			data-repo="QuarkPixel/QuarkPixel.github.io"
			data-repo-id="R_kgDOOvxbEg"
			data-category="Announcements"
			data-category-id="DIC_kwDOOvxbEs4Crj-1"
			data-mapping="pathname"
			data-strict="0"
			data-reactions-enabled="1"
			data-emit-metadata="0"
			data-input-position="top"
			data-theme={themeUrl}
			data-lang="en"
			data-loading="lazy"
			crossorigin="anonymous"
			async
		>
		</script>
	{/if}
</div>

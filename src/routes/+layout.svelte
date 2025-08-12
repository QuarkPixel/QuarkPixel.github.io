<script lang="ts">
	import '../app.css';
	import '$lib/components/logo/logoIcon';
	import '$lib/styles/fonts';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import FooterBar from '$lib/components/FooterBar.svelte';
	import UmamiAnalytics from '$lib/components/UmamiAnalytics.svelte';
	import { afterNavigate, beforeNavigate } from '$app/navigation';

	const { data, children } = $props();

	const links = [
		{ label: 'Blog Space', href: '/' },
		{ label: 'About Me', href: '/about' }
	];

	// 滚动状态管理
	let scrollContainer: Element | null;
	let currentPath: string | null = $state.raw(null);

	// 获取滚动容器
	function getScrollContainer() {
		if (!scrollContainer) {
			scrollContainer = document.querySelector('.sveltekit-body');
		}
		return scrollContainer;
	}

	// 保存滚动位置
	function saveScrollPosition(path: string) {
		const container = getScrollContainer();
		if (container) {
			sessionStorage.setItem(`scroll_${path}`, container.scrollTop.toString());
		}
	}

	// 恢复滚动位置
	function restoreScrollPosition(path: string) {
		const container = getScrollContainer();
		if (!container) return;

		const savedScroll = sessionStorage.getItem(`scroll_${path}`);
		if (savedScroll) {
			container.scrollTop = parseInt(savedScroll);
		}
	}

	// 重置滚动位置
	function resetScroll() {
		const container = getScrollContainer();
		if (container) {
			container.scrollTop = 0;
		}
	}

	// 导航前：保存当前页面的滚动位置
	beforeNavigate(() => {
		if (currentPath) {
			saveScrollPosition(currentPath);
		}
	});

	// 导航后：更新路径并重置滚动位置
	afterNavigate(() => {
		currentPath = location.pathname;
		if (!location.hash) resetScroll();
	});

	// 初始化：设置当前路径并尝试恢复滚动位置
	$effect(() => {
		currentPath = location.pathname;
		if (!location.hash) restoreScrollPosition(currentPath);
	});
</script>

<div class="main min-h-[100vh] flex flex-col relative snap-end">
	<Header titleInfo={data} {links} />
	<div class="flex-1 flex flex-col items-center justify-center py-5">
		{@render children()}
	</div>
</div>
<Footer />
<FooterBar />
<UmamiAnalytics />

<svelte:head>
	<title>Hsuan's Space</title>
	<meta
		name="description"
		content="Welcome to Hsuan's personal space - A collection of thoughts, experiences, and creative works by Xuancong Meng."
	/>
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta name="robots" content="index, follow" />
	<meta property="og:title" content="Hsuan's Space" />
	<meta
		property="og:description"
		content="A collection of thoughts, experiences, and creative works by Xuancong Meng."
	/>
	<meta property="og:type" content="website" />
	<link
		rel="alternate"
		type="application/rss+xml"
		title="RSS Feed for Hsuan's Space"
		href="/feed/rss.xml"
	/>
	<link
		rel="alternate"
		type="application/atom+xml"
		title="Atom Feed for Hsuan's Space"
		href="/feed/atom.xml"
	/>
	<link
		rel="alternate"
		type="application/json"
		title="JSON Feed for Hsuan's Space"
		href="/feed/feed.json"
	/>
</svelte:head>

<style lang="scss">
</style>

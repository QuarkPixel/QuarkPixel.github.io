<script lang="ts">
	import '../app.css';
	import '$lib/components/logo/logoIcon';
	import '$lib/styles/fonts';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import FooterBar from '$lib/components/FooterBar.svelte';
	import UmamiAnalytics from '$lib/components/UmamiAnalytics.svelte';
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import { MetaTags, deepMerge } from 'svelte-meta-tags';
	const { data, children } = $props();

	let metaTags = $derived(deepMerge(data.baseMetaTags, page.data.pageMetaTags));

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

<MetaTags {...metaTags} />

<div class="main min-h-[100vh] pt-[44px] md:pt-[58px] flex flex-col relative snap-end">
	<Header headerInfo={data.pageBehavior} {links} />
	<div class="flex-1 flex flex-col items-center justify-center py-5">
		{@render children()}
	</div>
</div>
<Footer />
<FooterBar />
<UmamiAnalytics />

<svelte:head>
	<meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

<style lang="scss">
</style>

<script lang="ts">
	import { Switch } from '@skeletonlabs/skeleton-svelte';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { type CheckedChangeDetails } from '@zag-js/switch';
	import Icon from '@iconify/svelte';
	import { setThemeMode, isDarkMode, type ThemeMode } from '$lib/stores/theme.js';
	const { class: className = '', ...rest } = $props();

	// Favicon 路径
	const FAVICON_PATHS = {
		LIGHT: '/favicon/light.svg',
		DARK: '/favicon/dark.svg'
	} as const;

	// 状态管理
	let useAutoTheme = $state(browser ? sessionStorage.getItem('auto-theme-mode') !== 'false' : true);
	let isInitialized = $state(false);

	// 初始化主题
	onMount(() => {
		if (!browser) return;

		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

		// 同步主题
		const syncTheme = () => {
			if (useAutoTheme) {
				const isDark = mediaQuery.matches;
				setThemeMode(isDark ? 'dark' : 'light');
			}

			// 更新 DOM 和 favicon
			const isDark = $isDarkMode;
			document.documentElement.setAttribute('data-mode', isDark ? 'dark' : 'light');
			updateFavicon(isDark);
		};

		syncTheme();
		isInitialized = true; // 确保初始化完成

		mediaQuery.addEventListener('change', syncTheme);

		// 清理
		return () => mediaQuery.removeEventListener('change', syncTheme);
	});

	// 处理主题切换
	function handleThemeToggle(event: CheckedChangeDetails): void {
		if (!browser) return;

		useAutoTheme = false;
		sessionStorage.setItem('auto-theme-mode', 'false');
		const newTheme: ThemeMode = event.checked ? 'light' : 'dark';
		setThemeMode(newTheme);
	}

	// 更新 favicon
	function updateFavicon(isDark: boolean): void {
		if (!browser) return;

		const faviconPath = isDark ? FAVICON_PATHS.DARK : FAVICON_PATHS.LIGHT;
		const faviconType = 'image/svg+xml';

		let faviconLink = document.querySelector('link[rel="icon"]') as HTMLLinkElement | null;

		if (!faviconLink) {
			faviconLink = document.createElement('link');
			faviconLink.rel = 'icon';
			document.head.appendChild(faviconLink);
		}

		faviconLink.href = faviconPath;
		faviconLink.type = faviconType;
	}
</script>

<!-- 避免 FOUC -->
<svelte:head>
	<script>
		(function() {
			const savedTheme = sessionStorage.getItem('theme-mode');
			const isDark = savedTheme ? savedTheme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
			document.documentElement.setAttribute('data-mode', isDark ? 'dark' : 'light');
		})();
	</script>
</svelte:head>

<div
    class="flex items-center gap-2 rounded-full {className}"
    style={!isInitialized ? 'opacity: 0' : 'opacity: 1; transition: opacity 0.2s'}
    {...rest}
>
	<Switch
		name="mode"
		controlClasses="bg-surface-950/30"
		checked={!$isDarkMode}
		thumbClasses="bg-background"
		onCheckedChange={handleThemeToggle}
		label={$isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
	>
		{#snippet inactiveChild()}
			<Icon icon="gravity-ui:moon" class="text-sm" />
		{/snippet}
		{#snippet activeChild()}
			<Icon icon="gravity-ui:sun" class="text-sm" />
		{/snippet}
	</Switch>
</div>

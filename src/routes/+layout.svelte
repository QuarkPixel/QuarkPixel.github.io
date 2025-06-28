<script lang="ts">
	import '../app.css';
	import '$lib/components/logo/logoIcon';
	import '$lib/styles/fonts';

	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import FooterBar from '$lib/components/FooterBar.svelte';
	import UmamiAnalytics from '$lib/components/UmamiAnalytics.svelte';

	const { data, children } = $props();

	const links = [
		{ label: 'Blog Space', href: '/' },
		{ label: 'About Me', href: '/about' }
	];
</script>

<div
	class="main min-h-[100vh] bg-surface-50-950 flex flex-col shadow dark:shadow-none relative snap-end"
>
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
</svelte:head>

<style lang="scss">
</style>

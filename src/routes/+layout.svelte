<script lang="ts">
	import '../app.css';
	import '$lib/components/logo/logoIcon';
	import '$lib/styles/fonts';

	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	const { data, children } = $props();

	const links = [
		{ label: 'Blog Space', href: '/' },
		{ label: 'About Me', href: '/about' }
	];

</script>

<div class="main min-h-[100vh] bg-surface-50-950 flex flex-col shadow dark:shadow-none z-1 relative">
	<Header titleInfo={data} {links} />
	<div class="flex-1 flex flex-col items-center justify-center py-5">
		{@render children()}
	</div>
</div>
<Footer />


<style lang="scss">

</style>

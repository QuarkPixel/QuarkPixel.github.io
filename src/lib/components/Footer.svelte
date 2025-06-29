<script lang="ts">
	import { getColorful } from '../utils/colorful.js';

	const links = [
		{ label: 'Privacy Policy', href: '/privacy', blank: false },
		{ label: 'RSS', href: '/feed/rss.xml', blank: true },
		{
			label: 'Source Code',
			href: 'https://github.com/QuarkPixel/QuarkPixel.github.io',
			blank: true
		}
	];
</script>

<footer class="py-6 text-sm flex flex-col items-center gap-2 snap-end font-gravitas-one">
	<div class="flex gap-4 text-surface-800-200">
		{#each links as link, i (i)}
			<a href={link.href} class={getColorful(i)} target={link.blank ? '_blank' : '_self'}
				>{link.label}</a
			>
			{#if i !== links.length - 1}
				/
			{/if}
		{/each}
	</div>
	<div class="text-center font-noto-serif text-surface-600-400">
		Powered by <a href="https://svelte.dev" target="_blank" rel="noopener noreferrer">Svelte</a> ·
		Designed by
		<a href="https://github.com/QuarkPixel" target="_blank" rel="noopener noreferrer">QuarkPixel</a>
	</div>
</footer>

<script lang="ts">
	import Icon from '@iconify/svelte';

	const socialLinks = [
		{
			href: 'https://unsplash.com/@quarkpixel',
			icon: 'cib:unsplash',
			desc: 'Unsplash'
		},
		{
			href: 'https://github.com/QuarkPixel',
			icon: 'tabler:brand-github-filled',
			desc: 'Github'
		},
		{
			href: 'mailto:xuancongmeng@gmail.com',
			icon: 'tabler:mail-filled',
			desc: 'Email',
			class: 'text-surface-50-950 bg-surface-950-50'
		},
		{
			href: 'https://twitter.com/quark_pixel',
			icon: 'tabler:brand-twitter-filled',
			desc: 'Twitter'
		},
		{
			href: 'https://space.bilibili.com/377074719',
			icon: 'tabler:brand-bilibili',
			desc: 'bilibili'
		}
	];
</script>

<div
	class="social-list flex gap-5 justify-center flex-wrap absolute bottom-16 left-0 right-0 rounded-2xl *:btn
		*:text-xl *:hover:preset-filled-primary-500"
>
	{#each socialLinks as { href, icon, desc, class: className } (href)}
		<a {href} target="_blank" class={className}>
			<Icon {icon} />
			<div class="desc-wrapper">
				<div class="desc">{desc}</div>
			</div>
		</a>
	{/each}
</div>

<style>
	.social-list {
		> a {
			filter: unset;
			overflow: hidden;
			gap: 0;

			.desc-wrapper {
				display: grid;
				grid-template-columns: 0fr;
				transition:
					grid-template-columns 0.3s,
					opacity 0.15s ease;
				opacity: 0;

				.desc {
					font-family: var(--font-caveat);
					grid-column: 1 / span 2;
				}
			}

			&:hover {
				gap: 0.5rem;

				.desc-wrapper {
					opacity: 1;
					grid-template-columns: 1fr;
				}
			}
		}
	}
</style>

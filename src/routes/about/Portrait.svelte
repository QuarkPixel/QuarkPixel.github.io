<script lang="ts">
	import { Marquee } from '@selemondev/svelte-marquee';
	import Icon from '@iconify/svelte';

	let banners: string[] = [];
	{
		const bannerElement = ['QuarkPixel', 'Xuancong Meng', 'Hsuan'];
		for (let i = 0; i < 2; i++) {
			banners.push(...bannerElement);
		}
	}
</script>

<div class="cover" style:--border-width="27px">
	<div class="marquees absolute w-full h-full top-0 left-0">
		{#each [{ direction: 'top', rotate: 180 }, { direction: 'bottom', rotate: 0 }] as strip, i (i)}
			<div
				class="text-background whitespace-nowrap overflow-hidden absolute heading-font-family"
				style="
					height: var(--border-width);
					width: 100%;
					transform: rotate({strip.rotate}deg);
					{strip.direction}: 0;
					left: 0;
				"
			>
				<Marquee fade={true}>
					{#each banners as banner, i (i)}
						<span class="leading-[var(--border-width)] text-base font-gravitas-one">{banner}</span>
						<div class="h-full flex items-center px-3 hover:*:rotate-190 hover:*:scale-130">
							<Icon
								icon="bi:emoji-smile-upside-down-fill"
								class="text-xs ease-jelly duration-1000 transition-transform"
							/>
						</div>
					{/each}
				</Marquee>
			</div>
		{/each}
	</div>
	<div class="image"></div>
</div>

<style lang="scss">
	.cover {
		width: 100%;
		height: 300px;
		max-width: 900px;

		padding: var(--border-width);

		position: relative;
		background-color: var(--color-primary-500);

		> .image {
			background: linear-gradient(180deg, #cfe3dd 0%, #dfebde 47%, #eae5d4 87%, #ebdfd5 100%);
			height: 100%;
			position: relative;

			&::before {
				content: '';
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background: url('/cover.webp') center bottom;
				background-size: cover;
			}
		}
	}
</style>

<script lang="ts">
	import { page } from '$app/state';
	import ThemeSwitch from '$lib/components/ThemeSwitch.svelte';
	import { H6 } from '$lib/components/typography/index.js';
	import Icon from '@iconify/svelte';
	import { blur } from 'svelte/transition';
	import Logo from '$lib/components/Logo.svelte';
	import { usePixelPerfectedNoise } from '../utils/pixelPerfectedNoise.js';
	import { getColorful } from '../utils/colorful.js';
	import Travelling from '$lib/components/Travelling.svelte';

	const { titleInfo, links } = $props();

	const noiseTextureSize = usePixelPerfectedNoise();

	let scrollContainer: Element | null = null;
	let displayTitle = $state.raw(false);

	$effect(() => {
		if (!titleInfo.scrollThreshold) {
			displayTitle = false;
			return;
		}

		scrollContainer = document.querySelector('body > div');
		if (!scrollContainer) return;

		function updateScrollInfo() {
			displayTitle = scrollContainer!.scrollTop > titleInfo.scrollThreshold;
		}

		updateScrollInfo();
		scrollContainer.addEventListener('scroll', updateScrollInfo);

		return () => {
			scrollContainer?.removeEventListener('scroll', updateScrollInfo);
		};
	});

	let logoOfficial = $state.raw(true);
</script>

<div class="header relative" style:--noise-size="{$noiseTextureSize}px">
	<div>
		<div class="grow flex gap-4">
			<a href="/" class="logo self-baseline">
				<Logo
					official={logoOfficial}
					class="h-[30px] w-[40px]"
					onmouseenter={() => logoOfficial = false}
					onmouseleave={() => logoOfficial = true}
				/>
			</a>
			{#if displayTitle}
				<div
					class="title absolute top-0 left-[10%] right-[10%] h-full flex items-center justify-center
					opacity-80"
					transition:blur
				>
					<button
						type="button"
						class=" hover:preset-tonal-surface"
						title="Back"
						onclick={() => history.back()}>
						<Icon icon="gravity-ui:chevron-left" />
					</button>
					<H6 class="font-noto-serif text-center py-2 px-3">{titleInfo.title}</H6>
				</div>
			{:else}
				<div transition:blur class="self-baseline flex items-end gap-1">
					{#each links as { label, href }, i (i)}
						<a
							{href}
							class="link h6
								{getColorful(i)}
								{(page.url.pathname === href) ? 'selected' : ''}
							"
						>{label}</a>
					{/each}
				</div>
			{/if}
		</div>
		<div class="flex gap-4">
			{#if !displayTitle}
				<Travelling />
			{/if}
			<ThemeSwitch />
		</div>
	</div>
</div>

<style lang="scss">
  @use '../styles/variable.css' as *;

  .header {
    @extend .noise-texture;
    min-width: 100%;
    padding: 0 20px;
    position: sticky;
    top: 0;
    z-index: 2;

    backdrop-filter: blur(12px) saturate(200%);

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 1px;
      background-color: light-dark(#fffa, #fff2);
    }

    > div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;

      width: calc(var(--auto-width) - 40px);
      margin: 0 auto;
      /*padding: 0 5%;*/
    }
  }

  .logo {
    margin: .8rem 0;
    font-size: 30px;
    @media (width >= 48rem) {
      font-size: 33.75px; /* 30px * 1.125 */
    }
  }

  .title {

    > button {
      transition: .6s var(--ease-jelly) !important;
      opacity: 0;
      width: 0;
      border-radius: var(--radius-base);
      scale: 1 .4;
      filter: blur(3px);
    }

    &:hover > button {
      opacity: 1;
      width: 28px;
      padding: 2px;
      scale: 1;
      filter: unset;
    }

  }

  .link {
    align-items: center;
    display: flex;
    flex-direction: row;
    opacity: .8;
    padding: 0 1rem;
    position: relative;
    transition: 500ms var(--ease-jelly);
    white-space: nowrap;
    font-family: var(--font-gravitas-one);

    &::before,
    &::after {
      background-color: currentColor;
      content: '';
      display: block;
      height: 1px;
      margin: 0 .3rem;
      opacity: 0;
      position: absolute;
      transition: 500ms var(--ease-jelly);
      width: 1.5rem;
    }

    &::before {
      left: 0;
    }

    &::after {
      right: 0;
    }

    &:hover {
      opacity: 1;

      &::before,
      &::after {
        width: .7rem;
        margin: 0;
        opacity: 1;
      }
    }
  }

  .selected {
    opacity: 1;
    text-decoration: underline;
  }
</style>

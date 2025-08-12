<script lang="ts">
	import { page } from '$app/state';
	import ThemeSwitch from '$lib/components/ThemeSwitch.svelte';
	import { H6 } from '$lib/components/typography/index.js';
	import Icon from '@iconify/svelte';
	import { blur, fly } from 'svelte/transition';
	import Logo from '$lib/components/Logo.svelte';
	import { usePixelPerfectedNoise } from '../utils/pixelPerfectedNoise.js';
	import { getColorful } from '../utils/colorful.js';
	import Travelling from '$lib/components/Travelling.svelte';
	import { Popover } from '@skeletonlabs/skeleton-svelte';

	const { titleInfo, links } = $props();

	const noiseTextureSize = usePixelPerfectedNoise();

	let scrollContainer: Element | null = null;
	let displayTitle = $state.raw(false);
	let mobileMenuOpen = $state.raw(false);

	$effect(() => {
		if (!titleInfo.scrollThreshold) {
			displayTitle = false;
			return;
		}

		scrollContainer = document.querySelector('.sveltekit-body');
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

<div class="header relative px-[20px] py-1.5 md:py-3" style:--noise-size="{$noiseTextureSize}px">
	<div>
		<div class="grow flex items-end gap-1 md:gap-4">
			<a href="/" class="hidden sm:block scale-75 md:scale-100">
				<Logo
					official={logoOfficial}
					class="h-[30px] w-[40px]"
					onmouseenter={() => logoOfficial = false}
					onmouseleave={() => logoOfficial = true}
				/>
			</a>
			{#if displayTitle}
				<div
					class="title absolute top-0 w-2/3 left-1/2 -translate-x-1/2 h-full flex items-center justify-center
					opacity-80"
					transition:blur
				>
					<button
						type="button"
						class="hover:bg-background scale-80 md:scale-100"
						title="Back"
						onclick={() => history.back()}
					>
						<Icon icon="gravity-ui:chevron-left" />
					</button>
					<H6 class="font-noto-serif text-center py-2 px-3 truncate">{titleInfo.title}</H6>
				</div>
			{:else}
				<div transition:blur class="flex gap-1">
					{#each links as { label, href }, i (i)}
						<a
							{href}
							class="link h6 leading-4
								{getColorful(i)}
								{(page.url.pathname === href) ? 'selected' : ''}
							"
						>{label}</a>
					{/each}
				</div>
			{/if}
		</div>
		<div class="flex h-[26.88px] items-center sm:gap-4 sm:flex">
			{#if !displayTitle}
				<div class="flex h-full" transition:blur>
					<Travelling class="hidden sm:inline-flex" />
				</div>
			{/if}
			<ThemeSwitch class="hidden sm:inline-flex" />

			<Popover
				open={mobileMenuOpen}
				onOpenChange={(e) => (mobileMenuOpen = e.open)}
				positioning={{ placement: 'bottom-end', gutter: 20 }}
				triggerBase="btn px-2 {mobileMenuOpen ? 'preset-filled-primary-500' : 'hover:preset-tonal'}"
				classes="h-4/5 flex sm:hidden"
				contentBase="overflow-visible"
				zIndex="3"
			>
				{#snippet trigger()}
					<Icon icon="gravity-ui:bars" />
				{/snippet}
				{#snippet content()}
					<div
						class="flex flex-col items-end p-[2px] gap-3 sm:hidden
						*:shadow-[0_5px_15px_#0003] *:outline-1 *:outline-surface-50 dark:*:outline-surface-800!"
						transition:fly={{y:-20}}
					>
						<Travelling />
						<ThemeSwitch island/>
					</div>
				{/snippet}
			</Popover>
		</div>
	</div>
</div>

<style lang="scss">
  @use '../styles/variable.css' as *;

  .header {
    @extend .noise-texture;
    width: 100%;
    position: sticky;
    top: 0;
    z-index: 2;

    backdrop-filter: blur(12px) saturate(200%);

    /* Highlight line */
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

      width: var(--auto-width);
      height: 100%;
      max-width: 100%;
      margin: 0 auto;
    }
  }

  .title {
    > button {
      transition: .6s var(--ease-jelly) !important;
      opacity: 0;
      width: 0;
      border-radius: var(--radius-base);
      transform: scale(1, 0.4);
      filter: blur(3px);
    }

    &:hover > button {
      opacity: 1;
      width: 28px;
      padding: 2px;
      transform: scale(1);
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
    transition: color 500ms var(--ease-jelly);
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

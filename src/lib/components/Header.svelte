<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/state';
	import ThemeSwitch from '$lib/components/ThemeSwitch.svelte';
	import { H6 } from '$lib/components/typography/index.js';
	import Icon from '@iconify/svelte';
	import { blur } from 'svelte/transition';
	import Logo from '$lib/components/Logo.svelte';
	import { usePixelPerfectedNoise } from '../utils/pixelPerfectedNoise.js';

	const { titleInfo, links } = $props();

	const COLOR_SCHEME = [
		'hover:text-primary-700-300',
		'hover:text-secondary-700-300',
		'hover:text-tertiary-700-300'
	];

	const noiseTextureSize = usePixelPerfectedNoise();

	let displayTitle: boolean = $state.raw(browser
		&& titleInfo.scrollThreshold != 0
		&& window.scrollY > titleInfo.scrollThreshold);

	const scrollHandler: () => void = () => {
		displayTitle = window.scrollY > titleInfo.scrollThreshold;
	};

	$effect(() => {
		if (browser && titleInfo.scrollThreshold) {
			window.addEventListener('scroll', scrollHandler);

			return () => {
				window.removeEventListener('scroll', scrollHandler);
			};
		} else {
			displayTitle = false;
		}
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
					<H6 class="font-noto-serif text-center py-2 px-4">{titleInfo.title}</H6>
				</div>
			{:else}
				<div transition:blur class="self-baseline flex items-end gap-1">
					{#each links as { label, href }, i (i)}
						<a
							{href}
							class="link h6
								{COLOR_SCHEME[i % COLOR_SCHEME.length]}
								{(page.url.pathname === href) ? 'selected' : ''}
							"
						>{label}</a>
					{/each}
				</div>
			{/if}
		</div>
		<ThemeSwitch />
	</div>
</div>

<style lang="scss">
    @use '../styles/variable.css' as *;

    .header {
        @extend .noise-texture;
        min-width: 100%;
				padding: 0 10px;
        position: sticky;
        top: 0;
        z-index: 2;

        backdrop-filter: blur(10px) saturate(80%);

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
        }

        &:hover > button {
            opacity: 1;
            width: 24px;
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

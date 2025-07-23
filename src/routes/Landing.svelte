<script lang="ts">
	import { Spring, Tween } from 'svelte/motion';
	import { map, TextAnimation } from 'svelte-text-animation';
	import { browser } from '$app/environment';
	import { blur } from 'svelte/transition';

	const State = {
		hovering: {
			stiffness: 0.04,
			damping: 0.2
		},
		animating: {
			stiffness: 0.02,
			damping: 1
		}
	} as const;

	type StateType = keyof typeof State;

	let progress = new Spring(0, State.animating);
	const focusMaskRange = [0.3, 1];
	let focusMask = new Tween(focusMaskRange[0], { duration: 300 });

	let hovering = $state(false);

	function setProgressParams(state: StateType) {
		const params = State[state];
		progress.stiffness = params.stiffness;
		progress.damping = params.damping;
	}

	function animate() {
		progress
			.set(1)
			.then(() => {
				if (!hovering) return progress.set(0, { instant: true });
			})
			.then(() => {
				if (!hovering) animate();
			})
			.catch(() => {
				//Ignore error
			});
	}

	animate();

	function handleMouseMove(event: MouseEvent) {
		const target = event.currentTarget as HTMLElement;
		const rect = target.getBoundingClientRect();
		const x = event.clientX - rect.left;
		// progress.target = x / rect.width;
		progress.set(x / rect.width);
	}

	function handleMouseEnter() {
		hovering = true;
		focusMask.target = focusMaskRange[1];
		setProgressParams('hovering');
	}

	function handleMouseLeave() {
		hovering = false;
		focusMask.target = focusMaskRange[0];
		setProgressParams('animating');
		animate();
	}

	let styleCallback = $state.raw(
		(i: number) => `
			font-weight: ${map(i, 400, 700)};
			font-size: calc(clamp(72pt, 15vw, 256pt) * ${map(i, 1, 0.94)});
			color: color-mix(in oklch, var(--color-primary-700-300), var(--color-tertiary-600-400) calc(${map(i, 0, 0.8)} * var(--brightness) * 100%));
	`
	);

	let fontLoaded = $state.raw(false);
	if (browser && 'fonts' in document) {
		document.fonts.load('12px "Caveat Variable"').then(() => {
			console.log('123123123123');
			fontLoaded = true;
		});
	}
</script>

{#if fontLoaded}
	<div
		transition:blur
		class="relative cursor-default pl-[4%] pr-[8%] ml-[2%] h-[clamp(72pt,15vw,256pt)] my-15"
		onmousemove={handleMouseMove}
		onmouseenter={handleMouseEnter}
		onmouseleave={handleMouseLeave}
		role="slider"
		tabindex="0"
		aria-valuenow={progress.current}
		aria-valuemin={0}
		aria-valuemax={1}
		style="overflow-anchor: none;"
	>
		<TextAnimation
			text="Hsuan's Space"
			class="font-caveat text-primary-700-300 transition-all duration-300 whitespace-nowrap"
			style="--brightness: {focusMask.current}"
			innerClassName="leading-none"
			progress={progress.current}
			{styleCallback}
		/>
	</div>
{/if}

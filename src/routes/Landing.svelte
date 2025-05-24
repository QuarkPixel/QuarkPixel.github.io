<script lang="ts">
	import { Tween } from 'svelte/motion';
	import { map, TextAnimation } from 'svelte-text-animation';
	import { browser } from '$app/environment';
	import { isSafari } from '$lib/utils/isSafari.js';

	const { class: className = '' } = $props();

	let progress = new Tween(0);

	function action() {
		progress.set(1, { duration: 3000 }).then(() => {
			progress.set(0, { duration: 0 });
		}).then(() => action());
	}

	action();

	let styleCallback = $state.raw((i: number) => `
			font-weight: ${map(i, 400, 700)};
			font-size: calc(clamp(72pt, 15vw, 256pt) * ${map(i, 1, .94)});
			filter: sepia(${map(i, 0, 30)}%);
	`);

	if (browser && isSafari())
		styleCallback = (i: number) => `
				font-weight: ${map(i, 400, 700)};
				font-size: calc(clamp(72pt, 15vw, 100pt) * ${map(i, 1, .94)});
		`;

</script>

<TextAnimation
	text="Hsuan's Space"
	class="font-caveat text-primary-700-300 h-[clamp(72pt,15vw,256pt)] {className}"
	innerClassName="leading-none"
	progress={progress.current}
	{styleCallback}
/>
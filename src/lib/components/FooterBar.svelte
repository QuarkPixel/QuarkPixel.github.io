<script lang="ts">
	import { Marquee } from '@selemondev/svelte-marquee';

	import { onMount } from 'svelte';

	const HEIGHT = 36;

	let scrollContainer: Element | null;
	let scroll = $state.raw(0);
	let footerDisplayArea = $derived(1 - scroll / (HEIGHT * 1.2));
	let footerOffset = $derived(-scroll / 2);
	let sepia = $derived(scroll / HEIGHT);

	function updateScrollInfo() {
		const scrollHeight = scrollContainer!.scrollHeight - scrollContainer!.clientHeight;
		const currentScroll = scrollContainer!.scrollTop;
		let offset = scrollHeight - currentScroll;
		if (offset < 0) offset = 0;
		if (offset <= HEIGHT) scroll = offset;
	}

	onMount(() => {
		scrollContainer = document.querySelector('.sveltekit-body');

		updateScrollInfo();
		scrollContainer?.addEventListener('scroll', updateScrollInfo); // 监听滚动事件

		return () => {
			scrollContainer?.removeEventListener('scroll', updateScrollInfo);
		};
	});
</script>

<div
	class="bg-surface-800-200 text-surface-50-950 bottom-0 z-0 overflow-hidden relative"
	style:height={HEIGHT + 'px'}
	style:filter={`brightness(${footerDisplayArea}) sepia(${sepia})`}
>
	<div style:top={footerOffset + 'px'} class="relative">
		<Marquee
			class="font-gravitas-one motion-reduce:overflow-auto relative select-none"
			numberOfCopies={2}
		>
			<div>All content copyright by Xuancong Meng, unless otherwise noted.</div>
			<div>Reproduction without permission of the original author is prohibited.</div>
			<div>© Xuancong Meng 2025</div>
		</Marquee>
	</div>
</div>

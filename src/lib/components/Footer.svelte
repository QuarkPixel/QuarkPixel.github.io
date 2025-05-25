<script lang="ts">
	import { Marquee } from '@selemondev/svelte-marquee';

	import { onMount } from 'svelte';

	const HEIGHT = 36;

	let footerDisplayArea = $state.raw(0);

	function updateScrollInfo() {
		const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
		const currentScroll = window.scrollY;
		if (scrollHeight - currentScroll > HEIGHT) return;
		footerDisplayArea = 1 - (scrollHeight - currentScroll) / HEIGHT;
	}

	onMount(() => {
		updateScrollInfo(); // 初次加载时获取
		window.addEventListener('scroll', updateScrollInfo); // 监听滚动事件

		return () => {
			window.removeEventListener('scroll', updateScrollInfo);
		};
	});
</script>

<div
	class="bg-surface-800-200 text-surface-50-950 sticky bottom-0 z-0"
	style:height={HEIGHT + 'px'}
	style:opacity={footerDisplayArea}
>
	<Marquee
		pauseOnHover={true}
		class="font-gravitas-one motion-reduce:overflow-auto"
	>
		<div>All content copyright by Xuancong Meng, unless otherwise noted.</div>
		<div>Reproduction without permission of the original author is prohibited.</div>
		<div>© Xuancong Meng 2025</div>
	</Marquee>
</div>
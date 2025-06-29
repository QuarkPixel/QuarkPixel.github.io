<script lang="ts">
	import Icon from '@iconify/svelte';
	import { fly, slide } from 'svelte/transition';
	import { friendLinks } from '$lib/../data/friends.js';

	let isOpen = false;
</script>

<div class="flex flex-col items-center">
	<button
		class="btn btn-lg hover:opacity-80!"
		onclick={() => (isOpen = !isOpen)}
		style:opacity={isOpen ? '1' : '0.5'}
		style:margin-top={isOpen ? '20px' : '0'}
	>
		<Icon
			icon="gravity-ui:chevron-up"
			class="duration-300"
			style="rotate: {isOpen ? '0deg' : '180deg'}"
		/>
		<span class="font-caveat duration-300" style:font-weight={isOpen ? 'bold' : 'normal'}>
			Friendship Links
		</span>
	</button>
	{#if isOpen}
		<div
			transition:slide={{ duration: 300 }}
			class="mt-4 pb-[50px] mb-[-50px] font-noto-sans font-bold text-sm flex flex-wrap justify-center gap-4 mx-10"
		>
			{#each friendLinks as { href, name, desc, icon }, index (index)}
				<a
					{href}
					target="_blank"
					class="btn btn-sm preset-tonal hover:preset-filled overflow-hidden"
					transition:fly|global={{ delay: index * 30, duration: 300, y: 50 }}
					title={desc}
				>
					<Icon icon={icon ?? 'gravity-ui:link'} />
					{name}
					<!-- <div class="friend-info">
						<div class="font-medium">{name}</div>
						<div class="text-sm text-surface-600-300-token">{desc}</div>
					</div> -->
				</a>
			{/each}
		</div>
	{/if}
</div>

<style>
	/* .friend-links-grid {
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		max-width: 800px;
		margin-inline: auto;
	}

	.friend-card {
		backdrop-filter: blur(8px);
	} */
</style>

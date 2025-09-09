<script lang="ts">
	import Tags from '$lib/components/Tags.svelte';
	import type { Metadata } from '$lib/types/postMetadata.js';
	import BudouX from '$lib/components/BudouX.svelte';

	export let path: string;
	export let metadata: Metadata;
</script>

<a
	href={path}
	class="list flex justify-between p-3 rounded hover:bg-secondary-100-900/80 lg:hover:px-8
		hover:text-secondary-950-50 group/item"
>
	<div class="flex flex-col">
		<div class="font-noto-serif font-bold mb-1 text-sm sm:text-xl md:text-2xl">
			<BudouX text={metadata.title} />
		</div>
		<div
			class="text-tertiary-900-100 group-hover/item:text-secondary-700-300 font-lxgw-wenkai font-light text-xs
				sm:text-sm"
		>
			<BudouX text={metadata.description} />
		</div>
	</div>
	<div class="flex flex-col items-end justify-between gap-1 ml-4">
		<div
			class="font-calluna text-tertiary-900-100 group-hover/item:text-secondary-700-300 opacity-65 text-xs
				sm:text-base"
		>
			{new Date(metadata.date).toLocaleDateString()}
		</div>
		<Tags tags={metadata.tags} />
	</div>
</a>

<style>
	.list {
		transition:
			background-color 300ms ease,
			border-radius 300ms ease,
			padding 800ms var(--ease-jelly);
	}
</style>

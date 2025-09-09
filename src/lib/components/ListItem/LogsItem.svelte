<script lang="ts">
	import Tags from '$lib/components/Tags.svelte';
	import type { Metadata } from '$lib/types/logsMetadata.js';

	export let path: string;
	export let metadata: Metadata;
</script>

<a
	href={path}
	class="list flex justify-between px-3 py-2 rounded group/item hover:bg-tertiary-100/60 dark:hover:bg-tertiary-950/30 lg:hover:px-8
		hover:text-tertiary-950-50"
>
	<div class="flex items-center gap-3">
		<div class="relative font-calluna font-bold italic duration-300 *:duration-300 gra">
			<span class="text-tertiary-900-100 group-hover/item:text-secondary-600-400">Logs</span><span
				class="text-tertiary-200-800 group-hover/item:text-tertiary-500">::</span
			><span class="text-tertiary-950-050 group-hover/item:text-primary-600-400">{metadata.id}</span>
		</div>
		<Tags tags={metadata.tags} bgColor="bg-tertiary-500/50" color="text-tertiary-950-50"/>
	</div>
	<div class="flex items-center justify-between gap-1 ml-4">
		<div class="font-calluna text-tertiary-900-100 opacity-65 text-xs sm:text-base">
			{new Date(metadata.date).toLocaleDateString()}
		</div>
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

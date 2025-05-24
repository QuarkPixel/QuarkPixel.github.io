<script lang="ts">
	import Tags from '$lib/components/Tags.svelte';
	import type Metadata from '$lib/types/postMetadata.js';

	export let path: string;
	export let metadata: Metadata;
</script>

<a
	href={path}
	class="list flex justify-between p-3 rounded group/item hover:bg-secondary-50-950 hover:px-8 hover:text-secondary-950-50"
>
	<div class="flex flex-col">
		<div class="font-bold">{metadata.title}</div>
		<div class="font-noto-sans font-light text-sm">{metadata.description}</div>
	</div>
	<div class="flex flex-col items-end ml-1">
		<div class="font-[Georgia] oldstyle-nums opacity-65 text-base">
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
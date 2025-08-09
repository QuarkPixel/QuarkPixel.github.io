<script lang="ts">
	const { tags }: { tags: string[] } = $props();
</script>

{#if tags.length > 0}
	<div class="flex items-center gap-2">
		{#each tags as tag, i (i)}
			<div
				class="bg-secondary-500/40 text-secondary-950-50 text-sm font-caveat rounded px-2 whitespace-nowrap"
			>
				{tag}
			</div>
		{/each}
	</div>
{/if}

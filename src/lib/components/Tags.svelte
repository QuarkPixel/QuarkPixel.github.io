<script lang="ts">
	const { tags }: { tags: string[] } = $props();
</script>

{#if tags.length > 0}
	<div class="flex items-end gap-2">
		{#each tags as tag, i (i)}
			<div
				class="group-hover/item:bg-secondary-100-900 duration-300 bg-secondary-50-950 text-secondary-950-50 text-sm font-caveat
					rounded px-2 whitespace-nowrap"
			>
				{tag}
			</div>
		{/each}
	</div>
{/if}

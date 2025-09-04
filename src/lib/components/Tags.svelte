<script lang="ts">
	const {
		tags,
		bgColor = 'bg-secondary-500/40',
		color = 'text-secondary-950-50'
	}: { tags: string[]; bgColor?: string; color?: string } = $props();
</script>

{#if tags.length > 0}
	<div class="flex items-center gap-2">
		{#each tags as tag, i (i)}
			<div class="{bgColor} {color} text-sm font-caveat rounded px-2 whitespace-nowrap">
				{tag}
			</div>
		{/each}
	</div>
{/if}

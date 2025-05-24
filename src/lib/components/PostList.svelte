<script lang="ts">
	import ListItem from './ListItem.svelte';
	import type Metadata from '$lib/types/postMetadata.js';

	interface Post {
		path: string;
		metadata: Metadata;
	}

	export let posts: Post[];
</script>

{#each posts as { path, metadata }, i (path)}
	<ListItem {path} {metadata} />
	{#if i !== posts.length - 1}
		<hr class="hr border-dashed my-3 duration-700 group-hover:border-primary-500" />
	{/if}
{/each}
<script lang="ts">
	import Landing from './Landing.svelte';
	import ListItem from '$lib/components/ListItem.svelte';
	import type Metadata from '$lib/types/postMetadata.js';

	interface MarkdownModule {
		metadata: Metadata;
	}

	interface Post {
		path: string;
		metadata: Metadata;
	}

	const posts = Object.entries(import.meta.glob<MarkdownModule>('/posts/*.md'));

	const loadedPostsPromise: Promise<Post[]> = Promise.all(
		posts
			.map(([path, resolver]) =>
				resolver().then((post) => {
					return {
						path: path.replace('/posts/', '/p/').replace('.md', ''),
						metadata: post.metadata
					};
				})
			)
			.reverse()
	);
</script>

<Landing class="my-15" />

<div class="auto-width px-20 mt-5 mb-40 group">
	{#await loadedPostsPromise then loadedPosts}
		{#each loadedPosts as { path, metadata }, i (path)}
			<ListItem {path} {metadata} />
			{#if i !== posts.length - 1}
				<hr class="hr border-dashed my-3 duration-700 group-hover:border-primary-500" />
			{/if}
		{/each}
	{/await}
</div>

<svelte:head>
	<title>Hsuan's Space</title>
</svelte:head>

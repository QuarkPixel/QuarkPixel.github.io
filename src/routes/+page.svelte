<script lang="ts">
	import Landing from './Landing.svelte';
	import PostList from '$lib/components/PostList.svelte';
	import type Metadata from '$lib/types/postMetadata.js';
	import Logo from '$lib/components/Logo.svelte';

	interface MarkdownModule {
		metadata: Metadata;
	}

	interface Post {
		path: string;
		metadata: Metadata;
	}

	const posts = Object.entries(import.meta.glob<MarkdownModule>('/src/posts/*.md'));

	const loadedPostsPromise: Promise<Post[]> = Promise.all(
		posts
			.map(([path, resolver]) =>
				resolver().then((post) => {
					return {
						path: path.replace('/src/posts/', '/p/').replace('.md', ''),
						metadata: post.metadata
					};
				})
			)
			.reverse()
	);
</script>

<Landing class="mb-15" />

<div class="auto-width px-20 group">
	{#await loadedPostsPromise then loadedPosts}
		<PostList posts={loadedPosts} />
	{/await}
</div>

<svelte:head>
	<title>Hsuan's Space</title>
</svelte:head>

<script lang="ts">
	import Landing from './Landing.svelte';
	import ListItem from '$lib/components/ListItem.svelte';
	import type Metadata from '$lib/types/postData.js';
	import BlurryBackground from '$lib/components/BlurryBackground.svelte';

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

<BlurryBackground />
<Landing />

<div class="auto-width px-5 md:px-20 mt-5 group relative">
	{#await loadedPostsPromise then loadedPosts}
		{#each loadedPosts as { path, metadata }, i (path)}
			<ListItem {path} {metadata} />
			{#if i !== posts.length - 1}
				<hr class="hr border-dashed my-3 duration-700 group-hover:border-primary-500" />
			{/if}
		{/each}
	{/await}
</div>
<div
	class="h-60 auto-width px-5 md:px-20 flex items-center justify-center gap-2 sm:gap-8"
	style="overflow-anchor: none;"
>
	<div class="h-[1px] w-full bg-surface-100-900"></div>
	<div class="ml-1 sm:ml-3 whitespace-nowrap">
		<div class="text-xl sm:text-3xl font-caveat text-surface-800-200">
			Stay hungry. Stay foolish.
		</div>
		<div class="text-xs sm:text-sm font-noto-sans text-surface-400-600 ml-20 sm:ml-35">
			— Whole Earth Catalog
		</div>
	</div>
	<div class="h-[1px] w-full bg-surface-100-900"></div>
</div>

<svelte:head>
	<title>Hsuan's Space</title>
</svelte:head>

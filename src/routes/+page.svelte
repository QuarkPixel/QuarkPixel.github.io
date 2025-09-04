<script lang="ts">
	import Landing from './Landing.svelte';
	import ListItem from '$lib/components/ListItem/ListItem.svelte';
	import { type MetadataRaw as RawPost, type Metadata, processMetadata as processPost } from '$lib/types/postMetadata.js';
	import { type MetadataRaw as RawLogs, type Metadata as MetadataLogs, processMetadata as processLogs } from '$lib/types/logsMetadata.js';

	import BlurryBackground from '$lib/components/BlurryBackground.svelte';

	interface MarkdownModule<T> {
		metadata: T;
	}

	type Post = {
		type: "post"
		path: string;
		metadata: Metadata;
	} | {
		type: "logs"
		path: string;
		metadata: MetadataLogs;
	}

	// 统一加载和处理所有内容
	const posts = Object.entries(import.meta.glob<MarkdownModule<RawPost>>('/posts/*.md', { eager: true }));
	const logs = Object.entries(import.meta.glob<MarkdownModule<RawLogs>>('/posts/logs/*.md', { eager: true }));

	const loadedPosts: Post[] = [
		...posts.map(([path, post]) => ({
			path: path.replace('/posts/', '/p/').replace('.md', ''),
			metadata: processPost(post.metadata),
			type: "post" as const
		})),
		...logs.map(([path, log]) => ({
			path: path.replace('/posts/logs/', '/logs/').replace('.md', ''),
			metadata: processLogs(log.metadata),
			type: "logs" as const
		}))
	].sort((a, b) => {
		// 按日期降序排列
		const aDate = new Date(a.metadata.date);
		const bDate = new Date(b.metadata.date);
		return bDate.getTime() - aDate.getTime();
	});
</script>

<BlurryBackground />
<Landing />

<div class="auto-width px-5 md:px-20 mt-5 group relative">
	{#each loadedPosts as { type, path, metadata }, i (path)}
		<ListItem {type} {path} {metadata} />
		{#if i !== loadedPosts.length - 1}
			<hr class="hr border-dashed my-3 duration-700 group-hover:border-primary-500" />
		{/if}
	{/each}
</div>
<div class="h-60 auto-width px-5 md:px-20 flex items-center justify-center gap-2 sm:gap-8" style="overflow-anchor: none;">
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

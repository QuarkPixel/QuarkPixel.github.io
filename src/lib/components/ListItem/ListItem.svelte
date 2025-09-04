<script lang="ts">
	import PostItem from './PostItem.svelte';
	import LogsItem from './LogsItem.svelte';
	import type { Metadata as PostMetadata } from '$lib/types/postMetadata.js';
	import type { Metadata as LogMetadata } from '$lib/types/logsMetadata.js';

	export let type: 'post' | 'logs';
	export let path: string;
	export let metadata: PostMetadata | LogMetadata;
</script>

{#if type === 'post'}
	<PostItem {path} metadata={metadata as PostMetadata} />
{:else if type === 'logs'}
	<LogsItem {path} metadata={metadata as LogMetadata} />
{/if}

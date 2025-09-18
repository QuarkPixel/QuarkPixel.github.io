<script lang="ts" module>
	/* eslint-disable no-import-assign */
	import Blockquote from '$lib/components/typography/Blockquote.svelte';
	import Image from '$lib/components/typography/Image.svelte';

	export { Blockquote as blockquote };
	export { Image as img };
</script>

<script lang="ts">
	import BudouX from '$lib/components/BudouX.svelte';
	import Comment from '$lib/components/Comment.svelte';
	import Tags from '$lib/components/Tags.svelte';
	import '$lib/styles/article.scss';
	import type { Metadata } from '$lib/types/logsMetadata.js';
	import type { Snippet } from 'svelte';
	import LightBox from '$lib/js/libra.min.js';
	import { onMount } from 'svelte';

	onMount(() => {
		new LightBox();
	});

	interface Props {
		children: Snippet;
		metadata: Metadata;
	}

	const { children, metadata }: Props = $props();
</script>

<article class="prose lg:prose-xl my-4 w-[80%]">
	<header class="relative mb-10 flex flex-col items-center justify-between">
		<div
			class="absolute text-8xl sm:text-9xl opacity-5 dark:opacity-10! font-gravitas-one font-bold select-none">
			Weekly
		</div>
		<div class="relative font-calluna font-bold italic text-6xl sm:text-8xl mt-8 mb-2">
			<span
				class="text-secondary-600-400">Logs</span><span
			class="text-tertiary-200-800">::</span><span
			class="text-primary-600-400">{metadata.id}</span>
		</div>
		<div class="font-noto-sans text-center font-bold text-sm lg:text-base opacity-40" lang="zh-CN">
			<BudouX text={metadata.description} />
		</div>
		<div class="flex justify-between mt-4 mb-1">
			<Tags tags={metadata.tags} bgColor="bg-tertiary-500/40" color="text-tertiary-950-50" />
		</div>
		<div class="flex gap-4 font-calluna text-sm lg:text-base opacity-80">
			<time class="" datetime={metadata.date as unknown as string}>
				{new Date(metadata.date).toLocaleDateString()}
			</time>
		</div>
	</header>
	<div class="mb-10" lang="zh-CN">
		{@render children()}
	</div>
	<div class="text-end text-sm font-calluna opacity-50">
		© {metadata.date.getFullYear()}
		{metadata.author}
	</div>
	<Comment class="my-15" />
</article>

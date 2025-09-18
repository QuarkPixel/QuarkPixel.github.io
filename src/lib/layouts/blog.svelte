<script lang="ts" module>
	/* eslint-disable no-import-assign */
	import Blockquote from '$lib/components/typography/Blockquote.svelte';
	import Image from '$lib/components/typography/Image.svelte';

	export { Blockquote as blockquote };
	export { Image as img };
</script>

<script lang="ts">
	import '$lib/styles/article.scss';
	import type { Metadata } from '$lib/types/postMetadata.js';
	import type { Snippet } from 'svelte';
	import Tags from '$lib/components/Tags.svelte';
	import Comment from '$lib/components/Comment.svelte';
	import BudouX from '$lib/components/BudouX.svelte';
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
	<header class="mb-10">
		<h1 class="mb-2 text-start" lang="zh-CN">
			<BudouX text={metadata.title} />
		</h1>
		<div class="font-noto-sans text-sm lg:text-base opacity-70" lang="zh-CN">
			<BudouX text={metadata.description} />
		</div>
		<div class="flex justify-between my-4">
			<Tags tags={metadata.tags} />
			<div class="flex gap-4 font-calluna oldstyle-nums text-sm lg:text-base opacity-80">
				{metadata.author}
				<time class="" datetime={metadata.date as unknown as string}>
					{new Date(metadata.date).toLocaleDateString()}
				</time>
			</div>
		</div>
		<hr class="mt-4 mb-0" />
	</header>
	<div class="mb-10" lang="zh-CN">
		{@render children()}
	</div>
	{#if metadata.copyright}
		<div class="text-end text-sm font-calluna opacity-50">
			© {metadata.date.getFullYear()}
			{metadata.author}
		</div>
	{/if}
	<Comment class="my-15" />
</article>

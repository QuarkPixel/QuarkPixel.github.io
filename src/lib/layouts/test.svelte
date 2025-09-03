<script lang="ts">
	import '$lib/styles/code-highlight.css';
	import Tags from '$lib/components/Tags.svelte';
	import Comment from '$lib/components/Comment.svelte';
	import BudouX from '$lib/components/BudouX.svelte';
	import { loadDefaultSimplifiedChineseParser } from 'budoux';

	const { children, title, description, date, tags } = $props();
	const parser = loadDefaultSimplifiedChineseParser();
</script>

<article class="prose lg:prose-xl my-4 max-w-[80%]">
	<header class="mb-10">
		<h1 class="mb-2"><BudouX text={parser.parse(title)} /></h1>
		<div class="font-noto-sans text-sm lg:text-base opacity-70">
			<BudouX text={parser.parse(description)} />
		</div>
		<div class="flex justify-between my-4">
			<Tags {tags} />
			<div class="flex gap-4 font-[Georgia] oldstyle-nums text-sm lg:text-base opacity-80">
				<time class="" datetime={date}>
					{new Date(date).toLocaleDateString()}
				</time>
			</div>
		</div>
		<hr class="mt-4 mb-0" />
	</header>
	<div class="mb-10">
		{@render children()}
	</div>
	<Comment class="my-15" />
</article>

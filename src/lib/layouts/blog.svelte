<script lang="ts">
	import '$lib/styles/code-highlight.css';
	import Tags from '$lib/components/Tags.svelte';
	import Comment from '$lib/components/Comment.svelte';

	const { children, title, description, date, tags, author, copyright = true } = $props();
</script>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css" integrity="sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X" crossorigin="anonymous">

<article class="prose lg:prose-xl my-4 max-w-[80%]">
	<header class="mb-10">
		<h1 class="mb-2">{title}</h1>
		<div class="font-noto-sans text-sm lg:text-base opacity-70">{description}</div>
		<div class="flex justify-between my-4">
			<Tags {tags} />
			<div class="flex gap-4 font-[Georgia] oldstyle-nums text-sm lg:text-base opacity-80">
				{author}
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
	{#if copyright}
		<div class="text-end text-sm font-noto-serif opacity-50">
			© {new Date(date).getFullYear()}
			{author}
		</div>
	{/if}
	<Comment class="my-15" />
</article>

<style global>

    .prose > details > summary {
        font-size: smaller;
        opacity: .8;
    }
</style>

<script lang="ts">
	import '$lib/styles/code-highlight.css';
	import Tags from '$lib/components/Tags.svelte';
	import Comment from '$lib/components/Comment.svelte';
	import BudouX from '$lib/components/BudouX.svelte';
	import { loadDefaultSimplifiedChineseParser } from 'budoux';

	const { children, title, description, date, tags } = $props();
	const parser = loadDefaultSimplifiedChineseParser();
</script>

<link
	rel="stylesheet"
	href="https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css"
	integrity="sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X"
	crossorigin="anonymous"
/>

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

<style lang="scss" global>
	.prose {
		word-break: auto-phrase;

		& > details > summary {
			font-size: smaller;
			opacity: 0.8;
		}

		.anchor-link {
			font: inherit;
			color: inherit;
			text-decoration: inherit;
			position: relative;

			&::before {
				content: '#';
				position: absolute;
				left: -1em;
				font-family: var(--font-caveat);
				opacity: 0;
				transition: 0.2s;
				padding-right: 1em;
				pointer-events: none;
			}

			&:hover::before {
				opacity: 0.4;
			}
		}
	}
</style>

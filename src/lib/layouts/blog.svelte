<script lang="ts" module>
	/* eslint-disable no-import-assign */
	import {
		H1,
		H2,
		H3,
		H4,
		H5,
		H6,
		P,
		Blockquote,
		Anchor,
		Pre,
		Code,
		Keyboard,
		Mark,
		UnorderedList,
		OrderedList,
		Image,
		Table,
		TableBody,
		Italic,
		Hr
	} from '$lib/components/typography/index.js';

	export {
		H1 as h1,
		H2 as h2,
		H3 as h3,
		H4 as h4,
		H5 as h5,
		H6 as h6,
		P as p,
		Blockquote as blockquote,
		Anchor as a,
		Pre as pre,
		Code as code,
		Keyboard as kbd,
		Mark as mark,
		UnorderedList as ul,
		OrderedList as ol,
		Image as img,
		Table as table,
		TableBody as tbody,
		Italic as em,
		Hr as hr
	};
</script>

<script lang="ts">
	import '$lib/styles/code-highlight.css';
	import Tags from '$lib/components/Tags.svelte';
	import Comment from '$lib/components/Comment.svelte';

	const {
		children,
		title,
		description,
		date,
		tags,
		author,
		copyright = true
	} = $props();
</script>

<article class="auto-width max-w-[1080px] px-[5%] mb-4">
	<header class="mb-10">
		<H1 class="font-[900]">{title}</H1>
		<div class="font-noto-sans text-base opacity-70 mt-2">{description}</div>
		<div class="flex justify-between my-4">
			<Tags tags={tags} />
			<div class="flex gap-4 font-[Georgia] oldstyle-nums opacity-80">
				{author}
				<time class="" datetime={date}>
					{new Date(date).toLocaleDateString()}
				</time>
			</div>
		</div>
		<hr class="hr" />
	</header>
	<div class="blog-article mb-10">
		{@render children()}
	</div>
	{#if copyright}
		<div class="text-end text-sm font-noto-serif opacity-50">
			© {new Date(date).getFullYear()} {author}
		</div>
	{/if}
	<Comment class="my-15"/>
</article>

<style lang="scss">
  :global {
    .blog-article {
      h1, h2, h3, h4, h5, h6 {
        margin-top: .8em;
      }

      p {
        line-height: 1.6em;
        word-break: normal;
        hanging-punctuation: allow-end;
        overflow-wrap: break-word;
      }
    }
  }
</style>

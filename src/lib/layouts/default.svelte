<script lang="ts" module>
	/* eslint-disable no-import-assign */
	import Blockquote from '$lib/components/typography/Blockquote.svelte';

	export { Blockquote as blockquote };
</script>

<script lang="ts">
	import '$lib/styles/code-highlight.css';
	const { children } = $props();
</script>

<div>
	{@render children()}
</div>

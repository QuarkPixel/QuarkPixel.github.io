<script>
	const { text, class: className = '', ...rest } = $props();
</script>

{#each text as word, i (i)}
	<span style="word-break: keep-all; overflow-wrap: anywhere;" class={className} {...rest}>
		{word}
	</span>
{/each}

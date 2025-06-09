<script>
	const { children, class: className = '', ...rest } = $props();
</script>

<blockquote
	class="blockquote not-italic text-surface-800-200 my-5 text-base {className}"
	{...rest}
>
	{@render children?.()}
</blockquote>

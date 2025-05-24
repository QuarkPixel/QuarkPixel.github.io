<script>
	const { children, class: className = '', ...rest } = $props();
</script>

<blockquote class="blockquote {className}" {...rest}>{@render children?.()}</blockquote>
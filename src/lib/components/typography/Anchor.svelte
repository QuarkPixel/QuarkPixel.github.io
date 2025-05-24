<script>
	const { children, class: className = '', ...rest } = $props();
</script>

<a class="anchor {className}" {...rest}>{@render children()}</a>
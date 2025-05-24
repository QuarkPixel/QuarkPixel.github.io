<script>
	const { children, class: className = '', ...rest } = $props();
</script>

<p class="my-4 {className}" {...rest}>{@render children()}</p>
<script>
	const { children, class: className = '', ...rest } = $props();
</script>

<h2 class="h2 {className}" {...rest}>{@render children()}</h2>
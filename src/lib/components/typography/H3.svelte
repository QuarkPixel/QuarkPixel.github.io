<script>
	const { children, class: className = '', ...rest } = $props();
</script>

<h3 class="h3 {className}" {...rest}>{@render children()}</h3>
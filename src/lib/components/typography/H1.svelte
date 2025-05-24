<script>
	const { children, class: className = '', ...rest } = $props();
</script>

<h1 class="h1 {className}" {...rest}>{@render children()}</h1>
<script>
	const { children, class: className = '', ...rest } = $props();
</script>

<h4 class="h4 {className}" {...rest}>{@render children()}</h4>
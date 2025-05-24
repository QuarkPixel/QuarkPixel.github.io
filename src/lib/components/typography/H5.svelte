<script>
	const { children, class: className = '', ...rest } = $props();
</script>

<h5 class="h5 {className}" {...rest}>{@render children()}</h5>
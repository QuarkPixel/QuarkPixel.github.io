<script>
	const { children, class: className = '', ...rest } = $props();
</script>

<h6 class="h6 {className}" {...rest}>{@render children()}</h6>
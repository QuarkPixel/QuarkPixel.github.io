<script>
	const { children, class: className = '', ...rest } = $props();
</script>

<kbd class="kbd {className}" {...rest}>{@render children()}</kbd>
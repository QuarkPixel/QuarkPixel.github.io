<script>
	const { children, class: className = '', ...rest } = $props();
</script>

<del class="del{className}" {...rest}>{@render children()}</del>

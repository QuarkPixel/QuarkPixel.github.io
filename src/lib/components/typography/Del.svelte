<script>
	const { children, class: className = '', ...rest } = $props();
</script>

<del class="del font-lxgw-bright {className}" {...rest}>{@render children()}</del>
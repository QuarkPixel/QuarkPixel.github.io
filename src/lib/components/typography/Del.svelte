<script>
	const { children, class: className = '', ...rest } = $props();
</script>

<del class="del font-lxgw-wenkai {className}" {...rest}>{@render children()}</del>
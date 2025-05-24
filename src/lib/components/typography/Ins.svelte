<script>
	const { children, class: className = '', ...rest } = $props();
</script>

<ins class="ins font-lxgw-bright {className}" {...rest}>{@render children()}</ins>
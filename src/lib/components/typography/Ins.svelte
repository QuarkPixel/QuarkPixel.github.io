<script>
	const { children, class: className = '', ...rest } = $props();
</script>

<ins class="ins font-lxgw-wenkai {className}" {...rest}>{@render children()}</ins>
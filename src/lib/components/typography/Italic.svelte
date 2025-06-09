<script>
	const { children, class: className = '', ...rest } = $props();
</script>

<em class="text-base opacity-80 {className}" {...rest}>{@render children()}</em>
<script>
	const { children, class: className = '', ...rest } = $props();
</script>

<ul class="list-inside list-none space-y-2 {className}" {...rest}>{@render children()}</ul>
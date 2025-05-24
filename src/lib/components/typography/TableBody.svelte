<script>
	const { children, class: className = '', ...rest } = $props();
</script>

<tbody class="[&>tr]:hover:preset-tonal {className}" {...rest}>{@render children()}</tbody>
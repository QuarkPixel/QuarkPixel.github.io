<script>
	const { children, class: className = '', ...rest } = $props();
</script>

<code class="code {className} mx-1" {...rest}>{@render children()}</code>
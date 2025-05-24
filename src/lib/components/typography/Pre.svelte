<script>
	const { children, class: className = '', ...rest } = $props();
</script>

<pre class="pre {className}" {...rest}>{@render children()}</pre>
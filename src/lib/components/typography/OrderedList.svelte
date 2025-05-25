<script>
	const { children, class: className = '', ...rest } = $props();
</script>

<ol class="list-decimal space-y-2{className}" {...rest}>{@render children()}</ol>
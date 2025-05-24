<script>
	const { children, class: className = '', ...rest } = $props();
</script>

<table class="table caption-bottom {className}" {...rest}>{@render children()}</table>
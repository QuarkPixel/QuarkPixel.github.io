<script>
	const { src, alt = '', class: className = '', ...rest } = $props();
</script>

<img
	{src}
	{alt}
	class="{className}"
	data-libra=""
	{...rest} />
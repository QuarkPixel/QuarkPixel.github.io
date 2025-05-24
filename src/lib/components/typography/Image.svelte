<script>
	const { src, alt = '', class: className = '', ...rest } = $props();
</script>

<img
	{src}
	{alt}
	class="rounded-xs outline-white outline-4 shadow-2xl my-4 mx-1{className}"
	{...rest} />
<script>
	const { bv, class: className = '', ...rest } = $props();
</script>

<iframe class="w-full h-96 rounded aspect-video {className}"
				src="//player.bilibili.com/player.html?isOutside=true&bvid={bv}&autoplay=0"
				scrolling="no"
				border="0"
				frameborder="no"
				framespacing="0"
				allowfullscreen="true"
				title="bilibili"
				{...rest}
></iframe>
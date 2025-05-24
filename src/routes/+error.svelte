<script lang="ts">
	import { page } from '$app/state';
	import { Marquee } from '@selemondev/svelte-marquee';
</script>

<div class="flex flex-col items-center justify-center gap-5 text-center">
	<Marquee
		class="h1 font-gravitas-one w-80 h-20 motion-reduce:animate-none motion-reduce:first:hidden -mb-9"
		fade={true}
		direction="up"
	>
		{#each Array(15) as _, i (i)}
			<span class="leading-[1.8rem]">{page.status}</span>
		{/each}
	</Marquee>
	<div class="h1 font-caveat">{page.error?.message}</div>
	<a href="/" class="btn preset-filled-primary-500">Back to Home</a>
</div>

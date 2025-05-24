<script lang="ts">
	import Icon from '@iconify/svelte';
	import Portrait from './Portrait.svelte';
	import { Mark } from '$lib/components/typography/index.js';
	import SocialLinks from './SocialLinks.svelte';
</script>

<div class="mx-5 *:text-center *:font-gravitas-one">
	<div class="h1 underline decoration-primary-500 decoration-6">
		<span class="text-nowrap">I'm Xuancong Meng</span>.
	</div>
	<Portrait />
	<div class="h2">
		<span
		>Or just call me
			<span class="text-nowrap">
				<Mark>Hsuan</Mark>&thinsp;<Icon
				icon="bxs:cool"
				class="text-surface-50 bg-surface-950 rounded-full not-dark:scale-90 ease-jelly duration-1000
						hover:rotate-330 hover:scale-120 inline"
			/>
			</span>
		</span>
	</div>
	<SocialLinks />
</div>

<svelte:head>
	<title>About Hsuan</title>
	<meta name="description" content="Get to know Xuancong Meng (Hsuan) - A passionate developer and creative mind sharing thoughts and experiences" />
	<meta property="og:title" content="About Hsuan" />
	<meta property="og:description" content="Get to know Xuancong Meng (Hsuan) - A passionate developer and creative mind sharing thoughts and experiences" />
	<meta property="og:type" content="profile" />
	<meta property="profile:first_name" content="Xuancong" />
	<meta property="profile:last_name" content="Meng" />
	<meta property="profile:username" content="Hsuan" />
</svelte:head>
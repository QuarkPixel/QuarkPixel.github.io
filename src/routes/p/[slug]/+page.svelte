<script lang="ts">
	const { data } = $props();
	const Content = $derived(data.content);
</script>

<Content metadata={data.metadata} />

<svelte:head>
	<title>{data.title} - Hsuan's Blog</title>
	<meta
		name="description"
		content="{data.metadata.description.join('')} - {data.metadata.author}"
	/>
	<meta name="author" content={data.metadata.author} />
	<meta name="keywords" content={[...data.metadata.tags, "Hsuan's Space", "blog"].join(', ')} />
	<meta property="og:title" content="{data.title} - Hsuan's Blog" />
	<meta property="og:description" content={data.metadata.description.join('')} />
	<meta property="og:type" content="article" />
	<meta property="article:author" content={data.metadata.author} />
	<meta property="article:published_time" content={data.metadata.date.toISOString()} />
	<meta property="article:tag" content={data.metadata.tags.join(', ')} />
</svelte:head>

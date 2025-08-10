<script lang="ts">
	const { data } = $props();
	const Content = $derived(data.content);
</script>

<Content metadata={data.metadata} />

<svelte:head>
	<title>{data.title} - Hsuan's Blog</title>
	<meta name="description" content="{data.metadata.description} - {data.metadata.author}" />
	<meta name="author" content={data.metadata.author} />
	<meta name="keywords" content={data.metadata.tags.join(', ')} />
	<meta property="og:title" content="{data.title} - Hsuan's Blog" />
	<meta property="og:description" content={data.metadata.description} />
	<meta property="og:type" content="article" />
	<meta property="article:author" content={data.metadata.author} />
	<meta property="article:published_time" content={data.metadata.date as string} />
	<meta property="article:tag" content={data.metadata.tags.join(', ')} />
</svelte:head>

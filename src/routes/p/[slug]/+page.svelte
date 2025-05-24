<script lang="ts">
	const { data } = $props();
	const Content = $derived(data.content);
</script>

<Content />

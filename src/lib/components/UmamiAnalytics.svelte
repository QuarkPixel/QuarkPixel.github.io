<!-- Umami Analytics Component -->
<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';

  onMount(() => {
    if (browser) {
      const script = document.createElement('script');
      script.defer = true;
      script.src = 'https://cloud.umami.is/script.js';
      script.setAttribute('data-website-id', '7f58549f-17cf-495f-9d97-71e9c62228bd');
      document.head.appendChild(script);
    }
  });
</script> 
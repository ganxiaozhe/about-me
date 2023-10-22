<script lang='ts'>
  import { dev } from '$app/environment';
	import Analytics from '$lib/modules/Analytics.svelte';
  import '../app.css';
</script>

{#if !dev}
<Analytics />
{/if}

<slot />
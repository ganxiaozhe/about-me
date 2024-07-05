<script lang="ts">
	import Seo from "$lib/modules/SEO.svelte";
	import type { PageData } from "./$types";
	export let data:PageData;
</script>

<Seo title='付费辅导服务' />

<article class='container mx-auto pt-40 pb-28
prose dark:prose-invert 
lg:prose-lg xl:prose-xl'>
  <svelte:component this={data.content} />
</article>
<script lang="ts">
	import { page } from '$app/stores';

	export let title: string;
	export let description: string = '';
	export let canonicalLink: string = '';

	if ($page.url.pathname !== '/') {
		title += ` - 小蔗的小窝`;
	}
</script>

<svelte:head>
	<title>{title}</title>
	{#if description}
		<meta name="description" content={description} />
	{/if}
	<link
		rel="canonical"
		href={canonicalLink ||
			`${$page.url.origin}${$page.url.pathname}`}
	/>
</svelte:head>

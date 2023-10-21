<script lang="ts">
	import { page } from '$app/stores';
	import { PUBLIC_RELEASE, PUBLIC_TITLE, PUBLIC_URL_ORIGIN } from '$env/static/public';

	export let title: string;
	export let description: string = '';
	export let canonicalLink: string = '';

	if ($page.url.pathname !== '/') {
		title += ` - ${PUBLIC_TITLE}`;
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
			`${PUBLIC_RELEASE === 'true' ? PUBLIC_URL_ORIGIN : $page.url.origin}${$page.url.pathname}`}
	/>
</svelte:head>

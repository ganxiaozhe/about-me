import adapter from '@sveltejs/adapter-node';
// import adapter from '@sveltejs/adapter-cloudflare';
// import adapter from '@zeabur/svelte-adapter';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

import { mdsvex } from 'mdsvex';
/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extensions: ['.md'],
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
		alias: {
      "@/*": "./path/to/lib/*",
    },
	},

	extensions: ['.svelte', '.svx', '.md']
};

export default config;

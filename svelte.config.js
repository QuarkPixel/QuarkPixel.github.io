import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-static';
import MdsvexConfig from './mdsvex.config.js';
import { sveltePreprocess } from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', ...MdsvexConfig.extensions],
	preprocess: [sveltePreprocess({ scss: {} }), mdsvex(MdsvexConfig)],
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: null,
			precompress: false,
			strict: true
		}),
		prerender: {
			entries: ['*'],
			handleHttpError: ({ path, referrer, message }) => {
				if (path.startsWith('/feed/')) {
					return;
				}

				throw new Error(message);
			}
		}
	}
};

export default config;

import { defineMDSveXConfig as defineConfig } from 'mdsvex';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const baseDir = dirname(fileURLToPath(import.meta.url)) + '/src/lib/layouts/';

const config = defineConfig({
	extensions: ['.svx', '.md'],
	// smartypants: true,
	layout: {
		blog: baseDir + 'blog.svelte',
		_: baseDir + 'default.svelte'
	}
});

export default config;

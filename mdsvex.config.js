import { defineMDSveXConfig as defineConfig } from 'mdsvex';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import rehypeKatexSvelte from 'rehype-katex-svelte';
import remarkMath from 'remark-math';

const baseDir = dirname(fileURLToPath(import.meta.url)) + '/src/lib/layouts/';

const config = defineConfig({
	extensions: ['.svx', '.md'],
	remarkPlugins: [remarkMath],
	rehypePlugins: [
		[
			rehypeKatexSvelte,
			{
				macros: {
					'\\CC': '\\mathbb{C}',
					'\\vec': '\\mathbf'
				},
			}
		]
	],
	layout: {
		blog: baseDir + 'blog.svelte',
		_: baseDir + 'default.svelte'
	}
});

export default config;

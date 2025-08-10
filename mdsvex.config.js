import { defineMDSveXConfig as defineConfig } from 'mdsvex';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import rehypeKatexSvelte from 'rehype-katex-svelte';
import remarkMath from 'remark-math';
import remarkFootnotes from 'remark-footnotes';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

const baseDir = dirname(fileURLToPath(import.meta.url)) + '/src/lib/layouts/';

const config = defineConfig({
	extensions: ['.svx', '.md'],
	remarkPlugins: [remarkMath, remarkFootnotes],
	rehypePlugins: [
		rehypeSlug,
		[
			rehypeAutolinkHeadings,
			{
				behavior: 'wrap', // 将整个标题包裹在 <a> 标签中
				properties: { className: ['anchor-link'] } // 为锚点链接添加类名
			}
		],
		[
			rehypeKatexSvelte,
			{
				macros: {
					'\\CC': '\\mathbb{C}',
					'\\vec': '\\mathbf'
				}
			}
		]
	],
	layout: {
		blog: baseDir + 'blog.svelte',
		_: baseDir + 'default.svelte'
	}
});

export default config;

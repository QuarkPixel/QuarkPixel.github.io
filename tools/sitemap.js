import { createSitemap } from 'svelte-sitemap/src/index.js';

createSitemap('https://quarkpixel.github.io', {
	ignore: ['test.html', 'p.html', 'logs.html', 'google18a4f5496a4d373a.html', '404.html']
});

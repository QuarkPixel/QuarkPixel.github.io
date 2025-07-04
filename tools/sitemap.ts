import { createSitemap } from 'svelte-sitemap/src/index.js';

createSitemap('https://quarkpixel.github.io', { ignore: ['test.html', 'p.html'] });
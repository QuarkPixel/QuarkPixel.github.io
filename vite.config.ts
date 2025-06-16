import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import { generatePostsList } from './vite-plugin-generate-posts.js';
import { giscusThemePlugin } from './vite-plugin-giscus-theme.js';

export default defineConfig({
  plugins: [sveltekit(), tailwindcss(), generatePostsList(), giscusThemePlugin()]
});

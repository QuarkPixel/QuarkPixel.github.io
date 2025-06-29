import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import { generatePostsList, giscusThemePlugin, rssPlugin } from './tools/vite/index.js';

export default defineConfig({
  plugins: [
    sveltekit(),
    tailwindcss(),
    generatePostsList(),
    giscusThemePlugin(),
    rssPlugin()
  ],
  server: {
    fs: {
      allow: ['posts']
    }
  }
});

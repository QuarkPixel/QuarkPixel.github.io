import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import { resolve } from 'path';
import { generatePostsList, giscusThemePlugin, rssPlugin } from './tools/vite/index.js';

export default defineConfig({
  plugins: [
    sveltekit(),
    tailwindcss(),
    generatePostsList(),
    giscusThemePlugin(),
    rssPlugin()
  ],
  resolve: {
    alias: {
      '$posts': resolve('./posts')
    }
  },
  server: {
    fs: {
      allow: ['posts']
    }
  }
});

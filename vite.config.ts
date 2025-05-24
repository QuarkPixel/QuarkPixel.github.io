import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { generatePostsList } from './vite-plugin-generate-posts.js';

export default defineConfig({
  plugins: [tailwindcss(), sveltekit(), generatePostsList()]
});

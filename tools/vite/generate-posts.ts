import fs from 'fs';
import path from 'path';
import type { Plugin } from 'vite';
import { generatePostsPath } from '../lib/path-generator.js';

export function generatePostsList(): Plugin {
	return {
		name: 'vite-plugin-generate-posts',
		configResolved(config) {
			const projectRoot = process.cwd();

			// Initial generation
			generatePostsPath(projectRoot);

			// Only watch files in development mode
			if (config.command === 'serve') {
				const postsDir = path.join(projectRoot, 'posts');
				fs.watch(postsDir, (eventType, filename) => {
					if (filename && filename.endsWith('.md')) {
						console.log(`📝 Detected changes in posts directory: ${filename}`);
						generatePostsPath(projectRoot);
					}
				});
			}
		}
	};
}

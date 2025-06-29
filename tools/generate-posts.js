import path from 'path';
import { fileURLToPath } from 'url';
import { generatePostsFile } from './lib/posts-generator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// Run the generation
generatePostsFile(projectRoot); 
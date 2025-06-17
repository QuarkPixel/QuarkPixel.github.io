import { readdirSync } from 'fs';
import { join } from 'path';

export const posts = readdirSync(join(process.cwd(), 'posts'))
  .map(file => file.replace('.md', ''));
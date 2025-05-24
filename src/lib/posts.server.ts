import { readdirSync } from 'fs';
import { join } from 'path';

export const posts = readdirSync(join(process.cwd(), 'src/posts'))
  .map(file => file.replace('.md', ''));
import type { Plugin, ViteDevServer } from 'vite';
import path from 'path';
import { generateRssFeed } from '../../src/lib/utils/rss.js';

// 是否在开发模式下自动生成 RSS
const ENABLE_RSS_IN_DEV = false;

export function rssPlugin(): Plugin {
  return {
    name: 'vite-plugin-rss',
    configureServer(server: ViteDevServer) {
      if (ENABLE_RSS_IN_DEV) {
        // 在开发模式下监听posts目录的变化
        server.watcher.add(path.resolve('posts/**/*.md'));
        server.watcher.on('change', async (file) => {
          if (file.includes('posts/') && file.endsWith('.md')) {
            try {
              await generateRssFeed();
              console.log('✨ RSS feeds regenerated due to post changes');
            } catch (error) {
              console.error('❌ Failed to regenerate RSS feeds:', error);
            }
          }
        });
      }
    },
    async closeBundle() {
      try {
        await generateRssFeed();
        console.log('✨ RSS feeds generated successfully');
      } catch (error) {
        console.error('❌ Failed to generate RSS feeds:', error);
        // 在开发环境中抛出错误，但在生产环境中继续构建
        if (process.env.NODE_ENV === 'development') {
          throw error;
        }
      }
    }
  };
} 
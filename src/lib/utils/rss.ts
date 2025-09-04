import { Feed } from 'feed';
import fs from 'fs';
import path from 'path';
import { getAllContent, type ContentItem } from './contentProcessor.js';

export async function generateRssFeed() {
	const siteURL = 'https://quarkpixel.github.io';
	const date = new Date();

	const author = {
		name: 'Xuancong Meng',
		email: 'xuancongmeng@gmail.com',
		link: siteURL
	};

	const feed = new Feed({
		title: "Hsuan's Space",
		description: "Hsuan's personal blog about tech, life, and thoughts",
		id: siteURL,
		link: siteURL,
		language: 'zh-CN',
		image: `${siteURL}/logos/large-black.svg`,
		favicon: `${siteURL}/favicon.ico`,
		copyright: `All rights reserved ${date.getFullYear()}, Xuancong Meng`,
		updated: date,
		generator: 'Feed for Node.js',
		feedLinks: {
			rss2: `${siteURL}/feed/rss.xml`,
			json: `${siteURL}/feed/feed.json`,
			atom: `${siteURL}/feed/atom.xml`
		},
		author
	});

	try {
		// 获取所有内容
		const allContent = await getAllContent();

		// 按日期排序
		allContent.sort((a: ContentItem, b: ContentItem) => {
			const aDate = 'date' in a.metadata ? new Date(a.metadata.date) : new Date();
			const bDate = 'date' in b.metadata ? new Date(b.metadata.date) : new Date();
			return bDate.getTime() - aDate.getTime();
		});

		// 添加到RSS feed
		allContent.forEach((item: ContentItem) => {
			const url = `${siteURL}${item.urlPath}`;
			const metadata = item.metadata;

			if (item.type === 'post') {
				const postMeta = metadata as any;
				feed.addItem({
					title: postMeta.title,
					id: url,
					link: url,
					description: postMeta.description,
					content: item.content,
					author: [author],
					date: new Date(postMeta.date),
					image: postMeta.cover ? `${siteURL}${postMeta.cover}` : undefined,
					category: postMeta.tags?.map((tag: string) => ({ name: tag })) || []
				});
			} else if (item.type === 'log') {
				const logMeta = metadata as any;
				const logId = '0x' + logMeta.weekNumber.toString(16).toUpperCase();
				feed.addItem({
					title: 'Logs::' + logId,
					id: url,
					link: url,
					description: logMeta.description,
					content: item.content,
					author: [author],
					date: new Date(logMeta.date),
					category: logMeta.tags?.map((tag: string) => ({ name: tag })) || []
				});
			}
		});

		// Write files to both static and build directories
		const directories = ['static/feed'];
		// 如果在构建过程中，也写入到构建目录
		if (process.env.NODE_ENV === 'production') {
			directories.push('build/feed');
		}

		for (const dir of directories) {
			fs.mkdirSync(dir, { recursive: true });

			const writeFeeds = [
				{ filename: 'rss.xml', content: feed.rss2() },
				{ filename: 'atom.xml', content: feed.atom1() },
				{ filename: 'feed.json', content: feed.json1() }
			];

			for (const { filename, content } of writeFeeds) {
				try {
					fs.writeFileSync(path.join(dir, filename), content);
					console.log(`Generated ${filename} in ${dir} successfully`);
				} catch (error) {
					console.error(`Error writing ${filename} to ${dir}:`, error);
				}
			}
		}
	} catch (error) {
		console.error('Error generating RSS feeds:', error);
		throw error;
	}
}

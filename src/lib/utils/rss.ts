import { Feed } from 'feed';
import type { MetadataRaw } from '../types/postMetadata.js';
import fs from 'fs';
import path from 'path';
import { paths } from '../posts.js';
import { marked } from 'marked';

interface Post {
	path: string;
	metadata: MetadataRaw;
	content: string;
}

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
		// Load and parse all posts
		const allPosts = paths
			.map((slug: string) => {
				try {
					const filePath = path.join(process.cwd(), `${slug}.md`);
					const content = fs.readFileSync(filePath, 'utf-8');

					// Extract metadata from frontmatter
					const metadataMatch = content.match(/^---\n([\s\S]*?)\n---/);
					if (!metadataMatch) {
						console.warn(`No frontmatter found in ${slug}.md, skipping...`);
						return null;
					}

					const frontMatter = metadataMatch[1];
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					const metadata = frontMatter.split('\n').reduce((acc: any, line: string) => {
						const [key, ...values] = line.split(':').map((s) => s.trim());
						if (key && values.length) {
							acc[key] = values.join(':');
							if (key === 'tags') {
								acc[key] = values
									.join(':')
									.split(',')
									.map((tag) => tag.trim());
							}
							if (key === 'date') {
								acc[key] = new Date(values.join(':'));
							}
						}
						return acc;
					}, {}) as MetadataRaw;

					// Extract and convert content
					const markdownContent = content.replace(/^---\n[\s\S]*?\n---\n/, '');
					const htmlContent = marked(markdownContent);

					return {
						path: `/p/${slug}`,
						metadata,
						content: htmlContent
					} as Post;
				} catch (error) {
					console.error(`Error processing post ${slug}:`, error);
					return null;
				}
			})
			.filter(Boolean) as Post[];

		// Sort posts by date in descending order
		allPosts.sort((a: Post, b: Post) => {
			return new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime();
		});

		// Add posts to feed
		allPosts.forEach((post: Post) => {
			const url = `${siteURL}${post.path}`;
			feed.addItem({
				title: post.metadata.title,
				id: url,
				link: url,
				description: post.metadata.description,
				content: post.content,
				author: [author],
				date: new Date(post.metadata.date),
				image: post.metadata.cover ? `${siteURL}${post.metadata.cover}` : undefined,
				category: post.metadata.tags?.map((tag) => ({ name: tag })) || []
			});
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

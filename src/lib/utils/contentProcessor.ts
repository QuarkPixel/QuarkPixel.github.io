import fs from 'fs';
import path from 'path';
import { marked } from 'marked';
import type { MetadataRaw as PostMetadataRaw } from '../types/postMetadata.js';
import type { MetadataRaw as LogMetadataRaw } from '../types/logsMetadata.js';

export type ContentType = 'post' | 'log';

export interface ContentItem {
	type: ContentType;
	slug: string;
	urlPath: string;
	metadata: PostMetadataRaw | LogMetadataRaw;
	content: string;
}

function parseMetadata(frontMatter: string): PostMetadataRaw | LogMetadataRaw {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const metadata = frontMatter.split('\n').reduce((acc: any, line: string) => {
		const [key, ...values] = line.split(':').map((s) => s.trim());
		if (key && values.length) {
			const value = values.join(':');

			if (key === 'tags') {
				acc[key] = value.split(',').map((tag) => tag.trim());
			} else if (key === 'date') {
				acc[key] = new Date(value);
			} else if (key === 'weekNumber') {
				acc[key] = parseInt(value, 16);
			} else if (['reprint', 'copyright'].includes(key)) {
				acc[key] = value.toLowerCase() === 'true';
			} else {
				acc[key] = value;
			}
		}
		return acc;
	}, {});

	return metadata as PostMetadataRaw | LogMetadataRaw;
}

export function processContentFile(slug: string, contentType: ContentType): ContentItem | null {
	try {
		const filePath = path.join(
			process.cwd(),
			'posts',
			contentType === 'post' ? `${slug}.md` : `logs/${slug}.md`
		);

		const content = fs.readFileSync(filePath, 'utf-8');

		const metadataMatch = content.match(/^---\n([\s\S]*?)\n---/);
		if (!metadataMatch) {
			console.warn(`No frontmatter found in ${filePath}, skipping...`);
			return null;
		}

		const frontMatter = metadataMatch[1];
		const metadata = parseMetadata(frontMatter);

		const markdownContent = content.replace(/^---\n[\s\S]*?\n---\n/, '');
		const htmlContent = marked(markdownContent) as string;

		const urlPath = contentType === 'post' ? `/p/${slug}` : `/logs/${slug}`;

		return {
			type: contentType,
			slug,
			urlPath,
			metadata,
			content: htmlContent
		};
	} catch (error) {
		console.error(`Error processing ${contentType} ${slug}:`, error);
		return null;
	}
}

export async function getAllContent(): Promise<ContentItem[]> {
	// 从posts.js获取内容
	const { posts, logs } = await import('../posts.js');

	const allContent: ContentItem[] = [];

	// 处理posts
	posts.forEach((slug: string) => {
		const item = processContentFile(slug, 'post');
		if (item) allContent.push(item);
	});

	// 处理logs
	logs.forEach((slug: string) => {
		const item = processContentFile(slug, 'log');
		if (item) allContent.push(item);
	});

	return allContent.filter(Boolean);
}

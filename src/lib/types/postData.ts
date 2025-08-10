export interface MetadataRaw {
	title: string;
	description: string;
	date: string;
	author?: string;
	tags: string[];
	listSize?: 'small' | 'middle' | 'large';
	cover?: string; // Only when listSize: 'large'
	reprint?: boolean;
	reprintThought?: string;
	refLink?: string;
	copyright?: boolean;
}

export interface Metadata {
	title: string;
	description: string;
	date: Date;
	author?: string;
	tags: string[];
	listSize: 'small' | 'middle' | 'large';
	reprint?: {
		link?: string;
		thought?: string;
	};
	cover?: string; // Only when listSize: 'large'
	copyright: boolean;
}

export function processMetadata(raw: MetadataRaw): Metadata {
	console.log(raw.copyright !== undefined ? raw.copyright : true);
	return {
		title: raw.title,
		description: raw.description,
		date: new Date(raw.date),
		author: raw.author,
		tags: raw.tags,
		listSize: raw.listSize !== undefined ? raw.listSize : 'middle',
		cover: raw.cover,
		reprint: raw.reprint
			? {
					link: raw.refLink,
					thought: raw.reprintThought
				}
			: undefined,
		copyright: raw.copyright !== undefined ? raw.copyright : true
	} as Metadata;
}

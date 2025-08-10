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

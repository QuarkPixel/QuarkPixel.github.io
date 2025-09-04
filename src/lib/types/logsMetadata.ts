import { loadDefaultSimplifiedChineseParser } from 'budoux';

export interface MetadataRaw {
	weekNumber: number;
	description: string;
	date: string;
	author?: string;
	tags: string[];
}

export interface Metadata {
	id: string;
	weekNumber: number;
	description: string[];
	date: Date;
	author?: string;
	tags: string[];
}

export function processMetadata(raw: MetadataRaw): Metadata {
	const parser = loadDefaultSimplifiedChineseParser();

	return {
		weekNumber: raw.weekNumber,
		id: '0x' + raw.weekNumber.toString(16).toUpperCase(),
		description: parser.parse(raw.description),
		date: new Date(raw.date),
		author: raw.author,
		tags: raw.tags
	} as Metadata;
}

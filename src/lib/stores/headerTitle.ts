import { writable } from 'svelte/store';

export const title = writable<string | null>(null);

import { addIcon } from '@iconify/svelte';
import svg from './logo.svg?raw';

addIcon('custom:logo', {
	body: svg,
	width: 58,
	height: 44
});

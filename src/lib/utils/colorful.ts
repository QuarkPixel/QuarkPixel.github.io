const COLOR_SCHEME = [
	'hover:text-primary-700-300',
	'hover:text-secondary-700-300'
];

const getColorful = (index: number) => {
	return COLOR_SCHEME[index % COLOR_SCHEME.length];
};

export { getColorful };

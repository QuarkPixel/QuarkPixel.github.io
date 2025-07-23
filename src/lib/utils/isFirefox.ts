export function isFirefox() {
	const userAgent = navigator.userAgent.toLowerCase();
	return userAgent.includes('firefox');
}

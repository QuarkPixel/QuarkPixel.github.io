export function isFirefox() {
	const userAgent = navigator.userAgent.toLowerCase();
	console.log(userAgent, userAgent.includes('firefox'))
	return userAgent.includes('firefox');
}

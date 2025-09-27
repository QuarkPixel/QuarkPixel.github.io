import { goto } from '$app/navigation';

interface NavigationPath {
	pathname: string;
	hash: string;
}

class NavigationHistory {
	private history: string[] = [];
	private currentPath: NavigationPath | null = null;
	private isNavigating = false;
	private isSystemBack = false;

	constructor() {
		// 监听浏览器后退/前进事件
		if (typeof window !== 'undefined') {
			window.addEventListener('popstate', this.handlePopState.bind(this));
		}
	}

	private handlePopState() {
		this.isSystemBack = true;
	}

	update(url: URL) {
		const curUrl = {
			pathname: url.pathname,
			hash: url.hash
		};

		// 如果是系统返回，跳过历史记录逻辑
		if (this.isSystemBack) {
			this.isSystemBack = false;
			this.currentPath = curUrl;
			if (this.history.length > 0) {
				this.history.shift();
			}
			return;
		}

		// 如果正在导航中，跳过这次更新
		if (this.isNavigating) {
			this.isNavigating = false;
			this.currentPath = curUrl;
			return;
		}

		if (this.currentPath && this.currentPath.pathname !== url.pathname) {
			const currentUrl = this.currentPath.pathname + this.currentPath.hash;

			if (this.history.length === 0 || this.history[0] !== currentUrl) {
				this.history.unshift(currentUrl);
			}
		}

		this.currentPath = curUrl;
	}

	goBack(): void {
		if (this.history.length > 0) {
			this.isNavigating = true;
			const targetUrl = this.history.shift()!;
			goto(targetUrl);
		} else {
			const referrer = document.referrer;
			if (referrer && !referrer.includes(window.location.origin)) {
				goto('/');
			} else if (referrer) {
				// 外部referrer还是需要用window.location.href
				window.location.href = referrer;
			} else {
				goto('/');
			}
		}
	}
}

export const navigationHistory = new NavigationHistory();

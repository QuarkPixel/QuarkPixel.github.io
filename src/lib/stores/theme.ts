// src/lib/stores/theme.ts
import { writable, derived, get } from 'svelte/store';
import { browser } from '$app/environment';

export type ThemeMode = 'light' | 'dark';

export const DEFAULT_THEME: ThemeMode = 'dark';

// 初始化主题：优先读取 sessionStorage，否则默认 light
export const themeMode = writable<ThemeMode>(
	browser && sessionStorage.getItem('theme-mode')
		? (sessionStorage.getItem('theme-mode') as ThemeMode)
		: DEFAULT_THEME
);

export const isDarkMode = derived(themeMode, ($themeMode) => $themeMode === 'dark');
export const isLightMode = derived(themeMode, ($themeMode) => $themeMode === 'light');
export const lightDark = <T>(light: T, dark: T) => {
	return derived(isLightMode, ($isLightMode) => {
		return $isLightMode ? light : dark;
	});
};

// 设置主题并持久化
export function setThemeMode(mode: ThemeMode) {
	if (browser) {
		document.documentElement.setAttribute('data-mode', mode);
		sessionStorage.setItem('theme-mode', mode);
	}
	themeMode.set(mode);
}

export function getThemeMode(): ThemeMode {
	return get(themeMode);
}

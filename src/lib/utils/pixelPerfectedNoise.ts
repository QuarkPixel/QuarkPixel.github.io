import { browser } from '$app/environment';
import { writable, type Writable } from 'svelte/store';

const NOISE_TEXTURE_SIZE: number = 50;

export function usePixelPerfectedNoise(scale: number = 2, textureSize: number = NOISE_TEXTURE_SIZE): Writable<number> {
    const calculateSize = () => {
        if (!browser) return textureSize;
        const dpr = window.devicePixelRatio || 1;
        return textureSize * scale / dpr;
    };

    const store = writable(calculateSize());

    if (browser) {
        const updateSize = () => {
            store.set(calculateSize());
        };

        window.addEventListener('resize', updateSize);

        // 清理函数会在最后一个订阅者取消订阅时执行
        store.subscribe(() => {
            return () => window.removeEventListener('resize', updateSize);
        });
    }

    return store;
}

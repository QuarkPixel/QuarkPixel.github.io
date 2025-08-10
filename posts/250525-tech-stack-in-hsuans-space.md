---
title: Hsuan's Space 中用到的技术栈
description: 谈谈本站的开发历程
date: 2025-05-25
author: Xuancong Meng
tags: ['Web', 'Develop Diary']
layout: blog
---

关于「我要做一个关于自己的网页」这个 Flag 我已经立了若干年了，最近这段时间终于有动力来完成它。尝试了没有接触过的技术，花了近半个月的时间，完成了网页的搭建。

![Wakatime badage](https://wakatime.com/badge/user/018b19a3-343c-48f6-8ba9-5713e3a014cc/project/e4f1a103-1fe2-4a7b-afe8-35b4df2164b6.svg?style=flat-square)
_Time in this web project over all time_

本站采用了现代化的 Web 开发技术栈，主要包括：SvelteKit、TailwindCSS、MDsveX 和 Skeleton UI.

## 1. 字体

正文部分使用 [霞鹜文楷](https://github.com/lxgw/LxgwWenKai)。

#### 其余字体

- Noto Serif SC Variable
- Noto Sans SC Variable
- Caveat Variable
- Gravitas One

值得注意的是，本网站使用了[字体分包](https://chinese-font.netlify.app/zh-cn/online-split/)技术，由[中文网字计划](https://chinese-font.netlify.app/zh-cn/)支持。因此在初次访问网站时，字体会有很独特的加载顺序。

## 2. 动画

### 可变字体动画

使用自己做的另外一款组件[`svelte-text-animation`](https://github.com/QuarkPixel/svelte-text-animation)，这款组件的开发是在网页的开发过程中想到的灵感，就花了差不多一个下午的时间来实现。整体效果还是很惊艳的，用在了首页 Landing
的部分 😆。

具体实现的细节其实很是很简单的，使用一个高斯函数叠加上一个边缘递减函数，就可以实现一个平滑的动画效果。

### Logo 动画

我尝试了市面上很多的 SVG 动画库，但是要么就是太过臃肿，要么就是实现的效果很奇怪，没法做到我要求的“点对点移动”的效果。于是我心一狠，直接手撕了一个SVG动画引擎。其实实际实现起来，没有想象的那么复杂。这也多亏了
Svelte 大量的内置函数，使用起来体验很不错。

<script>
    import Logo from '$lib/components/Logo.svelte';
    import { bounceOut, elasticOut } from 'svelte/easing';
	let logoOfficial = true;
</script>

<button
  class="mt-20 mb-3 w-full flex justify-around gap-10 _:h-30 _:w-40"
  onmouseenter={() => logoOfficial = false}
  onmouseleave={() => logoOfficial = true}
>
    <Logo
        official={logoOfficial}
        easing={elasticOut}
    />
    <Logo
        official={logoOfficial}
    />
    <Logo
        official={logoOfficial}
        easing={bounceOut}
    />
</button>

<div align="center" class="mb-15 opacity-65 font-gravitas-one">↑ Hover Me ↑</div>

#### 核心代码：

```typescript
// Derive interpolated path coordinates
let interpolatedPaths: Shape[] = $derived(
	paths.map((path) =>
		path.initial.map((start, i) => {
			const end = path.target[i];
			const x = start[0] + (end[0] - start[0]) * path.tween.current;
			const y = start[1] + (end[1] - start[1]) * path.tween.current;
			return [x, y];
		})
	)
);

// Derive SVG path d attributes
let dValues: string[] = $derived(
	interpolatedPaths.map((points) => `M${points.map((point) => point.join(' ')).join('L')}Z`)
);
```

### Header 的背景噪声图

具体实现是使用一张噪声纹理图

<center>
<p>
    <img src="/noise-texture.png" alt>
    <em>噪声纹理图</em>
</p>
</center>

##### 但由于不同屏幕尺寸可能会导致纹理图发糊。因此我做了这些工作：

- 添加属性 `image-rendering: pixelated;`，具体属性说明参见[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/image-rendering)
- 动态计算图片展示大小，使得图片可以1:1像素展示在显示器上：

```typescript
function calcNoiseSize() {
	const dpr = window.devicePixelRatio || 1;
	noiseTextureSize = NOISE_TEXTURE_SIZE / dpr;
}

if (browser) {
	calcNoiseSize();
}

onMount(() => {
	window.addEventListener('resize', calcNoiseSize);

	return () => window.removeEventListener('resize', calcNoiseSize);
});
```

### Marquee

页面内所有的跑马灯效果均使用 [`svelte-marquee`](https://github.com/selemondev/svelte-marquee) 组件实现

### Markdown 渲染

使用 [MDsvex](https://mdsvex.pngwn.io/) 实现对 md 的渲染

## 部署和性能

项目使用 `@sveltejs/adapter-static` 生成静态网站，通过 GitHub Pages 进行部署。得益于 Svelte 的优秀性能和静态站点生成的特性，网站具有：

- 快速的首屏加载
- 优秀的 SEO 表现
- 简单可靠的部署流程

如果你对这个项目感兴趣，可以在 [GitHub](https://github.com/QuarkPixel/QuarkPixel.github.io) 上查看源代码，项目代码采用 GPLv3 许可证开源。

---
title: TextAnimation 的实现细节
description: 深入解析 svelte-text-animation 组件的技术实现与最新优化
date: 2025-07-21T20:44:11+08:00
author: Xuancong Meng
tags: ['Technique', 'Web']
layout: blog
---

在[之前的文章](./250525-tech-stack-in-hsuans-space)中，我简单提到了自己开发的 [`svelte-text-animation`](https://github.com/QuarkPixel/svelte-text-animation) 组件。这个组件最初是为了本站首页 Landing 部分的文字动画效果而设计的，后来觉得特别好用就抽象成了一个独立的组件。最近对组件进行了一些优化更新，借此机会来详细介绍一下这个库的实现细节。

## 核心设计思路

### 基本原理

整个动画的核心思想非常简洁：**使用高斯函数叠加边缘递减函数**，为文本中的每个字符计算一个效果强度值，然后通过回调函数将这个强度转换为具体的样式。

![Demo](https://raw.githubusercontent.com/QuarkPixel/svelte-text-animation/master/assets/example.gif)

### 数学模型

动画效果由两个关键函数组成：

1. **高斯函数**：控制效果在文本中的空间分布
2. **边缘递减函数**：确保动画在起始和结束时平滑过渡

## 最新优化：更平缓的边缘递减函数

### 原有实现的局限性

在之前的版本中，边缘递减函数使用的是简单的二次函数：

$$
f_{\text{old}}(p) = 4p(1 - p)
$$

其中 $p$ 表示动画进度（progress）。这个函数确实能够满足边界条件：在 $p = 0$ 和 $p = 1$ 时函数值为 0，在 $p = 0.5$ 时达到最大值 $1$，实现了平滑过渡的目标。

然而，这种实现存在一个显著问题：**动画效果仅在进度接近 0.5 时才能完全展现，其他位置的效果都会被显著削弱**。这意味着动画的大部分时间里，文字效果都无法达到理想状态。

### 新的数学方案

经过深入思考和数学推导，我设计了一个更高阶的多项式函数：

$$
f_{\text{new}}(p) = 1 - (2p - 1)^{2n}
$$

其中 $n$ 对应新增的 `edgeFlatness` 参数（默认值为 5），用于控制函数的平缓程度。

这个改进后的函数具有以下优秀特性：

- **保持边界条件**：当 $p = 0$ 或 $p = 1$ 时，函数值依然为 $0$
- **峰值位置不变**：在 $p = 0.5$ 时函数值仍为 $1$
- **中间区域显著改善**：通过调整 $n$ 参数，可以让更大范围内的进度值都接近最大效果强度

### 函数特性分析

通过数学分析可以发现，当 $n = 1$ 时，新函数退化为原有的二次函数。而当 $n > 1$ 时，函数变为 $2n$ 次多项式，相当于在原有基础上增加了一个可调节的平缓度参数。

<center>
<img class="outline outline-[#26796D] outline-3 w-[50%]" src="/assets/20250721-0.gif" alt="edgeFactor 函数演示" />
<em>不同 flatness 值下的边缘递减函数对比</em>
</center>

从图中可以直观看出，随着 `flatness` 参数的增大，函数在中间区域变得更加平缓，这意味着动画效果在更大的进度范围内都能保持接近最大强度，显著提升了整体的视觉表现。

## 核心实现解析

### 效果强度数组生成算法

```typescript
function generateEffectArray(
	length: number,
	progress: number,
	spread: number,
	flatness: number
): number[] {
	// 计算边缘递减因子
	const edgeFactor = 1 - Math.pow(2 * progress - 1, 2 * flatness);
	const result = new Array(length).fill(0);

	// 早期返回优化：当边缘因子为负时直接返回零数组
	if (edgeFactor <= 0) {
		return result;
	}

	// 计算当前动画焦点在文本中的位置
	const offset = progress * (length + 2 * spread + 1) - spread - 1;

	// 优化计算范围，避免不必要的高斯函数计算
	const startIdx = Math.max(0, Math.floor(offset - spread * 3));
	const endIdx = Math.min(length - 1, Math.ceil(offset + spread * 3));

	for (let i = startIdx; i <= endIdx; i++) {
		const z = (i - offset) / spread;
		const zSquared = z * z;

		// 性能优化：当 z² > 9 时，e^(-z²) < 0.01，可以忽略
		if (zSquared < 9) {
			result[i] = Math.exp(-zSquared) * edgeFactor;
		}
	}

	return result;
}
```

### 关键优化策略

1. **早期返回优化**：当边缘因子小于等于 0 时，直接返回零数组，避免后续无意义的计算
2. **智能范围限制**：仅对可能产生显著效果的字符范围进行计算，大幅降低计算复杂度
3. **高斯函数截断**：利用指数函数的快速衰减特性，当距离过远时直接跳过计算

## API 设计

### 核心参数接口

```typescript
interface Props {
	text: string;                                 // 要进行动画的文本内容
	progress: number;                             // 动画进度，取值范围 [0, 1]
	spread?: number;                              // 效果扩散半径，默认 3
	edgeFlatness?: number;                        // 边缘平缓度，默认 5
	styleCallback: (intensity: number) => string; // 强度到样式的转换函数
	innerClassName?: string;                      // 字符容器的 CSS 类名
}
```

### 实际使用示例

```svelte
<TextAnimation
    text="Hello, World!"
    {progress}
    spread={4}
    edgeFlatness={6}
    styleCallback={(intensity) => `
        transform: scale(${1 + intensity * 0.5});
        color: rgb(${255}, ${Math.floor(255 * intensity)}, ${Math.floor(255 * intensity)});
    `}
/>
```

你可以在 [Svelte Playground](https://svelte.dev/playground/434018293cfb415b925f19b47ef4a85c?version=5.33.1) 中直接体验这个组件的效果。

实际应用场景可以参考本博客首页的 Landing 部分，对应的源码实现：[Landing.svelte](https://github.com/QuarkPixel/QuarkPixel.github.io/blob/master/src/routes/Landing.svelte)。

---

## 总结

`svelte-text-animation` 通过精心设计的数学函数组合，实现了既平滑又视觉效果出色的文字动画。最新版本中边缘递减函数的优化，通过引入可调节的平缓度参数，显著提升了动画在整个进度范围内的表现效果。

这种基于数学模型的设计方法不仅保证了动画的流畅性，还为开发者提供了充分的自定义空间。如果你对这个组件感兴趣，欢迎在 [GitHub](https://github.com/QuarkPixel/svelte-text-animation) 上为项目点个 Star 😆

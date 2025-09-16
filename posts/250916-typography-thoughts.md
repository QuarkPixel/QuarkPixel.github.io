---
title: 网页排版碎碎念
description: 记录这个博客网站在排版技术上的一些探索和实践
date: 2025-09-16T10:34:40+08:00
author: Xuancong Meng
tags: ['Web', 'Typography', 'Technique']
layout: blog
---

作为一个以文字内容为主的博客网站，排版质量直接影响着读者的阅读体验。在[重做网页布局排版](./250701-remake-typography)转向 Tailwind Typography 之后，我对网站的排版系统进行了进一步的优化，主要集中在字体加载和智能断行两个方面。这篇文章就来聊聊这些排版技术的具体实现。

## 字体分包

### 中文字体的加载难题

中文字体文件往往体积庞大，动辄几十 MB。像霞鹜文楷这样的优质字体，单个字重就有 [20+ MB](https://github.com/lxgw/LxgwWenKai/releases/)，对网页首屏加载是沉重负担。

### 字体分包解君愁

和好友 [Steven Liu](https://studiountagged.top/) 交流时，我了解到[中文网字计划](https://chinese-font.netlify.app)提供的[字体分包器](https://chinese-font.netlify.app/zh-cn/online-split/)。其核心思路是：将完整的字体文件拆分成若干 `woff2` 分包，浏览器只在渲染页面所需文字时才加载对应的片段，而不必下载整个字体。这样大幅减少了首次加载体积，而大多数不常用的生僻字则不会被请求。

### 渐进式加载的体验

使用字体分包后，网站呈现出独特的「字体逐步加载」效果。有《黑客帝国》的即视感。

![字体渐进式加载效果演示](/img/250916-0.webp)

## 智能断行

### 浏览器自带的断行

CSS 中有一个非常有用的属性 `word-break: auto-phrase`，它能够按照语言的语义单位进行断行，避免在奇怪的位置换行。

![word-break: auto-phrase 会在自然词组边界处换行](https://developer.chrome.com/blog/css-i18n-features/image/word-break-auto-phrase.png)

然而现实很骨感，这个属性目前[只支持日文](https://developer.chrome.com/blog/css-i18n-features?hl=zh-cn#japanese_phrase_line_breaking_word-break_auto-phrase)，对中文的支持还在开发中。对于一个中文博客网站来说，这显然无法满足需求。

### BudouX 真是太香了

为了解决这个问题，我引入了 Google 开源的 [BudouX](https://github.com/google/budoux) 工具。BudouX 是 Budou 的后继产品，是一个机器学习驱动的断行组织工具。

#### 工作原理

BudouX 的核心思想是将文本按语义切分为数组，例如：

```javascript
console.log(parse('这是段需要优化断行的文本'));
// ['这', '是', '段', '需要', '优化', '断行', '的', '文本']
```

配合特定的 CSS 属性，这样的文本可以优先在数组元素之间进行断行，而不是在字符中间强制换行。以下是用Svelte实现的自定义展示组件：

```svelte
<script>
	const { text, class: className = '', ...rest } = $props();
</script>

{#each text as word, i (i)}
	<span style="word-break: keep-all; overflow-wrap: anywhere;" class={className} {...rest}>
		{word}
	</span>
{/each}
```

#### 实现效果

你可以尝试缩放本网页来观察标题部分的换行效果。相比于浏览器的默认断行逻辑，BudouX 优化后的断行更符合中文的阅读习惯，避免了语义单位被不合理拆分的问题。

## 其他排版优化

在 [`article.scss`](https://github.com/QuarkPixel/QuarkPixel.github.io/blob/master/src/lib/styles/article.scss) 中，我还应用了一些现代 CSS 排版特性：

### 文本对齐与标点悬挂

```scss
.prose {
	text-align: justify; // 两端对齐
	quotes: '「' '」' '『' '』'; // 中文引号样式
	hanging-punctuation: first last; // 标点悬挂
}
```

`hanging-punctuation` 属性让标点符号可以"悬挂"在文本行的边界之外，这是中文排版中的传统做法，能让文本边界看起来更加整齐。但可惜的是目前大部分浏览器都还不支持 :(

### 链接样式优化

```scss
:where(a):not(:where([class~='not-prose'], [class~='not-prose'] *)) {
	text-decoration: none;
	color: var(--tw-prose-body);
	@include wave.auto-theme();
}
```

链接使用了自定义的波浪线装饰效果，既保持了视觉识别度，又不会过于突兀地破坏阅读节奏。具体灵感来源等信息可查看周刊 [0xB59](/logs/0xB59#%E7%BD%91%E7%AB%99%E7%9A%84%E5%85%B6%E4%BB%96%E5%8F%98%E5%8A%A8)。

## 碎碎念

我是一个很爱扣细节的人，舒适的排版令我愉快。曾经有人说我适合去做文字排版相关的工作，我自己也是这么想的。在此特感谢 Eric Liu 与 钱争予 老师，他们的播客[《字谈字畅》](https://www.thetype.com/typechat/)在排版方面的科普给予了我很多帮助，如果没有这样播客形式的科普我可能从来都不会对字体排印有这么深刻的认识😂。

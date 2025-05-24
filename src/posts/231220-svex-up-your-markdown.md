---
title: Svex up your markdown
description: 探索如何在 Markdown 中集成 Svelte 组件，实现更强大的文档功能
date: 2023-12-20
tags: ['Svelte', 'Markdown']
layout: blog
copyright: false
---

<script>
// 	import Boinger from './Boinger.svelte';
// 	import Section from './Section.svx';
// 	import Count from './Count.svelte';
//   import Seriously from './Seriously.svelte';

	let number = 45;
</script>

# { title }

## Good stuff in your markdown 测试中文

Markdown is pretty good but sometimes you just need more.

Sometimes you need a boinger like this:

<!-- <Boinger color="{ color }"/> -->

Not many people have a boinger right in their markdown.

## Markdown in your markdown

Sometimes what you wrote last week is so good that you just _have_ to include it again.

I'm not gonna stand in the way of your egomania.

>

<!-- ><Section />
> <Count /> -->

> — _Me, May 2019_

Yeah, thats right you can put wigdets in markdown (`.svx` files or otherwise). You can put markdown in widgets too.

<!-- <Seriously> -->

### I wasn't joking

```
This is real life
```

<!-- </Seriously> -->

Sometimes you need your widgets **inlined** (like this:1) because why shouldn't you.
Obviously you have access to values defined in YAML (namespaced under `metadata`) and anything defined in an fenced `js exec` block can be referenced directly.

Normal markdown stuff works too:

| like  | this |
| ----- | ---- |
| table | here |

And _this_ and **THIS**. And other stuff. You can also use all your favorite Svelte features, like `each` blocks:


and all the other good Svelte stuff.

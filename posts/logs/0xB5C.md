---
weekNumber: 0xB5C
description: 又是忙碌的一周～
date: 2025-09-27T14:15:00+08:00
author: Xuancong Meng
tags:
  - Thinking
layout: logs
---

[Malloc Lab 终于完成了](/logs/0xB5A) 🎉

## 人一忙起来就会忙起来

标题很废话，但好像就是这样，~~我也太贱了~~。这一周来都比较忙碌，发生的事情很多。有意思的是，在我平时休息时间大幅减少的情况下，反而更容易将余下的休息时间用来学习？

正因为此 Malloc Lab 才得以完成 😂 还有最后三章整本 CS:APP 就啃完了，希望可以一鼓作气 ☝️🤓

## OK Go 发布新专辑

乐队 OK Go 发布了新专辑 And the Adjacent Possible，其中第一首歌的 MV 很令人印象深刻：

<iframe width="560" height="315" src="https://www.youtube.com/embed/fwzbIUffcR4?si=eVskIeIPkwuTYZQu" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

看到的第一眼还以为是什么 MV 拍摄幕后花絮，后来发现好像就是正片 。OK Go 的松弛感以及天马行空的想象力，也许就是我喜欢的原因吧。「这个乐队的 MV 很有意思」何尝不是一种有力的营销 👀

## 本站的西文字体终于不像一坨狗屎了

~~标题依旧长难句。~~

更换了本站的西文字体，使用的是 [Ysabeau](https://fonts.google.com/specimen/Ysabeau)，一款气质和 [霞鹜文楷](https://github.com/lxgw/LxgwWenKai)[^1] 气质很相近的字体。事实上，官方就是这么推荐的：

> 对于搭配的西文字体，个人推荐 Ysabeau 系列字体。另有 Ysabeau Office 与霞鹜文楷轻便版的合并字体 LXGW Bright，采用 字体合并补全工具 将两款字体合并而成。亦有中英文合并的等宽字体 LXGW Bright Code，采用 Monaspace Argon 经缩窄调整后与霞鹜文楷轻便版合并而成。

一开始本站使用的就是由官方提供的合并版本，但由于合并的版本没有[标点挤压](https://github.com/w3c/clreq/issues/221#issuecomment-508055215)，故草率的直接使用了没有合并的官方版本，沿用至今。所以之前用的西文字体一直是霞鹜文楷自己设计的西文字体，看起来很难受。现在修改为直接在网站引用 Ysabeau ，通过 `fallback` 特性让整体看起来和谐且保留标点挤压等特性。

## 返回现在更智能了

如果你留意的话，会发现在文章页面滚动一定量后，页面的 Header 部分会展示标题，且鼠标放上去后会显示一个小小的返回按钮（小箭头出现的特效我特别喜欢，甚至还有一点点形变🤓）。

这次我修改了一下返回的逻辑，且其细节处理我认为非常值得和你唠唠：

之前返回按钮用的是浏览器原生的 `history.back()`。但它有个问题：如果从 `/foo` 跳到 `/bar`，再切到 `/bar#anchor`，点击返回时只会停在 `/bar`，而不是回到预期的 `/foo`。

为了解决这个，我实现了一个「严格意义上的返回」功能：只在真正跨页面跳转时才记录历史，锚点变化不计入其中。这样 `/foo` → `/bar` → `/bar#anchor` 时，返回就能正确回到 `/foo`。

比较有意思的是考虑到了浏览器自带的返回按钮（比如手势后退）。为了保持一致性，我通过监听返回事件，自动同步维护的历史记录。这样无论用什么方式返回，体验都是一致的。

```javascript
window.addEventListener('popstate', this.handlePopState.bind(this));
```

另外为了避免页面刷新导致状态丢失，返回时使用的是 SPA 路由跳转而不是直接改变网址。用户感知不到这个差别，但技术上保证了流畅性。

## 开发了一款 Zed Theme

[Vynora](https://github.com/QuarkPixel/Vynora) 这款主题是我自己在 [Monokai](https://monokai.pro/) 的基础上改的，用了有一段时间了。前两天把他上架到了 [Zed Extensions](https://zed.dev/extensions/vynora)。

修改这款主题的契机有以下几点[^2]：

- 原版的红色关键字可读性太差了，当时测量过[对比度](https://zh.wikipedia.org/wiki/%E7%BD%91%E9%A1%B5%E9%A2%9C%E8%89%B2#%E9%A2%9C%E8%89%B2%E5%AF%B9%E6%AF%94%E5%BA%A6)只有 `3.84:1` [^3]
- 其他颜色（如蓝色）也过于轻浮，很像老师珍藏了十年的 PPT 里用的文字颜色
- 分不清主次，代码层级不清晰

![原版截图](/img/logs/0xb5c-0.png)
_原版 Monokai-og 截图_

因此自己的修改版本 Vynora 也就应运而生了。相较于原版，颜色更加浑厚复古，辨识度也更好。要说的再玄乎一点的话，感觉自己的版本更有 Jazzy 的味道 🤓

![Vynora 截图](/img/logs/0xb5c-1.png)
_Vynora 截图_

欢迎下载体验～

[^1]: 本站目前正在使用的中文字体

[^2]: 鉴于Monokai版本众多且不一，这里只针对Zed上的 [Monokai-og](https://zed-themes.com/themes/monokai-og?name=Monokai-og)。

[^3]: 正常来说常规的文本对比度应不小于 `4.5:1`

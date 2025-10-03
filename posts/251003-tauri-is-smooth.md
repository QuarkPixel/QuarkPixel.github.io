---
title: Tauri 太丝滑了
description: 记一次折腾的过程
date: 2025-10-03T13:24:40+08:00
author: Xuancong Meng
tags:
  - Web
  - Technique
  - Rust
layout: blog
---
昨天尝试使用 [Tauri](https://tauri.app/) 将网页构建成本地应用，使用体验很丝滑，很爽。

## “Rust 的定位其实是脚本语言”
标题的这句调侃出自于 [Tsoding 在推特上的回复](https://x.com/tsoding/status/1969190491246731449)：
> I always knew that the niche of Rust is a Scripting Language.

这句话其实是他在回应一条新闻[^1]时说的。

之所以会有这种调侃，是因为 Rust 写的各种命令行工具和小程序体验非常好，用起来甚至比传统的「脚本语言」还要顺手，于是就有了“Rust 其实是脚本语言”的说法。

为什么文章一开头就提到这个呢？当然是因为 Tauri 也是用 Rust 写的啦。构建一个本地应用就像「把大象放到冰箱里」那么简单：
- 下载 Tauri
- 把网页放到项目文件中
- 编译

## 软件开发是个草台班子
事情的起因是[公司](https://quarkpixel.github.io/logs/0xB5B#%E5%85%BC%E8%81%8C)发了个软件，内容就是各种的搭建图纸步骤，还是 3D 的，用作给学生演示就很方便。但由于软件在演示时会有其他公司的 Logo 水印，是不允许在上课时直接拿来给学生演示的。解决方案要么自己跟着步骤翻拍（对，就是每做一步用手机拍一张照），要么就直接背下来上课带着学生现场做。两种做法我感觉都太蛋疼了，于是想从软件本身入手。

### 所谓的「3D 演示」只是个 `iframe`
回想当时，我之所以这么直觉的下论断[^2]可能是因为：除了这个演示界面，还有一个「播放视频」的界面，里面是直接放的 bilibili 的嵌入视频。但问题是，知道是个网页了，但因为软件已经打包好，根本没有什么调试的可行性，就打算从软件包下手。

### 软件本身就是个网页啊！
打开文件所在的路径，看到了熟悉的文件：
```bash
➜ . ls
chrome_100_percent.pak  libEGL.dll              resources
chrome_200_percent.pak  libGLESv2.dll           resources.pak
d3dcompiler_47.dll      LICENSE                 snapshot_blob.bin
ffmpeg.dll              LICENSES.chromium.html  swiftshader
icudtl.dat              locales                 v8_context_snapshot.bin
KuBit.exe               natives_blob.bin        version
```
_（没错，软件只有 Windows 版）_

通过瞪眼法可以很轻松地看出整个软件本身就是个浏览器套壳的软件，怪不得大小有 `140 MB` 。

```bash
➜ . cd resources/app
➜ ./resources/app ls
app.ico                 main.js                 src
assets                  node_modules            style-desktop.dfd76.css
cocos2d-js-min.f7db5.js pack.bat                style-mobile.6e9cd.css
favicon.8de18.ico       package-lock.json       unpack.json
fileconfig.json         package.json            version.json
index.html              run.bat
main.6f18c.js           splash.85cfd.png
```
_这里还可以看出软件本体是使用 [Cocos](https://www.cocos.com/en/creator) 开发的_
### Electron 真的只是「纯」套壳
发现了个 `index.html`，试着用 [`http-server`](https://www.npmjs.com/package/http-server) 打开，发现居然已经能完美运行了。这可能得益于 Cocos 本体和 Electron 模块相互独立，软件的开发也没有做更深层的整合优化。

也就是说，我当时专门为这个软件下载了个 Windows 虚拟机其实是完全没有必要的！我完全可以通过上述的这些操作在自己的 macOS 上运行这个所谓的软件。
### 总算可以拿到 `iframe` 的链接了
在本地部署，浏览器中打开后应该就可以调试网页了。事实上也确实如此，轻松的获得了对应的「3D 演示」的链接地址。

## 去除水印
调试网页，发现只要设置 `body {background-image: none !important;}` 水印就可以轻松消失。

实现这一点其实也很轻松，例如使用各种「自定义 CSS」插件即可。我使用 [Arc](https://arc.net/) 浏览器有一个 [Boosts](https://resources.arc.net/hc/en-us/articles/19212718608151-Boosts-Customize-Any-Website) 功能，相当于浏览器内置了自定义功能（体验还蛮不错的），因此修改起来也非常方便。

![create-a-Boost-in-Arc-for-macOS](https://resources.arc.net/hc/article_attachments/25703394042263)
_来源：Arc_

这下可以在上课时直接用演示软件了☺️ 也就是说，在每次上课前，把对应的网址存下来，用时再打开就可以了。
## 我就是爱折腾
这就够了么？还是太麻烦了！

我每次需要一个网址都需要先进到对应目录、再启动 `http-server`、打开对应的网站、登陆、进入对应模型、打开开发者面板、找到 `iframe` 元素、复制对应的 `src` 属性才可以。

### Tauri 助我！
终于回收标题了。

我创建了一个 Tauri 项目，并且将 `./resources/app` 目录下的所有文件先一股脑塞进去，想着再根据报错进行修改。

<center style="font-size: x-large; font-weight: bold">但是尽然直接跑起来了！！</center>

那一刻太震惊了，我没想过会如此顺利。现在解决了每次启动的一系列繁琐步骤，像一个正常 app 启动它即可。但是获取 `src` 还是太麻烦了。

### 更方便的获取 `iframe` 链接
我打算对源代码动手。由于都是编译过的代码，所以根本没有可读性。我直接在全文中搜索 `iframe`，好在只有一处有相关代码。

代码大致如下：
```javascript
loadURL: function (t) {
	var e = this._iframe;
	if (e) {
		e.src = t;
		……
	}
}
```

其实很明显了，这里的 `t` 就是我们所想要的链接。为了把网址展示出来，尝试了几种方案：
- `console.log(t)` ：还是要打开控制台，不方便。而且 Tauri 不加参数编译后是不会附带控制台的
- `alert(t)` ：Tauri 的程序里 `alert` 是直接不起作用的
- 官方屏蔽了 `alert`，但是提供了一个系统级的插件 `notification` 。但由于我目前的代码是编译后的纯 js，相当于强兼源代码了，无法使用外部的功能。

最后我使用的方案是 `navigator.clipboard.writeText(t)` 。现在看来反而最符合直觉。每当创建一个 `iframe` ，即打开一个「3D 演示」/「视频」，就会自动将对应的链接拷贝至剪贴板。这时我只用在浏览器中粘贴即可。

### 收尾
因此，现在的流程被简化为了：
- 打开自己编译的软件
- 打开对应模型
- 在需要的地方粘贴
效率被极大提高了。

#### 编译
值得注意的是，自己的这次再编译得到了很多好的副作用：
1. **软件体积的缩小**
	现在新版的软件由于 Tauri 的特性，只有 `13 MB` ，舒服的很
2. **不用再开虚拟机来使用软件了**
	这次直接将软件打包成了 macOS 的版本，再也不用开一个虚拟机只为了运行一个网页套壳应用了🤓 此外，我还交叉编译了一份 Windows 版本，备用。

## 尾记
这次整体的开发都非常丝滑，没有遇到什么大坑。是一次很不错的体验。不得不感慨「Web 是一项伟大的技术」以及「『计算机』真是一门在各行业都能吃香的技能」。

[^1]: 原文可以上推特进行查看，主要是想说 git v3.0 将完全用 Rust 替换 Perl。但我对这则新闻的真实性存疑，因为我没有查到很多相关信息。

[^2]: 自己这方面的直觉一向很准，准得出奇。可能我天生就是学计算机的料吧 🤓

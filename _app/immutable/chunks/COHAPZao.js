import"./CWj6FrbW.js";import"./Dquy4gIy.js";import{t as h,s as t,f as g,b as v,e as n,r as l,n as m}from"./B6xPNU37.js";import{h as p}from"./BRqSp3Pr.js";import{l as y,s as T}from"./BuDqnrhZ.js";import{B as f}from"./CUEbmE08.js";const o={title:"重做网页布局排版",description:"从 Skeleton 转向 Tailwind Typography",date:"2025-07-01T07:15:00.000Z",author:"Xuancong Meng",tags:["Develop Diary"],layout:"blog"},{title:I,description:U,date:X,author:x,tags:B,layout:L}=o;var b=h('<p>许久之前就无法忍受网页的排版。作为一个博客网站，文字的呈现效果是至关重要的。在之前介绍<a href="./250525-tech-stack-in-hsuans-space">网站使用的技术栈</a>时就提到我使用了 Skeleton 作为 UI 框架。然而这个框架在排版方面的表现很不尽如人意。我趁着最近在大量升级网站的机会，将排版系统从 Skeleton + MDsveX 自定义样式转向了 Tailwind Typography + MDsveX 默认对接。</p> <center><img class="outline outline-[#808CA9] outline-4 rounded-[1px] mb-[44px]" src="/assets/20250701-0.webp" alt=""> <em>左图：新版｜右图：老版</em></center> <h2>使用 Skeleton 所遇到的问题</h2> <p><a href="https://skeleton.dev/" rel="nofollow">Skeleton</a> 是一个非常优秀的 UI 框架，它为 SvelteKit 提供了美观且功能丰富的组件库。在构建网站的导航栏、按钮、卡片等常规 UI 组件时，Skeleton 的表现令人满意。</p> <p>然而，当面对大量文字排版这样的特定场景时，Skeleton 就不再能胜任。它更着重于 UI，而非排版。在此之前我因为偷懒，就没有想着用专业的排版引擎 😂</p> <p>此外，即使作为一个 UI 组件集，我认为 Skeleton 在排版方面也远不算合格。它不基于语义化标签作用样式，甚至还将语义化标签的样式都重置了。因此当你直接使用 <code>&lt;h1&gt;</code> 时，它是没有任何样式的。这是因为 Skeleton 要求你为每个标题添加对应的 class：</p> <pre class="language-html"><!></pre> <p>而这在与 MDsveX 对接时就产生了问题：MDsveX 只生成纯 HTML 结构，这在与 Skeleton 的对接中就出现了问题。因此我不得不为每一个基本元素都写一个包装组件：</p> <pre class="language-bash"><!></pre> <p>抛去麻烦的问题外，还有一些样式的不兼容等问题就在这样一层又一层的屎山中构建起来了。</p> <h2>转换为 Tailwind Typography</h2> <p><a href="https://tailwindcss.com/docs/typography-plugin" rel="nofollow">Tailwind Typography</a> 是一个官方专门为文章排版设计的插件。它提供了：</p> <ul><li>精心调教的文字间距和行高</li> <li>优雅的标题层级样式</li> <li>完善的列表和引用样式</li> <li>适配不同屏幕尺寸的响应式排版</li></ul> <p>最重要的是，Tailwind Typography 完全基于语义化标签工作，与 MDsveX 的默认渲染完美契合。这意味着我们可以专注于写作内容，不必再为每个 HTML 标签编写包装组件，因为屎山堆叠所导致的样式错误问题也消失了。</p> <h2>迁移过程</h2> <p>迁移过程出乎意料地顺利。主要步骤包括：</p> <ol><li>移除 Skeleton 中的文章样式覆盖</li> <li>配置 Tailwind Typography 插件</li> <li>为文章容器添加 <code>prose</code> 类</li> <li>调整默认颜色配置，使其适配 Skeleton 的颜色系统</li></ol> <h2>总结</h2> <p>有时候，简单的解决方案反而是最好的。Tailwind Typography 专注于解决文章排版这一具体问题，而不是试图成为一个全能的框架。这让它在这个特定场景下的表现远超 Skeleton。</p> <p>你可以在这里查看完整的 <a href="/test">Markdown 语法测试</a>，体验新的排版效果。</p>',1);function P(c,r){const i=y(r,["children","$$slots","$$events","$$legacy"]);f(c,T(()=>i,o,{children:(u,S)=>{var e=b(),s=t(g(e),12),d=n(s);p(d,()=>`<code class="language-html"><span class="token comment">&lt;!-- 没有样式，因为缺少 class --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">></span></span>Hello World<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span>

<span class="token comment">&lt;!-- “正确” 的使用方式，但很难评 --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>h1<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Hello World<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span></code>`),l(s);var a=t(s,4),k=n(a);p(k,()=>`<code class="language-bash">➜ HsuansSpace/src/lib/components/typography master ✓ tree <span class="token builtin class-name">.</span>     
<span class="token builtin class-name">.</span>
├── Anchor.svelte
├── BaseList.svelte
├── Blockquote.svelte
├── Code.svelte
├── Del.svelte
├── H1.svelte
├── H2.svelte
├── H3.svelte
├── H4.svelte
├── H5.svelte
├── H6.svelte
├── Hr.svelte
├── Image.svelte
├── Ins.svelte
├── Italic.svelte
├── Keyboard.svelte
├── Mark.svelte
├── OrderedList.svelte
├── P.svelte
├── Pre.svelte
├── Table.svelte
├── TableBody.svelte
├── UnorderedList.svelte
└── index.ts

<span class="token number">1</span> directory, <span class="token number">24</span> files</code>`),l(a),m(22),v(u,e)},$$slots:{default:!0}}))}export{P as default,o as metadata};

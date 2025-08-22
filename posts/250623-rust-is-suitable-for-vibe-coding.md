---
title: Rust 是一门适合 Vibe Coding 的语言
description: 从安全特性、错误提示和自动化验证的角度，探讨为什么 Rust 可能是最适合 AI 编程的语言
date: 2025-06-23
author: Xuancong Meng
tags: ['Rust', 'AI']
layout: blog
---

~~(文章标题有些暴论，李姐万岁)~~

[Vibe Coding](https://en.wikipedia.org/wiki/Vibe_coding) 是一种借助 AI 生成代码，并通过人机协作快速验证和迭代想法的开发方式。在这种模式下，开发效率高度依赖于两个关键环节：生成代码的初步质量，以及后续验证与修正的可靠性。而 Rust 的诸多语言特性，恰恰能够在这两个环节中提供显著支持。

## 语言特性的安全保障

AI 生成的代码往往存在潜在缺陷，尤其在内存管理、并发控制和边界条件处理等方面容易出现疏漏。考虑这样一个常见场景，生成如下的 C++ 代码：

```cpp
// 存在悬垂指针风险
int* createInt() {
    int value = 42; // 局部变量，函数结束时销毁
    return &value;  // 返回局部变量的地址
}
```

这段代码在运行时可能导致未定义行为，而编译器往往只会给出警告，甚至完全不报错。但如果 AI 试图在 Rust 中生成类似的代码：

```rust
fn create_int() -> &i32 {
    let value = 42; // 局部变量
    &value // 错误：返回局部变量的引用
}
```

Rust 编译器会直接拒绝编译，并给出明确的生命周期错误提示：

```
error[E0106]: missing lifetime specifier
 --> src/main.rs:1:20
  |
1 | fn create_int() -> &i32 {
  |                    ^ expected named lifetime parameter
  |
  = help: this function's return type contains a borrowed value, but there is no value for it to be borrowed from
help: consider using the `'static` lifetime, but this is uncommon unless you're returning a borrowed value from a `const` or a `static`
  |
1 | fn create_int() -> &'static i32 {
  |                     +++++++
help: instead, you are more likely to want to return an owned value
  |
1 - fn create_int() -> &i32 {
1 + fn create_int() -> i32 {
  |
For more information about this error, try `rustc --explain E0106`.
error: could not compile `demo_rust` (bin "demo_rust") due to 1 previous error
```

Rust 的所有权系统、借用检查机制和严格的类型系统，能够在编译阶段拦截许多常见错误。这不仅显著降低了运行时崩溃的风险，也使得 AI 即使生成出不够完善的代码，仍能在编译器指导下逐步逼近正确实现。

## 人性化的错误提示

Rust 编译器所提供的错误信息一向以清晰、详尽而著称。它不只是告诉你「错了」，而是手把手教你「该怎么改」。就像上面的例子中，编译器不仅指出了生命周期问题，还直接建议了两种修复方案：使用 `'static` 生命周期或返回拥有值。这种详细的错误信息，甚至包含了修复建议，让 AI 能够自主进行多轮修正。开发者则可以将精力集中于更高层的逻辑设计，而不必深入调试每一个低级错误。

相比之下，C++ 的错误信息往往会让人摸不着头脑：

```
main.cpp:5:13: warning: address of stack memory associated with local variable 'value' returned [-Wreturn-stack-address]
    return &value;  // 返回局部变量的地址
            ^~~~~
1 warning generated.
```

这样的错误信息对 AI 和开发者都不够友好，即使 AI 大部分时候可以像经验丰富的开发者一样知道问题出现的原因，但这种模糊的提示仍然增加了调试成本。

## 编译时检查作为自动化验证

传统 Vibe Coding 流程中，代码的正确性严重依赖人工测试与审查，这不仅效率低下，也容易引入主观偏差。而 Rust 的编译时检查机制（包括类型安全、生命周期验证、数据竞争检测等）构成了一套自动化、标准化的验证基础。它确保了生成的代码至少在内存安全、数据竞争等基础层面是可信的，从而为后续的功能测试和集成验证节省大量时间。

举个例子，在多线程场景中，即使 AI 生成了可能存在数据竞争的代码，Rust 编译器也会在编译阶段就将其拦截，并引导向使用 `Arc<Mutex<T>>` 或其他合适的同步原语的正确方案。这种"编译通过即基本安全"的特性，在快速原型开发中尤为宝贵。

## 类型系统的引导作用

Rust 的类型系统还能够引导 AI 生成更加精确的代码。例如，当处理可能失败的操作时，Rust 的 `Result` 类型会强制处理错误情况，而不像某些动态语言那样可以随意忽略异常处理。这种「强制正确性」的设计哲学，与 AI 编程中「快速迭代但保证质量」的需求高度契合。

## 局限性和现状

目前，Python 和 JavaScript 在 Vibe Coding 中确实更加普及，主要原因在于它们的生态丰富度和语法简洁性。动态类型语言在原型开发阶段确实更加灵活，而且 AI 训练数据中这些语言的代码占比很大。相比之下，Rust 的学习资源和代码语料仍然相对有限，这在一定程度上限制了 AI 模型对 Rust 的支持深度。

不过，随着 Rust 在系统编程、Web 开发和区块链等领域的快速发展，以及 Microsoft、Google 等大厂的推动，这一差距正在逐渐缩小。

## 结论

Rust 通过其内在的安全机制、友好的诊断信息以及强大的编译时验证，为 Vibe Coding 提供了一条兼具高可靠性和自动化程度的开发路径。虽然它可能不如 Python 那样"即写即跑"，但在需要高质量、可维护代码的场景中，Rust 的这些特性能够显著提升人机协作的效率和成果质量。

随着 AI 编程工具的不断发展和 Rust 生态的日益成熟，我相信会有越来越多的开发者发现：让 AI 在 Rust 的约束下编写代码，往往能够得到更加可靠和优雅的解决方案。这种"约束即自由"的开发体验，也许正是未来 AI 辅助编程的理想形态。

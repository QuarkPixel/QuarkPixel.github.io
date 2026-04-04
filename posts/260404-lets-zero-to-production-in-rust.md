---
title: 看《Zero To Production In Rust》，顺手造个轮子
description: 本文纯属事逼找茬
date: 2026-04-04T10:44:00+08:00
author: Xuancong Meng
tags:
  - Reading
  - Zero To Production In Rust
layout: blog
---

很喜欢这本书。我一直秉持「实践大于理解」的学习理念。这样学起来既有成就感推着自己往下走，又能顺便把常见用法记住了。

这本书正好符合上述理念：带领搭建邮件订阅服务，每次新概念的引入都是碰见了刚需，可以直觉地通过上下文快速理解。

> **关于中文版**
>
> 我一开始是从多抓鱼淘的二手中文版《从零构建 Rust 生产级服务》，但读了几章后发现翻译错误不少，还有一些莫名其妙的错漏，排版也经不起细看（代码块里本该等宽的字体挤成一坨）。所以现在我中英文对照着看（英语还是太烂了😭），最终还是以英文原版为准。中文版当辅助参考可以，但不太建议当主力。

**Z-Library 下载地址：**

- 英文原版：[Zero To Production In Rust](https://z-library.sk/book/dRzarqLJOo/zero-to-production-in-rust-an-opinionated-introduction-to-backend-development.html)
- 中文版：[从零构建 Rust 生产级服务](https://z-library.sk/book/QRM1ZynBRV/%E4%BB%8E%E9%9B%B6%E6%9E%84%E5%BB%BArust%E7%94%9F%E4%BA%A7%E7%BA%A7%E6%9C%8D%E5%8A%A1.html)

## 这个系列想做什么

这本书写于 2021 年，Rust 生态变化又快得离谱。当时的很多写法现在已经有更简洁、更地道的替代方案了。

所以我想做的不是逐章摘抄书的内容，而是记录跟着书学的过程中遇到的那些「书上这么写，但现在可以写得更好」的地方。姑且算是一份学习笔记吧，~~但更多是我强迫症性格的极致体现🤣~~。

---

## 为了写得更优雅，我自己造了个轮子

进入正题。[书的第 6 章](https://lpalmieri.com/posts/an-introduction-to-property-based-testing-in-rust/#implementing-the-arbitrary-trait) 讲到给邮箱验证写属性测试（property-based test），用的是 `quickcheck` + `fake` 的组合：

```rust
//! src/domain/subscriber_email.rs

#[cfg(test)]
mod tests {
  #[derive(Debug, Clone)]
  struct ValidEmailFixture(pub String);

  impl quickcheck::Arbitrary for ValidEmailFixture {
    fn arbitrary<G: quickcheck::Gen>(g: &mut G) -> Self {
       let email = SafeEmail().fake_with_rng(g);
       Self(email)
    }
  }

  #[quickcheck_macros::quickcheck]
  fn valid_emails_are_parsed_successfully(valid_email: ValidEmailFixture) -> bool {
    SubscriberEmail::parse(valid_email.0).is_ok()
  }
}
```

逻辑很清晰，代码也很干净。`quickcheck` 的 `Gen` 类型在老版本中实现了 `rand::Rng`，直接传给 `fake` 的 `fake_with_rng()` 就能生成确定性的随机数据。

但编译器给了我们当头一棒，~~剧本不是这么来的啊？~~

```
error[E0277]: the trait bound `Gen: Rng` is not satisfied
```

查了一圈才搞明白：`quickcheck` 升到 1.x 之后，作者把 `Gen` 从 trait 改成了 struct，并且**有意移除了所有 `rand` 相关的 trait 实现**。理由是 rand 生态的 semver 变动太频繁了，不想让 quickcheck 的公共 API 被 rand 的版本更新拖着走。

https://github.com/BurntSushi/quickcheck/issues/241

能理解作者的选择，但这让我们处于尴尬的境地中。

- **降级到书上用的版本。** 理论上应该这么做——保持 Rust 2021 Edition、用一样的库版本和工具链。但面对一门变化这么快的语言，我给自己定了个目标：书中提到的所有工具都要用最新版本实现对应功能。所以这条路走不通。~~我就是和自己过不去~~
- 弃用 `.fake_with_rng()`，直接用 `.fake()` 生成与 Rng 无关的随机邮箱。但本着折腾为上的原则，我不接受 😜
- **拉 fake 的 git master 分支。** 当时以为问题是 fake 4.4.0（最新发布版）用的 `rand 0.9`，而 `quickcheck 1.1.0` 已经升到了 `rand 0.10`。升级 `rand 0.10` 的 PR 在当时（2月26日）刚合并到 master，但还没发布新版本。尝试了但失败了，因为问题根本不在 fake。~~我操 quickcheck 怎么这么坑 😡~~
- **手动种子桥接。** 代码太臃肿了，吃过细糠怎么咽粗粮？见过那么优雅的写法，肯定想让自己代码也那么干净！
  原版：

  ```rust
  impl quickcheck::Arbitrary for ValidEmailFixture {
      fn arbitrary(g: &mut quickcheck::Gen) -> Self {
          let email = SafeEmail().fake_with_rng(g);
          Self(email)
      }
  }
  ```

  桥接后：

  ```rust
  impl quickcheck::Arbitrary for ValidEmailFixture {
      fn arbitrary(g: &mut quickcheck::Gen) -> Self {
          use quickcheck::Arbitrary;
          use rand::SeedableRng;

          let seed: [u8; 32] = std::array::from_fn(|_| u8::arbitrary(g));
          let mut rng = rand::rngs::StdRng::from_seed(seed);
          let email = SafeEmail().fake_with_rng(&mut rng);
          Self(email)
      }
  }
  ```

折腾了一阵无果，换了个思路：既然 quickcheck 和 rand 生态已经脱钩了，干脆换个测试框架试试。书上提到过一嘴的 `proptest` 貌似能解决问题：proptest 的内部 RNG 类型 `TestRng` 实现了 `rand_core::RngCore`，天然能和 `fake`、`rand` 以及整个 rand 生态配合使用。

```rust
proptest! {
    #[test]
    fn valid_emails_are_parsed_successfully(
        rng in any::<u8>().prop_perturb(|_, mut rng| rng.new_rng())
    ) {
        let email: String = SafeEmail().fake_with_rng(&mut rng);
        assert_ok!(SubscriberEmail::try_new(email));
    }
}
```

好像可以运行！但是这段代码怎么还是又臭又长？

```rust
rng in any::<u8>().prop_perturb(|_, mut rng| rng.new_rng())
```

这像黑魔法一样的东西是什么鬼？一点可读性都没有！为什么不能直接写成这样？~~（怎么事那么多，事儿逼）~~

```rust
rng in any::<TestRng>()
```

原因很简单：`TestRng` 没有实现 proptest 自己的 `Arbitrary` trait，没法直接 `any::<TestRng>()` 来拿一个 RNG 当测试参数。得用 `prop_perturb` 方法把 proptest 内部的 RNG 偷出来用。每次都要写这么一段样板代码，心里还是难受。

想了想，干脆自己写个库解决这个问题：[**proptest-rng**](https://crates.io/crates/proptest-rng)。

思路很简单：写一个 newtype wrapper `ProptestRng`，让它同时实现 `Arbitrary`（proptest 能生成它）和 `RngCore`（rand 生态能用它）。再加上 `Deref<Target = TestRng>`，`TestRng` 的方法也能直接调用。

有意思的是：这个 crate 的依赖**只有 `proptest`**，不需要显式依赖 `rand` 或 `rand_core`。因为 `rand_core 0.9` 里有一个 blanket impl：

```rust
impl<T: DerefMut> RngCore for T where T::Target: RngCore { ... }
```

也就是说，只要 `ProptestRng` 实现了 `DerefMut<Target = TestRng>`，而 `TestRng` 已经实现了 `RngCore`，那 `ProptestRng` 就自动继承了 `RngCore`。不用多写一行代码，不用多加一个依赖。

现在代码变成了这样：

```rust
proptest! {
    #[test]
    fn valid_emails_are_parsed_successfully(
        rng in any::<TestRng>()
    ) {
        let email: String = SafeEmail().fake_with_rng(&mut rng);
        assert_ok!(SubscriberEmail::try_new(email));
    }
}
```

甚至还能进一步优化：

```rust
#[test]
fn valid_emails_are_parsed_successfully(
    email in any::<ProptestRng>()
        .prop_map(|mut rng| SafeEmail().fake_with_rng::<String, _>(&mut rng))
) {
    assert_ok!(SubscriberEmail::try_new(email));
}
```

这样不仅更简洁紧凑，还更测试友好。测试失败时返回的是出问题的 email，而不是一串随机的 Rng 字符串。

### 最终效果

对比一下原书的写法：

```rust
#[derive(Debug, Clone)]
struct ValidEmailFixture(pub String);

impl quickcheck::Arbitrary for ValidEmailFixture {
  fn arbitrary<G: quickcheck::Gen>(g: &mut G) -> Self {
    // Cannot compile!
    let email = SafeEmail().fake_with_rng(g);
    Self(email)
  }
}

#[quickcheck_macros::quickcheck]
fn valid_emails_are_parsed_successfully(valid_email: ValidEmailFixture) -> bool {
  SubscriberEmail::parse(valid_email.0).is_ok()
}
```

我们的代码完整复现了原书想要的功能，而且更加简洁了！

在实际项目中，这么折腾肯定是得不偿失的。我是抱着「探索研究」的心态去追求代码的优雅，才有了上面的心路历程。分享出来，供有同样癖好的佬友参考。

---

文中提到的 `proptest-rng` 库源码在 [GitHub](https://github.com/QuarkPixel/proptest-rng)，crate 在 [crates.io](https://crates.io/crates/proptest-rng)。如果你的项目也在用 proptest + fake 或者其他 rand 生态的 crate 做测试，欢迎试试。

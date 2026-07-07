---
layout: doc
title: Pixiv 随机图片接口记录
outline: deep
description: Pixiv 随机图片接口与 VitePress Markdown 示例记录，说明当前图片来源、CORS 限制和后续自建接口想法。
head:
  - - meta
    - name: keywords
      content: Pixiv 随机图片,随机图片接口,VitePress Markdown,CORS
  - - meta
    - property: og:title
      content: Pixiv 随机图片接口记录
  - - meta
    - property: og:description
      content: Pixiv 随机图片接口与 VitePress Markdown 示例记录，说明当前图片来源、CORS 限制和后续自建接口想法。
---

# Pixiv 随机图片接口记录

随机图片目前先用下面这个地址。原本想直接用 Ajax 拉取，但会遇到 `CORS` 限制，所以后面可能还是得自己整个随机图片接口。

```
https://www.dmoe.cc
```

下面顺手保留一些 VitePress Markdown 扩展示例，方便以后改文档时不用到处翻。

## 代码高亮

VitePress 使用 [Shiki](https://github.com/shikijs/shiki) 做代码高亮，也支持按行标记。

**Input**


```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```

**Output**

```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```

## 自定义容器

**Input**

```md
::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::
```

**Output**

::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::

## 更多文档

完整语法可以看 VitePress 的 [Markdown 扩展文档](https://vitepress.dev/guide/markdown)。

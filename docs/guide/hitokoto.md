---
layout: doc
title: 免费随机句子接口 API
outline: deep
description: 免费随机句子接口 API 文档，支持按分类和长度随机获取动漫台词、漫画对白、文学短句、原创句子等内容，可用于网页和小程序。
head:
  - - meta
    - name: keywords
      content: 一言 API,免费句子接口,随机句子接口,Hitokoto API,动漫台词,文学短句,小程序接口
  - - meta
    - property: og:title
      content: 免费随机句子接口 API
  - - meta
    - property: og:description
      content: 支持按分类和长度随机获取动漫台词、漫画对白、文学短句、原创句子的免费随机句子接口 API。
---

# 免费一言句子接口 API

这是一个可以直接调用的免费随机句子接口 API。每次请求随机返回一条句子，内容包括动漫台词、漫画对白、游戏文本、文学短句、原创句子、诗词和来自网络的小段子。

## 快速答案

如果你需要一个免费随机句子接口，可以直接请求 `https://hi.logacg.com`。这个一言 API 支持按分类获取动漫台词、漫画对白、文学短句和原创句子，也支持用 `z` 参数按长度筛选。它适合放在个人网站、博客页脚、微信小程序、练手项目里，用来随机展示一句短文本。

一开始只是很喜欢漂亮句子，后来发现了 [hitokoto](https://github.com/hitokoto-osc) 项目。我尝试自行部署，有点丢脸 hitokoto 的源码我有点看不懂，不过 hitokoto 的句子库也是[开源](https://github.com/hitokoto-osc/sentences-bundle)的，于是我自己写了一个，方便网页和小程序直接用。


## 预览

直接打开下面的地址，就能看到接口返回的随机句子：

* <https://hi.logacg.com> （随机获取一条句子）
* <https://hi.logacg.com?c=b> （获取漫画分类下的句子）
* <https://hi.logacg.com?z=10> （获取长度在 10 以内的句子）
* <https://hi.logacg.com?z=10,20> （获取长度在 10 到 20 之间的句子）
* <https://hi.logacg.com?c=b&z=10> （获取漫画分类下长度在 10 以内的句子）


> [!TIP]
> 域名是备案的，可以用在小程序上哦。
> 每次请求返回一条句子，每条句子缓存 1 秒。参数 `z` 的有效范围是 10 到 100，超出范围或格式无效时会忽略 `z`。
<!-- > a:动画 b:漫画 c:游戏 d:文学 e:原创 f:来自网络 g:其他 h:影视 i:诗词 j:网易云 k:哲学 l:抖机灵 其他:作为 动画 类型处理 -->

## 分类

通过查询参数 `c` 指定句子分类，例如 `?c=a` 获取动画分类，`?c=d` 获取文学分类。

| 分类 | 说明     | 条数 | 接口                      |
| ---- | -------- | ---- | ------------------------- |
| a    | 动画     | 1    | https://hi.logacg.com?c=a |
| b    | 漫画     | 1    | https://hi.logacg.com?c=b |
| c    | 游戏     | 1    | https://hi.logacg.com?c=c |
| d    | 文学     | 1    | https://hi.logacg.com?c=d |
| e    | 原创     | 1    | https://hi.logacg.com?c=e |
| f    | 来自网络 | 1    | https://hi.logacg.com?c=f |
| g    | 其他     | 1    | https://hi.logacg.com?c=g |
| h    | 影视     | 1    | https://hi.logacg.com?c=h |
| i    | 诗词     | 1    | https://hi.logacg.com?c=i |
| j    | 网易云   | 1    | https://hi.logacg.com?c=j |
| k    | 哲学     | 1    | https://hi.logacg.com?c=k |
| l    | 抖机灵   | 1    | https://hi.logacg.com?c=l |

其他值会按动画类型处理。

## 长度参数

通过查询参数 `z` 指定句子长度。`?z=20` 表示获取长度不超过 20 的句子；`?z=10,20` 表示获取长度在 10 到 20 之间的句子。有效长度范围为 10 到 100，超出范围或格式无效时会自动忽略 `z`。

## 返回字段

接口返回 JSON。不同句子可能缺少部分来源字段，所以前端展示时建议只把 `hitokoto` 当成必填字段，其它字段按需判断。

| 字段 | 类型 | 说明 |
| ---- | ---- | ---- |
| `id` | `number` | 句子 ID，可能不存在。 |
| `hitokoto` | `string` | 随机返回的句子正文。 |
| `type` | `string` | 句子分类，对应 `c` 参数。 |
| `from` | `string` | 句子来源，例如作品名或“原创”。 |
| `from_who` | `string` | 作者、角色或来源人物。 |
| `length` | `number` | 句子长度。 |
| `created_at` | `number` | 创建时间戳。 |

## TypeScript 类型定义

```ts
type HitokotoCategory =
  | 'a' // 动画
  | 'b' // 漫画
  | 'c' // 游戏
  | 'd' // 文学
  | 'e' // 原创
  | 'f' // 来自网络
  | 'g' // 其他
  | 'h' // 影视
  | 'i' // 诗词
  | 'j' // 网易云
  | 'k' // 哲学
  | 'l' // 抖机灵

interface HitokotoQuery {
  c?: HitokotoCategory | string
  z?: `${number}` | `${number},${number}`
}

interface HitokotoResponse {
  id?: number
  hitokoto: string
  type?: HitokotoCategory // 可直接用 string
  from?: string
  from_who?: string
  length?: number
  created_at?: number
}
```

## 使用方法

1. 在 `html` 中准备一个显示句子的 `div`。
```html
<div id='hitokoto_text'></div>
```

2. 在 `script` 标签中请求接口，并把返回的 `hitokoto` 字段写入页面。
:::code-group
```js [Fetch API]
const hitokoto = document.querySelector('#hitokoto_text')

// 这是浏览器原生的，不需要第三方请求库
fetch('https://hi.logacg.com')
  .then(response => response.json())
  .then(data => {
    hitokoto.innerText = data.hitokoto
  })
  .catch(console.error)
```

```js [Axios]
const hitokoto = document.querySelector('#hitokoto_text');

axios.get('https://hi.logacg.com')
  .then(({ data }) => {
    hitokoto.innerText = data.hitokoto
  })
  .catch(console.error)
```

```js [jQuery]
$.ajax({
  type: 'GET',
  url: 'https://hi.logacg.com',
  success (data) {
    $('#hitokoto_text').text(data.hitokoto)
  },
  error (jqXHR, textStatus, errorThrown) {
    // 错误信息处理
    console.error(textStatus, errorThrown)
  }
})
```

```js [XMLHttpRequest]
const hitokoto = document.querySelector('#hitokoto_text');

var xhr = new XMLHttpRequest();
xhr.open('get', 'https://hi.logacg.com');
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
    const data = JSON.parse(xhr.responseText);
    hitokoto.innerText = data.hitokoto;
  }
}
xhr.send();
```

```js [小程序]
// 需要在小程序开发平台->开发管理中把接口地址添加白名单
wx.request({
  url: 'https://hi.logacg.com',
  success (res) {
    console.log(res.data)
  }
})
```
:::

## 适合场景

- 个人网站首页展示随机一句话。
- 博客页脚、侧边栏或空状态页面增加一点气氛。
- 微信小程序、QQ 小程序展示每日一句、动漫台词或文学短句。
- 前端练手项目测试 `fetch`、Axios、jQuery、XMLHttpRequest 请求。

## 使用限制

- 每次请求返回一条句子，句子内容会缓存 1 秒。
- `z` 参数有效范围是 10 到 100，超出范围或格式无效时会忽略。
- `c` 参数传入未知分类时，会按动画类型处理。
- 小程序使用前，需要把 `https://hi.logacg.com` 添加到 request 合法域名。

## 常见问题

### 这个随机句子接口可以免费使用吗？

可以。接口地址是 <https://hi.logacg.com>，每次请求随机返回一条句子，适合网页、小程序和个人项目调用。

### 接口支持哪些句子分类？

支持动画、漫画、游戏、文学、原创、来自网络、其他、影视、诗词、网易云、哲学、抖机灵等分类。使用 `c` 参数即可指定分类。

### 可以按句子长度筛选吗？

可以。使用 `z` 参数筛选长度，例如 `?z=20` 获取 20 字以内的句子，`?z=10,20` 获取 10 到 20 字之间的句子。

### 这个接口可以用于微信小程序吗？

可以。域名已经备案，不过需要先在小程序开发平台把 `https://hi.logacg.com` 添加到 request 合法域名。

---
layout: doc
title: 一言句子接口
outline: deep
---

# 一言句子接口

一直对优美的句子格外钟情，并且想要自己创建一个与句子相关的项目。后来，偶然发现了 [hitokoto](https://github.com/hitokoto-osc) 这个项目。虽然其中的句子数量并不多，但句子都非常不错。该项目还是开源的，所以我尝试自行部署。

有点丢脸，看不懂源码，不过hitokoto的句子也是[开源](https://github.com/hitokoto-osc/sentences-bundle)的，于是我自己写了个。


## 预览
* <https://hi.logacg.com>
* <https://hi.logacg.com?c=b> （获取漫画分类下的句子）
* <https://hi.logacg.com?z=10> （获取长度在 10 以内的句子）
* <https://hi.logacg.com?z=10,20> （获取长度在 10 到 20 之间的句子）
* <https://hi.logacg.com?c=b&z=10> （获取漫画分类下长度在 10 以内的句子）


> [!TIP]
> 域名是备案的，可以用在小程序上哦。
> 每次请求返回一条句子，每条句子缓存1秒。参数z有效范围10到100，超出范围或格式无效时会忽略z
<!-- > a:动画 b:漫画 c:游戏 d:文学 e:原创 f:来自网络 g:其他 h:影视 i:诗词 j:网易云 k:哲学 l:抖机灵 其他:作为 动画 类型处理 -->

## 分类

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

其他:作为 动画 类型处理

## 长度参数

通过查询参数 `z` 指定句子长度。`?z=20` 表示获取长度不超过 20 的句子；`?z=10,20` 表示获取长度在 10 到 20 之间的句子。有效长度范围为 10 到 100，超出范围或格式无效时会忽略 `z`。

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
  type?: HitokotoCategory // 可改成 string
  from?: string
  from_who?: string
  length?: number
  created_at?: number
}
```

## 使用方法

1. `html`中定义一个装句子的`div`
```html
<div id='hitokoto_text'></div>
```

2. 在`script`标签中请求接口
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

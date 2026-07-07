# 雪阳哦 / sekaiai.github.io

今天看仓库发现了这玩意儿，我有写过这个？看样子还真写过。

这里是雪阳哦的个人项目文档站，核心内容是一个免费一言随机句子接口 API。接口可以随机返回动漫台词、漫画对白、文学短句、原创句子和来自网络的小段子，适合放在个人网站、博客、小程序或前端练手项目里。

## 核心链接

- 文档地址：https://sekaiai.github.io
- 接口地址：https://hi.logacg.com
- 随机句子文档：https://sekaiai.github.io/guide/hitokoto
- GitHub Pages 仓库：https://github.com/sekaiai/sekaiai.github.io

## 最小调用示例

```js
<div id='hitokoto_text'></div>

const hitokoto = document.querySelector('#hitokoto_text')
fetch('https://hi.logacg.com')
  .then(response => response.json())
  .then(data => {
    hitokoto.innerText = data.hitokoto
  })
  .catch(console.error)
```

## 常用接口示例

- `https://hi.logacg.com`：随机获取一条句子。
- `https://hi.logacg.com?c=b`：获取漫画分类下的句子。
- `https://hi.logacg.com?z=20`：获取长度不超过 20 的句子。
- `https://hi.logacg.com?z=10,20`：获取长度在 10 到 20 之间的句子。

## 其它文档

- 漫画图片压缩优化工具：https://sekaiai.github.io/guide/zip-manage
- 提醒事项小程序：https://sekaiai.github.io/guide/reminder
- ExHentai 批量下载插件：https://sekaiai.github.io/guide/exhentai

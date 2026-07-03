import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: '雪阳哦',
  description: '免费句子接口API，一言指的就是一句话，可以是动漫中的台词，也可以是网络上的各种小段子。',
  sitemap: {
    hostname: 'https://sekaiai.github.io'
  },
  head: [
    ['meta', { name: 'author', content: '雪阳哦' }],
    ['meta', { property: 'og:site_name', content: '雪阳哦' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'zh_CN' }],
    ['meta', { name: 'theme-color', content: '#ffffff' }]
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/hitokoto' }
    ],
    sidebar: [
      {
        text: '序',
        items: [
          { text: '首页', link: '/' },
          { text: '介绍', link: '/about' }
        ]
      },
      {
        text: '使用',
        items: [
          { text: '一言', link: '/guide/hitokoto' },
          { text: 'ExHentai', link: '/guide/exhentai' },
          { text: '漫画压缩', link: '/guide/zip-manage' },
          { text: '提醒事项', link: '/guide/reminder' },
        ]
      }
    ],
    socialLinks: [{ icon: 'github', link: 'https://github.com/sekaiai' }],
    // footer: {
    //   message: 'Released under the MIT License.',
    //   copyright: 'Copyright © 2013-present XueYang'
    // },
    editLink: {
      pattern: 'https://github.com/sekaiai/sekaiai.github.io/tree/main/docs/:path'
    }
  }
})

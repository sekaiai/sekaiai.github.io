import { defineConfig } from 'vitepress'

const siteUrl = 'https://sekaiai.github.io'
const siteName = '雪阳哦'
const siteDescription = '免费句子接口 API，随机返回动漫台词、文学短句、原创句子等内容，也收录雪阳哦的个人项目文档。'
const defaultImage = `${siteUrl}/73575222_p0.webp`

type HeadEntry = [string, Record<string, string>]

function pageUrl(relativePath: string) {
  const route = relativePath
    .replace(/(^|\/)index\.md$/, '$1')
    .replace(/\.md$/, '')

  return new URL(route === '' ? '/' : `/${route}`, siteUrl).href
}

function ensureMeta(head: HeadEntry[], key: 'name' | 'property', value: string, content: string) {
  if (!head.some(([tag, attrs]) => tag === 'meta' && attrs[key] === value)) {
    head.push(['meta', { [key]: value, content }])
  }
}

function ensureLink(head: HeadEntry[], rel: string, href: string) {
  if (!head.some(([tag, attrs]) => tag === 'link' && attrs.rel === rel)) {
    head.push(['link', { rel, href }])
  }
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: siteName,
  titleTemplate: `:title | ${siteName}`,
  description: siteDescription,
  sitemap: {
    hostname: siteUrl
  },
  head: [
    ['meta', { name: 'author', content: siteName }],
    ['meta', { name: 'robots', content: 'index,follow' }],
    ['meta', { name: 'googlebot', content: 'index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1' }],
    ['meta', { property: 'og:site_name', content: siteName }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'zh_CN' }],
    ['meta', { property: 'og:image', content: defaultImage }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: defaultImage }],
    ['meta', { name: 'theme-color', content: '#ffffff' }]
  ],
  transformPageData(pageData) {
    const head = (pageData.frontmatter.head ??= []) as HeadEntry[]
    const url = pageUrl(pageData.relativePath)
    const title = pageData.title || siteName
    const description = pageData.description || pageData.frontmatter.description || siteDescription

    ensureLink(head, 'canonical', url)
    ensureMeta(head, 'property', 'og:url', url)
    ensureMeta(head, 'property', 'og:title', title)
    ensureMeta(head, 'property', 'og:description', description)
    ensureMeta(head, 'name', 'twitter:title', title)
    ensureMeta(head, 'name', 'twitter:description', description)
  },
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

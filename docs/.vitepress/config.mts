import { defineConfig } from 'vitepress'

const siteUrl = 'https://sekaiai.github.io'
const siteName = '雪阳哦'
const siteDescription = '免费句子接口 API，随机返回动漫台词、文学短句、原创句子等内容，也收录雪阳哦的个人项目文档。'
const defaultImage = `${siteUrl}/73575222_p0.webp`

type HeadEntry = [string, Record<string, string>]
type ScriptHeadEntry = [string, Record<string, string>, string]

const hitokotoFaq = [
  {
    question: '这个随机句子接口可以免费使用吗？',
    answer: '可以。接口地址是 https://hi.logacg.com，每次请求随机返回一条句子，适合网页、小程序和个人项目调用。'
  },
  {
    question: '接口支持哪些句子分类？',
    answer: '接口支持动画、漫画、游戏、文学、原创、来自网络、其他、影视、诗词、网易云、哲学、抖机灵等分类，可以通过 c 参数指定。'
  },
  {
    question: '可以按句子长度筛选吗？',
    answer: '可以。使用 z 参数筛选长度，例如 ?z=20 获取 20 字以内的句子，?z=10,20 获取 10 到 20 字之间的句子。'
  },
  {
    question: '这个接口可以用于微信小程序吗？',
    answer: '可以。域名已经备案，使用前需要在小程序开发平台把 https://hi.logacg.com 添加到 request 合法域名。'
  }
]

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

function ensureJsonLd(head: Array<HeadEntry | ScriptHeadEntry>, id: string, data: Record<string, unknown>) {
  if (!head.some(([tag, attrs]) => tag === 'script' && attrs.id === id)) {
    head.push([
      'script',
      { id, type: 'application/ld+json' },
      JSON.stringify(data).replace(/</g, '\\u003c')
    ])
  }
}

function pageJsonLd(relativePath: string, url: string, title: string, description: string) {
  if (relativePath === 'index.md') {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: siteName,
      url: siteUrl,
      description,
      inLanguage: 'zh-CN',
      publisher: {
        '@type': 'Person',
        name: siteName,
        url: siteUrl,
        sameAs: ['https://github.com/sekaiai']
      },
      mainEntity: {
        '@type': 'WebAPI',
        name: '免费一言随机句子接口 API',
        url: 'https://hi.logacg.com',
        description: '随机返回动漫台词、漫画对白、文学短句、原创句子等内容的免费句子接口。'
      }
    }
  }

  const baseArticle = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: title,
    description,
    url,
    inLanguage: 'zh-CN',
    author: {
      '@type': 'Person',
      name: siteName,
      url: siteUrl
    },
    publisher: {
      '@type': 'Person',
      name: siteName,
      url: siteUrl
    }
  }

  if (relativePath === 'guide/hitokoto.md') {
    return {
      ...baseArticle,
      '@type': ['TechArticle', 'FAQPage'],
      about: {
        '@type': 'WebAPI',
        name: '免费一言随机句子接口 API',
        url: 'https://hi.logacg.com',
        description: '支持分类和长度筛选的随机句子接口，可用于网页和小程序。'
      },
      mainEntity: hitokotoFaq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer
        }
      }))
    }
  }

  return baseArticle
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
    const head = (pageData.frontmatter.head ??= []) as Array<HeadEntry | ScriptHeadEntry>
    const url = pageUrl(pageData.relativePath)
    const title = pageData.title || siteName
    const description = pageData.description || pageData.frontmatter.description || siteDescription

    ensureLink(head as HeadEntry[], 'canonical', url)
    ensureMeta(head as HeadEntry[], 'property', 'og:url', url)
    ensureMeta(head as HeadEntry[], 'property', 'og:title', title)
    ensureMeta(head as HeadEntry[], 'property', 'og:description', description)
    ensureMeta(head as HeadEntry[], 'name', 'twitter:title', title)
    ensureMeta(head as HeadEntry[], 'name', 'twitter:description', description)
    ensureJsonLd(head, 'structured-data', pageJsonLd(pageData.relativePath, url, title, description))
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

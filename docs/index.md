---
# https://vitepress.dev/reference/default-theme-home-page
layout: home
title: 雪阳哦
titleTemplate: 雪阳哦 - 一言句子接口与个人项目
description: 雪阳哦的个人项目主页，提供免费一言句子接口 API、动漫台词与短句随机获取服务，以及相关工具文档。
head:
  - - meta
    - name: keywords
      content: 一言,一言 API,句子接口,Hitokoto,动漫台词,免费 API,雪阳哦
  - - meta
    - property: og:title
      content: 雪阳哦 - 一言句子接口与个人项目
  - - meta
    - property: og:description
      content: 免费一言句子接口 API，随机返回动漫台词、文学短句、原创句子等内容，也收录雪阳哦的个人项目文档。
  - - meta
    - property: og:url
      content: https://sekaiai.github.io/
  - - meta
    - name: twitter:card
      content: summary
  - - meta
    - name: twitter:title
      content: 雪阳哦 - 一言句子接口与个人项目
  - - meta
    - name: twitter:description
      content: 免费一言句子接口 API，随机返回动漫台词、文学短句、原创句子等内容。
  - - link
    - rel: canonical
      href: https://sekaiai.github.io/
---

<script setup>
import { ref,onMounted,onUnmounted  } from 'vue'

const loading = ref(false)
const hitokoto = ref('一路走一路失去，也一路拥有。')
const from_who = ref('')

let timer
function startInterval() {
  timer = setTimeout(fetchHitokoto, 30 * 1000)
}
async function fetchHitokoto() {
  if(loading.value) return
  loading.value = true

  if (timer) clearTimeout(timer)
  const data = await fetch('https://hi.logacg.com').then(res => res.json())
  if (data && data.hitokoto) {
    let str = ''
    if (data.from_who) {
      str += (`—— ${data.from_who}`)
    }

    if (data.from && data.from !== '原创') {
      str += (`「${data.from}」`)
    }
    from_who.value = str
    hitokoto.value = data.hitokoto
  }

  startInterval()
  loading.value = false
}

onMounted(() => {
  fetchHitokoto()
  document.body.classList.add('home-index-page')
  document.body.style.backgroundImage = "url('./73575222_p0.webp')"
})

onUnmounted(() => {
  clearTimeout(timer)
  document.body.classList.remove('home-index-page')
  document.body.style.backgroundImage = 'none'
})
</script>

<section :class='$style.hero'>
<div :class='$style.body'>
  <h1 :class='$style.heroTitle'>雪阳哦</h1>
  <div :class="[$style.hitokoto]">
    {{hitokoto}}
  </div>
  <div :class="[$style.from_who]">{{from_who}}
  <button :class="[$style.more]" @click="fetchHitokoto" title="再来一句" aria-label="再来一句">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" :class="[loading ? $style.loading: '']">
      <path fill="currentColor"
        d="M784.512 230.272v-50.56a32 32 0 1 1 64 0v149.056a32 32 0 0 1-32 32H667.52a32 32 0 1 1 0-64h92.992A320 320 0 1 0 524.8 833.152a320 320 0 0 0 320-320h64a384 384 0 0 1-384 384 384 384 0 0 1-384-384 384 384 0 0 1 643.712-282.88z">
      </path>
    </svg>
  </button>
  </div>
</div>
</section>

<section :class='$style.homeContent' aria-labelledby="home-content-title">
  <div :class='$style.contentIntro'>
    <p :class='$style.eyebrow'>Hitokoto API / Personal Works</p>
    <div id="home-content-title" :class='$style.sectionTitle'>雪阳哦</div>
    <p :class='$style.summary'>一言句子接口 API 与个人项目文档</p>
    <p :class='$style.description'>
      这里是雪阳哦的个人项目主页。主要维护一个可以直接调用的一言句子接口，
      用来随机获取动漫台词、漫画对白、文学短句、原创句子和来自网络的小段子。
    </p>
  </div>

  <div :class='$style.featureGrid'>
    <a :class='$style.featureCard' href="/guide/hitokoto">
      <span :class='$style.cardKicker'>API</span>
      <strong>一言句子接口</strong>
      <span>查看请求参数、分类说明、返回格式和浏览器调用示例。</span>
    </a>
    <a :class='$style.featureCard' href="https://hi.logacg.com" rel="noopener noreferrer" target="_blank">
      <span :class='$style.cardKicker'>Live</span>
      <strong>接口在线预览</strong>
      <span>打开接口地址，直接获取一条随机句子。</span>
    </a>
    <a :class='$style.featureCard' href="/guide/zip-manage">
      <span :class='$style.cardKicker'>Tool</span>
      <strong>漫画图片压缩优化</strong>
      <span>整理和压缩漫画图片的小工具记录。</span>
    </a>
    <a :class='$style.featureCard' href="/guide/reminder">
      <span :class='$style.cardKicker'>Mini App</span>
      <strong>提醒事项小程序</strong>
      <span>支持农历提醒的个人小程序项目说明。</span>
    </a>
  </div>
</section>

<footer :class='$style.siteFooter'>
  <a href="https://www.pixiv.net/artworks/73575222" rel="noopener noreferrer" target="_blank">背景图PIXIV</a>
  <span></span>
  <a href="https://logacg.com">记录境界线上的地平线</a>
  <span></span>
  <a href="https://github.com/sekaiai" rel="noopener noreferrer" target="_blank">GITHUB</a>
  <span></span>
  <a target="_blank" rel="noopener noreferrer" href="https://beian.miit.gov.cn">蜀ICP备2022012373号-1</a>
  <span></span>
  <a rel="noopener noreferrer" target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=51015602000388">川公网安备51015602000388号</a>
</footer>

<style module>
:root {
  --main-color: #fff;
  --font-size-hitokoto: 40px;
  --font-size-from-who: 28px;
}

.hero {
  position: relative;
  min-height: 100vh;
  box-sizing: border-box;
}

.heroTitle {
  height: 12vh;
  opacity: 0;
}

.body {
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  /* color: var(--main-color); */
}

/* 文本样式 */
.hitokoto {
  font-family: serif;
  text-align: center;
  font-size: var(--font-size-hitokoto);
  max-width: 824px;
  padding: 0 12px;
  line-height: initial;
  /* border-radius: 4px; */
  /* background-color: var(--vp-nav-bg-color); */
  background: color-mix(in srgb, var(--vp-nav-bg-color) 20%, transparent);
}

.from_who {
  font-family: serif;
  text-align: center;
  font-size: var(--font-size-from-who);
  padding: 0 10px;
  line-height: initial;
  display: flex;
  align-items: flex-end;
  background: color-mix(in srgb, var(--vp-nav-bg-color) 20%, transparent);
}

.more {
  width: 16px;
  height: 16px;
  padding: 6px 3px;
  cursor: pointer;
  line-height: 1;
  box-sizing: content-box;
  border: 0;
  color: inherit;
  background: transparent;
  font: inherit;
  appearance: none;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* 状态样式 */
.loading {
  animation: spin .3s ease infinite;
}

.homeContent {
  position: relative;
  margin: 0 auto;
  padding: 76px 24px 96px;
  background: color-mix(in srgb, var(--vp-c-bg) 94%, transparent);
  backdrop-filter: blur(16px);
}

.contentIntro,
.featureGrid {
  max-width: 1120px;
  margin: 0 auto;
}

.contentIntro {
  text-align: center;
}

.eyebrow {
  margin: 0 0 10px;
  color: var(--vp-c-brand-1);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0;
  text-transform: uppercase;
}

.sectionTitle {
  margin: 0;
  color: var(--vp-c-text-1);
  font-family: serif;
  font-size: 44px;
  font-weight: 700;
  line-height: 1.35;
}

.summary {
  margin: 8px 0 0;
  color: var(--vp-c-text-1);
  font-size: 18px;
  line-height: 1.7;
}

.description {
  max-width: 720px;
  margin: 18px auto 0 !important;
  color: var(--vp-c-text-2);
  font-size: 16px;
  line-height: 1.8;
}

.featureGrid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
  margin-top: 36px;
}

.featureCard {
  min-height: 172px;
  padding: 24px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  color: inherit;
  text-decoration: none !important;
  transition: border-color .2s ease, transform .2s ease, background-color .2s ease;
}

.featureCard:hover {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-bg);
  transform: translateY(-2px);
}

.cardKicker {
  display: block;
  margin-bottom: 20px;
  color: var(--vp-c-brand-1);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0;
}

.featureCard strong {
  display: block;
  color: var(--vp-c-text-1);
  font-size: 18px;
  line-height: 1.35;
}

.featureCard span:last-child {
  display: block;
  margin-top: 10px;
  color: var(--vp-c-text-2);
  font-size: 14px;
  line-height: 1.7;
}

.siteFooter {
  position: relative;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  padding: 18px 24px 22px;
  border-top: 1px solid var(--vp-c-divider);
  background: color-mix(in srgb, var(--vp-c-bg) 96%, transparent);
  color: var(--vp-c-text-2);
  font-size: 14px;
  text-align: center;
  backdrop-filter: blur(16px);
}

.siteFooter a {
  color: inherit;
  text-decoration: none;
}

.siteFooter a:hover {
  color: var(--vp-c-brand-1);
}

.siteFooter span {
  display: inline-block;
  border-right: 1px solid var(--vp-c-divider);
  height: 14px;
}

@media (max-width: 959px) {
  .featureGrid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 639px) {
  :root {
    --font-size-hitokoto: 30px;
    --font-size-from-who: 20px;
  }

  .homeContent {
    padding: 56px 18px 72px;
  }

  .sectionTitle {
    font-size: 34px;
  }

  .summary {
    font-size: 16px;
  }

  .featureGrid {
    grid-template-columns: 1fr;
  }

  .siteFooter {
    gap: 6px;
    padding-right: 14px;
    padding-left: 14px;
    font-size: 12px;
  }
}

:global(body.home-index-page .VPNav .divider) {
  display: none;
}
</style>

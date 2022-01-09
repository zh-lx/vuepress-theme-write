<template>
  <main
    class="main-container"
    :aria-labelledby="heroText ? 'main-title' : null"
  >
    <div
      class="hero"
      :id="HOME_BG_ID"
      :style="{ backgroundImage: `url(${homeBgImage})` }"
    >
      <h1 v-if="heroText" id="main-title">
        {{ heroText }}
      </h1>

      <p v-if="tagline" class="description">
        {{ tagline }}
      </p>
    </div>

    <div class="main-content">
      <div class="main-content-left"><BlogList :blogs="blogs" /></div>
      <div class="main-content-right"><HomeRight /></div>
    </div>

    <template v-if="footer">
      <div v-if="footerHtml" class="footer" v-html="footer" />
      <div v-else class="footer" v-text="footer" />
    </template>

    <SiteInfo />
  </main>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { usePageFrontmatter, useSiteLocaleData } from '@vuepress/client';
import { usePageList } from '@/composables';
import BlogList from '@/components/blog-list/index.vue';
import { HOME_BG_ID, HOME_BG_IMAGE } from '@/constants/global';
import HomeRight from './HomeRight.vue';

const blogs = ref([]);
const frontmatter = usePageFrontmatter();
const siteLocale = useSiteLocaleData();

// 主页标题
const heroText = computed(() => {
  if (frontmatter.value.heroText === null) {
    return null;
  }
  return frontmatter.value.heroText || siteLocale.value.title || 'Hello';
});

// 背景图片
const homeBgImage = computed(() => {
  return frontmatter.value.bgImage || HOME_BG_IMAGE;
});

// 介绍
const tagline = computed(() => {
  if (frontmatter.value.tagline === null) {
    return null;
  }
  return (
    frontmatter.value.tagline ||
    siteLocale.value.description ||
    'Welcome to your VuePress site'
  );
});

const footer = computed(() => frontmatter.value.footer);

const footerHtml = computed(() => frontmatter.value.footerHtml);

usePageList().then((pageList) => {
  blogs.value = pageList?.blogList?.value || [];
});
</script>

<style lang="scss" scoped>
@use 'sass:color';

@import '~@/styles/_variables.scss';

.main-container {
  padding: $navbarHeight 0 0;
  max-width: 100%;
  display: block;
  width: 100%;

  .hero {
    text-align: center;
    height: calc(100vh - 3.6rem);
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;

    #main-title {
      color: var(--homeTextColor);
      font-weight: 600;
      font-family: Ubuntu, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
        Oxygen, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
      font-size: 3rem;
    }

    h1,
    .description {
      margin: 1.8rem auto;
    }

    .description {
      max-width: 35rem;
      font-size: 1.6rem;
      color: var(--homeTextColor);
    }
  }

  .main-content {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 1.5rem 1.5rem;
    .main-content-left {
      flex: 2;
    }
    .main-content-right {
      flex: 1;
      max-width: 300px;
      min-width: 160px;
      margin-left: 1.6rem;
    }
  }

  .footer {
    padding: 2.5rem;
    border-top: 1px solid $borderColor;
    text-align: center;
    color: color.scale($textColor, $lightness: 25%);
  }
}

@media (max-width: $MQMobileNarrow) {
  .main-container {
    .hero {
      h1 {
        font-size: 2rem;
      }
      h1,
      .description,
      .actions {
        margin: 1.2rem auto;
      }
      .description {
        font-size: 1.2rem;
      }
    }
    .main-content {
      .main-content-left {
        width: 100%;
      }
      .main-content-right {
        width: 100%;
        margin-left: 0;
        min-width: 100%;
      }
    }
  }
}
</style>

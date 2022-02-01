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

    <HomeFooter />
  </main>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { usePageFrontmatter, useSiteLocaleData } from '@vuepress/client';
import { usePageList, useDarkMode } from '@/composables';
import BlogList from '@/components/blog-list/index.vue';
import { DEFAULT_HOME_INFO, HOME_BG_ID } from '@/constants/global';
import HomeRight from './HomeRight.vue';
import HomeFooter from 'HomeFooter';

const { backgroundImage, title, description, backgroundImageDark } = {
  ...DEFAULT_HOME_INFO,
  ...SITE_INFO,
};

const blogs = ref([]);
const frontmatter = usePageFrontmatter();
const siteLocale = useSiteLocaleData();
const isDarkMode = useDarkMode();

// 主页标题
const heroText = computed(() => {
  return (
    frontmatter.value.heroText || title || siteLocale.value.title || 'Hello'
  );
});

// 背景图片
const homeBgImage = computed(() => {
  return (
    frontmatter.value.bgImage ||
    (isDarkMode.value ? backgroundImageDark : backgroundImage)
  );
});

// 介绍
const tagline = computed(() => {
  if (frontmatter.value.tagline === null) {
    return null;
  }
  return (
    frontmatter.value.tagline ||
    description ||
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
    height: calc(88vh - 84px);
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: var(--hero-bg-color);
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;

    #main-title {
      color: var(--main-text-color);
      font-weight: 600;
      font-family: Ubuntu, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
        Oxygen, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
      font-size: 42px;
    }

    h1,
    .description {
      margin: 24px auto;
    }

    .description {
      max-width: 500px;
      font-size: 22px;
      color: var(--common-text-color);
    }
  }

  .main-content {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding: 22px 22px;
    .main-content-left {
      flex: 1;
      max-width: 700px;
    }
    .main-content-right {
      width: 240px;
      margin-left: 22px;
    }
  }

  .footer {
    padding: 36px;
    border-top: var(--common-border);
    text-align: center;
    color: var(--main-text-color);
  }
}

@media (max-width: $MQMobile) {
  .main-container {
    .hero {
      h1 {
        font-size: 28px;
      }
      h1,
      .description,
      .actions {
        margin: 16px auto;
      }
      .description {
        font-size: 16px;
      }
    }
    .main-content {
      .main-content-left {
        width: 100%;
      }
      .main-content-right {
        width: 0;
        margin-left: 0;
        overflow: hidden;
      }
    }
  }
}
</style>
